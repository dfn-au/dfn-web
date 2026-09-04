#!/usr/bin/env node

import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { chromium } from "playwright-core";

import {
	defaultReferenceRoot,
	startReferenceServer,
} from "../../docs/references/legacy-site/serve.mjs";
import { compareSnapshots } from "./compare.mjs";
import {
	defaultLayoutTolerance,
	defaultPages,
	defaultViewportHeight,
	defaultViewports,
} from "./config.mjs";
import { capturePageSnapshot } from "./snapshot.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const defaultCandidateRoot = path.join(
	repositoryRoot,
	"docs/references/tailwind-migration/site",
);

const { values } = parseArgs({
	allowPositionals: false,
	options: {
		"candidate-asset-prefix": { type: "string" },
		"candidate-path-prefix": { type: "string" },
		"candidate-root": { type: "string" },
		"candidate-url": { type: "string" },
		"chrome-path": { type: "string" },
		help: { short: "h", type: "boolean" },
		"layout-tolerance": { type: "string" },
		"max-diffs": { type: "string" },
		page: { multiple: true, short: "p", type: "string" },
		"reference-url": { type: "string" },
		selector: { short: "s", type: "string" },
		viewport: { multiple: true, short: "v", type: "string" },
	},
});

if (values.help) {
	printHelp();
	process.exit(0);
}

const selectedPages = selectPages(values.page);
const viewports = parsePositiveNumbers(
	values.viewport ?? defaultViewports.map(String),
	"viewport",
);
const layoutTolerance = parseNonNegativeNumber(
	values["layout-tolerance"] ?? String(defaultLayoutTolerance),
	"layout-tolerance",
);
const maxDiffs = parsePositiveNumber(values["max-diffs"] ?? "80", "max-diffs");
const selector = values.selector ?? "html";

let referenceServer;
let candidateServer;
let browser;

try {
	const referenceUrl =
		values["reference-url"] ?? (await startLocalReference()).url;
	const candidateUrl =
		values["candidate-url"] ?? (await startLocalCandidate()).url;
	const executablePath = await findChrome(values["chrome-path"]);

	browser = await chromium.launch({ executablePath, headless: true });
	let totalDifferences = 0;

	for (const pageDefinition of selectedPages) {
		for (const width of viewports) {
			const context = await browser.newContext({
				viewport: { height: defaultViewportHeight, width },
			});

			try {
				const [referencePage, candidatePage] = await Promise.all([
					context.newPage(),
					context.newPage(),
				]);
				const referencePageUrl = new URL(pageDefinition.path, referenceUrl)
					.href;
				const candidatePageUrl = new URL(
					prefixPath(
						pageDefinition.path,
						values["candidate-path-prefix"] ?? "",
					),
					candidateUrl,
				).href;

				await Promise.all([
					referencePage.goto(referencePageUrl, { waitUntil: "load" }),
					candidatePage.goto(candidatePageUrl, { waitUntil: "load" }),
				]);

				const [referenceSnapshot, candidateSnapshot] = await Promise.all([
					capturePageSnapshot(referencePage, { selector }),
					capturePageSnapshot(candidatePage, {
						selector,
						urlPathPrefix: values["candidate-asset-prefix"] ?? "",
					}),
				]);
				const differences = compareSnapshots(
					referenceSnapshot,
					candidateSnapshot,
					{ layoutTolerance },
				);

				totalDifferences += differences.length;
				printResult(pageDefinition, width, differences, maxDiffs);
			} finally {
				await context.close();
			}
		}
	}

	if (totalDifferences > 0) {
		console.error(
			`\nStyle parity failed with ${totalDifferences} difference(s).`,
		);
		process.exitCode = 1;
	} else {
		console.log("\nStyle parity passed.");
	}
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
} finally {
	await browser?.close();
	await closeServer(candidateServer);
	await closeServer(referenceServer);
}

async function startLocalReference() {
	const started = await startReferenceServer({
		port: 0,
		referenceRoot: defaultReferenceRoot,
	});
	referenceServer = started.server;
	return started;
}

async function startLocalCandidate() {
	const candidateRoot = path.resolve(
		values["candidate-root"] ?? defaultCandidateRoot,
	);
	const started = await startReferenceServer({
		fallbackRoot: defaultReferenceRoot,
		port: 0,
		referenceRoot: candidateRoot,
	});
	candidateServer = started.server;
	return started;
}

async function closeServer(server) {
	if (!server) return;
	await new Promise((resolve, reject) => {
		server.close((error) => (error ? reject(error) : resolve()));
	});
}

function selectPages(requestedPages) {
	if (!requestedPages?.length) return defaultPages;

	return requestedPages.map((requestedPage) => {
		const pageDefinition = defaultPages.find(
			(page) => page.name === requestedPage,
		);
		if (!pageDefinition) {
			throw new Error(
				`Unknown page: ${requestedPage}. Expected ${defaultPages.map((page) => page.name).join(", ")}.`,
			);
		}
		return pageDefinition;
	});
}

function parsePositiveNumbers(rawValues, name) {
	return rawValues.map((value) => parsePositiveNumber(value, name));
}

function parsePositiveNumber(rawValue, name) {
	const value = Number(rawValue);
	if (!Number.isFinite(value) || value <= 0) {
		throw new Error(`${name} must be a positive number: ${rawValue}`);
	}
	return value;
}

function parseNonNegativeNumber(rawValue, name) {
	const value = Number(rawValue);
	if (!Number.isFinite(value) || value < 0) {
		throw new Error(`${name} must be a non-negative number: ${rawValue}`);
	}
	return value;
}

function prefixPath(pagePath, prefix) {
	if (!prefix) return pagePath;

	const normalizedPrefix = `/${prefix}`
		.replaceAll(/\/{2,}/g, "/")
		.replace(/\/$/, "");
	return `${normalizedPrefix}${pagePath}`;
}

async function findChrome(explicitPath) {
	const candidates = [
		explicitPath,
		process.env.STYLE_PARITY_CHROME_PATH,
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		"/usr/bin/google-chrome",
		"/usr/bin/chromium",
		"/usr/bin/chromium-browser",
	].filter(Boolean);

	for (const candidate of candidates) {
		try {
			await access(candidate);
			return candidate;
		} catch {
			// Try the next known Chrome location.
		}
	}

	throw new Error(
		"Chrome was not found. Pass --chrome-path or set STYLE_PARITY_CHROME_PATH.",
	);
}

function printResult(pageDefinition, width, differences, maxDifferences) {
	const label = `${pageDefinition.path} @ ${width}px`;
	if (differences.length === 0) {
		console.log(`✓ ${label}`);
		return;
	}

	console.log(`✗ ${label} — ${differences.length} difference(s)`);
	for (const difference of differences.slice(0, maxDifferences)) {
		console.log(
			`  ${difference.node} [${difference.category}] ${difference.property}: ${formatValue(difference.expected)} → ${formatValue(difference.actual)}`,
		);
	}

	if (differences.length > maxDifferences) {
		console.log(
			`  … ${differences.length - maxDifferences} more difference(s)`,
		);
	}
}

function formatValue(value) {
	if (value === undefined) return "<missing>";
	return JSON.stringify(value);
}

function printHelp() {
	console.log(`Usage: pnpm reference:parity [options]

Compare the frozen legacy pages with the editable Tailwind overlay.

Options:
  -p, --page <home|about>    Page to compare; may be repeated
  -v, --viewport <width>     Viewport width; may be repeated
  -s, --selector <selector>  Limit comparison to a DOM subtree
      --candidate-root <dir> Editable HTML overlay directory
      --candidate-url <url>  Compare with an already-running candidate
      --candidate-path-prefix <path>
                            Prefix candidate paths (for example /tailwind-migration)
      --candidate-asset-prefix <path>
                            Ignore a candidate-only asset URL prefix
      --reference-url <url>  Compare with an already-running reference
      --chrome-path <path>   Chrome executable path
      --layout-tolerance <n> Numeric layout tolerance (default: 0.05)
      --max-diffs <n>        Maximum differences printed per run (default: 80)
  -h, --help                 Show this help
`);
}

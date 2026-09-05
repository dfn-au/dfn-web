#!/usr/bin/env node

import { parseArgs } from "node:util";
import { chromium } from "playwright-core";
import { startReferenceServer } from "../../docs/references/legacy-site/serve.mjs";
import { compareSnapshots } from "../style-parity/compare.mjs";
import { capturePageSnapshot } from "../style-parity/snapshot.mjs";

const { values } = parseArgs({
	options: {
		"candidate-url": { type: "string", default: "http://localhost:3000" },
		"chrome-path": { type: "string" },
	},
});
const reference = await startReferenceServer({ port: 0 });
let browser;

try {
	browser = await chromium.launch({
		executablePath:
			values["chrome-path"] ??
			process.env.STYLE_PARITY_CHROME_PATH ??
			"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		headless: true,
	});
	const context = await browser.newContext({
		viewport: { width: 1440, height: 900 },
	});
	const pages = await Promise.all([context.newPage(), context.newPage()]);
	await Promise.all([
		pages[0].goto(reference.url, { waitUntil: "load" }),
		pages[1].goto(
			new URL("/tailwind-migration", values["candidate-url"]).href,
			{ waitUntil: "load" },
		),
	]);

	async function compareState(name, prepare, selector) {
		await Promise.all(
			pages.map(async (page) => {
				await page.mouse.move(0, 0);
				await page.evaluate(() => document.activeElement?.blur());
				await prepare(page);
			}),
		);
		const snapshots = await Promise.all(
			pages.map((page, index) =>
				capturePageSnapshot(page, {
					selector,
					urlPathPrefix: index === 1 ? "/tailwind-migration/reference" : "",
				}),
			),
		);
		const differences = compareSnapshots(...snapshots);
		if (differences.length) {
			console.error(`${name}: ${differences.length} difference(s)`);
			console.error(JSON.stringify(differences.slice(0, 8), null, 2));
			process.exitCode = 1;
		} else {
			console.log(`✓ ${name}`);
		}
	}

	await compareState(
		"Header dropdown hover",
		async (page) => {
			await page.locator("header nav > ul > li").nth(1).hover();
		},
		"header",
	);
	await compareState(
		"Nested header dropdown hover",
		async (page) => {
			const give = page.locator("header nav > ul > li").nth(3);
			await give.hover();
			await give.locator(":scope > ul > li").nth(5).hover();
		},
		"header",
	);
	await compareState(
		"Header link keyboard focus",
		async (page) => {
			await page.locator("header nav > ul > li > a").first().focus();
		},
		"header",
	);

	for (const name of [
		"Education",
		"Healthcare",
		"ECONOMIC EMPOWERMENT",
		"Vulnerable women and girls",
	]) {
		for (const state of ["hover", "focus"]) {
			await compareState(
				`${name} CTA ${state}`,
				async (page) => {
					await page
						.locator("[data-component-state]")
						.evaluateAll((elements) => {
							for (const element of elements)
								element.removeAttribute("data-component-state");
						});
					const link = page
						.locator("#fl-main-content")
						.getByRole("link", { name, exact: true });
					await link.evaluate((element) =>
						element.setAttribute("data-component-state", ""),
					);
					await link[state]();
				},
				"[data-component-state]",
			);
		}
	}
} finally {
	await browser?.close();
	await new Promise((resolve, reject) =>
		reference.server.close((error) => (error ? reject(error) : resolve())),
	);
}

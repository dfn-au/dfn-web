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
			pages.map(async (page, index) => {
				await page.mouse.move(0, 0);
				await page.evaluate(() => document.activeElement?.blur());
				await page.locator(".pp-hover-card.focus").evaluateAll((elements) => {
					for (const element of elements) element.classList.remove("focus");
				});
				await page.locator("[data-component-state]").evaluateAll((elements) => {
					for (const element of elements)
						element.removeAttribute("data-component-state");
				});
				await prepare(page, index);
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
					const link = page
						.locator("#fl-main-content")
						.getByRole("link", { name, exact: true });
					await mark(link);
					await link[state]();
				},
				"[data-component-state]",
			);
		}
	}

	async function mark(locator) {
		await locator.evaluate((element) =>
			element.setAttribute("data-component-state", ""),
		);
	}

	for (const state of ["hover", "focus"]) {
		await compareState(
			`Hero CTA ${state}`,
			async (page) => {
				const link = page
					.getByRole("region", { name: "Slider" })
					.getByRole("link", { name: "Learn More", exact: true });
				await mark(link);
				await link[state]();
			},
			"[data-component-state]",
		);
	}

	for (const name of [
		"Education",
		"Healthcare",
		"Economic Empowerment",
		"VULNERABLE COMMUNITIES",
	]) {
		for (const state of ["hover", "focus", "link focus"]) {
			await compareState(
				`${name} introduction card ${state}`,
				async (page, index) => {
					const card = page
						.getByRole("heading", { level: 3, name, exact: true })
						.locator("xpath=ancestor::div[@tabindex='0'][1]");
					await mark(card);
					if (state === "hover") await card.hover();
					else {
						await (state === "link focus" ? card.locator("a") : card).focus();
						// The archived card runtime exposed focus styling through .focus.
						// The React presentation uses CSS :focus-within for the same state.
						if (index === 0)
							await card.evaluate((element) => element.classList.add("focus"));
					}
				},
				"[data-component-state]",
			);
		}
	}

	for (const name of ["Name", "Email"]) {
		await compareState(
			`Signup ${name} field focus`,
			async (page) => {
				const input = page.getByRole("textbox", { name, exact: true });
				await mark(input);
				await input.focus();
			},
			"[data-component-state]",
		);
	}
	for (const state of ["hover", "focus"]) {
		await compareState(
			`Signup CTA ${state}`,
			async (page) => {
				const button = page.getByRole("button", {
					name: "Sign Up",
					exact: true,
				});
				await mark(button);
				await button[state]();
			},
			"[data-component-state]",
		);
	}
} finally {
	await browser?.close();
	await new Promise((resolve, reject) =>
		reference.server.close((error) => (error ? reject(error) : resolve())),
	);
}

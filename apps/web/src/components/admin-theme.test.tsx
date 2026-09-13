// @vitest-environment jsdom

import { runInNewContext } from "node:vm";
import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { appearanceScript, appearanceStyles } from "@/lib/admin-appearance";
import { AdminTheme } from "./admin-theme";

let root: Root | undefined;
let systemDark = true;

beforeEach(() => {
	vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
	vi.stubGlobal("matchMedia", () => ({
		get matches() {
			return systemDark;
		},
		addEventListener() {},
		removeEventListener() {},
	}));
	const styles = document.createElement("style");
	styles.textContent = appearanceStyles;
	document.head.append(styles);
});

afterEach(async () => {
	if (root) await act(() => root?.unmount());
	root = undefined;
	document.body.innerHTML = "";
	document.head.innerHTML = "";
	delete document.documentElement.dataset.adminAppearance;
	localStorage.clear();
	vi.unstubAllGlobals();
});

it.each([
	{
		saved: "dark",
		expected: "dark",
		osDark: false,
		background: "rgb(19, 20, 27)",
	},
	{
		saved: "light",
		expected: "light",
		osDark: true,
		background: "rgb(255, 255, 255)",
	},
	{ saved: "system", expected: "dark", osDark: true },
	{ saved: null, expected: "dark", osDark: true },
])(
	"keeps $saved appearance consistent through hydration",
	async ({ saved, expected, osDark, background }) => {
		systemDark = osDark;
		if (saved) localStorage.setItem("dfn-admin-appearance", saved);
		const container = document.createElement("div");
		const page = (
			<AdminTheme>
				<main>Admin content</main>
			</AdminTheme>
		);
		container.innerHTML = renderToString(page);
		document.body.append(container);
		// Run the same blocking head script the browser executes before painting.
		runInNewContext(appearanceScript, { document, localStorage });
		if (background)
			expect(getComputedStyle(document.documentElement).backgroundColor).toBe(
				background,
			);
		const paintedFallbacks = [
			...container.querySelectorAll('[data-scheme="light"]'),
		].filter((surface) => !surface.closest("[hidden]"));
		expect(paintedFallbacks).toHaveLength(0);

		const recoverableError = vi.fn();
		await act(() => {
			root = hydrateRoot(container, page, {
				onRecoverableError: recoverableError,
			});
		});
		const surface = container.querySelector('[data-ui="Card"]');
		expect(surface?.getAttribute("data-scheme")).toBe(expected);
		expect(surface?.closest("[hidden]")).toBeNull();
		expect(container.textContent).toContain("Admin content");
		expect(recoverableError).not.toHaveBeenCalled();
	},
);

it("falls back to system appearance when browser storage is unavailable", () => {
	vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
		throw new Error("Storage disabled");
	});
	expect(() =>
		runInNewContext(appearanceScript, { document, localStorage }),
	).not.toThrow();
	expect(document.documentElement.dataset.adminAppearance).toBe("system");
	vi.restoreAllMocks();
});

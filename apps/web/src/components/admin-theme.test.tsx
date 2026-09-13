// @vitest-environment jsdom

import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { appearanceStyles } from "@/lib/admin-appearance";
import { AdminTheme } from "./admin-theme";

let root: Root | undefined;

beforeEach(() => {
	vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
	const styles = document.createElement("style");
	styles.textContent = appearanceStyles;
	document.head.append(styles);
});

afterEach(async () => {
	if (root) await act(() => root?.unmount());
	root = undefined;
	document.body.innerHTML = "";
	document.head.innerHTML = "";
	vi.unstubAllGlobals();
});

it("renders dark before and after hydration", async () => {
	const container = document.createElement("div");
	const page = (
		<AdminTheme>
			<main>Admin content</main>
		</AdminTheme>
	);
	container.innerHTML = renderToString(page);
	document.body.append(container);
	expect(getComputedStyle(document.documentElement).backgroundColor).toBe(
		"rgb(19, 20, 27)",
	);
	expect(
		container.querySelector('[data-ui="Card"]')?.getAttribute("data-scheme"),
	).toBe("dark");
	expect(container.querySelector("[hidden]")).toBeNull();
	const recoverableError = vi.fn();
	await act(() => {
		root = hydrateRoot(container, page, {
			onRecoverableError: recoverableError,
		});
	});
	expect(
		container.querySelector('[data-ui="Card"]')?.getAttribute("data-scheme"),
	).toBe("dark");
	expect(container.textContent).toContain("Admin content");
	expect(recoverableError).not.toHaveBeenCalled();
});

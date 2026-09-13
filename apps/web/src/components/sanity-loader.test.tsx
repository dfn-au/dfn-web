// @vitest-environment jsdom

import { act, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { createSanityLoginReturnPath } from "@/lib/sanity-login-transaction";
import { AdminTheme } from "./admin-theme";
import { loadSanityComponent, SanityLoader } from "./sanity-loader";

beforeEach(() => sessionStorage.clear());

it.each(["/admin/login", "/admin/studio"])(
	"rejects a callback on %s before importing any Sanity code",
	async (path) => {
		window.history.replaceState(null, "", `${path}#sid=${"s".repeat(32)}`);
		const load = vi.fn(async () => ({ default: () => null }));
		await loadSanityComponent(load);
		expect(load).not.toHaveBeenCalled();
		expect(window.location.hash).toBe("");
	},
);

it("validates the transaction before the SDK's eager callback consumption", async () => {
	const path = createSanityLoginReturnPath("/admin/login");
	window.history.replaceState(null, "", `${path}#sid=${"s".repeat(32)}`);
	const component = () => null;
	const load = vi.fn(async () => {
		expect(sessionStorage.length).toBe(0);
		expect(window.location.search).not.toContain("dfnLoginState");
		expect(window.location.hash).toBe(`#sid=${"s".repeat(32)}`);
		return { default: component };
	});
	expect((await loadSanityComponent(load)).default).toBe(component);
	expect(load).toHaveBeenCalledOnce();
});

it("keeps Sanity out of server rendering and imports once under StrictMode", async () => {
	const path = createSanityLoginReturnPath("/admin/login");
	window.history.replaceState(null, "", `${path}#sid=${"s".repeat(32)}`);
	const load = vi.fn(async () => ({
		default: () => <p>Authenticated content</p>,
	}));
	const page = (
		<StrictMode>
			<AdminTheme>
				<SanityLoader load={load} componentProps={{}} loadingText="Loading…" />
			</AdminTheme>
		</StrictMode>
	);
	expect(renderToString(page)).toContain("Loading…");
	expect(load).not.toHaveBeenCalled();
	vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
	const container = document.createElement("div");
	const root = createRoot(container);
	try {
		await act(async () => root.render(page));
		expect(load).toHaveBeenCalledOnce();
		expect(container.textContent).toBe("Authenticated content");
	} finally {
		await act(() => root.unmount());
		vi.unstubAllGlobals();
	}
});

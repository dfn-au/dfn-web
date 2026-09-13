// @vitest-environment jsdom

import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
	createSanityLoginReturnPath,
	InvalidSanityCallback,
	protectSanityHashNavigation,
	validateSanityCallback,
} from "./sanity-login-transaction";

beforeEach(() => {
	window.history.replaceState(null, "", "/admin/login");
	sessionStorage.clear();
});
afterEach(() => {
	vi.restoreAllMocks();
	vi.useRealTimers();
});

it.each(["/admin/login?returnTo=%2Fadmin%2Ferrors", "/admin/studio/structure"])(
	"accepts a callback started in this tab for %s exactly once",
	(path) => {
		const returnPath = createSanityLoginReturnPath(path);
		const callback = `${returnPath}#sid=${"s".repeat(32)}`;
		window.history.replaceState(null, "", callback);
		validateSanityCallback();
		expect(window.location.pathname + window.location.search).toBe(path);
		expect(window.location.hash).toBe(`#sid=${"s".repeat(32)}`);
		expect(sessionStorage.length).toBe(0);
		window.history.replaceState(null, "", callback);
		expect(validateSanityCallback).toThrow(InvalidSanityCallback);
		expect(window.location.hash).toBe("");
	},
);

it.each(["sid", "token", "claim", "prefix_token"])(
	"rejects unsolicited %s fragments before the SDK can consume them",
	(key) => {
		window.history.replaceState(
			null,
			"",
			`/admin/login#${key}=${"x".repeat(32)}`,
		);
		expect(validateSanityCallback).toThrow(InvalidSanityCallback);
		expect(window.location.hash).toBe("");
	},
);

it("rejects a callback copied from another tab even with its state parameter", () => {
	const path = createSanityLoginReturnPath("/admin/login");
	sessionStorage.clear();
	window.history.replaceState(null, "", `${path}#sid=${"s".repeat(32)}`);
	expect(validateSanityCallback).toThrow(InvalidSanityCallback);
});

it.each(["wrong-state", "wrong-path", "duplicate-state", "expired"])(
	"rejects a %s transaction",
	(reason) => {
		const callback = new URL(
			createSanityLoginReturnPath("/admin/login"),
			window.location.origin,
		);
		if (reason === "wrong-state")
			callback.searchParams.set("dfnLoginState", "attacker-state");
		if (reason === "wrong-path") callback.pathname = "/admin/studio";
		if (reason === "duplicate-state")
			callback.searchParams.append("dfnLoginState", "attacker-state");
		if (reason === "expired") {
			vi.useFakeTimers();
			vi.setSystemTime(Date.now() + 31 * 60 * 1000);
		}
		callback.hash = `sid=${"s".repeat(32)}`;
		window.history.replaceState(null, "", callback);
		expect(validateSanityCallback).toThrow(InvalidSanityCallback);
		expect(window.location.hash).toBe("");
		expect(window.location.search).not.toContain("dfnLoginState");
	},
);

it("allows stored-session visits and normal Studio fragments without a transaction", () => {
	window.history.replaceState(null, "", "/admin/studio#ordinary-fragment");
	expect(validateSanityCallback).not.toThrow();
	expect(window.location.hash).toBe("#ordinary-fragment");
});

it("fails closed if browser storage is unavailable", () => {
	window.history.replaceState(null, "", `/admin/login#token=${"t".repeat(32)}`);
	vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
		throw new Error("blocked");
	});
	expect(validateSanityCallback).toThrow(InvalidSanityCallback);
	expect(window.location.hash).toBe("");
});

it.each([
	"https://attacker.example/admin/login",
	"/admin/auth/session",
	"/admin/login/other",
])("does not start a transaction for %s", (path) => {
	expect(() => createSanityLoginReturnPath(path)).toThrow(
		"Invalid sign-in return path",
	);
	expect(sessionStorage.length).toBe(0);
});

it.each(["hashchange", "popstate"])(
	"blocks later credential fragments before SDK %s listeners",
	(type) => {
		const cleanup = protectSanityHashNavigation();
		const sdkListener = vi.fn();
		window.addEventListener(type, sdkListener);
		try {
			window.history.replaceState(
				null,
				"",
				`/admin/studio#token=${"t".repeat(32)}`,
			);
			window.dispatchEvent(new Event(type));
			expect(window.location.hash).toBe("");
			expect(sdkListener).not.toHaveBeenCalled();
		} finally {
			cleanup();
			window.removeEventListener(type, sdkListener);
		}
	},
);

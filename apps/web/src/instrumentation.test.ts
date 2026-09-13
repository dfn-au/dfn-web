// @vitest-environment jsdom

import type { Instrumentation } from "next";
import type { PostHogConfig } from "posthog-js";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const analytics = vi.hoisted(() => ({
	init: vi.fn<(token: string, config: Partial<PostHogConfig>) => void>(),
	captureException: vi.fn(),
	captureExceptionImmediate: vi.fn(),
	getServer: vi.fn(),
}));
vi.mock("posthog-js", () => ({ default: analytics }));
vi.mock("@/lib/posthog-server", () => ({
	getPostHogServer: analytics.getServer,
}));

beforeEach(() => {
	vi.clearAllMocks();
	vi.resetModules();
	vi.stubEnv("NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN", "test-project-token");
	vi.stubEnv("NEXT_RUNTIME", "nodejs");
	vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
	analytics.getServer.mockReturnValue(analytics);
});

afterEach(() => {
	window.history.replaceState(null, "", "/");
	vi.unstubAllEnvs();
	vi.unstubAllGlobals();
});

it.each([
	"/admin",
	"/admin/errors",
	"/admin/studio/structure",
	"/admin/login#sid=test-session",
	"/admin/login#token=test-session",
	"/a%64min/login#sid=test-session",
])("does not initialize PostHog on %s", async (url) => {
	window.history.replaceState(null, "", url);
	await import("./instrumentation-client");
	expect(analytics.init).not.toHaveBeenCalled();
});

it("keeps public analytics enabled and rejects events if the location becomes admin", async () => {
	window.history.replaceState(null, "", "/about");
	await import("./instrumentation-client");
	expect(analytics.init).toHaveBeenCalledOnce();
	const config = analytics.init.mock.calls[0][1];
	const beforeSend = config.before_send;
	if (typeof beforeSend !== "function") throw new Error("Missing event filter");
	const event = {
		event: "$pageview",
		properties: {},
		timestamp: new Date(),
		uuid: "test-event",
	};
	expect(beforeSend(event)).toBe(event);
	window.history.replaceState(null, "", "/admin/login#sid=test-session");
	expect(beforeSend(event)).toBeNull();
});

const context: Parameters<Instrumentation.onRequestError>[2] = {
	routerKind: "App Router",
	routePath: "/admin/errors/server",
	routeType: "route",
	revalidateReason: undefined,
};

it.each(["/admin/errors/server", "/admin/login?returnTo=%2Fadmin"])(
	"does not create a server analytics client for %s errors",
	async (path) => {
		const { onRequestError } = await import("./instrumentation");
		await onRequestError(
			new Error("private admin error"),
			{
				path,
				method: "POST",
				headers: {},
			},
			context,
		);
		expect(analytics.getServer).not.toHaveBeenCalled();
		expect(analytics.captureExceptionImmediate).not.toHaveBeenCalled();
	},
);

it("still reports public server errors", async () => {
	const { onRequestError } = await import("./instrumentation");
	const error = new Error("public error");
	await onRequestError(
		error,
		{ path: "/about", method: "GET", headers: {} },
		{
			...context,
			routePath: "/[slug]",
			routeType: "render",
		},
	);
	expect(analytics.captureExceptionImmediate).toHaveBeenCalledWith(
		error,
		undefined,
		expect.objectContaining({ $request_path: "/about" }),
	);
});

it("does not report admin errors from the shared client error boundary", async () => {
	window.history.replaceState(null, "", "/admin");
	const { default: ErrorPage } = await import("./app/error");
	const container = document.createElement("div");
	const root = createRoot(container);
	await act(() =>
		root.render(
			createElement(ErrorPage, {
				error: new Error("private error"),
				reset: vi.fn(),
			}),
		),
	);
	expect(analytics.captureException).not.toHaveBeenCalled();
	await act(() => root.unmount());
});

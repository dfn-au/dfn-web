import type { Instrumentation } from "next";

export function register() {}

export const onRequestError: Instrumentation.onRequestError = async (
	error,
	request,
	context,
) => {
	if (process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const { getPostHogServer } = await import("@/lib/posthog-server");
	const posthog = getPostHogServer();

	if (!posthog) {
		return;
	}

	const distinctId = getPostHogDistinctId(request.headers.cookie);

	await posthog.captureExceptionImmediate(error, distinctId, {
		$request_path: request.path,
		$request_method: request.method,
		nextjs_router_kind: context.routerKind,
		nextjs_route_path: context.routePath,
		nextjs_route_type: context.routeType,
	});
};

function getPostHogDistinctId(cookieHeader: string | string[] | undefined) {
	const cookieString = Array.isArray(cookieHeader)
		? cookieHeader.join("; ")
		: cookieHeader;

	if (!cookieString) {
		return;
	}

	for (const cookie of cookieString.split(";")) {
		const [name, ...valueParts] = cookie.trim().split("=");

		if (!name.startsWith("ph_") || !name.endsWith("_posthog")) {
			continue;
		}

		try {
			const value = JSON.parse(decodeURIComponent(valueParts.join("=")));

			if (typeof value.distinct_id === "string") {
				return value.distinct_id;
			}
		} catch {
			// Ignore malformed analytics cookies and capture anonymously.
		}
	}
}

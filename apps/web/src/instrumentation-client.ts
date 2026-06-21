import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

const isDev = process.env.NODE_ENV === "development";
const spotlightEnabled = process.env.NEXT_PUBLIC_SENTRY_SPOTLIGHT === "1";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
	sendDefaultPii: true,
	tracesSampleRate: isDev ? 1.0 : 0.1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	spotlight: isDev && spotlightEnabled,
	integrations: [
		...(isDev && spotlightEnabled
			? [Sentry.spotlightBrowserIntegration()]
			: []),
		...(!isDev || !spotlightEnabled ? [Sentry.replayIntegration()] : []),
	],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (projectToken) {
	posthog.init(projectToken, {
		api_host: "/ingest",
		ui_host: "https://eu.posthog.com",
		defaults: "2026-01-30",
		capture_exceptions: true,
		debug: process.env.NODE_ENV === "development",
	});
}

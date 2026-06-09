import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";
const spotlightEnabled = process.env.SENTRY_SPOTLIGHT === "1";

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
	sendDefaultPii: true,
	tracesSampleRate: isDev ? 1.0 : 0.1,
	spotlight: isDev && spotlightEnabled,
});

import posthog from "posthog-js";
import { isAdminPath } from "@/lib/analytics-policy";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

// Separate public/admin root layouts reload the document when crossing this boundary.
// In particular, never initialize on a credential-bearing Sanity callback URL.
if (projectToken && !isAdminPath(window.location.pathname)) {
	posthog.init(projectToken, {
		api_host: "/ingest",
		ui_host: "https://eu.posthog.com",
		defaults: "2026-01-30",
		capture_exceptions: true,
		debug: process.env.NODE_ENV === "development",
		before_send: (event) =>
			isAdminPath(window.location.pathname) ? null : event,
	});
}

import { withPostHogConfig } from "@posthog/nextjs-config";
import type { NextConfig } from "next";

import { getCountrySite } from "./src/lib/country-site";
import { dataset, projectId } from "./src/sanity/env";

// Throws for a missing or invalid COUNTRY_SITE, stopping build, dev and start.
getCountrySite();

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: true,
	skipTrailingSlashRedirect: true, // Needed for PostHog
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: `/images/${projectId}/${dataset}/**`,
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://eu-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/array/:path*",
				destination: "https://eu-assets.i.posthog.com/array/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://eu.i.posthog.com/:path*",
			},
		];
	},
};

const uploadPostHogSourceMaps =
	(process.env.CI === "true" || process.env.CI === "1") &&
	Boolean(process.env.POSTHOG_API_KEY) &&
	Boolean(process.env.POSTHOG_PROJECT_ID);

export default withPostHogConfig(nextConfig, {
	personalApiKey: process.env.POSTHOG_API_KEY ?? "",
	projectId: process.env.POSTHOG_PROJECT_ID,
	host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
	sourcemaps: {
		enabled: uploadPostHogSourceMaps,
	},
});

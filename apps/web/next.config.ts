import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import { dataset, projectId } from "./src/sanity/env";

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: `/images/${projectId}/${dataset}/**`,
			},
		],
	},
};

export default withSentryConfig(nextConfig, {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	silent: !process.env.CI,
	widenClientFileUpload: true,
	tunnelRoute: "/monitoring",
});

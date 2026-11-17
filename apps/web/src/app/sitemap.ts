import type { MetadataRoute } from "next";
import { COUNTRY_SITE_ORIGINS, getCountrySite } from "@/lib/country-site";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/sitemap-query";

// Metadata routes otherwise cache their output independently of public pages.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const countrySite = getCountrySite();
	const pages = await client.fetch(
		SITEMAP_QUERY,
		{ countrySite },
		{
			perspective: "published",
			useCdn: false,
			stega: false,
			cache: "no-store",
		},
	);

	return pages
		.filter(
			({ path }) =>
				// Page slugs use lowercase words joined by hyphens. Reserved routes
				// belong to admin, APIs or analytics even if a CMS import uses them.
				path !== null &&
				/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/.test(path) &&
				!["/admin", "/api", "/ingest"].includes(path),
		)
		.map(({ path }) => ({
			url: `${COUNTRY_SITE_ORIGINS[countrySite]}${path}`,
		}));
}

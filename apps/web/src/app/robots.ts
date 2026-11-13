import type { MetadataRoute } from "next";
import { COUNTRY_SITE_ORIGINS, getCountrySite } from "@/lib/country-site";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
		sitemap: `${COUNTRY_SITE_ORIGINS[getCountrySite()]}/sitemap.xml`,
	};
}

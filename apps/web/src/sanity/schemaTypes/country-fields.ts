import { defineField } from "sanity";

import { COUNTRY_SITE_NAMES, COUNTRY_SITES } from "../../lib/country-site";

const siteOptions = COUNTRY_SITES.map((site) => ({
	title: `${COUNTRY_SITE_NAMES[site]} (${site})`,
	value: site,
}));

export function describeScope(scope: readonly string[] | null | undefined) {
	// Older pages without a saved scope are published to both sites.
	const sites = scope ?? COUNTRY_SITES;
	if (!sites.length) return "No sites selected";
	return COUNTRY_SITES.every((site) => sites.includes(site))
		? "Shared (AU and NZ)"
		: `${sites.join(", ")} only`;
}

/** The Country Sites that publish a page. Other sites return 404 for it. */
export const pagePublishingScope = defineField({
	name: "publishingScope",
	title: "Publishing Scope",
	description:
		"The sites that publish this page at its slug. Other sites return 404 for it.",
	type: "array",
	of: [{ type: "string" }],
	options: { list: siteOptions, layout: "grid" },
	initialValue: [...COUNTRY_SITES],
	// Clearing the last checkbox unsets this field, just like an older page
	// with no saved scope. Neither state can be published without a selection.
	validation: (rule) =>
		rule
			.unique()
			.custom((scope) =>
				scope?.length
					? true
					: "Select Australia, New Zealand, or both before publishing.",
			),
});

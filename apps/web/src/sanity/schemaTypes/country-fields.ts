import { defineField, type FieldDefinition } from "sanity";

import {
	COUNTRY_SITE_NAMES,
	COUNTRY_SITES,
	publishingScopeSites,
	sectionScopeError,
} from "../../lib/country-site";

const siteOptions = COUNTRY_SITES.map((site) => ({
	title: `${COUNTRY_SITE_NAMES[site]} (${site})`,
	value: site,
}));

export function describeScope(scope: readonly string[] | null | undefined) {
	const sites = publishingScopeSites(scope);
	return sites.length === COUNTRY_SITES.length
		? sites.join(" and ")
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
	// Pages saved before this field existed are published to both sites (see
	// publishingScopeSites), but Studio asks editors to choose before the next publish.
	validation: (rule) =>
		rule.unique().custom((scope) => {
			if (!scope)
				return "Choose the sites for this page. Until you do, it is published to AU and NZ.";
			return scope.length ? true : "Choose at least one site.";
		}),
});

/** Narrows a section to one of its page's sites. Empty shows it on all of them. */
export const sectionOnlyOn = defineField({
	name: "onlyOn",
	title: "Show only on",
	description:
		"Leave empty to show this section on every site the page is published to.",
	type: "string",
	options: { list: siteOptions, layout: "dropdown" },
	validation: (rule) =>
		rule.custom(
			(onlyOn, { document }) =>
				sectionScopeError(
					onlyOn,
					document?.publishingScope as string[] | undefined,
				) ?? true,
		),
});

/**
 * Expands one field into a value shared by every Country Site, or separate AU
 * and NZ values. The values sit beside the original field rather than inside a
 * new object, so content saved before a field used this keeps rendering as its
 * shared value without a data migration. For a field named `headline`:
 *
 * - `headline`: the shared value, used while the switch is off
 * - `headlineVariesByCountry`: the switch
 * - `headlineAU`, `headlineNZ`: used while the switch is on. An empty value
 *   shows nothing on that site; it never falls back to the other country.
 *
 * Read it in GROQ with `countryValue()` in queries.ts.
 */
export function sharedOrCountryFields(field: FieldDefinition) {
	const varies = `${field.name}VariesByCountry`;
	const hidden =
		(whenVaries: boolean) =>
		({ parent }: { parent?: Record<string, unknown> }) =>
			Boolean(parent?.[varies]) !== whenVaries;
	return [
		defineField({
			name: varies,
			title: `${field.title}: separate AU and NZ values`,
			type: "boolean",
			initialValue: false,
		}),
		{
			...field,
			title: `${field.title} (AU and NZ)`,
			hidden: hidden(false),
		},
		...COUNTRY_SITES.map((site) => ({
			...field,
			name: `${field.name}${site}`,
			title: `${field.title} (${site})`,
			description: `Shown only on the ${site} site. Leave empty to show nothing there.`,
			hidden: hidden(true),
		})),
	];
}

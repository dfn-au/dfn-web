export const pageFilters = [
	{ id: "all", title: "All pages", filter: '_type == "page"' },
	{
		id: "shared",
		title: "Shared pages",
		// Pages without a saved scope publish to both sites, as in PAGE_QUERY.
		filter:
			'_type == "page" && (!defined(publishingScope) || ("AU" in publishingScope && "NZ" in publishingScope))',
	},
	{
		id: "au",
		title: "AU only",
		filter:
			'_type == "page" && "AU" in publishingScope && !("NZ" in publishingScope)',
	},
	{
		id: "nz",
		title: "NZ only",
		filter:
			'_type == "page" && "NZ" in publishingScope && !("AU" in publishingScope)',
	},
] as const;

export function getPageFilter(scope: string | undefined) {
	return pageFilters.find((filter) => filter.id === scope) ?? pageFilters[0];
}

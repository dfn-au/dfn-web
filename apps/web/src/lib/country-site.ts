export const COUNTRY_SITES = ["AU", "NZ"] as const;
export type CountrySite = (typeof COUNTRY_SITES)[number];

export const COUNTRY_SITE_NAMES: Record<CountrySite, string> = {
	AU: "Australia",
	NZ: "New Zealand",
};

/**
 * Each deployment serves exactly one Country Site, fixed by `COUNTRY_SITE`
 * (ADR 001). Request hostname, headers and visitor location never select it,
 * so this reads only the environment. Matching is exact: `au` is rejected
 * rather than normalised, so a typo can't pass on one deployment and fail on
 * another.
 */
export function parseCountrySite(value: string | undefined): CountrySite {
	const site = COUNTRY_SITES.find((site) => site === value);
	if (site) return site;
	throw new Error(
		`COUNTRY_SITE must be ${COUNTRY_SITES.join(" or ")}, but it is ${
			value === undefined ? "not set" : JSON.stringify(value)
		}. Set it for every deployment, including local development.`,
	);
}

/** next.config.ts calls this so a bad value stops `next build/dev/start`. */
export function getCountrySite(): CountrySite {
	return parseCountrySite(process.env.COUNTRY_SITE);
}

/**
 * The Country Sites in a saved Publishing Scope. Pages saved before Publishing
 * Scope existed have none and are published to every site, so nothing went
 * offline when it was introduced. PAGE_QUERY applies the same rule.
 */
export function publishingScopeSites(
	scope: readonly string[] | null | undefined,
): readonly string[] {
	return scope ?? COUNTRY_SITES;
}

/**
 * A section may narrow its page's Publishing Scope to one site but never
 * extend it (ADR 004). Returns why a section shown only on `onlyOn` can't sit
 * on a page with `pageScope`, or undefined when it can.
 */
export function sectionScopeError(
	onlyOn: string | null | undefined,
	pageScope: readonly string[] | null | undefined,
): string | undefined {
	if (!onlyOn || publishingScopeSites(pageScope).includes(onlyOn)) return;
	return `This page isn't published to ${onlyOn}. A section can only narrow the page's Publishing Scope.`;
}

/** The opening section holds the page's h1, so every site needs it. */
export function openingSectionScopeError(
	onlyOn: string | null | undefined,
	pageScope: readonly string[] | null | undefined,
): string | undefined {
	if (!onlyOn || publishingScopeSites(pageScope).every((s) => s === onlyOn))
		return;
	return "Show the opening section on every site this page is published to. Use separate AU and NZ values inside it instead.";
}

export const COUNTRY_SITES = ["AU", "NZ"] as const;
export type CountrySite = (typeof COUNTRY_SITES)[number];

export const COUNTRY_SITE_NAMES: Record<CountrySite, string> = {
	AU: "Australia",
	NZ: "New Zealand",
};

/**
 * Each deployment serves exactly one Country Site, fixed by `COUNTRY_SITE`
 *. Request hostname, headers and visitor location never select it,
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

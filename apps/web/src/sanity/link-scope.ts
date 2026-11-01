import { COUNTRY_SITES, type CountrySite } from "../lib/country-site";

export type LinkOwner = { _type?: string; publishingScope?: unknown };

/** Menu scope belongs to the containing list, including its submenu links. */
export function linkCountries(
	document: LinkOwner | undefined,
	path: readonly unknown[],
): readonly CountrySite[] {
	if (document?._type === "page") {
		return document.publishingScope == null
			? COUNTRY_SITES
			: COUNTRY_SITES.filter(
					(site) =>
						Array.isArray(document.publishingScope) &&
						document.publishingScope.includes(site),
				);
	}
	const countryList = path.find(
		(part) =>
			typeof part === "string" &&
			/^(navigation|legalNavigation)(AU|NZ)$/.test(part),
	);
	return typeof countryList === "string"
		? COUNTRY_SITES.filter((site) => countryList.endsWith(site))
		: COUNTRY_SITES;
}

// The homepage is a singleton on both sites. Older pages without scope are shared.
export const LINK_TARGET_FILTER = `(
  (_type == "homePage" && _id in ["homePage", "drafts.homePage"]) ||
  (_type == "page" && defined(slug.current) &&
    (!defined(publishingScope) ||
      (!("AU" in $sites) || "AU" in publishingScope) &&
      (!("NZ" in $sites) || "NZ" in publishingScope)))
)`;

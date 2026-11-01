import { defineField } from "sanity";
import { COUNTRY_SITE_NAMES } from "../../lib/country-site";
import { COMPATIBLE_LINK_TARGET_QUERY } from "../lib/link-queries";
import { LINK_TARGET_FILTER, linkCountries } from "../link-scope";

/** Keep URL fields in place so existing content works before migration. */
export function linkFields({
	pageName = "page",
	urlName = "href",
	pageTitle = "Page",
	urlTitle = "URL or anchor",
	required = true,
}: {
	pageName?: string;
	urlName?: string;
	pageTitle?: string;
	urlTitle?: string;
	required?: boolean;
} = {}) {
	return [
		defineField({
			name: pageName,
			title: pageTitle,
			type: "reference",
			to: [{ type: "page" }, { type: "homePage" }],
			description:
				"Choose a page, or leave this blank and enter a URL or anchor below.",
			options: {
				disableNew: true,
				filter: ({ document, parentPath }) => ({
					filter: LINK_TARGET_FILTER,
					params: { sites: linkCountries(document, parentPath) },
				}),
			},
			validation: (rule, context) =>
				context?.hidden
					? rule.skip()
					: rule.custom(async (reference, context) => {
							if (!reference?._ref) return true;
							const sites = linkCountries(context.document, context.path ?? []);
							const target = await context
								.getClient({ apiVersion: "2026-06-10" })
								.withConfig({ perspective: "published", useCdn: false })
								.fetch(COMPATIBLE_LINK_TARGET_QUERY, {
									id: reference._ref.replace(/^drafts\./, ""),
									sites,
								});
							return (
								Boolean(target) ||
								`Choose a published page available on ${sites.map((site) => COUNTRY_SITE_NAMES[site]).join(" and ")}.`
							);
						}),
		}),
		defineField({
			name: urlName,
			title: urlTitle,
			type: "url",
			description:
				"Enter a web address or a homepage section link such as #dh-work, #dh-involved, #dh-signup or #dh-contact. Use # for a placeholder.",
			hidden: ({ parent }) => Boolean(parent?.[pageName]),
			validation: (rule, context) =>
				context?.hidden
					? rule.skip()
					: (required ? rule.required() : rule).uri({
							allowRelative: true,
							scheme: ["http", "https"],
						}),
		}),
	];
}

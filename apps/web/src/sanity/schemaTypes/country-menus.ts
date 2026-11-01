import { defineArrayMember, defineField, type StringInputProps } from "sanity";
import { COUNTRY_SITE_NAMES, COUNTRY_SITES } from "../../lib/country-site";

// Existing documents have no saved mode. Display the same default used by GROQ
// without creating a draft or modifying their stored menus.
function MenuModeInput(props: StringInputProps) {
	return props.renderDefault({ ...props, value: props.value ?? "shared" });
}

/** Keep existing lists as the shared menu; older documents have no mode. */
export function countryMenuFields(
	name: string,
	title: string,
	itemType = "homepageNavigationLink",
) {
	const mode = `${name}Mode`;
	return [
		defineField({
			name: mode,
			title,
			type: "string",
			initialValue: "shared",
			components: { input: MenuModeInput },
			options: {
				layout: "radio",
				list: [
					{ title: "Same on both sites", value: "shared" },
					{ title: "Different by country", value: "country" },
				],
			},
		}),
		...([undefined, ...COUNTRY_SITES] as const).map((site) =>
			defineField({
				name: site ? `${name}${site}` : name,
				title: `${title} (${site ? COUNTRY_SITE_NAMES[site] : "both sites"})`,
				type: "array",
				of: [defineArrayMember({ type: itemType })],
				hidden: ({ parent }) =>
					Boolean(site) !== (parent?.[mode] === "country"),
				validation: (rule, context) =>
					context?.hidden
						? rule.skip()
						: rule
								.required()
								.min(1)
								.error(
									`Add at least one link to the ${site ? COUNTRY_SITE_NAMES[site] : "shared"} menu.`,
								),
			}),
		),
	];
}

import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

import { openingSectionScopeError } from "../../../lib/country-site";
import {
	describeScope,
	pagePublishingScope,
	sharedOrCountryFields,
} from "../country-fields";
import { pageSectionNames } from "../objects/pageSections";

export const page = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: DocumentTextIcon,
	initialValue: {
		sections: [
			{ _key: "page-title", _type: "pageTitle" },
			{ _key: "page-body", _type: "richTextSection", body: [] },
		],
	},
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
			},
			validation: (rule) =>
				rule.required().custom((slug) => {
					if (!slug?.current) return true;
					if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current))
						return "Use a single path such as privacy or our-story.";
					if (["admin", "api"].includes(slug.current))
						return "This path is reserved by the website.";
					return true;
				}),
		}),
		pagePublishingScope,
		// The title stays shared because it is the slug source and Studio list
		// title. The browser title is the part that can differ by country.
		...sharedOrCountryFields(
			defineField({
				name: "browserTitle",
				title: "Browser title",
				type: "string",
				description: "Leave empty to use the page title.",
			}),
		),
		...sharedOrCountryFields(
			defineField({
				name: "description",
				title: "Search description",
				type: "text",
				rows: 3,
				description: "A short summary for search results and link previews.",
			}),
		),
		defineField({
			name: "sections",
			title: "Sections",
			type: "array",
			of: pageSectionNames.map((type) => defineArrayMember({ type })),
			validation: (rule) =>
				rule
					.required()
					.min(1)
					.custom((sections, { document }) => {
						if (!sections?.length) return true;
						const openings = sections.filter(
							(section) =>
								typeof section === "object" &&
								section !== null &&
								"_type" in section &&
								["pageTitle", "introSection"].includes(String(section._type)),
						);
						if (openings.length !== 1 || openings[0] !== sections[0])
							return "Start with one Page title or Introduction with image section.";
						return (
							openingSectionScopeError(
								(sections[0] as { onlyOn?: string }).onlyOn,
								document?.publishingScope as string[] | undefined,
							) ?? true
						);
					}),
		}),
	],
	preview: {
		select: {
			title: "title",
			slug: "slug.current",
			scope: "publishingScope",
		},
		prepare({ title, slug, scope }) {
			return {
				title,
				subtitle: `${slug ? `/${slug}` : "No slug"} · ${describeScope(scope)}`,
			};
		},
	},
});

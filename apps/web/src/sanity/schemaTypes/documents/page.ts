import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

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
					if (
						["admin", "api", "design-refresh", "tailwind-migration"].includes(
							slug.current,
						)
					)
						return "This path is reserved by the website.";
					return true;
				}),
		}),
		defineField({
			name: "description",
			title: "Search description",
			type: "text",
			rows: 3,
			description: "A short summary for search results and link previews.",
		}),
		defineField({
			name: "sections",
			title: "Sections",
			type: "array",
			of: pageSectionNames.map((type) => defineArrayMember({ type })),
			validation: (rule) =>
				rule
					.required()
					.min(1)
					.custom((sections) => {
						if (!sections?.length) return true;
						const openings = sections.filter(
							(section) =>
								typeof section === "object" &&
								section !== null &&
								"_type" in section &&
								["pageTitle", "introSection"].includes(String(section._type)),
						);
						return openings.length === 1 && openings[0] === sections[0]
							? true
							: "Start with one Page title or Introduction with image section.";
					}),
		}),
	],
	preview: {
		select: {
			title: "title",
			slug: "slug.current",
		},
		prepare({ title, slug }) {
			return {
				title,
				subtitle: slug ? `/${slug}` : "No slug",
			};
		},
	},
});

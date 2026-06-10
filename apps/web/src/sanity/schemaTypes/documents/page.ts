import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: DocumentTextIcon,
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
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "blockContent",
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

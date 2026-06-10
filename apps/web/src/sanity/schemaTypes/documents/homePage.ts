import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
	name: "homePage",
	title: "Home Page",
	type: "document",
	icon: HomeIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
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
		},
		prepare({ title }) {
			return {
				title: title ?? "Home Page",
			};
		},
	},
});

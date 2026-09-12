import {
	BlockContentIcon,
	DocumentTextIcon,
	ImageIcon,
	LinkIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, title: string) =>
	defineField({ name, title, type: "string" });
const headline = defineField({
	name: "headline",
	title: "Headline",
	type: "text",
	rows: 2,
});
const body = (name = "body", title = "Body") =>
	defineField({ name, title, type: "blockContent" });
const navigationLabel = defineField({
	name: "navigationLabel",
	title: "Section navigation label",
	type: "string",
	description:
		"Fill this in to include this section in an On this page menu. Links follow the page's section order.",
});
const copy = [text("eyebrow", "Eyebrow"), headline, body()];
const image = defineField({
	name: "image",
	title: "Image",
	type: "sectionImage",
});
const items = defineField({
	name: "items",
	title: "Items",
	type: "array",
	of: [defineArrayMember({ type: "sectionItem" })],
});
const link = (name: string, title: string) =>
	defineField({ name, title, type: "homepageNavigationLink" });
const section = (
	name: string,
	title: string,
	fields: ReturnType<typeof defineField>[],
) =>
	defineType({
		name,
		title,
		type: "object",
		icon: BlockContentIcon,
		fields: [navigationLabel, ...fields],
		preview: {
			select: { title: "headline", label: "navigationLabel", media: "image" },
			prepare({ title: heading, label, media }) {
				return { title: heading || label || title, subtitle: title, media };
			},
		},
	});
export const pageSections = [
	defineType({
		name: "sectionImage",
		title: "Image",
		type: "image",
		icon: ImageIcon,
		options: { hotspot: true },
		fields: [
			defineField({
				name: "alt",
				title: "Alternative text",
				type: "string",
				validation: (rule) => rule.required(),
			}),
			text("caption", "Caption"),
		],
	}),
	defineType({
		name: "sectionItem",
		title: "Item",
		type: "object",
		icon: DocumentTextIcon,
		fields: [text("title", "Title"), body()],
		preview: { select: { title: "title" } },
	}),
	section("pageTitle", "Page title", [headline]),
	section("richTextSection", "Rich text", [body()]),
	section("introSection", "Introduction with image", [
		text("eyebrow", "Eyebrow"),
		headline,
		text("accentText", "Highlighted headline ending"),
		defineField({ name: "lead", title: "Introduction", type: "text", rows: 3 }),
		body(),
		image,
	]),
	defineType({
		name: "sectionNavigation",
		title: "On this page",
		type: "object",
		icon: LinkIcon,
		fields: [
			defineField({
				name: "label",
				title: "Menu label",
				type: "string",
				initialValue: "On this page",
				readOnly: true,
				hidden: true,
			}),
		],
		preview: {
			prepare: () => ({
				title: "On this page",
				subtitle: "Links to sections with navigation labels",
			}),
		},
	}),
	section("imageTextSection", "Text with image", [
		...copy,
		image,
		text("noteTitle", "Image note heading"),
		body("noteBody", "Image note"),
	]),
	section("statementSection", "Statement", [
		...copy,
		text("statementLabel", "Statement label"),
		defineField({
			name: "statement",
			title: "Statement",
			type: "text",
			rows: 4,
		}),
		text("attribution", "Attribution"),
	]),
	section("numberedSection", "Numbered items", [
		...copy,
		link("link", "Link"),
		items,
	]),
	section("valuesSection", "Values", [...copy, items]),
	section("actionSection", "Call to action", [
		...copy,
		defineField({
			name: "links",
			title: "Links",
			type: "array",
			of: [defineArrayMember({ type: "homepageNavigationLink" })],
		}),
		text("actionTitle", "Action heading"),
		body("actionBody", "Action body"),
		link("primaryAction", "Primary action"),
		link("secondaryAction", "Secondary action"),
	]),
];
export const pageSectionNames = [
	"pageTitle",
	"introSection",
	"sectionNavigation",
	"richTextSection",
	"imageTextSection",
	"statementSection",
	"numberedSection",
	"valuesSection",
	"actionSection",
];

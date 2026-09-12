import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
	name: "homePage",
	title: "Home Page",
	type: "document",
	icon: HomeIcon,
	groups: [
		{ name: "content", title: "Homepage", default: true },
		{ name: "chrome", title: "Header and footer" },
		{ name: "search", title: "Search appearance" },
	],
	fields: [
		defineField({
			name: "title",
			title: "Page title",
			type: "string",
			group: "search",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			type: "text",
			rows: 3,
			group: "search",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "hero",
			type: "homepageHero",
			group: "content",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "introduction",
			type: "homepageIntroduction",
			group: "content",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "areas",
			title: "Areas of work",
			type: "array",
			group: "content",
			description:
				"Add, remove or reorder areas here. Navigation and numbering follow this order. Update any copy mentioning the number of areas when it changes.",
			of: [defineArrayMember({ type: "programmeFeature" })],
			validation: (rule) => rule.required().min(1),
		}),
		defineField({
			name: "featuredExample",
			type: "homepageExample",
			group: "content",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "involvement",
			type: "homepageInvolvement",
			group: "content",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "signup",
			type: "homepageSignup",
			group: "content",
			description:
				"The form is a local demo. It does not send details or create subscriptions.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "header",
			type: "homepageHeader",
			group: "chrome",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "footer",
			type: "homepageFooter",
			group: "chrome",
			validation: (rule) => rule.required(),
		}),
	],
	preview: { select: { title: "title" } },
});

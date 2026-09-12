import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { ImageIcon } from "@sanity/icons/Image";
import { LinkIcon } from "@sanity/icons/Link";
import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, title: string) =>
	defineField({
		name,
		title,
		type: "string",
		validation: (rule) => rule.required(),
	});
const headline = defineField({
	name: "headline",
	title: "Headline",
	type: "text",
	rows: 2,
	description:
		"Use a new line for an intentional line break. Typography and layout are controlled by the website.",
	validation: (rule) => rule.required(),
});
const description = defineField({
	name: "description",
	title: "Description",
	type: "text",
	rows: 3,
	validation: (rule) => rule.required(),
});
const body = defineField({
	name: "body",
	title: "Body",
	type: "homepageRichText",
	validation: (rule) => rule.required().min(1),
});
const introductionFields = [text("eyebrow", "Eyebrow"), headline, description];

const navigationFields = [
	text("label", "Label"),
	defineField({
		name: "href",
		title: "Destination",
		type: "url",
		initialValue: "#",
		description:
			"Use # for pages that are not ready yet. Homepage sections: #dh-work, #dh-involved, #dh-signup, #dh-contact.",
		validation: (rule) =>
			rule.required().uri({ allowRelative: true, scheme: ["http", "https"] }),
	}),
];
const navigation = (
	name: string,
	title: string,
	itemType = "homepageNavigationLink",
) =>
	defineField({
		name,
		title,
		type: "array",
		of: [defineArrayMember({ type: itemType })],
	});

export const homepageObjects = [
	defineType({
		name: "homepageAddress",
		title: "Address",
		type: "array",
		icon: DocumentTextIcon,
		of: [
			defineArrayMember({
				type: "block",
				styles: [{ title: "Normal", value: "normal" }],
				lists: [],
				marks: { decorators: [], annotations: [] },
			}),
		],
	}),
	defineType({
		name: "homepageNavigationLink",
		title: "Link",
		type: "object",
		icon: LinkIcon,
		fields: navigationFields,
		preview: { select: { title: "label", subtitle: "href" } },
	}),
	defineType({
		name: "homepageHeaderChildLink",
		title: "Submenu link",
		type: "object",
		icon: LinkIcon,
		fields: [
			...navigationFields,
			defineField({
				name: "groupLabel",
				title: "Group label",
				type: "string",
				description:
					"Optional text such as Events or Ongoing support. Use the same label on consecutive links to group them visually; it does not create another submenu.",
			}),
		],
		preview: { select: { title: "label", subtitle: "href" } },
	}),
	defineType({
		name: "homepageHeaderLink",
		title: "Navigation item",
		type: "object",
		icon: LinkIcon,
		fields: [
			text("label", "Label"),
			defineField({
				name: "href",
				title: "Destination",
				type: "url",
				description:
					"For a direct link only. To make this item open a submenu, clear this destination and add child links below. Add any overview page as the first child link.",
				validation: (rule) =>
					rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
			}),
			defineField({
				name: "headline",
				title: "Submenu headline",
				type: "string",
			}),
			defineField({
				name: "description",
				title: "Submenu introduction",
				type: "text",
				rows: 3,
			}),
			defineField({
				name: "children",
				title: "Child links",
				type: "array",
				description:
					"The category label opens these links on desktop and mobile. Child links cannot contain further submenus.",
				of: [defineArrayMember({ type: "homepageHeaderChildLink" })],
				validation: (rule) => rule.min(1),
			}),
			defineField({
				name: "mobileOnly",
				title: "Show only in the mobile menu",
				type: "boolean",
				deprecated: {
					reason: "Navigation is now shared across desktop and mobile.",
				},
				readOnly: true,
				hidden: ({ value }) => value === undefined,
			}),
		],
		validation: (rule) =>
			rule.custom((item) => {
				if (!item) return true;
				const hasChildren =
					Array.isArray(item.children) && item.children.length > 0;
				if (hasChildren && item.href)
					return "Clear the category destination and include its overview page as a child link.";
				if (!hasChildren && !item.href)
					return "Add a destination or at least one child link.";
				return true;
			}),
		preview: { select: { title: "label", subtitle: "href" } },
	}),
	defineType({
		name: "homepageRichText",
		title: "Body",
		type: "array",
		icon: DocumentTextIcon,
		of: [
			defineArrayMember({
				type: "block",
				styles: [{ title: "Normal", value: "normal" }],
				lists: [],
				marks: {
					decorators: [
						{ title: "Bold", value: "strong" },
						{ title: "Italic", value: "em" },
					],
					annotations: [],
				},
			}),
		],
	}),
	defineType({
		name: "homepagePhotograph",
		title: "Photograph",
		type: "image",
		icon: ImageIcon,
		options: { hotspot: true },
		fields: [text("alt", "Alternative text")],
		validation: (rule) =>
			rule.custom((image) =>
				!image || image.asset ? true : "Choose a photograph.",
			),
	}),
	defineType({
		name: "homepageHero",
		title: "Hero",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			...introductionFields,
			defineField({
				name: "photograph",
				type: "homepagePhotograph",
				validation: (rule) => rule.required(),
			}),
			text("actionLabel", "Action label"),
		],
	}),
	defineType({
		name: "homepageIntroduction",
		title: "Introduction",
		type: "object",
		icon: DocumentTextIcon,
		fields: introductionFields,
	}),
	defineType({
		name: "programmePathway",
		title: "Pathway",
		type: "object",
		icon: DocumentTextIcon,
		fields: [text("title", "Title"), description],
	}),
	defineType({
		name: "programmeFeature",
		title: "Area of work",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			text("label", "Area name"),
			headline,
			body,
			text("actionLabel", "Action label"),
			defineField({
				name: "contentType",
				title: "Supporting content",
				type: "string",
				options: {
					list: [
						{ title: "Photograph", value: "photograph" },
						{ title: "Pathways", value: "pathways" },
					],
					layout: "radio",
				},
				initialValue: "photograph",
				validation: (rule) => rule.required(),
			}),
			defineField({
				name: "photograph",
				type: "homepagePhotograph",
				hidden: ({ parent }) => parent?.contentType !== "photograph",
				validation: (rule) =>
					rule.custom((image, context) =>
						(context.parent as { contentType?: string })?.contentType !==
							"photograph" || image
							? true
							: "Choose a photograph for this area.",
					),
			}),
			defineField({
				name: "pathways",
				type: "array",
				of: [defineArrayMember({ type: "programmePathway" })],
				hidden: ({ parent }) => parent?.contentType !== "pathways",
				validation: (rule) =>
					rule.custom((items, context) =>
						(context.parent as { contentType?: string })?.contentType !==
							"pathways" || (items?.length ?? 0) > 0
							? true
							: "Add at least one pathway.",
					),
			}),
		],
		preview: {
			select: { title: "label", subtitle: "headline", media: "photograph" },
		},
	}),
	defineType({
		name: "homepageExample",
		title: "Featured example",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			text("eyebrow", "Eyebrow"),
			headline,
			body,
			text("actionLabel", "Action label"),
		],
	}),
	defineType({
		name: "involvementOpportunity",
		title: "Opportunity",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			text("title", "Title"),
			description,
			text("actionLabel", "Action label"),
		],
	}),
	defineType({
		name: "homepageInvolvement",
		title: "Get involved",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			text("eyebrow", "Eyebrow"),
			headline,
			text("actionLabel", "Donation action label"),
			defineField({
				name: "opportunities",
				type: "array",
				of: [defineArrayMember({ type: "involvementOpportunity" })],
				validation: (rule) => rule.required().min(1),
			}),
		],
	}),
	defineType({
		name: "homepageSignup",
		title: "Signup",
		type: "object",
		icon: DocumentTextIcon,
		fields: [...introductionFields, text("actionLabel", "Button label")],
	}),
	defineType({
		name: "homepageHeader",
		title: "Header",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			navigation("navigation", "Navigation links", "homepageHeaderLink"),
			defineField({
				name: "menuHeading",
				title: "Mobile menu heading",
				type: "string",
			}),
			text("give", "Give label"),
			defineField({
				name: "giveHref",
				title: "Give destination",
				type: "url",
				initialValue: "https://dfn.org.au/donate/",
				description:
					"The direct donation flow. Existing headers without this field continue to use https://dfn.org.au/donate/.",
				validation: (rule) =>
					rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
			}),
		],
	}),
	defineType({
		name: "homepageOffice",
		title: "Office",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			text("country", "Country"),
			defineField({
				name: "address",
				title: "Address",
				type: "homepageAddress",
				description:
					"Shift+Enter adds an address line; Enter starts a new paragraph.",
				validation: (rule) => rule.required().min(1),
			}),
			text("phone", "Phone display text"),
			defineField({
				name: "tel",
				title: "Dialling number",
				type: "string",
				description: "Digits with an optional leading +.",
				validation: (rule) => rule.required().regex(/^\+?[0-9]+$/),
			}),
			defineField({
				name: "email",
				type: "string",
				validation: (rule) => rule.required().email(),
			}),
		],
		preview: { select: { title: "country" } },
	}),
	defineType({
		name: "homepageFooter",
		title: "Footer",
		type: "object",
		icon: DocumentTextIcon,
		fields: [
			defineField({
				name: "summary",
				type: "text",
				rows: 3,
				validation: (rule) => rule.required(),
			}),
			text("navigationTitle", "Navigation heading"),
			navigation("navigation", "Navigation links"),
			defineField({
				name: "offices",
				type: "array",
				of: [defineArrayMember({ type: "homepageOffice" })],
				validation: (rule) => rule.required().min(1),
			}),
			navigation("legalNavigation", "Legal links"),
			text("copyright", "Copyright notice"),
		],
	}),
];

import { ImageIcon, LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
	name: "blockContent",
	title: "Block content",
	type: "array",
	of: [
		defineArrayMember({
			type: "block",
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "Heading", value: "h2" },
				{ title: "Subheading", value: "h3" },
				{ title: "Quote", value: "blockquote" },
			],
			lists: [
				{ title: "Bullet", value: "bullet" },
				{ title: "Numbered", value: "number" },
			],
			marks: {
				decorators: [
					{ title: "Strong", value: "strong" },
					{ title: "Emphasis", value: "em" },
				],
				annotations: [
					defineField({
						name: "link",
						title: "Link",
						type: "object",
						icon: LinkIcon,
						fields: [
							defineField({
								name: "href",
								title: "URL",
								type: "url",
								validation: (rule) =>
									rule.uri({
										allowRelative: true,
										scheme: ["http", "https", "mailto", "tel"],
									}),
							}),
						],
					}),
				],
			},
		}),
		defineArrayMember({
			type: "image",
			icon: ImageIcon,
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					title: "Alternative text",
					type: "string",
					description: "Describe the image for screen readers and search engines.",
					validation: (rule) =>
						rule.required().warning("Alt text is important for accessibility"),
				}),
				defineField({
					name: "caption",
					title: "Caption",
					type: "string",
				}),
			],
		}),
	],
});

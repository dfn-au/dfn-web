import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType, type FileValue } from "sanity";

export const downloadItem = defineType({
	name: "downloadItem",
	title: "Download",
	type: "object",
	icon: DocumentTextIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Use a descriptive title, such as Annual report 2025.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "date",
			title: "Publication date",
			type: "date",
			description:
				"Optional. Leave empty if the publication date is not known.",
		}),
		defineField({
			name: "file",
			title: "File",
			type: "file",
			description:
				"Upload an approved public resource, or use the resource URL below. Uploaded files are publicly accessible.",
		}),
		defineField({
			name: "url",
			title: "Existing resource URL",
			type: "url",
			description:
				"Use a permanent public http or https URL. Do not use private or expiring sharing links.",
			validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
		}),
	],
	validation: (rule) =>
		rule.custom<{ file?: FileValue; url?: string }>((value) => {
			const file = Boolean(value?.file?.asset?._ref);
			const url = Boolean(value?.url);
			return (
				file !== url ||
				"Choose either a file or an existing resource URL, not both."
			);
		}),
	preview: {
		select: {
			title: "title",
			date: "date",
			filename: "file.asset.originalFilename",
			url: "url",
		},
		prepare({ title, date, filename, url }) {
			return {
				title: title || "Untitled download",
				subtitle: [date, filename || url].filter(Boolean).join(" · "),
			};
		},
	},
});

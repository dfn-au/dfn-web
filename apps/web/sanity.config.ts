"use client";

/**
 * This configuration is used for the Sanity Studio mounted at `/admin/studio`.
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import {
	defineDocuments,
	defineLocations,
	presentationTool,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, previewUrl, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { HOME_PAGE_DOCUMENT_ID } from "./src/sanity/singletons";
import { structure } from "./src/sanity/structure";

const mainDocuments = defineDocuments([
	{
		route: "/",
		filter: `_id == "${HOME_PAGE_DOCUMENT_ID}"`,
	},
	{
		route: "/:slug",
		filter: `_type == "page" && slug.current == $slug`,
	},
]);

const locations = {
	homePage: defineLocations({
		locations: [{ title: "Home Page", href: "/" }],
	}),
	page: defineLocations({
		select: {
			title: "title",
			slug: "slug.current",
		},
		resolve: (doc) => {
			if (!doc?.slug) {
				return {
					message: "Set a slug to preview this page.",
					tone: "caution",
				};
			}

			return {
				locations: [{ title: doc.title || "Untitled", href: `/${doc.slug}` }],
			};
		},
	}),
};

export default defineConfig({
	basePath: "/admin/studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder.
	schema,
	plugins: [
		presentationTool({
			previewUrl: {
				initial: previewUrl,
				previewMode: {
					enable: "/api/draft-mode/enable",
				},
			},
			resolve: {
				mainDocuments,
				locations,
			},
		}),
		structureTool({ structure }),
		media(),
		// Vision is for querying with GROQ from inside the Studio.
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
});

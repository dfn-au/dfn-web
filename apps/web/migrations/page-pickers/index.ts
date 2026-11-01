import { defineMigration, patch } from "sanity/migrate";
import { PUBLISHED_LINK_TARGETS_QUERY } from "../../src/sanity/lib/link-queries";
import { pageLinkPatches } from "./links";

export default defineMigration({
	title: "Replace existing relative page links with page references",
	documentTypes: ["homePage", "page"],
	migrate: {
		async document(document, context) {
			const targets = await context.client.fetch(PUBLISHED_LINK_TARGETS_QUERY);
			const patches = pageLinkPatches(document, targets);
			// Abort on concurrent edits rather than overwriting a newer destination.
			return patches.length
				? patch(document._id, patches, { ifRevision: document._rev })
				: [];
		},
	},
});

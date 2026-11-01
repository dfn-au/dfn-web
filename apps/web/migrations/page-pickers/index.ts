import { defineMigration, patch } from "sanity/migrate";
import { type LinkTarget, pageLinkPatches } from "./links";

export default defineMigration({
	title: "Replace existing relative page links with page references",
	documentTypes: ["homePage", "page"],
	migrate: {
		async document(document, context) {
			const targets = await context.client.fetch<LinkTarget[]>(`*[
              !(_id in path("drafts.**")) && !(_id in path("versions.**")) &&
              ((_type == "homePage" && _id == "homePage") || (_type == "page" && defined(slug.current)))
            ]{_id, _type, slug, publishingScope}`);
			const patches = pageLinkPatches(document, targets);
			// Abort on concurrent edits rather than overwriting a newer destination.
			return patches.length
				? patch(document._id, patches, { ifRevision: document._rev })
				: [];
		},
	},
});

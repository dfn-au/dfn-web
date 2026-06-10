import { DocumentTextIcon } from "@sanity/icons";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

function createSingleton(S: StructureBuilder, typeName: string, title: string) {
	return S.listItem()
		.title(title)
		.child(S.document().schemaType(typeName).documentId(typeName).title(title));
}

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			createSingleton(S, "homePage", "Home Page"),
			S.divider(),
			S.documentTypeListItem("page").title("Pages").icon(DocumentTextIcon),
		]);

import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";
import { getPageFilter } from "./page-filters";

function createSingleton(S: StructureBuilder, typeName: string, title: string) {
	return S.listItem()
		.title(title)
		.child(S.document().schemaType(typeName).documentId(typeName).title(title));
}

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const createStructure =
	(scope?: string): StructureResolver =>
	(S) =>
		S.list()
			.title("Content")
			.items([
				createSingleton(S, "homePage", "Home Page"),
				S.divider(),
				S.documentTypeListItem("page")
					.title("Pages")
					.icon(DocumentTextIcon)
					.child(
						S.documentTypeList("page")
							.title("Pages")
							.apiVersion(apiVersion)
							.filter(getPageFilter(scope).filter),
					),
			]);

export const structure = createStructure();

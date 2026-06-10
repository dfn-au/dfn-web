import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./documents/homePage";
import { page } from "./documents/page";
import { blockContent } from "./objects/blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homePage, page, blockContent],
};

import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./documents/homePage";
import { page } from "./documents/page";
import { blockContent } from "./objects/blockContent";
import { homepageObjects } from "./objects/homepage";
import { pageSections } from "./objects/pageSections";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homePage, page, blockContent, ...homepageObjects, ...pageSections],
};

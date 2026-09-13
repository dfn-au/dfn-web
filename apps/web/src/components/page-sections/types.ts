import type { PAGE_QUERY_RESULT } from "@/sanity/types";

export type PageSection = NonNullable<
	NonNullable<PAGE_QUERY_RESULT>["sections"]
>[number];
export type SectionImage = NonNullable<
	Extract<PageSection, { _type: "introSection" }>["image"]
>;
export type SectionLink = NonNullable<
	Extract<PageSection, { _type: "actionSection" }>["primaryAction"]
>;
export type SectionBody = NonNullable<
	Extract<PageSection, { _type: "richTextSection" }>["body"]
>;

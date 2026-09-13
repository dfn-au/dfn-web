import type { HomePage } from "@/sanity/lib/queries";

export type HomepageContent = HomePage;
export type AreaContent = NonNullable<HomepageContent["areas"]>[number];
export type HomepageImage = NonNullable<
	NonNullable<HomepageContent["hero"]>["photograph"]
>;
export type HeaderContent = NonNullable<HomepageContent["header"]>;
export type HeaderNavigationItem = NonNullable<
	HeaderContent["navigation"]
>[number];
export type HeaderChildLink = NonNullable<
	HeaderNavigationItem["children"]
>[number];
export type FooterContent = NonNullable<HomepageContent["footer"]>;
export type NavigationItem = NonNullable<FooterContent["navigation"]>[number];

// Keep anchors stable when editors change labels or reorder areas. Sanity keys
// are content identity; programme numbering is derived from the current order.
export function areaAnchor(area: Pick<AreaContent, "_key">) {
	return `area-${area._key}`;
}

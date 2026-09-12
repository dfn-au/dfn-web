import type { Palette } from "@/app/design-refresh/palettes";

// Carry the reviewed palette between public pages without changing placeholders,
// local anchors, phone/email links or external destinations.
export function publicNavigationHref(
	href: string,
	palette: Palette,
	controlsVisible: boolean,
) {
	if (!href.startsWith("/") || href.startsWith("//")) return href;
	const url = new URL(href, "https://local.invalid");
	if (palette !== "charcoal") url.searchParams.set("variant", palette);
	if (!controlsVisible) url.searchParams.set("clean", "1");
	return `${url.pathname}${url.search}${url.hash}`;
}

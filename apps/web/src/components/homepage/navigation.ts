import {
	type BodyPreview,
	type BrandPreview,
	type HeadingPreview,
	type IconPreview,
	type LabelPreview,
	type LogoPreview,
	previewDefaults,
} from "@/components/site/brand-preview";
import type { Palette } from "@/components/site/palettes";

// Carry the reviewed palette and brand comparison between pages without changing placeholders,
// local anchors, phone/email links or external destinations.
export function publicNavigationHref(
	href: string,
	palette: Palette,
	controlsVisible: boolean,
	brandPreview: BrandPreview = previewDefaults.brand,
	headingPreview: HeadingPreview = previewDefaults.headings,
	bodyPreview: BodyPreview = previewDefaults.body,
	logoPreview: LogoPreview = previewDefaults.logo,
	labelPreview: LabelPreview = previewDefaults.labels,
	iconPreview: IconPreview = previewDefaults.icons,
) {
	if (!href.startsWith("/") || href.startsWith("//")) return href;
	const url = new URL(href, "https://local.invalid");
	if (palette !== "charcoal") url.searchParams.set("variant", palette);
	if (!controlsVisible) url.searchParams.set("clean", "1");
	if (brandPreview !== previewDefaults.brand)
		url.searchParams.set("brand", brandPreview);
	else url.searchParams.delete("brand");
	if (headingPreview !== previewDefaults.headings)
		url.searchParams.set("headings", headingPreview);
	else url.searchParams.delete("headings");
	if (bodyPreview !== previewDefaults.body)
		url.searchParams.set("body", bodyPreview);
	else url.searchParams.delete("body");
	if (logoPreview !== previewDefaults.logo)
		url.searchParams.set("logo", logoPreview);
	else url.searchParams.delete("logo");
	if (labelPreview !== previewDefaults.labels)
		url.searchParams.set("labels", labelPreview);
	else url.searchParams.delete("labels");
	if (iconPreview !== previewDefaults.icons)
		url.searchParams.set("icons", iconPreview);
	else url.searchParams.delete("icons");
	return `${url.pathname}${url.search}${url.hash}`;
}

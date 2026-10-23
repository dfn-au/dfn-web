// Missing or invalid URL choices use the selected site defaults. "current" remains
// an explicit option for the original design, including when it is not the default.
export const previewDefaults = {
	brand: "white-text",
	headings: "existing",
	body: "andada",
	logo: "current",
	labels: "vinyl",
	icons: "guide",
} as const;

export const brandPreviews = ["current", "proposed", "white-text"] as const;
export type BrandPreview = (typeof brandPreviews)[number];

// Keep existing ?brand=proposed links on the dark-text comparison.
export function resolveBrandPreview(value: unknown): BrandPreview {
	return (
		brandPreviews.find((preview) => preview === value) ?? previewDefaults.brand
	);
}

// Heading comparisons stay independent of body, label and navigation fonts.
export const headingPreviews = ["current", "existing", "battersea"] as const;
export type HeadingPreview = (typeof headingPreviews)[number];

export function resolveHeadingPreview(value: unknown): HeadingPreview {
	return (
		headingPreviews.find((preview) => preview === value) ??
		previewDefaults.headings
	);
}

export const bodyPreviews = ["current", "andada"] as const;
export type BodyPreview = (typeof bodyPreviews)[number];

export function resolveBodyPreview(value: unknown): BodyPreview {
	return (
		bodyPreviews.find((preview) => preview === value) ?? previewDefaults.body
	);
}

export type LogoPreview = "current" | "guide";
export function resolveLogoPreview(value: unknown): LogoPreview {
	return value === "guide" ? "guide" : previewDefaults.logo;
}

export const labelPreviews = ["current", "vinyl"] as const;
export type LabelPreview = (typeof labelPreviews)[number];
export function resolveLabelPreview(value: unknown): LabelPreview {
	return (
		labelPreviews.find((preview) => preview === value) ?? previewDefaults.labels
	);
}

export const iconPreviews = ["current", "guide"] as const;
export type IconPreview = (typeof iconPreviews)[number];
export function resolveIconPreview(value: unknown): IconPreview {
	return (
		iconPreviews.find((preview) => preview === value) ?? previewDefaults.icons
	);
}

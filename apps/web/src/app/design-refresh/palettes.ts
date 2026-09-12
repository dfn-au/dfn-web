export const palettes = ["charcoal", "olive", "ink", "umber"] as const;
export type Palette = (typeof palettes)[number];
export function resolvePalette(value: unknown): Palette {
	return palettes.find((palette) => palette === value) ?? "charcoal";
}

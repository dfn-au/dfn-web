"use client";

import { stegaClean } from "next-sanity";
import { type ComponentProps, createContext, useContext } from "react";
import { publicNavigationHref } from "@/components/homepage/navigation";
import {
	type BodyPreview,
	type BrandPreview,
	type HeadingPreview,
	type IconPreview,
	type LabelPreview,
	type LogoPreview,
	previewDefaults,
} from "./brand-preview";
import type { Palette } from "./palettes";

export const PaletteContext = createContext<{
	palette: Palette;
	controlsVisible: boolean;
	brandPreview: BrandPreview;
	headingPreview: HeadingPreview;
	bodyPreview: BodyPreview;
	logoPreview: LogoPreview;
	labelPreview: LabelPreview;
	iconPreview: IconPreview;
}>({
	palette: "charcoal",
	controlsVisible: true,
	brandPreview: previewDefaults.brand,
	headingPreview: previewDefaults.headings,
	bodyPreview: previewDefaults.body,
	logoPreview: previewDefaults.logo,
	labelPreview: previewDefaults.labels,
	iconPreview: previewDefaults.icons,
});

export function NavigationLink({
	href,
	activePage = "home",
	homepagePath = "",
	className,
	...props
}: ComponentProps<"a"> & {
	href: string;
	activePage?: string;
	homepagePath?: string;
}) {
	const {
		palette,
		controlsVisible,
		brandPreview,
		headingPreview,
		bodyPreview,
		logoPreview,
		labelPreview,
		iconPreview,
	} = useContext(PaletteContext);
	const cleanHref = stegaClean(href ?? "#");
	const destination = publicNavigationHref(
		homepagePath && cleanHref.startsWith("#dh-") && cleanHref !== "#dh-contact"
			? `${homepagePath}${cleanHref}`
			: cleanHref,
		palette,
		controlsVisible,
		brandPreview,
		headingPreview,
		bodyPreview,
		logoPreview,
		labelPreview,
		iconPreview,
	);
	return (
		<a
			{...props}
			className={`hover:underline hover:underline-offset-4 ${className ?? ""}`}
			href={destination}
			aria-current={
				cleanHref.split(/[?#]/)[0] === `/${stegaClean(activePage)}`
					? "page"
					: undefined
			}
		/>
	);
}

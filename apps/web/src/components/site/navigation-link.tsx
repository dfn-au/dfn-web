"use client";

import { stegaClean } from "next-sanity";
import { type ComponentProps, createContext, useContext } from "react";
import { publicNavigationHref } from "@/components/homepage/navigation";
import type { Palette } from "./palettes";

export const PaletteContext = createContext<{
	palette: Palette;
	controlsVisible: boolean;
}>({ palette: "charcoal", controlsVisible: true });

export function NavigationLink({
	href,
	activePage = "home",
	homepagePath = "",
	...props
}: ComponentProps<"a"> & {
	href: string;
	activePage?: string;
	homepagePath?: string;
}) {
	const { palette, controlsVisible } = useContext(PaletteContext);
	const cleanHref = stegaClean(href ?? "#");
	const destination = publicNavigationHref(
		homepagePath && cleanHref.startsWith("#dh-") && cleanHref !== "#dh-contact"
			? `${homepagePath}${cleanHref}`
			: cleanHref,
		palette,
		controlsVisible,
	);
	return (
		<a
			{...props}
			href={destination}
			aria-current={
				cleanHref.split(/[?#]/)[0] === `/${stegaClean(activePage)}`
					? "page"
					: undefined
			}
		/>
	);
}

"use client";

import { stegaClean } from "next-sanity";
import { type ComponentProps, createContext, useContext } from "react";
import { publicNavigationHref } from "@/components/homepage/navigation";
import type { Palette } from "../palettes";

export const PreviewContext = createContext<{
	palette: Palette;
	controlsVisible: boolean;
}>({ palette: "charcoal", controlsVisible: true });

export function PreviewLink({
	page = "home",
	hash,
	placeholderLinks = false,
	homepagePath = "",
	...props
}: Omit<ComponentProps<"a">, "href"> & {
	page?: string;
	hash?: string;
	placeholderLinks?: boolean;
	homepagePath?: string;
}) {
	const { palette, controlsVisible } = useContext(PreviewContext);
	const root = process.env.NEXT_PUBLIC_DESIGN_ROOT ?? "/design-refresh";
	const path = page === "home" ? `${root}/` : `${root}/${page}/`;
	return (
		<a
			{...props}
			href={
				placeholderLinks
					? publicNavigationHref(
							hash ? `${homepagePath}#${hash}` : "#",
							palette,
							controlsVisible,
						)
					: `${path}?variant=${palette}${controlsVisible ? "" : "&clean=1"}${hash ? `#${hash}` : ""}`
			}
		/>
	);
}

// Static previews keep their original routes and palette parameters. CMS
// navigation uses its authored destinations directly.
export function NavigationLink({
	href,
	placeholderLinks = false,
	activePage = "home",
	homepagePath = "",
	...props
}: ComponentProps<"a"> & {
	href: string;
	placeholderLinks?: boolean;
	activePage?: string;
	homepagePath?: string;
}) {
	const { palette, controlsVisible } = useContext(PreviewContext);
	const cleanHref = stegaClean(href ?? "#");
	const destination = placeholderLinks
		? publicNavigationHref(
				homepagePath &&
					cleanHref.startsWith("#dh-") &&
					cleanHref !== "#dh-contact"
					? `${homepagePath}${cleanHref}`
					: cleanHref,
				palette,
				controlsVisible,
			)
		: cleanHref;
	if (
		!placeholderLinks &&
		(destination === "/about" || destination.startsWith("#dh-"))
	) {
		const page =
			destination === "/about"
				? "about"
				: destination === "#dh-contact"
					? activePage
					: "home";
		return (
			<PreviewLink
				{...props}
				page={page}
				hash={destination.startsWith("#") ? destination.slice(1) : undefined}
				aria-current={
					destination === "/about" && activePage === "about"
						? "page"
						: undefined
				}
			/>
		);
	}
	return (
		<a
			{...props}
			href={destination}
			aria-current={
				placeholderLinks &&
				cleanHref.split(/[?#]/)[0] === `/${stegaClean(activePage)}`
					? "page"
					: undefined
			}
			target={
				!placeholderLinks && destination.startsWith("https://")
					? "_blank"
					: undefined
			}
			rel={
				!placeholderLinks && destination.startsWith("https://")
					? "noopener noreferrer"
					: undefined
			}
		/>
	);
}

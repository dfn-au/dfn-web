"use client";

import { stegaClean } from "next-sanity";
import { SiteLink, type SiteLinkProps } from "./site-link";

export function NavigationLink({
	href,
	homepagePath = "",
	className,
	...props
}: SiteLinkProps & { homepagePath?: string }) {
	const cleanHref = stegaClean(href ?? "#");
	const destination =
		homepagePath && cleanHref.startsWith("#dh-") && cleanHref !== "#dh-contact"
			? `${homepagePath}${cleanHref}`
			: cleanHref;
	return (
		<SiteLink
			{...props}
			className={`hover:underline hover:underline-offset-4 ${className ?? ""}`}
			href={destination}
			markCurrent
		/>
	);
}

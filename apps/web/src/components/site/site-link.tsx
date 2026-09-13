"use client";

import NextLink from "next/link";
import { stegaClean } from "next-sanity";
import { type ComponentPropsWithRef, useContext } from "react";
import { publicNavigationHref } from "@/components/homepage/navigation";
import { PaletteContext } from "./link-context";
import { isCurrentPageLink, resolveLinkDestination } from "./link-destination";

export type SiteLinkProps = Omit<
	ComponentPropsWithRef<"a">,
	"href" | "target"
> & {
	href: string;
	navigation?: "auto" | "document";
	markCurrent?: boolean;
	activePage?: string;
};

export function SiteLink({
	href,
	navigation = "auto",
	markCurrent,
	activePage,
	...props
}: SiteLinkProps) {
	const { palette, controlsVisible, documentUrl } = useContext(PaletteContext);
	const authoredHref = stegaClean(href);
	const destination = resolveLinkDestination(authoredHref, documentUrl);
	const page =
		destination.kind === "page" &&
		navigation === "auto" &&
		props.download == null;
	const finalHref = page
		? publicNavigationHref(authoredHref, palette, controlsVisible, documentUrl)
		: authoredHref;
	const current = markCurrent
		? isCurrentPageLink(
				authoredHref,
				activePage === undefined ? undefined : stegaClean(activePage),
				documentUrl,
			)
			? "page"
			: undefined
		: props["aria-current"];
	if (page && resolveLinkDestination(finalHref, documentUrl).kind === "page") {
		return <NextLink {...props} href={finalHref} aria-current={current} />;
	}
	return (
		<a
			{...props}
			href={destination.kind === "invalid" ? undefined : finalHref}
			aria-current={current}
		/>
	);
}

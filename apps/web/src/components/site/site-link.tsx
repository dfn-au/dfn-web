"use client";

import NextLink from "next/link";
import { stegaClean } from "next-sanity";
import { type ComponentPropsWithRef, useContext } from "react";
import { LinkContext } from "./link-context";
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
	const { documentUrl } = useContext(LinkContext);
	const authoredHref = stegaClean(href);
	const destination = resolveLinkDestination(authoredHref, documentUrl);
	const page =
		destination.kind === "page" &&
		navigation === "auto" &&
		props.download == null;
	const current = markCurrent
		? isCurrentPageLink(
				authoredHref,
				activePage === undefined ? undefined : stegaClean(activePage),
				documentUrl,
			)
			? "page"
			: undefined
		: props["aria-current"];
	if (page) {
		return <NextLink {...props} href={authoredHref} aria-current={current} />;
	}
	return (
		<a
			{...props}
			href={destination.kind === "invalid" ? undefined : authoredHref}
			aria-current={current}
		/>
	);
}

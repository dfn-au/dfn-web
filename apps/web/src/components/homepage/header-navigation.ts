import { stegaClean } from "next-sanity";
import { isCurrentPageLink } from "@/components/site/link-destination";
import type { HeaderChildLink } from "./content";

export function headerHref(href: string, activePage: string) {
	const destination = stegaClean(href);
	return activePage !== "home" &&
		destination.startsWith("#dh-") &&
		destination !== "#dh-contact"
		? `/${destination}`
		: destination;
}

export function isCurrentHeaderLink(
	href: string,
	activePage: string,
	documentUrl?: string,
) {
	return isCurrentPageLink(
		stegaClean(href),
		stegaClean(activePage),
		documentUrl,
	);
}

// Preserve authored order while keeping visual groups together where practical.
// Group labels never become a navigation step, and columns do not add a tier.
export function navigationColumns(links: HeaderChildLink[]) {
	if (links.length < 4) return [links];
	const midpoint = Math.ceil(links.length / 2);
	const boundaries = links
		.map((link, index) =>
			index > 0 &&
			stegaClean(link.groupLabel ?? "") !==
				stegaClean(links[index - 1].groupLabel ?? "")
				? index
				: -1,
		)
		.filter(
			(index) =>
				index >= Math.ceil(links.length / 3) &&
				index <= Math.floor((links.length * 2) / 3),
		);
	const split = boundaries.reduce(
		(closest, index) =>
			Math.abs(index - midpoint) < Math.abs(closest - midpoint)
				? index
				: closest,
		boundaries[0] ?? midpoint,
	);
	return [links.slice(0, split), links.slice(split)];
}

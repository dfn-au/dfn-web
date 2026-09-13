import { resolveLinkDestination } from "@/components/site/link-destination";
import type { Palette } from "@/components/site/palettes";

// Change only the two review settings; leave unrelated query encoding/order,
// authored URL form, path and fragment intact.
export function publicNavigationHref(
	href: string,
	palette: Palette,
	controlsVisible: boolean,
	documentUrl?: string,
) {
	if (resolveLinkDestination(href, documentUrl).kind !== "page") return href;
	const settings: [string, string][] = [];
	if (palette !== "charcoal") settings.push(["variant", palette]);
	if (!controlsVisible) settings.push(["clean", "1"]);
	if (!settings.length) return href;
	const hashIndex = href.indexOf("#");
	const hash = hashIndex < 0 ? "" : href.slice(hashIndex);
	const beforeHash = hashIndex < 0 ? href : href.slice(0, hashIndex);
	const queryIndex = beforeHash.indexOf("?");
	const path = queryIndex < 0 ? beforeHash : beforeHash.slice(0, queryIndex);
	let parts =
		queryIndex < 0
			? []
			: beforeHash
					.slice(queryIndex + 1)
					.split("&")
					.filter(Boolean);
	for (const [name, value] of settings) {
		let replaced = false;
		parts = parts.flatMap((part) => {
			if (!new URLSearchParams(part).has(name)) return [part];
			if (replaced) return [];
			replaced = true;
			return [`${name}=${value}`];
		});
		if (!replaced) parts.push(`${name}=${value}`);
	}
	return `${path}?${parts.join("&")}${hash}`;
}

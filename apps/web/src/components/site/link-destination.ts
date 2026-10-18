export type LinkKind = "page" | "fragment" | "outbound" | "native" | "invalid";

// Only the public routes this app owns are eligible for client navigation.
// Admin, ingestion, files and deeper legacy paths keep document navigation.
function isPublicPage(pathname: string) {
	return (
		/^\/(?:[^/.]+\/?)?$/.test(pathname) &&
		!/^\/(?:admin|api|ingest)(?:\/|$)/.test(pathname)
	);
}

export function resolveLinkDestination(
	href: string,
	documentUrl?: string,
): {
	kind: LinkKind;
	url?: URL;
} {
	if (!href) return { kind: "invalid" };
	if (href.startsWith("#")) return { kind: "fragment" };
	const rootRelative = href.startsWith("/") && !href.startsWith("//");
	try {
		const base =
			documentUrl ?? (rootRelative ? "https://local.invalid/" : undefined);
		const url = new URL(href, base);
		if (["mailto:", "tel:"].includes(url.protocol))
			return { kind: "native", url };
		if (!["http:", "https:"].includes(url.protocol)) return { kind: "invalid" };
		// Without the browser's origin, do not guess that an absolute URL is local.
		if (!base) return { kind: "native", url };
		const current = new URL(base);
		if (url.origin !== current.origin) return { kind: "outbound", url };
		if (
			documentUrl &&
			href.includes("#") &&
			url.pathname === current.pathname &&
			url.search === current.search
		) {
			return { kind: "fragment", url };
		}
		return { kind: isPublicPage(url.pathname) ? "page" : "native", url };
	} catch {
		// Path- and protocol-relative links can resolve after hydration. Keep the
		// authored anchor in SSR instead of inventing an origin or parent directory.
		if (!documentUrl && !/^[a-z][a-z\d+.-]*:/i.test(href))
			return { kind: "native" };
		return { kind: "invalid" };
	}
}

export function isCurrentPageLink(
	href: string,
	activePage?: string,
	documentUrl?: string,
) {
	if (href.includes("#")) return false;
	const destination = resolveLinkDestination(href, documentUrl);
	if (destination.kind !== "page" || !destination.url) return false;
	const activePath =
		activePage !== undefined
			? activePage === "home"
				? "/"
				: `/${activePage}`
			: documentUrl
				? new URL(documentUrl).pathname
				: undefined;
	return (
		activePath !== undefined &&
		destination.url.pathname.replace(/\/$/, "") ===
			activePath.replace(/\/$/, "")
	);
}

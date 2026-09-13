import { describe, expect, it } from "vitest";
import { publicNavigationHref } from "../homepage/navigation";
import { isCurrentPageLink, resolveLinkDestination } from "./link-destination";

const base = "https://dfn.org.au/about/";
describe("resolved destinations", () => {
	it.each([
		["/contact", "page"],
		["../contact", "page"],
		["contact", "native"],
		["?topic=work", "page"],
		["https://dfn.org.au/contact/", "page"],
		["//dfn.org.au/contact/", "page"],
		["HTTPS://DFN.ORG.AU:443/contact", "page"],
		["https://dfn.org.nz/contact", "outbound"],
		["//dfn.org.nz/contact", "outbound"],
		["http://dfn.org.au/contact", "outbound"],
		["https://dfn.org.au:444/contact", "outbound"],
		["https://dfn.org.au.evil.example/contact", "outbound"],
		["https://www.dfn.org.au/contact", "outbound"],
		["#team", "fragment"],
		["#", "fragment"],
		["/about/#team", "fragment"],
		["/contact#team", "page"],
		["mailto:info@dfn.org.au", "native"],
		["tel:+61234567890", "native"],
		["/report.pdf", "native"],
		["/admin", "native"],
		["/api/action", "native"],
		["/ingest", "native"],
		["javascript:alert(1)", "invalid"],
		["data:text/html,hello", "invalid"],
		["https://[", "invalid"],
		["", "invalid"],
	])("classifies %s as %s", (href, kind) => {
		expect(resolveLinkDestination(href, base).kind).toBe(kind);
	});
	it("respects Country Site, preview origin, and relative URL base paths", () => {
		expect(
			resolveLinkDestination(
				"https://dfn.org.au/contact",
				"https://dfn.org.nz/",
			).kind,
		).toBe("outbound");
		expect(
			resolveLinkDestination(
				"https://dfn.org.au/contact",
				"https://preview.example/",
			).kind,
		).toBe("outbound");
		expect(
			resolveLinkDestination("contact", "https://dfn.org.au/about").url
				?.pathname,
		).toBe("/contact");
		expect(resolveLinkDestination("contact", base).url?.pathname).toBe(
			"/about/contact",
		);
	});
	it("does not guess an origin during SSR", () => {
		expect(resolveLinkDestination("https://dfn.org.au/about").kind).toBe(
			"native",
		);
		expect(resolveLinkDestination("//dfn.org.au/about").kind).toBe("native");
		expect(resolveLinkDestination("../about").kind).toBe("native");
		expect(resolveLinkDestination("/about").kind).toBe("page");
		expect(resolveLinkDestination("/#dh-work").kind).toBe("page");
	});
	it("uses one current-page rule without marking fragments or another Country Site current", () => {
		for (const href of [
			"/about",
			"/about/?variant=olive",
			"https://dfn.org.au/about/",
			"//dfn.org.au/about/",
		]) {
			expect(isCurrentPageLink(href, "about", base)).toBe(true);
		}
		for (const href of [
			"/about#team",
			"#team",
			"https://dfn.org.nz/about/",
			"/about-us",
		]) {
			expect(isCurrentPageLink(href, "about", base)).toBe(false);
		}
		expect(isCurrentPageLink("/", "home", base)).toBe(true);
		expect(isCurrentPageLink("/about", undefined, base)).toBe(true);
	});
});

describe("palette URL preservation", () => {
	it.each([
		"/contact",
		"../contact",
		"https://dfn.org.au/contact",
		"//dfn.org.au/contact",
	])("preserves destination form for %s", (href) => {
		expect(
			publicNavigationHref(`${href}?q=a%20b&x=%2f#team`, "olive", false, base),
		).toBe(`${href}?q=a%20b&x=%2f&variant=olive&clean=1#team`);
	});
	it("keeps the existing precedence and avoids duplicate settings", () => {
		const href = "/contact?variant=ink&clean=0&variant=umber&x=1";
		expect(publicNavigationHref(href, "olive", false, base)).toBe(
			"/contact?variant=olive&clean=1&x=1",
		);
		expect(publicNavigationHref(href, "charcoal", true, base)).toBe(href);
		expect(
			publicNavigationHref("/contact?%76ariant=ink&x=1", "olive", true, base),
		).toBe("/contact?variant=olive&x=1");
	});
	it.each([
		"#",
		"#team",
		"/about/#team",
		"mailto:info@dfn.org.au",
		"tel:123",
		"//dfn.org.nz/contact",
		"https://example.org/?x=1#z",
		"/report.pdf",
	])("does not add settings to %s", (href) => {
		expect(publicNavigationHref(href, "olive", false, base)).toBe(href);
	});
});

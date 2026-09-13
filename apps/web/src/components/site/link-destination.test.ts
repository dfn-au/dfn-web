import { describe, expect, it } from "vitest";
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
			"/about/?topic=work",
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

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { HeaderChildLink, HeaderContent } from "./content";
import {
	headerHref,
	isCurrentHeaderLink,
	navigationColumns,
} from "./header-navigation";
import { SiteHeader } from "./site-header";

const children: HeaderChildLink[] = [
	{
		_key: "overview",
		label: "Get involved overview",
		href: "/get-involved",
		groupLabel: "Start here",
	},
	...Array.from({ length: 5 }, (_, index) => ({
		_key: `participate-${index}`,
		label: `Participation ${index}`,
		href: `/participate-${index}`,
		groupLabel: "Take part",
	})),
	...Array.from({ length: 3 }, (_, index) => ({
		_key: `event-${index}`,
		label: `Event ${index}`,
		href: `/event-${index}`,
		groupLabel: "Events",
	})),
];

describe("grouped public navigation", () => {
	it("keeps a long visual group together without changing link order", () => {
		const columns = navigationColumns(children);
		expect(columns.map((column) => column.length)).toEqual([6, 3]);
		expect(columns.flat()).toEqual(children);
	});
	it("balances an ungrouped list and keeps short lists in one column", () => {
		const links = children.map(({ groupLabel: _groupLabel, ...link }) => link);
		expect(navigationColumns(links).map((column) => column.length)).toEqual([
			5, 4,
		]);
		expect(navigationColumns(links.slice(0, 3))).toEqual([links.slice(0, 3)]);
	});
	it("distinguishes current pages from hashes, external links and other slugs", () => {
		expect(isCurrentHeaderLink("/about/?variant=olive", "about")).toBe(true);
		expect(isCurrentHeaderLink("/", "home")).toBe(true);
		for (const href of [
			"/about#team",
			"#dh-work",
			"//other.example/about",
			"https://dfn.org.au/about/",
			"/about-us",
		]) {
			expect(isCurrentHeaderLink(href, "about")).toBe(false);
		}
	});
	it("routes homepage sections home while keeping each page's contact anchor local", () => {
		expect(headerHref("#dh-signup", "about")).toBe("/#dh-signup");
		expect(headerHref("#dh-work", "home")).toBe("#dh-work");
		expect(headerHref("#dh-contact", "about")).toBe("#dh-contact");
		expect(headerHref("https://dfn.org.au/donate/", "about")).toBe(
			"https://dfn.org.au/donate/",
		);
	});
	it("renders authored groups as disclosures and their children as links on both devices", () => {
		const content: HeaderContent = {
			give: "Donate now",
			giveHref: "/donate",
			navigation: [
				{
					_key: "involved",
					label: "Get involved",
					headline: "Join us",
					description: "Authored introduction",
					children,
				},
				{ _key: "about", label: "About DFN", href: "/about" },
			],
			utilityLinks: [{ _key: "contact", label: "Contact", href: "/contact" }],
		};
		const markup = renderToStaticMarkup(
			<SiteHeader content={content} activePage="about" />,
		);
		expect(markup).toContain('data-site-header="grouped"');
		expect(markup).toContain("Authored introduction");
		expect(markup).toContain('aria-expanded="false"');
		expect(markup).toContain('aria-label="Close Get involved"');
		expect(markup).toContain('href="/about" aria-current="page"');
		expect(markup).toContain('href="/donate"');
		expect(markup).not.toContain('role="menu"');
		expect(markup).not.toContain("/design-refresh/");
		for (const child of children)
			expect(
				markup.match(new RegExp(`href="${child.href}"`, "g")),
			).toHaveLength(2);
	});
	it("keeps legacy flat links available on desktop and mobile, including mobileOnly entries", () => {
		const markup = renderToStaticMarkup(
			<SiteHeader
				content={{
					give: "Give",
					navigation: [
						{
							_key: "updates",
							label: "Updates",
							href: "#dh-signup",
							mobileOnly: true,
						},
					],
				}}
			/>,
		);
		expect(markup.match(/href="#dh-signup"/g)).toHaveLength(2);
		expect(markup).not.toContain("data-navigation-panel");
	});
});

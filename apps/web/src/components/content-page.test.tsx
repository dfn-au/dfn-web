import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ContentPage } from "./content-page";
import { publicNavigationHref } from "./homepage/navigation";
import type { SectionBody } from "./page-sections/types";
import { PageBody } from "./portable-text";
import { DesignLink } from "./site/primitives";

vi.mock("@/sanity/lib/image", () => ({ urlFor: () => ({ url: () => "" }) }));
vi.mock("./external-link", () => ({
	ExternalLink: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

describe("general content pages", () => {
	it("renders an incomplete draft without a title, slug or sections", () => {
		const markup = renderToStaticMarkup(
			<ContentPage
				page={{
					_id: "draft",
					title: null,
					description: null,
					slug: null,
					sections: null,
				}}
				chrome={null}
			/>,
		);
		expect(markup).toContain('<main id="dh-main"');
		expect(markup).not.toContain("undefined");
	});
	it("renders authored sections with shared navigation, home anchors and rich text", () => {
		const markup = renderToStaticMarkup(
			<ContentPage
				page={{
					_id: "example-page",
					title: "Example page",
					description: null,
					slug: { _type: "slug", current: "example" },
					sections: [
						{
							_key: "title",
							_type: "pageTitle",
							navigationLabel: null,
							headline: null,
						},
						{
							_key: "body",
							_type: "richTextSection",
							navigationLabel: null,
							body: [
								{
									_type: "block",
									_key: "copy",
									style: "normal",
									markDefs: [],
									children: [
										{
											_type: "span",
											_key: "text",
											text: "Authored body copy",
											marks: [],
										},
									],
								},
							],
						},
					],
				}}
				chrome={{
					header: {
						give: "Give",
						menuHeading: null,
						giveHref: null,
						navigation: [
							{
								_key: "work",
								label: "Our work",
								href: "#dh-work",
								headline: null,
								description: null,
								children: null,
							},
							{
								_key: "signup",
								label: "Updates",
								href: "#dh-signup",
								headline: null,
								description: null,
								children: null,
							},
							{
								_key: "contact",
								label: "Contact",
								href: "#dh-contact",
								headline: null,
								description: null,
								children: null,
							},
						],
					},
					footer: {
						summary: "Footer summary",
						navigationTitle: "Explore",
						navigation: [],
						legalNavigation: [],
						offices: [],
						copyright: "Copyright",
					},
				}}
			/>,
		);
		expect([...markup.matchAll(/<h1\b/g)]).toHaveLength(1);
		expect(markup).toContain("Example page</h1>");
		expect(markup).toContain('href="/#dh-work"');
		expect(markup).toContain('href="/#dh-signup"');
		expect(markup).toContain('href="#dh-contact"');
		expect(markup).toContain('href="/#dh-top"');
		expect(markup).not.toContain('href="/design-refresh');
		expect(markup).toContain("Authored body copy");
	});
	it("does not substitute preview navigation when shared CMS content is missing", () => {
		const markup = renderToStaticMarkup(
			<ContentPage
				page={{
					_id: "page",
					title: "Authored page",
					description: null,
					slug: { _type: "slug", current: "page" },
					sections: [
						{
							_key: "title",
							_type: "pageTitle",
							navigationLabel: null,
							headline: null,
						},
					],
				}}
				chrome={null}
			/>,
		);
		expect(markup).toContain("Authored page</h1>");
		expect(markup).not.toContain('aria-label="Main navigation"');
		expect(markup).not.toContain("<footer");
	});
	it("renders nested lists and annotated contact links without opening email in a new tab", () => {
		const blocks: (Extract<SectionBody[number], { _type: "block" }> & {
			children: NonNullable<
				Extract<SectionBody[number], { _type: "block" }>["children"]
			>;
		})[] = ["First item", "Nested item", "Email us"].map((text, index) => ({
			_type: "block",
			_key: `block-${index}`,
			style: "normal",
			markDefs: [],
			children: [{ _type: "span", _key: "text", text, marks: [] }],
		}));
		blocks[0].listItem = "bullet";
		blocks[0].level = 1;
		blocks[1].listItem = "bullet";
		blocks[1].level = 2;
		blocks[2].markDefs = [
			{ _key: "email", _type: "link", href: "mailto:info@dfn.org.au" },
		];
		blocks[2].children[0].marks = ["email"];
		const markup = renderToStaticMarkup(<PageBody value={blocks} />);
		expect([...markup.matchAll(/<ul\b/g)]).toHaveLength(2);
		expect(markup).toContain('href="mailto:info@dfn.org.au"');
		expect(markup).not.toContain('target="_blank"');
	});
	it("keeps palettes and hidden controls across public page navigation", () => {
		expect(publicNavigationHref("/privacy", "olive", false)).toBe(
			"/privacy?variant=olive&clean=1",
		);
		expect(publicNavigationHref("/#dh-work", "ink", true)).toBe(
			"/?variant=ink#dh-work",
		);
		expect(publicNavigationHref("#", "olive", true)).toBe("#");
		expect(publicNavigationHref("mailto:info@dfn.org.au", "olive", true)).toBe(
			"mailto:info@dfn.org.au",
		);
	});
});

// Visitors choose a new tab through their browser, regardless of link placement.
it.each([
	"https://dfn.org.au/contact/",
	"https://dfn.org.nz/contact/",
	"http://example.org/",
	"//example.org/",
])("keeps rich-text and design links in the current tab: %s", (href) => {
	const body: SectionBody = [
		{
			_type: "block",
			_key: "body",
			style: "normal",
			markDefs: [{ _type: "link", _key: "link", href }],
			children: [
				{ _type: "span", _key: "text", text: "Visit", marks: ["link"] },
			],
		},
	];
	for (const element of [
		<PageBody key="body" value={body} />,
		<DesignLink key="design" href={href}>
			Visit
		</DesignLink>,
	]) {
		const markup = renderToStaticMarkup(element);
		expect(markup).toContain(`href="${href}"`);
		expect(markup).not.toContain("target=");
	}
});

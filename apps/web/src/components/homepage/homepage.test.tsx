import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { HomepageContent, HomepageImage } from "./content";
import { Homepage } from "./homepage";

vi.mock("@/sanity/lib/image", () => ({
	urlFor: (image: HomepageImage) => ({ url: () => image.asset?.url ?? "" }),
}));

function contentWithImages() {
	const introduction = {
		eyebrow: "Test",
		headline: "Test heading",
		description: "Test description",
	};
	const content: HomepageContent = {
		title: "Test homepage",
		description: "Test description",
		hero: {
			...introduction,
			actionLabel: "Explore our work",
			photograph: {
				_type: "homepagePhotograph",
				alt: "Hero photo",
				asset: { url: "https://cdn.sanity.io/hero.jpg" },
			},
		},
		introduction,
		areas: ["education", "health", "enterprise", "women"].map((_key) => ({
			_key,
			_type: "programmeFeature",
			label: _key,
			headline: `About ${_key}`,
			body: [],
			actionLabel: `Explore ${_key}`,
			contentType: _key === "enterprise" ? "pathways" : "photograph",
			photograph: {
				_type: "homepagePhotograph",
				alt: `${_key} photo`,
				asset: { url: `https://cdn.sanity.io/${_key}.jpg` },
			},
		})),
		featuredExample: {
			eyebrow: "Example",
			headline: "An example",
			body: [],
			actionLabel: "Read more",
		},
		involvement: {
			eyebrow: "Join in",
			headline: "Get involved",
			actionLabel: "Give",
			opportunities: [],
		},
		signup: { ...introduction, actionLabel: "Sign up" },
		header: {
			give: "Give",
			navigation: [
				{ _key: "work", label: "Our work", href: "#dh-work" },
				{ _key: "about", label: "About", href: "#" },
			],
		},
		footer: {
			summary: "Footer summary",
			navigationTitle: "Explore",
			navigation: [],
			legalNavigation: [],
			copyright: "Copyright",
			offices: [
				{
					_key: "au",
					country: "Australia",
					address: [],
					phone: "123",
					tel: "123",
					email: "test@example.org",
				},
			],
		},
	};
	return content;
}

describe("Sanity homepage", () => {
	it.each([3, 4, 5])(
		"keeps navigation, sections and numbering in sync with %i reordered areas",
		(count) => {
			const content = contentWithImages();
			content.areas.push({
				...content.areas[0],
				_key: "new-area",
				label: "A fifth area",
			});
			content.areas = content.areas.slice(0, count).reverse();
			const markup = renderToStaticMarkup(<Homepage content={content} />);
			const sections = [
				...markup.matchAll(/<section id="dh-area-([^"]+)"/g),
			].map((match) => match[1]);
			const links = [...markup.matchAll(/href="#dh-area-([^"]+)"/g)].map(
				(match) => match[1],
			);
			expect(sections).toEqual(content.areas.map((area) => area._key));
			expect(links).toEqual(sections);
			for (const [index, area] of content.areas.entries()) {
				expect(markup).toContain(
					`${String(index + 1).padStart(2, "0")} / ${area.label}`,
				);
			}
		},
	);

	it("renders authored content and photographs, preserving heading line breaks", () => {
		const content = contentWithImages();
		content.hero.headline = "An edited headline\nWith a second line";
		content.hero.photograph.alt = "An edited photo description";
		content.areas[0].body = [
			{
				_type: "block",
				_key: "copy",
				style: "normal",
				markDefs: [],
				children: [
					{ _type: "span", _key: "text", text: "Changed in Sanity", marks: [] },
				],
			},
		];
		content.areas[2].pathways = [
			{
				_key: "new-pathway",
				title: "A different pathway",
				description: "A different description",
			},
		];
		content.header.navigation[1].label = "Meet DFN";
		content.footer.offices[0].email = "edited@example.org";
		const markup = renderToStaticMarkup(<Homepage content={content} />);
		expect(markup).toContain("An edited headline<br/>With a second line");
		expect(markup).toContain('alt="An edited photo description"');
		expect(markup).toContain('src="https://cdn.sanity.io/hero.jpg"');
		expect(markup).toContain("Changed in Sanity");
		expect(markup).toContain("A different pathway");
		expect(markup).toContain("Meet DFN");
		expect(markup).toContain('href="mailto:edited@example.org"');
		expect(markup).not.toContain("Content goes here.");
	});

	it("keeps content placeholders while Give links directly to the donation flow", () => {
		const markup = renderToStaticMarkup(
			<Homepage content={contentWithImages()} />,
		);
		const links = [...markup.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(
			(match) => match[1],
		);
		expect(links.length).toBeGreaterThan(0);
		expect(
			links.every((href) =>
				/^(#|tel:|mailto:|\/privacy$|https:\/\/dfn\.org\.au\/donate\/$)/.test(
					href,
				),
			),
		).toBe(true);
		expect(markup).toMatch(/href="#"[^>]*>Explore education<span[^>]*>→/);
		expect(markup).toMatch(/href="#dh-work"[^>]*>Explore our work<span[^>]*>↓/);
		expect(markup).toContain('href="https://dfn.org.au/donate/"');
		expect(markup).toContain("Details are not sent or saved.");
	});
});

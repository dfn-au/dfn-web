import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { RenderSections } from "./render-sections";
import type { PageSection } from "./types";

vi.mock("@/sanity/lib/image", () => ({
	urlFor: () => ({ url: () => "https://cdn.sanity.io/photo.jpg" }),
}));
vi.mock("../external-link", () => ({
	ExternalLink: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

describe("buildable content pages", () => {
	it("keeps section links in sync after removing, adding and reordering sections", () => {
		const original: PageSection[] = [
			{
				_key: "intro",
				_type: "introSection",
				navigationLabel: null,
				eyebrow: null,
				body: null,
				image: null,
				accentText: null,
				lead: null,
				headline: "Our story",
			},
			{ _key: "navigation", _type: "sectionNavigation", navigationLabel: null },
			{
				_key: "purpose",
				_type: "statementSection",
				eyebrow: null,
				body: null,
				statementLabel: null,
				statement: null,
				attribution: null,
				navigationLabel: "Purpose",
				headline: "Our purpose",
			},
			{
				_key: "goals",
				_type: "numberedSection",
				eyebrow: null,
				body: null,
				items: null,
				link: null,
				navigationLabel: "Goals",
				headline: "Our goals",
			},
			{
				_key: "values",
				_type: "valuesSection",
				eyebrow: null,
				body: null,
				items: null,
				navigationLabel: "Values",
				headline: "Our values",
			},
		];
		const sections: PageSection[] = [
			original[0],
			original[1],
			original[4],
			{
				_key: "new-story",
				_type: "imageTextSection",
				eyebrow: null,
				body: null,
				image: null,
				noteTitle: null,
				noteBody: null,
				navigationLabel: "A new story",
				headline: "A new story",
			},
			original[2],
		];
		const markup = renderToStaticMarkup(
			<RenderSections title="Edited page" sections={sections} />,
		);
		const nav =
			markup.match(/<nav aria-label="On this page".*?<\/nav>/)?.[0] ?? "";
		const links = [...nav.matchAll(/href="#([^"]+)"/g)].map(
			(match) => match[1],
		);
		expect(links).toEqual(["values", "new-story", "purpose"]);
		expect(nav).not.toContain("Goals");
		for (const id of links) expect(markup).toContain(`id="${id}"`);
		expect([...markup.matchAll(/<h1\b/g)]).toHaveLength(1);
	});
});

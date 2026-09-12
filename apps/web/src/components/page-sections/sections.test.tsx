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
			{ _key: "intro", _type: "introSection", headline: "Our story" },
			{ _key: "navigation", _type: "sectionNavigation" },
			{
				_key: "purpose",
				_type: "statementSection",
				navigationLabel: "Purpose",
				headline: "Our purpose",
			},
			{
				_key: "goals",
				_type: "numberedSection",
				navigationLabel: "Goals",
				headline: "Our goals",
			},
			{
				_key: "values",
				_type: "valuesSection",
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

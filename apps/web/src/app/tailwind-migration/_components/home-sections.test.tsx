import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FocusAreaSection } from "./home-sections";

describe("Tailwind migration home sections", () => {
	it("renders focus-area content through typed props", () => {
		const markup = renderToStaticMarkup(
			<FocusAreaSection
				ctaLabel="Learn more"
				description="A concise focus-area description."
				href="/focus-area"
				image={{ alt: "Example", src: "/example.jpg", title: "Example" }}
				layout="image-left"
				title="Education"
			/>,
		);

		expect(markup).toContain("Education");
		expect(markup).toContain("A concise focus-area description.");
		expect(markup).toContain('href="/focus-area"');
		expect(markup).toContain('src="/example.jpg"');
	});

	it("does not expose builder instance or module-type classes", () => {
		const markup = renderToStaticMarkup(
			<FocusAreaSection
				ctaLabel="Learn more"
				description="Description"
				href="/focus-area"
				image={{ alt: "Example", src: "/example.jpg", title: "Example" }}
				layout="image-left"
				title="Education"
			/>,
		);

		expect(markup).not.toMatch(/\b(?:fl-|pp-|wp-|legacy-(?:home-cta|link))/);
		expect(markup).not.toContain("data-node");
	});

	it("places the image after the content for right-image sections", () => {
		const markup = renderToStaticMarkup(
			<FocusAreaSection
				ctaLabel="Learn more"
				description="Description"
				href="/focus-area"
				image={{ alt: "Example", src: "/example.jpg", title: "Example" }}
				layout="image-right"
				title="Healthcare"
			/>,
		);

		expect(markup.indexOf("Healthcare")).toBeLessThan(
			markup.indexOf("/example.jpg"),
		);
	});
});

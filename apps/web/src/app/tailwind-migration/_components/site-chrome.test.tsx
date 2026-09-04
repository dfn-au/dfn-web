import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SiteFooter, SiteHeader } from "./site-chrome";

describe("Tailwind migration site chrome", () => {
	it("exposes page selection through one current-page input", () => {
		const homeHeader = renderToStaticMarkup(<SiteHeader currentPage="home" />);
		const aboutHeader = renderToStaticMarkup(
			<SiteHeader currentPage="about" />,
		);

		expect(homeHeader).not.toContain("aria-current=");
		expect(homeHeader).not.toContain("current-menu-item");
		expect(aboutHeader).toContain('aria-current="page"');
		expect(aboutHeader).toContain("current-menu-item");
	});

	it("does not expose inert builder instance classes", () => {
		const chrome = [
			renderToStaticMarkup(<SiteHeader currentPage="home" />),
			renderToStaticMarkup(<SiteFooter />),
		].join("");

		expect(chrome).not.toMatch(/fl-node-/);
		expect(chrome).not.toMatch(/fl-builder-content-\d+/);
		expect(chrome).not.toMatch(/wp-image-\d+/);
		expect(chrome).not.toMatch(/menu-item-type-/);
	});
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SiteFooter, SiteHeader } from "./site-chrome";

describe("Tailwind migration site chrome", () => {
	it("exposes page selection through one current-page input", () => {
		const homeHeader = renderToStaticMarkup(<SiteHeader currentPage="home" />);
		const aboutHeader = renderToStaticMarkup(
			<SiteHeader currentPage="about" />,
		);

		expect(homeHeader).not.toContain(' aria-current="');
		expect(homeHeader).not.toContain("current-menu-item");
		expect(aboutHeader).toContain('aria-current="page"');
		expect(aboutHeader).not.toContain("current-menu-item");
	});

	it("renders without builder styling hooks", () => {
		const chrome = [
			renderToStaticMarkup(<SiteHeader currentPage="home" />),
			renderToStaticMarkup(<SiteFooter />),
		].join("");

		const classNames = [...chrome.matchAll(/class="([^"]*)"/g)]
			.map((match) => match[1])
			.join(" ");
		expect(classNames).not.toMatch(
			/(?:^|\s)(?:fl-|pp-|wp-|legacy-(?:header|footer|link))/,
		);
		expect(chrome).not.toContain("data-node");
	});
});

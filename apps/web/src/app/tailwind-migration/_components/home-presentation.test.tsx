import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomeHero } from "./home-hero";
import { HomeIntroduction } from "./home-introduction";
import { HomeSignup } from "./home-signup";

describe("Home presentation migration", () => {
	it("renders supplied hero content and keeps subsequent slides hidden", () => {
		const markup = renderToStaticMarkup(
			<HomeHero
				slides={[
					{
						label: "First",
						heading: "A new heading",
						ctaLabel: "Read more",
						href: "/story",
						image: "/first.jpg",
						layout: "standard",
					},
					{
						label: "Second",
						heading: (
							<>
								Another
								<br />
								heading
							</>
						),
						ctaLabel: "Give",
						href: "/give",
						image: "/second.jpg",
						layout: "appeal",
					},
				]}
			/>,
		);
		expect(markup).toContain("A new heading");
		expect(markup).toContain('href="/story"');
		expect(markup).toContain('src="/first.jpg"');
		expect(markup).toContain('src="/second.jpg"');
		// The later background and content stay in the parity DOM, both hidden.
		expect(
			markup.match(/aria-hidden="true" class="[^"]*hidden!/g),
		).toHaveLength(2);
		expect(markup).not.toContain("data-n2click");
	});

	it("renders introduction markup and each card's destination and description", () => {
		const markup = renderToStaticMarkup(
			<HomeIntroduction
				introduction={
					<>
						A <b>holistic</b> approach.
					</>
				}
				cards={[
					{
						title: "Learning",
						description: "Learning opens doors.",
						href: "/learning",
						icon: "school",
					},
					{
						title: "Health",
						description: "Care close to home.",
						href: "/health",
						icon: "health",
					},
				]}
			/>,
		);
		expect(markup).toContain("A <b>holistic</b> approach.");
		expect(markup).toContain('href="/learning"');
		expect(markup).toContain('href="/health"');
		expect(markup).toContain("Learning opens doors.");
		expect(markup).toContain("Care close to home.");
		expect(markup.match(/<h3\b/g)).toHaveLength(2);
	});

	it("associates signup labels and error descriptions with distinct required fields", () => {
		const markup = renderToStaticMarkup(
			<HomeSignup
				title="Stay in touch"
				description="News from our programmes."
				buttonLabel="Join"
				idPrefix="test-signup"
			/>,
		);
		expect(markup).toContain("Stay in touch");
		expect(markup).toContain("News from our programmes.");
		expect(markup).toMatch(/<span[^>]*>Join<\/span>/);
		for (const [name, type] of [
			["name", "text"],
			["email", "email"],
		]) {
			expect(markup).toContain(`for="test-signup-${name}"`);
			expect(markup).toMatch(
				new RegExp(
					`<input type="${type}" id="test-signup-${name}"[^>]*required=""`,
				),
			);
			expect(markup).toContain(`aria-describedby="test-signup-${name}-error"`);
			expect(markup).toContain(`id="test-signup-${name}-error"`);
		}
	});

	it.each([
		["hero", <HomeHero key="hero" />],
		["introduction", <HomeIntroduction key="introduction" />],
		["signup", <HomeSignup key="signup" />],
	])("removes builder styling hooks from the %s presentation", (_name, component) => {
		const markup = renderToStaticMarkup(component);
		for (const [, classes] of markup.matchAll(/class="([^"]*)"/g)) {
			expect(classes).not.toMatch(
				/(?:^|\s)(?:fl-|pp-|wp-|n2-|n-uc-|legacy-(?:home|smart|signup|link))/,
			);
		}
		expect(markup).not.toMatch(/data-(?:node|ssid|sstype|pm|n2click)=/);
	});
});

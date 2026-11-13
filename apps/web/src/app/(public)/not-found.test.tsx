import { evaluate, parse } from "groq-js";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import MissingRoute from "./[...missing]/page";
import PageRoute from "./[slug]/page";
import NotFound from "./not-found";

vi.mock("@/sanity/lib/live", () => ({
	sanityFetch: async ({ query, params }: { query: string; params: object }) => {
		const dataset = ["AU", "NZ"].map((site) => ({
			_type: "page",
			_id: site,
			slug: { current: site.toLowerCase() },
			publishingScope: [site],
			title: `${site} page`,
			sections: [{ _key: "title", _type: "pageTitle" }],
		}));
		return {
			data: await (await evaluate(parse(query), { dataset, params })).get(),
		};
	},
}));
vi.mock("@/sanity/lib/image", () => ({ urlFor: () => ({ url: () => "" }) }));
vi.mock("@/components/page-view-tracker", () => ({
	PageViewTracker: () => null,
}));

const route = (slug: string) =>
	PageRoute({
		params: Promise.resolve({ slug }),
		searchParams: Promise.resolve({ clean: "1" }),
	});

afterEach(() => vi.unstubAllEnvs());

describe.each(["AU", "NZ"] as const)("%s missing-page recovery", (site) => {
	it("rejects missing and country-excluded content with the framework's 404", async () => {
		vi.stubEnv("COUNTRY_SITE", site);
		for (const slug of ["missing", site === "AU" ? "nz" : "au"]) {
			await expect(route(slug)).rejects.toMatchObject({
				digest: "NEXT_HTTP_ERROR_FALLBACK;404",
			});
		}
	});

	it("keeps an eligible public page available", async () => {
		vi.stubEnv("COUNTRY_SITE", site);
		const markup = renderToStaticMarkup(await route(site.toLowerCase()));
		expect(markup).toContain(`${site} page</h1>`);
		expect(markup).not.toContain("Page not found");
	});

	it("renders a heading and a home link that stays on the current site", () => {
		vi.stubEnv("COUNTRY_SITE", site);
		const markup = renderToStaticMarkup(<NotFound />);
		expect(markup).toMatch(/<h1[^>]*>Page not found<\/h1>/);
		expect(markup).toMatch(/<a[^>]*href="\/"[^>]*>Back to homepage/);
		expect(markup).not.toContain('target="_blank"');
	});
});

it("uses a 404 for unmatched nested public URLs", () => {
	expect(() => MissingRoute()).toThrow(
		expect.objectContaining({ digest: "NEXT_HTTP_ERROR_FALLBACK;404" }),
	);
});

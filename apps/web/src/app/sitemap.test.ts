// @vitest-environment jsdom
import { evaluate, parse } from "groq-js";
import {
	resolveRobots,
	resolveSitemap,
} from "next/dist/build/webpack/loaders/metadata/resolve-route-data";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

const { fetchContent } = vi.hoisted(() => ({ fetchContent: vi.fn() }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: fetchContent } }));

const page = (id: string, scope?: string[] | null, slug = id) => ({
	_id: id,
	_type: "page",
	slug: { current: slug },
	publishingScope: scope,
});
const fixtures = [
	{ _id: "homePage", _type: "homePage" },
	{ _id: "drafts.homePage", _type: "homePage" },
	{ _id: "other-home", _type: "homePage" },
	page("shared", ["AU", "NZ"]),
	page("au", ["AU"]),
	page("nz", ["NZ"]),
	page("legacy"),
	page("admin-team", ["AU", "NZ"]),
	page("null-scope", null),
	page("empty-scope", []),
	page("drafts.new-page", ["AU", "NZ"], "unpublished"),
	page("drafts.shared", ["AU", "NZ"], "draft-slug"),
	page("versions.release.new-page", ["AU", "NZ"], "future-page"),
	{ _id: "no-slug", _type: "page" },
	{ _id: "other-type", _type: "private", slug: { current: "private" } },
	...[
		"admin",
		"api",
		"ingest",
		"_next",
		"admin/login",
		"",
		"nested/path",
		"//evil.example",
		"about?preview=1",
		"about#preview",
		"sitemap.xml",
		"robots.txt",
		"icon.svg",
		"favicon.ico",
	].map((slug, index) => page(`invalid-${index}`, ["AU", "NZ"], slug)),
];

beforeEach(() => {
	// Only the network boundary is replaced. Execute the query passed by the route.
	fetchContent.mockImplementation(async (query, params) =>
		(await evaluate(parse(query), { dataset: fixtures, params })).get(),
	);
});
afterEach(() => {
	vi.unstubAllEnvs();
	vi.clearAllMocks();
});

describe.each([
	["AU", "https://dfn.org.au", "au"],
	["NZ", "https://dfn.org.nz", "nz"],
])("%s sitemap", (country, origin, countrySlug) => {
	beforeEach(() => {
		vi.stubEnv("COUNTRY_SITE", country);
	});

	it("serialises only the published homepage and eligible public pages as valid XML", async () => {
		const entries = await sitemap();
		expect(entries.map(({ url }) => url).sort()).toEqual(
			[
				`${origin}/`,
				`${origin}/${countrySlug}`,
				`${origin}/legacy`,
				`${origin}/admin-team`,
				`${origin}/null-scope`,
				`${origin}/shared`,
			].sort(),
		);
		const xml = new DOMParser().parseFromString(
			resolveSitemap(entries),
			"application/xml",
		);
		expect(xml.querySelector("parsererror")).toBeNull();
		expect(xml.documentElement.namespaceURI).toBe(
			"http://www.sitemaps.org/schemas/sitemap/0.9",
		);
		expect(
			[...xml.querySelectorAll("loc")].map((loc) => loc.textContent),
		).toEqual(entries.map(({ url }) => url));
		expect(fetchContent).toHaveBeenCalledWith(
			expect.any(String),
			{ countrySite: country },
			{
				perspective: "published",
				useCdn: false,
				stega: false,
				cache: "no-store",
			},
		);
	});

	it("reflects publication, slug changes and unpublication on the next request", async () => {
		const changed = [
			...fixtures.filter(
				(doc) =>
					doc._id !== "shared" &&
					doc._id !== "homePage" &&
					doc._id !== countrySlug,
			),
			page("shared", ["AU", "NZ"], "renamed"),
			page("newly-published", ["AU", "NZ"]),
		];
		const before = await sitemap();
		fetchContent.mockImplementation(async (query, params) =>
			(await evaluate(parse(query), { dataset: changed, params })).get(),
		);
		const after = await sitemap();
		expect(before.map(({ url }) => url)).toContain(`${origin}/shared`);
		expect(after.map(({ url }) => url).sort()).toEqual(
			[
				`${origin}/legacy`,
				`${origin}/admin-team`,
				`${origin}/null-scope`,
				`${origin}/renamed`,
				`${origin}/newly-published`,
			].sort(),
		);
	});

	it("references the production sitemap from robots.txt and excludes private routes", () => {
		vi.stubEnv("VERCEL_URL", "preview.example");
		const text = resolveRobots(robots());
		expect(text).toContain(`Sitemap: ${origin}/sitemap.xml`);
		expect(text).toContain("Disallow: /admin$\n");
		expect(text).toContain("Disallow: /admin/\n");
		expect(text).not.toContain("Disallow: /admin\n");
		expect(text).toContain("Disallow: /api/");
		expect(text).not.toContain("preview.example");
	});
});

it("fails a sitemap request when the CMS fails, rather than returning an empty success", async () => {
	vi.stubEnv("COUNTRY_SITE", "AU");
	fetchContent.mockRejectedValueOnce(new Error("CMS unavailable"));
	await expect(sitemap()).rejects.toThrow("CMS unavailable");
});

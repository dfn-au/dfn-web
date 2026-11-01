import { evaluate, parse } from "groq-js";
import { describe, expect, it } from "vitest";
import type { CountrySite } from "@/lib/country-site";
import type { PAGE_QUERY_RESULT } from "../types";
import { PAGE_QUERY } from "./queries";

// Execute the public query itself so scope checks cannot drift from GROQ.
const page = {
	_type: "page",
	title: "Shared title",
	description: "Shared search description",
	sections: [
		{ _key: "title", _type: "pageTitle", headline: "Shared headline" },
	],
};
const dataset = [
	{
		...page,
		_id: "shared",
		slug: { current: "shared" },
		publishingScope: ["AU", "NZ"],
	},
	...(["AU", "NZ"] as const).map((site) => ({
		...page,
		_id: site,
		slug: { current: site },
		publishingScope: [site],
	})),
	{ ...page, _id: "legacy", slug: { current: "legacy" } },
	{ ...page, _id: "null", slug: { current: "null" }, publishingScope: null },
	{ ...page, _id: "empty", slug: { current: "empty" }, publishingScope: [] },
];

async function fetchPage(slug: string, countrySite: CountrySite) {
	const result = await evaluate(parse(PAGE_QUERY), {
		dataset,
		params: { slug, countrySite },
	});
	return (await result.get()) as PAGE_QUERY_RESULT;
}

describe("PAGE_QUERY", () => {
	it("returns the same document, path and content on both selected sites", async () => {
		const au = await fetchPage("shared", "AU");
		const nz = await fetchPage("shared", "NZ");
		expect(au).toMatchObject({
			_id: "shared",
			title: "Shared title",
			description: "Shared search description",
			slug: { current: "shared" },
			sections: [{ _key: "title", headline: "Shared headline" }],
		});
		expect(nz).toEqual(au);
	});

	it.each(["AU", "NZ"] as const)(
		"returns a %s-only page only on that site",
		async (site) => {
			expect((await fetchPage(site, site))?._id).toBe(site);
			expect(await fetchPage(site, site === "AU" ? "NZ" : "AU")).toBeNull();
		},
	);

	it.each(["AU", "NZ"] as const)(
		"keeps older pages available on %s",
		async (site) => {
			for (const slug of ["legacy", "null"]) {
				expect(await fetchPage(slug, site)).toMatchObject({
					_id: slug,
					description: "Shared search description",
					sections: [{ headline: "Shared headline" }],
				});
			}
		},
	);

	it.each(["AU", "NZ"] as const)(
		"returns no page for an empty scope or missing slug on %s",
		async (site) => {
			expect(await fetchPage("empty", site)).toBeNull();
			expect(await fetchPage("missing", site)).toBeNull();
		},
	);
});

import { evaluate, parse } from "groq-js";
import { describe, expect, it } from "vitest";
import type { CountrySite } from "@/lib/country-site";
import type { PAGE_QUERY_RESULT } from "../types";
import { PAGE_QUERY } from "./queries";

// Runs the real public page query against fixture documents, so the scope
// filter and AU/NZ value selection are tested in GROQ rather than mocked.
const block = (text: string) => [
	{
		_type: "block",
		_key: text,
		style: "normal",
		markDefs: [],
		children: [{ _type: "span", _key: `${text}-span`, text, marks: [] }],
	},
];

const dataset = [
	{
		_id: "shared",
		_type: "page",
		title: "Shared page",
		slug: { _type: "slug", current: "shared" },
		publishingScope: ["AU", "NZ"],
		browserTitle: "Shared browser title",
		descriptionVariesByCountry: true,
		descriptionAU: "Australian search description",
		descriptionNZ: "New Zealand search description",
		sections: [
			{
				_key: "title",
				_type: "pageTitle",
				// A stale shared value is ignored once the field varies.
				headline: "Unused shared headline",
				headlineVariesByCountry: true,
				headlineAU: "Kia ora, Australia",
				headlineNZ: "Kia ora, Aotearoa",
			},
			{
				_key: "story",
				_type: "statementSection",
				eyebrow: "Shared eyebrow",
				headlineVariesByCountry: true,
				headlineAU: "Only Australia has a headline",
				bodyVariesByCountry: true,
				bodyAU: block("Australian body"),
			},
			{
				_key: "nz-only",
				_type: "richTextSection",
				onlyOn: "NZ",
				body: block("New Zealand only"),
			},
		],
	},
	{
		_id: "au-only",
		_type: "page",
		title: "Australia only",
		slug: { _type: "slug", current: "au-only" },
		publishingScope: ["AU"],
		sections: [{ _key: "title", _type: "pageTitle" }],
	},
	{
		// Saved before Publishing Scope and AU/NZ values existed.
		_id: "legacy",
		_type: "page",
		title: "Legacy page",
		slug: { _type: "slug", current: "legacy" },
		description: "Legacy description",
		sections: [{ _key: "title", _type: "pageTitle", headline: "Legacy" }],
	},
];

async function fetchPage(slug: string, countrySite: CountrySite) {
	const result = await evaluate(parse(PAGE_QUERY), {
		dataset,
		params: { slug, countrySite },
	});
	return (await result.get()) as PAGE_QUERY_RESULT;
}

function section(page: PAGE_QUERY_RESULT, key: string) {
	return page?.sections?.find((section) => section._key === key);
}

describe("PAGE_QUERY", () => {
	it("returns a shared page at the same slug on both sites", async () => {
		const au = await fetchPage("shared", "AU");
		const nz = await fetchPage("shared", "NZ");
		expect(au?._id).toBe("shared");
		expect(nz?._id).toBe("shared");
		expect(au?.browserTitle).toBe("Shared browser title");
		expect(nz?.browserTitle).toBe("Shared browser title");
	});

	it("returns each site's own value where a field varies", async () => {
		const au = await fetchPage("shared", "AU");
		const nz = await fetchPage("shared", "NZ");
		expect(au?.description).toBe("Australian search description");
		expect(nz?.description).toBe("New Zealand search description");
		expect(section(au, "title")).toMatchObject({
			headline: "Kia ora, Australia",
		});
		expect(section(nz, "title")).toMatchObject({
			headline: "Kia ora, Aotearoa",
		});
	});

	it("returns nothing, not the AU value, where the NZ value is empty", async () => {
		const au = section(await fetchPage("shared", "AU"), "story");
		const nz = section(await fetchPage("shared", "NZ"), "story");
		expect(au).toMatchObject({
			eyebrow: "Shared eyebrow",
			headline: "Only Australia has a headline",
			body: block("Australian body"),
		});
		expect(nz).toMatchObject({
			eyebrow: "Shared eyebrow",
			headline: null,
			body: null,
		});
	});

	it("includes a section limited to NZ only on the NZ site", async () => {
		const au = await fetchPage("shared", "AU");
		const nz = await fetchPage("shared", "NZ");
		expect(au?.sections?.map((s) => s._key)).toEqual(["title", "story"]);
		expect(nz?.sections?.map((s) => s._key)).toEqual([
			"title",
			"story",
			"nz-only",
		]);
	});

	it("returns an AU-only page on AU and nothing on NZ", async () => {
		expect((await fetchPage("au-only", "AU"))?._id).toBe("au-only");
		expect(await fetchPage("au-only", "NZ")).toBeNull();
	});

	it.each(["AU", "NZ"] as const)(
		"treats a page saved before Publishing Scope as published to %s",
		async (site) => {
			const page = await fetchPage("legacy", site);
			expect(page?.description).toBe("Legacy description");
			expect(section(page, "title")).toMatchObject({ headline: "Legacy" });
		},
	);
});

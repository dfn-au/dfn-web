import { evaluate, parse } from "groq-js";
import { describe, expect, it } from "vitest";
import { getPageFilter, pageFilters } from "./page-filters";

const dataset = [
	{ _id: "shared", _type: "page", publishingScope: ["AU", "NZ"] },
	{ _id: "au", _type: "page", publishingScope: ["AU"] },
	{ _id: "nz", _type: "page", publishingScope: ["NZ"] },
	{ _id: "legacy", _type: "page" },
	{ _id: "null-scope", _type: "page", publishingScope: null },
	{ _id: "empty-scope", _type: "page", publishingScope: [] },
	{ _id: "homePage", _type: "homePage" },
];

describe("Pages filters", () => {
	it.each([undefined, "unknown"])(
		"defaults an unrecognised filter %s to all pages",
		(scope) => {
			expect(getPageFilter(scope).id).toBe("all");
		},
	);
	it.each([
		{
			title: "All pages",
			expected: ["shared", "au", "nz", "legacy", "null-scope", "empty-scope"],
		},
		{ title: "Shared pages", expected: ["shared", "legacy", "null-scope"] },
		{ title: "AU only", expected: ["au"] },
		{ title: "NZ only", expected: ["nz"] },
	])(
		"$title shows the matching publishing scopes",
		async ({ title, expected }) => {
			const list = pageFilters.find((list) => list.title === title);
			expect(list).toBeDefined();
			const result = await evaluate(parse(`*[${list?.filter}]._id`), {
				dataset,
			});
			expect(await result.get()).toEqual(expected);
		},
	);
});

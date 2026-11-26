import { createClient } from "@sanity/client";
import { evaluate, parse } from "groq-js";
import { createSchema, validateDocument, type Workspace } from "sanity";
import { describe, expect, it, vi } from "vitest";
import fixtures from "../../test/fixtures/downloads.json";
import { schema } from "./index";

const client = createClient({
	projectId: "testproject",
	dataset: "test",
	apiVersion: "2026-06-10",
	useCdn: false,
});
vi.spyOn(client, "withConfig").mockReturnValue(client);
vi.spyOn(client, "fetch").mockImplementation(async (query, params) =>
	(await evaluate(parse(query), { dataset: fixtures, params })).get(),
);
const workspace = {
	schema: createSchema({ name: "download-tests", types: schema.types }),
	getClient: () => client,
	i18n: {
		currentLocale: { id: "en-US" },
		loadNamespaces: async () => {},
		t: ((key: string) => key) as Workspace["i18n"]["t"],
	},
};
const report = fixtures.find((doc) => doc._id === "test-downloads");
async function errors(
	downloads: unknown[],
	headline: string | undefined = "Reports",
) {
	const result = await validateDocument({
		document: {
			...report,
			_id: "test-downloads",
			_type: "page",
			_rev: "1",
			_createdAt: "2026-11-19",
			_updatedAt: "2026-11-19",
			sections: [
				{ _key: "title", _type: "pageTitle", headline: "Reports" },
				{
					_key: "downloads",
					_type: "downloadListSection",
					headline,
					downloads,
				},
			],
		},
		workspace,
		getDocumentExists: async () => true,
	});
	return result.filter((marker) => marker.level === "error");
}
const item = {
	_key: "resource",
	_type: "downloadItem",
	title: "Annual report",
	url: "https://example.org/report.pdf",
};

describe("Download list authoring", () => {
	it.each(fixtures.filter((doc) => doc._type === "page"))(
		"validates the $title schema",
		async (document) => {
			const result = await validateDocument({
				document: {
					...document,
					_rev: "1",
					_createdAt: "2026-11-19",
					_updatedAt: "2026-11-19",
				},
				workspace,
				getDocumentExists: async () => true,
			});
			expect(result.filter((marker) => marker.level === "error")).toEqual([]);
		},
	);

	it("accepts one resource without a date, and a reordered mix of files and URLs", async () => {
		expect(await errors([item])).toEqual([]);
		const section = report?.sections?.find((s) => s._key === "annual");
		if (!section || !("downloads" in section))
			throw new Error("Missing annual reports fixture");
		expect(await errors([...(section.downloads ?? [])].reverse())).toEqual([]);
	});
	it.each([
		{ ...item, url: undefined },
		{
			...item,
			file: {
				_type: "file",
				asset: { _type: "reference", _ref: "file-sample-pdf" },
			},
		},
	])("requires exactly one destination", async (entry) => {
		expect(await errors([entry])).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					message:
						"Choose either a file or an existing resource URL, not both.",
				}),
			]),
		);
	});
	it.each([
		{ ...item, title: undefined },
		{ ...item, url: "javascript:alert(1)" },
		{ ...item, url: "/relative.pdf" },
		{ ...item, date: "not-a-date" },
	])("rejects incomplete or invalid entries", async (entry) => {
		expect((await errors([entry])).length).toBeGreaterThan(0);
	});
	it("requires an entry and a heading", async () => {
		expect((await errors([])).length).toBeGreaterThan(0);
		expect((await errors([item], "")).length).toBeGreaterThan(0);
	});
});

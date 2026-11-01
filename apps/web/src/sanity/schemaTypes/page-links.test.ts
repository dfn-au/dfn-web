import { createClient } from "@sanity/client";
import { evaluate, parse } from "groq-js";
import { createSchema, validateDocument, type Workspace } from "sanity";
import { describe, expect, it, vi } from "vitest";
import { LINK_TARGET_FILTER, linkCountries } from "../link-scope";
import { schema } from "./index";

const targets = [
	{ _id: "homePage", _type: "homePage" },
	...[
		["shared", ["AU", "NZ"]],
		["au", ["AU"]],
		["nz", ["NZ"]],
		["none", []],
		["legacy", null],
	].map(([id, scope]) => ({
		_id: id,
		_type: "page",
		slug: { current: id },
		publishingScope: scope,
	})),
	{ _id: "no-slug", _type: "page", publishingScope: ["AU", "NZ"] },
];
const client = createClient({
	projectId: "testproject",
	dataset: "test",
	apiVersion: "2026-06-10",
	useCdn: false,
});
vi.spyOn(client, "withConfig").mockReturnValue(client);
vi.spyOn(client, "fetch").mockImplementation(async (query, params) =>
	(await evaluate(parse(query), { dataset: targets, params })).get(),
);
const workspace = {
	schema: createSchema({
		name: "link-tests",
		types: [
			...schema.types,
			{
				name: "linkTest",
				type: "document",
				fields: [{ name: "header", type: "homepageHeader" }],
			},
		],
	}),
	getClient: () => client,
	i18n: {
		currentLocale: { id: "en-US" },
		loadNamespaces: async () => {},
		t: ((key: string) => key) as Workspace["i18n"]["t"],
	},
};
const link = (id: string) => ({
	_key: "link",
	_type: "homepageHeaderLink",
	label: "Link",
	page: { _type: "reference", _ref: id },
});
async function errors(header: unknown) {
	const result = await validateDocument({
		document: {
			_id: "links",
			_type: "linkTest",
			_rev: "1",
			_createdAt: "2026-11-01",
			_updatedAt: "2026-11-01",
			header,
		},
		workspace,
		getDocumentExists: async ({ id }) =>
			targets.some((target) => target._id === id),
	});
	return result.filter((marker) => marker.level === "error");
}
describe("Page picker and validation", () => {
	it.each([
		["navigation", ["homePage", "shared", "legacy"]],
		["navigationAU", ["homePage", "shared", "au", "legacy"]],
		["legalNavigationNZ", ["homePage", "shared", "nz", "legacy"]],
	])("filters %s to compatible pages", async (menu, expected) => {
		const result = await (
			await evaluate(parse(`*[${LINK_TARGET_FILTER}]._id`), {
				dataset: targets,
				params: {
					sites: linkCountries({ _type: "homePage" }, [
						"header",
						menu,
						{ _key: "group" },
						"children",
					]),
				},
			})
		).get();
		expect(result).toEqual(expected);
	});
	it("uses the publishing scope of a content page", () => {
		expect(
			linkCountries({ _type: "page", publishingScope: ["NZ"] }, [
				"sections",
				{ _key: "a" },
				"primaryAction",
			]),
		).toEqual(["NZ"]);
		expect(linkCountries({ _type: "page" }, [])).toEqual(["AU", "NZ"]);
	});
	it("accepts shared references and ignores the hidden URL", async () => {
		expect(
			await errors({
				give: "Give",
				navigation: [{ ...link("shared"), href: "javascript:bad" }],
				givePage: { _type: "reference", _ref: "homePage" },
			}),
		).toEqual([]);
	});
	it("rejects a country-only target in shared navigation and Give", async () => {
		const result = await errors({
			give: "Give",
			navigation: [link("au")],
			givePage: { _type: "reference", _ref: "nz" },
		});
		expect(result.map((marker) => marker.message)).toEqual(
			expect.arrayContaining([
				"Choose a published page available on Australia and New Zealand.",
			]),
		);
		expect(result.some((marker) => marker.path.includes("givePage"))).toBe(
			true,
		);
	});
	it("accepts country menus and validates their nested links", async () => {
		const header = {
			give: "Give",
			navigationMode: "country",
			navigationAU: [link("au")],
			navigationNZ: [
				{
					_key: "group",
					_type: "homepageHeaderLink",
					label: "Group",
					children: [{ ...link("nz"), _type: "homepageHeaderChildLink" }],
				},
			],
		};
		expect(await errors(header)).toEqual([]);
		expect(await errors({ ...header, navigationAU: [link("nz")] })).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					message: "Choose a published page available on Australia.",
				}),
			]),
		);
	});
	it("ignores unfinished references in inactive country menus", async () => {
		expect(
			await errors({
				give: "Give",
				navigation: [link("shared")],
				navigationAU: [link("missing")],
			}),
		).toEqual([]);
	});
	it("requires a destination or children and prevents direct-link/submenu conflicts", async () => {
		expect(
			await errors({
				give: "Give",
				navigation: [
					{ _key: "empty", _type: "homepageHeaderLink", label: "Empty" },
				],
			}),
		).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					message: "Add a destination or at least one child link.",
				}),
			]),
		);
		expect(
			await errors({
				give: "Give",
				navigation: [
					{
						...link("shared"),
						children: [{ ...link("shared"), _type: "homepageHeaderChildLink" }],
					},
				],
			}),
		).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					message:
						"Clear the category destination and include its overview page as a child link.",
				}),
			]),
		);
	});
	it("rejects missing or unpublished targets even when a stored reference is weak", async () => {
		expect(
			await errors({
				give: "Give",
				navigation: [
					{
						...link("missing"),
						page: { _type: "reference", _ref: "missing", _weak: true },
					},
				],
			}),
		).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					message:
						"Choose a published page available on Australia and New Zealand.",
				}),
			]),
		);
	});
});

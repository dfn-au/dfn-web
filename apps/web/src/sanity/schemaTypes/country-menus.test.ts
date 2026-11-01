import { createClient } from "@sanity/client";
import { createSchema, validateDocument, type Workspace } from "sanity";
import { describe, expect, it } from "vitest";
import { schema } from "./index";

const getClient = () =>
	createClient({
		projectId: "testproject",
		dataset: "test",
		apiVersion: "2026-06-10",
		useCdn: false,
	});
const workspace = {
	schema: createSchema({
		name: "menu-tests",
		types: [
			...schema.types,
			{
				name: "menuTest",
				type: "document",
				fields: [
					{ name: "header", type: "homepageHeader" },
					{ name: "footer", type: "homepageFooter" },
				],
			},
		],
	}),
	getClient,
	i18n: {
		currentLocale: { id: "en-US" },
		loadNamespaces: async () => {},
		t: ((key: string) => key) as Workspace["i18n"]["t"],
	},
};
const link = {
	_key: "about",
	_type: "homepageNavigationLink",
	label: "About",
	href: "/about",
};
const headerLink = { ...link, _type: "homepageHeaderLink" };
const office = (country: string) => ({
	_key: country,
	_type: "homepageOffice",
	country,
	address: [
		{
			_key: "address",
			_type: "block",
			style: "normal",
			markDefs: [],
			children: [{ _key: "text", _type: "span", marks: [], text: "Address" }],
		},
	],
	phone: "123",
	tel: "+123",
	email: "office@example.org",
});
const header = { navigation: [headerLink], give: "Give" };
const footer = {
	summary: "Summary",
	navigationTitle: "Explore",
	navigation: [link],
	legalNavigation: [link],
	copyright: "DFN",
	offices: [office("Australia"), office("New Zealand")],
};
async function errors(content: { header?: unknown; footer?: unknown }) {
	const markers = await validateDocument({
		document: {
			_id: "menu-test",
			_type: "menuTest",
			_rev: "test",
			_createdAt: "2026-11-01T00:00:00Z",
			_updatedAt: "2026-11-01T00:00:00Z",
			...content,
		},
		workspace,
	});
	return markers.filter((marker) => marker.level === "error");
}
describe("Country menu Studio validation", () => {
	it("accepts existing shared menus without country copies", async () => {
		expect(await errors({ header, footer })).toEqual([]);
	});
	it.each([
		["header", "navigation", header],
		["footer", "navigation", footer],
		["footer", "legalNavigation", footer],
	] as const)(
		"requires both country lists for %s.%s",
		async (section, name, value) => {
			const missing = await errors({
				[section]: { ...value, [`${name}Mode`]: "country" },
			});
			expect(missing.map((marker) => marker.path)).toEqual(
				expect.arrayContaining([
					[section, `${name}AU`],
					[section, `${name}NZ`],
				]),
			);
			const item = section === "header" ? headerLink : link;
			expect(
				await errors({
					[section]: {
						...value,
						[`${name}Mode`]: "country",
						[`${name}AU`]: [item],
						[`${name}NZ`]: [item],
					},
				}),
			).toEqual([]);
		},
	);
	it("rejects an empty country menu", async () => {
		expect(
			await errors({
				header: {
					...header,
					navigationMode: "country",
					navigationAU: [headerLink],
					navigationNZ: [],
				},
			}),
		).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: ["header", "navigationNZ"] }),
			]),
		);
	});
	it("validates links inside active country menus", async () => {
		const result = await errors({
			footer: {
				...footer,
				navigationMode: "country",
				navigationAU: [link],
				navigationNZ: [{ ...link, href: "javascript:alert(1)" }],
			},
		});
		expect(
			result.some(
				(marker) =>
					marker.path.includes("navigationNZ") && marker.path.includes("href"),
			),
		).toBe(true);
	});
	it("ignores unfinished hidden menus when switching back to shared", async () => {
		expect(
			await errors({
				header: {
					...header,
					navigationMode: "shared",
					navigationNZ: [
						{ _key: "unfinished", _type: "homepageHeaderLink", children: [] },
					],
				},
				footer: {
					...footer,
					navigationMode: "shared",
					navigationNZ: [
						{
							_key: "unfinished",
							_type: "homepageNavigationLink",
							href: "javascript:alert(1)",
						},
					],
				},
			}),
		).toEqual([]);
	});
	it("ignores unfinished shared menus when using valid country menus", async () => {
		expect(
			await errors({
				header: {
					...header,
					navigationMode: "country",
					navigation: [{ _key: "unfinished", _type: "homepageHeaderLink" }],
					navigationAU: [headerLink],
					navigationNZ: [headerLink],
				},
			}),
		).toEqual([]);
	});

	it("requires one office for each country", async () => {
		expect(
			await errors({
				footer: {
					...footer,
					offices: [office("Australia"), office("Australia")],
				},
			}),
		).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ path: ["footer", "offices"] }),
			]),
		);
	});
});

import { describe, expect, it } from "vitest";
import { pageLinkPatches } from "./links";

const targets = [
	{ _id: "homePage", _type: "homePage" },
	{
		_id: "about-id",
		_type: "page",
		slug: { current: "about" },
		publishingScope: ["AU", "NZ"],
	},
	{
		_id: "nz-id",
		_type: "page",
		slug: { current: "nz" },
		publishingScope: ["NZ"],
	},
];
const link = (href: string) => ({
	_key: href,
	_type: "homepageNavigationLink",
	href,
	label: "Link",
});
describe("Existing link migration", () => {
	it("patches published and draft links by stable array keys", () => {
		for (const _id of ["homePage", "drafts.homePage"]) {
			const patches = pageLinkPatches(
				{
					_id,
					_type: "homePage",
					header: {
						_type: "homepageHeader",
						giveHref: "/about",
						navigation: [
							{
								...link("/about"),
								_type: "homepageHeaderLink",
								children: [{ ...link("/"), _type: "homepageHeaderChildLink" }],
							},
						],
					},
				},
				targets,
			);
			expect(patches).toHaveLength(6);
			expect(patches[0]).toEqual({
				path: ["header", "givePage"],
				op: { type: "set", value: { _type: "reference", _ref: "about-id" } },
			});
			expect(patches[2].path).toEqual([
				"header",
				"navigation",
				{ _key: "/about" },
				"page",
			]);
		}
	});
	it("preserves external URLs, anchors, queries, unknown paths and existing references", () => {
		const document = {
			_type: "homePage",
			links: [
				...[
					"https://dfn.org.au/about",
					"https://example.org",
					"//example.org",
					"/missing",
					"/about?x=1",
					"/about#section",
					"#dh-work",
					"#",
				].map(link),
				{ ...link("/about"), page: { _ref: "already-selected" } },
			],
		};
		expect(pageLinkPatches(document, targets)).toEqual([]);
	});
	it("skips ambiguous routes and incompatible shared links", () => {
		expect(
			pageLinkPatches(
				{ _type: "homePage", ...{ navigation: [link("/nz")] } },
				targets,
			),
		).toEqual([]);
		expect(
			pageLinkPatches(
				{ _type: "homePage", ...{ navigation: [link("/about")] } },
				[...targets, { ...targets[1], _id: "duplicate" }],
			),
		).toEqual([]);
	});
	it("converts compatible country menus and page-section links", () => {
		expect(
			pageLinkPatches(
				{ _type: "homePage", ...{ footer: { navigationNZ: [link("/nz")] } } },
				targets,
			),
		).toHaveLength(2);
		expect(
			pageLinkPatches(
				{
					_type: "page",
					publishingScope: ["NZ"],
					...{ sections: [{ primaryAction: link("/nz") }] },
				},
				targets,
			),
		).toHaveLength(2);
	});
	it("does nothing when rerun after conversion", () => {
		expect(
			pageLinkPatches(
				{
					_type: "homePage",
					...{
						navigation: [
							{
								_key: "about",
								_type: "homepageNavigationLink",
								page: { _type: "reference", _ref: "about-id" },
								label: "About",
							},
						],
					},
				},
				targets,
			),
		).toEqual([]);
	});
});

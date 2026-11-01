import { evaluate, parse } from "groq-js";
import { describe, expect, it } from "vitest";
import { HOME_PAGE_QUERY, PAGE_QUERY, SITE_CHROME_QUERY } from "./queries";

const target = {
	_id: "about",
	_type: "page",
	slug: { current: "our-story" },
	publishingScope: ["AU", "NZ"],
};
const internal = {
	_key: "about",
	label: "About",
	page: { _type: "reference", _ref: "about" },
	href: "/stale",
};
const links = [
	internal,
	{ _key: "external", label: "External", href: "https://example.org/give" },
	{ _key: "anchor", label: "Our work", href: "#dh-work" },
];
const home = {
	_id: "homePage",
	_type: "homePage",
	header: {
		navigation: [internal, { _key: "group", label: "Group", children: links }],
		givePage: internal.page,
		giveHref: "https://dfn.org.au/donate/",
	},
	footer: { navigation: links, legalNavigation: links },
};
async function query(query: string, dataset: unknown[], countrySite = "AU") {
	return (
		await evaluate(parse(query), {
			dataset,
			params: { countrySite, slug: "source" },
		})
	).get();
}

describe.each([HOME_PAGE_QUERY, SITE_CHROME_QUERY])(
	"Page-reference navigation",
	(groq) => {
		it.each(["AU", "NZ"])(
			"resolves current slugs on %s while preserving URLs and anchors",
			async (site) => {
				const result = await query(groq, [home, target], site);
				expect(result.header.navigation[0].href).toBe("/our-story");
				expect(result.header.giveHref).toBe("/our-story");
				for (const menu of [
					result.header.navigation[1].children,
					result.footer.navigation,
					result.footer.legalNavigation,
				]) {
					expect(menu.map((link: { href: string }) => link.href)).toEqual([
						"/our-story",
						"https://example.org/give",
						"#dh-work",
					]);
				}
			},
		);
		it.each([{ scope: [] }, { scope: ["AU"] }])(
			"omits unavailable NZ references without reviving stored URLs (%j)",
			async ({ scope }) => {
				const result = await query(
					groq,
					[home, { ...target, publishingScope: scope }],
					"NZ",
				);
				expect(result.header.giveHref).toBeNull();
				expect(result.header.navigation).toHaveLength(1);
				expect(result.header.navigation[0].children).toHaveLength(2);
				expect(
					result.footer.navigation.map((link: { href: string }) => link.href),
				).toEqual(["https://example.org/give", "#dh-work"]);
			},
		);
		it("omits missing targets and groups left with no available children", async () => {
			const result = await query(groq, [
				{
					...home,
					header: {
						...home.header,
						navigation: [
							{ _key: "group", label: "Group", children: [internal] },
						],
					},
				},
			]);
			expect(result.header.navigation).toEqual([]);
			expect(result.header.giveHref).toBeNull();
		});
		it("resolves the homepage and pages with legacy shared scope", async () => {
			const result = await query(groq, [
				{ ...home, header: { ...home.header, givePage: { _ref: "homePage" } } },
				{ ...target, publishingScope: undefined },
			]);
			expect(result.header.giveHref).toBe("/");
			expect(result.header.navigation[0].href).toBe("/our-story");
		});
		it("selects references from the correct country menu", async () => {
			const result = await query(
				groq,
				[
					{
						...home,
						footer: {
							navigationMode: "country",
							navigationAU: links,
							navigationNZ: [{ ...internal, page: { _ref: "homePage" } }],
						},
					},
					target,
				],
				"NZ",
			);
			expect(
				result.footer.navigation.map((link: { href: string }) => link.href),
			).toEqual(["/"]);
		});
		it("retains the existing Give default only when no page is selected", async () => {
			const result = await query(groq, [
				{ _id: "homePage", _type: "homePage", header: { give: "Give" } },
			]);
			expect(result.header.giveHref).toBe("https://dfn.org.au/donate/");
		});
	},
);

it("resolves the same link fields in page sections and suppresses unavailable targets", async () => {
	const page = {
		_id: "source",
		_type: "page",
		slug: { current: "source" },
		sections: [
			{ _key: "numbered", _type: "numberedSection", link: internal },
			{
				_key: "actions",
				_type: "actionSection",
				links,
				primaryAction: internal,
				secondaryAction: internal,
			},
		],
	};
	const result = await query(PAGE_QUERY, [page, target]);
	expect(result.sections[0].link.href).toBe("/our-story");
	expect(result.sections[1].primaryAction.href).toBe("/our-story");
	expect(result.sections[1].secondaryAction.href).toBe("/our-story");
	const unavailable = await query(
		PAGE_QUERY,
		[page, { ...target, publishingScope: ["AU"] }],
		"NZ",
	);
	expect(unavailable.sections[0].link.href).toBeNull();
	expect(unavailable.sections[1].primaryAction.href).toBeNull();
	expect(unavailable.sections[1].links).toHaveLength(2);
});

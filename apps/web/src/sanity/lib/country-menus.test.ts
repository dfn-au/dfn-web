import { evaluate, parse } from "groq-js";
import { describe, expect, it } from "vitest";
import type { CountrySite } from "@/lib/country-site";
import { HOME_PAGE_QUERY, SITE_CHROME_QUERY } from "./queries";

const link = (key: string, href = `/${key}`) => ({
	_key: key,
	label: key,
	href,
});
const shared = [link("about"), link("contact")];
const au = [link("contact", "/au-contact"), link("about")];
const nz = [link("nz")];
const document = {
	_id: "homePage",
	_type: "homePage",
	header: { navigation: shared, navigationAU: au, navigationNZ: nz },
	footer: {
		navigation: shared,
		navigationAU: au,
		navigationNZ: nz,
		legalNavigation: shared,
		legalNavigationAU: au,
		legalNavigationNZ: nz,
		offices: [
			{ _key: "au", country: "Australia", email: "AU@example.org" },
			{ _key: "nz", country: "New Zealand", email: "NZ@example.org" },
		],
	},
};
async function fetchChrome(
	query: string,
	countrySite: CountrySite,
	content: unknown = document,
) {
	return (
		await evaluate(parse(query), {
			dataset: [content],
			params: { countrySite },
		})
	).get();
}
const destinations = (items: { href: string }[]) =>
	items.map((item) => item.href);

// Exercise both public queries, including nested header links and menu ordering.
describe.each([HOME_PAGE_QUERY, SITE_CHROME_QUERY])(
	"Country menus query",
	(query) => {
		it.each(["AU", "NZ"] as const)(
			"keeps existing shared menus on %s and selects its office",
			async (site) => {
				const result = await fetchChrome(query, site);
				expect(destinations(result.header.navigation)).toEqual([
					"/about",
					"/contact",
				]);
				expect(result.footer.navigation).toEqual(result.footer.legalNavigation);
				expect(result.footer.offices).toHaveLength(1);
				expect(result.footer.offices[0].email).toBe(`${site}@example.org`);
			},
		);
		it.each(["AU", "NZ"] as const)(
			"selects %s ordering, destinations and nested header links",
			async (site) => {
				const result = await fetchChrome(query, site, {
					...document,
					header: {
						...document.header,
						navigationMode: "country",
						navigationAU: [{ ...link("work"), children: au }],
						navigationNZ: [{ ...link("work"), children: nz }],
					},
					footer: {
						...document.footer,
						navigationMode: "country",
						legalNavigationMode: "country",
					},
				});
				expect(destinations(result.footer.navigation)).toEqual(
					site === "AU" ? ["/au-contact", "/about"] : ["/nz"],
				);
				expect(result.footer.legalNavigation).toEqual(result.footer.navigation);
				expect(destinations(result.header.navigation[0].children)).toEqual(
					destinations(result.footer.navigation),
				);
			},
		);
		it("lets each menu choose its own mode", async () => {
			const result = await fetchChrome(query, "NZ", {
				...document,
				footer: { ...document.footer, legalNavigationMode: "country" },
			});
			expect(result.header.navigation[0].label).toBe("about");
			expect(result.footer.navigation[0].label).toBe("about");
			expect(result.footer.legalNavigation[0].label).toBe("nz");
		});
		it.each([undefined, []])(
			"does not substitute another menu or office for missing NZ content (%j)",
			async (missing) => {
				const result = await fetchChrome(query, "NZ", {
					...document,
					header: {
						...document.header,
						navigationMode: "country",
						navigationNZ: missing,
					},
					footer: {
						...document.footer,
						navigationMode: "country",
						legalNavigationMode: "country",
						navigationNZ: missing,
						legalNavigationNZ: missing,
						offices: [document.footer.offices[0]],
					},
				});
				expect(result.header.navigation).toEqual(missing ?? null);
				expect(result.footer.navigation).toEqual(missing ?? null);
				expect(result.footer.legalNavigation).toEqual(missing ?? null);
				expect(result.footer.offices).toEqual([]);
			},
		);
	},
);

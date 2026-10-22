import { describe, expect, it } from "vitest";
import {
	openingSectionScopeError,
	parseCountrySite,
	sectionScopeError,
} from "./country-site";

describe("COUNTRY_SITE", () => {
	it.each(["AU", "NZ"] as const)("accepts %s", (value) => {
		expect(parseCountrySite(value)).toBe(value);
	});

	it.each([
		[undefined, "not set"],
		["", '""'],
		["au", '"au"'],
		["US", '"US"'],
		[" AU", '" AU"'],
	])("rejects %j with a clear error", (value, shown) => {
		expect(() => parseCountrySite(value)).toThrow(
			`COUNTRY_SITE must be AU or NZ, but it is ${shown}.`,
		);
	});
});

describe("section Publishing Scope", () => {
	it("lets a section narrow its page to one site", () => {
		expect(sectionScopeError("NZ", ["AU", "NZ"])).toBeUndefined();
		expect(sectionScopeError("AU", ["AU"])).toBeUndefined();
		expect(sectionScopeError(undefined, ["AU"])).toBeUndefined();
		// Pages saved before Publishing Scope are published to both sites.
		expect(sectionScopeError("NZ", undefined)).toBeUndefined();
	});

	it("rejects a section limited to a site the page isn't published to", () => {
		expect(sectionScopeError("NZ", ["AU"])).toMatch(
			"This page isn't published to NZ.",
		);
	});

	it("keeps the opening section on every site that publishes the page", () => {
		expect(openingSectionScopeError(undefined, ["AU", "NZ"])).toBeUndefined();
		expect(openingSectionScopeError("AU", ["AU"])).toBeUndefined();
		expect(openingSectionScopeError("AU", ["AU", "NZ"])).toMatch(
			"Show the opening section on every site",
		);
		expect(openingSectionScopeError("NZ", undefined)).toMatch(
			"Show the opening section on every site",
		);
	});
});

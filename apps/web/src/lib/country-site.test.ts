import { describe, expect, it } from "vitest";
import { parseCountrySite } from "./country-site";

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

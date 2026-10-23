import { describe, expect, it } from "vitest";
import { publicNavigationHref } from "../homepage/navigation";
import {
	resolveBodyPreview,
	resolveBrandPreview,
	resolveHeadingPreview,
	resolveIconPreview,
	resolveLabelPreview,
	resolveLogoPreview,
} from "./brand-preview";

function resolveChoices(value: unknown) {
	return {
		brand: resolveBrandPreview(value),
		headings: resolveHeadingPreview(value),
		body: resolveBodyPreview(value),
		logo: resolveLogoPreview(value),
		labels: resolveLabelPreview(value),
		icons: resolveIconPreview(value),
	};
}

describe("selected brand defaults", () => {
	it.each([undefined, null, "unknown", ["current"]])(
		"uses the selected defaults for missing or invalid choices (%j)",
		(value) => {
			expect(resolveChoices(value)).toEqual({
				brand: "white-text",
				headings: "existing",
				body: "andada",
				logo: "current",
				labels: "vinyl",
				icons: "guide",
			});
		},
	);
	it("keeps the original design explicitly selectable", () => {
		expect(Object.values(resolveChoices("current"))).toEqual(
			Array(6).fill("current"),
		);
	});
	it.each([
		["white-text", "existing", "andada", "current", "vinyl", "guide"],
		["current", "current", "current", "current", "current", "current"],
		["proposed", "battersea", "andada", "guide", "current", "guide"],
	] as const)(
		"preserves every choice across navigation and reload (%s, %s, %s, %s, %s, %s)",
		(brand, headings, body, logo, labels, icons) => {
			const href = publicNavigationHref(
				"/about?ref=home#team",
				"charcoal",
				false,
				brand,
				headings,
				body,
				logo,
				labels,
				icons,
			);
			const url = new URL(href, "https://local.invalid");
			expect(url.searchParams.get("ref")).toBe("home");
			expect(url.searchParams.get("clean")).toBe("1");
			expect(url.hash).toBe("#team");
			expect([
				resolveBrandPreview(url.searchParams.get("brand")),
				resolveHeadingPreview(url.searchParams.get("headings")),
				resolveBodyPreview(url.searchParams.get("body")),
				resolveLogoPreview(url.searchParams.get("logo")),
				resolveLabelPreview(url.searchParams.get("labels")),
				resolveIconPreview(url.searchParams.get("icons")),
			]).toEqual([brand, headings, body, logo, labels, icons]);
		},
	);
});

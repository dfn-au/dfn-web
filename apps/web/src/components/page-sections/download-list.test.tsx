// @vitest-environment jsdom
import { evaluate, parse } from "groq-js";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { PAGE_QUERY, type Page } from "@/sanity/lib/queries";
import fixtures from "../../test/fixtures/downloads.json";
import { RenderSections } from "./render-sections";

vi.mock("@/sanity/lib/image", () => ({
	urlFor: () => ({ url: () => "/image-slot.svg" }),
}));

async function render(
	slug = "reports",
	dataset = fixtures,
	countrySite = "AU",
) {
	const result = await evaluate(parse(PAGE_QUERY), {
		dataset,
		params: { slug, countrySite },
	});
	const page: Page = await result.get();
	const markup = renderToStaticMarkup(
		<RenderSections title={page.title ?? ""} sections={page.sections ?? []} />,
	);
	return new DOMParser().parseFromString(markup, "text/html");
}

function annualDownloads(dataset: typeof fixtures) {
	const section = dataset
		.find((p) => p._id === "test-downloads")
		?.sections?.find((s) => s._key === "annual");
	if (!section || !("downloads" in section) || !section.downloads)
		throw new Error("Missing annual reports fixture");
	return section.downloads;
}

describe("Page downloads", () => {
	it.each(["AU", "NZ"])(
		"queries and renders files, URLs, dates and a single booklet on %s",
		async (country) => {
			const doc = await render("reports", fixtures, country);
			expect(
				[...doc.querySelectorAll("ol a")].map((a) => [
					a.textContent,
					a.getAttribute("href"),
				]),
			).toEqual([
				[
					"Annual report 2025 (sample)Open PDF",
					"https://example.org/annual-report-2025.pdf",
				],
				[
					"Annual report 2024 (sample)Open resource",
					"https://example.org/annual-report-2024.pdf",
				],
				["Booklet (sample)Open resource", "https://example.org/booklet.pdf"],
			]);
			expect(
				[...doc.querySelectorAll("time")].map((t) => [
					t.dateTime,
					t.textContent,
				]),
			).toEqual([
				["2026-03-01", "1 March 2026"],
				["2025-03-01", "1 March 2025"],
			]);
			expect(doc.querySelectorAll("ol")[1].children).toHaveLength(1);
			expect(doc.querySelectorAll("h1")).toHaveLength(1);
		},
	);
	it("preserves edited order and exact resource URLs", async () => {
		const edited = structuredClone(fixtures);
		const item = annualDownloads(edited).reverse()[0];
		if (!item) throw new Error("Missing fixture");
		item.title = "Updated report title";
		item.url = "https://example.org/report.pdf?version=2&download=1#page=3";
		const doc = await render("reports", edited);
		const first = doc.querySelector("ol a");
		expect(first?.textContent).toContain("Updated report title");
		expect(first?.getAttribute("href")).toBe(item.url);
	});
	it("does not revive a stale URL when the selected file cannot be resolved", async () => {
		const edited = structuredClone(fixtures);
		const file = annualDownloads(edited)[0];
		if (!file || !("file" in file) || !file.file)
			throw new Error("Missing fixture");
		file.file.asset._ref = "missing-file";
		Object.assign(file, { url: "https://example.org/stale.pdf" });
		const doc = await render("reports", edited);
		expect(doc.body.textContent).not.toContain("Annual report 2025 (sample)");
		expect(doc.body.innerHTML).not.toContain("stale.pdf");
	});
	it("omits unsafe destinations and tolerates a draft's invalid date", async () => {
		const edited = structuredClone(fixtures);
		const item = annualDownloads(edited)[1];
		if (!item) throw new Error("Missing fixture");
		item.url = "javascript:alert(1)";
		if (!("date" in item)) throw new Error("Missing dated fixture");
		item.date = "invalid";
		const doc = await render("reports", edited);
		expect(doc.body.innerHTML).not.toContain("javascript:");
		expect(doc.body.textContent).not.toContain("Invalid Date");
	});
});

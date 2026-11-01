import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SectorMarker } from "./sector-marker";

describe("sector markers", () => {
	it("keeps the artwork tied to programme identity when its position changes", () => {
		const markup = renderToStaticMarkup(
			<SectorMarker id="area-health" number="04" separator />,
		);
		expect(markup).toContain("healthcare.svg");
		expect(markup).toContain("04 / ");
		expect(markup).not.toContain("trafficking-prevention.svg");
	});
	it("keeps numbers for additional programmes with no matching guide artwork", () => {
		expect(
			renderToStaticMarkup(
				<SectorMarker id="area-new" number="05" separator />,
			),
		).toBe("05 / ");
	});
});

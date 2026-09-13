// @vitest-environment jsdom
import { act, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { PalettePreview } from "./palette-preview";

const router = vi.hoisted(() => ({ search: new URLSearchParams() }));
vi.mock("next/navigation", () => ({ useSearchParams: () => router.search }));

const container = document.createElement("div");
document.body.append(container);
let root = createRoot(container);
async function render(children: ReactNode) {
	await act(() => root.render(children));
}
afterEach(async () => {
	await act(() => root.unmount());
	root = createRoot(container);
	router.search = new URLSearchParams();
});

it("reads palette and visibility from the current router URL across transitions", async () => {
	const preview = (
		<PalettePreview initialPalette="charcoal" showControls>
			Content
		</PalettePreview>
	);
	router.search = new URLSearchParams("variant=olive&clean=1");
	await render(preview);
	expect(
		container.querySelector("[data-palette]")?.getAttribute("data-palette"),
	).toBe("olive");
	expect(container.querySelector('nav[aria-label="Colour scheme"]')).toBeNull();
	router.search = new URLSearchParams("variant=ink");
	await render(
		<PalettePreview initialPalette="charcoal" showControls>
			Next page
		</PalettePreview>,
	);
	expect(
		container.querySelector("[data-palette]")?.getAttribute("data-palette"),
	).toBe("ink");
	expect(
		container.querySelector('nav[aria-label="Colour scheme"]'),
	).not.toBeNull();
	router.search = new URLSearchParams();
	await render(
		<PalettePreview initialPalette="olive" showControls={false}>
			Back
		</PalettePreview>,
	);
	expect(
		container.querySelector("[data-palette]")?.getAttribute("data-palette"),
	).toBe("charcoal");
	expect(
		container.querySelector('nav[aria-label="Colour scheme"]'),
	).not.toBeNull();
});

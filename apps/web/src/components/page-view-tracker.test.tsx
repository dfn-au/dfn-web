// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { PageViewTracker } from "./page-view-tracker";

const capture = vi.hoisted(() => vi.fn());
vi.mock("posthog-js", () => ({ default: { capture } }));
it("keeps named content pageviews on each page visit without firing on a same-page rerender", async () => {
	const root = createRoot(document.createElement("div"));
	for (const slug of ["about", "about", "contact", "about"]) {
		await act(() =>
			root.render(
				<PageViewTracker
					key={slug}
					event="content_page_viewed"
					properties={{ slug }}
				/>,
			),
		);
	}
	await act(() => root.unmount());
	expect(capture.mock.calls).toEqual([
		["content_page_viewed", { slug: "about" }],
		["content_page_viewed", { slug: "contact" }],
		["content_page_viewed", { slug: "about" }],
	]);
});

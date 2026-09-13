// @vitest-environment jsdom
import {
	act,
	type ComponentPropsWithRef,
	createRef,
	type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import { ExternalLink } from "../external-link";
import type { SectionBody } from "../page-sections/types";
import { PageBody } from "../portable-text";
import { LinkContext } from "./link-context";
import { SiteLink } from "./site-link";

// Assert the choice of renderer without replacing SiteLink or its wrappers.
// Real Next interception and browser history are checked in the local site.
vi.mock("next/link", () => ({
	default: (props: ComponentPropsWithRef<"a">) => (
		<a {...props} data-next-link />
	),
}));
vi.mock("@/sanity/lib/image", () => ({ urlFor: () => ({ url: () => "" }) }));
const capture = vi.hoisted(() => vi.fn());
vi.mock("posthog-js", () => ({ default: { capture } }));

const container = document.createElement("div");
document.body.append(container);
let root = createRoot(container);
async function render(children: ReactNode) {
	await act(() =>
		root.render(
			<LinkContext.Provider
				value={{
					controlsVisible: false,
					documentUrl: "https://dfn.org.au/about/",
				}}
			>
				{children}
			</LinkContext.Provider>,
		),
	);
	const anchor = container.querySelector("a");
	if (!anchor) throw new Error("Expected a link");
	return anchor;
}
afterEach(async () => {
	await act(() => root.unmount());
	root = createRoot(container);
	capture.mockClear();
});

it.each([
	["/contact", true, "/contact"],
	["../contact", true, "../contact"],
	["https://dfn.org.au/contact", true, "https://dfn.org.au/contact"],
	["//dfn.org.au/contact", true, "//dfn.org.au/contact"],
	["https://dfn.org.nz/contact", false, "https://dfn.org.nz/contact"],
	["#team", false, "#team"],
	["mailto:info@dfn.org.au", false, "mailto:info@dfn.org.au"],
	["tel:123", false, "tel:123"],
	["/report.pdf", false, "/report.pdf"],
])(
	"renders the appropriate same-tab anchor for %s",
	async (href, next, finalHref) => {
		const anchor = await render(<SiteLink href={href}>Visit</SiteLink>);
		expect(anchor.hasAttribute("data-next-link")).toBe(next);
		expect(anchor.getAttribute("href")).toBe(finalHref);
		expect(anchor.hasAttribute("target")).toBe(false);
		expect(capture).not.toHaveBeenCalled();
	},
);

it("keeps explicit document navigation and downloads native and forwards refs", async () => {
	const ref = createRef<HTMLAnchorElement>();
	let anchor = await render(
		<SiteLink href="/donate" navigation="document" ref={ref}>
			Give
		</SiteLink>,
	);
	expect(ref.current).toBe(anchor);
	expect(anchor.getAttribute("href")).toBe("/donate");
	expect(anchor.hasAttribute("data-next-link")).toBe(false);
	anchor = await render(
		<SiteLink href="/contact" download>
			Download
		</SiteLink>,
	);
	expect(anchor.hasAttribute("download")).toBe(true);
	expect(anchor.hasAttribute("data-next-link")).toBe(false);
});

it.each([
	{},
	{ ctrlKey: true },
	{ metaKey: true },
	{ shiftKey: true },
	{ altKey: true },
	{ detail: 0 },
])("retains native activation and one legacy event for %j", async (options) => {
	const onClick = vi.fn();
	const href = "https://example.org/?campaign=1";
	const anchor = await render(
		<ExternalLink href={href} onClick={onClick}>
			Visit
		</ExternalLink>,
	);
	let cancelled = true;
	// Stop jsdom navigation only after React's handlers have run.
	document.addEventListener(
		"click",
		(event) => {
			cancelled = event.defaultPrevented;
			event.preventDefault();
		},
		{ once: true },
	);
	const event = new MouseEvent("click", {
		bubbles: true,
		cancelable: true,
		...options,
	});
	await act(() => {
		anchor.dispatchEvent(event);
	});
	expect(onClick).toHaveBeenCalledTimes(1);
	expect(cancelled).toBe(false);
	expect(capture).toHaveBeenCalledExactlyOnceWith("external_link_clicked", {
		href,
	});
});

it("honours caller cancellation without capturing a legacy click", async () => {
	const anchor = await render(
		<ExternalLink
			href="https://example.org"
			onClick={(event) => event.preventDefault()}
		>
			Visit
		</ExternalLink>,
	);
	const event = new MouseEvent("click", { bubbles: true, cancelable: true });
	await act(() => {
		anchor.dispatchEvent(event);
	});
	expect(event.defaultPrevented).toBe(true);
	expect(capture).not.toHaveBeenCalled();
});

it.each([
	["https://dfn.org.au/contact", true],
	["https://dfn.org.nz/contact", true],
	["http://example.org", true],
	["//example.org", false],
	["/contact", false],
])(
	"preserves the existing rich-text event eligibility for %s",
	async (href, tracked) => {
		const body: SectionBody = [
			{
				_type: "block",
				_key: "body",
				style: "normal",
				markDefs: [{ _type: "link", _key: "link", href }],
				children: [
					{ _type: "span", _key: "text", text: "Visit", marks: ["link"] },
				],
			},
		];
		const anchor = await render(<PageBody value={body} />);
		document.addEventListener("click", (event) => event.preventDefault(), {
			once: true,
		});
		await act(() => {
			anchor.dispatchEvent(
				new MouseEvent("click", { bubbles: true, cancelable: true }),
			);
		});
		expect(capture).toHaveBeenCalledTimes(tracked ? 1 : 0);
		if (tracked)
			expect(capture).toHaveBeenCalledWith("external_link_clicked", { href });
	},
);

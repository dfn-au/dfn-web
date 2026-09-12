"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { type Palette, palettes, resolvePalette } from "../palettes";

const labels: Record<Palette, string> = {
	charcoal: "Warm charcoal",
	olive: "Olive",
	ink: "Deep ink",
	umber: "Earthy umber",
};

export function PalettePreview({
	initialPalette,
	showControls,
	children,
}: {
	initialPalette: Palette;
	showControls: boolean;
	children: ReactNode;
}) {
	const [palette, setPalette] = useState(initialPalette);
	useEffect(() => {
		const sync = () =>
			setPalette(
				resolvePalette(new URLSearchParams(location.search).get("variant")),
			);
		addEventListener("popstate", sync);
		return () => removeEventListener("popstate", sync);
	}, []);
	function changePalette(value: string) {
		const next = resolvePalette(value);
		setPalette(next);
		const url = new URL(location.href);
		url.searchParams.set("variant", next);
		history.replaceState(null, "", url);
	}
	return (
		<div
			id="dfn-home"
			data-palette={palette}
			className="@container min-h-screen bg-page font-body font-normal text-ink [color-scheme:dark] [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-ink"
		>
			<div id="dh-top">{children}</div>
			{showControls && (
				<nav
					aria-label="Design comparison"
					className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100%-16px)] -translate-x-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-3xl border border-stone-300 bg-stone-100 px-4 py-2 font-body text-xs leading-normal text-stone-900 shadow-xl [color-scheme:light]"
				>
					<span className="font-semibold">React + Tailwind</span>
					<select
						aria-label="Colour palette"
						value={palette}
						onChange={(event) => changePalette(event.target.value)}
						className="min-h-8 cursor-pointer bg-transparent"
					>
						{palettes.map((value) => (
							<option key={value} value={value}>
								{labels[value]}
							</option>
						))}
					</select>
					<a href={`?variant=${palette}&clean=1`} className="py-1">
						Hide controls
					</a>
				</nav>
			)}
		</div>
	);
}

"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { PaletteContext } from "./navigation-link";
import { type Palette, palettes, resolvePalette } from "./palettes";

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
	const [controlsVisible, setControlsVisible] = useState(showControls);
	useEffect(() => {
		const sync = () => {
			const params = new URLSearchParams(location.search);
			setPalette(resolvePalette(params.get("variant")));
			setControlsVisible(params.get("clean") !== "1");
		};
		sync();
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
	function cyclePalette(direction: number) {
		changePalette(
			palettes[
				(palettes.indexOf(palette) + direction + palettes.length) %
					palettes.length
			],
		);
	}
	return (
		<div
			id="dfn-home"
			data-palette={palette}
			className="@container min-h-screen bg-page font-body font-normal text-ink [color-scheme:dark] [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-ink"
		>
			<PaletteContext.Provider value={{ palette, controlsVisible }}>
				<div id="dh-top">{children}</div>
			</PaletteContext.Provider>
			{controlsVisible && (
				<nav
					aria-label="Colour scheme"
					className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 z-50 flex max-w-[calc(100%-16px)] -translate-x-1/2 items-center gap-[3px] rounded-full border border-[#ccc4b9] bg-[#f4f0e9] p-[5px] font-sans text-sm leading-normal font-medium text-[#272522] shadow-[0_4px_24px_#0005] [color-scheme:light] [&_:focus-visible]:outline-[#272522]"
				>
					<button
						type="button"
						aria-label="Previous colour palette"
						onClick={() => cyclePalette(-1)}
						className="size-11 shrink-0 cursor-pointer rounded-full hover:bg-black/5 max-[360px]:w-8"
					>
						←
					</button>
					<span
						aria-hidden="true"
						className="size-[15px] shrink-0 rounded-full border border-black/20 bg-page"
					/>
					<select
						aria-label="Colour palette"
						value={palette}
						onChange={(event) => changePalette(event.target.value)}
						className="min-h-11 w-[145px] min-w-0 cursor-pointer bg-transparent pr-1 pl-1.5 max-[360px]:w-[120px] max-[360px]:text-xs"
					>
						{palettes.map((value) => (
							<option key={value} value={value}>
								{labels[value]}
							</option>
						))}
					</select>
					<button
						type="button"
						aria-label="Next colour palette"
						onClick={() => cyclePalette(1)}
						className="size-11 shrink-0 cursor-pointer rounded-full hover:bg-black/5 max-[360px]:w-8"
					>
						→
					</button>
					<a
						aria-label="Hide controls"
						href={`?variant=${palette}&clean=1`}
						className="flex min-h-11 shrink-0 items-center border-l border-[#cfc7bb] px-2 text-[13px] max-[360px]:px-1 max-[360px]:text-xs"
					>
						Hide<span className="max-[360px]:hidden">&nbsp;controls</span>
					</a>
				</nav>
			)}
		</div>
	);
}

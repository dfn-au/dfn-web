"use client";

import { type ComponentProps, createContext, useContext } from "react";
import type { Palette } from "../palettes";

export const PreviewContext = createContext<{
	palette: Palette;
	controlsVisible: boolean;
}>({ palette: "charcoal", controlsVisible: true });

export function PreviewLink({
	page = "home",
	hash,
	...props
}: Omit<ComponentProps<"a">, "href"> & { page?: string; hash?: string }) {
	const { palette, controlsVisible } = useContext(PreviewContext);
	const root = process.env.NEXT_PUBLIC_DESIGN_ROOT ?? "/design-refresh";
	const path = page === "home" ? `${root}/` : `${root}/${page}/`;
	return (
		<a
			{...props}
			href={`${path}?variant=${palette}${controlsVisible ? "" : "&clean=1"}${hash ? `#${hash}` : ""}`}
		/>
	);
}

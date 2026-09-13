import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

import type { SectionBody } from "./page-sections/types";

type SanityImageValue = Extract<SectionBody[number], { _type: "image" }>;

type SanityImageProps = {
	value: SanityImageValue;
	width?: number;
	className?: string;
	priority?: boolean;
};

export function SanityImage({
	value,
	width: requestedWidth = 1200,
	className,
	priority,
}: SanityImageProps) {
	if (!value.asset) return null;

	const dimensions = value.asset.metadata?.dimensions;
	const naturalWidth = dimensions?.width ?? requestedWidth;
	const naturalHeight = dimensions?.height ?? Math.round(requestedWidth / 1.5);
	const width = Math.min(requestedWidth, naturalWidth);
	const height = Math.round((width / naturalWidth) * naturalHeight);
	const lqip = value.asset.metadata?.lqip;
	// biome-ignore lint/suspicious/noFocusedTests: This is Sanity's image fit method, not a focused test.
	const src = urlFor(value).width(width).height(height).fit("max").url();

	return (
		<Image
			className={className}
			src={src}
			alt={value.alt ?? ""}
			width={width}
			height={height}
			priority={priority}
			placeholder={lqip ? "blur" : "empty"}
			blurDataURL={lqip ?? undefined}
		/>
	);
}

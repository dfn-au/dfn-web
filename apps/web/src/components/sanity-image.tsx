import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

type SanityImageValue = {
	alt?: string | null;
	hotspot?: unknown;
	crop?: unknown;
	asset?: {
		_id?: string;
		url?: string;
		metadata?: {
			lqip?: string;
			dimensions?: {
				width?: number;
				height?: number;
			};
		};
	} | null;
};

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

	return (
		<Image
			className={className}
			src={urlFor(value).width(width).height(height).fit("max").url()}
			alt={value.alt ?? ""}
			width={width}
			height={height}
			priority={priority}
			placeholder={lqip ? "blur" : "empty"}
			blurDataURL={lqip}
		/>
	);
}

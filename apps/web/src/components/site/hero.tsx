import type { ReactNode } from "react";
import type { HomepageContent } from "@/components/homepage/content";
import { ButtonLink, Eyebrow, Headline, Photo } from "./primitives";

export function Hero({
	content,
	headerElement,
}: {
	content: HomepageContent["hero"];
	headerElement: ReactNode;
}) {
	return (
		<div className="relative mx-auto max-w-[1920px] px-2.5 @desktop:px-frame @desktop:pt-frame">
			{headerElement}
			<section
				className="relative bg-paper @desktop:flex @desktop:min-h-[clamp(580px,34cqi,640px)] @desktop:items-end @desktop:px-hero @desktop:pt-[170px] @desktop:pb-12"
				aria-labelledby="hero-title"
			>
				<Photo
					image={content.photograph}
					alt={content.photograph?.alt ?? ""}
					priority
					className="relative h-[clamp(320px,65cqi,360px)] w-full object-cover object-[82%_center] @desktop:absolute @desktop:inset-0 @desktop:h-full @desktop:object-[center_14%]"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 hidden bg-hero-desktop @desktop:block"
				/>
				<div className="relative z-1 px-[max(14px,calc((100cqi-560px)/2-10px))] pt-[30px] pb-[34px] text-white @desktop:max-w-[435px] @desktop:p-0">
					<Eyebrow>{content.eyebrow}</Eyebrow>
					<h1
						id="hero-title"
						className="mt-[13px] mb-[17px] font-display text-[clamp(35px,9.5cqi,48px)] leading-[1.06] font-medium tracking-[-1.5px] @desktop:text-[clamp(36px,5.3cqi,56px)]"
					>
						<Headline text={content.headline} />
					</h1>
					<p className="mb-6 max-w-[38ch] text-copy leading-[1.65] @desktop:max-w-[36ch]">
						{content.description}
					</p>
					<ButtonLink href="#dh-work">{content.actionLabel}</ButtonLink>
				</div>
			</section>
		</div>
	);
}

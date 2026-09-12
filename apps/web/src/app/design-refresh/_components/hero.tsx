import { ButtonLink, Eyebrow, Photo } from "./primitives";
import { SiteHeader } from "./site-header";

export function Hero() {
	return (
		<div className="relative mx-auto max-w-[1920px] px-2.5 @desktop:px-frame @desktop:pt-frame">
			<SiteHeader overlay />
			<section
				className="relative bg-paper @desktop:flex @desktop:min-h-[clamp(580px,34cqi,640px)] @desktop:items-end @desktop:px-hero @desktop:pt-[170px] @desktop:pb-12"
				aria-labelledby="hero-title"
			>
				<Photo
					name="hero"
					alt="A woman and child photographed for DFN"
					priority
					className="relative h-[clamp(320px,65cqi,360px)] w-full object-cover object-[82%_center] @desktop:absolute @desktop:inset-0 @desktop:h-full @desktop:object-[center_14%]"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 hidden bg-hero-desktop @desktop:block"
				/>
				<div className="relative z-1 px-[max(14px,calc((100cqi-560px)/2-10px))] pt-[30px] pb-[34px] text-white @desktop:max-w-[435px] @desktop:p-0">
					<Eyebrow>Dignity Freedom Network</Eyebrow>
					<h1
						id="hero-title"
						className="mt-[13px] mb-[17px] font-display text-[clamp(35px,9.5cqi,48px)] leading-[1.06] font-medium tracking-[-1.5px] @desktop:text-[clamp(36px,5.3cqi,56px)]"
					>
						Dignity. Freedom.
						<br />
						Opportunity.
					</h1>
					<p className="mb-6 max-w-[38ch] text-copy leading-[1.65] @desktop:max-w-[36ch]">
						Locally led education, healthcare and livelihood programmes,
						alongside protection for vulnerable communities in South Asia.
					</p>
					<ButtonLink href="#dh-work">Explore our work</ButtonLink>
				</div>
			</section>
		</div>
	);
}

import type { HomepageContent } from "@/components/homepage/content";
import { Arrow, ButtonLink, DesignLink, Eyebrow, Headline } from "./primitives";

export function Involvement({
	content,
	placeholderLinks = false,
}: {
	content: HomepageContent["involvement"];
	placeholderLinks?: boolean;
}) {
	const destinations = [
		"https://dfn.org.au/give/",
		"https://dfn.org.au/events/upcoming-events/dinners/",
		"https://dfn.org.au/help/advocate/",
	];
	return (
		<section
			id="dh-involved"
			className="mx-frame bg-involved px-stack-band py-10 text-ink @desktop:px-band @desktop:pt-[46px] @desktop:pb-[38px]"
		>
			<div className="mb-10 flex flex-col items-start gap-6">
				<div>
					<Eyebrow className="mb-3.5 text-accent">{content.eyebrow}</Eyebrow>
					<h2 className="font-display text-[36px] leading-[1.1] font-normal tracking-[-1px] @tablet:text-[42px]">
						<Headline text={content.headline} />
					</h2>
				</div>
				<ButtonLink
					light
					href={placeholderLinks ? "#" : "https://dfn.org.au/donate/"}
				>
					{content.actionLabel}
				</ButtonLink>
			</div>
			<div className="grid gap-6 @desktop:grid-cols-3 @desktop:gap-[30px] @wide:gap-[38px]">
				{(content.opportunities ?? []).map((way, index) => (
					<div
						key={way._key}
						className="border-t border-rule pt-[19px] @tablet:pt-5"
					>
						<h3 className="mb-2.5 text-[17px] leading-[1.4] font-medium">
							{way.title}
						</h3>
						<p className="mb-2.5 text-copy leading-[1.65] text-muted">
							{way.description}
						</p>
						<DesignLink
							href={placeholderLinks ? "#" : (destinations[index] ?? "#")}
							className="inline-flex min-h-11 items-center gap-[18px] py-2.5 text-label leading-normal font-medium text-accent"
						>
							{way.actionLabel}
							<Arrow />
						</DesignLink>
					</div>
				))}
			</div>
		</section>
	);
}

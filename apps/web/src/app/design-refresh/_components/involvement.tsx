import { Arrow, ButtonLink, DesignLink, Eyebrow } from "./primitives";

export function Involvement() {
	const ways = [
		{
			title: "Give in your own way.",
			body: "Discover ways to support DFN’s work across our four areas of focus.",
			href: "https://dfn.org.au/give/",
			link: "Ways to give",
		},
		{
			title: "Bring people together.",
			body: "Join a DFN event or organise an event of your own.",
			href: "https://dfn.org.au/events/upcoming-events/dinners/",
			link: "Explore events",
		},
		{
			title: "Use your voice.",
			body: "Help others learn about the work and the communities behind it.",
			href: "https://dfn.org.au/help/advocate/",
			link: "Become an advocate",
		},
	];
	return (
		<section
			id="dh-involved"
			className="mx-frame bg-involved px-stack-band py-10 text-ink @desktop:px-band @desktop:pt-[46px] @desktop:pb-[38px]"
		>
			<div className="mb-10 flex flex-col items-start gap-6">
				<div>
					<Eyebrow className="mb-3.5 text-accent">
						Be part of the change
					</Eyebrow>
					<h2 className="font-display text-[36px] leading-[1.1] font-normal tracking-[-1px] @tablet:text-[42px]">
						There’s a place
						<br />
						for you in this work.
					</h2>
				</div>
				<ButtonLink light href="https://dfn.org.au/donate/">
					Make a donation
				</ButtonLink>
			</div>
			<div className="grid gap-6 @desktop:grid-cols-3 @desktop:gap-[30px] @wide:gap-[38px]">
				{ways.map((way) => (
					<div
						key={way.title}
						className="border-t border-rule pt-[19px] @tablet:pt-5"
					>
						<h3 className="mb-2.5 text-[17px] leading-[1.4] font-medium">
							{way.title}
						</h3>
						<p className="mb-2.5 text-copy leading-[1.65] text-muted">
							{way.body}
						</p>
						<DesignLink
							href={way.href}
							className="inline-flex min-h-11 items-center gap-[18px] py-2.5 text-label leading-normal font-medium text-accent"
						>
							{way.link}
							<Arrow />
						</DesignLink>
					</div>
				))}
			</div>
		</section>
	);
}

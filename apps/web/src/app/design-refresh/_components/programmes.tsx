import type { ReactNode } from "react";
import {
	Arrow,
	DesignLink,
	Eyebrow,
	Photo,
	ProgrammeTitle,
	TextLink,
} from "./primitives";

export function Introduction() {
	const areas = [
		{ id: "education", label: "Education" },
		{ id: "health", label: "Healthcare" },
		{ id: "enterprise", label: "Economic empowerment" },
		{ id: "women", label: "Vulnerable communities" },
	];
	return (
		<section
			id="dh-work"
			className="px-stack pt-12 pb-8 @desktop:px-content @desktop:pt-section @desktop:pb-[35px]"
		>
			<div className="grid items-center gap-6 @desktop:grid-cols-[1fr_1.3fr] @desktop:gap-[50px] @wide:gap-14">
				<div>
					<Eyebrow className="mb-[13px] text-accent">
						Four areas. One purpose.
					</Eyebrow>
					<h2 className="font-display text-[32px] leading-[1.14] font-normal tracking-[-.8px] @tablet:text-[37px]">
						Local people.
						<br />
						Lasting change.
					</h2>
				</div>
				<p className="max-w-[62ch] text-copy leading-[1.65] text-muted">
					Our programmes are designed, led and staffed by local teams. Through
					education, healthcare, economic empowerment and support for vulnerable
					communities, we work towards a future where people can live with
					dignity and freedom.
				</p>
			</div>
			<nav
				aria-label="Explore our four areas of work"
				className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2 @max-[381px]:grid-cols-1 @desktop:mt-9 @desktop:grid-cols-4 @desktop:gap-[22px]"
			>
				{areas.map((area, index) => (
					<DesignLink
						key={area.id}
						href={`#dh-${area.id}`}
						className="flex items-start justify-between gap-2.5 border-t border-rule pt-[15px] pb-2.5 min-h-11 text-label leading-[1.4] font-medium"
					>
						<span>
							<small className="mb-[9px] block text-caption leading-normal text-accent">
								0{index + 1}
							</small>
							{area.label}
						</span>
						<span className="pt-[22px] text-accent">
							<Arrow down />
						</span>
					</DesignLink>
				))}
			</nav>
		</section>
	);
}

type ProgrammeProps = {
	id: string;
	number: string;
	label: string;
	title: ReactNode;
	paragraphs: string[];
	image: string;
	alt: string;
	href: string;
	linkLabel: string;
	framed?: boolean;
	imageRight?: boolean;
	crop?: string;
};

export function Programme({
	id,
	number,
	label,
	title,
	paragraphs,
	image,
	alt,
	href,
	linkLabel,
	framed = false,
	imageRight = false,
	crop = "object-center",
}: ProgrammeProps) {
	const surface = framed
		? "mx-frame gap-7 bg-paper px-stack-band py-8 @desktop:gap-9 @desktop:px-band @desktop:py-[42px] @wide:gap-14"
		: "mx-auto my-12 w-[calc(100%-48px)] max-w-[560px] gap-7 @desktop:my-section @desktop:w-[calc(100%-116px)] @desktop:max-w-reading @desktop:gap-9 @wide:gap-14";
	return (
		<section
			id={`dh-${id}`}
			className={`grid items-center @desktop:grid-cols-2 ${surface}`}
		>
			<Photo
				name={image}
				alt={alt}
				className={`aspect-4/3 h-auto w-full object-cover ${crop} ${imageRight ? "@desktop:col-start-2 @desktop:row-start-1" : ""}`}
			/>
			<div
				className={
					imageRight ? "@desktop:col-start-1 @desktop:row-start-1" : undefined
				}
			>
				<Eyebrow className="mb-[18px] text-accent">
					{number} / {label}
				</Eyebrow>
				<ProgrammeTitle>{title}</ProgrammeTitle>
				{paragraphs.map((paragraph) => (
					<p
						key={paragraph}
						className="mb-[23px] max-w-[60ch] text-copy leading-[1.65] text-muted"
					>
						{paragraph}
					</p>
				))}
				<TextLink href={href}>{linkLabel}</TextLink>
			</div>
		</section>
	);
}

export function Enterprise() {
	const pathways = [
		{
			title: "Vocational training",
			body: "Practical skills to help people earn a living.",
		},
		{
			title: "Business start-up grants",
			body: "Support to take the first step towards a livelihood.",
		},
		{
			title: "Self-help groups",
			body: "People supporting one another to move forward.",
		},
	];
	return (
		<section
			id="dh-enterprise"
			className="mx-frame grid gap-7 bg-sand px-stack-band py-10 @desktop:grid-cols-[1.08fr_1fr] @desktop:gap-9 @desktop:px-band @desktop:py-12 @wide:grid-cols-2 @wide:gap-16"
		>
			<div>
				<Eyebrow className="mb-[18px] text-accent">
					03 / Economic empowerment
				</Eyebrow>
				<h2 className="mb-[19px] max-w-[400px] font-display text-[34px] leading-[1.13] font-normal tracking-[-.8px] @tablet:text-[39px]">
					Skills today.
					<br />
					Independence tomorrow.
				</h2>
				<p className="mb-[17px] max-w-[380px] text-copy leading-[1.65] text-muted">
					The opportunity to earn a livelihood helps people become
					self-sufficient and hold their heads up high.
				</p>
				<TextLink href="https://dfn.org.au/give/economic-empowerment/">
					Explore economic empowerment
				</TextLink>
			</div>
			<div className="grid content-center gap-[19px] @tablet:gap-5">
				{pathways.map((pathway, index) => (
					<div
						key={pathway.title}
						className="grid grid-cols-[26px_1fr] gap-3 border-b border-rule pb-[18px] last:border-0 last:pb-0"
					>
						<span
							aria-hidden="true"
							className="font-display text-[23px] leading-[1.25] text-accent"
						>
							{index + 1}
						</span>
						<div>
							<h3 className="mb-[5px] text-intro leading-[1.4] font-medium">
								{pathway.title}
							</h3>
							<p className="text-copy leading-[1.65] text-muted">
								{pathway.body}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export function Evidence() {
	return (
		<section
			id="dh-evidence"
			aria-labelledby="dh-evidence-title"
			className="mx-auto mb-12 grid w-[calc(100%-48px)] max-w-[560px] gap-6 border-y border-rule py-8 @desktop:mb-section @desktop:w-[calc(100%-116px)] @desktop:max-w-reading @desktop:grid-cols-2 @desktop:gap-14 @desktop:py-10"
		>
			<div>
				<Eyebrow className="text-accent">
					From DFN’s work / LAMP self-help groups
				</Eyebrow>
				<h2
					id="dh-evidence-title"
					className="mt-3.5 font-display text-[36px] leading-[1.14] font-medium tracking-[-.7px] @desktop:text-[38px]"
				>
					Confidence grows
					<br />
					with community.
				</h2>
			</div>
			<div>
				<p className="mb-[18px] max-w-[60ch] text-copy leading-[1.65] text-muted">
					In DFN’s LAMP self-help groups, women build confidence through mutual
					support. Local staff help members access government benefits, open a
					bank account and learn to manage and save money.
				</p>
				<p className="mb-[18px] max-w-[60ch] text-copy leading-[1.65] text-muted">
					Small business grants can also help members take the next step towards
					earning a livelihood.
				</p>
				<TextLink href="https://dfn.org.au/self-help-groups/">
					Read about LAMP groups
				</TextLink>
			</div>
		</section>
	);
}

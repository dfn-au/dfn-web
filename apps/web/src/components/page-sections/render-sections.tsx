import Image from "next/image";
import { stegaClean } from "next-sanity";
import type { ReactNode } from "react";
import { NavigationLink } from "@/app/design-refresh/_components/preview-link";
import {
	Arrow,
	buttonClasses,
	Eyebrow,
	Headline,
} from "@/app/design-refresh/_components/primitives";
import { urlFor } from "@/sanity/lib/image";
import { PageBody } from "../portable-text";
import type { PageSection, SectionImage, SectionLink } from "./types";

const width =
	"mx-auto w-[calc(100%-48px)] max-w-[560px] @desktop:w-[calc(100%-116px)] @desktop:max-w-reading";
const reading = "mx-auto w-[calc(100%-48px)] max-w-[720px]";
const heading =
	"font-display text-[34px] leading-[1.15] font-normal tracking-[-.8px] @desktop:text-[40px]";
const bodyClass =
	"max-w-[60ch] text-copy leading-[1.75] text-muted [&_p]:mt-0 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p]:leading-[1.75]";
function Body({
	value,
	className = bodyClass,
}: {
	value?: Extract<PageSection, { _type: "richTextSection" }>["body"];
	className?: string;
}) {
	return value?.length ? (
		<div className={className}>
			<PageBody value={value} />
		</div>
	) : null;
}
function SectionPhoto({
	image,
	className,
}: {
	image?: SectionImage;
	className: string;
}) {
	const src = image?.asset ? urlFor(image).url() : undefined;
	if (!src) return null;
	return (
		<Image
			src={src}
			alt={image?.alt ?? ""}
			width={1800}
			height={862}
			unoptimized
			className={className}
			style={
				image?.hotspot
					? {
							objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`,
						}
					: undefined
			}
		/>
	);
}
function Link({
	link,
	className,
	button = false,
}: {
	link?: SectionLink;
	className?: string;
	button?: boolean;
}) {
	if (!link?.label) return null;
	return (
		<NavigationLink
			href={link.href ?? "#"}
			placeholderLinks
			className={
				button
					? `${buttonClasses} bg-action text-white`
					: (className ??
						"inline-flex min-h-11 items-center gap-[18px] py-2.5 text-label leading-normal font-medium text-accent")
			}
		>
			{link.label}
			<Arrow />
		</NavigationLink>
	);
}
function Breadcrumb({
	title,
	wide = false,
}: {
	title: string;
	wide?: boolean;
}) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={`${wide ? "mb-8 @desktop:mb-10" : "mb-7"} flex items-center gap-3 text-sm text-muted`}
		>
			<NavigationLink
				href="/"
				placeholderLinks
				className="inline-flex min-h-11 items-center"
			>
				Home
			</NavigationLink>
			<span aria-hidden="true">/</span>
			<span aria-current="page">{title}</span>
		</nav>
	);
}
export function RenderSections({
	sections,
	title,
}: {
	sections: PageSection[];
	title: string;
}) {
	return (
		<>
			{sections.map((section, index) => {
				const id = stegaClean(section._key);
				const titleId = `${id}-title`;
				// The opening title/intro is the only h1, regardless of later reordering.
				const Heading = index === 0 ? "h1" : "h2";
				let content: ReactNode;
				switch (section._type) {
					case "pageTitle":
						return (
							<section
								key={id}
								className={`${reading} pt-6 @desktop:pt-10`}
								aria-labelledby={titleId}
							>
								{index === 0 && <Breadcrumb title={title} />}
								<Heading
									id={titleId}
									className="mb-9 font-display text-[clamp(40px,8cqi,64px)] leading-[1.08] font-normal tracking-[-1.2px]"
								>
									<Headline text={section.headline || title} />
								</Heading>
							</section>
						);
					case "richTextSection":
						return (
							<section
								id={id}
								key={id}
								className={`${reading} pb-16 @desktop:pb-24 wrap-anywhere`}
							>
								<PageBody value={section.body ?? []} />
							</section>
						);
					case "introSection":
						return (
							<section
								id={id}
								key={id}
								className={`${width} pt-6 pb-10 @desktop:pt-8 @desktop:pb-12`}
								aria-labelledby={titleId}
							>
								{index === 0 && <Breadcrumb title={title} wide />}
								<div className="grid items-center gap-8 @desktop:grid-cols-2 @desktop:gap-14">
									<div>
										{section.eyebrow && (
											<Eyebrow className="mb-5 text-accent">
												{section.eyebrow}
											</Eyebrow>
										)}
										<Heading
											id={titleId}
											className="mb-6 font-display text-[clamp(42px,9cqi,56px)] leading-[1.04] font-medium tracking-[-1.5px] @desktop:text-[64px]"
										>
											<Headline text={section.headline || title} />
											{section.accentText && (
												<>
													<br />
													<span className="text-accent">
														{section.accentText}
													</span>
												</>
											)}
										</Heading>
										{section.lead && (
											<p className="mb-5 max-w-[39ch] text-[19px] leading-[1.6] @desktop:text-[21px]">
												{section.lead}
											</p>
										)}
										<Body value={section.body} />
									</div>
									<figure>
										<SectionPhoto
											image={section.image}
											className="aspect-4/3 h-auto w-full object-cover object-center @desktop:aspect-[6/5]"
										/>
										{section.image?.caption && (
											<figcaption className="mt-3 text-sm leading-[1.6] text-muted">
												{section.image.caption}
											</figcaption>
										)}
									</figure>
								</div>
							</section>
						);
					case "sectionNavigation": {
						const targets = sections.filter((item) => item.navigationLabel);
						return targets.length ? (
							<nav
								key={id}
								aria-label="On this page"
								className={`${width} grid grid-cols-2 gap-x-6 border-y border-rule py-3 @tablet:flex @tablet:flex-wrap @tablet:gap-7`}
							>
								{targets.map((target) => (
									<a
										key={target._key}
										href={`#${stegaClean(target._key)}`}
										className="flex min-h-11 flex-1 items-center justify-between gap-3 py-2 text-label"
									>
										{target.navigationLabel}
										<span className="text-accent">
											<Arrow />
										</span>
									</a>
								))}
							</nav>
						) : null;
					}
					case "imageTextSection":
						content = (
							<div
								className={`${width} grid items-center gap-8 py-12 @desktop:grid-cols-[.85fr_1.15fr] @desktop:gap-20 @desktop:py-20`}
							>
								<div>
									{section.eyebrow && (
										<Eyebrow className="mb-4 text-accent">
											{section.eyebrow}
										</Eyebrow>
									)}
									<h2 id={titleId} className={`${heading} mb-6`}>
										<Headline text={section.headline} />
									</h2>
									<Body value={section.body} />
								</div>
								<div>
									<SectionPhoto
										image={section.image}
										className="aspect-[3/2] h-auto w-full object-cover object-center"
									/>
									{section.image?.caption && (
										<p className="mt-3 text-sm text-muted">
											{section.image.caption}
										</p>
									)}
									{(section.noteTitle || section.noteBody?.length) && (
										<div className="mt-5 border-l-2 border-accent pl-5">
											<h3 className="mb-2 text-label font-medium">
												{section.noteTitle}
											</h3>
											<Body value={section.noteBody} />
										</div>
									)}
								</div>
							</div>
						);
						break;
					case "statementSection":
						content = (
							<div className="mx-frame grid gap-8 bg-paper px-stack-band py-10 @desktop:grid-cols-[1.2fr_1fr] @desktop:gap-20 @desktop:px-band @desktop:py-14">
								<div>
									{section.eyebrow && (
										<Eyebrow className="mb-4 text-accent">
											{section.eyebrow}
										</Eyebrow>
									)}
									<h2 id={titleId} className={heading}>
										<Headline text={section.headline} />
									</h2>
									<Body value={section.body} className={`${bodyClass} mt-6`} />
								</div>
								<div className="border-t border-rule pt-7 @desktop:self-center @desktop:border-t-0 @desktop:border-l @desktop:pt-0 @desktop:pl-12">
									<h3 className="mb-4 text-caption font-medium tracking-[1.5px] text-accent uppercase">
										{section.statementLabel}
									</h3>
									<p className="max-w-[26ch] font-display text-[27px] leading-[1.4] @desktop:text-[30px]">
										{section.statement}
									</p>
									<p className="mt-5 text-sm text-muted">
										{section.attribution}
									</p>
								</div>
							</div>
						);
						break;
					case "numberedSection":
						content = (
							<div
								className={`${width} grid gap-8 py-12 @desktop:grid-cols-[.8fr_1.2fr] @desktop:gap-20 @desktop:py-20`}
							>
								<div>
									{section.eyebrow && (
										<Eyebrow className="mb-4 text-accent">
											{section.eyebrow}
										</Eyebrow>
									)}
									<h2 id={titleId} className={`${heading} mb-6`}>
										<Headline text={section.headline} />
									</h2>
									<Body value={section.body} />
									<Link
										link={section.link}
										className="mt-5 inline-flex min-h-11 items-center gap-5 text-label font-medium text-accent"
									/>
								</div>
								<ol>
									{(section.items ?? []).map((item, i) => (
										<li
											key={item._key}
											className="grid grid-cols-[28px_1fr] gap-4 border-t border-rule py-6 first:pt-0 first:border-t-0 last:pb-0 @tablet:grid-cols-[36px_1fr] @tablet:gap-5"
										>
											<span
												aria-hidden="true"
												className="pt-1 text-sm text-accent"
											>
												{String(i + 1).padStart(2, "0")}
											</span>
											<div>
												<h3 className="mb-2 font-display text-[24px] leading-[1.3]">
													{item.title}
												</h3>
												<Body value={item.body} />
											</div>
										</li>
									))}
								</ol>
							</div>
						);
						break;
					case "valuesSection":
						content = (
							<div className="mx-frame bg-sand px-stack-band py-10 @desktop:px-band @desktop:py-14">
								<div className="mb-9 grid gap-5 @desktop:grid-cols-2 @desktop:items-end @desktop:gap-14">
									<div>
										{section.eyebrow && (
											<Eyebrow className="mb-4 text-accent">
												{section.eyebrow}
											</Eyebrow>
										)}
										<h2 id={titleId} className={heading}>
											<Headline text={section.headline} />
										</h2>
									</div>
									<Body value={section.body} />
								</div>
								<dl className="grid gap-7 @tablet:grid-cols-2 @desktop:grid-cols-3 @desktop:gap-6 @wide:grid-cols-5">
									{(section.items ?? []).map((item) => (
										<div key={item._key} className="border-t border-rule pt-5">
											<dt className="mb-3 font-display text-[23px] leading-[1.3]">
												{item.title}
											</dt>
											<dd>
												<Body value={item.body} />
											</dd>
										</div>
									))}
								</dl>
							</div>
						);
						break;
					case "actionSection":
						content = (
							<div
								className={`${width} grid gap-8 py-12 @desktop:grid-cols-2 @desktop:gap-20 @desktop:py-16`}
							>
								<div>
									{section.eyebrow && (
										<Eyebrow className="mb-4 text-accent">
											{section.eyebrow}
										</Eyebrow>
									)}
									<h2 id={titleId} className={`${heading} mb-5`}>
										<Headline text={section.headline} />
									</h2>
									<Body value={section.body} />
									<div className="mt-5 flex flex-col items-start">
										{(section.links ?? []).map((link) => (
											<Link key={link._key} link={link} />
										))}
									</div>
								</div>
								<div className="self-center border-t border-rule pt-7 @desktop:border-t-0 @desktop:border-l @desktop:pt-0 @desktop:pl-12">
									<h3 className="mb-4 font-display text-[29px] leading-[1.2]">
										{section.actionTitle}
									</h3>
									<Body
										value={section.actionBody}
										className={`${bodyClass} mb-6`}
									/>
									<Link link={section.primaryAction} button />
									<Link
										link={section.secondaryAction}
										className="mt-4 flex min-h-11 items-center gap-5 text-label text-accent"
									/>
								</div>
							</div>
						);
						break;
					default:
						return null;
				}
				return (
					<section
						id={id}
						key={id}
						aria-labelledby={titleId}
						className="scroll-mt-6 wrap-anywhere"
					>
						{content}
					</section>
				);
			})}
		</>
	);
}

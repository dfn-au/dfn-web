import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "../_components/footer";
import { PalettePreview } from "../_components/palette-preview";
import { PreviewLink } from "../_components/preview-link";
import {
	Arrow,
	ButtonLink,
	DesignLink,
	Eyebrow,
	TextLink,
} from "../_components/primitives";
import { SiteHeader } from "../_components/site-header";
import { resolvePalette } from "../palettes";

export const metadata: Metadata = {
	title: "About DFN — Dignity Freedom Network",
};

const goals = [
	{
		title: "Restore dignity and hope",
		body: "Support marginalised women and girls through empowerment, economic development, healthcare, community care and anti-human trafficking programmes.",
	},
	{
		title: "Open doors through education",
		body: "Provide quality, English-medium education through child sponsorship and support for schools in rural and remote communities, helping children discover their worth and potential.",
	},
	{
		title: "Build pathways to a livelihood",
		body: "Provide job training and vocational skills so people facing poverty can earn a living and build a brighter future for their families.",
	},
	{
		title: "Support healthier communities",
		body: "Improve access to care through health education, disease prevention programmes and community health clinics.",
	},
	{
		title: "Help more people take part",
		body: "Raise awareness of the challenges vulnerable communities face and the opportunities to stand alongside them.",
	},
];

const values = [
	{
		title: "Dignity",
		body: "Every person has equal worth and intrinsic value, created in God’s image.",
	},
	{ title: "Prayer", body: "Prayer underpins all that we do." },
	{
		title: "Integrity",
		body: "We do what we say we will, transparently and accountably.",
	},
	{
		title: "Communication",
		body: "We keep the people connected to our work informed.",
	},
	{
		title: "Excellence",
		body: "We constantly seek to improve the way we work.",
	},
];

const sections = [
	{ id: "our-story", label: "Our story" },
	{ id: "our-purpose", label: "Our purpose" },
	{ id: "our-goals", label: "Our goals" },
	{ id: "our-values", label: "Our values" },
];

const sectionWidth =
	"mx-auto w-[calc(100%-48px)] max-w-[560px] @desktop:w-[calc(100%-116px)] @desktop:max-w-reading";
const heading =
	"font-display text-[34px] leading-[1.15] font-normal tracking-[-.8px] @desktop:text-[40px]";
const body = "max-w-[60ch] text-copy leading-[1.75] text-muted";

export default async function AboutPage({
	searchParams,
}: {
	searchParams: Promise<{ variant?: string; clean?: string }>;
}) {
	const { variant, clean } = await searchParams;
	return (
		<PalettePreview
			initialPalette={resolvePalette(variant)}
			showControls={clean !== "1"}
		>
			<div className="mx-auto max-w-[1920px] px-2.5 @desktop:px-frame">
				<SiteHeader activePage="about" />
			</div>
			<main id="dh-main">
				<section
					className={`${sectionWidth} pt-6 pb-10 @desktop:pt-8 @desktop:pb-12`}
					aria-labelledby="about-title"
				>
					<nav
						aria-label="Breadcrumb"
						className="mb-8 flex items-center gap-3 text-sm text-muted @desktop:mb-10"
					>
						<PreviewLink className="inline-flex min-h-11 items-center">
							Home
						</PreviewLink>
						<span aria-hidden="true">/</span>
						<span aria-current="page">About DFN</span>
					</nav>
					<div className="grid items-center gap-8 @desktop:grid-cols-2 @desktop:gap-14">
						<div>
							<Eyebrow className="mb-5 text-accent">
								About Dignity Freedom Network
							</Eyebrow>
							<h1
								id="about-title"
								className="mb-6 font-display text-[clamp(42px,9cqi,56px)] leading-[1.04] font-medium tracking-[-1.5px] @desktop:text-[64px]"
							>
								Every person.
								<br />
								<span className="text-accent">Equal worth.</span>
							</h1>
							<p className="mb-5 max-w-[39ch] text-[19px] leading-[1.6] @desktop:text-[21px]">
								We’re Australians and New Zealanders standing alongside
								marginalised communities in South Asia.
							</p>
							<p className={body}>
								Together, we work towards a future where people can live with
								dignity, freedom and the opportunity to shape their own lives.
							</p>
						</div>
						<figure>
							<Image
								src="/design-refresh/about-classroom.jpg"
								width={1800}
								height={862}
								alt="Pupils sitting together in a classroom at a DFN-supported school"
								unoptimized
								preload
								className="aspect-4/3 h-auto w-full object-cover object-[50%_center] @desktop:aspect-[6/5]"
							/>
							<figcaption className="mt-3 text-sm leading-[1.6] text-muted">
								An education. A sense of belonging. Room to dream.
							</figcaption>
						</figure>
					</div>
				</section>

				<nav
					aria-label="On this page"
					className={`${sectionWidth} grid grid-cols-2 gap-x-6 border-y border-rule py-3 @tablet:grid-cols-4 @tablet:gap-7`}
				>
					{sections.map((section) => (
						<a
							key={section.id}
							href={`#${section.id}`}
							className="flex min-h-11 items-center justify-between gap-3 py-2 text-label"
						>
							{section.label}
							<span className="text-accent">
								<Arrow down />
							</span>
						</a>
					))}
				</nav>

				<section
					id="our-story"
					className={`${sectionWidth} grid scroll-mt-6 items-center gap-8 py-12 @desktop:grid-cols-[.85fr_1.15fr] @desktop:gap-20 @desktop:py-20`}
					aria-labelledby="story-title"
				>
					<div>
						<Eyebrow className="mb-4 text-accent">Our story</Eyebrow>
						<h2 id="story-title" className={`${heading} mb-6`}>
							It starts with
							<br />
							listening.
						</h2>
						<p className={`${body} mb-5`}>
							Our movement grew in response to requests from community leaders:
							for education that helps marginalised children discover their
							worth, and for freedom and dignity for women and girls at risk.
						</p>
						<p className={body}>
							That invitation continues to shape our work. We serve alongside
							national leaders, responding to the needs they identify and
							supporting their work to address injustice.
						</p>
					</div>
					<div>
						<Image
							src="/design-refresh/about-teaching.jpg"
							width={2000}
							height={958}
							alt="A teacher helping a pupil with her writing"
							unoptimized
							className="aspect-[3/2] h-auto w-full object-cover object-center"
						/>
						<div className="mt-5 border-l-2 border-accent pl-5">
							<h3 className="mb-2 text-label font-medium">
								Rooted in South Asia. Connected across oceans.
							</h3>
							<p className={body}>
								We connect supporters in Australia and New Zealand with work in
								South Asia, wherever national leaders identify the greatest
								need.
							</p>
						</div>
					</div>
				</section>

				<section
					id="our-purpose"
					aria-labelledby="purpose-title"
					className="mx-frame grid scroll-mt-6 gap-8 bg-paper px-stack-band py-10 @desktop:grid-cols-[1.2fr_1fr] @desktop:gap-20 @desktop:px-band @desktop:py-14"
				>
					<div>
						<Eyebrow className="mb-4 text-accent">Our mission</Eyebrow>
						<h2 id="purpose-title" className={heading}>
							Restore hope.
							<br />
							Uphold dignity.
							<br />
							Make freedom possible.
						</h2>
						<p className={`${body} mt-6`}>
							We work to restore hope and dignity to South Asia’s vulnerable
							people, particularly women and children, through education,
							healthcare, advocacy, rehabilitation for victims of sexual
							slavery, and community and economic development.
						</p>
					</div>
					<div className="border-t border-rule pt-7 @desktop:self-center @desktop:border-t-0 @desktop:border-l @desktop:pt-0 @desktop:pl-12">
						<h3 className="mb-4 text-caption font-medium tracking-[1.5px] text-accent uppercase">
							The future we’re working towards
						</h3>
						<p className="max-w-[26ch] font-display text-[27px] leading-[1.4] @desktop:text-[30px]">
							For South Asia’s oppressed and marginalised people to realise
							their human worth and dignity, and gain self-reliance.
						</p>
						<p className="mt-5 text-sm text-muted">Our vision</p>
					</div>
				</section>

				<section
					id="our-goals"
					aria-labelledby="goals-title"
					className={`${sectionWidth} grid scroll-mt-6 gap-8 py-12 @desktop:grid-cols-[.8fr_1.2fr] @desktop:gap-20 @desktop:py-20`}
				>
					<div>
						<Eyebrow className="mb-4 text-accent">
							What we’re here to do
						</Eyebrow>
						<h2 id="goals-title" className={`${heading} mb-6`}>
							Five goals.
							<br />
							One shared purpose.
						</h2>
						<p className={body}>
							Dignity and freedom take many forms. These five goals guide how we
							support people and communities.
						</p>
						<PreviewLink
							hash="dh-work"
							className="mt-5 inline-flex min-h-11 items-center gap-5 text-label font-medium text-accent"
						>
							Explore our work
							<Arrow />
						</PreviewLink>
					</div>
					<ol>
						{goals.map((goal, index) => (
							<li
								key={goal.title}
								className="grid grid-cols-[28px_1fr] gap-4 border-t border-rule py-6 first:pt-0 first:border-t-0 last:pb-0 @tablet:grid-cols-[36px_1fr] @tablet:gap-5"
							>
								<span aria-hidden="true" className="pt-1 text-sm text-accent">
									0{index + 1}
								</span>
								<div>
									<h3 className="mb-2 font-display text-[24px] leading-[1.3]">
										{goal.title}
									</h3>
									<p className={body}>{goal.body}</p>
								</div>
							</li>
						))}
					</ol>
				</section>

				<section
					id="our-values"
					aria-labelledby="values-title"
					className="mx-frame scroll-mt-6 bg-sand px-stack-band py-10 @desktop:px-band @desktop:py-14"
				>
					<div className="mb-9 grid gap-5 @desktop:grid-cols-2 @desktop:items-end @desktop:gap-14">
						<div>
							<Eyebrow className="mb-4 text-accent">Our values</Eyebrow>
							<h2 id="values-title" className={heading}>
								What holds us together.
							</h2>
						</div>
						<p className={body}>
							Our belief in the worth of every person shapes both the work we do
							and the way we do it.
						</p>
					</div>
					<dl className="grid gap-7 @tablet:grid-cols-2 @desktop:grid-cols-3 @desktop:gap-6 @wide:grid-cols-5">
						{values.map((value) => (
							<div key={value.title} className="border-t border-rule pt-5">
								<dt className="mb-3 font-display text-[23px] leading-[1.3]">
									{value.title}
								</dt>
								<dd className={body}>{value.body}</dd>
							</div>
						))}
					</dl>
				</section>

				<section
					aria-labelledby="trust-title"
					className={`${sectionWidth} grid gap-8 py-12 @desktop:grid-cols-2 @desktop:gap-20 @desktop:py-16`}
				>
					<div>
						<Eyebrow className="mb-4 text-accent">
							A partnership built on trust
						</Eyebrow>
						<h2 id="trust-title" className={`${heading} mb-5`}>
							Know the work.
							<br />
							Be part of it.
						</h2>
						<p className={body}>
							We are committed to accountability, transparency and treating the
							people who support our work with care.
						</p>
						<div className="mt-5 flex flex-col items-start">
							<TextLink href="https://dfn.org.au/ethical-fundraising-standards/">
								Our fundraising standards
							</TextLink>
							<TextLink href="https://dfn.org.au/faqs/">
								Common questions about giving
							</TextLink>
						</div>
					</div>
					<div className="self-center border-t border-rule pt-7 @desktop:border-t-0 @desktop:border-l @desktop:pt-0 @desktop:pl-12">
						<h3 className="mb-4 font-display text-[29px] leading-[1.2]">
							There’s a place for you.
						</h3>
						<p className={`${body} mb-6`}>
							Give, share the story or bring people together. Your support can
							help create opportunities for women, children and their
							communities.
						</p>
						<ButtonLink href="https://dfn.org.au/donate/">
							Make a donation
						</ButtonLink>
						<DesignLink
							href="https://dfn.org.au/help/"
							className="mt-4 flex min-h-11 items-center gap-5 text-label text-accent"
						>
							Other ways to get involved
							<Arrow />
						</DesignLink>
					</div>
				</section>
			</main>
			<Footer />
		</PalettePreview>
	);
}

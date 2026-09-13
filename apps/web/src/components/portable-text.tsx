import {
	PortableText,
	type PortableTextComponents,
	stegaClean,
} from "next-sanity";

import { ExternalLink } from "@/components/external-link";
import { SanityImage } from "@/components/sanity-image";

import type { SectionBody } from "./page-sections/types";

const components: PortableTextComponents<SectionBody[number]> = {
	block: {
		normal: ({ children }) => (
			<p className="mt-4 text-copy leading-[1.8] text-muted">{children}</p>
		),
		h2: ({ children }) => (
			<h2 className="mt-10 font-display text-[30px] leading-[1.25] font-normal text-ink">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="mt-8 font-display text-[24px] leading-[1.3] font-normal text-ink">
				{children}
			</h3>
		),
		blockquote: ({ children }) => (
			<blockquote className="mt-6 border-l-2 border-rule pl-4 text-copy italic text-muted">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="mt-4 list-disc space-y-2 pl-6 text-copy leading-[1.8] text-muted">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="mt-4 list-decimal space-y-2 pl-6 text-copy leading-[1.8] text-muted">
				{children}
			</ol>
		),
	},
	types: {
		image: ({ value }) => {
			if (!value?.asset) return null;

			return (
				<figure className="my-8">
					<SanityImage value={value} className="h-auto w-full" />
					{value.caption ? (
						<figcaption className="mt-2 text-center text-sm text-muted">
							{value.caption}
						</figcaption>
					) : null}
				</figure>
			);
		},
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-ink">{children}</strong>
		),
		em: ({ children }) => <em>{children}</em>,
		link: ({ children, value }) => {
			const href = stegaClean(value?.href ?? "");
			if (!href) return <>{children}</>;

			const isExternal = /^https?:\/\//.test(href);
			if (isExternal) {
				return (
					<ExternalLink
						href={href}
						className="text-ink underline underline-offset-4 transition hover:text-muted"
						rel="noreferrer noopener"
					>
						{children}
					</ExternalLink>
				);
			}
			return (
				<a
					href={href}
					className="text-ink underline underline-offset-4 transition hover:text-muted"
				>
					{children}
				</a>
			);
		},
	},
};

export function PageBody({ value }: { value: SectionBody }) {
	return <PortableText value={value} components={components} />;
}

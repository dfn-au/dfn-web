import {
	PortableText,
	type PortableTextBlock,
	type PortableTextComponents,
} from "next-sanity";

import { ExternalLink } from "@/components/external-link";
import { SanityImage } from "@/components/sanity-image";

const components: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="mt-4 text-lg leading-8 text-subtle">{children}</p>
		),
		h2: ({ children }) => (
			<h2 className="mt-10 text-2xl font-semibold text-foreground">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="mt-8 text-xl font-semibold text-foreground">{children}</h3>
		),
		blockquote: ({ children }) => (
			<blockquote className="mt-6 border-l-2 border-border pl-4 text-lg italic text-subtle">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-subtle">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="mt-4 list-decimal space-y-2 pl-6 text-lg leading-8 text-subtle">
				{children}
			</ol>
		),
	},
	types: {
		image: ({ value }) => {
			if (!value?.asset) return null;

			return (
				<figure className="mt-8">
					<SanityImage value={value} className="h-auto w-full rounded-lg" />
					{value.caption ? (
						<figcaption className="mt-2 text-center text-sm text-subtle">
							{value.caption}
						</figcaption>
					) : null}
				</figure>
			);
		},
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-foreground">{children}</strong>
		),
		em: ({ children }) => <em>{children}</em>,
		link: ({ children, value }) => {
			const href = value?.href;
			if (!href) return <>{children}</>;

			const isExternal = !href.startsWith("/");
			if (isExternal) {
				return (
					<ExternalLink
						href={href}
						className="text-foreground underline underline-offset-4 transition hover:text-subtle"
						rel="noreferrer noopener"
						target="_blank"
					>
						{children}
					</ExternalLink>
				);
			}
			return (
				<a
					href={href}
					className="text-foreground underline underline-offset-4 transition hover:text-subtle"
				>
					{children}
				</a>
			);
		},
	},
};

export function PageBody({ value }: { value: PortableTextBlock[] }) {
	return <PortableText value={value} components={components} />;
}

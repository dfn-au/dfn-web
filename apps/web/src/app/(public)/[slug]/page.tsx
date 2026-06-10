import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "next-sanity";

import { PageBody } from "@/components/portable-text";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY, PAGE_SLUGS_QUERY, type Page } from "@/sanity/lib/queries";

type RouteProps = {
	params: Promise<{ slug: string }>;
};

const fetchOptions = { next: { revalidate: 30 } };

async function getPage(slug: string): Promise<Page | null> {
	return client.fetch<Page | null>(PAGE_QUERY, { slug }, fetchOptions);
}

export async function generateStaticParams() {
	const slugs = await client
		.withConfig({ useCdn: false })
		.fetch<{ slug: string }[]>(PAGE_SLUGS_QUERY);

	return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const { slug } = await params;
	const page = await getPage(slug);

	if (!page) return {};

	return {
		title: page.title,
	};
}

export default async function PageRoute({ params }: RouteProps) {
	const { slug } = await params;
	const page = await getPage(slug);

	if (!page) notFound();

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-16">
			<article>
				<header>
					<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
						Page
					</p>
					<h1 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
						{page.title}
					</h1>
				</header>

				{Array.isArray(page.body) && page.body.length > 0 ? (
					<div className="mt-8">
						<PageBody value={page.body as PortableTextBlock[]} />
					</div>
				) : null}
			</article>
		</main>
	);
}

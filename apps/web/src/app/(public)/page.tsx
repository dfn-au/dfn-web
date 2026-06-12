import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "next-sanity";

import { PageBody } from "@/components/portable-text";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, type HomePage } from "@/sanity/lib/queries";

async function getHomePage(): Promise<HomePage | null> {
	const { data } = await sanityFetch({
		query: HOME_PAGE_QUERY,
	});

	return data as HomePage | null;
}

export async function generateMetadata(): Promise<Metadata> {
	const homePage = await getHomePage();

	if (!homePage) return {};

	return {
		title: homePage.title,
	};
}

export default async function HomePageRoute() {
	const homePage = await getHomePage();

	if (!homePage) notFound();

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-16">
			<article>
				<header>
					<h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
						{homePage.title}
					</h1>
				</header>

				{Array.isArray(homePage.body) && homePage.body.length > 0 ? (
					<div className="mt-8">
						<PageBody value={homePage.body as PortableTextBlock[]} />
					</div>
				) : null}
			</article>
		</main>
	);
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { PageViewTracker } from "@/components/page-view-tracker";
import { PalettePreview } from "@/components/site/palette-preview";
import { resolvePalette } from "@/components/site/palettes";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, type Page, SITE_CHROME_QUERY } from "@/sanity/lib/queries";

type RouteProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{
		variant?: string | string[];
		clean?: string | string[];
	}>;
};

async function getPage(slug: string, stega?: false): Promise<Page | null> {
	const { data } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug },
		stega,
	});
	return data;
}

export async function generateMetadata({
	params,
}: RouteProps): Promise<Metadata> {
	const { slug } = await params;
	const page = await getPage(slug, false);
	return page
		? {
				title: `${page.title} — Dignity Freedom Network`,
				description: page.description ?? undefined,
			}
		: {};
}

export default async function PageRoute({ params, searchParams }: RouteProps) {
	const { slug } = await params;
	const [page, { data: chrome }, { variant, clean }] = await Promise.all([
		getPage(slug),
		sanityFetch({ query: SITE_CHROME_QUERY }),
		searchParams,
	]);
	if (!page) notFound();
	return (
		<PalettePreview
			initialPalette={resolvePalette(variant)}
			showControls={clean !== "1"}
		>
			<PageViewTracker
				event="content_page_viewed"
				properties={{ slug, title: page.title ?? undefined }}
			/>
			<ContentPage page={page} chrome={chrome} />
		</PalettePreview>
	);
}

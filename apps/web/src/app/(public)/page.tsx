import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Homepage } from "@/components/homepage/homepage";
import { PageViewTracker } from "@/components/page-view-tracker";
import {
	resolveBodyPreview,
	resolveBrandPreview,
	resolveHeadingPreview,
	resolveIconPreview,
	resolveLabelPreview,
	resolveLogoPreview,
} from "@/components/site/brand-preview";
import { PalettePreview } from "@/components/site/palette-preview";
import { resolvePalette } from "@/components/site/palettes";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, type HomePage } from "@/sanity/lib/queries";

async function getHomePage(stega?: false): Promise<HomePage | null> {
	const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, stega });
	return data;
}

export async function generateMetadata(): Promise<Metadata> {
	const homePage = await getHomePage(false);
	return homePage
		? { title: homePage.title, description: homePage.description }
		: {};
}

export default async function HomePageRoute({
	searchParams,
}: {
	searchParams: Promise<{
		variant?: string | string[];
		clean?: string | string[];
		brand?: string | string[];
		headings?: string | string[];
		body?: string | string[];
		logo?: string | string[];
		labels?: string | string[];
		icons?: string | string[];
	}>;
}) {
	const [
		homePage,
		{ variant, clean, brand, headings, body, logo, labels, icons },
	] = await Promise.all([getHomePage(), searchParams]);
	if (!homePage) notFound();
	return (
		<PalettePreview
			initialPalette={resolvePalette(variant)}
			showControls={clean !== "1"}
			initialBrandPreview={resolveBrandPreview(brand)}
			initialHeadingPreview={resolveHeadingPreview(headings)}
			initialBodyPreview={resolveBodyPreview(body)}
			initialLogoPreview={resolveLogoPreview(logo)}
			initialLabelPreview={resolveLabelPreview(labels)}
			initialIconPreview={resolveIconPreview(icons)}
		>
			<PageViewTracker
				event="home_page_viewed"
				properties={{ title: homePage.title ?? undefined }}
			/>
			<Homepage content={homePage} />
		</PalettePreview>
	);
}

import { evaluate, parse } from "groq-js";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { previewDefaults } from "@/components/site/brand-preview";
import { PalettePreview } from "@/components/site/palette-preview";
import { PAGE_QUERY, type Page } from "@/sanity/lib/queries";
import fixtures from "../../fixtures.json";

export default async function PilotPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	// The rehearsal reads only this local fixture set, never a Sanity dataset.
	const result = await evaluate(parse(PAGE_QUERY), {
		dataset: fixtures,
		params: { slug, countrySite: "AU" },
	});
	const page: Page | null = await result.get();
	if (!page) notFound();
	return (
		<PalettePreview
			initialPalette="charcoal"
			showControls={false}
			initialBrandPreview={previewDefaults.brand}
			initialHeadingPreview={previewDefaults.headings}
			initialBodyPreview={previewDefaults.body}
			initialLogoPreview={previewDefaults.logo}
			initialLabelPreview={previewDefaults.labels}
			initialIconPreview={previewDefaults.icons}
		>
			<aside
				style={{
					padding: "16px 24px",
					borderBottom: "1px solid currentColor",
					fontFamily: "sans-serif",
					fontSize: 14,
				}}
			>
				Editorial rehearsal: sample copy, files and image only.{" "}
				<a href="/how-we-work">How we work</a> · <a href="/reports">Reports</a>
			</aside>
			<ContentPage
				page={page}
				chrome={{
					header: {
						navigation: [
							{
								_key: "work",
								label: "How we work",
								href: "/how-we-work",
								headline: null,
								description: null,
								children: null,
							},
							{
								_key: "reports",
								label: "Reports",
								href: "/reports",
								headline: null,
								description: null,
								children: null,
							},
						],
						menuHeading: "Pilot pages",
						give: null,
						giveHref: null,
					},
					footer: null,
				}}
			/>
		</PalettePreview>
	);
}

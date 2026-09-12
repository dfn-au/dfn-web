import { Footer } from "@/app/design-refresh/_components/footer";
import { SiteHeader } from "@/app/design-refresh/_components/site-header";
import type { Page, SiteChrome } from "@/sanity/lib/queries";
import { RenderSections } from "./page-sections/render-sections";

export function ContentPage({
	page,
	chrome,
}: {
	page: Page;
	chrome: SiteChrome | null;
}) {
	return (
		<>
			<div className="mx-auto max-w-[1920px] px-2.5 @desktop:px-frame">
				<SiteHeader
					content={chrome?.header}
					activePage={page.slug.current}
					homepagePath="/"
					placeholderLinks
				/>
			</div>
			<main id="dh-main">
				<RenderSections title={page.title} sections={page.sections ?? []} />
			</main>
			{chrome?.footer && (
				<Footer content={chrome.footer} homepagePath="/" placeholderLinks />
			)}
		</>
	);
}

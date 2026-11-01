import Image from "next/image";
import { stegaClean } from "next-sanity";
import type { FooterContent } from "@/components/homepage/content";
import { RichTextBody } from "@/components/homepage/rich-text-body";
import { NavigationLink } from "./navigation-link";
import { DesignLink } from "./primitives";

export function Footer({
	content,
	homepagePath = "",
}: {
	content: FooterContent;
	homepagePath?: string;
}) {
	const offices = content.offices ?? [];
	return (
		<footer id="dh-contact">
			<div className="mx-2.5 grid grid-cols-1 bg-paper @tablet:mx-frame @tablet:grid-cols-2 @desktop:grid-cols-[1.15fr_1fr_1fr] @wide:px-footer">
				<div className="col-span-full grid grid-cols-1 items-center gap-6 bg-brand p-6 text-brand-ink @tablet:grid-cols-[auto_1fr] @tablet:p-8 @desktop:col-span-1 @desktop:block">
					<Image
						src="/logos/dfn-logo-transparent.svg"
						width={1345.677}
						height={586.551}
						alt="Dignity Freedom Network"
						unoptimized
						className="h-auto w-[135px] @tablet:w-[153px] @desktop:mb-6"
					/>
					<p className="max-w-[36ch] text-sm leading-[1.65]">
						{content.summary}
					</p>
				</div>
				<div className="p-6 @tablet:p-8">
					<h2 className="mb-3 text-sm leading-normal font-medium">
						{content.navigationTitle}
					</h2>
					<nav
						aria-label="Footer navigation"
						className="grid grid-cols-2 gap-x-4"
					>
						{(content.navigation ?? []).map((link) => (
							<NavigationLink
								key={link._key}
								href={link.href ?? "#"}
								homepagePath={homepagePath}
								className="flex min-h-11 items-center py-1 text-sm leading-[1.65] wrap-anywhere"
							>
								{link.label}
							</NavigationLink>
						))}
					</nav>
				</div>
				{offices.map((office) => (
					<div key={office._key} className="px-6 pb-6 @tablet:p-8">
						<h2 className="mb-3 text-sm leading-normal font-medium">Contact</h2>
						<address className="text-sm leading-[1.65] not-italic">
							<RichTextBody value={office.address} variant="address" />
							<DesignLink
								href={`tel:${stegaClean(office.tel)}`}
								className="flex min-h-11 items-center py-1 wrap-anywhere"
							>
								{office.phone}
							</DesignLink>
							<DesignLink
								href={`mailto:${stegaClean(office.email)}`}
								className="flex min-h-11 items-center py-1 wrap-anywhere"
							>
								{office.email}
							</DesignLink>
						</address>
					</div>
				))}
			</div>
			<div className="flex flex-wrap justify-between gap-3.5 px-6 pt-[22px] pb-[26px] text-[13px] leading-[1.6] text-muted @tablet:px-content">
				<span>{content.copyright}</span>
				<nav
					aria-label="Legal information"
					className="flex flex-wrap gap-[18px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center"
				>
					{(content.legalNavigation ?? []).map((link) => (
						<NavigationLink
							key={link._key}
							href={link.href ?? "#"}
							homepagePath={homepagePath}
						>
							{link.label}
						</NavigationLink>
					))}
				</nav>
			</div>
		</footer>
	);
}

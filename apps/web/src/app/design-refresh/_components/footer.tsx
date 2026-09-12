import Image from "next/image";
import { stegaClean } from "next-sanity";
import type { FooterContent } from "@/components/homepage/content";
import { RichTextBody } from "@/components/homepage/rich-text-body";
import { NavigationLink } from "./preview-link";
import { DesignLink } from "./primitives";

export function Footer({
	content,
	placeholderLinks = false,
	homepagePath = "",
}: {
	content: FooterContent;
	placeholderLinks?: boolean;
	homepagePath?: string;
}) {
	const offices = content.offices ?? [];
	return (
		<footer id="dh-contact">
			<div className="mx-2.5 grid grid-cols-2 bg-paper @max-[381px]:grid-cols-1 @tablet:mx-frame @desktop:grid-cols-[1.1fr_.85fr_1fr_1fr] @wide:px-footer">
				<div className="col-span-full grid grid-cols-2 items-center gap-[23px] bg-brand px-[23px] py-[25px] text-brand-ink @max-[351px]:grid-cols-1 @max-[351px]:gap-[18px] @tablet:col-span-1 @tablet:block @tablet:p-7 @nav:px-[25px] @nav:py-[31px]">
					<Image
						src="/logos/dfn-logo-transparent.svg"
						width={1345.677}
						height={586.551}
						alt="Dignity Freedom Network"
						unoptimized
						className="h-auto w-[135px] @tablet:mb-[23px] @tablet:w-[153px]"
					/>
					<p className="text-sm leading-[1.65]">{content.summary}</p>
				</div>
				<div className="col-span-full px-5 pt-[26px] @tablet:col-span-1 @tablet:px-[23px] @tablet:py-[31px]">
					<h2 className="mb-[7px] text-sm leading-normal font-medium @tablet:mb-[15px]">
						{content.navigationTitle}
					</h2>
					<nav
						aria-label="Footer navigation"
						className="flex flex-wrap gap-x-5 gap-y-2 @tablet:block"
					>
						{(content.navigation ?? []).map((link) => (
							<NavigationLink
								key={link._key}
								href={link.href}
								placeholderLinks={placeholderLinks}
								homepagePath={homepagePath}
								className="flex min-h-11 items-center py-1 text-sm leading-[1.65] wrap-anywhere"
							>
								{link.label}
							</NavigationLink>
						))}
					</nav>
				</div>
				{offices.map((office) => (
					<div
						key={office._key}
						className="px-5 py-[26px] @max-[381px]:px-6 @max-[381px]:py-5 @tablet:px-[23px] @tablet:py-[31px]"
					>
						<h2 className="mb-[15px] text-sm leading-normal font-medium">
							{office.country}
						</h2>
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
							href={link.href}
							placeholderLinks={placeholderLinks}
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

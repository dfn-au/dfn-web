import Image from "next/image";
import { PreviewLink } from "./preview-link";
import { DesignLink } from "./primitives";

const footerLinks = [
	{ label: "Stories", href: "https://dfn.org.au/stories/" },
	{ label: "Get involved", href: "https://dfn.org.au/help/" },
	{ label: "Contact", href: "https://dfn.org.au/contact/" },
];
const offices = [
	{
		country: "Australia",
		address: ["P.O. Box 7", "Nunawading", "VIC 3131"],
		phone: "1800 949 774",
		tel: "1800949774",
		email: "info@dfn.org.au",
	},
	{
		country: "New Zealand",
		address: ["PO Box 10053, Bayfair", "Mount Maunganui 3152"],
		phone: "022 672 0260",
		tel: "+64226720260",
		email: "info@dfn.org.nz",
	},
];
export function Footer() {
	return (
		<footer id="dh-contact">
			<div className="mx-2.5 grid grid-cols-2 bg-paper @max-[381px]:grid-cols-1 @tablet:mx-frame @desktop:grid-cols-[1.1fr_.85fr_1fr_1fr] @wide:px-footer">
				<div className="col-span-full grid grid-cols-2 items-center gap-[23px] bg-brand px-[23px] py-[25px] text-brand-ink @max-[351px]:grid-cols-1 @max-[351px]:gap-[18px] @tablet:col-span-1 @tablet:block @tablet:p-7 @nav:px-[25px] @nav:py-[31px]">
					<Image
						src="/design-refresh/reverse.png"
						width={300}
						height={131}
						alt="Dignity Freedom Network"
						unoptimized
						className="h-auto w-[135px] @tablet:mb-[23px] @tablet:w-[153px]"
					/>
					<p className="text-sm leading-[1.65]">
						Working towards dignity and freedom for marginalised communities in
						South Asia.
					</p>
				</div>
				<div className="col-span-full px-5 pt-[26px] @tablet:col-span-1 @tablet:px-[23px] @tablet:py-[31px]">
					<h2 className="mb-[7px] text-sm leading-normal font-medium @tablet:mb-[15px]">
						Explore DFN
					</h2>
					<nav
						aria-label="Footer navigation"
						className="flex flex-wrap gap-x-5 gap-y-2 @tablet:block"
					>
						<PreviewLink
							hash="dh-work"
							className="flex min-h-11 items-center py-1 text-sm leading-[1.65]"
						>
							Our work
						</PreviewLink>
						<PreviewLink
							page="about"
							className="flex min-h-11 items-center py-1 text-sm leading-[1.65]"
						>
							About DFN
						</PreviewLink>
						{footerLinks.map((link) => (
							<DesignLink
								key={link.href}
								href={link.href}
								className="flex min-h-11 items-center py-1 text-sm leading-[1.65] wrap-anywhere"
							>
								{link.label}
							</DesignLink>
						))}
					</nav>
				</div>
				{offices.map((office) => (
					<div
						key={office.country}
						className="px-5 py-[26px] @max-[381px]:px-6 @max-[381px]:py-5 @tablet:px-[23px] @tablet:py-[31px]"
					>
						<h2 className="mb-[15px] text-sm leading-normal font-medium">
							{office.country}
						</h2>
						<address className="text-sm leading-[1.65] not-italic">
							<p className="mb-2.5 leading-[1.65] text-muted">
								{office.address.map((line, index) => (
									<span key={line}>
										{index > 0 && <br />}
										{line}
									</span>
								))}
							</p>
							<DesignLink
								href={`tel:${office.tel}`}
								className="flex min-h-11 items-center py-1 wrap-anywhere"
							>
								{office.phone}
							</DesignLink>
							<DesignLink
								href={`mailto:${office.email}`}
								className="flex min-h-11 items-center py-1 wrap-anywhere"
							>
								{office.email}
							</DesignLink>
						</address>
					</div>
				))}
			</div>
			<div className="flex flex-wrap justify-between gap-3.5 px-6 pt-[22px] pb-[26px] text-[13px] leading-[1.6] text-muted @tablet:px-content">
				<span>© 2026 Dignity Freedom Network</span>
				<nav
					aria-label="Legal information"
					className="flex flex-wrap gap-[18px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center"
				>
					<DesignLink href="https://dfn.org.au/privacy-policy/">
						Privacy
					</DesignLink>
					<DesignLink href="https://dfn.org.au/ethical-fundraising-standards/">
						Ethical fundraising
					</DesignLink>
					<DesignLink href="https://dfn.org.au/faqs/">FAQs</DesignLink>
				</nav>
			</div>
		</footer>
	);
}

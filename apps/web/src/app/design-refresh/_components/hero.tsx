"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, DesignLink, Eyebrow, Photo } from "./primitives";

const navigation = [
	{ href: "#dh-work", label: "Our work" },
	{ href: "https://dfn.org.au/about/", label: "About DFN" },
	{ href: "#dh-involved", label: "Get involved" },
];

export function Hero() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButton = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (!menuOpen) return;
		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setMenuOpen(false);
				menuButton.current?.focus();
			}
		}
		document.addEventListener("keydown", closeOnEscape);
		return () => document.removeEventListener("keydown", closeOnEscape);
	}, [menuOpen]);
	return (
		<div className="relative mx-auto max-w-[1920px] px-2.5 @desktop:px-frame @desktop:pt-frame">
			<header className="relative z-10 -mx-2.5 flex min-h-[88px] flex-wrap items-center justify-between gap-2 py-3 pr-4 @max-[381px]:pr-3 @desktop:absolute @desktop:inset-x-0 @desktop:top-[46px] @desktop:right-frame @desktop:mx-0 @desktop:min-h-0 @desktop:flex-nowrap @desktop:gap-5 @desktop:py-0 @desktop:pr-[max(28px,calc((min(100cqi,1920px)-1120px)/2-16px))]">
				<DesignLink href="#dh-top" aria-label="DFN home">
					<Image
						src="/design-refresh/logo.png"
						alt="Dignity Freedom Network"
						width={600}
						height={269}
						unoptimized
						className="h-auto w-40 @max-[381px]:w-[140px] @desktop:w-[216px]"
					/>
				</DesignLink>
				<div className="ml-auto flex items-center gap-2 @desktop:gap-[26px]">
					<nav
						aria-label="Main navigation"
						className="hidden items-center gap-[25px] font-nav text-base leading-[1.4] tracking-[.25px] text-white uppercase @desktop:flex"
					>
						{navigation.map((link) => (
							<DesignLink key={link.href} href={link.href} className="py-3">
								{link.label}
							</DesignLink>
						))}
					</nav>
					<button
						ref={menuButton}
						type="button"
						aria-expanded={menuOpen}
						aria-controls="dh-menu"
						onClick={() => setMenuOpen(!menuOpen)}
						className="min-h-[46px] min-w-[62px] cursor-pointer border border-white/75 bg-overlay/70 p-2.5 text-sm leading-normal text-white @desktop:hidden"
					>
						{menuOpen ? "Close" : "Menu"}
					</button>
					<DesignLink
						href="https://dfn.org.au/donate/"
						className="inline-flex min-h-[46px] min-w-[60px] items-center justify-center border border-action bg-action px-3.5 py-2.5 font-nav text-base leading-[1.4] text-white uppercase @desktop:min-w-[72px] @desktop:px-[22px] @desktop:py-[11px]"
					>
						Give
					</DesignLink>
				</div>
				<nav
					id="dh-menu"
					aria-label="Mobile navigation"
					hidden={!menuOpen}
					className="absolute inset-x-2.5 top-full grid bg-involved px-5 py-3 text-white shadow-lg @desktop:hidden"
				>
					{[
						...navigation,
						{ href: "#dh-signup", label: "Receive updates" },
						{ href: "#dh-contact", label: "Contact DFN" },
					].map((link) => (
						<DesignLink
							key={link.href}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className="py-3 text-intro leading-normal"
						>
							{link.label}
						</DesignLink>
					))}
				</nav>
			</header>
			<section
				className="relative bg-paper @desktop:flex @desktop:min-h-[clamp(580px,34cqi,640px)] @desktop:items-end @desktop:px-hero @desktop:pt-[170px] @desktop:pb-12"
				aria-labelledby="hero-title"
			>
				<Photo
					name="hero"
					alt="A woman and child photographed for DFN"
					priority
					className="relative h-[clamp(320px,65cqi,360px)] w-full object-cover object-[82%_center] @desktop:absolute @desktop:inset-0 @desktop:h-full @desktop:object-[center_14%]"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 hidden bg-hero-desktop @desktop:block"
				/>
				<div className="relative z-1 px-[max(14px,calc((100cqi-560px)/2-10px))] pt-[30px] pb-[34px] text-white @desktop:max-w-[435px] @desktop:p-0">
					<Eyebrow>Dignity Freedom Network</Eyebrow>
					<h1
						id="hero-title"
						className="mt-[13px] mb-[17px] font-display text-[clamp(35px,9.5cqi,48px)] leading-[1.06] font-medium tracking-[-1.5px] @desktop:text-[clamp(36px,5.3cqi,56px)]"
					>
						Dignity. Freedom.
						<br />
						Opportunity.
					</h1>
					<p className="mb-6 max-w-[38ch] text-copy leading-[1.65] @desktop:max-w-[36ch]">
						Locally led education, healthcare and livelihood programmes,
						alongside protection for vulnerable communities in South Asia.
					</p>
					<ButtonLink href="#dh-work">Explore our work</ButtonLink>
				</div>
			</section>
		</div>
	);
}

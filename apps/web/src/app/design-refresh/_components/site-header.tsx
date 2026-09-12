"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PreviewLink } from "./preview-link";
import { DesignLink } from "./primitives";

const navigation = [
	{ page: "home", hash: "dh-work", label: "Our work" },
	{ page: "about", label: "About DFN" },
	{ page: "home", hash: "dh-involved", label: "Get involved" },
];

export function SiteHeader({
	overlay = false,
	activePage = "home",
}: {
	overlay?: boolean;
	activePage?: string;
}) {
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
		<>
			<a
				href="#dh-main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:p-4 focus:text-page"
			>
				Skip to content
			</a>
			<header
				className={`relative z-10 -mx-2.5 flex min-h-[88px] flex-wrap items-center justify-between gap-2 py-3 pr-4 @max-[381px]:pr-3 @desktop:mx-0 @desktop:min-h-0 @desktop:flex-nowrap @desktop:gap-5 @desktop:pr-[max(28px,calc((min(100cqi,1920px)-1120px)/2-16px))] ${overlay ? "@desktop:absolute @desktop:inset-x-0 @desktop:top-[46px] @desktop:right-frame @desktop:py-0" : "@desktop:py-5"}`}
			>
				<PreviewLink page="home" hash="dh-top" aria-label="DFN home"
					className="relative block aspect-[600/269] w-40 shrink-0 bg-brand @max-[381px]:w-[140px] @desktop:w-[216px]">
					{/* Preserve the artwork position within the original padded logo. */}
					<Image
						src="/logos/dfn-logo-transparent.svg"
						alt="Dignity Freedom Network"
						width={1345.677}
						height={586.551}
						unoptimized
						className="absolute top-[16.144%] left-[19.7566%] h-auto w-[67.2839%]"
					/>
				</PreviewLink>
				<div className="ml-auto flex items-center gap-2 @desktop:gap-[26px]">
					<nav
						aria-label="Main navigation"
						className="hidden items-center gap-[25px] font-nav text-base leading-[1.4] tracking-[.25px] text-white uppercase @desktop:flex"
					>
						{navigation.map((link) => (
							<PreviewLink
								key={link.label}
								page={link.page}
								hash={link.hash}
								aria-current={
									link.page === activePage && !link.hash ? "page" : undefined
								}
								className="py-3 aria-[current=page]:text-accent aria-[current=page]:underline aria-[current=page]:underline-offset-8"
							>
								{link.label}
							</PreviewLink>
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
						{ page: "home", hash: "dh-signup", label: "Receive updates" },
						{ page: activePage, hash: "dh-contact", label: "Contact DFN" },
					].map((link) => (
						<PreviewLink
							key={link.label}
							page={link.page}
							hash={link.hash}
							aria-current={
								link.page === activePage && !link.hash ? "page" : undefined
							}
							onClick={() => setMenuOpen(false)}
							className="py-3 text-intro leading-normal"
						>
							{link.label}
						</PreviewLink>
					))}
				</nav>
			</header>
		</>
	);
}

"use client";

import Image from "next/image";
import { stegaClean } from "next-sanity";
import {
	type ComponentProps,
	type KeyboardEvent,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { PaletteContext } from "@/components/site/navigation-link";
import type {
	HeaderChildLink,
	HeaderContent,
	HeaderNavigationItem,
} from "./content";
import {
	headerHref,
	isCurrentHeaderLink,
	navigationColumns,
} from "./header-navigation";
import { publicNavigationHref } from "./navigation";

const topLinkClass =
	"flex min-h-12 items-center gap-2.5 border-b-2 border-transparent bg-transparent font-nav text-[15px] leading-[1.4] tracking-[.25px] whitespace-nowrap text-white uppercase hover:border-accent hover:text-accent aria-expanded:border-accent aria-expanded:text-accent aria-[current=page]:border-accent aria-[current=page]:text-accent data-[active=true]:border-accent data-[active=true]:text-accent @min-[1200px]:text-base";
const categoryClass =
	"flex min-h-[62px] w-full items-center justify-between gap-4 bg-transparent py-3 text-left text-[19px] leading-snug text-ink hover:text-accent aria-expanded:text-accent aria-[current=page]:text-accent aria-[current=page]:underline aria-[current=page]:underline-offset-8";
const giveClass =
	"inline-flex min-h-[46px] min-w-[60px] shrink-0 items-center justify-center bg-action px-3.5 py-2.5 font-nav text-base leading-[1.4] text-white uppercase hover:bg-[#9d3010] @wide:min-w-[72px] @wide:px-[22px] @wide:py-[11px]";

function Chevron({ open }: { open: boolean }) {
	return (
		<span
			aria-hidden="true"
			className={`mx-0.5 block size-[7px] shrink-0 border-r-[1.5px] border-b-[1.5px] ${open ? "mt-1 rotate-[225deg]" : "mb-1 rotate-45"}`}
		/>
	);
}

function HeaderLink({
	href,
	activePage,
	...props
}: ComponentProps<"a"> & { href: string; activePage: string }) {
	const { palette, controlsVisible } = useContext(PaletteContext);
	return (
		<a
			{...props}
			href={publicNavigationHref(
				headerHref(href, activePage),
				palette,
				controlsVisible,
			)}
			aria-current={isCurrentHeaderLink(href, activePage) ? "page" : undefined}
		/>
	);
}

function Logo({
	activePage,
	onNavigate,
}: {
	activePage: string;
	onNavigate?: () => void;
}) {
	return (
		<HeaderLink
			href={activePage === "home" ? "#dh-top" : "/#dh-top"}
			activePage={activePage}
			aria-label="DFN home"
			onClick={onNavigate}
			className="relative block aspect-[600/269] w-40 shrink-0 bg-brand @max-[381px]:w-[140px] @desktop:w-[216px]"
		>
			<Image
				src="/logos/dfn-logo-transparent.svg"
				alt="Dignity Freedom Network"
				width={1345.677}
				height={586.551}
				unoptimized
				className="absolute top-[16.144%] left-[19.7566%] h-auto w-[67.2839%]"
			/>
		</HeaderLink>
	);
}

function ChildLinks({
	links,
	activePage,
	groups = false,
	overviewKey,
	onNavigate,
}: {
	links: HeaderChildLink[];
	activePage: string;
	groups?: boolean;
	overviewKey?: string;
	onNavigate: () => void;
}) {
	return (
		<ul>
			{links.map((link, index) => (
				<li key={link._key}>
					{groups &&
						link.groupLabel &&
						(index === 0 ||
							stegaClean(link.groupLabel) !==
								stegaClean(links[index - 1].groupLabel ?? "")) && (
							<span className="mx-2 mt-3.5 mb-1 block text-[10px] leading-normal font-semibold tracking-[1.4px] text-accent uppercase">
								{link.groupLabel}
							</span>
						)}
					<HeaderLink
						href={link.href}
						activePage={activePage}
						onClick={onNavigate}
						data-overview={link._key === overviewKey}
						className="flex min-h-12 items-center justify-between gap-[18px] border-b border-rule px-2 py-3 text-[15px] leading-[1.4] text-ink data-[overview=true]:text-accent hover:bg-involved hover:text-accent aria-[current=page]:text-accent aria-[current=page]:underline aria-[current=page]:underline-offset-4"
					>
						<span className="wrap-anywhere">{link.label}</span>
						<span aria-hidden="true" className="shrink-0 text-muted">
							↗
						</span>
					</HeaderLink>
				</li>
			))}
		</ul>
	);
}

export function SiteHeader({
	content,
	overlay = false,
	activePage = "home",
}: {
	content?: HeaderContent;
	overlay?: boolean;
	activePage?: string;
}) {
	const id = useId();
	const { controlsVisible } = useContext(PaletteContext);
	const header = useRef<HTMLElement>(null);
	const dialog = useRef<HTMLDialogElement>(null);
	const menuButton = useRef<HTMLButtonElement>(null);
	const closeButton = useRef<HTMLButtonElement>(null);
	const restoreDrawerFocus = useRef(true);
	const [openGroup, setOpenGroup] = useState<string | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [panelHeight, setPanelHeight] = useState<number>();
	const navigation = content?.navigation ?? [];
	const giveHref = content?.giveHref ?? "https://dfn.org.au/donate/";

	function closeDrawer() {
		setDrawerOpen(false);
		setOpenGroup(null);
	}

	function navigateFromDrawer() {
		// Close synchronously before the link's default navigation. Restoring focus
		// after a same-page anchor jump would scroll the visitor back to the header.
		restoreDrawerFocus.current = false;
		dialog.current?.close();
		closeDrawer();
	}

	useEffect(() => {
		const element = dialog.current;
		if (!drawerOpen || !element) return;
		const previousOverflow = document.body.style.overflow;
		element.showModal();
		closeButton.current?.focus();
		document.body.style.overflow = "hidden";
		return () => {
			element.close();
			document.body.style.overflow = previousOverflow;
		};
	}, [drawerOpen]);

	useEffect(() => {
		const breakpoint = matchMedia("(min-width: 1100px)");
		function onResize(event: MediaQueryListEvent) {
			const hasFocus =
				header.current?.contains(document.activeElement) ||
				dialog.current?.open;
			setOpenGroup(null);
			setDrawerOpen(false);
			if (hasFocus)
				requestAnimationFrame(() => {
					if (event.matches)
						header.current
							?.querySelector<HTMLElement>("nav a, nav button")
							?.focus();
					else menuButton.current?.focus();
				});
		}
		breakpoint.addEventListener("change", onResize);
		return () => breakpoint.removeEventListener("change", onResize);
	}, []);

	useEffect(() => {
		if (!openGroup || drawerOpen) return;
		function dismiss(event: Event) {
			if (
				event.target instanceof Node &&
				!header.current?.contains(event.target)
			)
				setOpenGroup(null);
		}
		function closeOnEscape(event: globalThis.KeyboardEvent) {
			if (event.key !== "Escape") return;
			const opener = header.current?.querySelector<HTMLButtonElement>(
				'button[aria-expanded="true"]',
			);
			setOpenGroup(null);
			opener?.focus();
		}
		function resizePanel() {
			const panel = header.current?.querySelector<HTMLElement>(
				"[data-navigation-panel]:not([hidden])",
			);
			if (panel)
				setPanelHeight(
					Math.max(
						100,
						innerHeight -
							panel.getBoundingClientRect().top -
							(controlsVisible ? 88 : 20),
					),
				);
		}
		resizePanel();
		document.addEventListener("pointerdown", dismiss);
		document.addEventListener("focusin", dismiss);
		document.addEventListener("keydown", closeOnEscape);
		window.addEventListener("resize", resizePanel);
		window.addEventListener("scroll", resizePanel, { passive: true });
		return () => {
			document.removeEventListener("pointerdown", dismiss);
			document.removeEventListener("focusin", dismiss);
			document.removeEventListener("keydown", closeOnEscape);
			window.removeEventListener("resize", resizePanel);
			window.removeEventListener("scroll", resizePanel);
		};
	}, [openGroup, drawerOpen, controlsVisible]);

	function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
		if (event.key !== "Tab") return;
		const elements = Array.from(
			event.currentTarget.querySelectorAll<HTMLElement>(
				"a[href],button:not([disabled])",
			),
		).filter((element) => element.getClientRects().length > 0);
		const first = elements[0];
		const last = elements.at(-1);
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last?.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first?.focus();
		}
	}

	function currentGroup(item: HeaderNavigationItem) {
		return item.children?.some((link) =>
			isCurrentHeaderLink(link.href, activePage),
		);
	}

	if (!content) return null;
	return (
		<>
			<a
				href="#dh-main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:bg-ink focus:p-4 focus:text-page"
			>
				Skip to content
			</a>
			<header
				ref={header}
				data-site-header="grouped"
				className={`relative z-40 -mx-2.5 flex min-h-[88px] items-center justify-between gap-2 py-3 pr-4 @max-[381px]:pr-3 @desktop:mx-0 @desktop:min-h-0 @desktop:gap-5 @desktop:pr-[max(28px,calc((min(100cqi,1920px)-1120px)/2-16px))] [&_:focus-visible]:outline-accent [&_button]:cursor-pointer ${overlay ? "@desktop:absolute @desktop:inset-x-0 @desktop:top-[46px] @desktop:right-frame @desktop:py-0" : "@desktop:py-5"}`}
			>
				<Logo activePage={activePage} />
				<div
					className={`ml-auto flex min-w-0 items-center gap-2 @wide:gap-[18px] @min-[1200px]:gap-6 ${overlay ? "@wide:bg-overlay/80 @wide:pl-3.5" : ""}`}
				>
					<nav aria-label="Main navigation" className="hidden @wide:block">
						<ul className="flex items-center gap-[18px] @min-[1200px]:gap-6">
							{navigation.map((item) => (
								<li key={item._key}>
									{item.children?.length ? (
										<>
											<button
												type="button"
												className={topLinkClass}
												aria-expanded={openGroup === item._key}
												aria-controls={`${id}-desktop-${item._key}`}
												data-active={currentGroup(item)}
												onClick={() =>
													setOpenGroup(
														openGroup === item._key ? null : item._key,
													)
												}
											>
												{item.label}
												<Chevron open={openGroup === item._key} />
											</button>
											<div
												id={`${id}-desktop-${item._key}`}
												data-navigation-panel
												hidden={openGroup !== item._key}
												style={{ maxHeight: panelHeight }}
												className={`absolute top-[calc(100%+14px)] right-0 left-4 grid gap-16 overflow-y-auto overscroll-contain border-t-2 border-accent bg-paper px-[max(32px,calc((min(100cqi,1920px)-1200px)/2))] pt-7 pb-[34px] text-ink shadow-[0_20px_50px_#0005] [scrollbar-gutter:stable] ${item.headline || item.description ? "grid-cols-[minmax(220px,.85fr)_2fr]" : "grid-cols-1"}`}
											>
												{(item.headline || item.description) && (
													<div className="py-3">
														<span className="font-nav text-xs leading-normal tracking-[1.8px] text-accent uppercase">
															{item.label}
														</span>
														{item.headline && (
															<h2 className="my-4 font-display text-[32px] leading-[1.13] tracking-[-.6px]">
																{item.headline}
															</h2>
														)}
														{item.description && (
															<p className="max-w-[29ch] text-sm leading-[1.7] text-muted">
																{item.description}
															</p>
														)}
													</div>
												)}
												<div className="grid grid-cols-2 items-start gap-8">
													{navigationColumns(item.children).map((column) => (
														<ChildLinks
															key={column[0]._key}
															links={column}
															overviewKey={item.children?.[0]._key}
															activePage={activePage}
															groups
															onNavigate={() => setOpenGroup(null)}
														/>
													))}
												</div>
												<button
													type="button"
													aria-label={`Close ${stegaClean(item.label)}`}
													className="absolute top-2 right-2.5 size-11 bg-paper text-2xl leading-none text-muted"
													onClick={() => {
														const opener =
															header.current?.querySelector<HTMLButtonElement>(
																'button[aria-expanded="true"]',
															);
														setOpenGroup(null);
														opener?.focus();
													}}
												>
													×
												</button>
											</div>
										</>
									) : (
										<HeaderLink
											href={item.href ?? "#"}
											activePage={activePage}
											className={topLinkClass}
										>
											{item.label}
										</HeaderLink>
									)}
								</li>
							))}
						</ul>
					</nav>
					<button
						ref={menuButton}
						type="button"
						aria-expanded={drawerOpen}
						aria-controls={`${id}-drawer`}
						className="min-h-[46px] min-w-[62px] border border-white/60 bg-overlay/80 p-2.5 text-sm text-white @wide:hidden"
						onClick={() => {
							setOpenGroup(null);
							restoreDrawerFocus.current = true;
							setDrawerOpen(true);
						}}
					>
						Menu
					</button>
					<HeaderLink
						href={giveHref}
						activePage={activePage}
						className={giveClass}
					>
						{content.give}
					</HeaderLink>
				</div>
			</header>
			<dialog
				ref={dialog}
				id={`${id}-drawer`}
				aria-label="Explore DFN"
				onCancel={(event) => {
					event.preventDefault();
					closeDrawer();
				}}
				onClose={() => {
					if (
						restoreDrawerFocus.current &&
						!matchMedia("(min-width: 1100px)").matches
					)
						menuButton.current?.focus();
				}}
				onKeyDown={trapFocus}
				className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-page p-0 text-ink backdrop:bg-overlay/90 [&_:focus-visible]:outline-accent [&_button]:cursor-pointer"
			>
				<div className="flex h-[96px] shrink-0 items-center justify-between gap-2 border-b border-rule py-3 pr-4 @max-[381px]:h-[88px] @max-[381px]:pr-3 @desktop:h-[137px] @desktop:py-5 @desktop:pr-7">
					<Logo activePage={activePage} onNavigate={navigateFromDrawer} />
					<div className="flex items-center gap-2 @tablet:gap-3">
						<button
							ref={closeButton}
							type="button"
							onClick={closeDrawer}
							className="flex min-h-[46px] items-center gap-[7px] border border-rule px-2.5 py-2 text-[13px] text-ink"
						>
							Close
							<span aria-hidden="true" className="text-[22px] leading-none">
								×
							</span>
						</button>
						<HeaderLink
							href={giveHref}
							activePage={activePage}
							className={giveClass}
							onClick={navigateFromDrawer}
						>
							{content.give}
						</HeaderLink>
					</div>
				</div>
				<div className="h-[calc(100dvh-96px)] overflow-y-auto overscroll-contain px-6 pt-[26px] pb-9 [scrollbar-gutter:stable] @max-[381px]:h-[calc(100dvh-88px)] @max-[381px]:px-[18px] @desktop:h-[calc(100dvh-137px)]">
					<p className="mb-3.5 font-nav text-xs tracking-[1.8px] text-accent uppercase">
						Explore DFN
					</p>
					{content.menuHeading && (
						<p className="mb-7 max-w-[20ch] font-display text-[30px] leading-[1.2]">
							{content.menuHeading}
						</p>
					)}
					<nav aria-label="Mobile navigation">
						<ul>
							{navigation.map((item) => (
								<li key={item._key} className="border-b border-rule">
									{item.children?.length ? (
										<>
											<button
												type="button"
												className={categoryClass}
												aria-expanded={openGroup === item._key}
												aria-controls={`${id}-mobile-${item._key}`}
												onClick={() =>
													setOpenGroup(
														openGroup === item._key ? null : item._key,
													)
												}
											>
												{item.label}
												<Chevron open={openGroup === item._key} />
											</button>
											<div
												id={`${id}-mobile-${item._key}`}
												hidden={openGroup !== item._key}
												className="pb-5 pl-3"
											>
												<ChildLinks
													links={item.children}
													overviewKey={item.children?.[0]._key}
													activePage={activePage}
													onNavigate={navigateFromDrawer}
												/>
											</div>
										</>
									) : (
										<HeaderLink
											href={item.href ?? "#"}
											activePage={activePage}
											onClick={navigateFromDrawer}
											className={categoryClass}
										>
											{item.label}
											<span aria-hidden="true">↗</span>
										</HeaderLink>
									)}
								</li>
							))}
						</ul>
					</nav>
				</div>
			</dialog>
		</>
	);
}

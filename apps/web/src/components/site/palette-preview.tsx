"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import {
	type BodyPreview,
	type BrandPreview,
	bodyPreviews,
	brandPreviews,
	type HeadingPreview,
	headingPreviews,
	type IconPreview,
	iconPreviews,
	type LabelPreview,
	type LogoPreview,
	labelPreviews,
	previewDefaults,
	resolveBodyPreview,
	resolveBrandPreview,
	resolveHeadingPreview,
	resolveIconPreview,
	resolveLabelPreview,
	resolveLogoPreview,
} from "./brand-preview";
import { PaletteContext } from "./navigation-link";
import { type Palette, palettes, resolvePalette } from "./palettes";

const labels: Record<Palette, string> = {
	charcoal: "Warm charcoal",
	olive: "Olive",
	ink: "Deep ink",
	umber: "Earthy umber",
	"guide-light": "Guide light",
};

const brandLabels: Record<BrandPreview, string> = {
	current: "Original",
	proposed: "Dark text",
	"white-text": "White text (default)",
};

const headingLabels: Record<HeadingPreview, string> = {
	current: "Fraunces (original)",
	existing: "Existing DFN site (default)",
	battersea: "Battersea Slab",
};

const bodyLabels: Record<BodyPreview, string> = {
	current: "DM Sans (original)",
	andada: "Andada Regular (default)",
};

function PreviewChoices<Value extends string>({
	title,
	description,
	values,
	labels,
	value,
	onChange,
}: {
	title: string;
	description: ReactNode;
	values: readonly Value[];
	labels: Record<Value, string>;
	value: Value;
	onChange: (value: Value) => void;
}) {
	const descriptionId = useId();
	return (
		<fieldset className="min-w-0 space-y-2" aria-describedby={descriptionId}>
			<legend className="text-[13px] font-semibold text-[#282e2a]">
				{title}
			</legend>
			<div className="flex gap-1 rounded-xl bg-[#edf0ed] p-1">
				{values.map((next) => (
					<button
						key={next}
						type="button"
						aria-pressed={value === next}
						onClick={() => onChange(next)}
						className="min-h-11 min-w-0 flex-1 cursor-pointer rounded-lg px-2 py-2 text-xs leading-snug text-[#505a53] transition-colors hover:bg-white/70 aria-pressed:bg-[#404743] aria-pressed:text-white aria-pressed:shadow-sm motion-reduce:transition-none"
					>
						{labels[next]}
					</button>
				))}
			</div>
			<p id={descriptionId} className="text-xs leading-relaxed text-[#626b65]">
				{description}
			</p>
		</fieldset>
	);
}

export function PalettePreview({
	initialPalette,
	initialBrandPreview,
	initialHeadingPreview,
	initialBodyPreview,
	initialLogoPreview,
	initialLabelPreview,
	initialIconPreview,
	showControls,
	children,
}: {
	initialPalette: Palette;
	initialBrandPreview: BrandPreview;
	initialHeadingPreview: HeadingPreview;
	initialBodyPreview: BodyPreview;
	initialLogoPreview: LogoPreview;
	initialLabelPreview: LabelPreview;
	initialIconPreview: IconPreview;
	showControls: boolean;
	children: ReactNode;
}) {
	const [palette, setPalette] = useState(initialPalette);
	const [brandPreview, setBrandPreview] = useState(initialBrandPreview);
	const [headingPreview, setHeadingPreview] = useState(initialHeadingPreview);
	const [bodyPreview, setBodyPreview] = useState(initialBodyPreview);
	const [logoPreview, setLogoPreview] = useState(initialLogoPreview);
	const [labelPreview, setLabelPreview] = useState(initialLabelPreview);
	const [iconPreview, setIconPreview] = useState(initialIconPreview);
	const [controlsVisible, setControlsVisible] = useState(showControls);
	useEffect(() => {
		const sync = () => {
			const params = new URLSearchParams(location.search);
			setPalette(resolvePalette(params.get("variant")));
			setBrandPreview(resolveBrandPreview(params.get("brand")));
			setHeadingPreview(resolveHeadingPreview(params.get("headings")));
			setBodyPreview(resolveBodyPreview(params.get("body")));
			setLogoPreview(resolveLogoPreview(params.get("logo")));
			setLabelPreview(resolveLabelPreview(params.get("labels")));
			setIconPreview(resolveIconPreview(params.get("icons")));
			setControlsVisible(params.get("clean") !== "1");
		};
		sync();
		addEventListener("popstate", sync);
		return () => removeEventListener("popstate", sync);
	}, []);
	function changeProposal(next: BrandPreview) {
		setBrandPreview(next);
		const url = new URL(location.href);
		if (next !== previewDefaults.brand) url.searchParams.set("brand", next);
		else url.searchParams.delete("brand");
		history.replaceState(null, "", url);
	}
	function changeHeadings(next: HeadingPreview) {
		setHeadingPreview(next);
		const url = new URL(location.href);
		if (next !== previewDefaults.headings)
			url.searchParams.set("headings", next);
		else url.searchParams.delete("headings");
		history.replaceState(null, "", url);
	}
	function changeBody(next: BodyPreview) {
		setBodyPreview(next);
		const url = new URL(location.href);
		if (next !== previewDefaults.body) url.searchParams.set("body", next);
		else url.searchParams.delete("body");
		history.replaceState(null, "", url);
	}
	function changeLogo(next: LogoPreview) {
		setLogoPreview(next);
		const url = new URL(location.href);
		if (next !== previewDefaults.logo) url.searchParams.set("logo", next);
		else url.searchParams.delete("logo");
		history.replaceState(null, "", url);
	}
	function changeLabels(next: LabelPreview) {
		setLabelPreview(next);
		const url = new URL(location.href);
		if (next !== previewDefaults.labels) url.searchParams.set("labels", next);
		else url.searchParams.delete("labels");
		history.replaceState(null, "", url);
	}
	function changeIcons(next: IconPreview) {
		setIconPreview(next);
		const url = new URL(location.href);
		if (next !== previewDefaults.icons) url.searchParams.set("icons", next);
		else url.searchParams.delete("icons");
		history.replaceState(null, "", url);
	}
	function toggleControls() {
		setControlsVisible(!controlsVisible);
		const url = new URL(location.href);
		// Reuse the existing URL setting so collapse survives refresh and navigation.
		if (controlsVisible) url.searchParams.set("clean", "1");
		else url.searchParams.delete("clean");
		history.replaceState(null, "", url);
	}
	function changePalette(value: string) {
		const next = resolvePalette(value);
		setPalette(next);
		const url = new URL(location.href);
		url.searchParams.set("variant", next);
		history.replaceState(null, "", url);
	}
	return (
		<div
			id="dfn-home"
			data-palette={palette}
			data-brand-preview={brandPreview}
			data-heading-preview={headingPreview}
			data-body-preview={bodyPreview}
			data-logo-preview={logoPreview}
			data-label-preview={labelPreview}
			data-icon-preview={iconPreview}
			className="@container min-h-screen bg-page font-body font-normal text-ink [color-scheme:var(--scheme,dark)] [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-focus"
		>
			<PaletteContext.Provider
				value={{
					palette,
					controlsVisible,
					brandPreview,
					headingPreview,
					bodyPreview,
					logoPreview,
					labelPreview,
					iconPreview,
				}}
			>
				{/* The existing site uses Andada for the homepage banner only; page titles and other headings use uppercase Vinyl. */}
				<div
					id="dh-top"
					className={[
						// Explicit markers keep menu controls, form labels and prose out of this comparison.
						labelPreview === "vinyl"
							? "[&_:is([data-brand-label],.brand-action)]:font-vinyl [&_:is([data-brand-label],.brand-action)]:font-normal [&_:is([data-brand-label],.brand-action)]:uppercase [&_:is([data-brand-label],.brand-action)]:tracking-[.025em] [&_[data-brand-label]]:text-[13px]"
							: "",
						iconPreview === "guide"
							? "[&_[data-sector-icon]]:inline-block [&_[data-sector-number]]:hidden"
							: "",
						// Small labels can be semantic headings; their separate Vinyl choice takes precedence.
						headingPreview === "existing"
							? "[&_:is(h1,h2,h3,h4,h5,h6):not([data-brand-label])]:font-vinyl [&_:is(h1,h2,h3,h4,h5,h6):not([data-brand-label])]:font-normal [&_:is(h1,h2,h3,h4,h5,h6):not([data-brand-label])]:uppercase [&_#hero-title]:font-andada [&_#hero-title]:font-bold [&_#hero-title]:normal-case"
							: "",
						headingPreview === "battersea"
							? "[&_:is(h1,h2,h3,h4,h5,h6):not([data-brand-label])]:font-battersea [&_:is(h1,h2,h3,h4,h5,h6):not([data-brand-label])]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6):not([data-brand-label])]:normal-case"
							: "",
						// Scope body copy separately so headings, menu labels, buttons and fields keep their fonts.
						bodyPreview === "andada"
							? "[&_:is(p,figcaption,dd,address,blockquote,[data-body-copy]):not(.font-display):not(.font-nav)]:font-andada"
							: "",
					].join(" ")}
				>
					{children}
				</div>
			</PaletteContext.Provider>
			<aside
				aria-label="Design preview"
				data-design-preview
				className={`fixed right-[max(12px,env(safe-area-inset-right))] bottom-[max(12px,env(safe-area-inset-bottom))] z-50 max-w-[calc(100%-24px)] overflow-hidden border border-[#d9dfd9] bg-[#fafbf8] font-sans text-sm leading-normal font-medium text-[#282e2a] shadow-[0_12px_48px_-12px_#0005,0_2px_8px_#0001] [color-scheme:light] [&_:focus-visible]:outline-[#1d5a7c] ${controlsVisible ? "w-[360px] rounded-2xl" : "rounded-full"}`}
			>
				<button
					type="button"
					onClick={toggleControls}
					aria-expanded={controlsVisible}
					aria-controls="design-preview-settings"
					aria-label={
						controlsVisible ? "Collapse design preview" : "Open design preview"
					}
					className="flex min-h-12 w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-[#f0f3ed] focus-visible:inset-ring-2 focus-visible:inset-ring-[#1d5a7c]"
				>
					<span
						aria-hidden="true"
						className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e9eee6] text-[#404743]"
					>
						<svg
							aria-hidden="true"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
						>
							<path d="M4 7h9m4 0h3M4 17h3m4 0h9" />
							<circle cx="15" cy="7" r="2" />
							<circle cx="9" cy="17" r="2" />
						</svg>
					</span>
					<span className="flex-1">
						<span className="block text-[13px] font-semibold">
							Design preview
						</span>
						{controlsVisible && (
							<span className="mt-0.5 block text-xs font-normal text-[#626b65]">
								Compare one change at a time
							</span>
						)}
					</span>
					<span aria-hidden="true" className="ml-2 text-lg text-[#626b65]">
						{controlsVisible ? "−" : "+"}
					</span>
				</button>
				<div
					id="design-preview-settings"
					hidden={!controlsVisible}
					className="max-h-[min(65dvh,680px)] overflow-y-auto overscroll-contain border-t border-[#e3e7e0] px-4 py-4 [scrollbar-width:thin]"
				>
					<div className="space-y-5">
						<div className="space-y-2">
							<label
								htmlFor="preview-palette"
								className="block text-[13px] font-semibold"
							>
								Colour palette
							</label>
							<select
								id="preview-palette"
								value={palette}
								aria-describedby="preview-palette-note"
								onChange={(event) => changePalette(event.target.value)}
								className="min-h-11 w-full cursor-pointer rounded-xl border border-[#cbd2cb] bg-white px-3 text-[13px]"
							>
								{palettes.map((value) => (
									<option key={value} value={value}>
										{labels[value]}
									</option>
								))}
							</select>
							<p
								id="preview-palette-note"
								className="text-xs leading-relaxed text-[#626b65]"
							>
								<strong className="mb-1 block text-[#404743]">
									Recommended: Guide light
								</strong>
								Closer to the guide’s examples, with white sections, grey text
								and blue accents. Light backgrounds are a design preference, not
								a requirement. The photo banner stays dark.
							</p>
						</div>
						<PreviewChoices
							title="Headings"
							values={headingPreviews}
							labels={headingLabels}
							value={headingPreview}
							onChange={changeHeadings}
							description={
								<>
									<strong className="mb-1 block text-[#404743]">
										Recommended: Battersea Slab
									</strong>
									The guide’s Semibold font for headings and subheadings,
									including the home banner. Existing DFN site uses Andada in
									the banner and uppercase Vinyl elsewhere. Body text, buttons
									and small labels have separate controls.
								</>
							}
						/>
						<PreviewChoices
							title="Body text"
							values={bodyPreviews}
							labels={bodyLabels}
							value={bodyPreview}
							onChange={changeBody}
							description={
								<>
									<strong className="mb-1 block text-[#404743]">
										Recommended: Andada Regular
									</strong>
									Matches the guide’s body font and the existing site. This
									changes reading text, leaving menus and buttons alone.
								</>
							}
						/>

						<PreviewChoices
							title="Buttons and small labels"
							values={labelPreviews}
							labels={{
								current: "Original",
								vinyl: "Vinyl uppercase (default)",
							}}
							value={labelPreview}
							onChange={changeLabels}
							description={
								<>
									<strong className="mb-1 block text-[#404743]">
										Recommended: Vinyl uppercase
									</strong>
									Matches the guide’s button and label examples. Changes action
									buttons and small section labels; keeps navigation, form
									labels and reading text unchanged.
								</>
							}
						/>
						<PreviewChoices
							title="Button colours"
							values={brandPreviews}
							labels={brandLabels}
							value={brandPreview}
							onChange={changeProposal}
							description={
								<>
									<strong className="mb-1 block text-[#404743]">
										Recommended: Dark text
									</strong>
									Uses the guide’s orange with stronger text contrast. White on
									that orange has 3.62:1 contrast, below the usual 4.5:1 target
									for small text. Logo orange stays the same.
								</>
							}
						/>
						<div className="space-y-2 border-t border-[#e3e7e0] pt-3">
							<label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-[13px] font-semibold">
								Guide logo size
								<input
									type="checkbox"
									checked={logoPreview === "guide"}
									aria-describedby="preview-logo-note"
									onChange={(event) =>
										changeLogo(event.target.checked ? "guide" : "current")
									}
									className="size-5 shrink-0 cursor-pointer accent-[#404743]"
								/>
							</label>
							<p
								id="preview-logo-note"
								className="text-xs leading-relaxed text-[#626b65]"
							>
								<strong className="mb-1 block text-[#404743]">
									Recommended: Guide logo size
								</strong>
								Meets the guide’s minimum size and clear-space requirements on
								mobile: 120px wide with 12px clear space. Desktop and footer
								already meet the guide. Artwork and colour stay the same.
							</p>
						</div>

						<PreviewChoices
							title="Sector markers"
							values={iconPreviews}
							labels={{
								current: "Numbers (original)",
								guide: "Guide icons (default)",
							}}
							value={iconPreview}
							onChange={changeIcons}
							description={
								<>
									<strong className="mb-1 block text-[#404743]">
										Recommended: Guide icons
									</strong>
									The guide’s four line icons replace programme numbers on the
									homepage. Text labels stay visible. Other numbered lists keep
									their numbers.
								</>
							}
						/>
						<p className="border-t border-[#e3e7e0] pt-3 text-[11px] leading-relaxed text-[#626b65]">
							Choices stay selected when you collapse this panel or open another
							page.
						</p>
					</div>
				</div>
			</aside>
		</div>
	);
}

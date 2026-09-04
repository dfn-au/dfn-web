import type { ReactNode } from "react";

export type FocusAreaImage = {
	alt: string;
	src: string;
	title: string;
};

export type FocusAreaSectionProps = {
	ctaLabel: string;
	description: string;
	href: string;
	image: FocusAreaImage;
	layout: "image-left" | "image-left-mobile-first" | "image-right";
	startsFlush?: boolean;
	title: string;
};

export function FocusAreaSection({
	ctaLabel,
	description,
	href,
	image,
	layout,
	startsFlush = false,
	title,
}: FocusAreaSectionProps) {
	const imageOnLeft = layout !== "image-right";
	const imageColumn = <FocusAreaImageColumn image={image} />;
	const contentColumn = (
		<FocusAreaContentColumn
			ctaLabel={ctaLabel}
			description={description}
			href={href}
			roomyTabletPadding={layout === "image-left-mobile-first"}
			title={title}
		/>
	);
	const groupClassName =
		layout === "image-left"
			? "fl-col-group fl-col-group-equal-height fl-col-group-align-center fl-col-group-custom-width fl-col-group-responsive-reversed"
			: "fl-col-group fl-col-group-equal-height fl-col-group-align-center fl-col-group-custom-width";
	const rowContentClassName = startsFlush
		? "mt-[0] mb-[10px] p-[0] legacy-max-992:mt-[0] legacy-max-768:m-[10px]! legacy-max-768:p-[20px_0]! fl-row-content-wrap"
		: "mt-[10px] mb-[10px] p-[0] legacy-max-768:m-[10px]! legacy-max-768:p-[20px_0]! fl-row-content-wrap";

	return (
		<div
			className="fl-row fl-row-full-width fl-row-default-height fl-row-align-center"
			data-node=""
		>
			<div className={rowContentClassName}>
				<div className="fl-row-content fl-row-full-width">
					<div className={groupClassName}>
						{imageOnLeft ? imageColumn : contentColumn}
						{imageOnLeft ? contentColumn : imageColumn}
					</div>
				</div>
			</div>
		</div>
	);
}

function FocusAreaImageColumn({ image }: { image: FocusAreaImage }) {
	const imageMarkup = (
		<ReferenceFigure>
			<div className="fl-photo-content">
				{/* biome-ignore lint/performance/noImgElement: frozen reference assets require exact image markup during migration. */}
				<img
					loading="lazy"
					decoding="async"
					className="max-w-full h-auto [border:0] align-middle"
					src={image.src}
					alt={image.alt}
					height="672"
					width="960"
					title={image.title}
					itemProp="image"
				/>
			</div>
		</ReferenceFigure>
	);

	return (
		<div
			className="w-1/2 legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left fl-col fl-col-small fl-col-small-custom-width"
			data-node=""
		>
			<div className="fl-col-content">
				<div className="text-center fl-module" data-node="">
					<div className="m-[0] fl-module-content">{imageMarkup}</div>
				</div>
			</div>
		</div>
	);
}

function ReferenceFigure({ children }: { children: ReactNode }) {
	return (
		<>
			{/* biome-ignore lint/a11y/useSemanticElements: changing the frozen reference tag would break the parity checkpoint. */}
			<div
				role="figure"
				className="fl-photo"
				itemScope
				itemType="https://schema.org/ImageObject"
			>
				{children}
			</div>
		</>
	);
}

function FocusAreaContentColumn({
	ctaLabel,
	description,
	href,
	roomyTabletPadding,
	title,
}: Pick<
	FocusAreaSectionProps,
	"ctaLabel" | "description" | "href" | "title"
> & {
	roomyTabletPadding: boolean;
}) {
	const columnContentClassName = roomyTabletPadding
		? "p-[6%] legacy-max-992:p-[3%]! fl-col-content"
		: "p-[6%] legacy-max-992:p-[2%]! fl-col-content";

	return (
		<div
			className="w-1/2 legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left fl-col fl-col-small fl-col-small-custom-width"
			data-node=""
		>
			<div className={columnContentClassName}>
				<div className="fl-module fl-module-heading" data-node="">
					<div className="mb-[5px] fl-module-content">
						<h2 className="font-vinyl text-[#333] [font-weight:400] uppercase not-italic text-[32px] [line-height:1.2] text-left [letter-spacing:1px] legacy-tablet:text-[30px] legacy-max-992:text-[24px] legacy-tablet:[letter-spacing:0] fl-heading">
							<span>{title}</span>
						</h2>
					</div>
				</div>
				<div className="fl-module" data-node="">
					<div className="mt-[5px] mb-[10px] legacy-max-768:mt-[0] fl-module-content">
						<div className="[line-height:1.8] legacy-max-992:text-[16px] legacy-max-992:[line-height:1.5]">
							<p className="m-[0_0_10px]">{description}</p>
						</div>
					</div>
				</div>
				<div className="fl-module" data-node="">
					<div className="mt-[10px] fl-module-content">
						<div className="text-left">
							<a
								href={href}
								target="_self"
								className="legacy-link legacy-home-cta fl-button"
							>
								<span>{ctaLabel}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

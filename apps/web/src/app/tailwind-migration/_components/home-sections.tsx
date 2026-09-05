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
			? "flex flex-wrap w-full legacy-max-768:flex-row-reverse legacy-max-768:flex-wrap-reverse"
			: "flex flex-wrap w-full";
	const rowContentClassName = startsFlush
		? "mt-[0] mb-[10px] p-[0] legacy-max-992:mt-[0] legacy-max-768:m-[10px]! legacy-max-768:p-[20px_0]! relative flex min-h-[0] items-center justify-center [-webkit-box-align:center] [-webkit-box-pack:center] legacy-max-768:bg-scroll! mr-[20px] ml-[20px] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]"
		: "mt-[10px] mb-[10px] p-[0] legacy-max-768:m-[10px]! legacy-max-768:p-[20px_0]! relative flex min-h-[0] items-center justify-center [-webkit-box-align:center] [-webkit-box-pack:center] legacy-max-768:bg-scroll! mr-[20px] ml-[20px] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0]";

	return (
		<div
			className={
				"mx-auto min-w-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
			}
		>
			<div className={rowContentClassName}>
				<div
					className={
						"mx-auto min-w-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both flex-auto max-w-full w-full"
					}
				>
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
			<div
				className={
					"inline-block relative [line-height:0] max-w-full [&_img]:inline [&_img]:h-auto [&_img]:max-w-full"
				}
			>
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
			className={
				"w-1/2 legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left float-left min-h-px legacy-max-768:mx-auto flex flex-auto"
			}
		>
			<div
				className={
					"flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] pt-[0] pr-[0] pb-[0] pl-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0] flex-auto min-w-px max-w-full w-full justify-center"
				}
			>
				<div
					className={
						"text-center legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
					}
				>
					<div
						className={
							"m-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
						}
					>
						{imageMarkup}
					</div>
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
				className="relative [line-height:0]"
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
		? "p-[6%] legacy-max-992:p-[3%]! flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0] flex-auto min-w-px max-w-full w-full justify-center"
		: "p-[6%] legacy-max-992:p-[2%]! flex flex-col mt-[0] mr-[0] mb-[0] ml-[0] legacy-max-768:mx-[0] legacy-max-768:mt-[0] legacy-max-768:mb-[0] legacy-max-768:px-[0] flex-auto min-w-px max-w-full w-full justify-center";

	return (
		<div
			className={
				"w-1/2 legacy-max-768:w-full! legacy-max-768:max-w-none! legacy-max-768:clear-none legacy-max-768:float-left float-left min-h-px legacy-max-768:mx-auto flex flex-auto"
			}
		>
			<div className={columnContentClassName}>
				<div
					className={
						"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
					}
				>
					<div
						className={
							"mb-[5px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mt-[20px] mr-[20px] ml-[20px]"
						}
					>
						<h2
							className={
								"font-vinyl text-[#333] [font-weight:400] uppercase not-italic text-[32px] [line-height:1.2] text-left [letter-spacing:1px] legacy-tablet:text-[30px] legacy-max-992:text-[24px] legacy-tablet:[letter-spacing:0] p-[0]! m-[0]!"
							}
						>
							<span>{title}</span>
						</h2>
					</div>
				</div>
				<div
					className={
						"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
					}
				>
					<div
						className={
							"mt-[5px] mb-[10px] legacy-max-768:mt-[0] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mr-[20px] ml-[20px]"
						}
					>
						<div className="[line-height:1.8] legacy-max-992:text-[16px] legacy-max-992:[line-height:1.5]">
							<p className="m-[0_0_10px]">{description}</p>
						</div>
					</div>
				</div>
				<div
					className={
						"legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
					}
				>
					<div
						className={
							"mt-[10px] legacy-before:table legacy-before:[content:'_'] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both mr-[20px] mb-[20px] ml-[20px]"
						}
					>
						<div className="text-left">
							<a
								href={href}
								target="_self"
								className={
									"text-[#de6026] no-underline hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0] inline-block cursor-pointer font-vinyl [line-height:1.2] uppercase [border:1px_solid_#d2541a] p-[15px_30px]! [font-weight:100]! text-[18px]! [letter-spacing:1px]! bg-[#de6026]! rounded-[3px]! text-white! no-underline! [text-shadow:none] hover:bg-[#b24d1e]! hover:text-white! focus:border-[#cc4405]! hover:border-[#cc4405]! [&_*]:text-white! [transition:none] [&_*]:[transition:none] active:relative active:top-px"
								}
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

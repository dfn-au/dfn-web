import type { ReactNode } from "react";

export type HomeFocusCardContent = {
	title: string;
	href: string;
	description: string;
	icon: keyof typeof iconGlyphs;
};
export type HomeIntroductionProps = {
	cards?: readonly HomeFocusCardContent[];
	introduction?: ReactNode;
};
const iconGlyphs = {
	school: "legacy-before:[content:'']",
	health: "legacy-before:[content:'']",
	livelihood: "legacy-before:[content:'']",
	community: "legacy-before:[content:'']",
};
const iconClassName =
	"text-[32px] text-[#000] [-webkit-font-smoothing:antialiased] inline-block not-italic [font-variant:normal] [text-rendering:auto] [line-height:1] [font-family:'Font_Awesome_5_Free'] [font-weight:900]";
const homeFocusCards: readonly HomeFocusCardContent[] = [
	{
		title: "Education",
		href: "https://dfn.org.au/education/",
		icon: "school",
		description:
			"Quality, English-medium, values-based education primarily focusing on children from poor and marginalised communities.",
	},
	{
		title: "Healthcare",
		href: "https://dfn.org.au/give/healthcare/",
		icon: "health",
		description:
			"Community Health Workers, primary clinics and HIV/AIDS centres help prevent sickness and disease – a cause and consequence of poverty and inequality.",
	},
	{
		title: "Economic Empowerment",
		href: "https://dfn.org.au/give/economic-empowerment/",
		icon: "livelihood",
		description:
			"Business start-up grants, self-help groups and vocational training to enable the poor to earn a livelihood, become self-sufficient and hold their heads up high.",
	},
	{
		title: "VULNERABLE COMMUNITIES",
		href: "https://dfn.org.au/anti-human-trafficking/",
		icon: "community",
		description:
			"Prevention and awareness programmes among at-risk women and girls and their local community.",
	},
];
const defaultIntroduction = (
	<>
		Our aim is to see the poor, marginalised and outcastes of society transition
		to living in&nbsp;<b>Dignity</b>&nbsp;and&nbsp;<b>Freedom</b>. Our
		programmes are designed, led and staffed by nationals, with a&nbsp;
		<b>holistic</b>&nbsp;<b>approach focusing on four key areas…</b>
	</>
);
// Preserve the reference wrapper topology until the preview parity phase is complete.
export function HomeIntroduction({
	cards = homeFocusCards,
	introduction = defaultIntroduction,
}: HomeIntroductionProps) {
	return (
		<div
			className={
				"legacy-before:table legacy-after:table legacy-after:clear-both ml-auto mr-auto min-w-[0] legacy-before:[content:'_'] legacy-after:[content:'_']"
			}
		>
			<div
				className={
					"relative flex items-center justify-center legacy-after:block legacy-after:absolute min-h-[0] [-webkit-box-align:center] [-webkit-box-pack:center] [background-image:url('/tailwind-migration/reference/wp-content/uploads/2020/10/BG-Bar-white.jpg')] [background-size:cover] [background-attachment:scroll] [background-position-x:center] [background-position-y:center] [background-repeat:no-repeat] m-[0_20px_20px] p-[60px_20px_20px] legacy-after:[content:''] legacy-after:top-[0] legacy-after:right-[0] legacy-after:bottom-[0] legacy-after:left-[0] legacy-after:z-[0] legacy-after:bg-[rgba(255,_255,_255,_0.58)] legacy-after:rounded-[inherit] legacy-max-768:mb-[0]! legacy-max-768:ml-[0]! legacy-max-768:mr-[0]! legacy-max-768:pl-[0]! legacy-max-768:pr-[0]!"
				}
			>
				<div
					className={
						"relative legacy-before:table legacy-after:table legacy-after:clear-both ml-auto mr-auto min-w-[0] z-[2] max-w-[1100px] flex-auto legacy-before:[content:'_'] legacy-after:[content:'_']"
					}
				>
					<div
						className={
							"legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
						}
					>
						<div
							className={
								"legacy-before:table legacy-after:table legacy-after:clear-both float-left w-full legacy-max-768:clear-both! legacy-max-768:float-none! legacy-max-768:w-auto! min-h-[1px] legacy-before:[content:'_'] legacy-after:[content:'_'] legacy-max-768:ml-auto! legacy-max-768:mr-auto!"
							}
						>
							<div className={"flex flex-col m-[0] p-[0]"}>
								<div
									className={
										"legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
									}
								>
									<div
										className={
											"legacy-before:table legacy-after:table legacy-after:clear-both m-[5px_20px_10px] legacy-before:[content:'_'] legacy-after:[content:'_'] legacy-max-768:mt-[0]!"
										}
									>
										<div
											className={
												"legacy-max-768:text-center! text-[18px] [line-height:1.8] legacy-max-992:text-[16px] legacy-max-992:[line-height:1.5]"
											}
										>
											<p className={"m-[0_0_10px]"}>{introduction}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={
							"legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
						}
					>
						<div
							className={
								"legacy-before:table legacy-after:table legacy-after:clear-both float-left w-full legacy-max-768:clear-both! legacy-max-768:float-none! legacy-max-768:w-auto! min-h-[1px] legacy-before:[content:'_'] legacy-after:[content:'_'] legacy-max-768:ml-auto! legacy-max-768:mr-auto!"
							}
						>
							<div className={"flex flex-col m-[0] p-[0]"}>
								<div
									className={
										"legacy-max-992:text-center legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
									}
								>
									<div
										className={
											"legacy-before:table legacy-after:table legacy-after:clear-both m-[20px] legacy-before:[content:'_'] legacy-after:[content:'_']"
										}
									>
										<div
											className={
												"legacy-before:[content:'_'] legacy-before:table legacy-after:table legacy-after:clear-both legacy-after:[content:'_']"
											}
										>
											{cards.map((card) => (
												<HomeFocusCard key={card.href} card={card} />
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function HomeFocusCard({ card }: { card: HomeFocusCardContent }) {
	return (
		<div
			className="group/card relative flex float-left overflow-hidden text-center m-[0_auto_2%] mr-[2%] w-[23.5%] min-h-[300px] max-h-[300px] [border:1px_solid_rgba(0,0,0,0.22)] [background-clip:border-box] [&:nth-of-type(4n+1)]:clear-left [&:nth-of-type(4n)]:mr-[0] legacy-max-992:w-[49%] legacy-max-992:[&:nth-of-type(4n+1)]:clear-none legacy-max-992:[&:nth-of-type(2n+1)]:clear-left legacy-max-992:[&:nth-of-type(4n)]:mr-[2%] legacy-max-992:[&:nth-of-type(2n)]:mr-[0] legacy-max-768:w-full! legacy-max-768:[&:nth-of-type(n)]:clear-left! legacy-max-768:[&:nth-of-type(n)]:mr-[0]! legacy-before:table legacy-before:[content:''] legacy-before:absolute legacy-before:top-[0] legacy-before:left-[0] legacy-before:w-full legacy-before:h-full legacy-before:opacity-[0] legacy-before:z-[1] legacy-before:[transition:opacity_.35s] legacy-before:[background-image:none] [&:hover::before]:opacity-[1] [&:focus-within::before]:opacity-[1] legacy-after:table legacy-after:[content:'_'] legacy-after:clear-both"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: preserve the reference focus target during presentation migration.
			tabIndex={0}
		>
			<a
				className={
					"w-full relative no-underline [display:inherit] hover:text-[#de6026] hover:underline hover:[outline:0] focus:text-[#de6026] focus:underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0] z-[2] text-[#de6026]"
				}
				href={card.href}
				target="_self"
			>
				<div
					className={
						"flex items-center text-left absolute w-full h-full top-[0] left-[0] min-h-[300px] z-[2] pt-[20px] pr-[10px] pl-[10px] [transition:all_0.3s_ease-in] group-hover/card:bg-[#de6026] group-focus-within/card:bg-[#de6026]"
					}
				>
					<div
						className={"table-cell text-center w-full [vertical-align:middle]"}
					>
						<div>
							<div
								className={
									"[transform:translateY(10px)] group-hover/card:[transform:translateY(0)] group-focus-within/card:[transform:translateY(0)] [transition:transform_0.5s_ease]"
								}
							>
								<span
									className={`${iconClassName} ${iconGlyphs[card.icon]}`}
								></span>
							</div>
							<div
								className={
									"[transform:translateY(10px)] group-hover/card:[transform:translateY(0)] group-focus-within/card:[transform:translateY(0)] [transition:transform_0.5s_ease]"
								}
							>
								<h3
									className={
										"uppercase font-vinyl not-italic text-[22px] [line-height:1.1] [letter-spacing:0] text-[#de6026] group-hover/card:text-white group-focus-within/card:text-white [font-weight:400] m-[0_0_10px] [transition:all_0.3s_ease]"
									}
								>
									{card.title}
								</h3>
							</div>
							<div
								className={
									"invisible opacity-[0] group-hover/card:opacity-[1] group-focus-within/card:opacity-[1] group-hover/card:visible group-focus-within/card:visible group-hover/card:text-white group-focus-within/card:text-white [transform:translateY(10px)] group-hover/card:[transform:translateY(0)] group-focus-within/card:[transform:translateY(0)] [transition:all_0.5s_ease]"
								}
							>
								<div className={"text-[15px] [line-height:1.3]"}>
									<p className={"m-[0]"}>{card.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
}

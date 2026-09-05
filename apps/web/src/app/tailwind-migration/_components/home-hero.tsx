import { createElement, type ReactNode } from "react";

export type HomeHeroSlide = {
	label: string;
	heading: ReactNode;
	ctaLabel: string;
	href: string;
	image: string;
	layout: "standard" | "appeal";
};
export type HomeHeroProps = {
	slides?: readonly [HomeHeroSlide, ...HomeHeroSlide[]];
};
const assetBase = "/tailwind-migration/reference/wp-content/uploads";
const homeHeroSlides: readonly [HomeHeroSlide, ...HomeHeroSlide[]] = [
	{
		label: "General",
		heading:
			"Dignity and Freedom for the poor, the marginalised and the outcastes in South Asia.",
		ctaLabel: "Learn More",
		href: "/tailwind-migration/about",
		image: `${assetBase}/2023/08/DFN-HomepageHeroImages-Motherresized.jpg`,
		layout: "standard",
	},
	{
		label: "EOFY",
		heading: (
			<>
				End of Financial Year Appeal.
				<br className="[transition:none]" />
				Give Life, Freedom and Hope.
			</>
		),
		ctaLabel: "AU EOFY 2026",
		href: "https://dfn.org.au/eofy-au/",
		image: `${assetBase}/2022/04/EOFY22-website.jpg`,
		layout: "appeal",
	},
	{
		label: "Donate",
		heading: (
			<>
				Your donation counts; <br className="[transition:none]" />
				they need your support
			</>
		),
		ctaLabel: "Donate Now",
		href: "https://dfn.org.au/donate/",
		image: `${assetBase}/2023/08/DFN-HomepageHeroImages-Familyresized.jpg`,
		layout: "standard",
	},
];
// Static first-slide presentation. Playback and controls are a separate migration task.

// Preserve the reference wrapper topology until the preview parity phase is complete.
export function HomeHero({ slides = homeHeroSlides }: HomeHeroProps) {
	return (
		<div
			className={
				"legacy-before:table legacy-after:table legacy-after:clear-both ml-auto mr-auto min-w-[0] legacy-before:[content:'_'] legacy-after:[content:'_']"
			}
		>
			<div
				className={
					"relative flex min-h-[0] m-[20px] p-[0] legacy-max-768:[background-attachment:scroll]! legacy-max-768:m-[10px]!"
				}
			>
				<div
					className={
						"w-full legacy-before:table legacy-after:table legacy-after:clear-both ml-auto mr-auto min-w-[0] max-w-full flex-auto legacy-before:[content:'_'] legacy-after:[content:'_']"
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
											"legacy-before:table legacy-after:table legacy-after:clear-both m-[0] legacy-before:[content:'_'] legacy-after:[content:'_']"
										}
									>
										{/* biome-ignore lint/a11y/useSemanticElements: preserve the reference region wrapper for parity. */}
										<div
											className={
												"relative w-full clear-both [--widget-offset:0px] [outline:0]"
											}
											// biome-ignore lint/a11y/noNoninteractiveTabindex: preserve the reference focus target during presentation migration.
											tabIndex={0}
											role="region"
											aria-label="Slider"
										>
											<div className={"relative z-[0] overflow-hidden"}>
												<div>
													<div
														style={{
															backgroundPosition: "0% 0%, 47% 19%",
															backgroundImage: `linear-gradient(rgba(0,0,0,.05), rgba(0,0,0,.05)), url("${slides[0].image}")`,
														}}
														className={
															"relative grid text-left w-full bg-[initial] [background-repeat:repeat,no-repeat] [background-size:auto,cover] min-h-[400px] [grid-template-columns:100%] [grid-template-rows:1fr_auto] [-webkit-font-smoothing:antialiased] text-[16px] [line-height:1] [user-select:none] [--ss-fs:flex-start] [--ss-fe:flex-end] [--ss-r:row] [--ss-rr:row-reverse] z-[3] [-webkit-tap-highlight-color:transparent] overflow-hidden legacy-min-769:min-h-[640px]"
														}
													>
														<div
															className={
																"relative grid [-webkit-tap-highlight-color:initial] [grid-template-columns:100%] [transition:none]"
															}
														>
															<div
																className={
																	"box-content! grid relative legacy-before:box-content! legacy-after:box-content! [-webkit-tap-highlight-color:transparent] text-[inherit] [line-height:inherit] [letter-spacing:inherit] min-h-[400px] [transition:none]"
																}
															>
																<div
																	className={
																		"box-content! grid relative legacy-before:box-content! legacy-after:box-content! min-h-[400px] [-webkit-tap-highlight-color:initial] text-[inherit] [line-height:inherit] [letter-spacing:inherit] [background-clip:padding-box] [background-repeat:repeat] [background-position-x:50%] [background-position-y:50%] [background-size:cover] [background-attachment:scroll] z-[1] [background-image:none] p-[0] rounded-[0] [border:0_solid_#3e3e3e] [transition:none] overflow-hidden legacy-min-769:min-h-[640px]"
																	}
																>
																	<div
																		className={
																			"box-content! grid relative legacy-before:box-content! legacy-after:box-content! min-h-[400px] text-[inherit] [line-height:inherit] [letter-spacing:inherit] [grid-template-areas:'cover'] z-[10] [transition:none] overflow-hidden legacy-min-769:min-h-[640px]"
																		}
																	>
																		<div
																			className={
																				"h-full relative w-full bottom-[0] left-[0] right-[0] top-[0] z-[10] [transition:none] [grid-area:cover]"
																			}
																		>
																			{slides.map((slide, index) => (
																				<HeroBackground
																					key={slide.label}
																					slide={slide}
																					hidden={index !== 0}
																				/>
																			))}
																		</div>
																		<div
																			className={
																				"box-content! relative w-full h-full grid legacy-before:box-content! legacy-after:box-content! min-h-[400px] text-[inherit] [line-height:inherit] [letter-spacing:inherit] [align-self:center] [justify-self:center] z-[20] [grid-template-areas:'slide'] [transition:none] [grid-area:cover] legacy-min-769:min-h-[640px]"
																			}
																		>
																			<svg
																				aria-hidden="true"
																				xmlns="http://www.w3.org/2000/svg"
																				viewBox="0 0 1200 800"
																				className={
																					"box-content! h-auto w-full invisible block legacy-before:box-content! legacy-after:box-content! text-[inherit] [line-height:inherit] [letter-spacing:inherit] max-w-[1200px] max-h-[none] [box-shadow:none] [background-attachment:initial] [background-clip:initial] bg-[initial] [background-image:initial] [background-origin:initial] [background-position-x:0] [background-position-y:0] [background-repeat:initial] [background-size:initial] [vertical-align:top] m-[0] p-[0] rounded-[0] [border:0_none_currentcolor] [transition:none] [grid-area:slide]"
																				}
																			></svg>
																			{slides.map((slide, index) => (
																				<HeroSlide
																					key={slide.label}
																					slide={slide}
																					hidden={index !== 0}
																				/>
																			))}
																		</div>
																	</div>
																</div>
															</div>
															<div
																className={
																	"hidden absolute w-full h-full invisible items-center z-[10] [flex-direction:column-reverse] [flex-wrap:nowrap] [transition:none]"
																}
															>
																<div
																	className={
																		"relative invisible text-center justify-center [backface-visibility:hidden] [perspective:1000px] z-[14] text-[16px] opacity-[1] [box-sizing:initial]! mb-[var(--widget-offset)] [--widget-offset:10px] [transition:none]"
																	}
																>
																	{/* biome-ignore lint/a11y/useSemanticElements: preserve the hidden reference controls wrapper. */}
																	<div
																		className={
																			"box-content! inline-flex visible items-center flex-wrap justify-center legacy-before:box-content! legacy-after:box-content! text-[inherit] [line-height:inherit] [letter-spacing:inherit] [vertical-align:top] [transition:none]"
																		}
																		role="group"
																		aria-label="Choose slide to display."
																	>
																		<div
																			className={
																				"box-content! invisible legacy-before:box-content! legacy-after:box-content! text-[inherit] [line-height:inherit] [letter-spacing:inherit] [cursor:pointer] [background-attachment:initial] [background-clip:initial] bg-[rgba(255,_255,_255,_0)] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] opacity-[0.75] [box-shadow:none] m-[4px] p-[3px] rounded-[50px] [border:2px_solid_rgba(255,_255,_255,_0.5)] [transition:none]"
																			}
																		></div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{createElement("ss3-loader", {
														className:
															"hidden [align-content:center] justify-center absolute [left:0px] [top:0px] w-full h-full [z-index:100000] legacy-after:[content:''] legacy-after:block legacy-after:[border-bottom-color:rgba(0,_0,_0,_0.6)] legacy-after:[border-bottom-style:solid] legacy-after:[border-bottom-width:9px] legacy-after:[border-image-outset:0] legacy-after:[border-image-repeat:stretch] legacy-after:[border-image-slice:100%] legacy-after:[border-image-source:none] legacy-after:[border-image-width:1] legacy-after:[border-left-color:rgba(0,_0,_0,_0.6)] legacy-after:[border-left-style:solid] legacy-after:[border-left-width:9px] legacy-after:[border-right-color:rgba(0,_0,_0,_0.6)] legacy-after:[border-right-style:solid] legacy-after:[border-right-width:9px] legacy-after:[border-top-color:rgb(255,_255,_255)] legacy-after:[border-top-style:solid] legacy-after:[border-top-width:9px] legacy-after:[border-bottom-left-radius:50%] legacy-after:[border-bottom-right-radius:50%] legacy-after:[border-top-left-radius:50%] legacy-after:[border-top-right-radius:50%] legacy-after:[box-shadow:rgba(0,_0,_0,_0.6)_0px_0px_0px_1px_inset,_rgba(0,_0,_0,_0.6)_0px_0px_0px_1px] legacy-after:[width:40px] legacy-after:[height:40px] legacy-after:[animation-delay:0s] legacy-after:[animation-direction:normal] legacy-after:[animation-duration:2s] legacy-after:[animation-fill-mode:none] legacy-after:[animation-iteration-count:infinite] legacy-after:[animation-name:n2-ss-loader-spin] legacy-after:[animation-play-state:running] legacy-after:[animation-timing-function:linear]",
													})}
												</div>
											</div>
											<div className={"clear-both"}></div>
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

type SlideProps = { slide: HomeHeroSlide; hidden: boolean };
function HeroBackground({ slide, hidden }: SlideProps) {
	return (
		<div
			aria-hidden={hidden || undefined}
			className={`h-full absolute w-full box-content! text-left legacy-before:box-content! legacy-after:box-content! bottom-[0] left-[0] right-[0] top-[0] [transform:none] text-[inherit] [line-height:inherit] [letter-spacing:inherit] z-[10] [transition:none] overflow-hidden ${hidden ? "hidden!" : ""}`}
		>
			<div
				className={`h-full absolute w-full box-content! text-left legacy-before:box-content! legacy-after:box-content! bottom-[0] left-[0] right-[0] top-[0] text-[inherit] [line-height:inherit] [letter-spacing:inherit] z-[5]  opacity-[0.95] [transition:none] ${slide.layout === "appeal" ? "[--ss-o-pos-x:51%] [--ss-o-pos-y:53%]" : "[--ss-o-pos-x:47%] [--ss-o-pos-y:19%]"}`}
			>
				<picture
					className={
						"h-full absolute w-full box-content! inline-block text-left legacy-before:box-content! legacy-after:box-content! bottom-[0] left-[0] right-[0] top-[0] text-[inherit] [line-height:inherit] [letter-spacing:inherit] [transition:none]"
					}
				>
					<img
						decoding="async"
						src={slide.image}
						alt=""
						title=""
						loading="lazy"
						className={
							"h-full absolute w-full box-content! text-left legacy-before:box-content! legacy-after:box-content! bottom-[0] left-[0] right-[0] top-[0] text-[inherit] [line-height:inherit] [letter-spacing:inherit] max-w-[none] max-h-[none] [box-shadow:none] [background-attachment:initial] [background-clip:initial] bg-[initial] [background-image:initial] [background-origin:initial] [background-position-x:0] [background-position-y:0] [background-repeat:initial] [background-size:initial] [vertical-align:top] [object-position:var(--ss-o-pos-x)_var(--ss-o-pos-y)] [object-fit:cover] text-[rgba(0,_0,_0,_0)] m-[0] p-[0] rounded-[0] [border:0_none_currentcolor] [transition:none]"
						}
					/>
				</picture>
			</div>
			<div
				className={
					"box-content! absolute w-full h-full text-left legacy-before:box-content! legacy-after:box-content! text-[inherit] [line-height:inherit] [letter-spacing:inherit] top-[0] left-[0] z-[1] bg-[#000000] [transition:none]"
				}
			></div>
		</div>
	);
}
function HeroSlide({ slide, hidden }: SlideProps) {
	return (
		<div
			aria-hidden={hidden || undefined}
			className={`visible box-content! relative text-center grid items-center legacy-before:box-content! legacy-after:box-content! opacity-[1] [transform:none] text-[inherit] [line-height:inherit] [letter-spacing:inherit] [--ssselfalign:center] [justify-items:center] [grid-auto-columns:100%] z-[20] [backface-visibility:hidden] [perspective:1500px] [transition:none] overflow-hidden [grid-area:slide] ${hidden ? "hidden!" : ""} ${slide.layout === "appeal" ? "cursor-pointer! [&_*]:cursor-pointer!" : ""}`}
		>
			<div
				role="note"
				className={
					"absolute w-full h-full left-[0] top-[0] opacity-[0] [filter:opacity(0)] z-[-99999] [transition:none]"
				}
				tabIndex={-1}
			>
				{slide.label}
			</div>
			<div
				className={
					"visible box-content! relative w-full h-full flex flex-col legacy-before:box-content! legacy-after:box-content! min-h-[400px] opacity-[1] [transform:none] text-[inherit] [line-height:inherit] [letter-spacing:inherit] z-[20] max-w-[1200px] [transition:none] legacy-min-769:min-h-[640px]"
				}
			>
				<div
					className={
						"visible w-full relative h-full flex justify-center flex-col legacy-before:box-content! legacy-after:box-content! text-[calc(100%_*_var(--ssfont-scale))] [line-height:inherit] [letter-spacing:inherit] z-[2] [--margin-top:0px] [--margin-right:0px] [--margin-bottom:0px] [--margin-left:0px] [--ssfont-scale:1] min-h-[100%] [flex-wrap:nowrap] [align-self:var(--ssselfalign)] p-[80px] [transition:none] [flex:0_0_auto] hero-mobile:p-[50px_0_10px]"
					}
				>
					<div
						className={
							"box-content! w-full relative flex legacy-before:box-content! legacy-after:box-content! text-[calc(100%_*_var(--ssfont-scale))] [line-height:inherit] [letter-spacing:inherit] z-[2] [--margin-top:0px] [--margin-right:0px] [--margin-bottom:0px] [--margin-left:0px] [--ssfont-scale:1] min-h-[100%] [align-self:var(--ssselfalign)] [transition:none] [flex:0_0_auto]"
						}
					>
						<div
							className={
								"flex flex-col justify-end relative legacy-before:box-content! legacy-after:box-content! text-[inherit] [line-height:inherit] [letter-spacing:inherit] min-h-[100%] max-w-full [--n2bgimage:none] [--n2bggradient:none] [background-image:var(--n2bggradient),_var(--n2bgimage)] [background-size:cover,_cover] [background-repeat:no-repeat,_no-repeat] p-[30px] [transition:none] flex-auto"
							}
						>
							<div
								className={`box-content! relative legacy-before:box-content! legacy-after:box-content! text-[calc(100%_*_var(--ssfont-scale))] [line-height:inherit] [letter-spacing:inherit] z-[2] [--margin-top:0px] [--margin-right:0px] [--margin-bottom:15px] [margin:var(--margin-top)_var(--margin-right)_var(--margin-bottom)_var(--margin-left)] [--margin-left:0px] w-[calc(100%_-_var(--margin-right)_-_var(--margin-left))] [--ssfont-scale:1] min-h-[1px]  [align-self:var(--ss-fs)] [transition:none] hero-tablet:[--ssfont-scale:0.8] hero-mobile:[--ssfont-scale:0.5] ${slide.layout === "appeal" ? "max-w-[565px]" : "max-w-[525px]"}`}
							>
								<div
									className={
										"box-content! not-italic no-underline text-left normal-case block legacy-before:box-content! legacy-after:box-content! [user-select:text] [cursor:initial] text-[231.25%] [line-height:1.2] [letter-spacing:1px] [font-family:Andada] text-[#ffffff] [text-shadow:rgba(0,_0,_0,_0.53)_2px_2px_10px] [font-weight:bold] [word-spacing:normal] [background-attachment:initial] [background-clip:initial] bg-[rgba(255,_255,_255,_0)] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] opacity-[1] [box-shadow:none] p-[0_0_20px] rounded-[0] [border:0_solid_#000000] [transition:none]"
									}
								>
									{slide.heading}
								</div>
							</div>
							<div
								className={
									"box-content! w-auto relative legacy-before:box-content! legacy-after:box-content! text-[calc(100%_*_var(--ssfont-scale))] [line-height:inherit] [letter-spacing:inherit] z-[2] [--margin-top:0px] [--margin-right:0px] [--margin-bottom:0px] [--margin-left:0px] [--ssfont-scale:1] min-h-[1px] max-w-[calc(100%_-_var(--margin-right)_-_var(--margin-left))] [align-self:var(--ss-fs)] [transition:none] hero-tablet:[--ssfont-scale:0.8] hero-mobile:[--ssfont-scale:0.7]"
								}
							>
								<div
									className={
										"box-content! inline-block legacy-before:box-content! legacy-after:box-content! text-[inherit] [line-height:inherit] [letter-spacing:inherit] [text-wrap-mode:nowrap] [white-space-collapse:collapse] [transition:none]"
									}
								>
									<a
										className={
											"box-content! no-underline inline-block not-italic text-center uppercase legacy-before:box-content! legacy-after:box-content! text-[112.5%] [line-height:1.5] [letter-spacing:1px] [hyphens:manual] [box-shadow:none] [font-family:Oswald] text-[#ffffff] [text-shadow:none] [font-weight:bold] [word-spacing:normal] [background-attachment:initial] [background-clip:initial] bg-[#de6026] [background-image:initial] [background-origin:initial] [background-position-x:initial] [background-position-y:initial] [background-repeat:initial] [background-size:initial] opacity-[0.95] [&:hover]:opacity-[1] focus:opacity-[1] active:opacity-[1] focus:[outline:0]! focus:[outline-offset:-2px] p-[10px_30px] rounded-[3px] [border:0_solid_#000000] [transition:none] [outline:0]"
										}
										href={slide.href}
									>
										<div
											className={
												"inline-flex items-center text-[inherit] [text-decoration-line:inherit] [text-decoration-thickness:inherit] [text-decoration-style:inherit] [text-decoration-color:inherit] text-[inherit] [line-height:inherit] [font-family:inherit] [font-weight:inherit] [vertical-align:top] [transition:none]"
											}
										>
											<div
												className={
													"inline text-[inherit] [text-decoration-line:inherit] [text-decoration-thickness:inherit] [text-decoration-style:inherit] [text-decoration-color:inherit] text-[inherit] [line-height:inherit] [font-family:inherit] [font-weight:inherit] [transition:none]"
												}
											>
												{slide.ctaLabel}
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

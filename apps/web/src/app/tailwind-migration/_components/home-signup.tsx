export type HomeSignupProps = {
	title?: string;
	description?: string;
	buttonLabel?: string;
	idPrefix?: string;
};
type SignupFieldContent = {
	name: "name" | "email";
	type: "text" | "email";
	label: string;
	error: string;
};
const signupFields: readonly SignupFieldContent[] = [
	{
		name: "name",
		type: "text",
		label: "Name",
		error: "Please enter your name.",
	},
	{
		name: "email",
		type: "email",
		label: "Email",
		error: "Please enter a valid email address.",
	},
];
const defaultDescription =
	"DFN partners worldwide, funding sustainable projects among vulnerable communities and does not discriminate on the basis of caste, ethnicity, nationality and religious identity. DFN is committed to seeing the marginalised freed from a life of poverty, exploitation and slavery; through education, healthcare, and economic development.";
// This is the frozen signup presentation; no submission or validation runtime is connected.
// Preserve the reference wrapper topology until the preview parity phase is complete.
export function HomeSignup({
	title = "RECEIVE UPDATES FROM DFN",
	description = defaultDescription,
	buttonLabel = "Sign Up",
	idPrefix = "home-signup",
}: HomeSignupProps) {
	return (
		<div
			className={
				"legacy-before:table legacy-after:table legacy-after:clear-both ml-auto mr-auto min-w-[0] legacy-before:[content:'_'] legacy-after:[content:'_']"
			}
		>
			<div
				className={
					"relative flex items-center justify-center min-h-[0] [-webkit-box-align:center] [-webkit-box-pack:center] bg-[#efefef] m-[10px_20px] p-[0] legacy-max-768:[background-attachment:scroll]! legacy-max-768:ml-[10px]! legacy-max-768:mr-[10px]! legacy-max-768:pb-[20px]! legacy-max-768:pt-[20px]!"
				}
			>
				<div
					className={
						"w-full legacy-before:table legacy-after:table legacy-after:clear-both ml-auto mr-auto min-w-[0] max-w-full flex-auto legacy-before:[content:'_'] legacy-after:[content:'_']"
					}
				>
					<div
						className={
							"legacy-before:table legacy-after:table legacy-after:clear-both flex flex-wrap w-full legacy-before:[content:none] legacy-after:[content:none]"
						}
					>
						<div
							className={
								"legacy-before:table legacy-after:table legacy-after:clear-both flex float-left legacy-max-768:clear-none! legacy-max-768:w-full! min-h-[1px] w-1/2 flex-auto legacy-before:[content:none] legacy-after:[content:none] legacy-max-768:ml-auto! legacy-max-768:mr-auto! legacy-max-768:max-w-[none]!"
							}
						>
							<div
								className={
									"flex flex-col w-full justify-center min-w-[1px] max-w-full m-[0] p-[8%] flex-auto legacy-before:[content:none] legacy-after:[content:none] legacy-max-768:pl-[0]! legacy-max-768:pr-[0]!"
								}
							>
								<div
									className={
										"legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
									}
								>
									<div
										className={
											"legacy-before:table legacy-after:table legacy-after:clear-both m-[20px_20px_5px] legacy-before:[content:'_'] legacy-after:[content:'_']"
										}
									>
										<h2
											className={
												"text-left font-vinyl uppercase not-italic text-[32px] [line-height:1.2] [font-weight:400] [letter-spacing:1px] text-[#333333] m-[0] p-[0] legacy-tablet:text-[30px] legacy-tablet:[letter-spacing:0] legacy-max-992:text-[24px]"
											}
										>
											<span>{title}</span>
										</h2>
									</div>
								</div>
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
										<div className={"text-[16px] [line-height:1.5]"}>
											<p className={"m-[0_0_10px]"}>
												<span>{description}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							className={
								"legacy-before:table legacy-after:table legacy-after:clear-both flex float-left legacy-max-768:clear-none! legacy-max-768:w-full! min-h-[1px] w-1/2 flex-auto legacy-before:[content:none] legacy-after:[content:none] legacy-max-768:ml-auto! legacy-max-768:mr-auto! legacy-max-768:max-w-[none]!"
							}
						>
							<div
								className={
									"flex flex-col w-full justify-center min-w-[1px] max-w-full m-[0] p-[0] flex-auto legacy-before:[content:none] legacy-after:[content:none]"
								}
							>
								<div
									className={
										"legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
									}
								>
									<div
										className={
											"legacy-before:table legacy-after:table legacy-after:clear-both m-[20px] legacy-before:[content:'_'] legacy-after:[content:'_']"
										}
									>
										{/* biome-ignore lint/a11y/useSemanticElements: preserve the reference form wrapper; submission is not implemented in this preview. */}
										<div
											role="form"
											className={
												"legacy-before:table legacy-after:table legacy-after:clear-both legacy-before:[content:'_'] legacy-after:[content:'_']"
											}
										>
											{signupFields.map((field) => (
												<SignupField
													key={field.name}
													field={field}
													idPrefix={idPrefix}
												/>
											))}
											<div>
												<div className={"text-left"}>
													{/* biome-ignore lint/a11y/useSemanticElements: retain the reference anchor tag for presentation parity. */}
													{/* biome-ignore lint/a11y/useValidAnchor: submission remains a separate implementation task. */}
													<a
														role="button"
														tabIndex={0}
														className={
															"hover:bg-[#b24d1e] hover:text-white hover:no-underline hover:[outline:0] focus:border-[#cc4405] hover:border-[#cc4405] focus:no-underline focus:[outline:5px_auto_-webkit-focus-ring-color] focus:[outline-offset:-2px] active:[outline:0] active:relative active:top-px block no-underline w-full text-center font-vinyl uppercase text-[18px] [font-weight:100] [line-height:1.2] [text-shadow:none] [cursor:pointer] bg-[#de6026] [letter-spacing:0.5px] text-[#ffffff] p-[12px_24px] rounded-[3px] [border:1px_solid_#d2541a] [transition:none]"
														}
													>
														<span
															className={"text-[#ffffff] [transition:none]"}
														>
															{buttonLabel}
														</span>
													</a>
												</div>
											</div>
											<div className={"hidden"} role="alert">
												<p className={"m-[0_0_10px]"}>
													Thanks for signing up to receive updates!
												</p>
											</div>
											<div
												className={
													"clear-both hidden text-[#dd6420] pt-[8px] text-[12px] [font-weight:lighter]"
												}
												role="alert"
											>
												Something went wrong. Please check your entries and try
												again.
											</div>
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

function SignupField({
	field,
	idPrefix,
}: {
	field: SignupFieldContent;
	idPrefix: string;
}) {
	return (
		<div className={"mb-[15px]"}>
			<label
				htmlFor={`${idPrefix}-${field.name}`}
				className={
					"absolute hidden [clip:rect(0,_0,_0,_0)] h-[1px] w-[1px] max-w-full [font-weight:700] m-[-1px] p-[0] [border:0_none_currentcolor] overflow-hidden"
				}
			>
				{field.label}
			</label>
			<input
				type={field.type}
				id={`${idPrefix}-${field.name}`}
				placeholder={field.label}
				aria-label={field.label}
				aria-describedby={`${idPrefix}-${field.name}-error`}
				name={`${idPrefix}-${field.name}`}
				className={
					"h-auto w-full font-vinyl uppercase block text-[18px] [line-height:1] [font-weight:100] [letter-spacing:0.5px] bg-[#fcfcfc] [background-image:none] text-[#303030] [box-shadow:none] m-[0] p-[12px_24px] rounded-[4px] [border:1px_solid_#e6e6e6] [transition:all_0.15s_ease-in-out] placeholder:text-[rgba(48,_48,_48,_0.4)] focus:bg-[#fcfcfc] focus:border-[#ccc] focus:[outline:0] focus:[box-shadow:none]"
				}
				required
			/>
			<div
				id={`${idPrefix}-${field.name}-error`}
				className={
					"clear-both hidden text-[#dd6420] pt-[8px] text-[12px] [font-weight:lighter]"
				}
				role="alert"
			>
				{field.error}
			</div>
		</div>
	);
}

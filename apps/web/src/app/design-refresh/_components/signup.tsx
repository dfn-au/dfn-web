"use client";

import { useState } from "react";
import type { HomepageContent } from "@/components/homepage/content";
import { NavigationLink } from "./preview-link";
import { Arrow, buttonClasses, Eyebrow, Headline } from "./primitives";

export function Signup({
	content,
	placeholderLinks = false,
}: {
	content: HomepageContent["signup"];
	placeholderLinks?: boolean;
}) {
	const [submitted, setSubmitted] = useState(false);
	return (
		<section
			id="dh-signup"
			className="grid gap-7 px-stack py-12 @desktop:grid-cols-[1fr_1.1fr] @desktop:gap-[58px] @desktop:px-content @desktop:py-section"
		>
			<div>
				<Eyebrow className="mb-[15px] text-accent">{content.eyebrow}</Eyebrow>
				<h2 className="mb-4 font-display text-[33px] leading-[1.15] font-normal tracking-[-.6px] @tablet:text-[36px]">
					<Headline text={content.headline} />
				</h2>
				<p className="max-w-[350px] text-copy leading-[1.65] text-muted">
					{content.description}
				</p>
			</div>
			<form
				className="grid content-start gap-[15px] @desktop:grid-cols-2"
				onSubmit={(event) => {
					event.preventDefault();
					event.currentTarget.reset();
					setSubmitted(true);
				}}
			>
				{[
					{ name: "name", label: "Name", type: "text" },
					{ name: "email", label: "Email address", type: "email" },
				].map((field) => (
					<label
						key={field.name}
						className="grid gap-[7px] text-sm leading-normal font-medium"
					>
						{field.label}
						<input
							name={field.name}
							type={field.type}
							autoComplete="off"
							required
							className="min-h-12 min-w-0 border border-[#94887b] bg-paper px-3 py-[13px] text-base font-normal text-ink [line-height:normal]"
						/>
					</label>
				))}
				<div className="col-span-full flex flex-wrap items-center justify-between gap-5">
					<button
						type="submit"
						className={`${buttonClasses} bg-action text-white`}
					>
						{content.actionLabel}
						<Arrow />
					</button>
					<NavigationLink
						placeholderLinks={placeholderLinks}
						href={
							placeholderLinks
								? "/privacy"
								: "https://dfn.org.au/privacy-policy/"
						}
						className="inline-flex min-h-11 items-center text-sm leading-normal text-muted underline"
					>
						Privacy policy
					</NavigationLink>
				</div>
				<p className="col-span-full text-[13px] leading-[1.6] text-muted">
					Design preview only. Details are not sent or saved.
				</p>
				{submitted && (
					<p
						role="status"
						aria-live="polite"
						className="col-span-full text-label leading-[1.6] font-medium"
					>
						Sign-up preview complete. No subscription was created and no details
						were sent.
					</p>
				)}
			</form>
		</section>
	);
}

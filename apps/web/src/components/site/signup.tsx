"use client";

import { type FormEvent, useCallback, useRef, useState } from "react";
import type { HomepageContent } from "@/components/homepage/content";
import { NavigationLink } from "./navigation-link";
import { Arrow, buttonClasses, Eyebrow, Headline } from "./primitives";
import { SignupVerification } from "./signup-verification";

export function Signup({
	content,
}: {
	content: NonNullable<HomepageContent["signup"]>;
}) {
	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
	const form = useRef<HTMLFormElement>(null);
	const pending = useRef<{ name: string; email: string } | null>(null);
	const sending = useRef(false);
	const [status, setStatus] = useState<
		"idle" | "verifying" | "sending" | "success" | "error"
	>("idle");
	const [error, setError] = useState("");
	const busy = status === "verifying" || status === "sending";

	const verificationFailed = useCallback(() => {
		if (sending.current) return;
		pending.current = null;
		setError(
			"We couldn't verify your submission. Please try again. If this continues, refresh the page.",
		);
		setStatus("error");
	}, []);

	const submitVerified = useCallback(async (token: string) => {
		if (!pending.current || sending.current) return;
		sending.current = true;
		setStatus("sending");
		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...pending.current, token }),
				signal: AbortSignal.timeout(15_000),
			});
			const result = await response.json();
			if (!response.ok || result.success !== true) {
				setError(
					typeof result.error === "string"
						? result.error
						: "We couldn't send your details. Please try again.",
				);
				setStatus("error");
				return;
			}
			form.current?.reset();
			setStatus("success");
		} catch {
			setError("We couldn't confirm your submission. Please try again.");
			setStatus("error");
		} finally {
			pending.current = null;
			sending.current = false;
		}
	}, []);

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (pending.current || sending.current) return;
		if (!siteKey) {
			setError("Sign-up is temporarily unavailable. Please try again later.");
			setStatus("error");
			return;
		}
		const data = new FormData(event.currentTarget);
		pending.current = {
			name: String(data.get("name") ?? ""),
			email: String(data.get("email") ?? ""),
		};
		setError("");
		setStatus("verifying");
	}
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
				ref={form}
				className="grid content-start gap-[15px]"
				onSubmit={submit}
				aria-describedby="signup-status"
			>
				<fieldset
					disabled={busy}
					aria-label="Newsletter signup"
					className="grid min-w-0 gap-[15px] @desktop:grid-cols-2"
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
								autoComplete={field.name}
								maxLength={field.name === "name" ? 200 : 254}
								required
								className="min-h-12 min-w-0 border border-[#94887b] bg-paper px-3 py-[13px] text-base font-normal text-ink [line-height:normal] disabled:cursor-wait disabled:opacity-70"
							/>
						</label>
					))}
					<div className="col-span-full flex flex-wrap items-center justify-between gap-5">
						<button
							type="submit"
							className={`${buttonClasses} bg-action text-white disabled:cursor-wait disabled:opacity-70`}
						>
							{busy ? "Submitting…" : content.actionLabel}
							<Arrow />
						</button>
						<NavigationLink
							href="/privacy"
							className="inline-flex min-h-11 items-center text-sm leading-normal text-muted underline"
						>
							Privacy policy
						</NavigationLink>
					</div>
				</fieldset>
				{busy && siteKey && (
					<SignupVerification
						siteKey={siteKey}
						onVerified={submitVerified}
						onError={verificationFailed}
					/>
				)}
				<p
					id="signup-status"
					role="status"
					aria-live="polite"
					className="col-span-full text-label leading-[1.6] font-medium"
				>
					{status === "success" && "Thanks — your details have been received."}
					{status === "error" && error}
					{busy && "Submitting your details…"}
				</p>
			</form>
		</section>
	);
}

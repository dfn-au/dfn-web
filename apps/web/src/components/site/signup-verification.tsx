"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Turnstile = {
	render: (
		container: HTMLElement,
		options: {
			sitekey: string;
			action: string;
			appearance: "interaction-only";
			size: "flexible";
			retry: "never";
			callback: (token: string) => void;
			"error-callback": () => void;
			"expired-callback": () => void;
			"timeout-callback": () => void;
			"unsupported-callback": () => void;
			"before-interactive-callback": () => void;
			"after-interactive-callback": () => void;
		},
	) => string;
	remove: (widgetId: string) => void;
};

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

// Mounted for each submission, so retries always obtain a fresh, single-use token.
export function SignupVerification({
	siteKey,
	onVerified,
	onError,
}: {
	siteKey: string;
	onVerified: (token: string) => void;
	onError: () => void;
}) {
	const container = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!ready) {
			const timeout = window.setTimeout(onError, 15_000);
			return () => window.clearTimeout(timeout);
		}
		const turnstile = window.turnstile;
		if (!container.current || !turnstile) {
			onError();
			return;
		}
		let disposed = false;
		let completed = false;
		const fail = () => {
			if (!disposed && !completed) onError();
		};
		let processingTimeout = window.setTimeout(fail, 30_000);
		let widgetId: string;
		try {
			widgetId = turnstile.render(container.current, {
				sitekey: siteKey,
				action: "newsletter_signup",
				appearance: "interaction-only",
				size: "flexible",
				retry: "never",
				callback: (token) => {
					if (disposed || completed) return;
					completed = true;
					window.clearTimeout(processingTimeout);
					onVerified(token);
				},
				"error-callback": fail,
				"expired-callback": fail,
				"timeout-callback": fail,
				"unsupported-callback": fail,
				"before-interactive-callback": () =>
					window.clearTimeout(processingTimeout),
				"after-interactive-callback": () => {
					window.clearTimeout(processingTimeout);
					if (!completed) processingTimeout = window.setTimeout(fail, 30_000);
				},
			});
		} catch {
			window.clearTimeout(processingTimeout);
			fail();
			return;
		}
		return () => {
			disposed = true;
			window.clearTimeout(processingTimeout);
			turnstile.remove(widgetId);
		};
	}, [ready, siteKey, onVerified, onError]);

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
				onReady={() => setReady(true)}
				onError={onError}
			/>
			<div ref={container} className="col-span-full" />
		</>
	);
}

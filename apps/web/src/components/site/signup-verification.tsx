"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";

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
	const completed = useRef(false);
	const [phase, setPhase] = useState<
		"loading" | "verifying" | "interactive" | "complete"
	>("loading");

	// Bound silent script/challenge stalls; interactive challenges have their own timeout.
	useEffect(() => {
		if (phase === "interactive" || phase === "complete") return;
		const timeout = window.setTimeout(
			onError,
			phase === "loading" ? 15_000 : 30_000,
		);
		return () => window.clearTimeout(timeout);
	}, [phase, onError]);

	function fail() {
		if (!completed.current) onError();
	}

	return (
		<Turnstile
			siteKey={siteKey}
			className="col-span-full"
			options={{
				action: "newsletter_signup",
				appearance: "interaction-only",
				size: "flexible",
				retry: "never",
			}}
			scriptOptions={{ onError: fail }}
			onWidgetLoad={() => setPhase("verifying")}
			onBeforeInteractive={() => setPhase("interactive")}
			onAfterInteractive={() => {
				if (!completed.current) setPhase("verifying");
			}}
			onSuccess={(token) => {
				if (completed.current) return;
				completed.current = true;
				setPhase("complete");
				onVerified(token);
			}}
			onError={fail}
			onExpire={fail}
			onTimeout={fail}
			onUnsupported={fail}
		/>
	);
}

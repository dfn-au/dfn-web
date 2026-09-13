"use client";

import { Button, Text } from "@sanity/ui";
import { type ComponentType, useEffect, useRef, useState } from "react";
import {
	InvalidSanityCallback,
	protectSanityHashNavigation,
	validateSanityCallback,
} from "@/lib/sanity-login-transaction";
import { AdminLoading, AdminStatus } from "./admin-ui";

let navigationProtected = false;

export async function loadSanityComponent<Props>(
	load: () => Promise<{ default: ComponentType<Props> }>,
) {
	try {
		// Sanity consumes #sid at module evaluation, before any provider renders.
		// Keep this check ahead of the dynamic import, not just around StudioProvider.
		validateSanityCallback();
		if (!navigationProtected) {
			protectSanityHashNavigation();
			navigationProtected = true;
		}
		return await load();
	} catch (error) {
		const message =
			error instanceof InvalidSanityCallback
				? error.message
				: "We couldn’t load this page. Please try again.";
		return {
			default: function SanityLoadError() {
				return (
					<AdminStatus title="Please try again">
						<Text role="alert">{message}</Text>
						<Button
							text="Try again"
							tone="primary"
							onClick={() => window.location.reload()}
						/>
					</AdminStatus>
				);
			},
		};
	}
}

// Keep imports inside an effect: Studio's manual client loader fixed development
// loading in 2a805c4. Both entry points deliberately use that same boundary.
export function SanityLoader<Props extends object>({
	load,
	componentProps,
	loadingText,
}: {
	load: () => Promise<{ default: ComponentType<Props> }>;
	componentProps: Props;
	loadingText: string;
}) {
	const pending = useRef<Promise<{ default: ComponentType<Props> }> | null>(
		null,
	);
	const [Loaded, setLoaded] = useState<ComponentType<Props>>();
	useEffect(() => {
		let mounted = true;
		// StrictMode replays effects; consume the login transaction only once.
		pending.current ??= loadSanityComponent(load);
		void pending.current.then((module) => {
			if (mounted) setLoaded(() => module.default);
		});
		return () => {
			mounted = false;
		};
	}, [load]);
	return Loaded ? (
		<Loaded {...componentProps} />
	) : (
		<AdminLoading text={loadingText} />
	);
}

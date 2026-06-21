"use client";

import { useEffect, useState } from "react";

type StudioState = {
	Component: typeof import("next-sanity/studio/client-component").NextStudio;
	Layout: typeof import("sanity").StudioLayout;
	Provider: typeof import("sanity").StudioProvider;
	config: typeof import("../../../../../../sanity.config").default;
};

export function AdminStudioLoader() {
	const [studio, setStudio] = useState<StudioState | null>(null);
	const [loadError, setLoadError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		Promise.all([
			import("next-sanity/studio/client-component"),
			import("sanity"),
			import("../../../../../../sanity.config"),
		])
			.then(([studioModule, sanityModule, configModule]) => {
				if (!isMounted) {
					return;
				}

				setStudio({
					Component: studioModule.NextStudio,
					Layout: sanityModule.StudioLayout,
					Provider: sanityModule.StudioProvider,
					config: configModule.default,
				});
			})
			.catch((error: unknown) => {
				if (!isMounted) {
					return;
				}

				setLoadError(
					error instanceof Error
						? error
						: new Error("The Studio failed to load."),
				);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	if (!studio) {
		if (loadError) {
			return (
				<div className="flex h-dvh items-center justify-center bg-background p-6 text-center text-foreground">
					{loadError.message}
				</div>
			);
		}

		return (
			<div className="flex h-dvh items-center justify-center bg-background text-foreground">
				Loading Studio...
			</div>
		);
	}

	const { Component, Layout, Provider, config } = studio;

	return (
		<Component config={config}>
			<Provider config={config}>
				<div className="flex h-dvh flex-col bg-background text-foreground">
					<header className="z-10 flex h-12 shrink-0 items-center justify-between border-border border-b bg-background px-4 text-sm">
						<a
							href="/admin"
							className="font-semibold text-foreground transition hover:text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
						>
							DFN admin
						</a>
						<span className="text-muted">Content Studio</span>
						<a
							href="/admin"
							className="font-medium text-foreground transition hover:text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
						>
							Back to admin
						</a>
					</header>

					<div className="min-h-0 flex-1">
						<Layout />
					</div>
				</div>
			</Provider>
		</Component>
	);
}

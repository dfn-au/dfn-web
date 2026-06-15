"use client";

import { useEffect, useState } from "react";

type StudioState = {
	Component: typeof import("next-sanity/studio/client-component").NextStudio;
	config: typeof import("../../../../../../sanity.config").default;
};

export function AdminStudioLoader() {
	const [studio, setStudio] = useState<StudioState | null>(null);
	const [loadError, setLoadError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		Promise.all([
			import("next-sanity/studio/client-component"),
			import("../../../../../../sanity.config"),
		])
			.then(([studioModule, configModule]) => {
				if (!isMounted) {
					return;
				}

				setStudio({
					Component: studioModule.NextStudio,
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

	const { Component, config } = studio;

	return <Component config={config} />;
}

"use client";

import { Box, Flex, Text } from "@sanity/ui";
import { useEffect, useState } from "react";
import { AdminLoading, AdminStatus, AdminToolbar } from "@/components/admin-ui";

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
		if (loadError)
			return (
				<AdminStatus title="Studio couldn’t load">
					<Text role="alert">{loadError.message}</Text>
				</AdminStatus>
			);
		return <AdminLoading text="Loading Studio…" />;
	}

	const { Component, Layout, Provider, config } = studio;
	return (
		<Component config={config}>
			<Provider config={config} scheme="dark">
				<Flex direction="column" style={{ height: "100dvh" }}>
					<Box flex="none">
						<AdminToolbar studio />
					</Box>
					<Box flex={1} style={{ minHeight: 0 }}>
						<Layout />
					</Box>
				</Flex>
			</Provider>
		</Component>
	);
}

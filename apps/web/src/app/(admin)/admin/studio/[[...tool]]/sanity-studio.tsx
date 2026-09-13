"use client";

import { Box, Flex } from "@sanity/ui";
import { NextStudio } from "next-sanity/studio/client-component";
import { defineConfig, StudioLayout, StudioProvider } from "sanity";
import { AdminToolbar } from "@/components/admin-ui";
import { createBoundSanityAuth } from "@/lib/sanity-auth";
import studioConfig from "../../../../../../sanity.config";

const config = defineConfig({ ...studioConfig, auth: createBoundSanityAuth() });

export default function AdminStudio() {
	return (
		<NextStudio config={config}>
			<StudioProvider config={config} scheme="dark">
				<Flex direction="column" style={{ height: "100dvh" }}>
					<Box flex="none">
						<AdminToolbar studio />
					</Box>
					<Box flex={1} style={{ minHeight: 0 }}>
						<StudioLayout />
					</Box>
				</Flex>
			</StudioProvider>
		</NextStudio>
	);
}

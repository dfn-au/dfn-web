import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { SanityLive } from "@/sanity/lib/live";
import "../globals.css";

export const metadata: Metadata = {
	title: "DFN",
	description: "DFN website rebuild",
};

export default async function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled: isDraftMode } = await draftMode();

	return (
		<html lang="en" className="h-full antialiased">
			<body className="flex min-h-full flex-col bg-background text-foreground">
				{children}
				<SanityLive includeDrafts={isDraftMode} />
				{isDraftMode ? <VisualEditing /> : null}
			</body>
		</html>
	);
}

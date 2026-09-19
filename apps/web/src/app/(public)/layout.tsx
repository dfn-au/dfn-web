import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/components/site/theme.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
	title: "Dignity Freedom Network",
};

export default async function PublicLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { isEnabled } = await draftMode();
	return (
		<html lang="en-AU" className="[color-scheme:dark]">
			<head>
				<link
					rel="icon"
					href="/favicon-192x192.png"
					type="image/png"
					sizes="192x192"
				/>
				<link
					rel="apple-touch-icon"
					href="/apple-touch-icon.png"
					sizes="180x180"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Oswald:wght@400;500&display=swap"
				/>
			</head>
			<body className="m-0 bg-[#1b1a19]">
				{children}
				<SanityLive includeDrafts={isEnabled} />
				{isEnabled && <VisualEditing />}
			</body>
		</html>
	);
}

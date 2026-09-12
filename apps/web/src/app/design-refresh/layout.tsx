import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./theme.css";

export const metadata: Metadata = {
	title: "DFN — refreshed homepage in Tailwind",
	robots: { index: false, follow: false },
};

export default function DesignRefreshLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en-AU" className="[color-scheme:dark]">
			<head>
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
			<body className="m-0 bg-[#1b1a19]">{children}</body>
		</html>
	);
}

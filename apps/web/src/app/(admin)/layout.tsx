import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminTheme } from "@/components/admin-theme";
import { appearanceScript, appearanceStyles } from "@/lib/admin-appearance";
import "./admin.css";

export const metadata: Metadata = {
	title: "DFN",
	description: "DFN website rebuild",
	robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<style>{appearanceStyles}</style>
				{/* Static theme bootstrap changes only the root appearance attribute. */}
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: fixed application script with no user input. */}
				<script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
			</head>
			<body>
				<noscript>JavaScript is required to use the admin tools.</noscript>
				<AdminTheme>{children}</AdminTheme>
			</body>
		</html>
	);
}

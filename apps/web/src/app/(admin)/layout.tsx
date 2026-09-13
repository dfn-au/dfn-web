import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminTheme } from "@/components/admin-theme";
import { appearanceStyles } from "@/lib/admin-appearance";
import "./admin.css";

export const metadata: Metadata = {
	title: "DFN",
	description: "DFN website rebuild",
	robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<style>{appearanceStyles}</style>
			</head>
			<body>
				<noscript>JavaScript is required to use the admin tools.</noscript>
				<AdminTheme>{children}</AdminTheme>
			</body>
		</html>
	);
}

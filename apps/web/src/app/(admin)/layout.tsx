import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminTheme } from "@/components/admin-theme";
import "./admin.css";

export const metadata: Metadata = {
	title: "DFN",
	description: "DFN website rebuild",
	robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<AdminTheme>{children}</AdminTheme>
			</body>
		</html>
	);
}

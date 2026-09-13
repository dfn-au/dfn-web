import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../globals.css";

export const metadata: Metadata = {
	title: "DFN",
	description: "DFN website rebuild",
	robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="flex min-h-full flex-col bg-background text-foreground">
				{children}
			</body>
		</html>
	);
}

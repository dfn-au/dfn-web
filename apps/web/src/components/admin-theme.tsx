"use client";

import { Card, ThemeProvider } from "@sanity/ui";
import type { ReactNode } from "react";
import { adminTheme } from "@/lib/admin-appearance";

export function AdminTheme({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={adminTheme} scheme="dark">
			<Card style={{ minHeight: "100dvh" }}>{children}</Card>
		</ThemeProvider>
	);
}

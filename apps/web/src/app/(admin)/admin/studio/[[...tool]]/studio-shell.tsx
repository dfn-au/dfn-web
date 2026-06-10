"use client";

import { NextStudio } from "next-sanity/studio";
import { StudioLayout, StudioProvider } from "sanity";
import config from "../../../../../../sanity.config";

export function AdminStudioShell() {
	return (
		<NextStudio config={config}>
			<StudioProvider config={config}>
				<div className="flex h-dvh flex-col bg-background text-foreground">
					<header className="z-10 flex h-12 shrink-0 items-center justify-between border-border border-b bg-background px-4 text-sm">
						<a
							href="/admin"
							className="font-semibold text-foreground transition hover:text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
						>
							DFN admin
						</a>
						<span className="text-muted">Content Studio</span>
						<a
							href="/admin"
							className="font-medium text-foreground transition hover:text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
						>
							Back to admin
						</a>
					</header>

					<div className="min-h-0 flex-1">
						<StudioLayout />
					</div>
				</div>
			</StudioProvider>
		</NextStudio>
	);
}

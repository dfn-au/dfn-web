"use client";

import { SanityLoader } from "@/components/sanity-loader";

const loadStudio = () => import("./sanity-studio");

export function AdminStudioLoader() {
	return (
		<SanityLoader
			load={loadStudio}
			componentProps={{}}
			loadingText="Loading Studio…"
		/>
	);
}

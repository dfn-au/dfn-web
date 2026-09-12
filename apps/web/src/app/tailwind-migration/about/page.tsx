import type { Metadata } from "next";

import { AboutTailwindReference } from "../_generated/about-reference";

export const metadata: Metadata = {
	title: "About Tailwind migration preview",
};

export default function TailwindMigrationAboutPage() {
	return <AboutTailwindReference />;
}

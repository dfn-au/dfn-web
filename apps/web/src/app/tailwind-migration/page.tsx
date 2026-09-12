import type { Metadata } from "next";

import { HomeTailwindReference } from "./_generated/home-reference";

export const metadata: Metadata = {
	title: "Home Tailwind migration preview",
};

export default function TailwindMigrationHomePage() {
	return <HomeTailwindReference />;
}

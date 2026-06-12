import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { SanityLive } from "@/sanity/lib/live";

export default async function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled: isDraftMode } = await draftMode();

	return (
		<>
			{children}
			<SanityLive includeDrafts={isDraftMode} />
			{isDraftMode ? <VisualEditing /> : null}
		</>
	);
}

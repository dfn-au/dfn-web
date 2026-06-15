/**
 * This route mounts the Sanity Studio inside the admin surface.
 * All routes under `/admin/studio` are handled by this catch-all route.
 */

import type { Metadata, Viewport } from "next";
import { AdminStudioLoader } from "./studio-loader";

export const dynamic = "force-static";

export const metadata: Metadata = {
	referrer: "same-origin",
	robots: "noindex",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function StudioPage() {
	return <AdminStudioLoader />;
}

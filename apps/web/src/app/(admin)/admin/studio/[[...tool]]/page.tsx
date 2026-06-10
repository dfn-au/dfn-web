/**
 * This route mounts the Sanity Studio inside the admin surface.
 * All routes under `/admin/studio` are handled by this catch-all route.
 */

import { AdminStudioShell } from "./studio-shell";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
	return <AdminStudioShell />;
}

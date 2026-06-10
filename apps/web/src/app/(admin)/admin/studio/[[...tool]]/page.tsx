/**
 * This route mounts the Sanity Studio inside the admin surface.
 * All routes under `/admin/studio` are handled by this catch-all route.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
	return <NextStudio config={config} />;
}

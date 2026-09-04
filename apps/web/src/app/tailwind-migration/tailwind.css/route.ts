import { serveOverlayStylesheet } from "../_lib/reference-files";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
	return serveOverlayStylesheet();
}

export async function HEAD() {
	return serveOverlayStylesheet({ head: true });
}

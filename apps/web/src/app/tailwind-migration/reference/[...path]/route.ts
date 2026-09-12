import { serveReferenceAsset } from "../../_lib/reference-files";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ReferenceRouteContext = {
	params: Promise<{
		path: string[];
	}>;
};

export async function GET(_request: Request, context: ReferenceRouteContext) {
	const { path } = await context.params;
	return serveReferenceAsset(path);
}

export async function HEAD(_request: Request, context: ReferenceRouteContext) {
	const { path } = await context.params;
	return serveReferenceAsset(path, { head: true });
}

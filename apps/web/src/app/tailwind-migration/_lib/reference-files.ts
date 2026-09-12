import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { getLegacyReferenceConfig } from "@/lib/legacy-reference-config.mjs";

type RouteOptions = {
	head?: boolean;
};

const overlayStylesheetPath = path.join(
	process.cwd(),
	"../../docs/references/tailwind-migration/site/tailwind.css",
);
const assetBasePath = "/tailwind-migration/reference";

const contentTypes = new Map([
	[".css", "text/css; charset=utf-8"],
	[".eot", "application/vnd.ms-fontobject"],
	[".jpg", "image/jpeg"],
	[".jpeg", "image/jpeg"],
	[".otf", "font/otf"],
	[".png", "image/png"],
	[".svg", "image/svg+xml"],
	[".ttf", "font/ttf"],
	[".woff", "font/woff"],
	[".woff2", "font/woff2"],
]);

export async function serveReferenceAsset(
	referencePath: string[],
	options: RouteOptions = {},
) {
	let referenceRoot: string;
	try {
		({ referenceRoot } = getLegacyReferenceConfig());
	} catch {
		return new Response(
			"Legacy reference unavailable. Configure DFN_LEGACY_REFERENCE_REPO; see docs/references/legacy-reference.md.",
			{ status: 503 },
		);
	}
	const filePath = resolveReferencePath(
		referenceRoot,
		referencePath.map(decodePathSegment),
	);

	if (!filePath) return new Response("Forbidden", { status: 403 });

	try {
		// External reference files are runtime-only and must never enter build traces.
		const fileStats = await stat(/* turbopackIgnore: true */ filePath);

		if (!fileStats.isFile()) {
			return new Response("Not found", { status: 404 });
		}

		const headers = {
			"Cache-Control": "no-store",
			"Content-Length": String(fileStats.size),
			"Content-Type": getContentType(filePath),
		};

		if (options.head) return new Response(null, { headers });

		return new Response(await readFile(/* turbopackIgnore: true */ filePath), {
			headers,
		});
	} catch (error) {
		return fileErrorResponse(error);
	}
}

export async function serveOverlayStylesheet(options: RouteOptions = {}) {
	const headers = {
		"Cache-Control": "no-store",
		"Content-Type": "text/css; charset=utf-8",
	};

	if (options.head) return new Response(null, { headers });

	try {
		const stylesheet = await readFile(overlayStylesheetPath, "utf8");
		const rewrittenStylesheet = stylesheet
			.replaceAll('url("/wp-content/', `url("${assetBasePath}/wp-content/`)
			.replaceAll("url('/wp-content/", `url('${assetBasePath}/wp-content/`);
		return new Response(rewrittenStylesheet, { headers });
	} catch (error) {
		return fileErrorResponse(error);
	}
}

function resolveReferencePath(referenceRoot: string, referencePath: string[]) {
	if (referencePath.length === 0) return null;

	const normalizedPath = path.normalize(referencePath.join("/"));

	if (
		normalizedPath === "." ||
		normalizedPath.startsWith("..") ||
		path.isAbsolute(normalizedPath)
	) {
		return null;
	}

	const filePath = path.join(referenceRoot, normalizedPath);
	const relativePath = path.relative(referenceRoot, filePath);

	if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
		return null;
	}

	return filePath;
}

function getContentType(filePath: string) {
	return (
		contentTypes.get(path.extname(filePath).toLowerCase()) ??
		"application/octet-stream"
	);
}

function fileErrorResponse(error: unknown) {
	if (error && typeof error === "object" && "code" in error) {
		const code = error.code;
		if (code === "ENOENT" || code === "ENOTDIR") {
			return new Response("Not found", { status: 404 });
		}
	}

	return new Response("Internal server error", { status: 500 });
}

function decodePathSegment(segment: string) {
	try {
		return decodeURIComponent(segment);
	} catch {
		return segment;
	}
}

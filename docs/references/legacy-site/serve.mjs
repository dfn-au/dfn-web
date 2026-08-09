import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

export const defaultReferenceRoot = path.resolve(
	process.env.LEGACY_SITE_REFERENCE_ROOT ?? path.join(scriptDirectory, "site"),
);

const contentTypes = new Map([
	[".css", "text/css; charset=utf-8"],
	[".eot", "application/vnd.ms-fontobject"],
	[".html", "text/html; charset=utf-8"],
	[".jpg", "image/jpeg"],
	[".jpeg", "image/jpeg"],
	[".js", "text/javascript; charset=utf-8"],
	[".otf", "font/otf"],
	[".png", "image/png"],
	[".svg", "image/svg+xml"],
	[".ttf", "font/ttf"],
	[".woff", "font/woff"],
	[".woff2", "font/woff2"],
]);

export async function startReferenceServer({
	referenceRoot = defaultReferenceRoot,
	fallbackRoot,
	host = "127.0.0.1",
	port = 3011,
} = {}) {
	const roots = [referenceRoot, fallbackRoot]
		.filter(Boolean)
		.map((root) => path.resolve(root));
	await Promise.all(roots.map((root) => access(root)));

	const server = createReferenceServer({ roots });

	await new Promise((resolve, reject) => {
		server.once("error", reject);
		server.listen(port, host, () => {
			server.off("error", reject);
			resolve();
		});
	});

	const address = server.address();
	if (!address || typeof address === "string") {
		throw new Error("Reference server did not expose a TCP address");
	}

	return {
		server,
		url: `http://${host}:${address.port}`,
	};
}

export function createReferenceServer({ roots }) {
	return createServer(async (request, response) => {
		if (request.method !== "GET" && request.method !== "HEAD") {
			response.writeHead(405, { Allow: "GET, HEAD" });
			response.end();
			return;
		}

		let pathname;
		try {
			const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
			pathname = decodeURIComponent(url.pathname);
		} catch {
			response.writeHead(400);
			response.end("Bad request");
			return;
		}

		const resolvedFile = await findFile(roots, pathname);

		if (resolvedFile.status === "forbidden") {
			response.writeHead(403);
			response.end("Forbidden");
			return;
		}

		if (resolvedFile.status === "not-found") {
			response.writeHead(404);
			response.end("Not found");
			return;
		}

		if (resolvedFile.status === "error") {
			response.writeHead(500);
			response.end("Internal server error");
			return;
		}

		const { filePath, fileStats } = resolvedFile;
		response.writeHead(200, {
			"Cache-Control": "no-store",
			"Content-Length": fileStats.size,
			"Content-Type": getContentType(filePath),
		});

		if (request.method === "HEAD") {
			response.end();
			return;
		}

		createReadStream(filePath).pipe(response);
	});
}

async function findFile(roots, pathname) {
	for (const root of roots) {
		const filePath = resolveRequestPath(root, pathname);
		if (!filePath) return { status: "forbidden" };

		try {
			const fileStats = await stat(filePath);
			if (fileStats.isFile()) {
				return { status: "found", filePath, fileStats };
			}
		} catch (error) {
			if (!isMissingFileError(error)) return { status: "error" };
		}
	}

	return { status: "not-found" };
}

function resolveRequestPath(root, pathname) {
	const normalizedPathname = pathname.endsWith("/")
		? `${pathname}index.html`
		: pathname;
	const candidate = path.normalize(path.join(root, normalizedPathname));

	if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
		return null;
	}

	return candidate;
}

function isMissingFileError(error) {
	return (
		error &&
		typeof error === "object" &&
		"code" in error &&
		(error.code === "ENOENT" || error.code === "ENOTDIR")
	);
}

function getContentType(filePath) {
	return (
		contentTypes.get(path.extname(filePath).toLowerCase()) ??
		"application/octet-stream"
	);
}

function getPort() {
	const portFlagIndex = process.argv.indexOf("--port");
	const rawPort =
		portFlagIndex >= 0
			? process.argv[portFlagIndex + 1]
			: process.env.LEGACY_SITE_REFERENCE_PORT;
	const parsedPort = Number(rawPort ?? 3011);

	if (!Number.isInteger(parsedPort) || parsedPort <= 0) {
		throw new Error(`Invalid reference server port: ${rawPort}`);
	}

	return parsedPort;
}

function isMainModule() {
	const entryPoint = process.argv[1];
	if (!entryPoint) return false;

	return import.meta.url === pathToFileURL(path.resolve(entryPoint)).href;
}

if (isMainModule()) {
	const host = process.env.LEGACY_SITE_REFERENCE_HOST ?? "127.0.0.1";
	const { server, url } = await startReferenceServer({
		referenceRoot: defaultReferenceRoot,
		host,
		port: getPort(),
	});

	console.log(`Serving DFN legacy site reference at ${url}`);

	process.on("SIGTERM", () => {
		server.close(() => process.exit(0));
	});

	process.on("SIGINT", () => {
		server.close(() => process.exit(0));
	});
}

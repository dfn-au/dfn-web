import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const referenceRoot = path.resolve(
	process.env.LEGACY_SITE_REFERENCE_ROOT ?? path.join(scriptDirectory, "site"),
);
const host = process.env.LEGACY_SITE_REFERENCE_HOST ?? "127.0.0.1";
const port = getPort();

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

await access(referenceRoot);

const server = createServer(async (request, response) => {
	if (request.method !== "GET" && request.method !== "HEAD") {
		response.writeHead(405, { Allow: "GET, HEAD" });
		response.end();
		return;
	}

	const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
	const filePath = resolveRequestPath(url.pathname);

	if (!filePath) {
		response.writeHead(403);
		response.end("Forbidden");
		return;
	}

	try {
		const fileStats = await stat(filePath);

		if (!fileStats.isFile()) {
			response.writeHead(404);
			response.end("Not found");
			return;
		}

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
	} catch (error) {
		if (error && typeof error === "object" && "code" in error) {
			const code = error.code;

			if (code === "ENOENT" || code === "ENOTDIR") {
				response.writeHead(404);
				response.end("Not found");
				return;
			}
		}

		response.writeHead(500);
		response.end("Internal server error");
	}
});

server.listen(port, host, () => {
	console.log(`Serving DFN legacy site reference at http://${host}:${port}`);
});

process.on("SIGTERM", () => {
	server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
	server.close(() => process.exit(0));
});

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

function resolveRequestPath(pathname) {
	const decodedPathname = decodeURIComponent(pathname);
	const normalizedPathname = decodedPathname.endsWith("/")
		? `${decodedPathname}index.html`
		: decodedPathname;
	const candidate = path.normalize(
		path.join(referenceRoot, normalizedPathname),
	);

	if (
		candidate !== referenceRoot &&
		!candidate.startsWith(`${referenceRoot}${path.sep}`)
	) {
		return null;
	}

	return candidate;
}

function getContentType(filePath) {
	return (
		contentTypes.get(path.extname(filePath).toLowerCase()) ??
		"application/octet-stream"
	);
}

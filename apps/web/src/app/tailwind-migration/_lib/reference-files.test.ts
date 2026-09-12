import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, test, vi } from "vitest";
import { serveReferenceAsset } from "./reference-files";

const temporaryDirectories: string[] = [];

afterEach(async () => {
	vi.unstubAllEnvs();
	await Promise.all(
		temporaryDirectories
			.splice(0)
			.map((directory) => rm(directory, { recursive: true, force: true })),
	);
});

async function fixture() {
	const repository = await mkdtemp(path.join(os.tmpdir(), "dfn-reference-"));
	temporaryDirectories.push(repository);
	await mkdir(path.join(repository, "site"));
	vi.stubEnv("DFN_LEGACY_REFERENCE_REPO", repository);
	vi.stubEnv("LEGACY_SITE_REFERENCE_ROOT", "");
	return repository;
}

test("missing or relative checkout configuration returns an unavailable reference", async () => {
	vi.stubEnv("DFN_LEGACY_REFERENCE_REPO", "");
	expect((await serveReferenceAsset(["image.png"])).status).toBe(503);
	vi.stubEnv("DFN_LEGACY_REFERENCE_REPO", "../reference");
	expect((await serveReferenceAsset(["image.png"])).status).toBe(503);
});

test("serves external assets with encoded query-string filenames and HEAD metadata", async () => {
	const repository = await fixture();
	await writeFile(
		path.join(repository, "site", "style.css?ver=1.css"),
		"body {}",
	);
	const asset = ["style.css%3Fver%3D1.css"];
	const response = await serveReferenceAsset(asset);
	expect(await response.text()).toBe("body {}");
	expect(response.headers.get("Content-Type")).toBe("text/css; charset=utf-8");
	const head = await serveReferenceAsset(asset, { head: true });
	expect(head.status).toBe(200);
	expect(head.headers.get("Content-Length")).toBe("7");
	expect(await head.text()).toBe("");
	expect((await serveReferenceAsset(["missing.png"])).status).toBe(404);
	expect((await serveReferenceAsset(["%2E%2E", "README.md"])).status).toBe(403);
});

test("the existing asset-root override takes precedence at request time", async () => {
	const repository = await fixture();
	await writeFile(path.join(repository, "site", "image.png"), "default");
	const override = path.join(repository, "override");
	await mkdir(override);
	await writeFile(path.join(override, "image.png"), "override");
	vi.stubEnv("LEGACY_SITE_REFERENCE_ROOT", override);
	expect(await (await serveReferenceAsset(["image.png"])).text()).toBe(
		"override",
	);
});

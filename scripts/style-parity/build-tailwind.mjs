#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/postcss";
import postcss from "postcss";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const migrationRoot = path.join(
	repositoryRoot,
	"docs/references/tailwind-migration",
);
const inputPath = path.join(migrationRoot, "tailwind.css");
const outputPath = path.join(migrationRoot, "site/tailwind.css");
const input = await readFile(inputPath, "utf8");
const result = await postcss([tailwindcss({ base: migrationRoot })]).process(
	input,
	{
		from: inputPath,
		map: false,
		to: outputPath,
	},
);

await writeFile(outputPath, result.css);

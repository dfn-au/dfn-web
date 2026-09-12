import { spawn } from "node:child_process";
import { loadLegacyReference } from "./load.mjs";

try {
	const { serverPath, defaultReferenceRoot } = await loadLegacyReference();
	const child = spawn(
		process.execPath,
		[serverPath, ...process.argv.slice(2)],
		{
			stdio: "inherit",
			env: { ...process.env, LEGACY_SITE_REFERENCE_ROOT: defaultReferenceRoot },
		},
	);
	for (const signal of ["SIGINT", "SIGTERM"]) {
		process.on(signal, () => child.kill(signal));
	}
	child.on("error", (error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
	child.on("exit", (code, signal) => {
		process.exitCode = code ?? (signal === "SIGINT" ? 130 : 143);
	});
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
}

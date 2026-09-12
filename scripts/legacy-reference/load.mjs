import { stat } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import {
	getLegacyReferenceConfig,
	referenceConfigurationHelp,
} from "../../apps/web/src/lib/legacy-reference-config.mjs";

export async function loadLegacyReference() {
	const { referenceRoot, serverPath } = getLegacyReferenceConfig();
	try {
		if (!(await stat(referenceRoot)).isDirectory()) {
			throw new Error(`Not a directory: ${referenceRoot}`);
		}
		const { startReferenceServer } = await import(
			pathToFileURL(serverPath).href
		);
		if (typeof startReferenceServer !== "function") {
			throw new Error(`Missing startReferenceServer export in ${serverPath}`);
		}
		return {
			defaultReferenceRoot: referenceRoot,
			startReferenceServer,
			serverPath,
		};
	} catch (error) {
		throw new Error(
			`Cannot load the legacy reference: ${error.message}\n${referenceConfigurationHelp}`,
		);
	}
}

import path from "node:path";

export const referenceConfigurationHelp =
	"Set DFN_LEGACY_REFERENCE_REPO to the absolute path of a dfn-web-legacy-reference checkout. See docs/references/legacy-reference.md.";

/** @param {Record<string, string | undefined>} env */
export function getLegacyReferenceConfig(env = process.env) {
	const repositoryRoot = env.DFN_LEGACY_REFERENCE_REPO;
	if (!repositoryRoot) throw new Error(referenceConfigurationHelp);
	if (!path.isAbsolute(repositoryRoot)) {
		throw new Error(referenceConfigurationHelp);
	}

	const referenceRoot =
		env.LEGACY_SITE_REFERENCE_ROOT || path.join(repositoryRoot, "site");
	if (!path.isAbsolute(referenceRoot)) {
		throw new Error("LEGACY_SITE_REFERENCE_ROOT must be an absolute path.");
	}

	return {
		referenceRoot,
		serverPath: path.join(repositoryRoot, "serve.mjs"),
	};
}

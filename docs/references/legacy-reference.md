# Frozen legacy website reference

`dfn-web-legacy-reference` is a standalone Git repository containing the
frozen WordPress homepage, About page, assets, capture notes, and preview server.
Use it for design reference and migration comparisons; it is not a maintained
website or a complete WordPress backup. The capture date is 28 June 2026.

Archive commit: `0a9dc0f89f553678929a0db0bc5f082f903d5614`.

The original local checkout is `/Users/extremeandy/Projects/dfn-web-legacy-reference`.
The private [GitHub repository](https://github.com/dfn-au/dfn-web-legacy-reference)
is hosted under `dfn-au`. With repository access, create another checkout:

```sh
git clone git@github.com:dfn-au/dfn-web-legacy-reference.git /absolute/path/to/dfn-web-legacy-reference
git -C /absolute/path/to/dfn-web-legacy-reference checkout 0a9dc0f89f553678929a0db0bc5f082f903d5614
cd /absolute/path/to/dfn-web-legacy-reference
shasum -a 256 -c SHA256SUMS
node serve.mjs
```

Open `http://127.0.0.1:3011/` and `http://127.0.0.1:3011/about/`.
Preserve the pinned commit and verify `SHA256SUMS` on each checkout.
The archive README records the source repository, full source commit, original
path, approximate commissioning date, capture command, and static behavior.

## Using the reference from dfn-web

Export the same setting in every shell running reference commands or Next.js:

```sh
export DFN_LEGACY_REFERENCE_REPO=/absolute/path/to/dfn-web-legacy-reference
pnpm reference:serve
# Or compare the editable overlay (starts its own reference servers):
pnpm reference:parity
# Start the React preview in one configured terminal:
pnpm dev
# Then, in another configured terminal:
pnpm reference:react-parity
pnpm reference:react-states
```

The setting must be an absolute checkout path, independent of the `dfn-web`
worktree location. The tools derive `serve.mjs` and `site/` from it. The existing
`LEGACY_SITE_REFERENCE_ROOT` override is supported consistently by the CLI tools
and React asset routes: set it to an absolute asset directory to replace `site/`.
The checkout setting is still required to locate the server. The standalone
server also supports `LEGACY_SITE_REFERENCE_HOST`, `LEGACY_SITE_REFERENCE_PORT`,
and `--port`.

Next.js can alternatively read these settings from `apps/web/.env.local`;
the Node CLI tools do not load that file, so shell exports are recommended.
Restart Next.js after changing configuration.

The [Tailwind overlay](tailwind-migration/README.md) stays in `dfn-web`. Its
server serves editable files first and falls back to the external asset root.
The React preview's `/tailwind-migration/reference/` asset route uses the same
root. Missing configuration returns HTTP 503 there; missing files return 404.
CLI errors explain the required configuration.

The archive is optional for public routes, ordinary development, CI, and
production builds. Builds do not clone it or bundle the external checkout;
reference assets are read only when requested. Do not configure the archive in
production. Do not regenerate the frozen capture to resolve comparison failures.

## Superseded location

Before extraction, `docs/references/legacy-site/` held this archive inside
`dfn-web` at source commit `2b3ef326f311baa81b7ad896326a50b394b0ca03`.
That location and instructions to execute its server directly are superseded by
this document. Git history remains intact; no submodule or vendored copy replaces it.

# ADR 004: Shared documents with Country Site content differences

Accepted 12 September 2026 in [#21](https://github.com/dfn-au/dfn-web/issues/21).

Keep one document identity and URL path for a public item shared across the AU and NZ Country Sites. Express country differences inside that document using explicit AU and NZ values; identical content has one shared value. Separate documents for wording differences would complicate every shared page that links to them.

Publishing Scope is AU, NZ or both. Embedded sections inherit their parent's scope and may narrow it to one country. Missing content never falls back to the other country's value. Internal links select the document once. Publishing a shared document publishes its shared and country-specific values for both sites; there is no independent country publication lifecycle within it.

The fixed deployment Country Site from [ADR 001](001-website-technical-architecture.md) selects the rendering. Studio provides previews for each included site. Public delivery enforces Publishing Scope even when content references become incompatible, returning 404 outside scope unless an explicit redirect exists. Use self-canonical URLs per domain and appropriate alternate hints for available content. Payment accounts and Operational State follow [ADR 003](003-authored-content-and-operational-state-ownership.md).

These choices are accepted but not implemented by this record. [Country delivery](https://github.com/dfn-au/dfn-web/issues/71) owns schemas, reference validation, previews, metadata, wrong-country 404 checks and delivery acceptance. Incoming-reference protection and relationships between separate counterpart documents remain outside v1.

# ADR 004: Shared Documents with Country Site Content Differences

## Status

Accepted — 12 September 2026. Records the publishing interview for [issue #21](https://github.com/dfn-au/dfn-web/issues/21).

## Decision

Keep one document for a public item shared across the AU and NZ Country Sites. Allow parts of its content to differ by Country Site within that document. Requiring separate documents for different wording would complicate every shared page that links to them; a single document preserves a simple reference and publishing model.

### Scope and content

- Publishing Scope is AU, NZ, or both. All public Authored Content types may use these scopes, including pages, stories, programme descriptions, and event descriptions. An event's physical location does not determine where its description may be published.
- Ordinary embedded sections inherit their parent's scope. Editors may explicitly restrict a section to AU or NZ within a shared document. A section cannot extend availability beyond its parent.
- Content that differs has explicit AU and NZ values. Otherwise it has one shared value. Do not model this as a shared base with country overrides or cross-country fallbacks.
- Differences may cover headings, text, images, downloads, links, button destinations, sections and their visibility, and search/social titles, descriptions, and images.
- When shared content diverges, retain the document and express the differences inside it. A section may intentionally be absent on one site; missing content must not silently use the other site's value.
- Payment accounts and Operational State remain outside this editorial scope decision, as established in [ADR 003](003-authored-content-and-operational-state-ownership.md).

### Identity, links, and publishing

- A shared page has one document identity and one URL path in v1. Its domain and rendered content depend on the current Country Site, resolved from the request domain rather than visitor location.
- Internal links select the document once. For example, a shared Donate document resolves to the same path on either site while its content can differ. No counterpart substitution or separate route-level picker is required.
- Publishing the shared document publishes its shared and country-specific content for both sites. There is no independent country publication lifecycle within that document.
- Preserve ADR 001's public scope filtering, self-canonical URLs per domain, alternate hints where appropriate, and 404 outside Publishing Scope unless an explicit redirect exists. Do not infer counterparts for separate documents.

### Studio and safeguards

- Use the normal Sanity document form, with clear scope and shared/AU/NZ labels. A global country editing mode or tab layout is not required.
- Configure AU and NZ document preview locations in Studio's Presentation tool for the sites included in scope. Selecting a location changes the frontend preview; it does not automatically filter the editing form. This is a Studio control, not a public country switcher.
- Filter reference pickers and validate selected references for compatibility with the sites where that reference is used. An unconditional reference in shared content must be compatible with both sites; one in an NZ-only section need only be compatible with NZ.
- Blocking later scope changes that invalidate incoming references is desirable but deferred beyond v1. This deferral does not remove public scope enforcement or permit wrong-site content to render.

## Deferred and Implementation Detail

- Relationships between separate AU and NZ counterpart documents are possible future work, not a v1 requirement.
- Exact schema field shapes, whether both-site scope is stored explicitly or through a documented default, and detailed form layout remain implementation choices.
- Configure protected preview origins, route resolution, and alternate-link emission rules as implementation work under the existing domain and SEO requirements.
- Sanity's normal strong-reference behaviour was recommended during the interview for publication/deletion integrity. That is separate from Country Site compatibility and does not supply scope validation.

## Follow-up Slices

1. Prove the model with one shared page containing shared values, explicit AU/NZ values, and a section present on only one site; render both sites with one document identity and path.
2. Add document-reference links, filtered pickers, and direct compatibility validation, including references inside country-specific sections.
3. Configure and verify both Studio preview locations, edit labels, and a publish updating both country renderings.
4. Verify domain-specific metadata, public scope filtering, and wrong-site 404 behaviour. Keep incoming-reference protection and counterpart relationships out of v1 acceptance.

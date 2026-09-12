# Publishing hand-off

## Subsequent decision

The continued interview is recorded in accepted [ADR 004](../adr/004-country-site-publishing.md). It supersedes the resume questions and any conflicting scope-change requirements below: country differences live inside one shared document, section visibility may differ by site, and blocking scope changes that break incoming references is deferred beyond v1. The earlier notes below are retained as discussion history; use ADR 004 for current publishing direction.

Recorded 12 September 2026. Resume the publishing interview for [#21](https://github.com/dfn-au/dfn-web/issues/21). Andrew wants simple editor workflows and no obvious questions.

## Settled

- Publishing Scope is AU, NZ, or Both. Publishing shared content updates both sites.
- Pages and independently reusable content have scope; ordinary embedded copy inherits its parent’s scope.
- References share actual content. Reusing a section type does not share its copy.
- Filtered pickers offer compatible content using the parent’s scope. Existing selections need separate validation.
- Check direct references initially, and affected parents before narrowing reused content’s scope. Recursive audits can come later if needed.
- Sanity supports these mechanisms, but Studio validation does not guarantee atomic correctness across concurrent edits or API writes.

## Resume with

1. When should country-specific wording use separate fields, sections, or linked documents? Use a real page example.
2. Should updated statistics change historical appeals? Andrew’s earlier “yes” was ambiguous.
3. How should intentional cross-country links and shared content becoming separate versions work?

The UI sketches were examples, not final schema decisions. No publishing implementation was done. The React migration can proceed independently.

Consult the [research report](../architecture/sanity-country-site-publishing-research.md) only when technical detail is needed.

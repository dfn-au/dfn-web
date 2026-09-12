# Sanity publishing across the AU and NZ Country Sites

Research date: 5 September 2026. Status: research and recommendation, not an accepted architecture decision.

For the direction accepted during the subsequent discussion and the questions still open, read the [publishing discussion hand-off](../plans/country-site-publishing-handoff.md).

## Finding

Sanity supports the required publishing model, but does not prescribe an automatic AU/NZ inheritance system. Its documented patterns separate content ownership, reuse, publishing workflow, and delivery. Our discussion conflated those decisions and introduced section tagging and link substitution before establishing an editorial need.

For DFN, start by distinguishing **where an item may appear** (Publishing Scope), **whether its wording differs**, and **whether it is independently maintained**. A page can be shared without containing country-specific fields. A reusable story can be shared while the pages presenting it differ.

## Existing constraints and implementation

[ADR 001](../adr/001-website-technical-architecture.md) requires one application serving both domains, domain-derived Country Site, scope-filtered public content, and 404 outside an item's scope unless an explicit redirect exists. [ADR 003](../adr/003-authored-content-and-operational-state-ownership.md) assigns Authored Content a Publishing Scope of AU, NZ, or both and prohibits silent cross-country fallback. Neither chooses exact Sanity schemas or field variation. [Issue #21](https://github.com/dfn-au/dfn-web/issues/21) owns that unresolved design.

The current [Page schema](../../apps/web/src/sanity/schemaTypes/documents/page.ts) has title, slug, and body; [Home Page](../../apps/web/src/sanity/schemaTypes/documents/homePage.ts) has title and body. [Body content](../../apps/web/src/sanity/schemaTypes/objects/blockContent.ts) embeds rich text and images with URL links. [Queries](../../apps/web/src/sanity/lib/queries.ts) do not yet filter by Country Site. No publishing model needs undoing.

In this conversation, Andrew accepted that publishing changes to Shared Content updates both sites. His answer concerning historical statistics was ambiguous; no policy on historical values is established here.

## What Sanity documents

### One content store can serve multiple Country Sites

Sanity's multi-tenancy guide explicitly describes authoring multiple markets in one dataset, using a market field, filtered document lists/reference pickers, initial values, and scoped queries. Its separate-dataset example addresses more independent teams and permissions; it is not a requirement for two domains. The terminology is Sanity's: DFN should continue using Country Site and Publishing Scope. [Sanity multi-tenancy guide](https://www.sanity.io/docs/developer-guides/multi-tenancy-implementation#one-dataset-multiple-teams).

**Recommendation:** one production content dataset remains the natural starting point for DFN's shared publishing. Use Studio navigation to make AU, NZ, and Shared Content easy to find. Separate workspaces are an available authoring arrangement, not a prerequisite or an access-control boundary by themselves.

### Country availability and different wording are separate decisions

Sanity's localization documentation describes two approaches: multiple values inside one document, published together; or separate linked documents, allowing independent publication. It recommends choosing by content structure and workflow, and permits both approaches within one project. Its language plugins are optional aids for translation workflows. [Sanity localization documentation](https://www.sanity.io/docs/studio/localization).

**Application to DFN:** two English-language Country Sites do not by themselves require translation documents, language plugins, or duplicate copy. Publishing Scope can be a set of sites. If wording differs, the document-versus-field distinction becomes useful, but applying it to AU/NZ is our design inference, not a Sanity-prescribed country model.

| Situation | Candidate model | Main tradeoff |
| --- | --- | --- |
| Same story and wording on both sites | One story/page, scope Both | One publish updates both; no independent version |
| Same item with a small, stable country difference | Shared document with a specifically named country-dependent field | No duplicate body; both values share a publishing lifecycle |
| Different homepages using the same story | Separate country homepages referencing one shared story | Independent composition, centrally maintained story |
| Substantially different copy or independent approvals | Separate linked documents | Independent editing, with duplicate-copy drift to manage |

These are candidate choices, not decisions. A generic variation system is unnecessary until representative content demonstrates the need.

Sanity's own Course Platform demo includes a **Legal** schema that puts market-specific content inside one document and filters it when querying. This directly demonstrates that country-dependent text within shared content is a legitimate pattern; it is not inherently an anti-pattern requiring separate pages. The repository is a demonstration of alternatives, not a mandate to adopt that approach throughout DFN. [Official demo: Legal schema](https://github.com/sanity-io/demo-course-platform#legal).

### Embedded content and referenced content have different ownership

Sanity's page-builder guide uses an array containing embedded objects and references. Objects stay within the document; references enable reuse across documents. Its example mixes page-specific sections with a referenced promotion rather than making every section a standalone document. [Sanity page-building guide](https://www.sanity.io/docs/developer-guides/how-to-use-structured-content-for-page-building).

Reusing a **section type** is different from reusing **the same content**. Two pages can use the same text-and-image schema while each owns its own text and image. Editing one does not change the other. Referencing the same standalone content document is what connects the actual values across pages. This distinction lets editors compose pages from familiar section types without managing a library of separately published fragments.

**DFN example:** an AU Page owns its heading, introduction, image caption, and unique sections. These fields need no repeated AU setting: the application exposes them through their AU-scoped parent. This is a rule in our delivery model, not recursive metadata applied by Sanity. If an embedded field references another document, that document remains independently owned.

Sanity allows references in objects, arrays, and rich-text annotations. It supports querying both referenced content and incoming references. Placement of a reference field is largely an editorial-experience choice. [Sanity connected-content documentation](https://www.sanity.io/docs/studio/connected-content).

**Recommendation:** extract separately managed content when reuse or an independent lifecycle justifies it. An independently managed shared story can have scope Both; its availability does not require that it have its own URL. Avoid asking editors to maintain dozens of fragment documents to complete one page.

### Publishing shared content once is straightforward; publishing dependencies differs

Publishing a Sanity document applies its draft contents to the published document. Future edits create a new draft while the existing published content remains available. Publication belongs to documents, not domains. [Sanity drafts documentation](https://www.sanity.io/docs/content-lake/drafts).

**Inference for DFN:** both domains can read the same published item after one editorial action. Our application must refresh affected delivery caches for both sites; Sanity publication alone does not promise simultaneous visible updates through every cache. Publishing a page also does not mean publishing every independently referenced draft. Moving content into separate documents changes the editor's publishing workflow as well as its reuse.

### Internal links reference actual documents

The Portable Text editor supports an internal-link annotation containing a document reference. External URL links remain a separate annotation shape. [Sanity Portable Text configuration](https://www.sanity.io/docs/studio/portable-text-editor-configuration#annotations).

**Recommendation for DFN:** label the picker with page title and Publishing Scope. Selecting an AU-only Give Page selects that document; it does not mean “whichever Give Page suits this visitor.” A Both-scoped Page can resolve on the current Country Site. Linking an NZ visitor deliberately to an AU Page requires an explicit cross-site destination policy. Automatic counterpart substitution would be additional custom behavior and is not needed merely to use internal links.

Rendering a testimonial *inside* a page and providing a hyperlink *to* a different page are different relationships. The former exposes content on the current site; the latter may intentionally navigate elsewhere. One universal scope restriction on every reference would conflate them.

### Picker filters are assistance, not a scope guarantee

Sanity explicitly says a reference filter only constrains search results at selection time; it does not guarantee that the target keeps matching. Strong references provide referential integrity, not a custom country-availability policy. [Sanity reference documentation](https://www.sanity.io/docs/studio/reference-type).

Sanity Studio custom validation can check document and field values, but those rules run in Studio. Direct API/client mutations do not automatically run them; bulk CLI validation is available. [Sanity validation documentation](https://www.sanity.io/docs/studio/validation).

**Recommendation:** for content embedded by reference, validate that its scope covers every site where that placement renders. Under the simplest model, an AU page may use AU or Both content; a Both page's unconditional embed needs Both content. This is DFN policy, not built-in Sanity inheritance. If conditional sections are added later, check the placement's actual scope instead of blindly checking the whole page.

Changing a reusable item's scope later can invalidate existing uses. Incoming-use checks and scope-aware frontend retrieval must address this; picker filtering alone cannot. Imports and automated writes need equivalent checking. Public delivery must never silently substitute the other country's content to repair an invalid relationship.

## Recommended editorial starting point

Sanity's editorial guidance emphasizes reducing complexity, using helpful labels and descriptions, and organizing the Studio around authors' work. A theoretically elegant model can fail if editors find it confusing. [Sanity editorial-experience guide](https://www.sanity.io/guides/create-an-effective-editor-experience).

For DFN, test this proposed workflow with real copy before accepting a schema:

1. An editor creates a page and chooses **Appears on: Australia / New Zealand / Both** once.
2. They write normal rich text and add approved sections inside the page. Unique sections need no separate publishing scope controls.
3. Where a genuinely shared item exists, they select it from a clearly labelled picker. Shared changes visibly identify the sites they affect.
4. Links select real pages or explicit URLs. Country-specific giving copy stays explicit; the frontend does not infer it from prose.
5. The editor previews each included Country Site before publishing.

Sanity's Presentation Tool supports document-to-location mapping and multiple allowed preview origins, so separate AU/NZ previews are supported capabilities. We still need to configure the UI, routes, and draft access for DFN. [Presentation Tool configuration](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool).

Retain ADR 003's scope policy for independently reusable Authored Content. Universally available types can have an explicit Both/default contract without requiring another manual selector on every instance. Raw storage ownership and editorial availability should not be confused.

## What the earlier discussion overstated

- **“Every child needs AU/NZ tagging.”** Embedded fields can belong entirely to their parent; independent references are the boundary that needs deliberate handling.
- **“Any prose difference means split the page.”** Too rigid. Small bounded differences and independent compositions are legitimate patterns to evaluate.
- **“Country-specific sections are the solution.”** They are an optional customization with additional preview, link-validation, and composition complexity.
- **“Picking Give resolves to the right country's page.”** Only with explicitly modeled behavior. A normal reference identifies one document.
- **“Compatible picker choices ensure compatible content.”** They do not cover subsequent target edits or API writes.

The next useful step is a small editorial modeling exercise: one identical shared story, one AU-only page, and AU/NZ homepages with different composition. Add a fourth example containing an actual country-specific paragraph if one exists. Compare the editing workflow before choosing between section differences, named fields, or separate documents.

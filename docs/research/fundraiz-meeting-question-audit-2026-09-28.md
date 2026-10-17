# Fundraiz meeting question audit

Historical audit of the original list. The meeting questions were subsequently rewritten from the research and DFN requirements; this records the evidence behind removing generic documentation questions, not the current question numbering or structure.

Reviewed 28 September 2026. Purpose: reserve vendor time for unresolved DFN fit, demonstrations, implementation responsibilities and commercial commitments. The revised [meeting file](fundraiz-meeting-questions.md) is deliberately compact; evidence and editorial rationale live here instead.

## Stripe: what can be answered ourselves

Fundraiz lists Stripe in its [integration catalogue](https://www.fundraiz.ai/integrations). Its [public API](https://www.fundraiz.ai/api-docs) documents recording a donation against an existing contact, with a bank-transfer example. Therefore externally collected gifts have a documented ingestion route. We should not ask whether Stripe exists or whether a separate website can in principle provide donation data.

This does **not** establish that connecting Stripe automatically imports and maintains subscriptions created by another application. The API page lists outbound recurring-failure and refund events; that does not specify inbound synchronisation of external subscriptions. Its public donation example also does not establish payment-reference matching, repeat-safe writes or imported recurring-plan lifecycle handling. The Stripe “Learn more” control led to sign-in when checked. The resources hub and Academy did not resolve that connector boundary.

The revised question asks which functions work automatically, which need custom work, and what is lost when keeping DFN checkout. It is a product-fit and integration-scope question, not a generic compatibility question. No authenticated connector or API transaction was tested.

## Audit of the original 24 questions

| Previous topic | Disposition and remaining reason to ask |
| --- | --- |
| Why switch from Infoodle | Keep first. Published features do not demonstrate improvement over DFN's own setup or supply a comparable customer reference. |
| Shared AU/NZ setup | Keep the concrete example. Enterprise organisation support alone does not establish shared identity with entity-scoped finance, consent and exports. |
| Sponsorship | Keep. No demonstrated multi-student, reassignment and recipient-history model was found. |
| Households/duplicates | Narrow to shared-email behaviour. Published review/merge tooling does not resolve its interaction with API matching. |
| Stripe | Replace broad compatibility with the connector boundary described above. |
| Xero | Retain split allocation, fees and correction demonstration; do not ask whether Xero is integrated. |
| Receipts | Merge into the finance scenario. Automatic receipts are documented; DFN-specific mixed treatment and externally issued receipts need validation. |
| Humanitix | Ask about the receiving event-history model and update behaviour. Outbound Humanitix integration mechanisms are already known. |
| Preferences/suppression | Keep cross-topic/entity example and changes during a journey. Generic privacy commitments do not specify those semantics. |
| Missing/failed payments | Remove discovery of failure events; ask how staff ownership and resolution work and how missing bank gifts differ. |
| Automation controls | Merge into preference-change and staff-workflow demonstrations. Avoid a separate catalogue of routine controls. |
| Reporting | Remove report-builder/export existence questions. Demonstrate the specific exclusions and sponsorship relationships DFN needs. |
| Staff maintenance | Merge into a representative workflow. Evaluate what staff can maintain versus ongoing vendor/developer work. |
| AI | Remove generic human-approval questions, already addressed by published policy. Keep evidence of incremental benefit and a measurable DFN pilot. |
| Sensitive-data permissions | Keep specific record/report/export/integration boundaries and exclusion from inappropriate processing. General access-control promises are insufficient. |
| Security | Narrow to inconsistent SOC statements and requesting actual assurance/DPA documents. Do not ask the vendor to recite its published subprocessor list. |
| Email delivery | Fold suppression migration and delivery support into migration/service questions. Routine setup instructions belong in implementation research. |
| API coverage/reliability | Fold relevant missing data support into Stripe/event questions. Detailed schemas, matching and retry rules belong in technical follow-up or the trial. |
| Outages/recovery | Remove whether backups exist. Keep contractual recovery/data-loss commitments and organisation-specific restore capability. |
| Proof-of-fit | Keep. A supported DFN trial, acceptance criteria and access are agreements to make, not facts to look up. |
| Migration | Keep specific Infoodle mapping, exclusions, responsibilities and reconciliation. Generic CSV import does not answer these. |
| Cutover | Merge into migration. Retain rehearsal, incoming changes and recovery responsibilities. |
| Export/exit | Remove format and standard retention questions. Request a complete relational export and clarity about assistance/charges. |
| Price/plan | Keep last and ask for the actual configuration quote, not advertised prices. |

Source basis: [features](https://www.fundraiz.ai/features), [pricing](https://www.fundraiz.ai/pricing), [religious-sector offering](https://www.fundraiz.ai/solutions/religious), [integrations](https://www.fundraiz.ai/integrations), [API](https://www.fundraiz.ai/api-docs), [privacy](https://www.fundraiz.ai/privacy), [terms](https://www.fundraiz.ai/terms), [Trust Centre](https://www.fundraiz.ai/trust-centre), and the [DFN fit research](fundraiz-crm-fit-2026-09-27.md).

Published claims are evidence of what is offered, not proof that a DFN workflow passes. A retained question must identify a specific unresolved requirement, request a meaningful demonstration, resolve conflicting information or negotiate a commitment.

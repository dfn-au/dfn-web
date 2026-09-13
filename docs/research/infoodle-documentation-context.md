# Infoodle: documentation context for the DFNA inspection

Research date: 13 September 2026.

This companion note covers repository requirements and official Infoodle documentation. It contains **no live DFNA CRM observations**. Product features are investigation leads, not evidence that DFNA uses them. The live inspection should record configured fields, populated records, active workflows, and recent history separately.

See the [live current-state report, coverage gaps and guidance for using these findings](infoodle-current-state-2026-09-13.md). Neither documented product capabilities nor observed DFNA practices establish requirements or the preferred design for the new website. Future choices need a validated need and an explicit decision in the relevant planning document.

## Repository context

The [CRM/DMS/EMS PRD](../prds/specs/007-crm-dms-ems.md) defines the intended operating model, not a verified inventory of current operations. Its unresolved questions cover system ownership, AU/NZ separation, receipts, Xero integration, recurring failures, email/suppression, events, sponsorship data, and sensitive-data permissions. It expects final accounting truth in Xero and stewardship history in CRM/DMS, but explicitly leaves the exact receipt process unconfirmed.

The [CRM selection report](../prds/crm-selection-report.md) recommends testing Infoodle first. Its principal uncertainties are AU/NZ separability, duplicate handling, sponsor update/send history, and recurring payment follow-up. Its vendor assessment is public-documentation research and should not be treated as evidence of DFNA configuration.

The [sponsorship PRD](../prds/specs/004-sponsorship.md) distinguishes standard child selection, programme-level scholarship giving, and privately allocated vulnerable child sponsorship. It leaves child availability/locking, annual sponsorship, and exact safe profile fields unresolved. Existing CRM fields and staff records could clarify current practice, but cannot alone determine future safeguarding policy.

## Highest-value comparisons with the live CRM

| Question | Evidence to inspect | What it could resolve |
| --- | --- | --- |
| What represents a sponsor–child relationship? | Contact types/views, person fields, Connections, groups, attachments, pledge references, historical notes | Whether sponsorship is a relationship record, repeated fields, group membership, or external record; whether multiple children per sponsor and sponsor changes are representable |
| Where do gifts become donor history? | A recent approved paid form, corresponding transaction/payout, account code, Xero reference, reconciliation state | The actual website → form → contact → transaction handoff and responsible staff action |
| Who produces receipts? | Receipt templates, generated receipt history, settings, linked transactions, year-end reports | Whether the PRD's Xero expectation matches current practice, and whether receipts are individual or joint |
| How are AU and NZ distinguished? | Country/entity fields, account codes, campaigns, groups/clusters, payment methods, Xero organisation, sender identities | Whether separation exists per contact, gift, subscription, or system; country of address is insufficient evidence of legal entity attribution |
| Which automations actually run? | Administration → Workflows; active state, triggers, ordered steps, conditions, recipient/owner and timeline | Donor onboarding, subscription changes, sponsorship follow-up, staff tasks and manual handoffs |
| Which recurring failures need action? | Finance → Recurring Income, failed instalments, notification settings, notes/tasks/queues | Whether failures are only visible to a provider or are assigned and closed out in Infoodle |
| What is a communication preference? | Mail Types, group memberships, email status, Mailchimp setup, send history, form consent wording | Whether interest, consent, suppression, and vetted prayer eligibility are distinct records |
| What are the operational reports? | Saved reports, selected filters/columns, finance reports, report names and recent periods | Actual decisions and exports staff depend on, including active/lapsed donors and sponsorship follow-up |
| Are events managed here? | Event configuration/history, registration forms, participants, attendance and contact event tabs | Whether Infoodle owns ticketing, captures history only, or has unused event features |
| Which data must migrate intact? | Configured schemas and identifiers, household relationships, gift allocation, notes/files, archived contacts, subscription history | A migration inventory beyond a flat contact export |

## Documented product behaviour that changes the interpretation

### The configured schema matters more than default fields

Infoodle combines fixed contact fields with configurable fields, and default custom fields vary by site setup. Inspect Administration → Custom Fields → People → Manage Fields, plus household and group fields. The mere presence of a field does not establish that staff populate it. [Default Data Fields](https://help.infoodle.com/docs/default-data-fields)

Connections define relationships between two people and can be used for filtering, reports and communication. This makes them a candidate location for sponsorship links, but the documentation does not establish DFNA's model. [Custom Fields: Connections](https://help.infoodle.com/docs/custom-fields-connections)

### Form approval and accounting are separate stages

Approving a financial form does not by itself create a transaction. The documented process requires approval plus an added/reconciled transaction before giving history and receipts show it. Payment due/paid fields distinguish an expected payment from a recorded payment; an unpaid bank-transfer entry can be normal pending staff reconciliation. Financials from a form with multiple contacts are assigned to one contact. Stripe/GoCardless payout reconciliation can create the corresponding transactions. [Process Financial Form Entries](https://help.infoodle.com/docs/process-financial-form-entries)

Auto-approval has configurable identity matching and separate actions for no match, exact match and multiple matches. Explicitly selected workflows run after approval. Inspect each important form's Approval tab rather than assuming all forms follow one process. [Form Auto-Approval](https://help.infoodle.com/docs/form-auto-approval)

### Workflows must be traced from trigger through history

Documented triggers include person creation, group membership changes, person/household field changes, dates and email changes. [Workflow Triggers](https://help.infoodle.com/docs/workflow-triggers)

Steps include sending email/text, changing fields and making email addresses inactive. Email deactivation can affect shared addresses across contacts. A workflow name is insufficient to establish behaviour; record its trigger, conditions, target recipients and actual history. [Workflow Steps](https://help.infoodle.com/docs/workflow-steps)

The official workflow index specifically notes that form processing does not automatically trigger workflows merely through its underlying changes. Check explicit form approval workflow selections. The linked detailed article did not return readable content during this research, so this point is supported by the index summary and the auto-approval instructions above. [Workflows](https://help.infoodle.com/docs/workflows)

### Xero separation is a material constraint

Infoodle documents one Xero organisation connection per Infoodle site. The connection is site-wide, not cluster-specific. Its setup includes contact, account-code and giving-number settings. Inspect the connection and import schedule to understand the actual financial boundary; groups alone do not demonstrate separate accounting connections. [How to connect to Xero](https://help.infoodle.com/docs/how-to-connect-to-xero)

Xero reconciliation and Infoodle donor matching are distinct: even reconciled Xero transactions need association with Infoodle individuals. [Xero](https://help.infoodle.com/docs/xero)

Giving Numbers can combine or split receipts for people in the same household/organisation. Consequently, household structure and giving numbers are financial migration concerns as well as contact organisation. [Adding a Giving Number](https://help.infoodle.com/docs/adding-a-giving-number)

### Recurring notifications do not establish staff follow-up

For Stripe, donor notifications require payment-status updates and a notification toggle enabled on the payment method, plus a correctly configured form email field. Notification templates are shared across the site's Stripe methods. Failed payments are recorded on recurring plans; Stripe owns automatic retry settings. Finance → Recurring Income exposes instalment history and manual payment actions. GoCardless and Ezidebit use different admin notification paths. These capabilities do not prove that DFNA has a staff-owned failure queue or close-out process. [Recurring Payment Notifications](https://help.infoodle.com/docs/recurring-payment-notifications)

### Groups, Mail Types and suppression are different mechanisms

Mail Types support topic-specific unsubscribe choices; the default general type provides only all-communication choice. Subscription/unsubscription workflows may be attached to individual Mail Types. Inspect the configured types and associations before translating group names into subscription rules. [Subscribe & Unsubscribe Workflows](https://help.infoodle.com/docs/subscribe-unsubscribe-workflows-1)

If Mailchimp integration is enabled, its documented inbound unsubscribe handling deactivates matching email addresses in Infoodle. Inbound Mailchimp contacts can be created with only first name, last name and email; mandatory custom fields are not enforced in that path. This is a useful explanation to check for incomplete profiles and unexpectedly broad suppression, not a finding that either occurs at DFNA. [Receiving Data from Mailchimp](https://help.infoodle.com/docs/receiving-data-from-mailchimp)

## Evidence limits and follow-up

- A visible feature/menu proves access, not use; a configured workflow proves configuration, not successful execution.
- One populated record demonstrates a supported case, not complete or consistent data across the database.
- A blank view or inaccessible finance screen can reflect filters or role permissions. Record the limitation rather than declaring the data absent.
- Historical fields, forms and templates can describe superseded processes. Use recent dated examples to separate current practice from legacy records.
- Resolve policy and ownership questions with staff where records cannot establish intent: tax treatment, NZ/GDG handoff, child safeguarding, failure close-out rules and systems used outside Infoodle.
- Preserve evidence as field names, statuses, counts and anonymised relationships; a useful operating model does not require copying donor or child personal details into the repository.

The official [documentation index](https://help.infoodle.com/llms.txt) was used to discover first-party pages. Some indexed articles returned empty shells or fetch errors, so this note only relies on content actually returned or explicitly identifies the narrower index evidence.

# DFNA Infoodle: current information and workflows

Inspected 13 September 2026 in the authenticated DFNA Infoodle site, using Andrew's access in Brave. This is a read-only operational investigation, not a migration export or a test of processing live donations. Configuration, representative records, report definitions and dated history were inspected; no forms, messages, payments or configuration changes were submitted.

Personal contact details, child identities, private message bodies and credentials are omitted. Links require authorised CRM access. Counts are snapshots of the visible views, not audited totals. Current CRM evaluation and acceptance questions belong to [#69](https://github.com/dfn-au/dfn-web/issues/69).

## How to use this reference

**This document records current practice. Finding a field, report, workflow or integration in Infoodle does not make it a requirement or the right design for the new website.** Andrew explicitly confirmed this distinction on 13 September 2026.

Use observations to identify needs, dependencies and questions. Validate the underlying supporter or staff outcome before deciding whether to retain, redesign, replace or retire the existing implementation. Legacy workarounds, unused configuration and historical conventions may be candidates for simplification. CRM capabilities also do not automatically belong in the public website or its launch scope.

Keep three kinds of evidence separate:

- **Current-state evidence:** what is configured, populated or recorded as used, with the limits of the inspection.
- **Validated need:** the outcome staff/supporters need and any confirmed operational constraints.
- **Future decision:** the chosen website behaviour, system ownership and implementation, recorded in its owning GitHub issue, with lasting architectural reasons in an ADR.

This research does not approve an architecture, choose a CRM, override agreed requirements or establish a migration scope. Where an observation challenges a planning assumption, it creates a question to resolve rather than silently replacing that assumption with the legacy design.

## Main findings

1. **Infoodle is a substantial operational system.** It holds contacts and households, student–sponsor links, donor transactions, giving statements, communication history, relationship notes, event response groups and operational reports.
2. **AU and NZ share this instance.** Separation uses several mechanisms: address country, regional groups, country-named subscription and event groups, transaction Locations, country-specific campaigns, account-code records and statement templates. These are not interchangeable.
3. **A live Xero sync is not established.** Xero Status explicitly showed `Is Connected: No`. Transactions are nevertheless current. Historical use of Xero and the present import/reconciliation handoff remain unconfirmed.
4. **Receipting is materially implemented in Infoodle.** Issued receipt history and current giving-statement templates exist. The NZ general template describes a copy of a receipt sent via GDG. The earlier expectation that final receipts are simply generated in Xero needs qualification.
5. **Sponsorship is represented by separate people records linked through a custom Person Link.** It also depends on groups, lookup values, start/end dates, payment-cycle fields and actual update-email history.
6. **Saved reports are configured to identify missing sponsorship payments.** Empty native Recurring Income views do not mean recurring giving is absent. The reports use custom fields and transaction-date criteria; staff execution was not observed.
7. **Staff-led reporting and sending appear more developed than automation.** One active workflow was listed, and no Work Queues were listed. Extensive saved audiences and email templates encode the operating process.
8. **Communication exclusions are operational rules in reports.** Prayer and quarterly subscription groups are populated; their dedicated Mail Types are listed as archived. A sampled dinner report explicitly excludes opt-outs and prior responders.

The sections below distinguish **observed configuration**, **observed use**, and **inference or unresolved ownership**.

## 1. Scale and scope

| Visible view | Snapshot | Interpretation |
| --- | --- | --- |
| People, `Archived = No` | 8,957 results | Includes people/household records, organisations and students; not a count of donors or unique supporters |
| Transaction list, no visible filter chips applied | 70,929 results | Oldest-ID page includes May 2016 gifts; final-ID page includes August/September 2026 gifts. This is not proof of complete financial coverage |
| Active forms | 9 forms | Mixture of published forms, drafts with live prior versions and test/event forms |
| Workflow list | 1 active workflow | `Sydney Dinner Registration`; configuration inspected below |
| Work Queues | No rows | No configured queues visible with this access |
| General Webhooks | 0 of 100 used; 0 sent in 30 days | Does not rule out payment-provider callbacks, API polling or integrations outside this screen |
| Capacity indicator | 90% of band | A capacity signal, not a measured performance issue |

Sources: [People](https://dfna.infoodle.com/peoplelist), [Transactions](https://dfna.infoodle.com/peopletransactionlist), [Forms](https://dfna.infoodle.com/forms), [Workflows](https://dfna.infoodle.com/admin_workflow), [Work Queues](https://dfna.infoodle.com/admin_workqueue), [Webhooks](https://dfna.infoodle.com/admin_webhooks).

## 2. What information is kept

### Contacts, households and relationship history

Observed contact records hold names, salutation/nickname, phone/email, addresses and country, household membership, giving numbers, acquisition source, notes and email history. Organisation/church records also appear in the People list. Household financial defaults include receipt alias, who receives the receipt and one-off versus combined receipting.

The contact fundraising summary exposes lifetime giving, transaction count, average gift, current-year giving, active date range and time since the last transaction. A recent donor's record combined a first-contact note, a subsequently recorded gift and prayer/quarterly email history. The note's acquisition story was richer than the structured `Heard about DFN = Unknown` value: structured and narrative data are not necessarily equally complete.

Email history includes sender, recipient, queued/sent/opened timestamps, visibility, subject and content; household history can be included. Notes distinguish household context, note type, author, timestamp and visibility. Notes and To Dos are available, but a full inventory of outstanding staff tasks was not performed.

Sources: [sample recent donor record](https://dfna.infoodle.com/people?uniqueid=227178), [sample sponsor record](https://dfna.infoodle.com/people?uniqueid=214515), [People list](https://dfna.infoodle.com/peoplelist).

### Configured person fields

The following is the inspected Manage Fields list, including built-in fields shown alongside DFNA custom fields. Field existence does not imply every record is populated.

| Area | Fields and types |
| --- | --- |
| Identity/lifecycle | Archived (Yes/No), Date of Birth, Date of Death, Guardian (Yes/No), Marital Status (lookup), Nick name, Salutation, Occupation (lookup) |
| Acquisition/partnership | Heard about DFN (lookup), Primary Partner Church and Secondary Partner Church (Yes/No) |
| Student/programme | Student Code (text), School (lookup), Jogini Child and Shelter Girl (Yes/No), Edu Scholarship Past/Present (Yes/No), Tertiary Education Sponsor (Yes/No) |
| Sponsorship relationships | Child Supporter (Person Link), Tertiary Student (Person Link) |
| Sponsorship administration | CS Status (lookup), CS Start Date, CS End Date, CS Payment Cycle (lookup), Method of giving (lookup), CS Next Pymt Date |
| Acknowledgement | Date thanked, Thanked by (text) |

Two names conceal mixed meanings:

- **CS Status** includes programme combinations such as Dalit, Jogini, Shelter and education scholarships, plus `Previously a student supporter`. It is not a simple active/cancelled status field.
- **CS Payment Cycle** includes payment frequencies/days, but also `*Follow up`, `On Hold`, `One child on hold`, mixed frequencies and `Unstated`. Payment cadence and operational follow-up state share one field.

These meanings need explicit mappings if the data is migrated or exposed to a new website integration. Do not translate the fields solely by their names. A future model may separate programme, lifecycle status, payment cadence and follow-up state rather than reproduce these mixed lookups.

Sources: [person field definitions](https://dfna.infoodle.com/customfields?function=fields&type=p), [lookup lists](https://dfna.infoodle.com/customfields?function=lookuplists), [CS Status values](https://dfna.infoodle.com/customfields?function=lookuplists&method=VALUES&lookuplistid=30), [saved unpaid sponsorship reports](https://dfna.infoodle.com/report).

### Groups are a major part of the data model

| Group family | What it represents |
| --- | --- |
| Address regions | AU states/cities and NZ regions/cities; unspecified regions also retained |
| Subscriptions | AU/NZ Quarterly Update, DFN Prayer Update, No Campaigns, No Mail/No Email, email-only preference |
| Dinner events | Country, year and city; separate positive-response and `inabilities` groups; virtual dinner interest/response |
| Education/student support | Single/multiple student supporters by country, student records, supported/waiting students, tertiary students/supporters, scholarships |
| Partnership | Primary/secondary partner churches, church champions, partner schools and church attendance affiliations |
| Prayer | Local prayer meetings, online meetings, invitation and pending groups |
| Campaign/finance | EOFY donor cohorts, trusts/foundations, historical fundraiser cohorts |
| Other engagement | Intern interest/completion/mentors, youth challenge, medical/vision trip interest and alumni, professional skills, volunteering, event involvement, committees, key donors, personnel supporters and SafeWill preferences |
| Temporary operational cohorts | Recent student transfers and a new school sponsorship cohort |

Selected counts: AU Quarterly Update 2,811; NZ Quarterly Update 1,157; DFN Prayer Update 1,557; No Mail/No Email 2,571; No Campaigns 219; email-only 134. Student Records showed 688, with 664 in Total Supported Students and 24 waiting. Single-student supporter subgroups showed AU 482/NZ 173; multiple-student supporter subgroups AU 104/NZ 24.

These are group membership counts; parent groups, overlapping memberships, household contacts and student/supporter records make them unsuitable for summing into a unique-person total. Group details preserve member permission, joined/left dates and history. The sampled NZ single-student group had 173 view-only members; that is a group permission label, not proof of each person's login access.

Sources: [active groups](https://dfna.infoodle.com/groups?active), [sample sponsorship group](https://dfna.infoodle.com/groups?active&id=1649).

## 3. Workflows traced

### A. Subscriber intake and manual approval

The live `AU & NZ Subscriber Form (DFN Website)` requests name, email, city/area, optional postal address, acquisition source, monthly prayer-update interest, optional donation amount/designation and card/direct-deposit method. Acquisition choices include church, staff, supporter, events, friend, website, social media and other sources.

Its configuration identifies a staff member for notifications and processing. Auto-approve with no match, auto-approve with an exact match and automatic contact updates were all off. The page explains matching by email or Person Safe ID, and manual processing for multiple matches. No manual-approval workflow entries were displayed for this form.

**Configured path:** submission → staff notification → identity review → contact creation/update and selected data processing. The financial reconciliation step must be treated separately; it was not tested.

Form 2 showed draft version 2 with version 1 still live. The active catalogue had only one response for this form and small counts on other forms. That does not establish how much historical website intake has flowed through this exact form/version or other systems.

Sources: [form configuration](https://dfna.infoodle.com/forms?id=2), [published form](https://dfna.infoodle.com/form_process?g=c444e69b-2a51-4e0b-a746-30d5b25628f2), [form catalogue](https://dfna.infoodle.com/forms). For product mechanics only: [financial form processing](https://help.infoodle.com/docs/process-financial-form-entries).

### B. Donation recording, designation and household receipting

Transactions contain donor/presented-by identity, transaction type, Location, Campaign, Pledge Drive, Account Code, receipt recipient, receipt timing, tax-deductible flag, GST, batch, note, amount and date. Associated-item tabs include transactions, events, memberships and stock; the sampled gift had no associated split items. Split-gift capability was not exercised or proven through a populated example.

A recent NZ transaction had `Location = New Zealand`, a project account code, household/combined receipting and tax deductibility recorded. Its batch contained three gifts and was created by a named staff user. This demonstrates batching and staff provenance, but does not identify whether the records were manually keyed, imported or sourced from another system.

Account-code records cover child sponsorship, scholarships, schools, health/nutrition, economic empowerment, operations, village/shelter programmes, Christmas appeals and where-most-needed gifts, plus accounting/control codes. **The text code is not a unique key:** separate AU and NZ sponsorship records both display `230`; `803` also appears on distinct records. Preserve internal IDs and context.

Campaigns are populated with transaction counts and totals. They include AU/NZ Hope Dinners, country EOFY campaigns, Christmas appeals, International Women's Day and Just Walk. Campaign attribution and project designation are separate from the donor's acquisition source.

Sources: [sample NZ transaction](https://dfna.infoodle.com/peopletransaction_view?id=77103), [its batch](https://dfna.infoodle.com/batch_view?batch_id=13690), [batch audit](https://dfna.infoodle.com/modern_audittrail?entity=TransactionsBatch&uniqueid=13690), [Account Codes](https://dfna.infoodle.com/admin_accountcodes), [Campaigns](https://dfna.infoodle.com/admin_campaigns).

### C. Giving statements and receipt communication

Receipt generation supports date range, combined/one-off, deductibility, transaction type, batch, group, location and individual filtering. Historical transactions are marked receipted/locked. The printed-receipt view contained NZ receipt records under its existing filter; the displayed creation dates included April/August 2025 and July 2024. These were historical results, not a count of all receipts or proof of the current year's completion.

Current templates listed:

- AU 2026 Giving Statement, including a hard-copy letter variant.
- DFN NZ 2026 Giving Statement.
- DFN NZ Education Trust Board 2026 Giving Statement, including a trusts variant.

The AU template includes the entity's ABN, tax-deductibility wording, item details and a receipt total. The NZ general template identifies the NZ Charitable Trust and says the receipt copy is sent via Global Development Group. Email template names distinguish AU tax receipt, NZ Education Trust, GDG and combined variants. A sampled NZ sponsor's email history contains a sent 2026 giving-statement communication.

**Observed path:** stored transactions/household defaults → filtered giving-statement/receipt preparation → country/entity template → recorded email or print history. Exactly who produces each legally final document, how GDG supplies it and how Xero participates still needs finance confirmation. The template wording is evidence of the configured process, not a legal assessment.

Sources: [receipt generation](https://dfna.infoodle.com/admin_donationreceipts), [printed history](https://dfna.infoodle.com/printed_receipts), [template catalogue](https://dfna.infoodle.com/finance_template), [AU template](https://dfna.infoodle.com/finance_template?function=edit/128), [NZ template](https://dfna.infoodle.com/finance_template?function=edit/136), [sponsor email history](https://dfna.infoodle.com/people?uniqueid=214515).

### D. Student sponsorship and updates

A populated sponsor record had acquisition source, start date, programme status, a monthly payment day, giving method, giving number and transaction history. Following its displayed relationship led to a distinct student record containing student code, school, an India household/address context and a `Child Supporter` link back to the sponsor. The student held no donation balance in the sampled case; the donor history belonged to the sponsor.

Groups distinguish waiting/supported students, single/multiple supporters, AU/NZ supporters and temporary transfer cohorts. Actual sponsor email history contains a child-sponsorship update sent in March 2026. Template names include AU/NZ sponsorship portal updates in March/September, transferred-student messages and scholarship updates.

**Observed components:** student record ↔ sponsor Person Link; sponsorship fields and cohort membership; sponsor-side giving; update templates and send history. **Inferred operating sequence:** allocate/link student → maintain sponsor/payment fields and groups → monitor giving → send updates → adjust links/groups when a student or sponsor changes. Allocation approvals, concurrent reservations, historic link preservation and portal operation were not proven.

There is also a DFNA-specific `DFNA - Child sponsors` report. Its country selector offers Australia, NZ and records not connected to a household. Generated output joins child number/name to sponsor name, household and postal address; Excel output is offered. This is a specialised output whose users and purpose should be validated before deciding whether to retain, replace or retire it.

Sources: [sample sponsor and linked student](https://dfna.infoodle.com/people?uniqueid=214515), [groups](https://dfna.infoodle.com/groups?active), [special report](https://dfna.infoodle.com/report), [email template catalogue](https://dfna.infoodle.com/contact#emailtemplates).

### E. Missing sponsorship payment follow-up

Saved reports include AU/NZ variants of `Monthly CS not paid`, `Annual etc CS not paid` and `CS On Hold`, plus monthly sponsorship pivot reports. These provide strong configuration evidence of a staff review process despite empty native recurring-income views.

The inspected AU monthly report combines payment-cycle choices with `CS Status is set`, address country Australia, the AU sponsorship account-code record and `No transactions` date criteria. Its saved dates were **1 July 2026 and 12 August 2026**. These are explicit dates, not an automatically rolling window. Its payment-cycle choices include `Unstated` and `*Follow up` alongside monthly days.

**Inferred operating sequence:** staff run/maintain a country-specific missing-gift report → review donor/payment history → follow up → maintain fields/notes. Actual review frequency, task assignment, retry ownership, partial-payment handling and close-out practice remain unverified. A missing recorded transaction is not necessarily a declined card: payment-provider failure and incomplete reconciliation are different explanations.

Sources: [Global reports → Finance: AU Monthly CS not paid and related reports](https://dfna.infoodle.com/report), [Recurring Income planned](https://dfna.infoodle.com/recurring_income), [Recurring Income history](https://dfna.infoodle.com/recurring_income?function=history), [Work Queues](https://dfna.infoodle.com/admin_workqueue).

### F. Event invitations, responses and follow-up

The saved Sydney dinner invitation report includes Sydney and nearby/unspecified NSW region groups. It explicitly excludes `No Mail, No Email`, Sydney positive responses, Sydney `inabilities`, people who do not drive/go out at night and virtual AU dinner respondents.

This establishes an important rule: **the invitation report excludes people recorded in response groups**. How responses update those groups remains unverified. Separate templates cover save-the-date, approaching RSVP deadline, last chance, day-of reminder and thank-you messages. Similar report/template families exist for AU/NZ cities and SMS campaigns.

The only listed workflow, `Sydney Dinner Registration`, is active. It can be triggered manually from a person/form approval screen or optionally when a person is added, with the latter defaulting to `Dont Action`. Steps add the person to `Sydney Hope Dinner 2026` as view-only and then send an email to the affected person. The email-template control showed no readable selected template, so successful delivery is not established. No workflow was executed.

Group member history and attendance controls exist, but ticket inventory, paid registration, seating, dietary details, check-in and the meaning of membership versus actual attendance were not traced end to end. Small-response native event forms alone do not establish ownership of all dinner bookings.

Sources: [saved dinner reports](https://dfna.infoodle.com/report), [2026 groups](https://dfna.infoodle.com/groups?active), [workflow definition](https://dfna.infoodle.com/admin_workflow?edit-workflow=1), [forms](https://dfna.infoodle.com/forms).

### G. Communications and preferences

Staff email can target an individual, group, filtered group or saved report. The composer offers household consolidation and duplicate-email removal, and Basic, Designer, Mailchimp and Template starting points. The template library spans country-specific campaigns, dinner sequences, prayer meetings/updates, quarterly updates, sponsorship, annual reports and receipt communication.

Actual contact history proves recent prayer, quarterly and sponsorship messages were sent through Infoodle. It does not prove these are automated journeys. The current user's Sent & Scheduled page is visibility-scoped and must not be treated as an organisation-wide send count.

`General Communications` is the active Mail Type shown. `Monthly Prayer Update`, `Quarterly Report` and `Prayer Meeting Reminder` are listed as archived; the prayer type's archived flag was independently checked and was Yes. Corresponding subscription groups remain populated, and saved reports explicitly apply group exclusions.

**Interpretation:** groups/reports are central to current audience selection. Do not migrate a group membership as though it contained complete consent evidence. The sampled profiles showed no contact-confirmation data, while a signup form has a prayer checkbox. Timestamped consent wording, topic-specific unsubscribe propagation and prayer-recipient vetting need separate verification.

Sources: [email workspace](https://dfna.infoodle.com/contact#email), [Mail Types](https://dfna.infoodle.com/admin_mailtypes), [prayer Mail Type](https://dfna.infoodle.com/admin_mailtypes?function=edit&item=4), [reports](https://dfna.infoodle.com/report), [groups](https://dfna.infoodle.com/groups?active).

## 4. Integrations, permissions and data maintenance

| Area | Observed state | Limit |
| --- | --- | --- |
| Xero | Status says not connected; organisation and last-success details blank | Does not show whether Xero was historically connected or is used separately today |
| Payment methods | Connected Stripe card method for DFN Australia in AUD; AU and NZ direct-credit methods | No separate NZ card method listed here; external NZ payment facilities remain possible |
| Mailchimp | Existing configuration and a named list; displayed counts last updated January 2022; list offers `Connect` | Do not treat stale cached counts as current audience totals or assume active synchronisation |
| General Webhooks | None configured | API use and provider-specific callbacks remain outside this conclusion |
| Roles | Contacting Infoodle Groups (5 members), Administrator Access (2), Full Infoodle Access (9) | Role descriptions show email-only intent versus database/receipting management; detailed effective access and country isolation were not tested |
| Duplicate matching | First name, last name and email selected; 85% threshold; archived contacts excluded; no automatic scan scheduled | No scan or merge executed; no estimate of duplicate prevalence |

The Mailchimp settings themselves warn that inbound unsubscribes/deletions can unsubscribe the matching email in Infoodle while connected. Whether that legacy integration should remain enabled requires confirmation of actual use, not an assumption based on the old list.

Sources: [Xero setup through Configuration → Xero Setup → Status](https://dfna.infoodle.com/admin_xero), [Payment Methods](https://dfna.infoodle.com/admin_paymentmethods), [System → Mailchimp](https://dfna.infoodle.com/admin_system), [Webhooks](https://dfna.infoodle.com/admin_webhooks), [Roles](https://dfna.infoodle.com/admin_roles), [duplicate scan](https://dfna.infoodle.com/duplicate_scan), [matching settings](https://dfna.infoodle.com/admin_duplicate_matching).

## Limits of inspection

This is a dated baseline, not a migration specification. Configuration and representative history were inspected; complete workflow execution and data quality were not verified. Current evaluation and proof requirements belong to [#69](https://github.com/dfn-au/dfn-web/issues/69).

| Area | Coverage at inspection | Not verified |
| --- | --- | --- |
| Payment → CRM → receipt | Recent transactions, batch provenance, receipt history, templates and integration status inspected | End-to-end AU/NZ cases, original payment/import source, reconciliation, final-document ownership, corrections and refunds |
| Sponsorship lifecycle | Linked student/sponsor example, fields, cohorts, saved reports and update-send history | Allocation, multiple students/sponsors, reassignment, cancellation, missed-payment handling and preservation of previous relationships |
| Files and student updates | Limited coverage; update history and portal references seen | Locations and ownership of photos, letters, attachments and school updates; matching to recipients; whether the portal remains in use |
| Consent and suppression | Subscription/exclusion groups, Mail Types, form settings and sampled audience criteria | A signup and opt-out traced across relevant groups, sending systems and approval steps; consent provenance and consistent enforcement |
| External integrations | Visible payment methods, Xero/Mailchimp status and general webhook settings | API clients, scheduled imports, external forms/payment systems, matching keys, error handling and operational owners |
| Data quality and access | Representative records, matching settings and role summaries | A broader sample of duplicates, missing/conflicting values, historical/archived records, effective permissions and country boundaries |

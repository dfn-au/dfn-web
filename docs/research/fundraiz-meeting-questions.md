# Fundraiz meeting questions

Reviewed 15 October 2026. Answers record vendor statements, not tested results. The [automatic transcript](fundraiz-call-transcript.txt) may contain errors; links point to the relevant lines.

1. What would DFN gain by moving to Fundraiz that we couldn't reasonably achieve by improving our Infoodle setup? Which benefits would justify the disruption of switching, and what would we give up?

   Response: Consolidation and AI personalisation are the proposed benefits. No evidence established an advantage over improving Infoodle; the retention/fundraising uplift claims were unsupported. [00:08:08](fundraiz-call-transcript.txt#L117), [00:14:47](fundraiz-call-transcript.txt#L206).

2. How would you run our existing child sponsorship programme? We need links between sponsors and students, payment expectations, reassignment history, and updates sent to the right sponsors with a record of what was sent. Can you show that workflow in the current product?

   Response: Vendor-built child records and sponsor relationships during onboarding. Reassignment, payment expectations and update delivery were not demonstrated; no comparable sponsorship customer identified. [01:16:35](fundraiz-call-transcript.txt#L946), [01:41:18](fundraiz-call-transcript.txt#L1147).

3. How would you configure our shared AU/NZ CRM while preserving separate payments, receipts, communications and reporting? What limitations would we face, including if we later separated the two operations?

   Response: Enterprise parent with separate AU/NZ entities, one login, separate campaigns and combined reporting. Account connections, access, consent and future separation still need testing. [01:19:28](fundraiz-call-transcript.txt#L968).

4. How would you represent a household whose members share an email address but have different giving histories and communication preferences? Show how new donations or event registrations match to the right person, how staff resolve ambiguous matches, and how household statements work.

   Response: Household/business relationships supported. Records meeting a 95% match threshold merge automatically; confirm this can be disabled. Shared-email handling, joint statements and undo remain open. [00:11:39](fundraiz-call-transcript.txt#L171), [00:18:51](fundraiz-call-transcript.txt#L271).

5. How would our finance team reconcile giving with Xero and produce accurate AU/NZ statements? Please use a gift split between two purposes with different tax treatment, including an offline payment or refund. Where would manual work remain, and how would responsibility for official receipts be assigned?

   Response: Payment batches go to Xero; tax-filtered statements are available. Donor-initiated bank transfers use reconciliation plus monthly-giver tags/reports. Split gifts, refunds, receipt ownership and exact matching remain unproven. [00:50:17](fundraiz-call-transcript.txt#L741), [00:54:17](fundraiz-call-transcript.txt#L776).

6. If we use our own website checkout with Stripe, what would work automatically and what would we need to build or maintain? We need subscription renewals, refunds and failed payments reflected correctly, with unresolved failures assigned to staff. Which capabilities depend on using Fundraiz's own forms?

   Response: No BYO Stripe checkout within Fundraiz; widgets are the stated website approach. External Stripe-to-CRM API ingestion was not answered. Failure emails/retries were described for Fundraiz-managed payments only. [00:32:43](fundraiz-call-transcript.txt#L523), [00:34:03](fundraiz-call-transcript.txt#L561), [00:52:51](fundraiz-call-transcript.txt#L765), [01:06:22](fundraiz-call-transcript.txt#L874).

7. How would staff manage preferences and automated communications across AU and NZ? Show someone opting out of one type of update while retaining another, including a sequence already in progress. Prayer updates also require staff approval of the recipient, separately from their interest in subscribing.

   Response: Supporters can select publications/products. Topic/entity suppression, active journeys, consent history and prayer vetting were not established. [01:24:13](fundraiz-call-transcript.txt#L1005).

8. How easily could our staff answer operational questions and act on the results? For example: which sponsors are missing payments or updates, and which donors haven't given for 12 months, excluding active sponsors and recurring donors? Show how staff build the audience, follow up and see the history.

   Response: Custom segmentation/reports and monthly-giver missing-payment reports were described. Our exact sponsorship and lapsed-donor rules still need a staff-run test. [00:50:17](fundraiz-call-transcript.txt#L741), [01:12:41](fundraiz-call-transcript.txt#L917).

9. If we retain Humanitix or another ticketing platform, how would repeated event attendance appear alongside a supporter's giving and communications? What would be needed to keep purchasers, guests, cancellations and attendance accurate, without treating ticket sales as donations or registration as marketing consent?

   Response: Humanitix API integration was described as possible, with missing access handled through support. No working connector, data model or implementation commitment was established. [01:09:13](fundraiz-call-transcript.txt#L889).

10. Which fundraising tasks could move from Microsoft 365 into Fundraiz, and what would we still need Microsoft for? Your catalogue lists Outlook, Teams and Excel; what does that connection actually sync or automate, and what manual work remains?

   Response: Documents, attachments, tasks and approvals could replace some Microsoft workflows. Microsoft sign-in was unavailable; Outlook/Teams/Excel sync was unexplained. Printed letters still use an export. [00:10:16](fundraiz-call-transcript.txt#L146), [01:11:53](fundraiz-call-transcript.txt#L911), [01:26:01](fundraiz-call-transcript.txt#L1019).

11. Looking at those workflows together, what would your proposed DFN setup consist of? Identify what works today, needs configuration, or depends on custom development, another tool or a future release. For missing integrations, who would build, test and maintain them, and what can our staff or developer maintain independently?

   Response: Staff edit widgets/templates; system-field changes require vendor tickets. Most small changes reportedly take 48 hours free; substantial work costs extra. An earlier claim of user-created custom fields needs clarification. [00:20:42](fundraiz-call-transcript.txt#L288), [01:37:08](fundraiz-call-transcript.txt#L1112).

12. What do customers most commonly struggle with after going live, and which of those problems would you expect DFN to face? Give examples of workarounds or ongoing manual work, what caused them, and what you changed in response.

   Response: Not directly answered. Carlos acknowledged variable support responsiveness and ongoing customisation for a customer five months after onboarding. Ask the reference customer about workload and workarounds. [01:42:43](fundraiz-call-transcript.txt#L1159).

13. What could we test before committing to establish that this is a better fit for DFN? Can we agree a supported evaluation of our key workflows and speak with a comparable AU/NZ customer? If AI contributes materially to the case for switching, how would we test its additional benefit with our data?

   Response: Separate 72-hour trials and a CMAA reference introduction were offered. No configured pre-commitment evaluation or AI-benefit test was agreed; field customisation was described as post-decision work. [01:27:28](fundraiz-call-transcript.txt#L1031), [01:30:52](fundraiz-call-transcript.txt#L1061), [01:42:43](fundraiz-call-transcript.txt#L1159).

14. Your plans include migration assistance. For our roughly 9,000 Infoodle records and 71,000 transactions, who would actually extract, clean, map, import and validate the data, and how much DFN time would it take? What would be lost? We need sponsorship links, giving allocations, preferences and communication history preserved, a workable changeover, and a complete export afterwards.

   Response: Self-service imports after vendor field setup; complex mapping involves their team. Survey sets the rollout plan/fee. Responsibilities, preserved history, validation, cutover and export remain open. Clarify the claim that cancellation wipes trial data. [01:30:46](fundraiz-call-transcript.txt#L1060), [01:31:33](fundraiz-call-transcript.txt#L1067).

15. How would the proposed setup protect private child records, donor notes and financial information, including access through reports, exports and AI features? Your public pages differ on whether SOC 2 assurance is complete; what evidence and contractual commitments can you provide for security and data recovery?

   Response: Permissions, SOC 2 and recovery remain unproven. Statements about learning from fundraising/email results need reconciling with the previously documented no-client-data-training policy; they do not establish a breach. [00:15:51](fundraiz-call-transcript.txt#L219), [00:27:08](fundraiz-call-transcript.txt#L393).

16. Your site advertises 24/7 support, but also lists weekday phone hours and a typical enquiry response within 24 hours. For our plan, what happens if donations stop syncing or a campaign cannot send? Who owns the incident, how do we escalate it, and what urgent response and after-hours coverage would you commit to?

   Response: No incident SLA, escalation or after-hours commitment. The 48-hour estimate concerned small changes; Carlos acknowledged inconsistent responsiveness. [01:37:34](fundraiz-call-transcript.txt#L1116), [01:43:31](fundraiz-call-transcript.txt#L1165).

17. Which improvements are actually in development for the next 6–12 months, and which are still ideas? How do customer requests affect priorities? Please give a recent example of a customer-requested feature that shipped, and identify any DFN requirement we would be waiting for.

   Response: Volunteer management announced for 1 October; broader website integration was future work. Neither delivery nor a prioritisation process was confirmed. Requests go through tickets. [00:11:04](fundraiz-call-transcript.txt#L167), [01:07:05](fundraiz-call-transcript.txt#L880), [01:37:08](fundraiz-call-transcript.txt#L1112).

18. If the evaluation establishes fit, what is the full setup and ongoing cost, including migration, custom integrations and their maintenance, payment-related charges and support? For email and optional SMS campaigns, specify included allowances, AU/NZ usage rates, how SMS length affects billing, and any provider charges or markups. Confirm currency, taxes, limits and contract commitments.

   Response: Verbal terms: unlimited AI; 250,000 emails/month, +$99 for unlimited; SMS number rental/credits. Onboarding says both $3,000–$8,000 and a $20,000 cap: clarify. Major custom work costs extra. Donor tip opt-out deducts fees from gifts. Currency, tax, subscription and usage rates need a quote. [00:31:23](fundraiz-call-transcript.txt#L486), [00:55:57](fundraiz-call-transcript.txt#L789), [00:58:19](fundraiz-call-transcript.txt#L809), [01:33:57](fundraiz-call-transcript.txt#L1087), [01:37:39](fundraiz-call-transcript.txt#L1117).



   More questions:

   * Bugs and feature requests. what's the turnaround time?
   * AI insights: are they opaque or there an explanation for numbers and recommendations? A: It gives the reasons why - surfaces the underlying signals.
   * Are the models LLMs or specialized narrow-domain models?
   * Can you give examples of AI recommendations the platform has made and how you validated?
   * Tasks - is this meant to be just CRM tasks? Where do we draw the line on what to use these tasks for?
   * Grants... what does this have to do with the CRM? A: It'll utilise the data in the CRM to assess and apply for the grant.
   * Forms/surveys: what does the integration look like for the website?

* what things are paid extras on top of monthly subs - e.g. prospect research? A: only emails/SMS.
* want to better understand direct deposit. need to be very clear on the process. how do we reconcile payments?
* can we set the tip thresholds? like if we want exactly 1.7% to cover the fees? otherwise it feels a bit cheeky just saying "give us 10%" to cover fees that are actually only 1.7%.
* SMS messaging - do you have whatsapp integration?

Feature idea: impact score for meetings based on LLM interpretation of subjective descriptions.
   * Documents: why bother putting documents in fundraiz? Can send the documents to donors? A: One ecosystem. don't have to work in multiple platforms. Can organise docus under donors.



## Additional answers from the call

- AI: explanations and prediction history claimed; accuracy unvalidated. Proprietary models/unlimited use claimed; model types unclear. [00:17:06](fundraiz-call-transcript.txt#L235), [00:58:19](fundraiz-call-transcript.txt#L809).
- Tasks/grants: team projects, approvals and contact follow-up; grants use CRM data for applications and milestones. [00:00:04](fundraiz-call-transcript.txt#L7), [00:01:55](fundraiz-call-transcript.txt#L25).
- Email delivery: domain authentication described, but no demonstrated advantage over our existing setup. [00:23:42](fundraiz-call-transcript.txt#L329).
- Website forms: widgets supported; fully custom API-driven flows unresolved. [01:06:22](fundraiz-call-transcript.txt#L874).
- WhatsApp: unanswered. Only SMS was described. [00:55:57](fundraiz-call-transcript.txt#L789).
- Tips: donor opt-out confirmed; organisation-level removal, exact percentage and wording controls unanswered. [00:30:44](fundraiz-call-transcript.txt#L467).

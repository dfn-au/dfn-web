# Transactional Notification Research

This file preserves the original transactional-email scoring and transactional/supporter-email coverage findings. No provider choice is decided by this research.

<!-- original-adr-001-lines: 202-209 -->

| Email candidate | Score | Assessment |
| --- | ---: | --- |
| Postmark | 9.0 | Best default for transactional email, templates, message streams, and delivery/bounce webhooks. |
| Resend | 8.2 | Strong TypeScript/Next.js-friendly alternative with API sends, webhooks, domains, and idempotency keys. |
| SendGrid | 7.6 | Mature API/templates/webhooks option, but broader and heavier than needed for launch transactional sends. |
| Mailgun | 7.0 | Solid API/templates/webhooks option, but less compelling than Postmark for transactional-first ergonomics. |
| Amazon SES | 6.4 | Cost-effective and powerful, but operationally heavier for deliverability, templates, and event plumbing. |


<!-- original-adr-001-lines: 291-299 -->

### Transactional Email and Supporter Email Coverage

| Contender or decision | Coverage note |
| --- | --- |
| Brevo / Mailchimp Transactional / MailerSend / SparkPost / Mailjet | Checked transactional API contenders alongside Postmark, Resend, SendGrid, Mailgun, and SES. |
| Stripe receipts and customer emails | Not a dedicated transactional provider, but must be considered in the receipt-ownership decision for payments and subscriptions. |
| React Email / MJML / provider-hosted templates | Template ownership is a separate decision from provider selection and should remain behind the notification adapter. |
| Mailchimp / Campaign Monitor / Brevo / ActiveCampaign / HubSpot | Bulk supporter/newsletter email remains outside the website, but these should be named as likely external list-sync or export destinations once DFN's existing tool is known. |


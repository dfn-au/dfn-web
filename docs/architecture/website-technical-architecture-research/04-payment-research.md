# Payment Research

This file preserves the original payment scoring, the combined payment/email source list, and payment, fundraising, sponsorship, and event-ticketing coverage findings. No provider choice is decided by this research.

<!-- original-adr-001-lines: 190-201 -->

### Payments and Transactional Email

| Payment candidate | Score | Assessment |
| --- | ---: | --- |
| Stripe | 9.5 | Best fit for Checkout, Payment Element, recurring billing, Customer Portal, signed webhooks, idempotency, and AU availability. |
| PayPal/Braintree | 7.0 | Viable payments/subscriptions alternative, but less clean as the primary integration for DFN's app-owned operational state. |
| Raisely | 6.7 | Strong fundraising-specific product, but shifts more giving workflow ownership into a specialist platform. |
| GoCardless | 6.2 | Strong bank debit/direct debit option, but narrower payment-method fit than Stripe for launch. |
| Square | 5.8 | Good payments platform, but weaker fit for recurring giving and website-owned workflow state. |
| Funraise | 5.8 | Fundraising platform alternative, but would be a broader product decision rather than a simple payment processor swap. |
| Givebutter | 5.4 | Donation/events product alternative, but country/platform constraints make it a weaker default for DFN. |


<!-- original-adr-001-lines: 210-211 -->

Primary sources checked: [Stripe Checkout](https://docs.stripe.com/payments/checkout), [Stripe Payment Element](https://docs.stripe.com/payments/payment-element), [Stripe Customer Portal](https://docs.stripe.com/billing/subscriptions/integrating-customer-portal), [Stripe webhooks](https://docs.stripe.com/webhooks), [Stripe webhook signatures](https://docs.stripe.com/webhooks/signature), [Stripe idempotency](https://docs.stripe.com/api/idempotent_requests), [Stripe Australia](https://stripe.com/au/global), [Braintree Hosted Fields](https://developer.paypal.com/braintree/docs/start/hosted-fields/), [Braintree recurring billing](https://developer.paypal.com/braintree/articles/guides/recurring-billing/overview), [Braintree webhooks](https://developer.paypal.com/braintree/docs/reference/general/webhooks/overview/), [Square Web Payments SDK](https://developer.squareup.com/docs/api/paymentform), [Square Subscriptions API](https://developer.squareup.com/docs/subscriptions-api/walkthrough/), [GoCardless API](https://developer.gocardless.com/api-reference), [GoCardless webhooks](https://developer.gocardless.com/getting-started/stay-up-to-date-with-webhooks-v2), [Raisely embed donation form](https://support.raisely.com/article/237-embed-donation-form), [Raisely regular donations](https://support.raisely.com/article/541-managing-regular-donations-donors), [Raisely webhooks](https://developers.raisely.com/docs/about-webhooks), [Givebutter countries and currencies](https://help.givebutter.com/en/articles/1726542-supported-countries-and-currencies-on-givebutter), [Givebutter recurring plans](https://help.givebutter.com/en/articles/3216251-how-to-enable-and-manage-recurring-plans), [Funraise subscriptions](https://help.funraise.io/en/articles/2985924-subscriptions-101/), [Funraise webhooks](https://help.funraise.io/en/articles/4471107-webhooks), [Postmark send API](https://postmarkapp.com/developer/user-guide/send-email-with-api), [Postmark templates API](https://postmarkapp.com/developer/api/templates-api), [Postmark webhooks API](https://postmarkapp.com/developer/api/webhooks-api), [Postmark message streams](https://postmarkapp.com/support/article/how-to-create-and-send-through-message-streams), [Resend API](https://resend.com/docs/api-reference/introduction), [Resend batch emails](https://resend.com/docs/api-reference/emails/send-batch-emails), [Resend webhooks](https://resend.com/docs/dashboard/webhooks), [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys), [SendGrid Mail Send](https://www.twilio.com/docs/sendgrid/api-reference/mail-send), [SendGrid dynamic templates](https://www.twilio.com/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates), [SendGrid Event Webhook](https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview), [Mailgun messages API](https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages), [Mailgun templates](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/send-templates), [Mailgun webhooks](https://documentation.mailgun.com/docs/mailgun/user-manual/webhooks/webhooks), [Amazon SES API sends](https://docs.aws.amazon.com/ses/latest/dg/send-email-api.html), [Amazon SES event destinations](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_EventDestination.html).


<!-- original-adr-001-lines: 280-290 -->

### Payments, Donations, Sponsorship, and Event Ticketing Coverage

| Subcategory | Missing or under-covered contenders | Coverage note |
| --- | --- | --- |
| Payment processors | PayPal Donate/Giving Fund, Adyen, Airwallex, Pin Payments, Westpac PayWay/QuickStream, Checkout.com | Stripe remains the default candidate, but processor coverage should acknowledge AU/NZ banking and merchant-account alternatives. |
| Nonprofit fundraising platforms | Donorbox, Fundraise Up, GiveNow, Chuffed, GoFundMe Pro/Classy, Engaging Networks | Donorbox, Fundraise Up, Raisely, Funraise, and GiveNow deserve deeper research because they can own donation forms, recurring giving, campaigns, donor records, reporting, and integrations. |
| Event ticketing platforms | Humanitix, TryBooking, Eventbrite, Ticket Tailor | Humanitix and TryBooking deserve deeper research because the event PRD leaves event registration system of record, exports, manual/complimentary registrations, and attendee operations open. |
| WordPress plugin baseline | GiveWP, Charitable, WooCommerce Subscriptions, Event Tickets Plus / The Events Calendar | Add enough detail to make the WordPress/WooCommerce baseline fair rather than treating WooCommerce alone as the whole baseline. |
| Donor CRM / system of record | Salesforce Nonprofit Cloud, Blackbaud Raiser's Edge NXT, Bloomerang | Name as possible external systems, but do not deep-research unless DFN already uses or is choosing a CRM/fundraising system. |
| Givebutter | Already checked; likely safe to exclude deeply for DFN AU/NZ if US banking, US identity, or USD processing constraints remain material. |


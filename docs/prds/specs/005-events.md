# PRD: DFN Event Discovery and Ticketing

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a PRD/epic spec. It is not intended to be implemented directly. Use it to create focused GitHub decision issues and thin vertical implementation issues for event discovery, event setup, registration, payment, exports, and event operations.

## Problem Statement

DFN needs the rebuilt websites to support DFN-run public events, including event discovery, registration, payment, attendee data capture, confirmations, and operational reporting.

The current site includes event pages with multiple venues, RSVP dates, age warnings, ticket purchase forms, guest details, dietary requirements, dietary surcharges, seating comments, payment details, sold-out labels, and donate-instead CTAs. The rebuild must preserve core event workflows while leaving deeper operational decisions open.

## Solution

Create event workflows for DFN-run public events that support event series with one or more sessions/venues, paid tickets, free RSVPs, configurable ticket prices, purchaser and guest details, dietary/seating capture when required, branded payment, confirmations, exports, and staff event publishing/preview.

This is not intended to be a full conference platform. Waitlists and website-based attendee email campaigns are out of scope for launch.

## User Stories

1. As a visitor, I want to discover current DFN events, so that I can decide whether to attend.
2. As an attendee, I want to view event dates, locations, suitability notes, RSVP dates, and prices, so that I can choose the right event.
3. As an attendee, I want to register for a physical event, so that my seat is reserved.
4. As an attendee, I want to register for a virtual/livestream event when available, so that I can attend remotely.
5. As an attendee, I want to buy paid tickets on a branded DFN page, so that payment feels trustworthy.
6. As an attendee, I want to RSVP for a free event when applicable, so that DFN knows I am coming.
7. As a purchaser, I want to register multiple guests, so that I can bring friends, family, or a group.
8. As a purchaser, I want to provide guest names and emails when required, so that DFN has the right attendee information.
9. As a purchaser, I want to provide dietary requirements and allergy details, so that guests can be catered for safely.
10. As a purchaser, I want to provide seating or group requests, so that DFN can try to seat people appropriately.
11. As a purchaser, I want to receive a confirmation page and email, so that I know the registration was received.
12. As a visitor who cannot attend, I want an event-specific donate CTA, so that I can still support the purpose.
13. As DFN staff, I want to publish event series with multiple sessions/venues, so that events like Hope Dinners can be managed coherently.
14. As DFN staff, I want to set prices, RSVP cutoffs, suitability notes, registration status, and sold-out/closed messaging, so that event pages reflect operational reality.
15. As DFN staff, I want registration exports with purchaser, guest, session, payment, dietary, seating, and referral details, so that events can be run effectively.
16. As DFN staff, I want sensitive dietary/allergy details removed, hidden, or archived after operational use, so that unnecessary sensitive data is not retained.
17. As DFN staff, I want manual/complimentary/offline registrations supported somewhere in the operational workflow, so that hosts, speakers, volunteers, sponsors, and offline-paid guests can be handled.
## Implementation Decisions

- Events cover DFN-run public events only for launch.
- Events are country-specific by default.
- A genuinely shared virtual or cross-country event may be published to both domains, but physical events should normally be Australia-only or New Zealand-only.
- Third-party/community fundraiser activity belongs under supporter/community campaigns, not event ticketing.
- Event functionality should support DFN-run public events broadly, not only dinner-style events.
- Event pages should support multiple sessions/venues under one event campaign.
- Events should support paid ticketing and free RSVP registrations.
- Events should support physical and virtual/livestream sessions.
- Events should support multiple ticket types/prices.
- Event tickets are not donations by default.
- Event payment should occur inside branded DFN pages where possible.
- Event payment, registration, confirmation, notification, and export records should carry site attribution.
- Event registrations should collect purchaser details plus per-guest details when food, seating, or guest-specific information is required.
- Event records should support exportable operational check-in lists and attendance status where the chosen event system of record supports final attendance capture.
- Dietary requirements should support preset options, free-text allergy details, and optional dietary surcharges.
- Sensitive dietary/allergy details should be removable, hidden, or archived after operational use while retaining necessary historical registration/payment records.
- Seating/group/table requests should be supported as optional free text for launch.
- Event pages should support attendee suitability warnings, including age suitability.
- Event waitlists are out of scope for launch.
- Event sessions/venues should support optional capacity and a sold-out state, pending confirmation of exact current-site behaviour.
- Event sessions/venues should support RSVP cutoff date/time.
- Ticket quantity limits should match current-site behaviour for launch.
- Event pages should show cancellation/refund policy text, even if refunds are handled manually.
- Event pages should support "can't attend, donate instead" CTAs tied to a specific campaign/purpose.
- Event registration should support confirmation pages and emails.
- Internal notifications are required.
- Event data should be reportable/exportable, including registrations and dietary requirements, though the system of record is TBD.
- Event exports should include site, purchaser, guests, session/venue, tickets, payment status, dietary details, seating requests, referral source, and check-in/attendance fields where available.
- Manual/complimentary/offline registrations are operationally required, but whether the website must support creating them depends on the event registration system of record.
- Staff event attendee communications are operationally required, but sending emails from the website is out of scope for launch; export/integration is sufficient.
- Staff should be able to publish events and preview event pages before publishing.

## Testing Decisions

- Test event discovery through active, upcoming, sold-out/closed, and past/archived states on each domain once final IA is known.
- Test paid registration by selecting a site-scoped session, ticket quantity/type, guest details, dietary details, seating request, payment, confirmation page, and confirmation email.
- Test free RSVP registration without payment.
- Test event-specific donation fallback as a separate giving CTA, not as ticket donation treatment.
- Test staff event setup by creating and previewing an event series with multiple sessions.
- Test exports for site, purchaser, guest, session, payment, dietary, seating, referral, and check-in/attendance fields where available.
- Test sensitive data retention behaviour once final retention policy is defined.

## Out of Scope

- Third-party/community fundraiser events as event ticketing.
- Full conference platform.
- Waitlists for launch.
- Website-based event attendee email campaigns.
- Refund automation.
- QR scanning or live check-in app.
- Treating event tickets as donations by default.

## Current-Site Observations

- Current Hope Dinner registration collects purchaser name, email, phone, referral source, church, selected dinner/venue, ticket quantity, guest details, dietary requirements, allergy detail, dietary surcharge, payment details, address, currency, and seating comments.
- Current event pages include RSVP dates, age suitability notes, donation fallback CTAs, and contact prompts.
- Current Australian Hope Dinners page shows sold-out labels for some venues, but public page content does not confirm how capacity is configured.

## Open Questions

- Separate event deep dive.
- Confirm current capacity/sold-out mechanism.
- Confirm current ticket quantity limits.
- Event registration system of record.
- Whether any cross-country or shared virtual event needs to be published to both domains.
- Whether manual/complimentary/offline registration creation belongs in the website.
- Seating/table requirements.
- Cancellations/refunds.
- Multi-venue event structure details.
- Guest data model and privacy.
- Event-specific donation prompt rules.
- Sensitive event data retention policy.

## Reference URLs

- <https://dfn.org.au/events/upcoming-events/dinners-nz/>
- <https://dfn.org.au/events/upcoming-events/dinners/>

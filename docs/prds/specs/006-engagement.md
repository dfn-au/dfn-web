# PRD: Supporter Engagement, Enquiries, and Community Campaigns

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a PRD/epic spec. It is not intended to be implemented directly. Use it to create focused GitHub decision issues and thin vertical implementation issues for newsletter/prayer opt-ins, supporter pathways, downloadable resources, contact-led workflows, and staff-created community campaigns.

## Problem Statement

DFN needs the rebuilt websites to preserve non-payment supporter workflows: newsletter and prayer updates, volunteer and intern pathways, field trip interest, speaker requests, fundraising resources, business/community engagement, contact prompts, and community campaign support.

The current site often uses content, email links, external forms, and downloadable resources rather than onsite forms. The rebuild should preserve these workflows without inventing unnecessary website forms, while supporting staff-created public campaign pages for donor/community campaigns.

## Solution

Create supporter engagement requirements that preserve current content-led and email-led pathways, support explicit segmented opt-ins, expose downloadable resources, and allow staff-created community campaign pages with public progress and donation CTAs.

Supporter engagement content may be shared where it is genuinely the same, but contact prompts, campaign activity, notifications, and reportable activity should carry site context.

Supporter self-service campaign creation is out of scope for launch. New onsite enquiry forms should only be added later if DFN decides they are needed.

## User Stories

1. As a visitor, I want to sign up for DFN updates, so that I can stay connected.
2. As a visitor, I want prayer updates and general updates to be separate choices, so that I receive only the communications I want.
3. As a donor, I want communication opt-ins to appear in relevant giving and event flows, so that I can subscribe while engaging.
4. As a volunteer prospect, I want to understand volunteer opportunities and contact DFN, so that I can take the next step.
5. As an intern prospect, I want to understand the intern programme and access current application forms, so that I can apply through the correct channel.
6. As a speaker-request visitor, I want contact details for speaker enquiries, so that I can invite DFN to present.
7. As a field trip prospect, I want field trip information and contact details, so that I can ask about future trips.
8. As a community fundraiser, I want fundraising ideas and toolkit downloads, so that I can run a fundraiser.
9. As a business/community partner, I want to understand partnership options and contact DFN, so that I can explore involvement.
10. As a campaign donor, I want a public campaign page with story, image, goal/progress, and donate CTA, so that I can understand and support the campaign.
11. As a campaign organiser, I want DFN staff to set up the campaign page initially, so that the public campaign is accurate and approved.
12. As DFN staff, I want campaign donations attributed to the right campaign, so that reporting and follow-up are accurate.
13. As DFN staff, I want internal notifications for relevant supporter activity where tracked, so that follow-up can happen.
14. As DFN staff, I want toolkit downloads and outbound contact clicks to be measurable where appropriate, so that supporter engagement can be understood.
## Implementation Decisions

- Supporter engagement includes newsletter signup, prayer updates, volunteer interest, intern programme, field trips, speaker requests, fundraising toolkit, business/community engagement, and donor/community campaigns.
- Preserve current pattern for launch: mostly content plus email links, external forms, and downloads where already used.
- Do not invent new onsite forms for volunteer, business, speaker, field trips, or campaign interest unless DFN decides later.
- General contact can remain email/phone links.
- Intern applications currently use external Google Forms and downloadable/offline forms.
- My Event/community fundraiser content currently uses email links and downloadable toolkit.
- Field trip interest currently uses email/contact prompts.
- Speaker request currently uses email/contact prompts.
- Newsletter/prayer update consent should be explicit and segmented.
- Newsletter/prayer signup should appear globally and contextually inside donation/event flows.
- Community campaigns will be staff-created initially.
- Community campaigns are expected to be country-specific for launch, pending confirmation of whether any campaign needs shared cross-country publishing or combined progress.
- Staff-created campaign pages should have public pages with title, story, image, goal/progress, and donate CTA.
- Campaign donations should be attributable to the site and campaign.
- Supporter self-service campaign creation/management is out of scope for launch, including fundraiser self-registration, auto-generated fundraiser pages, approval workflow, and fundraiser publish notifications.
- Functional analytics/conversion tracking should include newsletter/prayer opt-ins, toolkit downloads, and outbound contact clicks where appropriate, with site attribution.

## Testing Decisions

- Test newsletter/prayer signup by confirming segmented consent, site attribution, confirmation behaviour, and reporting/export/integration expectations.
- Test content-led supporter workflows by confirming that volunteer, intern, field trip, speaker, business/community, and campaign pages expose the right contact links, downloads, and external forms.
- Test intern workflow by confirming current external forms/download links are present or migrated.
- Test community campaign pages by creating a staff-managed campaign with story, image, goal/progress, and donate CTA.
- Test campaign donation attribution through the giving workflow, including site attribution.
- Test conversion tracking expectations for opt-ins, downloads, and outbound contact clicks.

## Out of Scope

- Supporter self-service campaign creation, including peer-to-peer fundraiser registration and auto-generated fundraiser pages.
- New onsite enquiry forms unless separately approved.
- Volunteer management system.
- Intern application processing inside the website.
- Field trip application workflow inside the website.
- Website-based bulk email sending for supporter communications.

## Open Questions

- Whether any new forms should replace current email-only workflows in a later phase.
- Exact newsletter/prayer/update segments and consent language.
- Community campaign page field list.
- Confirm whether campaigns are always country-specific or whether any shared cross-country campaign/progress model is required.
- Whether peer-to-peer fundraiser self-registration should be added after launch.
- Whether toolkit downloads should be tracked as conversions.

## Reference URLs

- <https://dfn.org.au/events/my-event/>
- <https://dfn.org.au/help/advocate/>
- <https://dfn.org.au/intern/>
- <https://dfn.org.au/events/field-trips/>
- <https://dfn.org.au/help/business-and-community-engagement/>
- <https://dfn.org.au/contact/>

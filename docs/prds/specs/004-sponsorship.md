# PRD: Child Sponsorship and Sponsorable Profiles

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a PRD/epic spec. It is not intended to be implemented directly. Use it to create focused GitHub decision issues and thin vertical implementation issues for sponsorship programme selection, standard child profiles, vulnerable child sponsorship, safeguarding, and sponsorship attribution.

## Problem Statement

DFN needs the rebuilt websites to support child sponsorship while protecting vulnerable children and preserving donor confidence.

The current site includes multiple sponsorship programmes, individual standard child profiles, programme-level scholarship giving, and vulnerable child sponsorship that intentionally does not publish child profiles online. The rebuild needs clear functional requirements for profile display, sponsorship checkout, attribution, staff profile management, privacy, and what remains outside the website.

## Solution

Create country-specific sponsorship workflows that support programme-level sponsorship options and standard child profile selection. Published standard profiles can be browsed and selected by donors, while vulnerable child sponsorship remains programme-level and staff-allocated after payment.

The website captures sponsorship intent/payment and confirms next steps. Sponsor updates, reports, child activities, and letters are handled outside the website for launch.

## User Stories

1. As a donor, I want to compare sponsorship programmes, so that I can choose the form of sponsorship that suits me.
2. As a donor, I want to browse standard child profiles, so that I can sponsor a specific child.
3. As a donor, I want profiles to show enough approved detail to make a meaningful choice, so that I can feel connected without exposing unsafe information.
4. As a donor, I want my selected child to carry through checkout, so that I know which sponsorship I am starting.
5. As a donor, I want confirmation after sponsorship, so that I know the next steps.
6. As a donor, I want to sponsor the scholarship programme without selecting a child, so that I can support unsponsored students generally.
7. As a donor, I want to sponsor the vulnerable child programme without public profiles, so that children with higher privacy needs remain protected.
8. As a donor, I want monthly sponsorship to be primary, so that I can support ongoing education.
9. As a donor, I want annual sponsorship available if DFN currently offers it, so that I can give annually.
10. As DFN staff, I want to create and edit child profiles, so that available sponsorship profiles stay current.
11. As DFN staff, I want child profiles to have draft and published states, so that unpublished profiles cannot be sponsored.
12. As DFN staff, I want sponsored child profiles to become unavailable to other donors, so that double sponsorship does not occur.
13. As DFN staff, I want sponsorship records to include programme and child attribution where applicable, so that follow-up and reporting are accurate.
14. As DFN staff, I want vulnerable child sponsorships to be allocated privately after payment, so that privacy rules are preserved.
15. As DFN staff, I want sensitive profile content constrained, so that profiles do not expose unsafe family or location details.
## Implementation Decisions

- Child sponsorship is distinct enough to have its own PRD.
- Sponsorship programme content, child profile availability, checkout, payment account, receipts, notifications, and reports should be country-specific.
- Any shared sponsorship copy/assets are editorial reuse only, not a shared public sponsorship workflow.
- Current sponsorship programmes include scholarship, standard child sponsorship, and vulnerable child sponsorship.
- Standard child sponsorship should support individual child profiles.
- Donors should choose a specific standard child from a browsable list.
- The selected child should be carried through checkout and gift attribution.
- The selected child, programme, checkout, payment, and confirmation should carry site attribution.
- Staff should be able to add, edit, draft, publish, and archive child profiles.
- Unpublished profiles must not be sponsorable.
- Once a donor sponsors a specific child, that profile should become unavailable to other donors, pending confirmation of exact locking behaviour.
- Child profiles should show approved, limited details only.
- Recommended allowed details: photo, first name or pseudonym, age/grade, broad region, short approved story, and sponsorship need.
- No precise location, surnames, or sensitive family details should be exposed.
- Scholarship programme is programme-level giving and does not allocate a specific child.
- Vulnerable child sponsorship should preserve the current rule that profiles are not shown online.
- Vulnerable child sponsorship should be programme-level checkout with staff allocation after payment.
- Sponsor updates, school reports, child activities, and letters are handled outside the website for launch.
- The website should capture sponsorship and confirm next steps.
- Sponsorships are recurring by default, with annual support if already offered/current.
- Donor self-service for recurring payment management can be provider-hosted at launch.

## Testing Decisions

- Test sponsorship on both domains by browsing published profiles, selecting a child, completing checkout, and verifying site and sponsorship attribution.
- Test that draft/unpublished profiles are not public and cannot be sponsored.
- Test sponsored/unavailable profile behaviour once the exact locking decision is confirmed.
- Test vulnerable child sponsorship by confirming no individual profiles are exposed online and the checkout remains programme-level.
- Test scholarship sponsorship by confirming it does not require or allocate a child profile through the website.
- Test staff profile management through create, preview, publish, edit, archive, and availability flows.
- Test that sponsorship profiles and checkout options appear only on the intended site unless explicitly published to both.
- Test safeguarding constraints by validating profile fields and published display content.

## Out of Scope

- Sponsor portal/account area.
- Online sponsor letters, reports, school updates, child activities, or relationship management.
- Publishing vulnerable child profiles online.
- Complex staff approval workflow beyond draft and published.
- Detailed role/permission matrix.

## Current-Site Observations

- Current standard sponsorship appears to offer individual profile selection at `$48/month` and references `$576/year`. Treat these as observed current-site values only; confirm annual sponsorship and current pricing before implementation.

## Open Questions

- Confirm exact child-profile unavailability/locking behaviour once sponsored.
- Confirm annual sponsorship is current and should be supported online.
- Exact child profile fields and safeguarding wording.
- Whether filters are needed for age, gender, school, or region.

## Reference URLs

- <https://dfn.org.au/give/child-sponsorship/>
- <https://dfn.org.au/give/child-sponsorship/sponsorship-programme/>
- <https://dfn.org.au/give/child-sponsorship/jogini-sponsorship-programme/>
- <https://dfn.org.au/faqs/>

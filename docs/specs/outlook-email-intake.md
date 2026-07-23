# Outlook Email Intake (EXPLORATORY)

Status: CAPTURED 2026-07-23 (phone dictation session, Michael). **Brainstorm-stage — no build commitment, no phase assigned.** Parked deliberately so it cannot drag on the calendar-sync work (see `outlook-calendar-sync.md`).
Parent theme: Outlook integration.

---

## The idea (as dictated)
Beyond calendar sync, Michael wants the case management software connected to his **Outlook email** itself:
- All email flows into the case management software.
- The software recognizes **types** of email and acts on them differently — "grabs certain things to do certain things with the different types of emails."
- Prior art is discouraging in a useful way: Michael has used a commercial product with Outlook email connectivity that was confusing, limited, and clearly poorly engineered — he never used it. Whatever gets built here has to clear that bar by a wide margin or not exist.

Illustrative type-driven behaviors already implied by other specs (not a committed list):
- An OAA arriving by email → candidate for the OAA intake path (`criminal-appointment-intake-and-docket-enhancements.md` §1).
- Client/case-related mail → associated to the right matter for the docket cross-reference (§3 there) and the case file generally.
- [Everything else: to be brainstormed.]

## Hard constraint: HIPAA compliance
Michael's PI/medical cases put **protected health information** in email traffic. The entire pipeline — transport, storage, indexing, any AI processing of email content — must be **HIPAA compliant** by design, not retrofitted. This is a first-class design constraint stated at capture time, before any architecture exists.
- Interacts with the existing data-hygiene rules (no real client data committed; privileged-data handling in the conventions block).
- Any third-party processing of email content (including AI services) needs BAA/compliance review before it touches real mail. [CONFIRM specifics when this graduates from brainstorm.]

## Next step when picked up
Michael proposed either a sit-down design session or a **brainstorming loop** — turn Claude loose to explore the full design space (what email types exist in this practice, what actions each should trigger, how matter-association works, how the HIPAA constraint shapes architecture) and bring back a synthesis for his review, in the style of the medical-billing-analysis module prompt. That prompt-driven deep-dive is the recommended format when this activates.

## Open items
- [ ] Schedule the brainstorming loop (no date set).
- [ ] Inventory of email "types" in the practice — Michael's input needed as seed material.
- [ ] HIPAA architecture review scope. 

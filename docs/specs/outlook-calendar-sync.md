# Outlook Calendar Sync

Status: SPEC DRAFTED 2026-07-23 (phone dictation session, Michael). Phase 1 committed; Phase 2 explicitly backlogged.
Parent theme: Outlook integration (two specs — this one, and `outlook-email-intake.md`; kept separate so the contained calendar work is not dragged by the exploratory email work).

---

## Requirement statement (Michael, verbatim intent)
Microsoft Outlook connectivity is **non-negotiable** for this system. Michael has evaluated commercial case-management products and considers Outlook connectivity one of the most valuable features on the market — and one that is frequently engineered poorly.

## Phase 1 — one-way push (COMMITTED; enters build queue after billing Phase 1a)

**Every calendar event created in the case management software is pushed to Michael's Outlook calendar automatically.** Outlook is always the complete picture of his schedule; the software never holds an event Outlook doesn't know about.

Scope notes:
- Transport: Microsoft Graph API. [Auth model — likely delegated permissions against Michael's M365 account; confirm tenant/licensing details at build time.]
- Push on create, **and on edit/cancel** — a one-way sync that lets pushed events go stale on reschedule or dismissal would be worse than none. "One-way" means direction of authority (software → Outlook), not create-only.
- Each pushed event should carry an identifier tying it back to its matter (e.g., in the event body or an extended property) — this costs nothing now and is the hook Phase 2's matching needs.
- Sources feeding this immediately: hearing entries from OAA intake (see `criminal-appointment-intake-and-docket-enhancements.md` §2), and all other calendar entries the system creates (deadline engine outputs, reminders that materialize as events, etc.).

## Phase 2 — two-way sync (BACKLOG; noted for when there is bandwidth)

End goal agreed 2026-07-23: full two-way sync — changes made in Outlook flow back into the software.

- Feasibility: confirmed doable via Graph webhooks/change notifications; runtime resource cost is negligible (notification-driven, not polling). The cost is **engineering complexity**, not system load.
- Known design problems to solve when picked up: conflict resolution (same event edited both places — which wins), matching Outlook-originated events to matters (or deciding they stay matter-less), clean deletion handling in both directions.
- Explicit agreement: do **not** let Phase 2 block or delay Phase 1. Ship the push; log this and move on.

## Open items
- [ ] M365 account/tenant details and Graph app registration approach. [CONFIRM with Michael at build time]
- [ ] Which calendar (default vs. a dedicated "MDBP Cases" calendar in Outlook) — dedicated calendar recommended for clean separation and safer sync semantics. [CONFIRM]
- [ ] Phase 2 pickup criteria: revisit after Phase 1 has run in daily use for a while and the higher-priority queue is clear.

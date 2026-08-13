# Email-Derived Workflow Requirements for brennan-case-manager
**Status: PROPOSED design input — not ruled, not build-queue, not repo-canonical.**
If Michael adopts any of this, it ships to the repo via a normal push-to-code packet
(likely home: docs/specs/). Source: a 60-day survey of the practice mailbox
(2026-06-10 – 2026-08-10, ~2,011 messages, ~525 sampled), performed 2026-08-09 in a
Cowork session with Michael's direction. This document is fully sanitized: categories,
volumes, and workflow shapes only — no client names, matter details, or case content.

## Why this document exists
The practice's operational reality currently lives in email. Every recurring workflow the
software must eventually manage already plays out as multi-email sequences in the inbox.
Cowork triage/pipeline tasks now run against that mailbox daily/weekly; each is a manual
prototype of a case-manager module. This doc records the observed workflows as candidate
module requirements — dogfooding output for the design space.

## Observed volume and shape
~34 emails/day average, ~40-45 per weekday. Roughly 25-30% of real mail needs a reply,
~15% needs a calendar entry or file-save, the rest is FYI or ignorable. New matters
arrive via indigent-defense appointment notices and attorney referrals, not web leads.

## Seven recurring pipelines observed (candidate modules)

1. **E-filing envelope lifecycle** — submitted → service notification(s) → accepted OR
   returned-for-correction → refile; 3-8 emails per envelope, keyed by envelope number.
   Module implications: envelope-state tracking, returned-filing deadline alerts,
   service-failure detection (observed: one filing produced 8 undeliverable notices off a
   stale e-service contact — service-list hygiene is a real failure mode).

2. **E-signature lifecycle** — sent → counterparty signed → attorney signature required →
   reminders (observed stuck for weeks) → signed-and-filed. Module implications: per-
   document signature state, stuck-at-attorney alerting, final-PDF capture to the matter.

3. **LOP medical pipeline** (PI practice) — referral order → clinic outreach ("unable to
   reach patient" is a recurring failure state) → scheduled → treating → orders/surgery
   awaiting attorney approval → records + bill with affidavits → periodic clinic status-
   update requests. Module implications: per-client treatment state, approval-request
   queue (these gate client care), no-show/file-closure warnings, records+bill intake.

4. **Settlement pipeline** — Rule 408 negotiation → agreement → Rule 11 → release/W-9 →
   check → lien payoffs (incl. federal/military liens) → agreed dismissal. Several
   matters mid-pipeline simultaneously. Module implications: stage tracking with
   who-owes-next-action, stall detection (10+ days), lien sub-ledger per settlement.

5. **Criminal appointment pipeline** (multi-county) — appointment notice with custody/
   bond status → coordinator sends order/magistrate papers → portal discovery available →
   DA plea offer (often <24h before docket) → plea paperwork signature/thumbprint →
   docket PDF (with last-minute time changes) → disposition. Module implications: new-
   matter auto-intake from appointment notices, custody flagging, docket-day prep sheet
   assembling discovery/offer/paperwork state, county-by-county docket calendar.

6. **Records retrieval** — request via vendor or direct → acknowledgment → custodian
   delays (observed: weeks-long stalls) → follow-ups → fulfillment; small clerk fees for
   certified copies. Module implications: request aging, stall alerts, follow-up
   generation, cost tracking.

7. **Service of process** — job assigned → attempt(s) → served/diligence → file-stamped
   return uploaded → invoice. Module implications: service-status board, return capture,
   diligence-declaration tracking for substitute-service motions.

## Cross-cutting requirements the survey surfaced
- **Deadline extraction is the highest-value function**: docket PDFs, plea-offer
  turnarounds, returned-filing corrections, discovery-response demands. Deadlines arrive
  embedded in attachments and prose, multi-county, with last-minute changes.
- **Dedupe keys matter**: envelope number (e-filing), claim number (carriers resend the
  same request 2-3x), document name (e-signature). The same logical event generates
  multiple emails; the software's inbox-facing features must collapse them.
- **Noise dominates**: bounce storms from a misconfigured rule, OTP codes, marketing,
  listserv volume. Any inbox-integrated feature needs a hard ignore layer before triage.
- **Client emails are low-volume, high-urgency** and emotionally loaded; they need human
  routing, never templated automation.
- **Communication hygiene is a product opportunity**: the observed stale e-service
  contact and broken forwarding rule went unnoticed until surveyed.

## Current Cowork prototypes standing in for these modules
- Weekday-morning inbox brief (triage + deadline extraction + docket prep + signature
  watch + proposed calendar entries; draft-only replies for routine items).
- Friday pipeline boards (settlement, LOP medical, records chase, e-filing/service state
  reconstructed from 45 days of mail).
Their run-by-run friction and failure modes are themselves design data; observations
worth keeping should be appended here (sanitized) before this doc is packetized.

## Boundary rules honored throughout
No real client data in this doc, the repo, or any handoff artifact. The mailbox-facing
Cowork tasks are barred by prompt from writing client details to memory, projects, or
repositories. Everything here is category-level.

---

## ADOPTION ADDENDUM — RULED by Michael 2026-08-12 Central (design session, Fable 5, Cowork, by widget)

**The document above is ADOPTED into the repo as a design input, verbatim** — its original status
header is preserved as history; THIS addendum is the ruling that supersedes the header's
"not repo-canonical" line. The doc's contents remain PROPOSED at the module level: adoption makes
the catalog part of the record; it builds, schedules, and authorizes nothing. Future sanitized
observations from the Cowork prototypes append here via normal packets — the append channel the
original text describes survives adoption.

**Durable IDs (RULED, group ruling): the seven pipelines enter the WF series** (created by #49's
WF-1; the workflow-channels heading is their home in the queue). Each carries its GATE — the thing
that must exist or be ruled before the pipeline becomes buildable — so none can silently die
(the K-6/K-7 insurance):

| Durable | Pipeline | Gate(s) and cross-links |
|---|---|---|
| **WF-2** | E-filing envelope lifecycle | Inbox-facing detection gated on T3 (KICK-1 governs); envelope-number dedupe key is a T3 design constraint. Module design unruled. |
| **WF-3** | E-signature lifecycle | T3 for inbox detection; final-PDF capture needs the document-storage model (form-engine §10's OneDrive + metadata pattern is the nearest precedent). Module design unruled. |
| **WF-4** | LOP medical pipeline | Medical-tab treatment records (not yet built — form-engine §10's write-back names them as future); approval-request queue gates client care and needs its own design pass. Cross-link: medical module. |
| **WF-5** | Settlement pipeline | **Money machinery is deliberately unbuilt and UNRULED** (no settlement ledger, trust/IOLTA, liens — BUILD-STATE standing line). WF-5 records the observed shape; nothing proceeds without Michael ruling the money-module question first. |
| **WF-6** | Criminal appointment pipeline | LARGELY COVERED by existing work — OAA intake Tier 1 (BUILT), the CR series (custody = CR-5's home, offers = CR-8, docket prep = the worksheet items), the intake spec's docket sections. WF-6's residue is the inbox-facing auto-intake half, gated on T3. Cross-links recorded so WF-6 never duplicates CR work. |
| **WF-7** | Records retrieval | Module design unruled; request-aging/stall-alert shape recorded. Clerk-fee cost tracking cross-links the (future) money question, flagged not assumed. |
| **WF-8** | Service of process | Cross-links the CD-1-deferred SERVICE-STORY FIELDS ("land with the first instrument consumer") and IN-3/IN-4's service events — WF-8's board is evidence FOR that revisit, not a separate structure. T3 for inbox detection of returns. |

**Cross-cutting constraints (RULED as recorded constraints on future email/intake work, not
buildable items):** deadline extraction is the highest-value function and leads any T3 scoping;
dedupe keys (envelope number, claim number, document name) are T3 design constraints; a hard
ignore layer precedes any triage feature; **client emails get human routing, never templated
automation** — recorded with rule force for every future inbox-facing feature.

This addendum executes the standing carry "email-workflow doc, PROPOSED and un-packetized" — that
carry CLOSES when this lands.

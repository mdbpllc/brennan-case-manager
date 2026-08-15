# WF-2 – WF-8 — Email-Derived Workflow Pipelines: Specification Pass

**Status: PROPOSED design input. Adjudicates nothing. Authorizes nothing. No row closed, no
durable ID minted, no repo file edited, no registry entry opened or moved.**

CHAT-DISPATCH **Task 11**. Design session, **Opus 5**, Cowork, **2026-08-15 Central** (DT-1:
clock-checked 16:43 CDT; container read 21:43 UTC, Central date agreed). Repo read at HEAD
through the device bridge (`013e746`, describing batch `c2a4377`). Michael did not participate in
this session and made no rulings. Everything below that is not a verbatim quotation from the
record is **PROPOSED**.

---

## 1. What this document is — and the one thing it deliberately is not

The Task 11 instruction names this deliverable an **"email-workflow build-ready spec."** After
restating the adopted scope from the record, **this document cannot honor that name, and saying so
is the first act of the pass.**

The instruction also says: *"restate adopted scope from the record first — ambiguity becomes an
open question, not a resolution."* The phrase "build-ready" is exactly such an ambiguity. Three of
the seven WF rows say **"Module design UNRULED"** in terms; the other four name gates without
ruling any design; and the adopting ruling itself says, in its own words, that adoption **"builds,
schedules, and authorizes nothing."** A document that arrived calling itself build-ready would
resolve that ambiguity in the build's favor by its title alone.

So this pass **maps**. It is the Task 9 resolution, not the Task 8 one — and that contradicts the
prediction the Task 10 capture carried forward.

### 1.1 The elaborate-vs-map line, stated section by section

The Task 10 spec established this convention because a build session must never read a mapped
paragraph as a ruled one. Applied here:

| § | Content | Status |
|---|---|---|
| §2 | Adopted scope | **RESTATEMENT** — verbatim from #63, the addendum, and the queue |
| §3 | The `T3` namespace collision | **FINDING** — verified at HEAD, flagged not repaired |
| §4 | The auth surface and Graph mechanics | **FINDING (record) + RESEARCH (named public sources)** |
| §5 | Per-WF behavior | **MAP** — the observed shape restated; no design ruled |
| §6 | HIPAA-relevant handling | **MAP + AUTHORITY GAP** — no proposition verified, none can be |
| §7 | Data-model touchpoints | **FINDING** — what exists and what does not, at HEAD |
| §8 | Failure modes | **PROPOSED** |
| §9 | Non-goals | **PROPOSED** |
| §10–11 | Questions and looks | **Michael's** |

**Nothing in this document elaborates a ruling, because on the module question there is no ruling
to elaborate.** What #63 ruled is set out in §2.1 and is real — it is simply not module design.

### 1.2 Reconcile-first checks, run at HEAD before anything was written

1. **Path free.** `docs/specs/wf-2-wf-8-email-workflow-spec-2026-08-15.md` does not exist. The
   three `docs/specs/` files matching *wf|email|workflow* are `email-workflow-requirements.md`,
   `outlook-email-intake.md`, and `transcript-workflows.md` — none is this file.
2. **IDs free.** `Q-WF-` returns **0** hits repo-wide (excluding `.git/` and `inbox/`);
   `WF-LOOK-` returns **0**. Both are used here as **packet-local IDs only** and are
   **deliberately not minted** as durable — `WF` is a live durable series and minting into it is
   Michael's act. This is the fifth consecutive packet in that posture; **ID-DL-1 now governs
   SIX.**
3. **Rows still open.** WF-2 through WF-8 are all ⬜ at `attorney-review-queue.md:261–267`
   (WF-1 at 257; the `#63` provenance note at 259; the cross-cutting constraints row at 268).
4. **Log number free.** `(#85)` returns 0 hits in `docs/specs/session-log.md`.
5. **Registry dedupe run.** See §6.2 — the result is that there is nothing to dedupe against.

---

## 2. ADOPTED SCOPE, RESTATED FROM THE RECORD

Source: session-log **#63** (2026-08-12, design session, Fable 5, Cowork, typed; rulings
Michael's, by widget, DT-1 clock-checked), the **ADOPTION ADDENDUM** in
`docs/specs/email-workflow-requirements.md`, and `docs/specs/attorney-review-queue.md:257–268`.
All three agree. Quotations below are verbatim from those files at HEAD.

### 2.1 What the ruling DID do — three acts, all real

**(a) It adopted a survey document into the repo, verbatim, as a design input.**

> "The document above is ADOPTED into the repo as a design input, verbatim — its original status
> header is preserved as history; THIS addendum is the ruling that supersedes the header's
> 'not repo-canonical' line."

The underlying document is a **60-day mailbox survey** (2026-06-10 – 2026-08-10, ~2,011 messages,
~525 sampled, performed 2026-08-09 with Michael's direction), fully sanitized to category level.
It is **observational**. It records what the practice already does in email.

**(b) It created seven durable IDs and gave each a named gate.**

> "Durable IDs (RULED, group ruling): the seven pipelines enter the WF series (created by #49's
> WF-1; the workflow-channels heading is their home in the queue). Each carries its GATE — the
> thing that must exist or be ruled before the pipeline becomes buildable — so none can silently
> die (the K-6/K-7 insurance)."

**(c) It gave four cross-cutting constraints rule force.**

> "Cross-cutting constraints (RULED as recorded constraints on future email/intake work, not
> buildable items): deadline extraction is the highest-value function and leads any T3 scoping;
> dedupe keys (envelope number, claim number, document name) are T3 design constraints; a hard
> ignore layer precedes any triage feature; **client emails get human routing, never templated
> automation** — recorded with rule force for every future inbox-facing feature."

These four are the **only** statements in the WF material that bind a future build. §5 treats them
as binding throughout. The fourth is the sharpest and the easiest to violate by accident.

### 2.2 What the ruling did NOT do — stated because the risk runs this way

The Task 10 capture predicted that Task 11's gate would "resolve closer to Task 8's" — elaborate
rather than map — "so the risk shifts from 'nothing is ruled' to 'the ruling's scope is wider than
the doc's text supports.'" **That prediction is wrong in its premise and right in its instinct.**
The ruling's scope is not wider than the text; the ruling was **explicitly and repeatedly narrowed
in its own words**, three times in three places:

> "The doc's contents remain PROPOSED at the module level: adoption makes the catalog part of the
> record; **it builds, schedules, and authorizes nothing.**" *(addendum)*

> "Adoption makes the catalog part of the record; **it builds, schedules, and authorizes
> nothing.**" *(queue, `attorney-review-queue.md:259`)*

> "the seven pipelines take WF-2–WF-8 with gates named" *(session-log #63 — the entry records the
> ID assignment and the gates, and no module design)*

And three of the seven rows carry the phrase **"Module design UNRULED"** or **"Module design
unruled"** in terms: WF-2, WF-3, WF-7.

**So the honest reading is the opposite of the predicted one: an ADOPTED document is not an
adopted design.** What was adopted is a *catalog of observations* and a *gating structure*. The
risk this creates is real but differently shaped — a build session that sees "ADOPTED (RULED)" in
BUILD-STATE and in the log, and reads `docs/specs/email-workflow-requirements.md` as a
repo-canonical spec, will find seven module descriptions written in the confident register of a
survey ("Module implications: envelope-state tracking, returned-filing deadline alerts,
service-failure detection") and no sentence inside those seven paragraphs marking them unruled.
**The disclaimers all live in the addendum and the queue, not in the body the build would read.**
That is Q-WF-1.

### 2.3 The gate table, as written

Reproduced verbatim from the addendum (the queue's wording differs only in emphasis):

| Durable | Pipeline | Gate(s) and cross-links |
|---|---|---|
| **WF-2** | E-filing envelope lifecycle | Inbox-facing detection gated on T3 (KICK-1 governs); envelope-number dedupe key is a T3 design constraint. Module design unruled. |
| **WF-3** | E-signature lifecycle | T3 for inbox detection; final-PDF capture needs the document-storage model (form-engine §10's OneDrive + metadata pattern is the nearest precedent). Module design unruled. |
| **WF-4** | LOP medical pipeline | Medical-tab treatment records (not yet built — form-engine §10's write-back names them as future); approval-request queue gates client care and needs its own design pass. Cross-link: medical module. |
| **WF-5** | Settlement pipeline | **Money machinery is deliberately unbuilt and UNRULED** (no settlement ledger, trust/IOLTA, liens — BUILD-STATE standing line). WF-5 records the observed shape; nothing proceeds without Michael ruling the money-module question first. |
| **WF-6** | Criminal appointment pipeline | LARGELY COVERED by existing work — OAA intake Tier 1 (BUILT), the CR series (custody = CR-5's home, offers = CR-8, docket prep = the worksheet items), the intake spec's docket sections. WF-6's residue is the inbox-facing auto-intake half, gated on T3. Cross-links recorded so WF-6 never duplicates CR work. |
| **WF-7** | Records retrieval | Module design unruled; request-aging/stall-alert shape recorded. Clerk-fee cost tracking cross-links the (future) money question, flagged not assumed. |
| **WF-8** | Service of process | Cross-links the CD-1-deferred SERVICE-STORY FIELDS ("land with the first instrument consumer") and IN-3/IN-4's service events — WF-8's board is evidence FOR that revisit, not a separate structure. T3 for inbox detection of returns. |

### 2.4 The finding that falls straight out of that table

**Seven of seven are gated. Zero of seven have a satisfied gate today.** Checked against
BUILD-STATE (seventy-third refresh) at HEAD:

| Item | Gate | State at HEAD | Satisfied? |
|---|---|---|---|
| WF-2 | T3 | *"until he locates it or re-issues, T3 WORK IS UNAUTHORIZED"* (KICK-1) | **No** |
| WF-3 | T3 **+** document-storage model | T3 unauthorized; *"no document storage"* | **No, doubly** |
| WF-4 | medical treatment records **+** approval-queue design pass | treatment records not built; no design pass run | **No, doubly** |
| WF-5 | money machinery ruled | *"NO MONEY MACHINERY: no settlement ledger, trust/IOLTA, liens"* — UNRULED | **No** |
| WF-6 | T3 (residue only) | T3 unauthorized; the CR half is separately gated | **No** |
| WF-7 | module design ruled | unruled; money cross-link also unruled | **No** |
| WF-8 | T3 **+** CD-1 service-story fields | T3 unauthorized; *"CD-1 deferred the service-story columns to 'the first instrument consumer' and that consumer has NEVER BEEN NAMED"* (#83) | **No, doubly** |

**Five of the seven route through `T3`, and `T3` is not one thing.** That is §3.

**Consequence a build session must not miss: there is no buildable WF item today, and none of the
seven becomes buildable by a design pass alone.** Every gate is either Michael's ruling or another
module's construction. This document therefore cannot make anything build-ready, and a reader
looking for the shortest path to a shipped WF feature should read §4 instead — because even with
every gate lifted, the auth surface is the binding constraint.

---

## 3. FINDING — `T3` is a namespace collision, and the two meanings gate oppositely

**Flagged, not repaired. Renaming a series is Michael's act. The record has ruled on this exact
class once already** (the H → HK re-lettering, #66; and `session-log.md:4045`, *"ID COLLISION
FLAGGED, NOT RENUMBERED"*).

Two independent `T1`–`T4` build-tier series exist in `docs/specs/`, both at HEAD:

| Doc | Line | `T3` means | Gate | State |
|---|---|---|---|---|
| `transcript-sort-and-route-design.md` | 148 | *"Pipeline service (Python/NeMo/FastAPI): gated on P1 hardware"* | P1 hardware; Phase 0; **KICK-1** | **UNAUTHORIZED** |
| `statute-text-and-bill-tracking-design.md` | 107 | *"LegiScan poller + matcher + watch flags"* | the **O1** LegiScan key | **substantially BUILT** |

The statute series' own build is on the record: `session-log.md:7718` — *"the session prompt's Item
1d stages T1/T2/T3 as 'push-ready slices' — but **T1–T4 were all built earlier this same date**
(through `6a1c9ba`)."* That the line refers to the statute series and not the transcript one is
pinned by its own next sentence, which names the **`getSessionList` fixture** — a LegiScan API
method — as one of that session's supporting deliverables. BUILD-STATE confirms the shipped surface —
`/statutes` and `/bills` are live screens with *"tracked bills with B3 lifecycle, statute-ref
matcher."* Only the `legiscan-poller` edge function remains undeployed.

**The WF gates say `T3` without naming which.** A build session that resolves the token against
`statute-text-and-bill-tracking-design.md` finds a tier that is built and reads **five WF gates as
satisfied**. A session that resolves it against `transcript-sort-and-route-design.md` finds a tier
that is unauthorized and reads the same five as hard-blocked. **The two readings are opposite and
both are literally supported by a repo doc.**

The intended referent is almost certainly the transcript-side T3 — BUILD-STATE's heading is
*"Phase 0 / T3"* and the WF rows name KICK-1 alongside it, and KICK-1 is
`KICKOFF-phase0-t3-p1-session_2026-08-08.md`. **But "almost certainly" is not the standard this
project holds itself to**, and the collision is unflagged everywhere: BUILD-STATE's naming caveat
covers *"IN / DE / CR / HK"* and does not mention `T`.

**And the deeper point survives even after the referent is fixed:** it is not obvious *why* an
email pipeline should be gated on a **speech-transcription service**, and nothing in the WF rows
explains it. §6.4 proposes the explanation — the gate is a **PHI-processing-locality** gate, not a
speech gate — and that reading, if Michael confirms it, changes what "lifting the gate" means.
That is Q-WF-2 and Q-WF-3.

---

## 4. THE AUTH SURFACE — what exists, and why it does not carry this series

The Task 11 instruction supplies a design constraint: **"Graph surfaces (single tenant, single
auth surface)."** The record supports both halves precisely — and the surface it identifies is the
binding constraint on the entire WF series, ahead of every gate in §2.4.

### 4.1 What the record establishes (all verbatim, at HEAD)

From `docs/outlook-setup.md` — the one-time setup Michael performed:

- **Single tenant, confirmed:** *"Supported account types: **Accounts in this organizational
  directory only**."*
- **Public-client SPA:** *"Redirect URI: choose platform **Single-page application (SPA)** and
  enter `http://localhost:5173`."*
- **Delegated, one scope:** *"**Microsoft Graph** → **Delegated permissions**. Add
  **Calendars.ReadWrite**."*
- **No secret:** the only two values are *"Application (client) ID → `VITE_MSAL_CLIENT_ID`"* and
  *"Directory (tenant) ID → `VITE_MSAL_TENANT_ID`"* — both `VITE_`-prefixed, i.e. client-side.
- **Michael's hand, always:** *"Claude never signs in or handles credentials; the popup sign-in is
  always your action."*

From `docs/specs/outlook-edit-cancel-exercise-2026-08-13.md`:

- Line 89: *"`.env` … carries the Entra **client** and **tenant** ids only — no secret, which is
  correct for the SPA/PKCE flow."*
- Line 11: *"**MSAL tokens are per-browser**, so the exercise ran entirely in his session."*

**So the single auth surface is: a single-tenant, public-client browser SPA using MSAL with PKCE,
holding one delegated scope (`Calendars.ReadWrite`), with per-browser tokens, a `localhost:5173`
redirect, and no server-side identity of any kind.**

It also carries a live, unfixed defect. BUILD-STATE: the first edit of a connect-pushed event
*"DUPLICATES it in Outlook and orphans the original … Reproduced on two events; cause
undetermined, no fix."* **The only Graph write path this practice has ever exercised has a
systematic, uncaused defect** — and every WF pipeline proposes to add Graph surface behind the
same registration.

### 4.2 Graph mechanics, researched — sources named per item

Retrieved 2026-08-15 Central from **Microsoft Learn** (the vendor's official documentation).
**Provenance marked per the Task 7 (#80) convention: this is TIER B — read through a summarizing
fetch layer, not quotable as normative text.** The numbers below are design inputs; a build
session confirms each against the live docs before relying on it.

**Change notifications (webhooks)** — *Microsoft Learn, "Change notifications overview" and
"Receive change notifications through webhooks"*:

- The endpoint *"must create a **publicly accessible, HTTPS-secured endpoint** that is addressable
  via URL. If your endpoint isn't publicly accessible, Microsoft Graph doesn't send notifications
  to your endpoint."*
- Validation handshake: respond **HTTP 200**, `text/plain`, the **URL-decoded** token, **within 10
  seconds**. An encoded token fails validation.
- Delivery: a **2xx within 3 seconds** counts as delivered. Otherwise retried with exponential
  backoff **for up to 4 hours**, retry timeout extended to 10 seconds.
- Endpoint health: **>10%** of responses over 3 s in a 10-minute window marks the endpoint "slow"
  (10-minute delay); **>15%** over 10 s marks it "drop" (notifications **dropped** for 10 minutes).
- Subscription lifetime for Outlook `message`: **10,080 minutes (under 7 days)**; with resource
  data included, **1,440 minutes (under 1 day)** — so **renewal is mandatory machinery**, not an
  optimization.
- **1,000 active subscriptions per mailbox** across all applications; exceeding returns **403**.

**Delta query (the poll alternative)** — *Microsoft Learn, "Get incremental changes to messages in
a folder"*:

- `GET /me/mailFolders/{id}/messages/delta`; `@odata.nextLink` (skipToken) paginates, `@odata.deltaLink`
  (deltaToken) marks the round complete and seeds the next one. Both are **opaque state tokens**.
- Deletions **are** reported, as `"@removed": {"reason": "deleted"}`.
- **No webhook and no public endpoint required** — it is a pull.
- `$filter` in a delta query caps results at **5,000 messages**.

**App-only (background) access** — *Microsoft Learn, "Role Based Access Control for Applications
in Exchange Online"*: application permissions granted in Entra are **organization-wide by
default**; narrowing them to specific mailboxes requires an Exchange Online **management role** +
**management scope** (recipient filter or administrative unit) + **role assignment**, applied as a
union with the Entra grant.

### 4.3 The structural mismatch — this is the real finding

**Every WF pipeline is a background watcher. The existing auth surface has no background.**

The seven pipelines are defined by *elapsed time and unattended arrival*: envelope acceptance
arrives whenever the EFSP sends it; e-signature reminders are described as *"observed stuck for
weeks"*; records custodians produce *"weeks-long stalls"*; settlement stall detection is specified
at *"10+ days"*. None of that can be observed by a token that exists only while a browser tab is
open. Concretely:

1. **Webhooks are unreachable.** A publicly accessible HTTPS endpoint answering a handshake in 10
   seconds and notifications in 3 requires a server. There is no server. The nearest candidate is
   Supabase Edge Functions — and BUILD-STATE reports both written edge functions *"NOT deployed"*,
   with the diagnosis *"incomplete — `service_role` was never granted either."*
2. **Delta polling still needs a runner.** It removes the public-endpoint problem and not the
   background-execution problem: something must hold the `deltaLink` and call on a schedule when
   nobody is signed in.
3. **Background execution means app-only credentials.** App-only means a **client secret or
   certificate** — which this registration deliberately does not have, and whose absence the
   record correctly praises as *"correct for the SPA/PKCE flow."* Introducing one changes the
   security posture materially and, per §4.2, is **tenant-wide by default** unless Exchange
   Application RBAC scopes it to the single mailbox.
4. **The scope does not exist.** `Calendars.ReadWrite` reads no mail. Any WF work needs at minimum
   `Mail.Read`, which is a **new consent act on Michael's registration — his hand**, exactly as
   the original was.
5. **A browser-side mail read puts PHI in the browser.** See §6.

**Proposed conclusion, and it is proposed:** the WF series' true first gate is not `T3` and not the
money module. It is **"does this application acquire a server-side identity, and of what shape."**
That question is not in the queue under any ID. It is Q-WF-4, and it is upstream of all seven rows.

### 4.4 One thing the research retires

**Throttling is not a constraint here and should not be designed around.** The survey measures
*"~34 emails/day average, ~40-45 per weekday."* Against any published Graph mail limit that volume
is negligible, and the Outlook-specific figures are not even enumerated on the general throttling
page. Recorded so no future design spends effort on a non-problem — and because a spec that
inventories limits without saying which ones bind invites exactly that.

---

## 5. PER-WF — behavior, surfaces, touchpoints, failure modes

**Every subsection below MAPS. No behavior here is ruled.** The four cross-cutting constraints
from §2.1(c) bind throughout and are called out where they bite. Behavior descriptions restate the
survey's observed shape; they are not proposals to build it.

Two constraints apply to all seven and are stated once:

- **Hard ignore layer first.** *"a hard ignore layer precedes any triage feature"* — RULED. The
  survey's noise inventory is *"bounce storms from a misconfigured rule, OTP codes, marketing,
  listserv volume."* No WF classifier runs before the ignore layer does.
- **Human routing for client mail.** *"client emails get human routing, NEVER templated
  automation"* — RULED, and the survey's reason is *"low-volume, high-urgency and emotionally
  loaded."* This is the constraint most likely to be violated by a *helpful* default: any WF
  feature that drafts a reply, sends an acknowledgment, or auto-advances a state **on a client
  message** violates it. §8 carries the failure mode.

### WF-2 — E-filing envelope lifecycle

**Observed shape** (survey ¶1): *"submitted → service notification(s) → accepted OR
returned-for-correction → refile; 3-8 emails per envelope, keyed by envelope number."* Observed
failure: *"one filing produced 8 undeliverable notices off a stale e-service contact."*

**Dedupe key:** envelope number — **RULED as a T3 design constraint**, not merely observed.

**Graph surfaces:** mail read on the inbox, `$search`/`$filter` on sender and subject, delta for
incremental state. Attachments (file-stamped copies) via `/messages/{id}/attachments`.

**Data model at HEAD:** **nothing.** Word-bounded probes across `db/schema.sql` and all three
migrations return **0** for `envelope`, `email`, `message`, `attachment`, `thread`. There is no
filing record of any kind.

**The cross-link the WF row does not carry:** Task 7's memo (`bexar-local-rules-and-efiling-2026-08-15.md`,
#80) is the substantive treatment of this pipeline and it reaches a conclusion WF-2 needs — **the
filing moment is CONTESTED, not settled.** TRCP 21(f)(5) and Statewide Criminal E-Filing R. 2.3(a)
fix filing at transmission to the filer's EFSP (TIER A); a Bexar county-court sentence appears to
fix it at clerk acceptance (TIER B). **An envelope-state machine has to choose which transition is
"filed," and the record does not know.** That memo already flags the exposure as `LR-LOOK-1`.
Recorded here so WF-2 never re-derives it. **Not merged, not resolved.**

**Non-goals:** filing *through* the app. Task 7 states the consequence plainly — *"FILING THROUGH
THE APP = becoming or contracting with an OCA-certified EFSP"* — same class as Q-6. WF-2 as
observed is **read-only envelope state reconstruction**. Nothing here proposes transmission.

**Failure modes:** (a) the stale-e-service-contact bounce storm is *both* the noise problem and the
signal — 8 undeliverables are the detection event for a hygiene defect, so an ignore layer tuned to
suppress bounces would suppress the most valuable message in the survey; (b) envelope-number
dedupe collapses 3–8 messages into one state, so a mis-parsed number silently forks one envelope
into two.

### WF-3 — E-signature lifecycle

**Observed shape** (survey ¶2): *"sent → counterparty signed → attorney signature required →
reminders (observed stuck for weeks) → signed-and-filed."*

**Dedupe key:** document name — RULED as a T3 design constraint. **This is the weakest of the
three keys**: an envelope number and a claim number are issued identifiers; a document name is a
human-typed string. Flagged, not solved.

**Graph surfaces:** mail read; final-PDF capture requires attachment download.

**Data model at HEAD:** **nothing, and the nearest table is actively unsuitable.**
`generated_documents` exists but its `doc_type` CHECK admits **exactly one value** —
`'reasonable-value-report'` — and it has **no status column and no set/parent column** (#81, #83,
re-verified here at HEAD). It also carries `content text`, i.e. it stores document *text*, not a
binary. **It cannot hold a signed PDF and cannot express a signature state.**

The WF-3 gate names this correctly: *"final-PDF capture needs the **document-storage model**, which
does not exist."* BUILD-STATE agrees — *"no document storage."* The row's own caution about the
nearest precedent is worth preserving verbatim: form-engine §10's *"OneDrive-plus-metadata pattern
is the nearest precedent, **not a decision**."*

**Non-goals:** sending for signature; integrating any e-signature vendor's API. The observed
pipeline is inbound state reconstruction from mail.

**Failure modes:** "stuck at attorney" is the state the survey says actually costs money, and it is
detectable only as *absence* — no message for N days. Absence-based detection needs a clock and a
baseline, both of which need §4.3's background runner.

### WF-4 — LOP medical pipeline

**Observed shape** (survey ¶3): *"referral order → clinic outreach ('unable to reach patient' is a
recurring failure state) → scheduled → treating → orders/surgery awaiting attorney approval →
records + bill with affidavits → periodic clinic status-update requests."*

**This is the pipeline where the HIPAA question stops being abstract.** Every message class in it
carries PHI: treatment status, scheduling, surgical authorization, records and bills. §6 is written
mostly against this row.

**Gate, per the row:** *"medical-tab **treatment records, not yet built**"* plus *"the
approval-request queue **gates client care** and needs its own design pass."* The second half is
the one that deserves emphasis — the record says in terms that this queue gates a person's medical
care. That is a different severity class from an envelope state machine, and it argues (PROPOSED)
that WF-4's approval half should never be an inferred state: a missed or mis-parsed approval
request is a clinical delay, not a data-quality issue.

**Data model at HEAD:** `medical_bills`, `bill_line_items`, `eob_records`, `analysis_runs`,
`analysis_result_lines`, `provider_billing_profiles`, `fee_schedules`, `fee_schedule_rates`,
`code_mappings`, `bill_statute_refs` all exist. **Treatment records do not.** `client_id` sits on
`medical_bills` and `analysis_runs` (CL-2), so the client dimension is available when treatment
records arrive — **the case owns the occurrence, the client owns the damages**, and treatment state
is per-client by that logic. PROPOSED, and it is CL-2's logic rather than a new claim.

**Also relevant and easy to miss:** the Medical tab is **PI-matters-only by ruling (08-12)**, with
`showsMedicalTab()` the single enforcement point and a safety valve — *"a matter that already HAS
bills keeps its tab."* Any WF-4 surface inherits that gating or it leaks a medical UI onto criminal
and civil-lit files.

**Non-goals:** ingesting bills or records from mail attachments. BUILD-STATE: *"Medical has NO
PDF/bill ingestion (Phase 1b GPU-gated)."* WF-4 does not open that.

**Failure modes:** (a) *"unable to reach patient"* is a recurring state whose correct handling is a
human call, not a status flip; (b) approval requests arriving as attachments rather than prose
would be invisible to a body-text classifier — and the consequence of missing one is a delayed
surgery.

### WF-5 — Settlement pipeline

**Observed shape** (survey ¶4): *"Rule 408 negotiation → agreement → Rule 11 → release/W-9 → check
→ lien payoffs (incl. federal/military liens) → agreed dismissal."*

**DOUBLY GATED and the gate is absolute.** BUILD-STATE's standing line: *"NO MONEY MACHINERY: no
settlement ledger, trust/IOLTA, liens."* The queue: *"nothing proceeds until Michael rules the
money-module question first."*

**This section deliberately maps nothing further.** WF-5's own row says it *"records the observed
shape"* — so restating the shape is the whole permitted act, and any behavior, surface, or
touchpoint proposal for WF-5 would be designing the money module through the side door. **The
trust/operating separation is a day-one constraint on the staged QBO work (Task 13), and settlement
funds are the exact material that constraint governs.** Nothing here touches it.

One recorded observation, which is the row's own: *"Several matters mid-pipeline simultaneously."*

**Non-goals: everything.** WF-5 is not designed in this document.

### WF-6 — Criminal appointment pipeline

**Observed shape** (survey ¶5): *"appointment notice with custody/bond status → coordinator sends
order/magistrate papers → portal discovery available → DA plea offer (often <24h before docket) →
plea paperwork signature/thumbprint → docket PDF (with last-minute time changes) → disposition."*

**Most of this is already someone else's item, and the row says so deliberately** — *"Cross-links
recorded deliberately **so WF-6 never duplicates CR work**."* Honoring that:

| Observed element | Existing home | State |
|---|---|---|
| appointment notice → matter creation | **OAA intake Tier 1** | **BUILT** (digital Uvalde orders only; scans → manual) |
| custody / bond status | **CR-5** | queue row |
| DA plea offer | **CR-8** | queue row |
| docket-day prep | the worksheet items + intake spec docket sections | queue rows |
| plea paperwork signing checklist | **CR-10** | **HARD-GATED** on the criminal registry entries |

**WF-6's actual residue is one thing: inbox-facing auto-intake** — recognizing an appointment
notice *in mail* and starting the OAA path from it, rather than from Michael's upload. Gated on T3.

**The cross-link that already exists in the repo and that #63 did not carry:**
`criminal-appointment-intake-and-docket-enhancements.md:84` — *"**If an email connection exists**
(`outlook-email-intake.md` — future), scan email for docket names as a secondary, fuzzier signal
(e.g., an OAA arrived by email but no matter was created yet)."* **That is WF-6's residue, written
down on 2026-07-24, eighteen days before WF-6 was created, pointing at a spec the WF series never
cites.** See §6.1.

**Failure modes:** the survey's *"often <24h before docket"* and *"last-minute time changes"* mean
WF-6's latency budget is hours, not days — the only WF pipeline where a polling interval is a
substantive design choice rather than an implementation detail.

### WF-7 — Records retrieval

**Observed shape** (survey ¶6): *"request via vendor or direct → acknowledgment → custodian delays
(observed: weeks-long stalls) → follow-ups → fulfillment; small clerk fees for certified copies."*

**Dedupe key:** claim number — the survey's note is *"carriers resend the same request 2-3x."*

**Data model at HEAD:** **nothing.** `records_request`, `custodian`, `invoice`, `vendor` all return
0 word-bounded. There is no request record, no aging clock, no cost row.

**Money cross-link, flagged not assumed** (the row's own words): clerk-fee cost tracking touches the
unruled money question. WF-7 can be designed without it if cost tracking is severed — that severance
is a choice, not a given, and it is Q-WF-8.

**PHI:** medical-records retrieval is a WF-4 sibling in privacy terms even though the row does not
say so. §6 covers it.

**Non-goals:** generating follow-up correspondence automatically to *custodians* is not obviously
barred by the client-mail constraint — custodians are not clients — but nothing here proposes it.

**Failure modes:** aging is measured from a request the system did not create (the request is sent
by vendor or by hand), so the clock's zero point is itself extracted, not recorded — the same class
of problem as IN-2's version-selection circularity.

### WF-8 — Service of process

**Observed shape** (survey ¶7): *"job assigned → attempt(s) → served/diligence → file-stamped return
uploaded → invoice."*

**The row's own framing is the important part and is preserved verbatim:** WF-8 *"Cross-links the
CD-1-deferred SERVICE-STORY FIELDS ('land with the first instrument consumer') and IN-3/IN-4's
service events — WF-8's board is **evidence FOR that revisit, not a separate structure**."*

**This is the one WF row that is explicitly subordinate to another item's design**, and it collides
with a live open question. #83 found: *"CD-1 deferred the service-story columns to 'the first
instrument consumer' and that consumer has **NEVER BEEN NAMED** — CD-1's living-spec revisit opens
on whichever you name."* That is Q-IN3-3, already Michael's.

**WF-8 is a candidate to be that consumer, and this document does not nominate it.** Nominating a
consumer would reopen CD-1's living spec, which is a ruling act. Recorded as Q-WF-9 — and the
observation that matters for it is that WF-8's evidence is *inbound and evidentiary* (a return of
service is a filed instrument with a date that drives deadlines), whereas IN-3/IN-4's service
events are *outbound and generative*. Whether one column set serves both is precisely the deferred
question.

**Data model at HEAD:** no service table. Note the naming hazard #83 already flagged and this row
inherits: `service_date` / `service_start` / `service_end` **already mean MEDICAL dates of service**
in this schema (Q-IN3-9). A WF-8 column named `service_date` would collide semantically with live
medical columns.

**Failure modes:** diligence-declaration tracking exists to support substitute-service motions, so a
missed attempt record is not a reporting gap — it is a missing element of a motion.

---

## 6. HIPAA-RELEVANT HANDLING

Required by the Task 11 instruction *"wherever email content touches case data."* In this series
that is **everywhere**: mail is the input to all seven pipelines, and WF-4 and WF-7 carry clinical
content by definition.

### 6.1 FINDING — the record already stated this constraint, and the adopting ruling did not carry it

`docs/specs/outlook-email-intake.md` exists at HEAD. Captured **2026-07-23** (phone dictation,
Michael), status EXPLORATORY. Its §"Hard constraint: HIPAA compliance" reads, verbatim:

> "Michael's PI/medical cases put **protected health information** in email traffic. The entire
> pipeline — transport, storage, indexing, any AI processing of email content — must be **HIPAA
> compliant** by design, not retrofitted. This is a first-class design constraint stated at capture
> time, before any architecture exists."
>
> "Any third-party processing of email content (including AI services) needs **BAA/compliance review
> before it touches real mail.** [CONFIRM specifics when this graduates from brainstorm.]"

**That document is not cited by `email-workflow-requirements.md`, is not cited by
`attorney-review-queue.md`, and appears in neither the #63 entry nor any WF row.** Verified by
grepping every file that references it: the referring files are `CLAUDE.md`, `docs/spec-feedback.md`,
`case-management-project-instructions.md`, `criminal-appointment-intake-and-docket-enhancements.md`,
`outlook-calendar-sync.md`, and the session log. **The WF series is absent from that list, and
`outlook-email-intake.md` is absent from the WF material.**

The consequence is concrete, not stylistic: **seven gates were named at #63 and the BAA/compliance
review is not one of them.** The one gate the record had already identified — eighteen days before
the WF series existed, in Michael's own dictated words, as a *first-class* constraint — did not make
the gate table. Two specs describing the same subject sit in `docs/specs/` without pointing at each
other, which is the K-6/K-7 death the gate table was built to prevent, arriving through a different
door.

**Flagged, not repaired.** Neither file was edited. Whether `outlook-email-intake.md` is superseded
by, merged with, or a live gate on the WF series is **Q-WF-5** — and it is a wording act on a ruled
gate table, which is Michael's alone.

### 6.2 FINDING — the constraint has no authority behind it anywhere in the record

Registry dedupe, run at HEAD across **all four** `legal-rule-registry-*.md` files for
`hipaa|PHI|business associate|45 CFR|Health & Safety Code|chapter 181|breach notification`:

**Two hits, both the same entry, and it is unrelated** — `legal-rule-registry-criminal-plea-and-costs.md:43,45`,
*"Tex. Health & Safety Code § 481.115(b) — POCS PG1 under one gram."* A controlled-substances
offense, matched only because it shares a code name.

**There is not one privacy, HIPAA, PHI, or medical-records-confidentiality proposition in the
registry.** The backlog is 34 entries across four files. Zero of them are about the constraint that
`outlook-email-intake.md` calls first-class and `CLAUDE.md` enforces as a hard rule.

**Nothing to dedupe against means every proposition in §6.5 would be new** — and none of them is
verified, because retrieval is not verification and only Michael verifies.

### 6.3 SOURCING — what this session could and could not retrieve, reported rather than papered over

Per the SOURCING convention (Q-STAT-1, RULED 08-14), each source named per item:

| Target | Channel attempted | Result |
|---|---|---|
| **45 CFR 160.103** (definitions) | eCFR **official API**, `/api/versioner/v1/full/2026-08-12/title-45.xml?part=160&section=160.103` | **ROBOTS_DISALLOWED** — the API path is blocked to this session's fetch layer |
| **45 CFR 160.103** | eCFR reader URL, `/current/title-45/section-160.103` | **429** twice, then **partial** on the third attempt — returned **paraphrase with compressed quotations**, not verbatim regulatory text |
| **Title 45 currency** | eCFR **official API**, `/api/versioner/v1/titles.json` | **Retrieved.** `latest_amended_on` **2026-08-10**, `up_to_date_as_of` **2026-08-12**. Request date **2026-08-15 Central** |
| **Tex. Health & Safety Code ch. 181** | Official targeted fetch, `statutes.capitol.texas.gov/Docs/HS/htm/HS.181.htm` (the SOURCING-sanctioned path; `?link=` never used) | **FAILED** — twice returned the site's navigation shell with no statutory text |
| **Tex. H&S ch. 181** via the bulk corpus | `Documents\Knowledge Repo\Statutes <date>\` | **Not attempted.** That folder is not granted this session, and per **H5** a session does not reach into Michael's machine unprompted |

**Consequences, stated rather than worked around:**

1. **No verbatim primary-law text was obtained this session.** Everything in §6.5 is **TIER B** by
   the Task 7 convention — read through a summarizing layer, **not quotable as rule text** — and the
   Texas half was not obtained at all.
2. **Currency is not inferred from any document.** The only currency figure recorded is the one the
   source itself stated: Title 45, `up_to_date_as_of` **2026-08-12**.
3. **The Texas half is the half most likely to bind** (see §6.5), and it is the half that failed.
   That asymmetry is the reason `WF-LOOK-1` exists.

### 6.4 The handling requirements, which hold whichever way the authority question resolves

**PROPOSED. These are design requirements traced to the record's own rules, not legal conclusions.**

The useful property of this list is that **it does not wait on §6.5.** Whether the firm is a HIPAA
business associate, a Texas ch. 181 covered entity, both, or neither, the same handling follows
from `CLAUDE.md` and from ordinary confidentiality duties — so the architecture is not blocked on
the authority question. Only the **scope of a compliance program** is.

1. **No cloud AI processing of mail content.** `CLAUDE.md:272–275`, verbatim: *"PHI-touching AI
   processing (transcription, bill/EOB ingestion) runs **locally** on Michael's GPU machine by
   design — this is a privilege/PHI posture, not a hosting shortcut. Do not introduce cloud AI
   processing of case documents without an explicit decision from Michael."* Mail bodies and
   attachments in a PI practice are case documents. **PROPOSED: this is what "gated on T3" actually
   means for the WF series** — the gate is the *local processing arm*, not the speech model. This
   reading is already half on the record: **Q-IN1-7** asks the same question of IN-1 and reaches the
   same dependency. See Q-WF-3.
2. **A browser SPA reading mail puts PHI in the browser and in whatever the browser talks to.** §4.3
   already concludes the SPA cannot carry the series for execution reasons; this is the independent
   privacy reason, and it points the same way.
3. **Minimum necessary, at the API boundary.** Delta query with `$select` narrowed to the fields a
   classifier actually needs retrieves less PHI than full-body sync. Where a WF pipeline needs only
   the fact that a message arrived and its dedupe key, it should not retrieve the body.
4. **Storage.** No message body or attachment should land in a table without a decided retention and
   privilege posture. The schema already models privilege — `generated_documents.privilege_tier ∈
   {attorney-client, work-product, non-privileged}` — which is a precedent for the *shape*, on a
   table that cannot otherwise serve (§5, WF-3).
5. **App-only credentials, if introduced, are tenant-wide by default** (§4.2). For a solo firm the
   tenant is one mailbox, so the practical exposure is small — but the control is real and Exchange
   Application RBAC is the named mechanism. Recorded so "solo firm, so it doesn't matter" is a
   decision rather than an omission.
6. **The BAA/compliance review named at capture is still owed** and has never had a queue row
   (§6.1). Any third-party processor — including an AI service — that touches real mail needs it
   *before* it touches real mail, per the captured constraint's own words.
7. **Nothing in this series changes the standing bar:** *"A professional security review is required
   before multi-user / live use. Claude is not a substitute for it"* (`CLAUDE.md:276–278`). Gate 2
   reads as multi-user-only, so solo live use proceeds without it — but a mail integration that
   moves PHI is exactly the kind of change that deserves the question asked again rather than
   assumed answered. **Flagged, not decided.**

### 6.5 Propositions — registry-style, ALL UNVERIFIED, NONE ENTERED

**Not entered into any registry file. No registry file was opened for writing. These are drafted in
registry form so Michael can rule on whether they belong there at all — which is Q-WF-6.** Each is
TIER B or worse per §6.3.

**P-1.** *Proposition:* Under HIPAA, "covered entity" is limited to a health plan, a health care
clearinghouse, and a health care provider who transmits health information electronically in
connection with a covered transaction — so a law firm is not a covered entity by that definition.
*Cite:* 45 CFR 160.103. *Status:* **UNVERIFIED.** *Source:* eCFR reader URL, retrieved 2026-08-15
Central; Title 45 `up_to_date_as_of` 2026-08-12. **TIER B — the text returned was paraphrased, not
verbatim.** *The one look:* read the definition in the official text.

**P-2.** *Proposition:* "Business associate" is defined **with respect to a covered entity** — a
person who performs functions or provides services *for or on behalf of* a covered entity involving
PHI — which raises, and does not answer, whether a plaintiff's firm obtaining records under its own
client's authorization is acting for or on behalf of the provider at all. *Cite:* 45 CFR 160.103.
*Status:* **UNVERIFIED.** *Source:* as P-1. **TIER B.** *The one look:* whether the firm has signed
any BAA with any provider or vendor — a fact question about the practice, not a law question.

**P-3.** *Proposition:* Texas Health and Safety Code ch. 181 defines "covered entity" far more
broadly than HIPAA does, reaching persons who come into possession of protected health information,
such that a Texas law firm holding medical records may be within it even if it is outside HIPAA's
definition. *Cite:* Tex. Health & Safety Code ch. 181. *Status:* **UNVERIFIED — AND UNRETRIEVED.**
*Source:* **none obtained this session** (§6.3). **This proposition is stated as the question to
run, not as a finding**, and it is flagged as the highest-value of the three precisely because it is
the one that could make the whole §6.4 list a statutory obligation rather than a prudential one.

**The divergence worth naming, and NOT resolving.** The record calls HIPAA compliance a
*"first-class design constraint"* in Michael's own dictated words. P-1 and P-2, if they hold,
suggest **HIPAA may not bind this firm directly at all**, while P-3 suggests **Texas law may bind it
more broadly than HIPAA would**. If both are right, the constraint as captured is *aimed at the
wrong statute* — not wrong about the obligation, wrong about its source, which changes what
"compliant by design" concretely requires.

**This session does not assert that.** It is the same failure class this chain keeps surfacing — a
figure or a wording in the record that no one has checked against the authority (the *"79 codes"* at
#84; *"each party"* vs *"any other party"* at #81) — and the correct act is identical: **flag it,
name the look, change nothing.** Claude does not verify legal currency. **`WF-LOOK-1`.**

---

## 7. DATA-MODEL TOUCHPOINTS — consolidated

Verified at HEAD across `db/schema.sql` (36 `create table` statements) and all three migrations
(`2026-07-28-api-role-grants.sql`, `2026-07-28-cl2-client-dimension.sql`,
`2026-08-12-cd1-contact-directory.sql`). **Word-bounded** matching — the #83/#84 lesson: substring
matching on short tokens produces false positives inside ordinary words.

| Token | Hits |
|---|---|
| `email`, `emails`, `message`, `messages` | **0** |
| `envelope`, `envelopes` | **0** |
| `signature`, `signatures`, `esign` | **0** |
| `attachment`, `attachments`, `mailbox` | **0** |
| `thread`, `threads`, `correspondence`, `communication` | **0** |
| `records_request`, `custodian` | **0** |
| `invoice`, `invoices`, `referral`, `referrals` | **0** |
| `settlement`, `lien`, `liens` | comments only (`schema.sql:200, 379, 395–396, 409, 471`) — **no table, no column** |
| `graph`, `outlook` | **1 each** — both in the `calendar_events` comment block (`schema.sql:571, 574`) |

**Reading:** the WF series has **no substrate whatsoever**. Not a thin one — none. Every one of the
seven pipelines would create its first table.

**Two existing shapes worth naming as precedent, each with its caveat:**

- **`calendar_events`** is the only table in the schema that models an external-system linkage:
  `outlook_event_id text`, `sync_status text check (… 'pending','synced','error')`, `sync_error text`,
  `last_sync_at timestamptz`. **That is a good shape** for "a local row that mirrors something in
  Graph, and knows whether the mirror is current." *Caveat:* it is also the table the unfixed
  duplicate-on-first-edit defect lives against, so it is a precedent for the *columns*, not for the
  *sync strategy*.
- **`generated_documents.privilege_tier`** — a precedent for classifying stored content by privilege
  posture (§6.4 item 4). *Caveat:* that table cannot itself serve WF-3 (§5).

**One structural rule that binds any WF table from birth, and is easy to lose:** BUILD-STATE —
*"GRANTS ARE PART OF THE SCHEMA — load-bearing. `authenticated` ONLY, `anon` gets nothing by design.
`ALTER DEFAULT PRIVILEGES` is NOT set: **every new table must carry its own GRANT or it is
unreachable.**"* And the RLS probe covers **36** tables — *"keep it in step or a missing GRANT
hides."* CD-1 carried its own grants in the same commit as its tables; any WF slice does the same.

---

## 8. FAILURE MODES — cross-cutting

**PROPOSED.** Ordered by what they cost if missed.

1. **Templated automation reaches a client message.** The RULED constraint is absolute — *"client
   emails get human routing, NEVER templated automation."* The realistic violation is not a rogue
   auto-reply; it is a *helpful* one: a WF-7 follow-up generator that treats an inbound client
   status question as a records-chase message, or a WF-2 acknowledgment that fires on a client
   forward of a filing notice. **Classification error becomes rule violation.** Any inbox-facing
   design needs a client-sender check that runs *before* the pipeline classifier and can only route
   to a human — and the party/contact substrate to identify a client sender exists now (CD-1's
   `parties`, `case_parties`, `case_clients`, `contact_edges`), which it did not when the survey ran.
2. **The ignore layer suppresses the signal.** WF-2's most valuable observed event was **8
   undeliverable notices** — a bounce storm, i.e. exactly the noise class the ignore layer exists to
   suppress. A hard ignore layer tuned on the survey's noise inventory would have discarded the
   survey's best finding.
3. **A gate is read as satisfied because `T3` resolved to the wrong series** (§3). Silent, and it
   licenses the whole series.
4. **The adopted document is read as an adopted design** (§2.2). Also silent, and the disclaimers
   sit in files the build would not open.
5. **Dedupe collapses two things into one.** Envelope number and claim number are issued
   identifiers and reasonably safe; **document name is a typed string** and is not. A false merge is
   worse than a false split: a split shows up as duplicate rows, a merge shows up as a state that
   silently belongs to the wrong matter.
6. **Absence-detection has no floor.** WF-3's "stuck at attorney," WF-7's stall alerts, and WF-5's
   10-day rule all fire on *nothing happening*. A background runner that is merely down produces the
   same observation as a genuinely stalled matter — so any stall feature needs liveness evidence
   distinguishing "no message" from "not looking," or it will one day report calm while the runner is
   dead.
7. **Subscription expiry as silent data loss.** Outlook message subscriptions cap at **under 7 days**
   (under 1 day with resource data). A renewal failure is not an error the user sees; it is a queue
   that quietly stops filling. Delta polling degrades more honestly — a missed poll is recoverable
   from the stored `deltaLink`.
8. **A `service_*` column name collides with live medical semantics** (§5, WF-8).

---

## 9. NON-GOALS — stated so a build cannot infer them

1. **Nothing here authorizes anything.** All seven rows stay ⬜. A spec is not a closure.
2. **No module design is proposed for WF-5.** §5 deliberately stops at the observed shape.
3. **No transmission.** Not filing through the app (an EFSP act — Task 7), not sending for
   signature, not sending mail. Every pipeline mapped here is **inbound and read-only**.
4. **No ingestion of bills, records, or crash reports from mail attachments.** That is Phase 1b /
   IN-2 territory and separately gated.
5. **No naming of the CD-1 service-story consumer** (§5, WF-8) — that reopens a living spec.
6. **No registry entry created, moved, or reworded**; no proposition marked verified; **no
   replacement wording drafted for anything** — route (c) was ruled a one-off and is not standing
   law.
7. **No `T3` series renamed or renumbered** (§3) — flagged only.
8. **No file edited.** Not `email-workflow-requirements.md`, not `outlook-email-intake.md`, not
   `attorney-review-queue.md`, not `outlook-calendar-sync.md`, not `outlook-setup.md`, not
   `CLAUDE.md`, not `db/schema.sql`, not any migration, not any registry file.
9. **No durable ID minted.** `Q-WF-n` and `WF-LOOK-n` are packet-local.
10. **This document does not answer whether the firm is subject to HIPAA, ch. 181, or both.**

---

## 10. OPEN QUESTIONS — full text, Michael's

Packet-local IDs. **Per QR-1 the full text travels into the queue, never ID + label alone.**

**Q-WF-1.** The #63 adoption ruled that `email-workflow-requirements.md` enters the repo verbatim as
a design input and that its contents *"remain PROPOSED at the module level"* — but that limitation
is stated only in the adoption addendum and in the queue, while the seven pipeline paragraphs in the
document's body are written in a survey's confident register (*"Module implications: envelope-state
tracking, returned-filing deadline alerts, service-failure detection"*) with no marking of their own.
A build session that opens the file and reads it top-down encounters seven module descriptions before
it encounters any statement that none of them is ruled. **Should the seven body paragraphs carry an
in-place PROPOSED marker, or does the addendum-plus-queue placement suffice — and if a marker is
wanted, is adding one an edit to a document that was adopted VERBATIM, and therefore yours rather
than a session's?**

**Q-WF-2.** `T3` names two different build tiers in two repo design docs: the transcription pipeline
service (`transcript-sort-and-route-design.md:148`, gated on P1 hardware and KICK-1, **unauthorized**)
and the LegiScan poller/matcher/watch-flags tier (`statute-text-and-bill-tracking-design.md:107`,
gated on the O1 key, and **substantially built** per `session-log.md:7718` and BUILD-STATE's live
`/statutes` and `/bills` screens). Five of the seven WF gates say "gated on T3" without naming which
series, and the two readings gate oppositely — one blocks the series, the other reads it as unblocked.
The record has ruled on this exact class once, re-lettering H → HK at #66 rather than tolerating a
collision. **Does the `T` series get the same treatment — and if so, which one moves — or is a
pointer note on the WF rows naming the intended doc sufficient? Renaming is your act; this session
flagged and changed nothing.**

**Q-WF-3.** BUILD-STATE's `T3` (the transcription tier) is a **speech** pipeline, and nothing in the
WF rows explains why an **email** pipeline should be gated on it. The proposed explanation is that
the real gate is `CLAUDE.md:272–275` — *"PHI-touching AI processing … runs locally on Michael's GPU
machine by design … Do not introduce cloud AI processing of case documents without an explicit
decision from Michael"* — so "gated on T3" means "gated on the local processing arm," and mail bodies
are case documents. **Q-IN1-7 asks the identical question of IN-1 and reaches the same dependency.**
**Is that the correct reading of the WF gates — and if it is, should the gate be restated in those
terms, since "the local AI arm exists" and "the speech pipeline is authorized" are different
conditions that could be satisfied at different times?**

**Q-WF-4.** The single auth surface is a single-tenant public-client browser SPA using MSAL with
PKCE, holding one delegated scope (`Calendars.ReadWrite`), with **per-browser tokens**, a
`localhost:5173` redirect, and no server-side identity. Every WF pipeline is a background watcher
measured in days and weeks (*"stuck for weeks," "weeks-long stalls," "10+ days"*), Graph webhooks
require a publicly reachable HTTPS endpoint answering in 3–10 seconds, and even delta polling needs a
process running when no browser is open — which means app-only credentials, i.e. a client secret or
certificate this registration deliberately does not have. **Does this application acquire a
server-side identity, and of what shape (deployed Supabase Edge Function, a process on the GPU
machine, something else)? This question is upstream of all seven WF rows, it is not in the queue
under any ID, and no WF gate names it.**

**Q-WF-5.** `docs/specs/outlook-email-intake.md` (captured 2026-07-23, EXPLORATORY) states as a
*"first-class design constraint"* that *"the entire pipeline — transport, storage, indexing, any AI
processing of email content — must be HIPAA compliant by design, not retrofitted"* and that *"any
third-party processing of email content (including AI services) needs BAA/compliance review before it
touches real mail."* That document is **not cited by `email-workflow-requirements.md`, not cited by
the queue's WF rows, and not mentioned in #63** — so the BAA/compliance review is not among the seven
named gates, even though it was on the record eighteen days before the WF series existed and
`criminal-appointment-intake-and-docket-enhancements.md:84` already points at it for what is now
WF-6's residue. **Is `outlook-email-intake.md` superseded by the WF series, merged into it, or a live
eighth gate on every inbox-facing WF item — and does the BAA/compliance review get its own queue
row?**

**Q-WF-6.** There is **no privacy, HIPAA, PHI, or medical-records-confidentiality proposition in any
of the four registry files** — verified at HEAD; the only Health & Safety Code hit is
§ 481.115(b), a controlled-substances offense. Registry discipline says *"every legal proposition any
module relies on is a registry entry with a cite and a verification status,"* and the WF series
relies on a privacy proposition in its architecture. **Do the privacy propositions belong in the
registry at all — and if so, in which file, or does this need a fifth registry file? (Q-STAT-5
already holds an unresolved fifth-file question from the insurance sweep; this would be the second
candidate, and deciding them together may be cheaper than deciding them apart.)**

**Q-WF-7.** This session could not obtain verbatim primary-law text for the privacy question: the
eCFR API path is robots-blocked to it, the eCFR reader URL rate-limited and then returned paraphrase
rather than quotation, and the sanctioned targeted fetch for Tex. Health & Safety Code ch. 181
(`statutes.capitol.texas.gov/Docs/HS/htm/HS.181.htm`) returned the site's navigation shell twice with
no statutory text. The Knowledge Repo corpus was **not** reached, per H5. **When a design session
needs Texas statutory text and the targeted official fetch fails, is a per-instance directed grant of
the `Documents\Knowledge Repo` corpus folder the intended path (the #75 deadline-memo precedent), or
should the session stop and hand you the look? This is the third chain task to hit a retrieval
ceiling and the first where the fallback failed too.**

**Q-WF-8.** WF-7's row records that clerk-fee cost tracking *"cross-links the future money question —
flagged, not assumed."* WF-7 could be designed without any cost tracking at all (request aging, stall
alerts, and follow-up generation need no money model), which would free it from the money gate that
doubly blocks WF-5. **Is WF-7 severable from cost tracking — designed as a records-chase board with
fees explicitly out of scope — or does severing it create the half-item problem Q-IN2-9 raises about
IN-2, where the deferred half never gets finished?**

**Q-WF-9.** WF-8's row says its board is *"evidence FOR that revisit, not a separate structure,"*
referring to CD-1's deferred service-story fields, which CD-1 deferred to *"the first instrument
consumer"* — and #83 found that consumer **has never been named** (Q-IN3-3). WF-8's service evidence
is inbound and evidentiary (a return of service, with a date that drives deadlines); IN-3/IN-4's
service events are outbound and generative (a certificate of service on an instrument the firm
serves). **Is WF-8 a candidate to be that first consumer — and are those two service stories one
column set or two? Naming a consumer reopens CD-1's living spec, so this session nominated nothing.**

**Q-WF-10.** Five of the seven WF rows have a substantive treatment elsewhere in the repo that the
row itself does not cite: WF-2's filing-moment contest and EFSP exposure live in
`bexar-local-rules-and-efiling-2026-08-15.md` (#80, with `LR-LOOK-1` already open); WF-6's residue is
described at `criminal-appointment-intake-and-docket-enhancements.md:84`; WF-3's storage precedent is
form-engine §10; WF-4's client dimension is CL-2's; WF-8's is CD-1's deferral. **Should the WF rows
carry pointer annotations to those treatments, and is adding them a queue-runner act at the next
reconcile or a ruling act of yours? The gate table exists to stop items dying silently; an item whose
substantive work sits in a doc it does not cite is a softer version of the same death.**

---

## 11. NAMED LOOKS — Michael's, not a session's

**`WF-LOOK-1` — the privacy authority, and it is the only one that changes the architecture.**
Three propositions in §6.5, none verified, one (P-3, Tex. Health & Safety Code ch. 181) not even
retrieved. The question in one line: **does ch. 181's broader "covered entity" definition reach this
firm, and is HIPAA — the constraint the record actually names — the wrong statute to have named?**
§6.4's handling requirements hold either way, so **no build is blocked on this**; what turns on it is
whether those requirements are a statutory compliance program or prudential design hygiene. The
practical first move is the cheaper fact question inside P-2: **whether the firm has signed a BAA
with any provider, clinic, or vendor** — that is a look at the firm's own files, not a research task,
and it may resolve the business-associate half without any statutory reading at all.

**`WF-LOOK-2` — the Graph figures.** Every number in §4.2 is TIER B (Microsoft Learn through a
summarizing fetch layer). They are stable, vendor-published, and low-risk, but the subscription
lifetimes and the 3-second/10-second delivery windows are load-bearing if a webhook design is ever
chosen. A build session confirms them against the live documentation before relying on them. **Not
yours — a build session's, recorded here so it is not skipped.**

---

## 12. What this session did not do

- **No file edited.** The full list is §9 item 8.
- **No row closed.** WF-1 through WF-8 all remain ⬜.
- **No durable ID minted**, no question renumbered, no existing question answered.
- **No registry file opened for writing**; no proposition entered or marked verified; **no
  replacement wording drafted for anything.**
- **No `T3` series renamed** (§3); **no in-place marker added** to the adopted document (Q-WF-1);
  **no pointer annotation added** to any WF row (Q-WF-10). All three are wording acts on ruled
  material.
- **No src/ file read.** The working-set policy says design sessions do not read source, and
  BUILD-STATE is the sole authority on what is built. Consequence, stated rather than hidden: the
  auth-surface findings in §4.1 rest on `docs/outlook-setup.md` and
  `outlook-edit-cancel-exercise-2026-08-13.md`, which are documentation of the registration rather
  than the code that consumes it. **If the shipped MSAL configuration has drifted from
  `outlook-setup.md`, this session could not see it.**
- **No sweep of Michael's machine** (H5). The Knowledge Repo was not reached and was not listed.
- **No scratch written into the connected folder.** The only artifact placed on Michael's disk is
  the packet zip in the gitignored `inbox/`, which the queue runner consumes and deletes.
- **Descrybe not used** (TOOLING, 08-13). **CourtListener not used** — nothing here rests on case
  law. **No case-law retrieval was run at all**, so the majority-opinion rule had no occasion to
  apply.

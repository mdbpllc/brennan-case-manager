# Project history, day by day — 2026-07-21 → 2026-07-26

**Status:** ARCHIVE. Not canonical, not a design doc, not in the build queue. Replaces
`archive-2026-07-26-deltas.md`, which covered only the final day; that file's content is
folded into the 07-26 section below.

**What this is for:** the session log runs ~76 entries in reverse-chronological order with
no day boundaries, which makes "what happened on the 24th?" genuinely hard to answer. This
file answers it. For what exists in the app **right now**, read `BUILD-STATE.md` — nothing
here is a live claim.

**On the model column — read this before trusting it.** Model attribution was **not
recorded at all before 2026-07-25**. Entries from 07-21 to 07-24 name the *interface*
("Claude Code") but never the model, so those rows say **unrecorded**, not "unknown model"
and not a guess. From 07-25 the design side began stamping headings with Fable 5 / Opus 5.
Code-session entries generally still omit it, because Claude Code's model is whatever was
selected at the time; where today's sessions are known, it is stated.

| Day | Sessions | Code / design | Models recorded | Net effect |
|---|---|---|---|---|
| 07-21 | 5 | 0 / 5 | unrecorded | Environment + first review passes |
| 07-22 | 3 | 0 / 3 | unrecorded | v0.1 signed off; billing decisions |
| 07-23 | 11 | 2 / 9 | unrecorded | **Billing Phase 1a BUILT** |
| 07-24 | 7 | 5 / 2 | unrecorded | **Outlook push Phase 1 BUILT** |
| 07-25 | 27 | 18 / 9 | Fable 5 ×3, Fable→Opus ×1, Opus 5 ×2 (21 unstated) | **The big build day** — 6 slices |
| 07-26 | 24 | 9 / 15 | Opus 5 ×13 (11 unstated) | Docs/design + **one** code fix |

---

## 2026-07-21 — five sessions, all design/setup. Models unrecorded.

The project moves into Claude Code. The conventions block is drafted — the ancestor of
today's CLAUDE.md. Build environment stood up, v0.1 test-driven, then two review passes: a
cleanup/improvements pass and a robustness + schema-hardening pass.

**Decided this day and still binding:** private GitHub hosting.

## 2026-07-22 — three sessions. Models unrecorded.

**v0.1 walkthrough SIGNED OFF** by Michael, with feedback captured. Billing-module
decisions taken and the **Citizens MRF dry run COMPLETED** on the real 55 MB file — that
file becomes the Phase 2 reference fixture, referenced by local path and deliberately never
committed.

**Promoted this day:** the Legal Rule Registry to system-wide core infrastructure, which is
why registry discipline governs every module since.

## 2026-07-23 — eleven sessions (2 Code, 9 design). Models unrecorded. First big build.

**Billing module Phase 1a BUILT** in an overnight session, then audited in a gap-closing
pass, then **walked through and APPROVED**. Real Medicare PFS data pulled for TX Rest of
State. That approval matters today: it is the "built and walked" code the CL-2 slice would
rework.

Specs captured in parallel — a phone-dictation session produced three at once (OAA intake,
Outlook sync, email intake); the Forms & Document Automation Engine was fully specified;
criminal appointment intake + docket enhancements filed. Registry draft entries committed
and a first verification session run. Two Code sessions closed the loop: a design-space
round trip, and v0.1 feedback (phone masking, filterable combobox).

## 2026-07-24 — seven sessions (5 Code, 2 design). Models unrecorded.

**Outlook calendar push Phase 1 BUILT.** Worth flagging in hindsight: this is the slice
that sat unexercised until 2026-07-26, when the first real attempt found two blocking
defects in it (see that day).

CourtListener/Free Law Project integration designed and snapshotted — the design that is
still unbuilt and still gated. A feature-intake design session captured the 2026-07-24
dictation, filed by a following Code session. Late that day, probate was routed to the
design space — the first appearance of what became S-1, PR-1/PR-2, and PR-3.

## 2026-07-25 — twenty-seven sessions (18 Code, 9 design). The heaviest day by far.

**Models:** the first day with attribution. Fable 5 on three design sessions, one session
handed off Fable 5 → Opus 5 mid-walkthrough, Opus 5 on two; the remaining 21 (nearly all
Code sessions) are unstated.

**Six vertical slices built in one day:**
- Transcript sort & route **T1 + T2**
- **Office notes**, plus §10 decisions and pilot fixtures wired
- **OAA criminal intake Tier 1** — then tuned against the first real order, then a second
  real order made the OCR layer extract end to end
- Statute **cite parser T1**, live-verified
- Statute **cache + viewer + A4 hash tripwire (T2)**
- **Bill tracking T3 + unified worklist T4** — completing the statute-tracking design in-app

**The infrastructure lesson of the project also lands this day.** A sync-channel diagnosis
found project knowledge was fed by a GitHub sync that was both stale and over-broad; the
design side had been working from a view ~32 commits behind because a blocked push went
unnoticed. The fixes: `BUILD-STATE.md` created as the one-doc build snapshot, the
build-state bridge template adopted, status claims stripped from the master spec and README
so status lives in exactly one place, and the verified-push convention made binding. Every
session-close routine in use today traces to this day.

Also: the Medical-tab walkthrough (Garcia, demo mode) surfaced a schedule-selection defect
and routed the go-live gates; BUILD-SESSION-NOTES was triaged and cleared; the sync-scope
ruling was recorded; the case-heartbeat design doc was written and walked across several
voice sessions (H14 service chase, suit-filed, default judgment, depositions, mediation);
and APIL 2025 course-book mining passes 2 and 3 ran.

## 2026-07-26 — twenty-four sessions (9 Code, 15 design). Opus 5 on 13; 11 unstated.

Documentation and design all day, with **exactly one code change** — late, and only after
Michael hit a real failure.

**Migration.** Design work moved to a new Claude project; the old one became the
LEGAL AUTHORITY ARCHIVE. Sync narrowed to `docs/`, `db/`, `supabase/`, `CLAUDE.md`,
`README.md`, `BUILD-SESSION-NOTES.md` — **`src/` deliberately excluded**, which is what
makes BUILD-STATE the design side's sole authority on build state.

**Process conventions adopted.** The gitignored `inbox/` + `docs/prompts/QUEUE-RUNNER.md`
queue (Q-1), `docs/prompts/` as the canonical cross-interface prompt home (Q-2), and the
majority-opinion rule after a live near-miss where a CourtListener cluster ID resolved to
the *dissent* in Haygood rather than the Court's opinion.

**Statutes.** Est. Code ch. 352 + CPRC ch. 71 read in full. The probate fee-basis row was
found **misclassified on both halves**, §352.052 was missing from the docs entirely, the
fee-basis enum was **decomposed** into a record (O6), and a new deadline primitive **P7**
was identified that must not share code with P1.

**The client model, ruled end to end across three design sessions.** The case owns the
occurrence and liability; the **client** owns the damages. Ten decisions closed — entity
renamed `claimant` → `client` with a `posture` field, practice-area profiles derived with
no override, case-level limitations retired, per-expense tagging with shared expenses split
evenly, shares locking at disbursement, the flag split, single-client files rendering
unchanged, `case_clients` parallel to `case_parties`, and CL-2 shipping as its own slice
before CE1. **One of PI's three hard gates changed scope**: the PR-appointment gate now
blocks only the deceased client. **None of it is authorized** — the CL-2 build decision was
reserved for a Fable session, with `cl2-authorization-brief.md` staged for it.

**Record hygiene.** Four stale/contradictory items reconciled, including a cleared item
that had copy-forwarded across ~12 entries on both sides. Practice areas corrected to
**four** (PI / civil litigation / criminal defense / probate) after civil litigation was
dropped in successive paraphrases — including Code's own. Project instructions v4 pasted,
closing INSTR-3.

**The one code change — Outlook.** Michael registered the Entra app and tried to connect
for the first time. It failed twice, for two independent reasons neither of which was his
configuration: the redirect URI pointed at the app root, where the router's
`<Navigate to="/cases" replace />` destroyed the auth-response fragment; and the slice was
written against an MSAL popup contract that v5 no longer honors — the opener stopped
polling, so a static redirect page could never complete sign-in. Both fixed (4 files);
**a demo event reached the "MDBP Cases" calendar — the first thing this app has ever pushed
to Outlook.** Creation only; edit and cancel propagation remain unverified.

**The lesson that generalizes.** "Written but never exercised" is not a neutral state. Two
blocking defects sat in the Outlook slice from 2026-07-24 and both surfaced within minutes
of first contact. The two undeployed edge functions should be assumed to carry the same
class of risk.

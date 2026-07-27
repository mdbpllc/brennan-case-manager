# Operational Blockers + Session Close — Capture (2026-07-26, design session, Opus 5)

**Status:** RAW CAPTURE — design session, design side. Not canonical, not a design doc, not in the build
queue. The client-model content of this same conversation is ALREADY FOLDED into
`docs/specs/claimant-dimension-and-case-links-design.md` across three applied packets (`a74c708`, `2c2bff0`,
`0521c9e`) — **this capture covers only what came after: the operational-blockers analysis and the session-close
decisions.** Do not re-fold the client model from here.

**Canonical repo path:** `docs/specs/operational-blockers-capture-2026-07-26.md`

**How to use this in the next chat:** paste nothing. The next session reads BUILD-STATE and the top log
entries per standing convention; this capture is the detail behind the log entry for whoever needs it. The
**RESUME POINT** is in Part 6.

**Markers:** `[C]` ruled aloud · `[P]` proposed, unruled · `[D]` Claude analysis · `[OPEN]` asked, unanswered.

---

## PART 0 — WHERE THIS PICKED UP

The client model closed (all D-CL2 items ruled or assigned, three packets applied same-day). Claude framed
CL-2 build authorization as the highest-leverage open decision; Michael: **"I really believe that we ought to
leave this authorization piece for Fable."** `[C]` Then: **"Run through the four operational blockers."** Then,
on Claude's re-pass: **"Make what decisions you can while we have tokens and package a refresh."** `[C]`

## PART 1 — THE FIRST PASS, AND WHY IT WAS WRONG `[D]`

Claude presented the four blockers as parallel errands: (1) Supabase auth, (2) the two edge-function deploys,
(3) Entra registration, (4) the Citizens MRF path. Suggested sequence: MRF + Entra first as quick wins, edge
functions next, auth last.

Michael: **"Think all of this through one more time."** `[C]` The re-pass found the first pass structurally
wrong. Preserved because the correction is the finding.

## PART 2 — THE CORRECTED ANALYSIS `[D]`

**2.1 The edge functions are DOWNSTREAM of auth.** Deploying the legiscan-poller populates `tracked_bills`
in Supabase — but the app reads those tables either from demo mode (localStorage, never touches Supabase) or
Supabase mode, where anon-key + authenticated-only RLS means **every query is refused**. Deploying today
feeds tables nothing can read. "Largest gap between built and useful" was the wrong frame; deployment without
auth moves the dead end one step later.

**Caveat `[OPEN]` — the statute-fetch half is unverified:** whether the `/statutes` viewer's cache reads
reach Supabase from demo mode is a **Code question** (Q-CODE-1 below). Its answer decides whether
statute-fetch is equally blocked or independently deployable.

**2.2 Auth is the root, and the decision is smaller than Claude first framed it.** Claude asked whether to
build for staff logins from the start — but the project instructions already answer it: multi-user is
trigger #2, gated behind the professional security review. The decision collapses to **single-user sign-in
for Michael, now, method of his choosing.** Staff later, behind the review, as designed.

**Auth alone does not unlock real data.** Real client data is gated by ALL of `docs/specs/Go_Live_Gates.md`
(gates 1–8, incl. Supabase Pro and the security review), which is binding. Auth unlocks the central database;
the gates unlock real data.

**2.3 Entra is genuinely independent — with a gates caution.** The Outlook push runs client-side to Graph and
works from demo mode. But live push invites pushing **real hearing dates**, and real-data work is what
Go_Live_Gates gates. Fictional demo events fine; the actual docket is a gates question first.

**2.4 MRF was overstated by association.** Blocks nothing current — Phase 2 billing isn't next. Thirty
seconds of writing a path down.

**Corrected sequence: auth decision → auth slice → then edge functions; Entra independent (fictional data
only); MRF whenever.**

## PART 3 — END-OF-SESSION DECISIONS (marked precisely)

| # | Decision | Marker |
|---|---|---|
| 1 | **Auth method: magic link.** Single user, no stored passwords, Supabase-native, adds no password-reset machinery ahead of a security review | **PROPOSED `[P]`** — Claude's recommendation, default unless Michael objects; **not ruled**, and the auth SLICE is separately unauthorized |
| 2 | **Edge functions wait for auth.** Sequencing on a demonstrated dependency (2.1) | **`[D]` — Claude's call, within its lane**; exception: Q-CODE-1 goes in the next batch |
| 3 | **Entra proceeds, fictional data only** until Go_Live_Gates says otherwise. The constraint is recorded here so it binds from the record, not from chat | **`[D]` sequencing + `[C]`-adjacent** — Michael asked for decisions to be made; the fictional-only scope is Claude's, flagged for his veto |
| 4 | **MRF = one-line ask**: Michael names a folder, it goes in CLAUDE.md, item closes | **`[D]`** |
| 5 | **CL-2 authorization reserved for Fable** | **CONFIRMED `[C]`** — Michael's words in Part 0. Brief staged (see routing) |

## PART 4 — THE BIAS DISCLOSURE `[D]`

Claude stated in-session, and the authorization brief carries it: Claude has a stake in CL-2 being built,
having spent the session arguing for it. A brief written by the advocating party should be read as such; the
risk section is the part to read hardest.

## PART 5 — CLAUDE PROCESS NOTES (the day's pattern, completed)

1. **The four-blockers first pass presented a dependency chain as parallel errands** — the structure surfaced
   only on Michael's requested re-pass. Third instance today of confident presentation ahead of structural
   check (after the `claude/` cite over-generalization and the venue-split over-build).
2. **Ordered a strike on text never written** (round-2 packet, C.2): Claude read its own chat output as if it
   had reached the doc. The design side losing track of disk-versus-said — the exact failure the packet
   system exists to prevent.
3. **D-CL2-3 dropped from the running open list mid-session**, recovered at close. Same drop class as
   session-log #13/R-3.

## PART 6 — RESUME POINT

**The next Fable session opens with the CL-2 authorization decision**, reading
`docs/specs/cl2-authorization-brief.md` + the design doc, then rules yes/no/defer and records why.

**Michael's own queue, unchanged by this session:** paste project-instructions v4 (closes INSTR-3, lets Code
clear `inbox/`); the auth-method confirmation (magic link is the standing default); Entra registration
(fictional data only); name the MRF path; D-CL2-3; the four client-model proposals (UM-1, UM-2, PR-GATE-1,
MIN-1); D-CL2-2a; PR-3; the registry sign-off queue.

## PART 7 — OPEN ITEMS FROM THIS SEGMENT

| ID | Item | Status |
|---|---|---|
| **Q-CODE-1** | Does demo mode's `/statutes` viewer touch the Supabase statute cache at all? Decides whether statute-fetch is auth-blocked or independently deployable | **OPEN — for Code, next batch** |
| **AUTH-1** | Auth method: magic link | **PROPOSED — Michael's confirmation** |
| **AUTH-2** | The auth slice itself | **UNAUTHORIZED — needs Michael, likely after CL-2 decides** |
| **ENTRA-1** | Entra registration, fictional-data-only scope | **OPEN — Michael's 20 minutes; scope constraint recorded** |
| **MRF** | Name the local path | **OPEN — one line** |

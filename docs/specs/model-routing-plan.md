# Model Routing Plan — brennan-case-manager

**Status: DECISION MEMO — UNRULED. Drafts the Q-5 clause; does not close Q-5.** Nothing here is adopted,
authorized, or binding. Drafted 2026-07-26 (design session, Opus 5) at Michael's request, ahead of the
Tuesday Fable allowance reset; filed 2026-07-27.

**Relationship to Q-5:** this memo **addresses the shape of** open item Q-5 ("model-usage clarifying clause
unruled" — carried since 2026-07-26, v3 and v4 both kept the v2 wording) and **drafts a clause at §7.2**.
It does **not** resolve Q-5. Closing Q-5 is Michael's ruling, and doing so fires **instructions trigger #3**,
after which the model-usage clause in the project instructions must be rewritten the same day.

*(Code note, 2026-07-27: the drafted header read "This resolves open item Q-5," which contradicted both this
packet's §4.1 status line and its own §3 log entry, each of which say the memo drafts the clause without
closing the item. Reconciled to the packet's framing on filing — the memo is otherwise verbatim.)*

**Canonical repo path:** `docs/specs/model-routing-plan.md` — filed unruled, same footing as
`cl2-authorization-brief.md`.

*(Status note, 2026-08-13, #68: **Q-5 was RESOLVED 2026-08-13 (#66)** — the §7.2 clause was adopted into project-instructions v17's MODEL USAGE section, economics refreshed to the observed Max-plan terms; routing now binds through the instructions, not through this memo. The header above stands as written — the memo never closed Q-5; Michael's ruling did. Effort levels remain unset. See the queue's Q-5 row and session-log #66/#67.)*

**Bias disclosure:** written by Claude Opus 5, which is one of the two models being allocated, and which
recommends that its own week of output be audited by the other. Read §5 with that in mind.

---

## 1. THE CONSTRAINT, CORRECTED

Per Anthropic's support documentation (support.claude.com, "Claude Fable 5 on your plan"): on Max plans and
premium Team/Enterprise seats, **Fable counts toward the plan's usage limits, and up to 50% of the weekly
usage limit may be spent on Fable at no extra cost.** Beyond that, work continues either on usage credits at
API rates or on another model within plan limits.

**Three consequences that change how this project should operate:**

1. **The allowance is weekly and does not roll over.** Conserving Fable only pays if the conserved allowance
   is spent on higher-value work *in the same week*. Unspent allowance is lost. **The governing question is
   allocation, not conservation** — which is the opposite of how the design side has been reasoning since
   2026-07-24.
2. **Fable and Opus draw from one pool.** A Fable turn costs roughly double an equivalent Opus turn
   (API reference rates: $10/$50 per Mtok vs $5/$25), so heavy Fable use shortens the total working week.
3. **Exhausting Fable is not exhausting Claude.** The remaining allowance stays available to Opus 5 and
   Sonnet 5. Running the Fable half out is therefore recoverable; running the *whole* week's allowance out
   through unmetered agentic Fable use is not.

**Instrumentation available and currently unused:** `/usage` in Claude Code and Settings → Usage on
claude.ai, with consumption attributed to skills, subagents, plugins, and MCP servers. Caveat from the same
reporting: Claude Code's figures derive from local session history on that machine, so claude.ai usage does
not appear there. **Check both surfaces, not one.**

**Account facts, confirmed by Michael 2026-07-26:**

- **Plan: Max 20x.** The largest consumer tier. Half of a Max 20x weekly limit is a substantial Fable
  allowance — **materially weakening the scarcity premise this project has operated under since 2026-07-24.**
- **Usage credits: OFF, and Michael was unfamiliar with them.** Credits are Anthropic's prepaid
  pay-as-you-go layer, billing at API rates once plan limits are exhausted. **With them off there is no
  auto-charge exposure**: hitting the Fable cap results in a model switch or a stop, never a silent bill. The
  runaway-spend scenarios described in third-party reporting do not apply to this account.
  **Recommendation: leave credits off.** They convert a hard stop into an open-ended charge, and this project
  has no workload that justifies that trade.
- **Claude Code has been running Fable 5 at `high` effort** for coding, up to 2026-07-26. See §4.1 — this is
  the single most consequential finding in this document.

## 2. WHAT THE DOCUMENTATION ACTUALLY SUPPORTS

**Anthropic's docs never compare Fable 5 to Opus 5 on capability.** Every Fable improvement is stated against
Claude Opus **4.8**. The migration guide's "Migrating to Fable from Claude Opus 5" section lists only
always-on thinking, pricing, Priority Tier, and data retention — no capability delta. The Opus 5 page states
it delivers "frontier intelligence at half the cost of Claude Fable 5."

**Conclusion: there is no documented basis for a confident capability ranking between them.** Any routing
plan claiming otherwise — in either direction — is reasoning from sources Anthropic did not write. This plan
routes on *documented named strengths* and on cost, not on an assumed ranking.

### Documented Fable strengths that map onto real work in this project

| Fable strength (per Anthropic) | Where it lands here |
|---|---|
| Navigating ambiguity; complex multithreaded requests; determining next steps | The ruling queue; CL-2 authorization; open design questions with no prior art |
| Vision — dense technical images, web applications, detailed screenshots | **CAL-1**, the calendar/Outlook walkthrough (screenshot-driven); any future click-through session |
| Code review and debugging; high bug-finding recall including search across a codebase and its history | **The design-corpus audit (§5)**; future review of built slices |
| Performs particularly well with a memory system recording lessons across runs | This project already has one — session log, BUILD-STATE, spec-feedback, the deltas archive |
| First-shot correctness on complex, well-specified problems | Anything handed over as a fully specified brief |
| Long-horizon autonomy; parallel subagents | Large agentic builds — **but see §4's negative recommendation** |

### Documented Opus 5 strengths that matter here

Deep reasoning across long chains; agentic coding that completes rather than stubbing; **effort as a real
dial** (`low` → `max`), with Anthropic stating Opus 5 converts effort into results more reliably than any
prior Opus; efficiency at `low`/`medium`; code review with high precision and few false positives; 1M
context with consistent instruction-following throughout.

## 3. TWO RISKS SPECIFIC TO THIS PROJECT'S SETUP

### 3.1 The `reasoning_extraction` classifier

Anthropic's Fable prompting guide: prompts, skills, or harness instructions that tell the model to echo,
transcribe, or explain its internal reasoning as response text can trigger the `reasoning_extraction`
refusal category and cause elevated fallbacks. It explicitly directs an audit of existing skills and system
prompts for reflection or show-your-thinking instructions when migrating.

**This project's conventions are unusually heavy on that language:** provenance markers throughout every
capture, "log the process notes — what was declined and why," "Claude is candid about uncertainty and about
its own errors, and records both," and the standing requirement that corrections go into the session log.

**Claude's assessment `[D]`:** recording *decisions and their rationale into a document* is a different act
from transcribing internal reasoning, and this project should be fine. **But the failure mode is silent** — a
session opened on Fable could be answered by another model without the user noticing, which defeats the
entire point of reserving Fable for specific decisions.

**OBSERVED, not hypothetical — Michael, 2026-07-26:** the claude.ai interface does not display which model
answered, and he has started voice sessions on Fable 5 and **later realised the model had switched**, without
knowing to what.

**Three candidate causes, undetermined:** (a) the safeguards routing that sends certain topics to Opus 5;
(b) reaching the 50% Fable cap mid-session and being switched to another model to stay inside plan limits,
exactly as the support documentation describes; (c) something specific to voice mode. **Claude cannot
distinguish these from the design side.** The `/usage` breakdown in §6 would rule (b) in or out.

**Record-integrity consequence — this is the part that matters here.** Every session-log entry stamps a model
("design session, Opus 5"; "Fable 5"). **Those stamps have never been verified, and if the model can change
mid-session, some existing entries are wrong about who did the work.** Voice sessions compound it: they write
nothing to disk on their own, so their stamp is reconstructed after the fact.

**WITHDRAWN 2026-07-27 — Claude overread this.** An earlier revision cited a `Fable 5 → Opus 5` heading in
the 07-25 log as documented drift. **It is at least as plausibly a deliberate mid-session handoff** — it
reads as a choice, not an incident — and Claude inferred it from a summary line in a Code report without
reading the entry itself. Third instance this weekend of building on unread material. **Michael's
voice-session observation is the real evidence; that heading is not, and should not be stacked with it.**

**Attribution gap, from the day-view archive:** **no model attribution exists in the log before 2026-07-25.**
Entries for 07-21 through 07-24 name the interface ("Claude Code," 25 mentions) but contain no Fable, Opus,
or Sonnet string anywhere. Those days are *unrecorded*, not guessed, and **cannot be reconstructed from the
repo.** From 07-25 onward it is partial — Code-session entries mostly omit the model. This is the concrete
cost of §6.5's item 1 never having been adopted.

**Mitigation `[D]`, and its limits — stated honestly:** ask the model to state itself at session start and at
session end, and record both. **This is weak evidence and must not be treated as settling anything** — a
model's self-identification is least reliable in exactly the failure case it is meant to detect. It is a
cheap habit worth keeping for the record, nothing more. **The `/usage` surface is the harder signal**, and
§6.3's experiment is the actual test.

### 3.2 Prescriptive skills may degrade Fable output

Same guide: "Skills developed for prior models are often too prescriptive for Claude Fable 5 and can degrade
output quality. Review and consider removing older instructions if default performance is better."

`push-to-code` and `refresh-chat` are highly prescriptive — fixed section order, verbatim checklists, quality
gates. **Recommendation: packet assembly never runs on Fable.** This coincides with the cost argument, so it
costs nothing to adopt.

### 3.3 One place where Claude recommends AGAINST following Anthropic's guidance

The Opus 5 guide says to remove verification instructions because Opus 5 self-verifies and carried-over
instructions cause over-verification.

**Do not apply that to this project's RECONCILE FIRST, verify-before-criticizing, or push-verification
conventions.** Those are not self-verification of reasoning — they are **external checks against a repo the
design side cannot see**. The distinction is load-bearing: on 2026-07-26 alone, external verification caught
three Claude errors (a rule generalized from one sample, a structure built on an unchecked edge case, and a
strike ordered on text that existed only in chat). Anthropic's advice targets a different behavior. **Keep
the external checks; trim only generic "double-check your answer" language, of which this project has little.**

## 4. THE ROUTING RULE

**Fable adjudicates and audits. Opus executes, on both sides.**

Explicitly **not** "Fable designs, Opus codes." That still spends the premium allowance on long design
conversations in which most turns are routine capture and recording — which is what the 2026-07-26 sessions
mostly consisted of.

### Route to FABLE

- **Build authorizations** — decisions that commit code, especially where a slice reworks approved work.
- **Adversarial audits** of accumulated design output before it becomes code (§5).
- **Screenshot-driven walkthrough sessions** — CAL-1 and any successor.
- **Genuinely open design passes with no prior art in the project** — CIV-1 (civil-litigation damages),
  PROB-1 (probate client profile).
- **Anything Michael would otherwise not attempt** because it looks too tangled. Anthropic's own advice is to
  start at the top of the difficulty range rather than testing on easy work.

### Route to OPUS 5

- Packet assembly, fold-ins, session-log entries, instruction drafts, routing tables.
- Ordinary ruling sessions where Claude's job is to structure the question and record the answer.
- Research, statute reading, registry drafting, summarization.
- **All Claude Code sessions** — see the negative rule below.
- Anything where the deliverable is a document following a fixed house format.

### 4.1 THE FINDING — Fable has been running on the Code side, and that is almost certainly where the allowance went

Michael confirmed Claude Code has been running **Fable 5 at `high` effort** for coding through 2026-07-26.
Agentic coding is the highest-burn workload available: long tool loops, subagents branching into concurrent
calls, at roughly double Opus's rate, drawing on the same weekly pool as every design session.

**This reframes the project's whole token history.** The pressure that produced the `inbox/` queue mechanism
(session log, 2026-07-26 — "Michael runs out of Fable 5 tokens before Tuesday"), the standing convention to
move routine design work to Opus, and the conservation reasoning throughout 2026-07-26 all treated the
*design* side as the drain. **The design side was rationing a resource the Code side was consuming at scale.**

**Marked as the most plausible explanation, NOT as verified.** Claude does not know the Code-session volume
or how subagent-heavy those runs were. §6 states the measurement that settles it.

**STRENGTHENED 2026-07-27 by the day-view archive (`docs/specs/archive-project-history-by-day.md`).** Session
counts by day, from the log: 07-25 ran **18 Code sessions**, roughly double any other day, against 9 on 07-26
and 5 on 07-24. The current weekly window opened ~2026-07-21 21:00 UTC, so 07-25 sits **inside the exhausted
window**. Per Michael's account, Claude Code ran Fable 5 at `high` through 2026-07-26 — meaning **the largest
concentration of agentic Code work in the exhausted window was Fable-run.**

Still circumstantial: 21 of 07-25's 27 sessions carry no model stamp, and per-session attribution does not
exist. **But the direction is consistent enough to act on while §6.3's experiment runs.**

**Negative rule — proposed as binding:** **default Claude Code to Opus 5, not Fable.** Anthropic documents
Opus 5 as strong on multi-file features, larger refactors, and end-to-end work that completes rather than
stubbing, at half the cost, with `effort` as a real dial. Fable-in-Code is not *wrong* — it is documented as
the strongest long-horizon agentic model — but it is the most expensive possible way to spend a shared pool,
and it should be a deliberate exception for one hard build, not the default.

**Regardless of model: cap subagents on the Code side.** Anthropic's guidance for both models includes
explicit advice to steer or cap delegation, Opus 5 is documented as delegating more readily than prior
models, and subagent fan-out is the specific mechanism behind the reported catastrophic burns.

### Route to SONNET 5 — lane opened 2026-07-27, and currently EMPTY

Added because the plan was a two-model frame in a three-model world. **Both candidate workloads were then
eliminated by Code's review, and the honest result is a lane with nothing in it yet.**

- **Session-log appends — REMOVED.** A wrong entry in an append-only log is not reversible in practice: this
  project's convention is that corrections go in a *new* entry, never a rewrite. **Reversibility of the file
  is not reversibility of the record.**
- **QUEUE-RUNNER doc-routing batches — REMOVED.** Code, having run six of them: the reconcile step caught a
  packet ordering a strike on text that existed only in chat, a fold target that didn't exist, a cite rule
  that would have broken six working cross-references, a hardcoded log number already in use, and a missing
  prerequisite packet. **Each required noticing that the instruction and the repo disagreed.** That is not
  fold-and-file.
- **Provenance-marked packet assembly — stays on Opus**, and Code corrected the reason: not only that
  CONFIRMED/PROPOSED marking is judgment, but that **the reconcile step is where packets get caught being
  wrong**, upstream of provenance.

**Keep the lane open and empty rather than inventing work for it.** Pure format conversion of
already-approved text is the remaining shape; no live instance exists.

### Effort and model — routed by REVERSIBILITY, not by work type

Adopted 2026-07-27, replacing a work-type table. The sharpest distinction in this project is not
design-versus-code; it is **whether the output can be undone** — in the *record*, not merely in git.

| Reversibility | Examples | Model / effort |
|---|---|---|
| **Reversible** — doc edits, fold-ins, design docs, captures | Packets, spec amendments | Opus 5, `low`–`medium` |
| **Reversible with effort** — new code on unexercised surface | New feature slices, additive tables | Opus 5, `high` |
| **Hard to reverse** — schema change against built, walked, approved code | **The CL-2 slice**, the medical repoint | **Fable 5 in Code, or Opus 5 at `max`** — see §4.2 |
| **Irreversible in the record** — append-only log entries | Session-log appends (corrections require a new entry) | Opus 5, no lower |
| **Irreversible or safety-bearing** | Real client data, live mode, go-live gates | Stop. Gates first, then Michael. |

**CL-2 raised from `xhigh` to `max` on Code's argument:** the better trigger is **blast radius, not history.**
CL-2 changes a foreign key beneath a module that is built, walked, and approved, with 186 green tests and a
demo store that has bitten this project before on reseed. It is the highest-blast-radius change on the board.

**Q3 ANSWERED 2026-07-27 — and it reframes this table.** Effort has **never been set anywhere**: no `effort`
key in `~/.claude/settings.json`, the parent `.claude/settings.local.json`, or the repo's. Every Code session
in this project's history, including the one that answered this, has run on the harness default. **This table
is not correcting a mis-set dial. It is introducing a control nobody has ever touched.**

### 4.2 THE FABLE ALLOCATION PROBLEM — Code's sharpest criticism, and the fix

Code, 2026-07-27: the plan asserts **"allocation, not conservation"** and then routes almost everything to
Opus — **so the Fable half goes partly unspent again, by a different mechanism.** If the premise is real, the
plan must name *more* Fable work, not less.

**Conceded. The fix falls out of the reversibility table above.** CL-2 is the highest-blast-radius build in
the project; it will be exhaustively specified by `cl2-authorization-brief.md`; and Anthropic documents Fable
as strongest at **first-shot correctness on complex, well-specified problems** and at long-horizon agentic
coding. **The unspent-Fable problem and the hardest build on the board solve each other.**

**Proposed: CL-2 runs on Fable in Claude Code** — the deliberate exception §4.1 reserved, not a reversal of
its default. Subagents capped per §5's G1 rules. If Fable is unavailable or the allowance is spent, Opus 5 at
`max` is the fallback, not the preference.

## 5. THE TUESDAY SEQUENCE

**Timing, confirmed by the §6 measurement: Fable returns 2026-07-28 at 21:00 UTC — Tuesday afternoon
Central.** Steps 1 and 2 cannot run Tuesday morning. **Step 4 is Opus-only and can run before the reset**,
using the ~33% of the weekly pool that would otherwise expire at the same moment — but only if the
authorization in step 1 exists, so in practice the morning is free for other Opus work.

1. **Fable — CL-2 authorization.** Already reserved by ruling; `cl2-authorization-brief.md` is filed and its
   cites verified. Short session. Rules yes/no/defer and records why.
2. **Fable, IN CLAUDE CODE — adversarial audit of the design corpus, before CL-2 builds.**
   **RELOCATED 2026-07-27 after Code's review, which found the flaw.** An earlier revision put this audit on
   the design side. But the audit's scope includes *assumptions never checked against the repo*, and **the
   design side structurally cannot read `src/`** — the deliberate sync exclusion. An audit hunting unchecked
   repo assumptions, run by the side unable to check the repo, reproduces the exact failure it exists to
   catch. Code's evidence is 2026-07-26's own errors: design asserted no probate furniture existed (a
   mis-parented case type does), asserted family furniture existed (none ever did), and ordered a `claude/`
   cite fix that would have broken six working cross-references.

   **This is the deliberate Fable-in-Code exception §4.1 anticipated**, and it is the right one: read-only,
   bounded, no build loop, subagents capped — and the single task where Fable's documented bug-finding recall
   and search across a codebase and its history is the entire point rather than an expensive extra.

   **Scoping, from the Code session that would run it (2026-07-27):**
   - **Sole deliverable is a findings document.** Any fix is a *finding*, never an action. No Write/Edit if
     the harness can constrain it; if not, the prompt states it.
   - **Reading set:** the client-model design doc, fee-basis, the heartbeat design **plus captures d/e/f**,
     the statutes pass, the registry drafts, `spec-feedback.md`, and — the whole point — **`src/domain/`,
     `db/schema.sql`, and `src/data/adapter.ts`.**
   - **Excluded as noise:** the session log (76 entries, mostly narrative, eats context for little return),
     the APIL mining passes, the archive.
   - **Subagents: 3–5 parallel readers over disjoint doc sets. No nesting. No filesystem access. Each
     returns findings, not edits.** A blanket ban would cost the coverage Fable is best at; uncapped fan-out
     is the burn mechanism.
   - **The single most important line in the audit prompt:** *"the design side cannot read `src/`; every
     claim it makes about the repo is unverified until you check it."* That is the specific failure mode —
     three times this weekend.
3. **Opus — assemble the authorization packet** from whatever (1) and (2) produce.
4. **Claude Code (Opus 5, `xhigh`) — build CL-2.** Then Michael walks it per the brief's §5 checklist.
5. **Fable — CAL-1**, the calendar walkthrough, whenever scheduled. Screenshot-heavy by design.

Everything else in the queue — D-CL2-3, the four unruled proposals, D-CL2-2a, PR-3, the registry sign-offs,
the auth slice, instructions v5 — runs on Opus.

### 5.2 A COMPETING SEQUENCE, raised 2026-07-27 — for Fable to weigh, not for Claude to settle

The day-view archive drew a lesson from the Outlook slice — built 2026-07-24, unexercised until its first
real use found two blocking defects: **"written but never exercised is not a neutral state."**

**That generalizes further than the Outlook case, and it argues against §5's order.** This project's
inventory of unexercised work is large: two edge functions written and never run; CE1, the case heartbeat and
the time tracker designed and never built; the registry drafted and entirely unverified; Supabase mode wired
and unusable.

**The competing sequence: the auth slice first, CL-2 second.** Auth makes Supabase mode exercisable, which
makes the edge functions exercisable, which converts the largest block of written-but-dead work into working
software. CL-2 adds capability to a module that is *already* exercised, walked and approved.

**Claude's position, stated as a position and not a conclusion `[D]`:** CL-2 retains the timing argument, and
Code's review sharpened it — **no real client data has ever entered the app**, so migration risk is near zero
right now and only rises as liens, expenses and settlement land on top of the current scoping.

### 5.3 THE AUTH PATH — RESOLVED 2026-07-27, except for one check only Michael can run

**The apparent contradiction dissolves: both statements were true about different things.**

- **The FILE.** `db/schema.sql` creates **32 tables, enables RLS on all 32, and attaches 31 policies**, all
  `for all to authenticated using (true) with check (true)`. The one gap is **deliberate and documented in
  the file**: `file_counters` has RLS on and **no policy** — *"never touched via the API"* — because it is
  driven by a `security definer` function, not client queries. **The design side's reading of the file was
  correct.**
- **The LIVE PROJECT.** Code's review was describing the deployed Supabase project, not the file. **Whether
  the schema was ever executed there cannot be determined from this machine.** No `config.toml`, no
  `migrations/`, no linked-project state, no Supabase CLI installed, no `~/.supabase`, and no record anywhere
  in `docs/` or `CLAUDE.md` of anyone running it. **But absence of local CLI state proves little** — the
  normal path is pasting into the dashboard SQL editor, which leaves no trace here.
- **Suggestive, not decisive:** `Go_Live_Gates.md` records the project as provisioned 2026-07-25 with
  automatic RLS on, and **gate 3 is written in future tense — "RLS policies written and tested" — still
  open.** Had the schema been applied with its policies, gate 3 would be half-done and someone would likely
  have said so.

**ACTION FOR MICHAEL — ten seconds, and it settles the auth path's length:** open the Supabase dashboard →
**Table Editor**. Thirty-two tables, or an empty project.

**Note the `file_counters` design for the record:** a table deliberately left policy-less because it is
function-driven is careful schema work that neither side's summary had mentioned.

### 5.4 CODE'S INDEPENDENT SEQUENCING READ — CL-2 first

Asked to sequence without deference (the design side disclosed its stake), the 2026-07-27 Code session chose
**CL-2 first, and held that Q1's answer barely changes it.**

Its argument is different from the design side's, which is what makes it worth having: **CL-2's case is
time-asymmetric and auth's is not.** Migration cost only rises — today there is no real data, 186 green
tests, and an established backup-and-review-log migration pattern; every week that liens, expenses and
settlement land on the current scoping makes the same change harder. **Auth will cost the same in November as
it does Tuesday. CL-2 will not.**

It also holds that even in the favorable branch of §5.3, auth-first delivers less than §5.2 claimed: the
sign-in flow is still unbuilt and unauthorized, the edge functions still need deploying, and none of it
touches real data until gates 1, 2 and 3 clear. **Auth-first buys exercisability of infrastructure —
valuable, not urgent.**

**Both sequences still go to Fable.** But §5.2 should be read as the weaker case, on grounds independent of
the dashboard check.

**Both sequences go to the Fable session on Tuesday.** This is exactly what the CL-2 brief's bias disclosure
anticipated.


## 6. MEASUREMENT — RESULT

All four of Claude's open questions were answered by Michael on 2026-07-26 and are folded into §1, §3.1 and
§4.1. The `/usage` measurement was run 2026-07-27T05:37 UTC. **Result below.**

### 6.1 What the report showed

| Meter | Reading | Resets |
|---|---|---|
| `session-0` (5-hour window) | 0% — fresh | ~10:30 UTC, same day |
| `weekly_all-1` | **67% consumed — ~33% of the week remains** | 2026-07-28 20:59 UTC |
| `weekly_scoped-2` | **100% — EXHAUSTED** | 2026-07-28 21:00 UTC |

Session model split: Opus 5 dominant — 226.1M cache read / 12.0k output, against Fable 5 at 22.7M cache read
/ 1.6k output. Session cost $6.20. Local activity: 490 requests in 24h, 2,505 over 7d.

**Reading `weekly_scoped` as the Fable-specific meter is an INFERENCE `[D]`, not a label the report supplies.**
It fits the support documentation's 50%-of-weekly structure and Michael's report of running out of Fable
before Tuesday. Treated as the strong reading, not established fact.

**Practical facts established:**

- **Fable is spent.** It returns **2026-07-28 at 21:00 UTC — Tuesday afternoon Central, not Tuesday
  morning.** §5's sequence must be planned around a mid-afternoon start.
- **~33% of the overall weekly pool remains**, usable on Opus 5 and Sonnet 5, and **it expires at the same
  Tuesday reset.** Same non-rollover logic as §1: spending it costs nothing, saving it loses it.
- **Today's Code sessions ran Opus 5**, confirmed by the session split. That open question is closed.

### 6.2 What it did NOT show — §4.1 remains unverified

The report gives a **session-level** model split and a bare **request count** for the week. It provides **no
per-model attribution across the seven days.** Claude recommended this measurement expecting a weekly
breakdown it does not produce.

**§4.1 — that Code-side Fable consumed the week's allowance — therefore remains the most plausible
explanation and nothing more.** It should not be cited as established anywhere in the record.

**Standing caveat unchanged:** these figures derive from local session history on one machine and exclude
claude.ai usage entirely.

### 6.3 The prospective experiment — free, and it settles §4.1

If `weekly_scoped` is the Fable meter, **it directly measures Fable consumption.** So: keep Claude Code on
Opus 5 for one full week and watch that meter. If it stops reaching 100%, §4.1 is confirmed by observation.
If it pins at 100% anyway, the drain is the design side and this document's routing rule needs rewriting.

**Cost: checking `/usage` occasionally. No work is foregone either way.**

### 6.4 An incidental finding worth keeping — NARROWED

Cache reads dwarf uncached input — 226.1M cached against 945 uncached tokens on Opus in one session. This
project's Code sessions re-read a large stable context (CLAUDE.md, the session log, BUILD-STATE) and it is
**caching well, billing at a fraction of base rate.** Output tokens and uncached input are what consume the
budget.

**CORRECTION 2026-07-27, per Code's review.** An earlier revision claimed log and BUILD-STATE growth had
"twice been treated as a cost driver," and used this finding to correct that. **Code is right that no such
rationale exists** — BUILD-STATE's 120-line cap has always been justified on readability, so the design side
reads it rather than skims it. Claude conflated it with the *knowledge working-set* policy, which genuinely
is framed in token and retrieval-dilution terms. **Those are different mechanisms and the correction was
invented.** The archive decision stands on the grounds it was always made on.

## 6.5 RECORD-KEEPING CHANGES — proposed, adoptable independently of the ruling

1. **Session-log entries record the model for Code sessions**, not just design sessions. They never have.
2. **Session-log entries record the effort level** for Code sessions. This project has never used or recorded
   the dial at all.
3. **Model stated at session start and at session end**, both recorded — see §3.1. Drift is observed, not
   theoretical.
4. **`weekly_scoped` checked and noted at the start of any Code session**, per §6.3, until the experiment
   resolves.

None of these requires ruling Q-5. All four cost a line each and convert this document's reasoning into
something measurable next month rather than re-argued.

## 7. THE Q-5 CLAUSE — DRAFTED

**Added 2026-07-27 after Code's review.** An earlier revision claimed to resolve Q-5 without drafting the
clause it turns on.

**PROVENANCE WARNING — Q4 answered 2026-07-27, and the answer is a finding in its own right.** The narrow
wording of Q-5 (that Claude offered to add "does not relax RECONCILE FIRST, contradiction flagging, or any
verification check," and Michael changed topic without ruling) **is not recoverable from the repo.** The log
carries Q-5 three times and never expands it past *"Q-5 model-usage clarifying clause unruled (v3 kept v2
wording)."* The fuller text lived in the **§7 open-items table of the 2026-07-26 client-model round-2
packet**, which was processed and deleted under the queue convention.

**Treat the clause wording below as accurate but unsourced**, and let ruling it restore the substance to the
record deliberately.

### 7.1 A DEFECT IN THE QUEUE CONVENTION, surfaced by Q4

`docs/prompts/QUEUE-RUNNER.md` step 4.2 requires merging each packet's §7 open-items table into the runner's
log entry, then deleting the packet because "the session-log entries are now the record."

**What survives that merge is the item ID and a one-line label. The substance does not.** Q-5 is the worked
example: the question itself was lost while its name was preserved, and the design side spent a session
unable to verify what it was being asked to resolve.

**Proposed `[P]`, unruled:** the runner's merge carries each open item's **question**, not just its ID —
or packets are archived rather than deleted. This is a defect in a convention ruled binding on 2026-07-26
(Q-1), and it should be fixed before the queue accumulates more processed packets.

### 7.2 The clause

Proposed replacement for the model-usage line in the project instructions:

> **Model usage: route by act and by reversibility, not by side.** Fable adjudicates and audits — build
> authorizations, adversarial audits (run in Claude Code, read-only, where the repo can actually be checked),
> screenshot-driven walkthroughs, and open design passes with no prior art. Opus executes — packets,
> fold-ins, research, rulings-capture, and **all Claude Code sessions by default**; Fable-in-Code is a
> deliberate exception, never the default. Sonnet takes trivially reversible mechanical work — log appends,
> routing tables, format conversion — but never provenance-marked packet assembly. Effort tracks
> reversibility: the harder the output is to undo, the higher the effort.
>
> **No model choice relaxes any verification convention.** RECONCILE FIRST, contradiction flagging under
> trigger #6, verify-before-criticizing, the append-only log rule, registry discipline, and the go-live gates
> bind identically on every model at every effort level. A more capable model is not a reason to check less.
>
> Work completed on any model stands without re-review by another, except where this plan schedules an audit.

## 8. THE LIMIT OF THIS WHOLE DOCUMENT

Raised by the Code session, 2026-07-27, and it belongs here rather than in a footnote.

**"Written but never exercised is not a neutral state" applies far beyond the edge functions.** The largest
body of unexercised work in this project is **the Legal Rule Registry — every entry unverified.** No model
routing touches it, at any effort level, on any tier, because **only Michael can verify a legal
proposition.** The same is true of the ruling queue, the go-live gates, and the security review.

**So: this document optimizes something that is not the bottleneck.** Model routing improves throughput on
the half of the work Claude does. The half that gates real use — rulings, verifications, gates — moves only
at Michael's pace, and no allocation decision changes that. Worth stating plainly so it does not hide inside
a sequencing debate.

**Corrected interval, for the record (Q5, 2026-07-27):** the Outlook slice was built at `8a1752b`,
2026-07-24 00:01 local, and first successfully connected at `8da26fb`, 2026-07-26 23:11 local. **Just under
three days — effectively the whole of the 24th, 25th and 26th** — not "two nights." Not a UTC artifact; a
genuine understatement, and it makes the unexercised-work lesson stronger than it was told.

## 9. WHAT THIS DOCUMENT DOES NOT DO

- **Does not rule Q-5.** §7 drafts the clause; ruling it is Michael's, and doing so fires trigger #3.
- Does not authorize CL-2 or any build.
- Does not assert a capability ranking between Fable 5 and Opus 5 — §2 explains why no such ranking is
  documented.
- Does not modify any skill. §3.2's recommendation is a routing rule, not a skill edit.
- **Does not settle §5 against §5.2.** Both sequences go to the Fable session, and §5.3's disputed fact must
  be answered by a Code session first, or Fable weighs a version of auth-first that is too favorable to it.

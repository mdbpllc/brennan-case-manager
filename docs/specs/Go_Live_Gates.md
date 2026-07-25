# Go-Live Gates

> **Provenance.** This document originated as a design-space-only project-knowledge upload
> and was routed into the repo on 2026-07-25 (design handoff, Item 0) so it lives under the
> same GitHub sync as every other spec. **The verbatim text of gates 1–5 exists only in the
> project-knowledge copy and never reached a Code session** — the section below is a
> placeholder pending that text (flagged in `docs/spec-feedback.md`). Gates 6–8 are the
> 2026-07-25 amendment, verbatim from the design handoff.

## Gates 1–5 — PENDING IMPORT from the project-knowledge copy

*Placeholder — do not reconstruct these here. Paste gates 1–5 verbatim from the
design-space `Go_Live_Gates.md` at the next design session. Known from the amendment
context: gate 3 is "RLS policies written and tested." When gates 1–5 are pasted in,
append to gate 3 in place:*

> *"See gate 6 — policies cannot be meaningfully tested until a sign-in flow exists."*

## Gates 6–8 (appended 2026-07-25)

**6. Authentication / sign-in flow — HARD PREREQUISITE TO GATE 3.**
The schema's RLS policies admit only signed-in (`authenticated`) users, and the app has no
sign-in screen. Supabase mode will connect and then refuse every query. Gate 3 ("RLS
policies written and tested") reads as satisfiable without noticing there is currently no
way to authenticate anyone — this gate exists to close that trap. Currently tracked only in
`docs/spec-feedback.md`; promoted here. Trigger: before any Supabase-mode use beyond
connectivity testing.

**7. Document storage + EOB source-document pin.**
There is no document storage anywhere in the app; EOB and report "links" are text
descriptions (BUILD-STATE, Known stubs & fakes). The billing spec requires the EOB
patient-responsibility figure to be a typed field **with a source-document pin, not a
number typed from memory**, because it is the statutory ceiling for a hospital lien under
the Ch. 146 analysis. Until pinning exists, the load-bearing input to the lien cap is
unverifiable. Trigger: before the first real EOB is entered, and before any AnalysisRun
computed on real data feeds lien math.

**8. Fee-schedule *selection* is correct and visible on every computed ratio.**
*(Narrowed from the earlier draft — see the correction note below.)* Per-line schedule
provenance **already exists and works**: the report's Cite column names the schedule, year,
code, and import row. What is missing is (a) correct schedule **selection** when more than
one schedule contains a code, (b) any warning at the moment the attorney reads a ratio
computed against a placeholder/demo table, and (c) survival of imported schedules and
confirmed runs across a store reseed. Required before real use: a ratio computed against a
`demo`-source schedule carries a visible placeholder banner; the chosen schedule is named
in the report headline, not only in the per-line cites; a reseed that would discard
imported rates or confirmed runs warns first. This is the estimates-not-adjudication
guardrail applied to its most load-bearing number. Trigger: before any AnalysisRun is
confirmed on a real bill.

**Correction note for the record:** the mid-session draft of gate 8 asked for
AnalysisRun-level schedule provenance to be built. That was a design-side misread —
provenance is already implemented per line. Do not rebuild it.

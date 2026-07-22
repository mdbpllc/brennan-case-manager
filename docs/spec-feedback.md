# Spec feedback — for Michael to take back to the design space

Per CLAUDE.md: coding sessions never rewrite the specs; problems the build
reveals get noted here instead. Each item needs a decision or a spec update
in the Claude.ai Project space, after which a refreshed snapshot comes back
to `docs/specs/`.

## Open items (as of 2026-07-21)

1. **Probate companion has no status ladder of its own.** The code gives every
   PI case type the litigation ladder (treatment → demand → suit → trial). A
   probate companion file doesn't follow that arc. Needs a settled ladder in
   the master spec (§8) — or a decision that it intentionally shares the PI
   ladder.

2. **Supabase auth approach (blocks central-database mode).** The schema's RLS
   policies admit only `authenticated` users; the app connects with the anon
   key and has no sign-in. Until this is decided, Supabase mode connects but
   every query is refused (the app now shows a visible error notice instead
   of loading forever). Options to weigh in the design space: a single
   shared Supabase Auth login for the solo phase (smallest change, works with
   current policies), vs. designing the eventual per-staff-member model now.
   Related nuances: (a) server-side `next_file_number()` uses the database
   clock, so the January counter reset follows the DB timezone, not Texas
   time; (b) 2026-07-21 code pass hardened `db/schema.sql` — RLS is now
   enabled on `file_counters` (no policies) and `next_file_number()` runs as
   SECURITY DEFINER; no live database exists yet, so no migration was needed,
   but the schema should be re-reviewed in the design space before first
   deployment.

3. **Mistake-case handling: archive/void vs. delete.** Nothing can be deleted
   in the app (probably right for a legal system), but a fat-fingered case
   currently lives in the list forever. Spec question: add a "Void/Archived"
   terminal status (excluded from lists like Closed), allow true delete for
   never-served-on-anything records, or something else?

4. **Party-type promotion path.** Party type is frozen after creation by
   design, but the Person type's intake-funnel fields (PNC → Client) imply a
   promotion path that doesn't exist — re-entering a person as a new Client
   party would split their cross-case history. Needs a settled mechanism
   (e.g. type conversion with field mapping, or a link between records).

5. **Citizens MRF local path** — still undecided (CLAUDE.md open decision).
   Needed before Phase 2 billing work; record it in CLAUDE.md once chosen.

## Resolved

- ~~Spec-list drift~~ — the conventions block's `docs/specs/` list was missing
  `medical-billing-analysis-module-prompt.md` and `session-log.md`; corrected
  in CLAUDE.md on 2026-07-21.
- ~~Repo hosting~~ — decided 2026-07-21: private GitHub
  (`mdbpllc/brennan-case-manager`).

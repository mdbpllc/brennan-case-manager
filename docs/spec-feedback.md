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

6. **EOB acquisition workflow (new wanted-later item, Michael, 2026-07-23
   Phase 1a walkthrough).** The EOB record is load-bearing (Type 2
   reconciliation now; Ch. 146 lien-cap and the Phase 2 balance-billing audit
   later), but in practice getting EOBs from clients is slow and unreliable.
   Michael wants a design-space session later on the most streamlined
   acquisition path. Raw material to weigh when it comes up:
   - HIPAA authorization → request the claims/EOB history directly from the
     health insurer (mirrors the provider records-request flow; the client
     signs once at intake — pairs with the standard coverage inventory
     already captured at every PI intake).
   - Per-insurer client one-pagers ("how to download your EOBs from the
     UnitedHealthcare portal") generated from the insurer party record.
   - Client intake form / portal upload (banked feature: fillable intake
     link) — a phone-photo upload path for EOBs as they arrive in the mail.
   - Subrogation/lien correspondence often contains the insurer's own claims
     ledger — same numbers, already flowing in; could feed the EOB record.
   - Medicare beneficiaries: BCRC conditional-payment summaries already
     tracked in the liens module carry paid amounts (synthesis §2.2 join).
   - Interacts with: outlook-email-intake.md (EXPLORATORY — HIPAA
     first-class), the paralegal-workflow flip at multi-user, and Phase 1b
     AI ingestion (an EOB is a parseable document once the GPU arm exists).
   Not sequenced into any build phase — capture only, per Michael.
   **Multi-EOB requirement (added same walkthrough):** one bill routinely has
   several EOBs — per-claim adjudication across a course of treatment,
   primary + secondary coverage (COB), corrected/reprocessed EOBs, interim
   hospital billing. Phase 1a's single light EOB record per bill handles this
   as attorney-entered totals with a plural source pin ("EOBs dated 5/2,
   5/30, 6/14 — sum of patient-responsibility boxes"); the Phase 2
   reconciliation-audit design should model EOBs as multiple records per
   bill (per claim, with payer role primary/secondary and a
   supersedes/corrected link) rolling up to the bill-level figures the
   Ch. 146 cap and settlement math consume.

7. **Registry proposition needs enrichment: negotiated-rate discovery
   (Michael, 2026-07-23 walkthrough).** The seeded North Cypress / K&L Auto
   Crushers entry ("Negotiated-rate and reimbursement-rate discovery is
   available against providers, including LOP providers, on reasonableness
   of charges") is true as stated but oversimplified — there are real
   limitations on the exact discovery available and the extent to which
   certain things are discoverable, and Michael wants more law fed into
   this area. Design-space work: (a) decide whether this becomes one
   enriched entry or splits into sub-rules (baseline discoverability +
   separate entries for its limits), each with its own cite and
   verification status; (b) generally, settle the workflow for enriching /
   amending registry propositions, since coding sessions deliberately
   cannot edit proposition text in-app (only notes and status) and
   propositions changing silently would orphan past runs' version stamps.
   Interim: Michael can carry the qualification in the rule's Notes field.

8. **Disclaimer authority research (Michael, 2026-07-23 walkthrough).** The
   estimates-not-adjudication disclaimer wording is approved as v1
   (`DISCLAIMER_VERSION = v1-2026-07-23`), but Michael wants a later pass to
   find on-point legal authority informing the language — what the
   disclaimer should say (and avoid saying) given how benchmark analyses
   could surface in discovery, §18.001 practice, or a reasonableness fight.
   Any authority found goes through the registry (entered unverified,
   attorney sign-off); a revised disclaimer bumps the version string, and
   every run/report already records which version it carried.

### 2026-07-23 — Ch. 146 mischaracterized in specs (correction needed)

**Where:** case-management-project-instructions.md (liens section: "Ch. 146 EOB balance-billing check: the patient-responsibility amount on the EOB is the maximum permissible lien") and any downstream references.

**Problem:** (a) The statute is Civil Practice & Remedies Code Ch. 146, not Insurance Code Ch. 146. (b) It is a timely-billing statute: §146.002 sets billing deadlines (11-month default), §146.003 bars recovery from the patient of plan-covered/not-otherwise-owed amounts only when the provider blew the deadline. It is not an EOB-based lien ceiling. EOB-as-ceiling concepts belong to the surprise-billing framework (Ins. Code Ch. 1467 / SB 1264) — unverified, see registry Entry 8.

**Also fold in:** (a) H.B. 4145 (eff. 9/1/2025) added §146.002(c-1): billing the PI claimant's attorney within the 11-month window satisfies the patient-billing deadline. (b) External draft asserts Prop. Code §55.004(d)(5) excludes §146.003-barred charges from hospital liens — if confirmed against Ch. 55 text, wire into the lien-clearance gate. (c) External draft asserts §55.004(b) has a third cap prong (trier-of-fact-specified amount less pro-rata fees) missing from the spec's two-prong formula — confirm against statute. (d) Spec's "naming plaintiff as liable party is a fatal defect" conflicts with external draft's substantial-compliance reading of §55.005 — Michael to resolve; affects pre-disbursement gate.

**Status:** All corrections pending Michael's review; nothing changed in canonical spec yet. (Code-side note, same date: the seeded `ch146-eob-cap` registry proposition in `src/data/billingSeed.ts` carries the wrong framing too — deliberately left untouched pending the proposition-amendment workflow ruling in item 7(b) above.)

## Resolved

- ~~Spec-list drift~~ — the conventions block's `docs/specs/` list was missing
  `medical-billing-analysis-module-prompt.md` and `session-log.md`; corrected
  in CLAUDE.md on 2026-07-21.
- ~~Repo hosting~~ — decided 2026-07-21: private GitHub
  (`mdbpllc/brennan-case-manager`).

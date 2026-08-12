# CD-1 SESSION PREP — scaffold, not a spec (2026-08-11, design session #47)

**Canonical repo path:** `docs/specs/cd-1-session-prep.md` — NEW file. A one-page open-first doc
for the CD-1 design session. **Delete or absorb when the CD-1 spec exists.** Nothing here is a
ruling beyond what it cites; nothing authorizes a build.

## The path to the session (RULED 2026-08-11, ruling 4 as revised)

CD-1 fires after a **bounded evidence pass** — not after indefinite accumulation, and not on
practice serendipity alone:

1. **Opportunistic REQ-CAPTUREs continue** from PI DISCOVERY as practice hands Michael
   opportunities. No change to the REQ-1 channel.
2. **One deliberate roster-mining pass** over Michael's document bank, run in PI DISCOVERY (or by
   his hand), producing ONE client-clean REQ-CAPTURE: party constellations by case type — every
   petition caption is a roster instance. Rationale of record: Michael's caseload skews organic
   evidence (trucking-rich now, probate-thin until Domser produces); the bank gives roster
   coverage in one sitting. The bank shows OUTPUTS, not drafting pain — workflow requirements
   stay with live capture. Prompt for this pass: `PROMPT_pi-discovery-roster-mining.md` (this
   packet; travels by Michael's hand to PI DISCOVERY — NOT a repo doc, listed here only so the
   session knows to expect its output).
   **COMPLETE 2026-08-12** — the capture was produced (85 documents mined across both banks),
   reconciled, and ruled item by item by Michael. It lives at
   `docs/specs/REQ-CAPTURE_roster-mining-pass_2026-08-11.md`.
3. **The CD-1 schema session fires when that capture lands.** Typed, not voice. The core fork —
   views over one directory vs. separate tables with links — is decided THERE, deliberately;
   evidence has diminishing returns on an architecture fork.

**GATE MET 2026-08-12.** With item 2 complete, the bounded evidence pass of ruling 4 is finished.
**The CD-1 schema session is fireable at Michael's choosing** — it is his to fire; nothing here
prepares or triggers it.

## Open the session with these on screen

- `db/schema.sql` — `case_parties`, `case_clients` as built (CL-2 walked live 2026-07-28).
- `docs/specs/form-engine.md` — the identity-consumer.
- `docs/specs/rulings-capture-2026-08-08.md` Parts 1–3 — the reframe; FE-1's surviving mechanics
  as PROPOSED inputs (pointer model; enter-once write-back; firm-wide edit propagation with scope
  label + linked-case count; identity-in-directory / dollars-on-case).
- `docs/specs/attorney-review-queue.md` §7 — CD-1 full text; **CD-2** (rosters + typed contact
  relationships, framing RULED 2026-08-11); **IN-2**'s source-attribution question
  (CD-1-adjacent).
- `docs/specs/REQ-CAPTURE_roster-mining-pass_2026-08-11.md` — the roster-mining capture (item 2
  above), reconciled and ruled 2026-08-12. Its §5 questions 1, 2, 3, 5 are session questions;
  its §2 REQ-14/REQ-15 are the design constraint and the gate finding.
- `docs/specs/REQ-CAPTURE_attorney-edit-roundtrip_2026-08-11.md` — the attorney-edit capture,
  reconciled and ruled the same day.
- New queue entries from both captures, all CD-1-adjacent: **FE-8–FE-12** (as-generated retention
  and diffing; family drift; render-time format lint; caption-body integrity; template provenance)
  and **IN-4 / IN-5** (instrument lifecycle with service-bound certificate dates; disclosure-mining
  of the four TRCP 194 categories).
- **By Michael's hand:** the accumulated drafting-disclosures provider-data blocks — CD-1's
  evidence channel since 2026-08-10; the skill never writes them to the repo.

## Questions the session must answer (gathered, not new)

1. The fork: `case_parties` / `case_clients` as views over one directory, or separate tables with
   links? (CD-1 core text.)
2. CD-2 roster layer: how do case-type party rosters attach to the case-type tree; slots-at-intake
   mechanics.
3. CD-2 relationship layer: typed contact edges (parent/subsidiary, employer/employee, spouse,
   heir-of) — schema shape; and name CL-1 explicitly so case-links and contact-links never merge.
4. Role tags as content selectors (the RFA sibling-variant evidence) — what the directory must
   expose for the form engine's variant selection.
5. IN-2's per-field source attribution — does it live on directory entries, case records, or a
   provenance sidecar?
6. What travels from FE-1's surviving mechanics into the spec as RULED vs. stays PROPOSED.

## What resolves when CD-1 resolves

The "next build slice" question can name the form engine again (open since Slice A's withdrawal,
#38). FE-4–FE-7 unblock for spec completion. FE-2's parked build home gets its "CD-1 build or
intake pipeline, whichever comes first" race decided or at least raced honestly.

# CD-1 BUILD SLICE — named, scoped, AUTHORIZED

**Canonical repo path:** `docs/specs/cd1-build-slice.md` — NEW file.
**Status:** RULED by Michael, 2026-08-11 Central (same design session as #51, continued after the
thirteenth runner invocation landed the spec at `13f736a`). This doc records the slice naming, its
scope, and the build authorization, so the text outlives the packet that carried it (QR-1
principle). **Design authority remains `docs/specs/contact-directory.md`** — on any conflict, the
spec wins and this doc gets a correction.

## The naming (RULED)

**The next build slice is the CD-1 directory build** — the schema evolution the contact-directory
spec defines. Reason: substrate first — the form engine consumes the directory, and the engine's
own spec is still incomplete design-side (FE-4–FE-7 unblocked for spec completion only). Decided
with the spec at HEAD per the deferral ruling recorded in #51/#52.
Anti-resurrection check run deliberately: this is NOT Slice A returning. Slice A was the
provider-level framing, withdrawn 2026-08-08 because it baked the wrong level; this slice builds
the ruled level, citing the spec. The ledger is satisfied.

## Scope — IN (all already RULED at spec level; cites are to contact-directory.md)

1. **`parties` evolution** (spec §3): multi-valued role tags retiring `party_type` (existing
   values migrate to first-tag position); typed alias sets (d/b/a, f/k/a, suffix variants) with
   the multi-match flag; the deceased directory-level fact.
2. **`case_parties` evolution** (spec §§3–4): capacity (kind + pointed-at contact reference); the
   four attributes — role / caption alignment (per case-type side set) / party status / firm
   perspective (existing `side` column survives as perspective); joined-by mechanism + active
   state. **Backfill discipline per the CL-2 pattern: existing "Plaintiff"/"Defendant" role values
   map to alignments mechanically; anything unmappable is FLAGGED, never guessed** (the
   `case_client_flags` precedent).
3. **Roster definitions as data** (spec §4.1): the definitions structure plus side sets per case
   type, with inheritance on the case-type tree. **Seed ONLY bank-evidenced case types** (MVA,
   trucking, premises, UIM/UM, TTCA-type, criminal, insurance/DTPA). No speculative types.
4. **The contact-edges table** (spec §5): directional, typed, optional case scope; controlled
   vocabulary seeded from the roster capture's REQ-11 inventory; the CL-1 firewall honored (never
   merged with `case_links`).
5. **Directory UI evolution** (spec §8): role-tag filtering; alias display; the roster panel with
   intake slots (expectancy tiers; empty optional slots are normal); edit-in-case-context with the
   firm-wide scope label + linked-case count (adopted mechanic 3 — labeling, not a confirm click).
6. **RLS/grants for every new table + RLS-probe extension from birth** — the #28/CL-2 lesson
   applied proactively rather than caught at defect time.
7. **Live migration executed by Michael's hand** per the CL-2 precedent: backup first, SQL pasted
   alone in an empty buffer, verification checks answered in words before proceeding.

## Scope — OUT (explicit, so absence reads as decision)

- The form engine and all rendering (own slice, after its spec completes).
- The IN-2 fact table — no consumer until the engine or intake pipeline exists.
- Merge-contacts tooling (spec §9 future need).
- **Service-story fields** (spec §6.2): the shape stands in the spec, but unconsumed columns
  invite drift — they land with the first instrument consumer, as the living spec's first
  planned revisit.
- Probate beyond the reserved estate-adjacent pattern (spec §2.3).
- The app's `/rules` seed — untouched, unverified, as always.

## FE-2 RE-PARKED (RULED)

FE-2's parked home read "lands with the CD-1 build or the intake pipeline, whichever comes
first." **Superseded 2026-08-11: FE-2 lands with the INTAKE PIPELINE, explicitly.** Reason: the
sweep operates on document-name columns and nothing in this slice (or the app today) ingests
documents — the parked ruling's premise does not hold for this slice. The 08-07 FE-2 ruling
itself (sweep as flags, never auto-add, dismissals remembered per case) is untouched.

## AUTHORIZATION (RULED — the guard lines lift)

**Michael authorized the CD-1 build slice as scoped above, 2026-08-11 Central.** The session's
standing direction was "Let's run forward with your recommendation"; the authorization itself was
his explicit ruling on the question put to him: **"Authorize as scoped."** This is the explicit
authorization the guard lines required. Accordingly:

- `docs/specs/contact-directory.md`'s header line "NOTHING IN THIS FILE AUTHORIZES A BUILD" is
  qualified by a dated note (this packet lands it): the CD-1 build slice is authorized WITHIN THE
  SCOPE OF THIS DOC; the spec remains the design authority.
- BUILD-STATE's CD-1 NOT-AUTHORIZED language updates to: **CD-1 build slice AUTHORIZED
  2026-08-11, scope in `docs/specs/cd1-build-slice.md`; not yet built.**
- The queue's CD-1 entry takes the same dated annotation.

**What the authorization does NOT cover:** anything in Scope-OUT; any registry change; any edit
to `docs/skills/drafting-disclosures/SKILL.md` by Code; CE1 (still not authorized, D-CL2-9
client-aware constraint stands); CourtListener integration (Q-6 posture unchanged); T3/T4 (KICK-1
still governs). The go-live gates are untouched by this slice — fixture data only; the live
migration step is Michael's hand and does not put real client data anywhere new.

## Build-session expectations (for the Code session that takes this slice)

Work from `docs/specs/contact-directory.md` + this doc, both at HEAD. The CL-2 build pattern is
the model: TS migration + SQL, regression tests, RLS probe extended to the new tables, BUILD-STATE
rewritten (150-line cap — **currently at exactly 150; displace before adding**), exercised by
clicking, defects recorded. Spec problems found during the build go to `docs/spec-feedback.md`,
never fixed silently in the spec.

## Dated qualification — slice item 1, `party_type` (added 2026-08-12, #62)

**The original scope text above stands and is not rewritten.** This note records a build deviation
that was disclosed and then ruled on, so the slice doc and the built code agree without either
being quietly edited.

Item 1 reads "multi-valued role tags **retiring** `party_type`." The CD-1 build **retained the
column** and disclosed the deviation in its handback (log #61). **Michael CONFIRMED the retention
2026-08-12** (log #62). The reasoning, on the record:

- `party_type` drives **which fields the party registry renders** on the contact form. Dropping it
  meant rebuilding form rendering, which is nowhere in this slice's scope.
- **Role tags supersede it where it counted** — they are what the app filters and selects on.
- The tag **vocabulary is derived from the party-type registry**, so the two lists cannot drift.
- **`role_tags[0]` mirrors `party_type`**, which is the backfill contract, making the migration
  mechanical, lossless, and reversible.

Retiring the column remains available later, as its own change, with form rendering re-pointed
first. Nothing about this note authorizes that.

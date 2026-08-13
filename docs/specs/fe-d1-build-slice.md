# FE-D1 BUILD SLICE — the disclosures engine, named, scoped, AUTHORIZED

**Canonical repo path:** `docs/specs/fe-d1-build-slice.md` — NEW file.
**Status:** RULED by Michael, 2026-08-12 Central (design session, Fable 5, Cowork, typed; group
ruling on the presented scope table, minimal-editor and authorization ruled as separate widget
items). This doc records the slice naming, its scope, and the build authorization, so the text
outlives the packet that carried it (QR-1 principle). **Design authority remains
`docs/specs/form-engine.md`** — on any conflict, the spec wins and this doc gets a correction.
**DT-1:** all stamps 2026-08-12 Central, clock-checked.

## The naming (RULED)

**The next form-engine build slice is FE-D1 — the disclosures engine, end-to-end.** The name is
NOT "FE-1": FE-1 is the retired scout superseded by CD-1, and the anti-resurrection ledger bars
its reuse. D marks instrument-family slices (D1 disclosures; a later discovery slice would be its
sibling).

**The fork it resolves:** the spec carries two engine generations — the disclosures wizard
(§§1–6, POC-validated by the §12 live run and the SK-v2 method) and the generalized item-model
discovery engine (§13 + the FE-8–FE-17 queue items). RULED: slice 1 ships the DISCLOSURES
generation end-to-end. Reasons: the §10 substrate arrives WITH its first consumer (the same
no-unconsumed-structure logic CD-1 applied against service-story fields); the disclosures
instrument has the richest evidence base (the real .docx, §12's POC learnings, the SK-v2 method);
and §11.3 names its own first build task. The item-model discovery engine is slice 2 on the same
substrate. Rejected: substrate-only (unconsumed structure invites drift); discovery-core-first
(builds the substrate plus a harder consumer while the evidenced wizard waits).

**FE-GATING RULED (closes the open queue item):** FE-13–FE-17 take the #54 treatment — ruled at
this scoping session, exactly as FE-8–FE-12 were. Dispositions below.

## Scope — IN (RULED as a group; cites are to form-engine.md)

1. **§11.3 skeleton extraction — the first build task, by the spec's own words:** extract the
   clean master .docx skeleton from Michael's uploaded form (fix table width 9900→9360, computed
   § column, strip vestigial tabs).
2. **§10 substrate, complete:** `template` + `template_version` records (text with tokens,
   per-form metadata, skeleton reference); token registry (static / inflected / computed with
   per-variant checklists); generated-document record (OneDrive docx+pdf paths, template version
   used, full wizard-answer snapshot for supplementation replay); write-back paths WHERE TARGET
   RECORDS EXIST TODAY — credentials → credentials dossier now; treatment-checklist → Medical-tab
   treatment records only when those records exist. **Anything unmappable is FLAGGED, never
   guessed** (the CL-2/CD-1 backfill discipline, applied to write-backs).
3. **Skeleton renderer (§1 principle, binding):** token substitution against the real .docx
   skeleton — unzip → swap text nodes / computed blocks in `word/document.xml` → rezip, NEVER
   regeneration. One-click PDF. Storage per the existing OneDrive + metadata document model.
4. **The disclosures wizard:** §2 flow · §3 merge-field inventory · §4 per-provider interview
   cards · §5 warning gates (**wizard-screen only — generated text is identical regardless of
   gate state; this is a binding invariant, not a preference**) · §6 conditional sections.
   Enter-once with write-back: wizard questions exist only for data the file doesn't hold, and
   answers self-extinguish the question — which is also the ruled mitigation for any §10 provider
   field not yet built.
5. **§9 variant library seeded as template DATA, verbatim.** The §9 header's do-not-rewrite bar
   carries into the seed: the build copies, it never rewords.
6. **FE-10 from birth:** format profiles + render lint, including the numbering pass (gapless,
   duplicate-free visible numbering; continuous logical numbering, never hard-coded restarts).
7. **FE-12 from birth:** provenance flag (format-authoritative / proposed) on the template bank.
   FE-7 adoption is what flips it — the ruled interplay stands.
8. **FE-8, retention half:** as-generated retention IS the §10 generated-document record (.docx
   as generated + the answer snapshot). The attorney-edit DIFF is OUT — deferred to its first
   consumer (the transform/discovery work), where FE-13 needs it anyway.
9. **FE-15, scoped to disclosures:** instrument posture (original / amended / supplemental)
   driving title, certificate-of-service inclusion, and footer instrument name together. §10's
   supplementation replay is the evidence that supplemental disclosures are slice-1 work. Full
   generalization lands with the discovery slice.
10. **Minimal in-app template editor (RULED as its own item):** edit → new `template_version`,
    plain text with tokens, no styling UI. §1 makes Michael's ownership of routine wording changes
    a settled principle; a slice with no editor breaks it. §11.4's UX pass stays a later item.
11. **RLS + GRANTs + probe extension from birth** on every new table, same commit as the tables —
    the #28/CL-2/CD-1 lesson, now standing practice.

## Scope — OUT (RULED, with homes; nothing here is silently dropped)

- **FE-9** family drift detection — needs FE-6's packaging families; discovery slice.
- **FE-11** roster-driven consistency sweep — discovery slice; **FE-D1's lint does NOT absorb
  it** (stated so no one smuggles it in).
- **FE-13** instrument transform — needs FE-8's diff + the exemplar bank; later.
- **FE-14** relief-bracket picklist — pleading-side; gated on the UNVERIFIED TRCP 47(b)–(c)
  registry entry; later.
- **FE-16** citation bank — registry/CourtListener-adjacent; Q-6 posture untouched; later.
- **FE-17** internal/outbound hard flag — **BINDING FROM-BIRTH ANNOTATION: rides whichever slice
  creates the ITEM table (the discovery slice), in the same commit as that table.** Recorded here
  so that slice cannot forget it. The privilege-firewall sub-questions ride with it.
- **FE-2** stays parked at the intake pipeline (the 08-11 re-park stands).
- **§11.1** Bates/document-production module — stays banked, separate design session; the engine
  reads its log only (§10).
- **§11.2** remaining template conversions — later slices, one instrument family at a time.
- **§11.5** pharmacy/custodian variant confirmation — stays gated on Michael's deadline-engine
  CONFIRM verifications.
- **The §13 item model itself** — slice 2's core; nothing in FE-D1 creates items.

## What the authorization does NOT cover

Anything in Scope-OUT; any registry change; any edit to `docs/skills/drafting-disclosures/SKILL.md`
by Code (the skill remains the live drafting path until FE-D1 is walked — the engine is EXCLUDED
from the GL-1 floor and this slice does not change that); CE1 (D-CL2-9 stands); CourtListener
(Q-6); T3/T4 (KICK-1 governs); the CD-1 item-7 live migration (Michael's hand, unrelated to this
slice). Fixture exercise only — no real client data anywhere; live use of the wizard follows
go-live by its own path.

## Build-session expectations (for the Code session that takes this slice)

Work from `docs/specs/form-engine.md` + this doc, both at HEAD, fired from
`docs/prompts/PROMPT-fe-d1-build-session.md`. The CL-2/CD-1 pattern is the model: TS migration +
SQL, regression tests, RLS probe extended in the same commit as the tables, BUILD-STATE rewritten
(150-line cap — displace before adding, name what paid), exercised by clicking, defects recorded.
§11.3 is the first task. Spec problems found during the build go to `docs/spec-feedback.md`, never
fixed silently in the spec. DT-1 binds.

## On landing

- BUILD-STATE's form-engine language updates to: **FE-D1 (disclosures engine) AUTHORIZED
  2026-08-12, scope in `docs/specs/fe-d1-build-slice.md`; not yet built.**
- The queue's FE entries take the dispositions above (in/out/defer with homes); the FE-gating
  question closes.

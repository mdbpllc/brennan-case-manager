# CR-3 Field-Code Map — design input from the 2023+ crash-report code sheet

**Canonical repo path:** `docs/specs/cr3-field-code-map.md` — NEW file.
**Status: PROPOSED design input — not ruled, not build-queue.** Nothing here authorizes any
build; IN-2 remains an open queue item. This doc maps the Texas Peace Officer's Crash Report
code sheet onto existing design homes so the eventual extraction work starts from an
authoritative field inventory instead of rediscovering it.
**Source:** Form CR-3CS 4/1/2023 (Texas Peace Officer's Crash Report — Code Sheet, two pages,
46 numbered code lists), supplied by Michael 2026-08-12; routed to the repo at
`docs/reference/CR3-code-sheet-2023.pdf` by the same packet. Public TxDOT form documentation —
no client data. **Governs wrecks occurring 2023-forward** (Michael's statement of scope).
**Naming note:** "CR-3" here is the CRASH REPORT FORM, per the citation convention adopted
2026-08-12 (#62 batch) — never the criminal requirement CR-3, which is always written
"CR-3 (criminal requirement)."
**DT-1:** stamps 2026-08-12 Central, clock-checked 22:44 CDT.

## The load-bearing finding: the code tables are VERSIONED data

The 4/1/2023 sheet governs crashes from 2023 forward; earlier crashes decode against earlier
sheets. So any CR-3 extraction must store **(code, decoded label, code-sheet version)** — and the
code tables themselves carry effective dates. This is the house versioning pattern (immutable
versions, consumers stamp what they used — FE-4 definitions, template_version, registry stamping)
applied to an external vocabulary. An extractor without the version dimension silently misdecodes
pre-2023 crashes. When IN-2 is designed, this is a requirement, not an option.

## Field groups mapped to design homes (all mappings PROPOSED)

| Code-sheet fields | What they enumerate | Design home / consumer |
|---|---|---|
| 5 Unit Description · 14 Person Type | Units (motor vehicle, train, pedalcyclist, pedestrian, motorized conveyance, towed, non-contact) and persons (driver, passenger, pedestrian, pedalcyclist, motorcycle occupant) | **CD-1 roster seeding evidence** for the MVA/trucking constellations — slot vocabulary for drivers, passengers, pedestrians, non-contact units |
| 31 Carrier ID Type (US DOT / TxDOT / ICC-MC) | Carrier identity number families | **CD directory vocabulary candidate** (the CD-3 spec-level-act pattern); also IN-2's named extraction target "carrier identity, DOT number" |
| 28 Financial Responsibility Type | Liability policy, proof of liability, binder, surety bond, certificates of deposit (comptroller / county judge), self-insurance | **CD directory vocabulary candidate** — insurer / financial-responsibility posture beside CD-3's insurer subtypes |
| 30 Vehicle Operation · 32 Vehicle Type · 33 Bus Type · 34 Hazmat Class · 35 Cargo Body · 36 Trailer Type · 12 CDL Endorsements · 13 Driver License Restrictions | The commercial-vehicle block | **Trucking case-type signals** — interstate-commerce + USDOT is the FMCSR-applicability flag (automation FLAGS; the applicability call is Michael's; the verified FMCSR registry entries are the legal substrate) |
| 37 Sequence of Events · 38 Factors & Conditions (79 codes) · 39 Vehicle Defects · 40–46 Weather/Light/Road | Crash mechanics and negligence-factor taxonomy (incl. the intoxication pair, four distinct cell/mobile-device codes, the failed-to-yield family) | **Liability-workup extraction targets** — structured factor evidence feeding demand/petition drafting (the FE consumers) and IN-2 fact rows |
| 29 Vehicle Damage Rating | Direction of force (clock positions), damage description, severity 0–7, special codes (burned, top damage, undercarriage) | **Damages/impact evidence** — structured biomechanics input for damages narratives |
| 16 Injury Severity (KABCO: A/B/C/K/N) · 19 Ejected · 20 Restraint · 21 Airbag · 22 Helmet | Injury coding and mitigation/comparative factors | **Intake triage + damages posture**; comparative-negligence flags surfaced, never characterized |
| 24–27 Alcohol/Drug Specimen & Result · 23 Solicitation | Intoxication evidence trail | **Punitive-exposure / dram-shop signal** — flag-only |
| 8 Autonomous Unit · 9 Autonomous Level Engaged | 2023+ autonomy fields (levels 0–5) | **Products-liability signal** — new-generation field the intake should surface, not bury |
| 1–4, 42–46 Roadway System/Part/Direction/Suffix, Entering Roads, Roadway Type/Alignment, Surface, Traffic Control | Scene and roadway coding | IN-2 fact rows; scene-reconstruction reference |
| 6 Vehicle Color · 7 Body Style · 10 License/ID Type · 11 License Class · 17 Ethnicity · 18 Sex | Identification fields | Extraction inventory only — **note: demographic fields (17, 18) are on the form; whether the software captures them at all is already an OPEN question** (the 2026-07-25 spec-feedback OAA item asks exactly this for gender and race — same answer should govern both intake paths) |

## Seed-data note (for whenever IN-2 or the intake pipeline is designed)

The 46 lists are closed-code lookup tables — seedable as DATA under the templates-are-data
principle, versioned per the finding above. Public-domain administrative codes; fixture-safe.
**None of them are legal propositions** — no registry entries, no verification burden. The only
legal-analysis adjacency (FMCSR applicability from the commercial block) is flag-only by standing
registry discipline.

## What this doc does NOT do

Authorize any build (IN-2 and the intake pipeline stay queued); add directory vocabulary (CD
additions are spec-level acts on the living spec, Michael's ruling); open registry entries;
resolve the demographic-capture question (it stays open where it already lives).

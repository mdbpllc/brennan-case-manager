# Watch Targets — Seed Data (Module B, bill tracking)

**Date:** 2026-07-25. **Status:** ready for T3 import (becomes `watch_targets` rows). Companion to `docs/specs/statute-text-and-bill-tracking-design.md` (§4) — cite corrected 2026-07-26; it was written as the design-space filename `claude/Statute_Text_and_Bill_Tracking_Design_2026-07-25.md`, which is not a repo path — O4 decided all groups IN. Cites compiled from the registry verification list (billing synthesis Part 7), the record-clearing lifecycle docs, the plea-hearing eligibility spec, and the transcript design.

**Mechanism reminder:** kind `registry-derived` targets are AUTO-generated from Legal Rule Registry cites — the rows below are the currently-known set, listed so T3 can test against reality; the live list must regenerate from the registry at poll time. Kind `manual` targets are standing topic sweeps via `getSearchRaw&state=TX`.

## Registry-derived cite targets (auto; current known set)

| Cite | Why it's watched |
|---|---|
| CPRC §18.001 | Counter-affidavit regime; failed SB 30 overhaul successors expected |
| CPRC §41.0105 | Paid-or-incurred (Haygood) |
| CPRC Ch. 146 | Balance billing / patient-responsibility cap (Kostura analysis in liens spec) |
| Prop. Code Ch. 55 | Hospital liens incl. HB 2929 caps; perfection checklist currency |
| Health & Safety Code Ch. 327 | TX price transparency (federal 45 CFR pt. 180 changes are OUT of LegiScan scope — congressional/CMS watch is manual) |
| Ins. Code Chs. 542/542A | TPPCA prompt-pay deadlines and penalties |
| CCP Ch. 55A (all arts., esp. 55A.002, .052–.054, .151, .154, .201) | Expunction — new chapter eff. 1/1/2025, renumbering risk is LIVE precedent (old Ch. 55 was repealed/replaced) |
| Gov't Code §§411.071–.0775 (esp. 411.072, 411.074(b)) | Nondisclosure waiting periods + disqualifiers |
| CCP Arts. 42A.701, 42A.111, 42A.105(f), 42A.054 | Judicial clemency / deferred discharge / eligibility flags |
| Penal §§49.04–49.08 | DWI family (gates multiple relief paths) |
| CCP Ch. 62 | Sex-offender registration (kill-switch flag for relief paths) |
| Penal §16.02 | Interception/consent (transcript layer) |
| Gov't Code Chs. 124, 125; §76.011 | Specialty-court / pretrial-intervention programs (expunction routes reference them) |

**Out of LegiScan scope, separate watch channels (do not create targets):** TRCP 192.3(h) and other court rules (amended by SCOTX order, not bills — watch txcourts.gov orders); 45 CFR pt. 180 (federal).

## Manual topic sweeps (getSearchRaw&state=TX, year=2, quoted phrases)

**Group 1 — §18.001 overhaul successors:** `"18.001"`; `"counter-affidavit"`; `"counteraffidavit"`; `"affidavit concerning cost and necessity of services"`.

**Group 2 — Expunction / nondisclosure (renumbering-robust):** `"expunction"`; `"order of nondisclosure"`; `"criminal history record information"`; `"Chapter 55A"`; `"Article 55A"`; `"Section 411.072"`; `"Subchapter E-1, Chapter 411"`.

**Group 3 — Hospital liens / billing:** `"hospital lien"`; `"Chapter 55, Property Code"`; `"balance billing"`; `"price transparency"`; `"itemized statement"` (billing-records procedure).

**Group 4 — Court costs & fees:** `"court costs"`; `"local consolidated fee"`; `"state consolidated fee"`; `"fine and costs"`.

**Sweep hygiene (T3):** results are relevance-scored — take results above a relevance cutoff (start ~50%, tune from the decision log); every hit dedupes by bill_id against `tracked_bills` before spending getBill; quoted multi-word phrases, not bare OR-soup. Each sweep is 1 query per page — all four groups ≈ 20 queries per sweep cycle, trivial against budget.

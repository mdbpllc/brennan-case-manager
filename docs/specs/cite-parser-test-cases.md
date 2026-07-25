# Cite Parser (T1) — Test Case Table

**Date:** 2026-07-25. **Status:** ready to become T1's unit-test fixtures verbatim. Companion to design doc §3 A1 and §9 W1. Parse target shape: `{kind, code, chapter, section, url, anchor}` where `kind` ∈ statute | ccp-article | constitution | rule | federal | bill-number | not-a-cite. URL pattern: `https://statutes.capitol.texas.gov/docs/{CD}/htm/{CD}.{ch}.htm#{sec}`.

**Build-time verification flags:** (V1) confirm the two-letter abbreviation for every code by enumerating the live site's dropdown/links — the CD values below are high-confidence but unverified; (V2) confirm file naming for letter-suffixed CCP chapters (assume `CR.55A.htm`) and for CCP generally (articles, code CD=CR); (V3) confirm Estates=ES, Business Organizations=BO vs. legacy Business & Commerce=BC.

## Should parse — standard statutory forms

| # | Input | Expected |
|---|---|---|
| 1 | `Tex. Fam. Code § 153.002` | statute, FA, ch 153, sec 153.002 |
| 2 | `Texas Family Code Section 153.002` | same as #1 |
| 3 | `Family Code 153.002` | same as #1 |
| 4 | `Tex. Penal Code § 22.01(b)(2)` | statute, PE, ch 22, sec 22.01; subsection (b)(2) captured separately, anchor stays 22.01 |
| 5 | `Tex. Civ. Prac. & Rem. Code § 41.0105` | statute, CP, ch 41, sec 41.0105 |
| 6 | `CPRC 18.001(e)` | statute, CP, ch 18, sec 18.001, subsection (e) |
| 7 | `Tex. Gov't Code § 411.0735` | statute, GV, ch 411, sec 411.0735 |
| 8 | `Tex. Prop. Code § 55.002` | statute, PR, ch 55, sec 55.002 |
| 9 | `Tex. Ins. Code § 542.058` | statute, IN, ch 542, sec 542.058 |
| 10 | `Tex. Health & Safety Code § 481.115` | statute, HS, ch 481, sec 481.115 |
| 11 | `Tex. Est. Code § 256.003` | statute, ES [V3], ch 256, sec 256.003 |
| 12 | `Tex. Bus. & Com. Code § 17.46` | statute, BC, ch 17, sec 17.46 (DTPA) |
| 13 | `Tex. Lab. Code § 408.001` | statute, LA, ch 408, sec 408.001 |
| 14 | `§ 153.002, Family Code` (drafting order, as in bills) | same as #1 |
| 15 | `Section 18.001, Civil Practice and Remedies Code` | same shape as #6 (no subsection) — THE bill-text drafting convention; the B2 matcher's primary pattern |

## Should parse — CCP articles (code CR, article numbering)

| # | Input | Expected |
|---|---|---|
| 16 | `Tex. Code Crim. Proc. art. 55A.053` | ccp-article, CR, ch 55A [V2], art 55A.053 |
| 17 | `CCP art. 17.15` | ccp-article, CR, ch 17, art 17.15 |
| 18 | `Article 42A.701(f), Code of Criminal Procedure` | ccp-article, CR, ch 42A, art 42A.701, subsec (f) |
| 19 | `Art. 38.23` (bare, context-dependent) | ccp-article IF context signals CCP; else ambiguous → return candidates, never guess silently |
| 20 | `Chapter 55A, Code of Criminal Procedure` | chapter-level: CR, ch 55A, no section; URL without anchor |

## Should parse — other special forms

| # | Input | Expected |
|---|---|---|
| 21 | `Tex. Const. art. I, § 9` | constitution, CN, art I, sec 9 (URL scheme differs — [V1] the CN file layout) |
| 22 | `§§ 411.071–411.0775` (range) | range: GV inferred only with code context; expand endpoints, mark inclusive-range |
| 23 | `Chapter 146, Civil Practice and Remedies Code` | chapter-level, CP, ch 146 |
| 24 | `Tex. R. Civ. P. 192.3(h)` | **rule** — NOT a statute; no .gov statutes URL; source is SCOTX rules (different watch channel). Parser classifies, does not link |
| 25 | `Tex. R. Evid. 503` | rule (same handling as #24) |

## Must NOT parse as Texas statutes (false-positive guards)

| # | Input | Expected |
|---|---|---|
| 26 | `42 U.S.C. § 1983` | federal — classify, never map to a TX code |
| 27 | `45 C.F.R. pt. 180` | federal |
| 28 | `HB 2929` / `S.B. 30` | bill-number — feed the bill tracker, not the statute resolver |
| 29 | `2025-CI-08841` | not-a-cite (cause number; same normalizer family as transcript routing — do not cross wires) |
| 30 | `Section 8 of the contract` | not-a-cite (no code name/context) |
| 31 | `§ 3.01 of the partnership agreement` | not-a-cite |

## Source-credit act-chain grammar (W1, rides in T1 if cheap)

| # | Input | Expected |
|---|---|---|
| 32 | `Added by Acts 2023, 88th Leg., R.S., Ch. 765 (H.B. 4504), Sec. 1.001, eff. January 1, 2025.` | {action:added, year:2023, leg:88, sess:RS, ch:765, bill:HB 4504, sec:1.001, eff:2025-01-01} |
| 33 | `Amended by Acts 2025, 89th Leg., R.S., Ch. 123 (S.B. 456), Sec. 2, eff. September 1, 2025.` | {action:amended, …, eff:2025-09-01} |
| 34 | `Acts 1973, 63rd Leg., p. 883, ch. 399, Sec. 1, eff. Jan. 1, 1974.` | pre-bill-number era: no bill ref; page cite captured; still yields year/leg/eff |
| 35 | Chained credits (multiple lines under one section) | ALL captured in order — the amendment history is the ordered list, not just the last line |

## Real-text fixtures to harvest at build time

The project file `Nondisclosure_Expunction_Clemency_Statutes.txt` contains real statute text with real source credits (e.g., the 55A.053 block) — T1 should parse fixtures harvested from it, not only the synthetic table above. Cases #16, #18, #20, #32 already correspond to strings verbatim in that file.

# Case Opinion Manifest — Medical Billing / Liens Collection

**Canonical repo path:** `docs/authority/case-authority-index.md`
**Status:** REPLACES the propositional index landed at `d0b9cfa` earlier on 2026-07-26. Same path — this is a replacement, not a second doc. Rewritten 2026-07-26 (design session, Opus 5) after review against `docs/specs/legal-rule-registry-draft-entries-medical-billing.md`; routed by Code (replacement commit recorded below).

---

## ⚠️ What this doc is and is not

**This is a locator, not an authority summary.** It tells you which opinion is which and where the file lives. Nothing more.

**It states no holdings and no propositions.** The earlier version of this doc did, and that was a mistake: it characterized sixteen opinions from a shallow read, with no source flags and no verification status, sitting one directory away from a registry that opens with "ALL ENTRIES UNVERIFIED" and the standing rule that *a model asserting legal currency is never verification*. At least one of its characterizations was affirmatively wrong. Propositional content on these cases belongs in the registry and nowhere else.

**Authoritative source for what these cases hold:** `docs/specs/legal-rule-registry-draft-entries-medical-billing.md`. Where this manifest and the registry appear to conflict, the registry governs. If something here contradicts it, this doc is the error.

**Do not add holdings, propositions, or "use for:" notes to this file.** That is what the registry is for. Keeping them separate is the point.

---

## Manifest

Alphabetical. The **Subject** column names the topic the opinion sits under — it is a filing label, not a holding. **Registry ref** lists only cross-references directly observed in the registry text; a blank means *not yet checked*, not *not relevant*.

| Case | Reporter cite | Court / Year | Subject | Registry ref (observed) | Flags |
|---|---|---|---|---|---|
| Ahmed v. Sosa | 514 S.W.3d 894 | Tex. App.—Fort Worth 2017, no pet. | Post-verdict lien reduction; timing of "incurred" | Entry 1(c-1) | |
| Christus Santa Rosa Health Care Corp. v. UnitedHealthcare Ins. Co. | 2026 U.S. Dist. LEXIS 353 | E.D. Tex. (Sherman) Jan. 5, 2026 | Out-of-network emergency care; usual and customary rate; discovery | — | A-4 |
| Farmers Tex. Cty. Mut. Ins. Co. v. Beasley | 598 S.W.3d 237 | Tex. 2020 | PIP payment at negotiated vs. list rate; standing | — | |
| Gunn v. McCoy | 554 S.W.3d 645 | Tex. 2018 | §18.001 affidavits; subrogation-agent affiants | — | |
| Haygood v. De Escabedo | 356 S.W.3d 390 | Tex. 2011 | §41.0105 paid-or-incurred; Medicare adjustments | Entry 1(a), 1(b) | |
| Henderson v. Spann | 367 S.W.3d 301 | Tex. App.—Amarillo 2012, pet. denied | Unadjusted bills; post-verdict adjustment | Entry 1(b) | |
| Huntress v. Hickory Trail Hosp., L.P. | 2020 Tex. App. LEXIS 4112 | Tex. App.—Dallas 2020, pet. denied (mem. op.) | Suit against the provider; scope limit on Haygood | Entry 1(d) | A-4 |
| In re Cent. Or. Truck Co. | 644 S.W.3d 668 | Tex. 2022 (per curiam) | Medical-billing discovery; mandamus posture | — | |
| In re K & L Auto Crushers, LLC | 627 S.W.3d 239 | Tex. 2021 | Provider negotiated rates and costs; discovery; qualified LOPs | Entry 1(c-3) | |
| In re N. Cypress Med. Ctr. Operating Co. | **559 S.W.3d 128** | Tex. 2018 | Chargemaster rates; hospital lien; discovery | — | **A-1** |
| In re United Healthcare Ins. Co. | 652 S.W.3d 458 | Tex. App.—**San Antonio** 2022, orig. proceeding | Nonparty payor deposition; contractual reimbursement rates | — | |
| Katy Springs & Mfg. v. Favalora | 476 S.W.3d 579 | Tex. App.—Houston [14th] 2015, pet. denied | Factoring; §18.001 affiant qualification; counter-affidavit | Entry 1(c) | |
| McMillan v. Hearne | 584 S.W.3d 505 | Tex. App.—Texarkana 2019, no pet. | Nonsubscriber employer offset; collateral source | Entry 1 (dropped — see note) | **A-6** |
| Press Energy Servs., LLC v. Ruiz | 650 S.W.3d 23 | Tex. App.—El Paso 2021, pet. denied | Abandoned medicals claim; bills and noneconomic damages | — | |
| Primoris Energy Servs. Corp. v. Myers | 569 S.W.3d 745 | Tex. App.—Houston [1st] 2018, no pet. (op. on reh'g) | Medical factoring; assignment | Entry 1(c) | **A-7** |
| Sheppard v. Martinez | 2025 Tex. App. LEXIS 1266 | Tex. App.—Houston [14th] Feb. 27, 2025 (mem. op.) | Stale/unpaid bills; limitations; damages sufficiency | Entry 1(c-2) | A-4 |

**Files:** `docs/authority/pdf/` (pending Michael's move — runbook step 3, PROPOSED).

---

## Flags

| # | Flag | Action |
|---|---|---|
| **A-1** | The N. Cypress PDF on file is the **withdrawn** opinion, 2018 Tex. LEXIS 346. The operative substituted opinion is **559 S.W.3d 128** (Tex. 2018), as cited in K&L Auto Crushers at 129. | Re-pull the substituted opinion. Correct any doc citing the LEXIS number. |
| **A-2** | `McMillan_..._505_1.Pdf` is a byte-different but content-identical duplicate of `McMillan_..._505.Pdf` (extracted text matches character-for-character). | Delete the `_1` copy. Runbook step 1. |
| **A-4** | Huntress and Sheppard are **memorandum opinions**; Christus Santa Rosa is a **federal district court** decision — persuasive only. | Note weight wherever cited. |
| **A-5** | All sixteen PDFs are **scanned page images with an OCR text layer**, not text-layer PDFs. | Verify any quote against the reporter before filing. |
| **A-6** | The registry **dropped McMillan** from Entry 1: it discusses Haygood accurately but does not apply the paid-or-incurred measure and involves no LOP. Retained, if at all, as "discussing Haygood in the nonsubscriber offset context." | Do not treat it as paid-or-incurred authority. |
| **A-7** | Primoris posture: the parties settled, the original opinion was withdrawn, and the opinion on rehearing issued in its stead. | Flag the posture wherever cited. |

**A-3 has been withdrawn.** The prior version of this doc flagged Huntress as "not a billing case — confirm why it's here" and suggested refiling it. That was wrong. Huntress reaches Haygood at \*20–21 and expressly distinguishes it: unlike Haygood, the plaintiff sued the providers for their own tort, so reasonableness and necessity of those providers' charges are not pertinent to her no-evidence summary-judgment burden. Registry Entry 1(d) places it deliberately and cites it precisely. **Huntress belongs in this collection.** The flag is recorded here as withdrawn rather than deleted so that anyone who saw it knows not to act on it.

---

## Known gap

*Ortiz v. Nelapatla*, No. 23-0953 (Tex. May 1, 2026), is **not** in this collection — no PDF on file — and it is the controlling recent authority on partially controverted §18.001 counteraffidavits. It is handled at registry Entry 2 (redraft v2), which records it as read in full, majority and dissent. Anyone using this manifest to locate §18.001 material should go to Entry 2, not to Gunn or Katy Springs alone.

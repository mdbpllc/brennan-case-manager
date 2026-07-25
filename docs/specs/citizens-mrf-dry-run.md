# Citizens Medical Center MRF Dry Run — Findings (v2, COMPLETED 2026-07-22)

**Purpose:** Reality-test the hospital-MRF data source (synthesis doc §2.1) against the hospital from the triggering exercise, before any Phase 2 MRF-loader code is written. Decision to run: Part 8 item 4, resolved 2026-07-22.

**Status:** COMPLETE. v1 of this doc was written from partial remote fetches and reported the file as a pre-upgrade v2.0.0 CSV — **that was a stale cached copy; corrected below.** Michael downloaded the live file from the transparency page the same day (55 MB; chat upload timed out, staged via the desktop folder bridge as a ZIP), and the full per-code analysis ran on the real file.

---

## 1. The file: current, attested, upgraded schema

- Transparency page: https://www.cmcvictoria.com/price-transparency (live). Contact: Kimberly Rollins, krollins@cmcvtx.org.
- **Actual current file: CMS template v3.0.0, last_updated 2026-05-11** — with the 45 CFR 180.50 attestation affirmation (TRUE + attester name), hospital NPI (1124052162), and the upgraded column set (median_amount, 10th/90th percentile, count of claims, per payer-plan). 532 columns; 34 payer|plan groups; **32,970 data rows, all billing_class=facility, split inpatient (15,836) / outpatient (17,134)**.
- The stale-copy incident is itself a loader lesson: the hospital's CDN served an old v2.0.0 object (dated 8/7/2025) to one fetch path while the page link served the current file. **Loader must verify last_updated/version from file contents, never trust filename or cache.**
- The CMS `cms-hpt.txt` indicator file defect stands: its mrf-url points at the page anchor, not the file — fall back to scraping the page for the link.

## 2. Column population — schema adoption ≠ data population

| Element | Coverage |
|---|---|
| negotiated_dollar (any payer) | 32,352 / 32,970 rows (~98%) |
| negotiated_algorithm | 4,682 rows |
| count_of_claims | 4,671 rows |
| **median_amount** | **5 rows** (none BCBS) |
| negotiated_percentage | 8 rows |

**Headline for the module:** Citizens adopted the upgraded v3.0.0 *schema* but has not populated the historical-payment *data* — so the usable evidence tier today is **negotiated dollar rates** (excellent coverage), not attested medians. Quality grading must therefore measure **column population, not schema version**. Whether an attested v3.0.0 file with empty median columns satisfies the upgraded requirements is a verification sub-question [CONFIRM — registry item #6].

## 3. Per-code results — the exercise codes, BCBS plans

Five BCBS-family plans in the file: Blue Advantage HMO, Blue Cross Commercial PPO, HealthSelect HMO, Commercial HMO (rates ≈ PPO), and "Blue Cross County of Victoria" (the county's own plan — hospital is county-owned; far lower rates). Every code appears twice (inpatient/outpatient setting), with **different rates AND different methodologies**: inpatient = percent-of-billed (PPO ~49%, HealthSelect ~43%, Blue Advantage ~37%); outpatient = contract fee schedule.

**Outpatient facility (the ER-visit scenario from the exercise), key rates:**

| Code | Description | Gross | Cash | BCBS PPO | Blue Adv HMO | County plan |
|---|---|---|---|---|---|---|
| 70450 | CT head w/o contrast | $3,166 | $1,583 | $487.55 | $159.15 | $103.34 |
| 83880 | BNP | $185 | $92.50 | $135.05 | $53.79 | $38.47 |
| 84484 | Troponin (each) | $54 | $27 | $42.90 | $17.08 | $12.22 |
| 99283 | ED Level III | $624 | $312 | **$1,113** | $777 | $269.83 |
| 99284 | ED Level IV | $983 | $491.50 | **$1,460** | $960 | $412.45 |
| 99285 | ED Level V | $1,410 | $705 | **$3,800** | $2,160 | $588.67 |

**Anomaly that must be handled, not hidden:** outpatient ED E/M negotiated rates *exceed gross charges* (99283 PPO $1,113 vs $624 billed; 99285 $3,800 vs $1,410). This is a real MRF phenomenon (contract fee schedules for ED facility E/M set above chargemaster). The loader needs an **above-gross flag**, and lien-reduction exhibits must select lines honestly — leading with the CT (15% of billed at PPO) while an ED line runs above billed would invite a credibility attack if presented selectively without disclosure.

## 4. Comparison to the original exercise

The exercise benchmarked the ~$8,975 facility bill against a BCBS *professional* schedule → ~$368–449 total (70450 = $87.02). The hospital's own facility numbers for the mapped subset (CT + BNP + troponin ×2 + ED level), BCBS PPO outpatient: **$1,821 / $2,168 / $4,508** depending on ED level 3/4/5.

What this proves:

1. **The claim-type disclaimer was load-bearing, empirically.** Facility reality is roughly 4–10× the professional-schedule estimate. The Phase 1 "professional benchmark only, hard disclaimer on facility bills" posture (decision item 3) is vindicated — the professional number was never a facility prediction, and now we can show exactly how far off it runs.
2. **The MRF is still strong lien-reduction ammunition, at the right lines.** Even at BCBS PPO rates, the mapped subset comes to ~20–50% of its billed charges; the CT alone is 15% of billed (5% at Blue Advantage; 3.3% at the county's own plan). And these are the hospital's *own published, attested* numbers.
3. **The payer-mix spread is itself an exhibit:** the same CT ranges $103–$488 across BCBS-family plans, against $3,166 billed — a range table straight out of the B2 scenario-handling design.

## 5. Design implications for the Phase 2 MRF loader (updated)

1. **Parse CMS v3.0.0 wide-format** (532-column, payer|plan column groups); keep v2.0.0 support for laggard hospitals.
2. **Quality grade = computed, population-based:** template version, last_updated freshness, per-column population rates (esp. median vs negotiated_dollar), dollar-vs-algorithm mix for payers of interest, TXT-indicator compliance, above-gross anomaly rate.
3. **Setting matters:** every code carries inpatient AND outpatient rows with different rates/methodologies — lookups must key on (code, setting, payer|plan), and the bill's claim-type detection (A4) drives which row applies.
4. **Evidence-tier label per number:** attested median > negotiated dollar > derived-from-algorithm > cash/gross. Citizens today yields tier 2.
5. **Chargemaster-memory caution:** the file maps 99283 to both "Emergency Care Level III" AND "Sane Examiner Fee" — internal code reuse means memory must key on description+code, not code alone.
6. **Fetch on Michael's machine** with content-based version verification (see §1 stale-cache lesson); large-file handling is real (55 MB / 33k rows for a mid-size county hospital — compress in transit, parse in background).

## Verdict

**MRF source: CONFIRMED, now on real data.** The hospital that triggered the module publishes current, attested, BCBS-specific negotiated dollar rates for exactly the codes in the exercise. The attested-median tier isn't populated yet (grade the file, cite the tier); the anomalies found (above-gross ED rates, code reuse, stale CDN copies) are all handleable and now specced. Phase 2 can build against this file as its reference fixture.

## Postscript (2026-07-25): Real-world resolution of the source account

*(Routed 2026-07-25 from the Citizens-negotiation design session.)*

The account that produced this dry run's source bill (V00505135029) was settled 2026-07-25 for **$5,000 full-and-final** (billed: $8,975.00). Points of record for module design:

- Citizens quoted an expected BCBS reimbursement of **$4,392.55 = 48.94% of billed** — consistent with the ~49% inpatient percent-of-billed methodology, applied to an outpatient ER encounter. Payers/providers do misapply methodology class in correspondence; the module should always independently classify the encounter (inpatient vs. outpatient) before selecting methodology.
- Under this facility's own published outpatient PPO rates, the encounter's priced lines alone (70450 + 83880 + 2×84484 + 99285) total ≈ **$4,508** — above the quoted figure, driven by the above-gross 99285 rate ($3,800 vs. $1,410 gross). Validation: "lower than billed" does not mean "lower than the payer methodology yields." An honest MRF-based analysis can be adverse to the client's negotiating position; the report generator should surface this to the attorney BEFORE anything is sent out, not after.
- ED E/M level was confirmed by exact gross-charge match against the chargemaster (ED $1,410 ⇒ 99285). This chargemaster-reverse-lookup technique (match billed line amounts to gross-charge column to recover CPT when the bill omits codes) is worth noting as a supported mapping strategy in Phase 1a/2.

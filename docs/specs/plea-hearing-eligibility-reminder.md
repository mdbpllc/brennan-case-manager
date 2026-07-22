# Plea-Hearing Eligibility Reminder — Full Specification

Feature 8 from the project instructions (§14), now fully specified. Built from the project's `Nondisclosure_Expunction_Clemency_Statutes.txt` (which includes the 2025 Ch. 55A renumbering and the Sept. 1, 2025 amendments). Everything here is a design spec, not legal advice; every statutory rule below carries its cite so it can be re-verified before hard-coding.

## 1. What this feature is

When a criminal case reaches the moment it might resolve by plea, the system surfaces a **disposition-scenario readout**: for each realistic outcome of the plea (dismissal, deferred adjudication, straight probation, conviction with jail), what future record-clearing relief that outcome preserves or destroys — computed from the actual charges and the client's actual prior record. Two payoffs:

1. **Negotiation tool.** The choice of disposition is often the single biggest driver of whether the client can ever clear their record. The readout puts that on the table *while the deal is still negotiable*, and surfaces the specific bargaining levers (below).
2. **Documented advice.** Advising the client about future relief becomes a logged, dated task — a malpractice shield — and (once the barratry consult clears) the hook for the future-contact consent engine (feature 9).

## 2. Trigger mechanics

- **Fires when:** (a) a court setting of type *plea hearing* is calendared; (b) a setting of type *pretrial* is calendared AND the case stage is plea negotiations; (c) the case stage advances to *plea negotiations* (first entry); (d) on demand ("run eligibility preview" button, any time).
- **Lead time:** default 3 days before the setting plus a day-of reminder (configurable per case).
- **Suppressed when:** a disposition has been entered on every charge, or Michael dismisses it for this setting.
- **Completion:** the reminder resolves into a checklist task — "Advised client on future record-clearing eligibility" — with date and optional note. If the plea discussion is recorded (opt-in, per the transcript layer), the transcript links to this task as the documentation.
- **On disposition entry:** the scenario readout collapses into the ACTUAL eligibility computation (feature 7 — earliest date each relief becomes available), auto-calendars nothing yet for outreach (that waits on feature 9's barratry consult), but does calendar the *case's own* relief dates if Michael keeps the matter (e.g., nondisclosure petition date).

## 3. Inputs (data model)

- **Charge records** (existing: plain-English name, statute cite, offense level) — ADD derived/entered fields: Penal Code chapter; DWI-family flag (§§49.04–49.08); sex-offender-registration offense flag (CCP Ch. 62); Art. 42A.054 felony flag; **family-violence-alleged flag**.
- **Statute reference table** (shared with the SOL calculator, feature 6): offense → class/degree, chapter, and the flags above. One table powers both features.
- **Client prior criminal history** (existing intake repeating list) — ADD structured fields per entry: disposition type (conviction / deferred adjudication / dismissal / acquittal), offense + cite if known, date, family-violence involved? This is load-bearing: most relief paths are gated on "never previously convicted of or placed on deferred adjudication for any offense other than fine-only traffic." A **DPS/background-check task** should back this up — client memory is not a reliable source for an eligibility opinion.
- **Court setting records** — ADD a setting-type field (arraignment / pretrial / plea hearing / motion hearing / trial / sentencing). The trigger keys off it; useful everywhere else too.
- **Disposition record** (entered at outcome) — disposition type; date; supervision term and type; key conditions/findings: **ignition-interlock condition (≥6 months)**, **Art. 42A.105(f) affirmative finding**, **family-violence affirmative finding**; discharge date when reached; for dismissals, the dismissal mechanism (pretrial intervention/diversion program, no-probable-cause, plea-to-other-count, etc. — drives which expunction route applies).

## 4. The disposition-scenario matrix (the readout's content)

Computed per charge, filtered through the kill switches in §5. Cites are to the project statutes file.

**Scenario A — Dismissal or acquittal → EXPUNCTION territory (CCP Ch. 55A).**
- Trial acquittal: mandatory expunction (55A.002), and an **automatic-entry order is available within 30 days of acquittal on request (55A.201) — the readout reminds Michael to request it AT acquittal**, not as a later petition.
- Dismissal/quash: entitlement depends on the route (55A.053) — completed pretrial intervention/diversion, void indictment, no probable cause, etc. — or on limitations expiry (55A.054) / the no-indictment waiting scheme (55A.052).
- **Same-criminal-episode trap (55A.151):** a count dismissed as part of a plea to another count from the same episode is NOT expungeable. Surface this whenever a multi-count deal is on the table.
- Absconding disqualifier (55A.154).

**Scenario B — Deferred adjudication → discharge (Art. 42A.111) → NONDISCLOSURE territory.**
- **§411.072 (automatic, certain nonviolent misdemeanors):** misdemeanors NOT under §49.04/49.06 or Chs. 20, 21, 22, 25, 42, 43, 46, 71; clean prior record; no 42A.105(f) finding. Court issues the order at discharge (if ≥180 days from placement) for a $28 fee — effectively free relief the client should know about before pleading.
- **§411.0725 (petition):** felonies — **5-year wait** after discharge; Chs. 20/21/22/25/42/43/46 misdemeanors — **2-year wait**; other misdemeanors ineligible under 411.072 — at discharge. Notably does NOT carry the clean-prior-record gate (411.0725(c)), though §411.074 still applies. Best-interest-of-justice finding required.
- **§411.0726 (DWI/BWI misdemeanor deferred):** 2-year wait; clean record; no 42A.105(f) finding; state can defeat by showing the offense involved a **collision with another person** (incl. own passenger).
- **Client-misconception warning baked into the advice script:** deferred adjudication does NOT lead to expunction — the arrest record survives; nondisclosure (sealing) is the ceiling.

**Scenario C — Conviction + community supervision.**
- **Judicial clemency (Art. 42A.701(f)):** available at discharge, judge's discretion — set-aside of verdict, dismissal, release from penalties and disabilities. EXCLUDED: §§49.04–49.08 offenses, sex-offender-registration offenses, 42A.054 felonies (42A.701(g)). The readout also surfaces the **early-termination review points** (judge MAY at lesser of 1/3 or 2 years, 42A.701(a); MUST review at greater of 1/2 or 2 years, 42A.701(b)) and the **42A.058 requirement that the judge inform the defendant of clemency on the OCA form at placement** — confirm it happened.
- **Nondisclosure after misdemeanor conviction + supervision (§411.073):** certain misdemeanors only (not DWI-family, ABC §106.041, or Ch. 71); clean record; at completion, or 2-year wait for Chs. 20/21/22/25/42/43/46.
- **DWI misdemeanor conviction + supervision (§411.0731):** not high-BAC §49.04(d); clean record; collision-with-another-person defeats; **2-year wait IF a ≥6-month ignition-interlock condition was completed, otherwise 5-year** — the interlock condition is a bargaining chip worth asking for.
- **Felony conviction: NO nondisclosure path, ever.** The readout says so in plain terms — this is the single starkest deferred-vs-conviction consequence on a felony plea.

**Scenario D — Conviction with confinement (no supervision).**
- **§411.0735:** certain misdemeanors (same exclusions as 411.073); clean record; completion (fine-only) or 2-year wait; court may deny if the offense was violent/sexual in nature (except §22.01 assault).
- **§411.0736 (DWI):** not §49.04(d); clean record; collision defeats; **3-year wait with the interlock condition / 5-year without**.
- Felonies: no relief (executive pardon aside — out of scope).

## 5. Cross-cutting kill switches (computed once, shown at the top of the readout)

1. **§411.074(b) permanent nondisclosure disqualifiers** — if the CURRENT charge OR ANY prior-history entry is: a sex-offender-registration offense; §20.04 aggravated kidnapping; §§19.02, 19.03, 20A.02, 20A.03, 22.04, 22.041, 25.07, 25.072, 42.072; or **any offense involving family violence** — nondisclosure is dead on every path, forever. Show this before any scenario detail.
2. **The family-violence affirmative-finding trap.** On any assault-FV or FV-capable charge, the readout carries a standing warning: an FV finding (or FV plea) not only kills nondisclosure of THIS offense — it becomes a §411.074(b)(1)(D) prior that kills nondisclosure of every FUTURE offense for life. Negotiating the finding (or the charge) matters beyond this case.
3. **Clean-prior-record gate.** §§411.072, .0726, .073, .0731, .0735, .0736 all require no prior conviction/deferred (fine-only traffic excepted). Computed from the structured prior-history list; flagged "unverified — order DPS check" until the background-check task completes.
4. **§411.074(a) forward condition:** no new conviction/deferred during supervision + the waiting period. Feeds the client-advice script ("stay clean or the clock dies") and cross-links the pretrial/supervision compliance log.
5. **Art. 42A.105(f) affirmative finding** (judge blocks the automatic misdemeanor order): downgrades §411.072 → §411.0725 petition (411.072(d)).

## 6. Negotiation levers the readout surfaces explicitly

- **Deferred vs. straight probation on a felony:** deferred preserves a 5-year nondisclosure path; conviction forecloses relief permanently. The highest-stakes lever.
- **Pretrial intervention/diversion beats deferred:** diversion completion → dismissal → **expunction** (55A.053), a full destruction of records; deferred caps at nondisclosure. Worth asking for on eligible first-offenders.
- **DWI ladder (misdemeanor):** diversion/dismissal (expunction) > deferred (§411.0726, 2 yr) > conviction with ≥6-mo interlock (§411.0731, 2 yr) > conviction without (5 yr) > §49.04(d) high-BAC (no nondisclosure). Also: a collision involving another person defeats all DWI nondisclosure routes — know it before promising anything.
- **FV finding negotiability** (§5, item 2).
- **Multi-count episode deals:** the 55A.151 trap — dismissed same-episode counts aren't expungeable if any count sticks.
- **Interlock condition:** on DWI supervision pleas, affirmatively request the ≥6-month interlock condition to buy the shorter clock.
- **Clemency preservation:** straight probation keeps 42A.701(f) alive (except DWI/registration/42A.054 offenses) — and the OCA-form notice at placement is a statutory right.

## 7. Outputs

1. **Attorney readout** — the matrix + kill switches + levers, per charge, with cites.
2. **Client one-pager (plain English, generated per case):** what each realistic outcome means for their record and when; the stay-clean condition; the deferred≠expunction correction. Michael reviews before sharing — generated as a draft, never auto-sent.
3. **Logged advice task** (§2) with optional transcript link.
4. **On disposition:** actual-eligibility computation + calendared relief dates (feature 7), and the feature-9 consent capture point (dormant until the barratry consult clears).

## 8. Guardrails & open items

- The readout is an **issue-spotter for the attorney, not an eligibility opinion**. Edge cases (veterans programs §§411.0727/.0729, trafficking victims §411.0728, specialty courts 55A.203, juvenile matters) are linked as "special routes — check manually," not computed.
- Every computed rule carries its statute cite and a verify-current-law note (citation-currency discipline, feature 13). The statutes file already reflects the Sept. 1, 2025 amendments (HB 1620, SB 1667); re-confirm at each legislative session (feature 12).
- Prior-record data is flagged unverified until a DPS/background check is on file.
- Defaults chosen without asking Michael (adjustable): 3-day lead time; fires at plea-negotiation stage entry as well as calendared settings.

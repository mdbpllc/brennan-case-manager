# Time Tracker — Fee-Basis Profiles per Case Type (Design Pass)

**Date:** 2026-07-25. **Status:** DRAFT — design pass executed in a Code session per Michael's 2026-07-25 session prompt; pending Michael's review of §8 and design-space adoption (this doc did not originate in the Claude.ai Project space; treat it as staged-for-review, not canonical, until Michael says otherwise). **Canonical repo path:** `docs/specs/time-tracker-fee-basis-profiles-design.md`. **Feeds:** the master spec's settled time-tracking capability (§14 "Time-tracking / fee-recovery module") and invoice feature; the Legal Rule Registry (binding rules 1–3); the form engine (affidavit/application outputs, later).

**NOTHING in this doc is built, and every legal proposition in it is UNVERIFIED** (registry rule 2). No warning, computation, or export behavior that encodes a legal rule may go live before Michael verifies the underlying registry entry.

## 1. Premise

Capture mechanics stay **uniform across all case types** — exactly as already settled in the master spec: date, duration, free-text description; live timer + manual back-logging; entries editable after the fact; billing rate set ONCE at case level and inherited by every entry (enter-once discipline); transcript-duration auto-suggestion hook.

What varies by case type is the **fee-basis profile**: what the time record must ultimately *prove*, which warnings fire during capture, and what the export looks like. The profile never changes how Michael enters time — it changes what the system does around the entries.

Orthogonal to the existing per-case **fee arrangement** field (hourly / contingency / hybrid, master spec §7 design note): the arrangement governs which money tools light up; the profile governs what recovery-readiness means when a fee claim exists. A contingency DTPA case has no hourly invoice but still needs a Rohrmoos-proof time record.

## 2. The FeeBasisProfile structure

A typed in-code registry (sibling of `caseTypes.ts` / `partyRegistry.ts` — legal-rule-driven configuration, versioned in git, not user data). Each profile:

| Attribute | Type | Meaning |
|---|---|---|
| `basis` | `'mandatory' \| 'discretionary-equitable' \| 'permissive' \| 'none'` | Whether/how the governing law awards fees to the fee-claiming side |
| `proofStandard` | text + registry ruleKey | What the record must prove for the AMOUNT (default nearly everywhere: two-step lodestar per *Rohrmoos* — five minimum elements, general testimony insufficient) |
| `hardProhibitions` | list of ruleKeys | e.g., contingent fee barred (criminal AND divorce, TDRPC 1.04); no non-lawyer work at lawyer rates |
| `segregation` | `'required-multi-claim' \| 'n/a'` | *Tony Gullo v. Chapa* posture (§3 — schema-level, not a warning) |
| `exportTargets` | list | fee affidavit / invoice / court application |
| `midCaseAffidavit` | boolean | affidavit-readiness before final judgment (family temporary orders) |
| `interestAccrual` | optional ruleKey | statutory interest tracked alongside time (Prompt Payment Act) |
| `captureFields` | list | extra facts the profile needs captured at intake (e.g., §38.001: opposing-party entity type + action-commenced date) |
| `registryDependencies` | list of ruleKeys | every entry the profile's behavior rests on — feeds rule-3 stamping on all outputs |

**Registry discipline applied to profiles:** a profile attribute whose registry entry is *unverified* may drive **warnings and placeholders only**. Concretely: until Michael verifies the underlying entries, the profile system shows "fee basis (unverified): mandatory — Tex. Bus. & Com. Code § 17.50(d)" style annotations and capture nudges, but no computed fee total is labeled recoverable, no interest dollar amount is computed, and no export asserts a legal conclusion.

## 3. Structural finding — claim tagging belongs in the SCHEMA

**Fee segregation (*Tony Gullo Motors I, L.P. v. Chapa*, 212 S.W.3d 299 (Tex. 2006), UNVERIFIED)** requires separating recoverable from unrecoverable fees, and intertwined FACTS don't excuse it — only a discrete task advancing both claim types escapes segregation. Reconstructing that split at fee time from a flat time ledger is exactly the painful, credibility-costing exercise the software should prevent. Therefore:

- **`claims`** (new table): per-case list of claims/matters — claim type (contract / DTPA / fraud / lien / …), label, fee-recovery eligibility per this doc's profiles. Every multi-claim case enumerates its claims at intake or when the second claim appears.
- **`time_entry_claims`** (join): each time entry tags **one or more** claims. A discrete task advancing both claim types is tagged to both — the *Chapa* escape hatch modeled directly, not approximated later.
- **Enter-once preserved:** single-claim cases auto-tag every entry to the sole claim (zero extra keystrokes — the profile only surfaces tagging UI when the case actually has >1 claim). On multi-claim cases the entry form offers the case's claim list as one-tap chips, defaulting to the last-used tag.
- Untagged entries on multi-claim fee-recovery cases are allowed (capture must never block) but carry a visible "needs claim tag" state and fire the §4 warning at export time.

Time-entry schema additions beyond the join: `created_via` (`manual | timer | transcript-suggestion`), plus the already-settled fields. Entry timestamps (`created_at` vs. work `date`) stay recorded — they feed the contemporaneity nudge in §4.

## 4. Warning behavior per profile (advisory, never blocking)

All warnings are capture/export-time nudges in the UI, never in any generated document, and never block saving (same posture as the form engine's wizard-screen-only gates):

1. **Segregation:** untagged or single-tagged-by-default entries on a multi-claim case where any claim's basis is `none` → "this record won't support segregation" at entry list + export.
2. **Contemporaneity (*Rohrmoos*, UNVERIFIED):** contemporaneous records strongly encouraged, not strictly required — an entry back-logged long after its work date gets a quiet badge, so the affidavit can anticipate the cross.
3. **Description sufficiency:** empty/near-empty descriptions on fee-recovery cases ("call", "work on file") → nudge toward the five *Rohrmoos* elements (who, when, what service, how long, rate).
4. **Hard prohibitions (TDRPC 1.04, UNVERIFIED):** criminal or divorce case type + contingency arrangement selected → warning at the arrangement field itself (broader than criminal alone — divorce included).
5. **§38.001 capture gap (UNVERIFIED):** contract-fee claim where opposing-party entity type or action-commenced date is missing → capture nudge (HB 1578's organization expansion applies only to actions commenced on/after 9/1/2021).
6. **Probate two-lanes (Est. Code ch. 352, UNVERIFIED):** on probate matters, attorney-fee time (§ 352.051) and personal-representative commission (the separate ~5% statutory commission) are DIFFERENT LANES — the time ledger feeds only the former; blurring them is a real error risk, so the export labels the lane explicitly.
7. **Residential carve-out (Prop. Code § 53.156, UNVERIFIED):** mechanic's-lien matters flagged residential → note that the court is not required to make the owner pay.

## 5. Export targets per profile

- **Fee affidavit (the default fee-recovery export):** *Rohrmoos*-shaped bundle — per-claim segregated totals (from §3 tags), rate (case-level, uniform — which is what a court wants), element checklist, timekeeper identity, contemporaneity summary. **Mid-case ready:** generated from any point-in-time cut, not just case end — family-law temporary orders can order fees before final judgment (Fam. Code § 6.502(a)(4), UNVERIFIED), and a UM/UIM UDJA fee claim is a jury question that must be requested (Nicastro trap, already in master spec).
- **Invoice:** the already-settled invoice feature (tracked time × case rate + expenses); profile `none` + hourly arrangement is precisely the plain-invoice case. Unchanged by this design.
- **Court application:** probate § 352.051 ("on proof satisfactory to the court") and family-code discretionary awards — same underlying record, application-shaped output; format designed when built (form-engine territory).
- **Prompt Payment Act companion (Prop. Code ch. 28, UNVERIFIED):** on ch. 28 matters, statutory interest (1.5%/month, 18%/yr) accrues on the overdue payment alongside the time record; the export shows the accrual **as an unverified placeholder** until the registry entry is verified (and note: fees under ch. 28 appear DISCRETIONARY, not mandatory — Michael flagged his own voice-session statement for specific verification; oilfield/pipeline exemption at § 28.010).

## 6. Starting per-case-type profiles (ALL UNVERIFIED — placeholders until §7 sign-offs)

| Case type / claim | basis (unverified) | Key authority (registry entry) | Notes |
|---|---|---|---|
| DTPA consumer claim | mandatory | § 17.50(d) — "shall be awarded" | The clearest mandatory case in the set |
| Breach of contract | permissive | CPRC § 38.001 — "may recover" | Entity-type + commenced-date capture (HB 1578) |
| Mechanic's/materialman's lien | discretionary-equitable | Prop. Code § 53.156 | 2021 may→shall change; residential carve-out |
| Prompt Payment Act | discretionary (VERIFY) | Prop. Code ch. 28 | Interest companion; § 28.010 exemption |
| Probate | discretionary-equitable | Est. Code § 352.051 | Two-lanes separation (§4.6) |
| Family (SAPCR / divorce) | discretionary-disparity | Fam. §§ 106.002, 6.708 | Not prevailing-party driven; mid-case affidavit (6.502(a)(4)); 156.005 frivolous-modification mandatory pocket |
| First-party UM/UIM (UDJA) | permissive-on-request | master spec §12 note | Jury question; Nicastro waiver trap |
| Criminal | none | TDRPC 1.04 prohibition context | Contingency barred; time tracker still available for flat/hourly discipline |
| PI contingency (no fee claim) | none | — | Invoice/none; tracker optional |

## 7. Registry entries to open (every one UNVERIFIED — for Michael's sign-off ONE AT A TIME)

Per binding rule 2, each opens as an unverified registry entry; nothing below is treated as current law until Michael verifies it against current statute/case text. Research origin: 2026-07-25 voice session, gathered without verification.

1. ***Rohrmoos Venture v. UTSW DVA Healthcare* (Tex. 2019)** — two-step lodestar; five minimum proof elements; contemporaneous records strongly encouraged, not strictly required; general testimony insufficient. Governs the AMOUNT nearly everywhere.
2. ***Tony Gullo Motors I, L.P. v. Chapa*, 212 S.W.3d 299 (Tex. 2006)** — segregation of recoverable from unrecoverable fees; intertwined facts don't excuse; discrete-task escape.
3. **CPRC § 38.001** — contract fees, permissive ("may recover"); HB 1578 (2021) "corporation"→"organization" (LLCs/partnerships) ONLY for actions commenced on/after 9/1/2021.
4. **Tex. Bus. & Com. Code § 17.50(d)** — DTPA, MANDATORY reasonable and necessary fees to a prevailing consumer.
5. **Tex. Prop. Code § 53.156** — mechanic's/materialman's lien; "equitable and just"; 2021 may→shall; residential carve-out.
6. **Tex. Prop. Code ch. 28 (Prompt Payment Act)** — 1.5%/month interest; fee award appears DISCRETIONARY (**verify this specifically** — voice session initially implied otherwise); § 28.010 oilfield/pipeline exemption.
7. **Tex. Est. Code ch. 352** — § 352.051 attorney's fees ("on proof satisfactory to the court") vs. the personal representative's separate statutory commission — two lanes, never blurred.
8. **TDRPC 1.04** — reasonableness factors; unconscionability ceiling; contingent fees barred in CRIMINAL and DIVORCE matters; no billing non-lawyer work at lawyer rates.
9. **Tex. Fam. Code §§ 106.002, 6.708** (plus 6.502(a)(4) temporary orders; 156.005 frivolous-modification mandatory pocket) — broadly discretionary, financial-disparity-driven.

## 8. Decisions and open items (Michael)

- **D1 — Claim-tag granularity:** tag at claim-type level (contract vs. DTPA) or per pleaded cause-of-action instance? Design assumes claim-type level; instance level only if a real case demands it.
- **D2 — Timekeeper field now?** Solo practice today; TDRPC's non-lawyer-rate warning only bites once staff exist. Design assumes: single implicit timekeeper now, field added when multi-user lands (defer).
- **D3 — Untagged-entry posture at export:** exclude untagged entries from the affidavit with a visible omission note, or block the export until tagged? (Capture never blocks; this is export-time only.)
- **D4 — Case types with `basis: none`:** show the tracker on demand (current master-spec posture: flagged on per eligible case) or always-on with exports suppressed? Design assumes current posture.
- **O1 — Verify ch. 28 fee discretion** specifically (Michael's own flag from the voice session).
- **O2 — Fam. 156.005 mandatory pocket:** confirm scope before the family profile encodes any mandatory branch.
- **O3 — Build sequencing:** where this sits in the queue (currently behind the Outlook push deploy, OAA remaining tabs, and edge-function deploys) — Michael decides; nothing here enters the build queue until §7 sign-offs begin.

## 9. Build plan sketch (NOT committed — sequencing is §8-O3)

- **T1 — Core capture:** time_entries + claims + tagging + case-level rate, timer + manual entry, both adapters, demo seeds. No legal behavior — buildable before any §7 verification.
- **T2 — Profiles + warnings:** profile registry, capture nudges, §38.001-style capture fields. Warnings may reference unverified entries AS unverified (rule-1 compliant).
- **T3 — Exports:** affidavit bundle + court-application cut + invoice integration + ch. 28 interest placeholder. Any export line that asserts a legal conclusion is gated on the specific registry entry being verified.

# WAVE-1 — verifier A1 report — slice "RULED-BUT-OPEN (FE + CD + DL)"

Read-only. Staged files at HEAD `7f02131` (2026-09-01). Ten candidates processed: FE-4, FE-5, FE-6, FE-7, FE-8, FE-10, FE-12, CD-1, CD-2, DL-INPUT. Nothing adjudicated; every disposition below is a PROPOSAL for the session to put and for Michael to rule. Line numbers are of the STAGED copies (`docs/record/session-log.md` = LIVE; `docs/archive/session-log-archive-2026-07-21_2026-08-12.md` = ARCH; `docs/specs/attorney-review-queue.md` = REG; `docs/specs/BUILD-STATE.md` = BS).

## 0. Shared findings that govern the whole slice (read these first)

**S-1 — FE-D1 IS BUILT, and the premise every FE row still carries is spent.** LIVE L1745, entry heading `## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED per TOC-6 — no `#nn`, no runner ordinal) — the engine is built, exercised in a browser on fi`; L1747: "**Authorization is Michael's, 2026-08-12 (`#63`)**"; L1752: "`generated_documents` EXTENDED rather than forked** — seven nullable columns including the answer snapshot (FE-8's retention half) and posture (FE-15)." BS L99 (2026-09-01 refresh): "**FORM ENGINE — FE-D1 IS BUILT (2026-08-20), CODE-COMPLETE, EXERCISED IN A BROWSER ON FIXTURES, AND ITS MIGRATION IS UNRUN.**" CD-1: BS L29 "**ITEM 7 RAN 2026-08-19 AND IS VERIFIED — CD-1 IS COMPLETE (#113).**" Consequence for the rows: "Gated behind CD-1", "The engine is nameable once the CD-1 build lands", "build remains gated on the form engine being named and authorized as a slice, after the CD-1 build" are all world-state-stale at HEAD. BUT: FE-4, FE-5, FE-6 and FE-7 have NO FE-D1 in/out disposition (LIVE #81 L7571–7577; REG Q-FE4-2 L946) and FE-D1 creates no item table (BS L99: "**NO ITEM TABLE, NO FE-9/11/13/14/16/17.**"), so the BUILD of the FE-4–FE-7 designs remains unauthorized even though the engine exists. "Ruled ≠ built" survives; "gated behind CD-1" does not.

**S-2 — Attribution correction to the hardening (two swapped cites).** The hardened table (§2) attributes *"THE FE ROWS STAY OPEN… a spec is not a closure, and the build is still unauthorized"* to `#81` and *"They are open because the BUILD is gated, not because the design question is unanswered"* to runner 35. At HEAD: the first sentence is **runner 36's** (LIVE L7465–7466, heading `## 2026-08-15 — QUEUE-RUNNER batch (runner line; THIRTY-SIXTH invocation) — a divergence inside a VERIFIED entry, and a spec that arrived without its head` at L7425); the second is **`#81`'s** (LIVE L7491–7492, an Opus 5 design session). Runner 35 (LIVE L7611) is the Bexar local-rules batch and contains neither sentence (`grep -F "They are open because"` → only L7491; `grep -F "FE ROWS STAY OPEN"` → only L7465). Substance of the hardening's point is unchanged — but BOTH sentences are Claude/runner statements. **No entry contains Michael's word that FE-4–FE-7 stay open.**

**S-3 — The register's own scope line bears on "ruled ≠ authorized" rows.** REG L11 (ruled 2026-08-19, `#114`): "**They await Michael's ACTION, not his RULING** — and that is the line this register is drawn on. … **it is the complete inventory of open RULINGS.**" BS L164 restates it. A row kept ⬜ solely because a build is unauthorized is kept open on an ACTION fact; the eventual authorization is its own ruling and, on the record's own pattern, gets its own row (`FE-D1A-1`, REG L215, minted batch 85).

**S-4 — What changed since the hardening (first ~600 LIVE lines: runners 83–85, `#138`–`#140`).** By ID: FE-4 0 hits, FE-6 0, FE-7 0, CD-2 0, DL-INPUT 0 (control: `FE-D1` 28 line-hits / 37 flattened). FE-5 1 (a defect note), FE-8 1 and FE-10/FE-12 2 each — all inside `#138`'s summary of the hardening, no ruling. CD-1 9 hits, all `CD-14`/`CD-1`-prefixed except the living-spec revisits noted under CD-1 below. Rulings that touch the slice's SUBJECTS: `#139` L335–337 "**THE CC-1 HANDS-ON QUEUE — "Accept all of them onto the queue" — TWENTY-ONE:** … `FE-§11.4`, … `Q-FE6-5`, `Q-FE4-1`, `Q-FE5-3` …" (children of FE-4/FE-5/FE-6 now HELD for hands-on in Michael's word); `#139` L323–324 "**`CD-14`(ii) "yes"** — the `renders-care-at`
  edge carries an effective period (row 4)" (the quote wraps across L323–324 exactly so) with runner 84 L210 "two to `contact-directory.md` (WO-B1/B2)" — the CD-1 living spec was revisited at batch 84; `#140` L87–89 `AS-Q3` "(A) Case-scoped record; promote to the directory by hand …" — `R17` is CASE-SCOPED; the model never creates a contact or a link"; `#140` L107–109 `AS-Q13b`: "FE-18, FE-19, FE-20, FE-21, FE-22 and CD-14 are MINTED by the act of authorization"; runner 85 L32/L40: the `FE-D1A-1` row minted. Instructions v28 in force (`#140` L64–65). **Nothing in these lines rules, reopens, or annotates any of the ten rows themselves.**

**S-5 — Not staged, therefore UNVERIFIABLE-HERE wherever a claim turns on them:** `docs/specs/form-engine.md` (§13.1–§13.4 hold the FE-4–FE-7 designs), `docs/specs/fe-d1-build-slice.md` (the FE-8–FE-17 disposition table; the hardening's "two-value flag" reading of FE-12), `docs/specs/contact-directory.md`, `docs/specs/cr3-field-code-map.md`, `docs/specs/deadline-engine-spec.md`, the registry files, and `src/`.

---

### FE-4 (L185)

**1. Row / interrogative (REG L185, whole row read).** "**How do definition objects attach to the case and version across a discovery wave?**" Row also carries: "Gated behind CD-1 with the rest of the engine." · "**build remains gated on the form engine being named and authorized as a slice, after the CD-1 build per `docs/specs/cd1-build-slice.md`.**" · "**The row stays ⬜: a spec is not a closure, and the build is still unauthorized.** Six new open questions ride below (Q-FE4-1..6)".

**2. Mentions (word-bounded `FE-4`, line-anchored / flattened).** LIVE 12/12 · ARCH 12/12 · BS 1 (L127) · REG 13. No zero. Collision report: 0 hits for `FE-4` (no collision).

**3. Decisive text.**
- ARCH L1171–1174, heading `## 2026-08-11 (#53) — THIRD BATCH of the 2026-08-11 session: FE-4–FE-7`; L1176–1177: "Continuing the same evening after #52's batch landed and synced. Michael ruled each item with
  the recommendation:"; L1179–1182: "- FE-4 RULED: definitions are case-level versioned objects — immutable versions, every rendered
  instrument stamps the version used (the house stamping pattern); prospective propagation;
  the You/Your addressee definition is render-time per-target substitution, NOT versioned
  content (one wave, one version, all targets). Full design: form-engine.md §13.1."
- ARCH L1209–1211 (#53): "- Spec-state consequence, stated: with FE-4–FE-7 ruled, the form-engine spec has NO open
  design questions gating its build-slice naming — the engine becomes nameable the moment the
  CD-1 build lands. Naming remains Michael's, in a session with BUILD-STATE fresh."
- ARCH L1058, heading `## 2026-08-11 (#54) — CORRECTION of #53 + FE-GATING RULED; CRIM DEFENSE PRACTICE PROJECT`; L1069–1071: "- **What is true instead:** FE-4–FE-7 are closed, but FE-3 and FE-8–FE-12 remained OPEN queue
  items, and whether they gate naming was UNRULED at #53's authoring — the sentence decided it
  silently." — the audit's "closed at #54" quote is this contrast clause (hardening correct).
- ARCH L1286–1287 (#52): "- NEXT SLICE NAMED (RULED): the CD-1 directory build. Reason: substrate first — the form engine
  consumes the directory and its own spec is incomplete (FE-4–FE-7 are spec-completion work)."
- LIVE L7491–7495 (#81, heading at L7481 `## 2026-08-15 (#81) — CHAT-DISPATCH TASK 8: form-engine specs FE-4, FE-5, FE-6 — and a VERIFIED registry`): "They are open because the
  **BUILD** is gated, not because the design question is unanswered — each was **RULED 2026-08-11**
  at `form-engine.md` §13.1/§13.2/§13.3, and line 247 of that file names the owed work in terms:
  *"FE-4–FE-7 unblock for spec completion. Build still unauthorized."* **The three specs elaborate
  the ruled designs and adjudicate nothing;**"
- LIVE L7465–7466 (runner 36): "- **THE FE ROWS STAY OPEN.** FE-4, FE-5 and FE-6 each annotated with its spec and each left **⬜** —
  a spec is not a closure, and §6 says so in terms."
- LIVE L7571–7573 (#81): "- **A GAP FOUND AT THE GATE AND REPORTED, NOT RESOLVED: FE-4, FE-5, FE-6 AND FE-7 HAVE NO FE-D1
  IN/OUT DISPOSITION.** `fe-d1-build-slice.md` dispositions **FE-8 through FE-17** with named
  homes and separately parks FE-2 — the four already-ruled items appear in **neither** list."
- BS L127: "- **FORM-ENGINE SPECS FE-4 / FE-5 / FE-6 (#81)** — they **elaborate the 08-11 rulings and adjudicate nothing. All three rows stay ⬜.**"

**4. Whose words.** The ruling is MICHAEL's by selection ("Michael ruled each item with the recommendation" — the recommendation's text is Claude's, adopted; #53 is Fable 5 typed). The "#54 closed" line is a Claude (Fable 5) contrast clause in a correction entry — not a ruling. "They are open because the BUILD is gated" = `#81`, Opus 5 design session (Claude). "THE FE ROWS STAY OPEN … a spec is not a closure" = runner 36 (Code). "All three rows stay ⬜" = BUILD-STATE (runner-written). **No Michael word holds the row open; no Michael word closes the glyph either.**

**5. Changed since hardening.** By ID: nothing (0 hits in the first 606 LIVE lines; control fired). By subject: `Q-FE4-1` (materiality) ACCEPTED onto the CC-1 hands-on queue, `#139` L335–337, Michael's "Accept all of them onto the queue". FE-D1 remains built without FE-4 (no definitions block in disclosures); `FE-D1A-1` (REG L215) does not reach FE-4. `Q-FE4-2` (disposition of the four ruled items) still ⬜ at REG L946.

**6. DISCONFIRM (strongest case the CLOSE is wrong).** (a) The record's considered position — stated three times by Claude/runner (#81, runner 36, BS L127) — deliberately keeps FE-4 ⬜ as ruled-but-unbuilt, and the hardening's OUT-OF-CONTEXT verdict rests on it; closing contradicts a standing BS sentence at HEAD unless the same batch's BS rewrite drops it (OPEN-5(a) recomputes it anyway). (b) The build of FE-4's design is genuinely unauthorized: FE-D1 shipped without it and no slice names it — but that is an ACTION/build-queue fact under REG L11's #114 line, and its ruling home already exists at `Q-FE4-2` ("Should the four already-ruled items get explicit dispositions"). (c) Unique text: `prospective propagation` (REG 1 / LIVE 0 / ARCH #53), `immutable versions` (REG 1 / ARCH #53), `template_definitions-instructions_requests` (REG 2) — all also live in ARCH #53 and (per the record) `form-engine.md` §13.1; a ✅ glyph flip with an appended closure sentence deletes nothing (the SK-v2 / RECON-1 closure shape, runner 83 L384 and runner 84 L210). (d) No deferral or hold in Michael's words exists for FE-4 (grep of #53/#54/#81/#139/#140: none). (e) `Q-FE4-4`'s "snapshot-vs-live-reference tension" named in the row has its own row at REG L948.

**7. PROPOSED: `CLOSE` — MED.** The row's whole bold question was answered by Michael's #53 ruling (§13.1); every residue has a `Q-FE4-1..6` row of its own (L945–950) and the build-home question has `Q-FE4-2`; the only thing holding the glyph is a Claude/runner "ruled ≠ built" convention that the register's own #114 scope line does not support. The closing sentence must record: ruled #53 (§13.1); spec #81 elaborates and adjudicates nothing; CD-1 gate spent (#61/#113); FE-D1 built 2026-08-20 WITHOUT FE-4 and with no disposition (Q-FE4-2 open); build of the FE-4 design still unauthorized. If Michael prefers the record's "ruled ≠ built" posture, the fallback is `ANNOTATE-KEEP` with that same sentence.

**8. Row line identity.** First line = the whole row (1,629 B, single line). Exact 90-char prefix, occurs once (`grep -c -F` = 1): `- ⬜ **FE-4 — Definitions as case-level objects: one definitions list (incident, vehicl`. Full line `grep -c -F -x` = 1.

---

### FE-5 (L186)

**1. Row / interrogative (REG L186).** "**How aggressive should subpart detection be — attempt facial detection (multiple sentences, enumerated clauses) and show a worst-case count beside the numbered count, accepting false positives on compound-but-unified interrogatories, or warn only on request?**" Row also carries three #81 scope findings: "**the spec finds that the verified entry's wording states a different budget than the rule text (Q-FE5-9)**", "the cap is **pairwise and cumulative** (per propounding/responding pair, across waves), **Level 1 also caps RFPs and RFAs at 15 each** while FE-5 as ruled counts interrogatories only (Q-FE5-1), and **Level 3 has no cap to look up** — it is an order value, so `cap = f(level)` is structurally wrong there. **The row stays ⬜.**"

**2. Mentions.** LIVE 16/16 · ARCH 4/4 · BS 2 (L83, L127) · REG 16. Collision report: 1 hit (the FE-5 headless-spec defect; not a collision).

**3. Decisive text.**
- ARCH L1183–1186 (#53): "- FE-5 RULED: subpart detection always-on and purely facial; worst-case count displays
  passively beside the numbered count; escalates to a warning ONLY when worst-case crosses the
  cap while the numbered count does not. The ruled middle path between the queue's two poles,
  honoring the recorded warning-fatigue risk. §13.2." — confirms the hardening: the audit's quote stopped before "while the numbered count does not", which is the middle path.
- LIVE L7508–7511 (#81): "- **THE CAP IS PAIRWISE AND CUMULATIVE — a scope consequence §13.2 does not state.** Every cap in
  Rule 190 is worded *"Any party may serve on any other party no more than N,"* so the budget keys
  on the **(propounding party, responding party)** pair, not the document, the wave, or the case —
  and it is **cumulative across waves**, so a second wave must know what the first spent."
- LIVE L7517–7521 (#81): "- **LEVEL 3 HAS NO CAP TO LOOK UP.** … so the Level 3 cap is an **order
  value, not a level constant**, and 190.4(b)(2) permits phase scoping. **A `cap = f(level)` lookup
  is correct for Levels 1 and 2 and structurally wrong for Level 3.**"
- LIVE L7483 (#81): "- **THREE STAGED DOCS, ALL PROPOSED, NOTHING VERIFIED, NOTHING BUILT:**" — the findings are PROPOSED.
- REG L951 `Q-FE5-1` (own row; Level 1 RFP/RFA caps) · REG L959 `Q-FE5-9` (own row; the VERIFIED-entry divergence) · REG L953 `Q-FE5-3` (Swepi vs the escalation threshold).
- LIVE L543–545 (#138): "`fe-5-interrogatory-budget-spec-2026-08-15.md`
  is **headless and was BORN headless** — it landed that way in its first commit `883d915`, so no revert
  recovers it". Row for that defect: REG L968.

**4. Whose words.** Ruling: MICHAEL's by selection at #53 (a composite outside the row's two poles — a CC-1(a)-shaped answer). The three scope findings are `#81`'s (Opus 5), PROPOSED, never put to Michael. "The row stays ⬜" is runner 36's.

**5. Changed since hardening.** `Q-FE5-3` ACCEPTED onto the hands-on queue (#139 L337) — a live challenge to the ruled escalation threshold, HELD in Michael's word; `#138` records the headless spec was born headless (no ruling). Nothing else.

**6. DISCONFIRM.** (a) Two of the hardening's three surviving limbs have their own rows (`Q-FE5-9` L959, `Q-FE5-1` L951) — but the THIRD does not: `Level 3 has no cap` REG=1 (L186 only), `cap = f(level)` REG=1, `order value` REG=1; `pairwise` REG=2 (L186 + `Q-IN1-9` L932, which only cites the finding); `cumulative` REG=1. `[DL-memo Q5]` (L1014) asks about the Level 3 PERIOD shape, not the cap; `Q-FE5-5`/`Q-FE5-6` ask about level fields and cap movement, not the Level-3-is-an-order-value point. **Closing the row outright would leave the pairwise/cumulative and Level-3 scope findings with no open home.** (b) `Q-FE5-3` on the hands-on queue could amend the #53 threshold — but that lives at its own row. (c) The row's "counts may display as facts" premise is under flag at `Q-FE5-9` — a ✅ FE-5 next to a ⬜ `Q-FE5-9` is consistent, since the flag has its own row. (d) No Michael hold on FE-5 itself.

**7. PROPOSED: `CLOSE-SPLIT` — MED.** The bold question was answered by Michael at #53; the residue with rows stays where it is; the ONE limb with no other row is re-minted narrowly. Surviving limb text (from L186, verbatim): "the cap is **pairwise and cumulative** (per propounding/responding pair, across waves)" and "**Level 3 has no cap to look up** — it is an order value, so `cap = f(level)` is structurally wrong there." Suggested narrow row question: does §13.2's budget key on the (propounding, responding) pair and accumulate across waves, and how does the budget source a Level 3 cap that is an order value rather than a level constant? (PROPOSED at #81; never put.) Closing sentence must also record: CD-1 gate spent; FE-D1 built without FE-5; no disposition (Q-FE5-2 open).

**8. Row line identity.** Whole row 2,124 B, one line. 90-char prefix, once: `- ⬜ **FE-5 — Interrogatory count budget: live count per set against a configurable cap`. Full line `-x` count = 1.

---

### FE-6 (L187)

**1. Row / interrogative (REG L187).** "**Sub-question never asked in the capture: does each standalone instrument repeat the definitions block or incorporate it by reference?**" (the main clause is a capability description: "render the same request content as one combined served document or three separate documents without re-entry, from one item model"). Row: "separate mode needs its own layout ruling." · "**The row stays ⬜.**"

**2. Mentions.** LIVE 13/13 · ARCH 5/5 · BS 1 (L127) · REG 12. Collision report: 0.

**3. Decisive text.**
- ARCH L1187–1191 (#53): "- FE-6 RULED: packaging is a render-time choice from one item model; each standalone instrument
  REPEATS the definitions block in full (no incorporation by reference — served documents
  self-prove; FE-4's versioning removes repetition's drift cost); separate-mode layout derived
  from the evidenced combined layout, one COS per document, verification rides interrogatories
  only. §13.3." — answers the sub-question AND the "separate mode needs its own layout ruling" clause.
- LIVE L7574–7577 (#81): "FE-6's is nearly implicit (*"The §13 item model itself — slice 2's core; nothing in FE-D1 creates
  items,"* corroborated by FE-9, FE-11 and FE-17 all homing at "the discovery slice"), but it is
  still not an FE-6 row. **Likely because #63 scoped the unruled items and left the ruled ones
  alone — stated as a reading, not an error.** Q-FE4-2 / Q-FE5-2 / Q-FE6-1."
- LIVE L7491–7492 (#81) — the "open because the BUILD is gated" sentence (quoted under FE-4) — NOT runner 35 (see S-2).
- REG L960 `Q-FE6-1` (explicit vs inferred disposition; "slice 2" = "discovery slice"?) · L963 `Q-FE6-4` (the RFA-wording case the row calls "the sharpest") · L964 `Q-FE6-5` · L966 `Q-FE6-7` (one COS per document → service events).

**4. Whose words.** Ruling: MICHAEL's by selection at #53. The keep-open sentences are `#81`'s (Opus 5) and runner 36's. No Michael hold.

**5. Changed since hardening.** Nothing by ID (0 hits). `Q-FE6-5` ACCEPTED onto the hands-on queue (#139 L337). BS L99 confirms FE-D1 built with "**NO ITEM TABLE**" — FE-6's substrate still unbuilt.

**6. DISCONFIRM.** (a) Same "ruled ≠ built" objection as FE-4, with the added fact that FE-6's item model is "slice 2's core" and no slice 2 is named — the build is further off than FE-4's; but that is an action fact and `Q-FE6-1` holds the home question. (b) FE-17's from-birth annotation is restated in the row "as a pointer, not an amendment" — its binding home is FE-17's own row (REG L210–211), so nothing is lost. (c) Unique text: `one COS per document` REG=1, `self-prove` REG=1, `Instrument packaging` REG=1 — all also at ARCH #53 L1187–1191; a glyph flip deletes none. (d) Seven `Q-FE6-1..7` rows (L960–966) carry every residue the hardening names, including Q-FE6-4.

**7. PROPOSED: `CLOSE` — MED.** The never-asked sub-question and the separate-mode layout were both answered by Michael at #53 (§13.3); seven child rows hold the residue; the hardening's OUT-OF-CONTEXT verdict rests on a Claude sentence (mis-cited to runner 35) that states a build fact, not an open ruling. Same closing-sentence content as FE-4, plus "no item table exists at HEAD (BS L99); the item model is slice 2's".

**8. Row line identity.** Whole row 2,032 B. 90-char prefix, once: `- ⬜ **FE-6 — Instrument packaging modes: render the same request content as one combin`. Full line `-x` = 1.

---

### FE-7 (L188)

**1. Row / interrogative (REG L188).** "**What does the queue look like pre-engine, and what does adoption look like?**" Row records: "**RULED 2026-08-11 — design at `form-engine.md` §13.4**, where the pre-engine queue is now a LIVE table seeded with those three candidates (all `queued`, none distilled, none format-authoritative)." · "**Adoption is Michael's explicit ruling and is what flips the template's FE-12 provenance to format-authoritative**" · "**build remains gated on the form engine being named and authorized as a slice, after the CD-1 build**".

**2. Mentions.** LIVE 2/2 (both inside #81, L7494 and L7571, as part of "FE-4–FE-7") · ARCH 16/16 · BS 0 · REG 9. Zero in BS: control `FE-D1` BS = 14. Subject check: `distill` LIVE = 0 (whole live log, `#65` onward), BS = 0, REG lines 188/197/202/213 only. Collision: 0.

**3. Decisive text.**
- ARCH L1192–1195 (#53): "- FE-7 RULED: pre-engine distillation queue is a live table in form-engine.md §13.4, seeded
  with the three named candidates; candidates travel from practice space by Michael's hand per
  REQ-1; distilled output is client-clean by construction and PROPOSED until adopted; ADOPTION
  is Michael's ruling and is what flips FE-12 provenance to format-authoritative. §13.4."
- ARCH L1303–1304 (#63, heading L268 `## 2026-08-12 (#63) — FE-D1 DISCLOSURES SLICE NAMED, SCOPED, AUTHORIZED (group ruling);`): "- DISTILLATION (RULED): all four candidates ENTER §13.4 — UDJA/UIM petition, deficiency letter,
  motion to compel, deficiency grid. Entering ≠ adopting; FE-7 guardrails hold."
- ARCH L1147–1149 (runner 15): "The §13.4
  distillation table landed as a LIVE table: three candidates, all **queued**, none distilled, none
  format-authoritative — which is exactly what §6 required."
- REG L213 (✅ row): "**Distillation candidates — CLOSED 2026-08-12 (#63): all four ENTERED `form-engine.md` §13.4** … **Entering is not adopting:** each is `queued`, none distilled, none format-authoritative, and FE-7's guardrails hold — adoption is a separate explicit ruling of yours".

**4. Whose words.** MICHAEL's rulings at #53 and #63 (both "All rulings Michael's", by widget/recommendation). The hardening's qualifier ("Entering ≠ adopting; FE-7 guardrails hold") is verbatim at ARCH L1304 and already preserved in the ✅ row at REG L213.

**5. Changed since hardening.** Nothing by ID or subject (`distill` 0 hits in the live log; batches 84/85's `form-engine.md` edits are named as §2, §3, §9, §10 — none §13.4).

**6. DISCONFIRM.** (a) No `Q-FE7-*` row exists (control: `Q-FE4-`/`Q-FE5-`/`Q-FE6-` rows = 22), so any residue must be in this row: the three seed candidates by name (`entity trucking set` REG=1, `nonsubscriber battery` REG=1), the route ("marking happens in practice space, the candidate travels by Michael's hand, distillation is a design-session act producing a client-clean template into `docs/templates/<category>/`" — `docs/templates/<category>/` REG=1), and `distilled-PROPOSED` REG=1. All are ruling-record text also at ARCH #53 and (per runner 15) in `form-engine.md` §13.4 [UNVERIFIABLE-HERE that §13.4 still names them]; a glyph flip retains the text. (b) Adoption of any candidate is a future per-candidate ruling — not this row's question ("what does adoption look like?" is answered: Michael's explicit ruling, flipping FE-12 provenance). (c) The "build remains gated" clause is spent but harmless. (d) The hardening itself rated this VERIFIED; nothing since disturbs it.

**7. PROPOSED: `CLOSE` — HIGH.** Both halves of the question are answered in Michael's rulings (#53 §13.4; #63 entering ≠ adopting), the guardrails survive in the ✅ row at L213, no residue exists anywhere as a question, and nothing since #63 touched the distillation queue.

**8. Row line identity.** Whole row 1,504 B. 90-char prefix, once: `- ⬜ **FE-7 — Template distillation queue: mark a produced document "distill to templat`. Full line `-x` = 1.

---

### FE-8 (L189; disposition line L190)

**1. Row / interrogative (REG L189–190).** "**Sub-question (capture §5.6): should the as-generated retained copy be immutable and content-addressed so "what did we deliver" is provable later, and how long are superseded generations retained?**" (main clause: retain the as-generated version so an attorney-edited return can be diffed). L190: "**#63 DISPOSITION (2026-08-12): **IN FE-D1, retention half only.** As-generated retention IS the §10 generated-document record (.docx + metadata) — that record is the retention design, so FE-D1 builds it. The DIFF half is DEFERRED to the slice with the first real consumer (the transform / discovery work), where FE-13 needs it anyway.**"

**2. Mentions.** LIVE 5/5 (L518 `#138`; L983 `#135`; L1672 `#127`; L1752 build; L7572 `#81`) · ARCH 24/25 · BS 1 (L99) · REG 12. Collision report: 1 hit (the `R13`→`IN-4`+`FE-8` fold; not a collision). Sub-question phrases: `content-addressed` LIVE 0 / ARCH 0 / REG 1 (L189); `superseded generations` LIVE 0 / ARCH 0 / REG 1 (control `FE-8` ARCH 24) — **the §5.6 sub-question was never put in either log.**

**3. Decisive text.**
- ARCH L291–293 (#63): "FE-8 retention half (the §10 generated-document record IS the retention design;
  diff deferred)".
- LIVE L1752 (build): "**§10 substrate: four new tables with RLS, GRANTs and the probe entry IN THE SAME COMMIT (item 11), and `generated_documents` EXTENDED rather than forked** — seven nullable columns including the answer snapshot (FE-8's retention half) and posture (FE-15)."
- LIVE L983–984, heading L943 `## 2026-08-22 (#135) — (Voice design session, Opus 5: RECON-1 floor ruled — three mandatory`: "- **CONFIRMED — widget F / R13 RETIRED, not answered.** FE-8's diff half stays deferred;
  RECON-1 is not its consumer after all, which reverses the addendum's recommendation."
- LIVE L1672 (#127): "Four requirements fold into existing IDs rather than minting parallel ones — `R3`→`FE-11`, `R6`→`IN-2`, `R10`→`FE-20`, `R13`→`IN-4`+`FE-8`" (then retired at #135).
- ARCH L1078–1082 (#54): "**RULED (Michael, 2026-08-11
  Central): FE-3 and FE-8–FE-12 do NOT gate the form engine's slice naming.** FE-8–FE-12 are
  capability requirements the engine's slice-scoping session rules as it pins scope".
- ARCH L1550–1551 (#49): "REQ-01 → FE-8 (as-generated retention +
  attorney-edit diff; reason: the diff is both the finalization worklist and a house-conventions
  signal)."

**4. Whose words.** The #63 disposition is MICHAEL's group ruling ("All rulings Michael's, 2026-08-12 Central, by widget"). The #135 "R13 RETIRED" is a Michael ruling in voice (Opus 5 session; "Fourteen rulings taken, one at a time"); "FE-8's diff half stays deferred" is the entry's own consequence statement. The built claim is a Code session's (2026-08-20) and BUILD-STATE's. The §5.6 sub-question has NO ruling by anyone.

**5. Changed since hardening.** `#138` L518–520 records the hardening's finding (no ruling). The `FE-D1A-1` amendment slice (REG L215; `#140`) adds "a per-designation paragraph record" and "versioned TEXT chronology (bytes not retained)" — adjacent retention decisions, PROPOSED, not FE-8's diff and not the §5.6 sub-question. Nothing rules FE-8.

**6. DISCONFIRM (the case against a CLOSE or CLOSE-SPLIT).** (a) The row's own bold question is the §5.6 sub-question, which no one has answered (0 hits in both logs). (b) The DIFF half is not answered but DEFERRED (#63) and re-confirmed deferred (#135, "RECON-1 is not its consumer after all") — a deferral in the record, not a closure; and #135 shows a consumer was tested and rejected, so the deferral is live, not forgotten. (c) Unique text: `content-addressed`, `superseded generations`, `round-trip diffing`, `diff half` each REG=1 (L189/190). (d) What IS spent: "Gated behind CD-1", "The engine is nameable once the CD-1 build lands" (both landed), and "Item remains OPEN; the ruling changes its gating status" (the #54 sentence) — the retention half is BUILT (LIVE L1752; BS L99). (e) The hardening's suggested re-mint would produce a row whose text is this row minus the built retention clause — nothing closes.

**7. PROPOSED: `ANNOTATE-KEEP` — HIGH.** Stays ⬜ because both open limbs are genuinely unanswered; the annotation records: retention half BUILT 2026-08-20 (FE-D1, `generated_documents` answer snapshot; migration `MIG-1` unrun); CD-1 gate spent (#61/#113); diff half DEFERRED at #63 to the first real consumer and CONFIRMED still deferred at #135 (R13 retired; RECON-1 not its consumer); §5.6 sub-question (immutable/content-addressed retention; retention period for superseded generations) never put. `CLOSE-SPLIT` (re-mint the diff half + §5.6 as one narrow row) is an acceptable alternative that loses nothing but adds a row.

**8. Row line identity.** First line 1,437 B (L189). 90-char prefix, once: `- ⬜ **FE-8 — Attorney-edit round-trip diffing: retain the as-generated version of ever`. Full line `-x` = 1. Second line L190 begins `  **#63 DISPOSITION (2026-08-12): **IN FE-D1, retention half only.**`.

---

### FE-10 (L193; disposition line L194)

**1. Row / interrogative (REG L193–194).** Two bold sub-questions: "**Sub-question (capture §5.1): when an attorney's edit conflicts with the stored profile, is it a one-off deviation preserved in that document only, or a profile update propagating to future renders — and who confirms which?**" and "**Additional sub-question riding here (UIM capture §5 Q6): should the numbering lint run automatically on every rendered instrument, or also exist as a standalone document-check tool that can be pointed at exemplars and incoming documents?**" L194: "**#63 DISPOSITION (2026-08-12): **IN FE-D1, FROM BIRTH — including the numbering pass.** The render-time format lint ships with the engine's first slice rather than being retrofitted.**"

**2. Mentions.** LIVE 3/3 (L510, L520 `#138`; L1752 build) · ARCH 7/7 · BS 1 (L99) · REG 6. Collision: 0. Sub-question phrases: `one-off deviation` LIVE 0 / ARCH 0 / REG 1; `standalone document-check` LIVE 0 / ARCH 0 / REG 1; `who confirms which` REG 1; `numbering lint` REG 2 (L193; L965 `Q-FE6-6`, which only cross-references it) — **neither sub-question was ever put.**

**3. Decisive text.**
- ARCH L291 (#63): "FE-10 from birth (incl. numbering pass)"; ARCH L301–302: "placeholder discipline enters
  form-engine.md as new §14 — documented method now, FE-10 lint automates later."
- ARCH L710–712 (#58): "REQ-05→**extend FE-10**
  (numbering lint: gapless, duplicate-free visible numbering; continuous logical numbering, no
  hard-coded restarts)".
- LIVE L1752 (build): "the §12 docx mechanics ported from the ruled POC helpers (run-merge as a hard precondition, expect-count assertions, whole-paragraph clone, bookmark dedup); the renderer; the FC-1 token layer; the grammar/pronoun engine; §5 gates; FE-10 render lint; write-backs; the §9 library." and L1758: "a document generated, the lint reported, write-backs shown".
- BS L99: "§5 gates, FE-10 render lint, write-backs, and the §9 library. **§10 substrate: `form_templates` + `form_template_versions` + `form_token_definitions` + `form_format_profiles`".
- **The numbering pass is named as built NOWHERE**: `numbering` in the build entry occurs once, about `numbering.xml` being byte-identical (L1756); BS has no FE-10 numbering line. UNVERIFIABLE-HERE (src/ not staged).

**4. Whose words.** The #63 scope disposition is MICHAEL's (group ruling by widget). The build statements are a Code session's and BUILD-STATE's. The two sub-questions have no ruling.

**5. Changed since hardening.** Only `#138`'s summary of the hardening ("`FE-10`/`FE-12`" as the only home for open questions). `Q-FE6-6` (L965) cross-links the numbering lint to separate-mode documents — already at HEAD before the hardening. Nothing rules FE-10.

**6. DISCONFIRM (against the audit's CLOSE).** The audit's quote ("FE-10 from birth (incl. numbering pass)") rules scope inclusion — the row's bold questions are the two sub-questions, both unanswered and both existing only here (counts above; control `FE-10` ARCH 7). The audit's "built and exercised" holds for the render lint (LIVE L1752/L1758) but not demonstrably for the numbering pass. What IS spent: "Gated behind CD-1", "nameable once the CD-1 build lands", "Item remains OPEN; the ruling changes its gating status" — the engine and its lint exist. No Michael hold; no Michael closure.

**7. PROPOSED: `ANNOTATE-KEEP` — HIGH.** The audit's candidate was wrong because the cited ruling never reached the row's questions; the row stays ⬜ for two unruled sub-questions with no other home, and the annotation records: format lint BUILT 2026-08-20 (FE-D1; `form_format_profiles` table; migration unrun); numbering pass ruled IN at #63, build state not stated in the record; CD-1 gate spent; both §5.1 and UIM §5 Q6 sub-questions never put. Narrow re-minting (audit's suggestion) is a size/TC-OPEN-1 choice, not a ruling-state one.

**8. Row line identity.** First line 2,267 B (L193). 90-char prefix, once: `- ⬜ **FE-10 — Render-time format lint: format profiles carrying paragraph-level proper`. Full line `-x` = 1. Second line L194 begins `  **#63 DISPOSITION (2026-08-12): **IN FE-D1, FROM BIRTH — including the numbering pass.**`.

---

### FE-12 (L197; disposition line L198)

**1. Row / interrogative (REG L197–198).** "**Sub-question (roster capture §5.6): should source-trust level become an explicit attribute in the template library design, and does "known-bad, kept for reference" deserve first-class status, given a defective exemplar ("BAD DO NOT USE") was found filed alongside good ones?**" Also the standing instruction: "ATTORNEY INSTRUCTION OF RECORD (2026-08-11, standing, binding on drafting regardless of how this item resolves): the current-practice bank is format authority; the prior-firm bank is content-only". L198: "**#63 DISPOSITION (2026-08-12): **IN FE-D1, FROM BIRTH.** Provenance tiers are enforced at render time from the engine's first slice.**"

**2. Mentions.** LIVE 2/2 — BOTH inside `#138`'s summary of the hardening (L510, L520); at the hardening's HEAD the count was 0 and the build entry still contains no `FE-12` · ARCH 22/23 · BS 0 (control `FE-D1` BS 14; `FE-10` BS 1) · REG 10. `provenance` in the 2026-08-20 build entry (L1745–1770): **0**; `format-authoritative` / `content-only` / `known-bad` LIVE 0, BS 0. Collision: 0.

**3. Decisive text.**
- ARCH L291–292 (#63): "FE-10 from birth (incl. numbering pass) · FE-12
  from birth".
- ARCH L1194–1195 (#53): "ADOPTION
  is Michael's ruling and is what flips FE-12 provenance to format-authoritative."
- ARCH L1576–1578 (#49): "REQ-18 →
  FE-12 (template provenance attribute; §5.6 rides). Michael's standing two-bank instruction
  recorded as an attorney instruction of record, not a proposal: current-practice bank is format
  authority; prior-firm bank is content-only."
- ARCH L740–742 (#58): "REQ-05→**extend FE-12** (render-time
  enforcement of provenance tiers per instrument — live evidence: house letterhead format
  authority, treatise content model, prior-firm exemplar language-only with header forbidden)".
- LIVE L1752 (build) — quoted under FE-8/FE-10: names FE-10, FE-8, FE-15; **does not name FE-12 or provenance**. BS L99 likewise.

**4. Whose words.** #63 disposition and #58 extension: MICHAEL's (group rulings). The two-bank instruction: MICHAEL's attorney instruction of record (#49). The audit's "provenance flag built with render-time enforcement": **no source in the staged record** — UNVERIFIABLE-HERE (src/ and `fe-d1-build-slice.md` not staged); the hardening's "two-value flag" reading of the slice doc is likewise UNVERIFIABLE-HERE.

**5. Changed since hardening.** `#138` L510/L520 (hardening summary; no ruling). `#140`'s "provenance" hits (L74, L107, L117) concern ruling-provenance classes of the amendment slice (RULED / RULED-BY-SELECTION / DEFAULT / HELD), not the template/exemplar attribute; L107's "provenance kept from birth" sits in `AS-Q13a`'s IN/OUT list and cannot be tied to FE-12 from the staged text. Nothing rules FE-12.

**6. DISCONFIRM.** (a) The row's bold question is two-limbed; the first limb ("explicit attribute?") is answered only by inference from #63's "provenance tiers are enforced at render time" (an enforced tier presupposes an attribute) — an inference, not a ruling on the question. (b) The second limb ("known-bad … first-class status?") has ZERO log presence (`known-bad` LIVE 0 / ARCH 0; REG 1, this row; `source-trust level` REG 1; `first-class status` REG 1; `BAD DO NOT USE` REG 1) — closing destroys the only open home. (c) The "built" half the audit relied on cannot be found at HEAD in any staged text; the FE-D1 build entry's own inventory omits it. (d) FE-7 adoption "flips FE-12 provenance" — the cross-link needs FE-12's attribute to exist with at least the format-authoritative value; not evidence about the third value. (e) Spent premise: "Gated behind CD-1", "nameable once the CD-1 build lands". No Michael hold; no Michael closure.

**7. PROPOSED: `ANNOTATE-KEEP` — HIGH.** Stays ⬜: the known-bad third value is unruled and unique, and whether the attribute shipped in FE-D1 is not stated anywhere at HEAD. Annotation substance: ruled IN FE-D1 from birth (#63) with render-time enforcement (#58); FE-D1 BUILT 2026-08-20 but the build entry and BUILD-STATE name neither FE-12 nor provenance — build state of the attribute UNSTATED (a Code-side verification item, not a ruling); CD-1 gate spent; the "known-bad kept for reference" limb never put. If Michael wants the answered-by-inference limb closed, `CLOSE-SPLIT` re-minting "does known-bad-kept-for-reference deserve first-class status (a third value), given a `BAD DO NOT USE` exemplar was filed beside good ones?" is the alternative.

**8. Row line identity.** First line 1,829 B (L197). 90-char prefix, once: `- ⬜ **FE-12 — Template/exemplar provenance attribute: format-authoritative / content-o`. Full line `-x` = 1. Second line L198 begins `  **#63 DISPOSITION (2026-08-12): **IN FE-D1, FROM BIRTH.** Provenance tiers are enforced`.

---

### CD-1 (L228)

**1. Row / interrogative (REG L228, 3,786 B).** "**How does it relate to `case_parties` and `case_clients` — views over one directory, or separate tables with links?**" Row: "Living spec — revisited as modules surface new field needs." · "**RULED 2026-08-11 — the schema session ran; every CD-1 question was ruled item by item. Spec: `docs/specs/contact-directory.md` (LIVING SPEC …). The core fork resolves as SEPARATE TABLES WITH LINKS, the shape already built … BUILD STILL NOT AUTHORIZED — no table, no migration, no UI, no `party_type` migration. This entry stays open as the living-spec pointer.**" · "**BUILD SLICE AUTHORIZED 2026-08-11 within the scope of `docs/specs/cd1-build-slice.md`**" · ends "The build is a separate Code session, not the queue runner." The row never mentions `#61`, `#113`, "COMPLETE", or 2026-08-19 (grep of the row: 0 each).

**2. Mentions (word-bounded, excludes CD-10..14).** LIVE 55/62 · ARCH 97/102 · BS 12 · REG 47. Collision report: `CD` row L59 ("Contact directory; CD-14 **unminted** (#127) but used in #135") — no CD-1 collision. Key phrase: `living-spec pointer` REG 1 (L228) / LIVE 0 / ARCH 0 / BS 0 / TOC 0, flattened 0 — control `living spec` ARCH = 3 (L73, L1296, L2488). **The sentence "This entry stays open as the living-spec pointer" exists ONLY in the register row.**

**3. Decisive text.**
- ARCH L2486–2489, heading L2473 `## 2026-08-08 (#38) — REFRAME: contact directory supersedes FE-1; CD-1 issued; Slice A WITHDRAWN; CL2-AC-1 to direction-c`: "- **CD-1 ISSUED** (full text in the queue per QR-1): global contact directory vs.
  `case_parties`/`case_clients` architecture — views over one directory or linked tables. Own
  design session, schema on screen; LIVING SPEC, revisited as modules surface needs; NOT
  authorized for build." (mixed voice/typed; verbatim in `rulings-capture-2026-08-08.md`, not staged).
- ARCH L1368–1372, heading `## 2026-08-11 (#51) — CD-1 SCHEMA SESSION: every CD-1 question RULED —`; L1374–1375: "The typed schema session ruled fireable by #49's gate ran this evening; Michael ruled every part
  with the recommendation, one by one."; L1378–1380: "- FORK (§1): `parties` IS the contact directory; case_parties stays the roster link;
  case_clients stays parallel — D-CL2-8 UNTOUCHED. Reason: a second identity table = two
  identity sources, the wrong-level defect class; views would reopen D-CL2-8 on no evidence."
- ARCH L1298–1301 (#52): "- AUTHORIZED (RULED): the CD-1 build slice, as scoped, is authorized for build. The guard lines
  lift by this packet: contact-directory.md's header qualified, BUILD-STATE's CD-1 language
  updated, the queue's CD-1 entry annotated."
- ARCH L387 heading `## 2026-08-12 (#61) — CD-1 DIRECTORY BUILD: six of seven slice items built and exercised; the live migration is Michael's and h`.
- LIVE L3410–3412 heading `## 2026-08-19 (#113) — EXECUTION SESSION: all three pending live migrations RUN AND VERIFIED by`; BS L29: "- **ITEM 7 RAN 2026-08-19 AND IS VERIFIED — CD-1 IS COMPLETE (#113).**"
- BS L32: "- **Design authority stays `docs/specs/contact-directory.md`** (LIVING SPEC). **THE FORK RESOLVED TO THE SHAPE ALREADY BUILT:** `parties` **IS** the directory, `case_parties` stays the roster link, `case_clients` stays parallel, **D-CL2-8 UNTOUCHED**".
- ARCH L1350–1351 (runner 13): "- **The other four annotations were genuine deltas too** — CD-1, CD-2, IN-2 and the v14 paste each
  existed and none carried a 2026-08-11 ruling; verified line by line, not assumed." (the row's "stays open as the living-spec pointer" landed as the #51 PACKET's queue annotation, authored design-side).
- LIVE L8440–8442 (#74): "**CD-2 IS NOT AN OPEN DESIGN QUESTION.** Framing
  RULED at #48; BOTH layers RULED at #51 into `contact-directory.md` §4/§5, where the queue row became a
  pointer; the structure BUILT at #61."
- REG L231 (CD-3): "Additions to `contact-directory.md`'s §5/§6 controlled vocabularies are spec-level acts under its living-spec posture, so the subtype vocabulary is not written by a Code session."

**4. Whose words.** The fork ruling: MICHAEL's by selection at #51. The living-spec POSTURE: MICHAEL's at #38 (CD-1 issued as a LIVING SPEC). The sentence "This entry stays open as the living-spec pointer": a design-session (Fable 5) queue annotation carried by the #51 packet — NOT in the #51 log entry and NOT Michael's word. The hardening's verdict premise ("the row's open status **is part of the same `#51` ruling**") is therefore literally false at HEAD; its substance (the pointer posture was chosen on purpose) is corroborated by #74's "where the queue row became a pointer" (Opus 5, Claude).

**5. Changed since hardening.** The living spec WAS revisited: `#139` L323–324 "**`CD-14`(ii) "yes"** — the `renders-care-at`
  edge carries an effective period (row 4)" (the quote wraps across L323–324 exactly so); runner 84 L210 "two to `contact-directory.md` (WO-B1/B2)"; `#140` L87–89 `AS-Q3` (R17 case-scoped provider record, "promote to the directory by hand"), L101–103 `AS-Q11` ("freeze `renders-care-at`; … `effective_from`/`effective_to` on the edge"), L107–109 `AS-Q13b` ("CD-14 … MINTED by the act of authorization"); `CD-14` limb (i) still Michael's (L52, L195). Each revisit carried its own ID (CD-14) or the amendment slice's row (`FE-D1A-1`) — none rode CD-1's row; CD-1 was not annotated.

**6. DISCONFIRM (against CLOSE).** (a) The record chose the pointer posture deliberately (design annotation; #74) and the hardening flagged closure as contradicting it — closing overrides a considered design position, though not a Michael word. (b) A living spec needs a visible revisit hook; but at HEAD revisits demonstrably take their own IDs (CD-3…CD-13 rows; CD-14 pending mint) and the spec's own header carries the posture (BS L32; CD-3 row L231). (c) The deferred service-story revisit ("the first instrument consumer, as the living spec's first planned revisit", #52) is tracked at `Q-IN3-3` (REG L935) and `WF-8` (L281) — not in CD-1's row. (d) Unique text: `merge tooling` / `merge-two-contacts` REG 1 (this row) — a spec §9 item per runner 13 (ARCH L1362 "merge tooling (spec §9, no action)"), a future need, not a question; a glyph flip retains it. (e) The row is world-state-stale in the other direction too: it says "BUILD STILL NOT AUTHORIZED … no migration" and never records #61/#113 — if kept, it needs annotation regardless.

**7. PROPOSED: `CLOSE` — MED.** The bold question was answered by Michael at #51, the build landed (#61) and completed (#113), and the "pointer" function has homes that do not need a ⬜ ruling row (spec header; CD-3's row; per-revisit IDs), which is what REG L11's #114 line requires of this register. The closing sentence must record: fork ruled #51 (separate tables with links; `parties` IS the directory); built #61; migration run and verified #113 — CD-1 COMPLETE; living spec at `contact-directory.md`, revisited by its own IDs (CD-3…CD-13; CD-14 on `FE-D1A-1`'s YES; service-story revisit at Q-IN3-3/WF-8). Michael is the tiebreaker on whether a pointer row belongs open; if he keeps it, `ANNOTATE-KEEP` with the same sentence.

**8. Row line identity.** Whole row 3,786 B, one line. 90-char prefix, once: `- ⬜ **CD-1 — One global contact directory as the identity source for the form engine a`. Full line `-x` = 1.

---

### CD-2 (L229)

**1. Row / interrogative (REG L229, 4,765 B).** "**How do rosters attach to the case-type tree, and how do contact edges relate to the directory schema?**" Row: "FRAMING RULED 2026-08-11 … Design UNRULED — input to the CD-1 session. NOT authorized for build." then "**RULED 2026-08-11 into the spec — BOTH layers. This entry becomes a pointer; the evidence annotations above stay.**" … "**NOT authorized for build.**" then evidence annotations (a)–(d) and "**(e) ADDED 2026-08-12 (#64): carrier-ID and financial-responsibility TYPE codes from the CR-3 code sheet are directory-vocabulary CANDIDATES** — PROPOSED only, pointer at `docs/specs/cr3-field-code-map.md`. **Adding directory vocabulary is a spec-level act on the living spec (the CD-3 precedent), so nothing was added.**" The row names `#61` once ("log #61, items 1–2") but never `#113`.

**2. Mentions (word-bounded).** LIVE 5/5 (L6767; L8403; L8429–8440 `#74`) · ARCH 12/12 · BS 1 (L147) · REG 15. Collision: 1 hit (a Q-numbering note; none). Limb (e) phrases: `carrier-ID` REG 1 (L229) / `financial-responsibility` REG 1; limb (b): `verification-officer` REG 1 (L229); `TTCA roster default` REG 1; `capacity multiplicity` REG 1. Limb (a) is ALSO carried at CD-9 (REG L240: "Cross-links the CD-2 evidence annotation (a): registered-agent name and address are stored **per entity with a verify-before-service state and a staleness date, never copied as prose**").

**3. Decisive text.**
- ARCH L1391–1398 (#51): "- ROSTER (§4): slot definitions as data on the case-type tree with inheritance and expectancy
  tiers, never auto-creating records; the roster entry decomposes into role / caption alignment
  (per case-type side set — REQ-14 satisfied by construction; "Plaintiff" is an alignment, not
  a role) / party status / firm perspective (the existing side column's true meaning); entries
  are history, not snapshot (joined-by + active state — FE-8/IN-4 need roster-as-of).
- EDGES (§5): directional typed edges with optional case scope (null = world fact); one-home
  rule — capacity references never auto-create edges; controlled extensible vocabulary seeded
  from REQ-11; the CL-1 FIREWALL named: contact edges and case_links never merge."
- ARCH L407–414 (#61): "- **Item 3, roster definitions as data.** Slot definitions with expectancy tiers and side sets
  per case type, so **REQ-14 is satisfied by construction** … - **Item 4, contact edges.** One directional typed structure, optional case scope, vocabulary
  seeded from REQ-11 and enforced as a check constraint."
- ARCH L184–186 (#64, heading L170 `## 2026-08-12 (#64) — CR-3 CODE SHEET (2023+) filed as reference; field-code map filed as`): "- Mappings (all PROPOSED, full table in the map doc): unit/person codes → CD-1 roster-seeding
  evidence for MVA/trucking; carrier-ID and financial-responsibility types → CD directory
  vocabulary candidates (CD-3 pattern, spec-level acts, Michael's ruling);"
- ARCH L713–715 (#58): "REQ-07→no ID (CD-1/CD-2
  evidence with roster REQ-19 — registered agent as entity-level data, verify-before-service
  state + staleness date, never prose)"; ARCH L750–751 (#58): "REQ-11→CD-1/CD-2 evidence annotation
  with full text (verification-officer tracking, someday, K-6/K-7 cheap insurance)."
- LIVE L8440–8444 (#74): quoted under CD-1 — "**CD-2 IS NOT AN OPEN DESIGN QUESTION.**"

**4. Whose words.** Both layers: MICHAEL's by selection at #51; built by a Code session at #61 (items 3–4), migration run #113. Limb (e): a Claude (Fable 5) PROPOSAL at #64 — "Michael's ruling" named as the act that would adopt it; never put. Limb (b): a group-ruled ROUTING of evidence (#58), "someday", no question yet. "This entry becomes a pointer" is the #51 packet's design annotation (as with CD-1). "**NOT authorized for build**" is stale: the CD-1 slice authorized (#52) and built (#61) both layers.

**5. Changed since hardening.** Nothing by ID (0 hits). Subject: `CD-14` (a new EDGE TYPE with an effective period — a §5 vocabulary act) ruled at `#139` (ii) and to be minted on `FE-D1A-1` (`#140` `AS-Q13b`); it took its own ID, consistent with the CD-3 precedent the row cites — not a CD-2 annotation.

**6. DISCONFIRM.** (a) The hardening is right that limb (e) post-dates the cited ruling and is PROPOSED at HEAD — it is an open spec-level ruling (adopt the carrier-ID / financial-responsibility code vocabulary or not) with NO other home (`carrier-ID` REG 1; `cr3-field-code-map` REG 3 — CD-2, IN-2, Q-IN2-2 — but only CD-2 carries the vocabulary-candidate question; IN-2 L251 and Q-IN2-2 L913 concern extraction and a code count). Closing outright buries it in a ✅ row. (b) Limb (b) verification-officer tracking ("someday") exists only here — a banked requirement, not a question; a ✅ row reads as spent. (c) Limb (a) is safe (CD-9). (c)/(d) are routings to CR-2/CR-9 (their own rows at L122/L129). (d) CD-4…CD-13 (REG L235–243) are the live coverage-audit questions on the ruled taxonomy — they do not depend on CD-2 staying ⬜. (e) No Michael hold on CD-2.

**7. PROPOSED: `CLOSE-SPLIT` — MED.** The bold question was answered at #51 and built at #61; the row's remaining open matter is limb (e), which is re-minted narrowly. Surviving limb text (verbatim from L229): "**(e) ADDED 2026-08-12 (#64): carrier-ID and financial-responsibility TYPE codes from the CR-3 code sheet are directory-vocabulary CANDIDATES** — PROPOSED only, pointer at `docs/specs/cr3-field-code-map.md`. **Adding directory vocabulary is a spec-level act on the living spec (the CD-3 precedent), so nothing was added.**" Suggested narrow row: "Do the CR-3 code sheet's carrier-ID and financial-responsibility TYPE codes enter `contact-directory.md`'s §5/§6 controlled vocabulary (spec-level act, CD-3 precedent)? PROPOSED #64; pointer `docs/specs/cr3-field-code-map.md`." Limb (b) (verification-officer tracking, someday) should be named in the closing sentence as BANKED and, if Michael wants it visible, re-homed as a banked line on the new row or beside CD-10. The closing sentence also records: built #61 items 3–4; migration #113; "NOT authorized for build" overtaken by #52/#61.

**8. Row line identity.** Whole row 4,765 B, one line. 90-char prefix, once: `- ⬜ **CD-2 — Case-type party rosters + typed contact relationships (the "family" layer`. Full line `-x` = 1.

---

### DL-INPUT (L288)

**1. Row / interrogative (REG L288).** "**Is the deadline model per-(case, party), not per-case? A data-model fork the deadline-engine design pass must take deliberately; nothing in the heartbeat/deadline docs rules it either way.**" Row already records: "**RULED 2026-08-13 (#66): the deadline model is PER-(CASE, PARTY)** — each party's response clock computes from its own service date. The deadline-engine design pass builds on this. **Ruled ≠ authorized: no deadline engine is in the build queue.**"

**2. Mentions.** LIVE 3/3 (L8155 runner 29; L8326 `#75`; L9095 `#66`) · ARCH 1/1 (L1644, runner 11 placement note) · BS 1 (L125) · REG 5 (L3 header, L263 DE-2 cross-link, L288, L1007, L1009 `ID-DL-1`). Collision: 0 (`DL-` appears only as `[DL-memo Qn]` labels). `per-(case, party)` (any case) REG 1 (L288) / LIVE 1 (L9095).

**3. Decisive text.**
- LIVE L9021–9022, heading `## 2026-08-13 (#66) — RULING RUN: ~20 open queue items ruled one by one (design session,` / "Fable 5, Cowork, typed; all rulings Michael's, 2026-08-13 Central, by widget or direct words;"; L9095–9096: "- DL-INPUT RULED: the deadline model is PER-(CASE, PARTY) — each party's response clock
  computes from its own service date. The deadline-engine pass builds on this."
- LIVE L8326–8332, heading L8290 `## 2026-08-14 (#75) — DEADLINE-ENGINE MEMO filed as PROPOSED design input; RULE TEXT SOURCED TO CLEAN AUTHORITY FOR THE`: "- THE MODEL, answering what DL-INPUT left open: **the chain is per-defendant at both ends and case-wide in
  the middle.** PER-DEFENDANT: answer date (99(b), from that defendant's own service date); written-discovery
  response (196.2/197.2/198.2, from service on that party); mail's three added days (21a(c), per party AND
  per method). CASE-WIDE: initial disclosures (194.2(a), anchored on the FIRST answer or general appearance)
  and the discovery period (190.3(b)(1)(A), anchored on when the first disclosures are due)."; L8354–8355: "- NOTHING RULED THIS SESSION. Michael made no rulings; everything is PROPOSED. **Ruled ≠ authorized still
  holds — no deadline engine is in the build queue.**"
- BS L125: "**AN ELABORATION SPEC NOW EXISTS AND AUTHORIZES NOTHING: `docs/specs/deadline-engine-spec.md` (PROPOSED)** — it works out what `FC-7`/`FC-8`/`FC-9` and `DL-INPUT` imply, **proposes NO column, NO table and NO migration**" (spec landed batch 72, LIVE L2882 — before the hardening; not staged).

**4. Whose words.** The ruling is MICHAEL's (#66: "all rulings Michael's … by widget or direct words"). The #75 refinement is Claude's (Opus 5), PROPOSED — and it does not contradict the ruling: the RESPONSE clocks DL-INPUT asked about are per-defendant in #75's model too; the case-wide anchors are OTHER deadlines the row never asked about. "Ruled ≠ authorized" is the row's/runner's build-queue statement.

**5. Changed since hardening.** Nothing (0 hits by ID and by subject — `deadline model`, `PER-(CASE` — in the first 606 LIVE lines; control fired).

**6. DISCONFIRM.** (a) The hardening's caveat — a builder reading #66 alone builds the wrong thing — is a spec-pointer concern, answered by the closing sentence pointing at `#75` and `deadline-engine-spec.md` (PROPOSED), both of which already exist and are the deadline-engine pass's home, with `[DL-memo Q1]–[Q5]` (REG L1010–1014) and `ID-DL-1` (L1009) holding that pass's open questions. (b) "no deadline engine is in the build queue" is an ACTION fact (REG L11 #114 line); the engine's authorization will be its own ruling/row on the `FE-D1A-1` pattern. (c) Unique text: none that is a question; the ruling sentence is duplicated at LIVE L9095. (d) No Michael deferral or hold on DL-INPUT anywhere.

**7. PROPOSED: `CLOSE` — HIGH.** The row's whole question is answered in Michael's #66 ruling and the row already says so; the only thing holding the glyph is a build-queue fact the register is not drawn to hold. Closing sentence: ruled #66 PER-(CASE, PARTY); elaborated as PROPOSED at #75 ("per-defendant at both ends and case-wide in the middle") and in `deadline-engine-spec.md` (PROPOSED, no column/table/migration); no deadline engine authorized; the pass's open questions live at `[DL-memo Q1]–[Q5]` / `ID-DL-1`.

**8. Row line identity.** Whole row 822 B, one line. 90-char prefix, once: `- ⬜ **DL-INPUT (2026-08-11) — Per-defendant service dates within one discovery wave: s`. Full line `-x` = 1.

---

## SUMMARY

| ID | audit class | hardened verdict | PROPOSED | confidence | destroys-unique-text? (Y/N) |
|---|---|---|---|---|---|
| FE-4 (L185) | RULED-BUT-OPEN (#53, closed #54) | OUT-OF-CONTEXT | `CLOSE` (fallback ANNOTATE-KEEP) — ruled #53 by Michael; residue at Q-FE4-1..6; "stays open" is Claude/runner text (runner 36, not #81 — see S-2) | MED | N |
| FE-5 (L186) | RULED-BUT-OPEN (#53) | PARTIAL | `CLOSE-SPLIT` — re-mint the pairwise/cumulative + Level-3-is-an-order-value scope findings (no other row); Q-FE5-1/-9 already have rows | MED | N (if the limb is re-minted; Y if closed outright) |
| FE-6 (L187) | RULED-BUT-OPEN (#53) | OUT-OF-CONTEXT | `CLOSE` — sub-question and separate-mode layout ruled #53; Q-FE6-1..7 hold residue; "BUILD is gated" sentence is #81's (Opus 5), not runner 35's | MED | N |
| FE-7 (L188) | RULED-BUT-OPEN (#53, #63) | VERIFIED | `CLOSE` — both halves ruled; "Entering ≠ adopting" preserved at ✅ L213; zero distillation activity since #63 | HIGH | N |
| FE-8 (L189) | NOT CLASSIFIED (slice boundary) | §5.1 same posture as FE-10/12 | `ANNOTATE-KEEP` — retention half BUILT; diff half DEFERRED #63 and confirmed deferred #135; §5.6 sub-question never put (0 log hits) | HIGH | N |
| FE-10 (L193) | RULED-BUT-OPEN (#63, built) | PARTIAL | `ANNOTATE-KEEP` — audit's cite rules scope only; both sub-questions unruled and unique; numbering pass not named as built | HIGH | N |
| FE-12 (L197) | RULED-BUT-OPEN (#63, built) | PARTIAL + built NOT-FOUND | `ANNOTATE-KEEP` — "known-bad" limb unruled (0 log hits); build entry and BUILD-STATE name neither FE-12 nor provenance (UNVERIFIABLE-HERE) | HIGH | N |
| CD-1 (L228) | RULED-BUT-OPEN (#51, complete #113) | OUT-OF-CONTEXT | `CLOSE` (Michael's tiebreak; fallback ANNOTATE-KEEP) — the "living-spec pointer" sentence is register-only, not in #51; posture ruled #38 and homed in the spec header/CD-3; revisits take their own IDs (CD-14) | MED | N |
| CD-2 (L229) | RULED-BUT-OPEN (#51, built #61) | PARTIAL | `CLOSE-SPLIT` — both layers ruled #51 and built #61; re-mint limb (e) (carrier-ID / financial-responsibility vocabulary candidates, PROPOSED #64, no other row); bank limb (b) | MED | N (if (e) re-minted; Y if closed outright) |
| DL-INPUT (L288) | RULED-BUT-OPEN (#66) | VERIFIED (+#75 caveat) | `CLOSE` — ruled #66 in Michael's ruling run; #75 is PROPOSED elaboration, not contradiction; open questions of the pass have their own rows | HIGH | N |

**Could not process:** none. **UNVERIFIABLE-HERE** (files not staged): `form-engine.md` §13.1–§13.4 content at HEAD; `fe-d1-build-slice.md` (disposition table; the hardening's "two-value flag" reading of FE-12); `contact-directory.md`; `cr3-field-code-map.md`; `deadline-engine-spec.md`; `src/` (whether FE-12's attribute or FE-10's numbering pass shipped).

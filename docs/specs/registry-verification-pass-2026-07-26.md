# Registry Verification Pass — Session Capture (2026-07-26)

**Status:** RAW CAPTURE — design-space session (chat + voice segments), Claude Opus 5. Not canonical, not a design doc, not in the build queue.

**Canonical repo path:** `docs/specs/registry-verification-pass-2026-07-26.md` — filed 2026-07-26.

**What this session was.** The first sustained *verification* session in the project's history. Every prior session generated propositions; this one closed them. Michael pulled and read primary authority — eight opinions and five statutes — and stated the holdings aloud while Claude reconciled each against the drafted entries. Substance from the readings lives in the three amendment files in this packet; **this capture records the session itself, the rulings, the reasoning, and everything left open.**

**Also still pending from before this thread:** FLP account + Tier 1 membership + MCP connector setup (**promo ends 8/6** — carried on 7+ consecutive log entries); D3 shared-touch-substrate ruling (still blocks T1 for both heartbeat and time tracker); Entry 1(c-3) qualified-LOP ruling; `BUILD-SESSION-NOTES.md` 2026-07-21 audit, unreviewed; `Go_Live_Gates.md` gates 1–5 exist only in project knowledge.

---

## PART 0 — ORIGIN AND PREMISE

The session opened with an exhaustive **attorney-review list** — every item across the whole project awaiting Michael's personal decision or sign-off, with exact citations and the specific question attached to each. It was reformatted four times on request, ending in a form where each item carries explanatory sub-bullets and one **bolded sub-bullet containing the actual question**. That list is staged in this packet as `claude_Attorney_Review_Queue_2026-07-26.md`.

Michael then said: *"I am gonna go through these items with you today… I'm gonna start with the court opinions to pull and read. I mostly want you to listen to me until I'm done talking about the court opinions."*

That framing set the session's method and is worth preserving, because it inverts the usual pattern. Claude did not research; Michael read primary text and Claude reconciled. **This is what verification looks like in this project**, and the yield was high enough to argue for repeating it deliberately rather than opportunistically.

Earlier in the same thread (pre-verification), *Ortiz v. Nelapatla* — decided 5/1/2026, the case Entry 2 was gated on — was read in full (majority and dissent) and produced an Entry 2 redraft. Today's readings then closed three of that redraft's own checklist items, which is why this packet ships **Entry 2 redraft v2** and supersedes v1.

---

## PART 1 — WHAT WAS RULED (CONFIRMED)

Only one item in this session is a **design ruling**. The rest are **verifications** — Michael confirming what an authority says. Both matter, but they are different acts and the packet keeps them apart.

### 1.1 The one design ruling

**Contemporaneity is a badge, not a hard warning.** Michael: *"Yeah. That's my read on it."*

Reason: *Rohrmoos*/*El Apple* fault **generality**, not the absence of contemporaneous records. The Court's own phrasing is disjunctive — the attorneys neither presented time records or other documentary evidence, **nor** testified based on their recollection of such records. Two acceptable proof paths. A late-logged entry is not fatal; a vague one is.

### 1.2 Verifications closed

| Authority | What closed |
|---|---|
| *In re Allstate Indem. Co.*, 622 S.W.3d 870 | **Docket No. 20-0071 confirmed.** The two-*Allstate* identity question — open since Kostura's chapter — is closed. Same opinion. |
| *In re Allstate* (content) | §18.001(f) qualification is the holding; reasonable notice satisfied by per-charge itemization + median-charge benchmark (same service, timeframe, ZIP); **reasonable notice does not require a Rule 702/*Robinson* reliability assessment** |
| *In re Chefs' Produce*, 667 S.W.3d 297 | Both holdings read; consistent with *Ortiz* n.5. Record as **limited-by-*Ortiz***, not standalone |
| *In re Sherwin-Williams*, 668 S.W.3d 368 | Entry 10(a)'s three-element good-cause test **confirmed verbatim**, third element included |
| *In re Auburn Creek*, 655 S.W.3d 837 | Nexus has independent content — more than conclusory, more than mere relevance, evidence of direct relation |
| *In re H.E.B. Grocery*, 492 S.W.3d 300 | Less-intrusive-means analysis in full; the credibility-disadvantage rationale |
| *Tex. State Univ. v. Tanner*, 689 S.W.3d 292 | **No freestanding diligence requirement** — only timely service, with relation-back as diligence's reward; jurisdictional against governmental defendants via Gov't Code §311.034 |
| *Rohrmoos Venture* | Two-step lodestar; **four** proof elements (not five); task-specificity holding |
| *Tony Gullo Motors* | All three segregation propositions confirmed as drafted |
| CPRC §18.001(d)–(g) | All service deadlines now stated from official text |
| Prop. Code ch. 55 | **EMS threshold = counties of 800,000 or less** (a ceiling) |
| H.B. 4145 | Applicability keyed to **date of service** — per-bill flag survives |
| CPRC §38.001 / H.B. 1578 | 87th Leg. 2021, Ch. 665; applies to actions **commenced** on or after 9/1/2021 |
| Bus. & Com. §17.50(d) | "shall be awarded" unqualified — `basis: mandatory` holds |

### 1.3 One correction Michael made to Claude

Michael challenged the H.B. 1578 citation — *"I think HB 1578 died in 2024"* — and was right to challenge it, because bill numbers recycle every session. Verification (search + the codified amendment-history line + the enrolled bill he then supplied) confirmed the 87th-Legislature 2021 bill was the correct one.

**Process finding worth keeping:** the codified statute's own amendment-history line names its amending act, chapter, and bill number. Cheapest possible verification path for any "which bill was that" question. Should become a habit of the statute-cache module's output.

### 1.4 One transcription correction Michael made

In *Auburn Creek*, "the Paus" is the **Pau family** (P-A-U), the plaintiffs. **Dr. Gilbert Martinez** was the **defense-designated** expert; **Dr. Webb** authored the report served on the plaintiffs' behalf. Recorded because a mis-attributed expert would invert the whole nexus example.

---

## PART 2 — WHAT WAS PROPOSED AND NOT RULED

Every item here is Claude's suggestion. Michael did not object, and in several cases moved to the next item. **Changing the subject is not agreement.**

1. **Entry 10 should state the nexus element separately**, drawing on *Auburn Creek*, rather than folding it into the *Sherwin-Williams* statement.
2. **Entry 10(c)'s "trend" framing is doubtful** — *H.E.B.* (2016) already compelled an exam on unremarkable facts using the same test and the same rigor, so the line looks settled and defence-favourable for a decade rather than newly shifting.
3. **Cross-cutting IME pattern:** the movant wins by putting on actual evidence explaining why the exam is needed and why records alone will not do. Conclusory loses. Should become Entry 10's practice hook.
4. **Ch. 55 schema split:** lien validity as a boolean with a reason code; amount reduction as a separate computed field. Two workflows.
5. **No hospital lien where the tortfeasor is a county or ISD** — from §55.001(4)'s definition of "person" plus §55.002(a)'s "negligence of another person." Claude's reading, explicitly unverified.
6. **The H.B. 4145 negative implication** — pre-9/1/2025, billing only counsel arguably did not satisfy §146.002, chaining §146.002 → §146.003 → §55.004(d)(5).
7. **§38.001 profile trigger should widen** from "breach of contract" to the eight statutory categories, especially rendered services and sworn account.
8. **The module should affirmatively block §38.001** as a basis on first-party insurance claims, per §38.006, rather than merely defaulting to the UDJA.
9. **§38.002 presentment** should be a captured date field with a computed 30-day clock.
10. **The DTPA profile should model §17.50(c) downside risk**, not only the recovery side.
11. **The DTPA mid-case point-in-time export is mandatory, not optional** — three date-anchored cuts before judgment.
12. **Tagging should be entry-level and service-specific**, not blanket case-level, because the *Tony Gullo* escape is framed around a specific service and not shared facts.
13. **Governmental-defendant cases warrant their own escalation profile** — the failure mode is jurisdictional dismissal, not a limitations fight.
14. **Post-limitations service gaps should be prompted for a documented, non-conclusory explanation** in the file. Notable because it would be the first heartbeat prompt whose output is *evidence* rather than a reminder.

---

## PART 3 — STRUCTURAL FINDINGS

Findings that change the shape of something, rather than adding a proposition.

1. **§18.001's deadlines are derived from the deadline skeleton, not independent of it.** Two of three prongs in both (d) and (e) are expert-designation dates, so TRCP 195.2 can pull the affidavit deadline well inside 90/120 days. Anything that hardcodes 90/120 is wrong on a large share of cases. *This is the first time a registry entry has been shown to depend on the deadline-skeleton module.*
2. **§18.001(e-1) is the only "later of" in the section.** A function assuming "earlier of" throughout fails on exactly the hardest fact pattern to spot — the provider who first treats after the answer.
3. **Entry 4 and Entry 5 are coupled** through §55.004(d)(5). Computing them in isolation over-states liens.
4. **Two "first day of the 11th month" traps.** §146.002's deadline is not "11 months" — a March 2026 service is due 1 February 2027. Needs its own tested function and fixture.
5. **§55.005(d)'s five-business-day clock runs from the clerk's notice to the provider**, not from filing. Any function anchored on the filing date is wrong.
6. **The multi-defendant staggered-answer ambiguity is one question, not two.** §18.001(d)/(e) say "the date the defendant files an answer," singular; TRCP 194.2(a)'s anchor has the same gap. One ruling covers both.
7. **The DTPA makes a point-in-time fee ledger legally operative**, three times over — demand letter, 30-day tender window, settlement offer. The tracker must be able to produce a defensible cut *as of a date already past*.
8. **County-conditional rules are computable.** The Ch. 55 EMS threshold is the first rule in the project that the module can evaluate from case metadata alone with no user input — and it splits Michael's own practice, Bexar on one side and Uvalde on the other.

---

## PART 4 — WHAT WAS NOT COVERED

The statutes queue stopped partway. **Untouched today:**

- Tex. Prop. Code §53.156 (mechanic's/materialman's — the may→shall change and residential carve-out) — **this is where the session stopped**
- Tex. Prop. Code ch. 28 (Prompt Payment — the discretionary question Michael flagged himself)
- Tex. Est. Code §352.051
- Tex. Fam. Code §§106.002, 6.708, 6.502(a)(4), 156.005
- TDRPC 1.04
- Tex. R. Civ. P. 204.1 (the rule text itself; the case-law line around it was covered)
- **The entire TRCP block** — 194.2(a), 190.3(b)(1), 195.2(a)/(b), 166a(d-1)/(e-1)/(g-1), 99(b)
- **All four status checks** — *Sheppard* subsequent history; *Greystar*/*Brenham Nursing*/*Pinnergy* dockets; Kostura's 30-day CPN rule against the 2024 CMP rules; AMA CPT license terms
- **Every project document** on the review list — none was opened

Also untouched: the *Ortiz* citator pass; Entries 1, 3, 6, 7, 8, 9.

---

## PART 5 — OPEN ITEMS

New items use a **V-prefix** (verification pass) to avoid collision with the existing H-series, whose next free number cannot be determined from the design side. **Renumber into the H-series at Michael's discretion.**

| ID | Item | Status |
|---|---|---|
| **V1** | Are *Allstate*'s p.876 (expert testimony always required) and p.882 (excluding evidence without valid legal basis is abuse of discretion) statements load-bearing, or dicta? Michael's read located the holding elsewhere and did not reach them. Interacts with Entry 2(j) and H77. | Open — needs a targeted re-read of those two pages |
| **V2** | "The date the defendant files an answer," singular — what governs in a multi-defendant case with staggered answers? Same gap as TRCP 194.2(a)'s anchor. | Open — one ruling covers both |
| **V3** | Does Entry 10(c)'s "trend toward compelled exams" framing survive, given *H.E.B.* (2016)? | Open — flagged, entry not rewritten |
| **V4** | Ch. 55 notice defects: is failure to send, or a defective §55.005(e) EMS form notice, fatal to the lien? §55.005(g) saves only non-receipt of a properly mailed notice. Statute cannot close this. | Open — case-law question; **still gates the disbursement checklist** |
| **V5** | Does a hospital lien attach where the tortfeasor is a county or ISD? §55.001(4) excludes them from "person"; §55.002(a) requires negligence of "another person." | Open — Claude's reading, unverified |
| **V6** | Adopt *Tanner* as the H21 service-diligence cite? And does the draft entry belong in the registry file or in `trcp-deadline-skeleton-2026-03-01.md`? | Open — **asked and not answered**; Michael read the case but did not rule on adoption |
| **V7** | *Arthur Andersen & Co. v. Perry Equip. Corp.*, 945 S.W.2d 812 — year stated as 1977 in session; reporter volume suggests 1997. | Open — verify before the cite appears in any export |
| **V8** | Is the §38.001 commenced-date capture still worth building, given that any pre-9/1/2021 action is now ~5 years old and the date is derivable from the filing date? | Open — **asked and not answered** |
| **V9** | Does the *Rohrmoos* "incurred… when one becomes liable for it" gloss bear on Entry 1(c-3)'s qualified-LOP question? | Open — flagged, not folded in |
| **V10** | Should the §18.001 counteraffidavit-analysis practice hook (compute the uncontroverted floor) advance to a design pass? | Open — carried from the Entry 2 redraft |

**Carried from before this session and still open:** D3 (shared touch substrate — blocks T1); Entry 1(c-3) qualified LOP; Entry 4 fatal-defect conflict (now partially advanced — see V4); H22 queue arithmetic; H40 deposition-thread completion (asked twice, unanswered); H50 supplementation opt-out; H60 payer threads at intake; H77 `precedential_status` field; H21/H24 service diligence (see V6); FLP setup, **8/6 deadline**.

---

## PART 6 — CROSS-CUTTING PATTERNS

1. **Reading the statute changes the entry more than reading the cases does.** Every statute pulled today produced findings that were not in any draft — the (e-1) inversion, the four §38.001 carve-outs, §38.006, the DTPA's three fee cuts, §55.007's release-validity teeth. The cases mostly *confirmed* what was drafted. `[JUDGMENT]` That argues for front-loading statutory text in future verification sessions.
2. **Chained provisions are the recurring shape.** §146.002 → §146.003 → §55.004(d)(5). §18.001 → TRCP 195.2. §17.505 → §17.506(d) → §17.5052(h). Entries drafted in isolation systematically miss these, and the misses are consequential rather than cosmetic.
3. **Date computations keep turning out to be non-obvious.** "First day of the 11th month," "10:00 a.m. on the Monday next after," "later of" inside a section of "earlier ofs," a clock that starts on the clerk's notice rather than on filing. **Every date rule in this project should be assumed to need a tested function and a fixture until proven otherwise.**
4. **The defence must put on evidence.** True across all three IME cases, and it is also what *Tanner* demands of a plaintiff explaining service delay, and what *Rohrmoos* demands of a fee claimant. The system's job in each is the same: make the record exist before someone asks for it.

---

## PART 7 — RESUME POINT

**The session stopped mid-queue, in the statutes block, immediately before Tex. Prop. Code §53.156.**

Next design session, first task: review the synced session-log top entries to catch up in one pass (standing convention — design-side view lags repo state). Then either resume the statutes queue at §53.156, or take the higher-leverage route and rule on **D3**, which still blocks every schema build in the project.

**The single most time-sensitive item on the board remains the FLP setup — the promo ends 8/6.**

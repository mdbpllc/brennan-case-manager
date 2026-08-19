# T-26 Group A Sign-Off + Adjudication Record — 2026-08-18 (#108)

**Canonical repo path (proposed):** `docs/specs/t26-signoff-and-adjudication-record-2026-08-18.md` — NEW file, rides this packet.

**Status: RECORD.** Every ruling and every verification below is **Michael's word, recorded per item
before any file was touched** (the #98 pattern). This document verifies nothing by itself and builds
nothing; the directed edits at §3 are executed by the queue runner, and every proposition it touches
carries the status Michael's answer gives it, nothing more.

**Session:** #108, design side, **Fable 5**, Cowork, 2026-08-18 evening (Central). Fable
adjudication session (the fourth run on this calendar day: #105, #106, #107's rulings, then this).
**Reconcile basis:** HEAD `3b171cd` on `master`, read through the device bridge with **lock-free
reads only** (`cat .git/HEAD` + `cat .git/refs/heads/master`; `git status` never run). At session
start: `ls -la inbox/` → empty; `ls -la .git/index.lock` → absent. A bridge read is local-only
evidence: it establishes the working tree and **nothing about origin**. BUILD-STATE (ninety-sixth
refresh) and the top three log entries (runner 61, #107, runner 60) were read in full before
anything was asserted. Ceiling at HEAD: **#107** → this session is **#108** (design-minted; TOC-6
honored). The at-save re-checks of `inbox/` and the lock are reported in the session's delivery
message and re-verified by the runner at Step 1 — this record asserts only what was checked before
it was authored.
**Instructions v22 in force** (read from this session's live instructions field, the #82/A-1
mechanism). **Runner v11.**

**DT-1 — applied, and it fired.** The container and the session UI both read 2026-08-19 (UTC).
Wall clock checked on BOTH shells at the stamping decision: `TZ=America/Chicago date` returned
**`Tue Aug 18 20:48 CDT 2026`** on the cloud container and on the device VM — squarely inside the
~19:00-Central-to-midnight window the record identifies. **Every stamp in this record and this
packet is 2026-08-18 (Central).** See §4 for the in-session correction this required.

**PF-1 (standing law, #105) ran design-side, pre-`inbox/`, on this packet's full draft** — two
independent read-only adversarial agents; result at §6; the defects found were corrected (and two
put back to Michael) BEFORE this file was finalized and the zip saved.

---

## §1 — T-26: THE GROUP A LOOKS. FIVE ENTRIES PUT; THREE VERIFIED; TWO CONFORMED TO VERBATIM TEXT BY HIS DIRECTION — ALL MICHAEL'S WORD

T-26 (CHAT-DISPATCH v4's last task, interactive) ran in this session at Michael's ruling (pick
verbatim: **"Mint row + run now (Recommended)"** — the row-minting half is §3 item 7). For each
entry: the entry text at HEAD `3b171cd` was quoted verbatim beside the operative text extracted raw
from the named source; divergences were named; Michael answered. **Only Michael verifies; each
answer below is his, verbatim.** Verification date where verified: **2026-08-18**.

### 1.1 Entry 13 — TRCP 191.2 (discovery conference requirement and certificate)
- **Source:** clean-authority PDF, `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf`,
  `pdftotext -layout` in the device VM (VM-local scratch only), quote spot-checked against raw extraction.
- **Comparison put to him:** entry text and Rule 191.2 are **word-for-word identical**. Both ROUTE-C
  defects the Q-STAT-6 pass flagged are cured in the executed wording: the certificate attaches to
  motions/requests for hearing (not responses), and "and the effort failed" is present.
- **Answer: "VERIFIED."** No residual divergences existed. The DE-2 conference fuse's legal
  substrate is no longer pending.

### 1.2 Entry 2 — TRCP 192.3(h) (witness statements discoverable)
- **Source:** same TRCP PDF, same method.
- **Comparison put to him:** identical to the rule's first sentence, dash typography aside (the
  named, sole divergence). The ROUTE-C fix ("regardless of when the statement was made") is in.
  The rest of 192.3(h) lives elsewhere **by his #95 ruling** (definition + notes sentence on WP-3,
  VERIFIED 2026-08-17; the own-statement right is drafted entry A) — this entry carries the first
  sentence only, by design.
- **Answer: "VERIFIED."**

### 1.3 Entry 12 — TRCP 215.4(b) — VERIFICATION SUPERSEDED BY HIS OWN DIRECTION; CONFORMED WORDING ADOPTED
- **Source:** same TRCP PDF, same method.
- **Sequence, recorded in full because the record must not smooth it:** (i) the look was first put
  with a FOUR-item divergence list and Michael answered "VERIFIED." (ii) **PF-1 then found the
  list incomplete** — the complete word-level list is nine items: "a document / a matter" for "any
  document / any matter"; "the party requesting the admissions" shortened to "the requesting
  party"; the gender-neutral recasting; **"to the court" dropped** from "may apply to the court";
  "pay him" → "pay"; "that he might prevail" → "it might prevail"; "under Rule 193" for "pursuant
  to Rule 193"; the serial "or" carried only before item (4); the rule's two sentences joined by a
  semicolon. Under the standing rule an unnamed divergence does not resolve at verification, so the
  look was RE-PUT with the complete list. (iii) On the re-put Michael asked why the entries
  paraphrase at all and directed, his words: **"Let's just leave the rules as they are written in
  the updated version of the rules in the Knowledge Repo."** (iv) A conformed Rule line — Rule
  215.4(b) **verbatim** — was drafted and put per ROUTE-C; **his pick: "Adopt."**
- **Outcome:** the first-round verification does not stand — superseded by his own direction before
  any file was touched. The **adopted verbatim text executes at §3 item 5 and the entry stays
  UNVERIFIED**; verification attaches to the new wording after execution (#95 execute-first) and is
  a one-look character comparison next session.

### 1.4 Entry 29 (criminal file entry 2) — Health & Safety Code § 481.115(b)
- **Source:** official bulk corpus, `Documents\Knowledge Repo\Statutes 26-08-14\HS.pdf.zip` →
  `hs.481.pdf`, unzipped and extracted in the device VM's own filesystem (nothing staged, no scratch
  in a connected folder). Corpus download 2026-08-14 by Michael's hand; **currency per the source's
  own statement: through the 89th Legislature, 2nd Called Session (2025).** The doubled-`A`
  space artifact appears exactly in its characterized contexts (`Sec.A481.115.AAOFFENSE`,
  `(b)AAAn`); normalization applied to characterized contexts only, quote spot-checked against raw.
- **Comparison put to him:** both ROUTE-C defects are cured — the entry covers **Penalty Group 1
  or 1-B** (matching the section heading and text as amended) and carries the **"by aggregate
  weight, including adulterants or dilutants"** qualifier. Stated with open eyes: the entry
  condenses (a)+(b) into a grading proposition and does not restate (a)'s mens rea ("knowingly or
  intentionally") or the prescription exception.
- **Answer: "VERIFIED."** The grading-only condensation is **accepted and noted**.

### 1.5 Entry 32 (criminal file entry 4b) — CCP art. 102.073 — VERIFICATION SUPERSEDED; CONFORMED WORDING ADOPTED
- **Source:** official bulk corpus, `Statutes 26-08-14\CR.pdf.zip` → `CR.102.pdf`, same method,
  same artifact characterization. The article's history line: *"Added by Acts 2015, 84th Leg., R.S.,
  Ch. 1160 (S.B. 740), Sec. 1, eff. September 1, 2015"* — no later amendment shown in the corpus.
- **Sequence — same shape as 1.3:** (i) first put with a TWO-item residual list; "VERIFIED."
  (ii) PF-1 found the list incomplete — the complete list is six: the passive recast of (a)
  ("each court cost or fee may be assessed" for "the court may assess each court cost or fee");
  (b)'s scoping prefix "In a criminal action described by Subsection (a)," dropped; "whose amount
  is determined" for "the amount of which is determined"; "possible" for "that is possible"; "The
  article" for "This article"; the fine-only sentence's dropped "the commission of two or more."
  Re-put complete. (iii) His direction: **"Leave the rules as they are written in the knowledge
  repo in the official copies of the rules."** (iv) Conformed Rule line — art. 102.073(a)–(c)
  **verbatim** — put per ROUTE-C; **his pick: "Adopt."**
- **Outcome:** first-round verification superseded by his direction; **adopted verbatim text
  executes at §3 item 5; entry stays UNVERIFIED**; one-look verification next session. The ROUTE-C
  cure the #98 wording carried (the category-dependent qualifier) is inside the verbatim (b) text.
  Cite selection for the 4a/4b pair (*Hurlburt* / *Pharr*) is untouched and stays where #106 put
  it: his PDF pulls, then the authorized Opus read (`Q-AUTH-1`).

**Backlog effect once §3 executes, stated for orientation and RE-DERIVED AT HEAD by the executing
batch, never carried from here:** verified count 23 → **26** (entries 13, 2, 29). With the five
insertions at §3 (entries A, B, D, E, F, all UNVERIFIED), the backlog is **45 entries,
26 VERIFIED / 19 UNVERIFIED**.

---

## §2 — RULINGS AND DISPOSITIONS. MICHAEL'S PICKS, VERBATIM, EACH WITH ITS REASON

Items 1–11 and 15–20 are RULINGS; items 12–14 are his status reports on hand acts (WS-P1/WS-P3)
and a deferral (WS-P4), recorded as such — not rulings. Nothing else in the session ripened into a
ruling.

1. **`Q-WS2-1(a)` — RULED: "Whole Rule 194."** The VERIFIED "TRCP 194 — initial disclosures
   (post-2021), EXPANDED wording" entry's scope is the whole rule, not the enumerated span
   194.1–194.4. **This resolves the span flag standing against that entry** (his read of his own
   entry; changes no wording and no Status line).
2. **`Q-WS2-1(b)` — RULED: "Second observation (Recommended)."** Drafted entry C (194.1(a)) is NOT
   inserted; its substance enters as a second observation on the VERIFIED TRCP 194 entry. Reason:
   entry C's first sentence IS that entry's verified duty on either span reading; the
   one-proposition-one-home rule (TRCP 193.7 precedent) the destination file's own header records
   as already applied to Rule 194.
3. **`Q-WS2-1(c)+(e)` — RULED (one pick over two limbs): "Own entry + cross-ref."** Drafted entry E
   (194.5) inserts as its own UNVERIFIED entry in the enforcement file **with an express
   cross-reference to the VERIFIED 192.5(c)(1) entry**. Reason: the propositions are distinct —
   192.5(c)(1) is substantive (witness statements are not work product at all), 194.5 is procedural
   and broader (no objection or work-product assertion against any Rule 194 disclosure) —
   notwithstanding the whole-rule scope ruled at (a).
4. **`Q-WS2-1(d)` — RULED: "Confirmed — execute (Recommended)."** Entry D (194.2(b)(9)) is new on
   either span reading and executes, entering UNVERIFIED.
5. **`Q-WS2-2` — RULED: "Confirm 194.2(b)(9) (Recommended)."** The cite conformation from the
   ruling's shorthand "194.2(9)" is adopted; drawn from the rule's own citation convention (Rules
   194.6 and 197.3 both route through the (b) level). The conformation **stays flagged on entry D's
   cite note as its own act** — never silent (ROUTE-C).
6. **Reciprocal cross-reference — RULED: "Yes — reciprocal note (Recommended)."** The VERIFIED
   TRCP 194 entry takes an add-only cross-reference note to the new 194.5 entry (the #73 V-4
   keep-as-two pattern). **Notes only; proposition wording and Status untouched; the
   carrier-duties file's `**Status:** VERIFIED` count must be 22 before and after (§3 item 3 names
   the command).**
7. **`Q-WS3-5` — RULED, both limbs.** (i) **"Adopt C-XL-1 (Recommended)"** — the *In re XL
   Specialty* candidate enters the WS-3 drafted entry as an express boundary (Texas Supreme Court
   authority on the very TRE 503(a)(2) element *Fontenot* rests on; the #104 read: it sharpens
   rather than undermines). ROUTE-C: **adoption is not verification** — the draft stays UNVERIFIED;
   verification attaches to the amended wording, his act, after execution. (ii) **"Run the second
   pass"** — a read of the five unread confirmed leads (*City of Dickinson*, *CSX*, *Baytown
   Nissan*, *Pope*, *Jimenez*) is AUTHORIZED, **Opus lane**, chiefly to test whether the Texas
   Supreme Court has touched the comment-9 limit. Retrieval only; verifies nothing; V-9 discipline
   and per-item source naming bind.
8. **`Q-WS3-6` — RULED: "Adopt C-ARD-1."** The *In re Arden* candidate (the record-establishes-
   the-role condition, directly on the adjuster-call exposure) enters the WS-3 drafted entry.
   Memorandum opinion, no reporter cite: the WL cite is carried **with its designation stated**.
   Same ROUTE-C terms — draft stays UNVERIFIED.
9. **`FC-12` — RULED: "(c) Structure only."** (Michael asked for and received a plain-terms
   explanation before ruling; picked (c) on the re-put.) The four-library form corpus (~33,800
   files) may contribute **skeletons, section orders, and clause lists — never body text**; body
   prose is always written clean. This replaces the interim conservative default and CLOSES FC-12.
   Reason: preserves the corpus's structural value while making prior-content leakage structurally
   impossible — the evidence weighed was that nothing in any library is safely blank and six of
   fifteen tokenized letters hard-code prior content. **No import tooling is authorized to build by
   this ruling** — that is a later, separately-authorized act.
10. **`FC-13` — RULED, first limb (multi-select, all four picked):** registry entries OPEN for
    **Prop. Code ch. 55** (hospital/EMS liens), **CPRC ch. 146 including the 2025 (c-1)
    amendment**, **TRCP 47(c) bands**, and **§ 18.001 / § 41.0105**. Each is drafted (**Opus
    lane**, SOURCING-compliant, source named per item, under item 20's verbatim direction),
    inserted **UNVERIFIED**; only Michael verifies. Opening is not verification.
11. **`FC-13` — RULED, second limb: "Open 1.04(f) entry."** TDRPC 1.04(f) opens as **the
    registry's first practice-of-law proposition**, drafted from the State Bar clean-authority PDF
    (FC-14's fourth SOURCING channel; TDRPC eff. 3/7/2025), entering UNVERIFIED. **Michael chose
    the plain open over the offered open-plus-boundary-ruling variant — so no standing ruling on
    the cases-vs-practice registry boundary was made**; the boundary question (`Q-STAT-5` stack)
    remains open and undecided. FC-13 CLOSES; the drafting acts it authorizes are pending.
12. **`WS-P1` — his status report: "Making it now / today."** The already-RULED `docs/reference/`
    sync-picker exclusion is being re-applied by his hand. Row stays open until a design session
    verifies it in the live config (a Code session cannot).
13. **`WS-P3` — his status report: "Not stored yet."** The retired-captures zip is still only the
    one delivered copy. Row stays OPEN as the reminder.
14. **`WS-P4` — his word: "Defer."** Whether trigger #4's firing takes a version note stays open.
15. **`WS-P2` — RULED: "Exclude (Recommended)."** `docs/authority/pdf/` (16 scanned opinion PDFs,
    ~194 pages, the probable ~1.38M-token sync weight) is excluded from the GitHub sync. His click;
    row stays open (ruled-pending-execution, the Q-AUTH-1 shape) until the live config verifies.
    Reason: the largest single capacity lever identified; bridge reads at HEAD and the Knowledge
    Repo remain the verification paths; the locator index stays synced.
16. **`T-26` — RULED: "Mint row + run now (Recommended)."** T-26 gets a durable queue row with
    full task text per QR-1 (ending the seven-consecutive-batch flag), AND the five looks ran in
    this session — §1 above. The minted row records both the task and its outcomes.
17. **Execution scope — RULED: "Yes — insert all (Recommended)."** The whole drafted block
    executes in one batch: entries **A** (WS-1, 192.3(h) own-statement right), **B** (RL-4,
    193.4(a)), **D** (194.2(b)(9)), **E** (194.5) and **F** (RL-4, 199.6) insert per the drafts
    doc, all UNVERIFIED; C becomes the second observation (item 2); the reciprocal note lands
    (item 6). Reason: execute-first (#95) — A/B/F's rulings-into-existence predate this session
    and Q-WS2-1 was the only thing holding the block. **Recorded plainly: the option text named
    "A, B, F" as the three never-inserted entries; the executing list is A, B, D, E, F — five
    insertions.**
18. **Entry 12 conformed wording — RULED: "Adopt"** (sequence and full text context at §1.3; the
    adopted Rule line is Rule 215.4(b) verbatim, reproduced at §3 item 5).
19. **Entry 32 conformed wording — RULED: "Adopt"** (sequence at §1.5; the adopted Rule line is
    art. 102.073(a)–(c) verbatim, reproduced at §3 item 5).
20. **Standing drafting direction — RULED: "Yes — standing direction."** Registry Rule lines quote
    operative text **VERBATIM where practicable**; condensation only where the rule is too long or
    the entry deliberately states one limb, **flagged as such in the entry**. Origin: his own
    question at the 12/32 re-put — *"Why are we making these language changes in the first place
    instead of simply staying with the actual language of the rules?"* — and the record's own
    exhibits (the 190.3(b)(3) "each party"/"any other party" defect inside a VERIFIED entry;
    entry 13's zero-flag verbatim look). **Recorded as ruled drafting DIRECTION, not a binding
    convention** — it binds future entry drafting and ROUTE-C rewordings (including the five FC-13
    drafts) as his standing instruction; if he later wants it in the project instructions as a
    binding convention, trigger #3 fires then and the amendment is drafted at that time.
21. **The three verifications at §1** — his word, "VERIFIED," for entries 13, 2 and 29, each
    recorded there with exactly what was put in front of him.

---

## §3 — DIRECTED EDITS (executed by the queue runner; exact scope, nothing more)

Order matters; follow as numbered. Every count re-derived at HEAD, never copied from this packet.
**The drafts doc (`registry-new-entry-drafts-2026-08-17.md`) was authored 2026-08-17, BEFORE these
rulings: where any of its banners, HELD markings, or §5 header text conflicts with this record,
THIS RECORD GOVERNS — annotate the conflict add-only, citing #108; if an insertion point is
unstated or genuinely ambiguous after that, STOP and tell Michael rather than choosing.**

1. **Insert entries A, B, D, E, F** from `docs/specs/registry-new-entry-drafts-2026-08-17.md` §4
   into `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md` at the insertion
   points that document states per entry, texts **verbatim from that document at HEAD** (entry D
   keeps its conformed cite and its Q-WS2-2 cite note — the conformation is now RULED, item 5 of
   §2). The "HELD ON Q-WS2-1" banners on C and E are resolved by this record: annotate them in the
   drafts doc add-only (e.g., "Resolved 2026-08-18, #108: E inserted own-entry-plus-cross-ref; C
   NOT inserted — second observation, see the carrier-duties entry"). **Do NOT insert entry C.**
   Execute the drafts doc's §5 header edit as that section directs, subject to the conflict rule
   above. Each inserted entry enters `**Status:** UNVERIFIED.`
2. **Entry E gains one line** immediately after its Dedupe note (the note is present in the draft —
   confirmed at HEAD this session):
   `**Cross-reference (ruled 2026-08-18, #108, Q-WS2-1(e)):** see the VERIFIED entry "TRCP 192.5(c)(1) — witness statements excepted from work-product protection" in this file — substantive exception vs. this entry's procedural bar; two propositions, two homes, expressly linked.`
3. **In `docs/specs/legal-rule-registry-discovery-and-carrier-duties.md`, on the VERIFIED entry
   "TRCP 194 — initial disclosures (post-2021), EXPANDED wording," append two add-only lines**
   (wording and Status untouched):
   `**Scope (ruled 2026-08-18, #108, Q-WS2-1(a)):** this entry's scope is the WHOLE of Rule 194 — resolving the span flag previously carried against it.`
   `**Second observation (ruled 2026-08-18, #108, Q-WS2-1(b)):** Rule 194.1(a) — except in Family Code suits, as exempted by Rule 194.2(c), or as otherwise agreed or ordered, initial disclosures are owed WITHOUT awaiting a discovery request — is carried here under the one-proposition-one-home rule (TRCP 193.7 precedent) rather than as a separate entry. **Cross-reference (Q-WS2-1(c)/(e)):** Rule 194.5's bar on objections and work-product assertions is deliberately NOT within this entry — it is its own entry in legal-rule-registry-discovery-enforcement-and-pleading.md, ruled own-entry-plus-cross-reference.`
   If a separate standing span-flag text exists elsewhere in the file (beyond this entry), annotate
   it add-only with exactly: `*(Resolved 2026-08-18, #108, Q-WS2-1(a): scope is the whole rule — see the Scope line on the entry.)*` —
   **if no separate flag text is found, state that in the runner line rather than hunting further.**
   **Count check, command named:** `grep -c "^\*\*Status:\*\* VERIFIED" docs/specs/legal-rule-registry-discovery-and-carrier-duties.md`
   before and after — **both must be 22; report both numbers.**
4. **Move three Status lines** (and only these three):
   - Enforcement file, `## TRCP 191.2` entry: Status → `**Status:** VERIFIED — Michael, 2026-08-18 (#108).`
     Append: `**Verified:** 2026-08-18 post-execution look (#108): entry text and Rule 191.2 word-for-word identical against the July 2026 TRCP PDF; no residual divergences. Record: t26-signoff-and-adjudication-record-2026-08-18.md §1.1.`
   - Enforcement file, `## TRCP 192.3(h) — witness statements discoverable` entry (NOT the
     "what a witness statement is" sibling): Status → `**Status:** VERIFIED — Michael, 2026-08-18 (#108).`
     Append: `**Verified:** 2026-08-18 post-execution look (#108) against the July 2026 TRCP PDF; sole named divergence (dash typography) resolved as-is. Record: §1.2.`
   - Criminal file, `## Tex. Health & Safety Code § 481.115(b)` entry: Status → `**Status:** VERIFIED — Michael, 2026-08-18 (#108).`
     Append: `**Verified:** 2026-08-18 post-execution look (#108) against the official corpus (Statutes 26-08-14); grading-only condensation of (a)+(b) accepted and noted. Record: §1.4.`
5. **Replace two Rule lines with the ADOPTED verbatim texts** (ROUTE-C executions; both entries
   stay `**Status:** UNVERIFIED.`; on each, update the `**Wording:**` line to
   `**Wording:** adopted 2026-08-18 per #108 (ROUTE-C — conformed VERBATIM to the official text at Michael's direction); verification attaches to this wording.`):
   - Enforcement file, `## TRCP 215.4(b)` entry — Rule line becomes exactly:
     `**Rule.** If a party fails to admit the genuineness of any document or the truth of any matter as requested under Rule 198 and if the party requesting the admissions thereafter proves the genuineness of the document or the truth of the matter, he may apply to the court for an order requiring the other party to pay him the reasonable expenses incurred in making that proof, including reasonable attorney fees. The court shall make the order unless it finds that (1) the request was held objectionable pursuant to Rule 193, or (2) the admission sought was of no substantial importance, or (3) the party failing to admit had a reasonable ground to believe that he might prevail on the matter, or (4) there was other good reason for the failure to admit.`
   - Criminal file, entry 4b (`### 4b — Tex. Code Crim. Proc. art. 102.073 …`) — Rule line becomes exactly:
     `**Rule.** (a) In a single criminal action in which a defendant is convicted of two or more offenses or of multiple counts of the same offense, the court may assess each court cost or fee only once against the defendant. (b) In a criminal action described by Subsection (a), each court cost or fee the amount of which is determined according to the category of offense must be assessed using the highest category of offense that is possible based on the defendant's convictions. (c) This article does not apply to a single criminal action alleging only the commission of two or more offenses punishable by fine only.`
   Entry 4b's cite parenthetical is unchanged (still true: verification against official text
   remains Michael's act). **Entry 4a is untouched — still UNVERIFIED and cite-less.**
   *Character note, stated rather than silent: the raw PDF extraction renders the possessive as
   `defendant ’s` (space + curly apostrophe — an extraction artifact of the same characterized
   class as the doubled-`A`); the directed text above carries `defendant's` (straight, no space),
   matching repo convention and the statute's evident text. If Michael's verification look prefers
   the typographic apostrophe, that is a one-character ROUTE-C flag at that look, not now.*
6. **Amend the WS-3 drafted entry** (its staging home is the drafts/WS-3 document set at HEAD —
   locate it; **if the draft cannot be located unambiguously, STOP and tell Michael**): append to
   the draft's authority discussion these two adoption lines, exactly (the candidate texts are
   quoted from `costs-and-privilege-authority-read-2026-08-18.md` §5, the authoritative candidate
   statements; §3.1/§3.3 are the supporting reads):
   `**Adopted boundary (C-XL-1, ruled 2026-08-18, #108, Q-WS3-5):** TRE 503(a)(2) "representative of the client" requires authority to obtain legal services on behalf of that client; an insurer and insured are not automatically representatives of each other, and in a posture where their interests are adverse the privilege does not reach between them. In re XL Specialty Ins. Co., 373 S.W.3d 46 (Tex. 2012) (Jefferson, C.J., for the Court).`
   `**Adopted condition (C-ARD-1, ruled 2026-08-18, #108, Q-WS3-6):** an insured's own recorded statement, taken by his carrier's adjuster who is acting to obtain and facilitate the legal defense the carrier owes him, may be protected by the attorney-client privilege where the record establishes that role. In re Arden, 2004 WL 576064 (Tex. App.—El Paso 2004, orig. proceeding) (mem. op., Barajas, C.J.; civil; no reporter cite — designation stated per V-9).`
   Draft stays **UNVERIFIED and uninserted** — its insertion remains gated on `Q-WS3-1` and `Q-WS3-2`.
7. **Queue merge, two acts (QR-6(b))** — rows AND the Status-header reconcile sentence:
   - **CLOSED:** `Q-WS2-1` (all five limbs, picks at §2), `Q-WS2-2`, `Q-WS3-5` (both limbs; the
     authorized second-pass read recorded on the row as a pending Opus-lane act), `Q-WS3-6`,
     `FC-12`, `FC-13` (both limbs; five drafting acts pending, Opus lane, under the §2 item 20
     verbatim direction).
   - **ANNOTATED, STILL OPEN:** `WS-P1` (click in progress per his word, verify from live config),
     `WS-P2` (RULED exclude — pending the click), `WS-P3` (not stored yet), `WS-P4` (deferred
     2026-08-18). All four rows exist at HEAD (entered by the sixty-first invocation).
   - **MINTED — the `T-26` row, full text verbatim per QR-1:**
     `⬜ → ✅ **T-26** — **The Group A verification looks: registry entries 2 (TRCP 192.3(h) discoverable), 12 (TRCP 215.4(b)), 13 (TRCP 191.2), 29 (HS § 481.115(b)) and 32 (CCP art. 102.073, entry 4b) — whose ROUTE-C wording Michael adopted at #95 and which executed at #98 — each need one post-execution look from Michael, the adopted entry text at HEAD read against the operative text from the named official source, so his verification can attach to text that survives (execute-then-verify, #95). Interactive: needs Michael live; no dispatch can run it. Entry 13 first (the DE-2 conference fuse's substrate).** Minted 2026-08-18 (#108) by Michael's ruling after seven consecutive runner batches flagged the row's absence — AND RUN THE SAME SESSION: entries 13, 2, 29 VERIFIED (his word, per-entry looks in the record §1); entries 12 and 32 conformed to verbatim official text at his direction instead (ROUTE-C adoptions, execute in the #108 packet, one-look verification next session). — **COMPLETED at #108; the two conformed entries' verification is the successor act.**`
8. **BUILD-STATE rewrite and TOC regeneration** per runner Step 4 — recompute every figure at HEAD.

---

## §4 — DT-1 CORRECTION (same-session; actor: Fable 5)

**What was asserted:** during the interactive puts, option labels and two chat lines displayed the
verification/ruling date as "2026-08-19," and the session's opening line said the weekly usage
reset was "yesterday afternoon."
**What is true instead:** the session ran on **Tuesday 2026-08-18, evening Central** — the
container clock (UTC) had rolled; `TZ=America/Chicago date` on both shells read `Tue Aug 18 20:48
CDT 2026`. The reset was the same afternoon. All stamps in this record and packet are 2026-08-18.
**What it corrects:** in-session display text only — caught before any artifact was stamped, so no
log entry and no file ever carried the wrong date. Recorded here rather than as a log correction
entry (the #107 same-session-correction pattern).
**Failure class:** the DT-1 evening-window UTC drift — the same window runner 60, runner 61, and
the ninth TOC edition each documented on this same calendar day.
**What changed as a result:** stamps corrected before authoring; nothing else.

**A second same-session correction (actor: Fable 5) is recorded inside §1.3/§1.5:** the first-round
divergence lists for entries 12 and 32 were incomplete when first put; PF-1 caught it; the looks
were re-put complete before any file was touched, and Michael's direction superseded the
first-round answers. Failure class: incomplete-enumeration-presented-as-complete (cf. the #103
audit's §4.7 eight-vs-nine amend-list finding).

---

## §5 — SOURCES, NAMED PER ITEM (SOURCING / Q-STAT-1)

| Item | Source | Named as |
|---|---|---|
| TRCP 191.2, 192.3(h), 215.4(b) | `Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` | clean-authority TRCP PDF (July 2026 edition); raw `pdftotext -layout`, quotes spot-checked against raw extraction |
| HS § 481.115 | `Knowledge Repo\Statutes 26-08-14\HS.pdf.zip` → `hs.481.pdf` | official bulk corpus, downloaded 2026-08-14 by Michael's hand; currency per the source's own statement (89th Leg., 2nd C.S., 2025); doubled-`A` artifact normalized in characterized contexts only |
| CCP art. 102.073 | `Knowledge Repo\Statutes 26-08-14\CR.pdf.zip` → `CR.102.pdf` | same corpus, same method; history line quoted (Acts 2015, 84th Leg., eff. 9/1/2015) |
| C-XL-1 / C-ARD-1 texts | `docs/specs/costs-and-privilege-authority-read-2026-08-18.md` §5 (candidates), §3.1/§3.3 (reads) at HEAD `3b171cd` | repo record of the #104 authority read (V-9-identified there) |
| Entry texts at HEAD | the two registry files at `3b171cd`, bridge lock-free reads | working-tree evidence only |

Retrieval is not verification. The three verifications in §1 are Michael's; nothing else in this
packet is verified by anyone.

---

## §6 — PF-1 PREFLIGHT RESULT (run completed before this file was finalized and the zip saved)

Two independent read-only adversarial agents ran against the packet's full draft plus the session's
raw source extracts and recorded picks. **Asserted defects: 21 (9 + 12, overlapping), including two
HIGH each.** All were resolved before shipping: the backlog arithmetic corrected (the draft dropped
entry F from its own five-entry count — the exact failure class the scope ruling's note warned
about); the TOC-6-violating "renumber if taken" instruction replaced with STOP-and-ask; the
incomplete 12/32 divergence enumerations RE-PUT to Michael complete (outcome at §1.3/§1.5 — his
direction superseded the first-round answers); per-entry Verified lines replacing false-for-one
boilerplate; the drafts-doc conflict rule and span-flag fallback added; the T-26 row text carried
in full per QR-1; the count-check command named in escaped form; the C-XL-1/C-ARD-1 adoption texts
supplied verbatim with §5 named authoritative; the Status-line freeze clarified (creations vs
changes) in the work order; assorted prediction-shaped sentences reworded to what was true at
authoring. Three agent findings were resolved against in-session evidence rather than edits (entry
E's Dedupe note exists; the 192.5(c)(1) heading matches verbatim; the WS-P rows exist at HEAD).
**If this section ever reads as an unfilled bracket, the run was skipped and the packet must not
execute — STOP and tell Michael.**

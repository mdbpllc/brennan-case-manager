# Record-Integrity Audit — BUILD-STATE + attorney-review-queue

**Status: PROPOSED design input — audit findings, nothing verified, nothing ruled, no file altered.**
**Canonical repo path:** `docs/specs/record-integrity-audit-2026-08-15.md`
**Session:** 2026-08-15 (Central, clock-checked 13:06 CDT — DT-1), Fable 5, Cowork design chat, device
bridge to the `mdb-pllc` checkout. Local HEAD read at `2756d9156743e665e259e8d2df0ce91e133f1cf1`
("sixty-seventh refresh, at 619d9f9", 2026-08-15 10:24 Central) — **an unfetched ref, not a QR-3 pass**;
no fetch was attempted through the bridge, per the charter and the #74 finding.
**Charter:** the 2026-08-15 Fable audit charter (pasted by Michael's hand; its own homelessness is
OPEN-4 below). Probes P1 (testing/verification claims), P2 (round-trip/status lines), P3 (absence
claims). Verdict vocabulary per the charter: SOUND · UNSUPPORTED-AS-STATED · CONFIRMED-FALSE ·
CHECKABLE-ONLY-BY · STALE · CONTRADICTED.

---

## §0 — The denominator

**65 claims examined** across the **147 non-blank lines of `BUILD-STATE.md`** (every line triaged
against the three probes; 65 claims deep-checked with a re-run, a git trace, or a session-log trace)
and the **status-and-carry layer of `attorney-review-queue.md`** (header reconciliation chain; all of
§7's key rows; the Q-STAT block; §1's residual rows; **218 glyph-marked rows counted — 65 ✅ / 153 ⬜,
raw glyph counts** — not row-by-row audited in §§2–6, see the stop line).

**Verdicts by class: 46 SOUND · 6 STALE · 1 CONFIRMED-FALSE · 1 CONTRADICTED · 11
CHECKABLE-ONLY-BY · 0 UNSUPPORTED-AS-STATED among the deep-checked set** (claims that would have
earned it resolved instead to CHECKABLE-ONLY-BY with a named checker; the record is unusually good at
stating how/who/when).

**The audit stopped at:** BUILD-STATE fully examined; queue examined at the status/carry layer for the
header, §7, Q-STAT, and §1 residuals; **queue §§2–6 row-by-row status marks NOT exhaustively
cross-checked** (spot-checks only — the sections BUILD-STATE points at were checked; ~120 of the 153
open glyphs were not individually traced). Both §10 adjudications reached (§5–§6 below). Dropped, and
said so: no row-by-row pass over queue §§2–6; no contents-read of
`outlook-edit-cancel-exercise-2026-08-13.md` (its claims were traced to the doc's existence and the
runner record, not into the doc); no src/ content reads (existence/absence greps only, scopes stated
per finding).

**Headline, sized honestly: the record is substantially sound.** Of ten findings, one is a false
count, one is a two-way version contradiction, six are one shape — self-referential lines frozen
across BUILD-STATE refreshes — and the flagship (AUD-1) is the Exhibit-B failure recurring one
version later, caught this time by exactly the kind of session that alone can see it.

---

## §1 — Findings, in RELIES-ON order

### AUD-1 — v18 IS IN FORCE; BUILD-STATE and the queue still say it awaits pasting
```
CLAIM      BUILD-STATE L140: "v18 NOW SUPERSEDES v17: drafted, delivered, YOUR HAND TO PASTE";
           L148: "ALSO YOURS: paste v18"; queue §7 (⬜, entered #77): "Paste v18 into the Claude
           project's instructions... His hand; a Code session cannot see or perform the paste."
PROBE      P2
VERDICT    STALE — superseded by the paste event. (CHECKABLE-ONLY-BY a running design session,
           which is what this is; a Code session structurally cannot see it.)
EVIDENCE   This session's own governing project instructions are headed "v18 — 2026-08-14
           (supersedes v17 of 2026-08-13...)" and carry every v18 marker: the SOURCING convention
           under Binding conventions, the two device-bridge operational notes (stage-timeout
           workaround; device_bash-cannot-delete), and the header correction that the revised v17
           was pasted. Files searched for the counter-claim: BUILD-STATE.md at HEAD (L140, L148),
           attorney-review-queue.md at HEAD (the #77 paste-v18 row, still ⬜).
ORIGIN     #77 / thirty-first invocation (2026-08-14) wrote the line correctly for that moment;
           the 67th refresh (2026-08-15 10:24) carried it forward. The paste cannot be dated from
           here — the line may have been true at 10:24 this morning.
RELIES-ON  Every session's start-of-session behavior; the your-hand list; GL-1 floor item 5
           (the gates re-check runs against "instructions vX" — see AUD-2). This is the exact
           Exhibit-B / R-3 shape, recurring one instruction-version later.
DISPOSITION  PROPOSED: clear the queue row and rewrite L140/L148 at the next refresh, sourced to
           this audit. Pattern fix at §4-P2. Michael confirms the paste date if he wants it dated.
```

### AUD-2 — GL-1 floor item 5 names three different instruction versions across the record
```
CLAIM      Go_Live_Gates.md GL-1 (canonical, RULED 08-11): "(5) the gates re-check session and
           instructions v15 per trigger 1." BUILD-STATE L20: "(5) gates re-check session +
           instructions v17." BUILD-STATE L147: "gates re-check + v17." Instructions in force: v18.
PROBE      P2
VERDICT    CONTRADICTED — two places in the record disagree (v15 vs v17), and both trail the fact
           (v18). Not picking a winner: the gates doc is canonical-and-frozen (append-don't-rewrite),
           BUILD-STATE is later but silently modernized without a note. Michael's wording act.
EVIDENCE   Files searched: docs/specs/Go_Live_Gates.md (GL-1 section read in full, lines 75–87);
           BUILD-STATE.md L16–20, L147; this session's instructions header. Pattern: "instructions v".
ORIGIN     GL-1 as ruled 08-11 (v15 was current); BUILD-STATE's v17 form untraced to a ruling.
RELIES-ON  THE LAUNCH PATH — item 5 is a go-live gate. As written, a literal execution of GL-1
           re-checks against v15, a two-versions-dead text.
DISPOSITION  PROPOSED: Michael appends a one-line clarification to GL-1 (append, not rewrite)
           reading item 5 as "the instructions current at the re-check, per trigger 1" — or rules
           that BUILD-STATE's silent modernization is the intended reading. Needs Michael.
```

### AUD-3 — "TWENTY VERIFIED" is a false count: the file carries 22 VERIFIED entries, ruled as 13 + 7
```
CLAIM      BUILD-STATE L123: "TWENTY VERIFIED (Michael) in legal-rule-registry-discovery-and-
           carrier-duties.md". The file's own header: "ALL TWENTY PROPOSITIONS VERIFIED — Michael
           Brennan (thirteen on 2026-08-11... seven more on 2026-08-12...)".
PROBE      P1
VERDICT    CONFIRMED-FALSE as a count. The verification SUBSTANCE traces; the arithmetic does not,
           and a wording-attachment question falls out of it that is Michael's.
EVIDENCE   Files searched, patterns stated: legal-rule-registry-discovery-and-carrier-duties.md at
           HEAD — grep '^## ' → 22 entry headings (batch items 1–15 + 2026-08-12 batch items 1–7);
           grep 'Status:** VERIFIED' → 22 status lines (15 dated 08-11, 7 dated 08-12). Git trace:
           at the file's CREATION (tenth invocation, 157e792) the header read "ALL THIRTEEN" over a
           body already carrying 15 VERIFIED entries; the eleventh invocation (c38c61b) added 7 and
           wrote "ALL TWENTY (thirteen + seven)". Origin of the gap: session-log #48 RULING 3
           verified "all thirteen §4 propositions" of the trucking REQ-CAPTURE; that §4 has 13
           BULLETS, one of which — "TRCP 197.2(a), 196.2, 198.2 — 30-day response period..." —
           covers THREE rules and became THREE registry entries. 13 ruled bullets → 15 entries;
           13+7=20 stated; 15+7=22 on disk. The discrepancy survived ~12 subsequent touches of the
           file, including the twenty-first-invocation count-correction pass that recounted the
           SIBLING file, and the #68 status-drift sweep.
ORIGIN     Tenth invocation (file creation); the ruling is #48 (2026-08-11, design session, Fable 5).
RELIES-ON  Registry discipline — this is the project's only mass of VERIFIED law. Also every
           future count reconciliation, and Q-STAT-2's unit question, which this sharpens.
FAILURE-CLASS  Unit mismatch: bullets vs entries vs propositions — same class as the "~26 vs 27"
           correction (twenty-first invocation) and the V-5 two-case-entry split. See §4-P3.
NOT-OVER-CORRECTED  All 22 entries' subject matter sits inside the 13 ruled bullets plus the 7
           entry-by-entry 08-12 rulings; no entry's substance is unruled. What Michael must decide:
           whether verification of ONE combined bullet's wording extends to THREE separately-worded
           entries ("verification attaches to wording" — the split wordings are the transcriber's),
           and what the true stated count should be (22 entries / 20 ruled units, units named).
DISPOSITION  Needs Michael. No registry file touched by this audit.
```

### AUD-4 — The Probate Corpus.zip location line cannot be squared with this machine's empty inbox without knowing which machine this is
```
CLAIM      BUILD-STATE L152: "Probate Corpus.zip sits untouched in the P15's gitignored inbox/."
PROBE      P2/P3
VERDICT    CHECKABLE-ONLY-BY: Michael — one word ("is mdb-pllc the P15?") settles it.
EVIDENCE   Files searched: inbox/ of the mdb-pllc checkout at HEAD → EMPTY (consistent with the
           thirty-third invocation's "inbox/ is empty again", which also reported ONE zip processed,
           not two). If mdb-pllc is the P15, the line is false and the zip's whereabouts are
           unknown; if mdb-pllc is the other machine, the line is unverifiable from here and stands.
ORIGIN     ~2026-08-08 (CORPUS-HOME closure era); carried since.
RELIES-ON  CORPUS-HOME — a 1.8 MB licensed corpus whose Part III is privileged client matter, whose
           ruled upload (to ARCHIVE, Michael's hand) has not happened. If the parked copy is gone,
           the corpus survives only wherever else Michael holds it.
HAZARD     Flagged, not resolved: parking a NON-packet zip in the packet inbox exposes it to a
           process whose contract is "the runner collects zips" and "processed packets are deleted."
           The runner's manifest checks likely refuse it, but the parking spot is adversarial to
           the artifact. A gitignored path OUTSIDE inbox/ would carry no such exposure.
DISPOSITION  Needs Michael: confirm machine identity and the zip's presence; consider re-parking
           outside inbox/.
```

### AUD-5 — The v7-gate pass count froze at "four times" three passes ago
```
CLAIM      BUILD-STATE L153: "The v7 gate has now passed on its own terms four times — #68, #72,
           #74, and this batch."
PROBE      P2
VERDICT    STALE — superseded by the thirty-first, thirty-second, and thirty-third runner lines,
           which count "the fifth / sixth / seventh pass on its own terms" respectively.
EVIDENCE   Files searched: session-log.md top entries at HEAD (quoted counts); git show of
           BUILD-STATE at 02aec08 (64th refresh) and e3c459c (66th) — the phrase is VERBATIM
           IDENTICAL in both and at HEAD (67th). True when written at the 64th (passes at #68,
           #72, #74, #76); copy-forwarded unchanged through three refreshes, each of which was
           itself a pass.
ORIGIN     64th refresh (thirtieth invocation, 2026-08-14).
RELIES-ON  Nothing operational — the gate itself runs fine; the counter is display. Pattern weight
           only (§4-P1).
DISPOSITION  PROPOSED: correct to seven (or drop the count and keep the enumeration open-ended)
           at the next refresh.
```

### AUD-6 — "the two refreshes since" is a self-referential counter that has read "two" across four refreshes
```
CLAIM      BUILD-STATE L94–95: "Health last measured at #68: 278 tests pass (23 files), build +
           lint clean; the two refreshes since, this one included, changed DOCS ONLY."
PROBE      P2 (P1 for the underlying health figures)
VERDICT    STALE for the counter; the CONCLUSION SURVIVES — stated separately per the charter.
EVIDENCE   Git show at 02aec08 and e3c459c plus HEAD: the phrase is verbatim-frozen since the 64th
           refresh. A "since, this one included" count cannot be constant across four refreshes.
           The conclusion holds independently: every intervening batch's runner line reports
           docs-only (§5 NONE, "nothing built"), so the docs-only chain from the measurement to
           HEAD is intact and the 278-tests figure is as current as L94 implies. The figures
           themselves trace: "23 test files, 278 tests passed, exit 0" with the command named
           (npm test) at session-log L1287, re-affirmed at L1355, and defended in a prior
           correction (L1389) — a P1 claim done right.
ORIGIN     64th refresh.
RELIES-ON  The health line is the design side's only signal that the build isn't rotting.
DISPOSITION  PROPOSED: replace the relative count with an absolute anchor ("docs-only from the
           measurement through this refresh") so the line can never silently age. §4-P1.
```

### AUD-7 — The unreviewed-entries list stops at #76 in a refresh whose own batch wrote #77-era corrections
```
CLAIM      BUILD-STATE L156: "Still UNREVIEWED: ... and now #72–#76"
PROBE      P2
VERDICT    STALE — superseded by the thirty-third invocation's own round-trip line: "Awaiting/
           Returned from Code, unreviewed: #75, #76, #77, #78 and the four runner lines."
EVIDENCE   Both documents at HEAD, quoted; same batch authored both.
ORIGIN     Frozen at the 64th/65th refresh era; carried.
RELIES-ON  Start-of-session rule 5 (round-trip lines are copy-forward-prone — this is that, in the
           file that warns about it).
DISPOSITION  PROPOSED: correct to #72–#78 at next refresh.
```

### AUD-8 — "reconciled through #76" vs the queue's own header, which says #78
```
CLAIM      BUILD-STATE L157: "Everything awaiting your ruling is in attorney-review-queue.md —
           reconciled through #76."
PROBE      P2
VERDICT    STALE — the queue header at HEAD ends "...Reconciled again to session-log #78 on
           2026-08-15", and the #77/#78 queue edits (Q-STAT-1 closed; Q-STAT-2/5 annotated) are
           present in the file. The batch that made those edits wrote the "#76" line.
EVIDENCE   attorney-review-queue.md header (reconciliation chain read in full); BUILD-STATE L157.
ORIGIN     65th refresh era; carried twice.
RELIES-ON  The pointer BUILD-STATE itself says must not lie ("keep it current or the pointer lies").
DISPOSITION  PROPOSED: correct to #78 at next refresh.
```

### AUD-9 — The statute-pass line count predates the same batch's own edit to that file
```
CLAIM      BUILD-STATE L128: "statute-pass-registry-retrieval-2026-08-14.md (574 non-blank...)"
PROBE      P1 (a measured figure)
VERDICT    STALE — 583 non-blank at HEAD. 574 was exactly right at the 66th refresh (re-run against
           git show e3c459c: 574); the thirty-third invocation's #78 corrections edited that file
           (+18/−5 per the diffstat) and the 67th refresh kept the old figure.
EVIDENCE   grep -cv '^[[:space:]]*$' at HEAD → 583; same command against the e3c459c blob → 574;
           git diff e3c459c 619d9f9 --stat.
ORIGIN     Figure first stated at the 64th refresh; falsified by its own batch at the 67th.
RELIES-ON  Nothing operational; the non-blank convention's credibility (it was ruled after
           ambiguity "bit twice in one day" — a wrong figure under the convention is worse than
           none). §4-P1.
DISPOSITION  PROPOSED: 583, or drop the count.
```

### AUD-10 — Absence claims: all re-run, all held, scopes and patterns stated
```
CLAIM      (a) BUILD-STATE L44/L92–94: case_links does not exist; no case-event/CE table, no
           time_entries, no claims; nothing for the DE series; nothing for a deadline engine.
           (b) L90: 36 tables in schema.sql. (c) L127: chs. 541/542 and "prompt pay" absent from
           all four registry files; ENTRY 8 (ch. 1467) present in the fourth. (d) L135 / queue
           DL-memo Q3: no TRCP 21a registry entry exists anywhere. (e) L142: docs/prompts/ holds
           only QUEUE-RUNNER, the CD-1 and FE-D1 kickoffs, and the CL2 protocol. (f) L146: six
           REQ-CAPTURE files.
PROBE      P3
VERDICT    SOUND — every re-run agrees.
EVIDENCE   (a) grep -in 'case_links|time_entries|case_event|response_set|response_item|escalation'
           across db/schema.sql, db/migrations/*.sql, supabase/*.sql → only comments saying
           not-built. (b) grep -ci 'create table' db/schema.sql → 36. (c) re-run at HEAD, patterns
           '54[12]\.[0-9]|chapter 54[12]|ch\.? ?54[12]', 'prompt.?pay', 'insurance code|tex\.?
           ?ins\.|ins\.? code' across all four legal-rule-registry-*.md, named individually → 0/0/0
           everywhere except ins=3 in draft-entries-medical-billing — matching #78 and the
           thirty-third runner line exactly. (d) grep -in '21a' across the four registry files → 0;
           grep -ril '21a' src/ (recursive, dir listing confirmed non-empty first — the Exhibit-C
           trap checked) → one incidental fixture hit (src/statutes/fixtures/toc/TN.json), not a
           registry entry; supabase/ → 0. (e) ls docs/prompts/ → exactly the four named files.
           (f) ls docs/specs/REQ-CAPTURE_* → exactly six.
ORIGIN     Various; all as stated in their lines.
RELIES-ON  (a) gates the DE/deadline design honesty; (c) gates Q-STAT-5; (d) gates DL-memo Q3.
DISPOSITION  None needed.
```

---

## §2 — SOUND, the rest of the list (counts toward the denominator; abbreviated per charter)

Each verified this session, method in parentheses; files by name, at HEAD via the bridge:

1. BUILD-STATE is 147 non-blank, under its 150 cap (grep -cv blank).
2. Header self-description — snapshot at 619d9f9, refresh rides later commits (git log: 2756d91 → 619d9f9).
3. QR-2 pointer discipline is REAL: `.claude/commands/queue-runner.md` is a 12-raw-line pointer refusing reconstruction; `docs/prompts/QUEUE-RUNNER.md` is the only full copy found in-repo (grep -rl 'QUEUE-RUNNER' *.md — all other hits are references, not copies). The P15 user-level copy is out of reach (listed §3).
4. `db/migrations/2026-08-12-cd1-contact-directory.sql` exists — launch-path item 1's object is real (ls).
5. GL-1 exists in Go_Live_Gates.md as ruled; gate 2's 08-11 clarification is an APPEND with original text standing; the GH-1 tripwire pointer sits beneath it; gate 9 appended 07-28 (read in place).
6. Anti-resurrection ledger exists with its stated purpose line (head).
7. `docs/skills/drafting-disclosures/SKILL.md` is v2, 2026-08-11, with the Code-must-not-edit note (head).
8. `docs/spec-feedback.md` exists (L45's pointer); `docs/reference/CR3-code-sheet-2023.pdf` exists (ls).
9. inbox/ empty, matching "inbox/ is empty again" (ls).
10. Knowledge Repo: `Civil\texas-rules-of-civil-procedure July 2026.pdf` exists — the deadline memo's named clean-authority source is real (ls). TRE and TRAP PDFs also present.
11. `Statutes 26-08-14\_claude_extract\` still exists (hs.481.pdf inside) — the delete-me your-hand item is genuinely open, not copy-forward (ls).
12. Statute-pass doc structure is as described: §3 normalizer correction, §8 open questions, §9 PROPOSED wording for four entries only, §10 self-verification of its own quotations, §11 what-it-does-not-do (grep '^## ').
13. Deadline memo is exactly 298 non-blank (grep -cv blank) — the one stated count that was RIGHT at HEAD.
14. Enforcement registry file: 27 Status: UNVERIFIED lines, header ALL TWENTY-SEVEN (grep|uniq -c).
15. Criminal registry file: header ALL SEVEN UNVERIFIED, 4a/4b split present, entries 3 and 4a cite-less as stated (head + grep).
16. Backlog arithmetic 34 = 27 + 7 consistent across BUILD-STATE, queue rows, and both file headers.
17. Queue header's reconciliation chain runs unbroken #28 → #78 with per-event content (read in full).
18. Q-STAT-1 closed ADOPT-AS-DRAFTED with the original question preserved verbatim per QR-1 (read).
19. Q-STAT-2 and Q-STAT-5 annotated 08-15 (#78), NOT answered, exactly as the runner line claims (read).
20. Route-(c) row exists, open, correctly recorded as a one-off held for the Fable review pass (read).
21. Meter row closed as a timestamped snapshot with the 3:59-vs-4:00 flag preserved (read).
22. HK-7 open, satisfied-for-one-session twice, deliberately not closed (read) — and re-proved by this session: the grants had to be re-asked today.
23. KICK-1, Q-3 (+ paired docs/templates re-check), SK-v2 (remaining = claude.ai upload), OBS-1, ID-DL-1, and the five DL-memo questions: all present, open, full text per QR-1 (read).
24. CD-1 origin traces to #61 with the honest six-of-seven and unrun-migration language intact (log header read).
25. CL-2 built/migrated/walked traces to #29 (Code session) with Michael's end-to-end walk named — how/who/when all present (log header + entry text).
26. FE-D1 authorization traces to #63; both kickoff prompts exist in docs/prompts/ (log + ls).
27. #65 (full-text design-side verification of #62–#64), #66 (telemetry self-check), #68 (sweeps + health run), #73 (V-4–V-8), #74 (CD-2, with its honest src-not-read gap), #75–#78: all headers located and consistent with BUILD-STATE's citations (grep for entry headers).
28. The 278-tests health figure carries command, count, and exit code at its origin (log L1287).
29. "Insurance narrowed here (#78)" matches #78 and the thirty-third runner line word for word on scope, and both state their search corpus — the method note born of Exhibit C is being followed (read).
30. RETRIEVAL: NOT RUN rows live in the workbook/queue layer, not the registry files, so "no registry file altered" and "all 21 retrieved" coexist consistently (grep -rl across docs/).
31–46. The remaining triaged BUILD-STATE lines whose claims are pointers to docs verified present
(fe-d1-build-slice, cd1-build-slice, cd2-role-mining-pass, contact-directory, the five registry-support
docs, email-workflow-requirements, model-routing-plan, phase0-standup, gpu-telemetry recipe pointer,
outlook-edit-cancel exercise doc, cr3-field-code-map, archive-project-history-by-day, and the six
REQ-CAPTURE files) — existence and title checked, contents not audited (ls docs/specs, docs/prompts).

---

## §3 — What this audit could not check, and who can

- **Michael, one word each:** whether mdb-pllc is the P15 or the P1 (AUD-4 turns on it); the paste
  date of v18 (AUD-1, if he wants it dated).
- **Michael, on this machine or the other:** live database at 34 tables; CD-1 migration still unrun;
  `..\data\pfs\` on the other machine; the P15 user-level runner-copy deletion; Q-3 / docs-templates
  sync-picker states; SK-v2's claude.ai upload state; KICK-1's whereabouts; the 13 recordings.
  *(Corroboration only, scope stated: the desktop app's own home-directory listing for mdb-pllc shows
  no `data` folder under C:\Users\Brennan — consistent with L52's "DOES NOT EXIST here." A names-only
  listing is not a search and is not offered as one.)*
- **Michael, on the GPU machine:** telemetry lockdown variables (L53's "closes only when he reports
  verification 3 passed" is the right shape — it names its closer).
- **A Code session (src reads):** "Demo mode runs the same backfill" (L37); "showsMedicalTab() is the
  one enforcement point" (L68); probe-covers-36-tables (L102); store v11 chain (L88). Each is a
  one-grep check for the next Code session; none was contradicted by anything read here.
- **Nobody, until it happens:** "NO REAL CLIENT DATA HAS EVER ENTERED THE APP" (L105) — an
  ever-green absence claim only Michael's own discipline maintains; nothing here casts doubt on it.

## §4 — Patterns across findings (worth more than the findings)

**P1 — FROZEN TAIL: BUILD-STATE's full-rewrite discipline is not re-deriving self-referential
lines.** AUD-5, -6, -7, -8, -9 are one defect in five costumes: a line whose truth depends on the
refresh count itself (passes-so-far, refreshes-since, reviewed-through, reconciled-through, a line
count of a file the same batch edited) freezes at authoring and rides the "full rewrite" forward as a
copy. All five froze at or near the 64th refresh. The rewrite-in-full rule prevents APPEND drift; it
does not force RE-DERIVATION. PROPOSED (not ruled): the refresh step in QUEUE-RUNNER gains a short
list of lines that must be recomputed every refresh — anything with a count of refreshes/passes/
entries, and any stated line count of a file the batch touched. Alternatively: prefer absolute
anchors over relative counts everywhere in BUILD-STATE ("measured at #68" is stable; "two refreshes
since" ages by construction).

**P2 — DESIGN-SIDE-ONLY FACTS need a design-side check ritual.** AUD-1 is Exhibit B recurring at the
very next opportunity, which settles that it is structural, not a one-off lapse: a Code session
cannot see the Claude-project instructions, so any BUILD-STATE line about them can only rot until a
design session looks. PROPOSED (not ruled): add to the design-side start-of-session steps: "compare
BUILD-STATE's instructions-version line to the version header you are actually running under; if they
disagree, flag it that session." Zero cost, and it would have caught BOTH instances on day one.

**P3 — COUNTS WITHOUT UNITS.** AUD-3's 13-bullets→15-entries, the prior "~26 vs 27" correction
(which diagnosed itself as bullet-lines-before-dedupe), V-5's two-case entries, and Q-STAT-2's
entries-vs-propositions observation are the same class: the registry layer has at least three
counting units (capture bullets, entry headings, propositions) and counts migrate between documents
without their units. PROPOSED (not ruled): counts in registry headers and BUILD-STATE name their unit
("22 entry headings; 20 ruled units").

**Also observed, below finding threshold:** queue §3–§5 section headers still carry "(none touched
today)" language frozen from the 2026-07-26 compile — dated-but-harmless; and BUILD-STATE L142 says
CHAT-DISPATCH survived "four sessions" on the clipboard where the charter says five — the charter is
not audited corpus, so recorded here as an observation only.

---

## §5 — ADJUDICATION 1 (recommendation only; the ruling is Michael's)

**Route (c) as standing law, or one-off? RECOMMEND: keep it a one-off; re-rule per pass.**

Reasons, from the audit's own evidence. First, the flags-without-drafts mechanism is not showing rot:
the three wording expansions in the carrier file have sat FLAGGED, NOT ADOPTED since 2026-08-12
without corrupting anything, and Q-STAT-6's fourteen flags are one day old — there is no evidence yet
that flags rot, so the re-derivation cost that would justify a standing rule is still speculative.
Second, AUD-3 cuts the other way with some force: it shows proposition wording drifting at the
TRANSCRIPTION layer (one verified bullet silently became three separately-worded VERIFIED entries)
even with NO license to draft — the discipline that wording acts are Michael's alone is currently the
project's weakest-enforced strong rule, and a standing drafting license would widen exactly the
surface that just failed. Third, the one-off worked: §9 wording exists, is adopted for nothing, and
sat quietly — the safest-option reasoning from 08-14 is holding. If Michael wants a middle path: a
standing rule that codifies ONLY what the one-off did — material divergence only, side-by-side
quotation required, output lives in the pass document, never a registry file, ADOPTED FOR NONE until
his verification — adds convenience without new surface. But the recommendation is the narrow one:
re-rule per pass, revisit if a future pass shows a flag actually rotting.

## §6 — ADJUDICATION 2 (recommendation only)

**Q-STAT-3 — annotate the known-wrong capture, or leave it? RECOMMEND: ANNOTATE §2 (and the §3
agent-sourced Insurance observation) as superseded, original text preserved beneath.**

Reasons. The append-only instinct protects the LOG; the project's own correction-entry rule already
takes the corrected-in-place branch for non-log documents, and a capture is not the log. The live
failure mode is not hypothetical in this project: two published normalizers were wrong, both
silently, and the second was written to fix the first — a future session that RAG-hits the capture's
§2 and not the repo correction corrupts a quotation of primary law with no visible seam. The house
pattern for this already exists and preserves the record: the Q-STAT-1 queue row carries the ruling
above and the original question verbatim below. Same shape here. PROPOSED banner text (Michael rules;
a design session executes): *"⚠ SUPERSEDED 2026-08-14 — the normalizer below is WRONG in both
directions (eats letters in all-caps headings; misses the commonest artifact form). Corrected
characterization and normalizer: `docs/specs/statute-pass-registry-retrieval-2026-08-14.md` §3;
correction entries: session-log #76 and #78. §3's Insurance observation below is likewise superseded
— see #78. Original text preserved unchanged below."* The same ruling should be recorded as governing
both halves of the capture, per the question's own note.

---

## §7 — Open questions for Michael (full text, per QR-1)

- **OPEN-1 (from AUD-2):** GL-1 item 5 reads "instructions v15" in the canonical gates doc, "v17" in
  BUILD-STATE, and v18 is in force. Do you append a one-line clarification to GL-1 reading item 5 as
  "the instructions current at the re-check, per trigger 1," or rule that the gates doc's frozen
  version number is fine because trigger 1 governs anyway?
- **OPEN-2 (from AUD-3):** The carrier-duties file carries 22 VERIFIED entry headings deriving from
  13 ruled capture bullets plus 7 entry-by-entry rulings. (a) Does verification of the combined
  bullet "TRCP 197.2(a), 196.2, 198.2 — 30-day response period..." extend to the three separately-
  worded entries it became? (b) What should the header's count say — "22 entries (20 ruled units:
  13 bullets + 7 entries)" or a re-ruling that makes it 22 everywhere? Wording and count are yours;
  nothing was touched.
- **OPEN-3 (from AUD-4):** Is mdb-pllc the P15 or the P1? If the P15: where is Probate Corpus.zip,
  and do you want it re-parked outside the packet inbox either way?
- **OPEN-4 (§12 of the charter, raised not decided):** This audit's charter and CHAT-DISPATCH are
  design-chat prompts with no durable home; Q-2 makes docs/prompts/ canonical only for prompts
  executed by a CODE session. Does Q-2 extend to cross-interface prompts executed by DESIGN chats
  (docs/prompts/ with an "executed by: design chat" line), or does a parallel home belong somewhere
  else? CHAT-DISPATCH's loss would make Tasks 7–19 unrecoverable except by re-derivation; it has now
  survived five sessions on the clipboard.
- **OPEN-5 (from §4-P1/P2, only if you want the fixes standing):** Do you want (a) the refresh
  recompute-list added to QUEUE-RUNNER's BUILD-STATE step, and (b) the instructions-version
  comparison added to the design-side start-of-session steps? Both are one-line convention changes;
  neither is adopted by this audit.

## §8 — RR-1 and self-application

No rulings were made by Michael during this session (it ran unattended after the charter paste), so
the RR-1 re-read reduces to consistency: this document was re-read against the charter and against
every command output before packaging. Every finding above names its files and patterns; every re-run
either agreed with the record or produced a finding. The QR-3 gate was not run through the bridge;
the HEAD used is recorded as unfetched at the top. Line counts herein are non-blank unless labeled
raw. Nothing verified, nothing ruled, no repo or registry file altered, no project-knowledge file
altered; the only artifacts are this document (packet-routed) and the session capture.

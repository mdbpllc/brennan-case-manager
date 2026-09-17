# SESSION LOG — HEAD

> **DERIVED. REGENERATED IN FULL EVERY QUEUE-RUNNER BATCH, NEVER APPENDED TO.** The live log at `docs/record/session-log.md` is AUTHORITATIVE in every disagreement with this file. An entry written HERE and nowhere else is destroyed at the next batch.
> **CITE THIS FILE BY HEADING OR BY QUOTED SENTENCE, NEVER BY LINE NUMBER** (CITE-STABILITY, ruled 2026-08-16): it is rewritten wholesale, so every line number in it moves.
> **THIS IS THE ONLY PART OF THE SESSION-LOG RECORD THAT REACHES THE DESIGN SIDE.** Everything behind it is bridge-only — see §3.

**Generated:** 2026-09-16 Central (DT-1), over the log **as it stands at this commit** and riding the **same commit** as the entries it derives from. Read FROM commit `5579ab1`; written by the QUEUE-RUNNER's NINETY-EIGHTH invocation (batch 98), a docs-only batch.

**THE RULE THAT PRODUCED §1, STATED IN FULL SO YOU CAN CHECK IT (`TC-2`):** parse the live log into entries on its `## ` headings; identify design entries by the `(#nn)` token in the heading (`TOC-6` — the `#nn` series is design-only, runner batches carry runner ordinals, and other Code entries are unnumbered); take the **fourth most recent** design `#nn` entry and **every entry above it in the log**, in log order, newest first; copy them **byte-for-byte**, whole entries only — never truncated, never paraphrased, never summarised. Interleaved runner lines and unnumbered Code entries come with them, because they are what say *what landed*.

**This edition:** §1 carries **5 entries**, reaching back to design **`#156`**; §2 indexes **all 191 entries** in the live log (design 93 / runner 76 / code 22), high-water design **`#157`**. ⛔ **THE 200,000-BYTE CEILING BOUND, AND THE SHORTFALL IS NAMED (`TC-12`, spec §3.5).** The `TC-2` rule selected **9 entries** reaching back to design **`#154`**; assembled whole, this file would have measured **287,953 B**, so the **4 oldest whole entries were dropped from §1** — never truncated, and §2 and §3 were not cut. **§1 now reaches back to design `#156`** (its oldest entry of any kind is the 2026-09-12 CODE entry). Everything dropped is whole in `docs/record/session-log.md`, which is bridge-only and the authority, and §2 below still lists every entry.

---

## §1 HEAD ENTRIES — VERBATIM, NEWEST FIRST

## 2026-09-16 — QUEUE-RUNNER batch (runner line; NINETY-EIGHTH invocation) — one docs-only packet: the Dorsaneo assessment pass (`#157`), executed whole — five EVIDENCE files placed; five ⬜ rows born under a new section Michael placed, four of them overlapping rows already open, three of which the packet never names, cross-linked both ways on his in-session ruling; and a docs-only BUILD-STATE refresh that takes `v33`'s in-force status from `#157`'s filed ledger

- **THE QUEUE HELD ONE PACKET AND IT RAN WHOLE, IN THE ORDER MICHAEL CONFIRMED.** `push-to-code_dorsaneo-assessment-pass_2026-09-13.zip` — 57,994 B, mtime 2026-09-16 09:18:08 −0500, sha256 `899e2a6209075d37914c50fc6374fa6fa603bbbe577d7c33e72fa43774ef5103`, pinned at Step 1 (`QR-6(c)`) and re-checked unchanged before placement; `unzip -t` clean. One packet, so filename-date and pure-mtime order agree trivially; Michael answered the Step 1 STOP *"Confirmed."*, and `MM-1` — which the repo cannot answer — by his pick *"No other runner (Recommended)"*. **Nothing superseded, nothing skipped as already built:** `docs/record/dorsaneo-pass-2026-09-13/` was absent from the working tree, from HEAD and from `origin/master` (`git ls-tree -r`), no commit on any ref had touched it (`git log --all -- <path>`, a path-based read), `(#157)` had 0 heading hits in the log and 0 tracked files by `git grep` — pending in both of `QR-5`'s senses. **DT-1:** this line carries the run date, 2026-09-16, read from the Central wall clock at 19:47 CDT through `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId`, with UTC already 2026-09-17; `#157` keeps its 2026-09-13 stamp and its own FILING NOTE.
- **STEP 0 GATE CLEAN, ON EVIDENCE THAT COULD HAVE DISCONFIRMED IT (`QR-6(a)`).** On `master`; after `git fetch origin` (exit 0), `git ls-remote origin refs/heads/master` returned `5579ab1f2f3ec592436efd739d1e0743b113342c`, equal to HEAD, and `git rev-list --left-right --count HEAD...origin/master` returned `0 0`. **That gate ran at 09:27 CDT, when the session opened, and the Step 1 STOP then lasted until Michael's *"Confirmed."* at 19:39 CDT — so the packet's identity was re-checked after it (above), and origin was re-read live before this commit, at 21:52 CDT: `git ls-remote origin refs/heads/master` returned the same `5579ab1f2f3ec592436efd739d1e0743b113342c`, still equal to HEAD.** No tracked file was modified. The untracked paths are Michael's and nothing was done to them: `Claude outputs/` (fourteen files) and the two 2026-08-24 files. Step 0's setup held: `inbox/` in `.gitignore`, `Bash(rm -f inbox/*)` in the machine-local allowlist, the live log at `docs/record/`, no `docs/specs/session-log.md`.
- **THE MANIFEST DEPARTS FROM THE §0–§8 SHAPE, AND NOTHING WAS LOST BY IT.** It carries §1–§6 only: no §0, no §7 open-items table (its five open questions are §4's register rows, merged here as §7 would be), and its DO-NOT list lives in `claude_Handoff_Session_Log_2026-09-13.md`, not the manifest — read there and honoured whole. **`CAP-2` held:** every file-placing row carries its CLASS, all five `EVIDENCE`, all five under `docs/record/` and none in `docs/specs/`; the edit rows carry `—`; there is no `RETIRE` row.
- **FIVE `EVIDENCE` FILES PLACED IN THE NEW `docs/record/dorsaneo-pass-2026-09-13/`, EACH sha256-MATCHED TO ITS STAGED COPY AFTER PLACEMENT.** The packet ships no `CHECKSUMS.txt`, so the check was placed-against-unzipped, one for one: the assessment (38,866 B), the export inventory-and-gaps note (10,453 B), the chapter inventory (15,552 B), the ledger (9,260 B) and the capture (15,394 B, `cmp`-identical to the packet's root copy of the project-knowledge capture). All five LF, 0 CR. **All five were read before placement:** synthesis and short attributed quotation, TRCP text quoted by rule, no client data; the per-chapter extracts zip the assessment cites sits on Michael's machine and was neither opened nor searched for (HK-5).
- **EVERY §1 FACT RE-CHECKED AT THIS HEAD, NOT CARRIED — ONE DETAIL DID NOT HOLD EXACTLY.** Held: the skeleton's three §5 rows and its footnote, verbatim; `196.7` 0 occurrences there (`grep -c`); the 190.3(b)(3) entry's *"each party to 25 interrogatories"* under *"VERIFIED — Michael Brennan, 2026-08-11"*; the TRCP 194 entry VERIFIED 2026-08-12, scope ruled whole at `#108`, no timing; `P-2`'s *"only to mail"* in the deadline memo and the spec; DWOP once in `case-heartbeat-design.md`, in the row reading *"not designed here"*; 74 `**Status:**` lines across the four registry files (40 / 7 / 22 / 5); the FE-5 spec's *"Genuinely absent from all four files"*; the head file's banner as the handoff describes it. **Did not hold exactly:** row 4 says the 194 entry's prose *"twice"* calls its list *"the four-category working list"* — that phrase occurs once, with *"four-category wording"* once more and *"four-category disclosure-mining practice"* once. Nothing depended on it; the row is placed verbatim, and its runner note now records the count (FINDING 1).
- **FINDING 1 — FOUR OF THE FIVE ROWS OVERLAP ROWS ALREADY OPEN IN THE REGISTER, AND THE PACKET AND THE ASSESSMENT NAME ONLY ONE OF THEM.** `[DL-memo Q1]` (entered 2026-08-14 from `#75`'s memo) already reads the same four Family-Code provisions, 196.7(c)(1) among them, and asks whether the three skeleton rows are edited to match — row 1 adds the fourth skeleton row, for 196.7(c)(1), and a proposal to strike and invert the footnote whose inverted relationship `[DL-memo Q1]` already describes. `[DL-memo Q3]` already states that only mail moves a deadline under 21a(c) and that commercial delivery is deposit-complete but gets no added days — row 2's reading. `Q-FE5-9` flags row 3's divergence and proposes no wording — and it is the one the packet names (row 3: *"This closes `Q-FE5-9`."*), as the assessment's §3.3 does; §3's `TRCP 194.2(a)` anchor row asks after row 4's anchor. The design side's duplicate-routing check tested PATHS; nothing tested the other three ROWS. **Put to Michael with four options; his pick, *"All five, cross-link both ways (Recommended)"*:** the five rows placed verbatim, each overlapping row carrying a bracketed runner note naming its older twin, and the four older rows annotated add-only pointing back. **Nothing closed, merged or ruled.** **The question put to him carried an overstatement of its own** — that the packet mentions none of the four; pass one caught it, it was corrected to him in session before anything was committed, and his ruling stands on its substance. **Three things that ruling did not reach went back to him — pass one found two: row 4 bears on three more open rows (the residual V2 sub-row under §2, `[DL-memo Q2]`, `[DL-memo Q4]`), and row 2 quotes a BUILD-STATE sentence this batch superseded (FINDING 4); and it found that row 4's *"twice"*, which this line's §1 re-check had already caught, sat unflagged on the synced row. His pick, *"Notes on the new rows only (Recommended)"*, put all three into runner notes on rows 2 and 4 and annotated no further older row.** Whether a design-side packet should test its rows against the register as well as its paths is a convention question, and his.
- **FINDING 2 — THE PACKET NAMED NO SECTION FOR THE ROWS, AND MICHAEL PLACED THEM.** His pick, *"New section, after API INTEGRATIONS (Recommended)"*: a `DORSANEO ASSESSMENT PASS` heading with a runner-authored intro, directly before *Process, tooling, and housekeeping*, as the FIRM OBLIGATIONS and API INTEGRATIONS sections were added; the heading takes those sections' long form rather than the option's short label.
- **THE THREE `CAP-3` ACTS.** (i) ROWS — the heading, its intro and five ⬜ rows BORN, the question text extracted from the manifest's §4 by program and placed verbatim except that its numbered `N. **⬜ ` became the register's leading `- ⬜ **`, so the house method counts them; five runner notes on four of the new rows (row 2 carries two); four add-only notes on `[DL-memo Q1]`, `[DL-memo Q3]`, `Q-FE5-9` and §3's `TRCP 194.2(a)` row, each confirmed a single physical line with a new row after it before the append. (ii) The `#157` sentence written into the Status paragraph with the run date, and the superseded `#156` sentence — extracted by a balanced-parenthesis match, 814 B — APPENDED verbatim at the end of RECONCILE HISTORY. (iii) MOVES: none, because no row flipped ✅. **A line-opcode check returned exactly that:** the register — the Status line rewritten from its reconcile sentence onward, four lines append-only, ten lines inserted; the closed register — two lines inserted and nothing else. No `CAP-OPEN-2` flag arose. **No durable ID was minted.**
- **COUNTS, RECOMPUTED FROM BOTH FILES BY THE HOUSE METHOD** (leading marker by alternation, `^\s*- (⬜|✅|🟡)` under `grep -cP`, agreeing with a Python recount): `docs/specs/attorney-review-queue.md` (SYNCED, **457,309 B**) holds **379 ⬜ and 9 🟡**, plus the **11 ✅ parents held under `CAP-OPEN-2`**; `docs/record/attorney-review-queue-closed.md` (**294,130 B**) holds **164 ✅**. Open 374 → 379; amber 9, unmoved; closed 164, conserved as 164 + 0 moved + 0 born; total ✅ 175; **388 open-in-substance.**
- **FINDING 3 — `v33` IS IN FORCE ON THE DESIGN SIDE'S OWN LIVE READ, AND THE RECORD OF IT IS A FILED LEDGER, NOT THE PACKET'S §4.5.** `#157`'s ledger, placed by this batch, records a `project_info` read at ~01:0x CDT 2026-09-13 finding *"v33 IS PASTED AND IN FORCE"*, and the meter at 1,704,193 / 2,000,000 = 85.2%, seventeen docs. §4.5 carries neither. BUILD-STATE's INSTRUCTIONS and CAPACITY lines are updated from that filed EVIDENCE and cite it, and YOUR HAND (17) and NEXT ACTS (1) are updated to match; the repo still cannot verify the instructions field, and BUILD-STATE still says so.
- **FINDING 4 — BUILD-STATE CARRIED ONE SIDE OF A DISAGREEMENT THE RECORD ALREADY HELD BOTH SIDES OF.** Its `P-2` sentence asserted — in the packet's rendering; the exact bytes are the `CAP-4` ledger's `P-2` entry below — that 21a(c) *"has long read 'by mail or by commercial delivery service'"*, the reading `docs/specs/deadline-engine-spec.md` raised — while `[DL-memo Q3]` had read 21a(c) as mail-only since 2026-08-14, and `#157` reads it the same way. The sentence is SUPERSEDED in place with neither side asserted, and ledgered below; the spec was not edited, and nothing is verified.
- **FINDING 5 — BUILD-STATE STILL CALLED THE `G10-5` FRONT-END FIXES OPEN FOUR WEEKS AFTER THE BUILD THAT MADE THEM, IN TWO SENTENCES ITS OWN RLS SECTION CONTRADICTED.** The Parties row read *"SSN and licence inputs render here TODAY and save into `parties.fields` — the front-end slice fixes it, behind `G10-5`"* (emphasis dropped) — present at the build's own commit `47b65b4` and carried since — and the Data layer's ADP bullet, present at `47b65b4` in other words and, since batch 87, as *"the `src/` one STILL STANDS — `src/components/RlsProbePanel.tsx` … behind `G10-5`"*. The 2026-08-19 GATE 10 FRONT-END BUILD SESSION entry records the numbers moved to `party_pii`, masked with an explicit reveal, and both panel sentences rewritten, in commit `47b65b4` (*"Gate 10 front-end: SSN and licence numbers leave parties.fields"*, which touches `RlsProbePanel.tsx`); the same file's RLS section already read *"REPAIRED 2026-08-19 (`G10-6` ruled IN, `G10-5` built it)"*. **Both sentences are SUPERSEDED in place on that entry, each attributed to it, and ledgered below.** A pass-one sweep lane noted both outside its findings, so pass one never reproduced them; pass two did. **Neither rests on a `src/` read — no `src/`, `db/` or `supabase/` content reached the runner (its one repo-wide `git grep`, for `(#157)`, returned nothing) — but two verifying agents did read `src/` content, read-only, as a scan of every command naming those trees in all the passes' transcripts shows (a few agents' repo-wide searches scanned those trees without surfacing their text): pass two's reproducing agent for this finding ran `git show 47b65b4 -- src/components/RlsProbePanel.tsx` and grepped the working-tree `RlsProbePanel.tsx`, `PartyFormPage.tsx` and `localAdapter.ts`, and a pass-three lane re-ran that `git show`. No figure in any file this batch wrote was taken from those reads, and BUILD-STATE's two *"no `src/` … file was read"* formulas are rewritten to what holds: nothing from those trees was re-derived.**
- **HEALTH CHECK SKIPPED, AND THE SKIP RECORDED (`QR-6(f)`).** §5 is NONE and no `src/`, `db/`, `supabase/` or build-tooling path is routed, so `npm test` / `npm run build` / `npm run lint` would prove nothing about this batch. No file under those trees was written, and no figure was taken from one; the only reads that surfaced their content, by two verifying agents, are recorded at FINDING 5 (a pass-one sweep lane's `ls -la` of one migration surfaced none).
- **NOTHING WAS BUILT, AND THE BARRIERS HELD.** The handoff's DO-NOT list was honoured whole: `docs/specs/trcp-deadline-skeleton-2026-03-01.md` and every registry file are byte-unchanged from HEAD; no durable ID was minted; no Dorsaneo extract or zip entered the repo, and no Dorsaneo text beyond the routed EVIDENCE files' short attributed quotation and chapter titles. No registry entry was touched, no legal proposition verified, no capture relocated, nothing appended to `spec-feedback.md`. **No packet-added act arose. Three acts the routing table did not specify — the placement, the cross-link notes, and pass one's further row notes — went to Michael in `QR-6(e)`'s manner and were made on his word.** PF-1 is the sending side's; `#157` records why it did not fire.
- **BUILD-STATE REWRITTEN IN FULL, BY PROGRAM.** Forty-two exact-match edits on the HEAD blob, each asserted to match once; A-4 from the log as this batch writes it (`#75`–`#157`, 83 on the inherited basis), A-5 from the register's own header (`#157`). **`CAP-4` bound for a fifteenth consecutive refresh: 99,961 B → 99,980 B, 20 B under, 136/150 non-blank (150 raw); 33 passages removed (4,356 B — 10 displaced outright, 23 superseded in place), every one listed VERBATIM below, each quote widened by program until it occurs exactly once in the HEAD blob, and nine further edits only inserted text.** The published figures were iterated to a fixed point and re-asserted against the file as written.
- **`OPEN-5(a)` MET BY A SWEEP OF EVERY COUNT BUILD-STATE STATES, NONE COPIED.** Four read-only lanes split BUILD-STATE into four spans and listed every count in them — the first lane by program over the first 32 non-blank lines, the other three by reading their sections. **Their tallies sum to 479 counts; the 225 tallied as describing what `docs/` holds now were each re-derived from their files — 223 matched, and the other two are one figure stated twice (FINDING 6)**; the other 254 were not re-derived: 112 record past events, 112 come from `src/`, `db/`, `supabase/` or the live database and stay carried as marked, and 30 lie outside the repo. **These are the lanes' own tallies, not a de-duplicated census: the first two spans shared five raw lines (the *Phase 0 / T3* heading and its four bullets), so at least three docs-now figures and two outside-repo figures are counted twice** — and the lanes did not itemize enough to subtract exactly. **`git diff --stat e046906 HEAD -- src db supabase` and `git status --porcelain -- src db supabase` both came back empty, so nothing under those trees has moved since the CODE refresh that measured them.** **The lanes read the working tree before pass one's fixes;** figures those fixes and later ones changed — BUILD-STATE's `CAP-4` clause (99,920 B, 80 B under, 29 passages, 3,995 B when swept) and the synced register's size (455,707 B when swept) — were re-asserted against the files at every regeneration — by the generators, which read the register's sizes from the files, and by the pre-commit gate — not re-read by a sweep lane.
- **FINDING 6 — ONE BUILD-STATE FIGURE RE-DERIVES TWO WAYS, AND THE DISAGREEMENT IS INSIDE THE CANONICAL CAPTURE.** *"§3's ten unminted durable IDs (six minted at `FE-D1A-1`)"*, and *"the ten of §3's sixteen still unminted"* in the register bullet, match `REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` in its own words — its `FE-D1A-1` row at §18.C carries *"the other ten §3 IDs stay PROPOSED"*, and the file names *"§3's sixteen durable IDs"* — but a parse of §3's table finds six proposed durable IDs, all minted at `FE-D1A-1`, plus `R17`, with the other eight rows carrying no-ID dispositions. One reproducing agent confirmed the figure as a HIGH defect and the other refuted it. **BUILD-STATE is left as the ruled text words it; which count the capture means is a design act, and Michael's.**
- **THE TOC'S FIFTY-FIRST EDITION AND THE HEAD FILE, BOTH REGENERATED IN FULL OVER THE LOG AS THIS BATCH WRITES IT.** The TOC has two new rows (`runner 98`, `#157`): 191 rows against 191 dated entries, design 93 (`#65`–`#157`, gapless) / runner 76 (23–98, gapless) / other 22, matched position by position, 0 mismatches; `TOC-4`'s firing count goes forty-three → forty-four. The census program was first run against batch 97's commit `5579ab1` and reproduced the fiftieth edition's published figures exactly (189 / 92 / 75 / 22; summaries 18–501 words, median 106), and the head generator rebuilt batch 97's head file byte-for-byte from its own parts — and reproduced that edition's published 279,266 B whole-assembly figure — before either was run here. **FINDING 7 — THE HEAD FILE'S CEILING BOUND AGAIN.** The `TC-2` rule selected **9 entries** reaching back to design **`#154`**; assembled whole the file would measure **287,953 B**, so **4 whole entries left §1** and it now carries **5 entries reaching back to design `#156`** (its oldest entry of any kind is the 2026-09-12 CODE entry) — **2 design entries verbatim where the rule wants four.** §2 still lists every entry, and each dropped entry is whole in the live log. This line's own `CAP-4` ledger is 12,712 B of that weight; `CAP-OPEN-4` remains Michael's.
- **PRE-COMMIT ADVERSARIAL PASSES CAUGHT DEFECTS IN THIS BATCH'S OUTPUT AFTER THE RUNNER'S OWN CHECKS HAD PASSED.** **Pass one:** six read-only refuting lanes — packet fidelity, the register, BUILD-STATE, this line, the derived files, cross-file consistency — beside the four sweep lanes, every HIGH or MEDIUM finding and every sweep mismatch re-checked by an independent reproducing agent: twenty-five agents, none died. **Confirmed and fixed:** × HIGH, found by four lanes — the claim, in the register's new intro, this line's heading and FINDING 1, and the TOC row, that the packet names none of the four overlapped rows, when its row 3 names `Q-FE5-9` (FINDING 1 records that the question put to Michael carried it too); × MEDIUM — row 4's runner note missed three open rows on the same rules, and × MEDIUM, found by two lanes (one re-rated LOW) — row 2 quotes a BUILD-STATE sentence this batch superseded, both put back to Michael and noted on his pick (FINDING 1); × MEDIUM, found by two lanes — a ledger entry pointed a removed `` `#156` `` at an entry that never carried it, and the edit had dropped the `#156` pair's mention (the sentence now names both pairs, and that ledger entry now points at the rewritten sentence). **Split, and left standing:** FINDING 6's figure, reported twice by one sweep lane — one reproducing agent confirmed it as HIGH, the other refuted it (FINDING 6). **Re-rated or refuted by the reproducing agent:** the intro's *"the only place the questions survive"* (LOW, fixed to the full question text); a `QR-5` reading of the register's standing *"the packet is deleted after processing"* formula (not a defect — `QR-5` binds the entry — reworded *"at close-out"* anyway); and an uncovered overlap with `Q-FE5-7` (refuted: the ROUTE-C wording's other clauses are already in the VERIFIED entry). **LOW, fixed:** row 1's note and `[DL-memo Q1]`'s credited row 1 with the footnote's inversion `[DL-memo Q1]` already describes, and FINDING 1 said row 1 added *"only"* that; two ledger quotes too short to occur once in the HEAD blob (every quote is now widened by program until it does); CAPACITY's *"at its open"*, which `#157`'s ledger does not say; FINDING 3's *"and cite it"*, true of two of the four places; the open items dropping the DECISION 8 drafting act; the TOC bullet placing its row-size figure in the footer; row 4's *"twice"*, unflagged on the synced row; the heading's long form, unstated; and three LOW reports on two things that depended on text not yet written — BUILD-STATE's banner pointing at a sweep this line had not yet recorded, and FINDING 7's whole-assembly figure resting on this line's own size (the sweep is recorded, and that figure is recomputed to a fixed point at every regeneration). **One optional LOW was not taken:** `Q-FE5-9` calls route (c) *"a ruled one-off, not standing law"* where BUILD-STATE calls it standing law (`#95`) — a tension in the record this batch did not create. **Pass two:** four read-only lanes — pass one's fixes, the new and changed text read fresh, the derived files and ceilings byte by byte, cross-file consistency — with the same reproduction: eleven agents, none died; the lanes re-read the text pass one's fixes changed. **Confirmed and fixed:** × HIGH — the sweep bullet summed four lanes' tallies as a census when two spans shared five lines (it now says so); × MEDIUM — the sweep bullet said every lane listed counts *"by program"*, true of one; × MEDIUM, found by three lanes (one re-rated LOW) — the TOC row's *"all fixed"* against the untaken optional LOW, and, found by one of them, pass one's account naming only the refuted report of FINDING 6's figure; × MEDIUM — FINDING 6's question missing from the open items; × MEDIUM — two stale BUILD-STATE sentences a pass-one sweep lane had noted outside its findings (FINDING 5). **LOW, fixed:** the TOC bullet's pointer to the row-size figure; the register intro's *"each new row"* for four rows; a sentence of the sweep bullet claiming pass two's re-read before pass two ran (its second clause moved into this account; its first, dropped in that fix, restored at pass three); FINDING 6's *"ends"*; FINDING 1 crediting pass one with the *"twice"* this line's §1 re-check had caught; pass one's account missing LOWs and misdescribing a ledger pointer; `QR-6(e)` cited for acts it does not literally govern (now *"in `QR-6(e)`'s manner"*); the ledger header still calling every quote a minimal span; and a derived file's byte size published in this line, against BUILD-STATE's sentence that none is. **One LOW resolved without a text change:** that the four options put to Michael and the before-and-after fingerprints could not be checked from any file — both were confirmed from the session and recorded in the lanes' brief before pass three. **Pass three:** three read-only lanes — the text pass two changed, every generated artifact byte by byte, cross-file consistency — with the same reproduction: eight agents, none died. **Confirmed and fixed:** × HIGH, found by all three lanes — the TOC row still carried pass one's ledger figures (29 passages, 4,028 B) after FINDING 5 added two entries, because the row's figures were typed into the generator (the TOC row's figures, this line's BUILD-STATE figures and the ledger header are now filled from the generator's own measurement, and the gate compares each restatement with the files); × HIGH — this line's and BUILD-STATE's *"no `src/` … file was read"* were false of the batch, since two verifying agents read `src/` content (FINDING 5 now records both, from a scan of all three passes' transcripts, and BUILD-STATE's two formulas say what holds); × MEDIUM — the sweep bullet had lost its statement that the lanes read the tree before pass one's fixes (restored, naming the figures swept at their earlier values). **LOW, fixed:** FINDING 5 dating the ADP claim from batch 87 when other words carried it at `47b65b4`; the ADP rewrite unattributed and the Parties rewrite's *"masked"* readable as stored masked; pass one's and pass two's accounts miscounting lanes, misnaming three LOW reports as *"three figures"*, and omitting two LOWs; the fingerprint's *"unpacked packet"* where the manifest and staged files were hashed and the two root files were not; FINDING 6's open item giving two readings where the table supports a third, eight requirements given no new ID; the ledger's *YOUR HAND — (17) paste v33* entry labelled SUPERSEDED when nothing stands in its place (now DISPLACED, 10/23); the TOC row's Issues cell omitting FINDING 5's two sentences; the register's two summaries of Michael's second pick naming two of its three acts; FINDING 4 rendering a HEAD quotation in the packet's form without saying so; and the findings numbered out of their order in this line (renumbered 5 and 7). **Pass four,** the last review pass: two read-only lanes — pass three's fixes and the text they changed, and the whole output read fresh as the design side will see it — with the same reproduction: six agents, none died. **Confirmed and fixed:** × MEDIUM, found by both lanes — pass three's account pointed at a ledger entry by the number it had before pass three's own two entries renumbered the ledger (now pointed at by label); × MEDIUM — FINDING 6's open item called eight requirements uncovered by any minted ID when five extend an ID that exists. **LOW, fixed:** FINDING 5's and the health-check bullet's *"read … content"* and *"nothing else did"*, more than a scan of commands naming the code trees can show; BUILD-STATE's banner exempting only its ceiling figures from the sweep; the sweep bullet crediting the generators with register sizes they then held as literals (they now read them from the files) and the gate comparing only the first 2,000 characters of the head file's copy of this line (it now compares all of it); the TOC row's Issues cell omitting the two code-tree formulas; two quotations not verbatim; pass three's account naming one list twice and misplacing *"masked"*; *"no Dorsaneo text … entered the repo"* against the routed files' short quotation; the ledger header's *"only copy"*; and YOUR HAND's October 2024 precondition, stated flatly and broader than its source. **One DO-NOT breach, owned — a HIGH on its lane's rubric, with no effect on any file this batch wrote:** a pass-four lane chained `git hash-object -w --stdin </dev/null` against its brief's *"no git command that writes"*; the empty blob `e69de29` already existed, so git only freshened that object file's mtime (2026-09-16 21:29:34 CDT) — no object created, and no content, ref, index or tracked file changed. The lane reported it itself, and a scan of the runner's and every agent's transcript for git write commands finds only it and the runner's own Step 0 `git fetch origin`. **Recorded while checking it:** ten loose blobs in `.git/objects`, written 2026-09-16 19:40:31 CDT — 54 seconds after Michael's *"Confirmed."* reached the session — and each the content of an untracked file (nine in `Claude outputs/`, one of the two 2026-08-24 files), match no command in any transcript of this batch; nothing was done to them. **Every pass's no-breach claim was tested, not trusted:** a sha256 fingerprint of the batch's files, the skeleton and registry files, the two 2026-08-24 files, the zip, the unpacked manifest and staged files, the `Claude outputs/` listing and `git status` was identical before and after each pass's agents ran — and it does not cover `.git/objects`, where pass four's one write landed. **Pass four's fixes were checked by program and by the read-only pre-commit gate, not by a fifth pass.**
- **OPEN ITEMS, MERGED FROM THE PACKET'S §4 AND THE HANDOFF'S NEXT LINE — MICHAEL'S, NOT CODE'S; no runner resolved any.** A ruling sitting on `#157`'s five ⬜ rows — the skeleton's §5 correction, `P-2`, the 190.3(b)(3) ROUTE-C wording (which detaches a verification), the Rule 194 timing as three separate acts, and whether Dorsaneo becomes a named channel (a yes fires trigger 3) · the Tier 1 Lexis download · establishing the July 2026 TRCP PDF's currency · the October 2024 disciplinary-package staleness as a precondition on the DECISION 8 drafting act · held under CC-1(b): the Ch. 1 phase-ladder comparison · **carried from batch 97:** fire the fix build (`FOS-2`) → the migration by his hand → his real activations · `FO-6`'s calendar page and per-paragraph regenerate, later slices · `HS-4` / `SD-14`, held · the six PROVISIONAL `CCS-1` text acts · `Q-API-14` and `Q-API-3`'s filing half, held · `Q-API-18`, `Q-API-19` · `Q-STAT-7` · the "MDBP Firm" calendar, keep or delete · `Claude outputs\`, his to clear · a trigger-7 monthly instructions review, due by the end of September · the `#137` Voice2 pair's and the `#155` pair's TRANSIT · the two `H12-v` asks, the DECISION 9A acquisitions, the DECISION 8 drafting act, Wave 0 and go-live, as carried. **Paste v33 LEAVES the list (FINDING 3).** **Raised by this batch, also his:** FINDING 1's convention question; FINDING 6's count — whether the disclosures capture's §3 still holds ten unminted durable IDs, as its §18.C words it; eight requirements given no new durable ID, as its table's dispositions read (five extend an ID that exists — `FE-11`, `IN-2`, `FE-20`, `DL-INPUT`, `CD-1` — and R8, R9 and R13 name none); or none, as its six proposed IDs read against their minting at `FE-D1A-1`; `CAP-OPEN-4`'s cost, carried; and the two untracked 2026-08-24 files, DO NOTHING, carried.

### DISPLACED FROM BUILD-STATE (CAP-4)

**33 passages, 4,356 B, removed from `docs/specs/BUILD-STATE.md` by this batch — 10 DISPLACED outright (nothing in their place), 23 SUPERSEDED in place (replaced by this batch's rewording or its re-derived figures). NOT ONE IS AN EXISTENCE CLAIM LOST: where a passage named a file or a fact, the place it still stands is given. Each is quoted VERBATIM, extracted by program from the file at HEAD `5579ab1` as the minimal token span covering its edit's removals, widened by program where needed until it occurs exactly once in that file, edge whitespace trimmed; this runner line is the log's only copy of each passage as it stood in BUILD-STATE (the head file carries a derived copy while this entry sits in its §1). 9 further edits only inserted text and are not listed.**

1. *banner — the refresh header — SUPERSEDED: batch 97's base commit, date, refresh ordinal and invocation, advanced by this refresh. Survives at: the rewritten header; batch 97's runner line.*

   > 5781420 (the base commit)  |  Branch: master  |  Generated: 2026-09-13 Central (one hundred forty-third refresh)  |  **WRITTEN BY THE QUEUE RUNNER (batch 97, the NINETY-SEVENTH

2. *banner — whose sweep re-derived the counts — SUPERSEDED: batch 97's sweep, replaced by this batch's. Survives at: batch 97's runner line, FINDING 8.*

   > 97's runner line reports (its ceiling

3. *banner — the `CAP-4` clause — SUPERSEDED: batch 97's ceiling figures, replaced by this refresh's. Survives at: the same clause, recomputed; batch 97's runner line and its 63-passage ledger.*

   > 99,994 B, stands at 99,961 B, 39 B under the 100,000-byte ceiling, 135/150 non-blank (149 raw). 63 PASSAGES REMOVED, 7,843 B — 18 DISPLACED outright, 45

4. *banner — what a docs-only batch did with the code trees — SUPERSEDED: true of what reached the runner and false of the batch: two verifying agents read `src/` content read-only (batch 98's runner line, its G10-5 finding); no figure rests on those reads. Survives at: the rewritten clause.*

   > file was read, so every figure from those trees

5. *counts note — what a docs-only batch did with the code trees — SUPERSEDED: the same formula, the same reason. Survives at: the rewritten clause; batch 98's runner line, its G10-5 finding.*

   > READ NO `src/`, `db/` OR `supabase/` FILE:

6. *counts note — the `CAP-4` streak — SUPERSEDED: the streak ordinal, advanced by this refresh. Survives at: the same sentence.*

   > FOURTEEN

7. *DEADLINE ENGINE — `P-2` — SUPERSEDED: a characterization of 21a(c)'s text that `#157`'s operative-text read contradicts, and a not-re-retrieved that no longer holds. Survives at: `docs/specs/deadline-engine-spec.md` (the doubt as the spec wrote it, with the quoted limb); `#157`'s ⬜ row and `docs/record/dorsaneo-pass-2026-09-13/dorsaneo-assessment-2026-09-13.md` §3.2.*

   > is IN DOUBT** — TRCP 21a(c) has long read *“by mail **or by commercial delivery service**”* — **not re-retrieved, and the highest-value verification target in the section.**

8. *CAPACITY — the reading — SUPERSEDED: `#156`'s reading, replaced by `#157`'s. Survives at: `#156`'s entry and `docs/record/firm-obligations-hands-on-2026-09-12/ledger-2026-09-12.md` (the reading at open, fifteen docs); `docs/record/firm-obligations-hands-on-2026-09-12/project-instructions-v33-as-delivered-2026-09-12.md` (seventeen once the pair enters).*

   > At its open `#156` read the meter at **1,690,163 / 2,000,000 = 84.5%**, fifteen docs — seventeen once its capture pair enters;

9. *CAPACITY — the log census — SUPERSEDED: batch 97's census, re-derived over the log as this batch writes it. Survives at: the same sentence, re-derived.*

   > **189 dated entries, 92 design `#nn`, high-water `#156`,

10. *CAPACITY — the pair entering project knowledge — SUPERSEDED: the singular, widened to name `#157`'s pair beside `#156`'s. Survives at: the same sentence.*

   > `#156` pair enters project

11. *INSTRUCTIONS — the last confirmed version — SUPERSEDED: `#157`'s ledger records a live read finding `v33` in force. Survives at: `#156`'s entry (its live read of `v32`); `docs/record/dorsaneo-pass-2026-09-13/ledger-2026-09-13.md` for `v33`.*

   > **`v32` is the last version confirmed in force by a live read** (`#156`'s).

12. *DT-1 — the stamps — SUPERSEDED: `#156`'s stamp and batch 97's refresh clock, replaced by `#157`'s and this refresh's. Survives at: `#156`'s entry for its stamp; the 13:52 clock only in this quote.*

   > `#156` is stamped 2026-09-12, the Central date of its work, its packaging crossing midnight; this refresh carries 2026-09-13, read from the wall clock at 13:52

13. *YOUR HAND — (17) paste v33 — DISPLACED: DONE — `#157`'s live read found `v33` in force; nothing stands in its place, the DONE sentence recording it by a separate insertion. Survives at: YOUR HAND's DONE sentence; INSTRUCTIONS.*

   > (17) **paste v33**;

14. *NEXT ACTS — as-of and (1) — SUPERSEDED: `#156`'s as-of, and a paste `#157`'s live read found done. Survives at: `#156`'s Next line; INSTRUCTIONS.*

   > 2026-09-12 (`#156`), THE WAVE 0 ACTS RUNNING IN PARALLEL AS HIS TIME ALLOWS:** (1) **Sync, then paste v33**;

15. *TOC bullet — the figures — SUPERSEDED: batch 97's edition, re-derived over the log as this batch writes it. Survives at: the same sentence, re-derived; the Coverage section of `docs/record/session-log-toc.md`.*

   > **189 rows to 189 dated entries, `#65`–`#156` GAPLESS**, regenerated over the log as batch 97 wrote it (`TOC-4`'s fiftieth edition; firing count forty-two → forty-three) — **the firm-obligations build's CODE entry is indexed.**

16. *TOC bullet — the heading-count trap — SUPERSEDED: the trap's figures, re-derived. Survives at: the same sentence.*

   > 190 against 189

17. *VERIFICATION STATUS — the unreviewed range — SUPERSEDED: `#157` filed; the range re-derived over the log as this batch writes it. Survives at: the same sentence, re-derived.*

   > #75–#156 — **82 entries on the inherited basis, re-derived over the log as this batch writes it (A-4)**, `#156` filed here — the runner lines interleaved through the ninety-seventh,

18. *VERIFICATION STATUS — the two bases — SUPERSEDED: the bases re-derived with `#157`. Survives at: the same sentence, re-derived.*

   > #75–#156 = 82; STRICT positive-clearance basis #65–#156 less #67 = 91

19. *The register — reconciled through — SUPERSEDED: the pointer, re-derived from the register's own header. Survives at: the register's Status paragraph.*

   > `#156`.**

20. *The register — batch 97's acts — SUPERSEDED: batch 97's acts, replaced by batch 98's. Survives at: batch 97's runner line; the superseded `#156` sentence at the end of RECONCILE HISTORY in `docs/record/attorney-review-queue-closed.md`.*

   > 97 FLIPPED NO ROW ✅ AND MOVED NONE: `FO-6` ⬜ → 🟡, ruled in shape; ONE 🟡 BORN — per-paragraph regenerate, label only, under *Form engine (FE series)* by Michael's in-session pick; `FOS-2` BORN ✅ in the closed register; `HS-4`, `Q-API-14` and `Q-API-3` annotated add-only, and `HS-6` on Michael's in-session authorization; the FIRM OBLIGATIONS heading annotated.** ⬜ 375 → 374.

21. *The register — the synced file — SUPERSEDED: re-measured after batch 98. Survives at: the same sentence, re-measured.*

   > **447,482 B**) holds **374

22. *The register — the closed file and the totals — SUPERSEDED: re-measured after batch 98. Survives at: the same sentence, re-measured; batch 97's runner line.*

   > **293,314 B**) holds **164 `✅`** — **total ✅ 175 with the eleven held parents; the closed file CONSERVED: 163 + 0 moved + 1 born = 164.** So **374 open, 383 open-in-substance** with the nine `🟡`. **Batch 97 appended the superseded `#155`

23. *WS-3 entry — the layered verification basis — DISPLACED: the verification record of a closed act. Survives at: the WS-3 entry's own Verified line in `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md`, and its adopted C-ARD-1 condition beside it; the sixty-fourth invocation's runner line (2026-08-18), which records the layered basis; `#110`'s entry.*

   > **Verification rested on a LAYERED basis:** the 192.3(h) clause and the full comment-9 quotation **mechanically verified**; the *Fontenot* / *ExxonMobil* characterizations **resting on the #102/#104 reads as recorded**; the `C-XL-1` boundary and `C-ARD-1` condition as adopted at #108. **Michael's judgment, not a text match.**

24. *V-8/V-9 — the fallback chain spelled out — DISPLACED: a restatement of binding text. Survives at: CLAUDE.md, the Legal Rule Registry discipline's rule 5, V-9 amendment paragraph, verbatim in substance.*

   > — the court's own document; a paginated vendor copy stating on its face who delivered the opinion; or **your own identification, put to you and recorded** — with **cannot-identify-STOP as the floor** and unidentifiable entries **flagged, never staged for verification**

25. *#104's defects — Whaley's consequences — DISPLACED: narrative the queue rows carry. Survives at: the Whaley rows of `docs/specs/attorney-review-queue.md` (47.7(a) in two, the FLP Published status in one); batch 93's runner line.*

   > (so it has no precedential value under TRAP 47.7(a), killing `Q-RL6-1`'s option (d), and FLP's `status: “Published”` on that very opinion proves the FLP field is not evidence of a Texas designation)

26. *#104's defects — Anastassov's V-9 breach — DISPLACED: narrative the queue row carries. Survives at: the Anastassov row of `docs/specs/attorney-review-queue.md` (its SLAUGHTER quotation); batch 93's runner line.*

   > (characterised while authorship went unchecked; the court's own document reads *“SLAUGHTER, J., delivered the opinion for a unanimous Court”*, so the holding is stronger than claimed but the method failed)

27. *COMMUNICATIONS memo — the contradicted dispatch — DISPLACED: a finding the register carries. Survives at: the `Q-COM-1` row of `docs/specs/attorney-review-queue.md`; `#89`'s entry.*

   > **DISPATCH CONTRADICTED:** two constraints it called **ruled** are, in the log, *"Claude recommendations, unruled."* — both from `future-modules-capture-2026-07-28.md` §3, the `Q-QBO-1` gate firing again (`Q-COM-1`).

28. *Q-STAT-6 — the eighteen's disposition lists — DISPLACED: lists the register row carries. Survives at: the `Q-STAT-6` row of `docs/specs/attorney-review-queue.md`, which names all three lists.*

   > Adopted at #95 and **verified 08-17: 5, 6, 11, 27**. Flags **CURED**: **1, 23, 33, 34**. Divergences **RESOLVED as-is**: **4, 7, 8, 9, 26**.

29. *ROUTE-C class — who left it when — DISPLACED: history the entries' headings carry. Survives at: the headings of `#109` (ENTRIES 12, 32, D AND E) and `#110` (A, 215.1(e), B, F AND THE WS-3 ENTRY).*

   > Entries **12** and **32** left it at #109, and **A** (192.3(h) own-statement), the new **215.1(e)**, **B** (193.4(a)), **F** (199.6) and **WS-3** all left it at #110.

30. *GATE 10 — the G10-6 repair, stated twice — DISPLACED: a duplicate. Survives at: the RLS section's closing sentence (`RlsProbePanel.tsx`'s two false privilege sentences are REPAIRED 2026-08-19, `G10-6` ruled IN).*

   > **`G10-6` ruled IN — both false `RlsProbePanel` sentences repaired.**

31. *Parties row — the SSN and licence inputs — SUPERSEDED: stale since 2026-08-19, contradicting the same file's RLS section, which records the `G10-5` build: the gate 10 front-end build moved the numbers out of `parties.fields` (its log entry, and commit 47b65b4). Survives at: that build's entry, 2026-08-19; the `G10-5` row in `docs/record/attorney-review-queue-closed.md`.*

   > inputs render here TODAY and save into `parties.fields`** — the front-end slice fixes it, behind `G10-5`

32. *Data-layer ADP bullet — the src/ carrier — SUPERSEDED: stale since 2026-08-19, contradicting the same file's RLS section (REPAIRED 2026-08-19): the gate 10 front-end build rewrote both panel sentences (its log entry, and commit 47b65b4). Survives at: that build's entry, 2026-08-19; the `G10-5` and `G10-6` rows in `docs/record/attorney-review-queue-closed.md`.*

   > one STILL STANDS — `src/components/RlsProbePanel.tsx`, item 6 of the front-end slice checklist, behind `G10-5`.

33. *COMMUNICATIONS memo — the Teams pointer — DISPLACED: a pointer into the memo. Survives at: `docs/specs/communications-log-ingest-research-2026-08-16.md` itself.*

   > **Teams SMS, `callRecords` and the Microsoft-native call-content path are detailed in the memo itself (`Q-COM-8`, `COM-LOOK-3`).**

## 2026-09-13 (#157) — (Typed design session, Cowork; opened 00:04 CDT on Fable 5.1 and COMPLETED ON OPUS 5 after the week's Fable allowance was exhausted by this pass in its first fifteen minutes and an account session limit then cleared at 08:00 UTC; DT-1 stamps it 2026-09-13, the Central date of the sitting's work. **[FILING NOTE: assembled and delivered 2026-09-16; overtaken since the work — batch 97 ran 2026-09-13, `#156` is filed, `inbox/` is empty, and the head file's high-water design entry `#156` is what fixes this ordinal at `#157`. The entry text is not edited to be true today.]** DEVICE BRIDGE GRANTED on `Documents\Knowledge Repo` and on the checkout, but the bridge VM's shell could NOT mount either — the THIRD consecutive sitting, and the desktop app now names the cause, a Windows update of September 8 — so every read was a staged read-only copy and the packet is delivered by `device_commit_files`: THE DORSANEO ASSESSMENT PASS — Michael's *"I have the entire Dorsaneo's Texas Litigation Guide available to you… what could be rebuilt, corrected, or improved"*, run under his SCOPED sequencing ruling (*"Start now, scoped"*) so that nothing could reach Code ahead of the firm-obligations fixes: the Lexis export INVENTORIED and found to be ABOUT HALF the Guide; THIRTY-SIX chapters read end to end by fourteen extraction agents; FOUR CORRECTIONS carried past the treatise to the OPERATIVE TRCP TEXT, of which one resolves a conflict BUILD-STATE has carried unresolved since the deadline memo and one confirms `Q-FE5-9` against a VERIFIED entry; an adversarial verification pass that found THREE HIGH errors in the session's own draft, TWO OF THEM ABOUT THE REPO RATHER THAN THE TREATISE; NO ruling made, nothing built, no ID minted, PF-1 did not fire and the skip is recorded)

**THE EXPORT, MEASURED.** 68 Lexis zips / 458 MB at `Documents\Knowledge Repo\Civil\Dorsaneo\`; **4,814 PDFs, 4,617 unique** by normalized text (197 re-downloads); **6,798,563 words**; **10 units, 138 chapters**; every PDF `Copyright 2026, Matthew Bender & Company, Inc.`, dated 2026-09-11 14:42 inside the zips. **IT IS ABOUT HALF THE GUIDE:** aggregating the Guide's own `Ch. N, Title` cross-references over all 4,617 documents finds 114 chapter numbers referenced-but-absent, **at least 75 of them TLG chapters** — including **11, 12, 13, 14, 20, 21, 22, 70, 71, 93–96, 100, 101, 131–134, 140, 141, 145–148, 271, 292, 293, 320, 321, 330–332**, and **250, 251, 252, 255, 256, 257** (**253 and 254 ARE present** — the range notation swallowed them in the first draft; caught in verification). Acquisition is HIS HAND under SOURCING; a tiered list was delivered.

**THIRTY-SIX CHAPTERS READ END TO END** — 1, 1A, 2, 3, 4, 30, 31, 61, 62, 63, 64, 72, 90, 90A, 91, 92, 97, 98, 102, 103, 110, 110A, 120, 120A, 290, 291, 300, 301, 302, 310, 340, 341, 342, 343, 344, 345 — against a fixed schema (deadlines, encodable rule statements, procedural checklists, form STRUCTURES, research locators, flags), yielding ~3.6 MB of extract. **SYNTHESIS ONLY: own words, short attributed quotation, no form body text. Dorsaneo is a LOCATOR, never authority — the `WS-3` status applied to a treatise.**

**THE FOUR CORRECTIONS, each read at the operative text of `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` (`pdftotext -enc UTF-8 -layout`), rules 4, 21a, 47, 63, 165a, 169, 190.2, 190.3, 194, 194a, 195, 196.2, 196.7, 197.2, 198.2 and 216 read.** ⛔ **PROVENANCE CAUTION, STATED ON THE DELIVERABLE'S FACE: that PDF states NO currency date on its face** (its first page is the table of contents; it carries two "Comment to 2026" markers), so under SOURCING's own rule **its currency is NOT ESTABLISHED** — these are reads of *that document's text*, and establishing its currency is Michael's act. (1) **THE 50-DAY DISCOVERY-RESPONSE BRANCH IS FAMILY-CODE-ONLY AND SAYS SO INSIDE THE RULE** — all four request instruments (**196.2(a), 196.7(c)(1), 197.2(a), 198.2(a)**) carry *"except that a defendant in a suit governed by the Family Code…"*; **Rule 194** is titled *"…IN SUITS NOT GOVERNED BY THE FAMILY CODE"* and has no such branch, while **Rule 194a** is *"…IN SUITS GOVERNED BY THE FAMILY CODE"*. **BUILD-STATE's deadline-memo headline is right and `docs/specs/trcp-deadline-skeleton-2026-03-01.md` §5 is the defect**, its footnote the load-bearing error — **and the skeleton omits Rule 196.7 entirely (0 occurrences)**. A PI or civil-lit defendant served before answer has a FLAT 30 DAYS, and 198.2(c) makes the admissions default automatic. (2) **TRCP 21a(c) ADDS THREE DAYS FOR MAIL ONLY** — `P-2` stands as written; the doubt arose from **21a(b)(1)**, which pairs mail with commercial delivery for COMPLETION but not for added days. (3) **TRCP 190.3(b)(3) READS "ANY OTHER PARTY" — PAIRWISE** — confirming `Q-FE5-9` against an entry VERIFIED 2026-08-11 whose wording says *"each party to 25 interrogatories"*; ROUTE-C conforming wording DRAFTED AND NOT STAGED, because adopting it detaches that verification (#95). (4) **THE VERIFIED RULE 194 ENTRY CARRIES NO TIMING**, while **194.2(a)** — *"within 30 days after the filing of the first answer or general appearance"* — anchors the WHOLE discovery calendar: → 190.2(b)(1)(A)/190.3(b)(1)(A) period start → period end → **195.2's 90/60-day designations**, four rules on one case event the app already stores; the entry also enumerates five content categories against the rule's twelve while its own prose twice calls that "the four-category working list."

**THE GAPS, and the shape findings.** The post-judgment and appellate tree (nothing built; a closed computation off the judgment-signing date); **Ch. 103 as the DWOP specification** with the Rules of Judicial Administration standards (18 months jury / 12 non-jury, both from the APPEARANCE DATE) and the 30/75/30 reinstatement chain; the hospital-lien lifecycle and settlement money, with prejudgment interest running from **the earlier of** suit-filing or the 180th day after written notice; the RTP pipeline and its Rule 194.2(b)(12) disclosure interlock; **limitations as a property of the CLAIM, not the matter**, with diligence-in-service named the highest-value unbuilt feature and repose as a separate untollable track; **EIGHT recurring practice-obligation rows from Ch. 3, not thirty-five** — including the 30-day IOLTA CLOSING notice and a five-year trust-records retention that runs **PER MATTER from termination of the representation** — with no amount, due date or hour count for bar dues or MCLE, which is what DECISION 9A's channels were opened for; **SEVEN disciplinary rules changed in one October 2024 package, making conflicts/screening/prospective-client entries drafted off older material presumptively stale — a precondition for the DECISION 8 drafting act**; **BEXAR AS A COMPUTED INPUT, twice over** — "legal holiday" includes days the courthouse is closed by direction of the commissioners court, and short periods branch on SOURCE (Rule 4's five-day skip does not reach statutory periods); Ch. 1's eleven-section, 31-checklist ladder as a completeness comparator against the build's status ladders; and the three-date currency discipline (enactment, effective, applicability) for registry entries.

**ONE CLASS-LEVEL FINDING WORTH CARRYING.** Dorsaneo's own Master Trial Guide checklist `CL-1.05.3(1)` states the 30/50 response structure GENERALLY and was never conformed to the 2021 Rule 194 amendment that the same section's narrative text describes. **A treatise checklist can lag the treatise's own narrative by a full rule amendment** — anything sourced from a `CL-` checklist needs the narrative section read beside it.

**THE VERIFICATION PASS, AND WHAT IT FOUND IN THIS SESSION'S OWN WORK.** An adversarial agent told to refute the deliverable returned **3 HIGH / 6 MEDIUM / 6 LOW**; every finding was independently re-confirmed before being acted on, and all were fixed in place with a §8 verification record added naming the HIGH ones. **TWO OF THE THREE HIGH FINDINGS WERE ERRORS ABOUT THE REPO, NOT THE TREATISE:** Chs. **253 and 254 listed as absent when present** — a chapter-RANGE error, and the SECOND instance of that class in this one sitting, the first having been caught inside the Ch. 1 extract by its own agent; and **a FALSE claim that `case-heartbeat-design.md` treats DWOP as a first-class signal** — it appears ONCE there, in a civil-defense row reading *"the model differs and is not designed here"*, in a file scoped to the plaintiff-PI posture. That claim was carried from an extract's summary line and asserted about the build **without opening the build file** — the verify-before-criticizing failure, corrected on the deliverable's FACE rather than silently, and the gap is LARGER than first written. Third HIGH: prejudgment interest stated with one accrual limb missing. Also corrected: two "(BUILT)" labels omitting *fixture-only*; a Level-1 registry gap framed as new when `FE-5` recorded it 2026-08-15; an EMS-lien window that probably does not reach Bexar at all (Prop. Code § 55.002(c), counties of 800,000 or less); a seven-item list counted as six; the "47 entries" figure, which counts two of four registry files (74 status lines across all four); the Ch. 1 ladder counts; and three dispositions whose "resolved"/"confirmed" wording overstated one read of one undated PDF. **RE-SWEEP AFTER FIX then caught two figures taken from the verifier without independent check** — an FE-5 quotation's wording and a deadline-tag count of 1,213 that is 1,462 by a stated method — both corrected.

**WHAT SHIPPED (this packet, docs-only, EVIDENCE only):** this entry; FIVE EVIDENCE files under `docs/record/dorsaneo-pass-2026-09-13/` — the assessment, the export inventory-and-gaps note, the chapter inventory, the running ledger, and this sitting's capture; FIVE ⬜ register rows BORN carrying full question text, **labels only, durable IDs his to mint**; and the BUILD-STATE facts in this packet's §4.5. **The 3.6 MB of per-chapter extracts is NOT in this packet and NOT in the repo** — ruled 2026-09-16 to his machine, committed to `Documents\Knowledge Repo\Civil\Dorsaneo\Dorsaneo_Chapter_Extracts_2026-09-13.zip` (1,470,607 B, sha256 `fa1a9238…`, 26 files, per-file hashes in its manifest), on the CORPUS-HOME precedent; the assessment cites it by path.

**WHAT DID NOT HAPPEN, each because a rule bars it or because it is his.** Nothing built; no `src/`, `db/`, `supabase/` or tracked file written; **no edit to the deadline skeleton** (its §5 defect is PROPOSED — editing it is a QR-6(e) act); no registry file touched, no entry inserted, reworded or re-verified; no durable ID minted; no `#nn` taken during the sitting itself; no capture relocated; no Dorsaneo text into project knowledge or the repo; no sweep beyond the one folder he named (H5); no git command on his machine. **PF-1 DID NOT FIRE, and the skip is recorded rather than silent: its trigger is a packet carrying a legal characterization or a proposed registry entry — this packet routes EVIDENCE only and stages NO registry entry, the ROUTE-C wording being described in the assessment and not staged. PF-1 fires on the later packet that stages it.**

**Next:** the queue runs this packet on `mdb-pllc` (batch 98); Michael clicks Sync; then, at his convenience, a sitting to rule the assessment's §7 items one at a time — the skeleton §5 correction, `P-2`'s disposition, the 190.3(b)(3) ROUTE-C rewording, the Rule 194 timing as three separate acts, and whether **Dorsaneo becomes a named secondary channel** (my read, stated in the deliverable: it should NOT — SOURCING's channels are for primary law and a treatise is a locator; a standing note that treatise reads are cited per item is the cleaner treatment. That one would fire trigger 3). Held under CC-1(b): the Ch. 1 phase-ladder comparison, better answered with the product in front of him. His alone: the Tier 1 Lexis download; **establishing the TRCP PDF's currency**; the October 2024 staleness precondition on the DECISION 8 drafting act.

**Staged for Code:** the five EVIDENCE files; the five register rows; the BUILD-STATE facts in this packet's §4.5. **Nothing under `src/`, `db/`, `supabase/` or build tooling. Nothing in `docs/specs/`.**

**Awaiting/Returned from Code, unreviewed:** as BUILD-STATE's own line states at HEAD — recompute it there (`OPEN-5(a)`, start-of-session rule 5). What this session can truthfully add: batch 97's landing was verified by an empty `inbox/` and by the head file's own banner naming the ninety-seventh invocation and a high-water design entry of `#156`.

## 2026-09-13 — QUEUE-RUNNER batch (runner line; NINETY-SEVENTH invocation) — one docs-only packet: the firm-obligations hands-on sitting and the post-`CCS-1` walk (`#156`), executed whole — one placement the packet's words could not locate, put to Michael and placed by his pick; the head file's ceiling binding hard enough that it now carries only two design entries verbatim; and a docs-only BUILD-STATE refresh re-attributing the CODE refresh's "at this refresh" claims it could not re-read

- **THE QUEUE HELD ONE PACKET AND IT RAN WHOLE, IN THE ORDER MICHAEL CONFIRMED.** `push-to-code_firm-obligations-hands-on-sitting_2026-09-12.zip` — 104,893 B, mtime 2026-09-13 00:05:10 −0500, sha256 `be983c3623618d0356e4948c33c33fcb0643ccce5653bc149616959735839c17`, the identity pinned at Step 1 (`QR-6(c)`) and re-checked unchanged before it was unzipped. One packet, so filename-date order and pure-mtime order agree trivially; Michael picked *"Confirm — run it (Recommended)"* at the Step 1 STOP, an option whose text also answered the `MM-1` question the repo cannot (no other runner active). **Nothing was superseded, and nothing was skipped as already built:** all seven canonical paths were ABSENT from the working tree, from HEAD and from `origin/master`; no commit on any ref had touched them (`git log --all -- <path>`, a path-based read); and `(#156)` had 0 heading hits — pending in both of the senses `QR-5` names. DT-1: this line carries the run date, 2026-09-13, read from the wall clock at 00:21 CDT; `#156` keeps its own 2026-09-12 stamp. **One clock read failed and was caught before commit:** in Git Bash, `TZ=America/Chicago date '+%Y-%m-%d %H:%M:%S %Z'` printed `2026-09-13 16:10:05 GMT` while Central was 11:10, so BUILD-STATE's uncommitted working copy briefly read *16:10 CDT*; every later clock read went through `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId(…, 'Central Standard Time')`, the call the regeneration script runs. The 11:10 reading and the 16:10 copy were seen in session and are kept in no repo file.
- **STEP 0 GATE CLEAN, ON EVIDENCE THAT COULD HAVE DISCONFIRMED IT (`QR-6(a)`).** On `master`; after `git fetch origin` (exit 0), `git ls-remote origin refs/heads/master` returned `57814201bf0cda142c616701f6437e479b01ba7e`, equal to HEAD, and `git rev-list --left-right --count HEAD...origin/master` returned `0 0`. No tracked file was modified. The untracked paths are Michael's and nothing was done to them: `Claude outputs/` (fourteen files) and the two 2026-08-24 files. Step 0's setup held: `inbox/` in `.gitignore`, `Bash(rm -f inbox/*)` in the machine-local allowlist, the live log at `docs/record/`, no `docs/specs/session-log.md`.
- **EIGHT OF EIGHT STAGED FILES VERIFIED BY HASH AND SIZE BEFORE PLACEMENT, AND THE SEVEN PLACED FILES RE-VERIFIED FROM DISK AFTER.** `CHECKSUMS.txt` again carries a size column, so the check was a per-file loop, not `sha256sum -c`. Every staged file is LF with 0 CR.
- **EVERY §1 FACT RE-CHECKED AT THIS HEAD, NOT CARRIED — AND TWO DETAILS DID NOT HOLD.** `#155` is the top design ordinal by a heading-anchored grep, and `(#156)` 0. `FOS-2`, `CAP-2a` and `FXD-` are at **0 tracked files** by `git grep` — repo-wide, where the packet had checked only its staged set. The migration `db/migrations/2026-09-10-firm-obligations.sql` is NOT run on the word of the 2026-09-12 CODE entry (*written and not run*) — at HEAD the newest entry above `#155`, and now directly below `#156` — so the fix slice's second gate holds and the build slice was edited. The three edit-row files were present, LF, 0 CR. **All seven exact-match anchors matched exactly once** — every text extracted from the manifest's fenced blocks and inline spans by program, never retyped — and the build slice's last line was its closing italic line and the module spec's its §15 anchor, as §4.1(c) and §4.2 require. **Two §1 details did not hold, and nothing depended on either:** the manifest's *"Batch 96 (`357ca8e`)"* names the spec-feedback commit beneath batch 96; batch 96 itself is `cab3b1c` (`git log`); and its *"`(#155)` 3 hits"* is a whole-file count — anchored to headings, `(#155)` hits once.
- **THE PACKET'S ACTS, ALL EXECUTED, EACH CHECKED BEFORE THE WRITE AND FROM DISK AFTER.** THREE `RULING` files placed — `docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md` (17,965 B), `docs/specs/firm-obligations-fix-slice.md` (38,298 B), `docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md` (13,700 B) — and FOUR `EVIDENCE` files in the new `docs/record/firm-obligations-hands-on-2026-09-12/`: the ledger (17,705 B), the walkthrough capture (25,285 B), the audit record (8,066 B), and v33 as delivered (91,633 B). **`CAP-2` held:** every file-placing row carried its CLASS, the edit rows carried `—` (now by `CAP-2a`), and there was no `RETIRE` row. The build slice took §4.1's two replacements and its §12 append (52,382 → 55,206 B); the module spec its §16 append (80,634 → 82,167 B); the `FOS-1` kickoff prompt §4.3's two replacements (15,770 → 16,275 B). The fix-slice kickoff prompt was placed by bytes and verified by hash, and not otherwise opened (§6).
- **THE THREE `CAP-3` ACTS.** (i) ROWS — `FO-6` flipped ⬜ → 🟡 with its RULED IN SHAPE sentence appended; `HS-4`, `Q-API-14` and `Q-API-3` annotated add-only, each confirmed a single physical line before the append; the FIRM OBLIGATIONS heading annotated; ONE 🟡 row BORN for per-paragraph regenerate (a label, no durable ID — FINDING 1); `FOS-2` BORN ✅ at the end of the closed register's FOS section. (ii) The `#156` sentence written into the Status paragraph with the run date, and the superseded `#155` sentence — extracted by a balanced-parenthesis match, 1,289 B — APPENDED verbatim at the end of RECONCILE HISTORY. (iii) MOVES: none, because no row flipped ✅. **One act beyond the packet, on Michael's in-session authorization (FINDING 7):** `HS-6` annotated add-only. **The closed register took exactly two insertions** (a line-opcode check returned inserts only). No `CAP-OPEN-2` flag arose.
- **COUNTS, RECOMPUTED FROM BOTH FILES BY THE HOUSE METHOD** (leading marker by alternation, `^\s*- (⬜|✅|🟡)`): `docs/specs/attorney-review-queue.md` (SYNCED, **447,482 B**) holds **374 ⬜ and 9 🟡**, plus the **11 ✅ parents held under `CAP-OPEN-2`**; `docs/record/attorney-review-queue-closed.md` (**293,314 B**) holds **164 ✅**. Open 375 → 374; amber 7 → 9; closed 163 → 164, conserved as 163 + 0 moved + 1 born; total ✅ 175. **All four of the packet's predicted counts matched, and none was copied.**
- **FINDING 1 — THE PACKET PLACED A ROW UNDER A HEADING THAT DOES NOT EXIST AS DESCRIBED, AND MICHAEL PICKED ITS HOME.** §4.4 put the born 🟡 row *"under the FORM ENGINE heading that carries the `R`-series / `HS-` rows"*. At HEAD no heading fits both halves: *Form engine (FE series) — ADDED 2026-08-07* carries FE rows, `FE-SEED-1` and `HD-23` but no R or HS row; **no R-series row exists in either register file**; and `HS-4` and `HS-6` sit under *CC-1 hands-on sitting (HS series)*. §6 bars approximating, so the question went to Michael with three options; his pick, *"Form engine section (Recommended)"*, placed the row directly after `HD-23`.
- **FINDING 2 — THE HEAD FILE'S CEILING BOUND, AND HARD.** The `TC-2` rule selected **10 entries** reaching back to design **`#153`**; over 200,000 B assembled whole, so **5 whole entries left §1** — the 2026-09-09 runner line, `#154`, the 2026-09-09 CODE entry, the 2026-09-08 runner line and `#153` — and it now carries **5 entries whose oldest design entry is `#155`** (its oldest entry of any kind is `#155` itself) — **two design entries verbatim where the rule wants four.** §2 still lists every entry, and each dropped entry is whole in the live log. The weight is three entries: the 2026-09-12 CODE entry (53,975 B, a 15,658 B `CAP-4` ledger inside it, measured from its DISPLACED heading to the entry's end), batch 96's runner line (31,176 B), and this line, whose own `CAP-4` ledger below is 23,192 B on the same basis. **That is `CAP-OPEN-4`'s question with a measured cost: displacement ledgers carried inside log entries now push design rulings out of the only session-log file the design side reads.** The ruling is Michael's.
- **FINDING 3 — BUILD-STATE'S "AT THIS REFRESH" CLAIMS BELONGED TO A CODE REFRESH, AND A DOCS-ONLY REFRESH CANNOT RE-ASSERT THEM.** The 2026-09-12 CODE refresh read `src/` and `db/` and said so in its header and in seven places — the counts note, the amendment's five, the migrations re-count, the second tranche's existence test, the safety half, the `review_log` read and `FO-7`'s facts. This batch read neither tree, so each is re-attributed to the `e046906` CODE refresh and marked carried, the `QR-6(a)` shape batch 96 used. **One such phrase predates that refresh:** the Data-layer parenthetical *"Re-derived here every refresh"* stood unmarked through batch 96's docs-only refresh; it now reads *"Re-derived at every CODE refresh, carried here"*. What this refresh re-derived for BUILD-STATE, from `docs/` and by existence test: the registry backlog 47 / 35 / 12 on the two named files (30 of 40 and 5 of 7 `**Status:** VERIFIED` lines); the carrier-duties file's 22; the medical-billing drafts file's 5 `**Status:** DRAFT` lines of 5; seven REQ-CAPTUREs, the disclosures capture at 253,299 B / 1,147 non-blank; the runbook at 81 non-blank / 106 raw; the EVIDENCE directories at 21, 4 and the new 4; and the three declared HK-5 data paths ABSENT by existence test. FINDING 8's sweep then re-derived every other count BUILD-STATE states about what `docs/` holds now.
- **FINDING 4 — THE UNINDEXED CODE ENTRY IS INDEXED, AND IT IS THE TOC'S TENTH TRAP AGAIN, AS ITS AUTHOR PREDICTED.** The 2026-09-12 CODE entry regenerated neither derived file by design. The census before this batch's regeneration found 187 dated entries against 186 index rows, the surplus exactly that entry; after it, 189 rows against 189 entries, matched position by position on ID and date, 0 mismatches.
- **FINDING 5 — `Claude outputs/` HOLDS A COPY OF A FILE THIS BATCH FILED, AND THIS ONE IS BYTE-IDENTICAL.** `project-instructions-v33-2026-09-12.md` there matches the EVIDENCE copy filed today (91,633 B, sha256 `9600fc23…`). A before-and-after fingerprint of that folder's listing, the two 2026-08-24 files and the zip was taken to test that nothing was touched; the folder is Michael's to clear.
- **FINDING 6 — THE PACKET'S STATUS SENTENCE, PLACED VERBATIM, SORTS `AS-Q17` AS CLOSED RATHER THAN AS A FIX.** It reads *"seven proposed → four CLOSED (`AS-Q14`–`AS-Q17`), two RULED as fixes (`D-8`, `D-18`)"*, while the fix slice builds `AS-Q17` as fix B3 and lists only `AS-Q14` (b), `AS-Q15` and `AS-Q16` as ruled with nothing to build (its §2.3). The sentence is packet text and stands as placed; BUILD-STATE states the fix slice's split. Correcting the register sentence is a design act.
- **FINDING 7 — THE `HS-6` ROW STILL SENT ITS QUESTION TO A WALK THAT HAS RUN, AND MICHAEL AUTHORIZED THE NOTE.** Found by the pre-commit pass: `HS-6` ended *"is still his, at the post-`CCS-1` walk"*; the walk ran at `#156` without reaching `SD-12`; and §4.4 routed no act to the row — the same case as `HS-4`, which it did annotate. Put to Michael as a `QR-6(e)` act, his pick *"Add the HS-6 note (Recommended)"* appended the note shown to him, add-only, at the true end of the single-line row. The packet's own Status sentence for this batch, placed verbatim, does not list it.
- **FINDING 8 — `OPEN-5(a)` HAD NOT BEEN MET, AND TEN COUNTS BUILD-STATE CARRIED WERE WRONG, WITH ONE HEADING.** The rule reads *"every count BUILD-STATE states is re-derived, not carried"*. The fourth pre-commit pass showed this file carrying counts no refresh had re-derived: the cascade map's eleven, four and six had stood unchanged since `d6f97e6` (2026-08-19). **A read-only sweep of all 149 lines followed:** four lanes, with each MISMATCH re-derived by an independent agent — fourteen agents in all, and a before-and-after fingerprint unchanged. **It found 388 counts. The 161 that describe what `docs/` holds now were each re-derived from their files: 151 matched, 10 did not, and all ten were confirmed.** The other 227 the sweep did not re-derive: 91 record past events, 112 come from `src/`, `db/`, `supabase/` or the live database and stay carried as marked, and 24 lie outside the repo (the HK-5 data paths among them, which this refresh existence-tested separately — FINDING 3). **The ten, corrected in place and ledgered below:**
  - *"Five WF gates"* on T3 → four. The WF spec in three places — §2.4, §3, and its own `Q-WF-2` in §10 — and the queue's `Q-WF-2` row, which repeats §10, say five against gate tables that show four; correcting those is a design act.
  - *"No entry with adopted-but-unverified wording remains"* → only 19a and 19b still carry it.
  - CR-10's *"one of its four now clear"* → two (29 and 32).
  - *"three wording expansions"* flagged → two (TRCP 194's span was resolved at `#108`).
  - Privacy's *"one caller"* → two (`O-1`'s audit limb joined gate 10 at `#154`).
  - §3's *"sixteen"* durable IDs, in two places → ten (six were minted at `FE-D1A-1`).
  - The Tasks 14, 15 and 17 open tallies *9+3*, *11+4* and *3* → 7+3, 9+4 and 4.
  - And, found by the fifth pre-commit pass rather than the sweep, the same wrong zero in the registry section's heading: *"the ruled-wording tail is EMPTY"* → *only 19a/19b's ruled wording is unverified*.
  **None of the eleven was written by this batch; each stood at HEAD `5781420`.**
- **HEALTH CHECK SKIPPED, AND THE SKIP RECORDED (`QR-6(f)`).** §5 is NONE and no `src/`, `db/`, `supabase/` or build-tooling path is routed, so `npm test` / `npm run build` / `npm run lint` would prove nothing about this batch. No file under those trees was read or written.
- **NOTHING WAS BUILT, AND THE BARRIERS HELD.** `FOS-2` authorizes a build by a fresh Opus Code session that Michael fires. This runner wrote and ran no migration, minted no ID (per-paragraph regenerate stays a label), touched no registry entry, relocated no capture, appended nothing to `spec-feedback.md`, and verified no legal proposition. Every §6 DO-NOT was honoured. **No packet-added act arose. One runner-found act outside the routing table — the `HS-6` note — went to Michael under `QR-6(e)` and was made on his word; the other in-session question was a placement inside a routed row.**
- **BUILD-STATE REWRITTEN IN FULL, BY PROGRAM — AND EVERY COUNT IT STATES ABOUT WHAT `docs/` HOLDS NOW RE-DERIVED BY FINDING 8'S SWEEP, NONE COPIED (`OPEN-5(a)`).** The rewrite is a set of exact-match edits on the HEAD blob, each anchor asserted to match once. A-4 comes from the log as this batch writes it (`#75`–`#156`, 82 on the inherited basis), and A-5 from the register's own header (`#156`). **`CAP-4` bound for a fourteenth consecutive refresh: 99,994 B → 99,961 B, 39 B under, 135/150 non-blank (149 raw); 63 passages removed (7,843 B — 18 displaced outright, 45 superseded in place), every one listed VERBATIM below, and five further edits only inserted text.** The published size was iterated to a fixed point against the file as written, and a word-level diff of the HEAD file against the new one found no removed word outside a ledgered passage. The banner's ceiling figures post-date FINDING 8's sweep; the regeneration that wrote them computed them.
- **THE TOC'S FIFTIETH EDITION AND THE HEAD FILE, BOTH REGENERATED IN FULL OVER THE LOG AS THIS BATCH WRITES IT.** The TOC has three new rows (`runner 97`, `#156` and the 2026-09-12 CODE entry): 189 rows against 189 dated entries, design 92 (`#65`–`#156`, gapless) / runner 75 (23–97, gapless) / other 22; `TOC-4`'s firing count goes forty-two → forty-three. The census program was first run against batch 96's commit `cab3b1c` and reproduced that edition's published figures exactly (186 / 91 / 74 / 21, summaries 18–446 words, median 101). The head generator was validated the same way, rebuilding batch 96's head file byte-for-byte from its own parts, before it was run here.
- **PRE-COMMIT ADVERSARIAL PASSES CAUGHT DEFECTS IN THIS BATCH'S OUTPUT AFTER THE RUNNER'S OWN CHECKS HAD PASSED.** **Pass one:** seven read-only lanes — packet fidelity, this line, BUILD-STATE, the TOC, the head file, the register, cross-file consistency — each told to REFUTE, with every HIGH or MEDIUM finding re-checked by a second, independent agent: eighteen agents, none died. **Confirmed and fixed:** × HIGH — FINDING 2 gave the CODE entry's `CAP-4` ledger as *23 KB*, and it measures 15,658 B (three lanes found it independently); × MEDIUM — a ledger pointer sent batch 96's register account to the synced Status paragraph, from which this batch had moved it; × MEDIUM — this line called every §1 fact re-verified while the manifest names batch 96's commit wrongly; × MEDIUM — BUILD-STATE stated the hard-items-only reminder as built, when it is `FOS-2`'s unbuilt amendment; × MEDIUM — BUILD-STATE put `AS-Q17` among the closed items and outside `FOS-2`'s fixes (FINDING 6); × MEDIUM — the `HS-6` row (FINDING 7). **Refuted by the reproducing agent:** × HIGH, raised by two lanes — that *"CHECKABLE FOR TRANSIT at HEAD"* is a `QR-5` prediction; both pairs meet `TC-8`'s two conditions at `5781420`. One further MEDIUM was re-rated LOW. **LOW, fixed:** NEXT ACTS put *paste v33* before *Sync*, against `#156`; the 30-day default, the per-obligation field and the six text acts' names were missing from BUILD-STATE; BUILD-STATE's header claimed every claim re-checked, and one `src/` claim still read *"CONFIRMED AT HEAD"*; this line placed the CODE entry *above* where `#156` lands; a ledger pointer named a clock the CODE entry does not carry; *"reaches back only to `#155`"* where §1 then ran down to batch 95's runner line; *A-4 from the log at HEAD* for the log as written; the TOC banner's unbounded *~739 B* row figure. **Pass two:** three read-only lanes over the text pass one's fixes changed — fix fidelity, the changed text, the derived files with cross-file consistency — with the same reproduction: six agents, none died. **Confirmed and fixed:** × MEDIUM — BUILD-STATE's narrowed header, *"every `docs/` claim below re-checked"*, was still not true: its ADP bullet carried a register line cite, `:793`, that has pointed at nothing relevant since the row it named moved on 2026-08-19 (its `spec-feedback.md` cite, `:591`, still resolved); the header was rewritten and both line numbers are gone under cite-stability. **Re-rated LOW by the reproducing agent, and fixed:** BUILD-STATE's shortened DT-1 sentence cited a clock incident this line had not recorded (now recorded in the first bullet; the same fix rewrote the ledger pointer for the sentence it compressed, dropping a reference that pass three restored and pass four re-pointed); and this bullet said *each* pass's fingerprint matched before pass two's had been compared. **LOW, fixed:** FINDING 2 measured its two ledgers to different end points (this line's now given on the CODE ledger's basis); the TOC row credited pass one's catches to both passes and counted one refuted claim as two; FINDING 7 did not say the placed Status sentence omits the `HS-6` note; a ledger reason still read *"re-derived at this HEAD"*; the manifest's *"`(#155)` 3 hits"* reproduces only as a whole-file count (now said); and the TOC banner's line wrap. **Pass three:** two read-only lanes — pass two's fixes with the text they changed, and a whole-output cross-check with a fresh read of this line — with the same reproduction: four agents, none died, and the cross-check lane found nothing. **Confirmed and fixed:** × HIGH — pass two's account above, and the ledger's reason for dropping the two line cites, had said *both* cites pointed at nothing relevant, when only the register's `:793` did, as pass two's own reproducing agent had said; × MEDIUM — FINDING 3 still closed with *"Everything BUILD-STATE states from `docs/` was re-derived"*, the blanket claim pass two had removed from BUILD-STATE's header. **LOW, fixed:** the header's *"the commit this file describes"*, for a file that describes the working tree built on it; the clock clause quoted its command without the format string it ran with; *"which is `cab3b1c`"* could attach to the wrong commit; and a ledger pointer had dropped DT-1's ~19:00 limb. **Pass four:** two read-only lanes — the pass-three patch, and the derived files byte for byte — with the same reproduction: three agents, none died, and the byte lane re-derived every figure it checked. **Confirmed and fixed:** × MEDIUM — BUILD-STATE's header still said every count over `docs/` was re-measured and that this refresh's re-checks were named in this line; neither held, since this line never named the medical-billing DRAFT recount and the cascade map's counts had never been re-derived. That finding is what set off FINDING 8's sweep. **LOW, fixed:** the ledger pointer for the compressed DT-1 sentence named v33's DT-1, which covers the design-side container and not the batch window (now pointed at the runner lines that record the window); the pass-two account above called that pointer's earlier rewrite a correction (now said as it happened); the pass-three account said FINDING 3 *opened* with the sentence that closed it; the clock clause described two reads no file keeps (now said to be in-session); FINDING 3's list, headed *from `docs/`*, included existence tests outside the repo; and the TOC row's account of pass three. **Each pass's no-breach claim was tested, not trusted:** for passes one to five and for FINDING 8's sweep, a sha256 fingerprint of the sixteen batch files, the two 2026-08-24 files, the zip, the unpacked packet, the `Claude outputs/` listing and `git status` was taken before the agents started and was identical after they finished. **Pass five:** two read-only lanes — the sweep's corrections with the patch text, and the derived files with cross-file figures — with the same reproduction: five agents, none died. The first lane re-derived all ten corrected counts and found them true; the second re-derived the head file, the TOC and BUILD-STATE's figures. **Confirmed and fixed:** × HIGH, rated MEDIUM by the second lane — FINDING 8 counted the WF spec's stale *five* as appearing twice, when it stands in three passages; × MEDIUM — the registry section's heading still called the ruled-wording tail *EMPTY*, the same wrong zero FINDING 8 had corrected in the bullet beneath it (now corrected, ledgered and added to FINDING 8, whose ledger reason no longer calls that zero *stale*: it was never true). **LOW, fixed:** BUILD-STATE's header credited the sweep with ceiling figures the later regeneration computed; the pass-four account above left out two of its fixes; FINDING 8's *not re-derived* read against FINDING 3's existence test; and the TOC row's pass-four clause omitted its LOW items. **Pass five was the last review pass, as batch 96's fourth was for that batch: its fixes were checked by program and by a read-only pre-commit gate, not by a sixth pass.**
- **OPEN ITEMS, MERGED FROM THE PACKET'S §7 — MICHAEL'S, NOT CODE'S; no runner resolved any.** Paste v33 · fire the fix build (`FOS-2`: a fresh Opus Code session, `/usage` first, *"run docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md"*) · then the migration by his hand, after the fix build amends it (backup, STEP 0, pasted alone, ten checks) · then his real activations · `FO-6`'s firm-wide calendar page and per-paragraph regenerate, each a later slice with its own authorization (both 🟡; the latter's durable ID is his to mint) · `HS-4` / `SD-14`, held · the six PROVISIONAL `CCS-1` text acts (`R1`'s route line and tier-3 panel line, `R10`'s pronoun line, `R15`'s title strings, `SD-12`, `SD-11`) at a later hands-on sitting — **`R1`, `R10`, `R15` and `SD-11` have no register row; they ride BUILD-STATE's YOUR HAND (19) as §4.5 routes them, and none was minted (§6)** · `Q-API-14` and `Q-API-3`'s filing half, held again · `Q-API-18`, `Q-API-19` · `Q-STAT-7` · the empty "MDBP Firm" calendar, keep or delete · `Claude outputs\`, his to clear · a trigger-7 monthly instructions review, due by the end of September · the `#137` Voice2 pair's and the `#155` pair's TRANSIT, at a sitting with his Chrome · the two `H12-v` asks, the DECISION 9A acquisitions, the DECISION 8 drafting act, Wave 0 and go-live, as carried. **Raised by this batch, also his:** FINDING 2's cost, for `CAP-OPEN-4`; and the two untracked 2026-08-24 files, DO NOTHING, carried.

### DISPLACED FROM BUILD-STATE (CAP-4)

**63 passages, 7,843 B, removed from `docs/specs/BUILD-STATE.md` by this batch — 18 DISPLACED outright (nothing in their place), 45 SUPERSEDED in place (replaced by this batch's rewording, its re-derived figures, or an attribution to the `e046906` CODE refresh this docs-only batch could not re-read). NOT ONE IS AN EXISTENCE CLAIM LOST: where a passage named a file or a fact, the place it still stands is given. Each is quoted VERBATIM, extracted by program from the file at HEAD `5781420` as the minimal token span covering its edit's removals, edge whitespace trimmed; this runner line is the log's only copy of each (the head file carries a derived copy while this entry sits in its §1). 5 further edits only inserted text and are not listed.**

1. *banner — the refresh header — SUPERSEDED: the CODE refresh's header, true of that refresh and not of this docs-only one. Survives at: the rewritten header; the 2026-09-12 CODE entry, which records that refresh.*

   > e046906 (every claim below re-checked at this commit)  |  Branch: master  |  Generated: 2026-09-12 Central (one hundred forty-second refresh)  |  **A CODE REFRESH, WRITTEN BY THE FIRM-OBLIGATIONS BUILD SESSION (unnumbered, `TOC-6`): `src/`, `db/` and `docs/` were READ; the counts the note below names, and every figure marked re-measured at this refresh, were RE-DERIVED, not

2. *banner — the `CAP-4` clause — SUPERSEDED: the CODE refresh's own ceiling figures, replaced by this refresh's. Survives at: the same clause, recomputed; the 2026-09-12 CODE entry's 56-passage ledger.*

   > 975 B, stands at 99,994 B, 6 B under the 100,000-byte ceiling, 135/150 non-blank (149 raw). 56 PASSAGES REMOVED, 8,415 B — 8 DISPLACED outright, 48 SUPERSEDED in place — NOT ONE AN EXISTENCE CLAIM**; each rides this session's log entry

3. *banner — the HIPAA add-on decision — DISPLACED: a `#154` decision detail, not a build fact. Survives at: `#154`'s entry and `docs/specs/api-integrations-ruling-sheet-2026-09-09.md`.*

   > The HIPAA add-on / Team plan is NOT being bought (≈ $714/month before the add-on's unpublished price).

4. *banner — the migration's hand-run protocol — SUPERSEDED: `#156` puts the fix build before the run and ten checks where there were seven. Survives at: the rewritten clause; YOUR HAND (15); `docs/specs/firm-obligations-fix-slice.md`.*

   > ; his hand, after a backup, STEP 0 first, pasted alone, seven checks in words)

5. *banner — the go-live sentence — DISPLACED: a duplicate. Survives at: THE LAUNCH PATH (GO-LIVE ITSELF REMAINS HIS ACT ON HIS DAY, in GL-1's own words).*

   > **GO-LIVE ITSELF REMAINS HIS ACT ON HIS DAY.**

6. *banner — the pending ruling, and the `FOM-8` result — SUPERSEDED: the ruling it awaited is made (`#156`, (A)); the `FOM-8` sentence leaves the banner. Survives at: the rewritten clause; Known stubs & fakes, whose Outlook bullet carries `FOM-8`'s full result and now its ratification.*

   > one awaits his ruling. **`FOM-8` RAN AGAINST HIS REAL OUTLOOK (the demo-mode app, throwaway events, deleted): a 180-day reminder surfaced once its fire time was current, so no fallback was built.**

7. *the counts note — its basis — SUPERSEDED: a CODE refresh's basis; these figures were not re-read by this docs-only batch. Survives at: the rewritten note; the 2026-09-12 CODE entry.*

   > WERE RE-DERIVED, NOT CARRIED (`OPEN-5(a)`) — A CODE REFRESH, `src/`, `db/` AND `docs/` ALL READ

8. *the counts note — the line-endings method sentence — DISPLACED: method narrative; the note keeps its own 'verified by a bytes read'. Survives at: the note's own *verified by a bytes read (0 CRLF)*; the ninth derivation trap in `docs/record/session-log-toc.md`.*

   > Line endings re-checked by BINARY read, not `grep`/`file(1)` — neither is evidence about line endings; a bytes read is.

9. *the counts note — the `CAP-4` streak — SUPERSEDED: the streak ordinal, advanced by this refresh. Survives at: the same sentence.*

   > THIRTEEN

10. *THE LAUNCH PATH — the instructions history inside floor item (5) — DISPLACED: stale: `v33` is now the newest edition, and the instructions state lives under For design side. Survives at: For design side → INSTRUCTIONS; `#150`'s and `#153`'s entries.*

   > — v30 pasted and found in force by `#150`'s live read; **v31 has since superseded it (`#153`)** and NOTHING IN THE REPO VERIFIES EITHER

11. *Phase 0 / T3 — the WF gates' T3 count — SUPERSEDED: a stale count: the WF gate tables route four gates through T3, not five. Survives at: the corrected sentence; the gate tables in `docs/specs/email-workflow-requirements.md` and `docs/specs/wf-2-wf-8-email-workflow-spec-2026-08-15.md`.*

   > Five WF gates say "gated on T3"

12. *Client dimension — the D-CL2-3 re-affirmation — DISPLACED: a duplicate. Survives at: THE FC BLOCK, FC-5 (fee basis STAYS PER CLIENT — D-CL2-3 stands).*

   > **D-CL2-3: BILLING RATE IS PER CLIENT — RE-AFFIRMED 2026-08-18 (FC-5).**

13. *Client dimension — the time tracker, parked — DISPLACED: a duplicate. Survives at: Known stubs & fakes, the time-tracker line (the tracker stays parked behind CE1).*

   > The time tracker stays parked

14. *Data layer — why steps are pinned to literals — DISPLACED: the history behind a rule the sentence keeps. Survives at: the kept sentence (**All migration steps are PINNED TO LITERALS.**); the log entry of the batch that fixed it.*

   > — `migrateV10ToV11` had stamped `STORE_VERSION`, which at 12 would have SKIPPED v11→v12 and left SSNs in the blob

15. *Data layer — a spec-feedback finding answered — DISPLACED: spent narrative of a closed finding. Survives at: `docs/spec-feedback.md` finding 1 itself.*

   > ; `spec-feedback.md` finding 1 ANSWERED.

16. *Data layer — where the amendment's five were re-verified — SUPERSEDED: not re-read by this docs-only batch. Survives at: the same sentence, attributed to the `e046906` CODE refresh.*

   > this

17. *Data layer — the parenthetical's re-derivation claim — SUPERSEDED: a docs-only runner refresh re-derives nothing under `db/` — and batch 96 carried this phrase unchanged on a docs-only batch. Survives at: the same parenthetical.*

   > here

18. *Data layer — the live 37 characterization — DISPLACED: a characterization the next sentence restates. Survives at: the next sentence ("not a census").*

   > **The live 37 is now BETTER THAN INFERRED ON ITS FLOOR, and still not a census.**

19. *GRANTs bullet — the migration re-count's basis — SUPERSEDED: not re-counted by this docs-only batch. Survives at: the same sentence, attributed to the `e046906` CODE refresh.*

   > this

20. *RLS/ADP bullet — two carried line cites — SUPERSEDED: line cites into files edited in place (cite-stability): the register cite `:793` has pointed at nothing relevant since its row moved on 2026-08-19, and the `spec-feedback.md` cite `:591` still resolved and went under the same rule. Survives at: the same sentence without the line numbers; the 2026-08-19 entry that made the repair.*

   > :591 and `docs/specs/attorney-review-queue.md`:793

21. *Known stubs — the roster.ts defect confirmation — SUPERSEDED: a docs-only refresh cannot confirm a `src/` fact at this HEAD. Survives at: the same sentence, attributed to `#86` and marked carried.*

   > #86,

22. *FORM ENGINE — the fired kickoff — DISPLACED: spent narrative; both tranches are recorded built in the next sentence. Survives at: the next sentence (BOTH TRANCHES ARE BUILT).*

   > THE KICKOFF PROMPT HAS FIRED.

23. *FORM ENGINE — the second tranche's existence test — SUPERSEDED: not re-run by this docs-only batch. Survives at: the same sentence, attributed to the `e046906` CODE refresh.*

   > this

24. *FORM ENGINE — the safety half — SUPERSEDED: not re-verified by this docs-only batch. Survives at: the same sentence, attributed to the `e046906` CODE refresh.*

   > THIS

25. *Known stubs — the `review_log` read — SUPERSEDED: not re-read by this docs-only batch. Survives at: the same sentence, attributed to the `e046906` CODE refresh.*

   > this

26. *The registry — its section heading — SUPERSEDED: the same wrong zero C02 corrects: 19a and 19b's ruled wording (`RL-1`) is adopted and UNVERIFIED. Survives at: the corrected heading; entries 19a and 19b in `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md`.*

   > the ruled-wording tail is EMPTY

27. *The registry — batch 96's streak-ordinal note — DISPLACED: batch 96's narrative of its own correction. Survives at: batch 96's runner line, FINDING 3(b).*

   > (its streak ordinal is dropped: it read FOURTH through three refreshes while batch 95's runner line said fifth)

28. *The registry — adopted-but-unverified wording — SUPERSEDED: a wrong zero: 19a and 19b, the pair the same bullet names, carry adopted wording and UNVERIFIED status. Survives at: the corrected sentence; entries 19a and 19b in `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md`.*

   > No entry with adopted-but-unverified wording remains anywhere in the registry

29. *The registry — the CR-10 gate count — SUPERSEDED: a stale count: 29 and 32 are both VERIFIED, so two of the four are clear. Survives at: the corrected sentence; the Status lines of entries 29 and 32 in `docs/specs/legal-rule-registry-criminal-plea-and-costs.md`.*

   > ONE

30. *The registry — the V-4 notes act's count — SUPERSEDED: compressed: the act's verification detail. Survives at: the AUD-3 bullet's re-derived 22 `VERIFIED` lines; the entry recording `RL-5`.*

   > and no Status line in that ALL-VERIFIED file was touched, and its 22 `VERIFIED` lines were counted before and after and are identical

31. *The registry — the carrier-duties file's open wording flags — SUPERSEDED: a stale count: TRCP 194's span flag was resolved at `#108`, leaving two flagged. Survives at: the corrected sentence; `docs/specs/legal-rule-registry-discovery-and-carrier-duties.md` (its 193.3 and 192.3(f) notes, and the header's resolution of the 194 span).*

   > three wording expansions there are FLAGGED, NOT ADOPTED** (TRCP 194's span,

32. *The registry — privacy's callers — SUPERSEDED: a stale count: the `Q-WF-6` row's `#154` annotation names `O-1`'s audit limb as a second caller. Survives at: the corrected sentence; the `Q-WF-6` and `G10-4` rows of `docs/specs/attorney-review-queue.md`.*

   > one caller: gate 10 (`G10-4`, #115) —

33. *Design-input memos — the TOC bullet's figures — SUPERSEDED: batch 96's edition and the CODE refresh's unindexed-entry count, both advanced by this batch's regeneration. Survives at: the same sentence, re-derived; the Coverage section of `docs/record/session-log-toc.md`.*

   > 186 rows, `#65`–`#155` GAPLESS**, regenerated over the log as batch 96 wrote it (`TOC-4`'s forty-ninth edition); **at this refresh's working tree the log holds 187 dated entries (186 at `e046906`), and the firm-obligations build's CODE entry is UNINDEXED BY DESIGN until the next batch's `TOC-4`.** *(The log's LAST `## ` line is the `## ARCHIVED:` pointer heading, not an entry and never a row — a bare `grep -c '^## '` returns 188 against 187

34. *FIRM OBLIGATIONS bullet — its head — SUPERSEDED: `#156` ruled the collision named as awaiting his ruling, ruled every default, and confirmed the text acts it called all provisional (some act strings stay provisional, slice §12). Survives at: the rewritten head; `docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md`; slice §12; the 2026-09-12 CODE entry.*

   > Its thirty-three `FOD-` defaults, its text acts (all PROVISIONAL) and the review's fixed defects are in the 2026-09-12 CODE entry; **the slice's collisions — ONE NEEDING HIS RULING, §8 against `FOD-4` on what may unlight a lit occurrence — are in `docs/spec-feedback.md`'s 2026-09-12 section.**

35. *FIRM OBLIGATIONS bullet — the template status list — DISPLACED: detail the spec carries. Survives at: `docs/specs/firm-obligations-module-spec.md` §7.*

   > — UNVERIFIED / TIER B / NOT HELD / NOT READ / HIS FACT / PRACTICE / EVENT-DRIVEN / DO NOT SEED —

36. *FIRM OBLIGATIONS bullet — `FO-7`'s facts and DECISION 0 — SUPERSEDED: compressed; the facts are carried from the `e046906` CODE refresh, not re-read by this batch. Survives at: the rewritten sentence; the QBO memo bullet (#87) for the research memo; `docs/specs/firm-obligations-rulings-2026-09-10.md` for DECISION 0.*

   > 's two facts, re-read at this CODE refresh: no QuickBooks code or table; the research memo exists, PROPOSED — RESEARCH ONLY**; so `FO-3`'s conditional limb is ruled NOT to fire (DECISION 5: thin, no hook) — **`FO-7` CLOSED; `FO-5` CLOSED on DECISION 4 (owner scope now).** *"Firm obligation"* is the word (DECISION 0).

37. *FIRM OBLIGATIONS bullet — the §11 five as accepted-gated — SUPERSEDED: the sitting they were accepted as has RUN. Survives at: this bullet's head ("spec §11's five DONE").*

   > **The spec §11 five are ACCEPTED as THE FIRM-OBLIGATIONS HANDS-ON SITTING, gated on the build, now met.**

38. *CAPACITY — the reading — SUPERSEDED: `#155`'s reading, replaced by `#156`'s. Survives at: `#155`'s entry.*

   > 155` read the meter at **1,628,404 / 2,000,000 = 81.4%**, thirteen

39. *CAPACITY — the log census — SUPERSEDED: the CODE refresh's working-tree census, re-derived over the log as this batch writes it. Survives at: the same sentence, re-derived.*

   > 187 dated entries (the newest an unindexed CODE entry), 91 design `#nn`, high-water `#155

40. *CAPACITY — transit eligibility — SUPERSEDED: `#156` names both pairs checkable once this batch is at HEAD. Survives at: `#155`'s and `#156`'s entries.*

   > became TRANSIT-ELIGIBLE once batch 96 landed** (its definitions carried into `docs/record/`, its `FO-`/`BR-3` rows minted) — **to be VERIFIED by a full-text read at a later sitting with his Chrome; nothing moved.** The `#155

41. *For design side — INSTRUCTIONS — SUPERSEDED: `v33` delivered at `#156`; `v32` confirmed in force by `#156`'s live read. Survives at: the rewritten line; `v31`'s copy in `docs/record/transit-2026-09-08/`, named under CAPACITY; `v32`'s in the sitting's four under FIRM OBLIGATIONS.*

   > v32` DELIVERED 2026-09-10 (`#155`) AS THE TRIGGER-3 EDITION, filed as EVIDENCE at `docs/record/firm-obligations-sitting-2026-09-10/project-instructions-v32-as-delivered-2026-09-10.md` — PASTED OR NOT IS MICHAEL'S WORD; THE REPO CANNOT VERIFY THE INSTRUCTIONS FIELD AND DOES NOT.** **`v31` remains the last version confirmed in force by a live read** (`#155`'s); its as-delivered copy is `docs/record/transit-2026-09-08/project-instructions-v31-as-delivered-2026-09-08.md`.

42. *For design side — the in-force reminder — DISPLACED: a duplicate of three bullets that state each rule. Survives at: RUNNER DISCIPLINE and the PF-1 bullet; SOURCING (FC-14); the DT-1 line.*

   > `PF-1`, FC-14's fourth channel and DT-1 remain in force.

43. *For design side — DT-1 — SUPERSEDED: `#155`'s stamp and the CODE refresh's clock, replaced by `#156`'s and this refresh's. Survives at: `#155`'s entry for its stamp; the CODE refresh's date in the 2026-09-12 CODE entry's heading, its 00:35 clock only in this quote.*

   > 155` is stamped 2026-09-10, the Central date of its work (opened 21:34, rulings closed 23:05 CDT); this refresh carries 2026-09-12, read from the wall clock at 00:35

44. *For design side — the DT-1 class sentence — SUPERSEDED: compressed, with this batch's own clock incident as its exhibit. Survives at: the compressed sentence, which keeps the rule; the ~19:00-to-midnight batch window, recorded in the live log's runner lines of 2026-08-19 and 2026-08-20 (the sixty-fifth, sixty-seventh, sixty-eighth, sixty-ninth and seventy-fifth invocations; v33's DT-1 covers only the design-side container's 19:00 rollover); this quote is the only surviving copy of the *local, therefore safe* limb.*

   > rule is unchanged and is the class, not the date: every batch run between ~19:00 Central and midnight reads a UTC date one day ahead, any execution point DT-1 gains must read the wall clock rather than a shell, and “the Code session is local, therefore safe” stays false

45. *SOURCING — `#106`'s acquisition narrative — DISPLACED: spent narrative of an acquisition and a closure recorded at the time. Survives at: `#106`'s entry; `Q-RE-9`'s closure in `docs/record/attorney-review-queue-closed.md`.*

   > Michael acquired six by hand mid-session. **`Q-RE-9` — the convention's first proven gap — CLOSES with it.**

46. *REQ-CAPTURES — the count's method note — DISPLACED: a counting note from the refresh that first met the amendment slice. Survives at: the count itself, unmoved at seven.*

   > (the amendment slice is a BUILD SLICE, not a capture, and does not join this count)

47. *YOUR HAND — (1) the post-`CCS-1` walk — SUPERSEDED: DONE at `#156`. Survives at: YOUR HAND's DONE sentence; the Forms row; `#156`.*

   > (1) **THE POST-`CCS-1` WALK** — the seven proposed hands-on items, the eleven `SD-` text acts, the nineteen `SD-` defaults with `SD-3`'s scope veto, the confirm-or-edit marks, `spec-feedback.md` items 8–11, and the `CAP-2` exemption wording;

48. *YOUR HAND — (10) paste v32 — SUPERSEDED: `#156`'s live read found `v32` in force. Survives at: YOUR HAND's DONE sentence; INSTRUCTIONS.*

   > (10) **paste v32**;

49. *YOUR HAND — (15) and (16) — SUPERSEDED: (16) DONE at `#156`; (15)'s order and check count changed by `FOS-2`. Survives at: the rewritten (15); the DONE sentence; `#156`.*

   > after a backup, STEP 0 first, pasted alone, seven checks in words; (16) **THE FIRM-OBLIGATIONS HANDS-ON SITTING** — the text acts, the `FOD-` defaults, Outlook keep-vs-delete, the leads, `FO-6`, and **the §8-against-`FOD-4` ruling** — then his real activations. **(11) is DONE (the build), its number not reused

50. *NEXT ACTS — the ordered list — SUPERSEDED: the walk and the sitting are DONE (`#156`); `#156`'s order. Survives at: the rewritten list; `#156`'s Next line.*

   > the FO build), THE WAVE 0 ACTS RUNNING IN PARALLEL AS HIS TIME ALLOWS:** (1) **THE POST-`CCS-1` WALK**, called at `#150`; (2) **the two `H12-v` asks**, in parallel; (3) **THE FIRM-OBLIGATIONS HANDS-ON SITTING → the migration by his hand → his real activations** — the ruling sitting (`#155`) and the build (2026-09-11) are DONE; (4) **the DECISION 8 drafting act**; (5) **the split-store slice, AFTER the walk** (`Q-API-20`); (6

51. *NEXT ACTS — the CC-1 sitting narrative — SUPERSEDED: the `#148` sitting's narrative, and a count `#156` moved. Survives at: `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md`, cited later in the same bullet; `#148`.*

   > SITTING — HELD 2026-09-05 (`#148`) WITH THE RUNNING PRODUCT IN FRONT OF HIM; SIXTEEN RULINGS, AND NINE OF THE TWENTY-ONE ACCEPTED ITEMS CLOSED.** **TWELVE ACCEPTED REMAIN, ALL NAMED, ELEVEN

52. *NEXT ACTS — the eleven's ripeness citation — DISPLACED: a citation for a gating the sentence already states. Survives at: the same sentence (GATED ON AN UNBUILT MODULE).*

   > (behind unbuilt modules per the 2026-08-24 audit's ripeness note)

53. *NEXT ACTS — `FO-6`, the seven proposed, the five, the two held — SUPERSEDED: `#156` disposed the seven, ruled `FO-6` in shape, and ran the sitting the five were gated on. Survives at: the rewritten sentences; `docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md`.*

   > its gate, the build in demo mode, is met; its content is the sitting's item 4). SEVEN PROPOSED REMAIN, untouched: D-18, D-8, per-paragraph regenerate, `AS-Q14`, `AS-Q15`, `AS-Q16`, `AS-Q17`.** **FIVE MORE ACCEPTED-GATED, ADDED 2026-09-10 (`#155`): the FO spec §11 items, gated on the FO build in demo mode, NOW BUILT — THE FIRM-OBLIGATIONS HANDS-ON SITTING; its item 4 is `FO-6`'s, already among the twelve.** **AND TWO HELD ITEMS ARE

54. *NEXT ACTS — §3's durable IDs still unanswered — SUPERSEDED: a stale count: six of the sixteen were minted at `FE-D1A-1` (2026-09-02); ten stay proposed. Survives at: the corrected entry; `FE-D1A-1` in `docs/record/attorney-review-queue-closed.md`.*

   > sixteen

55. *NEXT ACTS — the Tasks 14, 15 and 17 open tallies — SUPERSEDED: stale tallies: Task 14 has 7 questions and 3 looks open, Task 15 has 9 and 4, Task 17 has 4. Survives at: the corrected tallies; those tasks' rows in `docs/specs/attorney-review-queue.md` and `docs/record/attorney-review-queue-closed.md`.*

   > 9+3, 11+4, 7 (`Q-T3P-1`), 3

56. *H-STRING — the newest-series note — DISPLACED: stale: newer series (FO, FOS, FXD) have been minted since. Survives at: the naming-caveat sentence before it.*

   > **`FC`, `D-SMTP` and `GL1` are the newest series and only `GL1` needed a flag**

57. *For design side — the cr3 map's corrected lines — DISPLACED: a duplicate. Survives at: the IN-2 bullet under Design-input memos (TWO LINES OF `cr3-field-code-map.md` ARE CORRECTED IN THE SPEC AND THE FILE WAS NOT EDITED).*

   > **Two of its lines are corrected by the #84 spec and the file was NOT edited**

58. *VERIFICATION STATUS — the unreviewed range — SUPERSEDED: `#156` filed; the range re-derived over the log as this batch writes it. Survives at: the same sentence, re-derived.*

   > 155 — **81 entries on the inherited basis, re-derived at this HEAD (A-4)**, `#155` filed here — the runner lines interleaved through the ninety-sixth

59. *VERIFICATION STATUS — the two bases — SUPERSEDED: the bases re-derived with `#156`. Survives at: the same sentence, re-derived.*

   > 155 = 81; STRICT positive-clearance basis #65–#155 less #67 = 90

60. *The register — batch 96's acts — SUPERSEDED: batch 96's account, replaced by batch 97's acts. Survives at: batch 96's runner line; the superseded `#155` sentence at the end of RECONCILE HISTORY in `docs/record/attorney-review-queue-closed.md`.*

   > 155`.** **BATCH 96 FLIPPED THIRTEEN ⬜ → ✅ AND MOVED THEM (the twelve `Q-FO-` rows and `Q-API-20`), BORE TWO ⬜ (`FO-6`, `BR-3`) AND SEVEN ✅ (`FO-1`–`FO-5`, `FO-7`, `FOS-1`), ANNOTATED `Q-STAT-5` add-only AND AMENDED the FIRM OBLIGATIONS heading.** ⬜ 386 → 375

61. *The register — the synced file's size and counts — SUPERSEDED: re-measured after batch 97. Survives at: the same sentence, re-measured.*

   > 446,315 B**) holds **375 `⬜`, 7

62. *The register — the closed file's size, counts and conservation — SUPERSEDED: re-measured after batch 97. Survives at: the same sentence, re-measured.*

   > 291,131 B**) holds **163 `✅`** — **total ✅ 174 with the eleven held parents; the closed file CONSERVED: 143 + 13 moved + 7 born = 163.** So **375 open, 382 open-in-substance** with the seven `🟡`. **Batch 96 appended the superseded `#154

63. *The register bullet — §3's IDs still Michael's to mint — SUPERSEDED: a stale count: six of the sixteen were minted at `FE-D1A-1`. Survives at: the corrected sentence; `FE-D1A-1` in `docs/record/attorney-review-queue-closed.md`.*

   > any

## 2026-09-12 (#156) — (Typed design session, Cowork, Fable 5.1 per the environment; opened 08:02 CDT on the standing kickoff for the hands-on sitting, paused ~08:10–22:04 CDT, the last ruling — `FOS-2` — at 23:55 CDT; DT-1 stamps it 2026-09-12, the Central date of the sitting's work, its packaging crossing midnight on the `#153`/`#155` precedent; DEVICE BRIDGE GRANTED on the checkout but the bridge VM's shell could NOT mount it — twice, the 2026-09-10 failure — so every repo read was a staged read-only copy and the packet is delivered by `device_commit_files`: THE FIRM-OBLIGATIONS HANDS-ON SITTING AND THE POST-`CCS-1` WALK — the two walks every list at HEAD named next, taken in one sitting per CC-1(c), Michael running the app himself in his own Chrome in demo mode on the fixture and ruling from what he saw, one question per widget, every ruling in a running ledger in his words: THE §8-AGAINST-`FOD-4` COLLISION RULED "(A)" — no code change; the `/cases` card, the register, the four forms, the catalog and thirty-three `FOD-` defaults CONFIRMED as built; THE OUTLOOK REMINDER RULED AS HIS COMPOSITE (hard items only; 30 days by default; a per-obligation field) after his own words that most case deadlines "need to remind at most 30 days out"; Done keeps the event and kills its reminder; the staleness fallback NOT built; `FO-6` "later"; the leads stand; seven firm-obligations fixes and — from the post-`CCS-1` walk — six disclosures fixes gathered into `docs/specs/firm-obligations-fix-slice.md`, audited by two lanes, and AUTHORIZED WHOLE (`FOS-2`, verbatim "Yes"); the split address, the Medical/Forms surfaces, `SD-3` and `R8`'s strings CONFIRMED; six `CCS-1` text acts and `SD-14` left PROVISIONAL by name because he did not reach them; `D-18` "no episode sentence", `D-8` "don't add the sentence", `AS-Q14` (b), `AS-Q15`/`AS-Q16` as default, `AS-Q17` "pause still fires, then designate", THIRD TRANCHE items 8/10/11 fixed by ruling, per-paragraph regenerate "later"; `CAP-2a` ruled (TRIGGER 3 — v33 delivered); nothing built, no migration run, no tracked file written, no Outlook event created, no ID minted beyond the fix slice's `FXD-` defaults, no legal characterization)

**Verified from staged copies before anything was said** (every check names its source): HEAD `5781420` on `master` = the local `origin/master` tracking ref (`.git/refs/heads/master` = `.git/refs/remotes/origin/master`) — **a local read, not a QR-3 pass; no live `ls-remote` was possible this sitting**; the live log's top entry the firm-obligations build's unnumbered CODE entry (`## 2026-09-12 — CODE SESSION (Opus 5, fresh, fired from …`; 53,975 B with its `CAP-4` tail), read whole, UNINDEXED in the head file by design; `docs/spec-feedback.md`'s `## 2026-09-12` section read whole (parts A–C); BUILD-STATE at `e046906` (99,994 B per its banner) read whole; the head file (batch-96 edition — nine §1 entries each confirmed present in the live log by heading; 186 §2 rows) read at its banner and §1 headings, the live log being the authority; `(#156)` 0 hits, `(#155)` 3 hits in the staged log; `FOS-2`, `CAP-2a`, `FXD-` 0 hits over the fifteen staged repo files (not repo-wide — the runner re-checks); instructions **v32 in force by a live read of the field** at 08:02 CDT; knowledge meter **1,690,163 / 2,000,000 = 84.5%** at open, fifteen docs (`Q-CAP-5(a)` did not fire); `package.json` at HEAD: `dev:demo` = `vite --mode demo --port 5175` — so the demo URL given was `http://localhost:5175`, not README's 5173 (an operational note in v33). **CC-1 hands-on queue stated at the top** (rule 6): THE FIRM-OBLIGATIONS HANDS-ON SITTING (the five spec §11 items + `FO-6` + everything the build handed back); THE POST-`CCS-1` WALK; the eleven accepted items gated on unbuilt modules, named; the two CC-1(b) holds from `#154`. **Two preconditions by widget:** the migration — *"Not run"*; the demo app — *"Up — Demo mode, Obligations in the nav"*.

- **PART ONE — THE FIRM-OBLIGATIONS HANDS-ON SITTING, ten items, every pick his (the rulings record `docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md` §1 carries the option text under each):** (1) §8 against `FOD-4` — first *"I need to to explain this a bit more to me"*, then, on the bar-dues example, ***"(A) Yes — settings are editable any time"*** — NO code change; the build slice's §8 and §7 item 21 amended by this packet · (2) the card ***"Confirm as built"*** — part C items 2, 9, 10 accepted; `FOD-14`/`FOD-26` reworded in spec §16 · (3) the register ***"Confirm as built"*** ("Needs attention" unseen, PROVISIONAL) · (4a) activation + edit ***"Confirm both, override label stays "due date""*** · (4b) close, re-activation, double activation ***"Confirm all three as built"*** · (5) the catalog ***"Confirm as built"*** (no weekend default put — DECISION 8's act) · (6b) the reminder — outside the set: *"Let's talk this one through some more to tailor it. I do not want all of the events to carry a reminder."*, then his own words ***"Most deadlines in a case need to remind at most 30 days out, except for important deadlines that we need more time to think about, like expert designation deadlines."*** (about CASE deadlines — carried as a DIRECTION for the `FC-7` deadline engine), then the composite for this module ***"That looks correct."*** — hard items only; 30 days before target by default, or the lead if shorter; a per-obligation "Outlook reminder days" field; DECISION 7's reminder limb amended, `FOD-29` re-based · (6a) Done → event ***"Keep it, retitled, but kill the reminder"*** (`FOD-22` amended) · (6c) staleness ***"Register and card are enough"*** — no fallback · (6d) the empty "MDBP Firm" calendar: his hand, information only · (7) `FO-6` ***"Firm-wide calendar page, later"*** → 🟡; the leads — *"Explain this a bit more for me."*, then ***"Stand as shipped"*** · (8) the eleven list-only defaults ***"All eleven stand"*** — all thirty-three `FOD-` RULED · (9) part B item 1 ***"Add the column (Recommended)"***; part B item 2 ***"Tighten it (Recommended)"***; part C item 6 ***"Build the RPC functions now"***; part C item 7 ***"Retry on next sync (Recommended)"***; part C items 8/14 ***"One act, one line (Recommended)"***; part C item 15 ***"Not needed once RPC lands (Recommended)"***; items 3 and 12 not put, left as built · (10) part C item 16 — no ruling; the `FOS-1` kickoff prompt's two "no delete" lines corrected to §8's words by this packet. Fix routing: ***"Draft the fix slice tonight; put FOS-2 to me (Recommended)"***; scope: ***"One slice, two groups (Recommended)"***.
- **PART TWO — THE POST-`CCS-1` WALK (called at `#150`):** the split address ***"Confirm as built"*** (`SD-5`, `SD-6`) · the Medical tab and the instrument ***"Confirm all as built"*** (`SD-1`, `SD-16`, `SD-17`, `SD-18` CONFIRMED as strings; `SD-2`, `SD-4`, `SD-7`–`SD-10`, `SD-13`, `SD-19` ruled as built) · `SD-3` ***"Instrument-wide stands"***; `R8`'s strings ***"Confirm as built"*** (THIRD TRANCHE item 9 not widened) · the remaining text acts — *"Confirm all but ones I haven't reached"*, reached: **none** — `R1`'s route line and tier-3 panel line, `R10`'s pronoun line, `R15`'s title strings, `SD-12`, `SD-11` STAY PROVISIONAL by name; `SD-14`/`HS-4` ***"Didn't reach it — hold"*** · the seven proposed: `D-18` *"Change the form"* → ***"No episode sentence at all"***; `D-8` ***"Don't add the sentence"***; per-paragraph regenerate ***"Yes, later slice"*** (🟡, no durable ID); `AS-Q14` ***"(b) Re-designate the facility whole"***; `AS-Q15` ***"Stand as default"***; `AS-Q16` ***"Stand as default"***; `AS-Q17` *"Designate under the treating paragraph"* → on the pause limb ***"Pause still fires, then designate"*** · THIRD TRANCHE item 8 ***"Fix — print it once"***; item 10 ***"Have Code tokenize the master"***; item 11 ***"The Providers section's list (case_providers)"*** · **`CAP-2a` — *"Edit rows carry — (Recommended)"*: the class is a BIRTH rule for new files; an edit-in-place row inherits the edited file's class and carries `—` — TRIGGER 3 FIRES; v33 delivered.** As of `#150` the live database's two parties were the test record's and neither needed a split; he stayed in demo mode throughout.
- **`FOS-2` — THE FIX SLICE, DRAFTED AFTER EVERY RULING AND AUTHORIZED WHOLE.** `docs/specs/firm-obligations-fix-slice.md` (RULING; two groups — A: the seven firm-obligations fixes, the UNRUN migration AMENDED IN PLACE with four columns, one replaced CHECK and nine per-act Postgres functions, store v18; B: the six disclosures fixes incl. the master `.docx` tokenized at exactly two heading spots; eleven `FXD-` defaults) and `docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md` (RULING; a pointer that fires on this entry and on the migration still being unrun) were delivered as files BEFORE the question. **Two read-only adversarial lanes ran on the first draft, told to refute — lane A (fidelity to the ledger): 2 HIGH / 7 MEDIUM / 7 LOW; lane B (HEAD facts and conventions): 2 HIGH / 7 MEDIUM / 6 LOW. Every HIGH was real:** a rulings record cited but not yet written; a reminder formula (`min(reminderDays, leadDays)`) that would have silently ignored the hand-raised value his composite's limb 4 exists for — rewritten as `FXD-9` (the field pre-fills `min(30, leadDays)` and fires exactly) and put INSIDE the `FOS-2` question; "five columns" for four; an unsupported claim that the `R15` scalars already resolve to the static heading. All fixed; record at `docs/record/firm-obligations-hands-on-2026-09-12/adversarial-audit-2026-09-12.md`. Put whole — *Yes* / *Yes, group A only* / *Break it down into limbs* / *Not tonight* — **RULED YES, verbatim *"Yes"*, 23:55 CDT.** The build is a fresh Opus Code session Michael fires from the prompt; the queue runner is BARRED from it; the ruled order is fix build → the migration by his hand (ten checks) → his real activations.
- **ADJACENT (CC-1(c)), offered and not pressed:** `Q-API-14` and `Q-API-3`'s filing half ***"Keep both held (Recommended)"***; `Q-API-18`'s two facts and `Q-API-19` ***"Not now — stay open"***; `Q-STAT-7` ***"Not yet — stays open"***; Wave 0 (b) not offered (no Outlook sign-in this sitting).
- **WHAT SHIPPED (this packet, docs-only):** this entry; THREE RULING files — the rulings record, the fix slice, its kickoff prompt; FOUR EVIDENCE files under `docs/record/firm-obligations-hands-on-2026-09-12/` — the ledger, the walkthrough capture, the audit record, v33 as delivered; two exact-match replacements and one append on the build slice; one append on the spec's §16; two exact-match replacements on the `FOS-1` kickoff prompt (part C item 16); the register's three acts — `FO-6` ⬜ → 🟡 annotated, `HS-4` annotated add-only (held), `Q-API-14` and `Q-API-3` annotated add-only (held again), one 🟡 row BORN for per-paragraph regenerate (label only — a durable ID is his to mint), `FOS-2` BORN ✅ in the closed register under the FOS heading, the reconcile sentence advanced; the BUILD-STATE facts in this packet's §4.5. **`CAP-2`:** every row that places a file carries its class; the edit rows carry `—` by `CAP-2a`. **§5 is NONE for the runner.**
- **WHAT DID NOT HAPPEN, each because a rule bars it or because it is his:** nothing built; no `src/`, `db/`, `supabase/` or tracked file written (`package.json` and `db/migrations/2026-09-10-firm-obligations.sql` read from staged copies for verification); no migration run — his word *"Not run"*, and the ruled order now inserts the fix build before it; no consent clicked; no Outlook sign-in, no event created, none deleted (none existed); no real date, county or appointment list asked (H5, `FOD-9`); no registry entry, no roll default, no cite string touched — PF-1 did not fire; no capture relocated (the `#137` Voice2 pair's condition (2) not verified tonight); no `git` command on his machine; `Q-STAT-7` not put. **One reading caught before it bound:** the reminder cap, above. **One form point:** every question this sitting went through the answer widget. Bridge scratch on his machine: none beyond the packet zip in `inbox/` and the v33 file at `C:\Users\Brennan\brennan-case-manager\Claude outputs\project-instructions-v33-2026-09-12.md` (his hand to clear; the pre-audit copies of the `#155` files sit there too — batch 96's FINDING 5).

**Next:** the queue runs this packet on `mdb-pllc` (batch 97), which also indexes the firm-obligations build's CODE entry into the head file (`TOC-4`); Michael clicks Sync; **Michael pastes v33**; then his hand — `/usage`, a FRESH Opus Code session, *"run docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md"* (`FOS-2` at HEAD; the migration still unrun); then the migration by his hand (ten checks after the fix build); then his real activations. In parallel as his time allows: the two `H12-v` asks; the DECISION 9A acquisitions; the DECISION 8 drafting act (an Opus design session, PF-1 there); `Q-STAT-7`; `Q-API-18`'s two facts and `Q-API-19`; the Wave 0 acts; the `#137` Voice2 pair's and the `#155` pair's TRANSIT at a sitting with his Chrome (both checkable at HEAD once batch 97 lands — the `#155` pair's routing table names batch 96's placements; the `#137` pair's definitions carried at `#155`); the six PROVISIONAL `CCS-1` text acts and `SD-14` at a later hands-on sitting; `FO-6`'s firm-wide calendar page and per-paragraph regenerate as later slices, each its own authorization; the split-store slice after (`Q-API-20`); go-live, his day.

**Staged for Code:** the rulings record, the fix slice and its kickoff prompt (RULING); the ledger, the walkthrough capture, the audit record and v33 as delivered (EVIDENCE); the build slice's two replacements and §12 append; the spec's §16 append; the `FOS-1` prompt's two replacements; the register's three acts; the BUILD-STATE facts in this packet's §4.5. **Nothing under `src/`, `db/`, `supabase/` or build tooling.**

**Awaiting/Returned from Code, unreviewed:** as BUILD-STATE's own line states at HEAD — recompute it there (`OPEN-5(a)`, start-of-session rule 5). What this session can truthfully add: the firm-obligations build's CODE entry (2026-09-12) was READ design-side whole, and its "Awaiting/Returned from Code" list is DISPOSED by this sitting item by item — the migration (his word, unrun), the §8-against-`FOD-4` ruling (A), the text acts (Part One's confirmed; "Needs attention" provisional), the thirty-three defaults (all ruled), Outlook keep-vs-delete and the reminder (ruled), the leads (stand); batch 96's runner line was read whole and its landing verified by existence of the three RULING paths and the EVIDENCE directory (`device_stage_files` of the rulings record and slice; `device_list_dir`); the `CCS-1` build's "Awaiting" list is PARTLY disposed — the confirm marks, `SD-3`, `SD-1`/`SD-16`/`SD-17`/`SD-18`, the R8 strings and the four reported findings are ruled; six text acts and `SD-14` remain for his eye. **Still open and still Michael's:** paste v33 · fire the fix build · run the migration after it · his real activations · the two `H12-v` asks · the DECISION 9A acquisitions · the DECISION 8 drafting act · `Q-STAT-7` · `Q-API-18`'s two facts · `Q-API-19` · `Q-API-14` and `Q-API-3`'s filing half (held) · the Wave 0 acts · the two TRANSIT-eligible pairs · the six PROVISIONAL `CCS-1` text acts and `HS-4` · the "MDBP Firm" calendar (keep or delete) · `Claude outputs\` (three pre-audit copies and v33) · the two untracked 2026-08-24 files (DO NOTHING) · a trigger-7 monthly review pass, due by month's end · go-live, his day.

## 2026-09-12 — CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-firm-obligations-slice-build-session.md`; queue runner BARRED; unnumbered per TOC-6) — THE FIRM-OBLIGATIONS SLICE IS BUILT: fixture-only in demo mode and walked by clicking; ONE MIGRATION WRITTEN AND NOT RUN; four stops put to Michael and each ruled by his pick; all thirty-three named defaults reported by number, four NOT built as named; every text act PROVISIONAL; an adversarial review, three rounds deep, confirmed defects the green suite had passed — every one fixed or filed before this entry — ONE COLLISION NEEDING HIS RULING (§8 against `FOD-4`) AND TWO WORDING DEPARTURES FILED FOR HIS EYE; `FOM-8` RUN AGAINST HIS REAL OUTLOOK (the demo-mode app, three throwaway events, all deleted), the long reminder READ AS HONOURED once its fire time was current (a 180-day reminder five months stale did not surface)

**THE AUTHORIZATION, QUOTED, AND THE TEST IT SATISFIES.** The prompt fires on `FOS-1` ruled AFFIRMATIVELY at HEAD and on nothing else. The entry is **`## 2026-09-10 (#155)`**, its `FOS-1` bullet, read at HEAD `cab3b1c`: *"**RULED YES, verbatim *"Yes"*, ~23:03 CDT**: `FOD-20` (the `review_log` CHECK also takes `cancelled`, closing `#151`'s live-write mismatch) IN; the §2.3 synthesis confirmed."* **`FOD-20` IN → the CHECK takes TEN values.** Read at HEAD; not inferred from a register glyph.

**STEP 0.** `git fetch origin` exit 0; `git ls-remote origin refs/heads/master` (the live remote read) returned `cab3b1cdd17918717cc652a1bf83c0cf5664f237`, equal to local HEAD, on `master`, tracked tree clean. The three untracked paths — `Claude outputs/`, `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md` — are Michael's; **nothing was done to them**, and every `git add` through `e046906` named explicit paths. `inbox/` was EMPTY, so `MM-1` cleared and this session never doubled as the runner. **DT-1:** this entry carries the close-out date, 2026-09-12, read from the wall clock at 00:06 CDT; the build, the click-through and `FOM-8` ran on 2026-09-11 and keep that date below.

**BASELINE, BEFORE A LINE WAS WRITTEN — RED, AND A STOP.**
- **The run.** `npm test` **exit 1**: `Test Files 1 failed | 48 passed (49)`, `Tests 746 passed (746)`. `npm run build` 0, `npm run lint` 0 (4 warnings, all in the mock source below), `npx tsc -b` 0.
- **The failing file was not a product test.** Vitest's default glob collected `docs/record/firm-obligations-design-2026-09-07/mock-source-2026-09-08/test/domain.test.js`, the design mock's plain-node harness filed as EVIDENCE at `44409ef` (batch 93). It dies at collection on `require('../src/domain.js')`, a path the filed tree does not have.
- **Why no one saw it.** Batches 93–96 were docs-only and skipped the health check.
- **Put to Michael as a stop; RULED — his pick: *"Exclude docs/ from vitest (Recommended)"*.**
- **Commit `7c68eb9`.** `vite.config.ts` gained `test.exclude: [...configDefaults.exclude, 'docs/**']`, with the filed evidence untouched. After it, `npm test` exit 0 at 746 tests / 48 files, `tsc -b` 0, lint 0. Lint then carried a fifth warning, `7c68eb9`'s own triple-slash reference in `vite.config.ts`; `0cd201c` removed that line.

**STEP 2 — THE PREMISES RE-VERIFIED AT `cab3b1c`, ONE DELTA.** Every premise held:
- `calendar_events.case_id uuid not null references cases (id) on delete cascade`;
- 28 `path=` lines in `src/App.tsx`, none under `/firm` and no top-level `/calendar` route (the one calendar path is the case tab's `/cases/:id/calendar`);
- `review_log.action`'s six-value CHECK, and the only migration naming `review_log` (`2026-07-28-cl2-client-dimension.sql`) widens nothing;
- `toGraphEvent(ev: CalendarEvent, caseRec: CaseRecord)` and `ensureCalendar` by `OUTLOOK_CALENDAR_NAME`;
- `STORE_VERSION = 16` with literal-pinned steps; `SCHEMA_TABLES` 46 and its sequence test;
- `appendReviewLog` on both adapters; `WorklistCard`'s "renders nothing when there's nothing to do"; `CalendarTab.tsx`'s `action: 'cancelled'`;
- `snooze` and `quickbooks|qbo|intuit` in 0 files.

**Delta: `ReviewLogEntry.action` in `src/domain/billing.ts` ALREADY listed `'cancelled'`**; only the SQL CHECK lacked it. It changes no ruling.

**THE STOPS — EACH PUT TO MICHAEL WITH OPTIONS CLAUDE WROTE, EACH RULED BY HIS PICK.**
1. The red baseline, above.
2. **`FOD-21` could not be built as named.** Its "one target-passed on a weekend-dated row under each `weekendRule`" cannot exist under `unknown` (§2.3 item 4's precedence), and the product reads the real today, so target-passed under the other two settings exists only on Sat–Mon (rolls-forward) or from the Saturday through the weekend rule date itself (no-roll). His pick: *"Seed from the day the demo store is created (Recommended)"*.
3. **`FOD-29`'s two phrasings disagree across a daylight-saving change** — "from the event's start (00:00 local on T) back to 00:00 local on `lightsOn`" against "i.e. `leadDays × 1440`". His pick: *"Fire at the lit moment (Recommended)"*, the real minutes between the two local midnights.
4. **`FOM-8`'s timing.** His pick: *"Yes, when you're ready"*: the build finished and verified first, then the live check in this session with him.

**Three further departures were NOT put to him as stops, and should have been under the kickoff's Step 4 ("any default you found you could not build as named is a STOP"), read with its DO-NOT preamble that slice §8 "binds in full".** All three are filed at `docs/spec-feedback.md`, 2026-09-12 section — for his ruling (part C item 1) and for his eye (part C items 2 and 9):
- **Part C item 1:** slice §8's bar on "any control that unlights an occurrence other than Done, Not-applicable (conditional rows only) and Undo" against `FOD-4`'s edits.
- **Part C item 2:** `FOD-26`'s lit card line drops its day count on a weekend `unknown` row, where §8 wins.
- **Part C item 9:** `FOD-25` and `FOD-26` print "1 day" at N = 1, not the named "N days".

**WHAT WAS BUILT — commit `0cd201c`** (36 files, +7,760 / −36):
- **The domain.** `src/domain/firmObligations.ts` holds the six rule kinds, materialization (`FOM-4`, `FOM-1`, serial and collapse), R/T/D, `lightsOn` and the five display states, the strong line, the card and register views, and every act PLANNED as pure data. Neither adapter decides anything, so the two modes cannot diverge.
- **The catalog.** Thirty-five templates plus the BOI note row are GENERATED from SPEC §7 byte-for-byte by `scripts/generate-firm-obligation-catalog.mjs`, with a drift test and `--check`. Every template's `weekendRule` is the literal `'unknown'`.
- **Both adapters' methods, and store v17.** The v17 step has two collections, a literal `17`, a `-backup-v16`, and every older version chained through it. The `FOD-21` fixture is seeded on both the migrated and the fresh path.
- **The register** at `/firm/obligations` (nav "Obligations"): Overdue pinned, twelve months by TARGET month, Later, Inactive collapsed, the catalog, Activate…, Custom, Done, Not applicable…, Undo, Edit…, Retire.
- **The `/cases` card** directly below the legal-watch card.
- **The Outlook sibling:** `toGraphFirmEvent` on the separate "MDBP Firm" calendar, all-day on T, `FIRM|obligationId|occurrenceId` on the existing property id, `isReminderOn: true`, and reminder minutes by the ruled rule. The case path is byte-identical.
- **The migration, `db/schema.sql`, `SCHEMA_TABLES` 46 → 48** (47 policy-true), and the tests.
- **The build's own lanes.** Catalog, migration and Outlook went to three builders, each checked by an adversarial verifier. Every lane touched only its own files, and none returned a HIGH finding. The verifiers' MEDIUM and LOW findings were dispositioned before `0cd201c`: the DST minutes went to Michael (stop 3 above); an `isReminderOn: false`-on-done deviation, which Claude's own lane instruction had caused, was reverted to the slice's literal `true`; and a same-name calendar guard was added, with its tests.

**THE WHOLE-BUILD ADVERSARIAL REVIEW, AND THE FIXES — commit `e046906`.**
- **How it ran.** Five finder lanes read the build against the slice: scope and parity; the defaults; the DO-NOTs and the tests; correctness; the UI and text acts. Five independent refuters, one per lane, then tried to break every finding, with probes. **Of 46 findings, one was refuted** (a nearest-candidate tie-break that can never move a date later); the rest held, some re-rated.
- **The DO-NOT sweep.** The sweep table (lane L3, run at `0cd201c`) marked every limb it listed CLEAN except two: "migration run / DB connected" (not provable from the repo) and "a real date or fact" (the fixture's borrowed statute dates, fixed below).
- **Two §8 DO-NOTs the table did not list were found elsewhere in the review.**
  - The card's day count on a weekend `unknown` row: a breach, fixed below.
  - Edits that return a lit occurrence to pending: a collision filed for his ruling, not decided.

The defects that mattered, all passed by the green suite and all fixed:
- **A back door out of FO-2 on every template.** The `FOD-4` guards keyed on the display label `overdue`. Under `unknown`, a weekend-dated occurrence shows past-date-unknown while overdue holds beneath it. So a later override or rule edit could move it out of FO-2, including by a three-step route (edit onto a Saturday, override later, edit back). The guards now test **today > D**.
- **FOM-4 on month-precision rows (FOT-1 and FOT-25, both go-live templates).** A mid-month "last period completed" reopened the period he said was done, as overdue. Any day in the due month now names that period. **A day-precision date that is not one of the rule's due dates is REFUSED, not guessed** — a reading, filed at `spec-feedback.md`.
- **Done after a kept rule edit** opened the closed period a second time.
- **Re-activation** reopened a period already closed, and reopened a done one-time row as overdue.
- **Interval edits** re-dated from the wrong completion, or not at all.
- **An edit that changed nothing** was logged as a rule change (Postgres jsonb key order).
- **The `FOD-21` fixture** borrowed three SPEC §7 statute dates, and missed the named mix on about one creation day in seven (FOT-8/FOT-9 lit ~46 days a year, FOT-1 past-date-unknown ~5). Every date is now invented from the creation day, and a 731-day sweep pins the mix.
- **The card** printed a day count on a lit weekend `unknown` row (the §8 DO-NOT).
- **The register page.**
  - The catalog's activation form opened off-screen; it now scrolls into view.
  - An act's error shows in the row or form that started it, and the act's buttons are disabled while it runs.
  - Details prints no "due" date on a weekend row under `unknown`.
  - Every Inactive row shows its template's catalog text and source, so the BOI row now shows its note.
  - The Inactive "Activate…" re-pushes an occurrence the edit moved, writes no edit when nothing changed, and takes "last period completed" on a first activation.
  - A retired row's open occurrence gains Re-activate.
  - "+ Add obligation" waits for the register to load.
  - Category and review-log slugs show as words, and SPEC-cell markdown is stripped at display, the Outlook subject included.
  - Every on-screen string carries PROVISIONAL with a cite, pinned by an AST-walking test. A verifier's scratch copy of that walker, run on the `0cd201c` page, found 81 unmarked literal lines — a stricter count than the review's "about 41".
  - The card renders from one pure summary.
  - A "Needs attention" list shows any active obligation with no open occurrence.
  - The DST reminder test pins its zone at runtime; it was proven under `TZ=UTC`.
- **The Supabase adapter and sync.**
  - Every act compensates a failed later write by UPDATE, or by re-inserting a row it deleted, and never by a compensating DELETE.
  - Its errors fall into three classes: not saved, saved without its log line, could not restore.
  - A failure-injecting fake pins every failure point. The firm adapter test file runs 67 tests at `e046906`; it ran 14 at `0cd201c`.
  - Every act's review-log action and entity type are pinned on both adapters.
  - The firm half of the Outlook drain continues past a row that throws, under a new sync test file with mocked auth and Graph.
- **The second verification round, and what it fixed.**
  - **A landed act whose Outlook push then failed looked failed,** and its error could be shown nowhere, because the reload unmounted the row that held it. Every push now goes through one catching helper, which reports "saved, but not pushed to Outlook"; the row stays queued for Sync now. An error whose row is gone goes to the top of the page.
  - **The Inactive "Activate…" could leave half an act:** a refused "last period completed" still saved the rule edit. The page now asks the domain first (`reactivationProblem`, a dry run of both plans) and writes nothing on a refusal.
  - **Forms could close mid-act.** The controls that open or close a form, and a row's other acts, are disabled while an act on that row runs.
  - **A catalog activation could be duplicated.** Its form closes the moment the write lands.
  - **Edits that changed nothing still wrote log lines.** "Save changes" with nothing changed, and "Set this date" with the date already in force, now write nothing. A month-precision row's own month-end still counts as a change, since it alters when the row lights (FOM-6).
  - **Undo's "not deleted in Outlook" line read as a success.** It is now a warning.
  - **Some Inactive rows had no Details panel.** Every Inactive row now carries one, so the review log a could-not-restore message points at is always there.
  - **The Supabase adapter's messages.**
    - They show the obligation's name without markdown.
    - They name any date the activation carried that a retry would lose.
    - They send him to "Needs attention" only when the state really is stranded.
    - A restore that would put back `synced` over a push that landed in between restores `pending` instead.
    - The firm drain survives a failing obligations read.
  - **Tests.** Two page-test pins a checker showed could be bypassed are tightened. Two adapter branches that behaved correctly but were unguarded got their tests.

**The fixes were built in two rounds of parallel lanes** (the page and card; the Supabase adapter and sync). Each round was checked by an adversarial verifier that re-ran the lane's tests, probed its behaviour with throwaway tests (since deleted) and ran mutants against its test pins.
- **Breaches.** **No lane verifier found a DO-NOT or scope breach beyond the §8-against-`FOD-4` collision above.**
- **Round one's verifiers** found two MEDIUM defects and a set of LOW ones; round two fixed them.
- **Round two's verifiers** found only LOW gaps, all closed before the health check: two page-test pins a mutant could bypass; two correct but unguarded adapter branches; and a message pointing at a Details panel some Inactive rows did not render.
- **The two new adapter tests** were each run against an in-memory mutation of the line it guards, and each failed alone (1 failed, 66 passed). That result was recorded in the session notes from the follow-up agent's report; its result files were not kept.

**THE DEFAULTS TAKEN, BY NUMBER — none approved; every one built as named EXCEPT four:** `FOD-21` and `FOD-29`, built as Michael ruled at stops 2 and 3 (`FOD-29` sends the real minutes between the two local midnights across a clock change, not its "i.e. `leadDays × 1440`"); and `FOD-25` and `FOD-26`. Their day count reads "1 day" at N = 1, and `FOD-26`'s lit card line drops the count on a weekend `unknown` row, where §8 governs. **Those two were NOT put to him as stops;** they are filed at `spec-feedback.md` (2026-09-12 section, part C items 2 and 9).
- `FOD-1` as amended by `FOM-12`: weekends only; T the last business day before a weekend R; D rolls only under rolls-forward; the FOD-1 note under `unknown`; no holiday computed.
- `FOD-2`: 30-day default, template leads pre-filled and editable.
- `FOD-3`: naive local dates, `today` always an argument.
- `FOD-4`: edits touch only the open occurrence; the never-later guard on the past-due CONDITION, not the label (the review's fix); a kept rule edit says so. It also stops a change that would turn a labelled-overdue occurrence into past-date-unknown, even with D unmoved or earlier — an override or a weekend-rule edit is refused, a rule edit keeps its date — a reading beyond `FOD-4`'s "LATER" (part C item 3).
- `FOD-5` as amended by `FOM-1` and `FOM-4`: first and next occurrence; one open, enforced in the domain and by the partial unique index.
- `FOD-6`: exactly one `review_log` line per act.
- `FOD-7`: Undo's only test, read from the close line's trail.
- `FOD-8`: Retire closes nothing.
- `FOD-9`: no date guessed; Supabase seeds nothing.
- `FOD-10` as amended by DECISION 7: the separate calendar, all-day on T.
- `FOD-11`: two weights; order only.
- `FOD-12`: the route and nav label.
- `FOD-13`: no firm occurrence on any case's Calendar tab or queue.
- `FOD-14` as amended by `FOM-13`: hard items only — overdue, or lit / target-passed / past-date-unknown with target within 14 days.
- `FOD-15`: Done on any open row.
- `FOD-16`: an interval is due now unless last-done is entered.
- `FOD-17` as amended by `FOM-6`: month lighting while no override.
- `FOD-18`: Not applicable only on the eight lapse rows, reason required.
- `FOD-19`: no snooze anywhere.
- `FOD-20`: TEN values.
- `FOD-21`: as ruled at stop 2, dates invented from the creation day.
- `FOD-22`: Done PATCHes "Done — " and keeps the event; Undo restores.
- `FOD-23`: `on delete restrict`, no delete method.
- `FOD-24`: the holiday line on the register foot and in the card's expander.
- `FOD-25`: the strong line — **at N = 1 it prints "1 day"**.
- `FOD-26`: the card title and lines — **at N = 1 it prints "1 day", and the lit line carries no count on a weekend `unknown` row, §8 winning**.
- `FOD-27`: below the legal-watch card.
- `FOD-28`: "MDBP Firm", overridable.
- `FOD-29`: as ruled at stop 3 — the real minutes between the two local midnights, not "i.e. `leadDays × 1440`".
- `FOD-30`: lead and weight pre-filled, his dates required, weekend radios preselecting `unknown`.
- `FOD-31`: month-precision R is the month's last day.
- `FOD-32`: a one-time Done retires the row; Undo re-activates.
- `FOD-33`: the Inactive section.

**THE TEXT ACTS — ALL PROVISIONAL, EACH MARKED IN CODE WITH ITS CITE, NONE DESCRIBED ANYWHERE AS APPROVED:**
- the nav label and page title (DECISION 0);
- the card title, lines, "and K more" / "Open the register" and "About these dates" (`FOD-26`, `FOD-24`);
- the strong line in every state and the `FOD-1` note (`FOD-25`);
- the holiday line (`FOD-24`);
- the group headings — Overdue, the month names, Later, Inactive — and "Nothing falls due this month" (`FOM-9`, `FOM-14`, `FOM-3`, `FOM-5`; the month names §2.3's example shape);
- the demo banner (`FOD-21`);
- the retired badge and Inactive lines (`FOD-33`);
- the close form's labels, placeholders and reasons (`FOD-18`);
- the rule-kind and weekend-rule labels, and the activation and edit forms' labels (`FOD-30`, `FOM-4`, `FOD-16`, `FOD-2`, DECISION 6);
- the act-confirmation notices — "Activated: …", "Done: …", "Reopened: …", "Retired: … Its open occurrence stays until done.", "Saved: …", "Nothing changed." — and the landed-but-not-pushed warning (`FOD-30`, `FOM-5`, `FOD-25`, `FOD-7`, `FOD-8`, `FOD-4`, DECISION 7, slice §3 item 10);
- the refusal and error sentences, including the Supabase adapter's three message classes (`FOD-4`, `FOD-7`, `FOD-8`, `FOD-9`, `FOD-18`, `FOD-32`, `FOM-4`, slice §3 item 10);
- the review-log reasons;
- the Outlook subject and body lines, "Done — ", and the calendar and category name (DECISION 7, `FOD-22`, `FOD-28`);
- the act and form buttons and headings — "+ Add obligation" / "Close", "Add obligation", "Custom obligation", "Activate: …", "Activate…", "Activate", "Done", "Edit…", "Re-activate", "Cancel", "Details" / "Hide details", and "Undo done (…)" / "Undo not applicable (…)" (slice §3 items 5 and 10, `FOD-4`, `FOD-7`, `FOD-8`, `FOD-30`, `FOM-5`);
- the catalog's marks and hints — "suggested", "Applies if:", "Can lapse per period", "Can lapse for a period (offers Not applicable)", "Source:", "From the catalog: …" and "Nothing here is active until you activate it with your own date." (DECISION 9B, `FOM-2`, `FOD-9`, slice §3 item 5);
- the review-log action words (Created, Edited, Done, Not applicable, Undone) and the "Review log" heading (`FOD-6`), the category words (slice §3 item 10, spec §3.1) and the weight titles Hard and Routine (DECISION 6);
- Undo's warning that the removed next occurrence's Outlook event was NOT deleted (`FOD-7` with DECISION 7);
- the remaining buttons and marks — "Not applicable…", "Retire", "Save changes", "Set this date", "Add as inactive", "already added" and "No inactive obligations." — and the register's count line "N open · M overdue" (`FOD-18`, `FOD-8`, `FOD-4`, `FOM-5`, slice §3 item 10);
- the notices "Added inactive: …", "Re-activated: …" and "Due date for … set to …" (`FOM-5`, `FOD-8`, `FOD-4`);
- the edit form's "A missed period" with "Stays owed (the next period follows, even if past)" / "Collapses to the next date", and "The real due date for …" (DECISION 2, `FOD-4`);
- the Details panel's lines — "Rule date … · aim for … · due … · lights …" (on a weekend `unknown` row, the same without the due date), "Weekend: … · lead N days · …", "Notes:", "Outlook: …" with "push failed — …" / "queued", and the "History" heading and its lines — and the catalog's "Lead … · weight …" (slice §3 items 5 and 10, `FOD-25`, `FOD-18`, DECISION 7);
- the "Needs attention" sentence;
- the Outlook line's texts.

Every string carries its cite beside it — the `FOD-n`, `FOM-n`, DECISION or slice section that names it, otherwise slice §3 item 5, 6 or 10.

**THE MIGRATION — WRITTEN AND NOT RUN.** `db/migrations/2026-09-10-firm-obligations.sql` (23,843 B, LF):
- **The header.** It names the authorization and states the hand-run protocol: back up, STEP 0 on its own, the file pasted alone, the checks answered in words. **STEP 0** is the `review_log` action count, written down by hand before anything runs. **WHAT THIS DOES NOT DO** lists no matter table, no row written, no registry entry, no holiday, no money or assignee column, no existing row changed, no migration amended.
- **THE GATE** is the first statement. It raises if `firm_obligations` already exists (a second run stops there), if `review_log` is missing, or if `review_log` carries no CHECK on `action`. Every statement after it is guarded anyway.
- **The two tables** are exactly §5.1 and §5.2: the partial unique index `firm_obligation_occurrences_one_open_idx … where state = 'open'`, the `_touch` and `set_created_by` triggers, RLS with one policy each, and GRANTs to `authenticated`.
- **The action CHECK** is dropped by catalog lookup and re-added as `review_log_action_check` with TEN values.
- **Seven foot checks, answered in words:**
  1. both tables, RLS on, one policy each;
  2. the index present and PARTIAL;
  3. exactly one action CHECK, with ten values;
  4. `authenticated` reaches both tables four ways, `anon` none;
  5. both tables empty;
  6. the three triggers;
  7. STEP 0 re-run, unchanged.
- **Nothing was run. No database was connected to at any point in this session.** `db/schema.sql` carries the same objects in the same commit.

**`FOM-8` — THE LIVE OUTLOOK CHECK, RUN WITH MICHAEL (Step 5).**
- **The setup.** Demo mode on port 5173, the origin his Entra registration allows, in his own Chrome. The server was started through a temporary change to the tracked `.claude/launch.json`, restored afterwards; git shows it unchanged.
- **Why sign-in went through a separate control.** The page's own "Connect Outlook" also drains the push queue, which in the demo store held the fixture's twelve invented occurrences and two demo case events. So it was disabled in the check's tab and a sign-in-only control put there instead. Michael first opened a tab of his own, saw that button live, and closed it without clicking. **He signed in himself.**
- **The first two events.** `ensureFirmCalendar` found or created **"MDBP Firm"**. Through the app's own `toGraphFirmEvent` and `pushFirmOccurrenceToOutlook`, two throwaway all-day events dated Mon 2026-10-05 were pushed, with leads of 30 and 180 days.
  - **Graph accepted both.** A read-back GET of each (200) showed `reminderMinutesBeforeStart` stored exactly as sent — 43,200 and 259,200 — with `isAllDay` and `isReminderOn` true and category MDBP Firm.
  - Graph's `reminderView` placed the fire times at 00:00 Central on 2026-09-05 and 2026-04-08.
- **His eye, in desktop Outlook's Reminders window.** **The 30-day reminder SHOWED ("coming up in three weeks"); the 180-day one did NOT.**
- **A third event tested the likeliest cause, staleness.**
  - The 180-day reminder's fire time was five months stale; the 30-day one's was six days old.
  - So a third event was dated Wed 2027-03-10 with a 180-day lead. The app's payload sent **259,260** minutes: the real minutes between the two local midnights across November's clock change (180 × 1,440 + 60), per the ruled rule.
  - Graph stored it, and `reminderView` placed its fire time at 00:00 Central on 2026-09-11, the day of the check. **It SHOWED.**
- **The result. The session read the long reminder as honoured under the slice's "accepted AND surfaces", with a qualifier of its own — once the fire time was current — so the slice's "Lights today" fallback was NOT built** — the build's call under slice §3 item 7, not a ruling.
- **Filed at `docs/spec-feedback.md`.** The limitation found: in the one observation, desktop Outlook did not surface a reminder whose fire time was five months stale, and staleness is the likeliest cause; the boundary between six days and five months was not measured. And **Michael's own comment at the check: *"This comment may be something for design: I dont know if I need upcoming deadlines in the outlook reminders."***
- **Cleanup.** All three events were deleted (GET → 404 each), and the app's local Outlook session was cleared. The "MDBP Firm" calendar was left in his Outlook.

**THE CLICK-THROUGH, IN DEMO MODE ON THE FIXTURE (§9 item 11), today Fri 2026-09-11 — every row fiction.**
- **/cases.** The firm card read "Firm obligations — 2 due · 3 overdue", three lines, "and 2 more", and the "About these dates" expander. The legal-watch card rendered nothing in demo.
- **The weekend rules by hand.**
  - **FOT-31**, activated on Sat 2026-09-26 under rolls-forward, read *"Due Mon Sep 28 (rolled from Sat Sep 26) · aim for Fri Sep 25"*.
  - **FOT-26** on the same date under no-roll read *"Due Sat Sep 26 · aim for Fri Sep 25"*.
  - **`unknown` was NOT activated by hand.** Its rows were read on the fixture's seeded activations (FOT-2, FOT-8, FOT-9), which run the same activation path.
- **Done and Undo.** Done on the heartbeat (fixed-monthly, collapse) opened October, with "Undo done (2026-09)". Undo reopened September and removed October.
- **Not applicable.** On FOT-8 (condition not met), Mark stayed disabled until a reason was chosen, and the next occurrence landed in Later.
- **Retire.** FOT-26 took the badge "retired — stays until done". Done on it materialized nothing and moved it to Inactive, with "last done" and its Undo.
- **Defects the walk found.** The catalog's Activate… opened its form off-screen (fixed). The catalog showed SPEC cells' raw markdown (the display is now stripped; storage stays verbatim).
- **One mis-click.** It opened FOT-25's form; the form was cancelled and nothing was activated.
- **Not confirmed by clicking.** The empty card (Fixture B) is pinned by tests only. The Outlook projection is `FOM-8`'s job.

**THE RE-WALK, AFTER BOTH FIX ROUNDS — a fresh demo store on the new fixture.**
- **The fixture.** FOT-4 on its invented date (Jul 13); "12 open · 5 overdue"; no markdown on screen; no console error.
- **The form fix.** The catalog form, opened from 3,730 px down the page, now lands at the top of the screen.
- **An inline refusal.** On the overdue TIDC row, a later real due date was refused **inside its own form, in view**, and nothing was stored.
- **Nothing changed.** Save changes with nothing changed closed the form, said "Nothing changed." and wrote no log line.
- **The BOI row.** Its Inactive row shows its note, its source and its Review log.
- **The /cases card.** It read "Firm obligations — 2 due · 3 overdue", with the domain name free of backticks.
- **Not exercised by clicking.** Each of these is pinned by tests only:
  - the busy-disabled controls (demo acts finish in milliseconds);
  - the landed-but-not-pushed warning (Outlook was not connected there);
  - "Needs attention" (only a failed central write makes one);
  - Re-activate on a retired row.

**BUILD READINGS, REPORTED (not `FOD`-numbered):**
- The undo link lives in the close line's `review_log.new_value` trail, because §5.2 has no column for it.
- `FOM-13`'s "lit" is read as lit, target-passed or past-date-unknown.
- Register months group by TARGET month; a not-overdue item whose target month has passed sits in the current month.
- The Overdue pin holds only the `overdue` state.
- Future done, last-done and last-period-completed dates are refused.
- `FOM-6` month lighting applies only while no override exists.
- The anniversary label for a multi-year term is written in full.
- Only the five `createdInactive` templates offer "Add as inactive"; the BOI template key is `boi-note`.
- The sourceNote joins Source and Status with " — ".
- FOT-18 offers two kinds.
- Re-activation is read as an activation, never reopens a closed period, and on a first activation from Inactive takes "last period completed".
- The migration gate stops a second run before any statement.
- A same-name calendar refusal was added.
- A push that comes back `syncStatus: 'error'` counts as not pushed; a row left `pending` because Outlook is not connected is not a warning.
- Every form closes the moment its write lands, and a later push failure shows at the top of the page as "saved, but not pushed to Outlook".
- **In the Supabase adapter:**
  - a first-write failure is reported as "not saved";
  - an activation whose first occurrence failed to save stands active with NO activation line in the log (`spec-feedback.md`, 2026-09-12 section, part C item 6);
  - a restore writes `updated_at`, which the migration's touch trigger will overwrite once Michael runs it (it has not run);
  - one unreachable guard's message says "this app never deletes one", which Undo's own planned delete contradicts. It is PROVISIONAL wording.
- **The only deletes in the firm path are Undo's: the untouched next occurrence's row, and that occurrence's Outlook event by Graph,** which `FOD-7` and §7 item 8 require, with slice §3 item 7's "reverted on undo" for the event. The kickoff prompt's broader "no delete" collides with the row delete, and the prompt's own precedence rule decides it for the slice (part C item 16).
- Re-activate replaces Retire on a retired row's open occurrence.
- **The Inactive "Activate…"** asks the domain first, which narrows but cannot close a stale-register race (part C item 14). FOD-16's last-done date cannot be re-entered after a failed first-occurrence save (part C item 15).
- The text-act marker test walks the page's syntax tree. It is a floor: a string held in a local variable first was marked by hand.
- **One surfaces test's title overstates.** It says "nothing else unlights", but `FOD-4`'s edits can (part C item 1).
- **Two code comments at `e046906` are imprecise,** found by a close-out verifier after that commit and left for the next code change. `src/data/firmObligationsSeed.ts` line 20 places no-roll's target-passed on "the weekend day itself"; it runs from the Saturday through the weekend rule date. `src/domain/firmObligations.ts` lines 1327–1328 say that under `unknown` a weekend R "is not D"; under `unknown` D is R, and only rolls-forward moves D. Comments only; no code reads them.

**THE COLLISION NEEDING HIS RULING is filed at `docs/spec-feedback.md` (2026-09-12 section, part C item 1)** with the other collision-class items. Slice §8 bars "any control that unlights an occurrence other than Done, Not-applicable (conditional rows only) and Undo", and the kickoff prompt says the same. Yet `FOD-4` and §3 items 4–5 let a lead edit, a rule edit or an override on a not-past-due occurrence return a lit one to pending. The build follows `FOD-4` and pins today's behaviour in a test named for the conflict.

**HEALTH, AFTER — GREEN, against the red baseline and the green after `7c68eb9`:**
- **Tests.** `npm test` exit 0: **1,081 tests across 56 files** (746 across 48 after `7c68eb9`).
- **Build.** `npm run build` exit 0, printing the same chunk-size warning the baseline printed. The main chunk grew from 1,030.42 kB to 1,127.76 kB (gzip 295.67 → 323.03 kB).
- **Lint.** `npm run lint` exit 0; its 4 warnings are all in the filed mock under `docs/record/`, as at baseline.
- **Types.** `npx tsc -b` exit 0.

Exit codes were read off `npm` and `npx` themselves, never through a pipe (the final run's line, `test=0 build=0 lint=0 tscb=0`, is recorded in the session notes). No changed file mixes line endings (checked by a bytes read).

**WHAT WAS NOT DONE, each because a rule bars it:**
- no migration run and no database connected;
- no snooze, later, dismiss, bulk or delete control, and no compensating DELETE (the only deletes in the firm path are Undo's: the untouched next occurrence's row, and that occurrence's Outlook event by Graph, which `FOD-7` and §7 item 8 require);
- **§8's bar on "any control that unlights an occurrence other than Done, Not-applicable (conditional rows only) and Undo" NOT honoured where `FOD-4`'s edits apply** — a collision filed for his ruling, not a stop taken;
- no holiday computed, and no template's weekend rule changed;
- no registry entry or registry file, and no SPEC §7 string reworded;
- no money, ledger or QuickBooks field, and no assignee or owner badge;
- no new consent and no To Do task;
- nothing on a case's Calendar tab, and no firm-wide calendar page;
- `calendar_events`, `cases` and every matter table untouched, and `toGraphEvent`'s case path unchanged;
- the Outlook first-edit duplication defect not fixed;
- nothing seeded in Supabase mode, and no real firm date or fact entered;
- no vendor and no model;
- no spec edited (`BUILD-STATE.md` excepted), with `spec-feedback.md` taking one new dated section;
- `docs/record/session-log-toc.md` NOT regenerated and `docs/specs/session-log-head.md` NOT written, so **the next batch's census will detect this entry as unindexed, by design**;
- no `#nn`, no queue row and no ID minted, and the queue runner not doubled as;
- **"walked" is not "live"**: fixture-only, outside the GL-1 floor.

**THE CLOSE-OUT, CHECKED BEFORE THIS COMMIT.** This entry, the BUILD-STATE rewrite and the spec-feedback section went through three rounds of independent adversarial verification before the commit. Round one's findings led to a full regeneration from HEAD. No HIGH finding survived round two; its MEDIUM and LOW findings were fixed in the text or the claim narrowed. Round three read what those fixes changed and found no HIGH finding; its two MEDIUM and seven LOW findings, and one further inconsistency it noted in BUILD-STATE's banner, were fixed in the text before this commit, without a fourth round.

**BUILD-STATE:** rewritten in full as a CODE refresh at **99,994 B (6 B under the `CAP-4` ceiling) and 135/150 non-blank (149 raw)**, stated at commit `e046906`.
- **Re-derived on the working tree that became `e046906`** (that commit changed none of the counted files): the counts its note names — among them the 46 seeded form templates, counted by executing the seed.
- **Re-measured by program:** the register and registry counts.
- **Checked by existence test only (`HK-5`):** the declared data paths.
- **Re-verified:** the forms engine's files, and the writer's fixture-only resolution.
- **The header.** The banner reads **"ONE migration WRITTEN AND NOT RUN"** and names the file. The anti-resurrection-ledger pointer is kept.
- **The ledger.** **Fifty-six passages, 8,415 B, were removed — 8 displaced outright, 48 superseded in place.** Three further edits only inserted text after an unchanged passage, and are not counted. A word-level diff of the old file against the new accounts for every removed word; four tokens differ only where a span's edge split a word from its punctuation.

All fifty-six ride below.

**Staged for Code:** none — this session was the build.

**Awaiting/Returned from Code, unreviewed:** everything in this entry. For Michael's eye specifically:
- **the migration**, to be run by his hand after a backup, pasted alone, checks answered in words;
- **the §8-against-`FOD-4` ruling**, and the other collisions at `spec-feedback.md` (2026-09-12 section, part C) — among them `FOD-25`/`FOD-26`'s day count, and the Undo-delete collision, which the prompt's own precedence rule decides for the slice;
- **the text acts**, every one PROVISIONAL;
- **the thirty-three defaults**, especially `FOD-26`'s card wording and `FOD-27`'s position;
- **Outlook keep-vs-delete**, the early-done reminder (`isReminderOn: true`), and his own `FOM-8` question whether upcoming deadlines belong in Outlook reminders at all;
- the leads.

**Next:**
1. THE FIRM-OBLIGATIONS HANDS-ON SITTING at the demo app: the text acts, the card's position and wording, the register's affordances, Outlook keep-vs-delete, the leads, and the §8-against-`FOD-4` ruling, with part C's other items for his eye.
2. The migration, by his hand.
3. His real activations, with his real dates.

In parallel: the DECISION 8 registry drafting act (an Opus design session, with PF-1 running on it) and the DECISION 9A acquisitions.

---

**DISPLACED FROM BUILD-STATE (CAP-4)** — 56 passages, 8,415 B of text, removed from `docs/specs/BUILD-STATE.md` at this refresh (8 displaced outright, 48 superseded in place), so the 100,000-byte ceiling could be met while the firm-obligations build, its one unrun migration and the `FOM-8` result were added. **Every one is a SPENT NARRATIVE, a DUPLICATE whose substance stands elsewhere in the file, a figure this CODE refresh re-derived, or a status this build moved — NOT ONE IS AN EXISTENCE CLAIM.** Three further edits only inserted text after an unchanged passage and are not listed. They ride here VERBATIM and this is the only surviving copy, with ONE stated exception: each is quoted with its own leading and trailing whitespace trimmed, which is the join punctuation of the text around it and not content, so the quoted text measures 8,406 B against the 8,415 B removed. Beside each is where its substance now stands.

**P01 — superseded in place — the banner, rewritten for this CODE refresh**

> Commit: 357ca8e (every claim below re-checked at this commit)  |  Branch: master  |  Generated: 2026-09-11 Central (one hundred forty-first refresh)  |  **WRITTEN BY THE QUEUE RUNNER (batch 96, the NINETY-SIXTH invocation) on a DOCS-ONLY batch — **no `src/`, `db/` or `supabase/` file was read at all**, so every `src/`- and `db/`-derived figure below is CARRIED from the `ea5675b` CODE refresh and is MARKED as carried (`QR-6(a)`); every count over `docs/` was re-measured here.**

**P02 — superseded in place — the banner's CAP-4 line, restated with this refresh's own figures**

> ⛔ **`CAP-4` BOUND; SHORTFALL NAMED — entered the refresh at 99,915 B, stands at 99,975 B, 25 B under the 100,000-byte ceiling, 136/150 non-blank (150 raw). 29 PASSAGES REMOVED, 7,609 B — 4 DISPLACED outright, 25 SUPERSEDED in place — NOT ONE AN EXISTENCE CLAIM**; each rides this batch's runner line VERBATIM under `DISPLACED FROM BUILD-STATE (CAP-4)`, the log's only copy, with where its substance still stands.

**P03 — displaced outright — the Q-WF-4 / WF-2–WF-8 status: the WF-2–WF-8 EMAIL-WORKFLOW SPEC bullet under Design-input memos carries its substance and now names the row `Q-WF-4`**

> 🟡 **`Q-WF-4` IS RULED IN SHAPE (`#154`, item 7) — THE ROW EXISTS AND IS NOW 🟡**, a composite decided now and built in Wave 3, each build its own authorization. **WF-2–WF-8 STAY ⬜, SEVEN OF SEVEN GATED, ZERO SATISFIED.**

**P04 — superseded in place — the banner: ONE migration WRITTEN AND NOT RUN, named; the CCS-1 run fact kept in the same sentence and in the data-layer bullets**

> ✅ **EVERY MIGRATION WRITTEN TO DATE HAS RUN, AND NO MIGRATION IS PENDING.** The two `CCS-1` migrations ran on LIVE by his hand 2026-09-07 (`#150`); record at `docs/record/ccs1-migrations-run-2026-09-07/`.

**P05 — superseded in place — the banner: the slice is BUILT; its authorization stays at FIRM OBLIGATIONS under Design-input memos and in #155**

> ⚠ **NOTHING WAS BUILT THIS BATCH — `#155` IS A RULING SITTING, DOCUMENTATION ONLY.** ✅ **`FOS-1` RULED YES (*"Yes"*, 2026-09-10): THE FIRM-OBLIGATIONS BUILD SLICE, `docs/specs/firm-obligations-build-slice.md`, IS BUILD-AUTHORIZED AND NOT YET BUILT** — kickoff prompt `docs/prompts/PROMPT-firm-obligations-slice-build-session.md`; a separate Code session Michael fires, the queue runner BARRED; ONE migration to be WRITTEN AND NOT RUN by that build; no client data, OUTSIDE the GL-1 floor.

**P06 — displaced outright — For design side → INSTRUCTIONS, which carries the same v32/v31 statement in full**

> ⚠ **INSTRUCTIONS `v32` DELIVERED 2026-09-10 (`#155`, trigger 3) — PASTED OR NOT IS HIS WORD; `v31` is the last version confirmed in force by a live read; the repo cannot verify the field and does not.**

**P07 — superseded in place — the counts note, re-derived at this HEAD (a CODE refresh carries none of these)**

> *EVERY COUNT OVER `docs/` WAS RE-DERIVED THIS REFRESH, NOT CARRIED (`OPEN-5(a)`). **THIS IS A RUNNER REFRESH ON A DOCS-ONLY BATCH THAT READ NO `src/`, `db/` OR `supabase/` FILE, SO THOSE FIGURES ARE CARRIED AND SAID TO BE (`QR-6(a)`):** **28 route paths in `src/App.tsx`, `SCHEMA_TABLES` 46 (45 policy-true, 1 not), `STORE_VERSION = 16`, 11 files in `db/migrations/`, 46 `create table` in `db/schema.sql`, tests 746 across 48 files, 46 seeded templates, and the `ALTER DEFAULT PRIVILEGES` occurrence count** — every one MEASURED at the `ea5675b` CODE refresh or the batch-92 read and NOT re-measured here, because this batch read no file outside `docs/`.

**P08 — superseded in place — the counts note: this file's own line endings, and the CAP-4 streak**

> Every file this batch touched is LF, verified by a bytes read (0 CRLF). **⛔ TWELVE consecutive refreshes

**P09 — superseded in place — the practice-areas paragraph: the migration sentence, restated with the one unrun**

> ✅ **EVERY MIGRATION WRITTEN TO DATE HAS RUN — INCLUDING THE `CCS-1` BUILD'S TWO, BY MICHAEL'S HAND THE EVENING OF 2026-09-07 (`#150`) — AND NO MIGRATION IS PENDING.

**P10 — displaced outright — the fold's own record, `form-engine.md` §3's closing subsection (#106); §9's verbatim rule lives in CLAUDE.md**

> **§9 was NOT touched** — a verified pure insertion, 25 lines, zero deletions. **This matters to FE-D1: slice 1 hard-codes a parser, and the spec it reads now states the ruled syntax**

**P11 — superseded in place — Screens live: the /cases line gains the firm card and the register route**

> /cases — case list; compact statute-worklist card (the de facto dashboard);

**P12 — superseded in place — Data layer: the store version**

> **store v16** (2026-09-03:

**P13 — superseded in place — Data layer: the v17 step and the chain**

> so a browser that never held a store lands in the same shape a migrated one does**), the v9→v16 chain

**P14 — superseded in place — Data layer: tables and policies re-derived**

> **`db/schema.sql` and the RLS probe both stand at 46 tables, sequence-identical, with 45 policies

**P15 — superseded in place — Data layer: the create-table count, and which pair the sentence means**

> **46 `create table` statements in schema.sql, AND BOTH MIGRATIONS HAVE NOW RUN BY MICHAEL'S HAND

**P16 — superseded in place — Data layer: the amendment's five tables, re-verified in db/schema.sql and the probe at this refresh**

> measured at the `ea5675b` CODE refresh and CARRIED here:

**P17 — superseded in place — Data layer: the migration status, restated**

> EVERY MIGRATION WRITTEN TO DATE HAS NOW RUN; none is pending.**

**P18 — superseded in place — Data layer: the re-derived parenthetical**

> *(Re-derived here every refresh: 46 tables, 46 `enable row level security`, **45 policies**

**P19 — superseded in place — Data layer: the symmetry warning, restated at the current counts**

> so never "correct" 36 to 37 for symmetry.

**P20 — displaced outright — the 2026-08-19 run record (#113); the column's CHECK and the backfill stand in db/schema.sql and the migration**

> - **F-12's STEP (d) FIX EXECUTED LIVE 2026-08-19.** `party_status = coalesce(party_status, null)` — which would have left every Witness / Adjuster / provider / expert / judge NULL though `'non-party-actor'` exists in the CHECK — now writes the value.

**P21 — superseded in place — GRANTs bullet: the live 37 is a 2026-08-19 measurement**

> on all **37 tables** from `ALTER DEFAULT PRIVILEGES`

**P22 — superseded in place — GRANTs bullet: the migration count, re-counted at this refresh**

> **all ELEVEN migrations**, re-counted at the batch-92 read over the whole of `db/migrations/` and **CARRIED here, not repeated — this docs-only batch read no `db/` file** — **every one of the 14 occurrences

**P23 — superseded in place — GRANTs bullet: the scope's widening**

> six → nine → eleven, still zero)

**P24 — superseded in place — the anon repair bullet: the probe count**

> **The probe covers 46 tables**

**P25 — superseded in place — the external-system sweep's basis: the sweep's own date, since this build's migration comments now name some swept terms**

> *(Basis stated: word-bounded over `db/` these are exactly zero.

**P26 — superseded in place — RLS, exercised: the probe's table list**

> The probe READS all **46** tables (`SCHEMA_TABLES` — includes `party_pii`, FE-D1's four `form_*` tables and the amendment's five,

**P27 — superseded in place — RLS, exercised: the policy count**

> **ALL 45 POLICIES ARE BYTE-IDENTICAL — `for all to authenticated using (true) with check (true)` — ONE RULE ON 45 TABLES, not 45 rule sets.**

**P28 — superseded in place — FORM ENGINE: the store version the second tranche left, dated (the Data layer bullet states v17 today)**

> **BOTH TRANCHES ARE BUILT (§13 items 1-14); STORE v15.**

**P29 — superseded in place — FORM ENGINE: the safety half, re-verified rather than carried**

> **THE SAFETY HALF IS CARRIED FROM THE `ea5675b` CODE REFRESH, WHICH RE-VERIFIED IT; THIS DOCS-ONLY BATCH READ NO `src/` FILE AND DID NOT RE-RUN THE SWEEP:**

**P30 — superseded in place — FORM ENGINE: the second tranche's existence test, re-run**

> (carried from the 2026-09-07 CODE refresh's existence test)

**P31 — superseded in place — FORM ENGINE: AS-Q4's no-code-change sentence, not attributed to a batch this refresh is not**

> **NOTHING WAS CHANGED IN CODE by the sitting or by this batch**

**P32 — superseded in place — Known stubs: the cancelled-write gap, re-read at this CODE refresh**

> **A `review_log` WRITE OUTSIDE ITS CHECK — FLAGGED AT `#151`, NOT FIXED, NOT VERIFIED LIVE; NOW `FOD-20`'s, IN BY `FOS-1` (`#155`), closed by the FO build's migration when it runs.** `src/pages/CalendarTab.tsx`'s cancel writes `action: 'cancelled'`; `db/schema.sql`'s CHECK admits six values WITHOUT it; the Supabase adapter passes the row straight through. On those reads a LIVE cancel should fail its audit insert (23514) and never reach the Outlook deletion. **These are `#151`'s design-side reads over the bridge at `ea5675b`, not this runner's — no `src/` file was read this batch, and nothing was confirmed live.**

**P33 — displaced outright — the #110 verification record; the class's remaining pair stays named in the same bullet**

> — **four of those five on programmatic character-exact matches with ZERO flags.**

**P34 — displaced outright — the #96 record (`V7-23-CITE`), which stands in the session log's `2026-08-16 (#96)` entry; BUILD-STATE no longer carries it**

> #96 produced its one **rejection** (`V7-23-CITE`), the evidence it is not a rubber stamp

**P35 — superseded in place — the Design-input memos heading: firm obligations is now built**

> ## Design-input memos — ALL PROPOSED BUT FIRM OBLIGATIONS (RULED `#155`), nothing built, no registry file touched by any of them

**P36 — superseded in place — the WF-2–WF-8 bullet: the row named, and the composite stated here, now that the banner no longer carries them**

> 🟡 **THAT GATE IS RULED IN SHAPE AND ITS ROW IS 🟡 (`#154`, item 7).** The composite is in the banner;

**P37 — superseded in place — the TOC bullet: batch 96's regeneration, and this CODE entry unindexed by design**

> **186 rows to 186 dated entries, `#65`–`#155` GAPLESS**, regenerated over the log as THIS batch wrote it, so `TOC-4` FIRED (forty-ninth edition; firing count forty-one → forty-two). *(The log's LAST `## ` line is the `## ARCHIVED:` pointer heading, not an entry and never a row — a bare `grep -c '^## '` returns 187 against 186 entries and invents a missing row.)*

**P38 — superseded in place — FIRM OBLIGATIONS: built; the defaults, text acts and fixes in the 2026-09-12 CODE entry; the collisions in spec-feedback**

> **FIRM OBLIGATIONS — RULED 2026-09-10 (`#155`); THE BUILD SLICE `docs/specs/firm-obligations-build-slice.md` IS AUTHORIZED (`FOS-1`) AND UNBUILT.**

**P39 — superseded in place — FIRM OBLIGATIONS: FO-7's two facts, re-read at this CODE refresh**

> `FO-7`'s two facts as `#151` read them over the bridge at `ea5675b` — NOT this runner's read:

**P40 — superseded in place — FIRM OBLIGATIONS: the hands-on sitting's gate, now met**

> **The spec §11 five are ACCEPTED as THE FIRM-OBLIGATIONS HANDS-ON SITTING, gated on the build.**

**P41 — superseded in place — CAPACITY: the log measured at this refresh's working tree**

> **AT HEAD, RE-MEASURED BY `wc` THIS BATCH AND NOT CARRIED:** `docs/record/session-log.md` **186 dated entries, 91 design `#nn`, high-water `#155`, GAPLESS from `#65`**

**P42 — superseded in place — CAPACITY: the Q-CAP-5 limb retired by TC-10, shortened**

> (b) the ~700 KB re-split trigger, RETIRED by `TC-10` (2026-08-21),

**P43 — superseded in place — CAPACITY: the Voice2 pair's transit eligibility, attributed to the batch that made it**

> **The `#137` Voice2 pair becomes TRANSIT-ELIGIBLE with this batch at HEAD**

**P44 — superseded in place — DT-1: this refresh's own date, from the wall clock**

> this refresh carries the RUN date, 2026-09-11, read from the wall clock at 00:15 CDT.**

**P45 — displaced outright — `docs/record/normalizer-semicolon-amendment-2026-09-08/`, which characterizes the thirteen sites (the count stays in the bullet)**

> — **twelve after a SEMICOLON** (`services;AAand`, in `tx.151`, `tx.171`, `tx.31`) and **one five-`A` run** that is the article `A` between two artifact spaces (`SOCIETY.AAAAAcooperative`)

**P46 — superseded in place — HK-7: the declared-path existence test, re-run at this refresh**

> **RE-CHECKED NATIVELY THIS BATCH by existence test on DECLARED paths only

**P47 — superseded in place — REQ-CAPTURE: the size, re-measured at this refresh**

> re-measured this batch by `wc` at HEAD; unchanged

**P48 — superseded in place — YOUR HAND: (11) is DONE, its number not reused**

> (10) **paste v32**; (11) **fire the FO build session** once `#155` is at HEAD — *"run docs/prompts/PROMPT-firm-obligations-slice-build-session.md"*; `FOM-8`'s live check needs his connected Outlook; (12)

**P49 — superseded in place — NEXT ACTS: the header's date, now that item (3) records the build**

> **NEXT ACTS, IN ORDER, AS OF 2026-09-10 (`#155`), THE WAVE 0 ACTS

**P50 — superseded in place — NEXT ACTS (3): the build is done**

> (3) **THE FIRM-OBLIGATIONS BUILD** (the Code session he fires) **→ THE FIRM-OBLIGATIONS HANDS-ON SITTING → the migration by his hand → his real activations** — the ruling sitting is DONE (`#155`);

**P51 — superseded in place — NEXT ACTS: the twelve accepted items, FO-6's gate now met**

> **TWELVE ACCEPTED REMAIN, EVERY ONE GATED ON AN UNBUILT MODULE AND NAMED:

**P52 — superseded in place — NEXT ACTS: FO-6's gate (the build in demo mode, per its register row) is met**

> `FO-6` (no firm-obligations concept exists in the calendar code).

**P53 — superseded in place — NEXT ACTS: the five FO spec §11 items' gate is met**

> the FO spec §11 items, gated on the FO build in demo mode — THE FIRM-OBLIGATIONS HANDS-ON SITTING;

**P54 — displaced outright — NEXT ACTS' own sentence in the same bullet: ✅ `Q-IN2-1` HAS LANDED**

> · CR-3 blank form + versioned manual (`Q-IN2-1`)

**P55 — superseded in place — the register bullet: batch 96's acts, attributed to batch 96**

> **THIS BATCH FLIPPED THIRTEEN ⬜ → ✅ AND MOVED THEM

**P56 — superseded in place — the register bullet: batch 96's append, attributed**

> **This batch appended the superseded `#154` sentence to that same block.**

---

## §2 COMPACT INDEX — EVERY ENTRY IN THE LIVE LOG, NEWEST FIRST

One row per entry. This section is what tells a session with no bridge that an entry **exists**; it is never cut to make room (`TC-3`, spec §3.5).

| date | # | kind | heading (first 90 chars) |
|---|---|---|---|
| 2026-09-16 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-EIGHTH invocation) — one docs-only packet: the Dor |
| 2026-09-13 | #157 | design | (Typed design session, Cowork; opened 00:04 CDT on Fable 5.1 and COMPLETED ON OPUS 5 after |
| 2026-09-13 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-SEVENTH invocation) — one docs-only packet: the fi |
| 2026-09-12 | #156 | design | (Typed design session, Cowork, Fable 5.1 per the environment; opened 08:02 CDT on the stan |
| 2026-09-12 | — | code | CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-firm-obligations-slice-build- |
| 2026-09-11 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-SIXTH invocation) — one docs-only packet: the firm |
| 2026-09-10 | #155 | design | (Typed design session, Cowork, Fable 5.1 per the environment; opened 21:34 CDT on Michael' |
| 2026-09-09 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-FIFTH invocation) — one docs-only packet: the API- |
| 2026-09-09 | #154 | design | (Typed design session, Cowork, Fable 5.1 per the environment; opened the evening of 2026-0 |
| 2026-09-09 | — | code | CODE SESSION (Opus 5; the same session that ran batch 94, continued after its close-out on |
| 2026-09-08 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-FOURTH invocation) — one docs-only packet, and the |
| 2026-09-08 | #153 | design | (Typed design session, Cowork, Fable 5.1 per the environment; opened 22:51 CDT on Michael' |
| 2026-09-08 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-THIRD invocation) — one docs-only packet, and the  |
| 2026-09-08 | #152 | design | (Typed design session, Cowork, Fable 5.1 per the environment; opened 23:46 CDT on 2026-09- |
| 2026-09-07 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-SECOND invocation) — two docs-only packets, and th |
| 2026-09-07 | #151 | design | (Typed design session, Cowork, Fable 5.1 per the environment; the THIRD sitting of the day |
| 2026-09-07 | #150 | design | (Typed design session, Cowork, Fable 5.1 per the environment — the SAME chat as `#149`, co |
| 2026-09-07 | — | code | CODE SESSION (Opus, fresh, fired from `docs/prompts/PROMPT-cc1-rulings-and-address-model-s |
| 2026-09-07 | — | runner | QUEUE-RUNNER batch (runner line; NINETY-FIRST invocation) — one docs-only packet, and the  |
| 2026-09-07 | #149 | design | (Typed design session, Cowork, Fable 5.1 per the environment; DEVICE BRIDGE GRANTED on the |
| 2026-09-07 | — | code | CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-f7-block-address-fix-build-se |
| 2026-09-05 | — | runner | QUEUE-RUNNER batch (runner line; NINETIETH invocation) — one docs-only packet, and the bat |
| 2026-09-05 | #148 | design | (Typed design session, Cowork, bridge granted; Opus 5 for the session-start reads and the  |
| 2026-09-03 | — | code | CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-fe-d1-amendment-slice-build-s |
| 2026-09-03 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-NINTH invocation) — one docs-only packet, and the  |
| 2026-09-03 | #147 | design | (Typed design session, Cowork, Fable 5 per the environment — the SAME chat as `#146`, resu |
| 2026-09-03 | — | code | CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-fe-d1-amendment-slice-build-s |
| 2026-09-03 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-EIGHTH invocation) — one docs-only packet, and the |
| 2026-09-02 | #146 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the |
| 2026-09-02 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-SEVENTH invocation) — two docs-only packets, and t |
| 2026-09-02 | #145 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the |
| 2026-09-01 | #144 | design | (Typed design session, Cowork, Fable 5, continuing the same sitting as the |
| 2026-09-01 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-SIXTH invocation) — three docs-only packets in one |
| 2026-09-01 | #143 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED |
| 2026-09-01 | #142 | design | (Typed design session, Cowork, OPUS 5; DEVICE BRIDGE GRANTED: TASK 2 OF THE CHAT-DISPATCH  |
| 2026-09-01 | #141 | design | (Typed design session, Cowork, OPUS 5 per the environment; DEVICE BRIDGE GRANTED on the ch |
| 2026-09-01 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-FIFTH invocation) — one docs-only packet: the FE-D |
| 2026-08-31 | #140 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the c |
| 2026-08-31 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-FOURTH invocation) — one docs-only packet, eleven  |
| 2026-08-31 | #139 | design | (Typed design session, Cowork, Fable 5 — the model per the environment line after Michael' |
| 2026-08-31 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-THIRD invocation) — one docs-only packet, and four |
| 2026-08-25 | #138 | design | (Typed design session, Cowork, Opus 5, DEVICE BRIDGE GRANTED: RECON-1 DISCHARGED — |
| 2026-08-23 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-SECOND invocation) — one docs-only packet, ONE rou |
| 2026-08-22 | #137 | design | (Voice design session finished in typed mode, Opus 5: the disclosures |
| 2026-08-22 | #136 | design | (Typed design session, Fable 5: disclosures REQ-CAPTURE verified ABSENT |
| 2026-08-22 | #135 | design | (Voice design session, Opus 5: RECON-1 floor ruled — three mandatory |
| 2026-08-22 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-FIRST invocation) — one docs-only packet, TWO rout |
| 2026-08-22 | #134 | design | THE BACKFILL: five unfiled design sessions put on the record, an H-series collision found  |
| 2026-08-22 | #133 | design | CORRECTION ENTRY, SIX PARTS: the log's entry count, the picker-order rule's first origin e |
| 2026-08-21 | #131 | design | Design, VOICE, Opus 5: disclosures ruling session — H20-a/H20-b ruled, FE-19 moved upstrea |
| 2026-08-21 | #130 | design | Design, VOICE, Opus 5: H12 REVERSED — app calls the model on a BAA-covered account; H20, H |
| 2026-08-21 | #129 | design | TWO RULINGS THAT SHRINK THE SLICE: the unrun FE-D1 migration runs UNCHANGED after its stat |
| 2026-08-21 | #128 | design | Design, voice walkthrough, Opus 5: disclosures expert-designation walk; Medical-tab defect |
| 2026-08-20 | #127 | design | THE DISCLOSURES REQ-CAPTURE RECONCILED: the facility-as-expert defect traced to three plac |
| 2026-08-21 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTIETH invocation) — one docs-only packet, THIRTEEN ro |
| 2026-08-21 | #132 | design | THE THIN CONSTITUTION EXECUTED: the live log LEAVES the sync for `docs/record/`, the index |
| 2026-08-20 | — | code | `dev:demo` MODE-CHECK FIX (Code session, UNNUMBERED per TOC-6 — no `#nn`, no runner ordina |
| 2026-08-20 | — | code | FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED per TOC-6 — no `#nn`, no run |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-NINTH invocation) — one docs-only packet, FOUR ro |
| 2026-08-20 | #126 | design | THE RE-CHECK'S RULING NIGHT: EIGHT RULINGS IN ONE SITTING — gate 3 CLOSES with edges, GL1- |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-EIGHTH invocation) — one docs-only packet, ONE ro |
| 2026-08-20 | #125 | design | `Q-CAP-3` CLOSED BY MEASUREMENT (85.1%), batch 77 verified, and gate 9's evidence day: §4. |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-SEVENTH invocation) — one docs-only packet: the g |
| 2026-08-20 | #124 | design | THE GATE-3 RUN CLEARED DESIGN-SIDE AT `dcc9db2`, FULL-TEXT: the run record holds on every  |
| 2026-08-20 | — | code | GATE 3 RLS WRITE-PATH TEST: THE RUN (Code session, UNNUMBERED per TOC-6 — no `#nn`, no run |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-SIXTH invocation) — one docs-only packet: the ses |
| 2026-08-20 | #123 | design | THE CAPACITY RULINGS LAND: `Q-CAP-2` executed and verified in the sync filters, `Q-CAP-1`  |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-FIFTH invocation) — one docs-only packet: gate 9' |
| 2026-08-20 | #122 | design | GATE 9 ROUND TRIP ONE PASSES END TO END: DNS published and verified authoritative, Postmar |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-FOURTH invocation) — one docs-only packet: four r |
| 2026-08-20 | #121 | design | FOUR RULINGS START THE LAUNCH-PATH CLOCK: Postmark, signin@ on a send subdomain, the gate- |
| 2026-08-20 | — | code | CODE SESSION (direct ruling, recorded immediately after the seventy-third queue-runner bat |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-THIRD invocation) — three docs-only packets from  |
| 2026-08-20 | #120 | design | PROJECT KNOWLEDGE AT 89.8% AND THE RUNWAY IS ABOUT A DAY: the weight measured, `WS-P2` cor |
| 2026-08-20 | #119 | design | THE §5 PRE-FLIP REPORT RUN LIVE: "Success. No rows returned." — gate 10's edge (2) dischar |
| 2026-08-20 | #118 | design | THE CORRECTION SWEEP AFTER BATCH 72: one live carrier out of ten hits, the rest retraction |
| 2026-08-20 | — | code | CODE SESSION (ruling recorded): GATE 10 CLOSED — and the closure's edges are recorded as c |
| 2026-08-19 | — | code | GATE 10 FRONT-END BUILD SESSION (Claude Code, Opus 5), on Michael's `G10-5` authorization: |
| 2026-08-19 | — | code | CODE SESSION (authorization record, same session as the `G10-6` ruling and the queue-runne |
| 2026-08-19 | — | code | CODE SESSION (direct ruling, same session as the queue-runner batch below): `G10-6` ruled  |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-SECOND invocation) — the seven-document design ch |
| 2026-08-19 | #117 | design | POST-SYNC VERIFICATION OF EVERYTHING LANDED AND UNREVIEWED AT `beb27f4`: seven of the eigh |
| 2026-08-19 | — | code | CODE SESSION (repair, on Michael's ruling; same session as the C1/C2/C3 entries below): th |
| 2026-08-19 | — | code | CODE SESSION (CODE-DISPATCH v4, task C3; same session as the C1 and C2 entries below): the |
| 2026-08-19 | — | code | CODE SESSION (CODE-DISPATCH v4, task C2; same session as the task C1 entry below): the run |
| 2026-08-19 | — | code | CODE SESSION (CODE-DISPATCH v4, task C1): the two falsehood families re-swept whole-tree a |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-FIRST invocation) — one docs-and-comments packet, |
| 2026-08-19 | #116 | design | GATE 10's FRONT-END HALF SPECIFIED, AND THE `anon`/C-2 RECORD REPAIRED ON |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTIETH invocation) — one docs-only packet, routed ver |
| 2026-08-19 | — | code | Gate 9 SMTP runbook staged (design session, Cowork, Fable 5; routed by queue runner; UNNUM |
| 2026-08-19 | — | code | GATE 10 RUN AND VERIFIED LIVE (Claude Code, Opus 5; UNNUMBERED per TOC-6) — the same sessi |
| 2026-08-19 | — | code | GATE 10 BUILD SESSION (Claude Code, Opus 5; UNNUMBERED per TOC-6) — the PII promotion land |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-NINTH invocation) — a docs-only batch that files an |
| 2026-08-19 | #115 | design | GATE 10 RULED IN THREE PARTS AND THE BUILD AUTHORIZED: the shape splits by |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-EIGHTH invocation) — a two-act docs-only batch: gat |
| 2026-08-19 | #114 | design | GATE 1 BOUGHT — GL-1 floor item (2) COMPLETE; and the queue-scope question |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-SEVENTH invocation) — the record catches up with th |
| 2026-08-19 | #113 | design | EXECUTION SESSION: all three pending live migrations RUN AND VERIFIED by |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-SIXTH invocation) — the routed OPUS-RUN paste comes |
| 2026-08-18 | #112 | design | THE OPUS-RUN PASTE EXECUTED: five FC-13 entry drafts and the Q-WS3-5 |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-FIFTH invocation) — the first batch in fifteen to t |
| 2026-08-18 | #111 | design | GROK EXTERNAL REVIEW TRIAL: first outside-model adversarial review |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-FOURTH invocation) — the batch that empties the rul |
| 2026-08-18 | #110 | design | THE RULED-WORDING TAIL EMPTIES: A, 215.1(e), B, F AND THE WS-3 ENTRY ALL |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-THIRD invocation) — the batch that executes the suc |
| 2026-08-18 | #109 | design | THE SUCCESSOR ACTS CLOSE THE SAME NIGHT: ENTRIES 12, 32, D AND E VERIFIED; |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-SECOND invocation) — the batch that ends the seven- |
| 2026-08-18 | #108 | design | T-26 RUN LIVE: THREE GROUP A ENTRIES VERIFIED AND TWO CONFORMED VERBATIM AT |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-FIRST invocation) — the batch whose Step 0 gate cau |
| 2026-08-18 | #107 | design | PROJECT-KNOWLEDGE PRUNE (44 docs); METER UNITS PROVEN TOKENS; SYNC-PICKER |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTIETH invocation) — the FC-block batch, in which the o |
| 2026-08-18 | #106 | design | FABLE FC-BLOCK ADJUDICATION: fifteen FC items put one at a time, THIRTEEN |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-NINTH invocation) — the batch that makes the advers |
| 2026-08-18 | #105 | design | FABLE SPEND-DOWN ADJUDICATION: two items put, four limbs ruled — Q-AUDIT-1 |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-EIGHTH invocation) — the docs-only batch that lande |
| 2026-08-18 | #104 | design | THE FOUR LOCATED AUTHORITIES READ, AND THE ENTRY-31 BRIDGE FOUND: it is |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-SEVENTH invocation) — the docs-only batch that land |
| 2026-08-18 | #103 | design | CORRECTION: an adversarial audit of the five CHAT-DISPATCH v4 research |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-SIXTH invocation) — the docs-only batch that landed |
| 2026-08-17 | #102 | design | CHAT-DISPATCH v4 EXECUTED, T-32 + T-27 THROUGH T-31 IN ONE PASS: the WS-3 |
| 2026-08-17 | #101 | design | CORRECTION: the #100 adjudication session and every artifact it |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-FIFTH invocation) — the batch that executed twenty- |
| 2026-08-18 | #100 | design | FABLE ADJUDICATION SESSION: 24 items put, 24 ruled, zero deferrals — |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-FOURTH invocation) — the docs-only batch that lande |
| 2026-08-17 | #99 | design | CHAT-DISPATCH v3 TASKS T-20 THROUGH T-25 EXECUTED IN ONE PASS: the |
| 2026-08-17 | — | code | CODE SESSION (CODE-DISPATCH v3, task C-2): the session-log index regenerated at 207 entrie |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-THIRD invocation) — the batch that wrote twenty-fou |
| 2026-08-17 | #98 | design | TASK 19 SIGN-OFF WALK EXECUTED (CHAT-DISPATCH v2 Task B): 24 of 40 |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-SECOND invocation) — the batch whose second multi-a |
| 2026-08-17 | #97 | design | TASK 19 SIGN-OFF WORKLIST STAGED: the dispatch's Task A was found already |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-FIRST invocation) — the batch that ran a multi-agen |
| 2026-08-16 | #96 | design | V-EXEC EXECUTED IN PART: the three two-case entries are SPLIT (V-5, backlog |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FIFTIETH invocation) — the batch that executed six regist |
| 2026-08-16 | #95 | design | WORDING ADJUDICATION: execute-then-verify RULED for Task 19, six registry |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-NINTH invocation) — the batch that amended the runn |
| 2026-08-16 | #94 | design | FABLE-RUN ADJUDICATION: QR-6(a)–(f) ALL RULED IN taking the runner to v9 with |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-EIGHTH invocation) — the ahead-stop fired for the f |
| 2026-08-16 | #93 | design | CHAT-DISPATCH TASK 19 ATTEMPTED AND NOT COMPLETED: a redundant retrieval pass withdrawn un |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-SEVENTH invocation) — the packet's headline questio |
| 2026-08-16 | #92 | design | CHAT-DISPATCH TASK 18: the go-live runbook — three places where reading a gate ALONE gives |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-SIXTH invocation) — the fetch the packet named as i |
| 2026-08-16 | #91 | design | CHAT-DISPATCH TASK 17: the session-log table of contents — the log runs 190 entries under  |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-FIFTH invocation) — the allowlist entry is proven,  |
| 2026-08-16 | #90 | design | CHAT-DISPATCH TASK 16: the T3 pilot-recording protocol — HK-4 reads as a staging act and t |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-FOURTH invocation) — the Step 1 report was right an |
| 2026-08-16 | #89 | design | CHAT-DISPATCH TASK 15: the communications-log ingest memo — the dispatch called two constr |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-THIRD invocation) — the ahead-stop fires on a real  |
| 2026-08-16 | #88 | design | CHAT-DISPATCH TASK 14 + QR-5 RULED: the RE-1 inputs memo — one trigger means two different |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-SECOND invocation) — six checks, six passes, and a  |
| 2026-08-15 | #87 | design | CHAT-DISPATCH TASK 13: the QBO integration research memo — no read-only scope exists, read |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-FIRST invocation) — a packet that asked to be check |
| 2026-08-15 | #86 | design | CHAT-DISPATCH TASK 12: the PR-3 re-parenting migration proposal — the hierarchy is not a h |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; FORTIETH invocation) — the packet predicted a lock that w |
| 2026-08-15 | #85 | design | CHAT-DISPATCH TASK 11: the WF-2–WF-8 email-workflow spec — an ADOPTED document is not an a |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-NINTH invocation) — the first spec in this chain w |
| 2026-08-15 | #84 | design | CHAT-DISPATCH TASK 10: the IN-2 spec, and the first gate in this chain that resolves BOTH  |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-EIGHTH invocation) — two specs whose whole job is  |
| 2026-08-15 | #83 | design | CHAT-DISPATCH TASK 9: IN-1 and IN-3 spec drafts — two items open because the DESIGN questi |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-SEVENTH invocation) — the audit's findings stop be |
| 2026-08-15 | #82 | design | BUILD-STATE DISPOSITIONS RULED: A-1–A-6 and the re-measure checkpoint; the cap number deli |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-SIXTH invocation) — a divergence inside a VERIFIED |
| 2026-08-15 | #81 | design | CHAT-DISPATCH TASK 8: form-engine specs FE-4, FE-5, FE-6 — and a VERIFIED registry entry t |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-FIFTH invocation) |
| 2026-08-15 | #80 | design | CHAT-DISPATCH TASK 7: Bexar local rules + eFileTexas — the filing moment is contested, and |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-FOURTH invocation) — the audit lands, and it lands |
| 2026-08-15 | #79 | design | RECORD-INTEGRITY AUDIT (chartered): 65 claims across BUILD-STATE and the queue's status la |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-THIRD invocation) |
| 2026-08-15 | #78 | design | CORRECTION: the Insurance-Code absence claim at #76 was OVER-BROAD. The fourth registry fi |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-SECOND invocation) — DELTA ONLY, a re-issued packe |
| 2026-08-14 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-FIRST invocation) |
| 2026-08-14 | #77 | design | Q-STAT-1 RULED: the SOURCING convention is binding, v18 drafted and delivered; and a corre |
| 2026-08-14 | — | runner | QUEUE-RUNNER batch (runner line; THIRTIETH invocation) |
| 2026-08-14 | #76 | design | STATUTE PASS: all 21 `RETRIEVAL: NOT RUN` rows retrieved from the official corpus; eightee |
| 2026-08-14 | #75 | design | DEADLINE-ENGINE MEMO filed as PROPOSED design input; RULE TEXT SOURCED TO CLEAN AUTHORITY  |
| 2026-08-14 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-NINTH invocation) |
| 2026-08-13 | #74 | design | CD-2 ROLE MINING PASS filed as PROPOSED data prep; the reconcile-first finding |
| 2026-08-13 | #73 | design | RULING RUN, V-4 THROUGH V-8, ONE AT A TIME: all five ruled the same session |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-EIGHTH invocation) |
| 2026-08-13 | #72 | design | REGISTRY VERIFICATION WORKBOOK + CITATOR PASS filed as PROPOSED design input; |
| 2026-08-13 | #71 | design | OUTLOOK EDIT/CANCEL EXERCISED LIVE: cancel works, edit works EXCEPT the |
| 2026-08-13 | #70 | design | TELEMETRY: the record authorizes Code to do NOTHING, so nothing was done; |
| 2026-08-13 | #69 | design | DOCS LINT SWEEP: read-only, one candidate report, zero edits to existing |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-SEVENTH invocation) |
| 2026-08-13 | #68 | design | SWEEPS RULED AND RUN: duplication (no duplicate; three pointer glyphs) |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-SIXTH invocation) |
| 2026-08-13 | #67 | design | QR-3 AMENDED TO v7 (ahead-stop) after the twenty-fifth invocation |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-FIFTH invocation) |
| 2026-08-13 | #66 | design | RULING RUN: ~20 open queue items ruled one by one (design session, |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-FOURTH invocation) |
| 2026-08-12 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-THIRD invocation) |
| 2026-08-13 | #65 | design | #62/#63 AND #64 BATCHES VERIFIED DESIGN-SIDE, FULL-TEXT (device-bridge |

---

## §3 POINTERS — the rest of the record, all of it BRIDGE-ONLY

Three files hold what this one does not. **None of them is retrievable from the design side, and that is BY DESIGN (`TC-4`): their absence from design-side retrieval is never evidence of absence.** Each is reached over the device bridge or by a Claude Code session.

- **`docs/record/session-log.md`** — THE LIVE LOG. Append-only, canonical, unbounded. **Authoritative in every disagreement with this file.**
- **`docs/record/session-log-toc.md`** — THE FULL ABSTRACT INDEX, one dense summary row per entry. What an entry *said*; §2 above tells you only that it *exists*.
- **`docs/archive/session-log-archive-2026-07-21_2026-08-12.md`** — THE CLOSED ARCHIVE, every entry older than the 2026-08-13 cutoff, with its own frozen index. Never regenerated; no row is ever added to it.

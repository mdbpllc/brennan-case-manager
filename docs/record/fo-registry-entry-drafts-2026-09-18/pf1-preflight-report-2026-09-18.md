# PF-1 PREFLIGHT REPORT — firm-obligations registry entry drafts, tranche 1 (2026-09-18)

**Status:** EVIDENCE (`CAP-2`). **Canonical repo path:** `docs/record/fo-registry-entry-drafts-2026-09-18/pf1-preflight-report-2026-09-18.md`. Written 2026-09-18 (Central, DT-1) by the Opus 5 design session in Cowork that drafted the entries (CHAT-DISPATCH v6, Task 4). **Why PF-1 fired:** the packet carries six proposed registry entries and legal characterizations of Texas statutes and the TDRPC — the trigger ruled at `#105`, and DECISION 8 (`#155`) names PF-1 for this act by name.

## The evidence base the fleet read (read-only)
- **Statutes:** the official corpus `Documents\Knowledge Repo\Statutes 26-08-14\` — `gv.81`, `gv.79`, `gv.311`, `cr.26`, `tx.171` — each unzipped into the device VM's own `/tmp` (nothing staged, nothing written to a connected folder), extracted with `pdftotext -enc UTF-8 -layout`, normalized with the §3 normalizer of `statute-pass-registry-retrieval-2026-08-14.md` (characterized contexts only). Residual doubled-`A`: 0 in every chapter but `tx.171` (6, all in the two contexts `Q-STAT-7` has not adopted, none inside a quoted section).
- **Conduct rules:** `Documents\Knowledge Repo\texas-disciplinary-rules-of-professional-conduct-pdf.pdf`, cover *"(Effective March 7, 2025)"*, doubled-`A` 0.
- **The repo:** plain file reads of the checkout at HEAD `4940ed3` (read from `.git/refs/heads/master` as a file; **no git command was run by any lane**).
- **Not opened by any lane:** `Civil\Dorsaneo\`, `Session Captures\`, `src/`.

## The fleet: two lanes plus one re-sweep, every one of which RETURNED CONTENT
The dead-fleet check (`#104`) passed: each agent returned a substantive findings list (213K–222K subagent tokens, 41–59 tool uses each).

| Lane | Scope | Result |
|---|---|---|
| (i)+(ii) Quotations and characterizations | every quoted span against RAW extraction; every non-quoted claim about what a text says; every history line | 36 full quotations · 27 EXACT · 9 MINOR · **0 MISMATCH** (+5 fragments EXACT); findings **1 HIGH · 8 MEDIUM · 16 LOW** |
| (iii)+(iv) Repo facts; client data and licensed text | every claim about the rulings record, register, module spec, BUILD-STATE, source-read record; names, dates, places | 33 claims · 22 SOUND · **3 WRONG · 3 PARTLY WRONG · 4 UNSUPPORTED/over-broad** · 1 omission; lane (iv) **CLEAN** |
| RE-SWEEP AFTER FIX | every passage the first fix pass touched | 12 items · 4 SOUND · **8 with defects (9 defects)** → fixed |
| Second re-check (the drafting session itself, not a fleet) | every passage the second fix pass touched | 15 passages re-checked at source; 0 defects found |

## What the fleet found, and what was done (the substance)
1. **HIGH — FRD-5's dates for § 171.204 were not the section's own history.** The draft had given subsection (d)'s repeal note. The section's history carries a 2025 act (*"Acts 2025, 89th Leg., R.S., Ch. 335 (H.B. 346), Sec. 2(3), eff. September 1, 2025."*) and an entry effective January 1, 2026 (*"Acts 2021, 87th Leg., R.S., Ch. 859 (S.B. 938), Sec. 9(4)…"*). **Fixed:** enactment and latest amendment given verbatim; both flagged as session law NOT READ and NOT inferred; the (d) repeal kept as a separate labelled note.
2. **§ 171.002 had no dates, and § 171.006's adjustment of the $2.47 million figure was not surfaced.** Fixed: both history lines added; § 171.006(b) quoted; gap row G-6 added (the operative figure is a comptroller determination outside every channel), routed to FRD-Q2.
3. **FRD-1 over-read § 81.054(e).** (e) is permissive (*"may adopt a system under which membership fees are due on various dates"*); ch. 81 as read states no due date. Fixed: the draft now says the date's source is expected in the unheld State Bar Rules (G-1), to be confirmed.
4. **FRD-4's "reconcil…" statement was false as stated.** Two occurrences, neither in an accounting sense (the Preamble; Rule 1.04's family-law comment). Fixed: both quoted; the conclusion (no reconciliation cadence in 1.15) stands.
5. **§0's DECISION 8 quotation was mis-attributed** (the words came from the project-instructions clause, not the rulings record). Fixed: re-quoted from the rulings record's DECISION 8 row, verbatim.
6. **§6's column label was wrong for five of six rows**, and three quotes were cut without ellipsis. Fixed: header now names §7.6's Source column (`FOT-19`) and §7.7's "Status / note" column (the rest); the cut quotations completed or marked with an ellipsis.
7. **`Q-QBO-6` and the TDRPC numbering.** The register's candidate "TDRPC 1.14" is annotated as trust records; in this PDF 1.14 is *"Conflicts: Public Interest Activities"* and 1.15 *"Safekeeping Property"*. The first fix spliced a quotation that no source says; the re-sweep caught it. **Fixed:** the annotation is now quoted as it stands in the register, and the numbering question is SURFACED, NOT RESOLVED.
8. **§5's § 311.014 / § 311.002 locator over-reached twice.** First it said the question "bears only on the STATUTORY rows … not on TDRPC 1.15"; § 311.002(4) reaches *"each rule adopted under a code"*, which the draft had cut. **Fixed:** § 311.002 quoted through (4); the sentence now surfaces the question for the statutory-date rows and for rows whose date is expected in rules adopted under a code (`FOT-1`, `FOT-2`, via § 81.024, verified at text), and decides nothing; FRD-Q3 asks it.
9. **FRD-5's § 171.204(c) note stated a legal effect** ("which qualifies the (b) limb"). Fixed: "whose relation to the (b) limb is not decided here — his read."
10. **Minor:** a capitalized "Before May 16" (source lower-case); a period inside the quotation "the last day of any period" (no period in the source); FRD-1's load-bearing line naming (b), which the Cite line omits; FRD-4's "per-rule dates elsewhere" (there is exactly one, at 1.04); §2's ambiguous `spec-feedback.md` cite (now by full section heading, per the 2026-09-07 cite-by-heading ruling); § 171.006 missing from the per-section residual list (count 0, verified); "eight legislative bodies" → "eight named employers" (§ 81.113(a)(1)(A)–(H), verified); "section" → "subsection". All fixed.

## What the fleet did NOT establish (said so, so no one over-reads this report)
- **Nothing here is verification.** Every entry stays UNVERIFIED; only Michael verifies.
- **Session law was not read.** What any amending act did to a cited subsection is not stated anywhere in the packet.
- **The corpus's currency** was not re-read tonight; the record's statement (89th Leg., 2nd C.S., 2025) is carried as the record states it.
- **The October 2024 TDRPC package** (`#157`'s precondition) was carried as BUILD-STATE states it, UNVERIFIED; no lane read the amendment order.
- **Whether `norm.py` is byte-identical to the §3 published normalizer** was not verifiable by the lanes from where they sat; the normalizer's apostrophe-spacing rule is named in the drafts' §2.

## Scratch
All extraction scratch is in the device VM's `/tmp/t4/` (outside every connected folder; invisible to Michael; nothing to remove by his hand). Lane scratch in the cloud container only.

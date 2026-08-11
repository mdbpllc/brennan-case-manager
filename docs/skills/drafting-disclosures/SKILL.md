# SKILL: drafting-disclosures — TRCP 194.2(b) & 195.5 combined disclosures by shell surgery

> STATUS: v1, 2026-08-06. Canonical path: docs/skills/drafting-disclosures/SKILL.md.
> Method authority: docs/specs/form-engine.md §12 (POC learnings) and §8 (shell findings).
> Helper code: docs/specs/form-engine-helpers.md. This skill OPERATIONALIZES those documents;
> it does not restate their rationale. On any conflict, the spec wins and this skill gets a
> version bump to match.
> UPGRADE PROTOCOL: learnings fold into form-engine.md §12 FIRST (via packet through the
> queue); then this file revises, citing the spec; version line bumps; the claude.ai uploaded
> copy is re-uploaded after the revision reaches HEAD. At the start of any run, compare this
> file's version line against the copy at HEAD — if they differ, use HEAD's.

## When to use
Michael asks to draft, update, or redo Rule 194.2(b) / 195.5 disclosures (or another
shell-based litigation form he designates) for an active case, in a design-space chat, by
hand — i.e., before the form engine exists as software. Triggers: "draft disclosures,"
"194.2(b)," "195.5," "run the disclosure skill," or an upload set matching §Inputs.

## Inputs (Michael uploads; the skill never stores case data)
REQUIRED:
1. **Shell .docx** — the working form for THIS case. Michael states what is already correct
   (typically the caption and possibly the first TO: paragraph). Everything else is presumed
   recycled from prior cases and gets replaced.
2. **Medical chronology** (.xlsx or similar) — provider/treater identities and visit history.
3. **Every defendant's answer on file** (PDFs) — party names as pleaded, counsel, firms,
   addresses, phones, faxes, e-service addresses.
OPTIONAL (each one removes a TBD or a placeholder from the draft):
4. Medical bills / billing summary — actual charge amounts (otherwise all charges = TBD).
5. Crash/incident report — investigating officer identity for the non-retained list.
6. Prior served disclosures in the same case — supplement-tracking.

## Procedure
0. **Session hygiene:** confirm which items in the shell Michael says are correct. Ask ZERO
   speculative questions answerable from the uploads; ask ONLY for genuinely missing data
   the drafting cannot proceed without. Confirm the service date to put in the certificate
   of service (default: the date he intends to serve, not the drafting date).
1. **Unpack and merge:** unzip the shell; run the run-merge pass (form-engine.md §12.1 —
   mandatory, never skip). Map every paragraph.
2. **Data map before any edit:** extract from the answers — exact party names AS PLEADED
   (caption spelling controls; flag any spelling conflicts with the medchron rather than
   silently choosing), counsel blocks, e-service addresses. Extract from the medchron —
   every provider entity, every named treater, treatment date range, imaging/procedures.
   Sweep the medchron's DOCUMENT-NAME columns for billing entities with no visit rows of
   their own (form-engine.md §12.6, FE-2 wrinkle) — list any found.
3. **Fill the gaps, flagged:** provider addresses/phones absent from the chronology are
   drafted from web lookups and EVERY looked-up value goes on the verification list as
   UNVERIFIED. Conflicting lookup results are stated as conflicts, not resolved silently.
   Charges without bills = TBD, never estimated.
4. **Surgery, per the spec:** node-delimited anchors with expected-count assertions and
   occurrence indexing; in-place text-node swaps for merge fields; whole-paragraph cloning
   and span-capture-and-rebuild for structure; per-block paragraph deletion (never
   blank-and-leave); bookmark strip on clones + global dedup post-pass. Helpers:
   docs/specs/form-engine-helpers.md. The shell's formatting is never touched outside
   <w:t> nodes and whole-paragraph operations.
5. **Variant discipline (form-engine.md §9):** use the approved variant language for typed
   providers. Where a person's role cannot be established from the records, write the
   ROLE-NEUTRAL fallback and flag for sharpening — never guess a specialty. Entities with
   billing records but no named provider get the CUSTODIAN-ONLY variant. There is no
   mental-health variant by design; if the chronology contains mental-health treatment,
   STOP and ask Michael before drafting anything about it.
6. **Delete stale shell blocks that have no current-case counterpart** (e.g., an EMT block
   when no EMS transport appears; a prior case's investigating officer) rather than leaving
   placeholders — and put each deletion on the verification list so Michael can supply the
   real item if one exists.
7. **Ship gate, all three (form-engine.md §12.5):** XSD-validate against the original;
   render to PDF and inspect every page; parts-diff proving only word/document.xml changed.
   Plus the leftover sweep: assert zero survivors of prior-case names and placeholder
   tokens from the shell.
8. **Deliver:** the draft .docx via outputs, PLUS the verification list (see below), PLUS
   the provider-data block (see below). Never deliver the draft without the other two.

## The verification list (mandatory, every run)
State, minimally: every web-looked-up address/phone (with any conflicts found); every
role-neutral narrative that could be sharpened from records; every deleted stale block and
what would replace it; charge amounts still TBD; any name-spelling discrepancy between
caption and chronology; the certificate-of-service date used; and substantive prompts the
drafting surfaced for attorney judgment (e.g., potential-parties and insurance-agreement
responses kept at the shell's defaults). This list is the attorney-review interface; its
quality is the skill's quality.

## The provider-data block (FE-1 scout, mandatory, every run)
End every run by emitting each provider touched, in this exact shape, for Michael to save
where he keeps such things (NOT into the repo by the skill's hand):

    PROVIDER: <entity legal name as used in draft>
    NAMED TREATERS: <names + credentials, or "custodian-only">
    ADDRESS: <as drafted> [VERIFIED by Michael? Y/N]
    PHONE: <as drafted> [VERIFIED? Y/N]
    VARIANT USED: <EM / radiology / chiro / PT / neuro / custodian-only / role-neutral>
    SOURCE: <medchron row / answer / web lookup / Michael>

Purpose: accumulate a real provider corpus across cases so FE-1 (directory table vs.
interview cards) gets ruled on evidence. This block is the engine's advance scout.

## Data hygiene (absolute)
Case data lives in the chat and in Michael's own files ONLY. Nothing case-identifying
enters this skill file, any packet, the session log, or the repo — ever. Skill upgrades
describe method against "a case," never against a name.

## Operator quick-start (Michael)
1. New chat in the brennan-case-manager project. Routine drafting runs do NOT need Fable —
   Opus 5 is the default for this; check the usage meter at session start per convention.
2. Upload: shell + medchron + all answers (+ bills/crash report if available).
3. Say what's already correct in the shell, name the case's service date, and say
   "draft the disclosures."
4. Review the draft against the verification list; save the provider-data block.
5. Anything learned that should change this skill → say so; it becomes a spec fold-in and
   a version bump through the normal packet flow.

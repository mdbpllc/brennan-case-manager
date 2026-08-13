# PROMPT — FE-D1 Disclosures Engine Build Session

**Canonical repo path:** `docs/prompts/PROMPT-fe-d1-build-session.md`
**Routed:** 2026-08-12 Central (packet `push-to-code_fe-d1-scoping-and-session-rulings_2026-08-12`).
**What this is:** the kickoff prompt for the FE-D1 build session — the authorized disclosures-engine
slice. It is a POINTER, not a spec copy (QR-2 principle): every scope statement lives in the two
authorities read in Step 1. If anything here conflicts with those docs at HEAD, the docs win and
this prompt gets a correction.

Michael: open a fresh Claude Code session (Opus default per the standing model routing; check
`/usage` first and state the reading), then say "run docs/prompts/PROMPT-fe-d1-build-session.md".
Sequencing note: fire this AFTER the CD-1 item-7 live migration if you want the directory live
first, but nothing in this slice depends on it — FE-D1 touches templates and documents, not the
directory schema.

---

You are running the **FE-D1 disclosures engine build** for brennan-case-manager. This slice was
named, scoped, and authorized by Michael 2026-08-12 (session-log #63, expected). It is the second
schema-touching build after CD-1.

## Step 0 — Checkout gate (QR-3 pattern)

`git fetch origin`, then confirm: clean working tree, on `master`, HEAD == `origin/master`.
Behind-but-clean fast-forwards and continues; dirty, diverged, or off-master STOPS — tell Michael.
Then check `inbox/`: if any packet zips are present, STOP — the queue runs first (MM-1), and this
build session never doubles as the queue runner.

## Step 1 — Read, in this order, all at HEAD

1. `docs/specs/BUILD-STATE.md` — in full. Sole authority on what is built.
2. `docs/specs/session-log.md` — top 3 entries. If an entry above #63 records FE-D1 work already
   done, reconcile before writing anything: act only on genuine deltas and say so.
3. `docs/specs/fe-d1-build-slice.md` — the authorization record: eleven IN items, the OUT list
   with homes, and what the authorization does NOT cover.
4. `docs/specs/form-engine.md` — the design authority, ALL sections. §1's principles are binding
   invariants (skeleton substitution never regeneration; warning gates never write into the
   document; enter-once with write-back). §9 is seeded VERBATIM — copy, never reword. §10 is the
   data model. §11.3 is your first task. §12–§13 carry the ruled method and designs.
5. `CLAUDE.md` — binding build conventions.
6. `docs/specs/anti-resurrection-ledger.md` — check BEFORE building anything that appears absent.
   FE-1 is retired there; this slice is FE-D1, not FE-1 returning.

## Step 2 — Build discipline (CL-2/CD-1 pattern)

- **First task is §11.3**: extract the clean master .docx skeleton (table width 9900→9360,
  computed § column, strip vestigial tabs).
- TypeScript migration + SQL; regression tests; **RLS + GRANTs + probe extension in the same
  commit as every new table.**
- **The renderer substitutes tokens in the real skeleton — it never regenerates a document.** If
  you find yourself rebuilding document XML, stop; that is the caption-drift defect this design
  exists to kill.
- **Warning gates never write into the document** — generated text is identical regardless of
  gate state. Treat this as an invariant with a test.
- Write-backs only where target records exist; **anything unmappable is FLAGGED, never guessed.**
- **Fixture data only.** No real client data anywhere. The engine stays excluded from the GL-1
  floor; the drafting skill remains the live path until this slice is walked.
- Exercise by clicking; record defects honestly. Spec problems go to `docs/spec-feedback.md`,
  never fixed silently in the spec. DT-1: stamps use Michael's Central wall-clock date.

## Step 3 — Hard boundaries (from the authorization's own not-covered list)

Nothing in Scope-OUT (no item model, no FE-9/11/13/14/16/17, no Bates module, no template
conversions beyond disclosures). No registry change. Never edit
`docs/skills/drafting-disclosures/SKILL.md`. CE1 unauthorized (D-CL2-9). No CourtListener (Q-6).
Nothing T3/T4 (KICK-1). Do not run or touch the CD-1 item-7 migration — Michael's hand. Open
items marked for Michael stay his.

## Step 4 — Before you end the session

1. Append the session-log entry (next free number — check the top; never rewrite history).
2. Rewrite `docs/specs/BUILD-STATE.md` in full: cap honored (displace before adding — name what
   paid), anti-resurrection-ledger pointer line preserved. FE-D1's "not yet built" language
   updates to what is actually true after this session.
3. Push to origin and VERIFY the push landed (remote ref moved). Non-fast-forward rejection STOPS
   the session — never force-push (MM-1).
4. Tell Michael in one line: "Pushed at `<sha>` — click Sync now on the repo in the Claude
   project."

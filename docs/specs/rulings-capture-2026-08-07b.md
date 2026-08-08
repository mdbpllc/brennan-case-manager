# Rulings Capture — 2026-08-07 EVENING SESSION (design session, Fable 5)

**Canonical repo path:** `docs/specs/rulings-capture-2026-08-07b.md` — NEW file. The "b" suffix
distinguishes this from `rulings-capture-2026-08-07.md` (the earlier dictated rulings batch, #34);
the two are separate sessions on the same date and must never be merged.

**Meter readings:** not supplied this session (noted for the record; second consecutive design
session without them — #34 carried the same note).

**RR-1 compliance:** all packet artifacts were authored after the session's final ruling. The one
document authored mid-session — the Domser project instructions v1 — was superseded by v2 within
the session when the Rev. 2 case instructions surfaced, before v1 was ever pasted; that supersession
is itself an RR-1 exhibit (document re-read against later-arriving material before shipping). The
v2 Domser document was re-checked against the later O2 and Phase 0/T3 rulings: unaffected
(different domain).

---

## PART 1 — PROBATE-LADDER DESIGN PASS: DEFERRED (CONFIRMED); PL SERIES ISSUED

**The session opened as the probate-ladder design pass** (the pass PR-3's execution is held on).
Working IDs were issued before the first fork was ruled: **PL-1** (model shape), **PL-2** (which
proceedings get ladders now), **PL-3** (independent-administration ladder content), **PL-4**
(ladder / deadline-engine boundary). Full question text for each is in §7 of the work order, per
QR-1.

**Mid-pass, Michael put his epistemic position on the record, unprompted:** he has not handled a
probate case all the way through — 7 years in PI and 1 in criminal defense, but no lived probate
arc. His PI rulings were practice-validated; probate rulings tonight would be treatise-validated
only.

**RULING (CONFIRMED: "We can sit on the pass and wait on Domser"):** the probate-ladder design
pass is DEFERRED until the Domser matter (the live validation matter) produces lived-arc evidence,
checkpointed at LETTERS ISSUED and at CLOSING. Reason: a ladder drafted now would be
treatise-derived, not practice-validated, and ladder statuses are expensive to fix (they touch the
case-type tree) while checklists and content are cheap to revise — so structure waits for the
evidence and content can move earlier if wanted. PR-3's execution hold is UNCHANGED and now has a
concrete unblock condition (the first Domser capture plus a rescheduled pass).

**On the record but UNRULED:** Claude's PL-1 recommendation was presented before the deferral —
proceeding = case type (option (a)); shared intake front-segment on every proceeding ladder;
mid-matter proceeding changes ride the existing review-logged case-type-change operation; heirship
modeled as a conditionally-present phase of intestate independent administration, with standalone
Heirship Determination reserved for the no-letters title-clearing use; temporary administration as
an overlay object, not a case type; option (c) (one branching "Probate" ladder) rejected as
`_piDefault` one level up. This is PROPOSED only. The Domser arc evidence bears directly on it.

## PART 2 — DOMSER PROJECT INSTRUMENTED (CONFIRMED); THE INSTRUCTIONS SHIPPED

**Michael's proposal (CONFIRMED by his own initiation):** rather than run the pass, build a full
instruction set for the Domser matter project so that project knows it is the validation
instrument for the probate practice-area design.

**Delivered: Domser project instructions v2** (v1 was superseded pre-paste the same evening when
Michael showed the Rev. 2 case instructions of 2026-08-06 already living in that project — v1 had
been drafted against the stale 2026-07-24 snapshot). The v2 design, for the record:

- **Two instruction layers:** a governance layer (project instructions field — membrane,
  observation machinery, session hygiene) and the CASE INSTRUCTIONS (project knowledge, Michael's
  own Rev.-cycled strategy document, currently Rev. 2). Case instructions own strategy and facts;
  governance owns process; neither overrides the other in its own lane.
- **Precedence rule with a named conflict:** the probate system prompt's §4 matter snapshot is
  declared superseded — it carries a death-date anchor the death certificate contradicts. The
  case instructions control on every matter fact.
- **The membrane:** matter facts never leave that project except by Michael's hand; NOTHING from
  it may ever enter the repo, fixtures, or any handoff artifact; public-record availability of
  probate filings is explicitly NOT an exception.
- **The export surface:** an arc log de-identified BY CONSTRUCTION (relative-time anchors, role
  labels, no identifying facts; test: every line committable to the repo verbatim), packaged into
  ARC CAPTURES at the letters and closing checkpoints, answering the frozen PL questions from
  lived arc only. Michael reviews every capture and is the only transport.
- **Branch labeling:** if the matter enters contest posture, those entries are labeled BRANCH,
  not SPINE — PR-2 ruled contests a rare secondary branch, and one contested sample must not
  reshape the core ladder by masquerading as the normal arc.
- **NOT REPO MATERIAL:** the Domser instructions document lives in the Domser project's
  instructions field only. It is recorded here by description; it is not staged for the repo and
  must never be routed there.

## PART 3 — CORPUS FINAL HOME (PROPOSED, unruled)

The probate knowledge corpus's recommended home moves from the ARCHIVE project (the #34-era
recommendation, PROPOSED and never ruled) to the DOMSER PROJECT: it is the one place where Part
III's privileged matter content is load-bearing rather than a liability, the corpus is that
project's core knowledge rather than dilution, and the licensed treatise material stays inside a
single privileged workspace. Supersedes-if-ruled; the ARCHIVE recommendation stands until Michael
rules.

## PART 4 — SAT-1: SATELLITE-PROJECT PATTERN (PROPOSED, unruled)

Michael raised making other Domser-style projects for other parts of the software. Claude's
proposal, issued as **SAT-1** with full text in §7: satellite projects are appropriate when a
piece needs a large specialized corpus, confidentiality-segregated material, or a sustained
observation/research function — the satellite holds knowledge and produces
index/synthesis/capture documents that travel by Michael's hand. **The one-ruling-space
principle:** satellites NEVER rule and nothing enters the build queue from them; the session log,
the attorney-review queue, and packet issuance stay singular in the design project, because
splitting them recreates the #13 copy-forward failure class multiplied by the number of projects.
Ordinary module design against repo specs (money ladders, conflicts logic, deadline engine) stays
in the design project. Each new satellite gets Domser-template instructions at birth; the design
project's instructions gain a satellite inventory at the first non-Domser satellite (a future
trigger-4 event, not tonight).

## PART 5 — FABLE-IN-CODE "ASK FIRST" (note, not a new ruling)

Michael stated he will ask before using Fable for build sessions. Recorded as the enforcement
posture of the EXISTING model-usage convention (Fable-in-Code is a deliberate exception, never
the default), not a new rule. Claude's stated calculus for those asks, on the record: expect
"no" for fully-specified packet execution (the packet already de-risked it); "yes" candidates
are slices where design judgment and build interleave (money/disbursement, deadline engine,
conflicts, schema-shaping migrations) and stalled-debugging rescues. No model choice relaxes any
verification convention.

## PART 6 — O2 CLOSED (CONFIRMED: "its going to be windows only")

**O2 (P1 operating system, open since the sort-and-route design pass §10): CLOSED — Windows
host.** Native Ubuntu and dual-boot REJECTED. Reasons, load-bearing: (1) the P1 is already the
provisioned second Claude Code/repo machine on Windows; (2) the ingest design is OneDrive-based
(phone watched folder; post-routing audio placement) and OneDrive has no official Linux client;
(3) the design specifies a BACKGROUND service — under dual-boot it exists only while booted into
Ubuntu, which defeats hands-off ingestion entirely. **Implementation detail inside the ruling,
not a qualification of it:** NeMo has no native Windows support, so the pipeline runs in WSL2
(CUDA passthrough) inside Windows — invisible plumbing under a Windows-only machine.
**Escape hatch recorded for the future, not for now:** if volume outgrows the laptop (always-on
service, fine-tuning, the 8 GB VRAM ceiling), the right move is a dedicated headless native-Ubuntu
box — the original spec's GPU-PC concept before the P1 collapsed two roles into one machine.

## PART 7 — MODEL CURRENCY CHECK (run 2026-08-07, per the memo's "re-check at build time")

Web check against current sources: **parakeet-tdt-0.6b-v3 remains the current-generation default
local ASR pick as of mid-2026** (still the newest TDT checkpoint; independent mid-2026 coverage
still cites it as the fastest open local model at 6.34% WER); **Sortformer checkpoints unchanged**
(offline `diar_sortformer_4spk-v1`; streaming v2/v2.1; 4-speaker cap intact). **D4 stands; no
spec surgery.** Practical floor noted for setup: NVIDIA's WSL2 guidance calls for Windows driver
≥ 570 and Ubuntu 24.04 as the minimum WSL distribution. The Phase 2 extraction-LLM name remains a
build-time config choice and gets re-checked when Phase 2 arrives.

## PART 8 — PHASE 0 + T3 AUTHORIZED (CONFIRMED: "Authorized")

**Authorization quoted: "Authorized"**, given to the amended single-packet structure after Michael
pressure-tested the first version ("Is this your best suggestion?") and Claude amended it:

- **Preflight (Michael's hands, verified at session start):** Windows NVIDIA driver ≥ 570; WSL2 +
  Ubuntu 24.04 installed; pilot + scripted audio files reachable from the P1; disk headroom for
  models; the 13 pilot transcript files supplied if the fixture rider is to run.
- **Stage 1 — environment + scoring:** WSL2/CUDA/NeMo stand-up; rerun the pilot and scripted
  batches at FULL PRECISION with word boosting against the existing ground truth; diarize the
  held-back two-voice recording; Spanish-sample trial if Michael records one. **The scorecard is
  COMMITTED to docs/** as a reviewable design artifact — it is the first real precision data the
  GPU stack produces and the D1 auto-file decision and confidence thresholds are explicitly
  waiting on real precision data.
- **The checkpoint is MICHAEL'S, in-session:** Code presents the scorecard and STOPS; stage 2
  proceeds only on his word. Reason: "stage 2 gated on stage 1 passing" would have made Code the
  judge of the gate, against the project's verification posture — the amendment moved the gate
  into Michael's hands at zero cost since he is present approving per-edit anyway.
- **Stage 2 — T3 service** per the design doc §11-T3 and the capabilities memo §9 shape: FastAPI,
  OpenAI-compatible surface, NeMo runtime (not ONNX — ONNX loses word boosting), sequential model
  loading per the 8 GB VRAM constraint (memo §8), CPU/int8 fallback mode included. WSL2 design
  note: copy files INTO the WSL filesystem for processing; only the watch-and-grab step touches
  the Windows mount (`/mnt/c` I/O is WSL2's weak spot).
- **Fixture rider:** upgrade T2's tests from synthetic stand-ins to the 13 real pilot transcripts
  (fictional-content recordings scored against known scripts — repo-safe by design). Transcript
  TEXT only; audio never enters the repo (`..\data\` convention).
- **T4 (wiring) is NOT authorized** — it follows later, separately.
- **Rejected alternative, encoding a constraint:** not two packets with a design-side review
  between stages, because Phase 0 results are expected to move CONFIG (boost weights, language
  pinning, thresholds — already tunable by design), not ARCHITECTURE (service shape, sequential
  loading, API surface); the in-session checkpoint converts to the two-packet path anyway if the
  scorecard genuinely surprises.

**Not gating, unchanged:** the Tascam DR-05XP purchase (D2 interim = manual attach; the iPhone is
the proven capture arm; watched folders arrive with the recorder). O1 (auto-file posture) remains
OPEN and gates nothing — the build is confirm-only either way. O3 and O4 remain OPEN, deferred.

# Phase 0 — Environment Stand-Up Record (P1 Gen 8, 2026-08-09)

**What this is:** the environment half of Stage 1, executed on the P1 Gen 8 under Michael's
narrow exception of 2026-08-09. Machine facts, installed stack, and measurements taken
**without any audio**.

**What this is NOT: this is not the scorecard.** No recording has been transcribed on this
stack. No WER, diarization, or word-boosting figure exists. The scorecard Part 8 requires
remains unwritten, and **the Phase 0 + T3 authorization is only partly spent** — Stage 1
scoring and Stage 2 (T3) are both untouched. T4 remains unauthorized.

---

## 1. Preflight — 6 of 7 green; the audio row is RED and stays red

| Item | Required | Measured on this machine | |
|---|---|---|---|
| Machine | ThinkPad P1 Gen 8 | LENOVO **21Q80015US**, family "ThinkPad P1 Gen 8" | ✅ |
| GPU / VRAM | 8 GB | **RTX PRO 2000 Blackwell, 8151 MiB** (`nvidia-smi`) | ✅ |
| NVIDIA driver | ≥ 570 | **595.71** | ✅ |
| WSL2 | Ubuntu 24.04+ | **Ubuntu 24.04.4 LTS, WSL v2**, CUDA passthrough verified | ✅ |
| Disk | headroom for models | **955 G free** in the WSL filesystem | ✅ |
| Fixture rider | 13 pilot transcripts | **already in the repo and already applied** (§4) | ✅ |
| Audio | pilot + scripted recordings reachable | **`..\data\` does not exist on this machine — NOT STAGED** | ❌ |

**Michael's ruling, 2026-08-09 (narrow exception to his own gate, ruled explicitly — not a
workaround):** environment setup may proceed on the six green rows; **Stage 1 scoring HOLDS**;
no synthetic, substitute, or fixture audio may stand in for the recordings; the audio row stays
RED on the record and the preflight is **not** marked passed.

**Michael's hand, outstanding:** stage the 13 pilot recordings into `..\data`, creating that
directory at staging time **outside the repo tree**. A later session re-runs the audio row and
Stage 1 proceeds under the original authorization, unchanged.

## 2. Installed stack (all inside the WSL filesystem, per the WSL2 I/O rule)

Location `~/phase0/` in the Ubuntu-24.04 distribution — **not** `/mnt/c`. Total ~11 GB.

| Component | Version |
|---|---|
| OS | Ubuntu 24.04.4 LTS on WSL 2 (Windows host — O2 ruling) |
| Python | 3.12.3 (system), venv at `~/phase0/venv` |
| PyTorch | **2.11.0+cu128** (torchaudio 2.11.0+cu128) |
| NeMo | **nemo_toolkit[asr] 3.0.0** |
| Support | transformers 5.14.1, lightning 2.4.0, numpy 2.4.6, librosa 0.11.0, soundfile 0.14.0, omegaconf 2.3.0 |
| apt (Michael's hand) | python3.12-venv, ffmpeg, libsndfile1 |

**Checkpoints** cached at `~/phase0/hf-cache` (2.8 GB), `HF_HOME` pinned there:

| Checkpoint | Params | HF revision |
|---|---|---|
| `nvidia/parakeet-tdt-0.6b-v3` | 627.01 M | `541d1f99c6b0c3cd0b11a95167540bb8edefd82b` |
| `nvidia/diar_sortformer_4spk-v1` | 123.22 M | `9f17b10df44c0a4c8f3c86fbddc9ee2d6ab9ac08` |

Both are the D4 pins, re-confirmed current by the 2026-08-07 model-currency check (capture 07b
Part 7). Recording the revision SHAs so a later run can prove it scored the same weights.

### 2.1 The `[cu12]` trap — recorded because it is silent

NeMo 3.0.0's optional `[cu12]` extra pins `torch==2.12.0+cu126`. **CUDA 12.6 has no sm_120
kernels**, so installing NeMo the conventional way on this machine yields a stack that imports
cleanly and then fails or silently degrades at device time. The install here used plain
`nemo_toolkit[asr]` over an explicitly-pinned cu128 torch, with a `constraints.txt`
(`torch==2.11.0+cu128`, `torchaudio==2.11.0+cu128`) so no transitive dependency could swap it.
NeMo's own base requirement is only `torch>=2.6.0`, so the constraint costs nothing.

Note: pinning the cu128 channel holds torch at 2.11.0 rather than the current 2.13.0 (later
releases moved to cu129+). Both support Blackwell; cu128 was chosen as the conservative,
best-tested pairing for the NeMo stack.

## 3. Verification performed (no audio involved)

- **CUDA passthrough, end to end.** `nvidia-smi` inside WSL sees all 8151 MiB. Torch reports
  `cuda available: True`, device capability **(12, 0)**, and **`sm_120` present in the compiled
  arch list**. A 4096³ matmul ×20 executed on the GPU in 1.15 s with all-finite results — real
  compute, not just a successful import.
- **Model load / unload.** Both checkpoints download, build, move to CUDA, and release.
- **NeMo imports:** `nemo.collections.asr`, `ASRModel`, `SortformerEncLabelModel`.

### 3.1 Measured VRAM footprints — weights at rest

Live-tensor figures (`torch.cuda.memory_allocated`), over a **1137 MiB idle desktop** baseline:

| Model | fp32 | fp16 |
|---|---|---|
| `parakeet-tdt-0.6b-v3` | **2433 MiB** | **1216 MiB** |
| `diar_sortformer_4spk-v1` | **491 MiB** | — |
| Both resident concurrently | **2924 MiB** | — |

Release is clean: after `del` + `gc.collect()` + `empty_cache()`, live tensors return to
**0 MiB**. An earlier measurement that appeared to show a leak was reading
`mem_get_info` — the caching-allocator pool, not retained model memory. Sortformer's 491 MiB
matches 123.22 M params × 4 bytes, which is the sanity check the flawed method failed.

**Bearing on memo §8's sequential-loading rule — bounded:** weight residency is **not** the
constraint on this machine. Both models' weights coexist in ~2.9 GB, leaving roughly 3.5 GB
clear after desktop and CUDA context. **This does not retire the rule.** These are weights at
rest; **peak activation memory during decode is unmeasured** (long-form audio, batch size, beam
settings), and that is the figure that actually decides it. Measuring it needs audio, which is
held. The rule stands; it now has evidence under it rather than an assumption.

**On the 4 GB finding of #36:** confirmed as a constraint class, not a speed difference.
Parakeet alone at fp32 (2433 MiB) plus desktop overhead plus activations does not fit 4 GB.

## 4. Fixture rider — already spent

Part 8 lists the rider as work to do: upgrade T2's tests from synthetic stand-ins to the 13 real
pilot transcripts. **It is already done.** `src/routing/__tests__/pilot/` holds all 13
(8 unscripted `rec_3`–`rec_10` in `transcripts-batch1.json`, 5 scripted takes in
`transcripts-batch2.json`), and `pilot.test.ts` already asserts routing behaviour against them
as verbatim int8/CPU-floor output. Nothing to build. Stage 1's job against these is to produce
the **full-precision** comparison, not to introduce them.

## 5. Gates before Stage 1 runs

1. **Audio staged** into `..\data` by Michael's hand (the red row).
2. **Telemetry posture settled — a privilege call, not a build call.** The NeMo install pulled
   in `wandb`, `sentry-sdk`, and NVIDIA OneLogger as transitive dependencies. NeMo disabled
   OneLogger on its own ("no exporters provided") and the others are inert unless configured,
   but this machine is to process privileged audio, and CLAUDE.md's PHI posture makes local
   processing a privilege decision rather than a hosting choice. Three packages whose purpose is
   shipping run data off-box should be explicitly neutered and verified before any real
   recording touches the stack. **Not done; flagged rather than resolved silently.**
3. **Open question for Michael — the smoke test.** Nothing has ever been decoded on this stack,
   so the first Stage 1 run will also be its first inference; a failure in the decode path would
   surface there rather than here. A ~3-second generated tone would prove the path executes
   while producing no transcription-quality claim of any kind. Whether that crosses the "no
   substitute audio" rule is **Michael's call and was not decided in-session.**

## 6. Reproduction

```bash
wsl -d Ubuntu-24.04
cd ~/phase0 && export HF_HOME=~/phase0/hf-cache
./venv/bin/python measure_vram.py      # the §3.1 table
```

`~/phase0/` holds `pull_checkpoints.py` (first, flawed measurement — kept for provenance),
`measure_vram.py` (the corrected one), and the install logs. **None of `~/phase0/` is in the
repo**, and no audio, fixture or otherwise, has entered it.

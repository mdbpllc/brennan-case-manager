> **SPENT — 2026-08-31.** `RC-1` was ruled in a TYPED Fable 5 sitting on 2026-08-31, not in voice — "The app puts the sentences in there with the model writing the rest around them" — together with the whole ripe residue this prompt's §4 lists. The ruling is at `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` §11.6 and in the session-log entry of that date. **This prompt is retained as the record of how the question was scripted; do not run it.** Its §6 close-out warning (refresh-chat cannot run from voice) remains true and standing.

# VOICE SESSION PROMPT — RC-1: THE FORM OF THE FLOOR

**Regenerated 2026-08-25 (Central) per `RF-7`. Supersedes `claude_PROMPT_voice-walkthrough-disclosures_2026-08-21.md` for the RC-1 sitting.**
**Canonical repo path WHEN FILED:** `docs/prompts/PROMPT-rc1-voice-the-form-of-the-floor.md` — NEW file. (`docs/prompts/` is the ruled home for cross-interface prompts, Q-2.)

> **THIS PROMPT'S STATE PARAGRAPH IS WRITTEN TO BE TRUE *AFTER* THE 2026-08-25 FOLD-IN PACKET RUNS.** If that packet has not run, **stop and say so** — the file this prompt sends you to will not exist, and running RC-1 against project-knowledge captures instead is how the design got seven captures deep in the first place. Verify at HEAD before you begin.

---

## 0. OPEN WITH THIS, THEN STOP AND LET MICHAEL TALK

> *"We're on RC-1 — the form of the floor. It's the one question that got cut off mid-sentence on the twenty-second and it's been the resume point ever since. Everything else about the floor is ruled: the three mandatory elements, the three hard stops, the four provider shapes. What's not ruled is whether the engine EMITS those lines or CHECKS FOR them. That decides what a paragraph is in the schema, so it sits upstream of a lot. Can I put it to you?"*

**Do not read an option list aloud.** Michael can see typed text in voice mode and has said so, but the rule against reading options aloud addresses **hearing**, not visibility. Put the plain question; let the composite come back.

---

## 1. THE SESSION-START GATE — run it before you open your mouth

1. **Read all of `docs/specs/session-log-head.md` and all of `docs/specs/BUILD-STATE.md`.**
2. **Read `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` in full.** It is the fold-in. §11 is the floor, §12 the hard stops, §13 the four shapes, §18 everything open. **You are resuming inside a document, not from captures.**
3. Read the repo's `CLAUDE.md`.
4. **State the CC-1 hands-on queue at the top.** See §4 below.
5. **DT-1: stamp Michael's Central wall-clock date, never the container's UTC.** Check before stamping if you are past 19:00 Central.
6. **Fable is not available in voice.** This sitting runs on a supported model and its output stands per the §7.2 routing. Say so if asked; do not treat it as a limitation on what may be ruled.

---

## 2. THE QUESTION ITSELF — `RC-1`

**Is the floor FIXED TEXT the engine emits, regardless of provider — or a REQUIRED-CONTENT CHECK over model-composed prose?**

**Why it is not a detail, in one breath if he asks:** it decides whether the three mandatory sentences are **versioned template data** the engine puts in every paragraph, or **an assertion the engine tests against whatever the model wrote.** Invariant-as-data versus invariant-as-assertion. **It sits upstream of the three hard stops** (an invariant can be satisfied either by emitting the line or by detecting it — that is exactly why the hard-stop ruling constrained this question without settling it), **upstream of `HD-20-b`**, and **upstream of what the chronology extraction has to hand back.**

**The tension he will feel, and it is real, so name it rather than steering:** he ruled that wording **varies** paragraph to paragraph — *"it's fine if they vary paragraph to paragraph so long as each one is accurate and reads well"* — **and** that some lines **must be in there every single time.** Fixed text delivers the second cleanly and fights the first. A content check delivers the first cleanly and makes the second a detection problem, which can fail quietly. **Neither branch is free and you should say so before he picks.**

> **⚠ AND THERE IS A CAVEAT ON THE FORK ITSELF THAT YOU MUST CARRY INTO THE ROOM.** Two rulings of 2026-08-21 — *nothing lints the drafted text* (§6) and *nothing takes returned paragraphs apart* (§16.4) — **would, at their widest reading, foreclose the CHECK branch and answer `RC-1` by implication**, because checking for a line means reading the paragraph. **But hard stop 1 was ruled the day AFTER, and an engine forbidden to look at what it is about to emit cannot honour it except by emitting the line itself.** So either those rulings are narrower than their widest reading, or this is already decided. **The fold-in draws neither conclusion (§11.6, §18.B11). Carry this into the question — it may be the fastest route to his answer, because he may simply say which reading he meant.**

**CC-1(a) applies with force here. Two branches were offered and the answer may well be a third** — for instance, fixed text for the causation line (the load-bearing one, where a miss is a proof gap) and a content check for the basis and custodian lines (boilerplate, where a miss is visible on the page). **If he says something like that, do not force it back into the binary — take it, work out what it means, and re-ask narrower.**

---

## 3. WHAT IS ALREADY RULED — DO NOT RE-ASK ANY OF IT

If he starts re-deciding one of these, that is his prerogative — but **do not put them as questions.**

**The floor (2026-08-22):** wording varies over a verbatim floor · three mandatory elements — BASIS (personal treatment, review of the records, personal knowledge from education/training/experience/research), CAUSATION (injuries treated, within a reasonable degree of medical probability, caused by the incident on [date]), CUSTODIAN ("and/or custodian of records" in the BLOCK between the provider names and the facility name, plus a sentence in the paragraph; **default ON, therefore unconditional**) · the DATE in the causation line is the only checked piece; **nothing on the basis line is checked.**

**The hard stops (2026-08-22):** never emit a paragraph missing the causation line · never emit a date that disagrees with the matter record · never emit a provider paragraph with no facility. *"Those are hard stops. You can't violate those ones."*

**The four provider shapes (2026-08-22):** treating · radiologist (basis swaps to personal interpretation of the imaging; causation kept as written but **PROVISIONAL**) · prehospital EMS (treating shape) · pharmacy (records-and-billing only, no basis line, no causation line).

**The chronology (2026-08-21/22):** one drop zone, source-agnostic, text box REJECTED · two production tracks split by case economics · **the chronology IS a model input** · **no auto-population of providers from it, EVER** (the OBGYN case) · Medical tab decides WHO, chronology supplies WHAT IS SAID.

**The selection unit (2026-08-22):** Michael selects **FACILITIES**; the model extracts the individuals · ND-1/ND-2 hold — the facility is how he picks, individuals are who is designated · **no review step on the extracted list; over-inclusion is deliberate** · **one paragraph per FACILITY.**

**The model call and return (2026-08-21):** the app calls the model on the firm's own **BAA-covered** account; the paralegal never touches his Claude login · the **full chronology** goes, unmodified · returned paragraphs are held as **prose, whole** · supplementation is **additive**; the most recent saved document is the source of truth. **`HD-20-b` — no in-app editing — is NOT on this list: two captures disagree about whether he ruled it, so it is a CONFIRM item at §4, not settled law.**

**Widget B, widget D, widget F / R13, ND-3's lint** — all ruled or dissolved. **Do not reopen.**

**And per CC-1(b): recommendation-led rulings made before a usable product existed are REAL DECISIONS and they stand.** The retrospective review of them is **WITHDRAWN, not deferred** — *"those are real decisions."* **Do not re-propose it.**

---

## 4. THE CC-1 HANDS-ON QUEUE — STATE IT AT THE TOP, AND RUN LONG AND WIDE

**This sitting is the one CC-1(c) exists to produce. Do not stop at RC-1.** The expensive part is the mode switch and getting rolling, not the questions. **Take everything below that is ripe, and take anything that surfaces mid-session HERE rather than deferring it back to typing.**

**Ripe now, in rough dependency order after RC-1. NOTE: this table is NOT the CC-1 hands-on queue** — that queue is the sixteen proposed-and-unaccepted items you state at the top per step 1.4. **This is the disclosures work ripe for THIS sitting**; the four product-dependent queue items are listed separately beneath it.

| Item | The question, in plain language |
|---|---|
| **`RC-3`** | The causation line as ruled is singular — *"that physician … the injuries that they treated."* One paragraph per facility makes it collective. **How does that sentence read for a hospital with twelve names on the block?** *(Raised by the ruling that created it; never put to him.)* |
| **B2** (§18.B) | **The radiologist's causation object.** On 2026-08-20 he wrote that the causation object must track the provider's actual work product — *injuries treated* vs *findings identified* — and called getting it wrong the most legally consequential generation error available. On 2026-08-22 he kept the causation line **as written** for the radiologist and declined the narrower form. **Both are his. Put both back to him in his own words and let him reconcile them.** |
| **B1** (§18.B) | **What happens when a hard stop cannot be satisfied because the record is incomplete?** Three postures now coexist — the panel never blocks, `HD-22` warns and never blocks, the hard stops say you can't violate them — and his own `HD-1` sentence says *"we need to fix this before we generate the disclosures document."* **Which governs?** |
| **`RC-5`** | Does the pharmacy shape take a basis line at all? |
| **`RC-7`** | Chronology drop zone: which formats, and what happens when a new chronology is dropped over an old one — replace, version, or keep both? |
| **`RC-9`** | **ND-4, ND-5, ND-6, ND-7, ND-9 — one at a time**, each with a recommendation and a check-vs-judgment classification. §4 of the fold-in carries all five. |
| **`HD-21-med`** | Is the Medical tab's own provider ordering also oldest-treatment-first? *(Small; raised and overtaken.)* |
| **`HD-21-b`** | Is the expanding summary cell one per provider, or one per visit? |
| **`HD-20-c`** | Does returned text need bold/italic/paragraph shape preserved, or is it plain text the app formats? |
| **`CD-14`(ii)** | Does the `renders-care-at` edge carry an effective period? *(His `HD-3` ruling put affiliation history on the contact record; it did not answer what this edge type does.)* |
| **B11** (§18.B) | **Do the 2026-08-21 "nothing lints the drafted text" rulings already answer `RC-1` by implication?** See the caveat at §2 — **take this WITH `RC-1`, not after it.** |
| **B3** (§18.B) | **`HD-20-b` — did he already rule that he edits returned paragraphs only in Word, not in the app?** One capture says yes in his words; a later one lists it as unreached. **Confirm and move on — do not re-litigate it.** |
| **B4 / `RC-2`** | "Widget G" names two different acts. **Mint the provider-record requirement's ID** — the record carrying facility + individual + dates of treatment + expandable summary, sortable. He already said *"No objection"*; nothing was assigned. |
| **B10** | Three names for one object: `HD-17` retired "provider identification paragraph," but "contact block" and "provider contact block" are still live terms for the same thing. |
| **`RC-8`** | FE-18's wording — adopted in substance, **never ratified.** Re-put it in plain language. |

**Also ripe because the product now exists** (from the 2026-08-24 audit): CL2-AC-1's three link-removal edges · CL2-CHECK-1 · the template-editor UX pass (FE-§11.4) · the bill-label pre-fill.

---

## 5. HARD BOUNDARIES FOR THIS SITTING

- **`R11` STAYS GATED.** Do not compute, display, or propose a TRCP 195.2 designation deadline, and do not put the deadline question. It waits on **his** verification of 195.2 and that has not happened. **`HD-10` — whether that verification is staged as its own registry item — has never been raised and may be raised.**
- **Do not push the vendor route.** It is his: *"they obviously need to wait on that so I can figure that out."* **Its queue row's ID string is `H12-v`, NOT `HD-12-v`** — the `H`→`HD` rename is forward-going only and that row was minted before it. Search for the wrong one and you will not find the row.
- **No legal proposition is verified in this sitting.** "CPRC eighteen dot zero zero one" (`RC-4`) stays a **registry candidate, UNVERIFIED**. Automation flags; **only Michael verifies.**
- **`form-engine.md` §9's twelve paragraphs are Michael-approved verbatim.** Widget B changed what they are FOR — voice examples — not what they say. **Nothing in this sitting rewords them.**
- **Nothing enters the build queue.** Rulings are captured; a packet files them; and **only Michael says a packet is ready.**

---

## 6. CLOSE-OUT — AND THE PART THAT WILL BITE YOU IF YOU FORGET IT

**⚠ REFRESH-CHAT CANNOT BE RUN FROM VOICE AT ALL.** The claude.ai voice surface has **no file-delivery path** — there is no way to hand Michael a file from inside a voice call. **A session that says "let me write those files now" from voice is asserting a capability it does not have; that error was made and caught on 2026-08-22.**

**So: before the sitting ends, tell Michael the wrap has to happen in TYPED mode, and switch.** Then run **refresh-chat** and produce the capture pair. **Read the rulings back verbatim in-channel before switching**, so they survive even if the transcript does not.

**And the thing that makes all of it matter: A CAPTURE IS NOT A FILING.** Five design sessions ran on 2026-08-20/21, all captured, none filed, and their rulings were absent from HEAD for two days. **Only a packet through the queue files anything.** The next typed session after this one packages RC-1's rulings and ships them.

**Every capture carries the TC-8 TRANSIT line on its face. Relocate nothing** — a TC-8 collision was found 2026-08-24 and the captures hold the only copy of several items' question text.

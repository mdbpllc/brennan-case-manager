# `GL1-1` — CANDIDATE CORRECTING APPEND FOR `Go_Live_Gates.md` GATE 1

**Status:** DRAFTED, NOT APPENDED. Canonical repo path (PROPOSED):
`docs/specs/gl1-1-gate1-append-draft-2026-08-19.md`.
**Authored:** 2026-08-19 Central, design session (Cowork, Opus 5), CHAT-DISPATCH v5 task T4,
against repo state `beb27f4`.

**WHAT THIS IS.** The text `GL1-1` asks about, written out so that Michael's ruling can be a single
act — **adopt / reject / edit**. `GL1-1` is an **OPEN** row in `docs/specs/attorney-review-queue.md`:
*"Does `Go_Live_Gates.md` gate 1 take a correcting append?"*

**WHAT THIS IS NOT.** **`Go_Live_Gates.md` is append-only and design-space canonical. Nothing here
edits it, and this document does not append anything.** **WHETHER THE APPEND HAPPENS IS MICHAEL'S
RULING. WHOSE HAND EXECUTES IT IS NOT RESTRICTED** — a Code session may make the append once he has
ruled it. If he adopts it, the block below goes into the gates doc **beneath gate 1**, in the same
indented-italic shape gate 2's 2026-08-11 clarification and its 2026-08-12 GH-1 tripwire already
use — and gate 1's own text stands as written, untouched.

*(**Conformed 2026-08-20**, on Michael's finding, and the error corrected here was mine. This
passage read* "The append is **Michael's ruling and his hand.**" *— which reads as a bar on a Code
session touching the file at all. **That is false. The rule governs the FORM — append, never
rewrite — not the hand**, and the record settles it in one command: `git log -S` shows **both**
prior gate appends were made by QUEUE-RUNNER CODE SESSIONS executing Michael's rulings —* **GL-1's
go-live floor at `70df10f`** *(2026-08-11), and* **gate 10 itself was ADDED at `d6f97e6`**
*(2026-08-19). The claim was drawn from an assumption rather than from the record when the record
was one command away — the same shape as verify-before-criticizing, pointed the other way. It also
failed in the direction that is hardest to notice: an over-claim gets checked, an* **over-restriction
silently removes an option** *— here, from the one document whose whole purpose is to lay Michael's
options out.* **The RULING requirement is unchanged and is not softened by this note.** *This note is
**retraction class** — it quotes the false sentence in order to deny it, so it will keep returning on
any sweep for "his hand" and* **must not be "fixed."**)*

**SOURCE.** `docs/spec-feedback.md`, the entry *"2026-08-19 - gate 1's backup rationale is half
wrong, and one limb of it can never be settled."* **The finding is quoted from there, not
re-derived** — including its own self-correction, which is quoted because it is part of the record.

---

## The candidate text

> *Correcting append (drafted 2026-08-19 for `GL1-1`; the gate's text above stands as written —*
> *this doc is append-only). **Gate 1's stated REASON is half wrong. The decision it produced is***
> ***not disturbed.***
>
> *Gate 1 gives as its ground that "the free tier has no automatic backups and pauses after*
> *inactivity." **On 2026-08-19, before pasting gate 10's migration, Michael read his own Supabase*
> *dashboard: ELEVEN PHYSICAL BACKUPS spanning 12–19 August — a week BEFORE that day's Pro*
> *purchase — each row carrying a Restore button.** The eleven decompose exactly: eight days, one*
> *per day at ~10:30 UTC (~05:30 Central), plus two extra on 15 August and one on 19 August.*
> *Retention appears to be about seven days; had backups begun only at the upgrade there would be*
> *one or two, not eleven spanning a week.*
>
> ***One limb of this can never be settled, and it is recorded as uncloseable rather than***
> ***smoothed.** Michael is reading that Restore button **from a Pro account**. Whether it was there*
> *on 18 August **from a free account** is a different question and is now **permanently***
> ***unanswerable** — the upgrade changed the only state that could have answered it. It remains*
> *possible that Supabase retained physical backups on the free tier and exposed restore only on*
> *paid. **The distinction the finding turns on is between "the artifacts existed" and "you could*
> *have restored from them," and it is left open.***
>
> ***WHAT DOES NOT CHANGE.** Gate 1 is **bought**; **`GL-1` floor item (2) stays closed**; and*
> *Pro's other purchases — no pausing, 8 GB, whatever retention and PITR terms attach — are*
> *untouched. **It is the REASON that was wrong, not the decision.***
>
> ***AND A CONSEQUENCE FOR THE RECORD:** session log `#114` reasoned from gate 1's stated ground —*
> *"Every schema act until today ran against a database with no automatic backup … on a*
> *manual-dump-or-nothing footing. Gate 10's migration will be the first schema act with a backup*
> *behind it." **That entry stands as written (the log is append-only), and its footing sentence*
> *must not be cited forward as written.** On the dashboard reading, **gate 10's migration was the*
> ***FOURTH** live schema act with a backup artifact behind it — the three of 2026-08-19 morning*
> *(`#113`), then this one — **and the seventh ever**.*
>
> *Full finding: `docs/spec-feedback.md`, the 2026-08-19 gate-1 entry. The gate 10 migration's own*
> *run instructions carried the same claim and were corrected in place before it was pasted*
> *(`f44b3ec`; comment-only, executable lines verified identical before and after).*

---

## Notes for Michael, not part of the append

1. **The "fourth / seventh" figures are quoted, and they carry their own correction.** The source
   entry records that *"an earlier draft said 'at least the EIGHTH' and derived it from nothing:
   eight is the number of DAYS in the window, not a count of schema acts."* **The corrected figures
   are the ones above.** They are quoted, not re-derived — this session did not re-count schema
   acts, and if you want them re-derived, say so and it is its own act.
2. **The ID collision is flagged, not resolved.** `GL1-1` and `GL-1` are one hyphen apart and name
   different things — a queue row and the go-live floor. The queue already flags this as a
   near-miss and, unlike the `O-10` case, **the two strings differ**, so the project's rule is
   flag-don't-rename. **Nothing here renames anything.** The append above deliberately spells out
   *"`GL-1` floor item (2)"* in full so no reader has to disambiguate on a hyphen.
3. **If you adopt with edits, the edited text is what stands** — this draft has no status of its
   own once yours exists.
4. **If you reject**, `GL1-1` closes as *ruled — no append*, and `docs/spec-feedback.md` remains the
   only place the finding lives. **That is a real option**: the gates doc would then carry a stated
   reason known to be half wrong, which is a cost, but the finding is recorded either way and the
   doc's append-only discipline is itself a value.
5. **Whichever way it goes, the second half of the queue row still needs saying somewhere:** that
   `#114`'s footing sentence is not to be cited forward. The append above carries it. *(Corrected at
   preflight: a first draft of this note said that on rejection **"that caution has no home outside
   `spec-feedback.md`."** **That is false, and it was an inducement dressed as information.** The
   correction-entry rule provides the home — **a new session-log entry naming what it corrects, with
   the six required fields** — and that is the ruled channel for correcting a landed log entry,
   which is what `#114` is. Adopt-or-homeless was never the choice.)*
6. **A FIGURE INSIDE THE ADOPTABLE BLOCK IS QUOTED, NOT RE-DERIVED, AND THE GATES DOC CANNOT BE
   EDITED AFTERWARDS.** The **"FOURTH … and the seventh ever"** count and **"Retention appears to be
   about seven days"** both come from `spec-feedback.md` and **this session did not re-count schema
   acts.** The source already got a figure of this class wrong once — its own *"at least the
   EIGHTH."* **Three options, yours: adopt as-is; strike the two figures from the block and keep
   the eleven-backups fact, which is the load-bearing one and is a direct dashboard reading; or ask
   for the count re-derived first, which is its own act.**

# QUEUE-RUNNER precondition and allowlist audit — `mdb-pllc`, 2026-08-19

**Status: PROPOSED — read-only audit, ONE RUN, machine-specific.** It changed nothing and
authorizes nothing. **Every narrowing row below is a CANDIDATE for Michael; none was applied.**
**Canonical repo path:** `docs/specs/runner-precondition-audit-2026-08-19.md`
**Produced by:** Claude Code (Opus 5) on `mdb-pllc`, CODE-DISPATCH v4 task **C2**, 2026-08-19 Central.
Filed as its own document rather than as a section of the C1 report, per the dispatch's own
condition — C1 returned findings and they crowd it.
**Repo state:** HEAD `9e72c13`, equal to `origin/master` by live `git ls-remote`, tree clean,
`inbox/` empty.

**Scope, stated because it bounds every claim:** `.claude/settings.local.json` is **untracked and
machine-local**. This audit therefore describes **`mdb-pllc` only** and is evidence about no other
machine (MM-1). It was read at its declared path; no filesystem was swept.

---

## 1. What was read

Two declared paths, both at HEAD, nothing else:

- `.claude/settings.local.json` — 2,410 bytes, **23 allow entries** (19 `Bash`, 2 `PowerShell`, 2 `Read`).
- `docs/prompts/QUEUE-RUNNER.md` — **v11, blob `c75de00d55559276b205c4f0a811055bc42dde67`**,
  identical to the identity the seventieth and seventy-first invocations both recorded.

---

## 2. Step 0 setup preconditions — ALL FOUR SATISFIED

| # | Runner requires | State at HEAD | Verdict |
|---|---|---|---|
| 1 | `inbox/` exists at the repo root | exists; **empty** | **SATISFIED** |
| 2 | `.gitignore` contains a line `inbox/` | present, under *"Queued push-to-code packets (transient freight; never committed)"* | **SATISFIED** |
| 3 | CLAUDE.md carries the one-line `inbox/` note | present at `CLAUDE.md`:349 | **SATISFIED** |
| 4 | `.claude/settings.local.json` contains `Bash(rm -f inbox/*)` | present — entry **23 of 23**, character-for-character at the stated width | **SATISFIED** |

---

## 3. The `rm -f inbox/*` question — width against the QR-6(c) form

**These are two different objects and the audit's answer depends on not fusing them.** Step 0 item 4
governs an allowlist **pattern**; Step 4 item 5 governs the **command**, and it is the command that
QR-6(c) requires to name the file: *"BY EXPLICIT FILENAME — never the bare glob."* A pattern that
ends in `*` authorizes; it does not execute. **There is no tension between them, and reading one as
licence to run the other is the error the pairing invites.**

**Does the pattern at that width actually cover the explicit-filename command?** Yes, and the
evidence is the record rather than an assertion about how the matcher works internally: the
**seventieth invocation's entry (2026-08-19)** states in terms that setup items 1–4 were all already
satisfied, *"including `Bash(rm -f inbox/*)` in `.claude/settings.local.json`, so the Step 4.5
deletion did not prompt."* That batch ran **after** QR-6(c) was ruled, so its deletion was by
explicit filename. **The width does not need to grow.**

**One edge this audit cannot settle, named rather than papered over:** every packet on record is
`push-to-code_<slug>_<date>.zip` — no spaces, no brackets, no characters a matcher might treat
specially. Whether the entry covers a filename that carries one has **never been exercised**, and a
refusal at Step 4 item 5 would strand a close-out between the push and the delete, which QR-5 already
identifies as the expensive place to fail.

---

## 4. The one gap the audit found — and it is in the verification, not the delete

**Step 4 item 4 requires verifying that the remote ref moved**, and the project's operating rule —
confirmed positively four times — prescribes a **bare, isolated `git ls-remote origin
refs/heads/master`, with no `cd` and no `git -C` prefix**. The allowlist's three `ls-remote` entries
are:

| # | Entry | Why it does not cover the prescribed form |
|---|---|---|
| 2 | `Bash(git -C "C:/Users/Brennan/brennan-case-manager" ls-remote --heads origin)` | carries the `-C` prefix the operating rule says NOT to use; different command |
| 3 | `Bash(git -C "C:/Users/Brennan/brennan-case-manager" ls-remote origin)` | same `-C` prefix; and no trailing `*`, so it is an exact string |
| 22 | `PowerShell(git ls-remote origin refs/heads/master)` | the right command, on the wrong tool — `PowerShell`, not `Bash` |

**So the exact form used to verify BOTH of today's pushes — bare `git ls-remote origin
refs/heads/master` on Bash — matches no entry in this file.** It was served by the auto-mode
classifier, not by the allowlist. That is a fragile place for the verification step to stand, because
a verification that gets refused is the one failure that tempts a session to report a push it did not
confirm.

**CANDIDATE (an addition, not a narrowing): `Bash(git ls-remote origin refs/heads/master)`.**
It is the single change that would put Step 4 item 4's prescribed command on the same footing as its
push. **Michael's to make; nothing was written.**

---

## 5. Candidate-narrowing rows — wider than the runner needs

**Nothing here was applied.** Each row names what the extra width admits, not a hypothetical abuse.

| # | Entry | What the width admits beyond the runner's need | Candidate |
|---|---|---|---|
| 13 | `Bash(git push *)` | `git push --force`, `--delete`, any remote and any refspec. **MM-1 rules that a non-fast-forward rejection is a STOP and that force-push is NEVER permitted** — and the allowlist is the only place that could be made mechanical. Today it is not | `Bash(git push origin master)` |
| 9 | `Bash(git add *)` | `git add -A` / `git add .`, which would stage `.claude/settings.local.json` — **the file the runner's own Step 0 item 4 says not to `git add`.** See §6: on this machine that file is kept out of the index by something outside the repo | narrow to the paths the runner stages, or close the hole in §6 |
| 11 | `Bash(git config *)` | writes to global git config. **The runner never sets config**; the one historical use is the dead `echo` at entry 12 | drop |
| 20 | `Bash(npm run *)` | `npm run dev` — a dev server started from Bash, which the harness rules against. The Step 4 health check needs `build` and `lint` only | `Bash(npm run build)` + `Bash(npm run lint)` |
| 8 | `Bash(git fetch *)` | fetching an arbitrary remote; the Step 0 gate needs `origin` | `Bash(git fetch origin)` |
| 14, 21 | `Bash(git status *)`, `Bash(git rev-list *)` | read-only; no argument makes them destructive | **leave as they are** |

---

## 6. A hole worth more than the narrowing rows: what actually keeps the settings file out of the index

The runner says *"do not `git add` the file."* On this machine the file is protected — but **not by
anything in the repository.** `git check-ignore -v` resolves it to:

> `C:\Users\Brennan/.config/git/ignore:1:**/.claude/settings.local.json`

**The user's GLOBAL git ignore, outside the repo.** The repo's own `.gitignore` does not cover it:
its `*.local` line matches files ending `.local`, not `.local.json`. **So the protection is
machine-local and does not travel** — on a second machine, under MM-1, `Bash(git add *)` plus a
`git add -A` would stage a permissions file. **CANDIDATE: add `.claude/settings.local.json` to the
repo `.gitignore`**, which makes the protection travel with the repo instead of with one machine.
*(That is a tracked-file edit and is Michael's call; nothing was changed.)*

---

## 7. Ten of the twenty-three entries are dead

They authorize nothing reachable. Mostly clutter — with **one exception that is not**.

- **1** — pinned to commit `01b1488`.
- **4, 7** — pinned to `push-to-code_form-engine-poc_2026-08-06.zip`, long processed; `inbox/` is
  empty at HEAD. **Entry 7 is the exception: it is the only `unzip` entry with no `-d` target, so
  the command it authorizes would extract a packet into the REPO ROOT.** Worth removing on that
  ground rather than as tidying.
- **5, 6** — pinned to the scratchpad of session `d79cbee4-…`.
- **12** — an `echo` wrapping command substitution over `git config`; a one-time diagnostic.
- **15, 16, 17, 18** — pinned to the scratchpad of session `3cc4fbf8-…` and to the two 2026-08-09/10
  packets, likewise processed and deleted.

**Not asserted:** whether those scratchpad directories still exist on disk. It does not change the
conclusion, and no filesystem was swept to find out.

---

## 8. The classifier note — current as of 2026-08-19, and it is not an allowlist fact

**`Bash(git push *)` has been in the allow list throughout every refusal on record.** The allowlist
governs permission; the auto-mode classifier decides separately, and it has refused an allowlisted
push repeatedly. What today's session adds, from its own two pushes:

- **The compound/isolated distinction is the operative variable, not the shell.** Both of today's
  pushes were **refused as compound calls** (chained with `tail`, `echo`, `ls-remote`, `fetch`,
  `rev-list`, and prefixed with `cd`) and **succeeded bare on the first try** — same shell, same
  machine, same allowlist, minutes apart. `20d1a0f..82be555` and `82be555..9e72c13`.
- **After a refusal, compound READ-ONLY calls are refused too.** A chained
  `ls-remote` + `rev-parse` + `status` call was refused; bare `git ls-remote origin
  refs/heads/master` served immediately afterward.
- **A `cd` or `git -C <path>` prefix appears to count as compounding**, which is why §4's gap
  matters: the two Bash `ls-remote` entries are written in exactly the prefixed form the operating
  rule tells a session not to use.
- **No refusal is on record for** `Bash(rm -f inbox/*)`, `Bash(npm test *)`, `Bash(git add *)` or
  `Bash(git commit *)`.

**The near-harm this session, recorded because it is the second instance of it:** a checkpoint
reporting the push as blocked was already being drafted before the bare form was tried. **A compound
refusal is evidence about the call, not about the repo** — reporting one as a blocked push is a false
statement about the state of the record.

---

## 9. One structural observation

The file has **an `allow` array and nothing else** — no `deny`, no `ask`. Every bar in this setup is
therefore the classifier's, decided per call and demonstrably not stable across invocations. That is
worth knowing before treating any allowlist narrowing as a control: **narrowing removes standing
permission, it does not add a prohibition.**

---

## 10. What this document is not

- **Not a change.** `.claude/settings.local.json` was read and not written. No candidate was applied.
- **Not portable.** The file is untracked and machine-local; every finding is about `mdb-pllc`.
- **Not a security review.** The go-live gates still require a professional one before real data.

---

## 11. ADDENDUM — appended 2026-08-19 (Central) by Michael's ruling; nothing above is edited

**Two of the acts this audit proposed were APPLIED.** Everything above stands as the state it
described — an audit that says "nothing was applied" and is then acted on does not get rewritten;
this section is the only place its §5 and §10 are superseded.

**His ruling: add the allowlist entry and narrow `git push`.** Applied to
`.claude/settings.local.json` by two minimal text edits, the rest of the file byte-identical,
**entries 23 → 24**, result re-parsed as JSON and the delta asserted before the write:

| Act | Before | After | Section |
|---|---|---|---|
| **ADDED** | *(no Bash entry matched the prescribed verification command)* | `Bash(git ls-remote origin refs/heads/master)` | §4 |
| **NARROWED** | `Bash(git push *)` | `Bash(git push origin master)` | §5 row 13 |

**The narrowing is the one with teeth: `--force` and `--delete` no longer carry standing
permission**, which is what §5 said MM-1 deserved and had nowhere mechanical to live. Note §9's
limit still applies — **narrowing removes standing permission; it does not add a prohibition.**

**NOT applied, and still Michael's:** the remaining **four** narrowing candidates (`git add`,
`git config`, `npm run`, `git fetch`), the **ten dead entries** including entry 7's `unzip` with
no `-d` target, and the repo-`.gitignore` line for `.claude/settings.local.json` (§6).
*(Count correction: §5's table has six rows but one of them — `git status` / `git rev-list` —
says leave as they are, so the narrowing candidates were **five**, not the six this audit's
session-log entry and checkpoint both said. One applied, four remain.)*

**The file remains untracked, machine-local, and was NOT `git add`ed** — `git status --porcelain`
is empty of it, and the runner's own Step 0 item 4 forbids staging it. **This addendum, not the
file, is the record.** The narrowed push's first live exercise is the push of the commit carrying
this addendum; **that result is reported to Michael in the session report and cannot be asserted
here, because this file is committed before the push happens.**

---

## 12. SECOND ADDENDUM — appended 2026-08-19 (Central) by Michael's ruling; nothing above is edited

**§6's candidate is APPLIED: `.claude/settings.local.json` is now ignored by the REPO'S OWN
`.gitignore`.** §6 called it "a tracked-file edit and is Michael's call"; he made it.

**The pattern is narrow by necessity, and the reason is worth keeping:** `.claude/` is **not** an
ignorable directory here — **`.claude/commands/queue-runner.md` and `.claude/launch.json` are
TRACKED**. A blanket `.claude/` would have been wrong. The stanza ignores the one file and carries a
comment saying why.

**Verified three ways, not asserted:**

1. **`git check-ignore -v` now resolves to `.gitignore:21`** — the repo's own rule, taking
   precedence over the global `C:\Users\Brennan/.config/git/ignore` that had been the only thing
   holding it. **§6's finding is closed: the protection now travels with the repository**, so it
   holds on a second machine under MM-1 instead of on this one only.
2. **The two tracked files are unaffected** — `git check-ignore` returns nothing for either, and
   both are still listed by `git ls-files .claude/`.
3. **The hazard was TESTED rather than reasoned about: `git add -A --dry-run` stages `.gitignore`
   and NOTHING ELSE.** That is the exact command §5 row 9 named as the danger under
   `Bash(git add *)`, and it can no longer reach the permissions file.

**Still not applied and still Michael's:** the **four** remaining narrowing candidates
(`git add`, `git config`, `npm run`, `git fetch`) and the **ten dead entries**, entry 7's
unzip-with-no-target among them. *(Of the three act-classes this audit proposed, two are now fully
done — the addition and the `.gitignore` line — and the narrowing class stands at one of five.)*

**Two line-ending facts from applying this, both measured by raw byte read, because this batch has
now been bitten once already:** `.gitignore` is **CRLF** (37 CR / 37 LF after the edit) and the
stanza was written in that convention, unchanged. And **THIS file's worktree copy is CRLF while its
committed blob is LF** — `git checkout --` under `core.autocrlf=true` re-materialised it in CRLF
when an earlier draft of this section had to be discarded. **git reports no diff between them**, so
it is cosmetic — but a convention detected BEFORE a restore is not valid after one, and any editor
that matches multi-line blocks has to re-detect.

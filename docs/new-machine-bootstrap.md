# New-Machine Bootstrap — brennan-case-manager (Windows)

Status: operational checklist, verified live on second machine 2026-08-06; canonical at docs/new-machine-bootstrap.md.

Provisions any new Windows machine for two-workspace work. Verified end-to-end on the second laptop (Claude Code v2.1.224). ~15 minutes. Use a NORMAL PowerShell window throughout — never "Run as Administrator" (it strands you in system32, its PATH may differ from your normal account's, and nothing here needs elevation).

## 1. Design side — no install
Sign into claude.ai in the browser (or Claude Desktop). Projects, project knowledge, memory, and connectors are account-level and appear automatically.

## 2. Git for Windows
https://git-scm.com/downloads/win — accept defaults. Supplies Git Bash (required: Claude Code's Bash tool, which the document-surgery pipeline depends on) and Git Credential Manager (browser sign-in to GitHub on first contact, remembered after).

## 3. Claude Code (native installer)
```powershell
irm https://claude.ai/install.ps1 | iex
```
Close and reopen PowerShell (PATH changes only reach new windows), then verify: `claude --version`. Diagnostics: `claude doctor`.

## 4. Clone the repo
```powershell
cd $env:USERPROFILE
git clone https://github.com/mdbpllc/brennan-case-manager.git
```
The clone IS the file system — never hand-create project folders. CLAUDE.md rides along and auto-loads in sessions launched from the repo root.

## 4a. Set git identity, and delete any user-level runner copy
```powershell
git config --global user.name "Michael Brennan"
git config --global user.email "michael@brennanstx.com"
```
#33's first commit on the second machine failed on this; the verification session never hit it because it never committed.

Then delete any user-level runner copy at `%USERPROFILE%\.claude\commands\queue-runner.md` — it can shadow the repo pointer and feed stale runner text (MM-1(3), 2026-08-08). The repo-tracked pointer is all any machine needs.

## 5. Recreate inbox/ (the one manual folder)
```powershell
mkdir brennan-case-manager\inbox
```
It is gitignored, so clones arrive without it.

## 6. Authenticate and verify
```powershell
cd brennan-case-manager
claude
```
Trust prompt: the workspace shown must be the repo path (if it shows anything else — especially a system directory — Esc, cd to the repo, relaunch). Sign in with the firm claude.ai account (usage pool is shared across all machines on the account).

Verification ask for the first session: confirm CLAUDE.md loaded automatically; state branch (must be master) and working directory (must be the repo root); confirm inbox/ is visible. Pass = the machine is interchangeable with every other provisioned machine.

## Cross-machine rules (permanent)
- **inbox/ never syncs.** A packet zip exists only on the machine it was saved to; run queue sessions where the zips are, and check other machines' inboxes before assuming the queue is empty.
- **Pull at session start; verified push at session end.** A machine is only as current as its last pull.
- **One runner at a time.** Queue-runner sessions never run simultaneously on two machines; a non-fast-forward push rejection stops the session to reconcile — never force-push.
- **Packets name their machine.** An inbox-bound zip's destination states which machine runs it; check the other machine's inbox before assuming the queue is empty (rule restated from above, now load-bearing under concurrent use).
- **Local vs. cloud sessions:** sessions launched from the desktop/web apps may run in a remote container on an auto-created branch (`claude/new-session-*`) with no access to your local inbox/. Queue sessions must be local (terminal, repo root, master). A cloud session's report of "inbox/ doesn't exist" means the CONTAINER lacks it, not your machine.
- **Per-machine state:** tool-permission approvals and local Claude Code settings do not sync; expect first-run prompts on each new machine. Blanket-approve read-only commands if desired; keep write operations (push, delete, file edits) on per-command approval.
- **Real client files stay outside the repo tree** on every machine. **No credentials on disk** — keys live in their designated secrets (e.g., Supabase), never in local files.

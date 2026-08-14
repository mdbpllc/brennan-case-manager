# Outlook push — edit/cancel propagation exercise, 2026-08-13

**Status: EXERCISE RECORD + one CANDIDATE defect. No code was changed and no fix was applied.**
The fix is proposed for Michael's ruling, not chosen here.

**What this closes:** the calendar push has carried "creation only — edit/cancel unverified" since
2026-07-26 (`BUILD-STATE.md`). Edit and cancel propagation are now **exercised end-to-end against
live Graph** and the status line is updated to what was observed.

**Conditions.** Michael's hand on every click, in his own browser (the in-app browser pane could not
be clicked into, and MSAL tokens are per-browser, so the exercise ran entirely in his session
against the same dev server on `:5173`). **Demo mode — localStorage, fictional seed data only.** No
real matter, no real client data, no real hearing. `.env` supplied by Michael and installed at the
repo root; it is gitignored (`.gitignore:19`) and was not committed. Michael reported each
observation; the observations below are his, not inferred from the code.

---

## 1. What was exercised, and what propagated

| # | Action | Result in Outlook (MDBP Cases) | Verdict |
|---|---|---|---|
| 1 | **Connect** → queued backlog drained | App reported *"Connected. Pushed 2 queued events."* | **CREATE ✓** (re-confirms 2026-07-26) |
| 2 | **Edit 1** — status conference, 9:00 AM → 2:00 PM **and** location changed | **Both copies present.** The 9:00 AM entry stayed; a new 2:00 PM entry appeared | **DEFECT — see §2** |
| 3 | **Edit 2** — same event, 2:00 PM → 3:00 PM | **The same entry moved** to 3:00 PM. No new copy | **EDIT ✓ — `PATCH` works** |
| 4 | **Cancel** — the 3:00 PM entry | **Removed immediately** from the calendar | **CANCEL ✓ — `DELETE` works** |
| 5 | **Control** — "Discovery responses due — Allied Freight RFP set 1", untouched since the connect push, first edit (date + title) | **Duplicated the same way.** Original remained on the original date; new entry created with the new date and name | **DEFECT REPRODUCED — systematic** |

**Cancel's scope, stated precisely:** step 4 deleted the copy the app tracks. The orphaned 9:00 AM
entry from step 2 **survived**, which is correct behavior given the defect rather than a second
defect — the app no longer holds that Outlook id, so nothing addresses it.

## 2. CANDIDATE — the first edit of any connect-pushed event duplicates it in Outlook

**Severity: this one matters before the calendar carries real settings.** Every event pushed by the
connect / "Sync now" path is orphaned by its first edit. A reconnect with a queued backlog strands
one stale copy **per event**, and those orphans are **permanent** — the app cannot cancel or update
what it no longer has an id for, so they can only be deleted by hand in Outlook. On a real docket
that means a stale hearing time sitting in the calendar next to the correct one, with nothing in the
app indicating it exists.

**Reproduction (clean, from the exercise's own control case):**

1. Demo mode, Outlook configured, **disconnected**. Create or seed a calendar event — it shows
   *"Queued for Outlook."*
2. Click **Connect Outlook** and sign in. The queue drains; the app reports the pushed count. The
   event now exists in MDBP Cases.
3. **Edit that event for the first time** — change the date, time, or title — and save.
4. **Observe:** the original Outlook entry remains at its old values **and** a second entry appears
   with the new values.
5. **Edit the same event again.** This time it patches cleanly — the entry moves, no third copy.

Steps 3–5 are the whole finding: **the first edit after a connect-time push duplicates; every
subsequent edit is correct.** Reproduced on two independent events (§1 rows 2 and 5).

**Mechanism: UNDETERMINED — deliberately not asserted.** Every layer was read at HEAD and each
looks correct in isolation: the connect handler (`CalendarTab.tsx:34`) awaits `syncAllPending` then
refreshes; the edit form (`:208`) passes the **returned** record into `syncEvent`, not the stale
React one; `localAdapter.updateEvent` (`:847`) merges the patch, so `outlookEventId` survives an
edit; and `syncEvent` persists the id after every push. **Static reading does not explain the
observed behavior, so no cause is claimed.** Two hypotheses survive, and they produce *identical*
user-visible symptoms:

- **H1 — the id from the connect-time push never persists.** The first edit then sees no
  `outlookEventId`, skips `PATCH`, and `POST`s a new event (`graph.ts:124–136`).
- **H2 — the id persists but Graph rejects the `PATCH` against it.** `graphFetch` turns any 404
  into `GraphNotFoundError`, which `pushToOutlook` swallows and falls through to the same `POST`.
  That fallback exists for "deleted directly in Outlook"; here it would be firing on a live event.

**The two pieces of evidence that would settle it, neither captured this session:**

1. **The Graph calls on a first edit**, from the browser's Network tab filtered to `graph`:
   `POST 201` **alone** points at H1; `PATCH 404` **followed by** `POST 201` points at H2.
2. **The Outlook column badge immediately after connect, before any edit.** Still
   *"Queued for Outlook"* → H1 (the sync write did not stick, since `syncStatus` and
   `outlookEventId` are written together at `sync.ts:32`). *"✓ In Outlook"* → H2.

**No fix proposed.** H1 and H2 need different fixes in different files, and choosing between them
without evidence is the guess this project treats as its own defect class. **The next session on
this should capture item 1 first** — it is one edit with the Network tab open.

## 3. Housekeeping

- **Test-data orphans are sitting in MDBP Cases right now** — the 9:00 AM status conference and the
  original "Discovery responses due" entry. Both are fictional demo data. **They will not clear
  themselves; delete them by hand in Outlook** when convenient.
- The dev server on `:5173` was left running for the exercise.
- `.env` remains installed at the repo root, gitignored. It carries the Entra **client** and
  **tenant** ids only — no secret, which is correct for the SPA/PKCE flow.

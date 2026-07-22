# Build Session Notes — 2026-07-21

Findings from a hands-on review session: running the app, clicking through it,
and reading the full codebase. Written for Michael in plain English.

## 1. How the codebase is structured

The app is a **React + TypeScript single-page app** built with Vite. Think of it
as four layers, top to bottom:

**Pages (what you see)** — `src/pages/`. One file per screen:

- `CaseListPage.tsx` — the Cases list with search, practice-area/type filters,
  and a "show closed" toggle.
- `NewCasePage.tsx` — the new-case form. Practice area drives the case-type
  dropdown; PI shows the stackable overlay flags; Criminal shows representation
  type; Motor vehicle collision shows the commercial-policy checkbox. The file
  number is assigned automatically on save.
- `CaseDetailPage.tsx` — one case, with two tabs: **Overview** (view/edit the
  case fields) and **Parties** (link/unlink parties with a role and side).
- `PartiesPage.tsx`, `PartyDetailPage.tsx`, `PartyFormPage.tsx` — the party
  list, a party's detail view (including its cross-case history), and the
  create/edit form. When you click "+ New party" from inside a case, the new
  party is automatically linked back to that case.

`src/App.tsx` is the shell: the sidebar, the two nav items, the demo-mode
banner, and the URL routing that decides which page shows.

**Domain (the vocabulary)** — `src/domain/`. No UI here, just definitions:

- `types.ts` — what a Case, a Party, and a Case↔Party link look like.
- `caseTypes.ts` — the settled lists: practice areas → case types, PI overlay
  flags, and the per-practice-area status ladders.
- `partyRegistry.ts` — the heart of the Parties feature. Every party type
  (client, adjuster, attorney, court, judge, provider, …19 in all) is defined
  here as a list of fields. **The forms and detail views render themselves from
  these definitions** — adding a party type or a field is a config edit in this
  one file, not a UI rewrite.

**Components** — `src/components/fieldWidgets.tsx`. Generic input and display
widgets that turn a field definition from the registry into an actual form
control: text, date, dropdown, checkbox, repeating groups ("+ Add prior MVC"),
and party-links (a dropdown of other party records, e.g. an adjuster's employer
insurance company).

**Data (how it's stored)** — `src/data/`. This is the adapter pattern:

- `adapter.ts` defines a single interface (`DataAdapter`) with all the
  operations the UI is allowed to do: list/get/create/update cases, same for
  parties, and create/delete case-party links.
- `localAdapter.ts` implements it against **browser localStorage**, seeded from
  `seed.ts` (fictional demo data: the Garcia trucking case, the Boyd DWI, the
  Servpro lien).
- `supabaseAdapter.ts` implements the same interface against **Supabase
  (Postgres)**, translating between the app's camelCase records and the
  database's snake_case columns. File numbers come from the database function
  `next_file_number()` so they stay gapless with multiple users.
- `index.ts` picks one at startup: if `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` are set in `.env`, you get Supabase; otherwise
  localStorage demo mode. The sidebar banner tells you which mode you're in.

**How data flows:** a page calls `db.something()` → `index.ts` has already
decided which adapter `db` is → the adapter reads/writes localStorage or
Postgres → the page gets plain typed records back and renders them. **No page
knows or cares which backend is live** — that's the whole point of the pattern,
and it's cleanly done: every UI file imports only `db` from `src/data`, never
Supabase or localStorage directly.

`db/schema.sql` is the Postgres side of the contract: three tables (`cases`,
`parties`, `case_parties`), the file-number function, auto-updating timestamps,
and row-level security switched on.

## 2. What works well

- The adapter seam is genuinely clean — nothing in the UI would change when
  moving from demo mode to the real database.
- The party registry delivers on "enter once, link everywhere": one party
  record, roles layered per case, cross-case history visible from the party
  page (the seeded adjuster Dana Pruitt appearing on two files demonstrates it).
- The registry-driven forms mean the 19 party types cost almost no UI code.
- Sensible touches: sensitive-field masking (SSN shows only last 4 in views),
  per-practice-area status ladders, the January-reset file-number scheme
  mirrored identically in both adapters.

## 3. App test drive

_Setup notes: this machine had no Node.js at all — v0.1 had never been run
here. Node.js LTS 24.18.0 was installed (approved this session), `npm install`
completed with 0 vulnerabilities, and the app ran clean on the Vite dev server.
**No screenshots could be captured** — the browser preview pane was never
displayed on screen during this unattended session, so the page never rendered
frames to capture. Everything below was driven and verified through the
browser's accessibility tree instead, with findings described in text._

What was exercised, all in localStorage demo mode:

- Seeded data loaded: 3 cases, 12 parties, demo-mode banner showing.
- **Created a test case** (`26-0004 — TEST — Rivera v. Lone Star Hauling LLC`,
  PI / MVC, trucking + UM/UIM flags, commercial policy). File number
  auto-assigned correctly, status started at the first rung of the PI ladder,
  flags displayed as badges on the case header and list.
- **Linked an existing party** (seeded adjuster Dana Pruitt, "Adjuster on
  claim", Opposing) and **created a new client from inside the case**
  (Sofia Rivera TEST) — the auto-link-back-to-case flow worked, including a
  repeating-group entry (a prior MVC), which saved and displayed correctly.
- **Cross-case history delivers**: Dana Pruitt's party page lists all three
  of her files with role/side/status, and her employer field resolves to a
  clickable link to Statewide Mutual Insurance.
- **Overview edit round-trip works**: changed status and corrected a date;
  both persisted.
- Search and filters work (case-insensitive caption/file-number search).
- Browser console: no errors or warnings the entire session.

Things that looked off or confusing during the click-through:

- **BUG — "Date opened" defaults to tomorrow's date in the evening.** The
  new-case form showed 2026-07-22 on the evening of 2026-07-21, and the value
  went into the saved record. Cause: `new Date().toISOString().slice(0, 10)`
  in `NewCasePage.tsx` uses UTC, and Texas evenings are already past UTC
  midnight. Needs a local-date helper. (Correction on review: the file-number
  year in `localAdapter.ts`/`seed.ts` uses `getFullYear()`, which is local —
  no bug there. The server-side `next_file_number()` in `db/schema.sql` does
  use server time, so the January counter reset follows the database's
  timezone — a New-Year's-Eve nuance to settle when Supabase mode goes live.)
- **Label bugs on repeating-group add buttons** (naive singularization in
  `fieldWidgets.tsx` strips a trailing "s"): "+ Add prior **injurie**",
  "+ Add prior medical providers **seen**", and the unwieldy "+ Add prior
  criminal history (structured — eligibility engine)". Cosmetic, but on the
  most important form in the app (client intake).
- **After creating a party from a case's Parties tab, you land back on the
  case's Overview tab** — you have to click Parties again to see the party
  you just added. The tab choice isn't in the URL, so it can't be restored on
  navigation; making tabs URL-driven (e.g. `/cases/:id/parties`) fixes this
  and makes tabs bookmarkable.
- ~~Pressing Enter in a form field doesn't submit the new-party form~~ —
  withdrawn on retest: could not be reproduced reliably, and the code does
  nothing to suppress the browser's native Enter-submits-form behavior (the
  form has a real submit button, no key handlers). Almost certainly an
  artifact of the automated test harness, not the app. Worth a 5-second
  manual check next time Michael has the app open.
- **List rows aren't real links** — cases and parties lists navigate via a
  row click handler, so middle-click/ctrl-click to open in a new tab doesn't
  work and keyboard navigation can't reach rows. The party name inside a
  case's Parties tab IS a real link, which makes the inconsistency visible.
- **The "Not yet filled in" footer on a party detail page is a wall of text**
  for a sparse record — a new client shows ~20 field names in one run-on line.
  Fine for a dense record, noisy for a fresh one.
- Test-drive leftovers: the demo store in this machine's browser now contains
  case 26-0004 and party "Sofia Rivera TEST" (clearly marked TEST; localStorage
  only, wiped by clearing site data — nothing was committed anywhere).

## 4. Gaps and rough edges spotted in the code

Ordered by how much they matter, most important first.

1. **Supabase mode almost certainly can't work yet (auth gap).** The schema's
   row-level-security policies grant access only to the `authenticated` role,
   but the app connects with the **anon key and has no login screen** — so
   every query in Supabase mode should be rejected by Postgres. Demo mode is
   unaffected. Before the Supabase path is real, the app needs a sign-in flow
   (Supabase Auth) or the policies need rethinking. This matches the schema's
   own comment that the current policies are a single-user placeholder — but
   as written, the "central database" mode is wired up yet unusable.
2. **A case's classification is frozen at creation.** The Overview tab's Edit
   form covers caption, status, dates, court, cause number, and notes — but
   there is **no way to change practice area, case type, PI overlay flags,
   commercial-policy, or representation type** after a case is created. Flags
   especially feel like things you'd add mid-case as facts develop (e.g.
   discovering a commercial policy, or that the client is a Medicare
   beneficiary).
3. **"Show closed" filter only knows the literal status `Closed`.** A PI case
   in "Settled — pre-disbursement" is arguably resolved but always shows; more
   importantly, if a status ladder ever renames Closed, the filter silently
   breaks. Minor today, worth a `isClosed` concept later.
4. **Probate companion gets the wrong status ladder.** `statusesFor()` gives
   every PI case type the litigation ladder (treatment → demand → suit). A
   probate companion file doesn't follow that arc. Same class of issue:
   Expunction/nondisclosure get their own relief ladder, but the function
   picks it by hard-coded case-type names — a typo in one list would silently
   fall through to the criminal ladder.
5. **No delete anywhere (cases or parties).** Probably intentional for a legal
   system (files close, they don't vanish), but a test case created by mistake
   lives forever in the list. Worth an explicit decision: archive/void status,
   or admin-only delete.
6. **Party edit can't change party type**, by design (the hint says so) — but
   if a "Person (witness)" later becomes a client, the workaround (re-enter
   them as a new party) splits their history across two records. The intake
   funnel field on Person hints this promotion path is expected; the mechanism
   doesn't exist yet.
7. **Small performance smell:** the case Parties tab and party detail page
   fetch linked records one at a time in a loop (fine at this scale, will
   crawl on the real database over the network once cases have many parties).
   A `getParties(ids)` bulk method on the adapter fixes it when it matters.
8. **localStorage data has no version/migration story.** `localAdapter.load()`
   trusts whatever JSON is in the browser. When v0.2 changes a record shape,
   stale demo data from v0.1 could render oddly instead of reseeding. A tiny
   schema-version number in the store would let it reseed cleanly.
9. **Supabase `updateParty` silently ignores everything except displayName and
   fields** — consistent with what the UI sends today, but a future caller
   patching another property would see it vanish only in Supabase mode
   (the local adapter applies any patch). Worth aligning the two.
10. Housekeeping: no tests and no CI at all yet (expected at this stage —
    `npm run lint` and `tsc -b` via the build are the only checks).
    (Correction on review: the README is already app-specific and good — an
    earlier draft of these notes wrongly called it template boilerplate.)

No broken imports and no TODO/FIXME markers anywhere — the codebase is small,
consistent, and compiles clean.

## 5. Suggested next steps (for discussion, not started)

- Fix the UTC "date opened" bug — it's a one-line local-date helper and it
  affects real records every evening.
- Decide the Supabase auth approach before any real central-database use
  (single shared login via Supabase Auth would unblock it with the current
  policies).
- Add "edit classification" (flags at minimum) to the case Overview tab.
- Fold the label/tab/link polish items from §3 and items 3, 4, and 8 from §4
  into the next slice's cleanup as small fixes.

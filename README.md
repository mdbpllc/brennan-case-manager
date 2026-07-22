# Brennan Law — Case Manager (Vertical Slice v0.1)

The first working piece of the case management suite: **Cases + Parties, end-to-end.**
Everything follows the settled design in the project instructions — lean case records,
YY-NNNN auto file numbers, parties entered once and linked to many cases, roles layered
on top of party identity, and cross-case history on every party.

**Demo data is fictional.** It loads automatically the first time you run the app so
there's something to click on.

---

## Getting it running (one-time setup, ~10 minutes)

1. **Install Node.js** (the engine that runs the app):
   go to <https://nodejs.org>, download the **LTS** version for Windows, and run the
   installer with all defaults.

2. **Unzip this folder** somewhere convenient, e.g. `Documents\brennan-case-manager`.

3. **Open a terminal in that folder:** open the folder in File Explorer, click the
   address bar, type `cmd`, and press Enter.

4. **Install the app's dependencies** (first time only):

       npm install

5. **Start the app:**

       npm run dev

   Then open the address it prints (usually <http://localhost:5173>) in your browser.
   Leave the terminal window open while you use the app; press `Ctrl+C` in it to stop.

That's it. In this mode ("Demo mode" in the sidebar), everything you enter is saved in
your browser on this machine — real enough to evaluate, not yet the shared central
database.

## What to try

- **Cases** → open *Garcia v. Allied Freight Lines* → **Parties** tab: parties with
  roles and sides, linked not retyped.
- Click **Statewide Mutual** or **Dana Pruitt** from there → **cross-case history**:
  the same adjuster appears on the Servpro lien file too. This is the party-once,
  link-everywhere principle working.
- **+ New case** → pick a practice area and watch case types, flags, and
  representation-type fields adapt; the file number is assigned automatically.
- **+ New party** → pick a type (all party types from the design are in) and watch the
  form rebuild itself from the field registry — including repeating entries like prior
  collisions or board certifications.

## Connecting the real central database (later, optional now)

When you're ready to move off demo mode onto the live shared database:

1. Create a free project at <https://supabase.com>.
2. In Supabase: **SQL Editor** → paste the contents of `db/schema.sql` → Run.
3. In this folder, copy `.env.example` to `.env` and fill in the two values from
   Supabase's **Settings → API** page (Project URL and anon public key).
4. Restart `npm run dev`. The sidebar will read "Connected: central database."

**Known gap:** the schema's row-level-security policies only admit signed-in
(`authenticated`) users, and the app has no sign-in screen yet — so Supabase mode
will connect but every query will be refused until an auth flow is added. Tracked
in `docs/spec-feedback.md`.

Do **not** put real client data in until we've done the security pass (auth sign-in,
policies, and the professional security review from the project instructions §15).

## For future build sessions (technical map)

- `src/domain/` — the data model: `types.ts` (case/party/link), `caseTypes.ts`
  (practice areas → case types, per-type status lists), `partyRegistry.ts`
  (**config-driven field definitions for every party type** — add a field here and the
  forms/detail views pick it up automatically).
- `src/data/` — storage behind one `DataAdapter` interface: `localAdapter.ts`
  (browser localStorage + seed, default) and `supabaseAdapter.ts` (real DB, activates
  when `.env` is set). UI code never touches storage directly.
- `src/pages/` — Cases list/new/detail (Overview + Parties tabs), Parties
  directory/detail/form.
- `db/schema.sql` — Postgres schema incl. server-side gapless `YY-NNNN` file-number
  generation and RLS placeholders.
- `docs/specs/` — read-only snapshots of the canonical specs from the design space
  (see `CLAUDE.md` for the rules); `docs/specs/session-log.md` is the running
  session-to-session log.
- Next slices per the build sequence: remaining tabs (Medical, Insurance, Liens, …),
  the deadline engine, playbook surfacing, transcript layer, then Graph integrations.

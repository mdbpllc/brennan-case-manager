# PROMPT — WAVE 0(a): DEPLOY `statute-fetch` AND `legiscan-poller` — a Code session Michael runs, PRESENT, with his own Supabase sign-in

**Status:** RULING-class (`CAP-2`) — a prompt in force once filed. **Canonical repo path:** `docs/prompts/PROMPT-wave0a-edge-function-deploy-session.md`. Drafted 2026-09-18 (Central, DT-1) by an Opus 5 design session in Cowork running CHAT-DISPATCH v6, Task 1, first from synced retrieval (the checkout was not yet connected) and then **RE-VERIFIED OVER THE DEVICE BRIDGE AT HEAD `4940ed3`** (a live `git ls-remote` read `4940ed3` at ~17:45 CDT) once Michael connected the checkout: the ruling sheet's Item 10 and §5 limb (a), the `#154` entry's words, `O-3`'s row, both functions' source, the absence of `supabase/config.toml`, and the absence of any other `docs/prompts/` file naming Wave 0(a). Every fact below that came from the record is re-verified again by the session that runs this prompt, at its own HEAD, before it acts (Step 1). Nothing in this file is a ruling. The authorization is `#154`'s and is quoted at Step 0. PF-1 did not fire on the packet that carried it: there is no legal characterization and no registry entry.

**What this is.** This is the kickoff prompt for the one Wave 0 act that is neither Michael's hand alone nor a design act. It deploys the two written-and-undeployed Edge Functions per `docs/statute-cache-setup.md`, invokes the poller **once by hand**, and reads its log **before any cron**. BUILD-STATE records it as *"the proving step for the Supabase scheduled path"* that *"answers `F-14` and `O-11` with evidence."* It is a **POINTER, not a spec copy** (the QR-2 principle): where this prompt and the documents it names disagree at HEAD, the documents win and this prompt gets a correction.

**Michael — how to start it.** Be at the laptop (`mdb-pllc`) for the whole session. Open a fresh Claude Code session in the checkout (Opus by default per the standing model routing; check `/usage` first and state the reading). Then say: "run docs/prompts/PROMPT-wave0a-edge-function-deploy-session.md". **Never start this remotely or from the phone.** The session needs your Supabase sign-in in a browser, your answers at five forks, and your eyes on a dashboard log. A remotely driven Code session cannot answer a permission prompt (see the operational note in the project instructions).

**Sequencing.** This session is independent of the firm-obligations migration, which is WRITTEN AND NOT RUN; it does not touch that migration, read it, or run it. It writes no migration. It changes no file under `src/`, `db/` or `supabase/`. The only repo writes it makes are the close-out trio.

---

You are running **WAVE 0(a) — THE EDGE-FUNCTION DEPLOY SESSION** for brennan-case-manager. Michael is at the keyboard throughout. **Every fork below is put to him through the answer widget and waits for his words. Every live read is pasted by his hand and answered in words.** You never hold a secret, you never print one, and you never guess a live fact.

## Step 0 — Checkout gate (the QR-3 pattern), the MM-1 bar, and the two gates

1. `git fetch origin`. Then confirm the following: **clean tracked tree, on `master`, HEAD == origin.** Verify with a command that could disconfirm it (`QR-6(a)`): `git ls-remote origin refs/heads/master` compared with `git rev-parse HEAD`, never the local tracking ref alone. If the checkout is behind but clean, fast-forward and continue. **If it is dirty, diverged, off-master, or AHEAD of origin, STOP and tell Michael.** Three untracked paths are known and are his: `Claude outputs/`, `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md`. **Do nothing to them.**
2. **`inbox/`:** if any packet zip is present, **STOP.** The queue runs first (`MM-1`), and this session never doubles as the queue runner. No other Code session may be running on any machine.
3. **Gate 1: the authorization, quoted.** Read and quote into your entry's header box:
   - `docs/specs/api-integrations-ruling-sheet-2026-09-09.md`, **"Item 10 — DECISION 4: Wave 0 acts — RULED, FOUR AUTHORIZED"**: *"Picks by label: **"(a) Deploy the two functions"**, …"*. Also quote that file's §5, limb (a): *"A separate Code session with Michael's Supabase sign-in — NOT a queue-runner act (it touches the live project; QR-6(e)). It is the proving step for the Supabase scheduled path and answers `F-14` and `O-11` with evidence."*
   - The `#154` entry in `docs/record/session-log.md`: *"(a) Deploy `statute-fetch` and `legiscan-poller` per `docs/statute-cache-setup.md`, invoke the poller once by hand and read its JSON log before trusting cron — a SEPARATE Code session with Michael's Supabase sign-in, NOT a runner act."*
   - **If you cannot find these words at HEAD, STOP.**
4. **Gate 2: not yet run.** BUILD-STATE's "Known stubs & fakes" bullet on the two functions must still read *"DEPLOYMENT AUTHORIZED 2026-09-09 (`#154`, Wave 0 (a)) AND NOT YET RUN."* No session-log entry above `#154` may record a deploy of either function. **If either check fails, STOP and tell Michael what you found.**

## Step 1 — Read at HEAD, in this order, before any command touches the live project

1. `docs/statute-cache-setup.md`, whole.
2. `supabase/functions/statute-fetch/index.ts` and `supabase/functions/legiscan-poller/index.ts`, whole. **Confirm or refute each of these by reading them. They are the premises of every fork below:**
   - (a) The poller's handler ignores its `Request` and requires no secret of its caller (`F-14`, Grok 2026-08-18).
   - (b) The poller builds its client from `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
   - (c) The poller puts `LEGISCAN_API_KEY` into the LegiScan request's query string.
   - (d) `statute-fetch` answers any origin (`Access-Control-Allow-Origin: *`, `F-29`) and takes no secret.
   - (e) *Read at HEAD `4940ed3` when this prompt was drafted, and re-checked by you:* the poller's handler is written `Deno.serve(async () => {` — it takes no argument at all; its first two acts are LegiScan calls (`getSessionList`, `getMasterListRaw`) and its FIRST database act is a SELECT on `tracked_bills`, so a privilege failure costs two LegiScan queries and surfaces in the response body's `log` array (the handler returns `{ ok: false, polledAt, log }` with HTTP 502). There is NO `supabase/config.toml`, so no per-function `verify_jwt` setting exists in the repo and the CLI's default applies.
3. `docs/specs/statute-text-and-bill-tracking-design.md` §5 (cadence) and §7 (service architecture).
4. `docs/specs/Go_Live_Gates.md`: gate 4, "Supabase account facts", and "LegiScan API facts" (the single-key rule; the rotation plan of record, `M-4`).
5. `docs/specs/BUILD-STATE.md`, whole. In particular read the "Known stubs & fakes" bullet: `service_role` DML is INDICATED, NOT MEASURED; Diagnostic 6 is staged and UNRUN; `F-14` is LATENT and rides `O-3`.
6. `docs/spec-feedback.md`: the 2026-08-19 section on `anon` and `service_role` privileges (its eight diagnostics, especially item 6), and the 2026-07-28 consequence 3 (*"The two undeployed edge functions probably share this root cause."*).
7. `docs/specs/attorney-review-queue.md`: rows `O-3`, `O-11`, `O-12`. `O-3`'s words bind this session's shape: *"Fold F-14 (cron-secret requirement on `legiscan-poller`; service-role client must sit behind a non-public secret), F-29 (statute-fetch CORS posture), and Grok Uncertain #4 (`verify_jwt` state) into the edge-function deploy work order so the deploy session starts from the full hypothesis set."* **This prompt is that work order.** The hypotheses are carried at Steps 4–7.
8. `docs/specs/grok-external-review-2026-08-18.md`: `F-14`, `F-29`, "Uncertain", and the §W annotation.
9. `CLAUDE.md`: its binding conventions govern this session.

Record every premise re-verified, with any delta from this prompt, in your entry.

## Step 2 — Tooling, checked and never assumed

- `supabase --version`. If the CLI is absent, use `npx supabase@latest <command>` (the CLI's own getting-started page, fetched 2026-09-18, states a Node.js 20+ requirement for `npx`). **Never `npm install supabase --save-dev`**, because that edits the tracked `package.json` and `package-lock.json`. A global install (Scoop) is Michael's choice, made by his hand.
- `docker --version`. If Docker is absent, every deploy below carries `--use-api`. The CLI reference, fetched 2026-09-18, describes that flag as *"Bundle functions server-side without using Docker."*
- `supabase login`. This is **Michael's browser and Michael's account** (the Supabase account facts: *"Account created 2026-07-25 via GitHub login (mdbpllc identity)"*). The access token is never printed, pasted or logged.
- **Do NOT run `supabase link`.** It writes local project state into the checkout. Pass `--project-ref <ref>` on every command instead. Michael supplies the ref from his dashboard; it is an identifier, not a secret.

## Step 3 — Two read-only live reads, pasted by Michael in the dashboard SQL editor and answered in words

Put each query to him. He pastes it alone and tells you the answer in words. **Neither query writes anything.**

**READ 1: the precondition.** The setup doc says *"Run the updated `db/schema.sql` against the project first."* Do the seven tables the two functions touch exist live?

```sql
select to_regclass('public.statute_chapters')                 as statute_chapters,
       to_regclass('public.statute_sections')                 as statute_sections,
       to_regclass('public.registry_verification_snapshots')  as reg_ver_snapshots,
       to_regclass('public.watch_flags')                      as watch_flags,
       to_regclass('public.watch_targets')                    as watch_targets,
       to_regclass('public.tracked_bills')                    as tracked_bills,
       to_regclass('public.bill_statute_refs')                as bill_statute_refs;
```
**EXPECT seven non-null values.** If any value is null, **STOP.** Creating a table is a migration, and nothing here authorizes one.

**READ 2: Diagnostic 6** (`docs/spec-feedback.md`, the 2026-08-19 section, item 6: *"Does `service_role` really lack DML — only `anon` was tested with `has_table_privilege`; the `service_role` claim rests on the weaker `information_schema` listing."*). The query text below is drafted by this prompt. The file names the question without giving the query.

```sql
select has_table_privilege('service_role','public.tracked_bills','select')     as tb_sel,
       has_table_privilege('service_role','public.tracked_bills','insert')     as tb_ins,
       has_table_privilege('service_role','public.tracked_bills','update')     as tb_upd,
       has_table_privilege('service_role','public.bill_statute_refs','insert') as bsr_ins,
       has_table_privilege('service_role','public.watch_targets','select')     as wt_sel;
```
**PREDICTION, on BUILD-STATE's INDICATED evidence: all FALSE, which means the poller will fail on PRIVILEGE the first time it writes.** Record the answer before any deploy. The prediction then becomes a reading, and Step 7's outcome is interpreted against it.

*Optional, at his word only:* the same 2026-08-19 section stages diagnostics 4 (DDL event triggers), 5 (`anon`'s schema USAGE) and 7 (the live function inventory). Their query texts are in that file. They are `O-11`'s inputs, read-only, and cheap. Offer them once and do not press.

## Step 4 — Deploy `statute-fetch` (FORK W0A-1, put first)

Put `W0A-1` (below) to him using the setup doc's own words: *"`--no-verify-jwt` is optional; the app sends the anon key either way. Leaving JWT verification ON is fine and slightly tighter."* Also carry `F-29` from the record: the function is an open wildcard-CORS proxy whose risk is *"hammering the .gov host, not disclosure."*

Then run, **naming the function every time:**
```
supabase functions deploy statute-fetch --project-ref <ref> [--use-api] [--no-verify-jwt only if he picked OFF]
```
⚠ **`supabase functions deploy` with no function name deploys EVERY function in `supabase/functions/`, including `disclosures-writer`, the stub that nothing authorizes deploying.** Always name the function. Never pass `--prune`.

**Exercise it the way the app uses it:** Michael runs the app in Supabase mode (`npm run dev`, signed in), opens the Statutes pages, and loads ONE chapter that is not among the five demo fixtures. He reports the result in words: loaded, or the error text. With JWT verification ON, a bare `curl` that carries a non-JWT key is expected to be refused, so the app is the honest test.

## Step 5 — The poller: FORK W0A-2, put BEFORE any deploy

**Deploying the poller makes `F-14` LIVE.** BUILD-STATE calls it *"LATENT, NOT A GL-1 BLOCKER — undeployed code has no endpoint."* The moment `legiscan-poller` deploys, it has one. If Step 1's premise (a) held, anyone holding a valid project JWT can trigger a full poll with JWT verification ON; with it OFF, anyone who reaches the URL can. **Wave 0(a) authorizes a deploy, not a code change.** `F-14`'s fix (require a non-public secret of the caller) is not authorized by any words quoted at Step 0.

Put `W0A-2` (below) through the widget, with the options as a way of asking, and take his answer whatever shape it has (CC-1(a)).

## Step 6 — Deploy `legiscan-poller` (only on his `W0A-2` answer), and the secret by NAME ONLY

```
supabase functions deploy legiscan-poller --project-ref <ref> [--use-api]
```
Then run `supabase secrets list --project-ref <ref>` and confirm ONLY that a secret **named** `LEGISCAN_API_KEY` is listed. Report the name and nothing else from that output. **The CLI reference page, fetched 2026-09-18, does not state what else the command prints.** Treat every other column as not for the chat. **The key's value is never echoed, printed, logged, pasted, set, re-set or copied (gate 4).** Do not run `secrets set`: the key has existed since 2026-07-25, and rotation is `M-4`, Michael's hand on legiscan.com (the single-key rule: *"creating a second Public key gets ALL keys revoked"*). **If the name is absent, STOP.**

## Step 7 — Invoke ONCE by hand, and read the log BEFORE any cron

Follow the setup doc's own words: *"First deploy: invoke it once manually from the dashboard and read its JSON log before trusting the cron."* Michael invokes it from the dashboard (Edge Functions → `legiscan-poller`) and reads its log there. **He reports what the log says in words. If any log line shows a URL or a string containing `key=`, he does not paste it.** That line is itself a gate-4 exposure: record it as such, and rotation (`M-4`) becomes his act.

**What each outcome means. This is said to him BEFORE he clicks.**

| Outcome in the log | What it means | What happens next |
|---|---|---|
| **Permission denied on a table** (`42501`, "permission denied for table …") | **The PREDICTED outcome** if READ 2 was all FALSE. `service_role` lacks DML, and bypassing RLS does not bypass table privileges. This is the evidence `F-14` and `O-11` were waiting for. | **STOP. Grant nothing.** A `GRANT` to `service_role` (or any `REVOKE`, or `ALTER DEFAULT PRIVILEGES`) is **not authorized by Wave 0(a)**. It goes back to Michael as `O-11`'s ruling (and `O-12`'s; C-2 as restated 2026-08-19). Record the error text, without anything key-shaped. |
| **Rows written** to `tracked_bills` | The poller works end to end. If READ 2 said FALSE, READ 2 and the run disagree. **Record both and do not reconcile them by guessing.** | Record the row count, read by a `select count(*)` Michael pastes, plus the LegiScan queries spent (the Public tier allows 30,000 a month). Then go to Step 8. |
| **A LegiScan error** (a non-OK status, or HTTP 4xx) | A key or quota problem on LegiScan's side. | Record the status by name. Nothing is re-set. `M-4` is his. |
| **A Supabase client or auth error** (an invalid key or JWT) | This carries the hypothesis in the note below this table. | Record the error. Put it to him. No key change is authorized here. |
| **Timeout, or anything else** | Unknown. | Record it verbatim, minus anything key-shaped. Do not retry blind. Retry once only on his word. |

*Hypothesis carried from the vendor's pages (fetched 2026-09-18, a summary read, NOT quoted as law):* Supabase's API-keys page says the legacy `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` *"still exist in the runtime, but they carry the legacy keys."* The poller uses the legacy name. Whether the project's legacy keys are enabled is Michael's dashboard fact, read by his hand: Project Settings → API Keys.

## Step 8 — Cron: only on his word, only after a clean manual run (FORK W0A-4)

No schedule is created before a clean Step 7 **and** his answer to `W0A-4`. The setup doc's interim cadence is monthly, `0 6 1 * *`; design §5 tightens it to weekly at prefiling (Nov 2026) and twice a week during the 2027 session. **The setup doc's scheduling path ("dashboard → Edge Functions → legiscan-poller → add a cron trigger") predates the vendor's current page.** Supabase's "Scheduling Edge Functions" page (fetched 2026-09-18) describes `pg_cron` + `pg_net`, with the request's key held in Supabase Vault. Its API-keys page says *"Set `verify_jwt = false` for a function called with a secret key rather than a user's token."* **Read on those pages, a scheduled poller therefore touches `F-14` again**, whichever way JWT verification is set. Put `W0A-4` whole before any SQL: enabling `pg_cron`/`pg_net` if they are off, creating the job, and storing a key in Vault. Storing a key in Vault is a new credential arrangement, which reads as project-instructions **trigger 5**. Say so to him.

## Step 9 — Close-out (the trio), and the health skip recorded

1. **Prepend a session-log entry at the TOP of `docs/record/session-log.md`. It is UNNUMBERED (`TOC-6`: Code sessions never mint `#nn`).** In the house form, it records:
   - STEP 0's evidence, and the two gates quoted.
   - Every premise re-verified, with its deltas.
   - The tooling found.
   - READ 1 and READ 2 in his words.
   - Each fork, with his pick verbatim.
   - What was deployed, with which flags, and at what time (Central, DT-1).
   - The invocation's outcome in words.
   - Cron: created or not, and why.
   - WHAT WAS NOT DONE, each item with the rule that bars it.
   - **The health trio:** this session changes no code, so record the skip explicitly and name the reason (the `QR-6(f)` pattern). If Michael asks for it, run it and report it.
2. **Rewrite `docs/specs/BUILD-STATE.md` in full** as a CODE refresh under BS-1a (150 non-blank lines) AND `CAP-4` (100,000 bytes by `wc -c`, measured on the working tree AFTER your last edit). Displace passages verbatim into your entry under `DISPLACED FROM BUILD-STATE (CAP-4)` and name any shortfall in the banner. Preserve the anti-resurrection-ledger pointer. **Recompute every count from the files at HEAD** (`OPEN-5(a)`). Rewrite the Known-stubs bullet on the two functions from what was **measured**, and keep INDICATED and MEASURED apart exactly as the bullet does today.
3. **Push, then VERIFY** with a bare `git ls-remote origin refs/heads/master`. The entry asserts **no post-commit action** (`QR-5(a)`). Tell Michael in one line: **"Pushed at `<sha>` — click Sync now on the repo in the Claude project,"** or "Committed at `<sha>`, NOT pushed — push by hand." An allowlist entry is necessary, not sufficient; the auto-mode classifier has refused a bare push before.
4. If anything needs the design side, add a new dated section to `docs/spec-feedback.md`.
5. **Do NOT regenerate `docs/record/session-log-toc.md` or write to `docs/specs/session-log-head.md`.** The next batch's census detects the unindexed entry by design.

## DO NOT (the traps a deploy session is most likely to fall into)

- **Never run `supabase functions deploy` without a function name, and never with `--prune`.** `disclosures-writer` is not deployed by anything here.
- **Never run `supabase db push`, `db reset`, `migration up`, or any command that writes the live schema.** No migration runs here; the firm-obligations migration is not touched.
- **No `GRANT`, `REVOKE` or `ALTER DEFAULT PRIVILEGES`**, and no Vault secret, before `W0A-4` is answered. `O-11` and `O-12` are his.
- **No edit to any file under `supabase/`, `src/` or `db/`.** `F-14`'s fix is not authorized. Neither is a `config.toml`.
- **No secret value anywhere.** That covers the LegiScan key, the service-role key, the access token and any Vault value: not in the terminal scrollback you quote, not in the entry, not in a commit. **Names only.**
- **No `supabase link`; no `npm install` into the tracked manifests.**
- **No cron before a clean manual run AND his word.**
- **No `#nn`, no queue row, no ID** beyond this prompt's packet-local `W0A-` labels, which the runner carries as labels. **Not the queue runner.**
- **Nothing remote.** If Michael has to step away, stop at the next fork and say where you stopped.

## The five forks, in full text (put one at a time, through the widget)

- **W0A-1: JWT verification on `statute-fetch`.** Leave it ON (the setup doc: *"fine and slightly tighter"*) or deploy with `--no-verify-jwt`? The app calls the function as a signed-in user either way. `F-29` (the open CORS proxy) is unchanged by either choice. *Recommendation, stated once: ON.*
- **W0A-2: `F-14` and the poller.** Deploying the poller creates the endpoint `F-14` describes. Options, as a way of asking:
  - (A) Deploy with JWT verification ON, invoke once by hand, and create **no cron** until `F-14`'s fix is separately authorized.
  - (B) Hold the poller. Deploy `statute-fetch` only.
  - (C) Authorize `F-14`'s fix first, as its own act in another session, then run this step.
  - (D) Your own composite.
  - *Recommendation, stated once: (A).* It produces the evidence `F-14` and `O-11` are waiting for. There is no real client data anywhere, and the tables it writes hold public legislative data. The exposure, in the window before a fix, is the LegiScan budget.
- **W0A-3: if the poller fails on PRIVILEGE,** do you want it carried to `O-11` as evidence and left there (recommended: nothing is granted tonight), or something else?
- **W0A-4: cadence and mechanism.** Monthly (`0 6 1 * *`) now and weekly from prefiling (Nov 2026), per design §5, or another cadence? Mechanism: `pg_cron` + `pg_net` with the key in Vault, per the vendor's current page. That means enabling extensions if they are off, and a new credential arrangement (trigger 5). Or no schedule until `F-14` is fixed and a manual poll is run by your hand monthly?
- **W0A-5: the optional diagnostics.** Run diagnostics 4, 5 and 7 (read-only) in the same sitting, or leave them for `O-11`'s own session?

*End of prompt. Generated 2026-09-18 (Central) by the CHAT-DISPATCH v6 chain (Opus 5, Cowork). Nothing here is a ruling, a build authorization beyond `#154`'s quoted words, or a verification.*

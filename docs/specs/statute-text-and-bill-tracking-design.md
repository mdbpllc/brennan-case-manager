# Statute Text & Legislative Tracking — Design Pass

**Date:** 2026-07-25. **Status:** DESIGN-COMPLETE pending Michael's review of the decision list (§9). **Canonical repo path:** `docs/specs/statute-text-and-bill-tracking-design.md` — current as of the 2026-07-26 forward-merge from the project-knowledge copy, which is now historical (archive project). **Feeds:** the Legal Rule Registry (system-wide core infrastructure per the 2026-07-22 decision), citation-currency alerts (banked feature #13), the legislative-watch list already noted in the billing synthesis (SB 30 successors), and the 2025 law-change ledger in `pi-case-playbooks.md`.

**Architecture decision this doc records:** two sources, cleanly split by what each is authoritative for. **statutes.capitol.texas.gov** (Texas Legislative Council's official codification — public domain, no TOS, no key, predictable URLs) is the sole source for *current statute text*. **LegiScan API** (registered key, free Public tier, data licensed CC BY 4.0) is the sole source for *pending-legislation tracking*. Neither source is scraped outside its sanctioned interface: the .gov site is fetched politely at its documented URL patterns; LegiScan is accessed only via the API — never by crawling legiscan.com (TOS §3.3).

---

## 1. What problem this solves

The registry discipline (CLAUDE.md, binding) says every legal proposition any module relies on is a registry entry with a cite and a verification status, and that computed outputs stamp the registry versions they relied on. Two gaps remain:

1. **The cite has no text behind it.** Verifying or consulting a registry entry means leaving the app to look up the statute. Playbooks, the deadline engine, and the eligibility engine all cite statutes with no click-through to current language.
2. **Nothing watches for change.** The registry has watch-flags but no feed to raise them. The verification list already knows this is needed ("failed SB 30's §18.001 overhaul is already on the legislative-watch list — check for re-filed successors") but the check is manual and memory-dependent.

Module A closes gap 1. Module B closes gap 2. Together they give the registry a "text at your fingertips + tell me when the ground moves" loop — while **never** touching verification status, which remains attorney-only (registry rule 2).

## 2. Source facts (grounding)

**statutes.capitol.texas.gov:**
- Chapter files at `https://statutes.capitol.texas.gov/docs/{CD}/{fmt}/{CD}.{ch}.{ext}` where CD is the two-letter code (FA, PE, CR, CP, GV, …), fmt/ext ∈ {htm, pdf, Word/doc}; sections addressable by anchor (`FA.153.htm#153.002`). Table-of-contents links via `?link={CD}`.
- Content is the current codification; it changes on legislative effective dates — overwhelmingly Sept. 1 of odd years, some Jan. 1 and some immediate-effect. Between those dates it is static. Next expected change wave: late 2027 (barring specials).
- Public domain state work: no key, no quota, no attribution duty. Courtesy still applies: cache aggressively, fetch sequentially, honor robots.txt, identify a UA.

**LegiScan API (v1.9x):**
- Operations relevant here: `getSessionList` (TX sessions incl. specials), `getMasterListRaw` (change-hash list for a session — the cheap poll), `getBill` (detail incl. history, sponsors, texts, status), `getBillText`, `getSearch`/`getSearchRaw` (full-text search, state-filtered, relevance-scored, 50/2,000 results per page), `getDatasetList`/`getDataset` (weekly full-session ZIP snapshots), and optional `setMonitor`/`getMonitorList` (GAITS server-side monitor lists).
- Public tier: free registered key, 30,000 queries/month, commercial use permitted, data CC BY 4.0 (attribution required). Over-frequent polling burns quota on cached responses, so cadence discipline (§5) matters for politeness more than for the cap — our volumes are tiny.

## 3. Module A — Statute text (source: .gov)

**Posture: cache-on-demand, not a bulk mirror.** A full mirror is ~all 30-odd codes we don't practice under, refreshed for no reason. Instead: first request for a chapter fetches and caches it; every later request serves the cache; the whole cache is invalidated/refreshed by the biennial refresh job (§5). A "prefetch these codes" action warms the cache for the firm's working set (FA, PE, CR, CP, GV, HS, IN, PR, ES) in one sitting if Michael wants offline completeness.

**A1 — Cite parser/resolver (pure TypeScript, unit-testable).** `"Tex. Fam. Code § 153.002"`, `"Family Code 153.002"`, `"CCP art. 55A.053"`, `"CPRC §18.001"` → `{code: 'FA', chapter: '153', section: '153.002', url, anchor}`. Handles the CCP's article numbering and Vernon's civil statutes as special cases. This component is useful everywhere immediately (playbooks, registry, documents) even before any caching exists.

**A2 — Fetch + cache.** Browser can't fetch the .gov site directly (CORS), so fetching runs server-side — a small Supabase Edge Function (`/statute-fetch`) in live mode. *Implementation note (observed 2026-07-25):* deep links like `/Docs/FA/htm/FA.153.htm` served the site homepage to a non-browser fetcher while working normally in browsers — the server appears to redirect some non-browser requests. T2 must verify fetch behavior from the edge function early (correct headers/UA, follow-redirect handling) and treat "got the homepage instead of a chapter" as a detectable failure mode (sanity-check that the response contains the requested chapter number), not silent success. *(Build-time supersession: the redirect behavior is explained by the .gov site's rebuild as an SPA — server-side fetch must target `tcss.legis.texas.gov/resources/`; see the 2026-07-25 SPA entry in `docs/spec-feedback.md`.)* Demo mode ships a fixture set of real chapters for the seed codes (statute text is public domain — committing it violates no data-hygiene rule; it is not client data). Cache record stores the raw HTML, extracted per-section text, `fetched_at`, and a **content hash per section**. *(Addition 2026-07-25:)* hashes are computed over **NORMALIZED extracted text** (whitespace collapsed, markup artifacts stripped), not raw HTML, so a .gov template change doesn't trip every cached hash at once.

**A3 — Statute viewer.** In-app pane: chapter view with section anchors, copy-cite button, "open at source" link. Every registry entry, playbook cite, and eligibility-engine readout deep-links into it.

**A4 — The hash tripwire (registry integration).** When Michael verifies a registry entry, the entry stores the **section content hash as of verification**. On every cache refresh, changed hashes automatically raise the `text-changed-since-verified` watch flag on any registry entry citing that section. This converts the biennial refresh into an automatic re-verification worklist — no one has to remember which of the ~40 registry entries the 90th Legislature touched. (Flag only; status stays verified-but-flagged until Michael acts. Registry rules 1–2 untouched.) *(Addition 2026-07-25:)* refresh must also detect **MISSING sections** — if a section cited by a registry entry no longer exists in the refreshed chapter (repeal or renumbering, e.g. the CCP art. 55A recodification), raise a distinct **`section-removed`** watch flag, more urgent than `text-changed-since-verified`; a chapter that failed to refresh proves nothing and raises nothing.

## 4. Module B — Pending-bill tracking (source: LegiScan API)

**Watch list = derived, not hand-built.** The set of things worth watching already exists in the registry: every entry's statute cite (plus the explicit legislative-watch items like §18.001-overhaul successors). Module B compiles the registry's cites into watch targets automatically; Michael can add free-text targets ("court costs", "expunction") on top.

**B1 — Poller.** During TX sessions: `getMasterListRaw` on the active session per cadence (§5), diff change-hashes, `getBill` only on changed bills already in our tracked set. Discovery of *new* relevant bills: periodic `getSearchRaw` per watch target (Texas drafting conventions make statutes findable in bill text — "Section 153.002, Family Code" / "Article 55A.053, Code of Criminal Procedure" are literal strings in every amending bill). Between sessions: monthly low-rate poll of prefiled/interim activity. Budget math: even a paranoid session-time cadence lands around 2–3k queries/month against the 30k cap.

**B2 — Matcher.** Parse fetched bill texts for statute-reference patterns; resolve through the A1 cite parser; join against registry cites. Same philosophy as transcript routing and contact dedup: **weighted suggestion, never auto-commit.** A matched bill raises a `pending-bill` watch flag on the affected registry entries with the bill number, status, and matched sections — advisory only. No model-generated "this bill would change the rule to X" ever enters the registry as fact ([CONFIRM] discipline; registry rule 2).

**B3 — Lifecycle.** Tracked bill states follow LegiScan status (introduced → engrossed → enrolled → passed/vetoed). On **passage**, the flag hardens: affected entries get `enacted-change-pending` with the effective date; on that date they join the re-verification worklist alongside the hash-tripwire items from A4. Dead bills (session sine die) auto-clear their flags with a log line.

**B4 — Attribution + TOS hygiene (HARD REQUIREMENTS, per LegiScan Crash Course + survey answers on file).** Tracking views carry a "Legislative data: LegiScan (CC BY 4.0)" footer. API key lives in app secrets/env (`LEGISCAN_API_KEY`), never committed. No redistribution of the LegiScan feed outside the app (TOS §3.5); no crawling of legiscan.com (suspension trigger); **never create a second Public API key** (suspension trigger — one key for the org, used everywhere); **always compare `dataset_hash` before any dataset download** (skipping this is an explicit suspension trigger); compare `change_hash` before spending `getBill` queries; fetch each document blob (`doc_id`) at most once, cache forever; check `"status"` on every response; respect the per-operation frequency guidelines (manual p.7). The key was issued 2026-07-24 against survey answers describing exactly this design (hash-driven, cache-first, TX-only, internal use) — the implementation must match what was represented.

## 5. Cadence

| Period | Module A (.gov) | Module B (LegiScan) |
|---|---|---|
| Interim (now → Dec 2026) | Cache-on-demand only | Monthly poll; search sweep on watch targets |
| Prefiling (Nov 2026 → Jan 2027) | — | Weekly |
| 90th Regular Session (Jan–Jun 2027) | — | 2×/week masterlist diff; weekly search sweep |
| Post-session (Jun–Sep 2027) | — | Weekly (governor action, effective dates) |
| Effective-date waves (Sept 1 / Jan 1) | **Full cache refresh** → hash tripwire → re-verification worklist | Flags harden per B3 |
| Special sessions | — | Auto-detected via getSessionList; session cadence applies |

## 6. Data model additions (schema + both adapters)

- **`statute_cache`** — id, code, chapter, source_url, html, fetched_at, codification_note.
- **`statute_sections`** — cache_id, section_number, text, content_hash. (Registry entries reference sections, not chapters.)
- **`registry_verification_snapshots`** — registry_entry_id, section_ref, content_hash_at_verification, verified_at. (A4.)
- **`watch_targets`** — id, kind (registry-derived / manual), cite_or_query, active.
- **`tracked_bills`** — id, legiscan_bill_id, session_id, bill_number, title, status, change_hash, last_polled, raw_json.
- **`bill_statute_refs`** — tracked_bill_id, code, section, match_confidence, matched_text_excerpt.
- **`watch_flags`** — registry_entry_id, kind (pending-bill / enacted-change-pending / text-changed-since-verified / section-removed), source_ref, raised_at, cleared_at, cleared_by.

All behind `DataAdapter`, working identically in localStorage demo mode (fixture statutes, fictional demo bills) and Supabase.

## 7. Service architecture

Both fetchers are **Supabase Edge Functions on cron** in live mode (statute-fetch proxy + legiscan-poller); no dependency on the GPU box — this is lightweight text I/O, not PHI/AI processing, so the local-first PHI posture doesn't apply. Demo mode: fixtures plus a manual "import poll results" action, mirroring the transcript-pipeline pattern. All raw LegiScan JSON is kept (`raw_json`) so matcher improvements can re-run over history without re-spending queries.

**Interim workflow until built:** nothing blocks today's practice — Claude sessions fetch statute text live from the .gov site when drafting (already the norm), and the legislative-watch list stays a project-doc checklist. First session-time value lands with T3 before prefiling opens in Nov 2026.

## 8. Legal Rule Registry touchpoints (binding rules respected)

This layer is *infrastructure for* the registry, so the discipline bears repeating: watch flags and worklists are advisory; **no flag, poll result, or parsed bill ever changes a rule's verified status or hard-codes a legal outcome** (rules 1–2); model-parsed "what this bill does" is never verification; computed outputs continue stamping registry versions (rule 3), and A4's snapshots make that stamp meaningful by pinning the text the verification actually saw.

## 9. Decisions and open items

**Defaults set this pass (Michael can veto any):**
- **D1 — Cache-on-demand, no bulk mirror** (with optional working-set prefetch). Full mirror is available later if offline completeness ever matters.
- **D2 — Search-based bill discovery** over GAITS `setMonitor` lists (keeps state in our DB, one less external mutable store); `setMonitor` revisitable if search sweeps prove noisy.
- **D3 — Real statute text ships as demo fixtures** (public domain; consistent with data-hygiene rules, which bar client data, not public law).
- **D4 — Both fetchers as Supabase Edge Functions**, not the GPU-box service (no PHI ⇒ no local-first requirement).

**Banked (wanted-later, per Michael 2026-07-25):**
- **W1 — Source-credit → legislative-history links.** The T1 cite parser additionally parses the source-credit act chains at the end of each statute section ("Acts 2023, 88th Leg., ch. …") so the statute viewer offers one-click links from any section to its amending bills: TLO for 1989-forward (bill texts/histories), LegiScan API for ~2009-forward (versions, votes, datasets), LRL for pre-1989 intent material (bill files 1913–2005, journals, committee recordings, session laws to 1871). Research-workflow support, not a module — no polling, no storage beyond parsed act references. Build after T1–T4; the act-chain grammar can ship inside T1's parser if it comes cheap.

**Open items — ALL RESOLVED 2026-07-25 (Michael):**
- **O1 — DONE.** LegiScan key issued 2026-07-24, live-validated 2026-07-25, stored in Supabase secret `LEGISCAN_API_KEY` (digest-verified). Details + confirmed TX session IDs: `docs/specs/Go_Live_Gates.md`; the real getSessionList fixture lives in **claude.ai project knowledge** (filename `claude_Fixture_LegiScan_getSessionList_TX_2026-07-25.json`) and is **NOT in the repo** — it has no repo path (cite corrected 2026-07-26; the `claude_` prefix is a project-knowledge filename convention, not a directory).
- **O2 — DECIDED: core 9.** Working set = FA, PE, CR, CP, GV, HS, IN, PR, ES. Everything else cache-on-demand. *(Repo-side record: the working set was later extended to +TX, LG, TN per CLAUDE.md / the T1 build.)*
- **O3 — DECIDED: registry screen + dashboard card** whenever unresolved watch flags exist.
- **O4 — DECIDED: seed all three topic groups** in addition to registry cites: (a) expunction/nondisclosure terms (CCP 55A, Gov't Code 411 Subch. E-1 topic searches, robust to renumbering overhauls); (b) hospital-lien/billing terms (Prop. Code Ch. 55, Ch. 146 balance billing, price transparency); (c) court costs/fees restructuring. Plus the pre-existing §18.001-overhaul successor watch.

## 10. Build plan (vertical slices)

- **T1 — Cite parser/resolver** (pure TS + tests; includes enumerating the live code-abbreviation list from the .gov site as a fixture — the table in §2 is from memory and gets verified here). Immediately wires "open statute" links into existing registry/playbook screens via direct .gov URLs, before any caching exists.
- **T2 — Statute cache + viewer + hash snapshots** (schema §6, edge function, fixture demo mode, A4 tripwire).
- **T3 — LegiScan poller + matcher + watch flags** (gated on O1 key; demo mode with fictional bills first, so the UI and matcher tests don't wait on the key).
- **T4 — Re-verification worklist** (unifies A4 + B3 outputs into the registry screen; O3 decides extra surfacing).

T1 is buildable now with zero dependencies. Sequencing against the standing queue (OAA criminal-intake slice, transcript T1/T2) stays Michael's call.

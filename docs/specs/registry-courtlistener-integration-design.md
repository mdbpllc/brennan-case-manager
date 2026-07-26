# Legal Rule Registry — CourtListener / Free Law Project Integration (Design Addition)

Status: DESIGN ADDITION drafted 2026-07-24 in the design space. Staged for Code: commit under `docs/specs/` and reference from the registry section of the master spec. Nothing here is built yet; nothing here changes the verification discipline.

## 0. Principle (unchanged, restated because it governs everything below)

CourtListener provides a **citation graph and retrieval layer, not a citator**. It reports *that* something cited a watched authority, never *how* (no overruled/distinguished/questioned editorial layer). Therefore: **automation flags; only Michael verifies.** No API result, alert, or MCP query ever changes a registry entry's verified status, and no computed output may treat a flag as a legal conclusion.

## 0.1 Majority-opinion rule (BINDING, ruled 2026-07-26 after a live near-miss)

A CourtListener citation lookup (`analyze_citations`) returns a CLUSTER id. A cluster routinely contains several sub-opinions (majority, concurrence, dissent), and the cluster id collides with one sub-opinion id — which is **NOT reliably the majority**. Feeding the cluster id straight to `read_document` returned Justice Lehrmann's DISSENT in Haygood, not the Court's opinion; characterizing the holding from that text would have reported the dissent's reasoning as the holding. Verified as systematic, not a fluke, across both clusters checked:

- Haygood cluster `2829381` → sub-opinions `9810727`, `9810728`, `2829381`; the cluster id resolves to the dissent. Majority is `9810727` (Justice Hecht).
- Cash America cluster `1576064` → sub-opinions `9857637`, `9857638`, `1576064`; same collision.

The rule: **never read or characterize an opinion from a cluster id alone** — enumerate `sub_opinions` first; identify the majority positively, by opinion-type marker and authoring language ("delivered the opinion of the Court"), never by position, id proximity, or assumption; state which sub-opinion was read whenever an opinion is characterized, and say so explicitly when separate opinions exist. A holding attributed to the wrong sub-opinion is the same class of error as an unverified proposition: a flag, never a verification. (The two example id sets above are evidence for the rule, not configuration.) Also folded into CLAUDE.md's registry discipline as rule 5.

## 1. What FLP provides (verified against live pages 2026-07-24)

- **REST API v4** (base `https://www.courtlistener.com/api/rest/v4/`): search (keyword + semantic), opinions, clusters, dockets; **citation graph** via `opinions-cited` (forward + backward citations); **citation lookup/verification API** (existence validation — anti-hallucination). API moves fast (v4.4 current; v4.5 removed some text-filter lookups) — build against live docs, not cached field lists. Free token via CourtListener account.
- **Alerts**: saved-search alerts with email or **webhook** delivery. Daily opinion search alerts are **unlimited on the free tier**; real-time opinion alerts require membership (unnecessary for our use — a one-day lag on citation-currency is immaterial).
- **MCP connector** (promoted through their AI-connector promotion): lets Claude (chat sessions and Claude Code) query CourtListener live in-session.
- Coverage: all Texas appellate courts + Fifth Circuit + SCOTUS, ongoing scrape from court websites. Caveats: memorandum-opinion coverage good but not guaranteed complete; no Lexis/Westlaw parallel cites (memo opinions live under docket number / WL where available) [RE-CHECK against a Texas memorandum opinion — Haygood returned S.W.3d, Tex. LEXIS, AND WL parallel citations live 2026-07-26, so this caveat may hold only for memorandum opinions].
- Membership: https://free.law/membership/ (canonical reference). Individual Tier 1 $10/mo or $100/yr; membership tiers give elevated API access. Documented FREE-tier API ceilings (corrected 2026-07-26 against live docs; the §1 figures previously here were stale): **5/min, 50/hr, 125/day on a ROLLING window — the hourly cap binds in practice, not the daily.** **Promo through 2026-08-06 doubles free- and member-tier API rates; spec all polling budgets against STANDARD Tier 1 limits so nothing breaks at promo lapse.** Footnote eligibility expressly includes small law firms. Contacts: info@free.law (general), memberships@free.law, GitHub issues (technical).

## 2. Architecture — three layers

**Layer A — Alerts (free, push, zero API budget).** One saved-search alert per watched authority (e.g., `cites:(356 S.W.3d 390)` or CourtListener's citing-opinion query form — confirm exact syntax against live docs at build time), webhook delivery preferred, email fallback. New citing opinion → registry entry gets `review_flag = citation_activity` with the citing case's metadata attached. This is the citation-currency mechanism (banked feature #13 / watch-flag tier) with no poller and no quota cost.

**Layer B — API (pull, budgeted).** Two call patterns only:
1. **Cite validation at entry drafting** — every citation proposed for a registry entry passes through the citation-lookup API before the entry is saved. Result stored as `cite_validated: {date, opinion_id | NOT_FOUND}`. NOT_FOUND blocks save with an override-with-reason (some real cites — very recent memo opinions — may legitimately be absent; the override is itself a flag).
2. **Flag investigation** — when Layer A fires, on demand (not automatically), pull the citing opinion's metadata/text via the API for Michael's review session.
Budget check (measured live 2026-07-26; the earlier "fits standard Tier 1 (300/day) with wide margin" claim was stale): batching (citations verify up to 250/call, document reads up to 10 chunks/call, snippet searches up to 10 documents/call) plus 24h read caching makes real capacity better than the raw ceiling suggests — a full careful read of one correctly-identified opinion ≈ 4 calls, ~1.2 calls/opinion batched across ten; roughly 30 fully-read opinions/day sustained, ~12/hour, or ~40/hour batched. **The hourly cap (50/hr rolling) binds, not the daily.** Local citation extraction is free.

**Layer C — MCP connector (in-session).** Connect FLP's MCP server to the Claude.ai project and to Claude Code. Use cases: pull forward citations during sign-off sessions; validate cites the moment they're proposed; retrieve opinion text to quote exact passages during verification ("show me where K&L says X"). This makes the verification session itself the consumer, instead of only the app.

## 3. Registry schema additions (per entry / per authority)

- `courtlistener_opinion_id` (nullable — set by first successful cite validation)
- `cite_validated` {date, result}
- `alert_id` (Layer A saved-search alert reference)
- `forward_citation_baseline` {count, as_of_date} (set at verification time; deltas drive review scheduling)
- `review_flag` enum: none | citation_activity | validation_override | scheduled_recheck — with attached payload (citing case metadata)
- `flag_history` (append-only; flags are cleared only by an attorney-review event, which is itself logged)

## 4. Config & hygiene

- API token in `.env` (already gitignored); never committed; never sent anywhere but courtlistener.com.
- Webhook endpoint: none exists until the app has a server component — until then, email alerts to Michael + manual flag entry, or a scheduled Layer-B poll within budget. Decide at Phase 1a+ when hosting posture is known. [DECIDE]
- Queries to CourtListener contain authority cites only — never client names, facts, or case details. (Search queries are outbound data; treat like any third-party service.)
- FLP is a 501(c)(3); Tier 1 membership doubles as the sustaining contribution if this becomes standing infrastructure. Sign-up timing: before 2026-08-06 captures the promo, but see §1 — budget against standard limits.
- **App integration (Layers A and B) is GATED on the open FLP internal-tooling terms question (Q-6, 2026-07-26):** FLP's membership API terms welcome solo practitioners for research use but treat internal tooling supporting a firm's operation as commercial use requiring a conversation with FLP. Design-session research use is within bounds; wiring the API into the app is UNAUTHORIZED until Michael resolves this with FLP.

## 5. What this does NOT replace

- vLex Fastcase (bar benefit) and Lexis remain the **human verification layer** — editorial citator (Shepard's for the high-stakes flips), parallel cites, and coverage backstop.
- The registry's verified status still changes only by Michael's per-proposition sign-off. This integration reduces the cost of *noticing* and *investigating*; it does not verify anything.

## 6. Build sequencing

Not part of Phase 1a scope (billing module). Slot as a small standalone increment after the registry table itself exists — Layer B item 1 (cite validation) first (smallest, highest value, pure function + one API call), then Layer A alerts, then Layer C connector setup (which is configuration, not code). [Michael: approve sequencing or pull cite-validation forward into the registry table build.]

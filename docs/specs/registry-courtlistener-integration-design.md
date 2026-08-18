# Legal Rule Registry — CourtListener / Free Law Project Integration (Design Addition)

Status: DESIGN ADDITION drafted 2026-07-24 in the design space. Staged for Code: commit under `docs/specs/` and reference from the registry section of the master spec. Nothing here is built yet; nothing here changes the verification discipline.

## 0. Principle (unchanged, restated because it governs everything below)

CourtListener provides a **citation graph and retrieval layer, not a citator**. It reports *that* something cited a watched authority, never *how* (no overruled/distinguished/questioned editorial layer). Therefore: **automation flags; only Michael verifies.** No API result, alert, or MCP query ever changes a registry entry's verified status, and no computed output may treat a flag as a legal conclusion.

## 0.1 Majority-opinion rule (BINDING, ruled 2026-07-26 after a live near-miss)

A CourtListener citation lookup (`analyze_citations`) returns a CLUSTER id. A cluster routinely contains several sub-opinions (majority, concurrence, dissent), and the cluster id collides with one sub-opinion id — which is **NOT reliably the majority**. Feeding the cluster id straight to `read_document` returned Justice Lehrmann's DISSENT in Haygood, not the Court's opinion; characterizing the holding from that text would have reported the dissent's reasoning as the holding. Verified as systematic, not a fluke, across both clusters checked:

- Haygood cluster `2829381` → sub-opinions `9810727`, `9810728`, `2829381`; the cluster id resolves to the dissent. Majority is `9810727` (Justice Hecht).
- Cash America cluster `1576064` → sub-opinions `9857637`, `9857638`, `1576064`; same collision.

The rule: **never read or characterize an opinion from a cluster id alone** — enumerate `sub_opinions` first; identify the majority positively, by opinion-type marker and authoring language ("delivered the opinion of the Court"), never by position, id proximity, or assumption; state which sub-opinion was read whenever an opinion is characterized, and say so explicitly when separate opinions exist. A holding attributed to the wrong sub-opinion is the same class of error as an unverified proposition: a flag, never a verification. (The two example id sets above are evidence for the rule, not configuration.) Also folded into CLAUDE.md's registry discipline as rule 5.

### 0.1.1 Duplicate-record hazard (added per V-8, ruled 2026-08-13; executed on Michael's 2026-08-18 ruling)

**FLP can hold more than one record of the same decision, and the records disagree about facts a
reader will take as findings.** This is distinct from the cluster/sub-opinion collision above: there
the ids collide within one cluster; here there are two clusters.

- ***In re Alford Chevrolet-Geo*, 997 S.W.2d 173 (Tex. 1999) — two clusters, one reporter cite.**
  Cluster `2419858` (`date_filed` 1999-08-26; carries the reporter cite with star pagination, the WL
  cite `1999 WL 374136`, and 207 citing references) and cluster `5269700`, styled "In re
  Chevroletgeo" (`date_filed` 1999-06-10; two sub-opinions `5097124`/`5097125`; 3 citing
  references), same docket 97-1171. **A lookup landing on `5269700` reports three citing references
  instead of 207 and reads as a dead authority.**
  **The dates are not two decisions.** The opinion's own caption reads *"Decided June 10, 1999.
  Rehearing Overruled August 26, 1999."* — **rehearing was OVERRULED, so nothing was superseded**;
  the two clusters simply carry different dates out of the same caption. *(Read 2026-08-17,
  T-20/T-21 staging §1.4. Supersedes the earlier unasserted inference that the June 10 record was
  superseded on rehearing — that inference was expressly flagged as inference and is contradicted by
  the text.)*
- ***Allstate Ins. Co. v. Irwin*, 627 S.W.3d 263 (Tex. 2021) — two clusters, NO cite.** The reporter
  citation returns zero hits; neither cluster carries a citation array, an author, or an
  opinion-type marker. **See 0.1.2.**

**The rule: never treat a single cluster as the case.** Before relying on any cluster's metadata,
confirm whether a second record of the same decision exists — by docket number, by reporter cite,
and by case name, since a duplicate may be styled differently (*"In re Chevroletgeo"*). Where two
records exist, **identify which carries the reporter cite and star pagination and treat that as the
operative record for citation** — but see 0.1.4 before discarding the other.

### 0.1.2 The *Irwin* class — records FLP cannot type (added per V-8, ruled 2026-08-13; executed on Michael's 2026-08-18 ruling)

**Some records carry no citation array, no author, and no opinion-type marker.** For these the
majority-opinion rule above **cannot run at all**: there is no `sub_opinions` typing to enumerate and
no authoring language exposed in the data. The rule's method presupposes data FLP does not always
have.

Observed on: ***Allstate v. Irwin*** (two clusters, no cite, no typing); ***In re Volt Power***,
cluster `9390268`, and ***In re Redman***, cluster `9432901` — both single `010combined` harvests
from TAMES with **empty `citations`, `citation_count` 0, empty `author_str`, empty `judges`**.

**The rule: when the data cannot support positive identification, say so and stop.** Do not
characterize the opinion, do not infer the majority from position or from the combined text, and do
not treat the absence as evidence about the case. **V-9 was RULED 2026-08-18** (fable-adjudication-record-2026-08-18.md §2): the majority may
then be identified only from the court's own document, a paginated vendor copy stating on its
face who delivered the opinion, or Michael's own identification, put to him and recorded.
Absent all three: cannot identify — stop, and the entry is flagged, never staged for
verification, until identification is possible. *(Live illustration: Irwin's majority was
identified 2026-08-17 from a paginated copy — Devine, J., delivering the opinion of the Court
for five justices, Hecht, C.J., dissenting for four. That answered one entry; the amendment is
what makes the route a rule.)*

### 0.1.3 Citing counts are not figures and not currency (added per V-8, ruled 2026-08-13; executed on Michael's 2026-08-18 ruling)

**A `citation_count` is never displayed as a precise figure and is never read as a currency signal.**
It is a property of FLP's citation graph at a moment, not of the authority.

- **The same decision returned 207 and 3** depending on which duplicate record was read (0.1.1).
  Neither number is wrong about the graph; both are useless as facts about the case.
- **A quiet period is a flag, not a finding.** *Peeples v. Fourth Supreme Judicial Dist.*, 701 S.W.2d
  635 (Tex. 1985) shows citing traffic tailing off around 2020 rather than 2025–26. That is at least
  as likely to reflect FLP's graph coverage as anything about the case, and a 1985 foundational
  privilege case being cited less in the 2020s is unremarkable. **Recorded because a quiet period is
  exactly the pattern a currency check exists to notice — and exactly the pattern that misleads.**

**Where a count is shown at all, it is shown as a range or as a direction of travel with its
as-of date**, and it never appears in a computed output that a reader could take as a legal
conclusion. **This is an instance of §0's governing principle, not an exception to it: automation
flags; only Michael verifies.**

### 0.1.4 — Same docket, wrong document *(added per Michael's ruling 2026-08-18)*

**FLP's record for a docket can be a procedural ORDER rather than the merits opinion, and nothing in
the record's fields says so.**

> ***In re Sting Soccer Group, LP***, cause 05-17-00317-CV (Tex. App.—Dallas). A docket search returns
> **exactly one** FLP record: cluster `4417125`, opinion `4194378`, `dateFiled` **2017-08-08**,
> `status "Published"`. **August 8, 2017 is an order setting a response deadline on the mandamus
> petition.** The merits opinion — November 30, 2017, Lang, J., **MEMORANDUM OPINION**, conditionally
> granting in part — **is not in FLP at all.** A researcher who retrieves this docket and reads what
> comes back is reading a briefing order.

**The milder form of the same class is a docket carrying two records where only one is meant:**
*In re Volt Power* (Apr. 5 substantive / Apr. 20 mootness dismissal) and *In re Redman* (Oct. 11
substantive / Oct. 18) each return two, both `status "Published"`, both with empty citation arrays.
**Three of the six records looks run 2026-08-17 hit this class.**

**Proposed rule:** a docket-number retrieval **confirms the document's own date and disposition
against the citation being checked** before anything is read from it. Where the retrieved date does
not match the cite, the retrieval has not found the authority.

### 0.1.5 — The duplicate record can be the only thing that makes the majority rule runnable *(added per Michael's ruling 2026-08-18)*

**At *Alford*, the record that is operative for citation cannot answer the majority question, and the
record that is a duplicate can.**

- Cluster `2419858` — the operative record — is a single `010combined` opinion: lead and separate
  opinion fused into one document, **no type marker, no author distinction.**
- Cluster `5269700` — the duplicate — splits the same decision into `5097124` (`020lead`,
  **Hankinson, J.**) and `5097125` (`035concurrenceinpart`, **Hecht, J.**).
- The proposition relied on sits in `5097124`, the lead. **That is a positive identification, and it
  was only available from the duplicate.**

**Why this matters more than as a curiosity:** a rule of the form *"prefer the record carrying the
reporter cite and discard the other"* — the obvious remedy for 0.1.1 — **would have destroyed the
evidence that satisfied the binding majority-opinion rule.** **A duplicate is a citation hazard and
an attribution asset, and the two pull in opposite directions.**

**Proposed rule:** duplicate records are **reconciled, never discarded**. The record carrying the
reporter cite governs the citation; **any record in the set may govern the typing.**

### 0.1.6 — `precedential_status` does not track the Texas designation *(added per Michael's ruling 2026-08-18)*

**Every Texas court-of-appeals record read 2026-08-17 returned `status: "Published"` — including a
procedural order (C-1), and including records whose companion merits opinions the courts themselves
designate MEMORANDUM OPINION.**

**Proposed rule:** FLP's `precedential_status` is **never** evidence of a Texas opinion's
designation. A memorandum-vs-published question is answered only from the court's own document.

**This one has a consequence beyond §0.1 and is flagged rather than followed:** `precedential_status`
is carried as a DESIGN-STATUS-ONLY item from the 08-13 ruling run. **If it is ever wired into the
registry as a field, this is what it would and would not mean.**

Michael's rider, recorded 2026-08-18 and commissioned as a research item (CHAT-DISPATCH v4, T-31): "possibly we should seek another way of determining the official texas designations."

### 0.1.7 — FLP's citation links can attach an id to an "Id." that resolves to the wrong authority *(added per Michael's ruling 2026-08-18)*

In FLP's HTML for *Trahan v. Lone Star Title Co. of El Paso*, 247 S.W.3d 269, a footnote's **"*Id.*"**
— which on the page plainly refers back to Tex. R. Civ. P. 192.3(h) — carries markup linking it to
***Equisource Realty Corp. v. Crown Life Insurance Co.***

**A reader taking FLP's citation links at face value would attribute a rule quotation to a case that
has nothing to do with it.**

**Proposed rule:** FLP's inline citation links are navigation, **never provenance**. A cite is read
from the opinion's own text, not from the `data-id` attached to it. *(Michael may prefer this in
§0.1, in §5, or nowhere — it is a reading hazard rather than a retrieval-architecture hazard, and it
is put where it was found rather than filed by assumption.)*

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

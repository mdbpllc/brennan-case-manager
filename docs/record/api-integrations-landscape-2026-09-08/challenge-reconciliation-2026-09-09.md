# RECONCILIATION — Grok 4.6's `CHALLENGE-RESPONSE v1` against the API-integrations memo (v1)

**Status: PROPOSED — a reconciliation record, not a ruling.** Every disposition below is Claude's, put for Michael's adopt / reject / edit; every legal proposition the challenger raised enters **UNVERIFIED**; every vendor claim was re-read at source where it mattered and is marked. Nothing here changes a ruling: where the challenge touches one, the item is marked **TOUCHES A RULING** and put as a question, never applied.

**Authored:** 2026-09-09 Central (DT-1: the reconciliation began about 23:40 CDT on 2026-09-08 — the challenge's fetches ran 23:40–23:59 CDT — and the writing ran past midnight; the container clock was not used). Typed design session, Cowork, Fable 5.1. Device bridge on the checkout; HEAD unchanged at `44409ef`; nothing in the checkout was written. **The memo the challenger reviewed is v1 as delivered (`api-integrations-proposal_2026-09-08.md`); it stands as delivered. A v2 with the accepted changes applied is delivered alongside this record.**

**Provenance marks:** **[RECORD]** repo file read at HEAD over the bridge · **[PK]** project-knowledge capture by retrieval · **[FETCHED <date>]** the vendor's own page read through the fetch layer (second-hand unless marked verbatim) — in the tables the bare **[FETCHED]** means [FETCHED 2026-09-08] on this reconciliation's pass, and **[FETCHED, v1]** means read on v1's pass the same evening · **[SEARCH ONLY]** surfaced, not read · **[GROK]** the challenger's claim as pasted — a third party's read, **not** independently confirmed unless another mark follows it.

**PF-1:** the challenge's §I trust-boundary paragraph is a legal characterization (TDRPC 1.14; TRDP 17.10). It is **not adopted, not characterized further, and not entered anywhere** — it is routed in §8 below as registry-candidate material for Michael's own read of the TDRPC PDF already in `Documents\Knowledge Repo` (FC-14's fourth SOURCING channel). No packet ships from this sitting, so PF-1's trigger is not reached; the routing is recorded so the skip is not silent.

---

## §0 — HEADLINE: what fell, what survived, what is new

1. **The single most consequential thing the challenge produced is a price, and it checks out at source.** Supabase's HIPAA add-on is *"Not included in"* Free and Pro and *"Available as paid add-on"* on **Team (from $599/month)** and Enterprise; Point-in-Time Recovery — which High Compliance mode requires — is *"$100 per month per 7 days retention"*; the Small compute it needs is **$15** (`supabase.com/pricing` **[FETCHED 2026-09-08]**). So the memo's §1.2 path (b) — *"sign the BAA, enable the add-on"* — is **≥ $714/month before the add-on's own unpublished price**, against a Pro plan at $25. The memo said the figures were *"not read; not estimated."* They are now read. **This sharpens `Q-API-1` from "when" into "where does PHI text live at all" — and that touches a ruling (`AS-Q4`), so it is put, not answered (§8).**

2. **The runner shape survives as an endpoint but not as written.** Grok's W-1 is right that a Graph webhook endpoint must answer fast and that a cron schedule does not keep an inbound endpoint warm — and Microsoft's own page says what to do about it: *"validate and persist the notification in a queue on your endpoint and return `202 Accepted` status code within the 3-second window"* (Microsoft Learn, webhook delivery **[FETCHED 2026-09-08]**). Grok's verdict *"WRONG as the Graph notification home"* overstates: Supabase's 2-second limit is **CPU time** (*"does not include async I/O"* — `supabase.com/docs/guides/functions/limits` **[FETCHED 2026-09-08]**), an acknowledge-and-enqueue does negligible CPU work against it (a reasoned claim, not a measurement — a build session measures it), and a missed 3-second window is **retried with exponential backoff for up to 4 hours with the timeout extended to 10 seconds** — a cold start does not lose a notification. What the memo *did* miss: the ack-and-enqueue shape itself (Supabase Queues/pgmq exists for exactly this — **[FETCHED 2026-09-08]**), cron-driven renewals stated as a job, and the **delta-query backstop** Microsoft recommends for catching anything missed (*"use delta query to request all changes since the last time it made the request"* — **[FETCHED 2026-09-08]**). **Accepted in part; v2 rewrites §1.1's Execution cell.**

3. **The Azure alternative is real and is Microsoft's own suggestion.** The webhook page ends: *"If your endpoint is unable to meet these performance characteristics, consider using Event Hubs or Event Grid as a target."* Event Hubs delivery needs **no validation reply**, and its credential is **either** a Key Vault-held connection string **or** an Entra RBAC role on the hub — Microsoft says SAS will be deprecated and recommends Entra RBAC (**[FETCHED 2026-09-08]**). And Microsoft's HIPAA page lists **Azure, Intune, Office 365, Power Automate and Power Apps** on its platforms-and-services list, with **Teams, SharePoint Online and OneDrive for Business** in the separate Office 365 in-scope table, under a BAA that is *"available … by default"* through the DPA (page dated 2025-07-29, **[FETCHED 2026-09-08]**) — **available, not proven in force on this tenant** (still a named look). Grok's ALT-2 (Azure Functions / Container Apps + Managed Identity + Key Vault) and ALT-3 (Power Automate for known-sender pipelines) therefore enter `Q-API-2`'s option set as serious shapes, with one caveat Grok also states: the Azure subscription must not double as the Microsoft-independent backup target (`#137`).

4. **"PHI-thin" falls.** Grok's A-7/W-4: HIPAA has no such class; a stored subject line or attachment name with a client's name and a health fact is PHI. The memo had already said option (a) *"is not PHI-free"* and flagged it; the honest consequence is Grok's fix — **option (a) becomes pointer-only** (message id, received-at, a classification enum, a matter suggestion; subject and filenames read live in the browser through the delegated scope and never stored). **Accepted; v2 rewrites §1.2(a).** The regulation cited (45 C.F.R. § 160.103's definition) enters **UNVERIFIED** as a registry candidate — the record already notes *"zero propositions on privacy (`Q-WF-6`)"* (BUILD-STATE **[RECORD]**).

5. **Three corrections accepted outright:** PDF fidelity — *"the same bytes the court gets"* overclaimed; preview and filing are split, with a fidelity test on the master `.docx` before Graph conversion is ever the filing path (W-3). The **CloudLex exit** was an omission — now filled with the vendor's own FAQ (§4 ADD-8). **ServeManager has webhooks** for jobs, attempts, attachments, affidavits, invoices and notes (**[FETCHED 2026-09-08]**) — the row moves from polling to webhooks (ADD-9).

6. **Two challenger claims refuted at source, one corrected in the challenger's favour:** the AWS HIPAA-eligible-services page reads *"Last Updated: May 22, 2026"* on the English page, fetched twice this sitting (**[FETCHED 2026-09-08]**) — Grok's *"November 17, 2025 … not confirmed"* is not what the page shows and the memo's stamp stands. SRFax's official HIPAA page *does* state it will sign a BAA (**[FETCHED 2026-09-08]**, v1's read) — Grok's *"not established"* was Grok not reading it; but Grok's API facts are confirmed and matter: the API authenticates with **the account password** (*"access_pwd – This is the password that you use to log into your SRFax account"*), over HTTPS POST, with **no webhooks** — status is pulled (**[FETCHED 2026-09-08]**). And on LawPay, **both sides were wrong the same way**: Grok's own cited page shows a payment page **per processing account** (*"8am creates a payment page for each of a merchant's processing accounts"*), its example pages ending in *"myaccount"* and *"mytrust"* with distinct `merchant_account_id` values — and, on the trust page, `ach_account_id: null` (`developers.8am.com/pagelink/...` **[FETCHED 2026-09-08]**, re-read on the re-sweep) — so trust-vs-operating routing **is** addressed, by page-per-account; what remains a merchant-portal fact is whether the trust page is an IOLTA-handled account and whether it takes ACH at all.

7. **Two items touch rulings and are put as questions only:** the pointer architecture (ALT-4) would move chronology text out of Supabase — `AS-Q4` **ruled** it in (*"stores chronology TEXT per version, bytes not retained"* — session-log index **[RECORD]**); Microsoft 365 Backup as the third copy (ADD-10) contradicts the requirement Michael stated at `#137` (genuinely Microsoft-independent; restorable without Microsoft) **[PK]**. CC-1(b): ruled things stand until he re-rules; neither is applied.

8. **The trust boundary (challenge §I)** is routed, not adopted or restated: TDRPC 1.14 and TRDP 17.10 are **UNVERIFIED registry candidates** under `Q-QBO-6` / `Q-STAT-5`, and the TDRPC (eff. 3/7/2025) is already a clean-authority PDF in `Documents\Knowledge Repo` — his read, not a session's. The memo's design boundary (*"the app does not become the trust ledger"*) is unchanged by the characterization either way.

---

## §1 — VERDICTS (challenge §A), item by item

| # | Grok's verdict | Disposition | Reason / evidence |
|---|---|---|---|
| A-1 | Edge Functions WRONG as Graph home; HOLDS for cron | **ACCEPT IN PART** | Limits confirmed (256 MB; 2 s CPU *excluding async I/O*; 150 s free / 400 s paid; 150 s idle) **[FETCHED]**. Graph: 10 s validation, 3 s ack, 202-and-queue recommended, 4-hour retries **[FETCHED]**. Conclusion corrected to *ack-and-enqueue + cron renewals + delta backstop*, with Event Hubs/Event Grid as Microsoft's named alternative. "Cold starts documented" — not on the limits page; **not established**. |
| A-2 | RBAC HOLDS; certificate WEAK; federation/Managed Identity better | **ACCEPT IN PART** | Managed Identity exists only on Azure compute; workload identity federation needs an OIDC issuer the runner controls — whether a Supabase-issued token could serve as a federated credential is **not established** (not researched) — so the fix as stated implies ALT-2. Certificate expiry becomes a **firm obligation** (the FO module's exact job). Grok's operational test — *prove a second mailbox 403s before production* — accepted verbatim. |
| A-3 | no app-only file permission — HOLDS | AGREED | — |
| A-4 | Vault table WEAK; Key Vault better | **ACCEPT IN PART** | True that a token table rides Postgres backups and support access; Key Vault is the shelf **if** the runner is on Azure. Recorded as the custody half of `Q-API-2`. |
| A-5 | Supabase BAA HOLDS; plan/cost WEAK | **ACCEPT — and it is the headline** | Team from $599; add-on Team/Enterprise only; PITR $100/7 days; Small $15 **[FETCHED]**. |
| A-6 | chronology trigger HOLDS if extracts stay in Postgres | AGREED, with the ruling named | `AS-Q4` is ruled; moving text out is a re-ruling (§8). |
| A-7 | "PHI-thin" WRONG as a category | **ACCEPT** | §0 item 4. |
| A-8 | default (a)-then-(b) WEAK | **ACCEPT** | With (a) pointer-only, the default is restated (§8, `Q-API-1`). |
| A-9 | Postmark / `Mail.Send` HOLDS | AGREED | — |
| A-10 | PDF endpoint HOLDS; fidelity not established | **ACCEPT** | v2 splits preview from filing. |
| A-11 | Teams SMS DO NOT BUILD — HOLDS | AGREED | — |
| A-12 | `CallRecords` tenant-wide — HOLDS | AGREED | — |
| A-13 | Bookings v1.0 blog (2022) | NOTED **[GROK]** | Not re-read; row unchanged, still optional. |
| A-14 | SharePoint eSignature: setup page + audit record only | **ACCEPT** **[GROK]** | Consistent with v1; `sharePointESignatureAuditRecord` is a Graph *security* resource, not a create-request API — not re-read; marked. |
| A-15 | Docusign SKU still contradictory | AGREED | v1 already said the plan tier is not stated. |
| A-16 | Twilio editions HOLDS; product list re-read at contract time | AGREED | — |
| A-17 | ServeManager webhooks missed | **ACCEPT** | Webhooks for Jobs, Attempts, Attachments, Affidavits, Invoices, Notes **[FETCHED]**. |
| A-18 | SRFax BAA "not established"; API weak | **REJECT the BAA limb; ACCEPT the API limb** | Official page: *"will sign a Business Associate Agreement"* **[FETCHED, v1]**. API: account-password credential, HTTPS POST, no webhooks **[FETCHED]** — a custody and polling cost the row now carries. |
| A-19 | AWS page date not confirmed | **REJECT** | English page: *"Last Updated: May 22, 2026"*, fetched twice **[FETCHED]**; S3, S3 Glacier, AWS Backup, Bedrock all listed. |
| A-20 | Backblaze BAA HOLDS | AGREED | — |
| A-21 | 8am docs HOLDS; routing to confirm | **ACCEPT, and improved** | The page's example shows a page per processing account including one ending *"mytrust"* with `ach_account_id: null` **[FETCHED]** — routing is by page; IOLTA handling of that account, and whether it takes ACH, are merchant-portal facts. |
| A-22 | PACER PCL HOLDS; production billable | NOTED **[GROK]** | The PDF was not opened by either side. |
| A-23 | NPPES v2.1 HOLDS | AGREED | v1's live query stands. |
| A-24 | eFileTexas submission out of scope — HOLDS | AGREED | — |
| A-25 | trust accounting not an integration — HOLDS | AGREED | The rule cites are §8's UNVERIFIED candidates. |
| A-26 | CloudLex exit WEAK as omission | **ACCEPT** | FAQ: exports *"All documents, case files, and attachments"*, *"Contacts, notes, tasks, and audit logs"*, *"Emails, settlement details, and financial records"*, in *"an open, widely compatible format (EXCEL)"*, *"no exit fees or data-holding delays"*, *"read-only access during the transition period"*; **no API mentioned** **[FETCHED]**. |

---

## §2 — WEAKNESSES (challenge §B)

| ID | Disposition | What changes, and what does not |
|---|---|---|
| W-1 | **ACCEPT IN PART** | The failure scenario ("dropped return-for-correction mail → missed deadline") needs the endpoint down for **more than four hours** or in the "drop" state repeatedly — not one cold start. v2: ack-and-enqueue (202 within 3 s; Supabase Queues), renewals as a cron job (Outlook subscriptions < 7 days **[FETCHED]**), a scheduled **delta-query sweep** as the backstop, and — the human backstop Grok names — the mailbox itself, which is still read by Michael. The Azure path is put beside it (ALT-2). |
| W-2 | **ACCEPT IN PART** | Right that the deadline engine needs a holiday/closure table; wrong that nothing on the record addresses it — **`FC-9` is ruled direction: *"both rule kinds plus a holiday calendar"*** (BUILD-STATE, THE FC BLOCK **[RECORD]**). v2 points the calendaring-vendor row at FC-9. The sources Grok names (Tex. Gov't Code ch. 662; the clerk-closure practice note) are **UNVERIFIED leads**; the "legal holiday" construction under TRCP 4 is a registry question for Michael, not characterized here. |
| W-3 | **ACCEPT** | Preview vs filing split; fidelity test on the master `.docx` (numbering, headers/footers, signature blocks, TOC fields) before conversion is the filing path. |
| W-4 | **ACCEPT** | Pointer-only option (a); classification runs in the function and writes an enum, never the raw subject. |
| W-5 | **ACCEPT IN PART** | Certificate expiry → firm obligation with a lead; Key Vault auto-rotation only on Azure; **"consent no tenant-wide `Mail.Read` … prove a second mailbox 403s before go-live"** accepted as the acceptance test for the RBAC assignment. Conditional Access on the workload: **not established** how it binds a confidential client without Azure compute — a build-time look. |
| W-6 | **ACCEPT IN PART** | Backup decision and the phone question move to Wave 0 (§5). Intune app-protection availability is a **SKU fact** for Michael (`Q-API-14`); Grok's *"Intune is in Business Premium"* is **[GROK]**, not read. |
| W-7 | **ACCEPT as the default posture** | SMS default = phone + manual matter note; a CPaaS only after `COM-LOOK-4`, an edition quote, a signed BAA, an eligible-product read, and a written finding that photos must land in the log automatically. |
| W-8 | **ACCEPT as an option to put; not decided** | The stated requirement at `#137` was in-app access on the phone **[PK]**; `DA-1`/`DA-3` are open hands-on items. v2 puts **deep link into OneDrive mobile + Intune app protection first**, the in-app window only if a hands-on test in his own hands says it is needed — CC-1(b), his product in front of him. |
| W-9 | **ACCEPT** | CloudLex export rehearsal enters Wave 0 (§5; ADD-8). |
| W-10 | **ACCEPT** | `Files.ReadWrite` on the SPA waits for `DA-2`/`Q-API-3`; Docusign API scaffolding waits for a BAA and a volume finding. Wave 0 reduced to acts that need no new scope. |

---

## §3 — BETTER SOLUTIONS (challenge §C)

| ID | Disposition | Notes |
|---|---|---|
| ALT-1 | **ACCEPT as `Q-API-2` option (i)** | "Two identities, runner deferred" is what memo §5 item 1 already argued; it becomes the explicit first limb: delegated-only value now, no app-only principal until a pipeline earns it. **Cannot:** overnight envelope tracking — which is the thing WF-2 is for. |
| ALT-2 | **ACCEPT as `Q-API-2` option (iii)** | Azure Functions / Container Apps + Managed Identity + Key Vault, Graph → Event Hubs (no validation reply; Entra RBAC on the hub or a Key Vault-held connection string **[FETCHED]**). Same tenant; Microsoft's BAA lists Azure as in scope **[FETCHED]** — in force on this tenant **not established**. Cost **not estimated** (Grok's word, and Claude's). Caveat accepted: not the backup target. |
| ALT-3 | **ACCEPT as `Q-API-2` option (iv) for known-sender pipelines** | Power Automate is on Microsoft's in-scope list **[FETCHED]**. Fit: WF-2 / WF-6 / WF-8 classify-and-stage writing **pointers**, not bodies; a DLP policy so a flow can never post PHI to Postmark or to Supabase. Premium-connector licensing **not estimated**. Cannot: the GPU work, chronology, idempotent legal writes. |
| ALT-4 | **TOUCHES A RULING — put as `Q-API-1` limb (c)** | Pointer architecture would move chronology text out of Supabase; `AS-Q4` ruled it in. Given §0 item 1's price, the question is now worth re-putting — but only Michael re-rules. |
| ALT-5 | AGREED | Matches CLAUDE.md and v1 §2 rule 1. |

---

## §4 — ADDITIONS (challenge §D)

| ID | Disposition | Where it lands |
|---|---|---|
| ADD-1 Purview retention/eDiscovery | **ACCEPT as a tenant control (not an API)** | v2 §3.1 note; a configuration act, his hand; retention policy on the mailbox and OneDrive is also the honest answer to "what if the app is down." |
| ADD-2 Exchange transport rules as the hard-ignore layer | **ACCEPT** | v2 §3.1 new row. Runs in Exchange whether or not the app runs; drafted from real senders by his hand (H5). |
| ADD-3 Intune app protection | **ACCEPT as the first option on `DA-3`** | v2 §3.1 Files row; SKU fact `Q-API-14`. |
| ADD-4 OneDrive folder change notifications (42,300 min ≈ 30 days **[FETCHED]**) | **ACCEPT as a row; same runner gate** | v2 §3.1 new row. |
| ADD-5 Entra as IdP at first hire | AGREED — already v1's row | No change beyond wording ("at the hire"). |
| ADD-6 in-app audit log of PHI access | **ACCEPT — and it already has a home** | Gate 10's audit limb is *"OWED TO `O-1`, OPEN"* (BUILD-STATE **[RECORD]**); 45 C.F.R. § 164.312(b) enters UNVERIFIED as its registry candidate. |
| ADD-7 court-holiday/closure table | **ACCEPT via FC-9** | See W-2. |
| ADD-8 CloudLex export runbook | **ACCEPT** | v2 §3.4 new row + Wave 0. The Clio migration article Grok cites is **[GROK]** and irrelevant to the chosen app; not carried. |
| ADD-9 ServeManager webhooks | **ACCEPT** | v2 §3.4 row edited. |
| ADD-10 Microsoft 365 Backup as third copy | **REJECT as contrary to the stated requirement; recorded** | `#137`: genuinely Microsoft-independent, restorable without Microsoft **[PK]**. Recorded in v2 §3.11 so it is a decision, not a gap; re-opening it is his. |
| ADD-11 eCFR as class-0 fetch | AGREED — already v1's row | — |
| ADD-12 HIPAA access-review cadence as a firm obligation | **ACCEPT as a PROPOSED seed for the FO track** | Not this memo's to place: it goes to the firm-obligations ruling sitting as a candidate `FOT-` template (its ruling sheet is the venue). |

---

## §5 — SEQUENCING (challenge §E): a composite, put as the option

Grok's plan and v1's differ on one thing: **when the runner is built.** v1 built it in Wave 1 as the first act after the decision; Grok defers it to Wave 3 and fills Waves 0–2 with delegated-only value. Composite proposed for v2 — **decide early, build late**:

- **Wave 0 — prove the platform, copy the origin, decide where PHI lives.** Deploy `statute-fetch` and `legiscan-poller` (unchanged); the two Outlook-defect evidence captures (unchanged); **CloudLex export rehearsal onto the existing OneDrive tree** (new); **backup vendor chosen and a restore-drill owner named** (moved up from Wave 2); **`Q-API-1` decided with the price in view** (new); Intune/SKU look and an Exchange transport-rule ignore list drafted from real senders (new, his hand). **No new Graph scope.**
- **Wave 1 — delegated-only value.** NPPES; PDF *preview* via Graph if `Q-API-3` says yes; `Mail.Send` user-initiated; OneDrive deep link from the case record; on-demand mail read in the browser. Still no app-only principal.
- **Wave 2 — money display.** QBO sandbox reads; LawPay page links only after the trust page's IOLTA handling is confirmed in the merchant portal; the app never writes trust.
- **Wave 3 — the unattended identity.** `Q-API-2`'s chosen shape — Supabase ack-and-enqueue, Azure runner, Power Automate, or a composite — then WF-2's substrate first; SMS, fax API, e-signature API, `CallRecords`, CourtListener behind their own gates.

Grok's two "do nots" — no Supabase HIPAA add-on *"in case"*; no `Files.ReadWrite` on the SPA to close a spec-feedback item — are accepted as they stand.

---

## §6 — COST (challenge §F): figures verified, the rest left as "not estimated"

| Item | Figure | Status |
|---|---|---|
| Supabase Pro | $25/mo | **[FETCHED]** |
| Supabase Team | from $599/mo | **[FETCHED]** |
| HIPAA add-on | paid add-on, Team/Enterprise only; price unpublished | **[FETCHED]** |
| PITR | $100/mo per 7 days retention | **[FETCHED]** |
| Small compute | $15/mo | **[FETCHED]** |
| Microsoft BAA | *"available … by default"* through the DPA — no separate charge stated | **[FETCHED]**; in force on the tenant: named look |
| Azure runner, Power Automate premium, e-signature transactions, Twilio editions, SRFax plan, Backblaze at ~7 GB, PACER fees | not estimated | Grok's word and Claude's; none read |

**The arithmetic that matters:** path (b) ≈ **$714/month floor** before the add-on; the pointer path (ALT-4) stays at $25 + existing M365 + object storage under the $50 ceiling — *if* `AS-Q4` is re-ruled and discipline holds (*"One pasted SOAP note into a text column undoes it"* — Grok's line, and it is right).

---

## §7 — RISKS (challenge §G): dispositions in one line each

Client harm 1 (cold endpoint / lapsed subscription) — guarded in v2 by ack-and-enqueue, cron renewal, delta sweep, and the mailbox itself. Client harm 2 (holiday-blind engine) — FC-9's holiday calendar; sources UNVERIFIED. Client harm 3 (wrong-party send / templated SMS) — v1's rules stand; v2 adds: no app-only `Mail.Send` before the runner exists. Compliance 1 (PHI in Postgres) — `Q-API-1` with the price. Compliance 2 (credential custody) — FO expiry obligation; Key Vault if Azure. Compliance 3 (tenant-wide permission) — RBAC assignment plus the second-mailbox 403 proof before traffic. Wasted effort 1–3 — deep link first; prove cron on PHI-free functions only; vendor APIs behind vendor facts. **All accepted.**

---

## §8 — QUESTIONS: the challenge's ten (§H) merged into the `Q-API-` series

Grok's H-1 → `Q-API-1` (revised); H-2 → **new `Q-API-17`**; H-3 → **new `Q-API-14`**; H-4 → **new `Q-API-18`** (was a named look); H-5 → recorded against `#137`, not re-put unless he opens it; H-6 → the WF-2 named look (unchanged, H5); H-7 → `Q-API-6` (revised); H-8 → `COM-LOOK-4` (unchanged); H-9 → `Q-API-7` (revised); H-10 → **new `Q-API-19`**. Full text of every revised and new question is in memo v2 §6 (QR-1: full text travels with the ID). Collision check: `Q-API-14`–`19` free repo-wide at `44409ef` (the series was checked whole in v1; no `Q-API-` string exists in the repo).

**Registry-candidate material from the challenge, ALL UNVERIFIED, routed and not entered:** 45 C.F.R. § 160.103 (PHI definition) and § 164.312(b) (audit controls) → `Q-WF-6`'s privacy gap; TDRPC 1.14(a)–(c) and TRDP 17.10 (trust records) → `Q-QBO-6` / `Q-STAT-5`, the TDRPC PDF in `Documents\Knowledge Repo` being the clean-authority copy; Tex. Gov't Code ch. 662 and TRCP 4's "legal holiday" → the deadline engine's FC-9 holiday calendar. **Only Michael verifies.**

---

## §9 — WHAT CHANGES IN MEMO v2 (the change log; v2's header carries the one-paragraph version)

1. §1.1 Execution — rewritten: ack-and-enqueue, cron renewals, delta backstop; limits stated; Event Hubs/Event Grid named as Microsoft's alternative; `Q-API-2` widened to four shapes and a composite.
2. §1.1 Identity/Custody — certificate expiry as a firm obligation; Managed Identity/Key Vault only on Azure; the second-mailbox 403 proof as the acceptance test.
3. §1.2 — the Supabase price; option (a) pointer-only; option (c) pointer architecture (TOUCHES `AS-Q4`); default restated.
4. §3.1 — mail-intake row (storage, transport-rule ignore layer, delta sweep); Files row (deep link + Intune first); PDF row (preview vs filing); new rows: Exchange transport rules, Intune app protection, Purview retention, OneDrive folder notifications.
5. §3.2 — Supabase row carries the price and Queues.
6. §3.3 — calendaring-vendor row points at FC-9.
7. §3.4 — ServeManager webhooks; new CloudLex-exit row.
8. §3.5 — SRFax row carries the account-password credential and no-webhook facts.
9. §3.6 — LawPay row: per-account payment pages incl. a trust page; trust row cites the UNVERIFIED candidates.
10. §3.8 — SMS default posture.
11. §3.10/§3.11 — M365 Backup recorded as declined against `#137`.
12. §4 — the composite wave plan.
13. §5 — Grok's rejected points recorded.
14. §6 — `Q-API-1`, `-2`, `-3`, `-4`, `-6`, `-7`, `-13` revised; `Q-API-14`–`19` added.
15. §7 — new sources with dates.

---

## §10 — SOURCES READ FOR THIS RECONCILIATION (all 2026-09-08 late Central, ~23:40–23:59 CDT)

Supabase — *Edge Functions limits*; *Pricing*; *Queues* (pgmq); *Scheduling Edge Functions* (v1) · Microsoft Learn — *Change notifications delivery via webhooks*; *Subscription resource type* (maximum expirations); *Change notifications delivery via Azure Event Hubs*; *Delta query overview*; *HIPAA/HITECH offering* (in-scope services, page dated 2025-07-29); *RBAC for Applications in Exchange Online* (v1) · AWS — *HIPAA Eligible Services Reference* (re-fetched; "Last Updated: May 22, 2026") · CloudLex — *FAQ* (export and exit terms) · ServeManager — *API documentation* (webhooks) · 8am — *Create payment page link* · SRFax — *Internet Fax API, getting started*; *HIPAA Compliance* (v1). **Not read, carried as [GROK]:** the Bookings developer-blog date; the SharePoint eSignature setup page and the `sharePointESignatureAuditRecord` resource; the Adobe HIPAA-ready page; the Twilio editions page; the Backblaze privacy page; the PACER PCL PDF; the Clio migration article; the JDSupra clerk-closure note; the two Texas trust-account pages.

*End of record. PROPOSED. Nothing ruled, nothing authorized, nothing built. Retrieval is not verification; only Michael verifies.*

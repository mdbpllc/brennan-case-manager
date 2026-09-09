# API Integrations — Ruling Sheet (the 2026-09-09 sitting's rulings, the closed list, the surviving questions)

**Status: RULING-class (CAP-2). Canonical repo path: `docs/specs/api-integrations-ruling-sheet-2026-09-09.md` — NEW FILE.** This is the sheet Michael ruled from and the record of what he ruled, in his words where he had them and by verbatim option label where he ruled by selection. **It authorizes no build, no schema act, no migration, no consent click and no deployment by the queue runner** — §5 says exactly what is authorized and for whom. Everything not marked RULED is PROPOSED or OPEN.

**Sitting:** typed design session, Cowork, Fable 5.1; opened 2026-09-08 late Central, the rulings taken 00:46–01:20 CDT on 2026-09-09 (DT-1; the container clock was not used); device bridge on the checkout, HEAD `44409ef` at open (the local `origin/master` ref — not a QR-3 pass), `inbox/` EMPTY at open. Michael's instruction that opened the sitting: *"If there is anything that you want to rule on, bring it to me one thing at a time."* Thirteen items were put one at a time; the running ledger is EVIDENCE at `docs/record/api-integrations-landscape-2026-09-08/ruling-ledger-2026-09-09.md`.
**The repo moved under the sitting, and the ordinal moved with it:** at packaging (01:30 CDT) HEAD was `d4c5e7d` = a LIVE `git ls-remote origin refs/heads/master` read, 0/0 by `rev-list --left-right --count` — **batch 94 committed at 00:44:13 CDT, two minutes before item 1 was put, filing the TRANSIT-EXECUTION session as `#153`**. This sitting's entry is therefore **`#154`**, found by a heading-anchored grep over the live log before any file was stamped (the `TOC-6` race, live: two design sessions in one evening, one ordinal each). The EVIDENCE files in this packet, authored at `44409ef`, still say "a `#153` entry" where they forecast the ordinal and route trust-records candidates to "`Q-QBO-6` / `Q-STAT-5`"; **they stand as authored — they are what Michael ruled from — and this sheet and the packet's acts carry the correction** (`#154`). Every anchor this packet's acts depend on was re-read at `d4c5e7d` and again at **`b2dc222`** (a Code session Michael directed committed the `RC-4` row and the `RF-2` alias at 01:27:20 CDT, while this packet was being assembled; neither commit touched the REQ-CAPTURE or `docs/spec-feedback.md`, and the register rows this packet annotates are unchanged). **Process note, recorded because the record already names the class:** this packet's assembly twice concluded a register row did not exist on a grep for the backticked ID (`Q-WF-4`, then — after that miss was diagnosed and fixed for one ID — `Q-STAT-5`), when both rows are written without backticks. Both were caught by reading the rows before the zip closed; nothing false reached the repo; the lesson *"enumerate the WHOLE series before scoping the fix"* is relearned here, not new.

**The material ruled on:** memo v1 (`api-integrations-proposal-v1-2026-09-08.md`), the Grok 4.6 challenge and its reconciliation, and memo v2 — all EVIDENCE in the same directory. **CC-1(a) noted throughout:** where the pick was of the option marked "(Recommended)", the option TEXT is Claude's and the SELECTION is Michael's; each is recorded as RULED BY SELECTION with the option text quoted so it can be overruled on its own terms.

**PF-1:** this sheet carries no legal characterization and drafts no registry entry; the legal cites the challenge raised (45 C.F.R. § 160.103 and § 164.312(b), TDRPC 1.14, TRDP 17.10, Tex. Gov't Code ch. 662, TRCP 4) are routed in §6 as UNVERIFIED registry candidates and are not characterized here. Retrieval is not verification; only Michael verifies.

---

## §1 — WHAT WAS RULED, item by item

### Item 1 — FACT (not a ruling): is Microsoft's HIPAA BAA in force on the tenant?
Put twice. Michael's first answer offered to show the BAA text under Microsoft's Compliance Materials NDA; Claude asked him not to, and the text — which he then pasted — **is not recorded anywhere on the record** (the NDA bars reproduction and summary; the public offering page is cited instead for the one point it settles: the BAA applies to a customer that is a covered entity or business associate through an agreement incorporating the DPA). Re-put narrower, his pick by label: **"Covered-status is undecided."**
**Standing:** whether the firm is a HIPAA covered entity or business associate is **OPEN and Michael's**; decision 1 proceeds on the **policy footing** (BAA-for-PHI is the firm's rule by choice; Supabase's own condition on PHI applies regardless). The subscription type (commercial M365 under the Microsoft Customer Agreement, or not) was **not stated** — a fact to read at admin.microsoft.com → Billing → Your products; not assumed.

### Item 2 — DECISION 1: where PHI lives — RULED BY SELECTION
Put with the price (Supabase HIPAA add-on: Team/Enterprise only; Team from $599/month; PITR $100/month per 7 days; Small compute $15; the add-on's own price unpublished — ≈ $714/month before the add-on, against Pro's from-$25; `supabase.com/pricing`, read 2026-09-08). Michael's pick, verbatim label: **"Pointer + split store (Recommended)."** Option text as put: *"Chronology files live in the matter's OneDrive folder; the five PHI tables move to a Postgres inside Microsoft's tenant (Azure Database for PostgreSQL); rows are a rebuildable index over the files; Supabase keeps the case core and pointers at $25. Needs the AS-Q4 re-ruling as its own act (next item) and a build slice later. Cost: two databases, no full-text search in Supabase, a discipline built into the fields."*
**Reason, one line (the record's):** the five disclosures tables and the chronology text are PHI by the record's own reading (*"THE AMENDMENT'S FIVE CARRY PHI — a chronology's extracted text above all"*; `#130`: dates of service on a single-plaintiff matter are re-identifiable), and keeping them in Supabase costs the Team plan.
**Rejected, with the constraint each encodes:** *not* "keep AS-Q4, pay the Team plan" (≈ $714/month for one database); *not* "keep AS-Q4, defer real chronologies" (the module would stay fixture-only); *not* "ask Supabase sales first" (not chosen — the ask is still available as a one-line email, §6).

### Item 3 — DECISION 1a: the `AS-Q4` amendment, its own act — RULED, ONE LIMB
The ruled text in front of him, from the REQ-CAPTURE §14.1 (RULED 2026-08-31, late): *"(i) Extracted text per version in the database; bytes not retained; file store at gate 7."* Michael asked for a walk (*"Run me through this a bit more."*); the walk was given; re-put; his pick by label: **"Adopt the one-limb change."**
**The amended limb, in the wording put and adopted:** *"Extracted text per version as a text file in the matter's OneDrive folder (per client, as AS-Q10 has it); the `case_chronology_versions` row keeps version number, drive item id, content hash, `readable`, `char_count`, `removed_at`; everything else in AS-Q4 stands."*
**Everything else in AS-Q4 stands:** versioned text records; the readability flag (an image-only scan is flagged and never sent); the removal row behaviour (D-60); one chronology set per client (AS-Q10); file store at gate 7 unchanged. The built table's `extracted_text` column becomes a **spec-vs-code gap** until a later slice moves it (§5).

### Item 4 — Fork 1: the original file — RULED BY SELECTION
Pick by label: **"Keep it beside the text (Recommended)."** Option text: *"The dropped file is saved into the same OneDrive chronology folder next to its extracted-text file; if the drop is a file already in the mirror, the app points at that item instead of writing a copy. 'Bytes not retained' now reads 'bytes not retained by the app's database'."*
**Reason:** the original is what he checks the vendor's chronology against (his own earlier report of a provider mis-attributed to a facility), and in OneDrive keeping it is nearly free. *Not* "point only, never copy"; *not* "discard as before."

### Item 5 — Fork 2: removing a mis-dropped version — RULED BY SELECTION
Pick by label: **"Move to a removed folder (Recommended)."** Option text: *"The app moves both files out of the matter's chronology folder into a firm-level `_removed` folder that is not under any matter, keeps the pointer on the row so the act is auditable, and you delete from there by hand. PHI leaves the wrong matter at once; nothing is destroyed by the app."*
**Reason:** D-60 exists because a mis-dropped chronology is PHI in the wrong matter; a row flag alone leaves the files where they are. *Not* "delete the files" (the app destroys nothing); *not* "flag only."

### Item 6 — Fork 3: who writes the files and runs the extractor — RULED BY SELECTION
Pick by label: **"Browser now, P1 later (Recommended)."** Option text: *"(A) is the shape for the next slice — it exists today, minus the OneDrive write — and (B) is the destination when the P1 service is authorized; the row and file layout are the same either way, so nothing is rebuilt at the switch."* (A) = the browser writes the text file and the original into OneDrive through Graph at the drop and runs the extractor there, as today; (B) = the P1 service extracts from the OneDrive folder the sync client keeps on the laptop, when T3 is authorized (`KICK-1` unchanged).
**Consequence:** the delegated `Files.ReadWrite` consent becomes necessary for the chronology path (item 8).

### Item 7 — DECISION 2: the server-side identity, `Q-WF-4` — RULED BY SELECTION, IN SHAPE
Pick by label: **"Composite as read (Recommended)."** Option text: *"(i) now; (ii) for the PHI-free jobs the day the two functions deploy; (iv) as the interim for the known-sender mail pipelines; (iii) as the destination runner for anything that touches PHI. Decided now, built in Wave 3; each build is its own authorization."* The four shapes, as put: **(i)** delegated-only, no runner; **(ii)** the Supabase runner — an Edge Function endpoint that acknowledges-and-enqueues (Microsoft's own instruction: return `202 Accepted` within the 3-second window and queue), Supabase Queues, cron renewals, a delta-query sweep; **(iii)** an Azure runner — Functions with Managed Identity and Key Vault, Graph delivering to Event Hubs with no validation reply, inside the tenant; **(iv)** Power Automate flows for the known-sender mail pipelines, writing pointers only.
**Reason:** decision 1 keeps PHI inside the Microsoft tenant, so the PHI-touching runner belongs there too; the PHI-free jobs already have a written Supabase path. **`Q-WF-4` is answered in shape — its own register row (it HAS one, written without backticks; this packet's first read missed it on a false zero) flips ⬜ → 🟡, ruled with execution pending — and its three consumers on the register (WF-2–WF-8, `Q-QBO-3`, `Q-COM-4`) now reconcile against this.** Nothing built or authorized; each build is its own act.

### Item 8 — DECISION 3a: delegated `Files.ReadWrite` on the SPA registration — RULED BY SELECTION
Pick by label: **"In, for all three uses (Recommended)."** The three uses: (1) the chronology text and original written to the matter's OneDrive folder at the drop; (2) the `_removed` move; (3) **PDF preview** via Graph conversion (`Q-API-3`'s preview half — the **filing** half stays behind a fidelity test on the master `.docx`, a hands-on item). **The consent click is Michael's act at build time**, in the Entra portal, exactly as on 2026-07-26; the OneDrive matter-folder convention is a fact he supplies then (H5 — never swept). It is the second scope the registration will ever hold.

### Item 9 — DECISION 3b: delegated `Mail.Send`, user-initiated — RULED BY SELECTION
Pick by label: **"In, user-initiated (Recommended)."** Option text: *"Delegated `Mail.Send` on the SPA registration; every send is your click; no app-only sending until the Azure runner is built and separately authorized. The rule 'client-naming notifications go through Graph, never Postmark' is adopted with it."*
**Two things ruled:** the scope (consent his act at build time; user-initiated only), and **the rule** — any notification or message from the app that could name a client or a provider goes through Graph from his own mailbox, never through Postmark (which will not sign a BAA). App-only `Mail.Send` is NOT ruled.

### Item 10 — DECISION 4: Wave 0 acts — RULED, FOUR AUTHORIZED
Picks by label: **"(a) Deploy the two functions"**, **"(b) Outlook defect captures"**, **"(c) CloudLex export rehearsal"**, **"(d) Backup vendor choice"**. What each is, and whose act — §5.

### Item 11 — DECISION 4(e): the Exchange transport-rule ignore list — RULED, DEFERRED
Pick by label: **"Yes, but later."** Option text: *"Authorized in principle; the sender list waits for the mail-intake slice so it is drafted once against real pipelines."* The sender list is his hand (H5).

### Item 12 — DECISION 5: the closed-for-now list — RULED BY SELECTION
Pick by label: **"Adopt the list as put (Recommended)."** The list is §3.

### Item 13 — DECISION 6: travel (`Q-API-13`) — RULED BY SELECTION
Pick by label: **"Yes — package it now (Recommended)."** This packet is the act. **The Microsoft BAA text he pasted goes nowhere.**

---

## §2 — THE `AS-Q4` AMENDMENT, STATED ONCE, FOR THE RECORD

| | Before (RULED 2026-08-31 late, REQ-CAPTURE §14.1) | After (RULED 2026-09-09, items 3–6) |
|---|---|---|
| Where the extracted text lives | in the database (`case_chronology_versions.extracted_text`) | as a text file in the matter's OneDrive folder, per client |
| What the row keeps | version, drop metadata, `readable`, `char_count`, `removed_at`, the text | version, drop metadata, `readable`, `char_count`, `removed_at`, **drive item id, content hash** — no text |
| The original file | not retained | kept beside the text file in OneDrive; point-don't-copy when it already lives in the mirror |
| Removal (D-60) | row `removed_at`; excluded from "newest"; never sent again | the same, **plus** both files moved to a firm-level `_removed` folder outside any matter; pointer kept; deletion his hand |
| Who writes and extracts | the browser | the browser now (delegated `Files.ReadWrite`); the P1 service later, when T3 is authorized |
| "Bytes not retained" | by the app | **by the app's database** |
| File store at gate 7 | unchanged | unchanged |
| One chronology set per client (AS-Q10) | unchanged | unchanged |

**Recorded against the REQ-CAPTURE by an ANNOTATION beneath §14.1 (this packet's insert), never by editing the ruled text.** The built `case_chronology_versions` table is unchanged by this ruling; its `extracted_text` column is now a spec-vs-code gap logged in `docs/spec-feedback.md` (this packet's section) and closed only by a later, separately authorized slice.

---

## §3 — THE CLOSED-FOR-NOW LIST (RULED, item 12)

Closed until the named trigger; each leaves the open queue.

| Integration | Closed until | Note |
|---|---|---|
| SMS / MMS with clients (Twilio-class CPaaS) | `COM-LOOK-4` answered **and** a signed BAA **and** Michael's written finding that photographs must enter the log automatically | until then: the phone plus a manual matter note |
| Teams chat ingest | the paralegal hire | Microsoft's protected-API approval is a further gate |
| Bookings | the paralegal hire | |
| The e-signature API (Docusign-class) | a signed BAA naming the SKU **and** a volume finding | SharePoint eSignature by hand remains available meanwhile |
| LawPay page links | the money-module ruling | routing is by page-per-account (the `mytrust` example); IOLTA handling of the trust page is a merchant-portal fact |
| Live QuickBooks Online connection | the money-module ruling | `Q-QBO-1`–`6` unchanged; sandbox reads may precede it |
| CourtListener in-app | `Q-6` resolved with FLP | design unchanged |
| PACER Case Locator API | a federal matter that needs it | |
| Rules-based calendaring vendors (LawToolBox, CalendarRules) | **closed for good** absent a new ruling | `FC-9`'s holiday calendar is the engine's; its sources are registry work |
| Microsoft 365 Backup as the third copy | **closed for good** absent a new ruling | contrary to `#137`'s Microsoft-independence requirement |
| Address validation / geocoding | **closed for good** absent a new ruling | as `CCS-1` ruled |

---

## §4 — THE SURVIVING OPEN QUESTIONS (full text, QR-1; packet-local IDs — the `Q-API-` series is free repo-wide at `44409ef`)

- **`Q-API-9`.** An eCFR viewer/tripwire in the app for the federal parts the practice cites (FTCA 28 C.F.R. pt. 14; Medicare secondary payer 42 C.F.R. pt. 411; price transparency 45 C.F.R. pt. 180). **Wanted now, later, or is the SOURCING channel in sessions enough?**
- **`Q-API-11`.** NPPES lookup on provider and facility records — CMS's public read API, no key, no PHI; proposes fields and never overwrites. **Yes, no, or later?**
- **`Q-API-12`.** One-way export of directory contacts to Outlook People, tagged by role, Outlook as a view and never an editor (delegated `Contacts.ReadWrite`, a third scope). **Wanted, and if so which roles?**
- **`Q-API-14`** (hands-on). The phone-in-public question (`DA-3`) has a device-control answer — Intune app protection on Outlook, OneDrive and Office — and a first step that costs nothing, a deep link from the case record into the matter's OneDrive folder in the OneDrive mobile app. **What Microsoft 365 SKU is the tenant on, does it include Intune, and do you want the deep link tried in your hands before any in-app document window is built?** `DA-1`/`DA-3` stay open and his.
- **`Q-API-18`** (fact). Microsoft's HIPAA BAA applies by default through the DPA to covered entities and business associates on an agreement incorporating the DPA. **Two facts remain yours: the subscription type (Billing → Your products), and the covered-status determination you left open at item 1.**
- **`Q-API-19`** (fact, H5). ServeManager's API has webhooks for jobs, attempts, affidavits and invoices. **Does your process server use ServeManager, and if so do you want job creation from the app or status webhooks only?**
- **`Q-API-20`** (sequencing, new). The split-store slice — the five tables to a Postgres inside the tenant, the chronology files to OneDrive per §2, the Azure subscription and database it needs — is a drafting act for a design session and then an authorization for a build. **Draft it now, or after the firm-obligations ruling sitting and the post-CCS-1 walk?**
- **`Q-API-3` filing half** (hands-on). Graph PDF conversion may be the **filing** path only after a fidelity test on your master `.docx` (numbering, headers and footers, signature blocks, field-driven text) passes in your hands. Until then the filing PDF is Word's own export.

**Closed by this sitting (born-closed rows for the closed register, full text carried):** `Q-API-1` (item 2), `Q-API-2` (item 7), `Q-API-3` preview half (item 8), `Q-API-4` (a pointer row beside a matter id in Supabase is the design decision 1 selected), `Q-API-5` (item 9), `Q-API-6`, `-7`, `-8`, `-10` (§3), `Q-API-13` (item 13), `Q-API-15` (item 10(c)), `Q-API-16` (item 7, shape iv), `Q-API-17` (item 7, shape i — until the runner exists a late-night e-filing email is read when the mailbox is read).

---

## §5 — WHAT THIS SHEET AUTHORIZES, AND FOR WHOM

**Authorized (item 10), each an act, none of them the queue runner's:**
- **(a) Deploy `statute-fetch` and `legiscan-poller`** per `docs/statute-cache-setup.md`; invoke the poller once by hand and read its JSON log before trusting cron. **A separate Code session with Michael's Supabase sign-in — NOT a queue-runner act** (it touches the live project; QR-6(e)). It is the proving step for the Supabase scheduled path and answers `F-14` and `O-11` with evidence.
- **(b) The two Outlook-defect evidence captures** (the Network tab on a first edit; the badge before any edit) — **Michael's hand, his browser.** The fix follows in its own slice.
- **(c) The CloudLex export rehearsal** — **Michael's hand on the portal**, the export landing on the existing OneDrive tree; then the app's importers, built by a Code session **against a fictional fixture shaped like the export's columns — the real export never enters the repo, a fixture, a packet, or a chat** (the no-real-client-data rule; H5).
- **(d) The backup vendor choice** — a one-page comparison (Backblaze B2 vs AWS S3 / S3 Glacier / AWS Backup) against `#137`'s requirements (BAA; genuinely Microsoft-independent; restorable without Microsoft; monitoring; the $50 ceiling), a design act, put back to him as a choice.

**Authorized in principle, deferred (item 11):** the Exchange transport-rule ignore list, drafted with the mail-intake slice from senders he supplies.

**Ruled and NOT yet actionable (consent or build waits):** `Files.ReadWrite` and `Mail.Send` (delegated) — the consent clicks are his, at the slice that first needs each; the `AS-Q4` amendment — a schema change carried by a later slice (`Q-API-20`); the runner shapes — each build its own authorization.

**NOT authorized by anything here:** any migration; any `src/` change; any Azure subscription or database; any Power Automate flow; any app-only permission; any deployment by the queue runner; the split-store slice itself.

---

## §6 — ROUTED, NOT RULED

- **UNVERIFIED registry candidates, from the challenge, for Michael's verification alone:** 45 C.F.R. § 160.103 (the PHI definition) and § 164.312(b) (audit controls) → `Q-WF-6`'s privacy gap; TDRPC 1.14 and TRDP 17.10 (trust records) → `Q-QBO-6` as the subject home, noted on `Q-STAT-5` as the fifth-registry-file placement question it would raise (both rows exist, both written without backticks), the TDRPC (eff. 3/7/2025) already a clean-authority PDF in `Documents\Knowledge Repo`; Tex. Gov't Code ch. 662 and TRCP 4's "legal holiday" → the deadline engine's `FC-9` holiday calendar. **None characterized here.**
- **A one-line ask, available whichever way `Q-API-1` had gone:** an email to Supabase sales asking whether the HIPAA add-on can attach to a Pro project for a single-user firm. Not chosen as a hold; still cheap.
- **To the firm-obligations track (PROPOSED seeds, not this sheet's to place):** certificate expiry for the confidential-client registration, once it exists; a HIPAA access-review cadence; "backup verified" and "restore tested."
- **The hands-on queue gains:** `Q-API-14` (deep link + Intune before any window); `Q-API-3`'s filing half (the fidelity test).

# CHALLENGE-RESPONSE v1 — Grok 4.6 — as pasted by Michael into the design chat, 2026-09-08 late Central

**Provenance:** the text below is a THIRD PARTY's output (Grok 4.6, xAI), produced against the challenge prompt `prompt-challenge-2026-09-08.md` with memo v1 attached, and pasted by Michael into the Claude design chat late on 2026-09-08 (it is self-stamped 2026-09-09 by the model, whose clock was UTC). It is reproduced here VERBATIM as EVIDENCE so the reconciliation (`challenge-reconciliation-2026-09-09.md`) can be checked line by line. **Nothing in it is verified; nothing in it is a ruling; its vendor claims were re-read at source in the reconciliation and several were refuted there.** Its legal characterizations (45 C.F.R., TDRPC 1.14, TRDP 17.10, Tex. Gov't Code ch. 662) are UNVERIFIED and are not adopted anywhere on the record. Canonical repo path: `docs/record/api-integrations-landscape-2026-09-08/challenge-response-grok-4.6-2026-09-09.md` (EVIDENCE, CAP-2).

---

Re-checking the memo's cited vendor pages and the scheduling path it treats as the runner.

# CHALLENGE-RESPONSE v1 — Grok 4.6 — 2026-09-09

Memo text received. [RECORD]/[PK] premises accepted. Vendor facts re-read 2026-09-09 unless noted.

## A. Verdicts on the memo's load-bearing claims

| # | Memo section | Claim (quoted fragment) | Verdict: HOLDS / WEAK / WRONG / NOT ESTABLISHED | Why, in one or two sentences | Source (URL, date read) |
| --- | --- | --- | --- | --- | --- |
| A-1 | §1.1 Execution | "Supabase Edge Functions, scheduled from Postgres" / "Graph change notifications (webhooks) have somewhere to land and something to answer the 10-second validation handshake" | WRONG as the Graph notification home; HOLDS as a cron poller for class-0 jobs | `pg_cron` + `pg_net` is the documented schedule path. Graph validation is a synchronous POST that must return the token as `text/plain` in **10 seconds**; notification delivery wants a **3-second** 2xx (10 s on retry). Hosted Edge Functions: 256 MB, **2 s CPU/request**, 150 s idle-to-504, **400 s** paid wall clock, documented cold starts. Cron does not keep an isolate warm for inbound Graph POSTs. | https://supabase.com/docs/guides/functions/schedule-functions (2026-09-09); https://supabase.com/docs/guides/functions/limits (2026-09-09); https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks (2026-09-09) |
| A-2 | §1.1 Identity | "second Entra app registration, a confidential client with a certificate … APPLICATION permissions … scoped with Exchange Online RBAC for Applications to Michael's mailbox only" | HOLDS on the mailbox-scope model; WEAK on the certificate | RBAC for Applications is the current mailbox-scope tool and replaces Application Access Policies. A confidential client is required for app-only Graph. A certificate is valid and better than a pasteable secret; for a solo firm it is still a rotation landmine. Workload identity federation or Azure Managed Identity is the better credential. | https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac (2026-09-09) |
| A-3 | §1.1 Identity | "no app-only file permission is proposed anywhere in this memo" | HOLDS | Correct reading of the RBAC page: it scopes Exchange mailboxes, not OneDrive/SharePoint. `Sites.Selected` remains unresearched, as the memo says. | Same RBAC page (2026-09-09) |
| A-4 | §1.1 Custody | "Rotating values … go in a new `integration_credentials` table whose secret columns are held in Supabase Vault" | WEAK | Vault-for-cron-secrets is what Supabase documents. A table of refresh tokens next to case data still rides Postgres backups/PITR and support access. Azure Key Vault + Managed Identity is the rotation-native shelf if the runner moves to Azure. | https://supabase.com/docs/guides/functions/schedule-functions (2026-09-09) |
| A-5 | §1.2 | "Organizations must have a signed BAA with Supabase and have the … HIPAA add-on enabled when dealing with PHI" | HOLDS as vendor policy; WEAK on plan and cost | High Compliance requires PITR (Small compute minimum), SSL enforcement, network restrictions, connection logging. Public pricing: HIPAA add-on is **Team and Enterprise only** (Free/Pro: "Not included"). Team floor is $599/mo; add-on price unpublished; PITR $100/mo per 7-day window; Small compute $15/mo. | https://supabase.com/docs/guides/platform/hipaa-projects (2026-09-09); https://supabase.com/pricing (2026-09-09) |
| A-6 | §1.2 | "the first real drop puts PHI in the database before any mail integration exists" / BAA "is a pre-condition of the first real chronology drop" | HOLDS if extracts stay in Postgres | Matches BUILD-STATE as quoted. A pointer architecture (text stays on P1 / OneDrive) would change the trigger. | 45 CFR 160.103; Supabase HIPAA pages (2026-09-09) |
| A-7 | §1.2(a) | "it is PHI-thin" | WRONG as a HIPAA category; HOLDS that the memo flags the risk | HIPAA has no thin class. Name + health/payment fact in a stored subject or attachment name is PHI under 45 CFR 160.103. The memo itself cites the project's rejection of thinning for the model call. Calling the mail index "thin" and then storing those fields is the same move with a softer label. | 45 CFR 160.103 |
| A-8 | §1.2 default | "(a) until go-live and the first real PI chronology, then (b)" | WEAK | Sequences a compliance spend to a date rather than to a storage decision. If (a) still writes subjects/filenames, (a) already needs the BAA. If pointers-only, (b) can wait forever. | Same |
| A-9 | §2 Rule 4 | Postmark "cannot sign any Business Associate Agreements" / notifications go through Graph `Mail.Send` | HOLDS | Official Postmark support page. Correct design consequence. | https://postmarkapp.com/support/article/1041-is-postmark-hipaa-compliant (2026-09-09) |
| A-10 | §3.1 PDF | `GET /drive/items/{id}/content?format=pdf` | HOLDS that the endpoint exists and lists `docx` | Still documented. Court-grade fidelity (fonts, numbering, headers/footers) is **not established**. "The PDF the engine files is then the same bytes the court gets" overclaims. | https://learn.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_get_content_format (2026-09-09) |
| A-11 | §3.1 Teams SMS | "DO NOT BUILD" | HOLDS | Agree. Do not rediscover it. | Record premise; no Graph SMS surface found 2026-09-09 |
| A-12 | §3.1 `CallRecords.Read.All` | "NOT scopeable by Exchange RBAC … tenant-wide by nature" | HOLDS | Correct. Do not bury this in the first mail consent. | Memo's own correction; Graph permissions reference |
| A-13 | §3.1 Bookings app permissions "reached v1.0" | [SEARCH ONLY] in memo | HOLDS after upgrade | Microsoft 365 Developer Blog, 2022-07-21: Bookings application permissions on v1.0 for a limited entity set. Still optional at solo scale. | https://devblogs.microsoft.com/microsoft365dev/application-permissions-for-bookings-apis-in-microsoft-graph-now-available-on-v1/ (2026-09-09) |
| A-14 | §3.7 SharePoint eSignature | "no API or Graph surface is mentioned on the overview page" | HOLDS as of the overview; still no create-request API found | Setup page exists; Graph has `sharePointESignatureAuditRecord` only. App cannot watch or drive it. | https://learn.microsoft.com/en-us/microsoft-365/documentprocessing/esignature-setup (2026-09-09); https://learn.microsoft.com/en-us/graph/api/resources/security-sharepointesignatureauditrecord (2026-09-09) |
| A-15 | §3.7 Docusign BAA | "is a Business Associate … plan requirement not stated on the page read" | WEAK | BAA path exists and is sales-gated. Public SKU mapping is still contradictory across third-party pages. Do not route HIPAA authorizations until a signed instrument names the SKU. | Docusign public pricing does not settle the SKU (2026-09-09) |
| A-16 | §3.8 Twilio | "must have our Security Edition or Enterprise Edition" | HOLDS | Official HIPAA page. Edition price unpublished. Eligible-product list must be re-read at contract time; 2020 changelog is stale as sole evidence. | https://www.twilio.com/en-us/hipaa (2026-09-09) |
| A-17 | §3.4 ServeManager | REST API, Basic auth, API key as username | HOLDS; incomplete | Confirmed. Memo missed account webhooks (`jobs:updated`, `affidavits:signed`, etc.), which beat polling. Plan restrictions still unstated. | https://www.servemanager.com/api (2026-09-09) |
| A-18 | §3.5 SRFax | "will sign a Business Associate Agreement" and Internet Fax API | WEAK pending official page | An API exists (HTTPS POST; `access_id` + `access_pwd` — account password, not a scoped key; **no webhooks** on the getting-started page). Official BAA sentence was not re-read on srfax.com HIPAA page this pass; third-party reviews assert BAA on healthcare plans. Treat official BAA text as **not established here**. | https://www.srfax.com/developers/internet-fax-api/getting-started/ (2026-09-09) |
| A-19 | §3.10 AWS list | S3 / Glacier / AWS Backup HIPAA-eligible | HOLDS that they appear on the list | Official English page header seen this pass dated **November 17, 2025**; JP mirror dated **2026-04-13**. S3, S3 Glacier, AWS Backup are listed. BAA is via Artifact, not automatic. Memo's "May 22, 2026" stamp is **not confirmed** on the English page today. | https://aws.amazon.com/compliance/hipaa-eligible-services-reference (2026-09-09) |
| A-20 | §3.10 Backblaze BAA | "happy to provide Business Associate Agreements" | HOLDS | Backblaze privacy/compliance pages offer BAAs to covered-entity customers. | https://www.backblaze.com/company/privacy (2026-09-09) |
| A-21 | §3.6 LawPay / 8am | payment-page links and gateway API | HOLDS | Docs exist. Trust-vs-operating routing still must be confirmed in-account before any IOLTA link. | https://developers.8am.com/pagelink/create-payment-page-link.html (2026-09-09) |
| A-22 | §3.3 PACER PCL | REST Case Locator API | HOLDS | Exists. Production billable; QA unbilled. Memo correctly did not open the PDF for fees. | https://pacer.uscourts.gov/help/pacer/pacer-case-locator-pcl-api-user-guide (2026-09-09) |
| A-23 | §3.3 NPPES | live v2.1 query, no key | HOLDS | v1.0/v2.0 retired; use `?version=2.1`. Rate limits/terms still not on a readable static page. | https://npiregistry.cms.hhs.gov/api-page (2026-09-09) |
| A-24 | §3.4 eFileTexas submission | out of scope; EFSP/ECF SOAP | HOLDS | Agree. Envelope-email tracking is the achievable half. | Record premise |
| A-25 | §3.6 Trust accounting | "Not an integration." | HOLDS | Correct boundary. See Texas rule cite in §I. | TDRPC 1.14; TRDP 17.10 |
| A-26 | §0 / §3 CloudLex | origin + OneDrive mirror; exit "his and not on any row" | WEAK as an omission, not a falsehood | CloudLex FAQ claims bulk export (Excel-class structured data, documents, notes, tasks, audit logs), no exit fee. No public CloudLex API found. Migration is a Wave-0 job, not a parenthetical. | https://www.cloudlex.com/faq/ (2026-09-09) |

## B. Weaknesses (W-1, W-2, …), most severe first

**W-1** · CLIENT-HARM · §1.1 · "something to answer the 10-second validation handshake"
Failure: Mail/calendar subscriptions die in under seven days if not renewed; first notification ACK is 3 seconds. A cold Deno isolate plus 2 s CPU budget misses both. Dropped e-file "returned for correction" mail is a missed correction deadline. The memo treats cron + a public HTTPS function as sufficient. Cron invokes outbound. Graph invokes inbound, on Graph's clock, including while no cron job is running.
Fix: PHI-free cron (statute/LegiScan) may stay on Edge Functions. Graph webhooks do not. Choose ALT-1 (no unattended mail) or ALT-2 (Azure Functions/Container Apps + Event Grid/Event Hub, Managed Identity). If staying on Supabase, the function must only echo the token / return 202 and enqueue — and even then cold start can still miss 3 s.
Cost: Azure consumption **not estimated** (solo volume is dollars). Avoids the Team+HIPAA jump.
Source: Graph webhook docs (2026-09-09); Supabase limits (2026-09-09)

**W-2** · CLIENT-HARM · §3.3 · LawToolBox "not recommended" is right; no holiday source is offered instead
Failure: Deadline engine plus "30 days" with no clerk-closure table files late on Texas Independence Day, San Jacinto Day, Friday after Thanksgiving, or a county admin closure. PACER and CourtListener do not supply that.
Fix: Attorney-owned holiday/closure table, seeded from Texas Gov't Code ch. 662 plus W.D. Tex. and the counties he actually files in. Software retrieves; he verifies. Official TAMES machine feed: **not established**.
Cost: Author time.
Source: Texas Gov't Code ch. 662; clerk-closed-day practice note https://www.jdsupra.com/legalnews/in-appellate-courts-seemingly-almost-10907/ (2026-09-09)

**W-3** · CLIENT-HARM · §3.1 PDF · "The PDF the engine files is then the same bytes the court gets."
Failure: Graph conversion is a convenience renderer. Numbered paragraphs, fonts, headers, signature blocks, and TOC fields are not guaranteed. A converted petition is not a filing artifact until a human compares it to Word's own PDF.
Fix: One-click preview via Graph is fine. Filing PDF = desktop/M365 Word export, visually checked. `Q-API-3` should split "preview" from "file."
Cost: $0.
Source: format=pdf endpoint (2026-09-09); fidelity **not established**

**W-4** · COMPLIANCE · §1.2(a) · "it is PHI-thin"
Failure: Storing subject + attachment names + sender for a PI file writes PHI into Postgres, logs, and backups the day the first clinic emails "Jane Roe MRI." The project's own `#130` / REQ-CAPTURE language, which the memo quotes, already rejected content engineering as a substitute for a BAA. Option (a) is therefore either (i) pointers only — message id, received-at, human-assigned matter — or (ii) BAA-now.
Fix: If (a) is the default, drop subject, preview, and filename from the stored row. Classification runs in the function and writes an enum, not the raw subject.
Cost: $0 if pointers-only; stays on Pro $25. Full ingest: Team $599 + unpublished HIPAA add-on + $100 PITR + $15 Small.
Source: 45 CFR 160.103; https://supabase.com/pricing (2026-09-09)

**W-5** · COMPLIANCE · §1.1 · "certificate (not a secret string)"
Failure: A `.pfx` in Edge Function secrets is still a single file that expires. Solo rotation is a calendar reminder and a night of dead subscriptions. Entra Conditional Access on the public SPA does not bind the confidential client unless designed.
Fix: Federated credential or Azure Managed Identity. If a cert is used, Key Vault auto-rotation + 30-day alert. Consent **no** tenant-wide Entra `Mail.Read` application permission; assign Exchange RBAC roles only; prove a second mailbox 403s before go-live.
Cost: Key Vault consumption **not estimated**.
Source: RBAC page (2026-09-09)

**W-6** · COMPLIANCE · §4 Wave 1 · mailbox before backup and before DA-3
Failure: Wave 1 stands up mail intake while `#137` third-copy and phone-in-public (`DA-3`) are unanswered. New PHI copies appear in `/inbox` metadata and on an unmanaged phone with no Intune APP.
Fix: Backup policy + Intune APP + pointer-vs-BAA decision before any `Mail.Read` application consent.
Cost: Intune is in Business Premium; SKU upgrade **not estimated** without current license.
Source: https://learn.microsoft.com/en-us/compliance/regulatory/offering-hipaa-hitech (2026-09-09)

**W-7** · COMPLIANCE · §3.8 · Twilio as the closer for `COM-LOOK-4`
Failure: If the answer to `COM-LOOK-4` is "the cell," a CPaaS with unpublished Edition pricing, A2P 10DLC, and PHI-class bodies is a new vendor in the path for a problem that logging by hand already solves. Templated automation is already forbidden.
Fix: Default remains phone + manual matter note. Twilio only after Edition quote, signed BAA, eligible-product confirmation, and a written finding that photos must land in the log automatically.
Cost: Editions **not published**.
Source: https://www.twilio.com/en-us/hipaa (2026-09-09)

**W-8** · WASTED-EFFORT · §3.1 OneDrive window · "a per-folder PHI mark that requires a second tap"
Failure: Custom Graph folder browser duplicates OneDrive mobile, fights paging/thumbnails/offline, and does not wipe corporate data off a lost phone. Second-tap is theater next to Intune APP (PIN, block copy-out, selective wipe).
Fix: Deep link to the matter folder in OneDrive/Office mobile. APP on Outlook, OneDrive, Office. Build the in-app window only if APP + deep link fails a hands-on test Michael records.
Cost: $0 if Premium already includes Intune.

**W-9** · WASTED-EFFORT · CloudLex exit not designed
Failure: App becomes "the" case manager while CloudLex remains origin. Dual entry. Missed records.
Fix: Wave 0 export rehearsal: CloudLex FAQ export paths (contacts, matters, notes, documents). Land files on the existing OneDrive tree. No API to design.
Cost: Attorney time. CloudLex claims no exit fee.
Source: https://www.cloudlex.com/faq/ (2026-09-09)

**W-10** · COST · §4 Wave 0 item 3 + Wave 2 e-sign/Twilio before volume
Failure: Graph `Files.ReadWrite` on the SPA "to close a finding" expands the only delegated registration before DA-2 is ruled. Docusign API scaffolding before a BAA and a volume need.
Fix: Wave 0 = deploy two PHI-free functions + Outlook defect captures + CloudLex export drill + backup decision. PDF write and e-sign API wait for DA-2 / `Q-API-6`.

## C. Better solutions (ALT-1, ALT-2, …)

**ALT-1 — Two identities, runner deferred**
Replaces: answering `Q-WF-4` with a live confidential client on day one.
Why: Memo §5 already says most §3 value is delegated and tab-bound. Calendar fix, PDF preview, on-demand mail, OneDrive deep link, NPPES, statute deploy need no app-only principal.
Cost: $0.
Requires: Accept that unattended mail/QBO rotation does not exist yet.
Cannot: overnight envelope tracking.

**ALT-2 — Azure Functions or Container Apps + Managed Identity + Key Vault; Graph → Event Grid/Event Hub**
Replaces: Edge Functions as Graph listener and Vault table as token shelf.
Why: Same tenant and Microsoft Product Terms BAA as the mailbox. No client secret. Event Hub skips validation handshake. Execution measured in minutes, not 2 s CPU.
Cost: consumption **not estimated**.
Requires: Azure subscription under the same customer agreement; Conditional Access on the workload.
Cannot: satisfy "restore must not route through Microsoft" if this subscription is also the backup target.

**ALT-3 — Power Automate / Logic Apps for WF-2/WF-6/WF-8 classify-and-stage**
Replaces: custom ignore/dedupe runner for known-sender pipelines.
Why: In-scope for M365/Power Automate BAA. No Deno. Memo never considered it.
Cost: included on many SKUs; premium connectors **not estimated**.
Requires: Environment DLP so flows cannot POST PHI to Postmark. Attorney owns the flow.
Cannot: GPU STT, local chronology, or complex idempotent legal writes.

**ALT-4 — Pointer architecture (PHI stays in M365 + P1)**
Replaces: default flip to §1.2(b) at first chronology.
Why: Chronology text already designed to run on P1; OneDrive already holds the files. Supabase keeps matter ids, `driveItemId`, `messageId`, amounts, NPIs. Microsoft BAA already covers Exchange/OneDrive/SharePoint/Intune/Purview.
Cost: $0 extra vs Team+add-on+PITR.
Requires: Discipline. One pasted SOAP note into a text column undoes it.
Cannot: full-text search of narratives in Postgres.

**ALT-5 — P1 as the only PHI worker; laptop sleep accepted for backup verification only**
Replaces: runner as fax/SMS/chronology host.
Why: Matches CLAUDE.md. Memo already says P1 sleep is wrong for unattended watchers and tolerable for backup. Keep that split.
Cost: existing hardware.
Cannot: answer Graph at 02:00.

## D. Additions the memo omitted (ADD-1, ADD-2, …)

**ADD-1** · Microsoft Purview retention / eDiscovery on mailbox and OneDrive · PI/criminal file defensibility · Purview · may carry PHI → M365 BAA · M

**ADD-2** · Exchange transport rules as the hard-ignore layer that actually runs when the app is down · Stops vendor spam becoming staging events · Exchange admin · may carry PHI in transit → M365 BAA · S

**ADD-3** · Intune App Protection on phone Outlook/OneDrive/Office · `DA-3` is a device-control question, not a second-tap UI · Intune · may carry PHI → M365 BAA · S

**ADD-4** · Graph change notifications on the matter OneDrive folder (~30 day lifetime) · New medical PDFs without a mail body store · subscription resource docs (2026-09-09) · filenames may be PHI · M — same runner problem as W-1

**ADD-5** · Entra as Supabase IdP at first hire, not "gate 2 someday" · One Conditional Access plane · Supabase "Login with Azure" still [SEARCH ONLY] in memo; existence is well-known but page not re-read here · never · S

**ADD-6** · In-app audit log of who opened which pointer/chronology · 45 CFR 164.312(b) · app table · fact of access may be PHI · M

**ADD-7** · Court-holiday / clerk-closure table · See W-2 · no official Texas API established · never if only dates · S

**ADD-8** · CloudLex export runbook · See W-9 · https://www.cloudlex.com/faq/ (2026-09-09); Clio publishes a click-path recipe https://help.clio.com/hc/en-us/articles/10263045235867-Migrating-Data-From-Your-Current-Software-C-F (2026-09-09) · will carry PHI · M

**ADD-9** · ServeManager webhooks instead of poll · Already on their API page · https://www.servemanager.com/api (2026-09-09) · class 1 · S

**ADD-10** · Microsoft 365 Backup vs B2 as the third copy · May make "not Azure" the only reason to leave Microsoft · M365 Backup price **not estimated** · PHI → M365 BAA · S to decide the `#137` "Microsoft-independent" rule vs operational simplicity

**ADD-11** · eCFR official API as class-0 fetch, agreed if wanted · api.ecfr.gov is the official surface (not re-fetched end-to-end; treat path as standard) · never · S

**ADD-12** · HIPAA Security Rule access review cadence as a firm obligation next to backup-verified · Same FO module · n/a · S

## E. Sequencing critique

Wave 0 as written mixes a good proving step with premature Graph writes.

**Wave 0 — prove the platform, copy the origin, decide PHI location.**
Decision: pointer architecture vs Supabase High Compliance. Acts: deploy `statute-fetch` and `legiscan-poller`; Outlook defect captures; CloudLex export rehearsal onto the existing OneDrive tree; backup vendor + restore-drill owner. No new Graph scope.

**Wave 0b — device and mailbox hygiene.**
Decision: Intune APP on or off. Exchange transport-rule ignore list drafted from real senders (H5). Still no app-only principal.

**Wave 1 — delegated-only value.**
Decision: `Q-API-3` split into preview vs file; `Q-API-11` NPPES yes/no; `Q-API-5` Graph send-as-Michael for user-initiated only. No runner.

**Wave 2 — money display.**
Decision: `Q-QBO-1` and `Q-API-7`. Sandbox QBO. LawPay links only after trust-routing confirmed. App never writes IOLTA.

**Wave 3 — unattended identity.**
Decision: ALT-1 remains, or ALT-2/ALT-3. Only then WF-2 substrate. SMS, fax API, Docusign API, `CallRecords`, CourtListener wait on `COM-LOOK-4`, BAAs, `Q-6`, and a hire or a written volume finding.

Do not sign a Supabase HIPAA add-on "in case." Do not put `Files.ReadWrite` on the SPA to close a spec-feedback item.

## F. Monthly cost sketch per wave

| item | monthly figure or "not estimated" | source (URL, date) |
| --- | --- | --- |
| Supabase Pro | $25 | https://supabase.com/pricing (2026-09-09) |
| Supabase Team (HIPAA-capable floor) | $599 | https://supabase.com/pricing (2026-09-09) |
| Supabase HIPAA add-on | not estimated | same page: "Contact sales" / paid add-on, no public number |
| PITR (High Compliance) | $100 per 7-day window | https://supabase.com/pricing (2026-09-09) |
| Small compute (PITR prerequisite) | $15 | https://supabase.com/pricing (2026-09-09) |
| M365 commercial BAA | $0 extra on paid commercial plans | https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us (2026-09-09) |
| Azure Functions + Key Vault at solo volume | not estimated | consumption |
| Power Automate premium | not estimated | SKU-dependent |
| SharePoint eSignature per-transaction | not estimated | pay-as-you-go; rate not captured |
| Docusign HIPAA SKU | not estimated | sales-gated |
| Adobe Acrobat Sign BAA path | not estimated | https://www.adobe.com/trust/compliance/hipaa-ready.html (2026-09-09) |
| Twilio Security/Enterprise Edition | not estimated | https://www.twilio.com/en-us/editions (2026-09-09) |
| LawPay | existing processor fees | 8am docs (2026-09-09) |
| Backblaze B2 ~7 GB | not estimated precisely; under the $50 ceiling at this size | BAA: https://www.backblaze.com/company/privacy (2026-09-09) |
| PACER PCL production | PACER fee schedule | https://pacer.uscourts.gov/help/pacer/pacer-case-locator-pcl-api-user-guide (2026-09-09) |
| NPPES | $0 | https://npiregistry.cms.hhs.gov/api-page (2026-09-09) |
| Postmark | existing auth-only | https://postmarkapp.com/support/article/1041-is-postmark-hipaa-compliant (2026-09-09) |
| SRFax healthcare plan | not estimated on official page; third-party quotes exist and are not used as prices | official BAA page not established this pass |

Pointer-architecture Waves 0–2: existing Pro $25 + existing M365 + existing LawPay + object storage well under $50.
Memo's §1.2(b) path: ≥ $714/mo before the unpublished HIPAA add-on, before any webhook works.

## G. Risks (client harm / compliance / wasted effort — three each)

**Client harm**
1. Missed correction/limitations deadline because Graph notifications hit a cold Edge Function or a lapsed 7-day subscription. Memo guards with "renew on the cadence the WF spec records" but puts that cadence on the wrong host. Guard: ALT-1 until ALT-2; Outlook rules as a human backup tickler.
2. Late filing from a holiday-blind deadline engine. Memo rejects LawToolBox and offers no replacement table. Guard: ADD-7.
3. Wrong-party disclosure via `Mail.Send` application permission or a templated SMS. Memo forbids templated client mail — keep it. Guard: no app-only `Mail.Send` in Wave 1; `Mail.Send` application role never consented tenant-wide; SMS off until `COM-LOOK-4` + BAA.

**Compliance**
1. PHI in Postgres subjects/filenames/"thin" index, or chronology text, without Team+BAA+High Compliance. Memo sees the chronology trigger and then invents PHI-thin. Guard: pointers or BAA, not a third category.
2. Credential: certificate in function secrets, or QBO refresh token in a table readable if RLS is wrong. Memo's RLS-deny-authenticated is necessary, not sufficient. Guard: ALT-2 Key Vault, or no rotating token until the runner exists.
3. Tenant-wide permission: `CallRecords.Read.All` or an Entra-consented `Mail.Read` that RBAC was supposed to replace. Memo warns; the failure is consenting first. Guard: RBAC assignment and a 403 proof before production traffic.

**Wasted effort**
1. In-app OneDrive window vs OneDrive mobile + Intune. Guard: deep link first.
2. Custom Edge webhook substrate that cannot meet Graph clocks. Guard: prove cron on statute/LegiScan only.
3. Docusign/Twilio/SRFax API work before vendor-on-the-ground facts (`COM-LOOK-4`, process-server product, signed BAA). Guard: Wave 3.

## H. Questions the attorney must answer before any of this is built

1. Do chronology extracts and mail subjects/filenames ever land in Supabase, or only `messageId`/`driveItemId` pointers plus P1-local text?
2. Is a missed 2 a.m. EFSP email acceptable until a paralegal or an Azure runner exists?
3. What Microsoft 365 SKU is on the tenant, and is Intune APP available without an upgrade?
4. Is Microsoft's HIPAA BAA actually in force on this tenant (availability ≠ execution)?
5. Must document disaster restore work with Microsoft unreachable, or is M365 Backup enough?
6. Which certified EFSP sends the status mail, and will you harvest those templates by hand?
7. Is there a signed Docusign/Adobe/Dropbox Sign BAA on a named SKU today?
8. Is client texting happening today, on which number, and must photos enter the log automatically?
9. May the app show QBO operating balances and emit LawPay links, with zero trust writes?
10. Does the process server use ServeManager, and if so do you want job-create or status-webhooks only?

## I. Sources

https://supabase.com/docs/guides/functions/limits (2026-09-09)
https://supabase.com/docs/guides/functions/schedule-functions (2026-09-09)
https://supabase.com/docs/guides/platform/hipaa-projects (2026-09-09)
https://supabase.com/docs/guides/security/hipaa-compliance (2026-09-09)
https://supabase.com/pricing (2026-09-09)
https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks (2026-09-09)
https://learn.microsoft.com/en-us/graph/api/resources/subscription (2026-09-09)
https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac (2026-09-09)
https://learn.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_get_content_format (2026-09-09)
https://learn.microsoft.com/en-us/microsoft-365/documentprocessing/esignature-setup (2026-09-09)
https://learn.microsoft.com/en-us/graph/api/resources/security-sharepointesignatureauditrecord (2026-09-09)
https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us (2026-09-09)
https://learn.microsoft.com/en-us/compliance/regulatory/offering-hipaa-hitech (2026-09-09)
https://devblogs.microsoft.com/microsoft365dev/application-permissions-for-bookings-apis-in-microsoft-graph-now-available-on-v1/ (2026-09-09)
https://www.twilio.com/en-us/hipaa (2026-09-09)
https://www.twilio.com/en-us/editions (2026-09-09)
https://postmarkapp.com/support/article/1041-is-postmark-hipaa-compliant (2026-09-09)
https://www.backblaze.com/company/privacy (2026-09-09)
https://aws.amazon.com/compliance/hipaa-eligible-services-reference (2026-09-09)
https://www.cloudlex.com/faq/ (2026-09-09)
https://help.clio.com/hc/en-us/articles/10263045235867-Migrating-Data-From-Your-Current-Software-C-F (2026-09-09)
https://developers.8am.com/pagelink/create-payment-page-link.html (2026-09-09)
https://www.servemanager.com/api (2026-09-09)
https://www.srfax.com/developers/internet-fax-api/getting-started/ (2026-09-09)
https://pacer.uscourts.gov/help/pacer/pacer-case-locator-pcl-api-user-guide (2026-09-09)
https://npiregistry.cms.hhs.gov/api-page (2026-09-09)
https://www.legalethicstexas.com/resources/rules/texas-disciplinary-rules-of-professional-conduct/safekeeping-property/ (2026-09-09)
https://www.texasbarpractice.com/law-practice-management/lawyers-guide-client-trust-accounts-2024/ (read 2026-09-09)
https://www.adobe.com/trust/compliance/hipaa-ready.html (2026-09-09)
https://www.jdsupra.com/legalnews/in-appellate-courts-seemingly-almost-10907/ (2026-09-09)

Texas trust boundary: TDRPC 1.14(a)–(c) — separate trust/escrow account; complete records preserved five years after representation ends; prompt notify, deliver, and account; disputed funds stay segregated; disbursement only to persons entitled by the representation or by law. TRDP 17.10 (as quoted in the 2024 TexasBarPractice guide) lists the required record types (checkbooks, canceled checks, stubs, registers, statements, deposit slips, ledgers, journals, closing statements, accountings). The app may display a QBO-sourced operating figure or a LawPay operating/trust *link after routing is confirmed in the merchant account*. The app must never be the system that deposits to IOLTA, allocates settlement funds, or marks a trust disbursement complete. QBO does not enforce the distinction; naming is not a control.

Agree-and-move lines: client mail stays human-routed; Postmark stays auth-only; no app-only file permission; eFileTexas submission stays with an EFSP; Teams SMS stays unbuilt; CourtListener stays gated on `Q-6`; trust stays out of the app; inbound events stage rather than auto-file; `external_refs` before outbound writes is the right substrate; `CallRecords` is tenant-wide and hire-gated; one-scope-at-a-time consent is the right Graph discipline.

END OF CHALLENGE-RESPONSE

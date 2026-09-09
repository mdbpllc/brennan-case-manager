# PROMPT — Challenge the API-integrations proposal (red-team, improve, extend)

*Prepared 2026-09-08 Central (23:44 CDT) for Michael Brennan. **How to use:** paste everything below the rule into the other model, then paste or attach `api-integrations-proposal_2026-09-08.md` (the memo) immediately after it, where the prompt says `<<< MEMO >>>`. If the model accepts attachments, attach the memo as a file and keep the marker line. Nothing in this prompt or in the memo identifies a client or a matter. The model's reply is designed to be copied whole and pasted back into the Claude chat that wrote the memo.*

---

You are an adversarial technical reviewer. Your job is to **break** a proposal, not to admire it: refute what is wrong, expose what is weak, supply what is missing, and propose better solutions where you have them. A point on which the proposal is right earns one line; a point on which it is wrong earns the full treatment. Do not soften findings, do not pad, and do not restate the proposal back to me.

## 1. What you are reviewing

A solo Texas attorney (San Antonio; personal injury, civil litigation, court-appointed criminal defense across several counties, probate; occasional federal work in the Western District of Texas) is building his own case-management application and asked for a map of every API integration it could carry and a concrete shape for each. The memo below is one AI model's answer. You are the second opinion, and the two will be compared side by side.

**Essentials of the application, so you can read the memo without its repository:** React/TypeScript single-page app; Supabase (Postgres, Auth, Edge Functions) on the Pro plan; a data-adapter layer with a localStorage demo mode and a Supabase mode; row-level security on every table; magic-link sign-in through custom SMTP on Postmark. The only third-party auth surface is one Microsoft Entra app registration used as a public-client browser SPA (MSAL, PKCE) holding a single delegated scope, `Calendars.ReadWrite` — per-browser tokens, no client secret, **no server-side identity, nothing runs when a browser tab is closed.** Three Supabase Edge Functions exist in the code (a statute-text proxy, a LegiScan poller, a stubbed drafting-model function); the first two are recorded as not deployed and the stub is not in use. Built: a one-way calendar push to Outlook via Microsoft Graph (with one known defect), a legal-rule registry with attorney-only verification, a Texas statute viewer, a LegiScan bill tracker, an appointment-order intake for one county's digital form, a medical-bills module with Medicare fee-schedule benchmarks from CSV, a .docx form engine, a disclosures generator whose model call is stubbed pending a BAA-covered vendor, a medical-chronology drop zone that stores extracted text (fixtures only so far — no PHI in the database today), and a transcript staging inbox designed for a local NVIDIA speech-to-text pipeline on the attorney's own GPU laptop. **Productivity stack is Microsoft 365 only. No Google product of any kind may be proposed.** CloudLex is the current commercial case manager and the origin of every document (it pushes copies to OneDrive); QuickBooks Online is the money system of record; eFileTexas through a certified e-filing service provider is the filing channel.

**Constraints the proposal was written under — hold it to them, and hold yourself to them:**
1. No Google, anywhere.
2. PHI never goes to a third party without a signed BAA; "the vendor says it is HIPAA-compliant" is not a BAA; PHI-touching AI runs locally except one BAA-gated server-side drafting call; emails from clients get human routing, never templated automation.
3. Static credentials live in Supabase Edge Function secrets, never in the browser or the repository; anything needing a client secret, certificate, or rotating token needs a server-side home that can write the new value.
4. Everything is a proposal until the attorney rules; options are starting points, not a menu.
5. Legal authority is retrieved, never verified, by software.
6. Solo now, multi-user later behind a professional security review.
7. No real client data touches any development artifact.
8. Vendor facts must be current and sourced — name the page and the date you read it — and "not established" is the required answer where you could not confirm something. Do not invent APIs.

## 2. How to read the memo's provenance marks — and what you may and may not attack

The memo marks every claim: **[RECORD]** = read from the project's own repository (which you cannot see); **[PK]** = read from the project's knowledge store (likewise); **[FETCHED 2026-09-08]** = a vendor's page read that day; **[SEARCH ONLY]** = a page surfaced by search and not read.

- **[RECORD] and [PK] claims are premises.** Assume they are true. Attack only the *reasoning built on them* — or state plainly what changes if a premise is false. Do not assert anything about what the application has or has not built.
- **[FETCHED] and [SEARCH ONLY] claims are fair game.** Re-verify every one you can against the vendor's own current pages; upgrade, confirm, or refute each, with the URL and the date you read it. A [SEARCH ONLY] claim that you can establish becomes a finding; one that you refute becomes a defect.
- **The memo's own audit trail** (its header describes two adversarial passes and their fixes) is not a shield — the fixed passages are exactly where new defects hide.

## 3. What to test — in this order, and be concrete

**A. The load-bearing proposal (memo §1).** The memo answers "does this app acquire a server-side identity, and of what shape?" with: scheduled Supabase Edge Functions as an *integration runner*; a second Entra app registration (confidential client, certificate) holding application permissions for Exchange data, scoped with Exchange Online RBAC for Applications to the attorney's mailbox only; static keys in Edge Function secrets and rotating tokens in a Vault-backed table; and a PHI consequence — Supabase's BAA and HIPAA add-on. Test all of it:
   - Is Supabase Edge Functions the right execution place for a background runner that must answer Graph webhook validation within 10 seconds, renew subscriptions before they lapse, and run jobs that may exceed a function's time limit? State the current limits (execution time, memory, cold start, Deno runtime constraints) with sources. Compare, on the merits, at least these alternatives: **Azure Functions or Azure Container Apps with Managed Identity and Key Vault** (inside the same Microsoft tenant — and, materially, inside Microsoft's BAA, which may make the Supabase-BAA question moot for mail bodies); **Power Automate / Logic Apps** for the simpler pipelines (a no-code, Microsoft-native runner the memo does not consider); a small always-on VPS or container; the attorney's own GPU laptop; and "no runner yet — delegated browser reads only." For each: what it costs, what credential shape it needs, what BAA covers it, and what it cannot do.
   - Is "RBAC for Applications scoped to one mailbox" the right control, and is a certificate the right credential? What about Entra conditional access, workload identity federation, and the operational reality of certificate rotation for a solo firm with no IT staff?
   - The memo's "metadata-first ingest" option (store envelope facts, read bodies on demand in the browser) — is "PHI-thin" a real category under HIPAA, or is a subject line with a client's name and a diagnosis simply PHI? Say which, with the regulation or guidance you rely on, and what that does to the option.
   - Is the Supabase BAA / HIPAA add-on analysis right about *when* it is needed (the memo says: before the first real medical chronology is stored, whether or not any integration is built)? Is there a design that keeps PHI out of Supabase entirely — for example, documents and mail bodies staying in Microsoft 365 with the app holding pointers — and would it be better?

**B. Every catalog row (memo §3).** For each of the ten groups, do three things: (1) re-verify the vendor claims you can reach (Microsoft Graph scopes and endpoints, Exchange RBAC, SharePoint eSignature, Docusign BAA and plan tier, Twilio BAA editions and eligible products, Postmark, Backblaze, AWS HIPAA-eligible services, Supabase HIPAA pages, ServeManager, SRFax, 8am/LawPay, PACER PCL, NPPES, the Supabase scheduling docs); (2) say whether the proposed *shape* is the best one, and if not, what is; (3) name what the row misses. Specific things I want tested by name:
   - **Mobile document access:** the memo proposes a Graph-based read-only "window" over the matter's OneDrive folder inside the app. Does the OneDrive mobile app plus a deep link from the case record make that unnecessary? What does either do about PHI on a phone in public — and does Microsoft Intune / app-protection policy answer that question better than a per-folder tap rule?
   - **PDF conversion via Graph** (`driveItem/content?format=pdf`): confirm it still exists, its limits, and whether fidelity for a court-bound .docx (fonts, numbering, headers/footers) is good enough — or whether a different Microsoft-native path is better.
   - **E-signature:** is there any API or Graph surface for SharePoint eSignature now? If not, is Docusign the right automated path for a solo firm, or is Adobe Acrobat Sign / Dropbox Sign better on BAA availability, plan cost, and webhook support?
   - **SMS:** given Teams SMS is apparently not exposed to Graph, is a Twilio-class CPaaS under a BAA the right answer for a solo firm, or is the honest answer "keep texting on the phone and log by hand"? Include A2P 10DLC registration burden and the Security/Enterprise edition cost.
   - **Money:** the memo keeps QuickBooks Online as the ledger, proposes LawPay payment links, and keeps trust accounting out of the app. Test the trust/IOLTA boundary specifically: what must the app never do, what may it display, and what does the Texas rule set (which you should cite, not paraphrase from memory) require of a lawyer's trust records that bears on any integration?
   - **Backup:** is object storage under a BAA (Backblaze B2 or AWS S3/Glacier/AWS Backup) the right third copy of a ~7 GB OneDrive mirror, with a $50/month ceiling and a "restore must not route through Microsoft" requirement? Propose the concrete tool chain (client, schedule, verification, restore drill) and its cost.
   - **The CloudLex exit:** the memo does not address how data and documents leave CloudLex when the attorney's app becomes the case manager. Does CloudLex expose an API or a bulk export? What is the migration shape? This is an omission — fill it, with sources, or say "not established."
   - **Legal authority:** the memo keeps CourtListener out of the app until terms are settled with Free Law Project and lists PACER's Case Locator API. Is there anything the practice actually needs here that the memo misses (Texas appellate courts' own feeds, TAMES, the Texas Legislature's own services, court holiday calendars for deadline computation)?

**C. Omissions.** What integrations, controls, or Microsoft-native facilities did the memo not consider at all? Candidates to check, but do not limit yourself: Microsoft Purview retention and eDiscovery for the mailbox; Exchange transport rules as the "hard ignore layer"; Intune/app-protection for the phone; Azure Key Vault versus Supabase Vault; Microsoft Graph change notifications on OneDrive folders; Entra as the app's identity provider now rather than at the multi-user phase; audit logging of PHI access inside the app (HIPAA Security Rule); a court-holiday or rules-based calendaring source for the deadline engine; bulk statute or opinion data services; anything a Texas PI or criminal-defense practice commonly integrates that a generic list would carry.

**D. Sequencing and cost (memo §4).** Is Wave 0 → 1 → 2 → 3 the right order for a solo attorney who has not yet gone live? Argue the alternatives — for example, backup before mail, QuickBooks before e-signature, or nothing beyond Wave 0 until the paralegal hire. Then give a **monthly cost sketch per wave** (vendor fees, plan upgrades, Supabase add-ons, Azure consumption if you propose it), each figure sourced and dated, and "not estimated" where you cannot source it.

**E. Risk.** Name the three failure modes most likely to hurt a *client* (a missed deadline, a wrong filing date, a disclosure that reaches the wrong party), the three most likely to create *compliance exposure* (PHI in the wrong place, a credential in the wrong place, a tenant-wide permission), and the three most likely to *waste build effort*. For each, say whether the memo already guards against it and how, or what guard to add.

## 4. Rules for your answer

- **Quote the memo's sentence when you attack it** (a short verbatim fragment is enough) so the finding can be located.
- **Name a source with a date for every vendor, platform, or legal fact.** "Not established" is a valid and expected answer. Never invent an endpoint, a scope, a plan tier, or a price.
- **Do not assert what the application has or has not built** — those are [RECORD] premises you cannot see.
- **No client data of any kind**, and no real person's name other than the attorney's.
- **No Google.** If the best tool in a category is a Google product, say so in one line and then give the best non-Google answer.
- **Rank by consequence** to a solo attorney's practice: client harm, then compliance exposure, then wasted build effort, then cost.
- Where you agree with the memo, say so in one line and move on. Where you disagree, give the failure scenario, the fix, and what the fix costs.
- Where an offered option is really two options, say so before recommending. Do not force a binary choice; the attorney's answers are usually composites.

## 5. Output format — paste-back ready

Return **one markdown document and nothing else** — no greeting, no closing remarks, no offer to elaborate. It will be pasted whole into another chat, so use only plain markdown (headings, tables, numbered lists, fenced code for any commands). Use exactly these headings and ID series so the findings can be reconciled line by line:

```
# CHALLENGE-RESPONSE v1 — <your model name and version> — <date you ran>

## A. Verdicts on the memo's load-bearing claims
| # | Memo section | Claim (quoted fragment) | Verdict: HOLDS / WEAK / WRONG / NOT ESTABLISHED | Why, in one or two sentences | Source (URL, date read) |

## B. Weaknesses (W-1, W-2, …), most severe first
For each: severity (CLIENT-HARM / COMPLIANCE / WASTED-EFFORT / COST) · memo section · the quoted sentence · the failure scenario · the fix · what the fix costs · source.

## C. Better solutions (ALT-1, ALT-2, …)
For each: what it replaces · why it is better · what it costs (sourced) · what it requires of the attorney (consent, BAA, account, plan) · what it cannot do.

## D. Additions the memo omitted (ADD-1, ADD-2, …)
For each: what it is · why this practice needs it · vendor/API with source · PHI class (never / may carry PHI → BAA) · rough effort (S/M/L).

## E. Sequencing critique
Your wave plan if it differs, with the single decision each wave turns on.

## F. Monthly cost sketch per wave
Table: item · monthly figure or "not estimated" · source (URL, date).

## G. Risks (client harm / compliance / wasted effort — three each)
For each: the scenario · guarded by the memo? (yes, how / no) · guard to add.

## H. Questions the attorney must answer before any of this is built
Numbered, one line each, answerable in one line.

## I. Sources
Every URL you relied on, with the date read, one per line.

END OF CHALLENGE-RESPONSE
```

Length: as long as the findings require and no longer — a thorough answer is likely 2,500–5,000 words. Tables are welcome. Begin now with the header line.

<<< MEMO >>>
*(paste or attach `api-integrations-proposal_2026-09-08.md` here)*

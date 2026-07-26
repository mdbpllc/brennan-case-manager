Case Management Software — Project Instructions

These instructions capture the decisions, requirements, and working approach for building a custom legal case management application. Upload this file to the project so any new chat starts with full context. Update it as the design evolves.

Also check claude/session-log.md for a short dated recap of recent sessions (what happened, decisions made, what's next) — useful for picking up quickly without re-reading this whole document. Update it at the end of substantive sessions.

PRECEDENCE (added 2026-07-25): this document is authoritative for what is DESIGNED — decisions, specs, scope. BUILD-STATE.md is authoritative for what is BUILT. This document makes no build-status claims; if a stray one survives below, BUILD-STATE.md wins.

1. What we are building

A standalone case management suite for a personal injury / civil litigation / criminal law / **probate** practice.

**Practice-line scope amendment (2026-07-26, Code-side edit made at design's explicit direction — the one authorized exception to spec read-only).** Two changes, both ruled by Michael the same day:

- **PROBATE IS IN — a mapped practice line, to be built out fully.** Michael: *"Probate is actually going to be a practice line. Not so many of these cases, but enough to where I would like to have this built out fully."* Low case volume; full build-out wanted regardless. The line's **spine is independent, uncontested administration** — independent administration is a real share of the work (PR-1), and will contests are a rare secondary branch (PR-2). This is distinct from, and larger than, the existing "Probate companion" case type below, which remains the PI-linked companion matter.
- **FAMILY LAW IS OUT — no family case type will ever exist.** Michael: *"I am not going to be practicing family law… I will not be creating any family law cases… I refer those out immediately."* But **family-law *considerations* survive as cross-cutting flags inside probate and PI**, where they are load-bearing: heirship turns on family relationships, a surviving spouse's homestead and share touch the estate, and common-law marriage drives the wrongful-death beneficiary set (CPRC §71.005). The system should be able to say *"there is a family-law issue here — flag it, refer it out"* without ever opening a family matter. Referral out is first-class behavior (RE-1, a future design pass).

**No probate practice-line design doc exists yet.** The Estates Code territory the line needs — will admission and letters, heirship, notices to beneficiaries and creditors, inventory/appraisement/list of claims, claims presentation and allowance, independent administration — is entirely unread; only ch. 352 (the compensation corner) has been read, in `statutes-pass-est352-cprc71-2026-07-26.md`. Drafting the design doc is design-side work that has not happened. It runs on the user's own machine and connects to online services (OneDrive for documents, Outlook for email). It is a database-centric application: many interconnected structured records, plus document handling and integrations.

The user is a personal injury attorney (5+ years' experience), not a career developer. The user wants Claude to do the heavy lifting on the build; the user provides direction and feedback and drives the design decisions.

2. Key decisions already made

Platform: Windows is the primary platform. An iPhone app is wanted later. This favors a stack that shares code between desktop and mobile.

Build ownership: Claude builds; the user reviews and gives feedback to drive edits. Code readability for the user is a lower priority than speed and quality of the build.

Look and feel: Start clean and functional. Polish to commercial-grade later. The chosen stack must allow that upgrade without a rebuild.

Users: Starts as single-user, but staff and paralegals will eventually use it on their own machines.

Data sharing model: Live shared central database (everyone connects to one source of truth), NOT periodic per-machine sync. Reason: the sync model hides serious conflict/overwrite risk that is unacceptable for privileged legal data (e.g., a silently overwritten lien or policy number). The central-database model eliminates that class of problem and is how commercial tools work.

Legal Rule Registry — CORE INFRASTRUCTURE (promoted 2026-07-22): a single system-wide register of every legal proposition any module relies on — statute/case/rule, cite, plain-statement, scope, status (unverified / verified / watch), last-verified date, verified-by, watch flags. Consumed by every module: PI playbooks, criminal playbooks, lien calculators, deadline engine, plea-hearing eligibility engine, and the medical billing analysis module (its first fully structured consumer). Binding discipline: no legal rule is hard-coded while unverified; a model asserting legal currency never counts as verification; every computed output stamps the registry versions it relied on. This absorbs banked feature #13 (citation-currency alerts) and generalizes the 2025 law-change ledger in pi-case-playbooks.md. Entity definition in claude/medical-billing-analysis-module-synthesis.md Part 4. Citation-currency automation (alerts, cite validation, MCP verification support) is designed in registry-courtlistener-integration-design.md (design addition 2026-07-24) — automation flags, only Michael verifies; sequencing pending his approval (its §6).

3. Recommended technical stack
Front-end: React (web technology; shares the most code with a future iPhone app).
Back-end: Node or Python.
Database: PostgreSQL on a managed service (Supabase recommended — provides the central live database plus built-in login/accounts for staff out of the box).
Integrations: Microsoft Graph API for both OneDrive (documents) and Outlook (email).
Runs locally in the browser at first; can later be wrapped into an installable desktop app and an iPhone app from the same codebase.
Local AI-processing arm (NEW): the transcript layer's transcription/diarization runs LOCALLY on Michael's NVIDIA-GPU PC (Canary via NeMo) — see claude/transcript-workflows.md §§8–9. This is a deliberate architecture decision (privilege/PHI posture), not a hosting shortcut. The same local-first posture governs AI processing of medical bills/EOBs (PHI) in the billing module — its Phase 1b ingestion waits on this arm.

Chosen because: it shares code across Windows + iPhone, it's the ecosystem where Claude can move fastest with abundant support, Postgres handles the interconnected structured data cleanly, Supabase saves large amounts of work on the central DB and staff logins, and nothing about it paints the project into a corner for later polish.

4. Cost picture (agreed as acceptable)
Ongoing hosting: modest — roughly $25–$100/month for a managed database + app hosting for a handful of users, depending on provider and document storage volume.
Build cost: the software build itself is the user's time plus Claude's help.
Transcript-layer hardware (NEW): digital recorder + lavalier (~$150–300 total) and, if the current office PC lacks a capable NVIDIA GPU, a PC build/upgrade (~$1,500–2,500) for local transcription.
Security review: because this holds privileged client data across multiple users, a real developer or security professional should review it before it goes live. Budget a few thousand dollars, possibly more depending on market. This review is not optional and Claude is not a substitute for it.
5. Build sequence / how to proceed
Data model first (no code). COMPLETE — see sections 7–11.
Stand up one vertical slice end-to-end (Case overview + Parties), scoped as: case list/create/detail with auto YY-NNNN file numbers, cascading practice-area→case-type classification, PI flags, per-type status lists; full party directory with a config-driven party-type registry covering every §11 party type (registry-rendered forms incl. repeating groups and party-to-party links); case↔party linking with roles/sides; cross-case history on every party. Architecture: data-adapter layer — localStorage demo mode (zero-setup, seeded fictional data) + Supabase adapter and full Postgres schema (db/schema.sql, server-side gapless file numbers, RLS placeholders) activated via .env. (Build status: BUILD-STATE.md.)
SECOND vertical slice (DECIDED 2026-07-22): medical billing analysis module Phase 1a — builds the minimal Medical tab + bill ledger as part of the slice; manual/assisted line-item entry, deterministic chargemaster fuzzy-matching, Medicare PFS benchmarks with ratio-led reporting, EOB patient-responsibility field, internal report generator, ReviewLog/AnalysisRun entities, and the system-wide Legal Rule Registry. Phase 1b (local-AI PDF ingestion) activates when the GPU arm exists. Full spec: claude/medical-billing-analysis-module-synthesis.md (all eight decision-queue defaults resolved 2026-07-22; MRF dry run COMPLETED on Citizens' real file — claude/citizens-mrf-dry-run.md).
Expand tab by tab — remaining tabs (insurance, depositions, liens, etc.) — with user feedback at each step.
Integrations last — OneDrive and Outlook (via Microsoft Graph) come after the core is solid.

This project space is the home for design/specification work; the codebase now lives on Michael's machine (and future build chats should ask him to re-attach or sync the current code before editing it).

Next concrete step: All case-type lifecycles are mapped (section 8). Parties model complete (section 12). Criminal playbook engine specified (criminal-offense-playbooks.md). PI playbook engine specified (pi-case-playbooks.md, built from a full verified read of the 2025 Advanced PI Law course book) — including the Kostura-based liens revision, which COMPLETES the former Kostura action item. All five PI design questions answered by Michael. Transcript integration layer FULLY SPECIFIED (claude/transcript-workflows.md) — all six open questions ANSWERED by Michael (2026-07-21): local-first transcription stack (recorder → NVIDIA Canary on his PC; Azure cloud arm later for phone calls), silent-where-lawful announcement practice, opt-in recording, all deposition audio with PHI protection, attorney-only until multi-user, keep-all-audio with compressed archival. Hardware notes (Tascam DR-05XP + Rode SmartLav+, GPU PC) in that doc's §9. Plea-hearing eligibility reminder FULLY SPECIFIED (2026-07-21) — claude/plea-hearing-eligibility-reminder.md. Medical billing analysis module FULLY SPECIFIED (2026-07-21) and ALL DECISIONS RESOLVED (2026-07-22) — claude/medical-billing-analysis-module-synthesis.md; Phase 1a is the second vertical slice (item 3 above); Legal Rule Registry promoted system-wide (section 2); Citizens MRF dry run COMPLETE. Remaining design-side items: the criminal discovery skill dedicated build-out chat; transcript-layer Phase 0 hardware (recorder purchase, GPU check) when Michael is ready. (Build progress: BUILD-STATE.md — not restated here.) Three Texas Bar consult items pending (section 14) — the recording-ethics item now expressly includes concealed in-person recording. All 2025 legislation referenced in either playbook document is from pre-/immediately-post-session snapshots and needs post-session confirmation before deadline rules are hard-coded (the record-clearing statutes file already reflects the Sept. 1, 2025 amendments).

6. Full feature set (modules/tabs)

Case overview; Parties; Case details/liability; Medical; Medical billing analysis (per-bill Analysis tab inside Medical + case-level roll-up; spec in claude/medical-billing-analysis-module-synthesis.md); Depositions; Insurance; Liens; Case expenses; Settlement; Notes; Tasks (assignable to people); Documents (OneDrive-linked with metadata); Transcripts (recorded-audio layer — audio + searchable transcripts linked to cases and parties; spec in claude/transcript-workflows.md); Outlook/email integration. More features likely to come — treat this as known scope, not final scope. (What is built so far: BUILD-STATE.md.)

7. THE CASE RECORD (data model — settled portions)
Core design principle

The Case record stays lean — it holds the core identity of the matter. All rich detail (parties, medical, insurance, etc.) lives in its own linked records that point back to the case. One case connects to many parties, many providers, many expenses, etc.

Identity & classification fields (SETTLED)
Internal ID — auto-generated, behind the scenes, how records link.
File number — format YY-NNNN (e.g., 26-0087), two-digit year, auto-generated, counter resets each January. No manual bookkeeping, no gaps.
Legacy reference (Cloudlex) — optional field storing the old Cloudlex identifier for migrated cases (migrated cases receive fresh YY-NNNN numbers).
Practice Area -> Case Type — two-level classification (below).
Representation Type — criminal cases only: court-appointed / private hire (a field, not a case type; only difference is how the user gets paid).
Commercial Policy Involved — MVC cases: yes/no flag, filterable (top-line rollup; detailed per-policy commercial/personal designation lives in the Insurance tab).
PI overlay flags (SETTLED — flags, NOT new case types, per Michael's decision): on PI cases, stackable designations that each open an overlay playbook (see section 8): Commercial-vehicle/trucking, Product-suspected, Death (wrongful-death/survival), plus the existing First-party UM/UIM designation. One crash can carry several flags (e.g., trucking + product + death on a single MVC case). Additional playbook-driving flags: government-defendant (TTCA types), minor/incapacitated client, Medicare/Medicaid beneficiary.
Practice Areas & Case Types (SETTLED)

Personal Injury

Motor vehicle collision
Premises
Assault
Non-subscriber workplace
TTCA — Motor Vehicle
TTCA — Premises
Dangerous animal
First-party UM/UIM (UDJA) — a DESIGNATION, not a standalone type (SETTLED). Attaches to an existing MVC matter that evolves into a first-party suit against the client's own insurer. Common in the user's practice. See section 8 for the lifecycle branch; see section 12 fee note (fees authorized for a prevailing party, so it unlocks the time tracker).
Trucking/commercial, Product-suspected, and Death — DESIGNATIONS (flags), not standalone types (SETTLED). Playbooks in pi-case-playbooks.md.
Probate companion (SETTLED — new lightweight linked case type): the probate side of death/incapacity PI cases (heirship determination, letters, attorney ad litem, minor-settlement friendly suits) is modeled as its own small companion matter LINKED to the parent PI case — its own court, cause number, judge, and short lifecycle — rather than tasks crammed into the PI case. Reusable if standalone probate work ever comes in.

General Civil Litigation

Debt
DTPA
Mechanic's lien
Servpro mechanic's lien line (its own type — a recurring referral stream from a friend who owns a Servpro in South Killeen, TX; kept separate so it can be filtered/reported as a group)
Bailment
Breach of contract

Criminal (carries a Representation Type field: court-appointed / private hire)

Defense representations:

Misdemeanor
Felony

Record-clearing / post-disposition relief (generally downstream of a defense case, often different clients — but repeat clients expected over time):

Expunction
Order for non-disclosure
Motion for judicial clemency
Other likely Case fields (proposed, not yet finalized)

Case name/caption; status/stage (per case type — see section 8); key dates (date of incident, date opened, statute of limitations, date closed); court info (court/jurisdiction, docket number, judge); fee arrangement/contingency %; responsible attorney; assigned paralegal/staff. These were proposed but the user has not walked through/confirmed each yet. (The slice v0.1 implements caption, per-type status, key dates, and court/cause fields — walk through the rest at feedback time.)

8. STATUS / STAGE MODEL (approach settled; PI lifecycle mapped)
Approach (SETTLED)

Status lists are tailored per case type, not one universal list — the lifecycle genuinely differs by case type. Where a status carries a legal deadline (e.g., DTPA demand -> 60-day response clock), the timing rule attaches to that status so the system can auto-calculate and surface the deadline. Procedural clocks are handled by the deadline/task engine, not crammed into the status dropdown. Map these one case type at a time.

Personal Injury lifecycle (MAPPED; UPGRADED per the PI course-book read)

Pre-suit phases:

Signed up / intake — UPGRADED (SETTLED — standard for EVERY PI intake per Michael's decision): intake includes the coverage inventory (all first- and third-party coverages), the Medicare/Medicaid-status check — Medicare beneficiaries auto-generate the Safe Harbor authorization at file opening and open the BCRC deadline bundle — and the playbook flags screen (commercial vehicle? product suspected? death? government defendant? minor client?). Transcript hook: recorded intake conversations (consent per practice decision) auto-populate the intake-history lists, coverage inventory, and screens above — no retyping (claude/transcript-workflows.md §5).
Notice letters out — UPGRADED into a preservation-and-notice bundle — DEADLINE-BEARING: target within 24 hours of signing. Third-party & first-party insurance notices + litigation hold to defendant, PLUS per-evidence-type spoliation/preservation letters with a tracked recipient list (vehicle/wreckage storage — urgent on trucking/product cases before salvage disposal; telematics/ELD/dash-cam; infotainment; surveillance video; premises CCTV).
Pre-suit investigation (NEW phase): TPIA §552 crash-report/agency-records request tracker (with delay states), scene and weather-data capture, website/social capture, witness canvass (recorded witness interviews carry the presumptively-discoverable flag — TRCP 192.3(h) [CONFIRM]), Rule 202 pre-suit deposition option. Full checklist in pi-case-playbooks.md Part III.
Medical treatment setup or clarified (find a provider or confirm existing)
Treatment in progress (ongoing follow-up/monitoring; may need to help client find another provider) — transcript hook: client treatment-update calls feed a treatment log; treatment gaps surface early.
Treatment complete
Records collection — medical records & bills in affidavit form. Two affidavit types: (a) billing affidavit compliant with Texas Civil Practice & Remedies Code sec. 18.001; (b) business-records affidavit for the medical records (exact code cite to be confirmed — likely Texas Rule of Evidence 902). Billing-module hook (2026-07-22): bill ingestion + mapping + benchmark run fires here — the attorney knows the exposure profile before drafting the demand.
Demand drafted
Demand sent — DEADLINE-BEARING: response clock
Demand outcome — settles, or fails -> suit

Litigation phases (once demand fails and suit filed): 11. Suit filed 12. Defendants served — service-diligence is jurisdictional against governmental defendants (Tanner) — hard-flag on TTCA cases 13. Defendant's answer received 14. Disclosures sent 15. Experts designated — DEADLINE-BEARING (court-scheduled; TRCP 195.2 default 90 days before end of discovery period for parties seeking affirmative relief / 60 for others — note the course book prints this inverted; verified against rule text) 16. CPRC sec. 18.001 notice of service filed with court — DEADLINE-BEARING. Billing-module hook: counter-affidavit watch window opens; exposure memo generated/refreshed on counter-affidavit receipt. 17. Discovery (written discovery and depositions) — transcript hook: deposition audio/rough transcripts feed same-day summaries, the Statement Bank, and the contradiction finder; errata/read-and-sign task fires on receipt of the official transcript [CONFIRM period — TRCP 203.1]. 18. Mediation — no recording (ADR confidentiality [CONFIRM]); post-session dictated recap instead (work product). 19. Expert depositions (if no settlement at mediation; includes paying treating physicians to appear) 20. Trial prep / pretrial (trial docs, pretrial conferences) 21. Trial (motions in limine, jury charge, voir dire questions, opening, case-in-chief, closing) 22. Closed

Hard GATES added to the PI lifecycle (SETTLED):

UM/UIM consent-to-settle gate: on any case with the UM/UIM designation, written UIM-carrier consent BEFORE any tortfeasor release (including an unconditional Stowers release).
PR-appointment gate (death flag): no filing or settling of survival claims until a personal representative is appointed and signs in that capacity; fee-agreement trap — >1/3 contingency on a minor's/estate representative's contract can be VOID (Est. Code §351.152) [CONFIRM]. Probate-side steps run in the probate companion matter (section 7).
Tax-allocation gate — HARD STOP (SETTLED per Michael's decision): on gross-negligence/wrongful-death (Labor Code §408.001), defamation, and abuse cases, the workflow will NOT advance to release-signed until the allocation checklist is completed or expressly waived with a logged reason — signing locks in the tax exposure permanently.
Minor-settlement sub-workflow: friendly suit, guardian ad litem, Ch. 142 registry/trust/annuity options, child-allocation protection — runs in the probate companion matter where court proceedings are required.
Pre-disbursement lien-clearance gate: see section 9.

PI playbook engine (SETTLED — full spec in pi-case-playbooks.md). The PI analog of the criminal offense-playbook engine: case type + flags open matching playbooks, each with five buckets — challenge/watch-out, discovery to demand, deadlines to calendar (feeding the deadline engine), proof & damages theories, and data-model fields. Ten playbooks (MVC, trucking overlay, product-suspected overlay, premises/Ch. 95, non-subscriber, TTCA, dangerous animal, civil assault, UM/UIM, wrongful death/survival) plus four cross-cutting spotters (preservation/spoliation; exemplary damages incl. §41.008 cap calculator, cap-busting felony list with DWI auto-flag, §41.0115 net-worth gate, §41.009 bifurcation-before-voir-dire; Chohan noneconomic-damages proof; Stowers/UIM-consent interlock). A master deadline table (~40 clocks) and a 2025 law-change ledger live in the same document. Part V of that document maps the transcript hooks into each playbook (adjuster Statement Bank → Stowers/TPPCA proof; OC calls → Rule 11 engine; deposition testimony bank → expert records).

STANDING RULE — PI course-book re-upload. Same rule as the criminal book: whenever we edit a PI playbook or add a new case-type focus, Michael will re-upload the 2025 Advanced Personal Injury Law course book PDFs into the working chat first, and the playbook work will be built from that source, not from memory. The book is a single-user-licensed, copyrighted TexasBarCLE publication: internal reference only, never loaded into any shared/multi-user part of the system, never redistributed. Feature ideas are ours to build freely; the text is not.

General Civil lifecycles (MAPPED)

Design note (SETTLED): fee arrangement is NOT hardwired by case type. It is a per-case selectable field — hourly / contingency / hybrid — and the choice governs which money tools light up (time tracker, contingency math, or both). This came out of Breach of contract but applies as a general principle.

Debt (MAPPED): Low volume for the user; most resolve by default judgment, but a litigated branch must exist.

Spine: intake/signup → demand letter to debtor → suit filed → defendant served → FORK at served.
Default path (common): no answer → default judgment → post-judgment collection.
Litigated branch (the ones that fight): answer filed → written discovery → hearing/trial → judgment → post-judgment collection.
Both paths merge into post-judgment collection (garnishment, abstracts of judgment) → closed.

DTPA (MAPPED): The 60-day pre-suit demand clock is the defining feature.

Intake → DTPA demand letter out — DEADLINE-BEARING: 60-day response clock (mandatory statutory gate; a proper pre-suit demand affects recoverable damages, so flag the step mandatory) → FORK: rare in-window settlement, OR (far more common for this user) clock lapses/offer inadequate → suit filed.
Then standard civil litigation spine: served → answer → discovery → mediation → trial → judgment → closed. Settlement reachable from any point.
Fee note: DTPA authorizes reasonable & necessary attorney's fees → time tracker in play (section 12).

Mechanic's lien & Servpro line (MAPPED — share one lifecycle): Perfection-and-filing is the MAIN EVENT here, not a preliminary step. The user does the perfection work himself. Client (a Servpro restoration operator) sends a packet: unpaid invoice + property-code data — critically the last date service was provided / job completion date, which drives the filing deadline. The filed lien is a pressure point aimed at the insurance company that owes the homeowner; ~98% of the client's money comes from insurers, so most settle once the lien clouds title.

Intake / packet received → perfection phase — DEADLINE-BEARING: filing deadline auto-calculated off last-service date (wire that date straight into the deadline engine); send statutory notices; file & record lien affidavit → lien perfected → PRIMARY path: settlement pressure → resolved/paid. Secondary branch (rarer tail): suit to foreclose → civil litigation spine → judgment/foreclosure.
Servpro type inherits this exact lifecycle; only difference is it's tagged separately for filtering/reporting on that referral stream.
Invoicing (see section 12): when the job is done, generate a client invoice pulling tracked time + logged expenses (straight hourly arrangement on these).

Bailment (MAPPED): Property bailed to another's care comes back damaged/lost/not at all. Property is usually a vehicle, but keep an OPEN field to name other property types. These tend to go the distance (litigation-oriented).

Intake → demand for value/return → suit filed → served → answer → discovery → trial → judgment. Settlement reachable throughout.
Fee note: fee recovery authorized. User bills client on a contingency contract AND tracks time to bill attorney's fees to the defendant. The exact interaction of recovered fees + contingency is PARKED pending legal + ethics review (see section 14 / bar-consult reminder) — do NOT model the fee math until resolved.

Breach of contract (MAPPED): The workhorse — runs on the DEFAULT civil litigation spine (intake → demand → suit filed → served → answer → discovery → mediation → trial → judgment → closed; settlement reachable anywhere). Nothing exotic. Fee arrangement selectable per case (hourly / contingency / hybrid) per the design note above; valid contract claim generally carries prevailing-party fee recovery → time tracker available.

Criminal — Misdemeanor & Felony defense lifecycle (MAPPED)

Misdemeanor and felony share ONE spine. The user works them essentially identically; the only real structural fork is grand jury indictment (felonies) vs. proceeding on an information (misdemeanors). Felonies generally run longer / higher stakes.

Shared spine: intake/signup → set Representation Type (appointed / retained) → arrest & charges → first appearance & bond → [felony only: grand jury indictment; misdemeanor: information filed] → arraignment & plea → discovery → pretrial motions & hearings → plea negotiations → FORK: plea bargain OR trial → sentencing (if convicted) → closed.

Charges — repeating structure (SETTLED): each case can carry multiple charges; each charge entry has:

Plain-English offense name (e.g., "assault family violence")
Specific statute cite (exact code section + subsection charged)
Offense level (degree of felony / class of misdemeanor — drives punishment range)

Entering a charge is also what opens the matching offense-specific playbook (see subsection "Offense-specific playbook engine" below). Charge records also carry the derived flags used by the plea-hearing eligibility reminder (Penal Code chapter, DWI-family, sex-offender-registration, 42A.054, FV-alleged) — see claude/plea-hearing-eligibility-reminder.md §3.

Pre-indictment limbo management (SETTLED — a proactive feature, ties into the deadline engine): On felonies especially, the user may be appointed pre-indictment and the indictment may not come down for years. Entering the initial charge fires two automatic things:

Statute-of-limitations deadline auto-calculated off the offense (the statute cite drives the SOL math — different offenses, different limitations periods).
Recurring court-check reminder to call the court and see whether an indictment/information has issued. Cadence is set per case (monthly or every couple months). Reminder auto-stops the moment the case is marked indicted / information filed.

Pretrial reporting / compliance layer (SETTLED): When a defendant is out pending indictment/court date, most counties require check-ins with pretrial services. Two party types model this (section 12): Pretrial Services Office (organization, tied to a judicial district) and the individual pretrial coordinator (person, linked to the office; the client is assigned to a specific person). Riding on top:

Intake-stage reminder to tell the client to check in with pretrial.
Pretrial compliance log on the case — record violations/issues as they happen (missed check-in, failed drug test, etc.). Builds "the good, the bad, and the ugly" so the user can give an honest case assessment when the client asks about their odds. Transcript hook: recorded client check-in conversations feed this log directly.

Criminal transcript guardrail (hard rule): facility/jail calls are recorded and monitored — NEVER treat them as privileged; the system banner-flags any transcript sourced from a facility call, and the client-communication playbook keeps substantive conversations in person or on unmonitored attorney lines. Recorded defense witness interviews carry work-product/reciprocal-discovery awareness flags. Full detail in claude/transcript-workflows.md and the criminal playbook doc's transcript-hooks section.

Offense-specific playbook engine (SETTLED — concept; full spec in criminal-offense-playbooks.md). Entering a charge opens a playbook tailored to that offense that surfaces four buckets: (1) challenge / watch-out issue-spotting, (2) discovery to demand, (3) deadlines to calendar, (4) defenses to consider. Two cross-cutting issue-spotters — search-and-seizure/warrant and investigative-detention — sit under most playbooks and are written once, referenced by each. Approach is tailored, not exhaustive: deep playbooks are built only for the offenses the user actually handles. In-scope (10): DWI/intoxication (blood/breath — the deepest, built off the book's blood-test attack framework), smuggling of persons, assaultive offenses, theft, unauthorized use of a vehicle, forgery of an instrument, drug possession, manufacture/delivery of a controlled substance, evading arrest, and engaging in organized criminal activity. Explicitly out of scope: sexual assault and child-sex / Art. 38.37 material (user does not handle these — do not build). Shared criminal deadline clocks feed the deadline engine: 10-day pretrial-pleadings (CCP 27.11 / 27.12), Art. 17.151 speedy-release (90-day felony / 30-day misdemeanor from detention), expert-disclosure (≥30/≤20 days, 39.14(b)), and the DWI ALR license-hearing window. The discovery buckets feed the criminal discovery skill. An optional federal module (detention-hearing-never-waive; Bail Reform Act; 2025 sentencing guidelines) is built only if/when federal adoptions are in scope.

STANDING RULE — course-book re-upload. Whenever we edit an existing offense playbook or add a new offense focus, Michael will re-upload the 2025 Advanced Criminal Law course book PDF into the working chat first, and the playbook work will be built from that re-uploaded source, not from memory. The course book is a single-user-licensed, copyrighted TexasBarCLE publication: keep it as internal reference only, never load its text into any shared/multi-user part of the system, and never redistribute it. Feature ideas are ours to build freely; the text is not.

Criminal — Record-clearing / post-disposition relief lifecycles (MAPPED)

These do NOT run on the litigation spine. They are eligibility-gated petition proceedings driven by qualifying events and waiting periods. Statutes are in the project file Nondisclosure_Expunction_Clemency_Statutes.txt (reflects the Sept. 1, 2025 amendments). Note recent renumbering: expunction moved to Chapter 55A of the Code of Criminal Procedure (eff. Jan 1, 2025 — old Chapter 55 repealed/replaced).

Expunction (Tex. Code Crim. Proc. Ch. 55A): confirm qualifying event (acquittal / dismissal or quash / limitations period expired) → verify eligibility + any waiting period → prepare & file petition → notice to the state + hearing → signed expunction order → agency notifications. Engine = the eligibility check (which trigger applies, whether the waiting time has run). Disqualifiers and retention exceptions exist (e.g., absconding, community-supervision-violation arrests, same-criminal-episode limits). Note the automatic-entry route after trial acquittal (55A.201 — order within 30 days on request).

Order for non-disclosure (Tex. Gov't Code Ch. 411, §§411.071–0775): waiting periods are the personality — the exact section depends on disposition (deferred vs. conviction+supervision vs. conviction+confinement) and offense family, with hard disqualifiers baked in (§411.074(b): family violence, sex-offender registry, murder/kidnapping/trafficking/injury-to-child/stalking/protective-order offenses). Lifecycle: confirm qualifying disposition + discharge → check disqualifiers → wait out the applicable anniversary → petition (or automatic order under §411.072) → notice → hearing → order. The full section-by-section eligibility map is now in claude/plea-hearing-eligibility-reminder.md §4.

Motion for judicial clemency (Tex. Code Crim. Proc. Art. 42A.701(f)): Different in kind — NOT a later separate proceeding; it happens AT discharge from community supervision. On satisfactory completion, the judge may set aside the verdict / permit plea withdrawal and dismiss, releasing the defendant from penalties and disabilities (with statutory exceptions — DWI Ch. 49 offenses (§§49.04–49.08), sex-offender-registration offenses, and 42A.054 felonies are excluded, per 42A.701(g)). Lifecycle attaches to the tail end of a community-supervision case: successful completion → request judge exercise clemency at discharge → order. OCA has a standardized discharge form (42A.701(f-1)); Art. 42A.058 requires the judge to inform the defendant of this at placement.

All practice areas fully mapped. All criminal-side design features are now specified (offense playbooks, pre-indictment automation, pretrial compliance, plea-hearing eligibility reminder); the criminal discovery skill build-out remains.

9. SETTLEMENT WORKFLOW (SETTLED; UPGRADED)
Key structural rule

Settlement is a branch reachable from ANY phase once an offer comes in — not a fixed step. Most cases settle rather than go to trial, so this is a main exit path, not an edge case.

Settlement sub-workflow (UPGRADED)

Settlement reached -> tax-allocation gate cleared where flagged (HARD STOP — see section 8 gates) -> check received -> settlement statement prepared -> liens & reductions resolved -> PRE-DISBURSEMENT LIEN-CLEARANCE GATE: no-lien clerk verification letter (hospital-lien records check), child-support lien search (LOPs are JUNIOR to child-support liens — attorney personal-liability trap), hospital-lien release validity check (Prop. Code §§55.006–.007), Medicare final-demand satisfaction, and the never-do rules (never sign a plan's reimbursement agreement; no personal indemnity — Ethics Op. 694) -> disbursement (two-check practice where a lienholder must be paid: one check to lienholder, one to client) -> closed. (Significant real work happens after "settled" but before disbursement: chasing final lien numbers, negotiating reductions, waiting on the check.) Billing-module hook (2026-07-22): D1/D2/D3 lien-reduction outputs feed this gate; final billed-vs-final outcomes auto-populate ProviderBillingProfile.

Transcript hooks: offer-conveyed and client-authority conversations are recorded (suggested-recording prompt) and linked to the settlement record — timestamped proof that each offer was conveyed and that the client authorized the settlement (quiet malpractice shield); disbursement-instruction conversations likewise. The adjuster offer history auto-builds from recorded-call transcripts (amount + date + quote), feeding the Stowers trail.

Settlement statement (auto-populating)

The settlement statement is a view of data entered elsewhere, not a data-entry screen ("enter once, reflected everywhere"). It auto-populates:

Medical providers & bills from the Medical tab (every provider the client has with a bill; billed amounts auto-listed and totaled)
Case expenses from the Expenses tab
Attorney's fees calculated from the fee arrangement on the case
Liens & reductions from the lien records
Taxable-vs-excludable allocation fields where the tax gate applies (see pi-case-playbooks.md Part II) ...all feeding a net-to-client total.

The user has an Excel sheet that does this well and will provide it later — rebuild the settlement statement faithfully from it (fields, formulas, math flow). Show billed vs. final throughout so the client sees the value created by negotiating bills/liens down. Billing-analysis numbers feed this view only from CONFIRMED AnalysisRuns (2026-07-22 decision) — provisional analyses never touch settlement math.

Death-case addendum: wrongful-death vs. survival settlements get SEPARATE agreements and explicit allocation — the survival share is reachable by liens and estate creditors; the WD share is shielded (§71.011); unallocated deals invite probate-court jurisdiction over the whole settlement. Full logic in pi-case-playbooks.md Part II. Court-approval steps (friendly suit, ad litem) run in the probate companion matter (section 7).

10. MEDICAL BILL STRUCTURE (SETTLED; LOP added)

A medical bill is a small ledger, not one number. Each bill record has a type:

Type 1 — Raw bill

Provider not yet paid by anyone. The full billed amount is outstanding; this is the number taken to the insurance company. Fields: billed amount, negotiated reduction.

Type 2 — Health-insurance-paid bill

Provider already paid by a health insurer. Must track separately and reconcile:

Original billed amount
Health insurer's payment
Contractual adjustment (write-off the provider agreed to in exchange for accepting the insurer's payment)
Remaining patient balance (e.g., deductible / co-insurance still owed by client)
Any reduction negotiated on that balance

Reconciliation: billed - insurance payment - contractual adjustment = remaining balance. In Type 2, settlement math generally involves only the true remaining balance plus any lien the health insurer asserts — NOT the full sticker price. Treating the two types the same would distort net-to-client.

Billing-analysis extension (2026-07-22): bills gain child line items (service date, raw description, revenue code, qty, unit/extended charge), a claim-type field (professional / facility), and — on Type 2 bills — a light EOBRecord with a typed, source-pinned patient-responsibility field (the Ch. 146 hospital-lien cap input). Full data model in claude/medical-billing-analysis-module-synthesis.md Part 4.

Letter of Protection (first-class object)

An LOP is tracked as its own record linked to the provider business and the case: LOP date, provider, terms/document upload. Why first-class: (a) LOP providers are now exposed to negotiated-rate/Medicare-rate discovery in both directions (North Cypress / K&L line) — expect defense discovery into LOP arrangements; (b) an LOP is junior to child-support liens (Power v. Kilgore — attorney held personally liable), which the lien-clearance gate checks; (c) failed SB 30 would have imposed LOP disclosure requirements — watch item.

Billed-vs-final applies to liens too

Liens (health insurance liens, hospital liens, etc.) get negotiated down as well, so lien records carry the same original-vs-reduced structure.

11. THE PARTIES MODEL (COMPLETE — all types defined; IMPLEMENTED in slice v0.1)
Core design principle (SETTLED)

A party is a person or entity entered once as its own record, then linked to as many cases as needed. Party identity (what they are) is separate from the case role (what they do on a given case). Roles like plaintiff, defendant, witness are assigned on top of a party's identity — e.g., one "person" or "business" record can be tagged defendant on one case, something else on another. No duplicating parties across cases. Implementation note (v0.1): party types live in a config-driven field registry (src/domain/partyRegistry.ts) — adding a type or field is a config change, and forms/detail views render from it automatically.

Persistent cross-case lookup (SETTLED — applies to EVERY party type by default)

Because links are bidirectional, you can look from a case -> its parties, OR from a party -> every case it's linked to. So the user can pull up any adjuster/attorney/doctor/insurance company/etc. and see the full list of every matter involving that party. This is now a standard feature on all party types (only flag a type where it does NOT apply). Implemented in v0.1.

Party-linked transcripts & the Statement Bank (applies to every party type)

Transcript records (section 6 module; spec in claude/transcript-workflows.md) link their participants to party records. Consequence: every party's cross-case history gains a "what they've said" dimension — pull up an adjuster/expert/witness/opposing counsel and see their statements across every matter (the Statement Bank: per-adjuster representations, per-expert/witness prior testimony — a sibling to the expert's prior-challenges field — per-OC commitments feeding Rule 11 confirmations, plus a contradiction finder within a case). Privilege tier + consent status on each transcript govern who can see what. Bonus (from the local-pipeline design): party records auto-seed a per-case vocabulary list fed to the transcription engine, so names and captions transcribe correctly (claude/transcript-workflows.md §9).

Party-level documents — two-tier scoping (SETTLED — applies to every party type)

Documents can attach at the party level, not just the case level. When attaching a document to a party, choose its scope:

Entity-level document — a fact about the entity itself (e.g., Walmart's corporate filing, certificate of existence, registered-agent record, a nationwide policy/announcement). Follows the party everywhere — auto-appears on every case that party is linked to.
Case-specific document — about the party on one matter (e.g., a return of service, case correspondence, a discovery response). Stays with that case only — must never bleed into the party's other cases.

Documents live in OneDrive with metadata logged in the software; a document is one object viewable from both the party and the case document list (subject to the scope rule above). Transcripts follow the same two-tier scoping.

Party type list (to define field-by-field)

Full list provided by user: adjuster, attorney, business, subrogation analyst, client, court, court reporter, medical professional (broadened from "doctor" to include non-MD treating providers), expert, government entity, insurance company, judge, law firm, lead medical provider, person, law enforcement officer.

Rough grouping — organizations: business, court, government entity, insurance company, law firm (lead medical provider can be either a person or a facility). individuals: adjuster, attorney, subrogation analyst, client, court reporter, medical professional, expert, judge, law enforcement officer, person.

Assignable case roles layered on top include at least: plaintiff, defendant, witness. Also want an opposing-vs-your-side designation on relevant roles (attorney, law firm, expert).

Party types defined so far

Adjuster (SETTLED): contact information (phone, fax, mailing address, email); linked employer insurance company; persistent cross-case history. Statement Bank view: everything this adjuster has said across all cases, from linked transcripts.

Attorney (SETTLED): name; contact information; bar number; side (yours or opposing) on a given case; role type (lead counsel, co-counsel, etc.); linked law firm (separate record — handles attorney changing firms; enables "cases by attorney" and "cases by firm"); persistent cross-case history. Statement Bank view for opposing counsel: commitments/agreements from calls, feeding the Rule 11 confirming-letter engine.

Business (SETTLED): business name; type/nature of business; contact information; multiple points of contact, each with a free-text blank explaining what that contact is for; citizenship for jurisdictional purposes (states the business is a citizen of — for diversity/subject-matter jurisdiction; for a corporation capture both state of incorporation and principal place of business); registered agent (name & address, for service of process); ability to upload/link documents at the party level per the two-tier scoping rule above.

Client (SETTLED): legal name plus aliases/maiden names (for records requests); contact info (phone, email, mailing address); date of birth; Social Security number; driver's license number and state of issuance; preferred contact method and language; emergency contact; health insurer on file (ties into Type 2 medical bills); Medicare/Medicaid-beneficiary status (captured at EVERY PI intake per Michael's decision; drives the lien module, Safe Harbor authorization generation, and Section 111 exposure). Plus standard cross-case history and two-tier document scoping.

Intake history fields — captured as REPEATING lists (each entry its own record, not one text blob), so they become live referenceable data:
Prior motor vehicle collisions — each with date, and what the client recalls
Prior falls — each with date and details
Prior injuries — each with date and details
Prior medical providers seen
Driving history / prior tickets — each with approximate date and location
Prior criminal convictions (if any) — UPGRADED for the plea-hearing eligibility engine: structured entries (disposition type — conviction / deferred / dismissal / acquittal; offense + cite if known; date; family-violence involved?), flagged unverified until a DPS/background check is on file (claude/plea-hearing-eligibility-reminder.md §3)
See section 14 for the client intake form wanted feature (fillable mobile/web link that auto-populates the client record). Transcript hook: recorded intake conversations auto-populate these lists.

Insurance company (SETTLED; enriched): company name; contact info (phone, fax, claims email); commercial vs. personal lines written (feeds the commercial-policy flag on MVC cases); registered agent (name & address, for service of process); linked adjusters who work there; persistent cross-case history; document scoping. On per-case insurer links (from the Tilley chapter): reservation-of-rights flag, primary vs. excess designation, coverage-counsel note — feeds settlement strategy on insured-defendant cases. (Open minor question, not blocking: whether to capture separate claims vs. legal-service addresses.) See section 14 for the policy language bank wanted feature.

Law firm (SETTLED): firm name; contact info (phone, fax, email); side (yours or opposing); linked attorneys who work there; enriched cross-case history — each matter shows WHO the firm represented (the specific person/business/entity and their role) AND the insurance company paying for the defense where one exists. (General principle: on any case, capture the firm ↔ represented-party ↔ paying-insurer relationship, viewable from any of the three.)

Medical professional (SETTLED — individual): name; specialty/provider type (flexible/open value — includes non-MD providers: chiropractor, PT, etc.); professional license or NPI number (for affidavits/subpoenas); contact info; links to the facilities/locations where they treated (one professional can link to MANY provider businesses/locations across cities); cross-case history.

Optional credentials dossier (fill in as needed; several are REPEATING entries): license issuance date; board certification(s) with specialty and date; education history (repeating: program name, location, start/end dates, specialty type); hospital privileges; awards/honors/publications (repeating); malpractice information; criminal history; disciplinary actions — Texas medical board AND out-of-state (repeating). NOTE: this dossier overlaps heavily with the Expert type and is reused there.

Provider business (SETTLED — organization type; the treating-provider entity, e.g. "ProCare Injury Specialists"): Three-layer structure:

Provider business (the named entity, e.g. ProCare) — anchors the Medical tab. Fields: business name; main contact info (phone, fax, billing/records-request email); billing/tax ID number (appears on affidavits/payments); registered agent (for service); cross-case history; document scoping. Bills and records attach at the provider-business level. LOP records link here (see section 10). ProviderBillingProfile (billing-pattern analytics, auto-fed from settlement outcomes) attaches here (2026-07-22 — billing module spec Part 4).
Location (multiple physical clinics under one business). Fields: parent provider business; physical address; that location's phone/fax; short label (e.g. "south side"); records-request contact if handled per-location. Location captures WHERE treatment happened.
Medical professionals link in as separate person records wherever they treated. In the Medical tab: pull up the provider business → note the specific location → list the treating doctors as live linked data.

Expert (SETTLED — individual): name; field of expertise as a flexible/open value (field-agnostic); contact info; side (yours or opposing); linked firm/employer; cross-case history (see every case an expert appeared in and which side). Reuses the medical professional's credentials dossier. Plus a prior challenges/exclusions field (REPEATING: court, case, outcome — e.g. Daubert/Robinson exclusions the user is aware of) and a prior-testimony bank: deposition/interview testimony accumulated from linked transcripts across cases. Defense billing-expert bank (billing module Phase 3) extends this type.

Person (SETTLED — catch-all individual; witnesses, family, etc.): name; contact info (phone, email, mailing address); optional date of birth; free-text note on who they are / why they matter; cross-case history; document scoping. Case role (e.g. witness) layered on top. Witness-interview transcripts link here and carry the presumptively-discoverable flag.

PNC intake funnel (built into person): a person carries a status that advances on the SAME record (nothing re-entered): PNC (potential new client — an intake file opened before signing) → then one of: Client (intake converted to a case), Declined, or Referred out. Each outcome carries a date and a short reason/note. Gives a real intake funnel and retains the full trail for reporting on where clients come from and what's turned away. Transcript hook: the intake-call transcript rides the funnel — into the case file on conversion, or as declination documentation.

Law enforcement officer (SETTLED — individual): name; rank/title; badge or unit number; linked law enforcement agency (separate record — one agency, many officers); contact info where available; cross-case history. Role (crash report author / arresting officer / fact witness) layered on per case.

Law enforcement agency (SETTLED — its own organization type, deliberately kept separate from government entity): agency name (police dept, sheriff's office, DPS); address; contact info; cross-case history. Officers link to it. Reason for separate type: agencies author crash reports and employ officers and appear in both MVC and criminal work — a distinct role from the adverse-government use of government entity. (May optionally note a parent government entity.)

Government entity (SETTLED — organization; reserved for adverse-government situations: cities, counties, TxDOT, housing authorities, esp. TTCA cases): entity name; type/level (city / county / state agency); contact info; TTCA notice address; designated agent for service of process; cross-case history; document scoping. NOTE: the TTCA notice requirement is a strict, short statutory clock — flagged to wire into the deadline engine later (section 14); city-charter periods can be far shorter than the statutory default [CONFIRM per city].

Court (SETTLED — organization): court name; jurisdiction and level (TX district / county court at law / JP); county; physical address; clerk's office contact and filing details; cross-case history; standing orders / local rules (store or link). Plus:

Filing profiles (sub-layer): each profile pairs a CLERK (district clerk vs. county clerk) with a DOCKET TYPE (district civil, district criminal, county civil, county criminal) and the specific forms/requirements for that combination (e.g. a citation-issuance request form), stored as linked templates. User picks the right profile per case, so a single court handling both civil and criminal stays clean.

Judge (SETTLED — individual): name; linked court (entered once, links to whatever court they sit on — reassignment/election-out/visiting assignments keep history intact); title (district judge / associate judge); chambers and court-coordinator contact; cross-case history; free-text notes on preferences/tendencies.

Court reporter (SETTLED — individual): name; linked agency (most reporters book through an agency — separate record); contact info (phone, email — for scheduling/ordering transcripts); certification number; cross-case history; default/preferred-reporter flag so the user's go-to surfaces first. User's default reporter: Angie Lozano. Deposition transcripts link to the producing reporter/agency.

Subrogation analyst (SETTLED — individual; the adjuster's cousin on the lien/recovery side): name; contact info (phone, fax, email); linked employer (insurance company or subrogation vendor — separate record); cross-case history.

Pretrial Services Office (SETTLED — organization): the county pretrial services office, tied to a judicial district. Contact info; cross-case history; document scoping. Individual coordinators link to it. Two-layer structure mirrors provider-business/location and law-firm/attorney.

Pretrial Services Coordinator (SETTLED — individual): the specific person within a pretrial services office that the client checks in with. Name; contact info; linked Pretrial Services Office; cross-case history. A client is assigned to a specific coordinator, so link BOTH the office and the individual on a criminal case. Drives the intake-stage check-in reminder and feeds the pretrial compliance log (section 8).

Note on the original list

"Lead medical provider" from the original list is effectively subsumed by the provider-business / medical-professional structure (a lead provider can be either a person or a facility, now both modeled). All other listed types are defined above.

13. LIENS STRUCTURE (REVISED — Kostura review COMPLETE; full spec in pi-case-playbooks.md Part II)

The Kostura publication (chapter 21 of the 2025 Advanced PI Law course book — the same paper as the project's Subrogation and Liens in Personal Injury Cases.pdf) has now been read end-to-end and the lien structure revised from it. This section is the summary; the build spec is Part II of pi-case-playbooks.md.

Core structure (unchanged)

Each lien record carries billed-vs-final: original asserted amount / negotiated reduction / final payoff. Plus: lien holder (linked party), lien type (drives the analysis), status (asserted / under negotiation / resolved).

Corrections to the prior design (from the Kostura read)
The hospital-lien "100-day window" is a coverage limit (which charges the lien can reach), not a filing window. Perfection has its own checklist: emergency treatment within 72 hours of the incident, §55.005(b) required contents (naming the plaintiff as the liable party is a fatal defect), county filing, and the HB 2929 cap at the lesser of reasonable 100-day charges or 50% of total recovery; EMS liens capped at $1,000 in smaller counties. Ch. 146 EOB balance-billing check: the patient-responsibility amount on the EOB is the maximum permissible lien.
The master analytical switch for private plans is self-funded vs. insured (Form 5500 line 9, stop-loss analysis) — not simply ERISA vs. non-ERISA. Insured and non-ERISA plans fall under Texas law (CPRC Ch. 140 lesser-of formula, made-whole); self-funded ERISA plans preempt it (McCutchen/Montanile line).
Montanile fund-location status is a tracked field: whether settlement funds are segregated/in trust vs. distributed/commingled is outcome-determinative against self-funded plans.
Revised taxonomy (16 types — each with perfection checklist, reduction formula, document demands, deadlines, UM/UIM-reachability flag; see the build spec)

Hospital lien; EMS lien; health-plan reimbursement (self-funded ERISA / insured ERISA / non-ERISA, with SPD+Plan demand and §1132(c) penalty letters); CPRC Ch. 140 covered plans (lesser-of calculator, worked example); Medicare conditional payments (BCRC/portal deadline bundle: 120-day settlement notice, 65-day portal, CPN 30-day response, §411.37 procurement reduction, self-calc thresholds); Medicare Advantage; Medicaid (TMHP 45-day attorney notice; Ahlborn pro-rata; Gallardo future-medicals reach); TRICARE/VA (6-month/6-year government windows); FEHBA; FECA; workers' comp (Labor Code Ch. 417 first-money, no made-whole, employer-negligence reduction requires jury finding); child-support liens (senior to LOPs); CVCF; municipal/county plans; assignments; LOPs (tracked in Medical tab, section 10, but checked in lien clearance).

The government-vs-private fork (unchanged in concept)

Government payers run on known federal law — no plan language needed. Private/ERISA types open document upload + demand tracking (SPD, Plan, reimbursement agreement, Form 5500, stop-loss) and prompt the funding-status analysis. Uploaded plan documents feed the same library instinct as the policy language bank (section 14).

Attorney-liability guardrails (system checks, not advice)

Pre-disbursement lien-clearance gate (section 9); never sign plan reimbursement agreements; no personal indemnity (Ethics Op. 694); successor-counsel LOP obligations (Op. 625); Garriga/Harris personal-liability warnings surfaced on the relevant lien types.

Billing-module feed (2026-07-22): the medical billing analysis module is upstream of this structure — it supplies verified inputs to the Ch. 140 / §411.37 calculators (D4), the Ch. 146 EOB patient-responsibility cap (from the typed EOBRecord field), and the hospital-lien reduction package (benchmarks + perfection defects + cap math → demand letter, Phase 2).

14. BANKED "WANTED LATER" FEATURES & OPEN ACTION ITEMS
Feature intake 2026-07-24 — see docs/specs/feature-intake-2026-07-24.md (INTAKE, not spec-final; nothing in it is built; each item needs a design pass before entering a build queue). Items: (A) recorder → local transcription → sort & route — Michael's designated next build target, blocked on his providing the NVIDIA model docs/API; (B) email intake & routing (own project; watch for Outlook calendar-push linkage); (C) reusable upload → extract → act pattern; (D) document-driven subrogation/lien tab (pattern-C reference implementation; feeds the section 9 pre-disbursement lien-clearance gate); (E) case-law dictation + CourtListener retrieval; (F) court-profile local rules & controlling documents; (G) contact duplicate detection + job history; (H) negotiation tab / negotiation kit. Design-pass overlaps to reconcile: item A with the transcript integration layer (feature above / transcript-workflows.md); item B with outlook-email-intake.md.
Wanted features (design later, not blocking core build)
Client intake form — a fillable link that works on phone or computer; client fills basic info and submits; answers flow into and auto-populate the client record. Fits the web/mobile stack naturally. Lower priority for now. Now includes the standard coverage-inventory + Medicare/Medicaid questions (section 8, phase 1).
Policy language bank — a repository of insurance policies collected during litigation (subject to confidentiality restrictions), stored and linked to the issuing carrier. Payoff: analysis across the bank — track how a carrier's personal-auto language changes over time; compare policies across carriers by line. Each policy needs metadata (carrier, line of business, policy period, source case) plus a confidentiality flag so anything under a protective order is walled off from the comparison pool. The billing module's fee-schedule library (public + discovered + hospital-MRF schedules, same confidentiality walls) is a sibling of this bank — see synthesis doc Part 4.
Kostura subrogation reference (in the Liens tab) — NOW SPECIFIED: the reference layer is built into the revised lien taxonomy (section 13 / playbook doc Part II): picking a lien type surfaces the matching analysis, reduction levers, and document demands. IMPORTANT: her publication is copyrighted — internal use only, NOT redistributed, especially once staff are on the system.
Time-tracking / fee-recovery module (SETTLED — general capability, flagged on per eligible case). For any matter where fee recovery is authorized (DTPA, breach of contract w/ fee provision, bailment, first-party UDJA, mechanic's lien, etc.). Features:
Live start/stop timer to run while working.
Manual back-logging of time not caught in the moment.
Each entry: date, duration, free-text description of work.
Entries fully editable after the fact (time and description) — clean up before it feeds an affidavit.
Billing rate attached — set ONCE at the case level; every entry on that case inherits it automatically (never re-typed). Different cases can carry different rates; within a case the rate stays locked/uniform (which is what a court wants for a fee affidavit). Multiplies out to a running dollar total ready for a fee affidavit.
Dual use: also drives actual client billing on hourly matters (feeds the invoice feature below).
UM/UIM note: UDJA fees are a jury question the plaintiff must request (Nicastro waiver trap) — the fee-proof workflow on UM/UIM cases ties into this module.
Transcript hook: recorded-conversation duration auto-suggests a pre-filled time entry (date, duration, transcript summary as description — editable before saving) on hourly/fee-recovery cases.
Invoice generation (SETTLED). When a job wraps (esp. mechanic's lien / Servpro, straight hourly), generate a client-ready invoice = tracked time × case rate + logged case expenses, totaled. Feeds off the time tracker and expenses tab (enter-once instinct). Look/format (invoice number, letterhead, payment terms) to be designed when built.
Charge-level statute capture + pre-indictment automation (SETTLED — see section 8 criminal spine). Repeating charges (plain-English name + statute cite + offense level); entering the initial charge auto-calculates the SOL deadline and sets a per-case-cadence recurring court-check reminder that auto-stops on indictment/information. The statute reference table behind the SOL math is shared with the plea-hearing eligibility engine (offense → class/degree, chapter, DWI-family / sex-offender-registration / 42A.054 / FV-capable flags).
Eligibility auto-surface for record-clearing relief (SETTLED — concept). Auto-populated readout somewhere in the criminal file showing whether the client would be entitled to any relief (early termination of probation, order of non-disclosure, judicial clemency, expunction) and WHEN (the earliest date each becomes available), calculated from offense + plea date + community-supervision terms + statutory waiting periods. The eligibility rules and required data fields are now mapped in claude/plea-hearing-eligibility-reminder.md (§§3–5) — this feature is the post-disposition continuation of that engine.
Plea-hearing eligibility reminder (FULLY SPECIFIED 2026-07-21 — claude/plea-hearing-eligibility-reminder.md). Before a plea or plea-capable pretrial, the system surfaces a disposition-scenario matrix per charge (dismissal→expunction; deferred→nondisclosure; conviction+supervision→clemency/limited nondisclosure; conviction+confinement→limited/none), computed from the charges and the client's structured prior record, with cross-cutting kill switches (§411.074(b) permanent disqualifiers, the family-violence affirmative-finding trap, clean-prior-record gates) and explicit negotiation levers (deferred-vs-conviction on felonies, diversion-beats-deferred, the DWI interlock ladder, the 55A.151 same-episode trap). Outputs: attorney readout with cites, generated plain-English client one-pager (draft, attorney-reviewed), and a logged "advised client" task. Transcript hook: the plea-discussion transcript documents what the client was told — feeding item 9's consent engine once the barratry consult clears.
Future-client-contact consent + auto-outreach engine (SETTLED — concept; PENDING bar consult, see action items). At plea/sentencing, capture the client's written consent to be contacted later about future relief. Stored as a field on the client/case with date + what they agreed to. System calculates the earliest date each form of relief becomes available and auto-creates a calendar outreach event (with lead time) for consented clients as the date approaches. Purpose: turn the case file into a future-business engine while staying clear of barratry — prior written consent is the linchpin. Consent language must be reviewed and the barratry question confirmed before relying on it.
Criminal discovery skill (SETTLED — placeholder; DEDICATED BUILD-OUT in a future chat, user to feed statutory provisions). A Michael Morton Act discovery-compliance workflow, available on felonies AND misdemeanors (earns its keep mostly on felonies). Two halves:
(a) Comprehensive day-one demand: sweeps every "upon request, the state shall produce" provision across the Code of Criminal Procedure into one exhaustive request, sent/timestamped on day one of EVERY case, so if the state later fails to produce, the user can show the court the request was made at the outset.
(b) Production audit: track what actually comes back against what was demanded and flag gaps (the user has already caught non-disclosure in one county). The day-one request gives the audit its teeth.
Section 111 / Medicare compliance tracker. Mandatory-insurer-reporting exposure now carries inflation-adjusted daily civil money penalties with CMS audits beginning April 2026; track Medicare-beneficiary cases, reporting trigger dates, and the BCRC deadline bundle as first-class deadline-engine citizens.
Legislative-watch module. Register of failed-but-likely-to-return bills and what each would change in OUR design (SB 30 §18.001/LOP overhaul; SB 39 trucking bifurcation; noneconomic-caps cluster), with a session-end re-check reminder. Applies to both PI and criminal sides. Natural home once built: the watch-flag tier of the Legal Rule Registry (section 2).
Citation-currency alerts — FOLDED INTO THE LEGAL RULE REGISTRY (2026-07-22, section 2). The original instinct (any playbook entry resting on a single recent case carries a case-name field and a "verify before relying" note so future re-checks are greppable — lesson: BRP-Rotax reversal; Werner v. Blake decided mid-book-cycle) is now the registry's watch-flag mechanism; no separate feature.
Transcript integration layer (FULLY SPECIFIED — all six design questions ANSWERED 2026-07-21; full spec in claude/transcript-workflows.md). Michael is recording audio of conversations (clients, adjusters, opposing counsel, depositions, witnesses) and transcribing it. Design: a Transcript first-class object (audio + searchable text, participants linked to party records, context type, consent status, privilege tier, PHI flag) feeding four extraction passes (action items → Tasks; dates/offers → deadline engine + offer history; facts → intake/case fields; statements → the Statement Bank), plus the Rule 11 confirming-letter engine, deposition summaries/contradiction finder, client-authority documentation at settlement, and time-entry suggestions. Decisions: (1) LOCAL-FIRST stack — recorder audio → NVIDIA Canary + diarization on Michael's GPU PC; Azure cloud arm (with BAA) later for the phone-call capture arm; (2) silent-where-lawful announcement (OC announced until ethics consult; hard out-of-state prompt); (3) opt-in recording with suggested-recording prompts; (4) all deposition audio handled with PHI protection (PHI flag, redaction check, PO linkage); (5) attorney-only until multi-user; (6) keep all audio, compressed (Opus archival transcode). Hardware (planned): Tascam DR-05XP + Rode SmartLav+; NVIDIA-GPU PC; details + legal-vocabulary adaptation roadmap in that doc's §9. Build phases 0–3 defined in the spec.
Medical billing analysis module (FULLY SPECIFIED 2026-07-21; ALL DECISIONS RESOLVED 2026-07-22 — claude/medical-billing-analysis-module-synthesis.md). Line-item bill intelligence, CPT mapping with chargemaster memory, multi-schedule reasonable-value benchmarking (Medicare PFS → Medicaid/DWC/hospital-MRF negotiated rates), lien-reduction packages, counter-affidavit war-gaming, client counseling outputs. Phase 1a is the second vertical slice (section 5). Decision-queue outcomes and refinements in that doc's Part 6; completed MRF dry-run findings (Citizens file = Phase 2 reference fixture) in claude/citizens-mrf-dry-run.md.
Forms & Document Automation Engine (FULLY SPECIFIED 2026-07-23 — form-engine.md). Wizard-driven generation of court-ready pleadings/discovery documents from database-stored templates + case data, via token substitution against a real .docx skeleton (never regeneration — kills caption drift). First deliverable: TRCP 194.2(b) & 195.5 combined disclosures for PI, with a Michael-approved verbatim variant library (EM, radiology, EMT, chiro, pain mgmt, ortho, neuro, PCP, PT, pharmacy, custodian-only, mid-level rider; NO mental-health variant by design — hard-pause gate routes to manual drafting). Enter-once with write-back interview cards; warning gates are wizard-screen only, never in the document; supplementation replay per TRCP 193.5. Output .docx → reviewed → PDF, both to OneDrive with metadata. Not the next slice — build position follows billing Phase 1a and the Outlook push.
Document production / Bates-stamping module (SETTLED — concept; partially specified 2026-07-23, needs a dedicated design session — see form-engine.md §7). Separate module; the production log (Bates range + description + date/recipient) is the single source of truth, with an auto-Bates-stamping engine; the form engine and future production cover letters only read from it.
PI design decisions from Michael (ALL FIVE ANSWERED — integrated above)
Trucking/products/death = flags, not case types (section 7).
Project-instruction edits = applied immediately (this document).
Medicare/Medicaid check + coverage inventory = standard on every PI intake, with auto-generated Safe Harbor authorization for Medicare beneficiaries (section 8 phase 1).
Tax-allocation gate = hard stop (section 8 gates).
Probate-side work = probate companion matter, a lightweight linked case type (section 7).
Open action items (must happen before full build-out)
Kostura paper review — COMPLETE. Chapter 21 of the 2025 Advanced PI Law course book (the same publication) was read end-to-end; the lien-structure revision is section 13 + pi-case-playbooks.md Part II. The standalone PDF in the project remains the reference copy.
Transcript design questions — COMPLETE (2026-07-21). All six answered; decisions integrated into claude/transcript-workflows.md §8 and summarized at feature 14 above.
Plea-hearing eligibility reminder — COMPLETE (2026-07-21). Fully specified from the project statutes file; spec at claude/plea-hearing-eligibility-reminder.md. Two defaults chosen without asking (adjustable): 3-day reminder lead time; fires at plea-negotiation stage entry as well as calendared settings.
Vertical slice v0.1 — scoped at section 5, item 2; build status in BUILD-STATE.md. Standing constraint either way: demo mode holds no real client data; Supabase hookup + auth + security review come before any real data.
Billing-module decision queue — COMPLETE (2026-07-22). All eight defaults accepted with refinements; Phase 1a designated the second vertical slice; Legal Rule Registry promoted system-wide (section 2).
Citizens MRF dry run — COMPLETE (2026-07-22), including the per-code comparison. The 55 MB live file (CMS v3.0.0, dated 2026-05-11) was staged from Michael's Downloads via the desktop bridge and analyzed; findings + Phase 2 loader requirements in claude/citizens-mrf-dry-run.md. The file is the Phase 2 reference fixture (Michael retains the original in Downloads; re-stage or re-download at build time).
Texas Bar consult — THREE topics (PENDING; reminder set):
Hybrid fee arrangement (bailment / fee-recovery cases): (a) legal — does TX law authorize recovering hourly attorney's fees from the defendant while charging the client a contingency, and if so how to prove it up cleanly in court; (b) ethics — confirm the hybrid arrangement is proper. Do NOT model the bailment fee math until resolved.
Future-client-contact / barratry: confirm prior-written-consent outreach to a former client about future relief does NOT constitute barratry/prohibited solicitation, and get the consent language itself reviewed/approved before relying on it.
Recording ethics (EXPANDED 2026-07-21): confirm the propriety of unannounced one-party-consent recording of opposing counsel and adjusters under current Texas ethics guidance, specifically including concealed in-person recording (recorder/lavalier hidden in a bag during meetings — a more aggressive posture than silent call recording), and the treatment of recorded witness statements under TRCP 192.3(h). Until answered, the design default is announced recording for opposing counsel, and concealed in-person recording should not become routine practice.
TTCA notice deadline: wire the government-entity TTCA notice requirement into the deadline engine (strict short statutory clock; city-charter periods can be shorter; malpractice trap) [CONFIRM periods — the course book does not recite them].
Settlement statement Excel: user will provide their existing Excel settlement sheet to rebuild faithfully (section 9).
2025 legislation post-session confirmation: every 2025 bill referenced in either playbook document (SB 293's MSJ clocks, SB 2878's court thresholds, etc.) comes from a pre-veto June 6, 2025 snapshot — confirm enacted status and effective dates before hard-coding any rule. (The record-clearing statutes file is current through the Sept. 1, 2025 amendments — HB 1620, SB 1667.)
Transcript-layer Phase 0 (hardware/setup — when Michael is ready): recorder + lavalier purchase decision (note the DR-05XP has no remote/app trigger — weigh before buying); confirm/acquire an NVIDIA-GPU PC; then stand up and test the local Canary + diarization pipeline in real environments. Now also gates billing-module Phase 1b (AI bill ingestion).
15. Security & compliance guardrails (must be respected)
The application handles privileged client data. Attorney-client privilege and the user's state bar ethics obligations govern how it is stored and accessed.
Backups should be encrypted; ideally client-controlled keys.
Staff access should use individual credentials with appropriate permissions.
A professional security review is required before the system is trusted with real client data. The user is responsible for the security review and ethics/privilege compliance, which varies by state bar. Claude assists with the build but is not a substitute for that review.
Slice v0.1 note: demo mode (localStorage) is for evaluation with fictional data only — no real client data until Supabase + authentication + policies are in place and reviewed. The schema ships with RLS enabled and authenticated-only placeholder policies, expressly marked insufficient for multi-user production.
AI-use guardrails (from the course book's AI chapter): no client-confidential data into non-secured AI tools; TDRPC 3.03 candor obligations for AI-assisted filings; TRCP 199.1(c) objection right for AI deposition transcription. Fold into the staff-facing practice manual when multi-user.
Transcript guardrails: every transcript carries a privilege tier (attorney-client / work-product / non-privileged) and a PHI flag that drive staff permissions, export warnings, and a pre-production redaction check; consent status is recorded per recording (announced/written/one-party/unknown) with a HARD out-of-state-participant check (all-party-consent states); the transcription stack is DECIDED: local-first (NVIDIA Canary + diarization on Michael's own GPU PC — satisfies the AI-use guardrail by architecture); the future Azure phone-call arm requires verified enterprise data terms + HIPAA-eligible tier/BAA before PHI-bearing audio flows through it; jail/facility calls are hard-flagged NOT privileged; mediation sessions are not recorded (ADR confidentiality [CONFIRM]); the extraction/summarization LLM question (cloud vs. local for transcript TEXT) is decided at Phase 2 under these same guardrails.
Billing-module guardrails (2026-07-22): estimates-not-adjudication disclaimer on every screen and document; attorney confirmation before any mapping is fact or any document leaves; PHI local-first for bill/EOB AI processing (Phase 1b gates on the GPU arm); protective-order schedules and mappings walled from cross-case pools; only confirmed AnalysisRuns feed settlement/lien math; MRF-sourced numbers carry evidence-tier labels; above-gross MRF rates disclosed, not cherry-picked around. Full list: synthesis doc Part 5.
Eligibility-engine guardrail: the plea-hearing/record-clearing eligibility readouts are attorney-facing issue-spotters, not eligibility opinions; every computed rule carries its statute cite; special statutory routes (veterans, trafficking victims, specialty courts) are linked for manual review, not auto-computed.
Legal Rule Registry discipline (system-wide, 2026-07-22): no legal rule hard-coded while unverified; model-asserted legal status is never verification; computed outputs stamp the registry versions relied on (section 2).
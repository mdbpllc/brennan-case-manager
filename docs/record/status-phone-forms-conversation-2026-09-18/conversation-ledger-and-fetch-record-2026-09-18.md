# RUNNING LEDGER — typed design conversation, Cowork, 2026-09-18 (Central; DT-1)

**Status:** EVIDENCE (CAP-2) — a running ledger kept during the conversation (Michael's words verbatim) plus a fetch record. NOTHING IN IT IS A RULING. Canonical repo path: `docs/record/status-phone-forms-conversation-2026-09-18/conversation-ledger-and-fetch-record-2026-09-18.md`. No client data; no credential.

Started as a status question; no ruling sitting was called. HEAD read over the bridge: 4940ed3 (tracking ref equal — a LOCAL read, not a QR-3 pass); inbox/ EMPTY at open; no git command run all conversation (plain-file reads only; no .git/index.lock stranded). Written to his machine, and nothing else: the dispatch into `Claude outputs\` and this conversation's one packet zip into `inbox/`.
Ledger opened 2026-09-18 17:10 CDT. NOTHING BELOW IS A RULING unless marked RULED. His words are verbatim.

## 1. Status question (answered from BUILD-STATE + live log at 4940ed3)
- Michael: "Where do we stand on building this software out to completion?"
- Claude's answer delivered in chat; nothing ruled. Knowledge meter read 1,779,044 / 2,000,000 = 89.0%, seventeen docs. CC-1 hands-on queue stated; Claude CALLED the sitting (hour-sized: six provisional CCS-1 text acts + SD-14 + FOS-2's provisional wording + FXD-1..11 + spec-feedback 2026-09-17), best after the FO migration.
- Observation for the runner's refresh: BUILD-STATE says the #157 pair entered project knowledge; the doc list shows no 09-13 file (the capture IS filed as EVIDENCE in docs/record/dorsaneo-pass-2026-09-13/).

## 2. iPhone app
- Michael: "Cloudlex also has an app that I use on my iPhone. Are we going to be able to have an app as well for this software? If so, when should we start working on this?"
- On the record already: master spec s2 ("An iPhone app is wanted later"), s3 (React chosen for it); #137 DA-1 (requirement CONFIRMED, his words "every single document that's for that file that lives in OneDrive"), DA-3 (PHI boundary on the phone — asked twice, never answered), DA-4; Q-API-14 held.
- PROPOSED by Claude, unruled: route 1 home-screen web app first, built so a Capacitor wrapper is later a wrap not a rewrite; a build convention "every new or touched screen works at phone width"; sign-in by emailed six-digit code on the phone (magic link opens Safari, which does not share a session with a home-screen app); Entra redirect for the hosted origin; a short gate for a hosted sign-in page.
- Claude's question, PARKED unanswered: beyond documents, what does he actually do in the CloudLex app on the phone?

## 3. The laptop fact (CORRECTS Claude's chat wording "office PC")
- Michael: "I do not have an office PC per se, rather I use the same laptop whether in the office or on the road. I plug the laptop into a docking station. When I am going to be trying to use this app, in all likelihood my PC will be asleep or turned off."
- Claude's misstatement was in chat only; no filed document carries it. The record already had it right: #137 (his own answer, 2026-08-22) — "no always-on desktop; the ThinkPad P1 is on most of the time but is a laptop that sleeps and travels"; the #154 memo v2's runner-shape row "P1 local service ... when the laptop is awake"; the T3 design: the app never needs the GPU box awake to browse transcripts. (Claude's chat reply attributed the quoted phrase "a laptop that sleeps" to the #154 memo; it is #137's. Corrected here; chat only.)
- PROPOSED by Claude, unruled: hosting moves BEFORE go-live and detaches from the phone work (test on the one TEST record); host behind his Microsoft sign-in (the built bundle likely carries template text and the disclosures master — an ASSUMPTION, src/ not read; a Code session confirms in one look); device/session gate before go-live (Supabase sessions never expire by default; inactivity timeout and time-boxed sessions are Pro features; nothing in the gates doc, runbook, BUILD-STATE, CLAUDE.md or master spec addresses session expiry, disk encryption, auto-lock or remote wipe); Intune covers the laptop too, which raises the value of Q-API-14's SKU fact.
- Claude's question, PARKED unanswered (it is the record's OPEN-3): is mdb-pllc the ThinkPad P1 Gen 8, and is the P15 still in use?

## 4. The form builder — beyond disclosures, and creating forms himself
- Michael: "Another thing that I want to talk about is the form builder. Up until now, we have spent a considerable amount of time dealing with solely the disclosures form builder. I am going to want the software to be able to generate other forms as well and am going to want to be able to create forms. Is that something that we are thinking about as well? If not, let's put this on the list of items to address as well."
- REQUIREMENT STATED (his words above), two limbs: (a) the engine generates forms other than disclosures; (b) HE can create forms.
- Limb (a) is on the record: form-engine.md line 5 ("The same engine later drives all firm forms ..."); register row FE-s11.2 (remaining template conversions — later slices, OUT of FE-D1); FE-4..FE-7 RULED 2026-08-11 and unauthorized; FE-8..FE-17 rows; the seven-candidate distillation queue (form-engine.md s13.4); DE-1 template spec; CR series; FE-SEED-1 (nothing seeds the template bank in live mode).
- Limb (b) is NOT on the record as a design: spec s1 settles the opposite division of labor ("Claude builds the engine, new complex templates, and new merge-field wiring; Michael owns routine wording changes"); the built editor is minimal (plain text with tokens, Save as a new version); spec s11 item 4 (in-app template editor UX) is open; FE-7 distillation is a design-session act, not self-service; FC-1..FC-4 importer posture is ruled and NO import tooling is authorized (FC-12 "structure only").
- TO BE MINTED as a register row in this conversation's packet (label only; durable ID his to mint): self-service form creation — full question text per QR-1.

## 5. The Opus dispatch for a phone night
- Michael (~17:12 CDT): "Prepare an opus prompt to run in a clean cowork session that will start working on whatever needs to be done to move any pending items forward. I will be out of the house tonight and will be working on this from my phone."
- Delivered: CHAT-DISPATCH v6 (44,688 B; sha256 0f8c406fe85e0ad5d2a705c908c430da2e7a86c2658e8b95e64b4878d0af1658) — a chat file; a byte-identical copy in `Claude outputs\` on mdb-pllc (verified by on-device sha256); and a phone-launch copy in project knowledge at `claude/claude_CHAT_DISPATCH_v6_2026-09-18.md` (doc uuid 7d1d2604-97e2-479c-8bbd-33d6c4ca3f00), which the chain deletes when it completes. opus-dispatch skill v2, DISPATCH-PACKET MODE, CHAT side only; NO CODE-DISPATCH (the Code acts on the table need him at a terminal).
- Nine tasks, none a ruling and none a build: (1) the Wave 0(a) deploy-session kickoff prompt; (2) the `#157` ruling sheet, prepared with PF-1; (3) hosting / phone / device research memo and sheet; (4) DECISION 8's first tranche of entry DRAFTS, PF-1, drafted-not-inserted; (5) Wave 0(d) backup vendor one-pager; (6) form-builder design-INPUT memo with rendered fictional examples; (7) the hands-on sitting kit; (8) a TRANSIT readiness table (verification only); (9) register overtaken-row CANDIDATES (data prep, optional). Two modes: A (bridge granted at the laptop before he leaves) and B (no bridge: tasks 1, 3, 5, 6 only; zips HELD).
- Deliberately omitted there, with reasons: the split-store slice (`Q-API-20` "After"; BUILD-STATE: "drafted after the walk, once `Q-API-18`'s facts are in"); `FO-6` and per-paragraph regenerate ("later"); every ruling sitting; every his-hand act.
- Capacity: the meter read 1,779,044 / 2,000,000 = 89.0% (seventeen docs) at ~16:10 CDT and 1,792,176 = 89.6% (eighteen docs) at ~17:30 CDT after the dispatch copy entered — +13,132 units for 44,688 B. For that reason THIS conversation writes no capture pair into project knowledge: the packet in `inbox/` is the filing and this ledger rides it as EVIDENCE.

- Michael (~17:33 CDT, while this conversation's packet was being assembled): "While you're packaging, can I go ahead and start the Opus session?" — answered YES: the dispatch is final in all three places, it fences this packet by filename and by row label, and the two sessions write different filenames into inbox/. He was reminded to approve the folder-access prompt at the laptop first.

## 6. Web pages fetched 2026-09-18 (WebFetch; each summarized by the fetch tool — re-fetch before quoting in any shipped document)
- supabase.com/docs/guides/auth/sessions — sessions last indefinitely by default; time-box, inactivity timeout, single-session on Pro and up.
- supabase.com/docs/guides/auth/auth-email-passwordless — email OTP: `{{ .Token }}` template, six digits, `verifyOtp`, one-hour default expiry.
- intercom.help/progressier/en/articles/10433517 — Safari and an installed web app do not share storage; a magic link signs in Safari only.
- magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide — web push and badging from iOS 16.4 once on the Home Screen; no Background Sync; its 50 MB / 7-day storage claims are DISPUTED and were not relied on.
- capacitorjs.com/docs/getting-started/environment-setup — Capacitor 8: macOS required for iOS builds; Xcode 26.0 minimum; Node 22+.
- capawesome.io/blog/how-to-build-and-deploy-ios-apps-without-a-mac — cloud build services exist; interactive debugging still needs a Mac.
- developer.apple.com/support/unlisted-app-distribution — unlisted distribution needs App Review; link-only; not for beta.
- foresightmobile.com/blog/ios-app-distribution-guide-2026 — $99/yr program; TestFlight 90-day builds; Ad Hoc 100 devices.
- learn.microsoft.com/en-us/azure/static-web-apps/authentication-custom — custom authentication only on the Standard plan.

## 7. Observations for the runner's refresh (none adjudicated)
- BUILD-STATE's For-design-side CAPACITY bullet says the `#157` pair entered project knowledge; the project's doc list on 2026-09-18 shows no 2026-09-13 file. The capture itself is filed at `docs/record/dorsaneo-pass-2026-09-13/`.
- Two register rows read ⬜ though the record shows the act done: `MIGRATION — NEW 2026-08-16 (#94)` (BUILD-STATE: "THE MIGRATION RAN 2026-08-19 (#113)") and `v23 INSTRUCTIONS — NEW 2026-08-18 (#105)` (the instructions record PF-1 and FC-14 reaching the live text in v28). CANDIDATES only; whether the 2026-09-01 cleanup adjudications left them deliberately was not checked.
- The device VM's shell MOUNTED the checkout on 2026-09-18 — the first time since before 2026-09-10 (`#155`, `#156`, `#157` all worked by staged copies).
- Notes that should ride the next instructions revision (no trigger fired today): the `fileUuid`-is-a-snapshot note (2026-09-16); the mount working again; "his machine is a laptop that docks, sleeps and travels" (the master spec's older transcript-hardware line says "the office PC").

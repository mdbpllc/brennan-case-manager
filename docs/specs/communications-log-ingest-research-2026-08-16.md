# Communications-Log Ingest — Research Memo

**PROPOSED — RESEARCH ONLY. NOTHING RULED, NOTHING BUILT, NOTHING AUTHORIZED.**

> Canonical repo path: `docs/specs/communications-log-ingest-research-2026-08-16.md`
> Source: CHAT-DISPATCH Task 15, design session, Opus 5, Cowork, **2026-08-16 Central**
> (DT-1 clock-checked at authoring: **14:28 CDT**; container read 19:28 UTC, same date —
> the 19:00 Central roll had not happened).
> **Michael did not participate in this session and made no rulings.** Everything below is
> PROPOSED. Nothing here enters the build queue, and a build session must not read this
> document as a design. See §10 (non-goals) and §13 (what this session did not do).

---

## 1. What this document is — and the one thing it deliberately is not

CHAT-DISPATCH Task 15 asks for a research memo on **communications-log ingest**: Graph
mail and Teams ingest surfaces, SMS and voice sources per the planned capture kit,
source-agnostic normalization patterns, and privilege/work-product tagging implications
drafted as questions.

It is **not** a specification for a communications-log module. No such module has been
designed, and — as §2 establishes — no constraint on it has been ruled. This memo maps
the ingest surface, reports what is verifiable at HEAD, and hands the design questions
back.

### 1.1 Provenance marking — and an extension of the convention that is itself a question

The #80 / #85 / #88 convention is carried forward and **must not be stripped**:

| Mark | Meaning |
|---|---|
| **`[A]`** | Clean-authority PDF in the Knowledge Repo, read locally, **quotable as rule text** |
| **`[B]`** | Vendor documentation reached through a **summarizing fetch layer** — a design input, **NOT quotable as normative text**; a build session confirms each figure against the live doc before relying on it |
| **`R`** | Repo, read full-text at HEAD through the device bridge |

**This memo introduces a fourth mark, and introducing one is a design act, so it is named
rather than slipped in.** One load-bearing answer in §6 comes from a **Microsoft Q&A forum
thread**, not from vendor documentation. That is materially weaker than `[B]` — it is a
moderator's answer on a community board, not a published contract of behavior — and
collapsing it into `[B]` would overstate it.

| Mark | Meaning |
|---|---|
| **`[C]`** | **NON-NORMATIVE COMMUNITY SOURCE** — vendor-affiliated forum answer. Weaker than `[B]`. Treated as **evidence that a question was asked and answered**, never as documentation. |

Whether the provenance convention gains this tier permanently is **`Q-COM-9`**, Michael's.

### 1.2 Reconcile-first checks, run at HEAD before anything was written

Repo read full-text at HEAD through the device bridge: **`ab3a61d`** on `master`
("*Queue-runner (forty-third invocation): QR-5 to runner v8, and file the CHAT-DISPATCH
Task 14 RE-1 inputs memo*", 2026-08-16 14:13 Central). Bridge grants requested and given
at session start for **both** folders — `C:\Users\Brennan\brennan-case-manager` and
`C:\Users\Brennan\Documents\Knowledge Repo` — per BUILD-STATE's standing instruction at
the Task 15 resume line. **The two-folder grant is what made §9 possible.**

**And the #88 bridge limit was honored rather than repeated.** A bridge read shows a LOCAL
head and nothing about origin. `git rev-parse origin/master` and
`git rev-list --left-right --count origin/master...HEAD` were **both run**:
`origin/master == HEAD == ab3a61d`, **0 ahead / 0 behind**, `inbox/` empty. This is **not**
a QR-3 pass (no `git fetch` — the mount returns `HTTP 403 from proxy`, per #74); it
establishes only that the last-fetched origin ref and the local head agree.

| # | Check | Result |
|---|---|---|
| 1 | Is a communications-log module designed anywhere? | **NO.** Word-bounded across `docs/`: the phrase appears **four** times — the unbuilt-territory map (`future-modules-capture-2026-07-28.md:67`), the platform-agnostic sentence (`:95`), and the two log lines that produced them (`session-log.md:4945`, `:5883`). **No document elaborates it.** Same shape as RE-1 at #88. |
| 2 | Does it have a queue row or a durable ID? | **NO.** `attorney-review-queue.md` carries no communications-log row. #30's own words: *"Map only — no IDs, no designs."* |
| 3 | Do communications tables exist? | **NO.** Word-bounded across `db/schema.sql` + all three migrations + `supabase/`: `communication` 0 · `communications` 0 · `correspondence` 0 · `chat` 0 · `sms` 0 · `mms` 0 · `mailbox` 0 · `thread` 0 · `envelope` 0 · `ingest` 0. Extends #85's identical sweep. |
| 4 | Does the WF series already cover this? | **PARTLY, AND NOT THIS PART.** WF-2–WF-8 are email-**derived workflow pipelines** (#85). A communications **log** is a per-case record of what was communicated. They share an ingest surface and nothing else. §4 points at #85 rather than re-researching it. |
| 5 | Is there existing privilege authority in the registry? | **NO — see §9.2.** Seven `privilege` hits across all four registry files, every one about **assertion mechanics** in discovery. Nothing states what work product *is* or what the lawyer-client privilege *covers*. |
| 6 | Does the record name an SMS ingest source? | **NO.** The only SMS mention in any spec is `case-heartbeat-design.md:142`, where SMS is an **outbound escalation channel**, not an inbound source. |

---

## 2. THE GATE — a FIFTH resolution, and the first where the dispatch's own word is contradicted in terms

BUILD-STATE:96 records that the chain has now met four gate resolutions: Task 8 elaborated
rulings (#81); Tasks 9–11 mapped with no ruling to elaborate (#83–#85); Task 12 had the
direction ruled and the destination not (#86); Task 13 was told "staged constraints govern"
when the constraints were a proposal (#87).

**Task 15 is a fifth, and it is the sharpest of them.** The dispatch says:

> *"Ruled constraints govern: platform-agnostic chat-source ingest; the Claude-in-shared-channel
> evaluation is OUT of scope (the paralegal hire is its decision point — say so)."*

**The record says, in terms, that no ruling was made.**

### 2.1 What the record actually says — verbatim, at HEAD

`session-log.md:4934–4948` (**#43**, 2026-08-09, design session, Fable 5) `R`:

> *"Michael asked whether Slack integration would add significant value to the software.
> **Claude's recommendation (opinion, not a ruling):** no for the current phase … Design
> consequence: the communications-log module should be platform-agnostic on chat-source
> ingest. Michael instructed the exchange be preserved; captured as a watch-item section in
> future-modules-capture-2026-07-28.md.* ***No ruling was made on Slack, Teams, or Claude Tag
> adoption; nothing entered the build queue.*** *Decision point named: the paralegal hire."*

And the runner line that routed it, `session-log.md:4812` `R`:

> *"Slack-decline and the Teams preference are recorded as **Claude recommendations, unruled**,
> and Claude Tag entered **no** build queue or roadmap."*

And the capture's own header, `future-modules-capture-2026-07-28.md:2` `R`:

> *"STATUS: CAPTURE — everything here is PROPOSED and unruled unless marked otherwise."*

Its §3 **is** marked otherwise — as *"OBSERVATION / CONSIDERED-AND-DECLINED-FOR-NOW —
nothing here is proposed for build"*. That marking is **weaker** than the default, not
stronger. And BUILD-STATE:117 still lists the whole file as **"UNRULED, adopt nothing."**

**Both of Task 15's named constraints come from that one paragraph.**

### 2.2 The two constraints resolve DIFFERENTLY, and the difference is the finding

They are not the same kind of thing, and treating them alike is how an opinion becomes law.

**(b) — "the Claude-in-shared-channel evaluation is OUT of scope; the paralegal hire is its
decision point" — is HONORED, and honoring it costs nothing.** It is a **scope exclusion**.
The dispatch's own instruction is self-executing ("say so"), the record does name the
paralegal hire as the decision point, and declining to evaluate something forecloses no
future choice. **So this memo says so, plainly:**

> **The Claude-in-shared-channel evaluation is OUT OF SCOPE of this memo and of any
> communications-log design that precedes it. Its decision point is the paralegal hire
> itself. Nothing here evaluates, recommends, or prepares for it.** The three gates #43
> recorded — (1) privilege/PHI data-handling-terms review, (2) plan tier and seat minimums,
> (3) whether the shared-channel product expands beyond Slack by hire time — were
> **deliberately left ID-less** at #44 *"so they don't sit on the roster until the decision
> point arrives"* (`session-log.md:4805` `R`). **This memo does not mint IDs for them
> either.**

**(a) — "platform-agnostic chat-source ingest" — is DIFFERENT, and it is not honored as a
governing constraint, because it is not one.** It is an **architectural commitment**. It
says a future module must be built a particular way. It came from a Claude opinion inside a
paragraph the record twice labels unruled. Treating it as governing is exactly the hazard
`Q-QBO-1` named at #87: *"a research pass following a proposal is not the same as the
proposal being adopted, and the longer it is treated as governing the more it will read as
settled."*

**So this memo takes it as a HYPOTHESIS and tests it** — §5.4 and §6.4 report what
platform-agnosticism would actually cost against the surfaces that exist, which is the one
thing that makes the underlying question rulable. **That is `Q-COM-1`, and it is the
question this memo exists to hand back.**

**Stated once so it cannot be inferred away:** nothing in §§5–8 should be read as
implementing a constraint. §§5–8 are what a ruling on `Q-COM-1` would need to know.

---

## 3. WHAT EXISTS TODAY — one table is already a communications log, and three closed vocabularies say what it may hold

The system does not have a communications log. It has **`transcripts`**, which is the same
shape wearing a narrower name: a per-case record of a communication, with participants,
a context, a privilege characterization and a text body. Any communications-log design
either extends it or duplicates it. `db/schema.sql:617–648` `R`, read at HEAD:

```
source        text not null default 'manual'
              check (source in ('recorder','phone','manual'))
context_type  text not null check (context_type in (
              'client_meeting','client_call','intake_call','adjuster_call',
              'opposing_counsel_call','witness_interview','deposition','hearing',
              'mediation_dictation','voicemail','dictation'))
privilege_tier text not null default 'work-product'
              check (privilege_tier in ('privileged','work-product','non-privileged'))
consent_status text not null default 'unknown'
              check (consent_status in ('announced','written','one-party','unknown'))
phi_flag             boolean not null default false
discoverable_flag    boolean not null default false
```

**FINDING — the closed `source` vocabulary is the platform-agnosticism question made
concrete, and it is enforced in TWO tables, one of which is the staging path.** `source`
admits exactly **`'recorder'`, `'phone'`, `'manual'`** — no chat value, no mail value, no
SMS value — and the identical CHECK sits on **`staging_items`** at `db/schema.sql:668` `R`,
which is the table an ingest pipeline would land in. Every one of the eleven `context_type`
values is an **audio or meeting** context. A written-channel communication has nowhere to
be.

**This is not an argument against platform-agnosticism; it is its price, stated.** The
constraint's cost is not abstract — it is two live CHECK constraints and an eleven-value
enum, all of which a chat-capable design must open. **Flagged, not changed.** Widening a
CHECK is a schema act; naming which values it should carry is a design act; both are
Michael's (`Q-COM-2`).

**FINDING — identity resolution has no substrate at all.** A communications log's first
job is to answer *"which party is this from?"* Word-bounded across `db/schema.sql` and all
three migrations `R`: **`email` 0 · `emails` 0 · `phone_number` 0 · `mobile` 0 · `address` 0
· `handle` 0 · `upn` 0 · `external_id` 0.** `parties` (`db/schema.sql:166`) carries
`display_name`, `role_tags`, `aliases jsonb` and a free-form **`fields jsonb`** — no typed,
indexed, or unique column anywhere holds an email address or a telephone number. Resolving
`adjuster@carrier.example` or `+1 210 555 0143` to a party row means sifting untyped JSONB
with no uniqueness constraint and no index.

CD-1 built real machinery for this problem — typed aliases and a **multi-match FLAG** — and
it operates on **names**. Nothing does it for addresses or numbers. **`Q-COM-3`.**

---

## 4. GRAPH MAIL — a pointer, not a re-research

**#85 §4.2 already researched the Graph mail ingest surface and this memo does not repeat
it.** Re-deriving it would produce a second set of figures to keep in step, which is the
`cr3-field-code-map.md` failure mode. What #85 established, marked `[B]` there and cited
here as repo record `R`:

- Change notifications need a **publicly accessible HTTPS endpoint**, a **10-second**
  validation handshake and **3-second** delivery acknowledgment; Outlook `message`
  subscriptions expire in **under 7 days** (**under 1 day** with resource data), so renewal
  is mandatory machinery.
- **Delta query** removes the public endpoint but not the background runner.
- Background execution means **app-only credentials** — a secret or certificate this
  registration deliberately lacks — **tenant-wide by default** absent Exchange Application
  RBAC.
- `Calendars.ReadWrite` **reads no mail**; `Mail.Read` is a **new consent act on Michael's
  registration**.
- **Throttling is a non-problem** at ~34–45 messages/day and should not be designed around.

**Q-WF-4 — "does this application acquire a server-side identity, and of what shape" —
governs a communications log exactly as it governs the WF series.** #85 recorded that
question as having **two** consumers (WF-2–WF-8 and #87's `Q-QBO-3`), and #88 deliberately
declined to add a third because every referral act is attorney-initiated and synchronous.

**A communications log is genuinely the third consumer, and it is a stronger one than either
existing consumer.** WF pipelines watch for particular email *types*; a log wants
**everything, continuously, forever**. It is the most background-dependent thing anyone has
proposed. **Q-WF-4 therefore moves to THREE consumers** — recorded here as a fact about that
question, **not** as an amendment to it (`Q-COM-4`).

---

## 5. GRAPH TEAMS / CHAT — the surface #85 did not cover, and it gates differently from mail

Everything in §5 is `[B]` — Microsoft Learn through a summarizing fetch layer, retrieved
**2026-08-16 Central**. **Not quotable as normative text.**

### 5.1 The surfaces

*Microsoft Learn, "Get change notifications for messages in Teams channels and chats using
Microsoft Graph"* `[B]` — subscribable resources:

| Resource | Delegated | Application |
|---|---|---|
| `/teams/{team}/channels/{channel}/messages` | `ChannelMessage.Read.All` | `ChannelMessage.Read.Group`, `ChannelMessage.Read.All` |
| `/teams/getAllMessages` (tenant-wide) | **not supported** | `ChannelMessage.Read.All` |
| `/chats/{chat}/messages` | `Chat.Read` | `ChatMessage.Read.Chat`, `Chat.Read.All` |
| `/chats/getAllMessages` (tenant-wide) | **not supported** | `Chat.Read.All` |
| `/users/{user}/chats/getAllMessages` | `Chat.Read`, `Chat.ReadWrite` | `Chat.Read.All`, `Chat.ReadWrite.All` |

Two mechanics matter and neither has a mail analogue:

- **Lifecycle notifications are mandatory past one hour.** *"If you request a subscription
  expirationDateTime that is more than 1 hour in the future, you must subscribe to lifecycle
  notifications by including a lifecycleNotificationUrl property … Otherwise your
  subscription request will fail."* `[B]` **That is a second public endpoint**, on top of the
  notification endpoint §4 already says does not exist.
- **Resource data requires encryption key management.** Including message content in the
  notification requires an `encryptionCertificate` and `encryptionCertificateId`;
  *"Subscriptions for notifications without resource data don't require an encryption
  certificate (because actual resource data isn't sent over)."* `[B]` So a content-bearing
  chat subscription obliges the firm to **hold and rotate a private key**, which is
  credential-tier custody in the LegiScan/QBO class.

### 5.2 THE GATE THAT HAS NO ANALOGUE ANYWHERE ELSE ON THIS RECORD — a third party's approval

*Microsoft Learn, "Protected APIs in Microsoft Teams"* `[B]`:

> *"The following APIs are currently protected, and all use Microsoft Graph application
> permissions."* · *"To request access to these protected APIs, complete the following
> request form."* · *"We usually review access requests every Wednesday and deploy approvals
> every Friday or Monday, except during major holiday weeks in the U.S."*

**Every gate previously found in this chain is either Michael's ruling or another module's
construction.** #85 said so in terms about the WF series: *"No WF item is buildable today,
and none becomes buildable by a design pass — every gate is either Michael's ruling or
another module's construction."*

**This one is neither.** It is an **outside vendor's discretionary approval of the firm's
application**, on a weekly review cadence, decided by people the firm has no relationship
with. It cannot be ruled open and it cannot be built around. **It is a new gate class on
this record, and it is reported as such rather than folded in with the others**
(`Q-COM-5`).

**RESEARCH HONESTY — the list itself was NOT retrieved.** The page's enumeration of *which*
APIs are protected did not render through the fetch layer across two attempts with different
prompts. The only enumerated datum recovered is a negative — *"Send message is not a
protected API"* `[B]`. **So it is NOT established here whether the chat-message read surfaces
in §5.1 are on that list.** Reported rather than guessed, exactly as the QBO memo reported
its four unreadable `developer.intuit.com` fetches. Resolving it is **`COM-LOOK-1`**, and it
is one page-load of work.

### 5.3 Licensing and metering — a date conflict, FLAGGED not resolved

*Microsoft Learn, "Payment models and licensing requirements for Microsoft Teams APIs"*
`[B]` carries **three mutually awkward statements** on one page:

1. *"Starting August 25, 2025, the Teams APIs listed in this article are no longer metered,
   and no billing configuration is required to use these APIs."*
2. *"This article is deprecated and will be removed in June 2026. It's provided for
   reference only."*
3. A full live rate card — Model A (security/compliance apps, E5-eligible licence, seeded
   capacity) vs Model B (everything else, no seeded capacity), **$0.00075 per message**
   beyond seeded capacity; evaluation mode at **500 messages/month per tenant per app**,
   failing with **HTTP 402**.

**Today is 2026-08-16. A page that said it would be removed in June 2026 is still published
in August 2026.** Under SOURCING, currency is never inferred from a document — so the
correct statement is: **the metering position for Teams message APIs is UNESTABLISHED as of
this session.** It is not "free"; it is "the only source found says two things and has
outlived its own removal date." **`Q-COM-6`** carries it; **`COM-LOOK-2`** is the cheap fix.

This is the same failure mode #87 recorded when *"two date conflicts [were] FLAGGED NOT
RESOLVED"* against Intuit's documentation. **Second vendor, same shape.**

### 5.4 What §5 costs the platform-agnosticism hypothesis

Testing constraint (a) against what exists rather than assuming it:

| | Mail (per #85) | Teams chat (per §5) |
|---|---|---|
| Consent act on Michael's registration | `Mail.Read` | `Chat.Read.All` / `ChannelMessage.Read.All` |
| Public HTTPS endpoint | 1 (notifications) | **2** (notifications + lifecycle) |
| Private key custody | none | **required** for content-bearing notifications |
| Outside-party approval | none | **protected-API request, weekly review** |
| Metering | non-problem at this volume | **UNESTABLISHED** (§5.3) |
| Tenant has the data today | **YES** — mail is live | **NO** — no Teams usage is on the record |

**The honest read: "platform-agnostic on chat-source ingest" is not one constraint but a
commitment to carry the harder of two very different pipelines for a channel the firm does
not currently use.** Nothing about that makes it wrong — a solo practice that hires a
paralegal in a year may well want it. **But it is a real cost, it was never priced, and it
was proposed by Claude in a paragraph the record twice calls unruled.** That is `Q-COM-1`,
and §5 is what makes it answerable.

---

## 6. SMS — the source the dispatch names, the record has never had, and the platform cannot give

### 6.1 The record's position: SMS has never been an ingest source

Word-bounded across every `.md` in the repo `R`, exactly one spec mentions SMS:
`case-heartbeat-design.md:142`, where the escalation ladder runs *"silent report line →
in-app → push → repeat-push/SMS"* — **SMS as an outbound channel the system uses to nag
Michael.** It has never been proposed as something the system reads.

**The dispatch's phrase "SMS/voice sources per the planned capture kit" joins two things the
record treats very differently, and it should be split.** The planned capture kit
(`transcript-workflows.md` §9 `R`) is entirely a **voice** kit: a Tascam DR-05XP recorder, a
Rode SmartLav+ lavalier, 48 kHz 32-bit-float WAV. **There is no SMS half of the capture
kit.** §7 answers the voice half against the kit as written; §6 answers an SMS question the
record has never asked. **`Q-COM-7`** asks whether it should be asked at all.

### 6.2 Microsoft Teams DOES have SMS now — and it is the least ingestible surface examined

*Microsoft Learn, "Planning for SMS in Microsoft Teams"* `[B]`, retrieved 2026-08-16:

- **It exists, US and Canada**, inside Teams Chat: *"Microsoft Teams Calling Plans support
  sending and receiving SMS messages within Teams Chat, for users in United States
  (including Puerto Rico) and Canada."*
- **Three licences**, all required: Teams + **Teams Phone** + **Teams Calling Plan**, with an
  assigned Calling Plan number and the user "voice enabled."
- **A2P registration is mandatory and is not a formality.** *"Microsoft Teams customers in US
  and CA must receive Brand and Campaign approval before any number can be enabled for SMS
  in Teams,"* and the requirement *"applies to businesses that do mass texting or marketing,
  as well as businesses that send individual messages,* ***even if it isn't for marketing
  purposes.***" A solo firm texting one client is inside this.
- **1:1 only, and no MMS.** *"SMS messages in Teams are supported with one-on-one Chat
  conversations. MMS, attachments, emojis, stickers, and GIFs aren't currently supported."*
  10-digit long codes only — no toll-free, no short codes, no alphanumeric sender.

**THE PRACTICE CONSEQUENCE OF THE MMS LIMB IS THE ONE WORTH READING TWICE.** In a PI
practice the highest-value inbound text is a **photograph** — the scene, the vehicle, the
insurance card, the bill, the ER discharge sheet. A channel that cannot receive an
attachment cannot receive the thing clients actually send.

### 6.3 And it is not exposed to Graph — the load-bearing answer, on the weakest source in this memo

*Microsoft Q&A, "Teams SMS chats — are apps / message extensions and Graph access
supported?"*, answered 2025-11-27 by a Microsoft-affiliated moderator, marked accepted
`[C]` — **non-normative, see §1.1**:

> *"SMS conversations are **not exposed** as standard `/chats` resources in Microsoft Graph
> in the same way normal Teams chats are, and you cannot reliably call
> `GET /chats/{chat-id}/messages` … for SMS threads."*
>
> *"Teams apps, bots, or message extensions are **not supported** in native SMS chats … This
> is **by design** (plain-text protocol + carrier rules), not a temporary limitation."*

**If that holds, the finding is sharp: the one SMS surface that would put texting on the
already-committed M365/Entra/Graph stack — the very stack #43 preferred over Slack — cannot
be read by this application at all.** The vendor's own SMS planning page is silent on Graph,
retention, and eDiscovery; that silence is an **absence of documentation**, not a documented
"no." **The "no" comes from a forum post.**

**This memo does not treat `[C]` as settled.** **`COM-LOOK-3`** is the named look: confirm
against vendor documentation whether Teams SMS threads are reachable through Graph, and
whether Purview retention/eDiscovery covers them — the same thread asserts it does, on the
same weak footing.

### 6.4 What is left, and the gate they share

| Path | Ingestible? | The gate |
|---|---|---|
| **Teams SMS** | **Apparently not** `[C]` | §6.3; and three licences + A2P Brand/Campaign approval before a single text sends |
| **CPaaS (Twilio-class)** | Yes — webhook per message | **A public HTTPS endpoint and a background runner — Q-WF-4 again**, plus a new vendor holding client message content (BAA/data-terms class) and its own A2P registration |
| **A texting layer on the existing business line** | Vendor-dependent | Same shape as CPaaS; the record establishes nothing about the current carrier |
| **Michael's personal handset** | **NO** | **No programmatic surface of any kind.** Manual export or screenshot, by hand, per matter |

**THE HONEST HEADLINE, and it is the fourth row.** The firm's contact number on the record
is a **cell number**. If client texting is already happening there, then **the
communications log's largest real-world gap is the one channel with no API at all** — and
every path that closes it either introduces a new outside custodian of privileged content or
requires the server-side identity Q-WF-4 asks about. **`Q-COM-7`** carries this, and
**`COM-LOOK-4`** is a one-line fact question only Michael can answer: **is client texting
happening today, and on what number?**

---

## 7. VOICE — the ruled capture model, and the one Microsoft-native path, which inverts it

### 7.1 What is actually ruled here — and unlike §2, this part IS ruled

`transcript-workflows.md` §8 `R` records **six design decisions ANSWERED by Michael on
2026-07-21**. Three bind any voice ingest:

- **8.1 LOCAL-FIRST.** Phase 1 runs entirely on Michael's PC. §1.7: privileged and PHI
  audio *"never leaves hardware he controls; the guardrail is satisfied by architecture
  rather than by contract."* A cloud arm requires enterprise data terms and a
  **HIPAA-eligible tier + BAA** first.
- **8.3 OPT-IN PER CALL** — *"not default-on."*
- **8.2 SILENT WHERE LAWFUL**, with two surviving guardrails: opposing counsel stays
  **announced**, and the out-of-state-participant check is a **HARD prompt**.

And the phone arm is **explicitly deferred**: §2 *"Phone-call arm (LATER — with the cloud
stack) … Until built, phone-call capture is manual/ad hoc."* Phase 3, *"when phone volume
justifies it."*

### 7.2 `callRecords` — metadata without content, and it may be the most useful thing in §7

*Microsoft Learn, "Working with the call records API"* `[B]`: *"Call records provide usage
and diagnostic information about the calls and online meetings that occur within your
organization"*; *"A call record is created after a call or meeting ends and the record is
retained for **30 days**"*; PSTN calls are covered via `pstnCallLogRow` /
`directRoutingLogRow`. **No audio, no transcript, no content.**

**PROPOSED, and it is the one design idea in this memo worth its own line:** a
communications **log** and a communications **archive** are different products, and only the
archive needs content. *"Called the adjuster Tuesday at 2:14 for eleven minutes"* is a
complete and useful log entry. It carries **no privilege problem, no consent problem, no PHI
problem, and no recording at all** — the three hardest constraints in §7.1 simply do not
attach, because nothing was captured.

Two limits, stated so the idea is not oversold: it reports **30 days**, so anything durable
must be copied out on a schedule (a background runner — **Q-WF-4 a third time**); and it
sees only calls **inside the tenant**, which today means it would see nothing, because the
record establishes no Teams Phone deployment.

### 7.3 Compliance recording — the only Microsoft-native path to call content, and it contradicts 8.3

*Microsoft Learn, "Microsoft Teams compliance recording (third-party)"* `[B]`:

- **No first-party option exists.** *"Microsoft only supports compliance recording solutions
  from the listed, certified partners."*
- A **recording bot** that *"must run on a Windows Virtual Machine and be deployed in
  Azure"*, plus a policy assignment and an eligible licence (Business Premium/Standard, E3/E5
  and similar).
- **The media goes to the partner**, not to Microsoft.
- **And this:** *"Users with an assigned compliance recording policy know that their digital
  interactions with Teams are being recorded. Depending on the third-party recording solution
  and how it's configured, users **might not be able to disable the recording** and might not
  have access to the recording."*

**FINDING — the only Microsoft-native path to call content is policy-based and always-on,
and the ruled capture model is opt-in per call. These are not reconcilable by configuration;
they are opposite defaults.** Ruling 8.3 chose opt-in deliberately and the design *"compensates
with frictionless capture and suggested-recording prompts at the high-payoff moments."*
Compliance recording records everything the policy covers, by design, because that is what
compliance means.

**A second, independent collision:** the partner's storage holds the media. Ruling 8.1's
whole point was that privileged and PHI audio *"never leaves hardware he controls"* and that
the guardrail is *"satisfied by architecture rather than by contract."* **Compliance
recording converts that architectural guarantee back into a contractual one** — a BAA and a
data-processing agreement with a third party, the same class as the future Azure arm, which
8.1 already gated behind exactly those terms.

**FLAGGED, NOT RESOLVED.** Choosing between them is Michael's (`Q-COM-8`). What this memo
will not do is quietly design around a ruling.

---

## 8. SOURCE-AGNOSTIC NORMALIZATION — patterns, all PROPOSED

Patterns, not a schema. Nothing here is a migration and nothing here should be built.

### 8.1 The adapter boundary is where source-agnosticism is either real or cosmetic

**PROPOSED:** every source gets an adapter whose only job is to emit the canonical record;
**nothing above the adapter names a platform.** The existing DataAdapter interface is the
in-house precedent — *"the UI talks only to the DataAdapter interface — every feature works
in both modes"* (BUILD-STATE `R`) — and it is a good one.

**The failure mode worth naming, because it is the one that actually happens:** a
platform-agnostic core that leaks one platform's vocabulary into the canonical record — a
`conversationId` shaped like a Graph chat id, a `threadIndex` shaped like an RFC 5322
header. Agnosticism is decided by what the canonical record **refuses to carry**, not by
what the adapters are called.

### 8.2 The canonical record — the fields every source can actually fill

**PROPOSED.** The discipline is that a field belongs here only if **every** contemplated
source can populate it honestly; anything else is source-specific and goes in a provenance
envelope (§8.5).

| Field | Why it survives every source |
|---|---|
| `occurred_at` + `recorded_tz` | Every channel has a time. **DT-1 applies to stored stamps.** |
| `direction` (in / out / internal) | Every channel has one |
| `participants[]` → party links + **unresolved raw identifier** | §8.3 — the raw string is preserved *because* resolution can fail |
| `channel` | The one place the platform is named, deliberately |
| `body_text` **nullable** | Voice has none until transcribed; `callRecords` never has one |
| `has_content` vs `metadata_only` | §7.2 makes this a first-class distinction, not a null check |
| `attachments[]` | Present or empty — SMS-via-Teams can never fill it (§6.2) |
| `source_ref` (opaque) | Dedupe and re-fetch; **never parsed by the core** |
| `provenance` (§8.5) | How this row came to exist |
| `privilege_tier` + `phi_flag` + `discoverable_flag` | §9 — and **§9.3 says the default is the problem** |

### 8.3 Identity resolution — the pattern the codebase already chose

**PROPOSED, and it is a carry rather than an invention.** CD-1 solved the same problem for
names: typed aliases, and where a name resolves to more than one contact, a **multi-match
FLAG** rather than a guess. BUILD-STATE `R` is explicit that flagging is the built behavior
and that *"a check expects a HIGH flag count — a LOW number would mean something was
guessed."*

**The same rule, applied to addresses:** an inbound identifier resolves to exactly one party,
or it **flags**. It never picks the likeliest. And per §3, **the substrate for this does not
exist** — there is no typed home for an email address or a phone number on `parties`.
`Q-COM-3`.

**The trap, named:** one human is many identifiers (work mail, personal mail, cell, office
line, a Teams UPN), and one identifier is sometimes many humans (a shared claims inbox, a
firm's general line). CD-1's `contact_edges` types **relationships between contacts**; it
does not type **identifiers belonging to a contact**. Those are different edges.

### 8.4 Dedupe, ordering, threading

- **Dedupe on `source_ref` first**, content hash second. The same message arrives twice
  (a delta replay, a re-run, both sides of an internal thread) and the log must not double.
- **Ordering is by `occurred_at`, never by arrival.** Backfill and live tail interleave.
  **This is DT-1's shape in a new place** — a stamp taken from the wrong clock is a
  mis-ordered log, and every source stamps in its own zone.
- **Threading is per-source and does not generalize.** Mail threads by headers; chat by
  conversation id; SMS by number pair; a phone call is its own thread of one. **PROPOSED:
  the core stores the source's own thread key opaquely and does not attempt cross-channel
  threading.** A single "conversation" spanning an email, a text and a call is a **matter**,
  and the matter is what the case record already is.

### 8.5 Provenance, and what normalization must NOT do

**PROPOSED — every row carries how it got there:** source system, adapter version, fetch
time, whether it is content-bearing or metadata-only, and **whether any field was derived
rather than observed**.

**And the standing rule from `statute-pass-registry-retrieval-2026-08-14.md` §3 `R` applies
unchanged, because it is the same class of problem:** *transform only what is characterized;
REPORT anything else, never guess.* Two published normalizers were already wrong in this
project, both silently, and the second was written to fix the first. A communications
normalizer that quietly re-encodes a body, strips a header, or coerces a timestamp is the
same failure with a bigger blast radius, because the output is quoted in filings.

**Normalization must not:** infer a privilege tier (§9), infer a party from a partial match
(§8.3), rewrite body text, drop an unrecognized field rather than reporting it, or
manufacture an `occurred_at` when the source did not supply one.

---

## 9. PRIVILEGE AND WORK PRODUCT — the propositions, and three findings in built code

Per the dispatch, the **tagging implications are drafted as questions** (§11). This section
supplies the rule text those questions stand on, registry-style, and reports what reading it
against the schema turned up.

### 9.1 Propositions — ALL UNVERIFIED, packet-local IDs, no registry file opened

Sources per SOURCING. **`[A]` = clean-authority PDF in `Documents\Knowledge Repo`, read
locally at this session, quotable.** Texas Rules of Civil Procedure, **July 2026** PDF;
Texas Rules of Evidence, PDF stating **"Effective July 2, 2026"** on its face — **the
currency figure is each PDF's own statement and is not inferred from content.**

**EVERY QUOTATION BELOW WAS SPOT-CHECKED MECHANICALLY AGAINST RAW EXTRACTION** (`pdftotext`
without `-layout`, whitespace-normalized, literal match): **8 fragments, 8 PASS, 0 FAIL.**
Two TRE fragments return **3** raw occurrences rather than 1 — that is the definitional
formula recurring across the Article V privilege rules, and the quoted text is from
**503(a)(5)** specifically, read in place. **Reported rather than smoothed over.**
Characterization note: the Legislature's doubled-literal-`A` space artifact
(`statute-pass-registry-retrieval-2026-08-14.md` §3) **does NOT appear** in these Supreme
Court rules PDFs — `AA` occurrences in raw TRCP extraction: **0**. Different publisher,
different artifact profile; **do not carry the statute normalizer to these files.**

**`P-COM-1` — Work product includes communications, not just documents.** *"Work product
comprises: … (2) a communication made in anticipation of litigation or for trial between a
party and the party's representatives or among a party's representatives, including the
party's attorneys, consultants, sureties, indemnitors, insurers, employees, or agents."*
— TRCP 192.5(a)(2) `[A]`. **UNVERIFIED.** *Relied on for: a communications log is squarely
work-product territory by the rule's own terms, not by analogy.*

**`P-COM-2` — The tier is a legal stance, not a filing label.** *"For purposes of these
rules, an assertion that material or information is work product is an assertion of
privilege."* — TRCP 192.5(d) `[A]`. **UNVERIFIED.** *Relied on for: whatever a
`privilege_tier` column holds, writing `'work-product'` into it is the same act the firm
would take in a discovery response.*

**`P-COM-3` — Witness statements are excepted from work-product protection.** *"Even if made
or prepared in anticipation of litigation or for trial, the following is not work product
protected from discovery: (1) information discoverable under Rule 192.3 concerning experts,
trial witnesses, witness statements, and contentions."* — TRCP 192.5(c)(1) `[A]`.
**UNVERIFIED.**

**`P-COM-4` — A recording plus a verbatim transcript IS a witness statement; a note of the
same conversation is NOT.** *"A witness statement is (1) a written statement signed or
otherwise adopted or approved in writing by the person making it, or (2) a stenographic,
mechanical, electrical, or other type of recording of a witness's oral statement, or any
substantially verbatim transcription of such a recording. Notes taken during a conversation
or interview with a witness are not a witness statement."* — TRCP 192.3(h) `[A]`.
**UNVERIFIED.** *Relied on for: §9.4 — the transcription pipeline sits exactly on this line.*

**`P-COM-5` — Confidentiality turns on who the communication was intended to reach.** A
communication is *"confidential"* if *"not intended to be disclosed to third persons other
than those: (A) to whom disclosure is made to further the rendition of professional legal
services to the client; or (B) reasonably necessary to transmit the communication."*
— TRE 503(a)(5) `[A]`. **UNVERIFIED.** *Relied on for: the limb an ingest pipeline lives or
dies on — whether a CPaaS vendor, a compliance-recording partner, or a cloud transcription
arm sits inside (A) or (B) is the question §6 and §7 keep arriving at.*

**Dedupe result, run at HEAD across all four `legal-rule-registry-*` files `R`: NONE of
`P-COM-1..5` duplicates an existing entry.** No registry file was opened, edited, or
annotated. **These are packet-local and were deliberately NOT minted as durable registry
entries — minting is Michael's act**, per the `Q-PR3-` / `Q-QBO-` / `Q-RE-` precedent. This
is now a **TENTH** packet governed by ID-DL-1 (the queue records `Q-QBO-` as the eighth at
#87 and `Q-RE-` as the ninth at #88; verified at `attorney-review-queue.md:509`, `:524`).

### 9.2 FINDING — a FIFTH instance of the absence pattern, and the first one that is live in a shipped table

BUILD-STATE `R` tracks the shape at `Q-RE-8`: four research passes have now found a whole
category missing from the registry — no privacy proposition (#85), the insurance narrowing
(#78), no client-property or trust-accounting proposition (#87), no professional-conduct
proposition (#88). Its statement: *"the registry carries the law of the firm's CASES and
nothing about the law of the firm's PRACTICE."*

**This is a fifth, and it does not fit that formulation — which is why it is worth
recording.** Swept across all four registry files at HEAD `R`: `192.5` **0** · `503` **0** ·
`work product` **1** · `work-product` **1**. Seven `privilege` hits, **every one about
assertion mechanics** — TRCP 193.3's withholding statement, the prohibition on boilerplate
objections, who bears the burden, that contention discovery is not work product. **The
registry knows how to ASSERT a privilege in a discovery response. It contains no statement
of what work product IS or what the lawyer-client privilege COVERS.**

**And unlike the other four absences, this one is already load-bearing in shipped code.**
`db/schema.sql` `R` carries **two** `privilege_tier` columns, both `not null`, both live —
one on `generated_documents` (:521), one on `transcripts` (:636). **Rows are being written
against a legal characterization that no registry entry defines.** The other four absences
were about things not built.

### 9.3 FINDING — the two vocabularies still disagree, there are now THREE consumers, and the default is itself a legal conclusion

**Re-verified at HEAD, exactly as #85 found it:**

- `generated_documents.privilege_tier` — `check (... in ('attorney-client','work-product','non-privileged'))`, `db/schema.sql:521`
- `transcripts.privilege_tier` — `check (... in ('privileged','work-product','non-privileged'))`, `db/schema.sql:637`
- and the comment four lines above the first, at `db/schema.sql:514`: **`-- lands. Privilege vocabulary is the shared system-wide set.`**

It is not the shared set. There are two, and **they differ precisely at the term a
communications log needs most**. The mismatch is not cosmetic: `'attorney-client'` names one
specific privilege; `'privileged'` is a **genus** that in Texas also covers work product and
the other Article V privileges. **The two sets do not map cleanly in either direction** —
`'privileged'` → `'attorney-client'` narrows and may be wrong; `'attorney-client'` →
`'privileged'` widens and loses the fact of which privilege. **A communications log is the
third consumer and would have to choose, and choosing silently would settle #85's flagged
question by implementation.** `Q-COM-10`.

**AND THE DEFAULT IS THE SHARPER HALF.** Both columns read
`privilege_tier text not null default 'work-product'`. By `P-COM-2`, that default **is an
assertion of privilege**, applied automatically to every row nobody classified.

**For one of the eleven `context_type` values the default is affirmatively contrary to the
rule.** `'witness_interview'` is in the enum; by `P-COM-3` and `P-COM-4` a recorded witness
interview with a verbatim transcript **is a witness statement and is excepted from
work-product protection**. The column defaults it to `'work-product'` anyway. The same
reasoning reaches `'deposition'`. **`transcript-workflows.md` §1.3 already got this right in
prose** — it says witness-interview transcripts are flagged *"presumptively discoverable at
creation"* — and the built table's default says the opposite.

**FLAGGED, NOT FIXED. No schema file was touched.** At today's volume this is a fixture-data
defect. At communications-log volume — thousands of ingested rows, defaulting — it is a
production posture nobody chose. `Q-COM-11`.

### 9.4 FINDING — transcription can CREATE a discoverable witness statement

Read `P-COM-4` against the pipeline. TRCP 192.3(h) `[A]` draws its line at exactly the point
the transcription stack operates on:

- **notes** of an interview → **not** a witness statement
- an **electrical recording** of the witness's oral statement, **or any substantially
  verbatim transcription of such a recording** → **is** a witness statement

**A "substantially verbatim transcription" is precisely what the stack produces** — Canary
outputs *"punctuated, capitalized, timestamped text"* and *"the timestamps are load-bearing
for Statement Bank clip citations"* (`transcript-workflows.md` §9 `R`).

**PROPOSED reading, and it is Michael's to accept or reject:** the decision to record, and
then the decision to transcribe, are each capable of converting material that would have
been an attorney's notes into an excepted witness statement. The record already knows the
first half — §1.3's *"Covert capture does not change discoverability"* — but frames it as a
property of witness interviews rather than as a property of **the pipeline**. A
communications log that transcribes by default applies that conversion **at scale and
without a decision point**.

**This is not advice and it is not verified.** It is a flag on an architecture, raised
because a design that transcribes everything makes it silently. `Q-COM-12`, and it is the
question in this memo with the shortest path to a real filing.

---

## 10. NON-GOALS — stated so a build session cannot infer them

1. **This is not a specification.** No module, table, column, endpoint or migration is
   proposed for build. Nothing here is buildable and nothing here is authorized.
2. **No constraint is adopted.** §2 finds the dispatch's "ruled constraints" unruled.
   Platform-agnosticism is tested as a hypothesis (`Q-COM-1`), not implemented.
3. **The Claude-in-shared-channel evaluation is out of scope**, its decision point is the
   paralegal hire, and no ID was minted for its three gates (§2.2).
4. **No registry file was opened, edited, or annotated.** `P-COM-1..5` are packet-local and
   UNVERIFIED. **Only Michael verifies.**
5. **No schema file was touched**, including the two `privilege_tier` CHECKs and the two
   `source` CHECKs this memo reports as defects.
6. **`future-modules-capture-2026-07-28.md` was NOT annotated** — §6.4 of the QBO memo's
   reasoning applies unchanged: annotating it answers `Q-COM-1`.
7. **`transcript-workflows.md` was NOT edited**, including where §1.3's prose and the built
   default contradict each other (§9.3).
8. **Graph mail mechanics were not re-researched** (§4). #85 §4.2 is the record; a second
   set of figures would be a second thing to keep in step.
9. **No recommendation is styled as a decision.** Where this memo has a view — §7.2's
   metadata-only log, §8's patterns — it is marked PROPOSED and appears as a question below.

---

## 11. OPEN QUESTIONS — full text, Michael's

*Packet-local IDs. Full text per QR-1 — when this packet is deleted these rows are the only
place these questions live.*

**`Q-COM-1` — Is "platform-agnostic on chat-source ingest" a constraint, or is it still a
Claude opinion?** It originates in `future-modules-capture-2026-07-28.md` §3, in a paragraph
`session-log.md:4934–4948` describes as *"Claude's recommendation (opinion, not a ruling)"*
and closes with *"No ruling was made on Slack, Teams, or Claude Tag adoption."* The runner
line at `:4812` says the same. BUILD-STATE still lists the whole file as *"UNRULED, adopt
nothing."* The dispatch that produced this memo called it a **ruled** constraint. §5.4 prices
it for the first time: relative to mail it costs a second public HTTPS endpoint, private-key
custody, an outside vendor's discretionary approval, and an unestablished metering position —
for a channel the firm does not currently use. **Does platform-agnostic chat-source ingest
become a ruled design constraint on any future communications-log work, does it stay an
unruled observation, or is it withdrawn now that its price is on the record?**

**`Q-COM-2` — Two live CHECK constraints say a communication can only be recorder, phone, or
manual. Which values should they carry?** `transcripts.source` and `staging_items.source`
both admit exactly `('recorder','phone','manual')`, and all eleven `transcripts.context_type`
values are audio or meeting contexts. A written-channel communication has nowhere to be
today. **Does a communications log EXTEND `transcripts` — widening `source` and
`context_type`, making the existing table the communications log — or does it get its own
table, accepting that the system then has two per-case communication records with two
privilege vocabularies and two source enums?** *(Nothing was widened; naming the values is a
design act and widening a CHECK is a schema act.)*

**`Q-COM-3` — There is no typed home for an email address or a phone number anywhere in the
database. Where do identifiers live?** Word-bounded across `db/schema.sql` and all three
migrations: `email` 0, `phone_number` 0, `mobile` 0, `address` 0, `handle` 0, `upn` 0,
`external_id` 0. `parties` carries `display_name`, `role_tags`, `aliases jsonb` and free-form
`fields jsonb`. CD-1 built typed aliases and a multi-match FLAG **for names** and nothing for
addresses. **Do contact identifiers become a typed, indexed, uniqueness-constrained
structure — and does an identifier that resolves to more than one contact FLAG the way a name
does, or is identity resolution out of scope until a log is actually designed?**

**`Q-COM-4` — Q-WF-4 now has a third consumer, and it is the most demanding one. Does that
change its priority?** #85 recorded *"does this application acquire a server-side identity,
and of what shape"* as having two consumers (WF-2–WF-8, and #87's `Q-QBO-3`); #88 declined to
add a third because referral acts are attorney-initiated and synchronous. **A communications
log is not** — it wants everything, continuously, and §7.2 shows even the metadata-only
version needs a scheduled runner to beat a 30-day retention window. **Is Q-WF-4 upstream of
the communications log too, and does a third consumer move it up the queue?** *(Recorded as a
fact about that question; Q-WF-4 itself was not amended.)*

**`Q-COM-5` — Teams message ingest introduces a gate class this record has never had: an
outside vendor's discretionary approval. Is that acceptable in principle?** Every gate found
in this chain so far is either Michael's ruling or another module's construction — #85 said so
in terms. The Teams protected-API process is neither: *"To request access to these protected
APIs, complete the following request form,"* reviewed *"every Wednesday"* with approvals
deployed *"every Friday or Monday."* It cannot be ruled open and cannot be built around.
**Before any effort goes into a Teams path, is a third party's discretionary approval of the
firm's application an acceptable dependency for a system holding privileged client
communications — and does that answer also bind the QBO and e-filing paths, which have the
same shape?**

**`Q-COM-6` — The Teams API metering position is unestablished, and the source outlived its
own removal date. How much does that matter?** One vendor page says metering ended
2025-08-25, says the article *"is deprecated and will be removed in June 2026,"* and still
publishes a full rate card ($0.00075/message; evaluation mode 500 messages/month/tenant/app,
failing HTTP 402) — and it is still live on 2026-08-16. Under SOURCING, currency is never
inferred from a document, so the position is **UNESTABLISHED**, not "free." This is the second
vendor in two memos with flagged, unresolved date conflicts (#87, Intuit). **Is an
unestablished cost position a blocker for a research memo, a build-time confirmation
(`COM-LOOK-2`), or a signal that vendor-cost research has a reliability problem worth a
standing rule?**

**`Q-COM-7` — Should SMS be an ingest source at all, and is client texting already happening?**
The dispatch names "SMS/voice sources per the planned capture kit," but the capture kit
(`transcript-workflows.md` §9) is entirely a voice kit and **SMS appears in no spec as an
inbound source** — its one mention is an outbound escalation channel. Meanwhile the Microsoft
path apparently cannot be read by this application at all (§6.3), CPaaS re-raises Q-WF-4 and
adds a new custodian of privileged content, and a personal handset has no API of any kind.
**Is SMS in scope for a communications log — and if it is, does the firm move client texting
onto a channel that can be ingested, accepting A2P Brand/Campaign registration and, on the
Teams path, no MMS and therefore no client photographs?**

**`Q-COM-8` — The only Microsoft-native path to call content contradicts ruling 8.3. Which
gives?** Teams compliance recording is policy-based and always-on — users *"might not be able
to disable the recording"* — while 8.3 ruled capture **opt-in per call**, deliberately, with
suggested-recording prompts as the compensation. Independently, the partner holds the media,
converting 8.1's architectural guarantee (*"never leaves hardware he controls … satisfied by
architecture rather than by contract"*) back into a contractual one. **Does phone-call content
capture stay on the recorder-and-local-pipeline path indefinitely, or does an always-on
policy-recorded arm get considered — and if the latter, is 8.3 amended openly rather than by
implementation?**

**`Q-COM-9` — Does the provenance convention gain a fourth tier for non-normative sources?**
This memo's §6.3 answer — arguably its most consequential single finding — rests on a Microsoft
Q&A forum thread, marked `[C]` and defined in §1.1 as weaker than `[B]`. #80 established
`[A]`/`[B]`; #88 added `R`. Collapsing a forum post into `[B]` would overstate it; leaving it
unmarked would hide it. **Does `[C]` become part of the standing provenance convention, or was
this a one-off — and if it stands, may a `[C]` source support a finding at all, or only a
named look?**

**`Q-COM-10` — The two `privilege_tier` vocabularies still disagree, a comment calls one of
them "the shared system-wide set," and a communications log would be the third consumer.
Which vocabulary is correct?** `generated_documents` allows
`('attorney-client','work-product','non-privileged')`; `transcripts` allows
`('privileged','work-product','non-privileged')`; `db/schema.sql:514` says
*"Privilege vocabulary is the shared system-wide set."* They do not map cleanly in either
direction — `'privileged'` → `'attorney-client'` narrows and may be wrong, the reverse widens
and loses which privilege. #85 flagged this; nothing has moved. **Which set is authoritative,
and does the answer come before a third consumer picks one by implementation?**

**`Q-COM-11` — Both columns default to `'work-product'`, which by TRCP 192.5(d) is an
assertion of privilege, and for witness interviews and depositions it is contrary to the
rule. Does the default change?** `P-COM-3` and `P-COM-4` put a recorded, verbatim-transcribed
witness interview squarely inside the 192.5(c)(1) exception; `transcript-workflows.md` §1.3
already says such transcripts are *"presumptively discoverable at creation"*; the built column
defaults them to `'work-product'` anyway. At fixture volume this is a defect. At ingest volume
it is a production posture. **Does the default become `NULL`-with-a-flag (unclassified, must
be decided), does it stay `'work-product'`, or does it become context-dependent — and is that
a ruling now or a design pass later?** *(Nothing was changed.)*

**`Q-COM-12` — Transcribing a recorded conversation may convert attorney's notes into a
discoverable witness statement. Should the pipeline have a decision point there?** TRCP
192.3(h) makes *"any substantially verbatim transcription"* of a recording of a witness's oral
statement a witness statement, while *"Notes taken during a conversation or interview with a
witness are not a witness statement"* — and a substantially verbatim transcription is exactly
what the stack produces. A communications log that transcribes by default performs that
conversion at scale, with no decision point. **Does the design need an explicit
transcribe/don't-transcribe gate keyed to context type, and does that gate belong to the
attorney at capture time rather than to the pipeline?**

---

## 12. NAMED LOOKS — Michael's or a build session's, not a design session's

**`COM-LOOK-1`** — **Load the Teams protected-API list.** *"Protected APIs in Microsoft
Teams"* (Microsoft Learn) states that protected APIs exist and that access is requested by
form, but its enumeration did not render through the fetch layer across two attempts with
different prompts. The only enumerated datum recovered is negative (*"Send message is not a
protected API"*). **Whether the chat-message read surfaces in §5.1 are on that list is NOT
established here.** One page load, in a browser.

**`COM-LOOK-2`** — **Establish the Teams message-API metering position as of today.** §5.3:
one page says metering ended 2025-08-25, says it will be removed in June 2026, is still
published in August 2026, and still carries a rate card. Under SOURCING the position is
unestablished. Resolve against a page that is not deprecated, and record the date the answer
was read.

**`COM-LOOK-3`** — **Confirm whether Teams SMS threads are reachable through Graph, and
whether Purview retention/eDiscovery covers them.** §6.3's answer — the load-bearing negative
in this memo — is `[C]`, a community forum thread. The vendor's own SMS planning page is
**silent** on Graph, retention and eDiscovery, and silence is not a documented "no." If the
`[C]` answer is wrong, §6 changes shape entirely.

**`COM-LOOK-4`** — **A one-line fact question only Michael can answer: is client texting
happening today, and on what number?** Everything in §6.4's fourth row turns on it. If clients
already text the firm's cell, the communications log's largest real-world gap is the one
channel with no programmatic surface at all, and that reorders every priority in this memo.

---

## 13. What this session did not do

- **Ruled nothing.** Michael did not participate. Everything is PROPOSED.
- **Built nothing. Authorized nothing. Staged no code.**
- **Opened no registry file.** `P-COM-1..5` are packet-local and UNVERIFIED. No proposition
  was entered, and none is verified — **only Michael verifies**.
- **Minted no durable IDs.** `Q-COM-1..12`, `COM-LOOK-1..4` and `P-COM-1..5` were
  collision-checked repo-wide at HEAD and returned **ZERO**; they stay packet-local per the
  `Q-PR3-` / `Q-QBO-` / `Q-RE-` precedent. **ID-DL-1 now governs a TENTH packet.**
- **Touched no schema file**, though §§3, 9.3 report four live CHECK constraints and two
  defaults as defects.
- **Edited or annotated no existing repo document** — not
  `future-modules-capture-2026-07-28.md` (annotating it answers `Q-COM-1`), not
  `transcript-workflows.md`, not `attorney-review-queue.md`, not `BUILD-STATE.md`.
- **Re-derived no #85 finding.** Graph mail mechanics are pointed at, not restated.
- **Read no `src/`.** `Q-PR3-1` remains open and this session did not assume its answer.
- **Ran no `git fetch`.** §1.2's check establishes that the last-fetched origin ref equals the
  local head; it is **not** a QR-3 pass, and this memo does not reason as though it were —
  which is the #88 lesson, applied.
- **Left no scratch in `Documents\Knowledge Repo`.** Rule-PDF extraction ran in the device
  VM's own `/tmp` per the 2026-08-16 method note.
- **BUT IT DID LEAVE ONE FILE, AND IT IS NAMED RATHER THAN LEFT SILENTLY.** Running
  `git status` through the bridge caused git to take `.git/index.lock` and then fail to
  unlink it (the mount forbids delete). **That is a real stale lock and it would have blocked
  the next native index-modifying git command.** It was cleared by **rename** —
  `.git/index.lock.claude-stale-2026-08-16`, 0 bytes, not in the working tree, so the QR-3
  gate does not trip on it. **The useful part is the method: `device_bash` cannot DELETE on a
  mounted path but CAN RENAME within one** (`rm` exit 1, `mv` exit 0, both tested this
  session), which narrows the standing note and lets a session clear a lock it created. See
  the work order's §8.1 — including the **hypothesis, marked as such,** that this is the
  mechanism behind the stale lock BUILD-STATE currently describes as a tendency.

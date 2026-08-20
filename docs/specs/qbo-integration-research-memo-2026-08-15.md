# QBO integration research memo — what the platform actually is, and the four staged constraints tested against it

> **STATUS: PROPOSED — RESEARCH ONLY. NOTHING RULED, NOTHING BUILT, NOTHING AUTHORIZED.**
> **Canonical repo path:** `docs/specs/qbo-integration-research-memo-2026-08-15.md`
> **Source:** design session, Opus 5, Cowork, 2026-08-15 Central (DT-1: clock-checked 17:46 CDT;
> container read 22:46 UTC, same date — the 19:00 roll had not happened). CHAT-DISPATCH **Task 13**.
> **Michael did not participate and made no rulings.** Everything below is PROPOSED or CANDIDATE.
> Repo read full-text at HEAD through the device bridge, `4146a4c` on `master` (the forty-first
> queue-runner invocation, which filed the Task 12 proposal). **`git fetch` cannot run through the
> bridge, so this is NOT a QR-3 pass** — the HEAD read is an unfetched local ref.
> **This memo edits no registry file, mints no durable ID, closes no row, and proposes no wiring.**

---

## 1. The gate, and a fourth resolution this chain has not seen before

The chain has produced three shapes so far. Task 8 (#81) **elaborated rulings** while the build was
gated. Tasks 9–11 (#83–#85) **mapped design space** with no ruling to elaborate. Task 12 (#86) had
**the direction ruled and the destination not**, and `BUILD-STATE.md:96` records that framing in terms:
*"THE GATE RESOLVED A THIRD WAY AND THIS CHAIN HAS NOW SEEN ALL THREE."*

**Task 13 is proposed as a fourth shape.** That is an extension of #86's framing, not a correction of
it — "all three" was written before this task ran, and it was accurate to the six tasks behind it.
Naming the fourth is the first honest act of this memo, because the difference changes what the memo
is allowed to do.

**The dispatch says "staged constraints govern." The staged constraints are not rulings.** They are
five bullets in `future-modules-capture-2026-07-28.md`, a document whose own header says *"everything
here is PROPOSED and unruled unless marked otherwise"* and *"Nothing here is authorized for build,"*
and which `BUILD-STATE.md:117` lists in terms: **"UNRULED, adopt nothing: `future-modules-capture-2026-07-28.md`."**
The rulings-capture files record "QBO ruling" on the **not-covered** list twice — `rulings-capture-2026-08-07.md:192`
and `rulings-capture-2026-08-08.md:156` — and no session-log entry has ruled it since.

So the governing frame for this memo is **a proposal treated as governing for the duration of one
research pass**. That is a legitimate instruction and this memo follows it. What it must not do is
launder the instruction into a ruling: writing "the constraint requires X" for four bullets Michael
has never adopted would put a design commitment on the record by repetition. **Every reference below
names them as STAGED and PROPOSED, and §11 asks whether he wants them adopted at all.**

Underneath that sits the harder gate, and it is the one Task 12's handoff predicted. `BUILD-STATE.md:72`
carries a standing line — **"NO MONEY MACHINERY: no settlement ledger, trust/IOLTA, liens"** — and the
WF-5 queue row calls the money gate *"the one gate on this series that no amount of design work moves…
it is a ruling Michael has not given, and the spec does not nibble at it."* The 2026-07-28 capture's
own fifth bullet says the QB integration and the settlement/disbursement module are **one design
conversation, not two**.

**Consequence, stated plainly: this memo cannot produce a design, and a build session must not read it
as one.** It reports what the QuickBooks Online platform is in August 2026, tests the four staged
constraints against that, and hands every decision back.

---

## 2. Sourcing — and the failures, reported as failures

**Q-STAT-1 does not reach this material.** The SOURCING convention binds statutes, rules and
regulations; Intuit's developer documentation is neither official law nor a clean-authority PDF.
The #80 memo's TIER discipline is carried anyway, re-lettered for vendor material so it cannot be
confused with the authority tiers:

**TIER V-1 — first-party Intuit, retrieved this session, static enough to quote.**

- `raw.githubusercontent.com/intuit/oauth-jsclient/master/README.md` — Intuit's own published OAuth
  client library. Read as raw text, not through a rendering layer.
- Intuit Developer blog, four posts. `blogs.intuit.com` **302-redirects to `medium.com/intuitdev`**;
  the posts were read at the redirect target. The redirect was server-supplied and not independently
  verified, so these are first-party *republication*, named as such at every point of use:
  - *"Important changes to refresh token policy"* — published **2025-11-12**.
  - *"Introducing the Intuit App Partner Program"* — published **2025-05-15**.
  - *"Upcoming changes to APIs and tools that may impact your application"* — published **2025-12-01**.
  - *"Upcoming changes to Reports APIs"* — undated in the retrieval.

**TIER V-2 — first-party Intuit product help (`quickbooks.intuit.com` support articles).** Product
documentation for the accounting application, not the API. One article read: class tracking.

**TIER V-3 — third-party, reached through `WebFetch`, which runs a summarizing model over the page.**
Not verbatim-safe and not quotable as a vendor commitment. Marked **[V-3]** at every point of use:
Codat docs (app-assessment questionnaire), Apideck (2026 integration guide), Zuplo/dev.to (2026
developer guide), Coefficient (rate limits), Satva Solutions (limitations guide), G-Accon (Reports API
change), LeanLaw and Massey & Company CPA (QBO trust-accounting setup).

**TIER R — this repo at HEAD `4146a4c`**, read full-text through the device bridge. Line cites are to
files at that commit.

### 2.1 SOURCING FAILURES — the canonical API reference was never readable

**Every attempt to read `developer.intuit.com` and `help.developer.intuit.com` returned a navigation
shell, not content.** Four fetches, four failures:

| URL | Result |
|---|---|
| `developer.intuit.com/…/authentication-and-authorization/oauth-2.0` | SPA shell — *"Compiling and pre-filling your Intuit info…"*, no documentation body |
| `developer.intuit.com/…/learn/rest-api-features` | same shell |
| `developer.intuit.com/…/go-live/publish-app/security-requirements` | same shell |
| `help.developer.intuit.com/s/article/Validity-of-Refresh-Token` | Salesforce-community shell, `CSS Error` + Refresh button, no body |

This is the same failure class #85 recorded (eCFR `ROBOTS_DISALLOWED`, a reader-URL 429, a sanctioned
Texas fetch returning the navigation shell twice) and #80 recorded for Bexar court pages. **It matters
more here than it did there**, because in this domain the vendor's reference *is* the authority. The
practical effect:

> **No scope list, entity list, rate-limit figure, or security requirement in this memo was read from
> Intuit's canonical API reference.** Everything comes from Intuit's developer blog, Intuit's published
> client library, or third parties. **Any figure below that a build would rely on needs one look at the
> reference, from a browser.** That is `QBO-LOOK-1`.

---

## 3. The four staged constraints, tested against the platform

### 3.1 "Link, don't rebuild" — survives contact, and the API shape supports it

The staged bullet says QuickBooks stays the system of record for money and the case system supplies
the join QB cannot make: *"it knows what a case is."*

Nothing found this session cuts against it, and the platform's shape is consistent with it. The
Accounting API exposes the ledger objects the bullet names — customers, invoices, payments, expenses —
as queryable entities with a SQL-like query language and `STARTPOSITION`/`MAXRESULTS` paging [V-3,
Satva]. A read integration that stores **QB identifiers against case and client records** and computes
nothing is the smallest thing that delivers the bullet's stated value.

**One consequence the 2026-07-28 capture did not state, and it is a schema consequence. Checked at
HEAD this session, not inferred:**

- `BUILD-STATE.md:58` already records that a word-bounded sweep for `invoice` across `db/schema.sql`
  and all three migrations returns **ZERO**, alongside every other WF pipeline term.
- **New this session:** a case-insensitive sweep of `db/schema.sql` and all three migrations for
  `external_id`, `external_ref`, `source_id`, `qb_`, `quickbooks`, `third_party` and `integration`
  returns **ZERO**. **There is no external-identifier column anywhere in the schema** — not for
  QuickBooks, not for anything.
- The 36 tables in `db/schema.sql` are cases, parties, roster, clients, medical/billing, documents,
  calendar, transcripts, statutes and registry. **None of them is a money table** in the settlement,
  trust or accounts sense.

So "link, don't rebuild" — the cheapest possible version, storing a QB id against a case — **creates
its first table or its first column, and it would be the schema's first external-system linkage of any
kind.** And `db/schema.sql`'s grants block is load-bearing: **every new table must carry its own GRANT
or it is unreachable — because Supabase's own default ACL withholds the four DML privileges, not
because no default exists** (C-2 as RESTATED 2026-08-19; `BUILD-STATE.md`, Data layer). That is not an
argument against the constraint; it is the cost, stated before anyone is asked to price it.
*(Conformed 2026-08-19: this passage read "`ALTER DEFAULT PRIVILEGES` is not set," falsified by the
2026-08-19 `pg_default_acl` read — the vendor's bootstrap DID set one, so the conclusion survives on a
different warrant. The `BUILD-STATE.md:56` line cite is replaced with a heading cite in the same pass:
line cites into that wholesale-rewritten file are barred project-wide, ruled `#94`.)*

### 3.2 "Read-only first" — THE HEADLINE: the platform will not enforce it, and reads are the metered half

Two findings, and both invert something the capture assumed.

**(a) There is no read-only scope.** Intuit's own published OAuth client enumerates its complete scope
set [V-1, `oauth-jsclient` README]: `com.intuit.quickbooks.accounting`, `com.intuit.quickbooks.payment`,
`com.intuit.quickbooks.payroll`, `com.intuit.quickbooks.payroll.timetracking`,
`com.intuit.quickbooks.payroll.benefits`, plus the OpenID Connect scopes `openid`, `profile`, `email`,
`phone`, `address`. An independent scope catalogue lists a single QuickBooks scope,
`com.intuit.quickbooks.accounting` — *"Access to QuickBooks Online Accounting API"* — with **no
read-only variant** [V-3, apis.io]. A 2026 developer guide describes that scope as *"full read/write
access to QuickBooks Online accounting data"* and states no read-only scope exists [V-3, Zuplo].

**Three independent lists, no read-only scope in any of them.** This is an evidenced absence, not a
first-party affirmative statement, and it is the shape the record keeps producing — the same as #85's
privacy-proposition sweep. What it means for the constraint:

> **"Read-only first" cannot be a grant. It can only be a property of the code.** The token the firm
> would authorize is a full read/write token against live books. The staged constraint's low-risk
> framing — *"Stage 1 pulls numbers from QB into the case view — low risk"* — is **true of the traffic
> and false of the credential.** A read-only *integration* holding a read/write *token* is one bug away
> from writing to the firm's books, and QuickBooks will not stop it.

Whether that changes anything is Michael's (`Q-QBO-2`). It is stated here because the capture's
risk sentence reads differently once you know the grant is undifferentiated.

**(b) Reads are the metered half; writes are free.** Intuit launched the **App Partner Program on
2025-07-28** [V-1, Intuit Developer blog 2025-05-15]. Its own words: *"Core API calls cover most
data-in operations such as creating or updating invoices, bills, customers, vendors, etc. Core API
calls are unmetered and uncharged,"* while *"CorePlus API calls cover most data-out operations such as
**reading accounts, querying company information, and fetching reports**. CorePlus API calls are
metered, and charges may apply."* The free **Builder** tier carries **500,000 CorePlus credits per
month** and is **blocked above the limit** rather than billed; paid tiers (Silver / Gold / Platinum)
raise the ceiling and bill overage per a rate card. Variable fees were discounted 100% from 2025-07-28
to 2025-10-31; charges began **2025-11-01**.

**The economics of the staged constraint are inverted from what it assumed.** "Read-only first, write
later" was framed as risk-staging, and it still works as risk-staging — but on Intuit's meter, the
read stage is the *only* stage that consumes anything. It does not overturn the constraint: 500,000
metered reads a month against a solo practice's books is not a real ceiling, and the free tier blocks
rather than bills, so there is no runaway-cost exposure. **It is recorded because it is a fact the
2026-07-28 capture could not have known — the program did not exist — and because "free tier, blocked
at the cap" is a different operational posture than "free."**

### 3.3 "Sandbox-only until the go-live gates" — maps cleanly, and Intuit has a gate of its own

This constraint survives intact and gains a second enforcement point that is not Michael's.

**Intuit's own staging matches it.** Development credentials work against sandbox companies only and
need no approval; production credentials require Intuit's approval [V-3, Apideck]. The base URLs
differ — `https://sandbox-quickbooks.api.intuit.com` vs `https://quickbooks.api.intuit.com` [V-3,
Apideck; Zuplo] — so the sandbox/production boundary is a configuration value, which is exactly the
shape that makes "sandbox-only" auditable. A developer account is provisioned a sandbox company
pre-loaded with sample data, with up to five sandbox companies per account [V-3, Zuplo]; **sandbox data
resets periodically** [V-3, Apideck], which is a fixture-durability consideration and nothing more,
since no real data may enter either environment anyway.

**Redirect URIs: `http://localhost` is acceptable in development; production requires HTTPS, stated
without exception** [V-3, Apideck]. Recorded because the app's *existing* auth surface redirects to
`localhost:5173` (`BUILD-STATE.md:69`) — so the current redirect posture is a development-only posture
on this platform too.

**Intuit's app assessment is a real gate.** All apps accessing production data must complete an
assessment questionnaire, **public and private alike**; the developer declares whether they are
*"building a private app for your team or business"* [V-3, Codat]. The questionnaire asks whether the
client ID and secret are *"stored securely (i.e. not hardcoded within your app or displayed in browser
console logs),"* whether the app captures `intuit_tid` and keeps error logs, whether it handles expired
tokens / invalid grants / CSRF, and whether customer data *"is used by or shown to anyone other than
that customer."* Applications are rejected without confirmation that connect, disconnect and reconnect
were tested against a sandbox or non-production company. One estimate puts approval at **1–3 weeks**
[V-3, Apideck]. **All of this is V-3 and none of it was readable from Intuit** (§2.1) — `QBO-LOOK-1`.

**The mapping to `Go_Live_Gates.md`, PROPOSED and not adopted:** the staged bullet says live OAuth waits
for the go-live gates *"and arguably after the professional security review."* Gate 2's 2026-08-11
clarification says the security review gates the **multi-user phase**, and solo live use proceeds
without it — so on the current reading of gate 2, that "arguably" resolves against waiting, and a QBO
live connection would not be gated by gate 2 at all. **Whether Michael wants QBO live-connection
treated as a gate-2 trigger anyway is `Q-QBO-4`, and nothing here decides it.** Note the shape: this is
the same question gate 2 already answered once for the app itself, arriving a second time about a
different credential.

### 3.4 "Trust/operating separation is a day-one design constraint" — the constraint with legal teeth, and the API cannot help enforce it

The staged bullet is unambiguous: *"If IOLTA lives in QB, the integration must treat trust and operating
money as categorically different things. Blurring them is not a bug; it is a bar-complaint."*

**What QuickBooks Online actually provides is a naming convention, not a mechanism.** The standard
setup described consistently by two accounting sources [both V-3]:

- the IOLTA account itself as a **Bank**-type account, detail type **"Trust account"** [V-3, LeanLaw];
- a parent **Other Current Liabilities** account, detail type **"Trust Accounts - Liabilities"**,
  representing the total owed to all clients [V-3, LeanLaw; Massey];
- **one sub-account per client or client-matter** under that parent [V-3, both];
- an alternative some firms use — a single liability account plus the customer name field or class
  tracking to tag transactions by client, which *"reduces chart of accounts clutter"* but
  *"complicates reporting"* [V-3, Massey].

And the limits, in their sources' own words [V-3]:

- *"QuickBooks Online does not come preconfigured for trust accounting"* and *"is not legal-specific
  software. It has no native matter dashboard, no built-in three-way reconciliation tool, and no
  automatic client/matter ledgers"* [Massey].
- *"QuickBooks doesn't have a built-in three-way reconciliation report, so you'll need to compile it"*
  [LeanLaw].
- **The sentence that matters most for the integration:** *"QuickBooks won't prevent you from creating
  negative client balances or commingling funds — it simply records what you tell it"* [LeanLaw].

**The finding.** The staged constraint asks the integration to treat trust and operating money as
categorically different. **The API can read the categories but cannot receive them as facts.** What
comes back is an account with a type, a detail type, and a name the firm chose. Nothing in the payload
says *this is client money*; the firm's own chart of accounts says it, by convention. So a case view
that displays "trust balance" for a matter would be **reproducing the firm's naming discipline, not
verifying it** — and it would be doing so on a screen an attorney might rely on.

That is a materially different risk than "read-only is low risk." A read-only integration cannot
misappropriate anything. It can, however, **display a trust figure that is wrong** — because the
sub-account was mis-parented, because a matter's funds sit under a different client's sub-account, or
because the naming convention drifted — and display it with the authority of a computed number.
**Flag-don't-decide is the project's answer to this class elsewhere** (IN-2's flag-never-auto-correct,
the roster multi-match flag, the CL-2 client-flag pattern). Whether it is the answer here is Michael's
(`Q-QBO-5`), and this memo proposes no mechanism.

**One more, and it is a scope question rather than a design one.** Class tracking — one of the two
per-client tagging strategies above — is available only in **QuickBooks Online Plus and Advanced**
[V-2, Intuit product help]. **The record does not say which QBO subscription the firm has.** That is a
one-line fact question with a real branch behind it: `QBO-LOOK-2`.

---

## 4. OAuth and token custody for a solo firm — and the structural finding

### 4.1 The token facts, with the currency caveat stated first

**Currency is not inferred from a document here, and the discipline earns its keep immediately.**
Intuit's own published client library's README shows a sample response carrying
`"x_refresh_token_expires_in": 8726400` — about 101 days — and the accompanying text
*"Your previous refresh tokens expire 24 hours after you receive a new one"* [V-1]. Taken as current,
that yields the familiar "100-day rolling refresh token" model.

**It is superseded.** Intuit's developer blog of **2025-11-12** states that refresh tokens previously
*"remained valid as long as they were used at least every 100 days, making them effectively permanent,"*
and that **"All refresh tokens will now have a maximum validity period of five years"** [V-1]. The
2025-12-01 roundup restates the five-year cap [V-1]. **The README sample is a document; the blog is the
source's own statement of policy — the statement governs.** Anyone reading the library README alone
would carry the wrong model.

The current picture, as best it can be assembled without the canonical reference:

| Fact | Value | Source |
|---|---|---|
| Access token lifetime | *"3600 seconds (one hour)"* | V-1, `oauth-jsclient` README |
| Refresh token rotation | *"Your previous refresh tokens expire 24 hours after you receive a new one"* | V-1, same |
| Refresh token maximum validity | **five years**, capped | V-1, blog 2025-11-12 |
| First cohort expirations | **February 2027** (granular scopes, issued Feb 2022); **October 2028** (accounting/payments, issued Oct 2023) | V-1, blogs 2025-11-12 and 2025-12-01 |
| Re-authentication surface | A **Reconnect URL is now mandatory** in developer portal settings | V-1, blog 2025-11-12 |
| Advance warning | Intuit notifies the customer **30 days and 7 days** before expiry, in-product and by email | V-1, blog 2025-11-12 |
| Client secret | **Required** for the token exchange (`clientSecret` is a mandatory config parameter) | V-1, README; corroborated V-3 |
| PKCE / public clients | **Not mentioned in any source read this session** — absence, not a denial | V-1 and V-3 |

**For a solo firm this reads better than the old model, not worse.** A five-year cap with mandatory
re-auth is a *calendarable* event with two vendor-issued warnings, rather than a silent 100-day fuse
that breaks whenever a poller stalls. The operational requirement is that someone owns the reconnect —
in a one-lawyer firm, that someone is Michael, and it is his hand by construction.

### 4.2 THE STRUCTURAL FINDING — a client secret means a confidential client, and this application does not have one

`BUILD-STATE.md:69` describes the app's entire auth surface in one line: **"single-tenant public-client
browser SPA, MSAL/PKCE, `Calendars.ReadWrite` only, per-browser tokens, `localhost:5173` redirect, **no
secret**."** #85 raised the consequence as `Q-WF-4` — *"does this application acquire a server-side
identity, and of what shape?"* — and called it the hardest gate in the WF series, sitting on no row at
all.

**QBO arrives at the same gate from a different direction, and arrives there harder.** The QuickBooks
token exchange requires a client secret [V-1]. A secret cannot live in a browser SPA; Intuit's own
assessment questionnaire asks whether the secret is kept out of the app and out of browser console logs
[V-3, Codat]. And the refresh token is not a static credential — it **rotates**, with the previous value
dying 24 hours after a new one is issued [V-1] — so whatever holds it must be able to **write** the new
value back, durably, every time.

**That is a different custody problem from the one `Go_Live_Gates.md` gate 4 contemplates.** Gate 4's
model is the LegiScan arrangement: a **static** key in a Supabase edge-function secret, never in the
repo, rotated by hand. The staged QBO bullet reaches for exactly that comparator — *"credential-tier
sensitive, same class as the LegiScan key arrangement and handled with the same discipline."* **The
discipline transfers; the mechanism does not.** A rotating secret that the integration itself must
overwrite on a schedule is not a hand-rotated key, and nothing on the record has described where such a
value would live or who writes it.

**One thing is better here than in the WF finding, and it should be said.** The WF series needs a
background watcher measured in weeks. QBO's read path does not: it can be **user-initiated** — Michael
opens a case, the app fetches — in which case there is no daemon, no webhook endpoint, and no
app-only credential. What remains irreducible is a **confidential-client token exchange and a durable,
writable home for a rotating refresh token.** The project has the *shape* of that substrate already —
`supabase/functions/legiscan-poller/index.ts` and `supabase/functions/statute-fetch/index.ts` exist —
but `BUILD-STATE.md:68` records that they are **written and NOT deployed**, that the auth-blocked
diagnosis is incomplete, and that **`service_role` was never granted either**. So the substrate is
unproven, and a QBO integration would be the thing that proves it.

**Nothing here proposes that.** It is stated so that the QBO question is not costed as if it were
smaller than `Q-WF-4`. It is the same question (`Q-QBO-3`).

---

## 5. Rate limits, throttling, and metering — and one conflict between sources

**No figure in this section came from Intuit's reference** (§2.1). Three third-party sources agree on
the headline and disagree in the detail — the disagreement is reported rather than averaged.

| Limit | Figure | Source | Agreement |
|---|---|---|---|
| Requests per minute, per realm (company) | **500** | V-3: Coefficient, Zuplo, Satva | **All three agree** |
| Concurrent requests per company | **10** | V-3: Coefficient, Zuplo | Agree; Satva says only that a concurrency limit exists |
| Resource-intensive endpoints | **200/min** | V-3: Coefficient, Zuplo | Agree |
| Batch throughput | **40 batch requests/min** [Coefficient] vs **120 batch requests/min** [Zuplo] | V-3 | **CONFLICT — unresolved** |
| Batch size | **up to 30 operations per batch** | V-3: Satva | Single source |
| Daily volume | *"~10,000 requests per day (varies by app)"* | V-3: Satva | Single source, hedged in its own words |
| Payload | *"approx. 1 MB per request"* | V-3: Satva | Single source |
| Query paging | `STARTPOSITION` / `MAXRESULTS`, typically **1000 records** max per query | V-3: Satva | Single source |
| Throttled response | **HTTP 429**; error code `003001 ThrottleExceeded` | V-3: Coefficient, Zuplo | Agree |
| Sandbox vs production | *"identical limits (with occasional email restrictions in sandbox)"* | V-3: Coefficient | Single source |
| Minor version | *"As of August 2025, Intuit deprecated minor versions 1–74. All API requests now use minor version 75 by default."* | V-3: Zuplo | Single source, **dated and load-bearing** |

**The honest read for this firm: throttling is not a design constraint and metering barely is.** A
solo practice reading its own books cannot approach 500 requests per minute or 500,000 metered reads
per month by any ordinary use. The figures matter for one scenario only — an **initial backfill** of a
decade of history, which is precisely where a naive sync hits a ceiling [V-3, Apideck notes the same
scenario]. That is a build concern, not a design one, and no build is proposed.

**The minor-version note is the item most likely to age badly**, and it is single-sourced V-3. If a
build pins a minor version, that pin needs a look at the reference — folded into `QBO-LOOK-1`.

---

## 6. Read-only visibility limits — what the API does not show

**This whole section is V-3 and single-sourced except where noted.** It is recorded as a **candidate
list**, not an inventory, and it is the part of this memo most in need of `QBO-LOOK-1`.

Reported as unreachable or partially reachable through the API [V-3, Satva unless noted]:

- **Tags** — cannot be created, updated, or deleted via API.
- **Custom fields** — cannot be created or updated via API.
- **Bill payment** — Approval Status, Tags, Payment Method and Attachments Confirmation not retrievable.
- **Bank transactions in "For Review"** — uncategorized items are inaccessible. *(Relevant: a deposit
  sitting unreviewed in the trust account is invisible to a read integration while being entirely real
  in the bank.)*
- **Projects** — no dedicated project entity and no CRUD operations. *(Relevant: "project" is the
  closest native QBO analogue to a matter; if it is not addressable, matter-level joins fall back to
  customers, sub-customers, or classes.)*
- **Webhook events** — do not include complete data by default; a notification is a pointer, and the
  record must then be fetched.

### 6.1 The Reports API is mid-migration, and two sources give different deadlines

Intuit's developer blog describes a **modernization of the Reports APIs**: response-shape changes
rather than URL changes — null values normalized to empty strings, child accounts always nested under
parents, row order aligned to the UI, `ColTitle` in Title Case, days-summarization capped at 200
columns, the `qzurl` deep-link parameter removed, the undocumented `group_by` parameter deprecated
(later restored for four reports). **All 29 documented reports remain supported; reports accessed via
undocumented endpoints will not be.** A `testing_migration` query parameter allows testing ahead of
cutover. Its stated deadline: **"Migration deadline: August 31, 2026 — after this date, all responses
will be served by the modernized service only"** [V-1].

**A third-party source states the same migration takes effect June 30, 2026** [V-3, G-Accon], listing
transaction-level and list-style reports as at risk.

**The dates cannot both be right, and today is 2026-08-15.** Under the V-1 date the cutover is sixteen
days away; under the V-3 date it happened six weeks ago. **This memo does not resolve it.** Two things
are worth saying about the asymmetry: the V-1 figure is first-party, and the V-3 source sells a product
positioned as the remedy. Additionally, Intuit's own **2025-12-01** roundup of upcoming changes
**does not mention the Reports API migration at all** — so the August-31 date rests on the Reports post
alone, and that post carried no publication date in the retrieval. **`QBO-LOOK-3`.**

This is not academic for the staged design. *"Fetching reports"* is named in Intuit's own definition of
the metered **CorePlus** category [V-1], and a report — General Ledger, Trial Balance, or a customer
balance detail — is the natural way to read a trust-liability sub-account structure without walking
every transaction. **The one API surface the trust-visibility question most wants is the surface
currently mid-migration.**

### 6.2 Webhooks are also mid-migration, and they land on the same gate as §4.2

Intuit's 2025-12-01 post states that **all developers must move to consuming webhook notifications in
a new CloudEvents format**, available in sandbox with a toggle, with a **production deadline of
2026-07-31** [V-1] — a date now past. Webhooks require an HTTPS endpoint and carry an `intuit-signature`
header verified by HMAC-SHA256 against a verifier token [V-3, Zuplo].

**A webhook needs a publicly reachable endpoint, which is `Q-WF-4` again** — and §4.2 already noted that
QBO's read path does **not** require webhooks if it is user-initiated. Recorded so that a future design
does not reach for webhooks by reflex and thereby import a gate the read-only stage does not otherwise
need.

---

## 7. Mapping to the money-module notes

The 2026-07-28 capture's §2 unbuilt-territory map names money as *"the biggest blank"*: settlement
ledgers; fee and expense tracking against recovery; disbursement statements for client signature;
trust/IOLTA accounting; and, adjacent, liens and subrogation. It records that *"'Mark disbursed' exists
as a status with nothing behind it."*

Checked at HEAD, all of that still holds and in one place it is worse than the map says:

- **`BUILD-STATE.md:72` — "NO MONEY MACHINERY: no settlement ledger, trust/IOLTA, liens."** Standing line.
- **`BUILD-STATE.md:70`** — *"'Mark disbursed' shows on criminal files — KNOWN, NOT fixed."* The status
  with nothing behind it is also on the wrong files.
- **`db/migrations/2026-07-28-cl2-client-dimension.sql:44,46`** — the CL-2 migration's own comments:
  *"D-CL2-4a: shares lock at disbursement"* and *"Settlement/disbursement RECORDS are not built — this
  is the marker only."* The disbursement concept exists in the schema **as a marker**, deliberately.
- **`db/schema.sql:395–396`** — *"historical_reduction_pct auto-feeds from settlement billed-vs-final
  outcomes once the settlement module lands"* — a dependency written against a module that does not exist.
- **`docs/specs/wf-2-wf-8-email-workflow-spec-2026-08-15.md:459`** — the Task 11 spec, unprompted:
  *"The trust/operating separation is a day-one constraint on the staged QBO work (Task 13), and
  settlement funds are the exact material that constraint governs."*

**The coupling the capture asserted is intact and is now visible from both ends.** The Task 11 spec
pointed forward at this memo; this memo points back at WF-5's gate. Neither can move without the money
ruling, and the capture's fifth bullet — *"Deciding them separately risks building the same ledger
twice"* — is the reason the question is one question.

**What this memo therefore does not do:** it does not sketch what the case system would compute
natively versus read from QB. That is the capture's own "first question," and answering it is designing
the money module through the side door — the exact move the Task 11 spec declined at its §5.

---

## 8. Is QBO the same class as Q-6? — a distinction, not a decision

`Q-6` bars wiring the CourtListener API into the app until Michael resolves terms with FLP directly;
research use is within bounds. The Task 7 memo's Q6 extended the *class* to the EFSP question: filing
through the application requires an OCA-certified provider relationship, *"the same class of decision
as Q-6."*

**Three axes, and QBO does not sit in the same place on all of them:**

| Axis | Q-6 (CourtListener/FLP) | EFSP (Task 7 Q6) | QBO |
|---|---|---|---|
| **Terms** | **Unresolved** — the whole substance of Q-6 | Certification process not published | **Published and commercial** — the App Partner Program has named tiers, a free Builder tier, and a rate card [V-1] |
| **Access** | Available; the bar is the terms | No public API documentation; requires becoming or contracting with a certified provider | Available to any developer account, with an assessment gate that private apps also pass through [V-3] |
| **Structural prerequisite** | Not the obstacle | Not the stated obstacle | **A confidential client and a writable home for a rotating refresh token** (§4.2) — the `Q-WF-4` gate |

**So the honest answer is: partly.** The *terms* obstacle that defines Q-6 is largely absent for QBO —
Intuit publishes its terms and sells access on them. What QBO has instead is a **structural**
prerequisite the other two do not foreground, plus a **credential-tier** exposure the staged capture
already named (live tokens to the firm's real books).

**Whether Michael wants a standing constraint recorded in the Q-6 family — no QBO integration is
designed until he rules the terms/credential question — is `Q-QBO-7`.** It is asked in the same shape
as the Task 7 memo's Q6, which is still ⬜ in the queue. **Nothing here proposes the wiring.**

---

## 9. What the registry does not carry, and the pattern is now three deep

Task 12's handoff predicted this and the sweep confirms it. **Dedupe run at HEAD across all four
`legal-rule-registry-*` files, word-bounded, case-insensitive:**

| Term | Hits |
|---|---|
| `iolta` | **0** |
| `trust` | **0** |
| `safekeeping` | **0** |
| `commingl` | **0** |
| `client funds` | **0** |
| `escrow` | **0** |
| `disciplinary` | 1 — `legal-rule-registry-draft-entries-medical-billing.md:213`, inside a Texas Insurance Code health-benefit-plan definition. **Unrelated; matched on the word alone.** |

**There is not one trust-accounting or client-property proposition in the registry.** This is the third
instance of one shape: #85 found **no privacy proposition** anywhere in the four files while a binding
`CLAUDE.md` HIPAA rule rests on it (`Q-WF-6`); #78 found the insurance-absence claim over-broad and
narrowed it; and now a **day-one design constraint whose own stated stake is a bar complaint** rests on
an authority layer the registry does not carry at all.

**No proposition is drafted here, and the reason is worth stating precisely rather than waved at.**
Texas's client-property and trust-accounting authority was **not retrieved this session**. The
SOURCING convention names three sources: the Texas statutes bulk corpus in `Documents\Knowledge Repo`,
the TRCP / TRE / TRAP clean-authority PDFs in the same folder, and the eCFR API. **Only the repo
checkout was granted to this session** — the Knowledge Repo was not, so neither the corpus nor the
rules PDFs were reachable. And there is a prior question underneath: the Texas Disciplinary Rules of
Professional Conduct are published as an **appendix** to the Government Code rather than as a code
chapter, so **whether the bulk corpus even carries them is unknown from here and was not checked.**

**Drafting propositions from memory would violate SOURCING twice over — no named source, and no
retrieval** — and would do it in the one area of this memo where being wrong has a disciplinary
consequence rather than a design one. The absence is reported; the retrieval is named as not-run
(`QBO-LOOK-4`); whether that layer should enter the registry at all — and where, given `Q-STAT-5`'s
open fifth-file question — is `Q-QBO-6`.

**Registry backlog unchanged at 34. No registry file was opened for edit.**

---

## 10. Non-goals of this memo — stated so a build session cannot misread it

This memo does **not**:

1. propose an integration, a schema, an entity mapping, a sync cadence, or a sequence of stages;
2. adopt the four staged constraints — they remain PROPOSED (§1);
3. decide what the case system computes natively versus reads from QB (§7);
4. treat any Intuit figure as verified — the canonical reference was unreadable (§2.1);
5. draft, edit, or verify any registry proposition (§9);
6. propose wiring any third-party API into the application (§8);
7. characterize the trust/operating question as a solved one. It is the constraint with legal teeth and
   it is the one the platform helps with least.

**A build session reading this document has nothing to build from it.**

---

## 11. Open questions — full text, packet-local IDs, all Michael's

*IDs are packet-local per the ID-DL-1 pattern; `Q-QBO-*` and `QBO-LOOK-*` were verified free
word-bounded repo-wide at authoring. Minting durable IDs is Michael's act and none was minted.*

- **`Q-QBO-1` — Do you adopt the four staged constraints as ruled design constraints, or do they stay
  a PROPOSED capture?** `future-modules-capture-2026-07-28.md` has been on the record since 2026-07-28
  and `BUILD-STATE.md:117` still lists it as "UNRULED, adopt nothing." The rulings-capture files record
  "QBO ruling" on the not-covered list twice (08-07 and 08-08). This memo was instructed to treat the
  four constraints as governing, and did — but a research pass following a proposal is not the same as
  the proposal being adopted, and the longer it is treated as governing the more it will read as
  settled. Do link-don't-rebuild, read-only-first, sandbox-only-until-gates, and trust/operating
  separation become ruled constraints on any future QBO work, or does the whole capture stay unruled
  until the money-module conversation happens?

- **`Q-QBO-2` — Given that no read-only OAuth scope exists, does "read-only first" change shape?** Three
  independent scope lists show one accounting scope granting full read/write, with no read-only variant
  (§3.2a). "Read-only first" can therefore be a property of the code but never of the grant: the token
  the firm authorizes against its live books is read/write regardless of what the integration does with
  it. Does that (a) leave the constraint as written, with read-only understood as a code discipline;
  (b) raise the bar for when a live connection is made at all, since the credential is
  undifferentiated; or (c) mean a read-only stage should run only against sandbox companies
  indefinitely, with the live connection deferred to the write stage where the grant would be honest
  about itself?

- **`Q-QBO-3` — Does the QBO question wait on `Q-WF-4`, or does it get asked separately?** QuickBooks
  requires a client secret and a durable, writable home for a rotating refresh token; the application
  is a public-client browser SPA with no secret and no server-side identity (`BUILD-STATE.md:69`).
  `Q-WF-4` already asks whether this application acquires a server-side identity and of what shape.
  QBO's read path is narrower than the WF series' — it can be user-initiated, so no daemon and no
  webhook endpoint are strictly required (§4.2, §6.2) — but the confidential-client requirement is
  irreducible. Is QBO folded into `Q-WF-4` as a second consumer of the same answer, or does it get its
  own question because its shape is narrower and might be answerable sooner?

- **`Q-QBO-4` — Is a live QBO connection a gate-2 trigger?** The staged bullet says live OAuth waits for
  the go-live gates "and arguably after the professional security review." Gate 2's 2026-08-11
  clarification says the security review gates the multi-user phase and solo live use proceeds without
  it — so on the current reading, a QBO live connection would not be gated by gate 2. Do you want gate 2
  extended to name credential-tier third-party connections regardless of user count, do you want a new
  gate appended for them, or does the existing gate-2 reading stand and the "arguably" resolve against
  waiting?

- **`Q-QBO-5` — When a case view shows a trust figure it read from QuickBooks, what is the display
  contract?** QuickBooks records trust/operating separation as a naming convention and enforces nothing:
  it "won't prevent you from creating negative client balances or commingling funds — it simply records
  what you tell it" [V-3, LeanLaw]. A read integration can therefore display a per-matter trust balance
  that is wrong — mis-parented sub-account, funds under another client, drifted naming — with the
  authority of a computed number. The project's answer to this class elsewhere is flag-don't-decide
  (IN-2's flag-never-auto-correct; the roster multi-match flag; `case_client_flags`). Does that pattern
  govern here — the integration flags what it cannot verify and never asserts a trust balance as fact —
  or is a read-only trust display simply out of scope until the money module exists and can be
  reconciled against?

- **`Q-QBO-6` — Should Texas client-property and trust-accounting authority enter the registry, and
  where?** A word-bounded dedupe at HEAD across all four registry files returns zero hits for `iolta`,
  `trust`, `safekeeping`, `commingl`, `client funds`, and `escrow` (§9). A day-one design constraint
  whose stated stake is a bar complaint rests on an authority layer the registry does not carry — the
  third instance of that shape, after `Q-WF-6`'s privacy gap and #78's insurance narrowing. Nothing was
  drafted here because the source was not retrieved and SOURCING does not name the disciplinary rules
  among its sources. Do you want a retrieval pass run against a named authority for that layer; if so
  does it land in an existing registry file, in the fifth file `Q-STAT-5` already asks about, or
  nowhere until a money module exists to rely on it?

- **`Q-QBO-7` — Do you want a standing constraint recorded in the Q-6 family for QBO?** Q-6 bars wiring
  the CourtListener API into the app until you resolve terms with FLP; the Task 7 memo's Q6 asks the
  same about an OCA-certified EFSP relationship. QBO differs on the axis that defines Q-6 — Intuit's
  terms are published and commercial — but matches on credential-tier exposure and adds a structural
  prerequisite the other two do not (§8). Do you want it recorded that no QBO integration is designed
  until you rule the terms and credential-custody question, so a future money-module session is scoped
  from the start to a linkage that assumes nothing about live connection; or is QBO deliberately
  outside the Q-6 family because its terms are not in dispute?

- **`Q-QBO-8` — Does the CorePlus metering change how a QBO read stage would be scoped?** Intuit's App
  Partner Program meters data-out calls — "reading accounts, querying company information, and fetching
  reports" — while data-in calls are unmetered and free; the free Builder tier carries 500,000 CorePlus
  credits a month and blocks rather than bills above the cap [V-1] (§3.2b). For a solo practice the cap
  is not a real ceiling, so the practical answer may be "no." It is asked because it inverts the
  read-is-cheap assumption the 2026-07-28 capture was written under, and because "blocked at the cap"
  is an availability posture worth knowing before anything depends on a read. Does this change anything,
  or is it filed as a fact?

---

## 12. Named looks — Michael's, and the first two are cheap

- **`QBO-LOOK-1` — one browser session against `developer.intuit.com`.** The canonical API reference was
  unreadable from this session: four fetches, four navigation shells (§2.1). **Every scope, entity,
  limit, and security requirement in this memo is therefore first-party-blog, first-party-library, or
  third-party.** The items that most need confirmation, in order: (a) that no read-only accounting scope
  exists; (b) the current rate-limit and batch figures, where two third-party sources already conflict
  (§5); (c) the production security requirements for a private app; (d) the current default minor
  version. **Nothing should be built on §5 or §6 until this look runs.**

- **`QBO-LOOK-2` — which QuickBooks Online subscription does the firm have?** A one-line fact question
  with a real branch behind it: class tracking, one of the two per-client tagging strategies for trust
  sub-ledgers, requires **Plus or Advanced** [V-2, Intuit product help]. On Simple Start or Essentials
  that strategy is unavailable and the sub-account-per-client structure is the only route. This is the
  cheapest item on the whole task and it is the same shape as #85's "has the firm signed a BAA with
  anyone?" — a fact question that costs nothing and narrows the design space.

- **`QBO-LOOK-3` — when did / does the Reports API migration actually take effect?** Intuit's own post
  says **2026-08-31**; a third-party source says **2026-06-30** (§6.1). Today is 2026-08-15, so the
  difference is whether the cutover is sixteen days out or six weeks past. Intuit's 2025-12-01 roundup
  of upcoming changes does not mention it at all. Folds naturally into `QBO-LOOK-1`.

- **`QBO-LOOK-4` — NOT RUN, and named as not-run.** No retrieval was attempted against Texas
  client-property or trust-accounting authority (§9). Two reasons, both stated rather than implied:
  **only the repo checkout was granted to this session**, so the `Documents\Knowledge Repo` sources
  the SOURCING convention names were unreachable; and the Texas Disciplinary Rules of Professional
  Conduct sit in a Government Code **appendix**, so whether the bulk statutes corpus carries them at
  all is itself unverified. Deciding whether that retrieval happens, and against what named source,
  is upstream of `Q-QBO-6`.

---

## 13. Sources, each named per item

**TIER V-1 — first-party Intuit:**

- `https://raw.githubusercontent.com/intuit/oauth-jsclient/master/README.md` — Intuit's published OAuth
  2.0 client for Node. Scope enumeration; access-token lifetime; refresh-token rotation language;
  `clientSecret` requirement; sandbox/production environment values. Read as raw text 2026-08-15.
- Intuit Developer blog, *"Important changes to refresh token policy,"* published **2025-11-12** —
  five-year maximum validity; mandatory Reconnect URL; 30-/7-day notifications; Feb-2027 and Oct-2028
  first cohorts. Read at `medium.com/intuitdev` after a 302 from `blogs.intuit.com`.
- Intuit Developer blog, *"Introducing the Intuit App Partner Program,"* published **2025-05-15** —
  program launch 2025-07-28; Core vs CorePlus; Builder $0 / 500,000 CorePlus credits / blocked above
  cap; charges from 2025-11-01. Same redirect path.
- Intuit Developer blog, *"Upcoming changes to APIs and tools that may impact your application,"*
  published **2025-12-01** — CloudEvents webhook migration, production deadline 2026-07-31; ID field
  no longer sortable (production 2026-01-27); Employee and CompanyInfo changes; refresh-token cap
  restated. Same redirect path.
- Intuit Developer blog, *"Upcoming changes to Reports APIs"* — modernization detail; 29 documented
  reports; `testing_migration`; **migration deadline stated as 2026-08-31**. **Undated in the
  retrieval.** Same redirect path.

**TIER V-2 — first-party Intuit product help:**

- `quickbooks.intuit.com` — *"Get started with class tracking in QuickBooks Online."* Class tracking
  available in **Plus and Advanced**. The page did not state plan availability for location/dimension
  tracking.

**TIER V-3 — third-party, through a summarizing fetch layer, not verbatim-safe:**

- Codat documentation — QuickBooks Online app assessment questionnaire: who must complete it, private-app
  declaration, secret-storage and error-handling questions, connect/disconnect/reconnect testing.
- Apideck (2026 integration guide) — sandbox-to-production path, 1–3 week assessment estimate, base URLs,
  `localhost` in development / HTTPS in production, sandbox data resets, token storage.
- Zuplo / dev.to (2026 developer guide) — scope characterization, five sandbox companies per developer
  account, rate limits, `003001 ThrottleExceeded`, webhook HTTPS + `intuit-signature` HMAC-SHA256,
  minor version 75 default as of August 2025.
- Coefficient — rate limits: 500/min per realm, 10 simultaneous, 40 batch/min, 200/min select APIs,
  HTTP 429, sandbox/production parity. **Explicitly does not attribute its figures to Intuit's docs.**
- Satva Solutions — limits and inaccessible-data list: batch size 30, ~1 MB payload, paging,
  Tags/custom fields/bill-payment fields/For-Review transactions/Projects, webhook payload incompleteness.
- G-Accon — Reports API change stated as effective **2026-06-30**. *Vendor with a competing product in
  the same space; weigh accordingly.*
- LeanLaw — QBO trust setup: Bank type / "Trust account" detail type; "Trust Accounts - Liabilities"
  parent; per-client sub-accounts; no built-in three-way reconciliation; **"QuickBooks won't prevent you
  from creating negative client balances or commingling funds."**
- Massey & Company CPA — parallel IOLTA setup guidance; single-liability-plus-class alternative;
  **"QuickBooks Online does not come preconfigured for trust accounting."**

**TIER R — this repo at HEAD `4146a4c`:** `docs/specs/BUILD-STATE.md` (:56, :58, :67, :68, :69, :70,
:72, :117); `docs/specs/future-modules-capture-2026-07-28.md`; `docs/specs/Go_Live_Gates.md` (gates 1–4,
9, GL-1, gate 2's 2026-08-11 clarification); `docs/specs/attorney-review-queue.md` (WF-5, Q-6, Task 7
memo Q6, Q-STAT-5, Q-WF-4/5/6); `docs/specs/wf-2-wf-8-email-workflow-spec-2026-08-15.md:459`;
`docs/specs/rulings-capture-2026-08-07.md:192`; `docs/specs/rulings-capture-2026-08-08.md:156`;
`db/schema.sql:305, 395–396`; `db/migrations/2026-07-28-cl2-client-dimension.sql:44,46`;
`supabase/functions/{legiscan-poller,statute-fetch}/index.ts`; all four `docs/specs/legal-rule-registry-*`.

---

*Filed 2026-08-15 Central. CHAT-DISPATCH Task 13. Repo read at HEAD `4146a4c` through the device
bridge; not a QR-3 pass. Everything above is PROPOSED until Michael rules.*

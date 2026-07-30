# Future-modules capture — QuickBooks Online integration proposal + unbuilt-territory map
> STATUS: CAPTURE — everything here is PROPOSED and unruled unless marked otherwise.
> Canonical repo path: docs/specs/future-modules-capture-2026-07-28.md
> Source: design-side session 2026-07-28 (Fable 5), post-#29 close-out conversation.
> Nothing here is authorized for build. Nothing enters the build queue without Michael's
> explicit ruling.

## 1. QuickBooks integration — PROPOSED, unruled

**Fact (CONFIRMED by Michael):** the firm uses **QuickBooks Online** — not Desktop.
This matters: QBO has a modern REST API with OAuth and Intuit-provided sandbox
companies; the Desktop path (Web Connector) is explicitly not in play.

**The proposal (Claude, Fable 5 — Michael authorized *capturing* it, not building it):**

- **Link, don't rebuild.** QuickBooks stays the system of record for money — it is what
  the bookkeeper and tax preparer already use. The case system's value is the join QB
  cannot do: it knows what a case is. The integration maps QB customers/payments/
  expenses/invoices to cases and clients so a case file can show its own financial
  picture (costs advanced, payments received, disbursement-statement inputs) without
  double keying.
- **Read-only first.** Stage 1 pulls numbers from QB into the case view — low risk,
  immediately useful. Write-back (case pushes an expense or invoice into QB) is a later
  stage, only if read-only earns it.
- **Sandbox-only until the go-live gates.** Michael's live QBO is full of real client
  data (real names, real settlements). Under the no-real-data rule, all development
  happens against Intuit sandbox companies. The live OAuth connection to the firm's
  actual books is not wired until after the go-live gates — arguably after the
  professional security review — because OAuth tokens to the firm's books are
  credential-tier sensitive, same class as the LegiScan key arrangement and handled
  with the same discipline.
- **Trust/operating separation is a day-one design constraint.** If IOLTA lives in QB,
  the integration must treat trust and operating money as categorically different
  things. Blurring them is not a bug; it is a bar-complaint. This constraint goes in
  the design doc's first section, not an appendix.
- **Coupled design:** the QB integration and the (undesigned) settlement/disbursement
  module are one design conversation — what the case system computes natively vs. what
  it reads from QB is the first question. Deciding them separately risks building the
  same ledger twice.

## 2. Unbuilt-territory map (Claude's sketch, for roadmap conversations — not designs)

Raised when Michael asked what remains to be imagined. None of these has an ID, a
design, or a ruling. Listed so future design sessions have the map, not so anyone
builds from it.

- **Money** (the biggest blank): settlement ledgers; fee and expense tracking against
  recovery; disbursement statements for client signature; trust/IOLTA accounting.
  "Mark disbursed" exists as a status with nothing behind it. Adjacent: **liens and
  subrogation** — hospital liens, Medicare conditional payments, carrier subro. The
  Kostura paper (ARCHIVE project) is legal authority with no module attached; the
  Medicare/Medicaid client flag currently has nowhere to report to.
- **Documents:** template/form generation (the Bexar monitoring-court forms doc is
  knowledge awaiting a feature); discovery tracking — requests, responses, objection
  deadlines, Michael Morton Act materials on the criminal side; eventual e-filing
  awareness. The itemized-bill ingest proposal (captured in #29, finding 2) is the
  first citizen of this territory.
- **Conflict checking:** the cross-case party identity model is ~80% of a conflicts
  system nobody has designed. Before the multi-user phase this is arguably a
  professional-responsibility gate, not a feature.
- **Intake pipeline (pre-case):** PNC exists as a party type; no lead → consult →
  signed/declined workflow, declination letters, referral tracking.
- **Practice-area gaps:** probate has zero machinery (inventories, accountings,
  letters, deadline cadence); criminal has intake but no plea/setting/disposition
  tracking; trial prep (exhibits, witness lists, depo tracking) exists nowhere — the
  party-credibility watch idea (#29, finding 5) is a natural tenant of it.
- **Communications log:** no per-case record of calls, letters, emails; the
  transcription stack will eventually feed this, but the log itself was never
  designed.

**Claude's one-line read (opinion, not a ruling):** money and conflicts are the two
widest gaps between "real practice" and "this system."

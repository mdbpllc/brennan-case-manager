# RE-1 — REFERRAL ENGINE: INPUTS MEMO

**STATUS: PROPOSED — INPUTS ONLY. NOTHING RULED, NOTHING BUILT, NOTHING AUTHORIZED.**
**Canonical repo path:** `docs/specs/re-1-referral-engine-inputs-2026-08-16.md`
**Session:** design, Opus 5, Cowork, 2026-08-16 Central (CHAT-DISPATCH **Task 14**).
**Michael did not participate and made no rulings.** Everything below is PROPOSED or CANDIDATE.
**DT-1:** clock-checked **13:12 CDT 2026-08-16** before stamping; the container read 18:12 UTC and the
Central date agreed — the 19:00 roll had not happened. Every stamp in this document is 2026-08-16.

---

## §0 — WHAT THIS IS, AND WHAT IT IS NOT

This is an **inputs memo**, not a spec. RE-1 has one ruled fact — *it should exist eventually* — and
nothing else. A spec would have to invent the rest, and inventing it is the failure PR-3 exists to
correct (*"a placeholder ladder is how the current wrong one happened"*).

So this document does four things and stops:

1. Establishes that RE-1 is open, and what the record does and does not say about it (§2–§3).
2. Reports what the built schema holds and lacks for a referral decision (§4).
3. **Points at** the conflict question without designing anything (§5).
4. Drafts the Texas fee-sharing and referral-disclosure layer **registry-style** — proposition, cite,
   UNVERIFIED, source named per item — and reports, as a finding, that SOURCING names no source for
   the layer that governs it (§6–§7).

Then it hands back the questions a Fable design session would open with, in full text (§8).

**The gate resolved as Tasks 9–11 did, not as Tasks 8, 12 or 13 did.** Task 8 elaborated rulings while
the build was gated; Tasks 9–11 mapped a design space with no ruling to elaborate; Task 12 had the
direction ruled and the destination not; Task 13 was told that staged **proposals** govern. RE-1 is the
Tasks 9–11 shape, and more starkly: **there is no design document anywhere in the repo that elaborates
RE-1** (§2.2). This memo maps and asks. **A build session must not read it as a design.**

---

## §1 — PROVENANCE, MARKED AT EVERY POINT OF USE

Three tiers, carried from the `#80` Bexar memo's TIER discipline and the `#87` QBO memo's re-lettering
so authority tiers and vendor tiers cannot be confused. **These marks must not be stripped.**

| Mark | Meaning | Quotable as rule text? |
|---|---|---|
| **`[A]`** | Clean-authority text read **locally** from the SOURCING-named corpus on Michael's machine, extracted with `pdftotext -layout` and spot-checked against raw extraction | **YES** |
| **`[B]`** | An **official publisher's web page** read **through a summarizing fetch layer**; some passages came back in quotation marks, most came back paraphrased | **NO — shape only** |
| **`R`** | This repository at HEAD, full text through the device bridge | n/a (record, not authority) |

**Repo basis.** Read full-text at HEAD, `398c78c` on `master` (*"Queue-runner (forty-second
invocation): file the CHAT-DISPATCH Task 13 QBO integration research memo"*). Bridge grants requested
and given at session start — **both folders this time**, `C:\Users\Brennan\brennan-case-manager` **and**
`C:\Users\Brennan\Documents\Knowledge Repo`, which is what `#87`'s resume note asked for and the reason
§6 exists at all rather than repeating `QBO-LOOK-4`'s wall. **HK-7 is satisfied for one session a TENTH
time — not closed;** the grants are session-scoped.

**This HEAD read is NOT a QR-3 pass.** `git fetch` cannot run through the bridge, so `HEAD ==
origin/master` was not established; only the local ref was read. Working tree: `git diff
--ignore-all-space --stat` returns empty, consistent with the known bridge-only CRLF artifact.

---

## §2 — THE GATE: RE-1 IS OPEN, AND IT HAS NO DESIGN-DOC HOME

### 2.1 Open, verbatim, and un-annotated since the day it was raised

| Check | Result | Evidence at HEAD |
|---|---|---|
| Queue row still ⬜ | **YES** | `attorney-review-queue.md:73` |
| Any closing entry in the log | **NO** | word-bounded `RE-1` sweep, §2.2 |
| Any annotation since 2026-07-26 | **NO** | the row is one sentence, unchanged |
| Pointer row consistent | **YES** | `attorney-review-queue.md:337`, glyph stripped at `#68` |

`attorney-review-queue.md:73`, verbatim and in full:

> ⬜ **RE-1 — referral engine.** **NEW, OPEN.** Ruled yes-eventually; triggers, logging, referral
> letter, and conflicts interaction all open. Not family-specific — conflicts, out-of-area matters, and
> overflow are all inputs.

**Raising entry: session-log `#9`, 2026-07-26** (*"Design space, Opus 5: PR-1/PR-2 ruled, D3/H8 CLOSED,
slice rename, family law removed"*), at `session-log.md:7169–7171`:

> **RE-1 opened — referral engine.** Michael: *"There should be a referral engine built in, but that'll
> be an open piece."* Logged as its own concept, not a sub-piece of the family ruling: conflicts,
> out-of-area matters, and overflow are all inputs, family being one among several. Ruled
> yes-eventually; everything else OPEN.

**Contrast worth recording: PR-3 has three annotations and RE-1 has none.** Both were raised the same
day in the same file. PR-3 accreted direction, a hold, an unblock condition and a proposal; RE-1 has sat
at one sentence for twenty-one days. That is not neglect — it is the honest shape of an item nobody has
worked on. It is also why this memo cannot be a spec.

### 2.2 No design document **elaborates** RE-1

Word-bounded, at HEAD: **`RE-1` appears 15 times across 7 files** —
`session-log.md` (5), `attorney-review-queue.md` (4), `statutes-pass-est352-cprc71-2026-07-26.md` (2),
`BUILD-STATE.md` (1), `time-tracker-fee-basis-profiles-design.md` (1),
`rulings-capture-2026-08-07.md` (1), `case-management-project-instructions.md` (1).

Of those seven: two are the log and the queue; one is a same-day rulings capture; one is BUILD-STATE's
carry; one is a **queue mirror** inside the time-tracker doc (`:197`, restating the row); one is the
**not-covered list** of the 08-07 rulings capture (`:192` — *"next build slice (unnamed); **RE-1
detail**; QBO ruling; registry entries 1–10"*); and one is the master spec's **family-law ruling**,
which names RE-1 in a parenthesis (§3.4 below).

**This is the IN-1 shape exactly** (`#83`): a queue row, a capture that produced it, and nothing that
elaborates it. It appears in **no schema file and no migration**, and the one design document that
names it does so by **mirroring the queue row**, not by elaborating it.

*(Method note, recorded because the `#83` pass had to correct an unbounded pattern: the counts above are
word-bounded. An unbounded `RE-1` would also match `CORE-1`, `FIRE-1` and similar; none exists in this
repo, but the bounded figure is the one stated.)*

---

## §3 — REFERRAL TRIGGERS PER THE RECORD

The dispatch names three — conflicts, out-of-area, overflow. **The record carries four**, and one of
the three is **ambiguous in the record itself**.

### 3.1 Conflicts

On the record twice: in RE-1's own row (*"conflicts… are all inputs"*) and, separately and earlier the
same day, as its own ruling — **the conflicts check is ADVISORY, not a gate** (§5).

### 3.2 Out-of-area — **THE RECORD CARRIES TWO DIFFERENT READINGS OF THIS TRIGGER**

Same session, same day, two documents:

| Source | Wording |
|---|---|
| `session-log.md:7170` (`#9`) | *"conflicts, **out-of-area matters**, and overflow are all inputs"* |
| `attorney-review-queue.md:73` | *"conflicts, **out-of-area matters**, and overflow are all inputs"* |
| `statutes-pass-est352-cprc71-2026-07-26.md:551–552` (§A7, the same session's capture) | *"conflicts, **matters outside the practice areas**, and overflow are all inputs"* |

**"Out-of-area" reads geographically; "outside the practice areas" reads by subject matter.** The
capture is the same session's own gloss of the same sentence, so this is not two people disagreeing —
it is one phrase that was written down twice and meant differently, and **nothing since has resolved
it.**

**It is not a quibble, because the two readings need different data and touch different law.**

- *Subject matter* is answerable from what the system already holds: `cases.practice_area` and
  `cases.case_type` — free text, no CHECK, no enum (`db/schema.sql:38–39`), which is a different
  problem but at least the values exist.
- *Geography* is not answerable at all: `cases` carries `court_name` and `cause_number` as free text
  and **no county, district, venue or jurisdiction column** (§4.1). And an out-of-**state** matter
  reaches a licensure question the system holds nothing about.

Raised as `Q-RE-1`.

### 3.3 Overflow

On the record in the same sentence, and nowhere else. **Nothing on the record defines it** — no
capacity model, no caseload metric, no threshold, and nothing in the schema counts open matters against
anything. `cases.status` and `date_closed` exist; a caseload figure is derivable; what number would
mean "overflow" is not on the record in any form.

### 3.4 The fourth trigger the dispatch does not name: **the family-law issue flag**

`case-management-project-instructions.md:16` — the master spec, which PRECEDENCE makes **authoritative
for what is DESIGNED** — ends the family-law ruling this way:

> The system should be able to say *"there is a family-law issue here — flag it, refer it out"* without
> ever opening a family matter. **Referral out is first-class behavior (RE-1, a future design pass).**

Two things in one sentence, and both matter.

1. **A fourth trigger**, and the only one with a stated *mechanism*: a cross-cutting flag raised inside
   a probate or PI matter, not a case-level classification. `#9` was careful that RE-1 is *"not a
   sub-piece of the family ruling… family being one among several"* — true, and it does not make family
   *less* than one among several. It is a trigger with a designed shape while the other three have
   none.
2. **"Referral out is first-class behavior"** is the strongest scoping statement about RE-1 anywhere in
   the record, and it is a *design-authority* statement, not a queue note.

### 3.5 What no trigger on the record tells us

**Every one of the four is an OUTBOUND trigger.** The record contains no statement that the system
models **inbound** referrals — matters the firm *receives* from other counsel — even though
`email-workflow-requirements.md:19` records, from a 60-day mailbox survey, that *"New matters arrive via
indigent-defense appointment notices and **attorney referrals**, not web leads."* The direction that
actually feeds the practice is the direction RE-1's record does not mention. Raised as `Q-RE-7`, and it
is where §6's rules bite hardest.

---

## §4 — WHAT THE BUILT SCHEMA HOLDS AND LACKS FOR A REFERRAL DECISION

All sweeps below are word-bounded, case-insensitive, run natively at HEAD across `db/schema.sql` and
**all three** migrations.

### 4.1 The absences, measured

| Term | Hits in `db/` + `supabase/` |
|---|---|
| `referral`, `referrals`, `refer` | **0 · 0 · 0** |
| `conflict_check`, `conflicts`, `disqualif`, `waiver` | **0 · 0 · 0 · 0** |
| `fee_split`, `fee_share` | **0 · 0** |
| `PNC`, `prospective`, `potential new client` | **0 · 0 · 0** |
| `conflict` | 5 — **four `on conflict … do nothing` SQL clauses and one spec-precedence comment**; none is a conflicts-of-interest concept |
| `adverse` | 4 — all inside the `insurer-of-adverse-party` contact-edge type and its comments |

This **reproduces** BUILD-STATE's `#85` claim (`referral` zero across the four files) and extends it:
the conflicts and fee-division vocabularies are absent too. Also absent, and relevant: **no county,
venue, jurisdiction or district column on `cases`** — the full column list is `id · file_number ·
legacy_ref · practice_area · case_type · caption · status · representation_type ·
commercial_policy_involved · pi_flags · date_of_incident · date_opened · date_closed · court_name ·
cause_number · notes · created_at · updated_at`.

**Consequence, stated before anyone is asked to price it: any referral record of any kind creates its
first table, and `ALTER DEFAULT PRIVILEGES` is not set — so a new table carries its own GRANT or it is
unreachable** (`BUILD-STATE.md`, Data layer). Same cost `#85` and `#87` found.

### 4.2 What the schema **does** hold that a referral decision would reach for

Four structures exist and are load-bearing for any eventual design. **Naming them is not proposing
them.**

- **`parties` — the CD-1 directory, and it is the cross-case identity model.** `role_tags text[]`,
  typed `aliases jsonb` with a **multi-match FLAG** rather than a resolution, `deceased` as a fact of
  the person. `future-modules-capture-2026-07-28.md:58–60` states the consequence in terms: *"the
  cross-case party identity model is ~80% of a conflicts system nobody has designed."* **That
  document is listed in BUILD-STATE as UNRULED, adopt nothing** — the sentence is an observation, not a
  constraint.
- **`contact_edges` — a controlled relationship vocabulary between contacts,** **19** CHECK-enforced
  edge types, one of which is **`attorney-for`**, with `case_id` nullable (*"NULL = world fact"*). A
  lawyer-to-matter relation therefore already has a home shape. Adding an edge type is, by the file's
  own comment, **"a SPEC-LEVEL act."** *(Precision worth keeping: the schema's neighbouring **comment**
  uses the phrase "attorney-of-record-for," but the enforced vocabulary's value is `attorney-for`. A
  design that reached for the comment's wording would be adding a type, not using one.)*
- **`case_clients.fee_arrangement jsonb not null default '{}'`** — the only fee-shaped column in the
  database, carrying an explicit comment that it **"does NOT close D-CL2-3"**, and nothing writes it
  today. §6 shows that TDRPC 1.04(f)(2) fixes a minimum field set for a fee-division record; whether
  that set belongs in this column is `Q-RE-3`, and it collides with CL-2's ruled seam (the case owns
  the occurrence and liability; the **client** owns the damages) because a fee division is a property
  of the *engagement*, not of a damages claim.
- **The flag-don't-decide substrate: `case_roster_flags` and `case_client_flags`,** both keyed to a
  case, both carrying `reason text not null` and a nullable `resolved_at`, both preserving the
  un-decided value verbatim rather than writing a guess. This is the pattern an advisory conflicts flag
  would most naturally take — and note it is a **different** clearing mechanism from the one the
  conflicts ruling actually named (§5.2).

### 4.3 The PNC funnel: designed, "SETTLED", and **not built**

The master spec, `case-management-project-instructions.md:349`, verbatim:

> **PNC intake funnel (built into person):** a person carries a status that advances on the SAME record
> (nothing re-entered): PNC (potential new client — an intake file opened before signing) → then one
> of: Client (intake converted to a case), Declined, or **Referred out**. Each outcome carries a date
> and a short reason/note. Gives a real intake funnel and retains the full trail for reporting on where
> clients come from…

**"Referred out" already exists as a designed terminal status with a date and a reason.** That is the
single most RE-1-shaped thing in the design record, and RE-1's row does not mention it.

**It is not built, and three independent places on the record say so:**

- `future-modules-capture-2026-07-28.md:61–62` — *"**Intake pipeline (pre-case):** PNC exists as a
  party type; no lead → consult → signed/declined workflow, declination letters, **referral
  tracking**."*
- `spec-feedback.md:197–201` — *"**Party-type promotion path.** Party type is frozen after creation by
  design, but the Person type's intake-funnel fields (PNC → Client) imply a promotion path that doesn't
  exist — re-entering a person as a new Client party would split their cross-case history. Needs a
  settled mechanism."*
- `cd2-role-mining-pass-2026-08-13.md:418` — the same gap, re-observed at the CD-2 pass.

And it is absent from the database: `PNC` returns **zero** in `db/` and `supabase/`, and `parties` has
**no status column** — only `party_type text not null`, `role_tags`, and an untyped `fields jsonb`.
CD-1's own living spec does not carry it either: `contact-directory.md:100` defines **party status** as
`caption party / non-party actor / court-appointed / intervenor / unnamed-reserved` — a
**litigation-posture** axis, not an intake-funnel axis. Two different things wearing one word.

**So the structural finding is this:** three of the four triggers (conflicts, out-of-area, overflow) fire
at **intake**, before a case exists — and **at intake the built system holds nothing at all.** A case
row is created on signing; a matter referred out never becomes one. The fourth trigger (family-law
issue) fires **inside an existing matter**, where the system holds a great deal. **RE-1 therefore
straddles a boundary the build has not crossed**, and whether it crosses it is `Q-RE-4`.

### 4.4 Q-WF-4 does **not** acquire a third consumer — stated because `#87` asked

`#87`'s resume note asked this session to say whether RE-1's conflict pointer adds a third consumer to
`Q-WF-4` (*does this application acquire a server-side identity, and of what shape?*). **It does not,
and the reason is structural rather than lucky:** every referral act on the record is
attorney-initiated and synchronous — Michael decides to refer, the system records it. There is no
background watcher, no webhook, no app-only credential, and nothing that must run while nobody is
looking. **`Q-WF-4` stays at two consumers (WF-2–WF-8 and QBO).** If a later design adds outbound
referral *email* through Graph, that changes — and it would change by adding a mail scope, which is a
consent act on Michael's registration, not a silent one.

---

## §5 — CONFLICT-MODULE INTERACTION: **POINT, DON'T DESIGN**

The dispatch says point. This section points, names the two facts a designer must not re-derive, and
stops.

### 5.1 The conflicts check is RULED, and it is ADVISORY

Session-log **`#15`, 2026-07-26** (*"V17 ruled (a); CLAIMANT DIMENSION ruled in; conflicts = advisory
flag"*), at `session-log.md:6767–6772`, verbatim:

> **Conflicts check ruled ADVISORY, not a gate.** Michael: *"This can be a flag that you can bring up
> to me, but I should be able to mark it as decided once I figure it out. I already see these
> situations coming and my contract handles them regardless."* Deliberately unlike PI's three hard
> gates. Disposition + reason go to the review log. **The system encodes nothing about what his
> contract handles.**

**Three constraints ride in that paragraph, and all three bind RE-1:**

1. **Advisory, never blocking.** A conflicts finding cannot stop a referral, an intake, or anything
   else. It surfaces.
2. **Michael marks it decided.** The disposition is an attorney act, and the system records that he
   made it — the same shape as registry verification (*automation flags; only Michael verifies*).
3. **The system encodes nothing about what his contract handles.** This is the sharpest of the three
   and the easiest to violate by accident: a referral engine that reasons about *whether a conflict is
   waivable* has crossed it. RE-1 may record that a conflict was flagged and that Michael disposed of
   it. It may not model the disposition's legal basis.

### 5.2 The one thing worth flagging: **the ruling names a clearing mechanism the schema does not have**

The ruling says *"Disposition + reason go to the **review log**."* `review_log` exists in
`db/schema.sql` and is generic — `entity_type`, `entity_id`, `action`, `"user"`, `timestamp`,
`old_value`, `new_value`, `reason`. Its `action` column carries a CHECK admitting exactly six values:

> `check (action in ('suggested','confirmed','edited','rejected','created','generated'))`

**None of them is "decided".** Meanwhile the two flag tables built since (`case_roster_flags`,
`case_client_flags`) clear a flag a different way — a nullable `resolved_at` on the flag row itself,
with the un-decided value preserved verbatim.

So the codebase has **two clearing mechanisms for the same shape of thing**, the ruling names the older
one, and the newer one is the one every flag built since actually uses. This is the same *class* as
`#86`'s `sideSetFor()` / `statusesFor()` finding — two answers to one question living side by side —
though it is a vocabulary gap rather than a live defect, and **nothing here is broken today** because no
conflicts flag exists to clear. **Flagged, changed nowhere.** Raised as `Q-RE-6`.

### 5.3 What is deliberately NOT here

No conflicts data model. No matching algorithm. No proposal about what the cross-case identity model
should compare, or how a same-party-different-side hit would be scored. `future-modules-capture`'s
*"~80% of a conflicts system"* is a live observation in an **UNRULED** document, and turning it into a
percentage of a design is exactly the move this section refuses.

---

## §6 — TEXAS FEE-SHARING AND REFERRAL-DISCLOSURE RULES, REGISTRY-STYLE

### 6.0 THE FINDING THAT COMES FIRST: **SOURCING NAMES NO SOURCE FOR THIS LAYER**

`#87` predicted this and could not test it, because only the checkout was granted that session
(`QBO-LOOK-4`, NOT RUN). **Both folders were granted this session, so it was tested. The answer is no.**

SOURCING (v18, ruled 08-14, Q-STAT-1) names three layers. Each was checked:

| SOURCING layer | Checked how | Carries the Texas Disciplinary Rules? |
|---|---|---|
| **Texas statutes** — the official bulk corpus at `Documents\Knowledge Repo\Statutes 26-08-14\` | `unzip -l GV.pdf.zip` — **494 entries**, every one a chapter file (`gv.<n>.pdf`, plus lettered chapters `gv.22a`, `gv.490a…g`, `gv.54a/b` etc.). Grepped the entry list for `append`, `bar`, `conduct`, `ethic`, `disciplin` | **NO — zero matches. The bulk download carries code chapters only; the Government Code APPENDIX is not in it.** `gv.81.pdf` (State Bar) and `gv.82.pdf` (Licensing of Attorneys) are both present — the *statutes* are there; the *rules* are not |
| **Texas rules (TRCP / TRE / TRAP)** — clean-authority PDFs in `Documents\Knowledge Repo\` | Directory read: TRE (eff. 07/02/2026) at the root; `Civil\` holds TRAP (02/06/2026) and TRCP (July 2026); `Criminal\` holds the statewide criminal e-filing rules | **NO — the enumerated set is TRCP/TRE/TRAP plus criminal e-filing. No disciplinary-rules PDF exists in the Knowledge Repo** |
| **Federal regulations** — eCFR API | n/a | **NO — the TDRPC are state rules of professional conduct** |

**The Texas Disciplinary Rules of Professional Conduct sit in Tex. Gov't Code, Title 2, Subtitle G,
Appendix A (State Bar Rules), Art. X, §9 — an appendix to a code, and the official bulk channel does not
publish appendices.** So the rules that govern every proposition below are reachable by **none** of
SOURCING's three named layers.

**`QBO-LOOK-4` is therefore ANSWERED as to the corpus half** — the bulk corpus does not carry the
appendix — **and the gap it exposes is structural, not a one-session accident.** Extending SOURCING is a
convention amendment and is Michael's act: `Q-RE-9`, with `RE-LOOK-3` as the cheapest concrete fix.

**What this session did instead, and named as such:** retrieved the rule text from the **Texas Center
for Legal Ethics** (`legalethicstexas.com`), the State Bar of Texas entity that publishes the
disciplinary rules with comments, **through a summarizing fetch layer** — mark **`[B]`**, and per the
`#80` convention **`[B]` is not quotable as rule text**. The statutory layer around the rules **is** in
the corpus and was read locally — mark **`[A]`**, quotable. Where a proposition rests on `[B]` alone,
the entry says so and `RE-LOOK-1` is its remedy.

### 6.1 Method notes for the `[A]` reads

- Chapters were extracted from the corpus zips **into the device VM's `/tmp`**, not into the connected
  folder, and read there with `pdftotext -layout`. **No scratch was written into `Knowledge Repo`.**
  This generalizes the 2026-08-14 workaround without adding a second `_claude_extract`-class deletion
  item to Michael's hand (§10.4).
- **The A-for-space artifact is present exactly as characterized** at
  `statute-pass-registry-retrieval-2026-08-14.md` §3 — `Sec.A82.065.AACONTRACT FOR LEGAL SERVICES`.
  The doubled literal `A` was restored to a space **only** in that characterized context, plus the
  single `A` between a lower-case letter and a following capital or paren.
- **Three further transformations were needed, and all three are named rather than applied silently**,
  per §3's rule (*transform only what is characterized; REPORT anything else, never guess*): (1)
  `pdftotext -layout` preserves the source's **justified column spacing**, so multi-space runs inside a
  sentence were collapsed to single spaces; (2) the same layout produces **a space before the
  apostrophe** in possessives — the raw text reads `client ’s` and `person ’s` — normalized to `'s`;
  (3) curly apostrophes normalized to straight. **No word was added, removed, or changed.**
- **EVERY QUOTATION IN §6.2 WAS SPOT-CHECKED AGAINST RAW EXTRACTION, mechanically. 22 distinct quoted
  fragments across `gv.82`, `pe.38` and `oc.952` were matched back into the normalized raw text: 22
  PASS, 0 FAIL.** This is the SOURCING requirement discharged, not asserted — the check ran, and it is
  reproducible from the three chapter PDFs named above.
- **Currency is not inferred.** The corpus folder's download date is **2026-08-14** (Michael's hand);
  the statutes site's own currency statement for that corpus is the **89th 2nd Called Session (2025)**
  per the SOURCING convention. Per-chapter amendment histories below are **corroboration, never the
  figure.**

### 6.2 The propositions

Packet-local IDs `P-RE-1 … P-RE-12`. **No durable ID is minted — minting is Michael's act (ID-DL-1 now
governs a NINTH packet).** No registry file was opened, edited, or added to. **RETRIEVAL IS NOT
VERIFICATION: every entry below is UNVERIFIED and only Michael verifies.**

---

**`P-RE-1` — Fee division between lawyers not in the same firm is permitted on one of exactly two
bases.**
**Proposition:** A division of a fee between lawyers who are not in the same firm may be made only if
the division is (i) in proportion to the professional services performed by each lawyer, **or** (ii)
made between lawyers who assume joint responsibility for the representation.
**Cite:** Tex. Disciplinary R. Prof. Conduct 1.04(f)(1).
**Source named:** Texas Center for Legal Ethics, published rule text, retrieved 2026-08-16. **`[B]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** it is the first branch any referral-fee record must carry, and the two branches
have different downstream consequences (see `P-RE-2`, `P-RE-4`).

---

**`P-RE-2` — The client's written consent must PRECEDE the referral and must state four things.**
**Proposition:** The client must consent **in writing** to the terms of the arrangement **prior to the
time of the association or referral proposed**, and the consent must include (i) the identity of all
lawyers or law firms who will participate in the fee-sharing arrangement; (ii) whether fees will be
divided based on the proportion of services performed or by lawyers agreeing to assume joint
responsibility; and (iii) the share of the fee each lawyer or law firm will receive or, if the division
is based on proportion of services performed, the basis on which the division will be made.
**Cite:** Tex. Disciplinary R. Prof. Conduct 1.04(f)(2); see also Comment 15 (*"A client must consent in
writing to the terms of the arrangement prior to the time of the association or referral proposed."*).
**Source named:** Texas Center for Legal Ethics, retrieved 2026-08-16. **`[B]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** **this is the field list.** If a referral engine records a fee division at all,
this rule — not a designer — fixes its minimum shape: *a set of participating firms, a division basis,
a per-firm share, and a consent timestamp that must sort BEFORE the referral date.* It is also the one
requirement in this section a database can actually enforce, because "before" is comparable.

---

**`P-RE-3` — The aggregate fee is still subject to the unconscionability rule.**
**Proposition:** A division under 1.04(f) is permitted only if the aggregate fee does not violate
1.04(a); and under 1.04(a) a lawyer shall not enter into an arrangement for, charge, or collect an
illegal fee or unconscionable fee — *"A fee is unconscionable if a competent lawyer could not form a
reasonable belief that the fee is reasonable."*
**Cite:** Tex. Disciplinary R. Prof. Conduct 1.04(f)(3), 1.04(a).
**Source named:** Texas Center for Legal Ethics, retrieved 2026-08-16. **`[B]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** it is the one limb in this rule that is **pure attorney judgment** — the
reasonable-belief standard is not computable — so it belongs on the flag-don't-decide side of any
design, alongside the conflicts advisory.

---

**`P-RE-4` — Every referral or association agreement that produces a fee division must be CONFIRMED,
uninformed consent is not confirmation, and an unconfirmed agreement bars fee collection.**
**Proposition (quoted as retrieved):** *"Every agreement that allows a lawyer or law firm to associate
other counsel in the representation of a person, or to refer the person to other counsel for such
representation, and that results in such an association with or referral to a different law firm or a
lawyer in such a different firm, shall be confirmed by an arrangement conforming to paragraph (f).
Consent by a client or a prospective client without knowledge of the information specified in
subparagraph (f)(2) does not constitute a confirmation within the meaning of this rule. No attorney
shall collect or seek to collect fees or expenses in connection with any such agreement that is not
confirmed in that way, except for: (1) the reasonable value of legal services provided to that person;
and (2) the reasonable and necessary expenses actually incurred on behalf of that person."*
**Cite:** Tex. Disciplinary R. Prof. Conduct 1.04(g).
**Source named:** Texas Center for Legal Ethics, retrieved 2026-08-16. **`[B]` — the passage came back
in quotation marks but through the summarizing layer; treat the wording as reported, not as verified
rule text.**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** two reasons, and the second is the sharper. (1) *"or a prospective client"* is
the rule reaching the **pre-engagement** stage — the stage §4.3 shows the built system does not model.
(2) The failure mode is **economic and silent**: an unconfirmed arrangement does not void the referral,
it strips the fee. A system that logs a referral without capturing the confirmation records the act and
loses the thing that makes it payable.

---

**`P-RE-5` — Two carve-outs from the fee-division rule.**
**Proposition (quoted as retrieved):** *"Paragraph (f) of this rule does not apply to payment to a
former partner or associate pursuant to a separation or retirement agreement, or to a lawyer referral
program certified by the State Bar of Texas in accordance with the Texas Lawyer Referral Service
Quality Act, Tex. Occ. Code 952.001 et seq., or any amendments or recodifications thereof."*
**Cite:** Tex. Disciplinary R. Prof. Conduct 1.04(h).
**Source named:** Texas Center for Legal Ethics, retrieved 2026-08-16. **`[B]`**
**Status: UNVERIFIED.**
**Divergence flagged, NOT resolved:** the rule as retrieved names the *"Texas Lawyer Referral Service
**Quality** Act"*; the statute it cites states its own short title as the *"Texas Lawyer Referral
Service **Quality Assurance** Act"* (`P-RE-6`, `[A]`). One word apart, and the `[A]` source is the
better one for the statute's name. Whether the rule's text omits the word or the fetch layer dropped it
is **unknown and not guessed.**

---

**`P-RE-6` — A "lawyer referral service" is a certificated statutory creature, and participation has
conditions.**
**Proposition:** (a) The chapter is the **Texas Lawyer Referral Service Quality Assurance Act**
(§952.001). (b) *"'Lawyer referral service' means a person or the service provided by the person that
refers potential clients to lawyers regardless of whether the person uses the term 'referral service'
to describe the service provided"* (§952.002(1)). (c) *"A person may not operate a lawyer referral
service in this state unless the person holds a certificate issued under this chapter"* (§952.101). (d)
A licensed lawyer in good standing who maintains an office in the area served **may receive referrals**
from such a service if the lawyer complies with §952.155 and pays a reasonable registration and
membership fee not exceeding the amount set by state bar rules (§952.152). (e) §952.155 caps what may be
charged: no more than the client would have paid absent the referral, and the combined lawyer/service
fee **may not exceed $20 for the first 30 minutes of the initial office visit**, usable only for the
service's reasonable operating expenses or a public-service program.
**Cite:** Tex. Occ. Code §§952.001, 952.002(1), 952.101, 952.152, 952.155.
**Source named:** official bulk corpus, `Documents\Knowledge Repo\Statutes 26-08-14\OC.pdf.zip` →
`oc.952.pdf`, downloaded 2026-08-14 by Michael's hand. **`[A]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** the §952.002(1) definition is deliberately broad — *"regardless of whether the
person uses the term 'referral service'"* — so it is the provision that decides whether a recurring
arrangement the firm participates in is a certificated service or an ordinary 1.04(f) division. The two
are governed differently and the software would record them differently.

---

**`P-RE-7` — Paying for referrals is barred, with named exceptions; reciprocal referral arrangements
carry a disclosure condition.**
**Proposition (SHAPE ONLY — see the source mark):** A lawyer must not pay a non-lawyer for soliciting
clients, except nominal gifts of appreciation not given as compensation; the rule permits paying
reasonable fees for advertising and public-relations services and *"the usual charges of a lawyer
referral service that meets the requirements of Texas law"*; and **reciprocal referral agreements are
permitted if they are non-exclusive, disclosed to the client, and the lawyer's independent judgment is
preserved.**
**Cite:** Tex. Disciplinary R. Prof. Conduct 7.03(e) (as retrieved).
**Source named:** Texas Center for Legal Ethics, retrieved 2026-08-16. **`[B]` — and this one came back
LARGELY PARAPHRASED, with only fragments in quotation marks. It is not quotable as rule text and its
subsection lettering is itself in dispute (§6.3, D-2).**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** it is the **inbound** rule (§3.5). A referral *out* costs nothing to receive; a
standing reciprocal arrangement carries a **client-disclosure obligation** that is a data requirement,
not a policy. And it is the rule the barratry statutes point at by name (`P-RE-8`, `P-RE-10`).

---

**`P-RE-8` — A legal-services contract is voidable by the client if procured through barratry or a
Rule 7.03 violation.**
**Proposition (quoted, `[A]`):** *"Any contract for legal services is voidable by the client if it is
procured as a result of conduct violating Section 38.12(a) or (b), Penal Code, or Rule 7.03 of the
Texas Disciplinary Rules of Professional Conduct of the State Bar of Texas, regarding barratry by
attorneys or other persons."* A contingent-fee contract must additionally *"be in writing and signed by
the attorney and client."*
**Cite:** Tex. Gov't Code §82.065(b); §82.065(a).
**Source named:** official bulk corpus, `GV.pdf.zip` → `gv.82.pdf`, downloaded 2026-08-14. **`[A]`**
Amendment history in the chapter: added 1989; amended 2011 (S.B. 1716) and 2013 (H.B. 1711). *(History,
not currency — see §6.1.)*
**Status: UNVERIFIED.**
**Why RE-1 needs it:** **the statute reaches the disciplinary rule by name.** The one authority layer
SOURCING cannot reach is incorporated by reference into the one layer it can. That is the cleanest
possible demonstration that the gap in §6.0 is not academic.

---

**`P-RE-9` — Quantum meruit recovery on a voided contract is conditioned on having reported the
misconduct.**
**Proposition (quoted, `[A]`):** *"An attorney who was paid or owed fees or expenses under a contract
that is voided under this section may recover fees and expenses based on a quantum meruit theory if the
client does not prove that the attorney committed barratry or had actual knowledge, before undertaking
the representation, that the contract was procured as a result of barratry by another person. To
recover fees or expenses under this subsection, the attorney must have reported the misconduct as
required by the Texas Disciplinary Rules of Professional Conduct of the State Bar of Texas, unless: (1)
another person has already reported the misconduct; or (2) the attorney reasonably believed that
reporting the misconduct would substantially prejudice the client's interests."*
**Cite:** Tex. Gov't Code §82.065(c).
**Source named:** as `P-RE-8`. **`[A]`** *(Raw extraction reads `client ’s`; reported, not normalized.)*
**Status: UNVERIFIED.**
**Why RE-1 needs it:** *"before undertaking the representation"* is a **timing** fact about the
receiving lawyer's knowledge — the second place in this section where a date comparison, not a
judgment, is what the rule turns on.

---

**`P-RE-10` — Civil liability for prohibited barratry runs on a fixed schedule, including to a person
who was solicited and never signed.**
**Proposition (`[A]`):** A client may sue to void a contract procured through conduct violating Penal
Code §38.12(a) or (b) or TDRPC 7.03 and recover: all fees and expenses paid to the person who committed
barratry; the balance of fees and expenses paid to any other person under the contract after deducting
quantum meruit awards under §82.065(c); actual damages; **a penalty of $10,000**; and reasonable and
necessary attorney's fees — **and may sue even if the contract is voided voluntarily.** A person who
was *solicited* by such conduct **but did not enter into a contract** may also sue, recovering **a
penalty of $50,000**, actual damages, and reasonable and necessary attorney's fees. The section *"shall
be liberally construed and applied"*.
**Cite:** Tex. Gov't Code §82.0651(a)–(e).
**Source named:** as `P-RE-8`. **`[A]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** it prices the failure. The exposure attaches to **conduct at solicitation**, so
a system that keeps a durable, dated record of where a matter came from is evidence in the firm's
favour; one that keeps a sloppy one is evidence against it. **That is an argument for care in the
design, not an argument for any particular design — and none is proposed here.**

---

**`P-RE-11` — The barratry offense reaches paying for solicitation, accepting pay to solicit, and
accepting employment that resulted from prohibited solicitation.**
**Proposition (`[A]`):** A person commits an offense if, with intent to obtain an economic benefit, the
person *"pays or gives or offers to pay or give a person money or anything of value to solicit
employment"* (§38.12(a)(4)); *"pays or gives or offers to pay or give a family member of a prospective
client money or anything of value to solicit employment"* (a)(5); or *"accepts or agrees to accept
money or anything of value to solicit employment"* (a)(6). A person also commits an offense if the
person *"is a professional who knowingly accepts employment within the scope of the person's license,
registration, or certification that results from the solicitation of employment in violation of
Subsection (a)"* (§38.12(b)(3)).
**Cite:** Tex. Penal Code §38.12(a)(4)–(6), (b)(3).
**Source named:** official bulk corpus, `PE.pdf.zip` → `pe.38.pdf`, downloaded 2026-08-14. **`[A]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** §38.12(b)(3) is the **inbound** exposure — accepting a referred matter that came
from someone else's prohibited solicitation. It is the strongest reason `Q-RE-7` is not a rounding
error.

---

**`P-RE-12` — Conduct authorized by the disciplinary rules or a rule of court is an exception to
prosecution.**
**Proposition (quoted, `[A]`):** *"It is an exception to prosecution under Subsection (a) or (b) that
the person's conduct is authorized by the Texas Disciplinary Rules of Professional Conduct or any rule
of court."*
**Cite:** Tex. Penal Code §38.12(c).
**Source named:** as `P-RE-11`. **`[A]`**
**Status: UNVERIFIED.**
**Why RE-1 needs it:** it closes the loop begun at `P-RE-8`. The criminal statute's exception is
defined **by the disciplinary rules**, which SOURCING cannot reach. Three of the four statutory
provisions in this section are unreadable in their operative effect without the layer the corpus does
not carry.

### 6.3 Divergences and gaps — FLAGGED, NOT RESOLVED

- **D-1 — the referral-act name.** `P-RE-5` vs `P-RE-6`: *"Quality Act"* (rule, `[B]`) vs *"Quality
  Assurance Act"* (statute's own short title, `[A]`).
- **D-2 — TWO STATE-BAR-AFFILIATED SOURCES DISAGREE ABOUT RULE 7.03'S STRUCTURE.** The State Bar's own
  *Solicitation and Barratry* page describes 7.03 as having subsections **(a)–(e)** with (a) =
  telephone/in-person solicitation, (b) = paying unlicensed persons to solicit, (c) = payments to
  solicit employment, (d) = prohibited fee collection, (e) = lawyer referral services. The Texas Center
  for Legal Ethics rule page returns a **(a)–(g)** structure in which (a) is a definitions paragraph
  cross-referencing Rule 7.01(b)(2) and (e) is the compensation paragraph. **These cannot both be the
  operative text.** The likeliest explanation is that one page predates the 2021 restructuring of Part
  VII and the other follows it — **but that is an inference and it is not asserted.** Consequence:
  `P-RE-7`'s subsection cite is unsafe, and `P-RE-8`/`P-RE-10`'s statutory references to *"Rule 7.03"*
  point at a rule whose current internal lettering this session could not establish. `RE-LOOK-1`.
- **D-3 — NO SOURCE CONSULTED STATES THE RULES' CURRENCY, and one states a stale one.** Neither rule
  page carries an effective date, an "as amended" line, or a "current through" statement. One page
  (Rule 5.08) carries a citation footer reading *"(Tex. Disciplinary R. Prof. Conduct, (1989) reprinted
  in Tex. Govt Code Ann., tit. 2, subtit. G, app. (Vernon Supp. 1995))"*. Under SOURCING, **currency is
  never inferred from a document** — so **the TDRPC currency figure is UNESTABLISHED**, and every `[B]`
  proposition above inherits that. This is the same discipline that paid off at `#87` (the Intuit
  README vs. the policy statement) and it produces the same answer: the figure must come from the
  source's own statement, and here there isn't one.
- **D-4 — the summarizing layer is the ceiling, not a margin.** `P-RE-1`…`P-RE-5` and `P-RE-7` are
  `[B]`. `#80` ruled `[B]` **not quotable as rule text**. Nothing in §6 should reach a filing, a client
  disclosure, or a registry entry on the strength of the `[B]` marks alone.

---

## §7 — THE REGISTRY-ABSENCE PATTERN IS NOW **FOUR**

Word-bounded, case-insensitive, at HEAD, across **all four** `legal-rule-registry-*` files:

| Term | Hits |
|---|---|
| `referral`, `lawyer referral` | **0 · 0** |
| `fee sharing`, `fee-sharing`, `division of fee`, `joint responsibility` | **0 · 0 · 0 · 0** |
| `TDRPC`, `1.04`, `1.06` | **0 · 0 · 0** |
| `barratry`, `solicit`, `declin`, `engagement` | **0 · 0 · 0 · 0** |
| `refer` | 8 — **all unrelated**: five *"Cited in / cross-reference"* pointer lines, TRCP 197.2(c)'s **records-reference** answers (twice), and one bracket note |
| `conflict` | 5 — **all unrelated**: TRCP 44 next-friend *interest* conflict, a hospital-lien *"fatal-defect conflict"* classification note, and three drafting notes |
| `Rule 7`, `written consent`, `Disciplinary` | 3 — **all unrelated**: Tex. Code Crim. Proc. art. 27.18 (plea by videoconference with **written consent**, twice) and the Ins. Code §146.004 no-disciplinary-action clause inside a health-benefit-plan definition |

**Eighteen terms swept: thirteen return zero, five return hits, and every one of those hits was opened
and read.** None is a professional-conduct proposition. The hits were read rather than counted because
`#78` is the precedent for exactly this — an absence claim stated too broadly and corrected later.
**Not one professional-conduct proposition exists in the registry.**

**This is the FOURTH instance of the same shape**, and `#87` asked this session to say so if it landed:

1. `#78` — insurance (chs. 541/542 absent; narrowed when Entry 8 was found).
2. `#85` — privacy/HIPAA (`Q-WF-6`): two hits, both the same unrelated entry.
3. `#87` — client property / trust accounting (`Q-QBO-6`): six terms, all zero.
4. **This pass — professional conduct, fee sharing, referral disclosure: thirteen terms, all zero.**

**At four it stops being a coincidence and becomes a shape.** The honest statement of it: **the registry
covers the law of the firm's CASES and carries nothing about the law of the firm's PRACTICE.** Discovery,
pleading, medical billing, liens, criminal costs — all case law. Conflicts, fees, client property,
privacy, referrals — the rules that bind the lawyer regardless of any case — **none.** That is a
coherent scope, and it may well be the right one; but it is a scope nobody chose, and three of the four
absences were found by accident while looking for something else.

**All four entangle with `Q-STAT-5`'s fifth-registry-file question.** BUILD-STATE records **three**
research passes stacked behind it (`Q-WF-6`, `#78`'s insurance candidates, `Q-QBO-6`); **this pass makes
four.** Separately, the queue records that `Q-FE5-7`'s twelve TRCP 190/197 propositions reach the same
placement question from a different direction. Raised as `Q-RE-8`.

---

## §8 — THE DESIGN QUESTIONS A FABLE SESSION OPENS WITH

Packet-local IDs `Q-RE-1 … Q-RE-9`. **Full text per QR-1 — these must survive the deletion of this
packet.** Nothing here is a recommendation; where a question has an obvious-looking answer, that is the
question doing its job, not this memo hinting.

**`Q-RE-1` — Which reading of the "out-of-area" trigger is the operative one: geographic (a matter in a
county or state where the firm does not practice) or subject-matter (a matter outside PI, civil
litigation, criminal defense and probate)? The record carries both, from the same session and the same
day — `session-log.md:7170` and the queue row say "out-of-area matters," while that session's own
capture at `statutes-pass-est352-cprc71-2026-07-26.md:551–552` glosses the same sentence as "matters
outside the practice areas." The two need different data: subject matter is answerable from
`cases.practice_area` / `cases.case_type`, while geography is answerable from nothing the schema holds —
`cases` has `court_name` and `cause_number` as free text and no county, venue, district or jurisdiction
column at all. If the answer is "both," they are two triggers with two data requirements, not one.**

**`Q-RE-2` — Does RE-1 record the referral EVENT only, or the fee-division ARRANGEMENT as well? These
are different systems. An event log answers "where did this matter go, when, and why" — the master
spec's "Referred out" status with a date and a reason already describes it, and it needs no legal
machinery. An arrangement record answers "what did we agree to, did the client consent in writing
beforehand, and to what exactly" — and TDRPC 1.04(f)(2) then fixes its minimum field set: every
participating firm's identity, the division basis, each firm's share, and a consent timestamp that must
sort before the referral date. The second is strictly larger, touches money the system has none of, and
is the only version whose absence has an economic consequence (1.04(g): an unconfirmed arrangement
strips the fee rather than voiding the referral).**

**`Q-RE-3` — If a fee-division arrangement is recorded, where does it live? Three candidates, none
free. (a) `case_clients.fee_arrangement jsonb` — the only fee-shaped column in the database, currently
`'{}'` with an explicit comment that it "does NOT close D-CL2-3," but it hangs off the CLIENT, and
CL-2's ruled seam gives the client the damages while a fee division is a property of the engagement.
(b) A new table — which under `ALTER DEFAULT PRIVILEGES` being unset must carry its own GRANT, and which
would be the schema's first money-adjacent structure. (c) `contact_edges` with a new edge type — the
file's own comment calls adding one "a SPEC-LEVEL act," and an edge carries a relationship but not a
share, a basis, or a consent date. Does the answer wait on the undesigned money module, or does the
referral record precede it?**

**`Q-RE-4` — Does RE-1 build the PNC intake funnel, depend on it, or duplicate it? The master spec
already designs it and calls it SETTLED: a person carries a status advancing on the same record — PNC →
Client / Declined / **Referred out** — each outcome with a date and a short reason. It is not built:
`PNC` returns zero across `db/` and `supabase/`, `parties` has no status column, and three separate
places on the record note the missing PNC → Client promotion path
(`future-modules-capture-2026-07-28.md:61`, `spec-feedback.md:197–201`,
`cd2-role-mining-pass-2026-08-13.md:418`). Three of RE-1's four triggers fire at intake, before a case
row exists, so a referral engine that does not reach the funnel can only record referrals of matters the
firm already signed — which is the smaller half of the problem and arguably the wrong half.**

**`Q-RE-5` — Does RE-1 produce a document, and if so whose tenant is it? The queue row names a "referral
letter" as an open piece. Current reality: FE-D1 (the disclosures engine) is named, scoped and
authorized but NOT built; `generated_documents` has **no status column and no set/parent column**
(`#83`) and its `doc_type` CHECK **admits one value** (`#81`). A referral letter, a client-consent instrument under
1.04(f)(2), and a declination letter are three different documents with three different addressees, and
the record names only the first. Are they form-engine tenants that wait on FE-D1, or does RE-1 carry its
own minimal generation, or does it produce no document at all in its first form?**

**`Q-RE-6` — What does the conflicts advisory hand to RE-1, and by which of the codebase's two clearing
mechanisms? The conflicts check is RULED ADVISORY, never a gate (`#15`, 2026-07-26): it flags, Michael
marks it decided, and "the system encodes nothing about what his contract handles." That ruling says the
disposition and reason "go to the review log" — but `review_log.action` has a CHECK admitting only
('suggested','confirmed','edited','rejected','created','generated'), and none of those is "decided,"
while every flag built since (`case_roster_flags`, `case_client_flags`) clears through a nullable
`resolved_at` on the flag row with the undecided value preserved verbatim. Which mechanism does a
conflicts advisory use — and, separately, does a conflicts flag DISPOSED AS "refer this out" hand
anything to RE-1 automatically, or does Michael re-enter the referral by hand?**

**`Q-RE-7` — Does RE-1 model INBOUND referrals, or outbound only? Every trigger on the record is
outbound. But `email-workflow-requirements.md:19` records from a 60-day mailbox survey that new matters
arrive "via indigent-defense appointment notices and attorney referrals, not web leads" — so inbound is
the direction that actually feeds the practice. It is also where the law is sharpest: TDRPC 7.03(e)
conditions reciprocal referral arrangements on non-exclusivity, client disclosure and preserved
independent judgment; Penal Code §38.12(b)(3) reaches a professional who knowingly accepts employment
resulting from prohibited solicitation; and Gov't Code §82.0651(d) puts a $50,000 penalty on the
solicitation side even where no contract was signed. An outbound-only referral engine records the half
of the traffic with the smaller exposure.**

**`Q-RE-8` — Does the professional-conduct layer become the fifth registry file, join an existing one,
or stay out of the registry entirely? Fourteen fee-sharing, referral and disciplinary terms return zero
across all four registry files, and every non-zero adjacent hit was read and is unrelated. That is the
FOURTH absence of this shape — after privacy (`Q-WF-6`), insurance (`#78`) and client property /
trust accounting (`Q-QBO-6`) — and the four together describe a scope: the registry carries the law of
the firm's cases and nothing about the law of the firm's practice. All four now stack behind
`Q-STAT-5`. Is that scope the intended one, in which case these propositions live somewhere else and
the boundary should be written down; or is the registry the home for any proposition the software
relies on, in which case a fifth file is overdue and the four passes unblock together?**

**`Q-RE-9` — Does SOURCING acquire a fourth layer for the Texas Disciplinary Rules, and what is it?
SOURCING names three — the official bulk statutes corpus, the clean-authority TRCP/TRE/TRAP PDFs, and
the eCFR API — and this session established that none reaches the TDRPC: the bulk `GV.pdf.zip` holds 494
chapter files and no appendix (the rules sit in a Government Code appendix, not a chapter), and the
Knowledge Repo holds TRCP, TRE, TRAP and the criminal e-filing rules and no disciplinary-rules PDF. The
gap is not incidental: Gov't Code §82.065(b), §82.0651 and Penal Code §38.12(c) each incorporate the
disciplinary rules BY NAME, so three statutes the corpus does carry are unreadable in operative effect
without a layer it does not. Amending a binding convention is yours. `RE-LOOK-3` is the cheapest
concrete form of the fix; a named-official-web-source layer with a per-item currency requirement is
another; and a third option is to rule that this layer stays out of scope, which would be a real answer
and would also settle `Q-RE-8`.**

---

## §9 — NAMED LOOKS

**`RE-LOOK-1` — Read TDRPC 1.04 and 7.03 in a clean authority copy and establish the rules' currency
from the publisher's own statement.** Every `[B]` proposition in §6 is shape-only until this runs, and
D-2 means the 7.03 subsection lettering used above may be superseded. Cheapest sufficient form: the
State Bar's published rules PDF or the current Texas Rules of Court volume, read once, with the version
line recorded.

**`RE-LOOK-2` — Does the firm have any standing referral arrangement today, and does any current
engagement contract contain fee-division language?** A one-line fact question, Michael's to answer per
H5 — never a machine sweep. It decides whether RE-1 models an existing posture or a greenfield one, and
whether `P-RE-7`'s reciprocal-arrangement disclosure is a live obligation or a hypothetical.

**`RE-LOOK-3` — Should a clean-authority TDRPC PDF be added to `Documents\Knowledge Repo\`?** Michael's
hand, permanently — **Claude cannot fetch binaries.** This is the smallest change that would let a
future session cite the professional-conduct layer at `[A]` instead of `[B]`, and it would answer half
of `Q-RE-9` without amending anything.

---

## §10 — RAISED IN PASSING

Four items found while doing the above. **None is fixed; three cannot be fixed by a design session and
the fourth is a note.**

### 10.1 CANDIDATE-DISCREPANCY — the Task 13 packet zip is still in `inbox/`

The forty-second runner line (`session-log.md`, top entry) closes: *"Packet deleted after execution per
Step 4.5; this entry and #87 are the record."* At session start on `mdb-pllc`,
`inbox/push-to-code_qbo-integration-research-memo_2026-08-15.zip` (33,490 bytes, mtime 2026-08-15
18:02 Central) **is present**, and `git check-ignore` confirms `.gitignore:16` covers it. The packet
**was** executed — `docs/specs/qbo-integration-research-memo-2026-08-15.md` exists at HEAD at 51,316
bytes, matching the runner line's stated figure exactly.

**Operational consequence, which is why this is in the memo rather than only in the capture:** if this
memo's packet is saved into the same `inbox/`, the next queue-runner invocation will find **two zips**
and its Step 1 ordering will present an already-executed packet as pending.

**CORRECTED TWICE LATER IN THIS SESSION — RR-1, and the first correction was itself wrong.**

**First pass (WRONG, recorded because the record matters more than looking right).** Michael reported
running the forty-second invocation **driven remotely from his phone**. This section concluded the packet
had been executed and the *deletion* had failed at a permission prompt — `.claude/settings.local.json`
carries **21 `permissions.allow` entries and not one permits deleting a file**, so the deletion is the
only Step 4 action never allowlisted and prompts on every run.

**Second pass (CORRECT).** A Code session ran the QR-3 v7 gate **natively** and stopped: **HEAD was 1
AHEAD of `origin/master`.** `origin/master` was `4146a4c`; **neither the QBO memo nor the forty-second
runner line existed there.** So the close-out was **interrupted at the push** — and Step 4 item 5 (delete)
follows item 4 (push), so it never ran at all. **The packet was committed, not executed**, and nothing
establishes the deletion was ever attempted.

**What this section got wrong, and why:** it had the device bridge, wrote plainly that its HEAD read was
**not** a QR-3 pass, and then reasoned as though HEAD were origin. `git rev-parse origin/master` and
`git rev-list --left-right --count` were both available and neither was run. **A single consistent signal
was treated as a diagnosis.** The permission gap is real and is still fixed below — it is *a* defect, it
was not *this* one.

**THE DEFECT THAT ACTUALLY PRODUCED A FALSE RECORD:** *"Packet deleted after execution per Step 4.5"* is
**template boilerplate**, written at Step 4 item 1 and committed at item 3 — before the push at item 4
and the deletion at item 5. **It cannot be a report.** The identical sentence sits in the forty-first
invocation's runner line, where it happened to come true.

**`QR-5` RULED BY MICHAEL 2026-08-16, IN TWO PARTS.** (a) *"Strike the claim + carry forward"* — **a
session-log entry may assert no post-commit action**; push and deletion results go to Michael in-session
and any failure is carried into the next batch's runner line. (b) *"Verify + narrow rm allowlist"* — the
deletion is verified by re-listing `inbox/`, Step 1 marks a deliverable already in the repo as **POSSIBLY
ALREADY EXECUTED** while distinguishing pushed from committed-but-unpushed, and Step 0 gains the
`Bash(rm -f inbox/*)` precondition. **Runner v8. The fix ships in this memo's own packet.**

### 10.2 CORRECTED, NOT MERELY FLAGGED — the forty-second runner line's date

The entry is headed `## 2026-08-15`. Its commit `398c78c` carries author **and** commit date
**2026-08-16 12:58:40 −0500**, and the reflog records that commit being **created on this machine** at
that moment. DT-1 explains stamps drifting **forward** (a cloud container reading UTC past 19:00
Central); it does not explain a stamp a day **behind** its own commit.

**When this section was first written both causes were left open. Michael's account and the reflog settle
it:** the session ran on **2026-08-16**, driven from his phone, and the runner line carried the packet's
filename date (`…_2026-08-15.zip`) into its own header instead of stamping the run date. **The correction
is recorded in this packet's session-log entry with the required fields; the earlier entry stands as
written.** Correcting another session's entry in place is not this session's act, and the log is
append-only.

*Worth noting for DT-1's sake: this is the inverse of DT-1's own exhibit. DT-1 governs a design session
stamping a date too far FORWARD off a UTC container clock. Here a Code session stamped a date BACKWARD
off a filename. Same failure surface, opposite direction, different cause — folded into v19 as a note
rather than as a new convention.*

### 10.3 This HEAD read is not a QR-3 pass

`git fetch` cannot run through the device bridge, so `HEAD == origin/master` was **not** established
(`#74`'s finding, unchanged). The working tree was clean under `git diff --ignore-all-space`, and the
stale `.git/index.lock` was **absent again**.

*Small flag on that last one, since it is a counted claim: the record carries **two different tallies**
for the index.lock pattern as of the same session — `BUILD-STATE.md` at HEAD says it has been absent at
`#85`, `#86` and `#87`, **"three-for-six"**, while `#87`'s own session capture in project knowledge says
**"four-for-six."** Both were read; neither is corrected here. It changes nothing operationally — the
lock is a tendency either way — but it is a count-in-the-record disagreement of the class the project
tracks, and this session declines to pick a side on evidence it does not have.*

### 10.4 Process note — the corpus can now be read with no scratch left behind

`pdftotext`, `qpdf`, `gs` and `python3` all exist in the device VM. So a single chapter can be unzipped
into the VM's **`/tmp`** — not a mounted path — and read there, which is strictly better than the
2026-08-14 workaround of extracting into the connected folder and staging the result. **The queue
already carries one deletion item from that workaround
(`Knowledge Repo\Statutes 26-08-14\_claude_extract\`, Michael's hand, entered `#76`); this session added
none.** Three chapters were read this way (`gv.82`, `pe.38`, `oc.952`) and nothing was written to any
connected folder.

---

## §11 — NON-GOALS

Stated so that a build session, a future design session, or a queue runner cannot read this document as
more than it is.

1. **No referral engine is designed here.** No tables, no columns, no UI, no workflow, no state machine.
2. **No conflicts system is designed here** — §5 points, per the dispatch, and deliberately does not
   convert `future-modules-capture`'s *"~80%"* observation into a percentage of a design.
3. **No registry file was opened, edited, or added to.** No proposition was entered. **No status moved.
   The backlog stays 34.**
4. **Nothing is verified.** Every proposition in §6 is UNVERIFIED, and retrieval is not verification.
5. **No durable ID was minted.** `P-RE-*`, `Q-RE-*` and `RE-LOOK-*` are packet-local; minting is
   Michael's act (**ID-DL-1, ninth packet**).
6. **No document was annotated to answer a question it raises** — `future-modules-capture-2026-07-28.md`
   (still UNRULED, adopt nothing), `case-management-project-instructions.md`, `attorney-review-queue.md`,
   `contact-directory.md`, all four registry files, `db/schema.sql` and all three migrations were read
   and left untouched.
7. **No SOURCING amendment is proposed as adopted.** §6.0 reports a gap; `Q-RE-9` asks about it.
8. **This is not legal advice and not a compliance opinion.** Michael is the attorney; §6 is research
   support drafted registry-style, and the `[B]` marks bound what may be relied on.

# FE-4 — DEFINITIONS SETS AS CASE-LEVEL VERSIONED OBJECTS (spec)

**Status: PROPOSED. Nothing here is authorized to build.** Design session, Opus 5, Cowork,
2026-08-15 Central (DT-1: clock-checked 14:03 CDT before any stamp; container read 2026-08-15 UTC
and Central agreed). CHAT-DISPATCH Task 8, one of three.

**Canonical repo path:** `docs/specs/fe-4-definitions-sets-spec-2026-08-15.md`

**This spec adjudicates nothing.** FE-4's design question was RULED by Michael on 2026-08-11 and
the ruling lives at `form-engine.md` §13.1. This document elaborates the mechanics that follow
from that ruling and names what the ruling does not reach. **Where this spec and §13.1 differ,
§13.1 governs** — and any apparent difference is a defect in this document, to be reported rather
than relied on.

---

## 1. RECONCILE FIRST — what the record says before this spec says anything

Read at HEAD (`3146df2`) through the device bridge, 2026-08-15:

| Source | What it establishes |
|---|---|
| `attorney-review-queue.md` line 181 | FE-4 carries **⬜ = open**. The queue's convention line defines ⬜ as open. |
| Same row | **"RULED 2026-08-11 — design at `form-engine.md` §13.1"**; question text retained; *"build remains gated on the form engine being named and authorized as a slice, after the CD-1 build per `docs/specs/cd1-build-slice.md`."* |
| `form-engine.md` line 247 | *"2026-08-11: CD-1 RULED … **FE-4–FE-7 unblock for spec completion.** Build still unauthorized."* |
| `form-engine.md` §13 header | *"Spec rulings only — the engine remains specified-not-built."* |
| `REQ-CAPTURE_trucking-multidefendant-first-sets_2026-08-11.md` | Origin. REQ-02 → FE-4. |
| `anti-resurrection-ledger.md` | **No FE- row of any kind.** Nothing in the FE series is closed, withdrawn, or deliberately-not-built. |
| `BUILD-STATE.md` (sixty-ninth refresh) | FE-D1 authorized 2026-08-12, not built. Form engine EXCLUDED from the GL-1 go-live floor. |

**Gate result: FE-4 IS OPEN, and what is owed is exactly a spec.** The item is open because the
BUILD is gated, not because the design question is unanswered. The 2026-08-11 CD-1 ruling names
spec completion as the unblocked work in those words.

### 1.1 A gap found at the gate, reported not resolved

`fe-d1-build-slice.md` dispositions **FE-8 through FE-17** in or out of FE-D1, each with a named
home, and BUILD-STATE carries that list. **FE-4, FE-5, FE-6 and FE-7 appear in neither the IN list
nor the OUT list.** The nearest thing to a disposition touching FE-4 is the Scope-OUT line *"The
§13 item model itself — slice 2's core; nothing in FE-D1 creates items,"* which is aimed at FE-6.

This is not asserted as an error. The likely reading is that the #63 scoping pass addressed the
items that were still unruled and left the four already-ruled ones alone. But the consequence is
real: **FE-4 has no build home on the record.** Carried as Q-FE4-2 below.

---

## 2. Scope

A **definitions set** is a case-level object carrying the definitions block that every discovery
instrument in the case renders. Per §13.1:

- An **ordered list of definition items**. Each item has text (merge fields allowed), a **kind** —
  `standard` (from the format-authoritative template bank) / `case-specific slot` /
  `conditional block` — and an **inclusion condition** (e.g. ESI applicable).
- **Composed at the first wave** from the template bank plus case data.
- The **party-set definition renders from the roster**; **instrumentality definitions** (vehicles
  by VIN) render from IN-2 fact rows.
- **Immutable versions.** A material edit creates a new version. Every rendered instrument
  **stamps the definitions-set version it used** — the house pattern, parallel to
  `template_version`, FE-8 as-generated retention, and registry-version stamping.
- **Propagation is prospective.** New renders use the latest version; served documents are history
  via their `.docx`.
- **"You/Your" is NOT versioned content** — it is a render-time per-target substitution, so one
  wave carries **one** definitions version across all targets rather than a phantom version per
  defendant.

Evidence of record for the last point: six documents, one definitions list, only You/Your varying
(the trucking capture, REQ-02); exemplar ¶2 of
`docs/templates/discovery/template_definitions-instructions_requests.md`.

---

## 3. Data-model touchpoints

**Nothing in this section exists today.** Verified at HEAD against `db/schema.sql` and
`db/migrations/`: 36 `create table` statements, none of them a definitions, template, item, or
instrument table. BUILD-STATE states the same from the other side.

### 3.1 New structures the ruling implies

| Structure | Why the ruling requires it | Notes |
|---|---|---|
| `definitions_sets` | The object is case-level with its own identity | `case_id` FK → `cases`; version integer; immutability means append, never update |
| `definitions_items` | "An ordered list of definition items" | ordinal; `text`; `kind` ∈ {standard, case-specific-slot, conditional-block}; `inclusion_condition` |
| A version stamp on every rendered instrument | "every rendered instrument stamps the definitions-set version it used" | see §3.2 — the row that would carry it is constrained today |

**Immutability is a schema posture, not a convention.** A versions table that is updated in place
silently stops being a version history — the same defect class the CL-2 comment in `schema.sql`
warns about for `statute_of_limitations` ("a writable column meant to mirror derived data stops
mirroring it silently"). Whatever shape is built, the enforcement point should be in the database.

### 3.2 `generated_documents` will not accept an instrument as it stands

The one existing table in the neighborhood is `generated_documents` (`db/schema.sql` line 515). At
HEAD it carries:

```
doc_type text not null check (doc_type in ('reasonable-value-report')),
audience text not null default 'internal' check (audience in ('internal','lienholder','client','opposing')),
privilege_tier text not null default 'work-product' check (...),
content text not null,
```

**The `doc_type` CHECK admits exactly one value.** Any instrument render — under FE-4, FE-6, or
FE-D1 — either widens that constraint or lands somewhere else. This is a concrete, checkable
consequence and it is stated here so no slice discovers it mid-build. It is also where the
definitions-set version stamp naturally belongs, alongside `template_version` per §10.

Two smaller notes on the same table: `content text not null` stores document content **inline**
(the comment says "until document storage lands"), and `audience` / `privilege_tier` already
encode an internal-vs-outbound distinction — a partial precedent for FE-17's hard flag, though
FE-17 is bound to the ITEM table, not this one.

### 3.3 Dependencies on things that exist

- **Roster (CD-1, BUILT 2026-08-12, live migration UNRUN).** The party-set definition renders from
  `case_parties` / `parties`. CD-1 is code-complete on fixture data; item 7 of its slice — the
  live migration — is Michael's hand and unrun. A definitions set that renders from the roster
  inherits that state.
- **Role tags.** BUILD-STATE records that CD-1's role-tag vocabulary is *"DERIVED from the party
  registry so it cannot drift."* Anything FE-4 renders off role tags should read the same source
  rather than restating the vocabulary.
- **GRANTs and RLS.** Every new table must carry its own GRANT or it is unreachable — **because
  Supabase's own default ACL withholds the four DML privileges, not because no default exists**
  (C-2 as RESTATED 2026-08-19). The RLS probe covers **37** tables and BUILD-STATE warns to keep
  it in step *"or a missing GRANT hides."* *(Conformed 2026-08-19: this bullet asserted
  "`ALTER DEFAULT PRIVILEGES` is **not** set" and quoted a BUILD-STATE snapshot reading 36 tables.
  The first was falsified by the 2026-08-19 `pg_default_acl` read — the vendor's bootstrap DID set
  one, so the conclusion survives on a different warrant — and the second by gate 10's `party_pii`,
  which took the probe list to 37 in the same commit as the table.)* Every table in §3.1 carries
  its own GRANT, its own RLS policy, and a probe extension **in the same commit as the table** —
  the #28 / CL-2 / CD-1 lesson, now standing practice per `fe-d1-build-slice.md`.

### 3.4 A dependency that does NOT exist

§13.1 says instrumentality definitions (vehicles by VIN) render **from IN-2 fact rows**. There is
no IN-2 fact table. BUILD-STATE lists *"IN-2 fact table"* among the items explicitly OUT of the
CD-1 slice, and IN-2 itself is an unwritten spec (CHAT-DISPATCH Task 10). **A definitions set
cannot render a VIN-keyed instrumentality definition until IN-2 exists or an interim source is
named.** Carried as Q-FE4-3.

---

## 4. Behavior

### 4.1 Composition

At the first wave, the engine composes a version-1 definitions set from (a) the template bank's
`standard` items, (b) case-specific slots filled from case data, and (c) conditional blocks
evaluated against their inclusion conditions. Template-bank items arrive with FE-12 provenance;
per the ATTORNEY INSTRUCTION OF RECORD (2026-08-11, standing), the current-practice bank is format
authority and the prior-firm bank is content-only.

### 4.2 Versioning

A material edit mints version *n+1*; earlier versions are never mutated. The engine does not
decide what is material — see Q-FE4-1.

### 4.3 Render-time substitution

`{{You}}` / `{{Your}}` resolve per target at render. One wave → one definitions version → *n*
targets. The version stamp recorded on each rendered instrument is the same value across the wave.

### 4.4 Propagation

Prospective only. An amendment does not reach back into served documents; the served `.docx` is
the historical record. Nothing recalls or re-renders a served instrument.

### 4.5 The live-roster / immutable-version tension

This is the sharpest mechanical consequence of the ruling and it is **not** resolved here. §13.1
says two things that pull against each other:

- the party-set definition **renders from the roster** (live data), and
- definitions-set versions are **immutable**, with every instrument stamping the version it used.

If the roster gains a defendant on Tuesday, does re-rendering version 3 on Wednesday produce
different text than version 3 produced on Monday? If yes, the stamp does not identify the output
and the immutability is nominal. If no, the set must snapshot roster-derived text at version-mint
time, which makes "renders from the roster" a composition-time act rather than a render-time one.
**Both readings are consistent with the ruling as written.** Carried as Q-FE4-4 — the question
this spec most wants answered.

---

## 5. Non-goals

- **Not a build authorization.** The form engine is not a named build slice; FE-D1 is the only
  authorized form-engine slice and FE-4 is not in its scope on the record (§1.1).
- **Does not create the item model.** Items are FE-6 / slice 2 (`fe-d1-build-slice.md`: *"nothing
  in FE-D1 creates items"*).
- **No supplementation/amendment replay design.** §10 names a wizard-answer snapshot for
  supplementation replay; that is FE-D1's and FE-15's territory.
- **No template editor UX.** §11.4 stays a later item; FE-D1 builds a MINIMAL editor only.
- **No Bates / document production.** §11.1 is banked for its own session.
- **No registry change of any kind**, and no legal proposition is asserted, verified, or moved by
  this document.
- **No client data.** Every example here is structural.

---

## 6. Open questions — FULL TEXT (QR-1)

Packet-local IDs only. **No durable IDs are minted.** `FE-` is an existing durable namespace and
minting into it is Michael's act; `ID-DL-1` — which already governs the Task 6 and Task 7 packets'
question series — is the open question about which series packet-local questions join.

**Q-FE4-1.** §13.1 says "a material edit creates a new version." What makes an edit *material*?
A typographical correction to a standard definition, a substantive narrowing of the ESI
definition, and the addition of a newly-identified vehicle are three different kinds of change,
and only the last two obviously deserve a version. Does the engine classify materiality itself,
present the choice to the attorney at save time, or treat **every** edit as material and accept
version inflation as the cost of never guessing wrong?

**Q-FE4-2.** FE-4 has no FE-D1 disposition on the record. `fe-d1-build-slice.md` dispositions
FE-8 through FE-17 in or out with named homes, and FE-2 is separately parked, but FE-4 (and FE-5,
FE-6, FE-7) appear in neither list. Is FE-4 IN FE-D1 — disclosures under TRCP 194 do not
conventionally carry a definitions block, which argues out — or is its home the discovery slice
alongside the §13 item model? Should the four already-ruled items get explicit dispositions so the
FE series reads uniformly?

**Q-FE4-3.** §13.1 sources instrumentality definitions (vehicles by VIN) from IN-2 fact rows.
IN-2 has no spec and no table, and BUILD-STATE lists the IN-2 fact table as explicitly OUT of the
CD-1 slice. Until IN-2 exists, is a VIN-keyed instrumentality definition (a) an ordinary
case-specific slot the attorney fills by hand, (b) blocked entirely so the engine never renders a
half-populated instrumentality definition, or (c) a reason the definitions set should not ship
before IN-2 does?

**Q-FE4-4.** The party-set definition "renders from the roster," and definitions-set versions are
immutable with every instrument stamping the version used. If the roster changes after version *n*
is minted, does re-rendering version *n* produce the new roster's text or the roster as it stood
when *n* was minted? Put concretely: does the definitions set **snapshot** roster-derived text at
version-mint time, or does it hold a **live reference** that resolves at each render? A live
reference means the version stamp does not identify what went out; a snapshot means the roster
feeds composition rather than rendering, and a roster correction requires a new version.

**Q-FE4-5.** Where does the definitions-set version stamp live? The natural home is the
generated-document record alongside `template_version` (§10), but `generated_documents` at HEAD
constrains `doc_type` to a single value and stores content inline. Does the instrument render
extend that table, or does the form engine get its own generated-instrument table — and if the
latter, what happens to the §10 language that treats them as one record?

**Q-FE4-6.** §13.1 lists three item kinds (standard / case-specific slot / conditional block).
Are those three exhaustive and closed — a CHECK constraint — or an initial vocabulary expected to
grow? The registry-vocabulary pattern CD-1 used (derive the vocabulary from one source so it
cannot drift) would argue for a single definition point either way.

---

## 7. Provenance and status

- Every repo fact in §1 and §3 was read **at HEAD through the device bridge**, not from RAG.
  Checkout state: `HEAD == origin/master == 3146df2`, unfetched (the bridge returns
  `HTTP 403 from proxy` on `git fetch`, and reads a false DIRTY of ~200 CRLF-only files — the
  known artifact recorded at #74 and re-observed here: `git diff --stat` reports
  199 files / 37,271 insertions / 37,271 deletions, an exact-match signature).
- **No registry file was touched. No legal proposition appears in this document.** FE-4 raises
  none; FE-5's spec carries the legal substrate for the three.
- **Nothing in `form-engine.md` was edited.** §13.1 stands as written; this spec is a separate
  document that points at it.
- Nothing here is verified. **Only Michael verifies.**

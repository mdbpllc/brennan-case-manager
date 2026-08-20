# FE-6 — INSTRUMENT PACKAGING MODES AND THE ITEM MODEL (spec)

**Status: PROPOSED. Nothing here is authorized to build.** Design session, Opus 5, Cowork,
2026-08-15 Central (DT-1: clock-checked 14:03 CDT before any stamp). CHAT-DISPATCH Task 8, three
of three.

**Canonical repo path:** `docs/specs/fe-6-instrument-packaging-spec-2026-08-15.md`

FE-6's design question — including a sub-question the originating capture never asked — was RULED
by Michael on 2026-08-11; the ruling lives at `form-engine.md` §13.3. **This spec adjudicates
nothing.** **Where this spec and §13.3 differ, §13.3 governs.**

---

## 1. RECONCILE FIRST

Read at HEAD (`3146df2`) through the device bridge, 2026-08-15:

| Source | What it establishes |
|---|---|
| `attorney-review-queue.md` line 183 | FE-6 carries **⬜ = open**. |
| Same row | **"RULED 2026-08-11 — design at `form-engine.md` §13.3"**; the never-asked sub-question is answered — *"each standalone instrument REPEATS the definitions block in full, no incorporation by reference"*; *"build remains gated on the form engine being named and authorized as a slice."* |
| `form-engine.md` line 247 | *"FE-4–FE-7 unblock for spec completion. Build still unauthorized."* |
| `fe-d1-build-slice.md` Scope-OUT | *"**The §13 item model itself** — slice 2's core; nothing in FE-D1 creates items."* |
| Same doc, FE-17 | *"**BINDING FROM-BIRTH ANNOTATION: rides whichever slice creates the ITEM table (the discovery slice), in the same commit as that table.**"* |
| Same doc, FE-9 and FE-11 | Both OUT of FE-D1, homed at the **discovery slice**; FE-9 *"needs FE-6's packaging families."* |
| `REQ-CAPTURE_trucking-multidefendant-first-sets_2026-08-11.md` REQ-04 | Origin. Combined-mode layout fully evidenced; separate mode needs its own layout ruling (supplied by §13.3). |
| `anti-resurrection-ledger.md` | No FE- row. |

**Gate result: FE-6 IS OPEN and a spec is what is owed.**

### 1.1 FE-6's disposition is implicit, and it is the strongest of the four

FE-4, FE-5 and FE-7 have no FE-D1 in/out disposition at all. **FE-6 nearly does:** the Scope-OUT
line *"The §13 item model itself — slice 2's core"* names FE-6's item model as belonging to slice
2, and three further lines corroborate it — FE-9 and FE-11 are homed at "the discovery slice," and
FE-17 is bound to *"whichever slice creates the ITEM table (the discovery slice)."*

Read together, the record places FE-6's item model at the discovery slice. **It is still not an
explicit FE-6 row**, so this spec treats it as the strongest available reading rather than as a
disposition, and asks for the explicit one at Q-FE6-1.

**This matters operationally, not just tidily.** FE-17 is a from-birth annotation on the ITEM
table — *"in the same commit as that table."* Whoever builds FE-6's items is bound by an
obligation recorded under a different item's number. That coupling is restated in §3.2 so the
slice that takes FE-6 cannot miss it.

---

## 2. Scope

Per §13.3:

- **One item model.** `item = id, text, scope (common | role:<tag> | entity-specific), instrument
  type`; `set = ordered filtered list`.
- **Packaging is a render-time choice** — combined or separate — **with content entered once.**
- **Both modes stamp the same definitions-set version** (FE-4 / §13.1).
- **Each standalone instrument repeats the definitions block in full — no incorporation by
  reference.** Reasons of record: (1) every served document self-proves — incorporation invites
  disputes about what was incorporated; (2) FE-4's versioning removes repetition's historical
  drift cost — the copies are identical by construction; (3) no per-instrument judgment call at
  serve time.
- **Separate-mode layout derives from the evidenced combined layout**: caption → per-instrument
  title → TO → the preamble paragraphs relevant to that instrument type → definitions (full) →
  the instrument's items with its prompt labels (ANSWER: / RESPONSE: / ADMIT OR DENY:) →
  signature → certificate of service, **one COS per document**; the defendant **Verification page
  rides only the interrogatories instrument**. Page-break structure per the house template.

### 2.1 The evidenced combined layout, for reference

From the trucking capture §3, observed in six produced documents:

> caption → title → TO paragraph → preamble (rule citations + deemed-admission warning) →
> definitions → instructions → interrogatories → RFPs → RFAs → signature → certificate of service

§13.3's separate-mode derivation is a projection of that order onto one instrument at a time. The
two orders are consistent; the separate-mode list adds the per-instrument title and the
instrument-relevant preamble subset, and drops the sections belonging to the other two instruments.

---

## 3. Data-model touchpoints

**The item table does not exist. Nothing in the schema at HEAD is an item, an instrument, a set,
or a template.** Verified against `db/schema.sql` (36 tables) and `db/migrations/`.

### 3.1 The item model

| Column | Source | Note |
|---|---|---|
| `id` | §13.3 | |
| `text` | §13.3 | merge fields permitted |
| `scope` | §13.3 | `common` \| `role:<tag>` \| `entity-specific` |
| `instrument_type` | §13.3 | interrogatory / RFP / RFA, and whatever later instrument families arrive |
| ordinal | implied by *"set = ordered filtered list"* | the order is a property of the set, not the item — see Q-FE6-6 |

**`scope: role:<tag>` binds FE-6 to CD-1's role vocabulary.** BUILD-STATE records that CD-1's role
tags are *"vocabulary DERIVED from the party registry so it cannot drift"* — a deliberate
anti-drift pattern. An item table that enumerates its own role strings forks that vocabulary the
day someone adds a tag. Whatever is built should read the same source. Q-FE6-2.

### 3.2 FE-17 rides this table, from birth, in the same commit

Restated from `fe-d1-build-slice.md` because it is recorded under FE-17's number and binds FE-6's
builder:

> **FE-17** internal/outbound hard flag — **BINDING FROM-BIRTH ANNOTATION: rides whichever slice
> creates the ITEM table (the discovery slice), in the same commit as that table.**

The requirement is that attorney-only rows **physically cannot** emit into an outbound instrument —
enforced by the renderer at the schema level, never by convention. A partial precedent exists:
`generated_documents` already carries `audience` and `privilege_tier` CHECK constraints. The
privilege-firewall sub-questions ride with FE-17 and are not reopened here.

### 3.3 Separate mode multiplies generated-document rows

In combined mode one render produces one served document. **In separate mode one render produces
three** — three titles, three definitions blocks, three certificates of service, and one
verification page attached to exactly one of them.

Against the schema at HEAD that is a problem twice over. `generated_documents`
(`db/schema.sql` line 515) constrains `doc_type` to a **single permitted value**
(`'reasonable-value-report'`) and stores `content` inline. So a separate-mode render needs a
widened constraint or a different table, and it needs a way to express that three rows are one
render of one set to one target. Q-FE6-3.

### 3.4 Other touchpoints

| Touchpoint | State at HEAD | Note |
|---|---|---|
| Definitions set + version (FE-4) | Does not exist | Both modes stamp the same version; that stamp needs a home (FE-4 spec §3.2, Q-FE4-5). |
| Roster / role tags (CD-1) | **BUILT 2026-08-12**, live migration UNRUN | Supplies targets and the role tags items filter on. |
| Template bank / `template_version` (§10) | Does not exist | FE-D1 creates a minimal editor and `template_version`. |
| Format profiles (FE-10) | Does not exist; **IN FE-D1 from birth** | Owns the footer per FE-15's cross-link; the separate-mode footer carries `{{instrument_name}}`, which differs per document in separate mode. |
| GRANTs / RLS / probe | **This project issues no `ALTER DEFAULT PRIVILEGES`** — but the database carries one anyway (Supabase's bootstrap), and its withholding of the four DML privileges is what actually makes an ungranted table unreachable (C-2 as RESTATED 2026-08-19); probe covers **37** tables | Every new table carries its own GRANT, RLS policy, and probe extension **in the same commit** — standing practice. *(Conformed 2026-08-19: this cell read "`ALTER DEFAULT PRIVILEGES` **not set**; probe covers 36 tables" — the first half falsified by the `pg_default_acl` read, the second by gate 10's `party_pii`.)* |

---

## 4. Behavior

1. **Author once.** Items are entered against the set with a scope and an instrument type. Content
   is never re-entered per mode or per target.
2. **Filter per target.** The set for a given responding party is the ordered list of items whose
   scope is `common`, or `role:<tag>` where the target carries that tag, or `entity-specific`
   naming that target.
3. **Choose the packaging mode at render.** Combined → one document per target. Separate → one
   document per (target, instrument type).
4. **Compose the definitions block in full into every document**, in both modes, from the same
   definitions-set version. No incorporation by reference, ever.
5. **Apply per-instrument prompt labels**: ANSWER: / RESPONSE: / ADMIT OR DENY:.
6. **One certificate of service per document.** Three documents in separate mode → three
   certificates.
7. **The verification page rides only the interrogatories instrument** — in either mode.
8. **Stamp** the definitions-set version (and, when it exists, `template_version`) on every
   rendered document.

### 4.1 RFA variant selection is the sharpest unmodelled case

The capture identifies this as the clearest role-keyed content, and it is not obviously covered by
the three scope values:

> RFA variants are the clearest role-keyed content: the same admission ("the tractor was owned by
> X") flips phrasing depending on whether the target **IS** X or a sibling of X — variant selection
> by role tag.

That is not one item with a scope; it is **one proposition with two renderings selected by the
target's relationship to a named party.** Modelling it as two `entity-specific` items duplicates
content the ruling says is entered once. Modelling it as one item with a variant table adds
structure §13.3 does not describe. Carried as Q-FE6-4 — the question this spec most wants answered
after Q-FE6-1.

---

## 5. Non-goals

- **Not a build authorization.** FE-D1 is the only authorized form-engine slice and
  *"nothing in FE-D1 creates items."*
- **Not FE-9.** Family drift detection is a separate item, homed at the discovery slice, that
  *consumes* FE-6's packaging families. **FE-6 builds families; it does not compare them.**
- **Not FE-11.** Roster-driven consistency sweeping is separate — and `fe-d1-build-slice.md` says
  so in terms precisely because the two look alike.
- **Not FE-10.** Format profiles and the render lint are IN FE-D1 from birth; FE-6 consumes them
  and does not define them.
- **Does not define the definitions set** — that is FE-4 / §13.1; FE-6 only stamps its version.
- **Does not count anything** — that is FE-5 / §13.2.
- **No Bates or document production** (§11.1, banked).
- **No registry change**, no legal proposition, **no client data.** The trucking material quoted
  here is the capture's own client-clean requirement text, not case content.

---

## 6. Open questions — FULL TEXT (QR-1)

Packet-local IDs only. **No durable IDs are minted.**

**Q-FE6-1.** Is FE-6's disposition explicit or inferred? `fe-d1-build-slice.md` says *"The §13 item
model itself — slice 2's core; nothing in FE-D1 creates items,"* and FE-9, FE-11 and FE-17 are all
homed at "the discovery slice." Read together the record places FE-6 at the discovery slice — but
there is no FE-6 row in either the IN or the OUT list, and the same is true of FE-4, FE-5 and
FE-7. Should the four already-ruled items get explicit dispositions, and is "slice 2" the same
thing as "the discovery slice" (the two names are used in the same document and never equated)?

**Q-FE6-2.** Does the item table's `role:<tag>` scope draw its vocabulary from CD-1's party
registry — the derived-so-it-cannot-drift pattern BUILD-STATE records — or does it carry its own
enumeration? If its own, what keeps the two in step when a role tag is added, and who notices when
they diverge?

**Q-FE6-3.** In separate mode one render produces three served documents. Is each its own
generated-document row — three rows, three certificates of service, one verification page on
exactly one of them — and if so, what ties the three together as one render of one set to one
target? A render/wave identity would do it, and nothing like that exists. Related: the
`generated_documents` table at HEAD constrains `doc_type` to a single permitted value and stores
content inline, so instrument rendering does not fit that table as written in either mode.

**Q-FE6-4.** How does the item model carry an RFA whose phrasing flips with the target's
relationship to a named party — the capture's example, "the tractor was owned by X," rendered one
way to X and another way to X's sibling? The three ruled scope values (`common`, `role:<tag>`,
`entity-specific`) describe *which targets get an item*, not *which wording a given target gets*.
Is variant selection (a) an item-level variant table keyed by role, (b) a merge-field expression
resolved at render, or (c) genuinely two entity-specific items, accepting the duplication the
enter-once principle otherwise rules out?

**Q-FE6-5.** Does the packaging mode belong to the case, the wave, or the individual render? A
case-level setting matches how a firm actually serves; a per-render choice matches §13.3's words
(*"packaging is a render-time choice"*); a per-wave setting sits between. The practical test is
whether a later supplemental instrument in the same case may be served in a different mode than
the original, and whether the engine should let that happen silently.

**Q-FE6-6.** *"Set = ordered filtered list."* Where does the order live? If ordinals sit on items,
every filtered set inherits gaps (item 7 is a `role:carrier` item absent from the driver's set) and
the visible numbering must be recomputed per target — which is exactly the numbering pass FE-10
builds, and exactly the defect class its live evidence describes (a chained start value producing
a silent duplicate). If ordinals sit on the set-target pair, the ordering is stored per target and
the item table is order-free. Which, and does the FE-10 numbering lint run over separate-mode
documents independently or across the family?

**Q-FE6-7.** §13.3 fixes one certificate of service per document. In separate mode three documents
go to the same party on the same day under three certificates. Is that three service events on the
record — with three dates that could, through a technical-failure re-transmission, actually
differ — or one service event evidenced three times? The Task 7 memo's finding that the filing
moment is contested (LR-LOOK-1) makes this less theoretical than it looks, and the deadline engine
would consume whichever answer holds.

---

## 7. Provenance and status

- Every repo fact was read **at HEAD through the device bridge** (`HEAD == origin/master ==
  3146df2`, unfetched — the bridge cannot `git fetch` and reads the known CRLF false-DIRTY of
  ~200 files; see the FE-4 spec §7 for the exact signature).
- **No legal proposition appears in this document.** FE-6 raises none. The legal substrate for the
  three specs is in the FE-5 spec §2 — UNVERIFIED except where its §2.1 records an existing
  VERIFIED registry entry, and note that its §2.2 flags a divergence between one such VERIFIED
  entry and the operative rule text.
- **Nothing in `form-engine.md` or `fe-d1-build-slice.md` was edited.** §13.3 stands as written;
  the FE-17 restatement in §3.2 is a pointer, not an amendment.
- Nothing here is verified. **Only Michael verifies.**

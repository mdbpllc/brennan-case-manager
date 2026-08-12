# CONTACT DIRECTORY — CD-1 living spec

**Canonical repo path:** `docs/specs/contact-directory.md` — NEW file.
**Status:** LIVING SPEC. Every ruling below was RULED by Michael, item by item, in the CD-1 schema
session of **2026-08-11 Central** (design session, typed, Fable 5; schema on screen per the ruled
session spec). **NOTHING IN THIS FILE AUTHORIZES A BUILD** — no table, no migration, no UI. All
build-facing consequences wait for an explicit authorization packet.
**Absorbs:** `docs/specs/cd-1-session-prep.md` (per that file's own delete-or-absorb line).
**Reconcile basis:** design-side sync at `13e5c1e`, log through #50 — possibly stale; the queue
runner verifies at HEAD.
**Living-spec posture (ruled 2026-08-08):** revisited as modules surface new field needs; nobody
treats this pass as frozen. Additions to controlled vocabularies (§5, §6) are spec-level acts.

Evidence cites reference `docs/specs/REQ-CAPTURE_roster-mining-pass_2026-08-11.md` (REQ-nn = its
packet-local numbering, preserved there) and
`docs/specs/REQ-CAPTURE_attorney-edit-roundtrip_2026-08-11.md`.

---

## §1 The core fork — RULED

**The `parties` table IS the contact directory.** The fork ("views over one directory, or separate
tables with links") resolves as **separate tables with links — the shape already built**:
`parties` is the single global identity source; `case_parties` remains the roster link;
`case_clients` remains the parallel damages-scope link. **D-CL2-8 stands untouched.**

- Reason: a second identity table beside `parties` would create two identity sources — the
  wrong-level defect class CL-2 was built to kill, and the thing CD-1 exists to prevent. The
  pointer model (§8) already works over this shape, and CL-2 was migrated live against these
  tables; restructuring reopens walked, verified ground for no evidence-backed gain.
- Rejected: **views** — `case_clients` carries first-class authoritative data (SOL, posture,
  disbursement) and cannot be a view; choosing views would reopen D-CL2-8, and no capture evidence
  argues for that. Rejected: **a new contacts table** — dual identity sources, the defect class.
- "Provider," "attorney," "adjuster" are roles a contact plays, not what a contact is (§3.4).

## §2 Directory scope — RULED

1. **Non-party actors with roles are in scope from day one** (roster capture REQ-15, the gate
   finding). A roster entry means "this contact matters to this case in this role"; whether it
   appears in the caption is an attribute of the entry (§4.2), not a precondition for existing.
   Reason: parties-only demonstrably misses the people drafting revolves around — the never-a-party
   at-fault driver in UIM cases, the non-party employee an entire discovery set targeted, treating
   physicians throughout disclosures.
2. **Attorneys-of-record live in the same directory; attorney is a role.** Who-represents-whom is a
   typed edge (§5), not a separate structure. Reason: counsel enter the same roster-bearing lists
   (certificates of interested parties, lead-counsel designations, appearances), and one mined
   interpleader sues a claimant's law firm as a party — a separate attorney structure would still
   need attorneys party-capable, i.e., two homes for one human.
3. **Probate reserves the PI-proven estate-adjacent pattern only** (roster capture §5.1, option b):
   representative-of / heir-of / next-of-kin-of edges, deceased lifecycle state, alias chains,
   mid-case substitution (REQ-10). Full probate roster modeling (heirship, administrations, will
   contests, guardianships) is DEFERRED until real probate documents enter the drafting workspace.
   Reason: zero probate-court documents in either bank; designing beyond the evidence would be the
   plausibility-reconstruction failure class the K-6/K-7 standing rule names.

## §3 Identity model — RULED

1. **Person ≠ party: capacity is a property of the roster link, never the directory** (REQ-12).
   One human = one directory row, always. A roster entry is (contact × capacity × role); capacity
   carries its kind (individually / next-friend-of / representative-of-estate-of / d/b/a) and,
   where it points at someone (the minor, the decedent), a reference to that contact's directory
   entry. Display and pseudonymization rules attach per roster entry (minor by initials while the
   next-friend parent is fully named). **Living/deceased is a directory-level fact of the person**;
   substitution mechanics ride §4.3 and §5.
2. **Names and aliases: structured name-forms on the directory entry** — legal name plus a typed
   alias set (d/b/a, f/k/a, entity-suffix variants). No trade-name nodes. The same trade-name alias
   may appear on multiple contacts; **a name matching more than one directory entry surfaces a
   flag** ("two entities behind this storefront — which one?"). Reason: one mined caption mapped a
   single trade name to two distinct corporations, killing d/b/a-as-plain-text; trade-name nodes
   would add a second entity kind to every common d/b/a for one rare case the flag handles.
3. **No identity-resolution machinery at CD-1.** Cross-case identity is inherent in §1 (every
   roster link points at one global row). The human resolves at entry: directory-first picker at
   intake, enter-once fallback (§8). A **merge-two-contacts operation is a named future need** —
   an accidental duplicate will eventually happen — but is not part of the first consumer. The
   registered-agent-who-is-also-a-defendant takes one row, two roster entries; no resolution.
4. **`party_type` is superseded by multi-valued directory role tags** (provider, attorney,
   adjuster, expert, ...), used for directory filtering and §6 variant selection; case-context
   roles stay on the roster link. Reason: a single mandatory type makes identity carry role — the
   wrong level, and incompatible with §2's attorney-is-a-role and CD-1's provider-is-a-role.
   Migration of existing `party_type` values is mechanical but build-side — **unauthorized**.

## §4 Roster layer (CD-2 rosters) — RULED

1. **Roster definitions are data, attached to the case-type tree, with inheritance.** Each slot
   carries: role label, expectancy tier (**expected / optional / rare-with-procedure**, per
   REQ-13's folder-taxonomy evidence), party-kind hint, service-path hint. A child case type
   inherits its parent's slots and adds its own (MVA baseline pair under trucking's
   carrier/lessor/owner/employer/trainer/parent/staffing extensions). Filling a slot links (or
   enter-once creates) a directory contact, creating the roster entry. **Slots never auto-create
   records** (CD-2 framing, ruled 2026-08-11). Empty optional slots are normal, not defects.
2. **The roster entry decomposes into four separable attributes** (satisfies the REQ-14 binding
   constraint by construction):
   - **role** — what they are in the story (driver, carrier, adjuster, treating physician);
   - **caption alignment** — drawn from the case type's *defined* side set (plaintiff/defendant;
     petitioner-only; stakeholder/claimants; State/accused); **null for non-parties**. Sides are a
     property of the case type, not a constant — "Plaintiff" is an alignment, not a role;
   - **party status** — caption party / non-party actor / court-appointed / intervenor /
     unnamed-reserved;
   - **firm perspective** — ours / opposing / neutral (the existing `side` column's true meaning,
     surviving as-is). The UIM at-fault driver shows why all four: no alignment, non-party,
     unmistakably opposing.
3. **Roster entries are history, not snapshot**: each records how it joined (intake slot /
   amendment / court action / substitution) and an active state (active / withdrawn /
   substituted-out). Reason: rosters change mid-case by operation of procedure (REQ-10 —
   suggestion of death, scire facias, heirs in, decedent out), and FE-8/IN-4 both need "who was in
   this case when this instrument went out." Defaults do the work: slot-created entries are born
   (intake, active) with nothing extra typed.

## §5 Relationship layer (CD-2 edges) — RULED

1. **One directional typed edge structure on the directory**: from-contact, to-contact, edge type,
   note, **optional case scope** — no case reference means a world fact (employer-of,
   parent/subsidiary, spouse); a case reference means true for that case (attorney-of-record-for,
   insurer-of-the-adverse-party here). Reason: REQ-11's inventory contains both kinds, and several
   liability theories are ONLY expressible as a relationship (entrustment, respondeat superior,
   alter ego).
   **One-home rule:** capacity references (§3.1) stay on the roster entry and never auto-create
   edges. "Appearing as next friend of the minor" is roster data; "is the minor's parent" is a
   directory edge — related facts, different homes, entered separately.
2. **Edge-type vocabulary is controlled and extensible, seeded from REQ-11's inventory**
   (employer/employee, owner-entrustor/driver, lessor/lessee, parent/subsidiary, affiliate/group,
   insurer/insured, insurer-of-adverse-party, principal-of, registered-agent-of, heir-of,
   representative-of-estate-of, next-of-kin-of, spouse/household, contractor/premises-owner,
   manufacturer/retailer, platform/driver, attorney/client, bailor/bailee, joint-enterprise).
   Adding a type is a spec-level act. Reason: downstream selectors (§6) and relationship-bearing
   boilerplate can only key off values the system knows; free text yields "employer," "Employer,"
   and "works for" as three relationships.
3. **The CL-1 firewall, named:** contact-to-contact edges (this spec) and case-to-case links
   (CL-1, `case_links`) **never merge, never share a structure, and neither ever holds the other's
   kind of link.** The D-CL1 queue items stay untouched and unruled; this names the boundary only.

## §6 Form-engine interface — RULED

1. **The selector surface is an enumerated, read-only contract.** Variant selection may condition
   on exactly: roster **role**; **caption alignment**; **party status**; **party kind**
   (individual/organization — pronoun and verification-block selection per REQ-17); **capacity
   kind**; directory **role tags**; and **edge existence/type between roster members**
   (target-employs-the-driver → respondeat-superior variant; target-owns-the-tractor vs.
   target's-parent-owns-it flips the RFA, per the CD-2 sibling-variant evidence). Selection reads
   this data and never writes it. Additions to the surface are spec-level acts.
2. **The service story lives on the roster entry** (case-scoped; REQ-19), decomposed as: mode
   (controlled list); service **target as a directory contact** (registered agent, city manager —
   pointer per §8, address read live, the served .docx remaining the historical record); and
   **statutory basis as a registry reference** where one applies (CPRC §§ 17.044 / 17.062,
   § 17.024, TTCA, FTCA — the entries Michael verified 2026-08-11 Central; the landed registry
   docs stamp 2026-08-12 on those verifications, deliberately left alone per #50, which records
   the true date). Registry discipline: the
   service-path picker cites; it never asserts legal currency. The same human served in two
   capacities takes two roster entries, each with its own service story. Slot definitions carry
   service-path *hints* (§4.1); roster entries carry service *facts*.

## §7 Source-fact attribution (IN-2's home) — RULED

1. **Source attribution lives on the case-scoped fact table** — {fact_id, value, source_document,
   source_field, extraction_method, verified_by_attorney}, per the extended IN-2 text — with fact
   rows referenced by merge fields, corrections propagating to every instrument using the fact,
   and OCR/vision extractions carrying a confidence flag. Not on directory entries; no sidecar.
   Reason: FE-1a generalized — case facts (VIN, incident time, pleaded ownership) live on the
   case — and FE-1c already ruled the directory's posture (silent trust, no per-field machinery);
   a sidecar would erect a second provenance regime over data ruled to need none. Discrepancy
   flags fall out naturally: two sources asserting different values for one fact row IS the flag
   (live evidence: incident time; pleaded vehicle ownership vs. the CR-3).
2. **The seam, stated so it is never decided silently:** for identity-class facts (a carrier's DOT
   number, a facility's legal name) the fact table is the staging layer; **attorney verification
   is the act that promotes the value into the directory entry**, where silent trust then applies.
   Enter-once write-back pointed at ingestion; one direction of flow; no copies.
3. **Only attorney verification sets a fact's verified state.** Confidence scores order the review
   queue (low-confidence first) and drive display flags on drafts; **no threshold ever
   auto-verifies** — registry discipline transposed to facts: automation flags, only Michael
   verifies. OPEN (rides IN-4, deliberately not ruled here): whether an unverifiable fact blocks
   the *finalized* instrument state.

## §8 Adopted mechanics (from FE-1, now RULED for the global directory)

All five apply to every contact class, not just providers:

1. **Pointer model** (was FE-1b): case records point at the directory entry and read identity
   fields live; **no case-local copies of directory identity fields.** History is the served
   .docx — class-independent (covers an attorney who changes firms as it covered a provider who
   moves).
2. **Enter-once write-back**: the fallback card for a contact not yet in the directory writes back
   into it; the directory-first picker is the primary path (§3.3).
3. **Firm-wide edit propagation from case context**: the directory entry is editable in case
   context, and that edit surface states firm-wide scope with a linked-case count — labeling, not
   a confirm click. (Michael's load-bearing requirement; only works under mechanic 1.)
4. **Identity in the directory, dollars on the case** (was FE-1a, generalized): identity facts on
   the directory entry; case facts on the case (§7.1 runs on this form).
5. **Silent trust, explicit** (was FE-1c — not on the 08-08 carried list; adopted explicitly here
   so §7's reasoning stands on ruled ground): directory fills are silently trusted, **with the
   standing provenance exception** — fills not attorney-entered or attorney-approved
   (model-extracted, scraped) carry flags until verified, which is exactly §7.2's promotion gate.

## §9 PROPOSED and OPEN (nothing here is ruled)

- **Merge-two-contacts tooling** — named future need (§3.3); no scope, no design.
- **Block-finalized on unverified facts** — rides IN-4's lifecycle (§7.3).
- **`party_type` → role-tag migration mechanics** — build-side; waits for an authorization packet.
- **Next build slice naming** — DEFERRED by ruling 2026-08-11: the naming happens in a later
  session citing this spec at HEAD. The queue question stays open; the form engine is nameable.
- **Consequences that unlock on this spec landing** (statuses, not rulings): FE-4–FE-7 unblock for
  spec completion; FE-2's parked build-home race can be raced honestly; the form engine's identity
  source is resolved.

## §10 What this spec does not do

No build authorization of any kind. No registry entry changes (§6.2 cites existing VERIFIED
entries only). No edits to CL-2's walked ground, D-CL2-8, or the D-CL1 items. The app's `/rules`
seed remains untouched and unverified.

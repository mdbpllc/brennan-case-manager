# The form builder beyond disclosures — DESIGN INPUTS (memo and inventory)

**Status:** EVIDENCE (`CAP-2`). **NOT A DESIGN.** This file maps the record and hands the questions back; **a build session must never read it as a specification** (the `IN-1` / `IN-3` precedent). Nothing here is ruled, proposed for build, or authorized. Canonical repo path: `docs/record/form-builder-design-inputs-2026-09-18/design-inputs-memo-and-inventory-2026-09-18.md`. Written 2026-09-18 (Central, DT-1) by an Opus 5 Cowork design session (CHAT-DISPATCH v6, Task 6), device bridge on the checkout at `4940ed3`. The sheet he reads to decide is `docs/specs/form-builder-rendered-examples-2026-09-18.md`. The tools research is in `tools-fetch-record-2026-09-18.md` beside this file.

**Where this came from — Michael, 2026-09-18, verbatim:** *"Another thing that I want to talk about is the form builder. Up until now, we have spent a considerable amount of time dealing with solely the disclosures form builder. I am going to want the software to be able to generate other forms as well and am going to want to be able to create forms. Is that something that we are thinking about as well? If not, let's put this on the list of items to address as well."*

**"Forms" here means documents.** The client intake web form is a separate banked item (master spec `case-management-project-instructions.md` §14: *"a fillable link that works on phone or computer … Lower priority for now"*) and is not treated here.

**H5.** The inventory was built FROM THE RECORD ONLY. No form library, no folder of his, and nothing under `Knowledge Repo` was listed or opened. `src/` was not read.

## §1 — The answer to "is that something we are thinking about?"
**Limb (a), other forms: YES, on the record since the engine's first day, and none authorized.** `form-engine.md`'s face: *"The same engine later drives all firm forms (designation of lead counsel, motions to withdraw, discovery requests/responses, etc.)"*. §11 item 2 lists *"Remaining template conversions beyond disclosures"* (register row `FE-§11.2`, *"Later slices; explicitly OUT of FE-D1"*). §13 carries `FE-4`–`FE-7`, ruled 2026-08-11 and unauthorized, and §13.4 queues seven distillation candidates.

**Limb (b), creating forms himself: NOT designed, and the record currently leans the other way.** §1: *"Claude builds the engine, new complex templates, and new merge-field wiring; Michael owns routine wording changes."* The built editor is minimal by ruling (`fe-d1-build-slice.md` item 10: edit → new `template_version`, *"plain text with tokens, no styling UI"*; BUILD-STATE: the verb is *“Save as a new version”*, and an unknown token *"WARNS on save and never blocks"*). `FE-7` makes distillation a design-session act. `FC-12` was ruled *"(c) Structure only"*, and *"No import tooling is authorized to build by this ruling."*

## §2 — What stands between ANY second form and a real matter (the record's own facts)
1. **`FE-SEED-1`** — *"NOTHING SEEDS THE TEMPLATE BANK IN LIVE MODE"*; in live mode the `form_*` tables *"ARRIVE EMPTY"*. OPEN, his. BUILD-STATE's "46 seeded templates" is the demo/fixture count.
2. **`generated_documents.doc_type`** admits exactly `'reasonable-value-report'` and `'trcp-194-2b-195-5-disclosures'` (`db/schema.sql`, the FE-D1 amendment's constraint). No other form can be stored as generated today.
3. **The token registry is a stub:** `docs/spec-feedback.md`, THIRD TRANCHE (2026-09-07) item 9 — *"the seeded registry holds 14 definitions while the disclosures skeleton alone uses 60 tokens"*; widening it is unruled.
4. **No home for the firm's own facts:** signature block, bar number, e-service email have no column in `db/schema.sql` that this read found; the firm-obligations spec §1 item 7 records no settings table.
5. **Region syntax is unruled:** spec-feedback 2026-08-20, *"REGION syntax is genuinely unruled. FC-1 governs SCALAR tokens only."* Conditions and repeats have no ruled notation.
6. **Output:** §1's flow (Word → review → "Create PDF" → OneDrive case folder with metadata) is unbuilt; PDF is at `Q-API-3` (🟡) and the document-storage model is the gate named at `WF-3`.
7. **Word splits tokens across runs:** the corpus-mining capture — *"roughly half of MDB PLLC's `{{}}` tokens (104 of 204) are fragmented across Word runs. A naive replace over `document.xml` misses them silently."* `form-engine.md` §12.1: *"Run-merge is a hard precondition, not an optimization."*
8. **Nothing in his libraries is safely blank:** the same capture — *"Nothing in any library is safely blank."* (its fill-in convention is to type over the last person's data), and its PROPOSED requirement: *"the software should make starting from a clean template cheaper than copying the last one."*

**The Fable conversation's PROPOSED point, carried as proposed:** a PURE-MERGE form needs no model call and so no `H12-v` / BAA — it could reach real matters long before the disclosures paragraphs do. §2 items 1–4 and 6 are what it would still need.

## §3 — INVENTORY: every form the record names as wanted
*PM* = pure merge (record data into a fixed template; no composed prose). *W* = needs a writer (a paragraph composed per matter). "Inferred" marks a classification the record does not state. *Gaps* = fields the form needs for which this read found no token and no column (itself partly inferred, because which 14 tokens are seeded lives in `src/`, not read).

| # | Form | Where the record names it | PM / W | Gaps (beyond §2's common four) | Status |
|---|---|---|---|---|---|
| 1 | TRCP 194.2(b)/195.5 disclosures | `form-engine.md` face–§10; BUILD-STATE | **W** — the writer returns named parts; §9 variants are voice examples | production log; settlement/witness item types | BUILT on fixtures; model path gated on `H12-v`; live blocked by `FE-SEED-1` |
| 2 | Designation of lead counsel | face; §11.2; `FE-§11.2`; FC-15 | inferred **PM** | bar number, e-service email | queued ⬜, unauthorized |
| 3 | Motion to withdraw | face; §11.2; `FE-§11.2` | inferred **W** (grounds per matter) | unspecified | queued ⬜ |
| 4 | Outbound discovery requests | face; `FE-§11.2`; `FE-4`–`FE-6` (§13.1–13.3); `docs/templates/discovery/template_definitions-instructions_requests.md` | mostly **PM** assembly from an item bank; **W** at the case-specific slot | item table (none; the schema block says *"Do not add an items table"*); definitions object; role tags; vehicle identifiers; discovery level/cap | designs ruled 2026-08-11; build unauthorized |
| 5 | Discovery responses (ours) | face; `FE-§11.2`; roster capture §3 | inferred **W** | no response model on the responding side | queued ⬜, no spec |
| 6 | "Criminal forms" | §11.2; `FE-§11.2` (generic phrase only) | not stated | multi-cause caption; ex parte caption | named only |
| 7–9 | Entity trucking set; driver set; nonsubscriber battery | §13.4 queue | as #4 (block insertion for #9) | as #4 | queued, not distilled |
| 10 | UIM/UDJA petition | §13.4; `REQ-CAPTURE_uim-udja-petition-transform_2026-08-12.md`; `FE-13`–`FE-15` | mixed — declarations are data, relief a picklist (`FE-14`); facts **W** (inferred) | carrier, policy limits, relief bracket, registered-agent block | queued |
| 11–12 | Deficiency letter; motion to compel | `de-1-deficiency-letter-template-spec-2026-08.md` §6; §13.4 | **W** — *"the specific sentence is Michael's"* | no response-set / response-item / escalation-timeline model (the DE-1 spec quotes BUILD-STATE: *"Nothing exists for the DE series"*) | SPEC DRAFT, *"NOT AUTHORIZED TO BUILD"* |
| 13–14 | Deficiency grid; motion chart / proposed order | §13.4; deficiency capture §3 | inferred **PM** renders | item store; internal/outbound flag (`FE-17`) | queued / unauthorized |
| 15 | Certificate of conference (incl. a two-branch county form) | DE-1 spec §5; register | inferred **PM**, branch chosen by fact | conferral-attempt record | ⬜ open |
| 16 | Certificate of service | §3; `FE-15`; `IN-4` | **PM** — the date is *"bound to the SERVICE EVENT"* | service event per recipient | built for disclosures only |
| 17 | Agreed motion to set trial and enter DCO; notice of hearing (Bexar monitoring court) | project knowledge `claude_Forms_Motion_to_Set_and_NOH_Bexar_Monitoring_Court.md` (placeholders listed there) | inferred **PM** — every blank is a listed placeholder | trial date, trial days, hearing date, record-required choice | a carried reference doc; no conversion queued |
| 18 | Bexar A.I. certificate (local rule) | register (Task 7 memo row) | inferred **PM** | court-keyed attachment | ⬜ |
| 19 | Criminal docket worksheet | `CR-1`–`CR-11`, CR-CONSTRAINT; `REQ-CAPTURE_uvalde-docket-worksheet_2026-08-12.md` §3 | inferred **PM** data render | prosecutor per cause, DA file no., offers, appearance outcome, custody source/date; black-and-white | ⬜ design only |
| 20 | Plea-paperwork signing checklist | `CR-10` | inferred **PM** computed checklist | depends on UNVERIFIED plea-and-costs registry entries | ⬜ |
| 21 | Referral letter | `RE-1`; `Q-RE-5` | not stated | no referral fields | ⬜ |
| 22 | Production cover letters | §7; `FE-§11.1` | not stated | production log / Bates module | BANKED |
| 23 | Master-spec wanted items that are documents | master spec §8, §9, §14; FC-10/FC-11 (settlement breakdown; approval and acknowledgment); safe-harbor authorization; notice-letter bundle; invoice and fee affidavit | not stated | not reconciled against the register here | banked / various |

**Not a document:** the client intake web form (master spec §14). **The firm-obligations module generates no documents** (its `FOT-` "templates" are obligation records).

## §4 — Record contradictions found on the way (carried for the next design pass; none resolved)
- `form-engine.md` §3's *"Import gate"* still reads FC-12 as DEFERRED; FC-12 was ruled *"(c) Structure only"* at `#108`.
- `Q-RE-5`, `IN-3`, `WF-3` and `Q-FE4-5` say `doc_type` *"admits one value"*; the schema now admits two.
- The repo's discovery template writes `{{snake_case}}` and `{{optional_x: …}}`; FC-1 makes `{token}` canonical, and region syntax is unruled.
- The schema comment on `form_template_versions.settings` credits per-spot formatting to "FE-2"; §3 credits FC-2 (FE-2 is a billing-intake row).
- "Criminal forms" appears only as a phrase; no repo record names a specific criminal form beyond the worksheet and the plea checklist.

## §5 — The tools research, in one paragraph (detail and every URL in the fetch record)
Six products/libraries were read on their own pages: docxtemplater, Docassemble (with the Assembly Line Weaver), HotDocs, Gavel, Knackly, Woodpecker. **Marking blanks** splits two ways: typed brace tags (docxtemplater `{name}`, Docassemble `{{ }}`, Gavel `{{ }}`) versus a Word add-in or content controls (HotDocs, Knackly's Word Designer, Woodpecker, and Gavel's Document Tagger); Gavel's Blueprint and Woodpecker's auto-template use AI to propose the fields. **Token repair across runs:** docxtemplater's own pages acknowledge that Word splits text across `w:t` elements; **none of the six documents a repair step on its own pages**; Gavel's "Check for Errors" is the nearest. **Conditions and repeats:** every product has both, in its own notation. **"Ask me" questions:** HotDocs, Docassemble, Gavel, Knackly and Woodpecker generate an interview from the template; **write-back** to a record is documented by Docassemble (DAStore / `store_variables_snapshot()`), HotDocs (answer sets and overlay), Gavel (answers between workflows), Woodpecker (client data grouped by email), and only claimed in marketing by Knackly. **No recommendation to adopt any of them is made or implied**; the research exists to show the shapes of the choice.

## §6 — The design questions
Put on the rendered-examples sheet as sub-questions of the Fable conversation's `[FORMS-CREATE]` row (labels `FBQ-1`–`FBQ-6`, full text in the packet manifest §7 and, once placed, in the register). Three of the dispatch's topics are NOT minted, because rows already carry them: `FE-SEED-1` (the prerequisite to any live form, including one he creates), output to PDF and OneDrive (`Q-API-3`; `WF-3`'s document-storage gate), and which form comes next (`FE-§11.2`).

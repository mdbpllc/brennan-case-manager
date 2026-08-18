# CHAT-DISPATCH v4 — the Opus follow-on chain from the 2026-08-18 Fable adjudication

**Canonical repo path:** `docs/prompts/CHAT-DISPATCH-v4.md` (OPEN-4: docs/prompts/ is the
dispatch home). **Authored 2026-08-18** by the Fable adjudication session (#100); every task
below executes a ruling recorded in `docs/specs/fable-adjudication-record-2026-08-18.md` —
**this dispatch authorizes nothing on its own; the record is the authority.**
**Model routing (§7.2):** every task below is execution/research/drafting — **Opus's lane.**
Run as design sessions in the build project (Cowork), bridge grants per task, H5 throughout.
Each task that produces repo-bound material ships a push-to-code packet to `inbox/`; captures
go to project knowledge `claude/`.

**Standing rules for every task:** RECONCILE FIRST against BUILD-STATE + the top of the session
log before writing. Sources named per item (TOOLING / SOURCING). The majority-opinion rule AS
AMENDED BY V-9 (CLAUDE.md rule 5) runs on every opinion retrieval — the fallback chain is the
court's own document, a paginated vendor copy stating authorship on its face, or Michael's
recorded identification; absent all three, cannot-identify-STOP, and the entry is never staged
for verification. Retrieval is not verification. ONLY Michael verifies. Nothing is built.

---

## T-27 — RL-6: FULL READ of the nine unnamed criminal opinions *(ruled 2026-08-18)*

Gate: Michael grants `Documents\Knowledge Repo\Opinions\` (per-session, per-path; H5 — read only
the named folder). Read all nine: *Bonilla v. State*, 452 S.W.3d 811; *Middleton v. State*, 634
S.W.3d 46; *Williams v. State*, 253 S.W.3d 673; *State v. Schmitt*, 2012 Tex. Crim. App. Unpub.
LEXIS 887; *Ex parte Bailey*, 2011 Tex. Crim. App. Unpub. LEXIS 388; *Ex parte Carter*, 521
S.W.3d 344; *Ex parte Green*, 457 S.W.3d 90; *Ex parte Simmons*, 2014 Unpub. LEXIS 501;
*Ex parte Simmons*, 2015 Unpub. LEXIS 776. Extraction VM-local (`/tmp`), nothing written to any
connected folder. Stage per opinion: identity (court, date, disposition, panel/author per the
amended rule), what it holds, what it could support — **as CANDIDATES.** Specifically test the
entry-31 bridge: does any apply *LaPorte*'s "single criminal action" definition to art. 102.073?
**The cite supply for entries 30 and 31 is Michael's on the staged findings — never select for
him.** Deliverable: one staging memo, canonical path
`docs/specs/criminal-opinions-read-2026-08.md`, PROPOSED, packet to inbox/.

## T-28 — WS-3: read the Protégé leads and draft the privilege entry *(ruled 2026-08-18)*

The leads (from Michael's own Lexis Protégé run, recorded in the rulings record §1 Tier 4 —
LOCATOR only, never cite the AI answer as authority): ***In re ExxonMobil Corp.*, 97 S.W.3d 353
(Tex. App.—Houston [14th Dist.] 2003)** — the load-bearing exhibit; *In re Fontenot*, 13 S.W.3d
111 (Fort Worth 2000); *In re Scherer*, 684 S.W.3d 875 (Eastland 2024); *In re Young*, 410
S.W.3d 542 (Beaumont 2013); *In re City of Dickinson*, 568 S.W.3d 642 (Tex. 2019); *In re CSX
Corp.*, 124 S.W.3d 149 (Tex. 2003); *Univ. of Tex. Sys. v. Franklin Ctr.*, 675 S.W.3d 273 (Tex.
2023); *In re Kona Coast Venture, Ltd.*, 730 S.W.3d 683 (Austin 2026); *In re Jimenez*, 4 S.W.3d
894 (Houston [1st Dist.] 1999); *In re Baytown Nissan*, 451 S.W.3d 140 (Houston [1st Dist.]
2014); *Pope v. State*, 207 S.W.3d 352 (Tex. Crim. App. 2006); TRE 503. Read the primary
opinions — FLP where held (amended rule 5 on each), Michael's pulls where not (ask; his hand).
Stage P-WS-6 findings against the actual texts and **DRAFT the ruled entry** — 192.3(a)'s
non-privileged limit governs (h); witness statements remain subject to attorney-client
privilege — proposition text put to Michael, entering **UNVERIFIED**, sources named per item.
Fold findings into the witness-statement memo's §3 territory via its canonical doc or a
successor staging memo; packet to inbox/.

## T-29 — draft the six ruled new entries *(RL-4 ×2, WS-1, WS-2 ×3; ruled 2026-08-18)*

From the clean-authority TRCP PDF (`Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure
July 2026.pdf`, bridge grant, filename-designation currency caveat as accepted at WP-1/2/3;
quotations spot-checked against raw extraction; the statute-pass normalizer does NOT apply to
this publisher): draft proposition text for — **TRCP 193.4(a)** and **TRCP 199.6** (rule-side
evidence-burden authority, RL-4); **TRCP 192.3(h) third proposition** (the own-statement right,
WS-1 — 215.1(e) cited within the entry as its teeth, per the conservative default recorded);
**TRCP 194.1(a)**, **194.2(9)**, **194.5** (the disclosure machinery, WS-2, three separate
entries). All enter the discovery-enforcement registry file **UNVERIFIED**, subject-ordered,
with dedupe notes per the file's convention. Backlog goes 40 → 46; state the derived count.
Packet to inbox/.

## T-30 — WS-4 / Q-COM-10: the unified privilege_tier vocabulary *(direction ruled 2026-08-18)*

Ruled: the fourth state ("witness statement — owed as an initial disclosure") enters BOTH
vocabularies, direction toward ONE shared vocabulary. Draft: (a) the proposed unified value
list — including whether `transcripts`' `'privileged'` conforms to `'attorney-client'`, and the
fourth value's exact token — **put to Michael for adoption; Q-COM-10 closes only at that
adoption**; (b) the authored-UNRUN migration on the privilege-tier precedent
(`db/migrations/2026-08-16-privilege-tier-no-default.sql`'s shape: verification checks in
words), plus the matching `src/domain/billing.ts` / `src/domain/transcripts.ts` union edits,
staged as a proposal — **nothing executes until he adopts the list; the migration is his to
run.** No existing row re-characterized. Packet to inbox/ carrying the proposal only.

## T-31 — designation-source method research *(commissioned 2026-08-18, Michael's words: "possibly we should seek another way of determining the official texas designations")*

Research note: a reliable, repeatable source for Texas memorandum-vs-published designations,
given FLP's `precedential_status` never answers it (ruled hazard 0.1.6), TAMES blocks automated
retrieval (absolute — no workaround fetching), and the court's own PDF answers only
case-by-case. Candidates to evaluate and name per item: the courts' own opinion-release pages,
Justia/vendor renderings (with their evidence value stated honestly), the clerk, and Michael's
vendor subscriptions. Deliverable: a short memo, PROPOSED, no method adopted — adoption is his.
Packet to inbox/.

## NOT IN THIS DISPATCH

**T-26** (Group A verification looks: entries 2, 12, 13, 29, 32 — entry 13 first) is
INTERACTIVE and needs Michael live; it is deliberately not in this chain and should not be
attempted by an unattended session. The CD-1 migration, gates 1/9/3, the `privilege_tier`
migration run, and the cite supplies for 30/31 are Michael's hand and no session's.

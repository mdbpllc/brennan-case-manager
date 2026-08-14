# Registry Citator / Currency Pass — every case authority in the UNVERIFIED backlog

**Canonical repo path (proposed):** `docs/specs/registry-citator-pass-2026-08-13.md` — NEW file, rides the next packet on Michael's word.

**Status: PROPOSED design input — research support only. FLAGS ONLY. NOTHING is verified, and nothing
here is a currency opinion.** A model asserting legal currency is never verification. **Only Michael
verifies.** No registry file was altered.

**Authored:** 2026-08-13 Central (design session, Opus 5, Cowork, CHAT-DISPATCH Task 2).
**DT-1 applied:** clock-checked 21:47 CDT; container read 2026-08-14 UTC. Stamped **2026-08-13 Central**.

**Input:** §4 of `docs/specs/registry-verification-workbook-2026-08-13.md` (the atomic pair's first
half). This document consumes that case table and adds nothing to the workbook's entry rows.

**Tooling:** Free Law Project / CourtListener only, per the 2026-08-13 TOOLING ruling. Descrybe is out.
Every item names its source. **FLP is not a citator.** It has no treatment editor, no red flags, no
"overruled by" signal. What follows is a *citing-cases picture* built from FLP's citation graph, which
is a different and weaker thing — see §1 before reading any row as reassurance.

---

## §1 — What this pass can and cannot tell you (read before the tables)

**It can tell you:** whether a case is still being cited, by which courts, how recently, and whether
the citing traffic has gone quiet. It can tell you when FLP's own records are internally inconsistent.

**It cannot tell you:** whether a case has been overruled, superseded by rule amendment, limited on
other grounds, or distinguished into irrelevance. FLP does not encode treatment. **No row below says
"good law."** A row saying "no look needed" means *no look needed to resolve a cite or a majority* —
never *no Shepard's/KeyCite look needed before filing*.

**The registry's own rule already covers the gap:** any quote from an opinion is verified against the
reporter before it goes in a filing, and Claude characterizes an opinion only after reading the
relevant passages in full. Nothing here substitutes for that.

### The methodological finding that matters most

**FLP reports three different citing counts for the same case, and they disagree.** For *In re Alford
Chevrolet-Geo*, this session observed:

| Source | Count |
|---|---|
| Search index `citeCount` | **187** |
| Clusters API `citation_count` | **207** |
| `cites:(2419858)` result count | **168** |

Same case, same session, three numbers. *Ford Motor v. Castillo* shows the same class of gap from the
other direction: the **cluster** reports 219 citations, while `cites:` on the **lead opinion id**
(9513075) returns **38** — because citations link to sub-opinions, and a case whose text FLP also
stores as a `010combined` record splits its inbound citations across records.

**Consequence, stated plainly: a citing count from FLP must never be displayed to a user as a precise
figure, and never used as a currency signal.** This is a design input for
`registry-courtlistener-integration-design.md` and rides §5 Q5 of the workbook. Q-6 still bars wiring
the API into the app, so nothing is built either way.

---

## §2 — Reported authorities: majority resolution + citing picture

Majority-opinion rule honored: every case's `sub_opinions` was enumerated and the majority identified
positively by opinion-type marker. **Where separate opinions exist they are named, because the rule
requires saying so explicitly.**

### 2.1 Ford Motor Co. v. Castillo, 279 S.W.3d 656 (Tex. 2009)

- **Majority: opinion 9513075, type `020lead`, Johnson, J.** Cluster 895102, Tex. Sup. Ct., No.
  06-0875, filed 2009-04-03, Published.
- **A CONCURRENCE EXISTS — opinion 9513076, Wainwright, J.** Stated explicitly per the rule. The
  cluster also holds a `010combined` record (id 895102) that collides with the cluster id — **the
  exact hazard CLAUDE.md §5 describes.** A retrieval on the cluster id lands on the combined text, not
  the lead.
- **Citing picture:** cluster-level 219; `cites:(9513075)` returns 38. Most recent citing opinions:
  *Jose Cuervo Gomez v. City of McAllen* (Tex. App.—Corpus Christi/Edinburg, **2026-08-06**);
  *Quesada v. Bonilla* (Tex. App.—**San Antonio**, 2026-05-27); *Estate of Skaggs v. Peternett*
  (Fort Worth, 2026-03-26); *Pfeiffer v. Berg* (Houston [1st], 2026-01-29).
- **Treatment flags:** none observable in FLP. Citing traffic is **current through this month** and
  includes the Fourth Court of Appeals — Michael's own appellate district.
- **Why look / no look needed:** **LOOK — but for attribution, not currency.** The registry entry
  pairs *Castillo* with *Able Supply* for one proposition. With a concurrence in the mix, a verifier
  cannot confirm from the registry alone that the abuse-of-discretion proposition is the *majority's*.
  One read of 9513075 settles it.

### 2.2 Able Supply Co. v. Moye, 898 S.W.2d 766 (Tex. 1995)

- **Majority: opinion 2432526, type `010combined`, Owen, J.** Cluster 2432526 (id matches — single
  opinion, so no collision risk). Tex. Sup. Ct., No. 95-0048, filed 1995-06-08, Published.
- **No separate opinions.**
- **Citing picture:** citeCount 115. Not separately queried this session (rate budget).
- **Treatment flags:** none observable.
- **Why look / no look needed:** **NO LOOK NEEDED** to resolve cite or majority. Clean single-opinion
  reported Supreme Court authority. Carries the same §2.1 attribution question only as the junior
  half of a joint entry.

### 2.3 In re Alford Chevrolet-Geo, 997 S.W.2d 173 (Tex. 1999)

- **Majority: opinion 2419858, type `010combined`.** Cluster 2419858, Tex. Sup. Ct., No. 97-1171,
  filed 1999-08-26, Published. Single sub-opinion in the operative record.
- **DUPLICATE-RECORD FLAG — NEW THIS SESSION.** FLP holds a **second cluster, 5269700 ("In re
  Chevroletgeo"), carrying the same reporter cite 997 S.W.2d 173**, filed **1999-06-10**, same docket
  97-1171, with **two** sub-opinions (5097124, 5097125) and a citation_count of **3**. A citation
  lookup that lands on 5269700 reports a case with 3 citing references instead of 207 — and would read
  as a dead authority. The June 10 record is most likely the original opinion superseded on rehearing
  by the August 26 opinion, **but that characterization is inference and is not asserted** — no
  opinion text was read.
- **Citing picture:** 168 / 187 / 207 depending on source (see §1). Most recent citing opinions:
  *In re Dwight Capital, LLC* (Tex. App.—**San Antonio**, 2025-07-02); *Welch v. Atlas Turner*
  (**S.C. Sup. Ct.**, 2025-05-21 — out-of-state adoption); *In re City of Denton* (Tex. App.—**15th**,
  2025-03-19); *In re Arce* (Amarillo, 2025-01-31).
- **Treatment flags:** none observable. Citing traffic current through mid-2025, including the Fourth
  Court.
- **Why look / no look needed:** **LOOK — one, and it is a records look, not a law look.** Confirm the
  August 26, 1999 opinion is the operative one and that your citing convention points there. Cheap,
  and it de-risks every future automated retrieval of this authority.

### 2.4 Peeples v. Fourth Supreme Judicial Dist., 701 S.W.2d 635 (Tex. 1985)

- **Majority: opinion 2436879, type `010combined`, Wallace, J.** Cluster 2436879, Tex. Sup. Ct.,
  No. C-4010, filed 1985-10-16, Published. **No separate opinions.**
- **Citing picture:** citeCount 195; `cites:(2436879)` returns 154. Most recent citing opinions in
  that result set: *Marteny v. Coon* (Beaumont, 2020-09-24); *In re UPS Ground Freight* (**Tyler**,
  2020-09-23 and 2020-09-16); *In re Russo*, 550 S.W.3d 782 (2018-04-27); *In re Denbury Resources*
  (Houston [14th], 2015-11-25).
- **Treatment flags:** none observable — **but note the shape of the traffic.** Unlike the other
  reported authorities here, *Peeples*' citing picture in FLP tops out around **2020** rather than
  2025–2026. That is a **flag, not a finding**: it is at least as likely to reflect FLP's citation-graph
  coverage as any decline in the case's authority, and a 1985 foundational privilege case being cited
  less often in the 2020s is unremarkable. **Recorded because a quiet period is exactly the pattern a
  currency check exists to notice, and suppressing it would defeat the purpose of the pass.**
- **Why look / no look needed:** **NO LOOK NEEDED** to resolve cite or majority. If you want one look
  anyway, make it a KeyCite/Shepard's currency check on the privilege-burden holding — the one place
  this pass is structurally blind.

### 2.5 Dillard Dep't Stores v. Hall, 909 S.W.2d 491 (Tex. 1995)

- **Majority: opinion 2452263, type `010combined`, `per_curiam: true` — no authoring justice.**
  Cluster 2452263, Tex. Sup. Ct., No. 95-0548, filed 1995-10-27, Published. **No separate opinions.**
- **PER CURIAM is not recorded in the registry entry.** Flagged because H77 rules that the registry
  gets a `precedential_status` field separate from verification status, with plurality/dicta/memorandum
  carried as data. **A per curiam disposition is that kind of data**, and this is a live exhibit for
  the field alongside *Gregory v. Chohan* and the Allstate dicta at Entry 2(j). Nothing is built —
  H77 is design status only.
- **Citing picture:** citeCount 205; `cites:(2452263)` returns 171. Most recent: *In re Childers*
  (Amarillo, 2026-01-06); *AKT Investments v. T Jordan Towing* (Fort Worth, 2025-05-29); *In re
  Nonparty Patient Nos. 1–11* (Tex. App.—**15th**, 2025-03-21, two opinions); ***In re Contract
  Freighters, Inc.*** (**Texas Supreme Court**, 2022-06-17).
- **Treatment flags:** none observable. **Cited by the Texas Supreme Court itself in 2022** — the
  strongest currency signal available in this data set.
- **Why look / no look needed:** **NO LOOK NEEDED** for cite or majority. This is opposing
  counter-authority in the registry by design, and it is demonstrably live — which is the point of
  having recorded it. Consider adding "(per curiam)" to the entry's cite at verification.

### 2.6 In re Park Cities Bank, 409 S.W.3d 859 (Tex. App.—Tyler 2013, orig. proceeding)

- **Majority: opinion 5114040, type `020lead`, Worthen, C.J.** Cluster 5285666, Tex. App. 12th
  (Tyler), No. 12-12-00325-CV, filed 2013-08-15, Published. **No separate opinions.**
- **Citing picture:** citeCount 12; `cites:(5114040)` returns 12 — **the one authority in this set
  where the counts agree.** Citing opinions include: *In re City of Denton* (15th COA, 2025-03-19);
  *In re Starr Indemnity & Liability Co.* (**Tyler**, 2024-08-15); *In re Gaudet* (El Paso,
  2024-04-30); ***In re Redman*** (**Tyler, 2023-10-11, FLP opinion 9890720**); ***In re Volt Power***
  (**Tyler, 2023-04-05, FLP opinion 9385744**).
- **INDEPENDENT CONFIRMATION OF #65 — NEW THIS SESSION.** The cite-check memo established by reading
  the opinions that *Volt Power* quotes *Park Cities Bank* at 876 and *Redman* cites it at 868. **The
  citation graph confirms both from the opposite direction**, without re-reading either opinion. It
  also supplies what #65 did not record: **FLP opinion IDs for both memorandum opinions** — 9385744
  (Volt Power, April 5, 2023) and 9890720 (Redman, October 11, 2023). Those IDs pin the *substantive*
  opinions, which is precisely the thing #65 asked you to confirm.
- **Treatment flags:** none observable; cited by four Texas courts of appeals across 2023–2025,
  including its own court twice.
- **Why look / no look needed:** **NO LOOK NEEDED** — and this is the most useful row in the pass.
  *Park Cities Bank* is a **reported** Tyler case stating both propositions that two of your six
  flagged memorandum opinions were carried for. Wherever a permanent-WL memorandum cite is
  unsatisfying, this is the reporter-cited companion, still live in 2025. **UNVERIFIED, and offered as
  a candidate only.**

### 2.7 Mizell v. State, 119 S.W.3d 804 (Tex. Crim. App. 2003) — criminal file, entry 3 candidate

- **Majority: opinion 9730203, type `020lead`, Cochran, J.** Cluster 2170962, Tex. Crim. App., No.
  2444-01, filed 2003-11-05, Published.
- **A DISSENT EXISTS — opinion 9730204, Johnson, J.** Stated explicitly per the rule. The cluster also
  holds a `010combined` record (2170962) colliding with the cluster id — same hazard as *Castillo*.
- **#65's read is CONFIRMED, by a different method.** The memo reported reading the majority
  ("Cochran, J., seven judges joining") and quoted 806. This session confirms the majority
  **positively by opinion type** rather than by authoring language — the two methods agree.
- **Citing picture:** citeCount 422 — by a wide margin the most-cited authority in the backlog.
- **Treatment flags:** none observable.
- **Why look / no look needed:** **NO LOOK NEEDED** to resolve cite or majority. The remaining act on
  entry 3 is your verification of the §§ 12.34/12.35 + *Mizell* cite set, per V-2 item 5 — an act, not
  a retrieval.

---

## §3 — The WL/slip authorities: currency posture, not re-retrieval

Per the dispatch, the six resolved looks from `registry-cite-check-2026-08-13.md` are **referenced,
not redone**. This section adds only citator posture.

| Case | #65 status | Citator posture added here | Look? |
|---|---|---|---|
| **In re Volt Power, LLC**, 2023 WL 2804430 | Memorandum; WL cite permanent | **FLP opinion 9385744** = the April 5, 2023 substantive opinion, confirmed via the *Park Cities Bank* citation graph. Not separately citator-checked. | Per V-2(4) only — confirm the WL number maps to 9385744, then close. |
| **In re Redman**, 2023 WL 6760074 | Memorandum; WL cite permanent | **FLP opinion 9890720** = the October 11, 2023 substantive opinion, same confirmation path. | Per V-2(4) only. |
| **De Anda v. Jason C. Webster, P.C.**, 2018 WL 3580579 | Memorandum; located on Justia | **NOT IN FLP — no citation graph exists.** A citator pass on this authority is not possible with the ruled tooling. Flagged, not worked around. | Per V-2(4) — confirm "pet. denied," then close. |
| **In re Sting Soccer Group, LP**, 2017 WL 5897454 | Located; designation **unconfirmed** | Not in FLP's citation graph under any resolved id this session. | Per V-2(3) — designation first; a reporter cite question rides on the answer. |
| **In re Ochoa**, 2004 WL 1192444 | **"(PUBLISH)" — reporter cite plausibly exists** | Not citator-checked; the cite question dominates. | **Per V-2(1) — the highest-value look of the backlog.** Resolve the cite before spending anything on currency. |
| **Collins v. Kappa Sigma Fraternity**, 2017 WL 218286 | **NOT LOCATED** — not in FLP, not on the public web | No graph, no posture. **Beware the 2010 sibling appeal**, No. 02-09-00305-CV, same litigation. | Per V-2(2) — retrieval is the whole task. |

**Net of §3:** four of the six are memorandum opinions whose WL cites are permanent, and for two of
those (*Volt Power*, *Redman*) this pass supplies FLP opinion IDs that make V-2 item 4 a one-click
confirmation instead of a search. One (*Ochoa*) still turns on a Westlaw look nothing here can do.
One (*Collins*) remains unlocated.

---

## §4 — Allstate Ins. Co. v. Irwin, 627 S.W.3d 263 (Tex. 2021) — its own section, because it fails differently

Every other authority in the backlog either resolves or is a known-unlocated slip cite. *Irwin* is
neither, and the failure mode is new to the record.

- **A citation search for `627 S.W.3d 263` returns ZERO hits in FLP.**
- The case is nonetheless present: ***Allstate Insurance Company v. Daniel Wes Irwin***, Texas Supreme
  Court, No. **19-0885**, filed **2021-05-21**, Published.
- It is present **twice** — clusters **4885466** and **4885465** — each holding exactly one opinion
  (**4689245** and **4689244** respectively), each typed `010combined`, **each with no author string**,
  and **each with an empty citations array**.
- **The majority cannot be identified from FLP's structured data.** There is no `020lead`, no
  `030concurrence`, no `040dissent`, no author, and no per-curiam marker on either record. The
  majority-opinion rule's usual method — identify positively by opinion-type marker and authoring
  language — has nothing structured to work from here. Opinion 4689245 runs 26,366 characters; a probe
  for "delivered the opinion of the Court" returned **zero matches**, so even the authoring-language
  fallback does not fire on the stored text.
- **Citing picture: citeCount 0 on both clusters** — not because the case is uncited, but because
  **with no reporter cite attached, inbound citations cannot link to either record.** The zero is an
  artifact of the same defect.

**Why this matters beyond one entry.** The registry file already anticipated that the majority-opinion
rule would apply to *Irwin* if it were ever pulled from CourtListener. What it could not anticipate is
that FLP's data offers **no basis at all** for the positive identification the rule requires. This is
a third distinct FLP hazard class, alongside the cluster/sub-opinion collision (CLAUDE.md §5) and the
duplicate-cluster problem found at §2.3 — and all three turned up in a sample of ten cases.

**Why look:** **LOOK, and it is now a bigger look than the registry anticipated.** Read both stored
opinions and determine which is the Court's, or resolve the case from the reporter directly and skip
FLP for this authority. Then confirm `627 S.W.3d 263` maps to the majority. **Corroboration is not
verification** — the existing entry's record that name, docket, and decision date were corroborated
against a public docket source stands as a flag, exactly as written.

---

## §5 — Summary: where the looks actually are

**Needs a look (5):**

1. **Ochoa** — Westlaw; the one plausible reporter-cite *upgrade* in the backlog. Highest value.
2. **Collins** — retrieval; still unlocated by any ruled tool.
3. **Irwin** — majority identification, now known to be unsupported by FLP's data.
4. **Alford Chevrolet-Geo** — which of two FLP records is operative (a records look, not a law look).
5. **Castillo** — which case supplies which half of a joint proposition, given the concurrence.

**No look needed for cite or majority (5):** Able Supply · Peeples · Dillard v. Hall · Park Cities
Bank · Mizell. *Each still needs a commercial-citator currency check before any filing — this pass
cannot supply one.*

**Confirmation-only, per V-2(4) (3):** Volt Power · Redman · De Anda. For the first two, this pass
reduced the confirmation to a specific FLP opinion id.

**Designation first (1):** Sting Soccer.

---

## §6 — What this pass does NOT do

It does not verify anything, alter any registry entry, supply or upgrade any cite, or assert that any
authority is good law. It is not a substitute for KeyCite or Shepard's, and it says so in §1 rather
than burying it. Every "confirmed" above means *confirmed in FLP's structured records* — never legally
verified. **Only Michael verifies.**

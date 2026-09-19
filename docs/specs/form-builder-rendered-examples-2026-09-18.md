# Creating a form — three shapes, shown (rendered examples)

**Status:** RULING SHEET (`CAP-2` RULING) — **you read it to decide; it is NOT A DESIGN and a build session must never read it as one** (the `IN-1` / `IN-3` precedent). Nothing here is ruled or authorized. Canonical repo path: `docs/specs/form-builder-rendered-examples-2026-09-18.md`. Written 2026-09-18 (Central, DT-1) by an Opus 5 Cowork design session (CHAT-DISPATCH v6, Task 6). The record map (every form already wanted, and what blocks each) is `docs/record/form-builder-design-inputs-2026-09-18/design-inputs-memo-and-inventory-2026-09-18.md`.

**EVERYTHING BELOW IS INVENTED.** Every person, firm, carrier, claim number, cause number, county and address is fictional. The scalar tokens use the ruled house form `{token}` (FC-1). **The `[[if …]]` / `[[each …]]` notation is for illustration only — region syntax is unruled** (spec-feedback, 2026-08-20). All three examples are **pure merge**: no model writes a sentence, so none depends on `H12-v` or a BAA.

---

## Shape A — you upload a finished document and mark the blanks

**1. What you hand over** — last month's letter, with the last client still in it:
> Fictional Mutual Insurance Co. · Attn: Casey Placeholder · Claim No. CLM-0000-TEST
>
> Re: Our client **Riley Former**; date of loss **March 3, 2026**
>
> This firm represents Riley Former for injuries from the collision of March 3, 2026. Please direct all contact to this office and send a copy of the policy declarations page. **Riley** is a minor and appears through **Dana Former**, next friend.
>
> Example Law PLLC · A. Attorney

**2. The marked-up template** — each highlighted span clicked and mapped to a field, or to *ask me*:
> `{carrier_name}` · Attn: `{adjuster_name}` · Claim No. `{claim_number}`
>
> Re: Our client `{client}`; date of loss `{incident_date}`
>
> This firm represents `{client}` for injuries from the collision of `{incident_date}`. Please direct all contact to this office and send a copy of the policy declarations page. `[[if client_is_minor]]` **Riley** ⚠ is a minor and appears through `{next_friend}`, next friend. `[[end]]`
>
> `{firm_signature_block}`

*What the marking step would report:*
- `{client}`, `{incident_date}` — **named in the disclosures token set** (`form-engine.md` §3).
- `{carrier_name}`, `{adjuster_name}`, `{claim_number}`, `{next_friend}`, `{client_is_minor}`, `{firm_signature_block}` — **in no token set the record names** → each becomes an *ask me* blank or a new field (`FBQ-2`).
- ⚠ **Scrub check:** "Riley", typed as a first name only, was NOT marked — left alone, it prints on the next minor client's letter (`FBQ-4`).

**3. What the wizard asks** (only what the matter does not already hold; each answer saves back to the matter so it is never asked again):
- Carrier name? → *saved to this matter's insurance record*
- Adjuster? Claim number? → *saved*
- Is the client a minor? → **No** (the next-friend sentence drops out)

**4. The filled result** — a new fictional matter:
> Sample Casualty Co. · Attn: Morgan Example · Claim No. CLM-1111-DEMO
>
> Re: Our client **Jordan Sample**; date of loss **July 14, 2026**
>
> This firm represents Jordan Sample for injuries from the collision of July 14, 2026. Please direct all contact to this office and send a copy of the policy declarations page.
>
> Example Law PLLC · A. Attorney

---

## Shape B — you type a new form from scratch in the editor

**1. What you type** (the built editor is plain text with tokens and "Save as a new version"; an unknown token warns, never blocks):
> Dear `{client_first_name}`,
>
> Here is where your case stands. The next dates on the calendar are:
> `[[each upcoming_setting]]` — `{setting_date}`: `{setting_type}` `[[end]]`
>
> Call me with any questions.
>
> `{firm_signature_block}`

*On save:* ⚠ any token not in the registry — here, likely `{client_first_name}`, `{setting_date}` and `{setting_type}` — is **saved anyway, with a warning** (today's built behavior for the one editor that exists).

**2. What the wizard asks:** nothing about the settings — they come from the calendar; it asks only for anything missing (for example, a client whose first name is not on file).

**3. The filled result:**
> Dear Jordan,
>
> Here is where your case stands. The next dates on the calendar are:
> — October 5, 2026: mediation
> — January 11, 2027: trial setting
>
> Call me with any questions.
>
> Example Law PLLC · A. Attorney

---

## Shape C — you hand over a finished document and get back a PROPOSED template

**1. What you hand over** — a filed notice, with the prior case in it:
> CAUSE NO. 9999-EXAMPLE-001 · **RILEY FORMER v. PAT DEFENDANT** · IN THE DISTRICT COURT, EXAMPLE COUNTY, TEXAS
>
> NOTICE OF CHANGE OF FIRM ADDRESS
>
> Counsel for Plaintiff gives notice that the firm's address is now 100 Sample Street, Example City, Texas 70000.
>
> Certificate of service — served on: **Quinn Opposing, Opposing & Example LLP** and **Avery Counsel, Counsel Firm PC**, on **June 2, 2026**.

**2. What comes back — a proposal, not a template yet:**
> CAUSE NO. `{cause_number}` · `{case_style}` · IN THE `{court_name}`
>
> NOTICE OF CHANGE OF FIRM ADDRESS
>
> Counsel for `{our_side_label}` gives notice that the firm's address is now `{firm_address}`.
>
> Certificate of service — served on: `[[each service_recipient]]` `{recipient_name}`, `{recipient_firm}` `[[end]]`, on `{service_date}`.

*The scrub report that rides with it:* removed — 1 cause number, 2 party names, 2 opposing counsel, 1 service date; leftover sweep over the prior matter's strings: **0 survivors**.
*Its status:* **PROPOSED** — it drafts nothing for a real matter until you adopt it (today's rule for distilled templates: §13.4 / `FE-12`); **adopting** is one click by you, recorded (`FBQ-5`).

**3. The filled result** — after adoption, on a new fictional matter: the same notice with Jordan Sample's case style, the sample firm's address, and one line per opposing counsel on the service list, dated from the service event.

---

## The questions this puts to you (sub-questions of the Fable conversation's `[FORMS-CREATE]`)
Labels are packet-local (`FBQ-` returned 0 hits repo-wide); full text is in the register once placed.
- **`FBQ-1`** — Which of A, B and C do you want, and in what order? (C is a design-session act today, `FE-7`.)
- **`FBQ-2`** — When a blank has no field: an *ask me* question that saves back to the matter, or a request for a new field — and who adds fields (§1 says Claude builds new merge-field wiring)?
- **`FBQ-3`** — Do you author conditions and repeats yourself, or ask for them?
- **`FBQ-4`** — The scrub step: required before any upload becomes a template? And does `FC-12`'s "(c) Structure only" reach your own upload of your own document?
- **`FBQ-5`** — Does a form you create start PROPOSED until you adopt it, or trusted at once?
- **`FBQ-6`** — When a paralegal joins, who may create or change a form?

**Already on existing rows, so not asked again here:** `FE-SEED-1` (no live form of any kind until the bank is seeded); output to PDF and OneDrive (`Q-API-3`; `WF-3`'s document-storage gate); which form comes next (`FE-§11.2`).

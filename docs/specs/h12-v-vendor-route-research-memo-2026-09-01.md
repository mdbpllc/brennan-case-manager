# `H12-v` — VENDOR-ROUTE RESEARCH MEMO: what each vendor's OWN pages say, fetched 2026-09-01

**Canonical repo path:** `docs/specs/h12-v-vendor-route-research-memo-2026-09-01.md`
**Status: PROPOSED — RESEARCH ONLY. THIS DOCUMENT DECIDES NOTHING.** It does not recommend a vendor, rank the routes, or advance `H12-v` one inch toward a ruling. **No account was created, no credential obtained, no BAA requested, no sign-up begun, and no vendor contacted.** `H12-v` is Michael's, both limbs, and the BAA remains a **HARD GATE** before any real record moves through the model-call path (REQ-CAPTURE §16.3).
**Produced by:** a typed Opus 5 design session, 2026-09-01 Central, under CHAT-DISPATCH v5 Task 2. Model routing per §7.2: this session EXECUTES and adjudicates nothing.
**⚠ THE ROW'S ACTUAL ID STRING IS `H12-v`, NOT `HD-12-v`.** The disclosures `H`→`HD` renumber of 2026-08-22 is forward-going only and does not reach a row already minted; **searching the queue for `HD-12-v` will not find it.** Named because an ID is not an identity until the row is read (`#133`), and this memo is likely to be the next session's entry point.
**Why it exists, in the queue row's own words:** *"All vendor facts above are SEARCH-DERIVED and were NOT verified against the vendors' own pages — no page was fetched, and BAA terms and pricing move. Treat as a lead, not as settled procurement."* This memo fetches the pages.

---

## §0 — HOW TO READ THIS, AND THE ONE RULE IT FOLLOWS THROUGHOUT

**Every factual sentence below is one of three labelled kinds — plus a fourth, named beneath the table, which is not a claim about a vendor at all:**

| Label | What it is |
|---|---|
| **QUOTED** | verbatim words from the vendor's own page, with the URL and the fetch date |
| **NOT ESTABLISHED** | a question the pages do not answer — stated as a gap, never filled by inference |
| **CHARACTERIZATION** | Claude's reading of quoted text, marked as such and never presented as the page's words |

A fourth kind appears and is named so the taxonomy is honest: **RETRIEVAL OBSERVATION** — facts about the fetch itself (a 302 redirect, a page that returned navigation chrome only). Those are not claims about a vendor.

**Retrieval is not verification (SOURCING).** Every page was retrieved by `WebFetch`, which converts a page to markdown and extracts against a prompt — **so each quotation is a reproduction of the source, not a byte-level capture.** Nothing here is verified; **only Michael verifies.** Where a statement would become load-bearing in the build, it needs eyeballing on the live page first.

**⛔ AN ASSERTED ABSENCE IS WEAKER THAN A QUOTATION, AND THIS MEMO RESTS ON SEVERAL.** A prompt-driven extraction that silently truncates **reads as an absence while reporting success** — the companion drafts file documents exactly that happening to an eCFR `structure/` response, and states the principle: *"a truncated-but-successful response would read as an absence of part 164 and is not evidence of absence."* **Four carry weight: §3.4's and §3.5's (each the SOLE basis for that route's named gap, and each the absence of a name from a PUBLISHED LIST — the strongest form an absence claim takes), §2's (no tier or minimum on the Anthropic page), and §4's (no customer-size condition on any AWS page). Each was confirmed on two differently-phrased passes, which is corroboration, not proof. Confirm any of them on the live page before it is relied on.** *(This is the project's own recurring failure class: an instrument built so that it cannot disconfirm.)*

**The reason to read this at all, stated precisely because the difference between the two matters: ONE of the row's recorded vendor facts is WRONG (§1 — the OpenAI ZDR condition), a SECOND is NOT ESTABLISHED by the page it rested on (§2 — Anthropic's Enterprise requirement, on which the page is SILENT rather than contrary), and a THIRD question — whether the two big clouds' BAAs reach a partner-hosted Claude at all — is UNRESOLVABLE FROM ANY PAGE EITHER VENDOR PUBLISHES (§3.4, §3.5).** *A silent page does not make a recorded fact false; it leaves it unsupported, and the memo says which is which rather than flattening them.* **The row is NOT edited by this memo** — the fence this session runs under makes no work order against any existing queue row; the corrections are put as open items and the row stays as written until Michael or a properly-scoped packet moves it.

---

## §1 — ⛔ CORRECTION 1: THE OPENAI "ZERO DATA RETENTION" CONDITION IS **NOT** WHAT CONDITIONS HIPAA ELIGIBILITY

**What the `H12-v` row records (2026-08-22, `#134`, search-derived):**

> *"if that route wins, the BAA covers only zero-data-retention-eligible endpoints and any call not so configured is uncovered even with the paper signed — a build constraint, not a footnote."*

**What OpenAI's own page says. QUOTED**, from `https://help.openai.com/en/articles/20001069-hipaa-eligible-products-and-functionality` (fetched 2026-09-01 Central; page self-stated *"Updated: yesterday"*):

> **"HIPAA eligibility for the OpenAI API is contingent on Customer's account being provisioned with Modified Retention, unless otherwise specified by OpenAI."**

**QUOTED**, twice, from `https://developers.openai.com/api/docs/guides/your-data` (fetched 2026-09-01 Central):

> *"For customers who have executed an OpenAI Business Associate and Healthcare Addendum, once your org ID is provisioned with Eyes Off, BAA-eligible endpoints can be used for processing PHI, **even if data is retained**."*
>
> *"For customers who have executed an OpenAI Business Associate and Healthcare Addendum, once your org ID is provisioned with Safety Retention, BAA-eligible endpoints can be used for processing PHI, **even if data is retained**."*

**And the sentence that states the whole mechanism in one line. QUOTED**, from the same help-centre page:

> **"Once your org ID is provisioned with Modified Retention, the endpoints listed below can be used for processing PHI, even if data is retained, upon execution of the OpenAI BAA."**

**CHARACTERIZATION — the structural proof, built from two quoted lists rather than from one sentence.** The HIPAA-eligible endpoint list includes endpoints the data-controls table marks **"No"** in its *"Zero Data Retention eligible"* column — `/v1/assistants`, `/v1/threads`, `/v1/vector_stores`, `/v1/files`, `/v1/batches` among them. **If ZDR were the condition, those two lists could not overlap.** The data-controls table has columns headed *"Endpoint · Data used for training · Abuse monitoring retention · Application state retention · Zero Data Retention eligible · Eyes Off and Safety Retention eligible"* — **and no column headed "BAA eligible" at all.**

**AND THE PROOF CUTS FURTHER THAN FIRST STATED, in a direction that must be recorded rather than trimmed. QUOTED**, from the same table on `https://developers.openai.com/api/docs/guides/your-data` (fetched 2026-09-01 Central): those same five endpoints are marked **"No"** under *"Eyes Off and Safety Retention eligible"* as well. **So the HIPAA-eligible list tracks NEITHER column.** That is the actual force of *"no column headed BAA eligible"* — the eligibility that matters is not either of the two the table publishes. **CHARACTERIZATION:** this makes the ZDR premise more clearly wrong, not less, and it makes *"Modified Retention"* more clearly a THIRD thing whose definition is not on any page retrieved.

**Where ZDR IS a stated BAA condition — one narrow carve-out. QUOTED**, from `https://developers.openai.com/api/docs/guides/your-data` (fetched 2026-09-01 Central):

> *"Web Search with live internet access is not HIPAA eligible and is not covered by a BAA."*
> *"Web Search in offline/cache-only mode (`external_web_access: false`) is eligible to be covered by a BAA when used with an API key from a ZDR-enabled project within a ZDR organization."*

**CHARACTERIZATION of how the row's premise probably arose:** ZDR is a sufficient posture and is the stated condition for that single Web Search case; **it is not the general condition.** The general condition is **Modified Retention**.

**WHAT IS NOT ESTABLISHED, and it matters more than the correction:**
- **The pages never DEFINE "Modified Retention."** The HIPAA condition names it; nothing retrieved says what it mechanically is, or how it relates to the separately-described *"Eyes Off"* and *"Safety Retention"* postures.
- **The phrase "BAA-eligible endpoints" is used and defined nowhere**, and the eligibility table has no such column. *(The SUBSTANTIVE mapping is stated — the "Once your org ID is provisioned with Modified Retention…" sentence quoted above says Modified Retention + an executed BAA + the listed endpoints permits PHI processing. What is undefined is the TERM.)*
- The data-controls page states **no date about itself**.

**⛔ AND THE SAME WRONG PREMISE IS FILED IN TWO PLACES BESIDES THE QUEUE ROW — NAMED, NOT EDITED.** `REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` carries it at **§16.3** (*"`HD-12-z` (ZDR endpoint configuration, live only on the OpenAI route)"*) and in the **§18.C register** as the `HD-12-y` / `HD-12-z` row. **`HD-12-z` as written is an open question about the wrong mechanism.** This session edits neither, and — recorded because the timing matters — **the THIRD FOLD-IN of that same REQ-CAPTURE shipped earlier TODAY under Task 1 of this chain and carried the `HD-12-z` row forward unchanged**, correctly, since the fold's scope was the `AS` rulings and not `H12-v`. **Whether `HD-12-z` is reworded, retired, or left as it stands is MICHAEL'S**, and it is an open item on this packet.

**CONSEQUENCE IF THAT ROUTE WERE EVER TAKEN, stated because the row framed the original as a build constraint — CHARACTERIZATION, and nothing here is buildable:** what a build would have to express is an **ACCOUNT PROVISIONING STATE ("Modified Retention"), not a per-endpoint ZDR configuration.** Those are different things to check and different things to get wrong. **And what that state mechanically IS remains NOT ESTABLISHED** — no page retrieved defines it — **so nothing here can be built from.** **Nothing here recommends that route.**

---

## §2 — ⛔ CORRECTION 2: ANTHROPIC'S OWN PAGE DOES **NOT** SAY THE FIRST-PARTY API BAA REQUIRES ENTERPRISE

**What the `H12-v` row records:** *"Anthropic's direct route requires Enterprise, which Michael rejected on cost (`"that defeats the whole purpose"`)."*

**Michael's rejection stands and is not revisited here** — he ruled on the Enterprise route's cost and this memo does not re-argue it, exactly as the dispatch directs. **What the page shows is that the premise underneath the rejection is not what the page says.**

**QUOTED**, from `https://privacy.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers` (fetched 2026-09-01 Central, following a 302 from the `privacy.anthropic.com` URL; page self-stated *"Updated over 2 weeks ago"* — a relative stamp, **no absolute date**):

> *"Anthropic provides a BAA covering our HIPAA-ready services, such as use of our first-party API or Enterprise plans."*
>
> **"To use the 1P API with PHI, your organization's Primary Owner will need to sign a BAA and then reach out to your Anthropic contact or our Sales team to get this turned on."**
>
> *"Claude Enterprise Primary Owners can accept the BAA directly when activating HIPAA compliance in the organization settings under 'Data and privacy.'"*
>
> **"the BAA only covers the single organization that accepted it, and excludes features such as Claude Console, Claude Cowork, or features currently in beta such as Claude in Office and Claude Design."**
>
> *"Standard Claude Enterprise plans do not include BAA coverage without action from a Primary Owner."*

**CHARACTERIZATION:** the page describes **two different mechanisms** — Enterprise has an in-product self-acceptance path; **the first-party API path requires the Primary Owner to sign and then contact Anthropic or Sales to have it enabled.** The API is named as a HIPAA-ready service in its own right, alongside Enterprise rather than beneath it.

**⛔ AND THE SAME PAGE CARRIES A PER-FEATURE COVERAGE TABLE FOR THE 1P API — WHICH IS A BUILD CONSTRAINT OF EXACTLY THE CLASS §1 EXISTS TO CORRECT. QUOTED**, as the page prints it under **"Claude Platform (1P API)"**:

| Feature | Status as printed |
|---|---|
| Messages API (prompt caching, structured outputs, memory, web search, bash tool, text editor tool) | **✅ Eligible under BAA** |
| Token Counting, Models, Org Management, Compliance APIs | **✅ Eligible under BAA** |
| **Batch API, Files API, Skills API, Code Execution, Computer Use, Web Fetch** | **❌ Not covered under BAA** |
| External MCP | ⚠️ 3P data flows not covered by Anthropic BAA |
| Claude Code via API (CLI) | ✅ Eligible only with ZDR enabled (for qualified accounts) |

**CHARACTERIZATION, and it is the reason this table is quoted rather than summarized: "Files API — Not covered under BAA."** A design that ever moved a chronology through the Files API would sit **outside** BAA coverage on this route, with the paper signed. **That is the same shape of fact the queue row got wrong about OpenAI** — a per-feature coverage boundary, not a footnote — and it was missed on the first pass of this very memo. **Nothing here recommends this route or any other, and nothing here is buildable: the constraint is RECORDED so it is visible if the route is ever taken, not designed to.**

**WHAT IS NOT ESTABLISHED — and the silence is the finding, not an answer:**
- **The page names no plan tier, spend floor, or account minimum for the 1P API path.** It does not say the API BAA is Enterprise-only; **it also does not say a standard self-serve API account qualifies.** *"Reach out to Sales"* is a process step, not an eligibility rule. **The question the row asks is not answered by the page; it is left open by it.** *(The nearest thing to an account condition anywhere on the page is the table's own **"for qualified accounts"** on the Claude Code row — and that phrase is itself undefined.)*
- **"Claude Console" is EXPRESSLY EXCLUDED by name** from BAA coverage while the *"1P API"* is covered. **The table above draws the boundary at FEATURE level, which is more than the first pass of this memo credited** — what remains undefined is the Console/API line **as such**, i.e. which surface a given call is made through. For a build whose whole design is a server-side function calling an API with a secret, that boundary is not academic.
- No absolute effective date; *"over 2 weeks ago"* cannot be pinned to a day.
- **NOT FETCHED:** the Anthropic BAA instrument itself.

---

## §3 — THE SIX ROUTES, EACH AGAINST ITS OWN PAGES

**All fetched 2026-09-01 Central** (DT-1; the container's UTC date was not used). Every row is QUOTED unless marked otherwise.

### §3.1 — AWS BEDROCK

| | |
|---|---|
| **HIPAA-eligible?** | **YES.** `https://aws.amazon.com/compliance/hipaa-eligible-services-reference/` (page self-stated **"Last Updated: May 22, 2026"**) lists **"Amazon Bedrock"** and **"Amazon Bedrock AgentCore"**. Corroborated at `https://aws.amazon.com/bedrock/faqs/`: *"Amazon Bedrock is in scope for common compliance standards such as Service and Organization Control (SOC), International Organization for Standardization (ISO), is Health Insurance Portability and Accountability Act (HIPAA) eligible…"* |
| **BAA: self-service or a sales call?** | **SELF-SERVICE.** `https://aws.amazon.com/compliance/hipaa-compliance/`: *"Yes. AWS has a standard Business Associate Addendum (BAA) we present to customers for signature."* · *"To review, accept, and manage the status of the BAA for your account, sign in to AWS Artifact in the AWS Management Console."* And `https://aws.amazon.com/artifact/faq/`: *"When you accept an online BAA within the Account agreements tab in AWS Artifact, the account you used to sign in to AWS is automatically designated as a HIPAA Account under that online account BAA."* |
| **The PHI limit inside the BAA** | *"Customers may use any AWS service in an account designated as a HIPAA account, but they should only process, store, and transmit protected health information (PHI) in the HIPAA-eligible services defined in the Business Associate Addendum (BAA)."* And from the eligible-services page: *"you agree not to use these HIPAA Eligible Services for any purpose or in any manner involving Protected Health Information (as defined by HIPAA) without first entering into an AWS business associate agreement."* |
| **Claude models served?** | **YES.** `https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html` lists under provider Anthropic: **Claude Opus 5, Claude Sonnet 5, Claude Mythos 5, Claude Fable 5**, and the 4.x family. |
| **Pricing MODEL** *(structure only — no figures were read, and none is estimated)* | `https://aws.amazon.com/bedrock/pricing/` carries table headers *"Price per 1M input tokens"* / *"Price per 1M output tokens"*, and for Provisioned Throughput *"Price per hour per model unit for 1-month commitment"* / *"…6-month commitment"*. The decisive commitment text, from `https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html`: *"You can choose between the following levels of commitment: - No commitment – You can delete the Provisioned Throughput at any time. - 1 month… - 6 months…"* **A no-commitment tier exists.** |
| **Solo-firm eligibility** | **NOT ESTABLISHED — see §4.** The closest words are *"All AWS Accounts have access to AWS Artifact"* (Artifact FAQ) and *"Customers may use any AWS service in an account designated as a HIPAA account."* |
| **NOT FETCHED** | the AWS BAA instrument itself; the Anthropic-specific rate rows on the pricing page. |

### §3.2 — OPENAI API

| | |
|---|---|
| **BAA request path** | **EMAIL — and expressly NOT enterprise-only.** `https://help.openai.com/en/articles/8660679-…` (self-stated *"Updated: 14 days ago"*): *"email us at baa@openai.com with details about your company and use case"* · *"Our team will respond within 1-2 business days"* · **"To use the API Platform, an enterprise agreement is not required to sign a BAA"** · **"We are able to approve most customers that request BAAs"**. Separately: *"Only ChatGPT Enterprise or Edu customers that have a sales-managed account are eligible for a BAA for ChatGPT at this time."* and *"we don't offer a BAA for ChatGPT Business"* — **those are about ChatGPT, not the API.** |
| **The condition** | **Modified Retention — see §1.** |
| **HIPAA-eligible PRODUCTS** | *"ChatGPT for Healthcare, ChatGPT for Enterprise with Regulated Workspace, ChatGPT FedRAMP, ChatGPT for Clinicians, **API with Modified Retention**, API FedRAMP with Modified Retention"* |
| **NOT ESTABLISHED** | what "Modified Retention" is; what "BAA-eligible endpoints" formally means; any approval criterion behind *"most customers"* — *most* is not *all*, and no page states a floor or a decline rate. |
| **NOT FETCHED** | `https://cdn.openai.com/osa/healthcare-addendum.pdf` — the Healthcare Addendum itself, surfaced as a search lead only. |

### §3.3 — ANTHROPIC DIRECT — see §2.

### §3.4 — GOOGLE CLOUD (the platform formerly branded VERTEX AI)

| | |
|---|---|
| **A NAME CHANGE that bears on everything below** | The Vertex AI Claude documentation URL **302-redirects** to a `gemini-enterprise-agent-platform` path, and `https://cloud.google.com/products/gemini-enterprise-agent-platform` states: **"All the power of Vertex AI you know and love, now within Gemini Enterprise Agent Platform."** |
| **Claude models served?** | **YES.** `https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/claude` lists **Claude Opus 5, Claude Sonnet 5, Claude Fable 5.1, Claude Fable 5** and the 4.x family, under **"Partner Models"**. |
| **BAA path** | **SELF-SERVICE IN CONSOLE.** `https://cloud.google.com/security/compliance/hipaa` (self-stated **"Last updated 2026-08-28 UTC"**): *"Execute a Google Cloud BAA. You can follow the instructions in the Privacy compliance and records for Google Cloud to review and accept the BAA."* Steps at `https://support.google.com/cloud/answer/6329727`: *"Go to the Google Cloud IAM & Admin page"* → *"Below Google Cloud Platform HIPAA Business Associate Addendum, click Review and Accept."* → *"I Accept."* Also *"If you have multiple Google Cloud projects, you only need to opt in to the HIPAA BAA within one Google Cloud project in your account."* and the caveat *"You can opt into the BAA only if your Google Cloud agreement does not already incorporate the HIPAA BAA by reference."* |
| **Is the AI platform a COVERED PRODUCT?** | The covered-products list on the HIPAA page: *"The Google Cloud BAA covers Google Cloud's entire infrastructure (all regions, all zones, all network paths, all points of presence), and the following products:"* — **PRESENT verbatim: "Generative AI on Gemini Enterprise Agent Platform", "Vertex AI Workbench instances", "Model Armor". ABSENT: bare "Vertex AI", "Model Garden", "Anthropic"** *(an ASSERTED ABSENCE — see §0's bound; confirmed on two differently-phrased passes, which is corroboration, not proof)*. |
| **⛔ NOT ESTABLISHED — the gap that matters** | **No page states whether a THIRD-PARTY PARTNER MODEL (Claude) served through that platform is inside the BAA's coverage of "Generative AI on Gemini Enterprise Agent Platform."** A platform being covered and a partner model served on it being covered are different propositions, and the covered-products list names neither Anthropic nor Model Garden. **NOT FETCHED:** the name-changes page (`.../vertex-ai-name-changes`) returned navigation chrome only, so even the mapping from *"Generative AI on Vertex AI"* to the new entry is a CHARACTERIZATION, not a page's words. |

### §3.5 — MICROSOFT AZURE / MICROSOFT FOUNDRY

| | |
|---|---|
| **Are Anthropic models offered?** | **YES — the pivotal question answers in the affirmative.** `https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/claude-models` (self-stated **"Last updated on 2026-08-17"**) lists model IDs `claude-opus-5`, `claude-sonnet-5`, `claude-fable-5`, `claude-mythos-5` and the 4.x family. |
| **⛔ AND IMMEDIATELY QUALIFIES IT — BUT THE QUALIFICATION IS RESTRICTIVE, NOT UNIVERSAL, AND THE SAME PAGE CUTS BOTH WAYS** | Same page, in a "Note" callout: *"You access Claude models in Microsoft Foundry through Foundry Models from partners and community. **Models from partners and community that Anthropic sells and operates** are Non-Microsoft Products under the Product Terms."* **Read the clause: it identifies a SUBSET.** And the same page, under *"How Claude models are hosted and billed"*, describes **two versions**: *"Version 1: **Hosted on Anthropic infrastructure**; these models run on Anthropic's infrastructure (outside of Azure)."* and *"Version 2: **Hosted on Azure**; these models run on Azure infrastructure end-to-end and are all Generally available (GA)."* The partner page adds: *"Microsoft Foundry offers Claude models in two versions: Hosted on Azure and Hosted on Anthropic infrastructure deployments."* Also: *"Claude models in Foundry require an Azure Marketplace subscription and bill through Claude Consumption Units (CCU)."* |
| **BAA mechanism** | **AUTOMATIC, no request step.** `https://learn.microsoft.com/en-us/compliance/regulatory/offering-hipaa-hitech` (self-stated **"Last updated on 2025-07-29"**): **"The Microsoft HIPAA Business Associate Agreement is available through the Microsoft Online Services Data Protection Addendum by default to all customers who are covered entities or business associates under HIPAA."** · *"See 'Microsoft in-scope cloud services' on this webpage for the list of cloud services covered by this BAA."* |
| **⛔ IS THE AI SERVICE IN SCOPE? — NOT ESTABLISHED, AND THE EVIDENCE CUTS *BOTH* WAYS** | The in-scope list names **"Azure and Azure Government"** among others. **"Microsoft Foundry", "Azure AI Foundry", "Azure OpenAI" and "Azure AI services" do NOT appear as entries** *(an ASSERTED ABSENCE — see §0's bound on those; confirmed on two differently-phrased passes, which is corroboration, not proof)*. **AGAINST coverage:** the "Non-Microsoft Products" note, for the subset Anthropic sells and operates. **FOR coverage:** the same page's **Version 2, *"Hosted on Azure… end-to-end… Generally available"*** — a deployment running end-to-end on Azure infrastructure is not obviously a product Anthropic operates. **CHARACTERIZATION:** no page reconciles the two, and **an earlier draft of this memo stated flatly that "Microsoft's own documentation calls Claude-on-Foundry a Non-Microsoft Product sold and operated by Anthropic" — which reads a RESTRICTIVE clause as a universal and omits the Version-2 evidence sitting on the same page. That sentence was wrong and is corrected here rather than quietly dropped.** Also CHARACTERIZATION: the HIPAA page is dated **2025-07-29**, more than a year before the Foundry Claude page (2026-08-17), so a compliance list predating the arrangement by that margin cannot be read as having considered it. **NOT FETCHED:** the Microsoft Product Terms, where "Non-Microsoft Product" is defined — so the legal consequence of that classification is unread, and **which version a given deployment is** was not established either. |

### §3.6 — A LOCAL MODEL ON THE P1

| | |
|---|---|
| **The BAA question** | **CHARACTERIZATION — REASONING, NOT A FETCHED FACT, and no page was found that states it.** A model executing entirely on hardware the firm owns, with weights already downloaded and no inference traffic leaving the machine, introduces no third party into the PHI path — so there is no business associate to contract with. **This is exactly the kind of proposition the project's registry discipline says a model does not verify.** Offered to be checked, never as authority. |
| **A limit on that reasoning, also CHARACTERIZATION** | *"No BAA needed"* is not *"no HIPAA obligation."* Security Rule obligations on the firm's own device — encryption at rest, access control, audit, disposal, backup — are untouched by where the model runs. |
| **Cost** | **No per-token cost. No figure is estimated here** (see §5). |
| **⛔ CAPABILITY FOR THIS TASK IS UNTESTED, and nothing below establishes it** | The retrieved documentation is memory-and-context SPECIFICATION only. **Not one figure is a quality measurement, and no model card retrieved was evaluated on legal drafting, on Texas practice, or on reasoning over a medical chronology.** A model that FITS is not a model that PERFORMS. |
| **What the specifications say (QUOTED)** | `openai/gpt-oss-120b` model card: *"117B params with 5.1B active parameters"* · *"fit into a single 80GB GPU (like NVIDIA H100 or AMD MI300X)"*; the announcement adds *"natively support context lengths of up to 128k"* and *"gpt-oss-20b only requires 16GB"*. `Qwen/Qwen2.5-7B-Instruct-1M`: **"For processing 1 million-token sequences: Qwen2.5-7B-Instruct-1M: At least 120GB VRAM (total across GPUs)."** `Qwen/Qwen3-235B-A22B-Instruct-2507`: *"Context Length: 262,144 natively and extendable up to 1,010,000 tokens"* · **"To effectively process a 1 million token context, users will require approximately 1000 GB of total GPU memory."** `llama.cpp`: *"CPU+GPU hybrid inference"* to *"partially accelerate models larger than the total VRAM capacity"*, with *"1.5-bit… through 8-bit integer quantization"*. |
| **CHARACTERIZATION of the shape of that data** | **Long context, not parameter count, is where the hardware cost sits** — and a medical chronology is a long-context input. **NOT ESTABLISHED:** no page gives requirements at a realistic working context (64k–200k); the quoted figures are one 128k fit and two 1M-token extremes, and interpolating between them would be invention. |
| **BUILD-STATE note** | the telemetry-lockdown posture item is **NOT SET** per BUILD-STATE; recorded because a local route would put that item on the critical path. |
| **NOT FETCHED** | vLLM's stated system requirements — two URLs attempted, both returned navigation chrome only. |

---

## §4 — THE AWS-FOR-A-SOLO-FIRM QUESTION, STATED WITH WHAT THE PAGES DO AND DO NOT SAY

**This is limb (1) of `H12-v` — *"will AWS sign a HIPAA business associate addendum for a solo firm?"* — and it is Michael's.** Stated here so that when he asks it, he asks it against the actual record.

**WHAT THE PAGES SAY (QUOTED):**
- *"AWS has a standard Business Associate Addendum (BAA) we present to customers for signature."* — a **standard** instrument, not a negotiated one.
- *"All AWS Accounts have access to AWS Artifact."*
- *"Root users and IAM users with admin permissions can download all audit artifacts available to their account by agreeing to the associated terms and conditions."*
- *"When you accept an online BAA within the Account agreements tab in AWS Artifact, the account you used to sign in to AWS is automatically designated as a HIPAA Account under that online account BAA."*
- *"Customers may use any AWS service in an account designated as a HIPAA account…"*

**WHAT NO PAGE SAYS:**
- **No page states a minimum account size, a minimum spend, an enterprise-agreement requirement, or any customer-size condition on accepting the BAA.**
- **AND no page affirmatively states that a solo practitioner MAY accept it either.** The step from *"All AWS Accounts have access to AWS Artifact"* to *"a one-person firm is entitled to accept the BAA"* is a **CHARACTERIZATION** — Artifact access is not the same proposition as BAA entitlement.

**CHARACTERIZATION, offered as the honest reading and nothing more:** the mechanism described is **self-acceptance of a standard addendum by any account's root or admin user, with no gate that mentions customer size** — which is why the row recorded Bedrock as leading. **The absence of a stated minimum is not the same as a stated permission**, and the instrument itself was **NOT FETCHED**, so what the BAA requires of the accepting party is unread.

**CHARACTERIZATION, and stated symmetrically on purpose:** of the five vendor routes, **AWS is the only one whose BAA instrument the pages describe as readable in-console by an account holder** (*"To review, accept, and manage the status of the BAA for your account, sign in to AWS Artifact"*). **The other four instruments' access paths were NOT ESTABLISHED.** *An earlier draft of this section called reading it "the cheapest way to close this limb" and said it "requires only an AWS account and no commitment" — a comparative cost claim in a memo that forbids itself figures, and two assertions no fetched page supports. Withdrawn, and named rather than deleted.* **No route is recommended here.**

---

## §5 — WHAT THIS MEMO DELIBERATELY DOES NOT DO

1. **NO TOKEN-COST ESTIMATE PER MATTER.** Offered at `#130` and **DECLINED**; the row records it *"remains unestimated."* It stays unestimated. **No figure appears anywhere above, and pricing was read as STRUCTURE only.**
2. **NO RE-PROPOSAL OF THE STRIPPED CHRONOLOGY — ON ANY THEORY.** **REJECTED at `#130`, and the rejection stands on MICHAEL'S RULING, not on a cite.** The reasoning recorded with it was Claude's and then-unverified: that dates of service are themselves identifiers, and that a chronology tied to a one-plaintiff matter is re-identifiable. **The drafts file now records what the primary source does and does not support: the first half is a CHARACTERIZATION of §164.514(b)(2)(i)(C) — whose actual words are "dates directly related to an individual," and which excepts the YEAR — and the second half is NOT ESTABLISHED and remains unsourced.** **⛔ AND THE CLOSURE IS OF THE APPROACH, NOT OF ONE ROUTE TO IT:** the drafts file sets out BOTH statutory de-identification routes, and **that the safe-harbor entry is silent on the EXPERT-DETERMINATION route is not an opening.** Reviving de-identification on any theory — safe harbor, expert determination, year-only dates, age banding — **is a NEW RULING for Michael, never a reading of these entries.** **The payload is ruled: the full chronology, unmodified, and the BAA is the mechanism (REQ-CAPTURE §16.2, §16.3).**
3. **NO RECOMMENDATION AND NO RANKING.** The routes are in the row's own order. **Nothing above ranks them or says which is better.** *(§4 does observe that AWS is the only route whose BAA instrument the pages describe as readable in-console — a labelled CHARACTERIZATION about ACCESS TO A DOCUMENT, symmetrically stated because the other four instruments' access paths were NOT ESTABLISHED. It is not an endorsement and no route is recommended.)*
4. **NO EDIT TO THE `H12-v` ROW.** The two corrections in §1 and §2 are put as OPEN ITEMS in the packet; the row is not touched by this session.
5. **NO RE-ARGUMENT OF MICHAEL'S ENTERPRISE REJECTION** (§2).
6. **NOTHING ABOUT `FE-D1A-1`.** `AS-Q1` ships the writer INTERFACE, a FIXTURE writer and a function SHAPE with one **vendor-neutral** secret — precisely so that ruling `H12-v` later changes a value and not a schema. **No vendor name, key, endpoint or model name belongs in that build, and none is proposed here.**

---

## §6 — THE HIPAA PROPOSITIONS: RETRIEVED, AND ROUTED TO A DRAFTS FILE RATHER THAN TO THE REGISTRY

The `#130` sitting stated the eighteen-identifier set, dates of service among them, and safe harbor and expert determination as the two de-identification routes — **as background, and flagged by that session against itself as UNVERIFIED legal propositions never routed to the registry.**

**They have now been RETRIEVED from primary source: 45 CFR § 164.514(a)–(c), via the eCFR, request date 2026-09-01 Central** — paragraph (c), the re-identification-code provision that item (R) excepts, was retrieved at the PF-1 preflight and is set out with the candidates. The verbatim text, the currency metadata, and **four registry-CANDIDATE entries** are at **`docs/specs/hipaa-deidentification-entry-drafts-2026-09-01.md` — DRAFTED AND NOT INSERTED. No registry file is touched by this packet.** Where the drafts would ever go is a question for Michael, and it is an open item.

**THREE things from that retrieval belong here rather than there, because they bear on this memo's own method:**

**(a) THE "EIGHTEEN" FIGURE IS CORRECT.** The text enumerates **(A) through (R) — eighteen lettered items**, with no gaps. *(Item (R) is a residual catch-all rather than a named category, so "seventeen identifiers plus a catch-all" and "eighteen identifiers" count the same text. Item (B) contains internally-numbered sub-items that are components of one identifier, not additional ones; item (C) bundles several date elements into one. Counting either way up would inflate the figure.)*

**(b) ⛔ THE SOURCE STATES ITS OWN CURRENCY TWO DIFFERENT WAYS.** SOURCING requires that *"the currency figure comes from the source's own statement."* **Here the source makes two.** The API's `titles.json` gives title 45 `up_to_date_as_of` / `latest_amended_on` / `latest_issue_date` all **2026-08-28**; the section page's own banner reads *"Displaying title 45, up to date as of 8/27/2026. Title 45 was last amended 8/26/2026."* **A one-to-two-day spread, on the same site, on the same day. Neither was chosen and neither was inferred; both are recorded in the drafts file §1, and which governs is Michael's call.** *(Tested against a neighbouring title for a normalization artifact — title 44 returns different values across those fields, so title 45's three matching values are a real reading.)*

**(c) ⛔ A SOURCING FINDING, AND IT AFFECTS EVERY FUTURE eCFR RETRIEVAL.** The project's SOURCING convention prefers *"targeted part/section requests"* against the eCFR API. **The `/api/versioner/v1/full/` endpoint is ROBOTS-DISALLOWED and cannot be used by a robots-respecting fetcher.** `robots.txt` at `ecfr.gov` carries, under `User-agent: *`:

> `# Don't index developer tool links`
> `Disallow: /api/renderer/v1/content/`
> `Disallow: /api/versioner/v1/full/`

**This is structural, not transient — retrying will not help.** The `/versions/` and `/titles.json` metadata endpoints are **not** blocked and did work, and the human-readable `ecfr.gov/current/...` section page is reachable. **CHARACTERIZATION: the convention's "prefer targeted part/section requests over whole titles" is still right in principle. The convention itself names no endpoint — what is unavailable is the `/full/` one a session would naturally reach for**, and the workable shape is the section page plus `titles.json` for currency. Named here so the next session does not rediscover it, and put as an open item because amending SOURCING is a convention change and therefore Michael's.

---

## §7 — QUESTIONS FOR THE MALPRACTICE CARRIER — **PREPARED, NOT ANSWERED**

**This is limb (2) of `H12-v` — *"where does the malpractice carrier land on AI-assisted drafting over client medical records?"* — and it is Michael's, long-standing (`HD-12-x`).** *(The four `HD-12` sub-limbs and where this memo reaches them: **`HD-12-w`**, will AWS sign for a solo firm → §4; **`HD-12-x`**, the carrier → this section; **`HD-12-y`**, token cost per matter → DECLINED and left unestimated (§5); **`HD-12-z`**, ZDR endpoint configuration → **its premise is corrected at §1 and the row asks about the wrong mechanism**.)* What follows is a question list to put to the carrier, drafted so the answers come back usable. **Claude is not a lawyer, is not an insurance broker, and takes no position on any of it; these are questions, not advice, and none of them is a legal proposition entering any registry.**

**Frame the disclosure once, plainly, before asking anything** — the carrier's answers turn on the facts, and vagueness produces a useless answer. **⛔ AND EVERY WORD OF THE FRAME MUST BE TRUE, because this is the only text in the packet that LEAVES the project and is repeated to a third party who will rely on it.** An earlier draft of this frame said *"no model output is ever served unreviewed"*, *"the model call runs on the firm's own API account under a signed BAA"*, and *"no client data is used for vendor training"* — **the first describes machinery the record RETIRED (`R13`; the amendment slice's DO-NOT list bars any review gate or reviewed/approved state, and Michael's own objection was that the software cannot know what he read), the second is present tense for a state that DOES NOT EXIST — no vendor is chosen and no BAA is signed — and the third is an unsourced vendor fact resting on instruments §8 records as NOT FETCHED. All three are corrected here rather than dropped.** The accurate frame:

> *A solo Texas practice. **Drafting assistance only.** The software sends a client's medical chronology to a model and receives paragraph text back; the software then assembles a document from that text and attorney-approved fixed sentences. **The attorney opens the document in Word and edits it there before it is served — that is the firm's practice and its drafting posture. The software enforces no review state and tracks no "reviewed" flag; a review gate was considered and deliberately NOT built.** **The design INTENDS the model call to run on the firm's own API account under a signed business associate agreement. That is a hard gate and it is NOT YET SATISFIED — no vendor has been chosen and no BAA has been signed; nothing has been sent, and no client record will be until it is.** **Whether client data is excluded from vendor training is a TERM OF THE BAA, which has not been read — treat it as a question for the carrier and the vendor, not as a fact I am asserting.***

**Everything below is a question, not a representation.**

**COVERAGE POSITION**
1. Does the current professional-liability policy cover a claim arising from work product **drafted with AI assistance**, on the facts above, on the same terms as any other work product?
2. Is there any **exclusion, endorsement, sublimit, or condition** in the current policy — by name — that bears on AI, machine learning, "automated" drafting, or the use of third-party software in the preparation of client documents? **Ask for the clause language, not a summary.**
3. Does the answer change if the model call is made **by a paralegal working inside firm software** rather than by the attorney personally? *(This is the ruled design: `HD-12`, reversed 2026-08-21 — the paralegal works inside the software and never touches Michael's Claude login.)*
4. Does the answer change between a **third-party vendor API under a BAA** and a **model running entirely on the firm's own hardware**? Both are live options and the carrier may see them differently.

**NOTICE AND DISCLOSURE**
5. Is there any **duty to notify** the carrier of the adoption of AI-assisted drafting — at adoption, at renewal, or not at all? If at renewal, **on which application question does it belong**, so the disclosure is made where it is asked for.
6. Would a **failure to disclose** it bear on coverage of an unrelated claim?

**CYBER, PRIVACY AND THE DATA ITSELF**
7. Transmitting client **medical records** to a third-party API under a BAA — is that within the current cyber/privacy coverage, and does the carrier require anything specific of the **BAA** or of the vendor before it is?
8. Does the carrier have a **position or a preference among vendors**, or any requirement (audit, certification, data-residency, retention posture) it would want satisfied?
9. Is a **breach at the vendor** covered as the firm's incident, and what would the notification obligations look like?

**PRACTICE AND PROOF**
10. Does the carrier require or recommend any **documented review protocol** for AI-assisted work product? If so — describing the design accurately: **fixed sentences the application places from attorney-approved text, model-composed prose in between, and attorney review performed in Word as a matter of practice with no software-enforced review state** — would that satisfy the requirement, or would the carrier expect the review to be enforced or recorded by the software itself? *(That second half is the question worth asking; the software does not do it today and building it would reverse a ruling.)*
11. Does the carrier expect any **record of what the model was given and what it returned** to be retained, and for how long? *(This bears directly on `AS-Q4`, which retains extracted TEXT per chronology version and not the original bytes, and on `AS-Q6`, which keeps each generation's assembled paragraphs.)*
12. Is there any **client-consent or engagement-letter** language the carrier expects where AI assistance is used?
13. Does any of this change the **premium**, and is there a credit for a documented protocol?

**PUT LAST, ON PURPOSE:** ask whether the carrier will confirm its answers **in writing**. An oral assurance from a broker is not a coverage position, and this is a question whose answer needs to survive a claim.

---

## §8 — WHAT WOULD ACTUALLY CLOSE `H12-v`, stated as gaps rather than as a plan

**None of these is proposed as an action; each is named so the row's cost is visible.**

| # | The gap | Who can close it |
|---|---|---|
| 1 | **The BAA instruments themselves — NONE was fetched.** AWS's, OpenAI's Healthcare Addendum, Anthropic's, Google's, Microsoft's Service Trust document. Every statement in this memo is about what a vendor **says about** its BAA, never about what the instrument contains. | Michael, or counsel |
| 2 | **Whether Claude-on-Google and Claude-on-Microsoft are inside those clouds' BAAs at all** (§3.4, §3.5). Both turn on partner-model status and **neither vendor's pages resolve it.** | the vendor, in writing |
| 3 | **The malpractice carrier's position** (§7) | Michael |
| 4 | **Whether a solo firm may accept the AWS BAA** (§4) — closable by reading the instrument in Artifact | Michael |
| 5 | **What "Modified Retention" is** (§1), if the OpenAI route is ever live | OpenAI |
| 6 | **Local-model capability on this task** (§3.6) — **UNTESTED, and no specification answers it** | a test, on a fictional chronology, before any real record |
| 7 | **Whether Anthropic's first-party API BAA is open to a standard self-serve account or requires a tier** (§2). **The page names no tier, floor or minimum — that is SILENCE, not a permission**, and the route's own gap is that the question is left open rather than answered | the vendor, in writing |
| 8 | **Where "Claude Console" ends and the "1P API" begins** (§2) — the BAA excludes the first by name and covers the second, and **for a design that is a server-side function calling an API with a secret, that boundary decides coverage.** The per-feature table narrows it but does not close it | the vendor, in writing |
| 9 | **Cost on any route.** Pricing STRUCTURE was read; **no figure was, and none is estimated** (§5) | Michael |

**THE GATE IS UNMOVED.** *"No real record moves through the API call until a BAA is signed."* Nothing in this memo signs, requests, or anticipates one.

---

*End of memo. PROPOSED — RESEARCH ONLY. Retrieval is not verification; only Michael verifies. Produced 2026-09-01 Central under CHAT-DISPATCH v5 Task 2 by a typed Opus 5 design session. PF-1 fired on this document — see the packet's §3 entry.*

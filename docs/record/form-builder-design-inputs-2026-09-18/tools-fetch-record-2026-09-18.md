# Form builder design inputs — TOOLS FETCH RECORD (2026-09-18)

**Status:** EVIDENCE (`CAP-2`). Canonical repo path: `docs/record/form-builder-design-inputs-2026-09-18/tools-fetch-record-2026-09-18.md`. Fetched 2026-09-18 (Central, DT-1) by a read-only research agent of the Opus 5 Cowork design session (CHAT-DISPATCH v6, Task 6). **Six products, no more; no recommendation to adopt any of them.**

**Method.** WebFetch and WebSearch only, each product's own pages; nothing fetched by any other means; failures recorded NOT FETCHED and not worked around. WebFetch returns text through a summarizing model: "verbatim" = returned as a quoted string, not byte-checked against the live page; "summarized" = paraphrased.

## Fetch record
| URL | Result | What it established |
|---|---|---|
| docxtemplater.com/docs/tag-types/ | verbatim | `{name}`; `{#x}…{/x}` sections (condition or loop); `{^x}` inverted; table-row loops |
| docxtemplater.com/docs/faq/ | verbatim | inspect module / `getAllTags()` *"to construct a form dynamically"* |
| docxtemplater.com/docs/deep-dive-into-docxtemplater-internals/ | verbatim | *"a simple sentence like `Hello World` might be separated in multiple `w:t`, which makes many things difficult to implement"*; no repair step described |
| docxtemplater.com/docs/errors/ | verbatim | `unclosed_tag`, `unopened_tag`, `duplicate_open_tag` |
| docxtemplater.com/ ; /docs/goals/ | verbatim | *"designed for developers to integrate… while allowing non-programmers (e.g. business users using Word/Office) to design and edit the templates"*; JSON data |
| docxtemplater.com/faq/ | summarized | nothing on split runs |
| docassemble.org/docs/documents.html | summarized | Jinja2 in DOCX; `{%p %}`, `{%tr %}` |
| docassemble.org/docs/logic.html | verbatim | an undefined variable triggers `question` blocks |
| docassemble.org/docs/external.html | verbatim | *"a DAStore object to save data to a storage area that is specific to the user but can be accessed from any session"*; `store_variables_snapshot()` |
| docassemble.org/docs.html | verbatim | authors write YAML; *"you do not need to know much about Python except how to write 'if/then/else' statements"* |
| assemblyline.suffolklitlab.org/docs/authoring/docx/ | verbatim | fields typed `{{ variable_name }}`; list-formatting repair advice (retype as unformatted text) |
| assemblyline.suffolklitlab.org/docs/authoring/generating_code/ | fetched, EMPTY BODY | rendered by script |
| assemblyline.suffolklitlab.org/docs/authoring/label_variables/ | verbatim | standard labels; a custom GPT to label DOCX, *"AI can make mistakes!"* |
| github.com/SuffolkLITLab/docassemble-ALWeaver | verbatim | the Weaver needs *"a labeled PDF or DOCX file"* |
| hotdocs.com → mitratech.com/products/hotdocs/ (302 followed) | verbatim | *"no-code configuration so subject matter experts (not developers) can build and manage document templates"* |
| help.hotdocs.com — Creating_a_DOCX_Template; HotDocs_Fields_Overview | verbatim | Word add-in *"Create Template"*; a field *"appears as a box (a Microsoft Word content control)"* |
| help.hotdocs.com — Creating_a_Repeated_Region; Conditional_Region_Overview | verbatim | repeated regions; IF / ELSE IF / ELSE |
| help.hotdocs.com — Answer_Files_Overview; HotDocs_Author_Overview; Answer_Overlay_Overview | verbatim | the interview is generated from the template; answer sets reused across templates; overlay of on-boarding answers onto a new work item |
| help.hotdocs.com — Create_an_Answer_Mapping; custom interview-event webhook | verbatim | database fields map to answer fields; a webhook pre-fills; write-back not described |
| helpdocs.gavel.io/workflows/word-documents | verbatim | *"a no-code Word add-in called Document Tagger"*; Blueprint *"automatically reads your document, identifies variables, and generates a draft questionnaire"*; *"Check for Errors"* |
| helpdocs.gavel.io/workflows/conditional-content.md; repeating-items.md | verbatim | `{% if %}…{% elif %}…{% else %}…{% endif %}`; `{% for %}` loops; a table row per entry |
| helpdocs.gavel.io/workflows/clio.md; data-manager.md | verbatim | Clio field mapping; answers transferred between workflows; documents sent back to the Clio matter |
| helpdocs.gavel.io/workflows/troubleshooting.md; llms.txt | summarized | nothing on Word runs |
| help.knackly.io — 117 (Word Designer); 8 (if); 9 (lists); 20 (relevancy) | verbatim | add-in inserts variables; `{[if …]}…{[endif]}`; `{[list …]}…{[endlist]}`; relevance drives the interview |
| help.knackly.io — 17 (troubleshooting); 30 (queries) | summarized (+1 verbatim line) | install/login only; catalog records reused |
| knackly.io/knackly-vs-clio-draft/ | verbatim (marketing) | *"Two-way sync keeps data up-to-date across platforms automatically"* — no mechanism documented |
| knackly.io/diy-document-automation-your-way/ | **NOT FETCHED** | certificate expired |
| knackly.io/knowledge-base/… (3 URLs) | redirect to help root, not followed per URL | — |
| help.woodpeckerweb.com — 2748874 (auto-template); 2761694 (launching); 3076157 (instances); 3143204 (conditionals); 4613022 (questionnaire); 6467426 (internal questionnaire) | verbatim | add-in button; *"Initialize Auto-template"* uses *"AI technologies"* to find *"words and phrases that are likely to change"*; instance tracking; IF/THEN; questionnaire from a template; client-data reuse grouped by email |
| supportcenter.woodpeckerweb.com — create-your-first-woodpecker-template | **NOT FETCHED** | SSL handshake failure |
| help.woodpeckerweb.com — 2748884, 2959712, 2761907; collections 1621890, 2440709 | **NOT FETCHED** | 404 |
| woodpeckerweb.com → mycase.com/features/advanced-document-automation/ | fetched once | the page does not mention Woodpecker |

## The six, against the five questions
| | Marking blanks | Split-run repair (own pages) | Conditions / repeats | Field mapping | Interview + write-back |
|---|---|---|---|---|---|
| docxtemplater | typed `{tag}` | problem acknowledged; no repair documented | `{#x}…{/x}`, `{^x}`, row loops | JSON supplied by the developer | tag listing to build a form; write-back not found |
| Docassemble / AL Weaver | typed `{{ }}`; Weaver needs a labeled file; AI labeling helper | not found | Jinja2 `{%p if %}`, `{%tr for %}` | interview variables; `fields` specifiers | yes — undefined variable asks; DAStore / snapshot save |
| HotDocs | Word add-in; content controls | not applicable (content controls) | IF / ELSE IF / ELSE; repeated regions | answer mapping to database fields | generated interview; answer sets and overlay; external write-back not found |
| Gavel | typed `{{ }}` or Document Tagger add-in; Blueprint AI draft | "Check for Errors" (syntax), split runs not named | `{% if %}`, `{% for %}` | Clio field syntax | Blueprint questionnaire; answers transfer between workflows |
| Knackly | Word Designer add-in, `{[ ]}` | not found | `{[if]}`, `{[list]}` | not found (marketing only) | relevance-driven interview; queries reuse catalog records; write-back claimed in marketing only |
| Woodpecker | Word add-in; AI auto-template | instance tracking, split runs not named | IF/THEN; repeats not found (pages NOT FETCHED) | Zapier only | questionnaire; client data reused, grouped by email |

**What the record already knows that none of the six pages settles:** `form-engine.md` §12.1 makes run-merge *"a hard precondition"* for this engine, and the corpus-mining capture measured 104 of 204 of his own letters' tokens split across runs. Gaps for Woodpecker and Knackly are mostly pages that could not be fetched, not confirmed absences.

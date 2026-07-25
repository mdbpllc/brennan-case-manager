# Statute chapter fixtures (demo mode)

Real, unmodified chapter files from the Texas Legislative Council's official
codification, fetched 2026-07-25 from the backing static file host
(`https://tcss.legis.texas.gov/resources/{CD}/htm/{CD}.{ch}.htm`).

Texas statutes are public domain state work — committing them violates no
data-hygiene rule (design D3; the repo rule bars *client* data, not public
law). The set covers every Texas statutory cite in the seeded Legal Rule
Registry entries:

| File | Cited by seeded rule |
|---|---|
| CP.41.htm | cprc-41-0105 (§41.0105 paid-or-incurred) |
| CP.18.htm | cprc-18-001 (§18.001 affidavits) |
| CP.146.htm | ch146-eob-cap |
| PR.55.htm | hospital-lien-ch55 (chapter-level cite) |
| HS.327.htm | price-transparency (Ch. 327) |

Demo mode serves ONLY these chapters (cache-on-demand against the live host
needs the Supabase edge function — CORS blocks direct browser fetch). The
content is the codification as of the fetch date; it goes stale by design —
the biennial refresh (§5) is what updates a live deployment.

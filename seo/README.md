# SEO content pack for multitoolsa.com

This folder is generated from the RankForge SEO workspace. It holds publish-ready copy, not templates.

## What is here

- `tools/*.md` — one original page per tool: meta tags, body copy, FAQs, internal links
- `blog/*.md` — rewritten articles that replace thinner versions on the same slugs
- `pages/*.md` — what each AdSense policy page must contain
- `technical-fixes.md` — the indexing, duplicate-content and redirect fixes, highest severity first
- `keyword-map.csv` — one primary keyword per URL, so two pages never compete

## Order of work

1. Fix the mirror-domain redirect and soft 404 handling (see `technical-fixes.md`).
2. Publish the eight highest-traffic tool pages from `tools/`.
3. Verify About, Contact, Privacy, Terms and Disclaimer are live and substantial.
4. Regenerate `public/sitemap.xml` from the real route table.
5. Submit the sitemap in Search Console, request indexing for the rewritten URLs.
6. Apply for AdSense review only after the above is live.

## Publishing rule

One tool, one page, one primary keyword. Delete the templated SEO batches rather than layering a new block on
top of them — two competing blocks on one URL is worse than one honest block.

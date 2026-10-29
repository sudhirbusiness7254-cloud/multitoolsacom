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

## Audit and implementation (this push)

- `AUDIT-REPORT.md` — what was measured on the live domain and in this repo, with the commands used
- `phantom-urls.txt` — 100 production sitemap URLs that have no route or content record (remove or 301)
- `implementation/cloudflare-mirror-redirect.md` — 301 the `.com.np` mirror to `multitoolsa.com`
- `implementation/fix-soft-404-and-rendering.md` — real 404 status + pre-rendering so the first HTML has content
- `../scripts/generate-sitemap.mjs` — rebuilds `public/sitemap.xml` from real routes (224 URLs verified)
- `../public/sitemap.xml` — regenerated; the old file listed 100 URLs that do not exist

### Sitemap regeneration

```bash
node scripts/generate-sitemap.mjs          # rewrite public/sitemap.xml
node scripts/generate-sitemap.mjs --check  # fail if it is out of date (useful in CI)
node scripts/generate-sitemap.mjs --dry-run
```

Recommended: run it in `prebuild` so the sitemap can never drift from the router again.

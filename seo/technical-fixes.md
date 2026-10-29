# Technical SEO fixes — multitoolsa.com

Audited against the live site and this repository.

## Second domain serves an identical copy of the site

**Severity:** critical

Both multitoolsa.com and multitoolsa.sudhiryadav7.com.np return 200 and render the same app. Duplicate hosting splits ranking signals and looks like duplicated content to reviewers.

**Fix:** In Cloudflare, add a rule for multitoolsa.sudhiryadav7.com.np: 301 redirect all paths to https://multitoolsa.com/$1. Keep the canonical tag on multitoolsa.com and verify only the main domain in Search Console.

## Unknown URLs return HTTP 200 instead of 404

**Severity:** critical

/this-page-does-not-exist-xyz returns 200 because the SPA rewrites every path to index.html. Google treats these as soft 404s and wastes crawl budget, and users land on a blank shell.

**Fix:** Serve a real 404 status for unknown routes (host-level rewrite whitelist or a server route that returns 404), and pre-render or SSG the key landing pages so the first HTML response contains real content.

## Sitemap lists URLs with no matching route

**Severity:** high

The production sitemap has 282 URLs while the app defines 42 static routes. Locale paths such as /de/compress-pdf and /fr/compress-pdf and top-level guide URLs like /image-optimization-masterclass are not in the router, so they can resolve to the SPA shell.

**Fix:** Regenerate the sitemap from the actual route table plus real tool and blog slugs. Remove /de/* and /fr/* until locale routes exist, drop any path that is not reachable, and use the final /all-tools URL rather than the 301 source.

## /all-tools returns 301 on production

**Severity:** medium

The sitemap advertises a URL that immediately redirects, which wastes a crawl and can delay indexing of the canonical target.

**Fix:** List only the final 200 URL in the sitemap and keep one canonical version with a consistent trailing-slash policy.

## Templated SEO blocks repeated across dozens of tool pages

**Severity:** critical

The repository contains premiumSEOContentBatch1 through Batch8 plus several other SEO content modules, which strongly suggests the same paragraphs are reused with the tool name swapped. That is the pattern Google's spam policies describe as scaled content abuse and it also triggers AdSense low-value-content rejections.

**Fix:** Keep one unique, specific block per tool. Delete the auto-generated duplicates, rewrite the top 10 tools by traffic by hand with real screenshots and real limits, and noindex the tail until each page has original content.

## Content depends on client-side JavaScript

**Severity:** high

The first HTML response contains almost no body text; everything renders after the JS bundle loads. Google can render it, but indexing is slower and less reliable, and other crawlers and social previews see an empty page.

**Fix:** Pre-render the homepage, tool hub, top tool pages and all blog posts at build time (vite-plugin-ssg or a Next.js migration). At minimum add prerender snapshots for the 30 highest-value URLs.

## AdSense approval basics

**Severity:** high

ads.txt is present and correct, and the verification meta tag is installed. The remaining gaps are original content depth, a working contact route, and clearly labelled ad slots without excess density.

**Fix:** Publish the rewritten tool content, verify About/Contact/Privacy/Terms/Disclaimer render on the live domain, set up a consent banner for EEA/UK traffic, and keep ad slots clearly separated from tool controls and download buttons.

## A committed .env file in the repository

**Severity:** high

The repository tracks a .env file containing the Supabase project URL and publishable key. Publishable keys are not secrets, but committing environment files trains bad habits and exposes project identifiers.

**Fix:** Add .env to .gitignore, remove it from the index with git rm --cached .env, publish a .env.example with placeholder values, and rotate any key that was ever private in the same file.

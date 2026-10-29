# Option B — prerender after build (implemented)

This is the Option B described in `fix-soft-404-and-rendering.md`, shipped as working code.
No Chromium, no framework migration, no extra runtime dependency.

## What changed

| File | Purpose |
| --- | --- |
| `scripts/prerender.mjs` | Post-build prerenderer. Writes `dist/<route>/index.html` for every real route, plus `dist/404.html` and `dist/sitemap.xml`. |
| `scripts/generate-sitemap.mjs` | Pre-build baseline sitemap from the router. Blog routes now come only from `BlogPost.tsx`, so dead slugs are dropped. |
| `package.json` | `build` runs the sitemap generator, then Vite; `postbuild` runs the prerenderer. |
| `public/sitemap.xml` | Regenerated (see count below). |

```json
"scripts": {
  "build": "node scripts/generate-sitemap.mjs && vite build",
  "postbuild": "node scripts/prerender.mjs",
  "prerender": "node scripts/prerender.mjs",
  "prerender:check": "node scripts/prerender.mjs --check",
  "prerender:snap": "react-snap"
}
```

## What each prerendered page gets

- Unique `<title>` (≤ 62 chars) and `<meta name="description">` (74–158 chars)
- Self-referencing `<link rel="canonical">`
- `robots: index, follow, max-image-preview:large`
- Open Graph + Twitter card tags with the right `og:url`
- JSON-LD: `Organization`, `WebSite`, plus
  - `SoftwareApplication` + `FAQPage` + `BreadcrumbList` on tool pages
  - `BlogPosting` + `BreadcrumbList` on guides
  - `CollectionPage` on the homepage
- A no-JavaScript shell inside `#root`: H1, intro, long description, how-to steps, benefits,
  FAQs, related-tool links and breadcrumbs — so the first HTML response contains 300+ words on
  tools and real internal links for crawlers.

React mounts into `#root` and replaces the shell on load. The interactive tool behaves exactly as
before; users on a slow connection simply see readable content instead of a blank page.

`dist/404.html` is written with `noindex, follow`, and unknown paths can now be served with a real
404 status at the host level.

## How the data is read

`scripts/prerender.mjs` bundles the app's own TypeScript modules with esbuild (already installed as a
Vite dependency) and imports them in Node:

- `src/data/toolsSEOData.ts` → titles, descriptions, H1s, steps, benefits, FAQs, keywords
- `src/data/categorySEOData.ts` → category hub copy
- `src/data/toolsData.ts` → the authoritative tool list and categories
- `src/data/blogData.ts` + `src/pages/BlogPost.tsx` + content modules → guide titles and bodies

Nothing is hardcoded, so adding a tool to `toolsData.ts` automatically gets a prerendered page, a
sitemap entry and structured data.

## Measured result (this repository)

```
180 routes written to dist/
body text: average 202 words · thinnest 91 words
meta: titles 23-62 chars, descriptions 74-158 chars
dist/sitemap.xml: 180 URLs
```

Example — `dist/jpg-to-png/index.html`:

```
title:     JPG to PNG Converter - Free Online Image Conversion Tool
canonical: https://multitoolsa.com/jpg-to-png
json-ld:   1 block (SoftwareApplication + FAQPage + BreadcrumbList + Organization + WebSite)
body:      389 words before JavaScript runs
```

## Verify

```bash
npm run build                      # sitemap → vite build → prerender
npm run prerender:check            # fails if a core route is missing from dist
ls dist/jpg-to-png/index.html      # exists, real HTML
curl -s https://multitoolsa.com/jpg-to-png | sed 's/<[^>]*>/ /g' | wc -w   # expect > 300
```

## Two known gaps, printed by the script

1. **97 tool routes have no hand-written SEO record.** They still get a correct title, canonical and a
   short honest shell, but not a ranking page. Add them to `src/data/toolsSEOData.ts` (copy is in
   `seo/tools/`). The script lists every one on each build.
2. **Policy/hub pages under 120 words.** The script names them. Extend the copy in `seo/pages/` and
   paste it into the corresponding component.

## Optional: full DOM snapshots with react-snap

For pixel-complete snapshots (the literal Option B from the earlier note), the config is already in
`package.json` under `reactSnap`:

```bash
npm i -D react-snap
npm run build && npm run prerender:snap
```

This downloads Chromium and renders the live DOM. It is optional because the prerenderer above
already puts real content and correct metadata in the first response, without the binary.

## Host configuration

Serve the prerendered directories and return a real 404 otherwise:

```
# Netlify / Cloudflare Pages
/                       /index.html            200
/all-tools              /all-tools/index.html  200
/*                      /404.html              404
```

Static files win over rewrites, so `dist/image-compression/index.html` is served for
`/image-compression` with no rule needed. Only the final fallback changes from `200` to `404`.

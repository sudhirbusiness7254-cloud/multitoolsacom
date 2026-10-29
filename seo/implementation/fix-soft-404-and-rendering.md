# Fix the soft 404s and the thin first HTML

Both problems have the same root cause: every path is rewritten to `index.html`, the response is always
200, and the visible content is produced by JavaScript.

Measured on production: 25 of 25 sampled sitemap URLs returned fewer than 80 words of text in the first
HTML response, and `/this-page-does-not-exist-xyz` returned HTTP 200.

## Step 1 — return a real 404 for unknown paths

The SPA cannot know a URL is invalid until the bundle runs, so the status code has to be decided at the
host or build layer.

### Netlify (`public/_redirects`)

```
/*  /index.html  200
```

This is the usual way to make an SPA work, and it is also why everything returns 200. Replace it with a
whitelist so only real routes fall back to the shell:

```
/                       /index.html   200
/all-tools              /index.html   200
/image-tools            /index.html   200
/pdf-tools              /index.html   200
/seo-tools              /index.html   200
/blog                   /index.html   200
/blog/*                 /index.html   200
/about                  /index.html   200
/contact                /index.html   200
/privacy                /index.html   200
/terms                  /index.html   200
/disclaimer             /index.html   200
/dmca                   /index.html   200
/advertiser-disclosure  /index.html   200
/image-compression      /index.html   200
/image-converter        /index.html   200
/image-resize           /index.html   200
/image-crop             /index.html   200
/watermark-tools        /index.html   200
/compress-pdf           /index.html   200
/image-to-pdf           /index.html   200
/merge-pdf              /index.html   200
/split-pdf              /index.html   200
/word-to-pdf            /index.html   200
/tag-extractor          /index.html   200
/image-editor           /index.html   200
/*                      /404.html     404
```

Extend the list with the tool slugs you keep (the generator already knows them). Anything unmatched now
returns a real 404.

### Nginx / Apache

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
error_page 404 /404.html;
```

`try_files` already returns 404 for anything the app does not own — do **not** add a blanket
`rewrite ^ /index.html break;`, which recreates the soft-404 problem.

### Inside the app

`src/pages/tools/DynamicToolPage.tsx` already redirects unknown slugs to `/404`. Also add a `noindex`
robots meta on the 404 view so a crawled 200 (before the host fix ships) cannot get indexed:

```tsx
<Helmet>
  <meta name="robots" content="noindex, follow" />
  <title>Page not found | MultiTools</title>
</Helmet>
```

## Step 2 — ship real HTML for the pages that must rank

You do not need to migrate frameworks to fix this. Any one of these is enough:

### Option A — `vite-plugin-ssg` / `vite-react-ssg` (least disruptive)

```bash
npm i -D vite-react-ssg
```

```tsx
// src/main.tsx
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";

export const createRoot = ViteReactSSG({ routes });
```

Wrap the browser-only tools in a client-only boundary, and give every route a `loader` or a static
`head` so the build writes real HTML with a real title and body.

### Option B — prerender the important URLs after build

```bash
npm i -D react-snap
```

```json
"scripts": {
  "build": "vite build",
  "postbuild": "react-snap"
}
```

```json
"reactSnap": {
  "include": ["/", "/all-tools", "/image-tools", "/pdf-tools"],
  "source": "dist",
  "puppeteerArgs": ["--no-sandbox"]
}
```

Start with the homepage, the category hubs, the ten highest-traffic tool pages and the blog index. The
tail can keep rendering client-side while you rewrite it.

### Option C — move the marketing surface to Next.js

Keep the Vite app for the tools and serve the homepage, hubs, tool landing pages and blog from a
Next.js App Router project with `generateMetadata` and `generateStaticParams`. Highest effort, best
long-term result, and it makes the sitemap and canonical handling automatic.

## Step 3 — verify

```bash
# body text before JavaScript runs
curl -s https://multitoolsa.com/image-compression | sed 's/<[^>]*>/ /g' | wc -w   # expect > 300

# real 404 status
curl -s -o /dev/null -w "%{http_code}\n" https://multitoolsa.com/does-not-exist   # expect 404

# unique HTML per URL
for u in / /image-compression /compress-pdf; do
  curl -s "https://multitoolsa.com$u" | md5sum
done   # expect three different hashes
```

Then in Search Console: **Pages → Not found (404)** should stay near zero for real pages, and
**Crawled – currently not indexed** should start dropping for the rewritten URLs.

# 301 the mirror domain to multitoolsa.com

## Problem

Both domains answer 200 with the same application:

```
https://multitoolsa.com                      -> 200
https://multitoolsa.sudhiryadav7.com.np      -> 200
```

Google can pick either host for any given page. Every link, ranking signal and crawl budget is split,
and an AdSense reviewer looking at the site can find two identical copies.

## Fix (Cloudflare — recommended)

1. Open the Cloudflare dashboard for the zone that serves `sudhiryadav7.com.np`.
2. Go to **Rules → Redirect Rules → Create rule**.
3. Configure:
   - **Rule name:** `multitoolsa mirror → primary`
   - **When incoming requests match:** Custom filter expression
     - Field: `Hostname` · Operator: `equals` · Value: `multitoolsa.sudhiryadav7.com.np`
   - **Then:** Redirect
     - **Type:** Static
     - **URL:** `https://multitoolsa.com` — use **Dynamic** with expression
       `concat("https://multitoolsa.com", http.request.uri.path)` to preserve the path and query string
     - **Status code:** `301`
     - **Preserve query string:** enabled
4. Save and deploy, then verify:

```bash
curl -sI https://multitoolsa.sudhiryadav7.com.np/compress-pdf | head -5
# expect: HTTP/2 301
# expect: location: https://multitoolsa.com/compress-pdf
```

## Alternative (Hostinger / Apache)

`.htaccess` in the document root of the subdomain:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^multitoolsa\.sudhiryadav7\.com\.np$ [NC]
RewriteRule ^(.*)$ https://multitoolsa.com/$1 [R=301,L]
```

## Alternative (Netlify `_redirects`)

Already present in `public/_redirects`; add:

```
https://multitoolsa.sudhiryadav7.com.np/*  https://multitoolsa.com/:splat  301!
```

## After the redirect

- Keep one canonical host in `index.html` (`og:url`, canonical, sitemap) — already `multitoolsa.com`.
- In Search Console, verify **only** `multitoolsa.com` and submit the sitemap there.
- If the mirror is verified too, use **Settings → Change of address** on the mirror property.
- Re-run the crawl in the RankForge workspace: the mirror should report a 301, not 200.

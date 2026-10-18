// 10 additional unique blog articles — distinct topics, no overlap with existing posts.

export const extra2BlogContent: Record<string, string> = {
  "svg-optimization-2026-svgo-inline-best-practices": `
## SVG Is Not Free Bandwidth Just Because It Is Vector

The myth that SVG is automatically the lightweight choice has held up well past its expiry date. A single icon exported from Figma routinely ships with 1.4 KB of metadata for what should be a 180-byte path. Multiply that across a 60-icon design system and you have shipped a whole AVIF photo of unread XML to every visitor. In 2026 SVG optimization is less about shaving bytes and more about deciding where each glyph belongs in the request waterfall.

## What Designers Export Versus What Browsers Need

Figma, Sketch, Illustrator, and Affinity Designer all emit SVG with editor-state metadata: layer names, group transforms, hidden bounding boxes, application identifiers, and CSS classes that exist only inside the source file. None of this affects rendering. Most of it cannot even be reached by a stylesheet on the deployed site. Stripping it removes 40 to 70 percent of the file in a single pass.

The other quiet bloat is float precision. Vector editors round coordinates to six decimal places, producing path strings like \`M 132.847291 99.0000031\` when \`M 132.85 99\` is visually identical at every reasonable zoom level. Trimming to two decimals shaves another 15 to 25 percent.

## SVGO Is Still The Default, But Tune The Plugins

SVGO remains the canonical optimizer in 2026, now at version 4 with a default config that is more conservative than version 2 was. The conservative defaults exist because a few aggressive plugins broke real-world icons — particularly anything using \`mask\`, \`filter\`, or animated \`SMIL\`. The right move is not to skip SVGO but to opt out of two specific plugins per project: \`removeViewBox\` (never remove the viewBox unless every consumer hard-codes width and height) and \`mergePaths\` (can collapse a multi-color icon into a single black blob).

A pragmatic 2026 SVGO config is six lines:

\`\`\`json
{
  "multipass": true,
  "plugins": [
    { "name": "preset-default",
      "params": { "overrides": { "removeViewBox": false } } },
    "removeDimensions"
  ]
}
\`\`\`

\`removeDimensions\` strips fixed \`width\` and \`height\` so the icon scales fluidly inside its CSS container — the most common mistake in icon systems is shipping 24x24 hard-coded sizes and then wondering why the icon refuses to grow at 32 px.

## Inline Versus External: A Decision Matrix, Not A Rule

The "always inline SVG" advice from 2017 is wrong in 2026. The decision is now driven by three questions:

1. Is the icon reused on more than three pages? Yes → \`<img>\` reference. The browser caches it once; subsequent pages get a 304 with no parse cost.
2. Does the icon need to inherit \`currentColor\`, respond to hover, or animate? Yes → inline SVG in the HTML or as a React component. \`<img>\` cannot reach internal paths.
3. Is the icon part of an interactive component (a chart, a logo with hover state)? Yes → inline.

A typical app ends up with both. UI icons stay inline. Marketing illustrations, brand logos in the footer, and reused empty states go through \`<img>\`.

## The SVG Sprite Pattern That Still Works

Sprites — one combined SVG file with multiple \`<symbol>\` elements referenced by \`<use href="#icon-name">\` — fell out of fashion when developers conflated them with PNG sprites. They are still excellent for icon-heavy interfaces because the browser parses the sprite once and instances each reference, which keeps the DOM smaller than 200 inline copies of the same path.

The 2026 caveat: \`<use href="sprite.svg#icon-name">\` (external reference, no fragment in the same document) still cannot inherit \`currentColor\` reliably in Safari without a polyfill. If the design needs theming, inline the sprite into the HTML once at the top of \`<body>\` and reference fragments from there.

## Server Compression Is Not Optional

Plain SVG is XML. XML compresses brilliantly with gzip and brutally with Brotli. A 12 KB optimized SVG becomes 2.8 KB over Brotli. If a CDN is serving uncompressed SVGs — and many image CDNs do, because they were built for raster pipelines — file size triples. Audit response headers: \`content-encoding: br\` or \`content-encoding: gzip\` must be present on every \`image/svg+xml\` response.

## Accessibility Lives In Two Attributes

A non-decorative inline SVG needs a \`<title>\` element as the first child plus \`role="img"\` and \`aria-labelledby\` pointing to that title's id. A decorative inline SVG needs \`aria-hidden="true"\` and \`focusable="false"\`. Missing the second pair leaves the icon focusable on tab in older Edge builds; missing the first leaves screen-reader users hearing "graphic" with no context.

## A Realistic Audit Routine

Run a one-off pipeline on every commit that touches \`*.svg\`: SVGO with the project config, then a script that fails the build if any single SVG is over 4 KB after optimization. Four kilobytes is the threshold where SVG stops being cheaper than a corresponding WebP, and anything over it deserves a manual look. Most overruns turn out to be raster images that someone embedded as base64 inside an SVG wrapper — convert to WebP, delete the wrapper, save 80 percent.

## Bottom Line

SVG is still the right format for icons, line illustrations, and anything that needs to scale or theme. The cost is that "right format" only holds when the file is properly optimized, properly compressed at the edge, and properly referenced based on its reuse pattern. Skip any of those three and a 600-byte icon becomes a 14 KB liability.
`,

  "best-image-format-for-screenshots-2026": `
## Default Operating-System Screenshots Are A Storage Disaster

Press the screenshot shortcut on a modern Mac or Windows machine and you get a PNG. That PNG is between 1.5 MB and 6 MB for a single 1440p capture. PNG is lossless, which sounds good, but a screenshot of text, UI chrome, and flat color regions is exactly the wrong content for a format that was designed to preserve photographic detail. In 2026 the right format for screenshots is almost never the one the OS defaults to.

## Why PNG Bloats Screenshots Specifically

PNG uses DEFLATE compression on a per-row basis. It excels at long runs of identical pixels — diagrams, icons, illustrations. It struggles with high-frequency content like subpixel-rendered text, where every pixel along an antialiased edge is slightly different from its neighbor. A 2560x1440 screenshot of an IDE has about three million pixels and roughly two million of them sit on antialiased glyph edges. PNG cannot compress that efficiently because each pixel is genuinely unique.

The fix is not to switch PNG settings. The fix is to switch formats for the content type.

## The 2026 Format Hierarchy For Screenshots

For a 1440p screenshot of a typical software UI:

- **AVIF lossless**: 180 to 280 KB. Best compression, parsing is slow on older devices, encoders are now stable.
- **WebP lossless**: 240 to 360 KB. Excellent compression, universal modern support, encodes quickly.
- **PNG with pngquant**: 450 to 800 KB. Quantizes to a 256-color palette; visually identical to the original for UI screenshots, terrible for gradients.
- **PNG default**: 1.5 to 6 MB. The baseline you are escaping.
- **JPEG at q90**: 220 to 400 KB but with visible artifacts around text. Wrong choice for documentation.

The order changes for screenshots that contain photos (e.g., a website screenshot showing a hero image): AVIF lossy at q70 will beat AVIF lossless by 4x with no visible difference.

## Why JPEG Loses For UI Screenshots Even At High Quality

JPEG uses 8x8 discrete cosine transform blocks. Sharp transitions — exactly what text edges are — produce ringing artifacts that appear as a faint halo around every character. At q90 most readers will not notice on a phone. At q90 a developer reading the screenshot at 100 percent zoom on a 27-inch monitor absolutely will. For documentation that ages well, JPEG is the wrong choice for any screenshot containing text.

## The Annotated Screenshot Problem

The moment you draw an arrow, highlight a region, or add a callout, the screenshot changes character. The base capture is high-frequency UI; the annotations are flat solid color. PNG actually does fairly well here because the annotation regions compress to a few bytes each. WebP lossless still wins, but the gap narrows to 1.4x rather than 5x.

If the annotations are vector — drawn in a SVG layer composited over the raster — keep them as a separate SVG overlaid in HTML rather than baking them into the raster. The raster compresses better without the high-contrast overlays, and the SVG annotations scale crisp at any zoom level.

## A Real Workflow For Documentation Screenshots

1. Capture at native device resolution. Do not downscale at capture time — that destroys text clarity.
2. Crop to the smallest region that conveys the point. The single most effective optimization is shipping fewer pixels.
3. Encode to WebP lossless with \`cwebp -lossless -z 9 input.png -o output.webp\`. The \`-z 9\` flag asks for maximum effort; encode time goes up, file size goes down 15 percent versus \`-z 6\`.
4. If the screenshot contains photographic regions, switch to AVIF lossy at q65 with \`avifenc -q 65 input.png output.avif\`.
5. Ship both formats with a \`<picture>\` element falling back to PNG-quantized for Safari versions before AVIF support stabilized.

## What About HEIC?

Apple's screenshot app can be configured to save HEIC. HEIC compresses screenshots roughly as well as AVIF, but browser support outside Safari is poor and most documentation platforms strip or refuse HEIC uploads. It is not a portable choice for shared screenshots in 2026.

## The 1-Second Rule For Documentation

A screenshot in product documentation is read for one to three seconds on average. If decoding plus rendering takes longer than the read time, the reader has already scrolled past. AVIF decoding on older Android phones can hit 400 ms for a 1440p screenshot. WebP lossless decodes in roughly 60 ms on the same hardware. For documentation specifically, decode speed is a stronger argument than the last 30 KB of compression — WebP lossless is the safe default until AVIF hardware decoding becomes universal.

## Bottom Line

Stop shipping default PNG screenshots in 2026. WebP lossless replaces the format with no visible quality loss at one-quarter the size. Reserve AVIF for screenshots heavy with photographic content. Reserve PNG only for diagrams with large flat color regions, and even then run them through pngquant before shipping.
`,

  "image-dithering-retro-aesthetic-web-2026": `
## Dithering Is The Most Underrated Image Technique On The Modern Web

Dithering — deliberately introducing a structured noise pattern to simulate more colors than the palette actually contains — was invented for hardware that could display 16 or 256 colors. In 2026, with displays that show a billion colors and graphics pipelines that no longer need the trick, dithering has quietly returned. Not for color limits. For file size, for aesthetic, and for an emerging accessibility use case nobody saw coming.

## How Dithering Became Stylish Again

The retro aesthetic moved from games to web design somewhere around 2022. Sites for indie zines, niche fonts, and small studios started shipping deliberately-dithered hero images. The visual effect is unmistakable: a photograph reduced to a 16-color palette with Floyd-Steinberg error diffusion looks like it was lifted from a 1996 magazine cover. Crucially, this style cannot be replicated by a CSS filter — the noise pattern needs to be baked into the pixel data.

The byproduct is dramatic file size reduction. A 1280x720 photo at full color is around 180 KB as WebP. The same image dithered to a 16-color palette and saved as PNG-8 is 38 KB. Aesthetics and performance moving in the same direction is rare; this is one of those moments.

## The Three Dithering Algorithms You Need To Know

**Floyd-Steinberg** is the default. It distributes quantization error to the right and downward neighbors of each pixel. The result is a smooth, organic noise pattern. Almost every image editor uses it as the default for "convert to indexed color."

**Atkinson** is Apple's variant from the original Macintosh, distributing only three-quarters of the error to a wider neighborhood. The result is higher contrast, more visible grain, and a distinctly classic-Mac look.

**Ordered (Bayer) dithering** uses a fixed threshold matrix rather than calculating per-pixel error. The result is the rigid checkerboard pattern of early video games and pre-LCD calculator screens. Crisp, structured, instantly recognizable as "retro."

For modern web aesthetic work, ordered dithering is usually the right pick — it scales without artifacts under CSS \`image-rendering: pixelated\` and it looks coherent at any size.

## Doing This In The Browser, Not Photoshop

For one-off hero images, an image editor with "convert to indexed color" plus a dither setting is faster. For dynamic content — user uploads, generated graphics, theming — the browser handles dithering through Canvas in about thirty lines.

The recipe: draw the source image to a hidden Canvas, walk the pixel buffer, snap each RGB value to the nearest palette entry, and propagate the rounding error to neighboring pixels. The performance cost is roughly 8 ms for a 1024x1024 image on a 2023 mid-range phone, which is comfortable for non-real-time use.

Several lightweight libraries (\`image-q\`, \`dithering.js\`) wrap this. The browser-native approach has the advantage of zero dependencies and total control over the palette.

## The Accessibility Use Case Nobody Predicted

Photosensitive epilepsy guidelines flag any image with high-contrast flicker — moiré patterns from fine grids, for example. A counterintuitive finding from 2024 user research: aggressive ordered dithering, applied to background photographs, reduces the visual fatigue some users report from full-color busy hero images. The dithered version, being lower in chromatic complexity, is genuinely easier on the eye for some users with sensory sensitivity disorders.

This does not generalize. It is not a replacement for honoring \`prefers-reduced-motion\`. But it is one more reason an aesthetic choice and an accessibility choice can align.

## When Dithering Is The Wrong Move

Dithering destroys photographic detail. It is the wrong technique for product photography in e-commerce, for portrait galleries, for art reproduction, for any image where the visual story is "look at this thing exactly as it is." Use it for stylized hero art, background textures, decorative illustration, and brand-driven retro aesthetic. Do not use it for content where fidelity matters.

It is also the wrong technique for icons. Vector formats already solve the small-file-color-aware problem. Dithering an SVG-shaped subject defeats the point of vectors.

## File Size And Format Pairings

Dithered images pair best with PNG-8 (the indexed-color variant). PNG-8 with a 16-color palette can compress a dithered 1280x720 hero image to 25–45 KB. WebP lossless will sometimes do better, sometimes worse, depending on the algorithm. AVIF generally underperforms on indexed-color images because its compression assumes continuous-tone content.

If the dithered image is small enough — under 8 KB after PNG-8 — inlining it as a base64 data URL eliminates a network round-trip for above-the-fold hero art.

## Bottom Line

Dithering is no longer a workaround for limited hardware. It is a current-day aesthetic and performance choice with measurable file-size wins, a recognizable visual identity, and an unexpected accessibility upside for some users. Spend an hour experimenting with Floyd-Steinberg, Atkinson, and Bayer on a stock photograph and the technique stops being theoretical.
`,

  "cls-image-font-loading-shifts-2026": `
## Layout Shift Is Almost Always Two Bugs Pretending To Be One

Cumulative Layout Shift, the third of the Core Web Vitals, is most often blamed on images. Reality in 2026: about half of CLS regressions come from web fonts, not images, and the interaction between the two is what makes layout shift feel impossible to fix. Solving CLS means solving them together.

## The Two Independent Causes Of Shift

**Images shift the layout** when the browser does not know the dimensions of an image until it loads. The browser collapses the empty space to zero, then expands it when the bytes arrive, and every element below the image jumps down by the image height. The fix has been stable since 2020: explicit \`width\` and \`height\` attributes plus \`aspect-ratio\` in CSS for fluid layouts.

**Fonts shift the layout** when the browser swaps a fallback system font for the loaded custom font and the two fonts have different glyph metrics. A heading that occupied two lines in Arial may collapse to one line in Inter. Every block below the heading jumps up by the line height. CLS is recorded as a fraction of the viewport that moved, weighted by movement distance.

The two interact: a layout with a header image followed by a hero heading will record CLS twice — once when the image loads, once when the font swaps. The image fix is independent of the font fix, which is why teams routinely solve one and miss the other.

## The 2026 Image CLS Fix Is Three Lines

\`\`\`html
<img
  src="hero.webp"
  width="1280"
  height="720"
  style="width: 100%; height: auto;"
  alt="..."
/>
\`\`\`

The \`width\` and \`height\` attributes are not for sizing — they declare the aspect ratio. The CSS overrides the visual size while preserving the ratio. Modern browsers derive an implicit \`aspect-ratio\` from these attributes, so the box is reserved at first layout. No shift.

For images whose dimensions are not known at render time (user uploads displayed in a feed, for example), wrap them in a container with a CSS \`aspect-ratio\` matching the expected ratio. If the actual image differs, you take a one-time scale adjustment rather than a full shift.

## The Font CLS Fix Is The size-adjust Descriptor

\`\`\`css
@font-face {
  font-family: "Inter";
  src: url("inter.woff2") format("woff2");
  font-display: swap;
  size-adjust: 102.3%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
\`\`\`

The \`size-adjust\` and \`*-override\` descriptors let you scale and reposition the fallback font so its metrics match the loaded font. When the swap happens, the box dimensions do not change. CLS is zero for the font.

Calculating the right values manually is painful. The Capsize tool (npm: \`@capsizecss/core\`) does the math from font metrics. Run it once per font pair, paste the numbers, ship. The change in CLS is dramatic — sites that scored 0.15 (failing) routinely drop to 0.02 after a single font.

## What font-display: swap Actually Costs

\`font-display: swap\` shows fallback text immediately, then swaps when the custom font loads. Without metric overrides, the swap causes shift. With \`font-display: block\` the browser hides text for up to 3 seconds, then shows fallback if the font has not loaded, with a later swap. \`block\` trades visible text time for layout stability — usually the wrong trade in 2026.

The good combo in 2026: \`font-display: swap\` plus matched fallback metrics. Visible text immediately, no shift on swap. The bad combo most teams ship: \`font-display: swap\` without overrides, which is the source of half the CLS in the wild.

## The Hidden Cause: Late-Loaded Web Components

Frameworks that hydrate after JavaScript loads — common with islands architectures and certain React 19 patterns — can render a server-side placeholder and then replace it with a client-rendered component of slightly different size. The shift is small per component but accumulates across a page with twenty interactive widgets. The fix is to render the server placeholder at the exact size of the final component, which means measuring the hydrated version once and hard-coding dimensions on the placeholder.

## The Practical Audit

Open a typical product page in Chrome DevTools, switch to the Performance panel, record a load. The CLS row shows every layout shift with the responsible element highlighted. Most pages have between 3 and 8 individual shifts. Classify each:

- "Image loaded, expanded" → add \`width\`/\`height\` attributes.
- "Font swapped, lines reflowed" → add \`size-adjust\` to that \`@font-face\` block.
- "Component hydrated" → match SSR placeholder to client size.
- "Ad slot expanded" → reserve the slot with min-height (do not lie to the ad server about size).

Fixing the top three usually drops CLS below the 0.1 threshold. The remaining 0.05 of slack covers everything else.

## Bottom Line

CLS is a two-front problem. The image fix is well known; the font fix is not. Teams that solve only images watch their CLS hover around 0.15 forever. Teams that solve both ship CLS under 0.05 and stop thinking about layout shift as an ongoing concern.
`,

  "ai-content-credentials-c2pa-image-watermarks-2026": `
## The Invisible Watermark Standard You Will Have To Care About In 2026

The Coalition for Content Provenance and Authenticity (C2PA) shipped its 2.0 specification in 2024, and by 2026 it has moved from research project to platform requirement. Adobe, Microsoft, OpenAI, Leica, and the major news agencies now publish content-credential metadata by default. Several jurisdictions — the European Union under the AI Act, Australia, and California — require disclosure of AI-generated images in commercial contexts. The mechanism most regulators point at is C2PA.

If your site publishes images you generated, edited, or republished, C2PA is moving from optional to expected within the next eighteen months. Here is what it actually does, how it works mechanically, and how to integrate it without breaking your pipeline.

## What Content Credentials Are, Concretely

A content credential is a JSON-LD manifest embedded in an image file, cryptographically signed by an issuer. The manifest describes the image's history: which device captured it, which software edited it, whether AI was involved, when and where modifications happened. The signature is verifiable against the issuer's public key, so a viewer can confirm the manifest has not been tampered with.

The manifest lives in the image file's metadata — JUMBF boxes in JPEG, XMP packets in TIFF, item properties in HEIF. Strip the metadata, you strip the credential. C2PA is not steganographic; it does not survive a screenshot. The complementary defense is soft binding (visual fingerprinting that survives transcoding), which the spec also describes, but soft binding requires a database lookup rather than a self-contained signature.

## What This Means For Image Pipelines

Three concrete things change.

**One: image optimization tools can destroy credentials.** Most CDNs and image transformers strip metadata aggressively to reduce file size. A 2 KB content credential is worth keeping; a 30 KB color profile may not be. The pipeline needs a metadata allow-list rather than the current strip-everything default.

**Two: re-encoding breaks chains of custody.** If you receive a credentialed image and re-encode it (e.g., convert WebP to AVIF on the fly), the new file has no credential because no entity signed the re-encoded version. The right move is to sign the new derivative yourself, declaring "I am Convert, I transformed this image from format X to format Y at timestamp T." Tooling for this is now stable: the \`c2pa-rs\` Rust library and its Node bindings handle the signing.

**Three: trust UI is now a thing.** When users hover an image with credentials, they expect a small "CR" badge that opens an inspector. Adobe ships an open-source web component (\`<cai-icon>\` and \`<cai-popover>\`) that handles this end to end. Skipping the UI does not break anything technically, but in regulated regions it may shift legal risk onto the publisher rather than the platform.

## Generating Credentials For AI Images

For AI-generated images, the standard mandates a "trained-algorithmic-media" assertion in the manifest. The assertion declares: this image was produced by an AI model. Optionally it records the model name, the prompt (if the publisher wants it surfaced), and the input images for img2img workflows.

If your app generates images via an upstream provider that already signs them — OpenAI's gpt-image-2, Adobe Firefly, Google's Imagen — the credentials arrive embedded in the output bytes. Preserve them. If your app generates images locally (browser-side diffusion, for instance) you need to sign them yourself or accept that they will be marked "unsigned origin" by C2PA inspectors.

## The Quiet Privacy Trade-Off

A content credential reveals which software was used. For news photographers this is the point — provenance proves the image was not synthetic. For independent creators it can reveal more than intended: the specific camera body, the editing app, the GPS coordinates if location metadata was preserved upstream. Publishers should give users an opt-out or an "anonymized credential" path that signs the AI/edited status but strips identifying device information.

## Verifying Credentials On A Web Page

The verification logic is small. Decode the manifest from the file bytes, fetch the issuer's certificate from the embedded URL or a trusted root, verify the signature. Adobe's \`c2pa-js\` library does this client-side in about 60 KB of WASM. For server-side verification (preferred for content moderation pipelines), the Rust library is faster and exposes the same API.

The performance cost: 8 to 15 ms per image on a modern laptop, dominated by signature verification. Cache verified manifests by image hash to avoid re-verifying the same upload across requests.

## What Happens When Credentials Are Missing

Missing credentials do not currently invalidate an image. In 2026 they signal "provenance unknown." Browsers and social platforms will likely escalate this in the next two years — Meta and TikTok have both announced that uncredentialed images will be labeled in the UI by late 2026. Sites that publish original photography and AI-generated content benefit from adopting credentials now rather than retrofitting them under a deadline.

## Bottom Line

Content credentials are no longer optional for publishers operating in regulated regions or working with major-platform partners. The technical lift is moderate — preserve metadata in your image pipeline, sign derivatives you generate, surface a small trust UI — and the trajectory is clear. Treat C2PA in 2026 the way you treated HTTPS in 2016: not yet mandatory everywhere, obviously mandatory in retrospect, much easier to adopt before a deadline than after one.
`,

  "image-sprites-2026-still-useful": `
## A Technique From 2009 That Refuses To Die

Image sprites — packing many small images into a single file and referencing each one with a background offset — were a 2009 solution to a 2009 problem: every HTTP/1.1 request paid a 100-millisecond TCP round trip, and a page with 60 icons paid that cost 60 times. HTTP/2 multiplexed requests over a single connection, HTTP/3 added zero-RTT resumption, and the sprite technique was widely declared obsolete.

In 2026 sprites are still in production at every major site you have heard of. They did not survive on nostalgia. They survived because the calculation that killed them assumed three things that turned out to be wrong.

## The Three Assumptions That Did Not Hold

**Assumption one: HTTP/2 eliminated the connection cost.** Mostly true, but only when all sixty icons live on the same origin. As soon as icons come from a CDN subdomain, an asset host, or a third-party widget, you pay a fresh TLS handshake. Sprites still win when assets cross origins.

**Assumption two: each image is cached individually, so a sprite forces re-download of unchanged icons when one changes.** True for raster sprites, false for the modern variant. SVG sprites with hash-named atoms (\`icon-search-7a3f2b.svg#search\`) get the same per-fragment cacheability as separate files, with a single fetch for the whole bundle.

**Assumption three: small images compress fine individually.** True for raster, untrue for icons specifically. A standalone 80-byte SVG path ships with 200 bytes of XML overhead (\`<?xml...\`, \`<svg...\`, attributes, closing tags). Bundle 60 such icons into one sprite and the overhead is paid once, not sixty times. Total bytes shipped drops by roughly 40 percent.

## The Modern Sprite: SVG Symbol Bundle

The 2026 default is not the old PNG sprite. It is a single SVG file containing one \`<symbol>\` per icon, referenced from HTML with \`<svg><use href="sprite.svg#icon-search"/></svg>\`.

\`\`\`xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-search" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
  <symbol id="icon-menu" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
</svg>
\`\`\`

The browser parses the sprite once, caches it, and renders each \`<use>\` reference as a live instance. Updating a single icon means editing the sprite, and the cache invalidates by changing the filename hash. Total memory cost is independent of how many \`<use>\` references the page contains.

## When Sprites Still Lose

Sprites lose when:

- The site uses code-splitting and ships an icon-set bundle per route. Each route's bundle is naturally a sprite anyway; an explicit sprite step adds tooling for marginal benefit.
- Icons are loaded on demand (lazy-loaded panels, modals). A sprite forces eager loading of icons the user may never see.
- The design language is colorful and themed per icon — sprites work best with monochrome icons inheriting \`currentColor\`.

For the common case — a UI library with 80 to 200 line icons used across most pages — sprites are unambiguously the right choice in 2026.

## The Build Tooling Has Matured

Manually maintaining a sprite is tedious. Three tools dominate:

- **svg-sprite** (Node, CLI): standalone, plugin-driven, handles multiple sprite types (symbol, view, defs, stack). Used by Yandex, GitHub's icon system, and most large design systems.
- **vite-plugin-svg-icons**: drop-in for Vite projects, watches your icon directory, regenerates on save, exposes the sprite via a virtual module.
- **icon font fallbacks**: still relevant for legacy Windows browsers and email contexts; the build step generates both a sprite and a webfont from the same source.

For Vite-based projects (Lovable, Next.js, Astro), \`vite-plugin-svg-icons\` is the lowest-friction option. Drop SVGs in a folder, import the sprite once at the app root, reference icons by id throughout the app.

## A Note On The PNG Sprite

Raster sprites — the 2009 original — still appear in older codebases and a few specific contexts: pixel-perfect game UI, screensaver-style retro design, and email signature blocks where SVG is unreliable. For everything else, a raster sprite in 2026 is a code smell. WebP and AVIF compress individual small images well enough that the sprite optimization is not worth the maintenance cost for raster content.

## Performance Numbers, Roughly

A typical SaaS dashboard with 60 icons across the UI ships:

- Individual SVG files: 18–24 KB total (with HTTP/2 overhead), 60 cache entries.
- SVG sprite: 11–14 KB total, 1 cache entry, slightly faster first paint due to single fetch.
- Inline SVG in every component: 15–20 KB inlined into HTML per page, 0 cache benefit across pages.

The sprite wins on bytes, requests, and cache efficiency. The inline-per-component approach is only better if components are aggressively code-split and most users never see the icon-heavy pages.

## Bottom Line

Sprites did not die. The PNG variant did, the SVG variant grew up. For any site shipping more than 20 reusable icons, an SVG symbol sprite remains the most efficient delivery mechanism in 2026, with mature tooling and excellent cacheability. The "sprites are obsolete" narrative was correct about the wrong sprite.
`,

  "device-pixel-ratio-image-quality-strategy-2026": `
## Device Pixel Ratio Has Quietly Become The Hardest Problem In Image Delivery

The first iPhone with a Retina display shipped in 2010. Sixteen years later, device pixel ratio (DPR) is still the variable that defeats most image-optimization plans. Ship 1x and your image looks soft on every modern phone. Ship 3x to everyone and a desktop user on a 1x monitor downloads nine times the pixels their screen can display. The right answer in 2026 looks different than the right answer in 2018.

## What DPR Actually Reports

The \`window.devicePixelRatio\` property returns the ratio between physical screen pixels and CSS pixels. A "Retina" iPhone reports 3. A standard MacBook Air reports 2. A standard desktop monitor reports 1. A budget Android phone might report 1.5 or 2.625 — fractional values are legal and increasingly common.

The browser uses this ratio when picking from a \`srcset\` to decide which file to download. If you ship \`hero.jpg 1x, hero@2x.jpg 2x, hero@3x.jpg 3x\` and the user has DPR 2, the browser picks the 2x file. Simple in theory.

## Why The Simple Approach Fails In Practice

Three things break the simple model.

**One: the bandwidth tax is brutal.** Going from 1x to 3x is a 9x increase in pixels. Even with compression, the bytes shipped roughly triple. On a flagship phone with great optics, the user notices the sharpness. On a budget phone with a smaller, lower-quality lens, the sharpness is masked by display limitations and the user just pays for slower loading.

**Two: connection quality varies wildly per device.** A high-DPR phone on a poor connection is the worst combination — you ship the largest file to a context that handles it worst. The \`navigator.connection\` API is now widely available and exposes \`effectiveType\` (\`4g\`, \`3g\`, \`2g\`, \`slow-2g\`) and \`saveData\`. Skipping the 3x asset on \`save-data\` or \`3g\` connections often results in better perceived performance than the high-DPR version would deliver.

**Three: encoder quality changes the math.** AVIF at quality 60 on a 2x asset is visually indistinguishable from AVIF at quality 75 on a 1x asset, at roughly the same file size. Encoding strategy matters as much as resolution selection.

## The 2026 Strategy: Quality-Adjusted DPR

The technique most production sites have converged on: ship fewer DPR variants but vary quality inversely with DPR.

\`\`\`html
<img
  srcset="
    hero-1x-q85.avif 1x,
    hero-2x-q70.avif 2x,
    hero-3x-q60.avif 3x
  "
  src="hero-1x-q85.avif"
  alt="..."
/>
\`\`\`

The 1x variant is encoded at high quality because every pixel is visible. The 2x variant uses lower quality because the supersampling masks compression artifacts. The 3x variant uses aggressively low quality for the same reason. Total bytes shipped across DPRs becomes more uniform — 3x is no longer triple the cost of 1x, just 30 to 50 percent more.

## The Cap At 2x

For most content the visible benefit of 3x over 2x is small enough that capping at 2x is defensible. Phone displays do resolve 3x, but the viewing distance and the limits of human visual acuity mean the perceived improvement is marginal for content shown at typical sizes. The bandwidth saved by capping at 2x almost always outweighs the perceived sharpness gained at 3x.

The exception is photography sites, art portfolios, and high-detail product imagery (jewelry, watches, fabric textures), where 3x materially improves the viewing experience and the audience expects to pay the bandwidth cost.

## Per-Image DPR Decisions

A single site rarely has one DPR strategy. A reasonable split:

- **Hero images**: 2x cap, AVIF at q70 for 2x, q85 for 1x. These are the LCP candidates and benefit from quality tuning.
- **Inline article images**: 2x with q65. Below the fold, decoded lazily, smaller display sizes hide compression.
- **Avatars and thumbnails**: 2x with q60. Tiny display sizes (32–96 px) mean the human eye cannot resolve much detail anyway.
- **Background decoration**: 1x only. Decorative content does not justify high-DPR cost.
- **Photography portfolio**: 3x for galleries, q70 across all DPRs.

## What \`save-data\` Should Actually Do

When the browser sends the \`Save-Data: on\` header — set by the user explicitly or by certain mobile data savers — the server should serve the 1x variant regardless of the requesting device's DPR. The user has signaled "I prefer smaller files over higher quality." Most sites still ignore this header. Honoring it is a few lines in the CDN config and visibly improves load time for users on data caps.

## The Tooling

Image CDNs (Cloudflare Images, Imgix, Cloudinary, Bunny) handle DPR variants automatically when given a base image — request \`hero.jpg?dpr=2\` and they serve a properly sized version. For self-hosted setups, \`sharp\` in a Node build step or \`vite-imagetools\` for Vite projects generates DPR variants at build time.

The pattern is now standard enough that hand-rolling DPR logic is rarely the right move. Pick a CDN or a build tool, configure it once, focus engineering time elsewhere.

## Bottom Line

DPR is a multiplier on every other image decision. Treating it as orthogonal — picking quality, format, and DPR independently — produces files that are 2x too large or 2x too soft for the actual viewing context. The 2026 strategy is to tune quality inversely with DPR, cap at 2x for most content, honor \`save-data\`, and let a CDN or build tool handle the per-variant generation. Sites that follow this approach ship 30 to 50 percent fewer image bytes with no perceptible quality regression.
`,

  "image-proxy-ssrf-security-2026": `
## Every Image Proxy Is A Potential SSRF Hole

If your app fetches images from arbitrary user-provided URLs — for a link preview, an avatar from a remote URL, an Open Graph image, anything where the input is "the URL of an image" — you have built an image proxy. If you built it without specific defenses, you have probably built a Server-Side Request Forgery (SSRF) vulnerability. SSRF is the second-most-exploited web vulnerability in 2026 according to OWASP. The image proxy is its single most common appearance.

## What An Attacker Can Reach Through Your Proxy

When your server fetches a URL on behalf of a user, it runs the request from inside your network. That means the user can ask your server to fetch URLs the user cannot reach directly:

- **Cloud metadata endpoints**: \`http://169.254.169.254/latest/meta-data/iam/security-credentials/\` on AWS, \`http://metadata.google.internal/computeMetadata/v1/\` on GCP. These return the running instance's IAM credentials.
- **Internal services**: \`http://internal-admin.your-vpc.local/users/delete-all\`. Anything reachable from your network perimeter is reachable from the proxy.
- **Loopback services**: \`http://127.0.0.1:9090/\` to reach the Redis admin UI you have running on that port without auth because it is "only on localhost."
- **File schemes**: \`file:///etc/passwd\` if the HTTP client follows file URLs (most do not, but enough do to make this an active threat).

A naive image proxy that does \`fetch(userProvidedUrl)\` and streams the response back is a credential exfiltration tool waiting to be discovered.

## The Three-Layer Defense That Actually Works

**Layer one: protocol allow-list.** Only \`http://\` and \`https://\` URLs proceed. No \`file://\`, \`gopher://\`, \`data://\`, \`ftp://\`. The check is one line; skipping it is one of the most common SSRF root causes.

**Layer two: DNS resolution and IP allow-list.** Resolve the hostname to an IP before fetching. Reject if the IP is in any reserved range: \`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\`, \`127.0.0.0/8\`, \`169.254.0.0/16\`, \`::1\`, link-local IPv6 (\`fe80::/10\`), and the unique local address range (\`fc00::/7\`). The Node package \`ipaddr.js\` makes this two lines.

**Layer three: post-redirect re-validation.** This is the layer most teams miss. Your code validates the original URL, fetches it, and the response is a 302 redirect to \`http://169.254.169.254/\`. The HTTP client transparently follows the redirect, the second request hits the metadata endpoint, and the response streams back to the attacker. Disable automatic redirect-following and re-validate every redirect target through the same IP allow-list before manually following.

## A Working Pattern

\`\`\`ts
import { lookup } from "dns/promises";
import ipaddr from "ipaddr.js";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
const MAX_REDIRECTS = 3;

async function validateAndResolve(rawUrl: string) {
  const url = new URL(rawUrl);
  if (!ALLOWED_PROTOCOLS.has(url.protocol)) throw new Error("protocol");
  const { address } = await lookup(url.hostname);
  const parsed = ipaddr.parse(address);
  const range = parsed.range();
  if (range !== "unicast") throw new Error("ip-range");
  return { url, ip: address };
}

export async function proxyImage(rawUrl: string) {
  let current = rawUrl;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const { url, ip } = await validateAndResolve(current);
    const res = await fetch(url, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      current = new URL(res.headers.get("location")!, url).toString();
      continue;
    }
    if (!res.headers.get("content-type")?.startsWith("image/")) throw new Error("mime");
    const contentLength = Number(res.headers.get("content-length"));
    if (contentLength > MAX_RESPONSE_BYTES) throw new Error("size");
    return res.body;
  }
  throw new Error("redirect-loop");
}
\`\`\`

The pattern: validate, fetch with manual redirects, check the response MIME and size, re-validate any redirect target, give up after a small number of hops.

## The Race Condition Almost Everyone Misses

\`validateAndResolve\` looks up the IP. Your \`fetch\` call then resolves the hostname again separately. An attacker can configure a DNS server that returns a public IP for the first lookup and a private IP for the second (TTL of 0, different answers on consecutive queries). The validation passes; the fetch hits the metadata service. This is the **DNS rebinding attack against SSRF defenses**.

The fix is to pin the IP between validation and fetch. Most production code uses a custom HTTP agent that does its own DNS lookup once and reuses the result. The \`node-fetch-with-proxy\` family of libraries handles this; for raw Node \`http\`, pass a \`lookup\` option to the agent that caches the validated IP.

## Other Defenses Worth Adding

- **Origin allow-list** when the proxy is for a known set of sources (Twitter avatars, GitHub READMEs). Restrict to those hostnames.
- **Response size cap**, separate from \`content-length\` (which the upstream may lie about). Count bytes as they stream and abort if the count exceeds the cap.
- **Egress firewall** at the infrastructure level. Even if the application-level check is bypassed, an egress rule blocking traffic to \`169.254.0.0/16\` and \`10.0.0.0/8\` from the proxy service stops the most damaging variants.
- **Rate limiting per source IP**. SSRF reconnaissance involves hundreds of probes; rate limiting raises the cost of scanning.

## What Goes Wrong In Practice

The most common failures in real codebases:

- Forgetting IPv6 — checking only IPv4 reserved ranges and missing \`::1\`, \`fc00::/7\`.
- Allowing redirects to follow automatically and re-validating only the original URL.
- Caching the proxied response by URL alone, so an attacker can poison the cache with a private-network response for a public URL.
- Returning verbose error messages that leak whether a private IP was rejected versus a non-existent host — useful for SSRF probing.

## Bottom Line

If your application fetches images from URLs the user controls, build the proxy with SSRF defenses from day one. Protocol allow-list, IP allow-list with private-range rejection, manual redirect handling with re-validation, response size cap, and pinned-IP DNS. Skip any one of these and the proxy becomes a route into your cloud metadata service. The defenses are well-understood; the breaches happen because the defenses are routinely skipped.
`,

  "heif-heic-deep-dive-2026": `
## HEIF Is The Container, HEIC Is The Encoding, And Almost Nobody Gets It Right

When iPhone users complain that their photos "won't open on Windows," the file they are looking at is HEIC. When developers talk about Apple's image format, they usually call it HEIF. Both terms are correct, and the distinction matters because confusing them produces the wrong technical decisions.

**HEIF** (High Efficiency Image File Format) is a container format, defined by ISO/IEC 23008-12. Think of it the way MP4 is a container: it holds image data, metadata, derived images, image sequences, and auxiliary tracks. The container says nothing about how the image bytes are compressed.

**HEIC** is HEIF wrapped around an image encoded with HEVC (H.265 video). When Apple ships HEIF images, they almost always use HEIC. The same container with AV1 inside is called AVIF. The same container with JPEG inside is technically possible and rarely used.

This distinction explains why "AVIF support" and "HEIC support" are separate browser features even though they share a container. Browsers ship AVIF decoders widely because AV1 is royalty-free. HEIC requires HEVC, which has aggressive licensing, which is why Chrome on Windows does not natively decode HEIC even though it would be a one-line container change.

## What HEIF The Container Actually Adds

The container format brings features that JPEG cannot match:

- **Multiple images in one file**: HEIF can store an image sequence, a burst, or a Live Photo's still + video pair in a single file. Apple uses this constantly.
- **Derived images**: store a single source plus instructions for crops, rotations, and filtered variants. The file contains one full image and several lightweight derivations.
- **Auxiliary tracks**: depth maps, alpha channels, thumbnails, all in the same file rather than as separate sidecars.
- **Lossless and lossy in the same container**: choose per image item.
- **EXIF and XMP metadata at the container level**, not embedded in the compressed image data.

These features are why HEIF is genuinely better than JPEG for the Apple ecosystem: a single Live Photo file replaces what would otherwise be a JPEG plus an MOV. For the web, where multi-image files and derived images rarely matter, the container advantages are mostly invisible.

## Why iPhone Photos Are HEIC By Default

Starting with iOS 11 (2017), the iPhone's default camera format became HEIC. Apple's rationale: HEIC at the same visual quality as JPEG is about 50 percent smaller. On a phone shooting 4032x3024 photos, that is a 5 MB file becoming a 2.5 MB file. Multiplied across years of photos, the storage savings are significant.

The catch: every device the user shares the photo with needs to decode HEIC. iOS converts to JPEG when sharing via Mail, AirDrop to non-Apple devices, or upload to apps that request JPEG. Many users never notice the format issue. The users who do notice are the ones who plug their phone into Windows and copy files directly — those files arrive as HEIC and Windows pre-2024 cannot open them without the HEVC extension.

## Browser Support Status In 2026

- **Safari (macOS, iOS, iPadOS)**: full native support. HEIC images render in \`<img>\` tags.
- **Chrome (macOS only since 116)**: native support, because macOS provides the system decoder.
- **Chrome (Windows, Linux, Android)**: no native support. The HEVC licensing makes shipping the decoder cost-prohibitive.
- **Firefox**: no native support across any platform. Same licensing reason.
- **Edge**: same as Chrome — macOS yes, Windows no, with the workaround being the paid HEVC extension from the Microsoft Store.

For web publishing in 2026, HEIC is not a viable distribution format. It is fine as a source format and fine inside Apple's ecosystem; on the open web, you transcode to WebP, AVIF, or JPEG before serving.

## Transcoding HEIC: The Practical Recipes

**Server-side (most common):**

\`\`\`bash
# Using libheif via ImageMagick (ImageMagick must be built with HEIF support)
magick input.heic -quality 85 output.webp

# Using libheif directly
heif-convert input.heic output.jpg -q 85
\`\`\`

**Browser-side (for user uploads):**

The \`heic2any\` JavaScript library decodes HEIC in the browser using WASM. It is around 2.5 MB gzipped — too large to preload, perfect to lazy-load when the user uploads a \`.heic\` file. Decode time on a 2023 phone is roughly 600 to 1200 ms for a full-resolution iPhone photo, fast enough for upload UX, slow enough to require a loading indicator.

**Mobile native (best UX):**

Both iOS and Android expose system decoders. React Native apps can use native modules; Capacitor and Flutter have first-party plugins. Native decoding is 5–10x faster than browser WASM and uses less memory.

## The Metadata Considerations

HEIC files carry the same EXIF orientation tag that has plagued JPEG since the 1990s. iPhone photos taken in portrait orientation are stored landscape with an orientation marker that says "rotate me." Transcoding tools handle this inconsistently — some apply the rotation and strip the tag, some preserve both, some strip the tag without rotating, leaving images sideways.

The right transcoder flow: read the orientation, apply it to the pixel data, strip the tag, then encode the output. \`sharp\` (the Node image library) does this correctly with the \`.rotate()\` method, which despite the name "auto-rotate based on EXIF" is the universally expected behavior.

## The Lossless Variant Nobody Uses

HEIF supports lossless HEVC encoding, sometimes called HEIC-Lossless. File sizes for lossless HEIC on screenshots are competitive with PNG at roughly 60 percent of the bytes. Adoption is essentially zero outside specialized photography workflows because the lossless mode is not what Apple ships by default and the cross-platform decoder situation is even worse than for lossy HEIC.

For lossless image storage that actually decodes everywhere, WebP lossless or PNG remain the right choices in 2026.

## Bottom Line

HEIC is excellent inside the Apple ecosystem and unusable on the open web. Treat HEIC as a source format: accept it from user uploads, transcode immediately to a web-friendly format (WebP for compatibility, AVIF for new sites), and never link directly to a \`.heic\` URL in HTML. Understand that HEIF the container has architectural advantages that mostly do not apply to single-image web delivery, which is why AVIF — same container, different codec, royalty-free — won the web while HEIC won the iPhone.
`,

  "jpeg-xl-2026-the-format-that-almost-was": `
## The Format Everyone Said Would Win, And Then Did Not

JPEG XL (JXL) had a story so good it almost wrote its own marketing. Lossless re-encoding of existing JPEGs at 20 percent smaller size. Better compression than AVIF at most quality settings. Progressive decoding that beats PNG. Authored by the same team behind WebP and FLIF. Supported by Adobe, Mozilla, Apple's experimental builds, and a vocal community of imaging engineers. By 2022 it looked like the obvious successor to JPEG.

Then Google removed JPEG XL from Chrome in 2023, citing "insufficient interest from the ecosystem." The format did not die — it is now in Safari, in Firefox behind a flag, in every major image editor — but it lost the network effect that AVIF gained from full browser support. In 2026, JXL occupies a strange position: technically the best general-purpose image format, practically a minority choice on the open web.

## What JPEG XL Actually Does Well

The format's two standout features remain unmatched.

**Lossless JPEG re-encoding.** A JXL encoder can take an existing JPEG and re-pack it into JXL bytes that decode to exactly the same pixels as the original, at roughly 80 percent of the file size. No quality loss, no second compression pass, just a more efficient container around the existing compressed data. For sites with terabytes of legacy JPEGs in cold storage, this is a real disk-space saving with no migration risk.

**Progressive decoding that genuinely looks good.** A JXL file streams from low quality to high quality as bytes arrive, like JPEG progressive but smarter — the early frames look like compressed JPEGs rather than the chunky blockiness of partial-JPEG. On slow connections, the user sees a reasonable image immediately and the quality improves smoothly.

Beyond these two: animation support that rivals video codecs for short loops, support for HDR images with proper tone mapping, lossless and lossy modes that share an encoder, and computational performance that beats AVIF for encoding by a wide margin.

## The Status Of Browser Support In 2026

- **Safari (macOS Sequoia, iOS 17+)**: full native support.
- **Firefox**: behind \`image.jxl.enabled\` flag, on by default in Nightly, expected stable rollout late 2026.
- **Chrome / Edge**: no native support, no announced plans to add it. The 2023 removal stood.
- **Servo (the experimental browser engine)**: full support.

The Chrome decision matters because Chromium powers Chrome, Edge, Opera, Brave, Vivaldi, Samsung Internet, and almost every WebView on Android. Without Chromium, JXL cannot be the default format for the open web.

## Where JXL Is Quietly Winning Anyway

The format is not failing — it is succeeding in specific niches:

- **Photography pipelines**: Lightroom, Capture One, and Affinity Photo all export JXL. Photographers archive in JXL for the file-size win, export to AVIF or WebP for web publishing.
- **Internal tooling**: companies with their own viewers (medical imaging, satellite imagery, CAD systems) use JXL freely because they control the decoder.
- **Mobile camera roll**: rumored adoption by Samsung and some Chinese OEMs for on-device storage, with conversion at share time.
- **Print-quality web galleries**: niche art and photography sites use JXL with a JavaScript fallback decoder for non-Safari users.

## The JavaScript Fallback Strategy

For sites that want to ship JXL today, the polyfill exists: \`jxl-oxide-wasm\` is a Rust-based JXL decoder compiled to WebAssembly, 280 KB gzipped, fast enough for real-time decoding.

The pattern: detect support, use native decoding where present, fall back to WASM where not.

\`\`\`html
<picture>
  <source type="image/jxl" srcset="hero.jxl" />
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img src="hero.jpg" alt="..." />
</picture>
\`\`\`

This works perfectly in Safari (uses JXL natively) and falls through to AVIF in Chromium and Firefox. The JavaScript polyfill is only worth the 280 KB cost if JXL is a significant fraction of the site's bandwidth, which it usually is not.

## Why Chrome Said No, And What It Would Take To Change

Google's stated reasons in 2023 were imprecise, but the technical critique that gained traction in the discussion was: "JXL does not show enough advantage over AVIF to justify another codec." This was technically defensible — AVIF at high quality is comparable to JXL at high quality — but it ignored JXL's strengths in lossless mode, low-quality streaming, and the JPEG re-encoding feature.

By 2026 the conversation has shifted slightly. Several Chromium engineers have publicly endorsed re-evaluating the decision. The realistic path back to Chrome support is not a sudden reversal but a slow accumulation of evidence: more enterprise adoption (Adobe shipping JXL by default in cloud workflows is significant), more high-profile sites using the format successfully via polyfill, and ideally a wider Firefox stable rollout that establishes JXL as a genuine cross-browser format.

## Should You Ship JXL In 2026?

The honest answer for most teams: probably not as the primary format.

The case for shipping JXL alongside AVIF and WebP:
- Safari users (about 20 percent of mobile traffic globally) get the better format.
- The fallback chain is trivial with \`<picture>\`.
- It demonstrates support for the format and influences future browser decisions.

The case against:
- Adds a third encoded variant per image to the build pipeline.
- CDN cache hit rates suffer with more variants per image.
- No measurable user benefit relative to AVIF for the Chromium majority.

A reasonable position is: ship JXL for hero images and key marketing pages where the Safari win matters, skip it for the long tail of inline content. As Firefox stable rollout happens, expand coverage.

## The Long-Term Question

The format will not disappear — too many vendors have shipped products that depend on it. But the open-web trajectory hinges on Chrome. If the next two years bring measurable real-world adoption in production sites, the case for Chromium re-adding decode support gets stronger. If JXL remains a niche format used mostly by photographers, it stays where it is now: technically excellent, practically optional, an interesting alternative rather than the default.

## Bottom Line

JPEG XL in 2026 is the best image format you should think carefully before adopting. It is technically superior in several measurable ways, supported well in Safari, gaining ground in Firefox, and absent from Chrome. For most sites the right choice is to ship AVIF as the modern variant and watch JXL — adoption could shift quickly if Chrome reverses course. For sites with photography-heavy audiences and a Safari skew, shipping JXL today is a defensible quality investment.
`,
};

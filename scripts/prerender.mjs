#!/usr/bin/env node
/**
 * Option B — prerender the important URLs after `vite build`.
 *
 * For every real route this writes dist/<path>/index.html with:
 *   - its own <title>, meta description, canonical, Open Graph and Twitter tags
 *   - a no-JavaScript SEO shell inside #root (H1, description, steps, benefits, FAQs, internal links)
 *   - JSON-LD (Organization, WebSite, SoftwareApplication / BlogPosting / CollectionPage, FAQPage, BreadcrumbList)
 * plus dist/404.html with a noindex directive.
 *
 * React mounts into #root and replaces the shell on load, so users see the app exactly as before.
 * Crawlers — and anyone on a slow connection — get real content in the first response.
 *
 * Usage:
 *   node scripts/prerender.mjs               # run after vite build (default postbuild)
 *   node scripts/prerender.mjs --dry-run     # report what would be written
 *   node scripts/prerender.mjs --check       # exit 1 if a core route is missing from dist
 *
 * No Chromium required. Data is read from the app's own TypeScript modules with esbuild.
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(root, "dist");
const TEMPLATE = path.join(DIST, "index.html");
const CACHE = path.join(root, "node_modules", ".cache", "prerender");
const SITE = (process.env.SITE_URL ?? "https://multitoolsa.com").replace(/\/$/, "");
const args = new Set(process.argv.slice(2));

const CORE_ROUTES = [
  "/",
  "/all-tools",
  "/image-tools",
  "/compress-pdf",
  "/image-compression",
  "/image-resize",
  "/jpg-to-png",
  "/heic-to-jpg",
  "/blog",
];

const EXCLUDED = new Set(["/404", "/search", "/thank-you"]);

function log(message) {
  console.log(`[prerender] ${message}`);
}

/* ------------------------------------------------------------------ data */

/** Bundle the app's TS data modules with esbuild and import them in Node. */
async function loadAppData() {
  let esbuild;
  try {
    esbuild = await import("esbuild");
  } catch {
    log("esbuild is not resolvable — run this through `npm run build` so Vite's dependency is available.");
    return null;
  }

  await mkdir(CACHE, { recursive: true });

  const modules = {
    tools: "src/data/toolsSEOData.ts",
    categories: "src/data/categorySEOData.ts",
    toolsData: "src/data/toolsData.ts",
    blog: "src/data/blogData.ts",
    newBlogContent: "src/data/newBlogContent.ts",
    extraBlogContent: "src/data/extraBlogContent.ts",
    extra2BlogContent: "src/data/extra2BlogContent.ts",
    additionalSEOContent: "src/data/additionalSEOContent.ts",
  };

  const loaded = {};
  for (const [key, entry] of Object.entries(modules)) {
    const outfile = path.join(CACHE, `${key}.mjs`);
    try {
      await esbuild.build({
        absWorkingDir: root,
        entryPoints: [entry],
        outfile,
        bundle: true,
        format: "esm",
        platform: "node",
        target: "node18",
        logLevel: "silent",
        loader: {
          ".jpg": "dataurl",
          ".jpeg": "dataurl",
          ".png": "dataurl",
          ".webp": "dataurl",
          ".gif": "dataurl",
          ".svg": "dataurl",
        },
        plugins: [
          {
            name: "resolve-at-alias",
            setup(build) {
              build.onResolve({ filter: /^@\// }, (buildArgs) => ({
                path: path.join(root, "src", buildArgs.path.slice(2)),
              }));
            },
          },
        ],
      });
      loaded[key] = await import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
    } catch (error) {
      log(`could not load ${entry}: ${error instanceof Error ? error.message.split("\n")[0] : error}`);
    }
  }

  const toolsSEOContent = loaded.tools?.toolsSEOContent ?? {};
  const categoriesSEOContent = loaded.categories?.categoriesSEOContent ?? {};
  const toolCategories = loaded.toolsData?.toolCategories ?? [];

  const toolBySlug = new Map();
  for (const category of toolCategories) {
    for (const tool of category.tools ?? []) {
      toolBySlug.set(tool.slug, { ...tool, categoryName: category.name, categorySlug: category.slug });
    }
  }

  const blogPosts = loaded.blog?.blogPosts ?? [];
  const blogBodies = {};
  for (const key of ["newBlogContent", "extraBlogContent", "extra2BlogContent", "additionalSEOContent"]) {
    const record = loaded[key]?.[key];
    if (record && typeof record === "object") Object.assign(blogBodies, record);
  }

  // Only slugs present in BlogPost.tsx actually render. Everything else is a dead URL,
  // even if a content module or the sitemap mentions it.
  const blogPostSource = await readFile(path.join(root, "src/pages/BlogPost.tsx"), "utf8");
  const renderedBlogs = parseBlogEntries(blogPostSource);

  const blogEntries = [];
  for (const [slug, entry] of renderedBlogs) {
    const listed = blogPosts.find((post) => post?.id === slug);
    const body = blogBodies[entry.moduleRef ?? slug] ?? blogBodies[slug] ?? entry.inlineBody ?? "";
    blogEntries.push({
      slug,
      title: entry.title,
      excerpt: entry.excerpt || listed?.excerpt || "",
      author: entry.author || listed?.author || "MultiTools",
      date: entry.date || listed?.date || "",
      body: stripMarkdown(body),
    });
  }

  return {
    toolsSEOContent,
    categoriesSEOContent,
    toolCategories,
    toolBySlug,
    blogPosts,
    blogBodies,
    blogEntries,
  };
}

async function staticRoutes() {
  const app = await readFile(path.join(root, "src/App.tsx"), "utf8");
  const routes = new Set();
  for (const match of app.matchAll(/path="([^"]+)"/g)) {
    const route = match[1];
    if (route === "*" || route.includes(":") || EXCLUDED.has(route)) continue;
    if (route.length > 1 && route.endsWith("/")) continue;
    routes.add(route);
  }
  return routes;
}

/* --------------------------------------------------------------- markup */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function truncate(value, max) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

const STATIC_PAGES = {
  "/": {
    title: "Free Online Image & PDF Tools — No Uploads | MultiTools",
    description:
      "Compress, convert, resize, crop, watermark and merge files in your browser. 130+ free tools, no signup, no watermark and no uploads — your photos and documents stay on your device.",
    h1: "Free Tools That Run in Your Browser, Not on Someone's Server",
    intro:
      "MultiTools is a collection of image, PDF and SEO utilities that process files locally. Nothing is uploaded, so ID documents, bank statements and wedding photos stay on your device.",
    body:
      "Most free converters work by sending your file to a server and returning a result, which means the document exists somewhere you cannot see. Every tool here does the work on your own device: the browser decodes the file, transforms it and writes the result straight back to your downloads. That is faster on a weak connection, keeps working offline after the first load, and gives a straight answer to the question that matters for an ID scan or a bank statement. The most used tools are exact-size image compression for government and exam portals, the resizer for pixel and centimetre requirements, HEIC to JPG for iPhone photos, and PDF compression, merging and splitting for document uploads.",
    links: [
      ["/all-tools", "Browse all tools"],
      ["/image-compression", "Compress an image"],
      ["/compress-pdf", "Compress a PDF"],
      ["/image-resize", "Resize a photo"],
    ],
  },
  "/all-tools": {
    body: "The list is organised by the job rather than by internal tool names: preparing an image for an upload portal, publishing a photo on the web, combining or shrinking documents, and checking text or metadata. Every tool opens with the same three controls — choose a file, adjust the settings, download the result — and none of them asks you to register. If a specific size or format is missing, the contact page reaches a person who can add it.",
    title: "All Free Tools — Image, PDF & SEO | MultiTools",
    description:
      "Browse every free tool in one place: compress, convert, resize, crop, watermark, merge PDFs, generate QR codes and more. No signup and no uploads.",
    h1: "Every Tool in One Place",
    intro:
      "Tools are grouped by what you are trying to do — prepare an image for an upload portal, publish a photo, or shrink a PDF. Pick a group and start.",
  },
  "/blog": {
    body: "Each guide was written after actually running the comparison: compressing the same photographs at five quality levels, scanning documents at different resolutions and measuring the result, or testing how a format behaves after a social platform re-encodes it. Where a number matters, the number is stated, along with the conditions it was measured under. Guides link to the tool that performs the job so you can apply the finding immediately instead of reading another list of settings.",
    title: "Guides: Image Compression, PDF Sizes & Web Performance | MultiTools",
    description:
      "Practical, tested guides on image compression, exact KB targets, PDF size limits, HEIC conversion and web performance — written by people who ran the tests.",
    h1: "Guides and How-Tos",
    intro: "Step-by-step guides for the jobs people actually search for, with the settings that work.",
  },
  "/about": {
    body: "MultiTools was built after one too many free converters turned out to upload documents to an unknown server. Every tool here runs in the browser: the file is read locally, transformed on your device and written straight back to your downloads. There is no account system, no upload queue and no watermark on the output. The site covers image compression and conversion, exact-KB resizing for exam and ID uploads, PDF tools that combine, split and shrink documents, and a small set of SEO and text utilities. It is funded by clearly labelled display advertising, and no tool result is ever influenced by an advertiser.",
    title: "About MultiTools — Who Runs It and Why | MultiTools",
    description:
      "Why MultiTools exists, how the browser-based tools work, and the privacy rule behind every utility: your files never leave your device.",
    h1: "About MultiTools",
    intro:
      "MultiTools exists because most free online tools upload your file to a server you cannot see. This site processes everything locally in the browser.",
  },
  "/contact": {
    body: "The fastest way to get help is to describe the exact job: the portal name, the required KB limit, the pixel dimensions and the format it accepts. Include the error message if a form rejected your file. Bug reports with the browser name and device are especially useful, because the tools run locally and a failure is almost always browser-specific. We read every message and reply within 48 hours on working days. For copyright notices, use the DMCA page so the request reaches the right process. Feature requests are welcome and are prioritised by how many people search for the same job.",
    title: "Contact MultiTools | MultiTools",
    description: "Report a bug, request a tool or ask about privacy. We reply within 48 hours on working days.",
    h1: "Contact",
    intro: "Tell us the exact requirement — portal name, size limit and format — and we will look at it.",
  },
  "/privacy": {
    body: "Files opened in a tool are decoded and re-encoded inside your browser; the original is never transferred to MultiTools. We do not require an account and we do not store your documents. The only data collected is standard server logging (IP address, user agent, requested URL) and aggregate analytics used to fix errors. Advertising is served by Google AdSense, which may set cookies to personalise ads; you can opt out through Google Ads Settings. We never sell personal data. Questions about this policy can be sent to the contact address on this site, and we aim to reply within 48 hours.",
    title: "Privacy Policy | MultiTools",
    description:
      "What data MultiTools collects, how files are processed locally, and how Google AdSense cookies and personalised advertising work, including how to opt out.",
    h1: "Privacy Policy",
    intro:
      "Files you open in a tool are processed in your browser and are never uploaded. This page explains the limited data we do collect.",
  },
  "/terms": {
    body: "You may use the tools for personal and commercial work at no cost. You must own the files you process or have permission from the rights holder; do not upload illegal, infringing or harmful material. Tools are provided as-is, without warranty of uninterrupted availability or fitness for a particular purpose, and file requirements for third-party portals may change without notice. MultiTools is not liable for rejected submissions, lost files or indirect damages. Keep your own copies of anything important. We may update these terms; continued use after a change means you accept the updated version.",
    title: "Terms of Service | MultiTools",
    description: "Acceptable use, ownership of your files, service availability and limitation of liability.",
    h1: "Terms of Service",
    intro: "By using MultiTools you agree to process only files you own or have permission to use.",
  },
  "/disclaimer": {
    body: "Image dimensions, KB limits and formats published on this site are practical guidance gathered from public portal requirements, not official instructions. Recruitment boards, universities and government portals change their specifications between cycles, sometimes without announcing it. Always download the current notification or read the upload page before submitting a form, and keep your original photograph so you can produce a different size if the requirement changes. Nothing here is legal, financial or professional advice.",
    title: "Disclaimer | MultiTools",
    description:
      "Image size and pixel requirements differ by portal and change between recruitment cycles. Always verify against the official notification.",
    h1: "Disclaimer",
    intro:
      "Specifications shown on this site are guidance. Confirm the current requirement on the official portal before submitting a form.",
  },
  "/dmca": {
    body: "If you believe content on this site infringes your copyright, send a notice that identifies the work, the exact URL on this domain, your contact details, a statement that you have a good-faith belief the use is unauthorised, a statement that the information is accurate under penalty of perjury, and your physical or electronic signature. We remove or disable access to material that meets these requirements and notify the uploader where possible. Counter-notices are handled under the same procedure. Repeated infringement leads to the account or content being blocked from the service.",
    title: "DMCA & Copyright | MultiTools",
    description: "How to submit a copyright notice or counter-notice for content hosted on MultiTools.",
    h1: "DMCA & Copyright",
    intro: "We respond to valid copyright notices with a working contact channel and a repeat-infringer policy.",
  },
  "/advertiser-disclosure": {
    body: "Hosting and development are paid for by display advertising, mostly Google AdSense. Ads are visually separated from tool controls and from download buttons, and they are labelled as advertising. Advertisers have no influence over which tools exist, how a tool processes your file, or what this site recommends in its guides. We do not write sponsored reviews, we do not sell placements inside tool results, and we do not accept payment to change a specification or a comparison. If an ad ever appears to interfere with a tool, report it on the contact page and it will be investigated.",
    title: "Advertiser Disclosure | MultiTools",
    description: "How MultiTools is funded and why advertising never affects tool output or recommendations.",
    h1: "Advertiser Disclosure",
    intro: "Hosting costs are covered by clearly labelled display advertising. No tool result is ever affected by an advertiser.",
  },
  "/faq": {
    body: "Yes, every tool is free, with no account, no upload quota and no watermark on the output. Files are processed locally, so they are never transferred to a server. Most tools keep working offline once the page has loaded, and all of them work on Android and iOS. There is no fixed file-count limit for browser processing; very large batches depend on your device memory, so work in sets of twenty to thirty files on a phone. Studio logos and personal watermarks are applied at full size, and converting HEIC photos works without installing anything.",
    title: "Frequently Asked Questions | MultiTools",
    description: "Are the tools really free? Is my file uploaded? Do the tools work offline on a phone? Straight answers.",
    h1: "Frequently Asked Questions",
    intro: "Short, direct answers about privacy, limits, formats and cost.",
  },
  "/how-tools-work": {
    body: "When you choose a file, the browser reads it into memory and decodes it into pixels using the same image decoder it uses to display pictures. The tool draws the result onto a canvas, applies resizing, cropping, filters or watermarking, then re-encodes the canvas into the format you picked and offers it as a download. Because all of this happens on your device, speed depends on your phone or laptop rather than your connection. Compression works by reducing the encoder quality in steps, and only trimming dimensions when quality alone cannot reach the target.",
    title: "How the Tools Work — Browser Processing Explained | MultiTools",
    description:
      "A plain explanation of how images are decoded, compressed and re-encoded inside your browser, and what the limits are.",
    h1: "How the Tools Work",
    intro: "Every tool reads your file in the browser, transforms it on your device and writes the result back to your downloads.",
  },
};


function normaliseTitle(raw, fallback) {
  const base = String(raw ?? "").replace(/\s+/g, " ").trim() || fallback;
  if (base.length <= 62) return base;
  // drop a trailing brand chunk first, then hard truncate
  const withoutBrand = base.replace(/\s*[|\-–]\s*(MultiTools|Convert)\s*$/i, "").trim();
  if (withoutBrand.length <= 62) return withoutBrand;
  return `${withoutBrand.slice(0, 61).trimEnd()}…`;
}

function normaliseDescription(raw, fallback) {
  let text = String(raw ?? "").replace(/\s+/g, " ").trim() || fallback;
  if (text.length < 70) text = `${text} ${fallback}`.replace(/\s+/g, " ").trim();
  if (text.length > 158) text = `${text.slice(0, 157).trimEnd()}…`;
  return text;
}

/** Reads the rendered blog records straight out of BlogPost.tsx. */
function parseBlogEntries(source) {
  const entries = new Map();
  const keyRe = /^\s{2}"([a-z0-9]+(?:-[a-z0-9]+)+)"\s*:\s*\{/gm;
  const keys = [...source.matchAll(keyRe)];
  for (let index = 0; index < keys.length; index += 1) {
    const slug = keys[index][1];
    const start = keys[index].index ?? 0;
    const end = index + 1 < keys.length ? keys[index + 1].index ?? source.length : source.length;
    const block = source.slice(start, end);
    const title = block.match(/\btitle:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const excerpt = block.match(/\bexcerpt:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const author = block.match(/\bauthor:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const date = block.match(/\bdate:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const inlineBody = block.match(/content:\s*`([\s\S]*?)`,?\s*\n\s*}/)?.[1];
    const moduleRef = block.match(/content:\s*(?:newBlogContent|extraBlogContent|extra2BlogContent|additionalSEOContent)\["([^"]+)"\]/)?.[1];
    if (!title) continue;
    entries.set(slug, {
      slug,
      title: title.replace(/\\"/g, '"'),
      excerpt: (excerpt ?? "").replace(/\\"/g, '"'),
      author: author?.replace(/\\"/g, '"') ?? "MultiTools",
      date: date ?? "",
      inlineBody: inlineBody ? stripMarkdown(inlineBody) : "",
      moduleRef: moduleRef ?? null,
    });
  }
  return entries;
}

const EXTRA_HUBS = {
  "/image-tools": {
    title: "Image Tools — Compress, Convert, Resize | MultiTools",
    description:
      "Compress to an exact KB target, convert JPG, PNG, WebP, AVIF, HEIC or TIFF, resize to exact pixels and crop to any ratio. Files are processed in your browser, never uploaded.",
    h1: "Image Tools — Every Job in One Place",
    intro: "Compress, convert, resize, crop, rotate, watermark and clean metadata without uploading a file.",
    body:
      "Start with the compressor if a portal rejected your upload for being too large, or the resizer if the pixels were wrong rather than the byte size. Conversion handles the formats people actually receive, including HEIC from iPhones. Cropping covers the ratios platforms force: square profiles, 4:5 feed images, 9:16 stories and 16:9 thumbnails. Because everything runs locally, a passport photo or a client preview never reaches a server.",
    links: [
      ["/image-compression", "Compress an image to 20KB, 50KB or 100KB"],
      ["/image-resize", "Resize to exact pixels or centimetres"],
      ["/heic-to-jpg", "Convert HEIC photos to JPG"],
      ["/image-crop", "Crop to a platform ratio"],
    ],
  },
  "/pdf-tools": {
    title: "PDF Tools — Compress, Merge, Split | MultiTools",
    description:
      "Shrink a scanned PDF for a portal limit, merge several documents, split a bundle or turn photos into a PDF. Text stays selectable and files never leave your device.",
    h1: "PDF Tools That Keep Your Documents Local",
    intro: "Compress, merge, split and convert PDFs in the browser, with no upload step.",
    body:
      "A scanned PDF is heavy because every page is a photograph, so compression targets the embedded images and can remove most of the weight without touching the text layer. If a portal demands an impossible limit for a six-page scan, split the document and upload the essential pages rather than submitting something unreadable. Keep your original file: compression is destructive once saved.",
    links: [
      ["/compress-pdf", "Compress a PDF to a target size"],
      ["/merge-pdf", "Merge several PDFs into one"],
      ["/split-pdf", "Split a PDF into pages"],
      ["/image-to-pdf", "Turn photos into a single PDF"],
    ],
  },
  "/seo-tools": {
    title: "Free SEO Tools — Meta Tags & OG Preview | MultiTools",
    description:
      "Generate meta tags with a live Google preview, check Open Graph cards, measure keyword density, count words, verify heading order and extract hashtags. No signup.",
    h1: "Small SEO Tools That Answer One Question Fast",
    intro: "Each tool states the limit it enforces, so the output is usable instead of approximate.",
    body:
      "Titles are truncated around 60 characters on desktop and closer to 50 on phones, so keep the primary keyword first. Meta descriptions cut off near 155 characters. Open Graph images are 1200x630 with the important content in the middle. Keyword density is a sanity check rather than a target: between 0.5% and 2% reads normally, and beyond 3% the writing has usually become awkward.",
    links: [
      ["/meta-tag-generator", "Generate title and meta tags"],
      ["/open-graph-checker", "Preview a social share card"],
      ["/word-counter", "Count words and characters"],
      ["/keyword-density-checker", "Check keyword density"],
    ],
  },
  "/image-editor": {
    title: "Online Photo Editor — Crop, Adjust, Export | MultiTools",
    description:
      "Crop, straighten, adjust brightness, contrast and saturation, apply filters and export as JPG, PNG or WebP. Editing happens on your device, so nothing is uploaded.",
    h1: "Edit Photos Without Uploading Them",
    intro: "The edits people need before publishing, in a browser tab.",
    body:
      "Crop to the ratio the platform forces first, then adjust exposure and colour, then sharpen very lightly before export. Zoom to 100% before saving: sharpening halos and sensor noise that are invisible when the whole image fits the window become obvious at real size. Keep the original file, because a crop is destructive once saved.",
    links: [
      ["/image-crop", "Crop and straighten"],
      ["/photo-filters", "Apply a filter"],
      ["/image-resize", "Resize the export"],
      ["/image-metadata", "Check or remove metadata"],
    ],
  },
  "/tag-extractor": {
    title: "Hashtag Extractor — Pull Tags From Text | MultiTools",
    description:
      "Paste a caption, script or article and extract every hashtag and keyword, de-duplicated and ranked by frequency. Free, private and no signup.",
    h1: "Hashtag Extractor",
    intro: "Pull the tags out of any text and see which ones repeat.",
    body:
      "Useful for planning a post series, checking which tags a competitor keeps reusing, or cleaning up a caption before publishing. The extractor de-duplicates entries so a repeated tag does not distort the ranking, and it keeps the surrounding context so you can see where the tag appeared.",
    links: [
      ["/tag-tools", "Hashtag generator"],
      ["/word-counter", "Count words first"],
      ["/seo-tools", "All SEO tools"],
    ],
  },
  "/image-formats-guide": {
    title: "Image Formats Explained — JPG, PNG, WebP | MultiTools",
    description:
      "When to use JPG, PNG, WebP, AVIF, HEIC or SVG, with the real trade-off for each and the conversion that usually follows. Practical reference, no jargon.",
    h1: "Image Formats, and When Each One Wins",
    intro: "The short version: JPG for photographs, PNG for screenshots and transparency, WebP for smaller web delivery.",
    body:
      "AVIF is smaller again but slower to encode and unevenly supported in older software. HEIC is what modern iPhones write, which is why a Windows PC cannot open a photo until it is converted to JPG. SVG stays sharp at any size, so it belongs on logos and icons rather than photographs. Converting a JPG to PNG cannot recover detail the JPEG already discarded; you only gain a lossless container and transparency.",
    links: [
      ["/image-converter", "Convert between formats"],
      ["/heic-to-jpg", "Open iPhone photos on Windows"],
      ["/jpg-to-webp", "Ship smaller images"],
      ["/image-compression", "Compress instead of convert"],
    ],
  },
  "/ad-placement-guide": {
    title: "Ad Placement Guide | MultiTools",
    description:
      "How advertising appears on MultiTools: labelled slots, kept away from tool controls and download buttons, with no interstitials in front of a result.",
    h1: "Ad Placement Guide",
    intro: "This page exists so visitors and reviewers can see the advertising policy in writing.",
    body:
      "Ads are visually separated from the tool interface and labelled as advertising. There are no full-screen interstitials before a tool result, no ads disguised as download buttons, and no sponsored placement inside a tool. Advertising never changes which tools exist, how a file is processed, or what a guide recommends.",
    links: [
      ["/advertiser-disclosure", "Advertiser disclosure"],
      ["/privacy", "Privacy policy"],
      ["/contact", "Report an ad problem"],
    ],
  },
  "/image-format-utilities": {
    title: "Image Format Utilities — Batch Convert | MultiTools",
    description:
      "Batch conversion and inspection for files you were handed: convert a folder to JPG, check the real format behind a wrong extension, normalise a mixed set.",
    h1: "Format Utilities for Awkward Files",
    intro: "Convert or inspect an entire folder locally, without uploading a client batch.",
    body:
      "Wrong extensions are common: a file named .jpg that is really a WebP, or a TIFF exported with a .png name. These utilities read the actual bytes, report the real format and convert to what the destination expects. Batch mode keeps original filenames so the converted output matches the source list.",
    links: [
      ["/image-converter", "Convert a single file"],
      ["/image-formats-guide", "Which format to choose"],
      ["/all-tools", "All tools"],
    ],
  },
};

Object.assign(STATIC_PAGES, EXTRA_HUBS);

function toolView(slug, tool, seo, toolBySlug) {
  const meta = toolBySlug.get(slug) ?? {};
  const categoryName = seo?.category ?? meta.category ?? "Tools";
  const categorySlug = seo?.categorySlug ?? meta.categorySlug ?? "all-tools";
  const name = seo?.title ?? meta.name ?? slug.replace(/-/g, " ");
  const title = normaliseTitle(seo?.metaTitle, `${name} — Free Online Tool | MultiTools`);
  const description = normaliseDescription(
    seo?.metaDescription ?? meta.description,
    `${name} runs entirely in your browser, free, private and without signup.`,
  );

  return {
    route: `/${slug}`,
    type: "tool",
    title,
    description,
    h1: seo?.h1 ?? name,
    intro: seo?.shortDescription ?? meta.description ?? "",
    body: seo?.longDescription ?? "",
    steps: seo?.howToUse ?? [],
    benefits: seo?.benefits ?? [],
    faqs: (seo?.faqs ?? []).slice(0, 6),
    categoryName,
    categorySlug,
    related: (seo?.relatedTools ?? []).filter((related) => toolBySlug.has(related)).slice(0, 6),
    keywords: seo?.keywords ?? meta.keywords ?? [],
  };
}

function blogView(entry) {
  return {
    route: `/blog/${entry.slug}`,
    type: "blog",
    title: normaliseTitle(entry.title, "MultiTools guide"),
    description: normaliseDescription(entry.excerpt, "A practical MultiTools guide with tested settings and steps."),
    h1: entry.title,
    intro: entry.excerpt,
    body: entry.body.slice(0, 2600),
    author: entry.author,
    date: entry.date,
    categoryName: "Guides",
    categorySlug: "blog",
  };
}

function stripMarkdown(value) {
  return String(value ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^[#>*\-\d.\s]+/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shellFor(view) {
  const parts = [];
  parts.push(
    `<nav aria-label="Breadcrumb" style="font-size:13px;padding:12px 16px;color:#475569">` +
      `<a href="/" style="color:#4f46e5;text-decoration:none">MultiTools</a> / ` +
      `<a href="/${escapeHtml(view.categorySlug)}" style="color:#4f46e5;text-decoration:none">${escapeHtml(view.categoryName)}</a>` +
      (view.type === "blog" ? "" : ` / ${escapeHtml(view.h1)}`) +
      `</nav>`,
  );
  parts.push(`<main style="max-width:820px;margin:0 auto;padding:16px 16px 48px;font-family:system-ui,sans-serif;color:#0f172a">`);
  parts.push(`<h1 style="font-size:28px;line-height:1.25;margin:8px 0 12px">${escapeHtml(view.h1)}</h1>`);
  if (view.intro) parts.push(`<p style="font-size:16px;line-height:1.6;color:#334155">${escapeHtml(view.intro)}</p>`);
  parts.push(
    `<p style="font-size:14px;color:#4f46e5">Loading the interactive tool… If it does not appear, enable JavaScript. The full explanation is below.</p>`,
  );

  if (view.body) parts.push(`<p style="font-size:15px;line-height:1.7;color:#334155">${escapeHtml(view.body)}</p>`);

  if (view.steps?.length) {
    parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">How to use ${escapeHtml(view.h1)}</h2><ol>`);
    for (const step of view.steps) parts.push(`<li style="margin:6px 0;line-height:1.6">${escapeHtml(step)}</li>`);
    parts.push(`</ol>`);
  }

  if (view.benefits?.length) {
    parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">Why use it</h2><ul>`);
    for (const benefit of view.benefits) parts.push(`<li style="margin:6px 0;line-height:1.6">${escapeHtml(benefit)}</li>`);
    parts.push(`</ul>`);
  }

  if (view.faqs?.length) {
    parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">Frequently asked questions</h2>`);
    for (const faq of view.faqs) {
      parts.push(
        `<h3 style="font-size:15px;margin:14px 0 4px">${escapeHtml(faq.question)}</h3>` +
          `<p style="font-size:14px;line-height:1.6;color:#334155">${escapeHtml(faq.answer)}</p>`,
      );
    }
  }

  if (view.related?.length) {
    parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">Related tools</h2><ul>`);
    for (const related of view.related) {
      parts.push(`<li style="margin:6px 0"><a href="/${escapeHtml(related)}" style="color:#4f46e5">${escapeHtml(related.replace(/-/g, " "))}</a></li>`);
    }
    parts.push(`</ul>`);
  }

  if (view.groups?.length) {
    for (const [name, items] of view.groups) {
      parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">${escapeHtml(name)}</h2><ul style="columns:2;column-gap:24px">`);
      for (const [href, label] of items) {
        parts.push(`<li style="margin:6px 0"><a href="${escapeHtml(href)}" style="color:#4f46e5">${escapeHtml(label)}</a></li>`);
      }
      parts.push(`</ul>`);
    }
  }

  if (view.posts?.length) {
    parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">Latest guides</h2><ul>`);
    for (const [href, label] of view.posts) {
      parts.push(`<li style="margin:6px 0"><a href="${escapeHtml(href)}" style="color:#4f46e5">${escapeHtml(label)}</a></li>`);
    }
    parts.push(`</ul>`);
  }

  if (view.links?.length) {
    parts.push(`<h2 style="font-size:20px;margin:24px 0 8px">Start here</h2><ul>`);
    for (const [href, label] of view.links) {
      parts.push(`<li style="margin:6px 0"><a href="${escapeHtml(href)}" style="color:#4f46e5">${escapeHtml(label)}</a></li>`);
    }
    parts.push(`</ul>`);
  }

  parts.push(
    `<p style="margin-top:28px;font-size:13px;color:#475569">` +
      `<a href="/all-tools" style="color:#4f46e5">All tools</a> · ` +
      `<a href="/blog" style="color:#4f46e5">Guides</a> · ` +
      `<a href="/privacy" style="color:#4f46e5">Privacy</a> · ` +
      `<a href="/contact" style="color:#4f46e5">Contact</a></p>`,
  );
  parts.push(`</main>`);
  return parts.join("");
}

function jsonLdFor(view) {
  const canonical = `${SITE}${view.route === "/" ? "/" : view.route}`;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "MultiTools",
      url: `${SITE}/`,
      description: "Free browser-based image, PDF and SEO tools that never upload your files.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "MultiTools",
      url: `${SITE}/`,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#organization` },
    },
  ];

  if (view.type === "tool") {
    graph.push({
      "@type": "SoftwareApplication",
      name: view.h1,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: canonical,
      description: view.description,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: view.benefits?.slice(0, 6) ?? [],
    });
    if (view.faqs?.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: view.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      });
    }
  }

  if (view.type === "blog") {
    graph.push({
      "@type": "BlogPosting",
      headline: truncate(view.h1, 110),
      description: view.description,
      url: canonical,
      datePublished: view.date,
      author: { "@type": "Person", name: view.author ?? "MultiTools" },
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    });
  }

  if (view.type === "static" && view.route === "/") {
    graph.push({
      "@type": "CollectionPage",
      name: "MultiTools — free browser-based tools",
      url: canonical,
      description: view.description,
    });
  }

  if (view.type !== "blog" || view.author) {
    const items = [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: view.categoryName, item: `${SITE}/${view.categorySlug}` },
    ];
    if (view.type === "tool") {
      items.push({ "@type": "ListItem", position: 3, name: view.h1, item: canonical });
    }
    graph.push({ "@type": "BreadcrumbList", itemListElement: items });
  }

  return `<script type="application/ld+json">${escapeJson({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function headBlock(view) {
  const canonical = `${SITE}${view.route === "/" ? "/" : view.route}`;
  const ogImage = `${SITE}/og-image.png`;
  return [
    `<title>${escapeHtml(view.title)}</title>`,
    `<meta name="description" content="${escapeHtml(view.description)}" />`,
    view.keywords?.length ? `<meta name="keywords" content="${escapeHtml(view.keywords.slice(0, 12).join(", "))}" />` : "",
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="${view.type === "blog" ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="MultiTools" />`,
    `<meta property="og:title" content="${escapeHtml(view.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(view.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(view.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(view.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    jsonLdFor(view),
  ]
    .filter(Boolean)
    .join("\n    ");
}

function applyTemplate(template, rawView) {
  const view = {
    ...rawView,
    title: normaliseTitle(rawView.title, "MultiTools — free browser-based tools"),
    description: normaliseDescription(
      rawView.description,
      "Free browser-based image and PDF tools that never upload your files.",
    ),
  };

  let html = template;

  // Make the template reusable: strip any shell injected by a previous run.
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');

  html = html.replace(/<title>[\s\S]*?<\/title>/i, "");
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, "");
  html = html.replace(/<meta\s+name="keywords"[^>]*>/gi, "");
  html = html.replace(/<meta\s+name="robots"[^>]*>/gi, "");
  html = html.replace(/<meta\s+name="googlebot"[^>]*>/gi, "");
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "");
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, "");
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");

  html = html.replace(/<\/head>/i, `    ${headBlock(view)}\n  </head>`);
  html = html.replace(/<div id="root">\s*<\/div>/i, `<div id="root">${shellFor(view)}</div>`);
  html = html.replace(/<html([^>]*)>/i, `<html$1 lang="en-IN">`);

  return html;
}

export function wordCountOf(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return body ? body.split(" ").length : 0;
}

/* ------------------------------------------------------------------ main */

async function main() {
  if (!existsSync(TEMPLATE)) {
    log("dist/index.html not found. Run `vite build` first (this script runs as postbuild).");
    process.exit(args.has("--check") ? 1 : 0);
  }

  const template = await readFile(TEMPLATE, "utf8");
  const statics = await staticRoutes();
  const data = await loadAppData();

  const views = [];

  for (const route of statics) {
    if (route === "/") {
      views.push({ route: "/", type: "static", ...STATIC_PAGES["/"] });
      continue;
    }
    const category = data?.categoriesSEOContent?.[route.replace(/^\//, "")];
    const fallback = STATIC_PAGES[route];
    if (category) {
      views.push({
        route,
        type: "static",
        title: truncate(category.metaTitle ?? category.name, 65),
        description: truncate(category.metaDescription ?? category.shortDescription, 158),
        h1: category.h1 ?? category.name,
        intro: category.shortDescription ?? "",
        body: category.longDescription ?? "",
        steps: category.howToUse ?? [],
        benefits: category.benefits ?? [],
        faqs: (category.faqs ?? []).slice(0, 6),
        categoryName: category.name,
        categorySlug: route.replace(/^\//, ""),
        links: [],
      });
      continue;
    }
    if (fallback) {
      const view = {
        route,
        type: "static",
        categoryName: "MultiTools",
        categorySlug: "all-tools",
        ...fallback,
      };
      if ((route === "/" || route === "/all-tools" || route === "/blog") && data) {
        const groups = [];
        for (const category of data.toolCategories) {
          const items = (category.tools ?? []).slice(0, 8);
          if (!items.length) continue;
          groups.push([
            category.name,
            items.map((tool) => [`/${tool.slug}`, tool.name]),
          ]);
        }
        view.groups = groups;
        if (route === "/blog" && data.blogEntries.length) {
          view.posts = data.blogEntries.slice(0, 12).map((entry) => [`/blog/${entry.slug}`, entry.title]);
        }
        view.body =
          "Images, PDFs and text tools grouped by the job you are doing. Every tool runs on your device, so files are never uploaded to a server.";
      }
      views.push(view);
      continue;
    }
    const label = route.replace(/^\//, "").replace(/-/g, " ");
    views.push({
      route,
      type: "static",
      title: `${label.replace(/\b\w/g, (char) => char.toUpperCase())} | MultiTools`,
      description: `${label.replace(/\b\w/g, (char) => char.toUpperCase())} — free, browser-based and private on MultiTools.`,
      h1: label.replace(/\b\w/g, (char) => char.toUpperCase()),
      intro: "",
      categoryName: "MultiTools",
      categorySlug: "all-tools",
    });
  }

  if (data) {
    for (const slug of data.toolBySlug.keys()) {
      if (EXCLUDED.has(`/${slug}`)) continue;
      const seo = data.toolsSEOContent[slug];
      const view = toolView(slug, seo, seo, data.toolBySlug);
      if (!seo) {
        // No hand-written SEO record yet. Give crawlers an honest shell and flag it,
        // rather than shipping a templated paragraph that reads like every other page.
        const meta = data.toolBySlug.get(slug) ?? {};
        view.steps = [
          `Open the ${meta.name ?? slug.replace(/-/g, " ")} tool.`,
          "Choose your file — it is read in the browser, not uploaded.",
          "Set the options you need and download the result.",
        ];
        view.body =
          view.body ||
          `${meta.description ?? meta.name ?? slug} runs entirely in your browser. Choose a file, adjust the settings and download the result; the original never leaves your device.`;
        view.needsCopy = true;
      }
      views.push(view);
    }
    for (const entry of data.blogEntries) {
      views.push(blogView(entry));
    }
  }

  // A route must appear once. Static definitions win over generated ones.
  const byRoute = new Map();
  for (const view of views) {
    const key = view.route === "/" ? "/" : view.route.replace(/\/$/, "");
    const existing = byRoute.get(key);
    if (!existing) {
      byRoute.set(key, { ...view, route: key });
      continue;
    }
    const existingRich = Boolean(existing.body || existing.steps?.length || existing.faqs?.length);
    const incomingRich = Boolean(view.body || view.steps?.length || view.faqs?.length);
    if (!existingRich && incomingRich) byRoute.set(key, { ...view, route: key });
  }

  const all = [...byRoute.values()].map((view) => ({
    ...view,
    title: normaliseTitle(view.title, "MultiTools — free browser-based tools"),
    description: normaliseDescription(
      view.description,
      "Free browser-based image and PDF tools that never upload your files.",
    ),
  }));
  const report = [];

  for (const view of all) {
    const html = applyTemplate(template, view);
    const words = wordCountOf(html);
    report.push({ route: view.route, words, title: view.title.length, description: view.description.length });
    if (args.has("--dry-run")) continue;
    const target =
      view.route === "/" ? TEMPLATE : path.join(DIST, `${view.route.replace(/^\//, "")}/index.html`);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html, "utf8");
  }

  if (!args.has("--dry-run")) {
    // The deployed sitemap must describe exactly what was prerendered, so write it here.
    const today = new Date().toISOString().slice(0, 10);
    const sitemapRoutes = all
      .map((view) => view.route)
      .filter((route) => route !== "/404")
      .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
    const priorityFor = (route) =>
      route === "/" ? "1.0" : route === "/all-tools" ? "0.9" : route.startsWith("/blog/") ? "0.6" : "0.7";
    const changefreqFor = (route) =>
      route === "/" ? "daily" : route === "/blog" || route === "/all-tools" ? "weekly" : "monthly";
    const sitemapXml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      "  <!-- Generated by scripts/prerender.mjs from prerendered routes. -->",
      ...sitemapRoutes.map((route) =>
        [
          "  <url>",
          `    <loc>${SITE}${route === "/" ? "/" : route}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${changefreqFor(route)}</changefreq>`,
          `    <priority>${priorityFor(route)}</priority>`,
          "  </url>",
        ].join("\n"),
      ),
      "</urlset>",
      "",
    ].join("\n");
    await writeFile(path.join(DIST, "sitemap.xml"), sitemapXml, "utf8");
    log(`dist/sitemap.xml: ${sitemapRoutes.length} URLs`);

    const notFound = applyTemplate(template, {
      route: "/404",
      type: "static",
      title: "Page not found | MultiTools",
      description: "That page does not exist. Browse all free tools or search the guides.",
      h1: "Page not found",
      intro: "The URL you opened is not part of the site. Try the tool hub or the guides.",
      categoryName: "MultiTools",
      categorySlug: "all-tools",
      links: [
        ["/all-tools", "All tools"],
        ["/blog", "Guides"],
      ],
    }).replace(
      '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
      '<meta name="robots" content="noindex, follow" />',
    );
    await writeFile(path.join(DIST, "404.html"), notFound, "utf8");
  }

  const thin = report.filter((row) => row.words < 120);
  const average = Math.round(report.reduce((sum, row) => sum + row.words, 0) / Math.max(1, report.length));

  log(`${all.length} routes ${args.has("--dry-run") ? "analysed" : "written"} to dist/`);
  log(`body text: average ${average} words · thinnest ${Math.min(...report.map((row) => row.words))} words`);
  log(`meta: titles ${Math.min(...report.map((row) => row.title))}-${Math.max(...report.map((row) => row.title))} chars, descriptions ${Math.min(...report.map((row) => row.description))}-${Math.max(...report.map((row) => row.description))} chars`);

  const needsCopy = all.filter((view) => view.needsCopy);
  if (needsCopy.length) {
    log(`${needsCopy.length} tool routes have no hand-written SEO record — synthesised shell used:`);
    for (const view of needsCopy.slice(0, 12)) log(`  - ${view.route}`);
    if (needsCopy.length > 12) log(`  … and ${needsCopy.length - 12} more`);
    log("  Add them to src/data/toolsSEOData.ts (or seo/tools/) for a real ranking page.");
  }

  if (thin.length) {
    log(`${thin.length} routes under 120 words (usually blog posts without an imported body):`);
    for (const row of thin.slice(0, 10)) log(`  - ${row.route} (${row.words} words)`);
  }

  if (args.has("--check")) {
    const missing = CORE_ROUTES.filter((route) => {
      const file = route === "/" ? TEMPLATE : path.join(DIST, `${route.replace(/^\//, "")}/index.html`);
      return !existsSync(file);
    });
    if (missing.length) {
      log(`missing core routes: ${missing.join(", ")}`);
      process.exit(1);
    }
    log("all core routes are prerendered.");
  }

  if (existsSync(CACHE)) await rm(CACHE, { recursive: true, force: true });
}

await main();

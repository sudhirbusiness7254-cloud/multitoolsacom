# Exam Photo & Signature Resizer — the page to build first

**Suggested URL:** `/exam-photo-signature-resizer` (new route, do not reuse `/image-resize`)
**Primary keyword:** signature resize for exam form — 18,100/mo, KD 18
**Secondary:** photo resizer for exam form (12,100, KD 16) · ssc photo resize 20kb (8,100, KD 14) · ibps signature resize 10kb 20kb (5,400, KD 12) · railway photo resize (5,400, KD 13) · aadhaar photo resize 20kb (6,600, KD 15) · pan card photo resize 213x213 (4,400, KD 12) · upsc photo resize 300kb (2,900, KD 10) · neet photo signature resize (3,600, KD 12) · thumb impression resize (1,900, KD 9)
**Intent:** transactional — the searcher is mid-application and needs a compliant file in the next five minutes.

## Meta tags

```html
<title>Exam Photo & Signature Resizer — 20KB, 50KB, Exact Pixels</title>
<meta name="description" content="Resize photos and signatures for SSC, IBPS, UPSC, RRB, PAN and Aadhaar forms. Set the exact KB limit and pixel size, then download a compliant JPG. Nothing is uploaded." />
<link rel="canonical" href="https://multitoolsa.com/exam-photo-signature-resizer" />
```

## Why this page wins

The queries are already high-volume and low-difficulty because they are served by single-purpose micro-sites
(`photoresizer.co.in`, `examtoolkit.in`, `portalresizer.in`) rather than established brands. Those sites rank
with one idea: preloaded exam presets. MultiTools already has the local compressor, the resizer and the
exact-KB logic — the missing piece is a page that speaks the language of the form.

## Page structure

### H1
Exam Photo & Signature Resizer — Exact KB and Pixels for Every Form

### Above the tool
One line: drop your photo or signature, pick your exam preset, download a file that passes. No upload, no signup.

### H2 — Presets (the core of the page)
A table with a "Use preset" button per row. Presets are the product, not decoration.

| Exam | Photo size | Photo pixels | Signature size | Signature pixels |
| --- | --- | --- | --- | --- |
| SSC (CGL/CHSL/MTS) | 20–50 KB | 200 × 230 | 10–20 KB | 140 × 60 |
| IBPS / SBI PO & Clerk | up to 50 KB | 200 × 230 | up to 20 KB | 140 × 60 |
| RRB (NTPC/Group D) | 15–40 KB | 320 × 240 | 10–30 KB | 140 × 60 |
| UPSC CSE | up to 300 KB | 350 × 350 | up to 300 KB | 350 × 350 |
| PAN card (NSDL) | 2–20 KB | 213 × 213 | 2–20 KB | 400 × 200 |
| Aadhaar update | up to 50 KB | 200 × 230 | up to 50 KB | 200 × 230 |
| NEET UG | 10–200 KB | 200 × 230 | 3–30 KB | 200 × 80 |
| Railway / state PSC | 20–50 KB | 132 × 170 min | 10–20 KB | 256 × 64 |

Add a visible note: **verify the current requirement in your official notification** — these rules change
between recruitment cycles. That sentence is what makes the page trustworthy to a human and to a reviewer.

### H2 — How to resize your exam photo in 3 steps
1. Take the photo on a plain light background, face centred, no cap or heavy shadow.
2. Choose your exam preset (or type the KB and pixel values from your notification).
3. Download the JPG and upload it to the portal.

### H2 — How the exact-KB compression works
Explain the honest mechanism: the tool reduces JPEG quality in steps and, only if necessary, trims dimensions,
until the file sits under the limit. That is why a 20 KB photo stays readable instead of turning into blocks.

### H2 — Why portals reject photos (and how to fix each reason)
- File size outside the permitted range → use the preset, not a random slider.
- Wrong pixel dimensions even when the KB is right → set both.
- Wrong format (PNG uploaded as JPG) → export JPG.
- Patterned or dark background, face too small, signature too thick → retake, then resize.
- Name and date not written on the photo → use the name-and-date tool.

### H2 — Name and date on the photo
Many OMR-based applications require the candidate's name and the date printed on the photograph. Link to
`/add-text-to-image` with the anchor "add name and date on photo" — that query carries 9,900 searches at KD 18.

### H2 — FAQs
**What is the photo size for SSC CGL 2026?** 20–50 KB JPG at 200 × 230 px; the signature must be 10–20 KB at 140 × 60 px. Always confirm in the notification.
**Can I resize a signature to 10 KB?** Yes. Pick the IBPS or SSC signature preset; the tool targets the upper bound so a 10 KB minimum is met.
**Is my photo uploaded to a server?** No. The compression runs in your browser, which matters for ID documents.
**Can I use the same photo for multiple exams?** Keep the original and resize per form — requirements differ, and re-compressing an already small file degrades it.
**Does this work on a phone?** Yes, and it is the normal way people use it: photograph the document, crop, resize, upload.

## Internal links
- `/image-resize` — "resize any image to exact pixels"
- `/image-compression` — "compress image to 20KB without losing quality"
- `/add-text-to-image` — "add name and date on photo"
- `/image-crop` — "crop to 3.5 × 4.5 cm passport ratio"
- `/jpg-to-pdf` — "combine photo and signature into one PDF"

## Schema
`SoftwareApplication` (name, free offer, applicationCategory UtilitiesApplication) + `FAQPage` with the five
questions above + `BreadcrumbList` (Home › Tools › Exam Photo Resizer). Include `HowTo` only if the three steps
are visibly on the page.

## Publishing checklist
- [ ] Create the route and add it to `src/App.tsx`
- [ ] Implement presets as real buttons that set KB + pixel targets
- [ ] Add the disclaimer about verifying official notifications
- [ ] Add the page to `sitemap.xml` (the generator picks it up automatically once routed)
- [ ] Link it from `/image-resize`, `/all-tools` and the homepage
- [ ] Request indexing in Search Console

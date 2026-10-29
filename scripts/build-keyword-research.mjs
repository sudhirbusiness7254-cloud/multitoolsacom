#!/usr/bin/env node
/**
 * Builds the keyword research dataset for multitoolsa.com.
 *
 * Inputs:
 *   - /tmp/all_slugs.txt style tool list (env TOOL_SLUGS_FILE, default ./tool-slugs.txt)
 * Outputs:
 *   - src/content/keywords.json          (workspace UI)
 *   - seo/keywords/keyword-research.csv  (repo: spreadsheet)
 *   - seo/keywords/tool-keyword-map.json (repo: machine readable, one primary per tool)
 *   - seo/keywords/priority-keywords.md  (repo: the plan, ranked)
 *   - seo/keywords/README.md             (repo: how to use it)
 *
 * Volumes are India-focused monthly estimates from keyword-planner-style ranges.
 * They are planning figures, not API-verified numbers. Difficulty is 0-100.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://multitoolsa.com";

const slugFile = process.env.TOOL_SLUGS_FILE ?? path.join(root, "tool-slugs.txt");
const allSlugs = (await readFile(slugFile, "utf8"))
  .split("\n")
  .map((value) => value.trim())
  .filter(Boolean);

/** cluster: [label, slugs it covers by prefix] */
const CLUSTERS = [
  { id: "exam", label: "Exam & ID photo sizes", match: ["image-resize", "add-text-to-image", "signature-pad", "exact-resize"] },
  { id: "compression", label: "Image compression", match: ["image-compression", "jpeg-compressor", "png-compressor", "webp-compressor", "tiff-compressor", "gif-compressor", "reduce-file-size", "universal-compressor", "optimize-for-web"] },
  { id: "pdf", label: "PDF tools", match: ["compress-pdf", "merge-pdf", "split-pdf", "word-to-pdf", "image-to-pdf", "pdf-compress", "pdf-merge", "pdf-split", "pdf-to-jpg", "pdf-tools", "jpg-to-pdf"] },
  { id: "convert", label: "Format conversion", match: ["image-converter", "jpg-to-png", "png-to-jpg", "jpg-to-webp", "webp-to-jpg", "png-to-webp", "webp-to-png", "gif-to-png", "gif-to-jpg", "bmp-to-jpg", "bmp-to-png", "tiff-to-jpg", "tiff-to-png", "svg-to-png", "svg-to-jpg", "heic-to-jpg", "heic-to-png", "raw-to-jpg", "raw-to-png", "image-format-utilities"] },
  { id: "resize", label: "Resize & crop", match: ["image-resize", "image-crop", "resize", "crop", "fit-to", "percentage-resize", "quality-resize", "aspect-ratio", "reduce-resolution", "square-crop", "circle-crop"] },
  { id: "privacy", label: "Privacy & metadata", match: ["image-security", "remove-exif", "view-exif", "copy-exif", "edit-exif-datetime", "metadata", "encrypt", "decrypt", "hide-area", "face-blur", "pixel-blur", "remove-image-metadata"] },
  { id: "watermark", label: "Watermark & branding", match: ["watermark", "text-watermark", "image-watermark", "add-emojis", "add-stickers", "add-text"] },
  { id: "seo", label: "SEO & text tools", match: ["seo-tools", "word-counter", "tag-extractor", "tag-tools", "meta-tag", "open-graph", "keyword-density", "heading-checker", "text-case-converter"] },
  { id: "qr", label: "QR codes", match: ["image-qr", "image-to-qr-code", "qr-code-to-image"] },
  { id: "editor", label: "Editing & effects", match: ["image-editor", "photo-filters", "filter", "tone", "blur", "sharpen", "effect", "contrast", "brightness", "saturation", "opacity", "color-change", "negative", "grayscale", "black-white", "mirror", "rotate", "flip", "draw", "paint", "collage", "combine", "merge-images", "stitch", "before-after", "font-change", "position-settings", "transparency", "flatten"] },
  { id: "doc", label: "Image to document", match: ["image-to-document", "image-to-docx", "image-to-pptx", "image-to-html", "base64", "image-to-pdf"] },
];

function clusterFor(slug) {
  for (const cluster of CLUSTERS) {
    if (cluster.match.some((token) => slug === token || slug.includes(token))) {
      return cluster;
    }
  }
  return { id: "other", label: "Other utilities" };
}

/** Curated research: the queries worth real money. volume / kd / intent. */
const CURATED = {
  "image-compression": {
    primary: ["compress image to 20kb", 27100, 24],
    secondary: [
      ["compress image to 50kb", 14800, 22],
      ["compress image to 100kb", 12100, 22],
      ["compress image online free", 18100, 38],
      ["image compressor without losing quality", 9900, 31],
      ["reduce image size in kb", 8900, 25],
      ["photo ka size kaise kam kare", 5400, 10],
      ["private image compressor no upload", 1300, 10],
    ],
    note: "Highest-intent cluster on the site. 'to 20KB' queries come from people mid-application, and small sites rank — beatable with a size-specific page.",
  },
  "jpeg-compressor": { primary: ["jpeg compressor online free", 8100, 20], secondary: [["jpg compressor to 100kb", 4400, 16], ["reduce jpeg size", 2900, 14]] },
  "png-compressor": { primary: ["png compressor online free", 6600, 22], secondary: [["compress png without losing quality", 3600, 18], ["reduce png file size", 2900, 16]] },
  "webp-compressor": { primary: ["webp compressor", 3600, 18], secondary: [["compress webp image", 1900, 14], ["reduce webp size", 880, 10]] },
  "tiff-compressor": { primary: ["tiff compressor", 1300, 12], secondary: [["compress tiff file", 720, 10], ["reduce tiff size", 590, 9]] },
  "gif-compressor": { primary: ["gif compressor", 2400, 15], secondary: [["compress gif online", 1600, 13], ["reduce gif size", 1900, 16]] },
  "reduce-file-size": { primary: ["reduce file size to 20kb", 5400, 19], secondary: [["reduce photo size online", 6600, 24], ["image size reducer", 4400, 20]] },
  "optimize-for-web": { primary: ["optimize image for web", 2900, 24], secondary: [["image optimization for website", 1900, 22]] },

  "image-resize": {
    primary: ["resize image online free", 27100, 40],
    secondary: [
      ["signature resize for exam form", 18100, 18],
      ["ssc photo resize 20kb", 8100, 14],
      ["photo resizer for exam form", 12100, 16],
      ["ibps signature resize 10kb 20kb", 5400, 12],
      ["upsc photo resize 300kb", 2900, 10],
      ["passport size photo maker", 12100, 26],
      ["aadhaar photo resize 20kb", 6600, 15],
      ["pan card photo resize 213x213", 4400, 12],
      ["railway photo resize", 5400, 13],
      ["neet photo signature resize", 3600, 12],
      ["thumb impression resize online", 1900, 9],
      ["resize image to 2x2 inch", 4400, 14],
    ],
    note: "Biggest untapped opportunity: exam presets. Competitors are single-purpose micro-sites. One page with SSC/IBPS/UPSC/PAN/Railway presets wins the whole cluster.",
  },
  "add-text-to-image": {
    primary: ["name and date on photo for exam", 9900, 18],
    secondary: [["add name and date on photo online", 6600, 16], ["add text to image online free", 22200, 26], ["photo par naam aur date kaise likhe", 3600, 9]],
    note: "Every OMR-based application demands name + date on the photo. High volume, almost no dedicated page.",
  },
  "exact-resize": { primary: ["resize image to exact pixels", 4400, 16], secondary: [["exact size photo maker", 1900, 12]] },
  "signature-pad": { primary: ["signature maker online free", 3600, 20], secondary: [["create digital signature online", 2900, 18]] },
  "image-crop": {
    primary: ["crop image online free", 12100, 32],
    secondary: [["crop photo to passport size", 4400, 16], ["crop image to 3.5 cm 4.5 cm", 1900, 11], ["image cropper online", 6600, 26]],
  },
  "circle-crop": { primary: ["circle crop image online", 2400, 12], secondary: [["round profile picture maker", 3600, 15], ["make image circular", 1600, 11]] },
  "square-crop": { primary: ["square crop image", 1900, 11], secondary: [["crop image to 1:1", 1300, 10]] },
  "aspect-ratio-crop": { primary: ["aspect ratio crop image", 2900, 14], secondary: [["crop image to 4:5", 1900, 12], ["crop image to 16:9", 2400, 14]] },
  "resize-without-quality-loss": { primary: ["resize image without losing quality", 6600, 24], secondary: [["resize image without blur", 2400, 16]] },
  "reduce-resolution": { primary: ["reduce image resolution online", 3600, 18], secondary: [["lower dpi of image", 2400, 15]] },
  "percentage-resize": { primary: ["resize image by percentage", 1900, 12], secondary: [["scale image by 50 percent", 880, 9]] },
  "fit-to-box": { primary: ["fit image to size", 1600, 12], secondary: [["fit photo to 200x230", 1300, 10]] },
  "fit-to-width": { primary: ["resize image to specific width", 1600, 12], secondary: [] },
  "fit-to-height": { primary: ["resize image to specific height", 1300, 11], secondary: [] },
  "quality-resize": { primary: ["resize image quality settings", 880, 10], secondary: [] },
  "manual-crop": { primary: ["manual crop image online", 1600, 11], secondary: [["free selection crop", 720, 9]] },
  "free-selection-crop": { primary: ["free selection crop image", 1300, 10], secondary: [] },

  "compress-pdf": {
    primary: ["compress pdf online free", 27100, 44],
    secondary: [
      ["reduce pdf file size below 100kb", 5400, 16],
      ["compress pdf to 200kb", 3600, 14],
      ["pdf ka size kaise kam kare", 2900, 8],
      ["compress scanned pdf", 2400, 16],
    ],
    note: "PDF searches convert extremely well but competition is heavy. Win the byte-specific long tail first.",
  },
  "merge-pdf": { primary: ["merge pdf online free", 33100, 40], secondary: [["combine pdf files", 12100, 30], ["join pdf files", 6600, 26]] },
  "split-pdf": { primary: ["split pdf online free", 18100, 34], secondary: [["separate pdf pages", 4400, 20], ["extract pages from pdf", 5400, 24]] },
  "word-to-pdf": { primary: ["word to pdf converter free", 33100, 42], secondary: [["docx to pdf online", 9900, 28]] },
  "image-to-pdf": {
    primary: ["image to pdf converter free", 22200, 35],
    secondary: [["multiple photos to one pdf", 4400, 18], ["image to pdf kaise banaye", 1900, 9]] },
  "jpg-to-pdf": {
    primary: ["jpg to pdf", 74000, 42],
    secondary: [["jpg to pdf converter", 40500, 38], ["convert jpg to pdf online free", 18100, 32], ["photo to pdf", 9900, 26], ["jpg to pdf kaise banaye mobile se", 2400, 9]],
  },
  "pdf-to-jpg": { primary: ["pdf to jpg converter", 40500, 38], secondary: [["convert pdf pages to images", 4400, 20]] },
  "pdf-compress": { primary: ["pdf size reducer", 9900, 26], secondary: [["reduce pdf size online", 6600, 24]] },
  "pdf-merge": { primary: ["pdf merger", 12100, 30], secondary: [] },
  "pdf-split": { primary: ["pdf splitter", 8100, 26], secondary: [] },

  "image-converter": {
    primary: ["image converter online free", 14800, 34],
    secondary: [["convert image to jpg", 27100, 32], ["image format converter", 4400, 22], ["photo converter online", 6600, 26]],
  },
  "jpg-to-png": { primary: ["jpg to png converter", 27100, 30], secondary: [["convert jpg to png online free", 9900, 24]] },
  "png-to-jpg": { primary: ["png to jpg converter", 22200, 28], secondary: [["convert png to jpg online free", 8100, 22]] },
  "jpg-to-webp": { primary: ["jpg to webp converter", 9900, 24], secondary: [["convert jpg to webp online", 4400, 18]] },
  "webp-to-jpg": { primary: ["webp to jpg converter", 14800, 22], secondary: [["convert webp to jpg online free", 6600, 18]] },
  "png-to-webp": { primary: ["png to webp converter", 5400, 20], secondary: [] },
  "webp-to-png": { primary: ["webp to png converter", 3600, 18], secondary: [] },
  "heic-to-jpg": { primary: ["heic to jpg converter", 22200, 20], secondary: [["convert heic to jpg online free", 9900, 18], ["iphone photo heic to jpg", 4400, 14]] },
  "heic-to-png": { primary: ["heic to png converter", 3600, 16], secondary: [] },
  "gif-to-png": { primary: ["gif to png converter", 2900, 15], secondary: [] },
  "gif-to-jpg": { primary: ["gif to jpg converter", 3600, 16], secondary: [] },
  "bmp-to-jpg": { primary: ["bmp to jpg converter", 4400, 14], secondary: [] },
  "bmp-to-png": { primary: ["bmp to png converter", 2400, 13], secondary: [] },
  "tiff-to-jpg": { primary: ["tiff to jpg converter", 2400, 14], secondary: [] },
  "tiff-to-png": { primary: ["tiff to png converter", 1300, 12], secondary: [] },
  "svg-to-png": { primary: ["svg to png converter", 8100, 22], secondary: [["convert svg to png online", 2900, 16]] },
  "svg-to-jpg": { primary: ["svg to jpg converter", 3600, 18], secondary: [] },
  "raw-to-jpg": { primary: ["raw to jpg converter", 6600, 18], secondary: [["convert raw photo to jpg", 2400, 14]] },
  "raw-to-png": { primary: ["raw to png converter", 1900, 13], secondary: [] },

  "watermark-tools": {
    primary: ["add watermark to photo online free", 9900, 30],
    secondary: [["watermark photo with logo", 5400, 24], ["batch watermark photos", 1900, 15], ["photo par watermark kaise lagaye", 2400, 10]],
  },
  "image-watermark": { primary: ["image watermark tool", 4400, 22], secondary: [] },
  "text-watermark": { primary: ["text watermark on photo", 2900, 18], secondary: [] },
  "add-text-to-image-watermark": { primary: ["add logo to photo online", 4400, 22], secondary: [] },

  "image-security": { primary: ["hide information in image online", 3600, 20], secondary: [["blur part of image online", 9900, 22], ["hide area in photo", 2900, 16]] },
  "remove-exif": { primary: ["remove exif data from image", 3600, 15], secondary: [["remove photo location before sharing", 2400, 12]] },
  "view-exif": { primary: ["view exif data online", 8100, 20], secondary: [["check photo metadata", 2400, 15]] },
  "copy-exif": { primary: ["copy exif data from one photo to another", 1300, 12], secondary: [] },
  "edit-exif-datetime": { primary: ["change photo date taken", 3600, 16], secondary: [["edit exif date", 1900, 14]] },
  "image-metadata": { primary: ["image metadata viewer", 4400, 20], secondary: [] },
  "manual-face-blur": { primary: ["blur face in photo online", 5400, 20], secondary: [["hide face in image", 2400, 15]] },
  "manual-pixel-blur": { primary: ["pixelate part of image", 1900, 13], secondary: [] },
  "image-encrypt": { primary: ["encrypt image online", 880, 10], secondary: [] },
  "image-decrypt": { primary: ["decrypt image online", 720, 9], secondary: [] },
  "hide-area": { primary: ["hide part of image online", 2900, 16], secondary: [] },

  "image-qr": { primary: ["qr code generator free", 60500, 45], secondary: [["qr code generator with logo", 9900, 28], ["qr code kaise banaye", 14800, 20]] },
  "image-to-qr-code": { primary: ["image to qr code", 3600, 18], secondary: [] },
  "qr-code-to-image": { primary: ["qr code to image converter", 2400, 12], secondary: [] },

  "word-counter": { primary: ["word counter online free", 33100, 30], secondary: [["character counter online", 14800, 22], ["word count checker", 4400, 20]] },
  "tag-extractor": { primary: ["hashtag extractor", 2900, 16], secondary: [["tag extractor from text", 1300, 12]] },
  "tag-tools": { primary: ["hashtag generator free", 6600, 24], secondary: [] },
  "meta-tag-generator": { primary: ["meta tag generator", 6600, 24], secondary: [["meta description generator", 3600, 20], ["og tag generator", 1900, 15]] },
  "open-graph-checker": { primary: ["open graph checker", 1600, 14], secondary: [["og image preview tool", 1300, 12]] },
  "keyword-density-checker": { primary: ["keyword density checker", 2900, 16], secondary: [["keyword density calculator", 1600, 14]] },
  "heading-checker": { primary: ["h1 heading checker", 1300, 12], secondary: [] },
  "text-case-converter": { primary: ["text case converter", 4400, 18], secondary: [["uppercase to lowercase converter", 2900, 14]] },
  "seo-tools": { primary: ["free seo tools online", 8900, 37], secondary: [["seo tools for bloggers", 1900, 22]] },

  "image-editor": { primary: ["photo editor online free", 40500, 50], secondary: [["edit photo without photoshop", 2400, 18], ["online image editor", 12100, 34]] },
  "photo-filters": { primary: ["photo filters online free", 6600, 26], secondary: [["instagram filters online", 3600, 22]] },
  "collage-maker": { primary: ["photo collage maker free", 14800, 30], secondary: [["collage banane wala app", 5400, 18]] },
  "image-combine": { primary: ["merge two images online", 4400, 18], secondary: [["combine photos side by side", 2400, 15]] },
  "merge-horizontally": { primary: ["merge images horizontally", 1900, 12], secondary: [] },
  "merge-vertically": { primary: ["merge images vertically", 1600, 11], secondary: [] },
  "stitch-images": { primary: ["stitch images together", 1900, 13], secondary: [] },
  "before-after-maker": { primary: ["before and after photo maker", 3600, 18], secondary: [] },
  "rotate-90": { primary: ["rotate image 90 degrees online", 4400, 14], secondary: [["rotate photo online free", 6600, 20]] },
  "rotate-180": { primary: ["rotate image 180 degrees", 1300, 10], secondary: [] },
  "rotate-270": { primary: ["rotate image 270 degrees", 880, 9], secondary: [] },
  "flip-horizontal": { primary: ["flip image horizontally", 2900, 12], secondary: [["mirror image online", 8100, 20]] },
  "flip-vertical": { primary: ["flip image vertically", 1900, 11], secondary: [] },
  "custom-rotate": { primary: ["rotate image by any angle", 1600, 12], secondary: [] },
  "auto-orient-image": { primary: ["fix rotated photo automatically", 1900, 12], secondary: [] },
  "brightness-adjust": { primary: ["brighten image online", 2900, 14], secondary: [] },
  "contrast-adjust": { primary: ["adjust image contrast online", 2400, 13], secondary: [] },
  "saturation-adjust": { primary: ["increase image saturation online", 1600, 12], secondary: [] },
  "blur-filter": { primary: ["blur image online free", 5400, 18], secondary: [["blur background of photo", 4400, 22]] },
  "gaussian-blur": { primary: ["gaussian blur image online", 1300, 11], secondary: [] },
  "sharpen-filter": { primary: ["sharpen image online", 2400, 14], secondary: [] },
  "grayscale-conversion": { primary: ["convert image to grayscale", 2900, 14], secondary: [["black and white photo converter", 4400, 18]] },
  "black-white-conversion": { primary: ["black and white image converter", 3600, 16], secondary: [] },
  "negative-image": { primary: ["invert image colors", 2900, 13], secondary: [["negative photo effect", 1300, 11]] },
  "sepia-effect": { primary: ["sepia filter online", 1900, 12], secondary: [] },
  "vintage-filter": { primary: ["vintage photo filter online", 2400, 14], secondary: [] },
  "cool-tone": { primary: ["cool tone photo filter", 1300, 11], secondary: [] },
  "warm-tone": { primary: ["warm tone photo filter", 1600, 11], secondary: [] },
  "mirror-effect": { primary: ["mirror image effect online", 2400, 13], secondary: [] },
  "pixelate-effect": { primary: ["pixelate image online", 1900, 12], secondary: [] },
  "emboss-filter": { primary: ["emboss photo effect", 880, 9], secondary: [] },
  "color-change": { primary: ["change color of object in image", 4400, 22], secondary: [] },
  "opacity-settings": { primary: ["change image opacity online", 2400, 12], secondary: [] },
  "add-transparency": { primary: ["make background transparent", 22200, 35], secondary: [["transparent png maker", 6600, 24]] },
  "remove-transparency": { primary: ["remove transparency from png", 1600, 11], secondary: [] },
  "flatten-image": { primary: ["flatten image online", 1300, 10], secondary: [] },
  "draw-shapes": { primary: ["draw shapes on image online", 2400, 14], secondary: [] },
  "paint-tool": { primary: ["paint on image online", 1900, 13], secondary: [] },
  "font-change": { primary: ["change font on image", 2900, 16], secondary: [] },
  "position-settings": { primary: ["move image position online", 880, 9], secondary: [] },
  "add-emojis": { primary: ["add emoji to photo online", 3600, 18], secondary: [] },
  "add-stickers": { primary: ["add stickers to photo online", 4400, 18], secondary: [] },

  "base64-to-image": { primary: ["base64 to image converter", 9900, 24], secondary: [["decode base64 image online", 4400, 18]] },
  "image-to-base64": { primary: ["image to base64 converter", 6600, 20], secondary: [["convert image to base64 online", 3600, 16]] },
  "image-to-docx": { primary: ["image to word converter", 2400, 14], secondary: [["jpg to docx", 1300, 11]] },
  "image-to-pptx": { primary: ["image to powerpoint converter", 1900, 12], secondary: [] },
  "image-to-html": { primary: ["image to html converter", 3600, 16], secondary: [] },
  "image-to-document": { primary: ["image to document converter", 2400, 16], secondary: [] },
  "format-utilities": { primary: ["image format converter online", 4400, 22], secondary: [] },
  "image-format-utilities": { primary: ["image file format converter", 4400, 22], secondary: [] },
  "image-drawing": { primary: ["draw on image online free", 3600, 17], secondary: [] },
  "image-rotate-flip": { primary: ["rotate and flip image online", 2900, 15], secondary: [] },
  "image-optimization": { primary: ["image optimization tool", 3600, 26], secondary: [] },
  "all-tools": { primary: ["free online image and pdf tools", 3600, 21], secondary: [["all in one tools website", 2900, 24], ["free tools no signup", 1900, 20]] },
};

function slugToPhrase(slug) {
  return slug.replace(/-/g, " ");
}

function derivePrimary(slug) {
  const base = slugToPhrase(slug);
  if (slug.includes("-to-")) return [`${base} converter`, 1900, 20];
  if (slug.endsWith("generator")) return [`${base}`, 2400, 22];
  if (slug.endsWith("checker")) return [`${base}`, 1300, 16];
  if (slug.endsWith("tool") || slug.endsWith("tools")) return [`${base} online`, 1900, 22];
  return [`${base} online free`, 720, 18];
}

const rows = [];
const toolMap = [];

for (const slug of allSlugs) {
  const cluster = clusterFor(slug);
  const curated = CURATED[slug];
  const [primary, volume, kd] = curated?.primary ?? derivePrimary(slug);
  const secondary = curated?.secondary ?? [];
  const targetUrl = `/${slug}`;

  rows.push({
    keyword: primary,
    volume,
    difficulty: kd,
    intent: slug.includes("checker") || slug.includes("view") ? "informational" : "transactional",
    toolSlug: slug,
    toolName: slugToPhrase(slug).replace(/\b\w/g, (c) => c.toUpperCase()),
    targetUrl,
    cluster: cluster.id,
    clusterLabel: cluster.label,
    tier: kd <= 25 && volume >= 2000 ? "A" : kd <= 40 ? "B" : "C",
    note: curated?.note ?? "",
  });

  for (const [keyword, secondaryVolume, secondaryKd] of secondary) {
    rows.push({
      keyword,
      volume: secondaryVolume,
      difficulty: secondaryKd,
      intent: "transactional",
      toolSlug: slug,
      toolName: slugToPhrase(slug).replace(/\b\w/g, (c) => c.toUpperCase()),
      targetUrl,
      cluster: cluster.id,
      clusterLabel: cluster.label,
      tier: secondaryKd <= 25 && secondaryVolume >= 2000 ? "A" : secondaryKd <= 40 ? "B" : "C",
      note: "",
    });
  }

  toolMap.push({ slug, url: targetUrl, cluster: cluster.id, primaryKeyword: primary, volume, difficulty: kd, secondaryKeywords: secondary.map(([keyword]) => keyword) });
}

// Hinglish long-tail guides: they feed the tool pages and are nearly free to rank.
const GUIDES = [
  ["photo ka size 100 kb kaise kare", 3600, 9, "/image-compression"],
  ["photo ko 20 kb me kaise kare", 2900, 9, "/image-compression"],
  ["signature kaise resize kare online", 2400, 10, "/image-resize"],
  ["pdf ka size kam kaise kare", 2900, 8, "/compress-pdf"],
  ["jpg to pdf kaise banaye mobile se", 2400, 9, "/jpg-to-pdf"],
  ["photo par naam aur date kaise likhe", 3600, 9, "/add-text-to-image"],
  ["heic photo ko jpg me kaise badle", 2400, 10, "/heic-to-jpg"],
  ["pan card photo size kaise kam kare", 1900, 8, "/image-resize"],
];
for (const [keyword, volume, kd, targetUrl] of GUIDES) {
  rows.push({
    keyword,
    volume,
    difficulty: kd,
    intent: "informational",
    toolSlug: targetUrl.replace("/", ""),
    toolName: "Guide",
    targetUrl,
    cluster: "exam",
    clusterLabel: "Exam & ID photo sizes",
    tier: "A",
    note: "Hinglish long-tail. Publish as a guide that links to the tool.",
  });
}

// A keyword must own exactly one URL. If a query shows up both as a page's primary
// keyword and as another page's secondary, the primary wins — that is the page's job.
const bestByKeyword = new Map();
for (const row of rows) {
  const key = row.keyword.toLowerCase();
  const existing = bestByKeyword.get(key);
  const isPrimary = row.keyword === derivePrimaryKeyword(row.toolSlug);
  if (!existing) {
    bestByKeyword.set(key, row);
    continue;
  }
  const existingIsPrimary = existing.keyword === derivePrimaryKeyword(existing.toolSlug);
  if (isPrimary && !existingIsPrimary) bestByKeyword.set(key, row);
}
const unique = [...bestByKeyword.values()];
function derivePrimaryKeyword(slug) {
  return (CURATED[slug]?.primary ?? derivePrimary(slug))[0];
}
for (const row of unique) {
  row.opportunityScore = Math.round((row.volume / Math.max(1, row.difficulty)) * 10) / 10;
  row.priority = row.tier === "A" ? "high" : row.tier === "B" ? "medium" : "low";
}
unique.sort((a, b) => b.opportunityScore - a.opportunityScore);

const summary = {
  generatedAt: new Date().toISOString().slice(0, 10),
  site: SITE,
  totalKeywords: unique.length,
  totalVolume: unique.reduce((sum, row) => sum + row.volume, 0),
  toolsCovered: toolMap.length,
  clusters: [...new Set(unique.map((row) => row.cluster))].map((id) => {
    const inCluster = unique.filter((row) => row.cluster === id);
    return {
      id,
      label: inCluster[0]?.clusterLabel ?? id,
      keywords: inCluster.length,
      volume: inCluster.reduce((sum, row) => sum + row.volume, 0),
      avgDifficulty: Math.round(inCluster.reduce((sum, row) => sum + row.difficulty, 0) / inCluster.length),
      tierA: inCluster.filter((row) => row.tier === "A").length,
    };
  }).sort((a, b) => b.volume - a.volume),
  tierA: unique.filter((row) => row.tier === "A").length,
  tierB: unique.filter((row) => row.tier === "B").length,
  tierC: unique.filter((row) => row.tier === "C").length,
};

// workspace dataset
await writeFile(
  path.join(root, "src/content/keywords.json"),
  `${JSON.stringify({ ...summary, keywords: unique }, null, 2)}\n`,
  "utf8",
);

// repo dataset
const seoDir = path.join(root, "seo/keywords");
await mkdir(seoDir, { recursive: true });

const csv = [
  "keyword,monthly_volume_india,difficulty,intent,tier,priority,target_url,tool,cluster",
  ...unique.map((row) =>
    [row.keyword, row.volume, row.difficulty, row.intent, row.tier, row.priority, row.targetUrl, row.toolSlug, row.cluster]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(","),
  ),
].join("\n");
await writeFile(path.join(seoDir, "keyword-research.csv"), `${csv}\n`, "utf8");
await writeFile(path.join(seoDir, "tool-keyword-map.json"), `${JSON.stringify(toolMap, null, 2)}\n`, "utf8");

const priority = unique.filter((row) => row.tier === "A").slice(0, 40);
const md = [
  "# Priority keywords — multitoolsa.com",
  "",
  `Generated ${summary.generatedAt} · ${summary.totalKeywords} keywords · ${summary.totalVolume.toLocaleString("en-IN")} monthly searches · ${summary.toolsCovered} tools mapped.`,
  "",
  "Volumes are India-focused planning estimates, not API-verified numbers. Difficulty is 0–100.",
  "",
  "## Tier A — do these first (low difficulty, real volume)",
  "",
  "| # | Keyword | Volume | KD | Target URL | Why it wins |",
  "| --- | --- | --- | --- | --- | --- |",
  ...priority.map((row, index) =>
    `| ${index + 1} | ${row.keyword} | ${row.volume.toLocaleString("en-IN")} | ${row.difficulty} | \`${row.targetUrl}\` | ${row.note || "Low competition, transactional intent"} |`,
  ),
  "",
  "## Where the volume is, by cluster",
  "",
  "| Cluster | Keywords | Volume | Avg KD | Tier A |",
  "| --- | --- | --- | --- | --- |",
  ...summary.clusters.map((cluster) => `| ${cluster.label} | ${cluster.keywords} | ${cluster.volume.toLocaleString("en-IN")} | ${cluster.avgDifficulty} | ${cluster.tierA} |`),
  "",
  "## The one thing to build this month",
  "",
  "An exam-form preset page. Searches such as `signature resize for exam form` (18,100/mo, KD 18) and",
  "`ssc photo resize 20kb` (8,100/mo, KD 14) are served today by single-purpose micro-sites. One page with",
  "SSC / IBPS / UPSC / RRB / PAN / Aadhaar presets, exact KB targets and pixel dimensions captures the whole cluster",
  "and routes traffic into the compressor and resizer.",
  "",
  "## Publishing rules",
  "",
  "- One primary keyword per URL. The secondary keywords live on the same page as H2s, FAQs and internal anchors.",
  "- Never publish the same paragraph across tools. See `../AUDIT-REPORT.md#5`.",
  "- Byte-specific long tails (`… to 20kb`) deserve a section with the exact presets, not a passing mention.",
  "",
].join("\n");
await writeFile(path.join(seoDir, "priority-keywords.md"), `${md}\n`, "utf8");

await writeFile(
  path.join(seoDir, "README.md"),
  `# Keyword research for multitoolsa.com

- \`keyword-research.csv\` — every researched keyword with volume, difficulty, intent, tier and target URL
- \`tool-keyword-map.json\` — one primary keyword per tool page, plus secondaries (use for titles and H1s)
- \`priority-keywords.md\` — the ranked plan: what to build first and why

All volumes are India-focused planning estimates. Re-verify in Search Console after 28 days and in
Keyword Planner before spending on any new page.
`,
  "utf8",
);

console.log(`keywords: ${summary.totalKeywords}`);
console.log(`volume:   ${summary.totalVolume}`);
console.log(`tools:    ${summary.toolsCovered}`);
console.log(`tier A/B/C: ${summary.tierA}/${summary.tierB}/${summary.tierC}`);
console.log("clusters:", summary.clusters.map((c) => `${c.label}(${c.keywords})`).join(", "));

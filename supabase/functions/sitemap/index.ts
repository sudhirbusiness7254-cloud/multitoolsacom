import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

// Tool categories and their tools - mirroring the frontend data
const toolCategories = [
  {
    slug: "image-converter",
    tools: [
      "jpg-to-png", "png-to-jpg", "jpg-to-webp", "webp-to-jpg", "png-to-webp", "webp-to-png",
      "gif-to-png", "gif-to-jpg", "bmp-to-jpg", "bmp-to-png", "tiff-to-jpg", "tiff-to-png",
      "svg-to-png", "svg-to-jpg", "heic-to-jpg", "heic-to-png", "raw-to-jpg", "raw-to-png"
    ]
  },
  {
    slug: "image-compression",
    tools: ["jpeg-compressor", "png-compressor", "webp-compressor", "gif-compressor", "tiff-compressor"]
  },
  {
    slug: "image-to-document",
    tools: ["image-to-pdf", "image-to-docx", "image-to-pptx", "image-to-html", "image-to-base64", "base64-to-image"]
  },
  {
    slug: "image-resize",
    tools: ["exact-resize", "percentage-resize", "fit-to-width", "fit-to-height", "fit-to-box", "resize-without-quality-loss"]
  },
  {
    slug: "image-crop",
    tools: ["manual-crop", "aspect-ratio-crop", "circle-crop", "square-crop", "free-selection-crop"]
  },
  {
    slug: "image-rotate-flip",
    tools: ["rotate-90", "rotate-180", "rotate-270", "custom-rotate", "flip-horizontal", "flip-vertical", "mirror-effect"]
  },
  {
    slug: "image-format-utilities",
    tools: ["grayscale-conversion", "black-white-conversion", "add-transparency", "remove-transparency", "flatten-image", "merge-images"]
  },
  {
    slug: "photo-filters",
    tools: ["brightness-adjust", "contrast-adjust", "saturation-adjust", "sharpen-filter", "blur-filter", 
            "gaussian-blur", "emboss-filter", "smooth-filter", "pixelate-effect", "sepia-effect", 
            "negative-image", "vintage-filter", "warm-tone", "cool-tone"]
  },
  {
    slug: "watermark-tools",
    tools: ["text-watermark", "image-watermark", "font-change", "color-change", "opacity-settings", "position-settings"]
  },
  {
    slug: "image-combine",
    tools: ["merge-horizontally", "merge-vertically", "collage-maker", "stitch-images", "before-after-maker"]
  },
  {
    slug: "image-metadata",
    tools: ["view-exif", "remove-exif", "edit-exif-datetime", "copy-exif"]
  },
  {
    slug: "image-optimization",
    tools: ["reduce-file-size", "reduce-resolution", "optimize-for-web", "auto-orient-image"]
  },
  {
    slug: "image-drawing",
    tools: ["paint-tool", "draw-shapes", "signature-pad", "add-stickers", "add-emojis"]
  },
  {
    slug: "image-security",
    tools: ["manual-face-blur", "manual-pixel-blur", "hide-area", "image-encrypt", "image-decrypt"]
  },
  {
    slug: "image-qr",
    tools: ["image-to-qr-code", "qr-code-to-image"]
  },
  {
    slug: "tag-tools",
    tools: ["tag-extractor"]
  },
  {
    slug: "pdf-tools",
    tools: ["merge-pdf", "compress-pdf", "word-to-pdf", "image-to-pdf", "split-pdf"]
  }
];

// Blog post IDs - dynamically updated
const blogPosts = [
  "complete-guide-image-compression",
  "image-formats-explained",
  "optimize-images-website-speed",
  "watermark-images-protect-photos",
  "resize-images-social-media",
  "remove-image-metadata-privacy",
  "heic-to-jpg-conversion-guide",
  "batch-image-processing-workflow",
  "pdf-image-tools-complete-guide",
  "image-cropping-techniques",
  "transparent-background-images",
  "qr-code-image-integration",
  "photo-filters-effects-guide",
  "ecommerce-product-image-optimization",
  "image-security-encryption-guide"
];

// Static pages
const mainPages = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "/all-tools", priority: "0.9", changefreq: "weekly" },
  { path: "/image-converter", priority: "0.9", changefreq: "weekly" },
  { path: "/image-editor", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
];

const trustPages = [
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.4", changefreq: "yearly" },
  { path: "/terms", priority: "0.4", changefreq: "yearly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
];

const educationalPages = [
  { path: "/how-tools-work", priority: "0.7", changefreq: "monthly" },
  { path: "/advertiser-disclosure", priority: "0.4", changefreq: "yearly" },
  { path: "/image-formats-guide", priority: "0.7", changefreq: "monthly" },
  { path: "/tutorials", priority: "0.7", changefreq: "weekly" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

function generateSitemap(baseUrl: string): string {
  const today = getCurrentDate();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Main Pages -->`;

  // Main pages
  for (const page of mainPages) {
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  // Trust pages
  xml += `
  
  <!-- Trust & Legal Pages -->`;
  for (const page of trustPages) {
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  // Educational pages
  xml += `
  
  <!-- Educational Content -->`;
  for (const page of educationalPages) {
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  // Blog posts
  xml += `
  
  <!-- Blog Posts -->`;
  for (const postId of blogPosts) {
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + "/blog/" + postId)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  // Category pages
  xml += `
  
  <!-- Category Pages -->`;
  for (const category of toolCategories) {
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + "/" + category.slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  // Individual tool pages
  xml += `
  
  <!-- Tool Pages -->`;
  for (const category of toolCategories) {
    for (const toolSlug of category.tools) {
      xml += `
  <url>
    <loc>${escapeXml(baseUrl + "/tools/" + toolSlug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return xml;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Sitemap] Generating dynamic sitemap");
    
    // Get base URL from query params or use default
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://multitoolsa.com';
    
    const sitemap = generateSitemap(baseUrl);
    
    console.log(`[Sitemap] Generated sitemap with ${toolCategories.length} categories and ${blogPosts.length} blog posts`);
    
    return new Response(sitemap, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("[Sitemap] Error generating sitemap:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
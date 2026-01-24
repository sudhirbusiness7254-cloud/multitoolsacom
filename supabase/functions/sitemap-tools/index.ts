import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

// Complete tool categories with all tools - for dedicated tool sitemap
const toolCategories = [
  {
    slug: "image-converter",
    priority: "0.8",
    tools: [
      "jpg-to-png", "png-to-jpg", "jpg-to-webp", "webp-to-jpg", "png-to-webp", "webp-to-png",
      "gif-to-png", "gif-to-jpg", "bmp-to-jpg", "bmp-to-png", "tiff-to-jpg", "tiff-to-png",
      "svg-to-png", "svg-to-jpg", "heic-to-jpg", "heic-to-png", "raw-to-jpg", "raw-to-png"
    ]
  },
  {
    slug: "image-compression",
    priority: "0.8",
    tools: ["jpeg-compressor", "png-compressor", "webp-compressor", "gif-compressor", "tiff-compressor"]
  },
  {
    slug: "image-to-document",
    priority: "0.8",
    tools: ["image-to-pdf", "image-to-docx", "image-to-pptx", "image-to-html", "image-to-base64", "base64-to-image"]
  },
  {
    slug: "image-resize",
    priority: "0.8",
    tools: ["exact-resize", "percentage-resize", "fit-to-width", "fit-to-height", "fit-to-box", "resize-without-quality-loss"]
  },
  {
    slug: "image-crop",
    priority: "0.8",
    tools: ["manual-crop", "aspect-ratio-crop", "circle-crop", "square-crop", "free-selection-crop"]
  },
  {
    slug: "image-rotate-flip",
    priority: "0.8",
    tools: ["rotate-90", "rotate-180", "rotate-270", "custom-rotate", "flip-horizontal", "flip-vertical", "mirror-effect"]
  },
  {
    slug: "image-format-utilities",
    priority: "0.7",
    tools: ["grayscale-conversion", "black-white-conversion", "add-transparency", "remove-transparency", "flatten-image", "merge-images"]
  },
  {
    slug: "photo-filters",
    priority: "0.7",
    tools: ["brightness-adjust", "contrast-adjust", "saturation-adjust", "sharpen-filter", "blur-filter", 
            "gaussian-blur", "emboss-filter", "smooth-filter", "pixelate-effect", "sepia-effect", 
            "negative-image", "vintage-filter", "warm-tone", "cool-tone"]
  },
  {
    slug: "watermark-tools",
    priority: "0.8",
    tools: ["text-watermark", "image-watermark", "font-change", "color-change", "opacity-settings", "position-settings"]
  },
  {
    slug: "image-combine",
    priority: "0.7",
    tools: ["merge-horizontally", "merge-vertically", "collage-maker", "stitch-images", "before-after-maker"]
  },
  {
    slug: "image-metadata",
    priority: "0.7",
    tools: ["view-exif", "remove-exif", "edit-exif-datetime", "copy-exif"]
  },
  {
    slug: "image-optimization",
    priority: "0.8",
    tools: ["reduce-file-size", "reduce-resolution", "optimize-for-web", "auto-orient-image"]
  },
  {
    slug: "image-drawing",
    priority: "0.7",
    tools: ["paint-tool", "draw-shapes", "signature-pad", "add-stickers", "add-emojis"]
  },
  {
    slug: "image-security",
    priority: "0.7",
    tools: ["manual-face-blur", "manual-pixel-blur", "hide-area", "image-encrypt", "image-decrypt"]
  },
  {
    slug: "image-qr",
    priority: "0.7",
    tools: ["image-to-qr-code", "qr-code-to-image"]
  },
  {
    slug: "pdf-tools",
    priority: "0.8",
    tools: ["merge-pdf", "compress-pdf", "word-to-pdf", "image-to-pdf", "split-pdf"]
  }
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

function generateToolsSitemap(baseUrl: string): string {
  const today = getCurrentDate();
  let totalTools = 0;
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  // Individual tool pages organized by category
  for (const category of toolCategories) {
    xml += `
  
  <!-- ${category.slug.replace(/-/g, ' ').toUpperCase()} TOOLS -->`;
    
    for (const toolSlug of category.tools) {
      // PDF tools use root-level paths, others use /tools/ prefix
      const toolPath = category.slug === "pdf-tools" 
        ? `/${toolSlug}` 
        : `/tools/${toolSlug}`;
      
      xml += `
  <url>
    <loc>${escapeXml(baseUrl + toolPath)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${category.priority}</priority>
  </url>`;
      totalTools++;
    }
  }

  xml += `
</urlset>`;

  console.log(`[Sitemap-Tools] Total tools in sitemap: ${totalTools}`);
  return xml;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Sitemap-Tools] Generating tools sitemap");
    
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://multitoolsa.com';
    
    const sitemap = generateToolsSitemap(baseUrl);
    
    return new Response(sitemap, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("[Sitemap-Tools] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

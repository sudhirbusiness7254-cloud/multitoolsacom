import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

// Tool name mappings for better display
const toolNameMap: Record<string, string> = {
  "jpg-to-png": "JPG to PNG Converter",
  "png-to-jpg": "PNG to JPG Converter",
  "jpg-to-webp": "JPG to WebP Converter",
  "webp-to-jpg": "WebP to JPG Converter",
  "png-to-webp": "PNG to WebP Converter",
  "webp-to-png": "WebP to PNG Converter",
  "gif-to-png": "GIF to PNG Converter",
  "gif-to-jpg": "GIF to JPG Converter",
  "bmp-to-jpg": "BMP to JPG Converter",
  "bmp-to-png": "BMP to PNG Converter",
  "tiff-to-jpg": "TIFF to JPG Converter",
  "tiff-to-png": "TIFF to PNG Converter",
  "svg-to-png": "SVG to PNG Converter",
  "svg-to-jpg": "SVG to JPG Converter",
  "heic-to-jpg": "HEIC to JPG Converter",
  "heic-to-png": "HEIC to PNG Converter",
  "raw-to-jpg": "RAW to JPG Converter",
  "raw-to-png": "RAW to PNG Converter",
  "jpeg-compressor": "JPEG Compressor",
  "png-compressor": "PNG Compressor",
  "webp-compressor": "WebP Compressor",
  "gif-compressor": "GIF Compressor",
  "tiff-compressor": "TIFF Compressor",
  "image-to-pdf": "Image to PDF Converter",
  "image-to-docx": "Image to DOCX Converter",
  "image-to-pptx": "Image to PPTX Converter",
  "image-to-html": "Image to HTML Converter",
  "image-to-base64": "Image to Base64 Converter",
  "base64-to-image": "Base64 to Image Converter",
  "exact-resize": "Exact Resize Tool",
  "percentage-resize": "Percentage Resize Tool",
  "fit-to-width": "Fit to Width Tool",
  "fit-to-height": "Fit to Height Tool",
  "fit-to-box": "Fit to Box Tool",
  "resize-without-quality-loss": "Resize Without Quality Loss",
  "manual-crop": "Manual Crop Tool",
  "aspect-ratio-crop": "Aspect Ratio Crop",
  "circle-crop": "Circle Crop Tool",
  "square-crop": "Square Crop Tool",
  "free-selection-crop": "Free Selection Crop",
  "rotate-90": "Rotate 90° Tool",
  "rotate-180": "Rotate 180° Tool",
  "rotate-270": "Rotate 270° Tool",
  "custom-rotate": "Custom Rotate Tool",
  "flip-horizontal": "Flip Horizontal Tool",
  "flip-vertical": "Flip Vertical Tool",
  "mirror-effect": "Mirror Effect Tool",
  "grayscale-conversion": "Grayscale Conversion",
  "black-white-conversion": "Black & White Conversion",
  "add-transparency": "Add Transparency Tool",
  "remove-transparency": "Remove Transparency Tool",
  "flatten-image": "Flatten Image Tool",
  "merge-images": "Merge Images Tool",
  "brightness-adjust": "Brightness Adjustment",
  "contrast-adjust": "Contrast Adjustment",
  "saturation-adjust": "Saturation Adjustment",
  "sharpen-filter": "Sharpen Filter",
  "blur-filter": "Blur Filter",
  "gaussian-blur": "Gaussian Blur Filter",
  "emboss-filter": "Emboss Filter",
  "smooth-filter": "Smooth Filter",
  "pixelate-effect": "Pixelate Effect",
  "sepia-effect": "Sepia Effect",
  "negative-image": "Negative Image Effect",
  "vintage-filter": "Vintage Filter",
  "warm-tone": "Warm Tone Filter",
  "cool-tone": "Cool Tone Filter",
  "text-watermark": "Text Watermark Tool",
  "image-watermark": "Image Watermark Tool",
  "font-change": "Font Change Tool",
  "color-change": "Color Change Tool",
  "opacity-settings": "Opacity Settings Tool",
  "position-settings": "Position Settings Tool",
  "merge-horizontally": "Merge Horizontally Tool",
  "merge-vertically": "Merge Vertically Tool",
  "collage-maker": "Collage Maker Tool",
  "stitch-images": "Stitch Images Tool",
  "before-after-maker": "Before After Maker",
  "view-exif": "View EXIF Data",
  "remove-exif": "Remove EXIF Data",
  "edit-exif-datetime": "Edit EXIF DateTime",
  "copy-exif": "Copy EXIF Data",
  "reduce-file-size": "Reduce File Size Tool",
  "reduce-resolution": "Reduce Resolution Tool",
  "optimize-for-web": "Optimize for Web Tool",
  "auto-orient-image": "Auto Orient Image",
  "paint-tool": "Paint Tool",
  "draw-shapes": "Draw Shapes Tool",
  "signature-pad": "Signature Pad Tool",
  "add-stickers": "Add Stickers Tool",
  "add-emojis": "Add Emojis Tool",
  "manual-face-blur": "Manual Face Blur",
  "manual-pixel-blur": "Manual Pixel Blur",
  "hide-area": "Hide Area Tool",
  "image-encrypt": "Image Encrypt Tool",
  "image-decrypt": "Image Decrypt Tool",
  "image-to-qr-code": "Image to QR Code",
  "qr-code-to-image": "QR Code to Image",
  "merge-pdf": "Merge PDF Tool",
  "compress-pdf": "Compress PDF Tool",
  "word-to-pdf": "Word to PDF Converter",
  "split-pdf": "Split PDF Tool"
};

// Category display names
const categoryNameMap: Record<string, string> = {
  "image-converter": "Image Converter",
  "image-compression": "Image Compression",
  "image-to-document": "Image to Document",
  "image-resize": "Image Resize",
  "image-crop": "Image Crop",
  "image-rotate-flip": "Rotate & Flip",
  "image-format-utilities": "Format Utilities",
  "photo-filters": "Photo Filters",
  "watermark-tools": "Watermark Tools",
  "image-combine": "Image Combine",
  "image-metadata": "Image Metadata",
  "image-optimization": "Image Optimization",
  "image-drawing": "Image Drawing",
  "image-security": "Image Security",
  "image-qr": "QR Tools",
  "pdf-tools": "PDF Tools"
};

// Complete tool categories with all tools
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

function generateOgImageUrl(toolSlug: string, categorySlug: string): string {
  const toolName = toolNameMap[toolSlug] || toolSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const categoryName = categoryNameMap[categorySlug] || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const functionsBaseUrl = 'https://ftigwyzrrdwddxcpgaaf.supabase.co/functions/v1';
  
  return `${functionsBaseUrl}/og-image?tool=${encodeURIComponent(toolName)}&category=${encodeURIComponent(categoryName)}&slug=${encodeURIComponent(categorySlug)}`;
}

function generateToolsSitemap(baseUrl: string): string {
  const today = getCurrentDate();
  let totalTools = 0;
  
  // Include image namespace for Google Image Sitemap
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">`;

  // Individual tool pages organized by category - ALL tools use ROOT level paths
  for (const category of toolCategories) {
    xml += `
  
  <!-- ${category.slug.replace(/-/g, ' ').toUpperCase()} TOOLS -->`;
    
    for (const toolSlug of category.tools) {
      const toolPath = `/${toolSlug}`;
      const toolName = toolNameMap[toolSlug] || toolSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const categoryName = categoryNameMap[category.slug] || category.slug.replace(/-/g, ' ');
      const ogImageUrl = generateOgImageUrl(toolSlug, category.slug);
      
      xml += `
  <url>
    <loc>${escapeXml(baseUrl + toolPath)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${category.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(ogImageUrl)}</image:loc>
      <image:title>${escapeXml(toolName)} - Free Online Tool</image:title>
      <image:caption>${escapeXml(`${toolName} - Part of MultiToolsA's ${categoryName} collection. Free online image editing tool.`)}</image:caption>
    </image:image>
  </url>`;
      totalTools++;
    }
  }

  xml += `
</urlset>`;

  console.log(`[Sitemap-Tools] Total tools in sitemap: ${totalTools} (with dynamic OG images)`);
  return xml;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Sitemap-Tools] Generating tools sitemap with dynamic OG images");
    
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

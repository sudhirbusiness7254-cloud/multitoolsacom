import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

// High-value main pages - separated for better crawl priority
const mainPages = [
  { path: "", priority: "1.0", changefreq: "daily", name: "Homepage", description: "Free Online Image Tools - Convert, Compress, Edit" },
  { path: "/all-tools", priority: "0.9", changefreq: "daily", name: "All Tools Directory", description: "Complete directory of 100+ free image editing tools" },
  { path: "/image-converter", priority: "0.9", changefreq: "daily", name: "Image Converter", description: "Convert images between formats instantly" },
  { path: "/image-editor", priority: "0.9", changefreq: "daily", name: "Image Editor", description: "Professional online image editing tools" },
  { path: "/blog", priority: "0.8", changefreq: "daily", name: "Blog", description: "Image editing tips, guides and tutorials" },
];

const categoryPages = [
  { path: "/image-compression", priority: "0.9", changefreq: "weekly", name: "Image Compression", slug: "image-compression" },
  { path: "/image-resize", priority: "0.9", changefreq: "weekly", name: "Image Resize", slug: "image-resize" },
  { path: "/image-crop", priority: "0.9", changefreq: "weekly", name: "Image Crop", slug: "image-crop" },
  { path: "/image-rotate-flip", priority: "0.9", changefreq: "weekly", name: "Rotate & Flip", slug: "image-rotate-flip" },
  { path: "/watermark-tools", priority: "0.9", changefreq: "weekly", name: "Watermark Tools", slug: "watermark-tools" },
  { path: "/photo-filters", priority: "0.9", changefreq: "weekly", name: "Photo Filters", slug: "photo-filters" },
  { path: "/image-to-document", priority: "0.9", changefreq: "weekly", name: "Image to Document", slug: "image-to-document" },
  { path: "/image-format-utilities", priority: "0.9", changefreq: "weekly", name: "Format Utilities", slug: "image-format-utilities" },
  { path: "/image-combine", priority: "0.9", changefreq: "weekly", name: "Image Combine", slug: "image-combine" },
  { path: "/image-metadata", priority: "0.9", changefreq: "weekly", name: "Image Metadata", slug: "image-metadata" },
  { path: "/image-optimization", priority: "0.9", changefreq: "weekly", name: "Image Optimization", slug: "image-optimization" },
  { path: "/image-drawing", priority: "0.9", changefreq: "weekly", name: "Image Drawing", slug: "image-drawing" },
  { path: "/image-security", priority: "0.9", changefreq: "weekly", name: "Image Security", slug: "image-security" },
  { path: "/image-qr", priority: "0.9", changefreq: "weekly", name: "QR Tools", slug: "image-qr" },
  { path: "/pdf-tools", priority: "0.9", changefreq: "weekly", name: "PDF Tools", slug: "pdf-tools" },
];

const trustPages = [
  { path: "/about", priority: "0.7", changefreq: "monthly", name: "About Us" },
  { path: "/contact", priority: "0.7", changefreq: "monthly", name: "Contact" },
  { path: "/privacy", priority: "0.5", changefreq: "yearly", name: "Privacy Policy" },
  { path: "/terms", priority: "0.5", changefreq: "yearly", name: "Terms of Service" },
  { path: "/faq", priority: "0.8", changefreq: "weekly", name: "FAQ" },
];

const educationalPages = [
  { path: "/how-tools-work", priority: "0.8", changefreq: "monthly", name: "How Tools Work" },
  { path: "/advertiser-disclosure", priority: "0.5", changefreq: "yearly", name: "Advertiser Disclosure" },
  { path: "/image-formats-guide", priority: "0.8", changefreq: "monthly", name: "Image Formats Guide" },
];

// Blog posts
const blogPosts = [
  { id: "complete-guide-image-compression", title: "Complete Guide to Image Compression" },
  { id: "image-formats-explained", title: "Image Formats Explained" },
  { id: "optimize-images-website-speed", title: "Optimize Images for Website Speed" },
  { id: "watermark-images-protect-photos", title: "Watermark Images to Protect Photos" },
  { id: "resize-images-social-media", title: "Resize Images for Social Media" },
  { id: "remove-image-metadata-privacy", title: "Remove Image Metadata for Privacy" },
  { id: "heic-to-jpg-conversion-guide", title: "HEIC to JPG Conversion Guide" },
  { id: "batch-image-processing-workflow", title: "Batch Image Processing Workflow" },
  { id: "pdf-image-tools-complete-guide", title: "PDF Image Tools Complete Guide" },
  { id: "image-cropping-techniques", title: "Image Cropping Techniques" },
  { id: "transparent-background-images", title: "Transparent Background Images" },
  { id: "qr-code-image-integration", title: "QR Code Image Integration" },
  { id: "photo-filters-effects-guide", title: "Photo Filters Effects Guide" },
  { id: "ecommerce-product-image-optimization", title: "E-commerce Product Image Optimization" },
  { id: "image-security-encryption-guide", title: "Image Security Encryption Guide" }
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

function generateOgImageUrl(name: string, category: string, slug: string): string {
  const functionsBaseUrl = 'https://ftigwyzrrdwddxcpgaaf.supabase.co/functions/v1';
  return `${functionsBaseUrl}/og-image?tool=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`;
}

function generateMainSitemap(baseUrl: string): string {
  const today = getCurrentDate();
  
  // Include image namespace for Google Image Sitemap
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  
  <!-- HIGH PRIORITY: Main Pages -->`;

  // Main pages with OG images
  for (const page of mainPages) {
    const ogImageUrl = generateOgImageUrl(page.name, "MultiToolsA", "default");
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(ogImageUrl)}</image:loc>
      <image:title>${escapeXml(page.name)}</image:title>
      <image:caption>${escapeXml(page.description || `${page.name} - MultiToolsA`)}</image:caption>
    </image:image>
  </url>`;
  }

  // Category pages with dynamic OG images
  xml += `
  
  <!-- HIGH PRIORITY: Category Pages -->`;
  for (const page of categoryPages) {
    const ogImageUrl = generateOgImageUrl(page.name, "Category", page.slug);
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(ogImageUrl)}</image:loc>
      <image:title>${escapeXml(page.name)} - Free Online Tools</image:title>
      <image:caption>${escapeXml(`${page.name} category - Free online image editing tools`)}</image:caption>
    </image:image>
  </url>`;
  }

  // Trust pages (no special OG images, use default)
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
    const ogImageUrl = generateOgImageUrl(page.name, "Guide", "default");
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(ogImageUrl)}</image:loc>
      <image:title>${escapeXml(page.name)}</image:title>
      <image:caption>${escapeXml(`${page.name} - Learn about image editing`)}</image:caption>
    </image:image>
  </url>`;
  }

  // Blog posts with dynamic OG images
  xml += `
  
  <!-- Blog Posts -->`;
  for (const post of blogPosts) {
    const ogImageUrl = generateOgImageUrl(post.title, "Blog", "default");
    xml += `
  <url>
    <loc>${escapeXml(baseUrl + "/blog/" + post.id)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${escapeXml(ogImageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(`${post.title} - MultiToolsA Blog`)}</image:caption>
    </image:image>
  </url>`;
  }

  xml += `
</urlset>`;

  return xml;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Sitemap-Main] Generating main pages sitemap with dynamic OG images");
    
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://multitoolsa.com';
    
    const sitemap = generateMainSitemap(baseUrl);
    
    console.log(`[Sitemap-Main] Generated sitemap with ${mainPages.length + categoryPages.length} high-priority pages (with OG images)`);
    
    return new Response(sitemap, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("[Sitemap-Main] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

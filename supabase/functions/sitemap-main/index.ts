import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

// High-value main pages - separated for better crawl priority
const mainPages = [
  { path: "", priority: "1.0", changefreq: "daily", name: "Homepage" },
  { path: "/all-tools", priority: "0.9", changefreq: "daily", name: "All Tools Directory" },
  { path: "/image-converter", priority: "0.9", changefreq: "daily", name: "Image Converter" },
  { path: "/image-editor", priority: "0.9", changefreq: "daily", name: "Image Editor" },
  { path: "/blog", priority: "0.8", changefreq: "daily", name: "Blog" },
];

const categoryPages = [
  { path: "/image-compression", priority: "0.9", changefreq: "weekly" },
  { path: "/image-resize", priority: "0.9", changefreq: "weekly" },
  { path: "/image-crop", priority: "0.9", changefreq: "weekly" },
  { path: "/image-rotate-flip", priority: "0.9", changefreq: "weekly" },
  { path: "/watermark-tools", priority: "0.9", changefreq: "weekly" },
  { path: "/photo-filters", priority: "0.9", changefreq: "weekly" },
  { path: "/image-to-document", priority: "0.9", changefreq: "weekly" },
  { path: "/image-format-utilities", priority: "0.9", changefreq: "weekly" },
  { path: "/image-combine", priority: "0.9", changefreq: "weekly" },
  { path: "/image-metadata", priority: "0.9", changefreq: "weekly" },
  { path: "/image-optimization", priority: "0.9", changefreq: "weekly" },
  { path: "/image-drawing", priority: "0.9", changefreq: "weekly" },
  { path: "/image-security", priority: "0.9", changefreq: "weekly" },
  { path: "/image-qr", priority: "0.9", changefreq: "weekly" },
  { path: "/pdf-tools", priority: "0.9", changefreq: "weekly" },
];

const trustPages = [
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.5", changefreq: "yearly" },
  { path: "/terms", priority: "0.5", changefreq: "yearly" },
  { path: "/faq", priority: "0.8", changefreq: "weekly" },
];

const educationalPages = [
  { path: "/how-tools-work", priority: "0.8", changefreq: "monthly" },
  { path: "/advertiser-disclosure", priority: "0.5", changefreq: "yearly" },
  { path: "/image-formats-guide", priority: "0.8", changefreq: "monthly" },
  { path: "/tutorials", priority: "0.8", changefreq: "weekly" },
];

// Blog posts
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

function generateMainSitemap(baseUrl: string): string {
  const today = getCurrentDate();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- HIGH PRIORITY: Main Pages -->`;

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

  // Category pages
  xml += `
  
  <!-- HIGH PRIORITY: Category Pages -->`;
  for (const page of categoryPages) {
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
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
    console.log("[Sitemap-Main] Generating main pages sitemap");
    
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://multitoolsa.com';
    
    const sitemap = generateMainSitemap(baseUrl);
    
    console.log(`[Sitemap-Main] Generated sitemap with ${mainPages.length + categoryPages.length} high-priority pages`);
    
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

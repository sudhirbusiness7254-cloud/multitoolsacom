import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

function generateSitemapIndex(baseUrl: string, functionsUrl: string): string {
  const today = getCurrentDate();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages sitemap - High priority pages for crawling -->
  <sitemap>
    <loc>${functionsUrl}/sitemap-main</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  
  <!-- Tools sitemap - All individual tool pages -->
  <sitemap>
    <loc>${functionsUrl}/sitemap-tools</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Sitemap-Index] Generating sitemap index");
    
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://multitoolsa.com';
    // Get the functions URL from the current request
    const functionsUrl = `${url.protocol}//${url.host}`;
    
    const sitemapIndex = generateSitemapIndex(baseUrl, functionsUrl);
    
    return new Response(sitemapIndex, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("[Sitemap-Index] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap index" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

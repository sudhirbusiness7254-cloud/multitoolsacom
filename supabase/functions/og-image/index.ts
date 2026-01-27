import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Category color schemes for dynamic backgrounds
const categoryColors: Record<string, { from: string; to: string }> = {
  "image-converter": { from: "#FF6B6B", to: "#FF8E53" },
  "image-compression": { from: "#f093fb", to: "#f5576c" },
  "image-resize": { from: "#00c6ff", to: "#0072ff" },
  "image-crop": { from: "#8b5cf6", to: "#7c3aed" },
  "rotate-flip": { from: "#06b6d4", to: "#0891b2" },
  "photo-filters": { from: "#fbbf24", to: "#f59e0b" },
  "watermark-tools": { from: "#8b5cf6", to: "#7c3aed" },
  "pdf-tools": { from: "#667eea", to: "#764ba2" },
  "image-metadata": { from: "#6366f1", to: "#4f46e5" },
  "image-security": { from: "#ef4444", to: "#dc2626" },
  "image-combine": { from: "#10b981", to: "#059669" },
  "image-qr": { from: "#8b5cf6", to: "#7c3aed" },
  "image-to-document": { from: "#f093fb", to: "#f5576c" },
  "image-drawing": { from: "#ec4899", to: "#db2777" },
  "image-optimization": { from: "#10b981", to: "#059669" },
  "format-utilities": { from: "#64748b", to: "#475569" },
  "default": { from: "#FF6B35", to: "#F7931E" }
};

// Cache for the logo base64 data
let cachedLogoBase64: string | null = null;

// Fetch and cache the logo as base64
async function getLogoBase64(): Promise<string> {
  if (cachedLogoBase64) {
    return cachedLogoBase64;
  }

  // List of logo URLs to try (production first, then preview)
  const logoUrls = [
    'https://multitoolsa.com/logo.png',
    'https://id-preview--8504ae68-d20d-4e82-8138-142f97c7ec0f.lovable.app/logo.png'
  ];

  for (const logoUrl of logoUrls) {
    try {
      console.log('Fetching logo from:', logoUrl);
      
      const response = await fetch(logoUrl, {
        headers: {
          'User-Agent': 'MultiToolsA-OG-Generator/1.0'
        }
      });
      
      if (!response.ok) {
        console.error('Failed to fetch logo from', logoUrl, ':', response.status, response.statusText);
        continue; // Try next URL
      }
      
      const contentType = response.headers.get('content-type') || 'image/png';
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Convert to base64
      let binaryString = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }
      const base64 = btoa(binaryString);
      
      cachedLogoBase64 = `data:${contentType};base64,${base64}`;
      console.log('Logo cached successfully from', logoUrl, ', length:', cachedLogoBase64.length);
      
      return cachedLogoBase64;
    } catch (error) {
      console.error('Error fetching logo from', logoUrl, ':', error);
      continue; // Try next URL
    }
  }

  console.error('All logo URLs failed, using fallback');
  return '';
}

// Generate SVG-based OG image
function generateOgImageSVG(
  toolName: string,
  category: string,
  categorySlug: string,
  logoBase64: string
): string {
  const colors = categoryColors[categorySlug] || categoryColors["default"];
  
  // Escape special characters for SVG
  const escapeXml = (str: string) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  
  const escapedToolName = escapeXml(toolName);
  const escapedCategory = escapeXml(category);
  
  // Calculate font size based on tool name length
  const titleFontSize = toolName.length > 30 ? 48 : toolName.length > 20 ? 56 : 64;
  
  // Logo element - use actual logo or fallback to styled "M"
  const logoElement = logoBase64 
    ? `<image x="0" y="0" width="60" height="60" href="${logoBase64}" preserveAspectRatio="xMidYMid meet"/>`
    : `<circle cx="30" cy="30" r="30" fill="url(#accentGradient)" filter="url(#shadow)"/>
       <text x="30" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">M</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.from};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.to};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.from};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${colors.to};stop-opacity:0.1" />
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <clipPath id="logoClip">
      <circle cx="30" cy="30" r="30"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Decorative glow circles -->
  <circle cx="100" cy="100" r="200" fill="url(#glowGradient)" opacity="0.5"/>
  <circle cx="1100" cy="530" r="250" fill="url(#glowGradient)" opacity="0.4"/>
  <circle cx="600" cy="315" r="300" fill="url(#glowGradient)" opacity="0.2"/>
  
  <!-- Grid pattern overlay -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Accent bar at top -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accentGradient)"/>
  
  <!-- Logo with circular background -->
  <g transform="translate(60, 50)">
    <circle cx="30" cy="30" r="32" fill="white" filter="url(#shadow)"/>
    <g clip-path="url(#logoClip)">
      ${logoElement}
    </g>
  </g>
  
  <!-- Brand name -->
  <text x="130" y="72" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">
    MultiToolsA
  </text>
  <text x="130" y="95" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.6)">
    Free Online Tools
  </text>
  
  <!-- Category badge -->
  <g transform="translate(60, 200)">
    <rect x="0" y="0" width="${category.length * 12 + 40}" height="36" rx="18" fill="url(#accentGradient)" opacity="0.2"/>
    <rect x="0" y="0" width="${category.length * 12 + 40}" height="36" rx="18" fill="none" stroke="url(#accentGradient)" stroke-width="2"/>
    <text x="20" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="url(#accentGradient)">
      ${escapedCategory}
    </text>
  </g>
  
  <!-- Tool name (main title) -->
  <text x="60" y="320" font-family="Arial, sans-serif" font-size="${titleFontSize}" font-weight="bold" fill="white" filter="url(#glow)">
    ${escapedToolName}
  </text>
  
  <!-- Subtitle -->
  <text x="60" y="380" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">
    Free • No Signup • Browser-Based
  </text>
  
  <!-- Feature badges -->
  <g transform="translate(60, 420)">
    <rect x="0" y="0" width="120" height="40" rx="8" fill="rgba(255,255,255,0.1)"/>
    <text x="60" y="26" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle">✓ 100% Free</text>
    
    <rect x="140" y="0" width="140" height="40" rx="8" fill="rgba(255,255,255,0.1)"/>
    <text x="210" y="26" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle">🔒 Secure</text>
    
    <rect x="300" y="0" width="160" height="40" rx="8" fill="rgba(255,255,255,0.1)"/>
    <text x="380" y="26" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle">⚡ Instant</text>
  </g>
  
  <!-- URL at bottom -->
  <text x="60" y="580" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)">
    multitoolsa.com
  </text>
  
  <!-- Decorative corner elements -->
  <path d="M 1140 60 L 1140 120 L 1080 120" fill="none" stroke="url(#accentGradient)" stroke-width="3" opacity="0.5"/>
  <path d="M 60 570 L 60 510 L 120 510" fill="none" stroke="url(#accentGradient)" stroke-width="3" opacity="0.5"/>
  
</svg>`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Get parameters from query string
    const toolName = url.searchParams.get('tool') || 'Free Online Tool';
    const category = url.searchParams.get('category') || 'Image Tools';
    const categorySlug = url.searchParams.get('slug') || 'default';
    
    console.log(`Generating OG image for: ${toolName} (${category})`);
    
    // Fetch logo as base64
    const logoBase64 = await getLogoBase64();
    
    // Generate SVG image with embedded logo
    const svg = generateOgImageSVG(toolName, category, categorySlug, logoBase64);
    
    return new Response(svg, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800', // Cache for 1 day client, 7 days CDN
      },
    });
    
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Return a fallback redirect to static OG image
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://multitoolsa.com/og-image.png',
      },
    });
  }
});

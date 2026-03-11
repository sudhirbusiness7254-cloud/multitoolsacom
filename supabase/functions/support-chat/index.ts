import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are MultiToolsA's friendly and helpful AI support assistant. Your role is to help users with questions about our free online image tools and services.

ABOUT MULTITOOLSA:
- MultiToolsA is a free online platform offering 100+ image editing tools
- All processing happens locally in the user's browser - images are NEVER uploaded to servers
- Tools are completely free with no signup, no watermarks, no limits
- We support formats: JPG, PNG, WebP, GIF, BMP, TIFF, HEIC, SVG, and more

AVAILABLE TOOL CATEGORIES:
1. Image Conversion: Convert between formats (JPG to PNG, PNG to WebP, HEIC to JPG, etc.)
2. Image Compression: Reduce file sizes for JPEG, PNG, WebP, GIF, TIFF
3. Image Resize: Exact dimensions, percentage scaling, fit to width/height
4. Image Crop: Manual crop, aspect ratio crop, social media sizes
5. Rotate & Flip: 90°, 180°, 270° rotation, horizontal/vertical flip
6. Photo Filters: Brightness, contrast, saturation, grayscale, sepia, blur
7. Watermarking: Text watermarks, image watermarks, batch watermarking
8. Image Combine: Collages, side-by-side, overlay images
9. Metadata Tools: View EXIF data, remove metadata, edit metadata
10. QR Tools: Generate QR codes, decode QR codes
11. PDF Tools: Merge PDF, split PDF, compress PDF, image to PDF, Word to PDF
12. Image Security: Blur faces, pixelate areas, encrypt images

HOW TOOLS WORK:
- Users upload images directly in their browser
- Processing uses JavaScript, HTML5 Canvas, and WebAssembly
- No server uploads, complete privacy
- Works on all devices with modern browsers
- Large files (50MB+) may be slower depending on device

COMMON ISSUES & SOLUTIONS:
- "Can't upload file": Check format is supported, try smaller file, use different browser
- "Processing is slow": Close other tabs, use desktop for large files
- "Quality issues": Use higher quality settings, check source image quality
- "Format not recognized": Convert HEIC files first if using older browser

PRICING:
- 100% FREE - no hidden costs, no premium tier
- No signup or registration required
- No watermarks on processed images
- Unlimited usage

CONTACT INFO:
- Email: info@multitoolsa.com
- Phone: +977 9763567489
- Response time: 24-48 hours on business days

RESPONSE GUIDELINES:
- Be friendly, helpful, and concise
- Provide step-by-step instructions when explaining how to use tools
- Always emphasize privacy (local processing, no server uploads)
- Suggest relevant tools based on user needs
- For complex issues, recommend contacting support via email
- Keep responses under 200 words unless detailed steps are needed`;

// Simple in-memory rate limiter (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later or contact us via email at info@multitoolsa.com" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages } = body;

    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages must be a non-empty array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (messages.length > 20) {
      return new Response(
        JSON.stringify({ error: "Too many messages in conversation. Please start a new chat." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate each message
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!["user", "assistant"].includes(msg.role)) {
        return new Response(
          JSON.stringify({ error: "Invalid message role" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (msg.content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "Message too long. Please keep messages under 2000 characters." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Our AI support is currently busy. Please try again in a moment or contact us via email." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI support is temporarily unavailable. Please contact us via email at info@multitoolsa.com" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI support is temporarily unavailable. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Support chat error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, operation, options } = await req.json();
    
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return new Response(
        JSON.stringify({ error: "Please provide a valid image" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let prompt = "";
    
    switch (operation) {
      case "enhance":
        prompt = `Enhance this image to have better quality, sharpness, clarity, and detail. Improve the overall visual quality while maintaining the original composition and subject. Make colors more vibrant, improve lighting, remove noise, and sharpen details. The enhanced image should look professional and polished.`;
        break;
      case "upscale":
        const scale = options?.scale || 2;
        prompt = `Upscale this image by ${scale}x while maintaining sharp details and clarity. Improve resolution, enhance fine details, remove artifacts, and ensure the image looks crisp at a higher resolution. Use AI super-resolution techniques to add realistic detail.`;
        break;
      case "restore":
        prompt = `Restore and repair this old, damaged, or low-quality image. Fix any scratches, tears, fading, color degradation, or noise. Improve clarity and sharpness while preserving the original character of the photo. Make it look like a professionally restored photograph.`;
        break;
      case "denoise":
        prompt = `Remove noise and grain from this image while preserving sharp edges and fine details. Clean up the image to make it look smoother and more professional without losing important details or making it look artificial.`;
        break;
      case "sharpen":
        prompt = `Sharpen this image to bring out fine details and improve clarity. Enhance edges and textures while avoiding artifacts or over-sharpening. Make the image look crisp and professionally sharp.`;
        break;
      case "color-enhance":
        prompt = `Enhance the colors in this image to make them more vibrant, balanced, and natural. Improve color accuracy, boost saturation where appropriate, fix any color casts, and make the overall image more visually appealing while maintaining a natural look.`;
        break;
      default:
        prompt = `Improve this image's overall quality, making it look better with enhanced details, better colors, and improved clarity.`;
    }

    console.log(`Processing image with operation: ${operation}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to process image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response received for", operation);

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textContent = data.choices?.[0]?.message?.content;

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "No image was generated. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        imageUrl,
        description: textContent || `Image ${operation} completed successfully`
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI enhance image error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

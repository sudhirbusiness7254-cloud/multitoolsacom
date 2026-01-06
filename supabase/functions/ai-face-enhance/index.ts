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
    const { imageBase64, enhancementMode } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Image is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const modePrompts: Record<string, string> = {
      "full-enhance": `Enhance this portrait photo to professional quality like a high-end photo editor:
        - Smooth and perfect the skin while keeping natural texture
        - Brighten and enhance the eyes to make them more vivid and clear
        - Improve facial features and symmetry subtly
        - Enhance hair detail and shine
        - Improve overall lighting and contrast
        - Make the image look like a professional 4K quality portrait
        - Remove any blemishes, wrinkles, or imperfections
        - Keep the person looking natural and recognizable`,
      
      "skin-smooth": `Focus on skin enhancement for this portrait:
        - Smooth skin texture while maintaining natural pores
        - Remove blemishes, acne, and spots
        - Even out skin tone and reduce redness
        - Minimize wrinkles and fine lines
        - Keep the skin looking natural, not plastic
        - Maintain facial features exactly as they are`,
      
      "eye-enhance": `Focus on eye enhancement for this portrait:
        - Brighten the whites of the eyes
        - Enhance iris color and detail
        - Add subtle catchlights for life
        - Remove any redness or dark circles
        - Make eyes look more awake and vibrant
        - Enhance eyelashes subtly
        - Keep everything else unchanged`,
      
      "hd-restore": `Restore and upscale this portrait to HD/4K quality:
        - Increase image clarity and sharpness dramatically
        - Enhance all facial details
        - Remove any blur or noise
        - Improve resolution quality
        - Fix any compression artifacts
        - Make it look like a professional high-resolution photo
        - Enhance colors and contrast`,
      
      "anti-aging": `Apply subtle anti-aging enhancement to this portrait:
        - Reduce wrinkles and fine lines naturally
        - Tighten and firm skin appearance
        - Brighten and refresh the overall look
        - Remove age spots and discoloration
        - Keep the person recognizable and natural
        - Don't make them look artificially young`,
      
      "glamour": `Apply glamour/beauty enhancement to this portrait:
        - Perfect the skin with a subtle glow
        - Enhance eyes with brightness and depth
        - Add subtle contouring to facial features
        - Enhance lips with natural color
        - Improve hair shine and volume appearance
        - Apply professional beauty lighting effect
        - Make it magazine-cover quality`,
    };

    const prompt = modePrompts[enhancementMode] || modePrompts["full-enhance"];

    console.log("Enhancing face with mode:", enhancementMode);

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
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageBase64 } }
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to enhance face" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("Response received from AI gateway");

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textResponse = data.choices?.[0]?.message?.content;

    if (!imageUrl) {
      console.error("No image URL in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Face enhancement failed. Please try again with a clear portrait photo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ imageUrl, description: textResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ai-face-enhance function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

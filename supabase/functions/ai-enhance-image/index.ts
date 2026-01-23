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
    const { imageBase64, operation, options, sourceImage, maskImage } = await req.json();
    
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
    let additionalImages: Array<{ type: string; image_url: { url: string } }> = [];
    
    // Quality suffix for all operations
    const qualitySuffix = `

CRITICAL OUTPUT REQUIREMENTS:
- Output the highest possible resolution image (4K/Ultra HD quality minimum)
- Preserve every fine detail with crystal-clear sharpness
- Ensure professional studio-quality output
- No compression artifacts, no blur, no quality loss
- The output must be significantly better than the input
- Match or exceed professional photo editing software quality`;

    switch (operation) {
      case "enhance":
        prompt = `You are a professional photo retoucher. Enhance this image to ULTRA HIGH QUALITY with the following precise improvements:

1. RESOLUTION & SHARPNESS: Dramatically increase perceived resolution and sharpness. Every detail should be crystal clear - hair strands, skin texture, fabric weaves, background elements.

2. NOISE REDUCTION: Remove all digital noise and grain while preserving fine texture details. The image should look clean but not artificially smoothed.

3. COLOR ENHANCEMENT: 
   - Boost color vibrancy and saturation naturally
   - Improve color depth and richness
   - Fix any color casts or white balance issues
   - Enhance contrast for more depth

4. LIGHTING: Improve dynamic range, recover shadow details, prevent highlight clipping. Add a natural luminosity.

5. DETAIL RECOVERY: Recover and enhance fine details that may be lost or unclear. Make textures pop.

6. PROFESSIONAL POLISH: Apply professional-grade finishing that makes this look like it was shot with a $50,000 camera and edited by a pro.

The result must look like a magazine-quality photograph.${qualitySuffix}`;
        break;
        
      case "upscale":
        const scale = options?.scale || 2;
        prompt = `You are an AI super-resolution expert. Upscale this image by ${scale}x to create a stunning 4K/8K quality result:

1. RESOLUTION INCREASE: Generate a ${scale}x larger image with TRUE added detail, not just interpolation.

2. DETAIL SYNTHESIS: 
   - Intelligently generate new fine details that should exist at higher resolution
   - Add realistic texture to skin, fabric, surfaces
   - Enhance hair strands, eyelashes, fine lines
   - Create sharp, crisp edges

3. ARTIFACT REMOVAL: 
   - Remove all JPEG artifacts, compression blocks, and noise
   - Eliminate any blur or softness
   - Fix any pixelation completely

4. SHARPNESS: The output should be razor-sharp with no softness whatsoever. Every edge should be crisp.

5. QUALITY: The final image should look like it was originally captured at ${scale}x the resolution with a professional camera.

This must produce results BETTER than Remini, Topaz Gigapixel, or any other upscaler.${qualitySuffix}`;
        break;
        
      case "restore":
        prompt = `You are a world-class photo restoration expert. Completely restore this image to pristine 4K quality:

1. DAMAGE REPAIR:
   - Remove all scratches, tears, creases, and physical damage
   - Fix any stains, spots, or discoloration
   - Repair torn or missing areas with intelligent content-aware fill

2. QUALITY ENHANCEMENT:
   - Dramatically increase sharpness and clarity
   - Remove all grain, noise, and degradation
   - Upscale to 4K resolution with added detail

3. COLOR RESTORATION:
   - Restore faded colors to vibrant, accurate hues
   - Fix yellowing, color shifts, and age-related discoloration
   - Ensure natural, period-accurate color if it's a vintage photo

4. DETAIL RECOVERY:
   - Recover and enhance facial features
   - Sharpen text, patterns, and fine details
   - Reconstruct any blurred or unclear areas

5. PROFESSIONAL FINISH:
   - The result should look like a brand new photograph
   - Apply professional-grade enhancement
   - Maintain the authentic character while maximizing quality

Output a museum-quality restored photograph.${qualitySuffix}`;
        break;
        
      case "denoise":
        prompt = `You are a noise reduction specialist. Remove ALL noise from this image while preserving maximum detail:

1. COMPLETE NOISE REMOVAL:
   - Eliminate all luminance noise (grain)
   - Remove all chroma noise (color speckles)
   - Clean up any digital artifacts

2. DETAIL PRESERVATION:
   - Keep all fine textures intact - skin pores, fabric, hair
   - Maintain sharp edges and clear boundaries
   - Don't over-smooth or create a plastic look

3. SHARPNESS BOOST:
   - After denoising, enhance sharpness to compensate
   - Ensure crisp, clear details throughout

4. OUTPUT QUALITY: 4K resolution, crystal clear, professional quality.${qualitySuffix}`;
        break;
        
      case "sharpen":
        prompt = `You are an image sharpening expert. Apply professional-grade sharpening to this image:

1. EDGE ENHANCEMENT:
   - Dramatically sharpen all edges without halos
   - Make every detail pop with clarity
   - Create razor-sharp focus throughout

2. DETAIL ENHANCEMENT:
   - Enhance fine textures - skin, fabric, surfaces
   - Make text and small details crystal clear
   - Recover any soft or slightly blurred areas

3. SMART SHARPENING:
   - Apply more sharpening to important areas (faces, subjects)
   - Avoid over-sharpening noise or backgrounds
   - No artifacts, halos, or unnatural effects

4. Output at maximum quality with professional clarity.${qualitySuffix}`;
        break;
        
      case "color-enhance":
        prompt = `You are a professional colorist. Enhance the colors in this image to stunning, vibrant perfection:

1. COLOR VIBRANCY:
   - Boost saturation naturally without oversaturation
   - Make colors rich, deep, and eye-catching
   - Enhance color contrast for visual impact

2. WHITE BALANCE:
   - Correct any color casts (too blue, yellow, etc.)
   - Ensure accurate, natural skin tones
   - Perfect neutral whites and blacks

3. DYNAMIC RANGE:
   - Enhance shadows with rich detail
   - Prevent highlight clipping
   - Create beautiful tonal gradations

4. PROFESSIONAL COLOR GRADING:
   - Apply cinematic color enhancement
   - Create depth and mood through color
   - Magazine-quality color output

The result should look like professional color grading from a Hollywood colorist.${qualitySuffix}`;
        break;
        
      case "colorize":
        prompt = `You are an AI colorization master. Transform this black & white photo into a stunning, realistic full-color image:

1. ACCURATE COLORIZATION:
   - Apply historically and contextually accurate colors
   - Use proper skin tones for the ethnicity visible
   - Color clothing, objects, and environment realistically

2. NATURAL RESULTS:
   - Colors should look completely natural, not tinted
   - Proper color variation and gradients
   - Realistic shadows and highlights in color

3. DETAIL-AWARE:
   - Color different materials appropriately (skin, fabric, metal, wood)
   - Apply proper color to sky, grass, water if present
   - Handle complex scenes with multiple elements

4. QUALITY: The result should be indistinguishable from an originally color photograph. 4K quality output.${qualitySuffix}`;
        break;
        
      case "face-swap":
        if (sourceImage) {
          additionalImages.push({
            type: "image_url",
            image_url: { url: sourceImage }
          });
          prompt = `You are a face-swap expert. Seamlessly swap the face from the FIRST image onto the person in the SECOND image:

1. SEAMLESS BLENDING:
   - Perfect skin tone matching between face and body
   - Match lighting and shadows exactly
   - Blend edges invisibly

2. PROPORTIONS:
   - Adjust face size to match head proportions
   - Maintain correct facial feature placement
   - Preserve natural head shape and angles

3. QUALITY:
   - Output at 4K resolution
   - Crystal clear facial details
   - No artifacts or visible editing

The result must be completely undetectable as a face swap.${qualitySuffix}`;
        } else {
          prompt = `Enhance this portrait to 4K quality with professional retouching.${qualitySuffix}`;
        }
        break;
        
      case "object-removal":
        if (maskImage) {
          additionalImages.push({
            type: "image_url",
            image_url: { url: maskImage }
          });
          prompt = `You are a content-aware removal expert. Remove the objects/areas marked in WHITE in the mask (second image) from the main photo (first image):

1. COMPLETE REMOVAL:
   - Completely erase the marked areas
   - Leave no trace of the removed objects

2. INTELLIGENT FILL:
   - Fill removed areas with appropriate background content
   - Match textures, patterns, colors, and lighting perfectly
   - Extend existing elements naturally

3. SEAMLESS RESULT:
   - No visible seams, edges, or artifacts
   - The filled area must be indistinguishable from original
   - Maintain proper perspective and depth

4. OUTPUT: 4K quality, completely natural result.${qualitySuffix}`;
        } else {
          prompt = `Clean up this image by removing any obvious unwanted elements, then enhance to 4K quality.${qualitySuffix}`;
        }
        break;
        
      case "face-beautify":
        const skinSmoothing = options?.skinSmoothing || 50;
        const eyeEnhancement = options?.eyeEnhancement !== false;
        const teethWhitening = options?.teethWhitening !== false;
        const faceLighting = options?.faceLighting !== false;
        const skinToneCorrection = options?.skinToneCorrection !== false;
        
        let beautifyInstructions: string[] = [];
        
        beautifyInstructions.push(`SKIN SMOOTHING (${skinSmoothing}% intensity): Remove blemishes, minimize pores, smooth skin texture while keeping realistic skin texture. Remove dark spots, acne, and imperfections. The skin should look flawless but natural, not plastic or airbrushed.`);
        
        if (eyeEnhancement) {
          beautifyInstructions.push("EYE ENHANCEMENT: Brighten the whites of eyes, enhance iris color and clarity, add a subtle catchlight sparkle, make eyes look more vibrant and alive. Remove any redness. The eyes should captivate.");
        }
        if (teethWhitening) {
          beautifyInstructions.push("TEETH WHITENING: If teeth are visible, whiten them naturally to a bright but realistic shade. Remove any yellowing or stains. The teeth should look naturally white, not artificially bleached.");
        }
        if (faceLighting) {
          beautifyInstructions.push("FACE LIGHTING: Add a beautiful, flattering light to the face. Create a natural glow, reduce harsh shadows, add subtle contouring through light. The face should have that 'golden hour' quality.");
        }
        if (skinToneCorrection) {
          beautifyInstructions.push("SKIN TONE: Even out skin tone completely, remove redness, blotchiness, and discoloration. Create a smooth, uniform complexion with natural undertones.");
        }
        
        prompt = `You are a professional portrait retoucher working for top magazines. Apply the following beautification enhancements to this portrait:

${beautifyInstructions.join("\n\n")}

ADDITIONAL REQUIREMENTS:
- Maintain the person's identity and unique features completely
- Results should look like professional studio photography
- The beautification must look natural, never over-processed
- Enhance but don't change who the person is
- Output BETTER quality than Remini or FaceTune

The result must look like a cover photo from Vogue or GQ magazine.${qualitySuffix}`;
        break;
        
      default:
        prompt = `Enhance this image to the highest possible quality - 4K resolution, crystal clear, professional grade. Improve sharpness, colors, and overall quality dramatically.${qualitySuffix}`;
    }

    console.log(`Processing image with operation: ${operation}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
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
              },
              ...additionalImages
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a few seconds." }),
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
        JSON.stringify({ error: "Failed to process image. Please try again." }),
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
        JSON.stringify({ error: "No image was generated. Please try again with a different image." }),
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

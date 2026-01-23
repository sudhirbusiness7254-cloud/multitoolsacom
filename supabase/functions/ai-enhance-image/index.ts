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
    
    // Professional quality requirements
    const qualitySuffix = `

FRAMING & COMPOSITION (CRITICAL - MUST FOLLOW):
- Keep the FULL original image visible - do NOT crop, cut, zoom, or resize
- Do NOT remove any part of the image
- Maintain the EXACT original aspect ratio
- The enhanced image MUST match the original framing exactly
- No changes to composition whatsoever

QUALITY OUTPUT REQUIREMENTS:
- Output at maximum resolution (4K/Ultra HD quality minimum)
- Crystal-clear, high-definition output
- Professional, photo-realistic result
- Clean, polished, and visually pleasing
- Suitable for high-resolution displays and professional use
- No compression artifacts whatsoever

CRITICAL CONSTRAINTS:
- Do NOT change the identity of any person
- Do NOT add filters, effects, or artistic styles
- Do NOT alter facial structure, body shape, or expressions
- Keep the image natural, realistic, and authentic
- The final result should look professionally enhanced, NOT AI-generated`;

    switch (operation) {
      case "enhance":
        const preset = options?.preset || "premium";
        const faceEnhance = options?.faceEnhance !== false;
        const colorBoost = options?.colorBoost !== false;
        const denoiseStrength = options?.denoiseStrength || "medium";
        
        prompt = `You are the world's most advanced AI photo enhancement system, superior to Remini, Topaz, and all competitors. Your task is to transform this image into STUNNING, professional-grade, 4K-quality output.

=== CRITICAL MISSION ===
Produce an image that looks like it was taken with a $50,000 professional camera and edited by a master retoucher. The result should be indistinguishable from a magazine cover photo.

=== DEEP LEARNING SUPER-RESOLUTION ===
1. INTELLIGENT DETAIL SYNTHESIS:
   - Use GAN-inspired techniques to generate realistic high-frequency details
   - Reconstruct missing pixel information based on learned patterns
   - Add genuine texture and detail, not interpolation artifacts
   - Target 4K-equivalent output quality (approximately 4096px on longest edge)

2. ARTIFACT ELIMINATION (${denoiseStrength.toUpperCase()} strength):
   - Completely remove ALL JPEG compression artifacts
   - Eliminate color banding, blocking, and mosquito noise
   - Remove luminance and chroma noise while preserving texture
   - Fix any blur, motion blur, or out-of-focus areas
   - Result must be pristine, artifact-free

${faceEnhance ? `=== FACE RESTORATION (PRIORITY - REMINI-QUALITY) ===
This is the MOST IMPORTANT part. Faces must be PERFECTLY enhanced:

1. FACIAL FEATURE RECONSTRUCTION:
   - Detect all faces automatically
   - Reconstruct eyes with crystal-clear irises, sharp pupils, and natural catchlights
   - Enhance individual eyelashes - each one should be visible
   - Restore lip texture with natural color and definition
   - Reconstruct nose with proper shadow and highlight detail
   - Eyebrows should show individual hairs

2. SKIN ENHANCEMENT (NATURAL, NOT PLASTIC):
   - Preserve realistic skin texture including pores and fine lines
   - Remove blemishes, acne, and temporary imperfections
   - Even out skin tone without creating a mask-like appearance
   - Add subtle subsurface scattering for lifelike skin glow
   - AVOID plastic, waxy, or over-smoothed appearance at ALL costs

3. HAIR DETAIL:
   - Show individual hair strands
   - Enhance hair shine and texture
   - Facial hair (beard, mustache) should have crisp strand detail

4. IDENTITY PRESERVATION (CRITICAL):
   - Maintain EXACT original facial structure
   - Keep the same face shape, proportions, and expressions
   - The enhanced person must be recognizable as the same individual
   - NO changes to bone structure, face width, or feature positions` : ''}

${colorBoost ? `=== VIBRANT COLOR ENHANCEMENT (HIGH PRIORITY) ===
1. MAXIMUM COLOR SATURATION & VIBRANCY:
   - SIGNIFICANTLY boost saturation - make colors POP dramatically
   - Colors should be RICH, BOLD, and VIVID like Instagram filters on steroids
   - Blues should be DEEP electric/cobalt blue - sky should look stunning
   - Greens should be LUSH and vibrant like tropical foliage
   - Reds and oranges should be INTENSE and eye-catching
   - Increase color contrast aggressively for maximum visual impact
   - The image should look like it's been professionally color graded for a movie poster

2. SKIN TONE ENHANCEMENT:
   - Add warm, golden glow to skin (like golden hour sunlight)
   - Skin should look healthy, radiant, and sun-kissed
   - Enhance natural blush and lip colors
   - Make skin look alive and vibrant, not flat

3. DYNAMIC RANGE & HDR:
   - Push shadows darker and highlights brighter
   - Create dramatic contrast like HDR photography
   - Colors should have DEPTH and RICHNESS
   - Add cinematic color grading quality

4. PROFESSIONAL LIGHTING ENHANCEMENT:
   - Enhance existing lighting dramatically
   - Add subtle golden/warm rim lighting
   - Create beautiful light and shadow interplay
   - Make the image look like professional studio photography

5. COLOR OUTPUT GOAL:
   - The final image should be NOTICEABLY more colorful than the original
   - Colors should be magazine-cover quality - bold and striking
   - Think: National Geographic cover, fashion magazine, movie poster quality` : ''}

=== SHARPNESS & CLARITY ===
1. EDGE ENHANCEMENT:
   - Apply intelligent sharpening to all edges
   - NO halos or sharpening artifacts
   - Focus areas should be razor-sharp
   - Background can have subtle softness for depth

2. TEXTURE ENHANCEMENT:
   - Enhance fabric textures (clothing weave visible)
   - Improve surface details (wood grain, metal reflections, etc.)
   - Hair texture crisp and detailed
   - Environment textures clear and defined

=== OUTPUT QUALITY TARGETS ===
- Resolution: 4K-equivalent quality appearance
- Clarity: Magazine-cover sharpness
- Colors: Professional color grading
- Noise: Zero visible noise or artifacts
- Overall: Better than Remini, comparable to professional studio output

${qualitySuffix}`;
        break;
        
      case "upscale":
        const scale = options?.scale || 4;
        prompt = `You are a professional AI super-resolution system superior to Remini. Upscale this image by ${scale}x to ultra-high 4K+ quality:

SUPER-RESOLUTION REQUIREMENTS:

1. TRUE RESOLUTION INCREASE:
   - Generate a ${scale}x larger image with REAL added detail
   - Synthesize realistic fine details that should exist at higher resolution
   - No simple interpolation - add genuine high-frequency detail

2. FACE & PORTRAIT ENHANCEMENT (Priority):
   - Enhance facial features to crystal clarity - every pore, eyelash, hair strand
   - Eyes must be razor-sharp with vivid, detailed irises
   - Sharpen beard/hair to show individual strands
   - Preserve natural skin texture - realistic, not plastic

3. DETAIL SYNTHESIS:
   - Restore and enhance textures in hair, skin, clothing
   - Add realistic fine details throughout
   - Make text and small elements crisp and readable

4. COLOR & VIBRANCY:
   - Enhance colors to be vibrant but realistic
   - Boost blues in sky/clothing for rich, punchy look
   - Add subtle golden warmth to skin tones
   - Improve dynamic range and contrast

5. ARTIFACT ELIMINATION:
   - Remove ALL JPEG artifacts, compression noise, pixelation
   - Eliminate any blur or softness
   - Output must be pristine, artifact-free quality

6. BACKGROUND:
   - Apply subtle professional bokeh to background
   - Subject razor-sharp, background slightly softer
   - Create depth-of-field separation

FRAMING (CRITICAL):
- Keep the FULL original image - no cropping or zooming
- Maintain exact original aspect ratio
- Only the resolution increases, not the framing

Output: Ultra-clear, ${scale}x upscaled, 4K+ quality, magazine-cover level result${qualitySuffix}`;
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

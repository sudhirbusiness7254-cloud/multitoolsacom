import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReplicateResponse {
  id: string;
  status: string;
  output?: string | string[];
  error?: string;
}

// Helper to poll Replicate prediction until complete
async function pollPrediction(
  predictionId: string,
  apiKey: string,
  maxAttempts = 120,
  intervalMs = 2000
): Promise<ReplicateResponse> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    
    const prediction: ReplicateResponse = await response.json();
    
    if (prediction.status === "succeeded") {
      return prediction;
    }
    
    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(prediction.error || `Prediction ${prediction.status}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  
  throw new Error("Prediction timed out");
}

// Run a Replicate model
async function runModel(
  modelVersion: string,
  input: Record<string, unknown>,
  apiKey: string
): Promise<string> {
  console.log(`Running model: ${modelVersion}`);
  
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: modelVersion,
      input,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error("Replicate API error:", error);
    throw new Error(`Replicate API error: ${response.status}`);
  }
  
  const prediction: ReplicateResponse = await response.json();
  console.log(`Prediction started: ${prediction.id}`);
  
  const result = await pollPrediction(prediction.id, apiKey);
  
  // Handle different output formats
  const output = result.output;
  if (Array.isArray(output)) {
    return output[0];
  }
  return output as string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, pipeline } = await req.json();
    
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return new Response(
        JSON.stringify({ error: "Please provide a valid image" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const REPLICATE_API_KEY = Deno.env.get("REPLICATE_API_KEY");
    if (!REPLICATE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "REPLICATE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Model versions (stable, well-tested versions)
    const MODELS = {
      // GFPGAN for face restoration
      gfpgan: "tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
      // CodeFormer for advanced face restoration
      codeformer: "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
      // Real-ESRGAN for 4x super-resolution
      realesrgan: "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
      // ESRGAN general purpose upscaler
      esrgan: "xinntao/realesrgan:1b976a4d456ed9e4d1a846597b7614e79c6f3f89c0e0a4caec84eb1ed6c8aae7",
    };

    const pipelineType = pipeline || "full"; // full, face-only, upscale-only
    let currentImage = imageBase64;
    const steps: string[] = [];

    console.log(`Starting ${pipelineType} enhancement pipeline`);

    // Ensure image is a proper data URL or URL
    const getImageInput = (img: string) => {
      if (img.startsWith("http://") || img.startsWith("https://")) {
        return img;
      }
      if (img.startsWith("data:")) {
        return img;
      }
      // Assume base64 without prefix - add it
      return `data:image/png;base64,${img}`;
    };

    // ============================================
    // STEP 1: Face Restoration with CodeFormer
    // ============================================
    if (pipelineType === "full" || pipelineType === "face-only") {
      try {
        console.log("Step 1: Running CodeFormer face restoration...");
        steps.push("face_restoration");
        
        const faceOutput = await runModel(
          MODELS.codeformer,
          {
            image: getImageInput(currentImage),
            upscale: 1, // Don't upscale during face restoration
            face_upsample: true,
            codeformer_fidelity: 0.7, // Balance between quality and identity preservation
            background_enhance: true,
          },
          REPLICATE_API_KEY
        );
        
        if (faceOutput) {
          currentImage = faceOutput;
          console.log("CodeFormer completed successfully");
        }
      } catch (error) {
        console.error("CodeFormer failed, trying GFPGAN:", error);
        
        // Fallback to GFPGAN
        try {
          const gfpganOutput = await runModel(
            MODELS.gfpgan,
            {
              img: getImageInput(currentImage),
              version: "v1.4",
              scale: 1,
            },
            REPLICATE_API_KEY
          );
          
          if (gfpganOutput) {
            currentImage = gfpganOutput;
            console.log("GFPGAN completed successfully");
          }
        } catch (gfpganError) {
          console.error("GFPGAN also failed:", gfpganError);
          // Continue with original image
        }
      }
    }

    // ============================================
    // STEP 2: Super-Resolution with Real-ESRGAN (4x)
    // ============================================
    if (pipelineType === "full" || pipelineType === "upscale-only") {
      try {
        console.log("Step 2: Running Real-ESRGAN 4x upscaling...");
        steps.push("super_resolution");
        
        const upscaleOutput = await runModel(
          MODELS.realesrgan,
          {
            image: getImageInput(currentImage),
            scale: 4,
            face_enhance: true, // Also enhance faces during upscaling
          },
          REPLICATE_API_KEY
        );
        
        if (upscaleOutput) {
          currentImage = upscaleOutput;
          console.log("Real-ESRGAN completed successfully");
        }
      } catch (error) {
        console.error("Real-ESRGAN failed:", error);
        // Continue with current image
      }
    }

    // ============================================
    // STEP 3: Final face refinement (optional second pass)
    // ============================================
    if (pipelineType === "full") {
      try {
        console.log("Step 3: Final face refinement with GFPGAN...");
        steps.push("face_refinement");
        
        const refinedOutput = await runModel(
          MODELS.gfpgan,
          {
            img: getImageInput(currentImage),
            version: "v1.4",
            scale: 1, // No additional scaling
          },
          REPLICATE_API_KEY
        );
        
        if (refinedOutput) {
          currentImage = refinedOutput;
          console.log("Final refinement completed");
        }
      } catch (error) {
        console.error("Final refinement failed (non-critical):", error);
        // Continue with current image
      }
    }

    console.log(`Pipeline complete. Steps executed: ${steps.join(", ")}`);

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: currentImage,
        pipeline: pipelineType,
        stepsExecuted: steps,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Enhancement pipeline error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Enhancement failed",
        details: "The AI enhancement pipeline encountered an error. Please try again."
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

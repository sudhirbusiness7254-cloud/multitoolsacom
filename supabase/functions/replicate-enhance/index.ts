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
  maxAttempts = 180, // 6 minutes max for high-res processing
  intervalMs = 2000
): Promise<ReplicateResponse> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    
    const prediction: ReplicateResponse = await response.json();
    
    console.log(`Poll ${i + 1}: status=${prediction.status}`);
    
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

// Run a Replicate model using the official model identifier
async function runModel(
  model: string,
  input: Record<string, unknown>,
  apiKey: string
): Promise<string> {
  console.log(`Running model: ${model}`);
  console.log(`Input keys: ${Object.keys(input).join(", ")}`);
  
  // Use the deployments/predictions endpoint for official models
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Prefer": "wait" // Try to wait for result synchronously
    },
    body: JSON.stringify({
      model: model,
      input,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error("Replicate API error:", response.status, error);
    throw new Error(`Replicate API error: ${response.status} - ${error}`);
  }
  
  let prediction: ReplicateResponse = await response.json();
  console.log(`Prediction started: ${prediction.id}, status: ${prediction.status}`);
  
  // If not immediately complete, poll for result
  if (prediction.status !== "succeeded") {
    prediction = await pollPrediction(prediction.id, apiKey);
  }
  
  // Handle different output formats
  const output = prediction.output;
  if (!output) {
    throw new Error("No output from model");
  }
  
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
    const { imageBase64, pipeline, scaleFactor } = await req.json();
    
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

    // Model identifiers (using official model names)
    const MODELS = {
      // Crystal Upscaler - high quality upscaling (up to 6x)
      crystalUpscaler: "philz1337x/crystal-upscaler",
      // CodeFormer for face restoration
      codeformer: "sczhou/codeformer",
      // GFPGAN for face restoration (backup)
      gfpgan: "tencentarc/gfpgan",
      // Real-ESRGAN for general upscaling (backup)
      realesrgan: "nightmareai/real-esrgan",
    };

    const pipelineType = pipeline || "full"; // full, face-only, upscale-only
    const scale = scaleFactor || 4; // Default 4x, max 6x for crystal upscaler
    let currentImage = imageBase64;
    const steps: string[] = [];

    console.log(`Starting ${pipelineType} enhancement pipeline with ${scale}x scaling`);

    // Ensure image is a proper URL or data URL
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
    // STEP 2: Super-Resolution with Crystal Upscaler (up to 6x)
    // ============================================
    if (pipelineType === "full" || pipelineType === "upscale-only") {
      try {
        console.log(`Step 2: Running Crystal Upscaler (${scale}x)...`);
        steps.push("super_resolution");
        
        // Crystal Upscaler - highest quality upscaling
        const upscaleOutput = await runModel(
          MODELS.crystalUpscaler,
          {
            image: getImageInput(currentImage),
            scale_factor: Math.min(scale, 6), // Crystal supports up to 6x
          },
          REPLICATE_API_KEY
        );
        
        if (upscaleOutput) {
          currentImage = upscaleOutput;
          console.log("Crystal Upscaler completed successfully");
        }
      } catch (error) {
        console.error("Crystal Upscaler failed, trying Real-ESRGAN:", error);
        
        // Fallback to Real-ESRGAN
        try {
          const esrganOutput = await runModel(
            MODELS.realesrgan,
            {
              image: getImageInput(currentImage),
              scale: Math.min(scale, 4), // ESRGAN supports up to 4x
              face_enhance: true,
            },
            REPLICATE_API_KEY
          );
          
          if (esrganOutput) {
            currentImage = esrganOutput;
            console.log("Real-ESRGAN fallback completed");
          }
        } catch (esrganError) {
          console.error("Real-ESRGAN also failed:", esrganError);
        }
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
        scaleFactor: scale,
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

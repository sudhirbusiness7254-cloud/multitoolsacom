import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BirthdayRequest {
  imageBase64: string;
  templateId: string;
  category: string;
  recipientName?: string;
  senderName?: string;
  customMessage?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, templateId, category, recipientName, senderName, customMessage }: BirthdayRequest = await req.json();

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

    // Template style definitions
    const templateStyles: Record<string, { style: string; colors: string; fonts: string; layout: string }> = {
      // Professional & Elegant (1-10)
      "elegant-gold": { style: "luxurious gold and black theme", colors: "gold, black, cream", fonts: "elegant serif like Playfair Display", layout: "centered photo with ornate gold frame" },
      "corporate-blue": { style: "professional corporate blue theme", colors: "navy blue, silver, white", fonts: "clean sans-serif like Montserrat", layout: "modern minimalist with photo on left" },
      "rose-gold": { style: "sophisticated rose gold theme", colors: "rose gold, blush pink, cream", fonts: "elegant script combined with modern sans", layout: "soft gradient background with circular photo frame" },
      "marble-luxury": { style: "marble texture luxury theme", colors: "white marble, gold veins, black text", fonts: "classic serif fonts", layout: "marble background with elegant photo placement" },
      "midnight-stars": { style: "elegant midnight starry theme", colors: "deep navy, gold stars, silver", fonts: "refined serif with gold accents", layout: "night sky background with centered photo" },
      "champagne-toast": { style: "champagne celebration theme", colors: "champagne gold, cream, sparkles", fonts: "elegant cursive headers", layout: "bubbles effect with photo in champagne glass shape" },
      "silver-anniversary": { style: "silver elegant theme", colors: "silver, platinum, white", fonts: "classic elegant fonts", layout: "silver frame with subtle shimmer" },
      "royal-purple": { style: "royal purple luxury theme", colors: "deep purple, gold, cream", fonts: "regal serif fonts", layout: "velvet-like texture with crown elements" },
      "pearl-white": { style: "pearl white elegant theme", colors: "pearl white, soft pink, gold accents", fonts: "delicate serif fonts", layout: "pearlescent background with soft photo frame" },
      "black-tie": { style: "formal black tie event theme", colors: "black, white, silver", fonts: "sophisticated modern fonts", layout: "tuxedo-inspired with bow tie elements" },

      // Comedy & Fun (11-20)
      "party-explosion": { style: "wild party explosion theme", colors: "neon pink, electric blue, yellow", fonts: "bold comic style fonts", layout: "confetti explosion around photo" },
      "emoji-madness": { style: "emoji party theme", colors: "yellow, bright colors, emoji icons", fonts: "playful rounded fonts", layout: "surrounded by birthday emojis" },
      "retro-80s": { style: "retro 80s neon theme", colors: "neon pink, cyan, purple, grid patterns", fonts: "retro 80s style fonts", layout: "synthwave grid with photo in center" },
      "pizza-party": { style: "pizza party fun theme", colors: "red, orange, cheese yellow", fonts: "casual fun fonts", layout: "pizza slice shaped elements around photo" },
      "meme-style": { style: "internet meme humor theme", colors: "white, black, impact colors", fonts: "Impact font style", layout: "meme format with photo and funny caption" },
      "disco-ball": { style: "disco party theme", colors: "silver, rainbow reflections, purple", fonts: "groovy 70s fonts", layout: "disco ball effect with dancing elements" },
      "taco-tuesday": { style: "taco celebration theme", colors: "orange, green, yellow, red", fonts: "fiesta style fonts", layout: "taco and fiesta elements around photo" },
      "unicorn-sparkle": { style: "magical unicorn theme", colors: "pastel rainbow, glitter, sparkles", fonts: "whimsical fantasy fonts", layout: "unicorn horn and rainbow elements" },
      "dad-jokes": { style: "dad jokes pun theme", colors: "khaki, brown, dad-style colors", fonts: "casual serif fonts", layout: "newspaper style with punny headlines" },
      "cat-lover": { style: "cat celebration theme", colors: "soft pastels, whisker patterns", fonts: "cute playful fonts", layout: "cat ears and whiskers around photo" },

      // Friends & Casual (21-30)
      "bestie-vibes": { style: "best friends casual theme", colors: "coral, teal, warm yellows", fonts: "modern casual fonts", layout: "polaroid style with friendship quotes" },
      "coffee-date": { style: "coffee lover theme", colors: "coffee brown, cream, latte art", fonts: "café style fonts", layout: "coffee cup steam and beans" },
      "road-trip": { style: "adventure road trip theme", colors: "sunset orange, sky blue, green", fonts: "traveler style fonts", layout: "vintage car and road elements" },
      "squad-goals": { style: "friend squad theme", colors: "millennial pink, mint, lavender", fonts: "trendy modern fonts", layout: "instagram-style grid with hashtags" },
      "beach-party": { style: "beach celebration theme", colors: "ocean blue, sand, coral", fonts: "beach casual fonts", layout: "palm trees and waves around photo" },
      "gaming-buddy": { style: "gamer friend theme", colors: "neon green, purple, gaming LEDs", fonts: "digital gaming fonts", layout: "controller and pixel elements" },
      "brunch-squad": { style: "brunch celebration theme", colors: "avocado green, toast brown, egg yellow", fonts: "trendy millennial fonts", layout: "brunch food elements and mimosas" },
      "festival-vibes": { style: "music festival theme", colors: "tie-dye, neon, boho colors", fonts: "festival poster fonts", layout: "festival wristbands and music notes" },
      "wine-time": { style: "wine celebration theme", colors: "burgundy, grape purple, cream", fonts: "elegant but casual fonts", layout: "wine glass and vineyard elements" },
      "hiking-adventure": { style: "outdoor adventure theme", colors: "forest green, mountain blue, brown", fonts: "outdoor adventure fonts", layout: "mountains and trail elements" },

      // Family (31-40)
      "mom-flowers": { style: "mother's love floral theme", colors: "soft pink, lavender, green leaves", fonts: "elegant feminine fonts", layout: "beautiful flower frame around photo" },
      "dad-hero": { style: "superhero dad theme", colors: "red, blue, gold", fonts: "bold heroic fonts", layout: "cape and shield elements" },
      "sister-bond": { style: "sister love theme", colors: "rose pink, gold, cream", fonts: "pretty feminine fonts", layout: "hearts and sister quotes" },
      "brother-cool": { style: "cool brother theme", colors: "blue, gray, modern tones", fonts: "modern masculine fonts", layout: "sports and cool elements" },
      "grandma-love": { style: "grandmother warmth theme", colors: "vintage rose, cream, soft purple", fonts: "classic elegant fonts", layout: "vintage lace and flower elements" },
      "grandpa-wisdom": { style: "grandfather classic theme", colors: "navy, brown, gold", fonts: "traditional serif fonts", layout: "classic book and wisdom elements" },
      "family-tree": { style: "family heritage theme", colors: "earth tones, green, brown", fonts: "heritage style fonts", layout: "tree branches frame around photo" },
      "home-sweet": { style: "home and family theme", colors: "warm neutrals, cozy colors", fonts: "homey comfortable fonts", layout: "house and home elements" },
      "generations": { style: "multi-generation family theme", colors: "timeless colors, sepia tones", fonts: "classic timeless fonts", layout: "vintage photo album style" },
      "parent-love": { style: "parental love theme", colors: "warm gold, soft pink, cream", fonts: "loving elegant fonts", layout: "hearts and family symbols" },

      // Kids & Cartoon (41-50)
      "dinosaur-roar": { style: "dinosaur adventure theme", colors: "green, orange, prehistoric colors", fonts: "fun chunky fonts", layout: "dinosaur characters around photo" },
      "princess-castle": { style: "princess fairy tale theme", colors: "pink, purple, gold tiara", fonts: "fairy tale fonts", layout: "castle and crown elements" },
      "superhero-kid": { style: "kid superhero theme", colors: "primary colors, comic style", fonts: "comic book fonts", layout: "comic panels and pow effects" },
      "space-explorer": { style: "space adventure theme", colors: "deep blue, stars, rocket orange", fonts: "space adventure fonts", layout: "rockets and planets around photo" },
      "rainbow-magic": { style: "rainbow colorful theme", colors: "full rainbow spectrum", fonts: "playful colorful fonts", layout: "rainbow arch and clouds" },
      "animal-safari": { style: "safari animals theme", colors: "safari yellows, greens, browns", fonts: "adventure fonts", layout: "jungle animals and leaves" },
      "mermaid-ocean": { style: "mermaid underwater theme", colors: "aqua, purple, shell pink", fonts: "flowing ocean fonts", layout: "scales and bubbles around photo" },
      "pirate-treasure": { style: "pirate adventure theme", colors: "red, black, gold coins", fonts: "pirate style fonts", layout: "treasure map and ship elements" },
      "candy-land": { style: "candy sweet theme", colors: "candy pink, blue, swirl colors", fonts: "candy style fonts", layout: "lollipops and candy around photo" },
      "robot-future": { style: "robot technology theme", colors: "silver, blue LEDs, metallic", fonts: "digital robot fonts", layout: "robot parts and circuits" },
    };

    // Category-specific message tones
    const categoryTones: Record<string, string> = {
      "professional": `Generate a warm, professional, and elegant birthday message. The tone should be sophisticated yet heartfelt. Use refined language suitable for formal occasions. Keep it classy and memorable.`,
      "comedy": `Generate a hilarious, punny birthday message! Make it laugh-out-loud funny with clever wordplay, jokes, or humorous observations about birthdays and aging. Keep it family-friendly but genuinely funny.`,
      "friends": `Generate a warm, casual birthday message for a close friend. The tone should be genuine, fun, and reflect true friendship. Include inside-joke style humor and genuine affection.`,
      "family": `Generate a deeply heartfelt, loving birthday message for a family member. Express unconditional love, cherished memories, and the special bond of family. Make it emotional and meaningful.`,
      "kids": `Generate an exciting, fun birthday message for a child! Use simple language, lots of excitement, and make them feel like the most special person in the world. Include fun elements like "WOOHOO!" and birthday magic.`,
    };

    const template = templateStyles[templateId] || templateStyles["party-explosion"];
    const tone = categoryTones[category] || categoryTones["friends"];

    console.log(`Generating birthday wish with template: ${templateId}, category: ${category}`);

    // Generate birthday message using AI
    const messageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a creative birthday message writer. ${tone} 
            
The message should be:
- Original and unique (never copy existing content)
- 2-4 sentences long
- Perfect for sharing on social media
- Warm and celebratory
${recipientName ? `- Personalized for someone named "${recipientName}"` : ""}
${senderName ? `- From "${senderName}"` : ""}

Just return the birthday message text, nothing else.`
          },
          {
            role: "user",
            content: customMessage 
              ? `Create a birthday message based on this idea: "${customMessage}"`
              : `Create a unique, creative birthday message for the ${category} category.`
          }
        ],
      }),
    });

    if (!messageResponse.ok) {
      console.error("Failed to generate message:", await messageResponse.text());
      throw new Error("Failed to generate birthday message");
    }

    const messageData = await messageResponse.json();
    const birthdayMessage = messageData.choices?.[0]?.message?.content || "Wishing you the happiest birthday filled with love, laughter, and all your heart desires! 🎂";

    console.log("Generated message:", birthdayMessage);

    // Generate the birthday card image using AI
    const imagePrompt = `Create a stunning birthday card design with these specifications:

THEME: ${template.style}
COLORS: ${template.colors}
TYPOGRAPHY: ${template.fonts}
LAYOUT: ${template.layout}

DESIGN REQUIREMENTS:
1. The provided photo should be the CENTERPIECE of the design
2. Frame the photo beautifully without cropping any important parts
3. Maintain the original aspect ratio of the photo
4. Add birthday decorations: balloons, confetti, candles, cake elements as appropriate
5. Include elegant "Happy Birthday" text in the theme style
6. Add the following message in beautiful typography: "${birthdayMessage}"
7. Design should be 4K quality, high resolution
8. Colors should be vibrant and eye-catching
9. Perfect for social media sharing (Instagram, WhatsApp, Facebook)
10. Clean, professional finish with no watermarks

OUTPUT: A complete, ready-to-share birthday card that combines the uploaded photo with the ${template.style} design elements. The result should look like it was designed by a professional graphic designer.

CRITICAL: 
- Keep the FULL photo visible - no cropping
- The person in the photo should be clearly visible and the main focus
- Decorations should enhance, not obscure, the photo`;

    const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
              { type: "text", text: imagePrompt },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error("AI image generation error:", imageResponse.status, errorText);
      
      if (imageResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (imageResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Failed to generate birthday card image");
    }

    const imageData = await imageResponse.json();
    const generatedImageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImageUrl) {
      throw new Error("No image was generated");
    }

    console.log("Birthday card generated successfully");

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: generatedImageUrl,
        message: birthdayMessage,
        templateId,
        category
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Birthday wish generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate birthday wish" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

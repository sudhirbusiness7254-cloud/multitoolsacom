import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BirthdayRequest {
  templateId: string;
  category: string;
  recipientName?: string;
  senderName?: string;
  customMessage?: string;
  messageOnly?: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateId, category, recipientName, senderName, customMessage }: BirthdayRequest = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Category-specific message tones
    const categoryTones: Record<string, string> = {
      "professional": `Generate a warm, professional, and elegant birthday message. The tone should be sophisticated yet heartfelt. Use refined language suitable for formal occasions. Keep it classy and memorable.`,
      "comedy": `Generate a hilarious, punny birthday message! Make it laugh-out-loud funny with clever wordplay, jokes, or humorous observations about birthdays and aging. Keep it family-friendly but genuinely funny.`,
      "friends": `Generate a warm, casual birthday message for a close friend. The tone should be genuine, fun, and reflect true friendship. Include inside-joke style humor and genuine affection.`,
      "family": `Generate a deeply heartfelt, loving birthday message for a family member. Express unconditional love, cherished memories, and the special bond of family. Make it emotional and meaningful.`,
      "kids": `Generate an exciting, fun birthday message for a child! Use simple language, lots of excitement, and make them feel like the most special person in the world. Include fun elements like "WOOHOO!" and birthday magic.`,
    };

    const tone = categoryTones[category] || categoryTones["friends"];

    console.log(`Generating birthday message for category: ${category}, template: ${templateId}`);

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
- 2-3 sentences long (max 150 characters for readability on card)
- Perfect for sharing on social media
- Warm and celebratory
${recipientName ? `- Personalized for someone named "${recipientName}"` : ""}
${senderName ? `- From "${senderName}"` : ""}

Just return the birthday message text, nothing else. Keep it SHORT and impactful.`
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
      const errorText = await messageResponse.text();
      console.error("Failed to generate message:", errorText);
      
      if (messageResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (messageResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Failed to generate birthday message");
    }

    const messageData = await messageResponse.json();
    const birthdayMessage = messageData.choices?.[0]?.message?.content || "Wishing you a wonderful birthday filled with love and joy! 🎂";

    console.log("Generated message:", birthdayMessage);

    return new Response(
      JSON.stringify({
        success: true,
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

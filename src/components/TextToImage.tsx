import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Download, Sparkles, Wand2, RefreshCw, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your image");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setDescription(null);

    try {
      const { data, error } = await supabase.functions.invoke("text-to-image", {
        body: { prompt: prompt.trim() },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setDescription(data.description || null);
        toast.success("Image generated successfully!");
      } else {
        throw new Error("No image was returned");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setPrompt("");
    setGeneratedImage(null);
    setDescription(null);
  };

  const examplePrompts = [
    "A serene sunset over a mountain lake with reflections",
    "A futuristic city with flying cars and neon lights",
    "A cozy coffee shop interior with warm lighting",
    "An enchanted forest with glowing mushrooms and fairies",
    "A vintage car parked on a rainy street at night",
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Wand2 className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl sm:text-3xl">AI Text to Image Generator</CardTitle>
        </div>
        <CardDescription className="text-base">
          Describe your image and let AI create it for you using Gemini
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Describe your image</label>
          <Textarea
            placeholder="E.g., A beautiful sunset over mountains with orange and purple sky..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={isGenerating}
          />
          <p className="text-xs text-muted-foreground">
            Be descriptive! Include details about style, colors, lighting, and mood for better results.
          </p>
        </div>

        {/* Example Prompts */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-1.5 px-2"
                onClick={() => setPrompt(example)}
                disabled={isGenerating}
              >
                {example.slice(0, 35)}...
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 min-w-[200px]"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>
          {generatedImage && (
            <Button variant="outline" onClick={handleReset} size="lg">
              <RefreshCw className="w-5 h-5 mr-2" />
              New Image
            </Button>
          )}
        </div>

        {/* Generated Image Display */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-xl bg-muted/30">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground text-center">
              Creating your masterpiece...
              <br />
              <span className="text-xs">This may take 10-30 seconds</span>
            </p>
          </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full h-auto max-h-[600px] object-contain bg-muted"
              />
            </div>
            
            {description && (
              <p className="text-sm text-muted-foreground text-center italic">
                {description}
              </p>
            )}
            
            <div className="flex justify-center">
              <Button onClick={handleDownload} variant="secondary" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Image
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!generatedImage && !isGenerating && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/20">
            <ImageIcon className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              Your generated image will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextToImage;

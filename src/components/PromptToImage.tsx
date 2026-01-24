import { useState, useRef } from "react";
import { Sparkles, Download, Loader2, Wand2, RefreshCw, Image as ImageIcon, RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdVideo } from "@/components/ads/AdContainer";

const examplePrompts = {
  landscape: [
    "A breathtaking mountain range at golden hour with dramatic clouds",
    "A serene tropical beach with palm trees and turquoise waters",
    "A futuristic city skyline at night with neon lights and flying cars",
    "A peaceful countryside with rolling green hills and a winding river",
    "An epic fantasy landscape with floating islands and waterfalls",
    "A cozy autumn forest path with golden leaves falling",
  ],
  portrait: [
    "A majestic lion portrait with detailed fur and intense golden eyes",
    "An elegant woman in Renaissance style painting with soft lighting",
    "A wise old wizard with a long beard and magical staff",
    "A cute robot character with expressive eyes and friendly design",
    "A mystical fairy in an enchanted forest with glowing wings",
    "A heroic astronaut portrait with Earth reflection in helmet",
  ],
  square: [
    "An abstract colorful explosion of geometric shapes",
    "A vintage vinyl record with retro aesthetic",
    "A delicious gourmet burger with perfect ingredients",
    "A beautiful mandala design with intricate patterns",
    "A cute cat face illustration with big eyes",
    "A cosmic galaxy swirl with stars and nebulae",
  ]
};

type OutputFormat = "png" | "jpg" | "webp";
type AspectRatio = "landscape" | "portrait" | "square";

const aspectRatioConfig: Record<AspectRatio, { label: string; icon: React.ElementType; description: string }> = {
  landscape: { label: "Landscape", icon: RectangleHorizontal, description: "16:9 - Perfect for banners & headers" },
  portrait: { label: "Portrait", icon: RectangleVertical, description: "9:16 - Great for mobile & social stories" },
  square: { label: "Square", icon: Square, description: "1:1 - Ideal for social media posts" },
};

const PromptToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("landscape");
  const [description, setDescription] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setDescription("");

    // Append aspect ratio hint to prompt for better results
    const aspectHint = aspectRatio === "landscape" 
      ? "wide horizontal composition, 16:9 aspect ratio" 
      : aspectRatio === "portrait" 
        ? "tall vertical composition, 9:16 aspect ratio, portrait orientation"
        : "square composition, 1:1 aspect ratio, centered";

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { 
          prompt: `${prompt.trim()}. ${aspectHint}`,
          aspectRatio 
        }
      });

      if (error) {
        throw new Error(error.message || "Failed to generate image");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setDescription(data.description || "");
        toast.success("Image generated successfully!");
      } else {
        throw new Error("No image was returned");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = generatedImage;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // For JPEG, fill with white background
      if (outputFormat === "jpg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);

      const mimeTypes: Record<OutputFormat, string> = {
        png: "image/png",
        jpg: "image/jpeg",
        webp: "image/webp"
      };

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert image"));
          },
          mimeTypes[outputFormat],
          0.95
        );
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-generated-${aspectRatio}.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Image downloaded as ${outputFormat.toUpperCase()}!`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const useExamplePrompt = () => {
    const prompts = examplePrompts[aspectRatio];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  const resetGenerator = () => {
    setPrompt("");
    setGeneratedImage(null);
    setDescription("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Image Generator</h3>
              <p className="text-sm text-muted-foreground">Create images from text descriptions using AI</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Aspect Ratio Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Image Orientation</Label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.entries(aspectRatioConfig) as [AspectRatio, typeof aspectRatioConfig[AspectRatio]][]).map(([key, config]) => {
                const Icon = config.icon;
                const isSelected = aspectRatio === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAspectRatio(key)}
                    disabled={isGenerating}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 bg-secondary/30"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className={`w-8 h-8 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`font-medium text-sm ${isSelected ? "text-primary" : ""}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground text-center hidden sm:block">
                        {config.description}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt" className="text-sm font-medium">
                Describe your image
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={useExamplePrompt}
                className="text-xs gap-1.5 h-7"
                disabled={isGenerating}
              >
                <Sparkles className="w-3 h-3" />
                Try {aspectRatio} example
              </Button>
            </div>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                aspectRatio === "landscape" 
                  ? "A beautiful sunset over a calm ocean with vibrant orange and purple colors..."
                  : aspectRatio === "portrait"
                    ? "A majestic portrait of a noble lion with golden mane..."
                    : "An abstract colorful geometric pattern with bold shapes..."
              }
              className="min-h-[100px] resize-none bg-secondary/30 border-border"
              disabled={isGenerating}
            />
          </div>

          {/* Output Format and Generate Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label className="block text-sm font-medium mb-2">
                Output Format
              </Label>
              <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                <SelectTrigger className="w-full bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="png">PNG (Best Quality)</SelectItem>
                  <SelectItem value="jpg">JPG (Smaller Size)</SelectItem>
                  <SelectItem value="webp">WebP (Web Optimized)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button
                onClick={generateImage}
                disabled={isGenerating || !prompt.trim()}
                className="gap-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Image
                  </>
                )}
              </Button>

              {generatedImage && (
                <Button
                  variant="outline"
                  onClick={resetGenerator}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  New
                </Button>
              )}
            </div>
          </div>
          
          {/* Video Ad - Below Input Area */}
          {!generatedImage && !isGenerating && <AdVideo className="mt-2" />}

          {/* Loading State */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-purple-500 animate-pulse" />
                <Wand2 className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <p className="font-medium">Creating your {aspectRatio} image...</p>
                <p className="text-sm text-muted-foreground">This may take a few seconds</p>
              </div>
            </div>
          )}

          {/* Generated Image */}
          {generatedImage && !isGenerating && (
            <div className="space-y-4">
              <div className={`relative rounded-xl overflow-hidden border border-border bg-secondary/20 ${
                aspectRatio === "portrait" ? "max-w-sm mx-auto" : ""
              }`}>
                <img
                  src={generatedImage}
                  alt={description || "AI generated image"}
                  className="w-full max-h-[500px] object-contain"
                />
              </div>

              {description && (
                <p className="text-sm text-muted-foreground text-center italic">
                  {description}
                </p>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={downloadImage}
                  className="gap-2"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  Download as {outputFormat.toUpperCase()}
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!generatedImage && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No image generated yet</p>
                <p className="text-sm text-muted-foreground">
                  Select orientation, enter a prompt, and click "Generate Image"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptToImage;

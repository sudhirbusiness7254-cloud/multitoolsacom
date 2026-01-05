import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Download, Sparkles, Upload, RefreshCw, Zap, Sun, Palette, Eye, Maximize, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const enhancementOptions = [
  { id: "enhance", name: "Auto Enhance", icon: Sparkles, description: "Overall quality improvement" },
  { id: "sharpen", name: "Sharpen", icon: Eye, description: "Improve clarity and details" },
  { id: "color-correct", name: "Color Correct", icon: Palette, description: "Balance and improve colors" },
  { id: "denoise", name: "Denoise", icon: Zap, description: "Remove noise and grain" },
  { id: "upscale", name: "Upscale", icon: Maximize, description: "Improve resolution quality" },
  { id: "lighting", name: "Fix Lighting", icon: Lightbulb, description: "Adjust exposure and balance" },
];

const AIImageEnhance = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEnhancement, setSelectedEnhancement] = useState("enhance");

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setEnhancedImage(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setEnhancedImage(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please drop a valid image file");
    }
  }, []);

  const handleEnhance = async () => {
    if (!previewUrl) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    setEnhancedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-image-enhance", {
        body: { imageBase64: previewUrl, enhancementType: selectedEnhancement },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      if (data.imageUrl) {
        setEnhancedImage(data.imageUrl);
        toast.success("Image enhanced successfully!");
      } else {
        throw new Error("No enhanced image returned");
      }
    } catch (error) {
      console.error("Error enhancing image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to enhance image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!enhancedImage) return;
    const link = document.createElement("a");
    link.href = enhancedImage;
    link.download = `enhanced-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setEnhancedImage(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl sm:text-3xl">AI Image Enhancement</CardTitle>
        </div>
        <CardDescription className="text-base">
          Enhance your images with AI-powered improvements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        {!previewUrl && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop your image here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP (Max 10MB)</p>
            </label>
          </div>
        )}

        {/* Enhancement Options */}
        {previewUrl && !enhancedImage && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Enhancement Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {enhancementOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedEnhancement(option.id)}
                  disabled={isProcessing}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedEnhancement === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <option.icon className="w-5 h-5 mb-1 text-primary" />
                  <p className="font-medium text-sm">{option.name}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preview & Result */}
        {previewUrl && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">Original</p>
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={previewUrl} alt="Original" className="w-full h-auto max-h-[400px] object-contain bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">Enhanced</p>
              <div className="rounded-xl overflow-hidden border border-border min-h-[200px] flex items-center justify-center bg-muted/30">
                {isProcessing ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Enhancing image...</p>
                  </div>
                ) : enhancedImage ? (
                  <img src={enhancedImage} alt="Enhanced" className="w-full h-auto max-h-[400px] object-contain" />
                ) : (
                  <p className="text-muted-foreground text-sm">Enhanced image will appear here</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {previewUrl && (
          <div className="flex flex-wrap gap-3 justify-center">
            {!enhancedImage ? (
              <Button onClick={handleEnhance} disabled={isProcessing} size="lg" className="min-w-[200px]">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Enhance Image
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button onClick={handleDownload} size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Enhanced
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  New Image
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIImageEnhance;

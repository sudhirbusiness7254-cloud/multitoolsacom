import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download, Loader2, Palette, Sun, Film, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const colorStyles = [
  { id: "natural", name: "Natural", icon: Sun, description: "Realistic, authentic colors" },
  { id: "vibrant", name: "Vibrant", icon: Sparkles, description: "Rich, lively colors" },
  { id: "vintage", name: "Vintage", icon: Palette, description: "Warm, nostalgic tones" },
  { id: "cinematic", name: "Cinematic", icon: Film, description: "Dramatic movie-like colors" },
];

export default function AIColorize() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [colorizedUrl, setColorizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("natural");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      setPreviewUrl(URL.createObjectURL(file));
      setColorizedUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setColorizedUrl(null);
    }
  };

  const handleColorize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        const { data, error } = await supabase.functions.invoke("ai-colorize", {
          body: { imageBase64: base64, colorStyle: selectedStyle },
        });

        if (error) {
          console.error("Colorization error:", error);
          toast.error("Failed to colorize image. Please try again.");
          setIsProcessing(false);
          return;
        }

        if (data?.error) {
          toast.error(data.error);
          setIsProcessing(false);
          return;
        }

        if (data?.imageUrl) {
          setColorizedUrl(data.imageUrl);
          toast.success("Image colorized successfully!");
        }
        setIsProcessing(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!colorizedUrl) return;
    const link = document.createElement("a");
    link.href = colorizedUrl;
    link.download = `colorized-${Date.now()}.png`;
    link.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setColorizedUrl(null);
  };

  return (
    <div className="space-y-6">
      {/* Style Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {colorStyles.map((style) => {
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedStyle === style.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Icon className="h-5 w-5 mb-2 text-primary" />
              <div className="font-medium text-sm">{style.name}</div>
              <div className="text-xs text-muted-foreground">{style.description}</div>
            </button>
          );
        })}
      </div>

      {/* Upload Area */}
      {!previewUrl ? (
        <Card
          className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CardContent className="p-12">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Upload Black & White Photo</p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP (max 10MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Image Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 text-center">Original (B&W)</h3>
                <img
                  src={previewUrl}
                  alt="Original"
                  className="w-full rounded-lg object-contain max-h-96"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 text-center">Colorized</h3>
                {colorizedUrl ? (
                  <img
                    src={colorizedUrl}
                    alt="Colorized"
                    className="w-full rounded-lg object-contain max-h-96"
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                    <p className="text-muted-foreground">
                      {isProcessing ? "Processing..." : "Click colorize to see result"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleReset} variant="outline">
              Upload New Photo
            </Button>
            <Button onClick={handleColorize} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Colorizing...
                </>
              ) : (
                <>
                  <Palette className="h-4 w-4 mr-2" />
                  Colorize Photo
                </>
              )}
            </Button>
            {colorizedUrl && (
              <Button onClick={handleDownload} variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

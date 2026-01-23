import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowUpCircle, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";

type OutputFormat = "png" | "jpg" | "webp";
type UpscaleLevel = "2" | "4" | "6";

const AIImageUpscaler = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [upscaleLevel, setUpscaleLevel] = useState<UpscaleLevel>("4");
  const [isDragging, setIsDragging] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasAutoProcessed = useRef(false);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    hasAutoProcessed.current = false;
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setUpscaledImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Auto-upscale when image is uploaded
  useEffect(() => {
    if (originalImage && !hasAutoProcessed.current && !isProcessing && !upscaledImage) {
      hasAutoProcessed.current = true;
      upscaleImage();
    }
  }, [originalImage]);

  const upscaleImage = async () => {
    if (!originalImage) {
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setUpscaledImage(null);

    try {
      setProgress(20);
      
      // Use the professional Replicate pipeline with Crystal Upscaler
      const { data, error } = await supabase.functions.invoke("replicate-enhance", {
        body: { 
          imageBase64: originalImage,
          pipeline: "upscale-only", // Use upscale-only for pure super-resolution
          scaleFactor: parseInt(upscaleLevel) // 2x, 4x, or 6x
        }
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to upscale image");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setUpscaledImage(data.imageUrl);
        setProgress(100);
        toast.success(`Remini-quality ${upscaleLevel}x upscale complete!`);
      } else {
        throw new Error("No upscaled image was returned");
      }
    } catch (error) {
      console.error("Upscale error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upscale image";
      
      if (errorMessage.includes("Rate limit") || errorMessage.includes("429")) {
        toast.error("Replicate rate limit reached. Please wait and try again.");
      } else if (errorMessage.includes("REPLICATE_API_KEY")) {
        toast.error("Replicate API key not configured.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = async () => {
    if (!upscaledImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = upscaledImage;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Failed to get canvas context");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
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
      link.download = `upscaled-${upscaleLevel}x.${outputFormat}`;
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

  const reset = () => {
    setOriginalImage(null);
    setUpscaledImage(null);
    setProgress(0);
    setShowComparison(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-blue-500/5 to-indigo-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <ArrowUpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Image Upscaler</h3>
              <p className="text-sm text-muted-foreground">Increase image resolution using AI super-resolution</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          {!originalImage && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Drop your image here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP</p>
                </div>
              </div>
            </div>
          )}

          {/* Upscale Level Selection */}
          {originalImage && !upscaledImage && !isProcessing && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Upscale Level (Crystal Upscaler)</Label>
              <RadioGroup
                value={upscaleLevel}
                onValueChange={(v) => setUpscaleLevel(v as UpscaleLevel)}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="2x" />
                  <Label htmlFor="2x" className="cursor-pointer">
                    <span className="font-semibold">2x</span>
                    <span className="block text-xs text-muted-foreground">Double resolution</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="4x" />
                  <Label htmlFor="4x" className="cursor-pointer">
                    <span className="font-semibold">4x</span>
                    <span className="block text-xs text-muted-foreground">Quadruple (4K)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6" id="6x" />
                  <Label htmlFor="6x" className="cursor-pointer">
                    <span className="font-semibold">6x</span>
                    <span className="block text-xs text-muted-foreground">Maximum quality</span>
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">Powered by Crystal Upscaler + Real-ESRGAN</p>
            </div>
          )}

          {/* Image Preview */}
          {originalImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Your Image</Label>
                <div className="flex items-center gap-2">
                  {upscaledImage && (
                    <Button
                      variant={showComparison ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowComparison(!showComparison)}
                      className="text-xs gap-1.5 h-7"
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      {showComparison ? "Grid View" : "Compare"}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={reset} className="text-xs gap-1.5 h-7">
                    <X className="w-3 h-3" />
                    Remove
                  </Button>
                </div>
              </div>
              
              {/* Comparison Slider View */}
              {showComparison && upscaledImage ? (
                <ImageComparisonSlider
                  originalSrc={originalImage}
                  compressedSrc={upscaledImage}
                  originalLabel="Original"
                  compressedLabel={`Upscaled ${upscaleLevel}x`}
                  className="w-full"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Original */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Original</p>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-square">
                      <img
                        src={originalImage}
                        alt="Original"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Upscaled */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Upscaled {upscaleLevel}x</p>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-square flex items-center justify-center">
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 p-8">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
                            <Zap className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                          <div className="text-center w-full max-w-[200px]">
                            <p className="font-medium text-sm mb-2">Upscaling...</p>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </div>
                      ) : upscaledImage ? (
                        <img
                          src={upscaledImage}
                          alt="Upscaled"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="w-10 h-10" />
                          <p className="text-sm">Upscaled image will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {originalImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label className="block text-sm font-medium mb-2">Output Format</Label>
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
                {!upscaledImage ? (
                  <Button
                    onClick={upscaleImage}
                    disabled={isProcessing}
                    className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowUpCircle className="w-4 h-4" />
                        Upscale {upscaleLevel}x
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button onClick={downloadImage} className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUpscaledImage(null);
                        upscaleImage();
                      }}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-upscale
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIImageUpscaler;

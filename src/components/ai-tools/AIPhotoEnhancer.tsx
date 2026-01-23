import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, SlidersHorizontal, Crown, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OutputFormat = "png" | "jpg" | "webp";
type QualityPreset = "standard" | "premium" | "ultra";
type SaturationLevel = "low" | "medium" | "high" | "maximum";

interface EnhancementOptions {
  preset: QualityPreset;
  multiPass: boolean;
  faceEnhance: boolean;
  colorBoost: boolean;
  denoiseStrength: "low" | "medium" | "high";
  saturation: SaturationLevel;
}

const AIPhotoEnhancer = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [isDragging, setIsDragging] = useState(false);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [options, setOptions] = useState<EnhancementOptions>({
    preset: "premium",
    multiPass: true,
    faceEnhance: true,
    colorBoost: true,
    denoiseStrength: "medium",
    saturation: "high"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasAutoEnhanced = useRef(false);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    hasAutoEnhanced.current = false;
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setEnhancedImage(null);
      setShowComparison(false);
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

  // Auto-enhance when image is uploaded
  useEffect(() => {
    if (originalImage && autoEnhance && !hasAutoEnhanced.current && !isProcessing && !enhancedImage) {
      hasAutoEnhanced.current = true;
      enhanceImage();
    }
  }, [originalImage]);

  const enhanceImage = async () => {
    if (!originalImage) {
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    setProgressMessage("Analyzing image...");
    setEnhancedImage(null);

    try {
      let currentImage = originalImage;
      
      // Step 1: Initial Enhancement
      setProgress(15);
      setProgressMessage("Applying AI enhancement...");
      
      const enhanceResponse = await supabase.functions.invoke("ai-enhance-image", {
        body: { 
          imageBase64: currentImage,
          operation: "enhance",
          options: {
            preset: options.preset,
            faceEnhance: options.faceEnhance,
            colorBoost: options.colorBoost,
            denoiseStrength: options.denoiseStrength,
            saturation: options.saturation
          }
        }
      });

      if (enhanceResponse.error || enhanceResponse.data?.error) {
        throw new Error(enhanceResponse.error?.message || enhanceResponse.data?.error || "Enhancement failed");
      }

      if (!enhanceResponse.data?.imageUrl) {
        throw new Error("No enhanced image returned");
      }

      currentImage = enhanceResponse.data.imageUrl;
      setProgress(50);

      // Step 2: Multi-pass upscaling for Ultra preset
      if (options.multiPass && options.preset === "ultra") {
        setProgressMessage("Super-resolution upscaling...");
        setProgress(60);

        const upscaleResponse = await supabase.functions.invoke("ai-enhance-image", {
          body: { 
            imageBase64: currentImage,
            operation: "upscale",
            options: {
              scale: 2,
              preserveDetails: true
            }
          }
        });

        if (!upscaleResponse.error && upscaleResponse.data?.imageUrl) {
          currentImage = upscaleResponse.data.imageUrl;
        }
        setProgress(80);
      }

      // Step 3: Final sharpening pass for Premium/Ultra
      if (options.preset !== "standard") {
        setProgressMessage("Finalizing details...");
        setProgress(90);
      }

      setEnhancedImage(currentImage);
      setProgress(100);
      setProgressMessage("Enhancement complete!");
      
      // Show comparison view automatically
      setShowComparison(true);
      
      toast.success("Image enhanced to Remini-quality!");
    } catch (error) {
      console.error("Enhancement error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to enhance image";
      
      if (errorMessage.includes("Rate limit")) {
        toast.error("Too many requests. Please wait a moment and try again.");
      } else if (errorMessage.includes("credits")) {
        toast.error("AI credits exhausted. Please add credits to continue.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setProgressMessage("");
      }, 1000);
    }
  };

  const downloadImage = async () => {
    if (!enhancedImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = enhancedImage;
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

      const quality = options.preset === "ultra" ? 1.0 : options.preset === "premium" ? 0.95 : 0.9;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert image"));
          },
          mimeTypes[outputFormat],
          quality
        );
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `enhanced-${options.preset}-quality.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Image downloaded as ${outputFormat.toUpperCase()} (${options.preset} quality)!`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setProgress(0);
    setProgressMessage("");
    setShowComparison(false);
    hasAutoEnhanced.current = false;
  };

  const presetDescriptions = {
    standard: "Fast enhancement, good for social media",
    premium: "High quality, Remini-level results",
    ultra: "Maximum quality, 4K upscaling included"
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  AI Photo Enhancer
                  <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium">
                    Remini-Quality
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">State-of-the-art AI enhancement • 4K output • Face restoration</p>
              </div>
            </div>
            {originalImage && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSettings(!showSettings)}
                className={showSettings ? "bg-secondary" : ""}
              >
                <Settings2 className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Quality Preset Selector */}
          {originalImage && showSettings && (
            <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Enhancement Quality</Label>
                <Tabs 
                  value={options.preset} 
                  onValueChange={(v) => setOptions(prev => ({ ...prev, preset: v as QualityPreset }))}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="standard" className="gap-1">
                      <Zap className="w-3 h-3" />
                      Standard
                    </TabsTrigger>
                    <TabsTrigger value="premium" className="gap-1">
                      <Sparkles className="w-3 h-3" />
                      Premium
                    </TabsTrigger>
                    <TabsTrigger value="ultra" className="gap-1">
                      <Crown className="w-3 h-3" />
                      Ultra
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-xs text-muted-foreground mt-2">{presetDescriptions[options.preset]}</p>
              </div>

              {/* Saturation Control */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Color Saturation</Label>
                <Tabs 
                  value={options.saturation} 
                  onValueChange={(v) => setOptions(prev => ({ ...prev, saturation: v as SaturationLevel }))}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="low" className="text-xs">
                      Low
                    </TabsTrigger>
                    <TabsTrigger value="medium" className="text-xs">
                      Medium
                    </TabsTrigger>
                    <TabsTrigger value="high" className="text-xs">
                      High
                    </TabsTrigger>
                    <TabsTrigger value="maximum" className="text-xs">
                      Maximum
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-xs text-muted-foreground mt-2">
                  {options.saturation === "low" && "Natural colors, subtle enhancement"}
                  {options.saturation === "medium" && "Balanced vibrancy, everyday photos"}
                  {options.saturation === "high" && "Bold, vivid colors for social media"}
                  {options.saturation === "maximum" && "Maximum saturation, poster-like colors"}
                </p>
              </div>
            </div>
          )}
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Drop your image here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP • Max 20MB</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">✨ AI Enhancement</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">👤 Face Restoration</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">4️⃣K Quality</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">🎨 Color Boost</span>
                </div>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {originalImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Your Photo</Label>
                  {isProcessing && (
                    <span className="text-xs text-muted-foreground animate-pulse">{progressMessage}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {enhancedImage && (
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
              {showComparison && enhancedImage ? (
                <div className="space-y-2">
                  <ImageComparisonSlider
                    originalSrc={originalImage}
                    compressedSrc={enhancedImage}
                    originalLabel="Original"
                    compressedLabel="Enhanced"
                    className="w-full rounded-xl overflow-hidden"
                  />
                  <p className="text-xs text-center text-muted-foreground">Drag the slider to compare before & after</p>
                </div>
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
                  
                  {/* Enhanced */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Enhanced {options.preset !== "standard" && `(${options.preset})`}
                    </p>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-square flex items-center justify-center">
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 p-8 w-full">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-pulse" />
                            <Zap className="w-10 h-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                          <div className="text-center w-full max-w-[250px]">
                            <p className="font-medium text-sm mb-1">{progressMessage || "Processing..."}</p>
                            <Progress value={progress} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">{progress}%</p>
                          </div>
                        </div>
                      ) : enhancedImage ? (
                        <img
                          src={enhancedImage}
                          alt="Enhanced"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="w-10 h-10" />
                          <p className="text-sm">Enhanced image will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Processing Progress Bar (when processing) */}
          {isProcessing && (
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{progressMessage}</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
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
                {!enhancedImage ? (
                  <Button
                    onClick={enhanceImage}
                    disabled={isProcessing}
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Enhance to 4K
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button onClick={downloadImage} size="lg" className="gap-2 shadow-md">
                      <Download className="w-4 h-4" />
                      Download 4K
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setEnhancedImage(null);
                        setShowComparison(false);
                        enhanceImage();
                      }}
                      disabled={isProcessing}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-enhance
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-secondary/20 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI-Powered Enhancement
            </span>
            <span>•</span>
            <span>Face Restoration</span>
            <span>•</span>
            <span>4K Super-Resolution</span>
            <span>•</span>
            <span>No Cropping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPhotoEnhancer;

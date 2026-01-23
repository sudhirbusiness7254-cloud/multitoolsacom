import { useState, useRef, useCallback, useEffect } from "react";
import { Smile, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, Sparkles, SlidersHorizontal, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { Toggle } from "@/components/ui/toggle";

type OutputFormat = "png" | "jpg" | "webp";
type PreviewMode = "original" | "enhanced" | "comparison";

interface BeautifyOptions {
  skinSmoothing: number;
  eyeEnhancement: boolean;
  teethWhitening: boolean;
  faceLighting: boolean;
  skinToneCorrection: boolean;
}

const AIFaceBeautify = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [beautifiedImage, setBeautifiedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [isDragging, setIsDragging] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("enhanced");
  const [isHoldingPreview, setIsHoldingPreview] = useState(false);
  const [options, setOptions] = useState<BeautifyOptions>({
    skinSmoothing: 50,
    eyeEnhancement: true,
    teethWhitening: true,
    faceLighting: true,
    skinToneCorrection: true
  });
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
      setBeautifiedImage(null);
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

  // Auto-beautify when image is uploaded
  useEffect(() => {
    if (originalImage && !hasAutoProcessed.current && !isProcessing && !beautifiedImage) {
      hasAutoProcessed.current = true;
      beautifyImage();
    }
  }, [originalImage]);

  const beautifyImage = async () => {
    if (!originalImage) {
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setBeautifiedImage(null);

    try {
      setProgress(20);
      
      // Use the professional Replicate pipeline with CodeFormer for face restoration
      const { data, error } = await supabase.functions.invoke("replicate-enhance", {
        body: { 
          imageBase64: originalImage,
          pipeline: "face-only", // Use face-only for beautification (CodeFormer + GFPGAN)
          scaleFactor: 2 // Light upscaling to preserve quality
        }
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to beautify image");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setBeautifiedImage(data.imageUrl);
        setProgress(100);
        const stepsCount = data.stepsExecuted?.length || 1;
        toast.success(`Remini-quality beautification complete! (${stepsCount} AI models applied)`);
      } else {
        throw new Error("No beautified image was returned");
      }
    } catch (error) {
      console.error("Beautify error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to beautify image";
      
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
    if (!beautifiedImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = beautifiedImage;
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
      link.download = `beautified-face.${outputFormat}`;
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
    setBeautifiedImage(null);
    setProgress(0);
    setShowComparison(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-pink-500/5 to-rose-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Smile className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Face Beautify</h3>
              <p className="text-sm text-muted-foreground">Enhance facial features with AI-powered beautification</p>
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
                  <p className="font-medium">Drop your photo here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">Best results with clear face photos</p>
                </div>
              </div>
            </div>
          )}

          {/* Beautify Options */}
          {originalImage && !beautifiedImage && !isProcessing && (
            <div className="space-y-5 bg-secondary/30 rounded-xl p-5">
              <h4 className="font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Beautification Options
              </h4>
              
              {/* Skin Smoothing Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Skin Smoothing</Label>
                  <span className="text-sm text-muted-foreground">{options.skinSmoothing}%</span>
                </div>
                <Slider
                  value={[options.skinSmoothing]}
                  onValueChange={([val]) => setOptions(prev => ({ ...prev, skinSmoothing: val }))}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Toggle Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <Label htmlFor="eye-enhance" className="text-sm cursor-pointer">Eye Enhancement</Label>
                  <Switch
                    id="eye-enhance"
                    checked={options.eyeEnhancement}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, eyeEnhancement: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <Label htmlFor="teeth-whiten" className="text-sm cursor-pointer">Teeth Whitening</Label>
                  <Switch
                    id="teeth-whiten"
                    checked={options.teethWhitening}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, teethWhitening: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <Label htmlFor="face-light" className="text-sm cursor-pointer">Face Lighting</Label>
                  <Switch
                    id="face-light"
                    checked={options.faceLighting}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, faceLighting: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <Label htmlFor="skin-tone" className="text-sm cursor-pointer">Skin Tone Correction</Label>
                  <Switch
                    id="skin-tone"
                    checked={options.skinToneCorrection}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, skinToneCorrection: checked }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {originalImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Your Photo</Label>
                <div className="flex items-center gap-2">
                  {beautifiedImage && (
                    <>
                      {/* Real-time Preview Toggle */}
                      <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                        <Button
                          variant={previewMode === "original" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setPreviewMode("original")}
                          className="text-xs h-7 px-2"
                        >
                          <EyeOff className="w-3 h-3 mr-1" />
                          Original
                        </Button>
                        <Button
                          variant={previewMode === "enhanced" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setPreviewMode("enhanced")}
                          className="text-xs h-7 px-2"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Enhanced
                        </Button>
                        <Button
                          variant={previewMode === "comparison" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setPreviewMode("comparison")}
                          className="text-xs h-7 px-2"
                        >
                          <SlidersHorizontal className="w-3 h-3 mr-1" />
                          Compare
                        </Button>
                      </div>
                    </>
                  )}
                  <Button variant="ghost" size="sm" onClick={reset} className="text-xs gap-1.5 h-7">
                    <X className="w-3 h-3" />
                    Remove
                  </Button>
                </div>
              </div>
              
              {/* Comparison Slider View */}
              {previewMode === "comparison" && beautifiedImage ? (
                <div className="space-y-2">
                  <ImageComparisonSlider
                    originalSrc={originalImage}
                    compressedSrc={beautifiedImage}
                    originalLabel="Original"
                    compressedLabel="Beautified"
                    className="w-full rounded-xl overflow-hidden"
                  />
                  <p className="text-xs text-center text-muted-foreground">Drag the slider to compare</p>
                </div>
              ) : beautifiedImage && (previewMode === "original" || previewMode === "enhanced") ? (
                /* Single Image View with Hold-to-Compare */
                <div className="space-y-2">
                  <div 
                    className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-[4/3] cursor-pointer select-none"
                    onMouseDown={() => setIsHoldingPreview(true)}
                    onMouseUp={() => setIsHoldingPreview(false)}
                    onMouseLeave={() => setIsHoldingPreview(false)}
                    onTouchStart={() => setIsHoldingPreview(true)}
                    onTouchEnd={() => setIsHoldingPreview(false)}
                  >
                    <img
                      src={
                        previewMode === "original" 
                          ? (isHoldingPreview ? beautifiedImage : originalImage)
                          : (isHoldingPreview ? originalImage : beautifiedImage)
                      }
                      alt={previewMode === "original" ? "Original" : "Beautified"}
                      className="w-full h-full object-contain transition-opacity duration-200"
                    />
                    {/* Overlay indicator */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-white text-xs rounded-md">
                      {previewMode === "original" 
                        ? (isHoldingPreview ? "Enhanced" : "Original")
                        : (isHoldingPreview ? "Original" : "Enhanced")
                      }
                    </div>
                    {/* Hold instruction */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 text-white text-xs rounded-full flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
                      Hold to see {previewMode === "original" ? "enhanced" : "original"}
                    </div>
                  </div>
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
                  
                  {/* Beautified */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Beautified</p>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-square flex items-center justify-center">
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 p-8">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse" />
                            <Zap className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                          <div className="text-center w-full max-w-[200px]">
                            <p className="font-medium text-sm mb-2">Beautifying...</p>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </div>
                      ) : beautifiedImage ? (
                        <img
                          src={beautifiedImage}
                          alt="Beautified"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="w-10 h-10" />
                          <p className="text-sm">Beautified photo will appear here</p>
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
                {!beautifiedImage ? (
                  <Button
                    onClick={beautifyImage}
                    disabled={isProcessing}
                    className="gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Smile className="w-4 h-4" />
                        Beautify Face
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
                        setBeautifiedImage(null);
                        beautifyImage();
                      }}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-beautify
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

export default AIFaceBeautify;

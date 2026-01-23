import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, SlidersHorizontal, Crown, Settings2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OutputFormat = "png" | "jpg" | "webp";
type PipelineType = "full" | "face-only" | "upscale-only";

interface PipelineStep {
  id: string;
  label: string;
  status: "pending" | "running" | "complete" | "error";
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
  const [pipelineType, setPipelineType] = useState<PipelineType>("full");
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
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

  // Initialize pipeline steps based on pipeline type
  const initializePipelineSteps = (type: PipelineType): PipelineStep[] => {
    const steps: PipelineStep[] = [];
    
    if (type === "full" || type === "face-only") {
      steps.push({ id: "face_restoration", label: "Face Restoration (CodeFormer)", status: "pending" });
    }
    
    if (type === "full" || type === "upscale-only") {
      steps.push({ id: "super_resolution", label: "4x Super-Resolution (Real-ESRGAN)", status: "pending" });
    }
    
    if (type === "full") {
      steps.push({ id: "face_refinement", label: "Final Face Refinement (GFPGAN)", status: "pending" });
    }
    
    return steps;
  };

  const enhanceImage = async () => {
    if (!originalImage) {
      return;
    }

    setIsProcessing(true);
    setEnhancedImage(null);
    
    // Initialize steps for display
    const steps = initializePipelineSteps(pipelineType);
    setPipelineSteps(steps);
    setProgress(5);
    setProgressMessage("Starting Replicate AI pipeline...");

    try {
      // Mark first step as running
      if (steps.length > 0) {
        setPipelineSteps(prev => prev.map((s, i) => i === 0 ? { ...s, status: "running" } : s));
      }
      setProgress(10);
      setProgressMessage(steps[0]?.label || "Processing...");

      // Call the new Replicate enhancement pipeline
      const response = await supabase.functions.invoke("replicate-enhance", {
        body: { 
          imageBase64: originalImage,
          pipeline: pipelineType
        }
      });

      if (response.error) {
        throw new Error(response.error.message || "Enhancement failed");
      }

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      if (!response.data?.imageUrl) {
        throw new Error("No enhanced image returned from pipeline");
      }

      // Update step statuses based on completed steps
      const executedSteps = response.data.stepsExecuted || [];
      setPipelineSteps(prev => prev.map(step => ({
        ...step,
        status: executedSteps.includes(step.id) ? "complete" : "pending"
      })));

      setEnhancedImage(response.data.imageUrl);
      setProgress(100);
      setProgressMessage("Enhancement complete!");
      
      // Show comparison view automatically
      setShowComparison(true);
      
      const stepCount = executedSteps.length;
      toast.success(`Remini-quality enhancement complete! (${stepCount} AI models applied)`);
      
    } catch (error) {
      console.error("Enhancement pipeline error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to enhance image";
      
      // Mark current running step as error
      setPipelineSteps(prev => prev.map(s => s.status === "running" ? { ...s, status: "error" } : s));
      
      if (errorMessage.includes("Rate limit") || errorMessage.includes("429")) {
        toast.error("Replicate rate limit reached. Please wait a moment and try again.");
      } else if (errorMessage.includes("REPLICATE_API_KEY")) {
        toast.error("Replicate API key not configured. Please add your API key.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setProgressMessage("");
        setPipelineSteps([]);
      }, 2000);
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

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert image"));
          },
          mimeTypes[outputFormat],
          1.0 // Maximum quality for 4K output
        );
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `enhanced-4k-${pipelineType}.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`4K image downloaded as ${outputFormat.toUpperCase()}!`);
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
    setPipelineSteps([]);
    hasAutoEnhanced.current = false;
  };

  const pipelineDescriptions = {
    full: "Face restoration + 4x upscaling + refinement (Remini-quality)",
    "face-only": "Face restoration only (faster, smaller output)",
    "upscale-only": "4x super-resolution only (no face-specific processing)"
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

          {/* Pipeline Type Selector */}
          {originalImage && showSettings && (
            <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Enhancement Pipeline</Label>
                <Tabs 
                  value={pipelineType} 
                  onValueChange={(v) => setPipelineType(v as PipelineType)}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="full" className="gap-1">
                      <Crown className="w-3 h-3" />
                      Full (4K)
                    </TabsTrigger>
                    <TabsTrigger value="face-only" className="gap-1">
                      <Sparkles className="w-3 h-3" />
                      Face Only
                    </TabsTrigger>
                    <TabsTrigger value="upscale-only" className="gap-1">
                      <Zap className="w-3 h-3" />
                      Upscale Only
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-xs text-muted-foreground mt-2">{pipelineDescriptions[pipelineType]}</p>
              </div>

              {/* Pipeline Steps Info */}
              <div className="bg-secondary/30 rounded-lg p-3">
                <p className="text-xs font-medium mb-2">AI Models Used:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  {(pipelineType === "full" || pipelineType === "face-only") && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>CodeFormer / GFPGAN (Face Restoration)</span>
                    </div>
                  )}
                  {(pipelineType === "full" || pipelineType === "upscale-only") && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Real-ESRGAN (4x Super-Resolution)</span>
                    </div>
                  )}
                  {pipelineType === "full" && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>GFPGAN (Final Refinement)</span>
                    </div>
                  )}
                </div>
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
                      Enhanced (4K {pipelineType === "full" ? "Remini-Quality" : pipelineType})
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

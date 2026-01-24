import { useState, useRef, useCallback, useEffect } from "react";
import { History, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { AdVideo } from "@/components/ads/AdContainer";

type OutputFormat = "png" | "jpg" | "webp";

const AIImageRestorer = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
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
      setRestoredImage(null);
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

  // Auto-restore when image is uploaded
  useEffect(() => {
    if (originalImage && !hasAutoProcessed.current && !isProcessing && !restoredImage) {
      hasAutoProcessed.current = true;
      restoreImage();
    }
  }, [originalImage]);

  const restoreImage = async () => {
    if (!originalImage) {
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setRestoredImage(null);

    try {
      setProgress(30);
      
      const { data, error } = await supabase.functions.invoke("ai-enhance-image", {
        body: { 
          imageBase64: originalImage,
          operation: "restore"
        }
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to restore image");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setRestoredImage(data.imageUrl);
        setProgress(100);
        toast.success("Image restored successfully!");
      } else {
        throw new Error("No restored image was returned");
      }
    } catch (error) {
      console.error("Restore error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to restore image");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = async () => {
    if (!restoredImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = restoredImage;
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
      link.download = `restored-photo.${outputFormat}`;
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
    setRestoredImage(null);
    setProgress(0);
    setShowComparison(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-amber-500/5 to-orange-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Image Restorer</h3>
              <p className="text-sm text-muted-foreground">Restore old, damaged, or low-quality photos using AI</p>
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
                  <p className="font-medium">Drop your old or damaged photo here</p>
                  <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Video Ad - Below Upload Area */}
          {!originalImage && <AdVideo className="mt-2" />}

          {/* Image Preview */}
          {originalImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Your Photo</Label>
                <div className="flex items-center gap-2">
                  {restoredImage && (
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
              {showComparison && restoredImage ? (
                <ImageComparisonSlider
                  originalSrc={originalImage}
                  compressedSrc={restoredImage}
                  originalLabel="Original"
                  compressedLabel="Restored"
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
                  
                  {/* Restored */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Restored</p>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-square flex items-center justify-center">
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 p-8">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
                            <Zap className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                          <div className="text-center w-full max-w-[200px]">
                            <p className="font-medium text-sm mb-2">Restoring...</p>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </div>
                      ) : restoredImage ? (
                        <img
                          src={restoredImage}
                          alt="Restored"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="w-10 h-10" />
                          <p className="text-sm">Restored image will appear here</p>
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
                {!restoredImage ? (
                  <Button
                    onClick={restoreImage}
                    disabled={isProcessing}
                    className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <History className="w-4 h-4" />
                        Restore Photo
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
                        setRestoredImage(null);
                        restoreImage();
                      }}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-restore
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

export default AIImageRestorer;

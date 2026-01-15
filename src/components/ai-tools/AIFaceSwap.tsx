import { useState, useRef, useCallback } from "react";
import { Users, Download, Loader2, Upload, RefreshCw, Zap, Image as ImageIcon, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type OutputFormat = "png" | "jpg" | "webp";

const AIFaceSwap = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [isDraggingSource, setIsDraggingSource] = useState(false);
  const [isDraggingTarget, setIsDraggingTarget] = useState(false);
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback((file: File, type: "source" | "target") => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === "source") {
        setSourceImage(e.target?.result as string);
      } else {
        setTargetImage(e.target?.result as string);
      }
      setResultImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: "source" | "target") => {
    e.preventDefault();
    if (type === "source") setIsDraggingSource(false);
    else setIsDraggingTarget(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file, type);
  }, [handleFileSelect]);

  const swapFaces = async () => {
    if (!sourceImage || !targetImage) {
      toast.error("Please upload both source and target images");
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setResultImage(null);

    try {
      setProgress(30);
      
      const { data, error } = await supabase.functions.invoke("ai-enhance-image", {
        body: { 
          imageBase64: targetImage,
          sourceImage: sourceImage,
          operation: "face-swap"
        }
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to swap faces");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setResultImage(data.imageUrl);
        setProgress(100);
        toast.success("Face swap completed successfully!");
      } else {
        throw new Error("No result image was returned");
      }
    } catch (error) {
      console.error("Face swap error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to swap faces");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = async () => {
    if (!resultImage || !canvasRef.current) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = resultImage;
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
      link.download = `face-swap.${outputFormat}`;
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
    setSourceImage(null);
    setTargetImage(null);
    setResultImage(null);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-pink-500/5 to-rose-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Face Swap</h3>
              <p className="text-sm text-muted-foreground">Swap faces between two photos using AI</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source Face */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Source Face</Label>
              {!sourceImage ? (
                <div
                  onDrop={(e) => handleDrop(e, "source")}
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingSource(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDraggingSource(false); }}
                  onClick={() => sourceInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all aspect-square flex items-center justify-center ${
                    isDraggingSource 
                      ? "border-pink-500 bg-pink-500/5" 
                      : "border-border hover:border-pink-500/50 hover:bg-secondary/30"
                  }`}
                >
                  <input
                    ref={sourceInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], "source")}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Upload source face</p>
                      <p className="text-xs text-muted-foreground">Face to swap FROM</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border aspect-square">
                  <img src={sourceImage} alt="Source" className="w-full h-full object-cover" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setSourceImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Target Face */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Target Photo</Label>
              {!targetImage ? (
                <div
                  onDrop={(e) => handleDrop(e, "target")}
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingTarget(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDraggingTarget(false); }}
                  onClick={() => targetInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all aspect-square flex items-center justify-center ${
                    isDraggingTarget 
                      ? "border-rose-500 bg-rose-500/5" 
                      : "border-border hover:border-rose-500/50 hover:bg-secondary/30"
                  }`}
                >
                  <input
                    ref={targetInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], "target")}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Upload target photo</p>
                      <p className="text-xs text-muted-foreground">Face to swap TO</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border aspect-square">
                  <img src={targetImage} alt="Target" className="w-full h-full object-cover" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setTargetImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Arrow indicator */}
          {sourceImage && targetImage && (
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 px-6 py-3 bg-secondary/50 rounded-full">
                <span className="text-sm font-medium">Source face</span>
                <ArrowRight className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Target photo</span>
              </div>
            </div>
          )}

          {/* Result */}
          {(isProcessing || resultImage) && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Result</Label>
              <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/20 aspect-video flex items-center justify-center max-w-2xl mx-auto">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-4 p-8">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse" />
                      <Zap className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center w-full max-w-[200px]">
                      <p className="font-medium text-sm mb-2">Swapping faces...</p>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                ) : resultImage ? (
                  <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
                ) : null}
              </div>
            </div>
          )}

          {/* Actions */}
          {(sourceImage || targetImage) && (
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
                <Button variant="outline" onClick={reset} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
                
                {!resultImage ? (
                  <Button
                    onClick={swapFaces}
                    disabled={isProcessing || !sourceImage || !targetImage}
                    className="gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        Swap Faces
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={downloadImage} className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFaceSwap;

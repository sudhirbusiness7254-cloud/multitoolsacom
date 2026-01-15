import { useState, useRef, useCallback } from "react";
import { Eraser, Download, Loader2, Upload, RefreshCw, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { removeBackground, loadImage } from "@/lib/aiImageUtils";

type OutputFormat = "png" | "webp";

const AIBackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setResultImage(null);
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

  const processImage = async () => {
    if (!originalFile) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProgressMessage("Starting...");
    setResultImage(null);

    try {
      const imageElement = await loadImage(originalFile);
      
      const resultBlob = await removeBackground(imageElement, (prog, msg) => {
        setProgress(prog);
        setProgressMessage(msg);
      });
      
      const resultUrl = URL.createObjectURL(resultBlob);
      setResultImage(resultUrl);
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error("Background removal error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to remove background");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setProgressMessage("");
    }
  };

  const downloadImage = async () => {
    if (!resultImage) return;

    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      
      let finalBlob = blob;
      if (outputFormat === "webp") {
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = resultImage;
        });
        
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          finalBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Failed")), "image/webp", 0.95);
          });
        }
      }
      
      const url = URL.createObjectURL(finalBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `no-background.${outputFormat}`;
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
    setOriginalFile(null);
    setResultImage(null);
    setProgress(0);
    setProgressMessage("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-pink-500/5 to-rose-500/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Eraser className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Background Remover</h3>
              <p className="text-sm text-muted-foreground">Remove backgrounds from images automatically using AI</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-600 dark:text-amber-400">Runs locally in your browser</p>
              <p className="text-muted-foreground">Your images never leave your device. First run may take longer to load the AI model.</p>
            </div>
          </div>

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

          {/* Image Preview */}
          {originalImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Your Image</Label>
                <Button variant="ghost" size="sm" onClick={reset} className="text-xs gap-1.5 h-7">
                  <X className="w-3 h-3" />
                  Remove
                </Button>
              </div>
              
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
                
                {/* Result */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Background Removed</p>
                  <div className="relative rounded-xl overflow-hidden border border-border aspect-square flex items-center justify-center"
                    style={{ 
                      backgroundImage: "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                    }}
                  >
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-4 p-8 bg-background/80 rounded-xl">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse" />
                          <Eraser className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="text-center w-full max-w-[200px]">
                          <p className="font-medium text-sm mb-1">{progressMessage}</p>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                    ) : resultImage ? (
                      <img
                        src={resultImage}
                        alt="Background Removed"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground bg-background/80 p-6 rounded-xl">
                        <ImageIcon className="w-10 h-10" />
                        <p className="text-sm">Result will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
                    <SelectItem value="png">PNG (Transparent)</SelectItem>
                    <SelectItem value="webp">WebP (Smaller Size)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                {!resultImage ? (
                  <Button
                    onClick={processImage}
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
                        <Eraser className="w-4 h-4" />
                        Remove Background
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
                        setResultImage(null);
                        processImage();
                      }}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-process
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

export default AIBackgroundRemover;

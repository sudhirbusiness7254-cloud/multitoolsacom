import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Minimize2, Globe, RotateCw, ArrowDownToLine } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type OptimizationMode = "reduce-size" | "reduce-resolution" | "web-optimize" | "auto-orient";

interface UniversalImageOptimizationProps {
  initialMode?: OptimizationMode;
}

const optimizationModes = [
  { id: "reduce-size" as OptimizationMode, name: "Reduce File Size", icon: <Minimize2 className="w-4 h-4" /> },
  { id: "reduce-resolution" as OptimizationMode, name: "Reduce Resolution", icon: <ArrowDownToLine className="w-4 h-4" /> },
  { id: "web-optimize" as OptimizationMode, name: "Web Optimize", icon: <Globe className="w-4 h-4" /> },
  { id: "auto-orient" as OptimizationMode, name: "Auto-Orient", icon: <RotateCw className="w-4 h-4" /> },
];

const UniversalImageOptimization = ({ initialMode = "reduce-size" }: UniversalImageOptimizationProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<OptimizationMode>(initialMode);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    setProcessedUrl(null);
    setOptimizedSize(0);
  };

  const optimizeImage = useCallback(async () => {
    if (!imageUrl || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let targetWidth = img.width;
      let targetHeight = img.height;

      switch (mode) {
        case "reduce-size":
          // Just reduce quality, keep dimensions
          break;
        case "reduce-resolution":
        case "web-optimize":
          // Scale down if larger than max dimensions
          if (img.width > maxWidth || img.height > maxHeight) {
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            targetWidth = Math.floor(img.width * ratio);
            targetHeight = Math.floor(img.height * ratio);
          }
          break;
        case "auto-orient":
          // Just redraw (canvas doesn't preserve EXIF orientation issues)
          break;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // For web-optimize, also strip metadata by using canvas
      const mimeType = mode === "web-optimize" ? "image/jpeg" : file?.type || "image/jpeg";
      const qualityValue = quality / 100;
      
      canvas.toBlob((blob) => {
        if (blob) {
          setOptimizedSize(blob.size);
          const url = URL.createObjectURL(blob);
          setProcessedUrl(url);
          setIsProcessing(false);
          
          const savings = ((1 - blob.size / originalSize) * 100).toFixed(1);
          toast({ 
            title: "Image optimized!", 
            description: `File size reduced by ${savings}%` 
          });
        }
      }, mimeType, qualityValue);
    };
    img.src = imageUrl;
  }, [imageUrl, mode, quality, maxWidth, maxHeight, originalSize, file]);

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement("a");
    link.download = `optimized-${file?.name || "image.jpg"}`;
    link.href = processedUrl;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setOriginalSize(0);
    setOptimizedSize(0);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <canvas ref={canvasRef} className="hidden" />

      {!file ? (
        <>
          <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
          {/* Native Banner Ad - Below upload area */}
          <div className="hidden lg:block mt-4">
            <NativeBannerAd />
          </div>
          <MobileNativeAd className="mt-4" />
        </>
      ) : (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex flex-wrap justify-center gap-2">
            {optimizationModes.map((m) => (
              <Button
                key={m.id}
                variant={mode === m.id ? "default" : "outline"}
                onClick={() => setMode(m.id)}
                className="flex items-center gap-2"
              >
                {m.icon}
                {m.name}
              </Button>
            ))}
          </div>

          {/* Settings based on mode */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quality: {quality}%</label>
              <Slider
                value={[quality]}
                onValueChange={(v) => setQuality(v[0])}
                min={10}
                max={100}
                step={5}
              />
            </div>
            {(mode === "reduce-resolution" || mode === "web-optimize") && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Width (px)</label>
                  <Input
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                    min={100}
                    max={4000}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Height (px)</label>
                  <Input
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(Number(e.target.value))}
                    min={100}
                    max={4000}
                  />
                </div>
              </>
            )}
          </div>

          <Button onClick={optimizeImage} className="w-full" disabled={isProcessing}>
            {isProcessing ? "Optimizing..." : "Optimize Image"}
          </Button>

          {/* Size Comparison */}
          {optimizedSize > 0 && (
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="font-semibold">{formatSize(originalSize)}</p>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div>
                  <p className="text-sm text-muted-foreground">Optimized Size</p>
                  <p className="font-semibold text-primary">{formatSize(optimizedSize)}</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {((1 - optimizedSize / originalSize) * 100).toFixed(1)}% saved
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          <div className="relative aspect-video bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={processedUrl || imageUrl || ""}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleDownload} disabled={!processedUrl}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalImageOptimization;

import { useState, useCallback, useEffect } from "react";
import { Download, Loader2, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DragDropUpload from "@/components/DragDropUpload";
import { toast } from "sonner";
import { ResultAd } from "@/components/ads";

type ResizeMode = "exact" | "percentage" | "fit-width" | "fit-height" | "fit-box" | "quality";

interface ImageResizerProps {
  mode: ResizeMode;
}

const ImageResizer = ({ mode }: ImageResizerProps) => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  
  // Dimensions
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [percentage, setPercentage] = useState<number>(50);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [maxHeight, setMaxHeight] = useState<number>(1080);

  const calculateAspectRatio = useCallback(() => {
    if (originalWidth && originalHeight) {
      return originalWidth / originalHeight;
    }
    return 1;
  }, [originalWidth, originalHeight]);

  const handleWidthChange = useCallback((newWidth: number) => {
    setTargetWidth(newWidth);
    if (maintainAspectRatio && originalWidth && originalHeight) {
      const ratio = originalHeight / originalWidth;
      setTargetHeight(Math.round(newWidth * ratio));
    }
  }, [maintainAspectRatio, originalWidth, originalHeight]);

  const handleHeightChange = useCallback((newHeight: number) => {
    setTargetHeight(newHeight);
    if (maintainAspectRatio && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      setTargetWidth(Math.round(newHeight * ratio));
    }
  }, [maintainAspectRatio, originalWidth, originalHeight]);

  const resizeImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    try {
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      let newWidth: number;
      let newHeight: number;

      switch (mode) {
        case "exact":
          newWidth = targetWidth;
          newHeight = targetHeight;
          break;
        case "percentage":
          newWidth = Math.round(img.width * (percentage / 100));
          newHeight = Math.round(img.height * (percentage / 100));
          break;
        case "fit-width":
          newWidth = targetWidth;
          newHeight = Math.round(targetWidth * (img.height / img.width));
          break;
        case "fit-height":
          newHeight = targetHeight;
          newWidth = Math.round(targetHeight * (img.width / img.height));
          break;
        case "fit-box":
          const widthRatio = maxWidth / img.width;
          const heightRatio = maxHeight / img.height;
          const ratio = Math.min(widthRatio, heightRatio);
          newWidth = Math.round(img.width * ratio);
          newHeight = Math.round(img.height * ratio);
          break;
        case "quality":
          // For quality resize, we use a two-step process for better results
          newWidth = targetWidth;
          newHeight = maintainAspectRatio 
            ? Math.round(targetWidth * (img.height / img.width))
            : targetHeight;
          break;
        default:
          newWidth = img.width;
          newHeight = img.height;
      }

      // Create canvas and resize
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Could not get canvas context");

      canvas.width = newWidth;
      canvas.height = newHeight;

      // For quality mode, use better interpolation
      if (mode === "quality") {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Determine output format
      const fileType = file.type || "image/png";
      const quality = mode === "quality" ? 1 : 0.92;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to resize image"));
          },
          fileType,
          quality
        );
      });

      setProcessedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
      
      toast.success(`Resized to ${newWidth} x ${newHeight} pixels`);
    } catch (error) {
      console.error("Resize error:", error);
      toast.error("Failed to resize image");
    } finally {
      setIsProcessing(false);
    }
  }, [mode, targetWidth, targetHeight, percentage, maxWidth, maxHeight, maintainAspectRatio]);

  const handleFileSelect = useCallback((file: File) => {
    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setTargetWidth(img.width);
      setTargetHeight(img.height);
      setOriginalPreviewUrl(URL.createObjectURL(file));
    };
    img.src = URL.createObjectURL(file);
    
    setOriginalFile(file);
    setProcessedBlob(null);
    setPreviewUrl(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!processedBlob || !originalFile) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(processedBlob);
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    const ext = originalFile.name.split('.').pop() || 'png';
    link.download = `${baseName}_resized.${ext}`;
    link.click();
    
    toast.success("Download started!");
  }, [processedBlob, originalFile]);

  const getModeLabel = () => {
    switch (mode) {
      case "exact": return "Exact Resize";
      case "percentage": return "Percentage Resize";
      case "fit-width": return "Fit to Width";
      case "fit-height": return "Fit to Height";
      case "fit-box": return "Fit to Box";
      case "quality": return "Quality Resize";
      default: return "Resize";
    }
  };

  return (
    <div className="space-y-6">
      <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />

      {originalFile && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          {/* Original Dimensions Display */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">
              Original Size: <span className="text-foreground font-medium">{originalWidth} x {originalHeight}</span> pixels
            </p>
          </div>

          {/* Mode-specific Controls */}
          {mode === "exact" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant={maintainAspectRatio ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                >
                  {maintainAspectRatio ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                  {maintainAspectRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    min={1}
                    max={10000}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    min={1}
                    max={10000}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "percentage" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="percentage">Scale Percentage (%)</Label>
                <Input
                  id="percentage"
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(parseInt(e.target.value) || 1)}
                  min={1}
                  max={500}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                New size: {Math.round(originalWidth * percentage / 100)} x {Math.round(originalHeight * percentage / 100)} pixels
              </p>
            </div>
          )}

          {mode === "fit-width" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fit-width">Target Width (px)</Label>
                <Input
                  id="fit-width"
                  type="number"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(parseInt(e.target.value) || 1)}
                  min={1}
                  max={10000}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Height will adjust to: {Math.round(targetWidth * (originalHeight / originalWidth))} pixels
              </p>
            </div>
          )}

          {mode === "fit-height" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fit-height">Target Height (px)</Label>
                <Input
                  id="fit-height"
                  type="number"
                  value={targetHeight}
                  onChange={(e) => setTargetHeight(parseInt(e.target.value) || 1)}
                  min={1}
                  max={10000}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Width will adjust to: {Math.round(targetHeight * (originalWidth / originalHeight))} pixels
              </p>
            </div>
          )}

          {mode === "fit-box" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-width">Max Width (px)</Label>
                  <Input
                    id="max-width"
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(parseInt(e.target.value) || 1)}
                    min={1}
                    max={10000}
                  />
                </div>
                <div>
                  <Label htmlFor="max-height">Max Height (px)</Label>
                  <Input
                    id="max-height"
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(parseInt(e.target.value) || 1)}
                    min={1}
                    max={10000}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Image will fit within {maxWidth} x {maxHeight} while maintaining aspect ratio
              </p>
            </div>
          )}

          {mode === "quality" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant={maintainAspectRatio ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                >
                  {maintainAspectRatio ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                  {maintainAspectRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                </Button>
              </div>
              <div>
                <Label htmlFor="quality-width">Target Width (px)</Label>
                <Input
                  id="quality-width"
                  type="number"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  min={1}
                  max={10000}
                />
              </div>
              {!maintainAspectRatio && (
                <div>
                  <Label htmlFor="quality-height">Target Height (px)</Label>
                  <Input
                    id="quality-height"
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    min={1}
                    max={10000}
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Uses high-quality interpolation for best results when resizing
              </p>
            </div>
          )}

          {/* Resize Button */}
          <Button
            onClick={() => resizeImage(originalFile)}
            disabled={isProcessing}
            className="w-full bg-gradient-orange hover:opacity-90"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resizing...
              </>
            ) : (
              `Resize Image`
            )}
          </Button>

          {/* Preview */}
          {previewUrl && (
            <div className="space-y-4">
              <h3 className="font-semibold">Result Preview</h3>
              <div className="rounded-lg overflow-hidden bg-secondary/50 max-h-64 flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="Resized preview" 
                  className="max-w-full max-h-64 object-contain"
                />
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownload}
                disabled={!processedBlob}
                className="w-full bg-gradient-orange hover:opacity-90 text-primary-foreground"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resized Image
              </Button>

              {/* Ad Below Result */}
              <ResultAd show={!!processedBlob} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageResizer;

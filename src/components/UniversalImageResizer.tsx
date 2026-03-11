import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import DragDropUpload from "./DragDropUpload";
import { Download, Maximize, Percent, ArrowRight, Square, Zap, Lock, Unlock, Sparkles } from "lucide-react";

type ResizeMode = "exact" | "percentage" | "fit-width" | "fit-height" | "fit-box";

interface ResizeModeOption {
  id: ResizeMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const resizeModeOptions: ResizeModeOption[] = [
  { id: "exact", label: "Exact Size", icon: <Maximize className="w-5 h-5" />, description: "Set Width & Height" },
  { id: "percentage", label: "Percentage", icon: <Percent className="w-5 h-5" />, description: "Scale by %" },
  { id: "fit-width", label: "Fit Width", icon: <ArrowRight className="w-5 h-5" />, description: "Match Width" },
  { id: "fit-height", label: "Fit Height", icon: <ArrowRight className="w-5 h-5 rotate-90" />, description: "Match Height" },
  { id: "fit-box", label: "Fit to Box", icon: <Square className="w-5 h-5" />, description: "Max Dimensions" },
];

const UniversalImageResizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<ResizeMode>("exact");
  const [isResizing, setIsResizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  
  // Original dimensions
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  
  // Resize settings
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [percentage, setPercentage] = useState(50);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [quality, setQuality] = useState(85);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      
      // Get original dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (lockAspectRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (lockAspectRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const calculateDimensions = (): { width: number; height: number } => {
    const aspectRatio = originalWidth / originalHeight;
    
    switch (selectedMode) {
      case "exact":
        return { width, height };
      case "percentage":
        return {
          width: Math.round(originalWidth * (percentage / 100)),
          height: Math.round(originalHeight * (percentage / 100)),
        };
      case "fit-width":
        return {
          width,
          height: Math.round(width / aspectRatio),
        };
      case "fit-height":
        return {
          width: Math.round(height * aspectRatio),
          height,
        };
      case "fit-box":
        const widthRatio = width / originalWidth;
        const heightRatio = height / originalHeight;
        const ratio = Math.min(widthRatio, heightRatio);
        return {
          width: Math.round(originalWidth * ratio),
          height: Math.round(originalHeight * ratio),
        };
      default:
        return { width, height };
    }
  };

  const handleResize = async () => {
    if (!file || !preview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsResizing(true);
    setProgress(0);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 15, 85));
      }, 100);

      const { width: targetWidth, height: targetHeight } = calculateDimensions();

      // Create canvas and resize
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Could not get canvas context");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = preview;
      });

      // For JPEG output, fill with white background first
      const mimeType = file.type || "image/png";
      if (mimeType === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Use quality setting for JPEG and WebP
      const qualityValue = quality / 100;
      const useQuality = mimeType === "image/jpeg" || mimeType === "image/webp";
      const resizedDataUrl = canvas.toDataURL(mimeType, useQuality ? qualityValue : undefined);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(resizedDataUrl);
      toast.success(`Resized to ${targetWidth}x${targetHeight}px successfully!`);
    } catch (error) {
      toast.error("Resize failed. Please try again.");
      console.error(error);
    } finally {
      setIsResizing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;

    const link = document.createElement("a");
    link.href = result;
    const extension = file.name.split('.').pop() || 'png';
    link.download = `${file.name.split('.')[0]}_resized.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started!");
  };

  const resetResizer = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
  };

  const { width: previewWidth, height: previewHeight } = originalWidth > 0 ? calculateDimensions() : { width: 0, height: 0 };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {resizeModeOptions.map((mode) => (
          <button
            key={mode.id}
            onClick={() => {
              setSelectedMode(mode.id);
              setResult(null);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              selectedMode === mode.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {mode.icon}
            <div className="text-left">
              <div className="font-semibold">{mode.label}</div>
              <div className="text-xs opacity-70">{mode.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Upload Area */}
      {!file ? (
        <>
          <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
        </>
      ) : (
        <div className="space-y-4">
          {/* Settings Panel */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Preview</h4>
                {(result || preview) && (
                  <img
                    src={result || preview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-lg bg-muted"
                  />
                )}
                <div className="text-sm text-muted-foreground text-center">
                  Original: {originalWidth} × {originalHeight}px
                  {originalWidth > 0 && (
                    <span className="block text-primary">
                      Output: {previewWidth} × {previewHeight}px
                    </span>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Settings</h4>
                
                {selectedMode === "exact" && (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Switch
                        id="lock-ratio"
                        checked={lockAspectRatio}
                        onCheckedChange={setLockAspectRatio}
                      />
                      <Label htmlFor="lock-ratio" className="flex items-center gap-1 text-sm">
                        {lockAspectRatio ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        Lock Aspect Ratio
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="width" className="text-sm">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => handleWidthChange(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height" className="text-sm">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => handleHeightChange(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedMode === "percentage" && (
                  <div>
                    <Label htmlFor="percentage" className="text-sm">Scale Percentage (%)</Label>
                    <Input
                      id="percentage"
                      type="number"
                      min={1}
                      max={500}
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      100% = original size, 50% = half size
                    </p>
                  </div>
                )}

                {selectedMode === "fit-width" && (
                  <div>
                    <Label htmlFor="target-width" className="text-sm">Target Width (px)</Label>
                    <Input
                      id="target-width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Height adjusts automatically to maintain ratio
                    </p>
                  </div>
                )}

                {selectedMode === "fit-height" && (
                  <div>
                    <Label htmlFor="target-height" className="text-sm">Target Height (px)</Label>
                    <Input
                      id="target-height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Width adjusts automatically to maintain ratio
                    </p>
                  </div>
                )}

                {selectedMode === "fit-box" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="max-width" className="text-sm">Max Width (px)</Label>
                      <Input
                        id="max-width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-height" className="text-sm">Max Height (px)</Label>
                      <Input
                        id="max-height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground col-span-2">
                      Image fits within these bounds while maintaining ratio
                    </p>
                  </div>
                )}

                {/* Quality Slider */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="quality" className="text-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Output Quality
                    </Label>
                    <span className="text-sm font-medium text-primary">{quality}%</span>
                  </div>
                  <Slider
                    id="quality"
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    min={10}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Applies to JPEG & WebP. Lower = smaller files.
                  </p>
                </div>

                {/* Progress Bar */}
                {isResizing && (
                  <div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Resizing... {progress}%</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {!result ? (
                    <Button
                      onClick={handleResize}
                      disabled={isResizing}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {isResizing ? "Resizing..." : "Resize Image"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resized Image
                    </Button>
                  )}
                  <Button variant="outline" onClick={resetResizer}>
                    Upload Another
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Info */}
          {result && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-medium">
                ✓ Resize complete! {previewWidth} × {previewHeight}px - Click download to save.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalImageResizer;

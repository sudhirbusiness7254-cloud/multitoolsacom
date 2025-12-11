import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DragDropUpload from "./DragDropUpload";
import { Download, Square, Circle, RectangleHorizontal, Monitor, Image, Crop, RotateCcw } from "lucide-react";

type CropMode = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16" | "circle";

interface CropModeOption {
  id: CropMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const cropModeOptions: CropModeOption[] = [
  { id: "free", label: "Free", icon: <Crop className="w-5 h-5" />, description: "Custom Size" },
  { id: "1:1", label: "1:1", icon: <Square className="w-5 h-5" />, description: "Square" },
  { id: "4:3", label: "4:3", icon: <RectangleHorizontal className="w-5 h-5" />, description: "Standard" },
  { id: "16:9", label: "16:9", icon: <Monitor className="w-5 h-5" />, description: "Widescreen" },
  { id: "3:2", label: "3:2", icon: <Image className="w-5 h-5" />, description: "Photo" },
  { id: "9:16", label: "9:16", icon: <RectangleHorizontal className="w-5 h-5 rotate-90" />, description: "Portrait" },
  { id: "circle", label: "Circle", icon: <Circle className="w-5 h-5" />, description: "Round Crop" },
];

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const UniversalImageCropper = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<CropMode>("free");
  const [isCropping, setIsCropping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragType, setDragType] = useState<"move" | "resize" | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      
      const img = new window.Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        // Initialize crop area to center 80%
        const padding = 0.1;
        setCropArea({
          x: img.width * padding,
          y: img.height * padding,
          width: img.width * (1 - padding * 2),
          height: img.height * (1 - padding * 2),
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  // Apply aspect ratio constraint
  useEffect(() => {
    if (!originalWidth || !originalHeight) return;
    
    const ratios: Record<CropMode, number | null> = {
      "free": null,
      "1:1": 1,
      "4:3": 4/3,
      "16:9": 16/9,
      "3:2": 3/2,
      "9:16": 9/16,
      "circle": 1,
    };

    const ratio = ratios[selectedMode];
    if (ratio) {
      const centerX = cropArea.x + cropArea.width / 2;
      const centerY = cropArea.y + cropArea.height / 2;
      
      let newWidth = cropArea.width;
      let newHeight = newWidth / ratio;
      
      if (newHeight > originalHeight * 0.9) {
        newHeight = originalHeight * 0.9;
        newWidth = newHeight * ratio;
      }
      
      if (newWidth > originalWidth * 0.9) {
        newWidth = originalWidth * 0.9;
        newHeight = newWidth / ratio;
      }
      
      setCropArea({
        x: Math.max(0, Math.min(centerX - newWidth / 2, originalWidth - newWidth)),
        y: Math.max(0, Math.min(centerY - newHeight / 2, originalHeight - newHeight)),
        width: newWidth,
        height: newHeight,
      });
    }
  }, [selectedMode, originalWidth, originalHeight]);

  const getDisplayScale = () => {
    if (!containerRef.current || !originalWidth) return 1;
    const containerWidth = containerRef.current.clientWidth - 32;
    const containerHeight = 180; // Reduced height
    return Math.min(1, containerWidth / originalWidth, containerHeight / originalHeight);
  };

  const handleMouseDown = (e: React.MouseEvent, type: "move" | "resize") => {
    e.preventDefault();
    setIsDragging(true);
    setDragType(type);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragType) return;
    
    const scale = getDisplayScale();
    const dx = (e.clientX - dragStart.x) / scale;
    const dy = (e.clientY - dragStart.y) / scale;
    
    if (dragType === "move") {
      setCropArea(prev => ({
        ...prev,
        x: Math.max(0, Math.min(prev.x + dx, originalWidth - prev.width)),
        y: Math.max(0, Math.min(prev.y + dy, originalHeight - prev.height)),
      }));
    } else if (dragType === "resize") {
      const ratio = selectedMode === "1:1" || selectedMode === "circle" ? 1 :
                    selectedMode === "4:3" ? 4/3 :
                    selectedMode === "16:9" ? 16/9 :
                    selectedMode === "3:2" ? 3/2 :
                    selectedMode === "9:16" ? 9/16 : null;
      
      let newWidth = Math.max(50, cropArea.width + dx);
      let newHeight = ratio ? newWidth / ratio : Math.max(50, cropArea.height + dy);
      
      newWidth = Math.min(newWidth, originalWidth - cropArea.x);
      newHeight = Math.min(newHeight, originalHeight - cropArea.y);
      
      if (ratio) {
        if (newHeight > originalHeight - cropArea.y) {
          newHeight = originalHeight - cropArea.y;
          newWidth = newHeight * ratio;
        }
      }
      
      setCropArea(prev => ({ ...prev, width: newWidth, height: newHeight }));
    }
    
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragType, dragStart, originalWidth, originalHeight, selectedMode, cropArea]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleCrop = async () => {
    if (!file || !preview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsCropping(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 20, 85));
      }, 100);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      const img = new window.Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = preview;
      });

      // For circle crop, create circular clipping path
      if (selectedMode === "circle") {
        ctx.beginPath();
        ctx.arc(
          cropArea.width / 2,
          cropArea.height / 2,
          Math.min(cropArea.width, cropArea.height) / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(
        img,
        cropArea.x, cropArea.y,
        cropArea.width, cropArea.height,
        0, 0,
        cropArea.width, cropArea.height
      );

      const outputFormat = selectedMode === "circle" ? "image/png" : (file.type || "image/png");
      const croppedDataUrl = canvas.toDataURL(outputFormat, 0.92);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(croppedDataUrl);
      toast.success(`Cropped to ${Math.round(cropArea.width)}×${Math.round(cropArea.height)}px!`);
    } catch (error) {
      toast.error("Crop failed. Please try again.");
      console.error(error);
    } finally {
      setIsCropping(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;

    const link = document.createElement("a");
    link.href = result;
    const extension = selectedMode === "circle" ? "png" : (file.name.split('.').pop() || 'png');
    link.download = `${file.name.split('.')[0]}_cropped.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started!");
  };

  const resetCropper = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
  };

  const scale = getDisplayScale();

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {cropModeOptions.map((mode) => (
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
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Editor */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Crop className="w-4 h-4" /> Crop Area
            </h4>
            <div
              ref={containerRef}
              className="relative bg-muted/50 rounded-xl overflow-hidden flex items-center justify-center p-4"
              style={{ height: 200, maxHeight: 200 }}
            >
              {preview && (
                <div className="relative" style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
                  <img
                    ref={imageRef}
                    src={preview}
                    alt="Crop preview"
                    className="max-w-none"
                    style={{ width: originalWidth, height: originalHeight }}
                    draggable={false}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-black/50 pointer-events-none"
                    style={{
                      clipPath: `polygon(
                        0 0, 100% 0, 100% 100%, 0 100%, 0 0,
                        ${cropArea.x}px ${cropArea.y}px,
                        ${cropArea.x}px ${cropArea.y + cropArea.height}px,
                        ${cropArea.x + cropArea.width}px ${cropArea.y + cropArea.height}px,
                        ${cropArea.x + cropArea.width}px ${cropArea.y}px,
                        ${cropArea.x}px ${cropArea.y}px
                      )`,
                    }}
                  />
                  {/* Crop Box */}
                  <div
                    className={`absolute border-2 border-primary cursor-move ${
                      selectedMode === "circle" ? "rounded-full" : ""
                    }`}
                    style={{
                      left: cropArea.x,
                      top: cropArea.y,
                      width: cropArea.width,
                      height: cropArea.height,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, "move")}
                  >
                    {/* Corner handles */}
                    <div
                      className="absolute -right-2 -bottom-2 w-4 h-4 bg-primary rounded-full cursor-se-resize"
                      onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "resize"); }}
                    />
                    <div
                      className="absolute -left-2 -top-2 w-4 h-4 bg-primary rounded-full cursor-nw-resize"
                      onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "resize"); }}
                    />
                    {/* Grid lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                      <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/30" />
                      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                      <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/30" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Crop Settings */}
            <div className="grid grid-cols-4 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">X</Label>
                <Input
                  type="number"
                  value={Math.round(cropArea.x)}
                  onChange={(e) => setCropArea(prev => ({ ...prev, x: Math.max(0, Number(e.target.value)) }))}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Y</Label>
                <Input
                  type="number"
                  value={Math.round(cropArea.y)}
                  onChange={(e) => setCropArea(prev => ({ ...prev, y: Math.max(0, Number(e.target.value)) }))}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Width</Label>
                <Input
                  type="number"
                  value={Math.round(cropArea.width)}
                  onChange={(e) => setCropArea(prev => ({ ...prev, width: Math.max(10, Number(e.target.value)) }))}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Height</Label>
                <Input
                  type="number"
                  value={Math.round(cropArea.height)}
                  onChange={(e) => setCropArea(prev => ({ ...prev, height: Math.max(10, Number(e.target.value)) }))}
                  className="h-8 text-sm"
                />
              </div>
            </div>

            {/* Progress Bar */}
            {isCropping && (
              <div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Cropping... {progress}%</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {!result ? (
                <Button
                  onClick={handleCrop}
                  disabled={isCropping}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Crop className="w-4 h-4 mr-2" />
                  {isCropping ? "Cropping..." : "Crop Image"}
                </Button>
              ) : (
                <Button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cropped
                </Button>
              )}
              <Button variant="outline" onClick={resetCropper}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Upload Another
              </Button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" /> Live Preview
            </h4>
            <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-center" style={{ height: 200, maxHeight: 200 }}>
              {result ? (
                <img
                  src={result}
                  alt="Cropped result"
                  className={`max-w-full max-h-[180px] object-contain shadow-lg ${
                    selectedMode === "circle" ? "rounded-full" : "rounded-lg"
                  }`}
                />
              ) : preview ? (
                <div
                  className={`overflow-hidden shadow-lg ${
                    selectedMode === "circle" ? "rounded-full" : "rounded-lg"
                  }`}
                  style={{
                    width: Math.min(300, cropArea.width * scale * 1.5),
                    height: Math.min(300, cropArea.height * scale * 1.5),
                  }}
                >
                  <div
                    style={{
                      width: originalWidth * scale * 1.5,
                      height: originalHeight * scale * 1.5,
                      backgroundImage: `url(${preview})`,
                      backgroundSize: `${originalWidth * scale * 1.5}px ${originalHeight * scale * 1.5}px`,
                      backgroundPosition: `-${cropArea.x * scale * 1.5}px -${cropArea.y * scale * 1.5}px`,
                    }}
                  />
                </div>
              ) : (
                <p className="text-muted-foreground">Preview will appear here</p>
              )}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Original: {originalWidth} × {originalHeight}px
              <span className="text-primary ml-2">
                → {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Result Info */}
      {result && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-green-400 font-medium">
            ✓ Crop complete! {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px
            {selectedMode === "circle" && " (PNG with transparent background)"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversalImageCropper;

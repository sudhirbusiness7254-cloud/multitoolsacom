import { useState, useCallback, useRef } from "react";
import { Download, Loader2, FileImage, X, Trash2, Upload, FileArchive, ZoomIn, Maximize, Percent, ArrowRight, Square, Lock, Unlock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import JSZip from "jszip";

type ResizeMode = "exact" | "percentage" | "fit-width" | "fit-height" | "fit-box";

interface BatchFile {
  id: string;
  file: File;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  resizedBlob: Blob | null;
  resizedSize: number;
  resizedWidth: number;
  resizedHeight: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  previewUrl: string;
  resizedPreviewUrl: string | null;
}

interface ResizeModeOption {
  id: ResizeMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const resizeModeOptions: ResizeModeOption[] = [
  { id: "exact", label: "Exact Size", icon: <Maximize className="w-4 h-4" />, description: "Set Width & Height" },
  { id: "percentage", label: "Percentage", icon: <Percent className="w-4 h-4" />, description: "Scale by %" },
  { id: "fit-width", label: "Fit Width", icon: <ArrowRight className="w-4 h-4" />, description: "Match Width" },
  { id: "fit-height", label: "Fit Height", icon: <ArrowRight className="w-4 h-4 rotate-90" />, description: "Match Height" },
  { id: "fit-box", label: "Fit to Box", icon: <Square className="w-4 h-4" />, description: "Max Dimensions" },
];

const BatchImageResizer = () => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [selectedMode, setSelectedMode] = useState<ResizeMode>("percentage");
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [hoveredFile, setHoveredFile] = useState<BatchFile | null>(null);
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false);
  const [zoomFile, setZoomFile] = useState<BatchFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize settings
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [percentage, setPercentage] = useState(50);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [quality, setQuality] = useState(85);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const handleFilesSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFilesPromises = Array.from(selectedFiles)
      .filter(file => file.type.startsWith("image/"))
      .map(file => {
        return new Promise<BatchFile>((resolve) => {
          const previewUrl = URL.createObjectURL(file);
          const img = new Image();
          img.onload = () => {
            resolve({
              id: generateId(),
              file,
              originalSize: file.size,
              originalWidth: img.width,
              originalHeight: img.height,
              resizedBlob: null,
              resizedSize: 0,
              resizedWidth: 0,
              resizedHeight: 0,
              status: 'pending' as const,
              progress: 0,
              previewUrl,
              resizedPreviewUrl: null,
            });
          };
          img.src = previewUrl;
        });
      });

    Promise.all(newFilesPromises).then(newFiles => {
      if (newFiles.length === 0) {
        toast.error("No valid image files selected");
        return;
      }
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`Added ${newFiles.length} image${newFiles.length > 1 ? 's' : ''}`);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFilesSelect(e.dataTransfer.files);
  }, [handleFilesSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.previewUrl);
        if (file.resizedPreviewUrl) URL.revokeObjectURL(file.resizedPreviewUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    files.forEach(file => {
      URL.revokeObjectURL(file.previewUrl);
      if (file.resizedPreviewUrl) URL.revokeObjectURL(file.resizedPreviewUrl);
    });
    setFiles([]);
    setOverallProgress(0);
  }, [files]);

  const calculateDimensions = (originalWidth: number, originalHeight: number): { width: number; height: number } => {
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

  const resizeSingleImage = async (batchFile: BatchFile): Promise<{ blob: Blob; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      img.onload = () => {
        const { width: targetWidth, height: targetHeight } = calculateDimensions(img.width, img.height);
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // For JPEG output, fill with white background first
        const mimeType = batchFile.file.type || "image/png";
        if (mimeType === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Use quality setting for JPEG and WebP
        const qualityValue = quality / 100;
        const outputMime = mimeType === "image/jpeg" || mimeType === "image/webp" ? mimeType : "image/png";
        const useQuality = outputMime === "image/jpeg" || outputMime === "image/webp";

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, width: targetWidth, height: targetHeight });
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          outputMime,
          useQuality ? qualityValue : undefined
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = batchFile.previewUrl;
    });
  };

  const resizeAllImages = useCallback(async () => {
    if (files.length === 0) {
      toast.error("Please add some images first");
      return;
    }

    setIsProcessing(true);
    setOverallProgress(0);

    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
    let completed = 0;

    for (const batchFile of pendingFiles) {
      setFiles(prev => prev.map(f =>
        f.id === batchFile.id ? { ...f, status: 'processing' as const, progress: 0 } : f
      ));

      try {
        const { blob, width: resizedWidth, height: resizedHeight } = await resizeSingleImage(batchFile);
        const resizedPreviewUrl = URL.createObjectURL(blob);

        setFiles(prev => prev.map(f =>
          f.id === batchFile.id
            ? {
                ...f,
                status: 'completed' as const,
                progress: 100,
                resizedBlob: blob,
                resizedSize: blob.size,
                resizedWidth,
                resizedHeight,
                resizedPreviewUrl,
              }
            : f
        ));
      } catch (error) {
        console.error("Resize error:", error);
        setFiles(prev => prev.map(f =>
          f.id === batchFile.id ? { ...f, status: 'error' as const, progress: 0 } : f
        ));
      }

      completed++;
      setOverallProgress(Math.round((completed / pendingFiles.length) * 100));
    }

    setIsProcessing(false);
    toast.success(`Resized ${completed} image${completed > 1 ? 's' : ''} successfully!`);
  }, [files, selectedMode, width, height, percentage]);

  const downloadSingleFile = useCallback((batchFile: BatchFile) => {
    if (!batchFile.resizedBlob) return;

    const url = URL.createObjectURL(batchFile.resizedBlob);
    const link = document.createElement("a");
    link.href = url;
    const extension = batchFile.file.name.split('.').pop() || 'png';
    link.download = `${batchFile.file.name.split('.')[0]}_resized.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const downloadAsZip = useCallback(async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.resizedBlob);
    if (completedFiles.length === 0) {
      toast.error("No resized images to download");
      return;
    }

    setIsDownloadingZip(true);

    try {
      const zip = new JSZip();

      for (const file of completedFiles) {
        if (file.resizedBlob) {
          const extension = file.file.name.split('.').pop() || 'png';
          const fileName = `${file.file.name.split('.')[0]}_resized.${extension}`;
          zip.file(fileName, file.resizedBlob);
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resized_images_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${completedFiles.length} resized images as ZIP`);
    } catch (error) {
      console.error("ZIP creation error:", error);
      toast.error("Failed to create ZIP file");
    } finally {
      setIsDownloadingZip(false);
    }
  }, [files]);

  const downloadAll = useCallback(() => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.resizedBlob);
    completedFiles.forEach(file => downloadSingleFile(file));
    toast.success(`Downloaded ${completedFiles.length} images`);
  }, [files, downloadSingleFile]);

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const completedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {resizeModeOptions.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm",
              selectedMode === mode.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            {mode.icon}
            <div className="text-left">
              <div className="font-medium">{mode.label}</div>
              <div className="text-xs opacity-70 hidden sm:block">{mode.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Resize Settings */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-medium text-foreground mb-3">Resize Settings (Applied to all images)</h4>
        
        {selectedMode === "exact" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch
                id="lock-ratio-batch"
                checked={lockAspectRatio}
                onCheckedChange={setLockAspectRatio}
              />
              <Label htmlFor="lock-ratio-batch" className="flex items-center gap-1 text-sm">
                {lockAspectRatio ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                Lock Aspect Ratio
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <div>
                <Label htmlFor="batch-width" className="text-sm">Width (px)</Label>
                <Input
                  id="batch-width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="batch-height" className="text-sm">Height (px)</Label>
                <Input
                  id="batch-height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMode === "percentage" && (
          <div className="max-w-xs">
            <Label htmlFor="batch-percentage" className="text-sm">Scale Percentage (%)</Label>
            <Input
              id="batch-percentage"
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
          <div className="max-w-xs">
            <Label htmlFor="batch-target-width" className="text-sm">Target Width (px)</Label>
            <Input
              id="batch-target-width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Height adjusts automatically per image
            </p>
          </div>
        )}

        {selectedMode === "fit-height" && (
          <div className="max-w-xs">
            <Label htmlFor="batch-target-height" className="text-sm">Target Height (px)</Label>
            <Input
              id="batch-target-height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Width adjusts automatically per image
            </p>
          </div>
        )}

        {selectedMode === "fit-box" && (
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <div>
              <Label htmlFor="batch-max-width" className="text-sm">Max Width (px)</Label>
              <Input
                id="batch-max-width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="batch-max-height" className="text-sm">Max Height (px)</Label>
              <Input
                id="batch-max-height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <p className="text-xs text-muted-foreground col-span-2">
              Images fit within these bounds while maintaining ratio
            </p>
          </div>
        )}

        {/* Quality Slider - Always visible */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="batch-quality" className="text-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Output Quality
              </Label>
              <span className="text-sm font-medium text-primary">{quality}%</span>
            </div>
            <Slider
              id="batch-quality"
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Applies to JPEG & WebP. Lower = smaller files, higher = better quality.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          "border-border hover:border-primary/50 bg-card/50 hover:bg-card"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFilesSelect(e.target.files)}
          className="hidden"
        />
        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground">
          Drop images here or click to browse
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Supports JPEG, PNG, WebP, GIF, BMP • No limit on files
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">
              {files.length} image{files.length > 1 ? 's' : ''} added
            </h4>
            <Button variant="ghost" size="sm" onClick={clearAllFiles} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "relative group rounded-lg border overflow-hidden bg-card",
                  file.status === 'completed' && "border-green-500/50",
                  file.status === 'error' && "border-destructive/50",
                  file.status === 'processing' && "border-primary/50",
                  file.status === 'pending' && "border-border"
                )}
              >
                <div
                  className="aspect-square relative cursor-pointer"
                  onMouseEnter={() => setHoveredFile(file)}
                  onMouseLeave={() => setHoveredFile(null)}
                  onClick={() => {
                    setZoomFile(file);
                    setZoomDialogOpen(true);
                  }}
                >
                  <img
                    src={file.resizedPreviewUrl || file.previewUrl}
                    alt={file.file.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity",
                    hoveredFile?.id === file.id ? "opacity-100" : "opacity-0"
                  )}>
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>

                  {/* Status Overlay */}
                  {file.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  )}

                  {file.status === 'completed' && (
                    <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                      ✓
                    </div>
                  )}

                  {file.status === 'error' && (
                    <div className="absolute top-1 right-1 bg-destructive text-white text-xs px-1.5 py-0.5 rounded">
                      ✗
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="absolute top-1 left-1 bg-black/70 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-2 space-y-1">
                  <p className="text-xs font-medium text-foreground truncate">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.originalWidth}×{file.originalHeight}
                    {file.status === 'completed' && (
                      <span className="text-green-500"> → {file.resizedWidth}×{file.resizedHeight}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.originalSize)}
                    {file.status === 'completed' && file.resizedSize > 0 && (
                      <span className="text-primary"> → {formatBytes(file.resizedSize)}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <Progress value={overallProgress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                Resizing... {overallProgress}%
              </p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            {pendingCount > 0 && (
              <span className="text-muted-foreground">
                <FileImage className="w-4 h-4 inline mr-1" />
                {pendingCount} pending
              </span>
            )}
            {completedCount > 0 && (
              <span className="text-green-500">
                ✓ {completedCount} completed
              </span>
            )}
            {errorCount > 0 && (
              <span className="text-destructive">
                ✗ {errorCount} failed
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={resizeAllImages}
              disabled={isProcessing || pendingCount === 0}
              className="bg-primary hover:bg-primary/90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resizing...
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4 mr-2" />
                  Resize All ({pendingCount})
                </>
              )}
            </Button>

            {completedCount > 0 && (
              <>
                <Button
                  onClick={downloadAsZip}
                  disabled={isDownloadingZip}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isDownloadingZip ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating ZIP...
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-4 h-4 mr-2" />
                      Download ZIP ({completedCount})
                    </>
                  )}
                </Button>

                <Button variant="outline" onClick={downloadAll}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Individual
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={zoomDialogOpen} onOpenChange={setZoomDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          {zoomFile && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground truncate max-w-md">
                  {zoomFile.file.name}
                </h3>
                <div className="flex gap-2">
                  {zoomFile.status === 'completed' && zoomFile.resizedBlob && (
                    <Button size="sm" onClick={() => downloadSingleFile(zoomFile)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>

              {zoomFile.status === 'completed' && zoomFile.resizedPreviewUrl ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Original</p>
                    <img
                      src={zoomFile.previewUrl}
                      alt="Original"
                      className="w-full rounded-lg border border-border"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      {zoomFile.originalWidth}×{zoomFile.originalHeight} • {formatBytes(zoomFile.originalSize)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-500">Resized</p>
                    <img
                      src={zoomFile.resizedPreviewUrl}
                      alt="Resized"
                      className="w-full rounded-lg border border-green-500/50"
                    />
                    <p className="text-xs text-green-500 text-center">
                      {zoomFile.resizedWidth}×{zoomFile.resizedHeight} • {formatBytes(zoomFile.resizedSize)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <img
                    src={zoomFile.previewUrl}
                    alt={zoomFile.file.name}
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    {zoomFile.originalWidth}×{zoomFile.originalHeight} • {formatBytes(zoomFile.originalSize)}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchImageResizer;

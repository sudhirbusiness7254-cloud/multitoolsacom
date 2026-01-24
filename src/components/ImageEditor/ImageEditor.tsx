import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorToolbar from "./EditorToolbar";
import AdjustmentPanel from "./AdjustmentPanel";
import CropPanel from "./CropPanel";
import ExportDialog from "./ExportDialog";
import { ImageState, EditMode, CropArea, AspectRatio, ExportOptions, HistoryEntry } from "./types";
import { AdVideo } from "@/components/ads/AdContainer";

const DEFAULT_STATE: ImageState = {
  src: "",
  rotation: 0,
  flipH: false,
  flipV: false,
  brightness: 0,
  contrast: 0,
  saturation: 0,
  crop: null,
  zoom: 1,
};

const ImageEditor = () => {
  const [imageState, setImageState] = useState<ImageState>(DEFAULT_STATE);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [activeMode, setActiveMode] = useState<EditMode>("none");
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "jpeg",
    quality: 92,
    preserveMetadata: false,
  });
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("free");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasImage = !!imageState.src;

  // Add to history
  const addToHistory = useCallback((state: ImageState) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, { state, timestamp: Date.now() }];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  // Load image
  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Unsupported file type. Please use JPEG, PNG, GIF, WebP, or SVG.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image too large — please use an image < 20MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        const newState = { ...DEFAULT_STATE, src: e.target?.result as string };
        setImageState(newState);
        setCropArea({ x: 0, y: 0, width: img.width, height: img.height });
        setHistory([{ state: newState, timestamp: Date.now() }]);
        setHistoryIndex(0);
        toast.success("Image loaded successfully!");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  // Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadImage(file);
  }, [loadImage]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  }, [loadImage]);

  // Paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) loadImage(file);
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [loadImage]);

  // Update state with history
  const updateState = useCallback((updates: Partial<ImageState>) => {
    const newState = { ...imageState, ...updates };
    setImageState(newState);
    addToHistory(newState);
  }, [imageState, addToHistory]);

  // Edit actions
  const rotateLeft = () => updateState({ rotation: (imageState.rotation - 90) % 360 });
  const rotateRight = () => updateState({ rotation: (imageState.rotation + 90) % 360 });
  const flipHorizontal = () => updateState({ flipH: !imageState.flipH });
  const flipVertical = () => updateState({ flipV: !imageState.flipV });

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setImageState(history[historyIndex - 1].state);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setImageState(history[historyIndex + 1].state);
    }
  };

  const handleReset = () => {
    if (originalImage) {
      const newState = { ...DEFAULT_STATE, src: imageState.src };
      setImageState(newState);
      setCropArea({ x: 0, y: 0, width: originalImage.width, height: originalImage.height });
      addToHistory(newState);
      setActiveMode("none");
      toast.success("Image reset to original");
    }
  };

  // Apply crop
  const applyCrop = () => {
    updateState({ crop: { ...cropArea } });
    setActiveMode("none");
    toast.success("Crop applied!");
  };

  // Render canvas
  useEffect(() => {
    if (!originalImage || !canvasRef.current || !previewCanvasRef.current) return;

    const canvas = canvasRef.current;
    const preview = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const previewCtx = preview.getContext("2d");
    if (!ctx || !previewCtx) return;

    let width = originalImage.width;
    let height = originalImage.height;

    // Handle rotation
    if (Math.abs(imageState.rotation) === 90 || Math.abs(imageState.rotation) === 270) {
      [width, height] = [height, width];
    }

    // Apply crop if exists
    if (imageState.crop) {
      width = imageState.crop.width;
      height = imageState.crop.height;
    }

    canvas.width = width;
    canvas.height = height;
    preview.width = width;
    preview.height = height;

    ctx.save();
    previewCtx.save();

    // Clear
    ctx.clearRect(0, 0, width, height);
    previewCtx.clearRect(0, 0, width, height);

    // Center and rotate
    ctx.translate(width / 2, height / 2);
    previewCtx.translate(width / 2, height / 2);

    ctx.rotate((imageState.rotation * Math.PI) / 180);
    previewCtx.rotate((imageState.rotation * Math.PI) / 180);

    // Flip
    const scaleX = imageState.flipH ? -1 : 1;
    const scaleY = imageState.flipV ? -1 : 1;
    ctx.scale(scaleX, scaleY);
    previewCtx.scale(scaleX, scaleY);

    // Apply filters
    const brightness = 100 + imageState.brightness;
    const contrast = 100 + imageState.contrast;
    const saturation = 100 + imageState.saturation;
    const filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    ctx.filter = filter;
    previewCtx.filter = filter;

    // Draw image
    const drawWidth = Math.abs(imageState.rotation) === 90 || Math.abs(imageState.rotation) === 270
      ? height : width;
    const drawHeight = Math.abs(imageState.rotation) === 90 || Math.abs(imageState.rotation) === 270
      ? width : height;

    if (imageState.crop) {
      ctx.drawImage(
        originalImage,
        imageState.crop.x, imageState.crop.y,
        imageState.crop.width, imageState.crop.height,
        -drawWidth / 2, -drawHeight / 2,
        drawWidth, drawHeight
      );
      previewCtx.drawImage(
        originalImage,
        imageState.crop.x, imageState.crop.y,
        imageState.crop.width, imageState.crop.height,
        -drawWidth / 2, -drawHeight / 2,
        drawWidth, drawHeight
      );
    } else {
      ctx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
      previewCtx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
    }

    ctx.restore();
    previewCtx.restore();
  }, [imageState, originalImage]);

  // Export image
  const exportImage = () => {
    if (!canvasRef.current) return;

    const mimeType = `image/${exportOptions.format}`;
    const quality = exportOptions.quality / 100;
    const dataUrl = canvasRef.current.toDataURL(mimeType, quality);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `edited-image.${exportOptions.format}`;
    link.click();

    setExportDialogOpen(false);
    toast.success("Image exported successfully!");
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!canvasRef.current) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current!.toBlob((blob) => resolve(blob!), "image/png");
      });
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasImage) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      } else if (e.key === "r" && !e.ctrlKey && !e.metaKey) {
        rotateRight();
      } else if (e.key === "l" && !e.ctrlKey && !e.metaKey) {
        rotateLeft();
      } else if (e.key === "f" && !e.ctrlKey && !e.metaKey) {
        flipHorizontal();
      } else if (e.key === "v" && !e.ctrlKey && !e.metaKey) {
        flipVertical();
      } else if (e.key === "Enter" && activeMode === "crop") {
        applyCrop();
      } else if (e.key === "Escape") {
        setActiveMode("none");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasImage, activeMode, historyIndex, imageState]);

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border hover:border-primary/50 bg-card/50"
        }`}
        role="button"
        tabIndex={0}
        aria-label="Drop zone for image upload"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Drag & drop an image here, or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports JPEG, PNG, GIF, WebP, SVG • Max 20MB • Paste from clipboard (Ctrl+V)
            </p>
          </div>
        </div>
      </div>
      
      {/* Video Ad - Below Upload Area */}
      <AdVideo className="mt-4" />

      {/* Toolbar */}
      <EditorToolbar
        activeMode={activeMode}
        onModeChange={setActiveMode}
        onRotateLeft={rotateLeft}
        onRotateRight={rotateRight}
        onFlipH={flipHorizontal}
        onFlipV={flipVertical}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onDownload={() => setExportDialogOpen(true)}
        onCopyToClipboard={copyToClipboard}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        hasImage={hasImage}
      />

      {/* Editor Area */}
      {hasImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Editor Canvas */}
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-center min-h-[300px] overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Panels */}
            {activeMode === "crop" && originalImage && (
              <CropPanel
                cropArea={cropArea}
                aspectRatio={aspectRatio}
                originalWidth={originalImage.width}
                originalHeight={originalImage.height}
                onCropChange={setCropArea}
                onAspectRatioChange={setAspectRatio}
                onApply={applyCrop}
                onCancel={() => setActiveMode("none")}
              />
            )}

            {activeMode === "adjust" && (
              <AdjustmentPanel
                brightness={imageState.brightness}
                contrast={imageState.contrast}
                saturation={imageState.saturation}
                onBrightnessChange={(val) => updateState({ brightness: val })}
                onContrastChange={(val) => updateState({ contrast: val })}
                onSaturationChange={(val) => updateState({ saturation: val })}
                onClose={() => setActiveMode("none")}
              />
            )}
          </div>

          {/* Right - Live Preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Live Preview</span>
              <span className="text-xs text-muted-foreground">— changes applied instantly</span>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-center min-h-[300px] overflow-hidden">
              <canvas
                ref={previewCanvasRef}
                className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center text-xs text-muted-foreground">
              {originalImage && (
                <span>
                  {originalImage.width} × {originalImage.height}px
                  {imageState.crop && (
                    <span className="text-primary ml-2">
                      → {Math.round(imageState.crop.width)} × {Math.round(imageState.crop.height)}px
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasImage && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Upload an image to start editing</p>
        </div>
      )}

      {/* Export Dialog */}
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        options={exportOptions}
        onOptionsChange={setExportOptions}
        onExport={exportImage}
      />
    </div>
  );
};

export default ImageEditor;

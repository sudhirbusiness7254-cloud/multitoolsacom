import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Download, RotateCcw, Plus, X, ArrowRight, ArrowDown, Grid, Layers, Upload, GripVertical } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type CombineMode = "horizontal" | "vertical" | "collage" | "before-after";

interface UniversalImageCombineProps {
  initialMode?: CombineMode;
}

const combineModes = [
  { id: "horizontal" as CombineMode, name: "Horizontal", icon: <ArrowRight className="w-4 h-4" /> },
  { id: "vertical" as CombineMode, name: "Vertical", icon: <ArrowDown className="w-4 h-4" /> },
  { id: "collage" as CombineMode, name: "Collage", icon: <Grid className="w-4 h-4" /> },
  { id: "before-after" as CombineMode, name: "Before/After", icon: <Layers className="w-4 h-4" /> },
];

const UniversalImageCombine = ({ initialMode = "horizontal" }: UniversalImageCombineProps) => {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<CombineMode>(initialMode);
  const [gap, setGap] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [columns, setColumns] = useState(2);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    
    setImages((prev) => [...prev, ...newImages]);
    setProcessedUrl(null);
    
    toast({ 
      title: `${files.length} image(s) added`, 
      description: `Total: ${images.length + files.length} images` 
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setProcessedUrl(null);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    
    const newImages = [...images];
    const draggedItem = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(index, 0, draggedItem);
    setImages(newImages);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const combineImages = useCallback(async () => {
    if (images.length < 2 || !canvasRef.current) {
      toast({ title: "Need at least 2 images", description: "Please upload at least 2 images to combine.", variant: "destructive" });
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    toast({ title: "Processing...", description: `Combining ${images.length} images...` });

    const loadedImages = await Promise.all(
      images.map((img) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new window.Image();
          image.crossOrigin = "anonymous";
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error("Failed to load image"));
          image.src = img.url;
        })
      )
    );

    let totalWidth = 0;
    let totalHeight = 0;
    const maxWidth = Math.max(...loadedImages.map((img) => img.width));
    const maxHeight = Math.max(...loadedImages.map((img) => img.height));

    switch (mode) {
      case "horizontal":
        totalWidth = loadedImages.reduce((sum, img) => sum + img.width, 0) + gap * (images.length - 1);
        totalHeight = maxHeight;
        break;
      case "vertical":
        totalWidth = maxWidth;
        totalHeight = loadedImages.reduce((sum, img) => sum + img.height, 0) + gap * (images.length - 1);
        break;
      case "collage": {
        const rows = Math.ceil(images.length / columns);
        totalWidth = maxWidth * columns + gap * (columns - 1);
        totalHeight = maxHeight * rows + gap * (rows - 1);
        break;
      }
      case "before-after":
        totalWidth = loadedImages[0].width + loadedImages[1].width + gap;
        totalHeight = Math.max(loadedImages[0].height, loadedImages[1].height);
        break;
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    let x = 0;
    let y = 0;

    switch (mode) {
      case "horizontal":
        loadedImages.forEach((img) => {
          ctx.drawImage(img, x, (maxHeight - img.height) / 2);
          x += img.width + gap;
        });
        break;
      case "vertical":
        loadedImages.forEach((img) => {
          ctx.drawImage(img, (maxWidth - img.width) / 2, y);
          y += img.height + gap;
        });
        break;
      case "collage":
        loadedImages.forEach((img, index) => {
          const col = index % columns;
          const row = Math.floor(index / columns);
          const posX = col * (maxWidth + gap);
          const posY = row * (maxHeight + gap);
          ctx.drawImage(img, posX + (maxWidth - img.width) / 2, posY + (maxHeight - img.height) / 2);
        });
        break;
      case "before-after":
        ctx.drawImage(loadedImages[0], 0, (totalHeight - loadedImages[0].height) / 2);
        if (loadedImages[1]) {
          ctx.drawImage(loadedImages[1], loadedImages[0].width + gap, (totalHeight - loadedImages[1].height) / 2);
        }
        // Add divider line
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(loadedImages[0].width + gap / 2, 0);
        ctx.lineTo(loadedImages[0].width + gap / 2, totalHeight);
        ctx.stroke();
        break;
    }

    setProcessedUrl(canvas.toDataURL("image/png"));
    toast({ title: "Images combined!", description: `${images.length} images merged successfully.` });
  }, [images, mode, gap, backgroundColor, columns]);

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement("a");
    link.download = `combined-${mode}-${images.length}-images.png`;
    link.href = processedUrl;
    link.click();
    toast({ title: "Download started", description: "Your combined image is being downloaded." });
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    setProcessedUrl(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="flex flex-wrap justify-center gap-2">
          {combineModes.map((m) => (
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

        {/* Upload Area */}
        <div 
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFilesSelect(e.dataTransfer.files);
          }}
        >
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag & drop multiple images or click to browse
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Images
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            No limit on number of images • Supports JPG, PNG, WebP, GIF
          </p>
        </div>

        {/* Native Banner Ad - Below upload area */}
        {images.length === 0 && (
        )}

        {/* Image Count & Stats */}
        {images.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 rounded-lg">
            <span className="text-sm font-medium">
              {images.length} image{images.length !== 1 ? "s" : ""} added
            </span>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add More
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleReset}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Image Thumbnails with Drag & Drop Reorder */}
        {images.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Drag to reorder images:</p>
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => (
                <div 
                  key={`${img.file.name}-${index}`}
                  className={`relative group cursor-move ${dragIndex === index ? 'opacity-50' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-white drop-shadow-lg" />
                  </div>
                  <img
                    src={img.url}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border-2 border-border hover:border-primary transition-colors"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-xs text-center rounded py-0.5">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Gap: {gap}px</label>
            <Slider
              value={[gap]}
              onValueChange={(v) => setGap(v[0])}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Background</label>
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-10 cursor-pointer"
            />
          </div>
          {mode === "collage" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Columns: {columns}</label>
              <Slider
                value={[columns]}
                onValueChange={(v) => setColumns(v[0])}
                min={2}
                max={10}
                step={1}
              />
            </div>
          )}
        </div>

        <Button 
          onClick={combineImages} 
          className="w-full" 
          disabled={images.length < 2}
          size="lg"
        >
          <Grid className="w-4 h-4 mr-2" />
          Combine {images.length} Image{images.length !== 1 ? "s" : ""}
        </Button>

        {/* Preview */}
        {processedUrl && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Preview</h3>
            <div className="relative bg-secondary/50 rounded-xl overflow-auto max-h-[600px] flex items-center justify-center p-4">
              <img src={processedUrl} alt="Combined" className="max-w-full h-auto object-contain" />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={handleReset} disabled={images.length === 0}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleDownload} disabled={!processedUrl} size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Combined Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UniversalImageCombine;
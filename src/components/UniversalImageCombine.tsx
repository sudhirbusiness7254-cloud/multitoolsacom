import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Plus, X, ArrowRight, ArrowDown, Grid, Layers } from "lucide-react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    const url = URL.createObjectURL(selectedFile);
    setImages((prev) => [...prev, { file: selectedFile, url }]);
    setProcessedUrl(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setProcessedUrl(null);
  };

  const combineImages = useCallback(async () => {
    if (images.length < 2 || !canvasRef.current) {
      toast({ title: "Need at least 2 images", description: "Please upload at least 2 images to combine.", variant: "destructive" });
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadedImages = await Promise.all(
      images.map((img) =>
        new Promise<HTMLImageElement>((resolve) => {
          const image = new window.Image();
          image.crossOrigin = "anonymous";
          image.onload = () => resolve(image);
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
    toast({ title: "Images combined!", description: "Your combined image is ready for download." });
  }, [images, mode, gap, backgroundColor, columns]);

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement("a");
    link.download = `combined-${mode}-image.png`;
    link.href = processedUrl;
    link.click();
  };

  const handleReset = () => {
    setImages([]);
    setProcessedUrl(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <canvas ref={canvasRef} className="hidden" />

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

        {/* Image Upload */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Add images to combine ({images.length} added)</p>
          <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
        </div>

        {/* Image Thumbnails */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.url}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-border"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center">
                  {index + 1}
                </span>
              </div>
            ))}
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
              max={50}
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
                max={5}
                step={1}
              />
            </div>
          )}
        </div>

        <Button onClick={combineImages} className="w-full" disabled={images.length < 2}>
          <Plus className="w-4 h-4 mr-2" />
          Combine Images
        </Button>

        {/* Preview */}
        {processedUrl && (
          <div className="relative aspect-video bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
            <img src={processedUrl} alt="Combined" className="max-w-full max-h-full object-contain" />
          </div>
        )}

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
    </div>
  );
};

export default UniversalImageCombine;

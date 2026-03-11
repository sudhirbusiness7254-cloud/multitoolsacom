import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Type, Image as ImageIcon, Upload, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type WatermarkMode = "text" | "image";
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "tile";

interface UniversalWatermarkProps {
  initialMode?: WatermarkMode;
}

const fonts = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Impact", "Comic Sans MS"];

const UniversalWatermark = ({ initialMode = "text" }: UniversalWatermarkProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<WatermarkMode>(initialMode);
  const [watermarkText, setWatermarkText] = useState("© Your Name");
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [watermarkFileName, setWatermarkFileName] = useState<string | null>(null);
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [watermarkScale, setWatermarkScale] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    setProcessedUrl(null);
  };

  const handleWatermarkImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setWatermarkImage(url);
      setWatermarkFileName(selectedFile.name);
    }
  };

  const removeWatermarkImage = () => {
    setWatermarkImage(null);
    setWatermarkFileName(null);
    if (watermarkInputRef.current) {
      watermarkInputRef.current.value = "";
    }
  };

  const applyWatermark = useCallback(() => {
    if (!imageUrl || !canvasRef.current) return;

    if (mode === "image" && !watermarkImage) {
      toast({ title: "No watermark image", description: "Please upload a watermark image first.", variant: "destructive" });
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity / 100;

      const getPosition = (wmWidth: number, wmHeight: number) => {
        const padding = 20;
        switch (position) {
          case "top-left": return { x: padding, y: padding + wmHeight };
          case "top-right": return { x: canvas.width - wmWidth - padding, y: padding + wmHeight };
          case "bottom-left": return { x: padding, y: canvas.height - padding };
          case "bottom-right": return { x: canvas.width - wmWidth - padding, y: canvas.height - padding };
          case "center": return { x: (canvas.width - wmWidth) / 2, y: (canvas.height + wmHeight) / 2 };
          default: return { x: padding, y: padding + wmHeight };
        }
      };

      if (mode === "text") {
        ctx.font = `${fontSize}px ${font}`;
        ctx.fillStyle = color;
        const textWidth = ctx.measureText(watermarkText).width;

        if (position === "tile") {
          for (let y = 0; y < canvas.height; y += fontSize * 3) {
            for (let x = 0; x < canvas.width; x += textWidth + 50) {
              ctx.save();
              ctx.translate(x + textWidth / 2, y + fontSize / 2);
              ctx.rotate(-Math.PI / 6);
              ctx.fillText(watermarkText, -textWidth / 2, 0);
              ctx.restore();
            }
          }
        } else {
          const pos = getPosition(textWidth, fontSize);
          ctx.fillText(watermarkText, pos.x, pos.y);
        }
        ctx.globalAlpha = 1;
        setProcessedUrl(canvas.toDataURL("image/png"));
        toast({ title: "Watermark applied!", description: "Your image is ready for download." });
      } else if (mode === "image" && watermarkImage) {
        const wmImg = new window.Image();
        wmImg.crossOrigin = "anonymous";
        wmImg.onload = () => {
          const scale = watermarkScale / 100;
          const wmWidth = wmImg.width * scale;
          const wmHeight = wmImg.height * scale;

          if (position === "tile") {
            for (let y = 0; y < canvas.height; y += wmHeight + 50) {
              for (let x = 0; x < canvas.width; x += wmWidth + 50) {
                ctx.drawImage(wmImg, x, y, wmWidth, wmHeight);
              }
            }
          } else {
            const pos = getPosition(wmWidth, wmHeight);
            ctx.drawImage(wmImg, pos.x, pos.y - wmHeight, wmWidth, wmHeight);
          }

          ctx.globalAlpha = 1;
          setProcessedUrl(canvas.toDataURL("image/png"));
          toast({ title: "Watermark applied!", description: "Your image is ready for download." });
        };
        wmImg.src = watermarkImage;
        return;
      }
    };
    img.src = imageUrl;
  }, [imageUrl, mode, watermarkText, watermarkImage, font, fontSize, color, opacity, position, watermarkScale]);

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement("a");
    link.download = `watermarked-${file?.name || "image.png"}`;
    link.href = processedUrl;
    link.click();
    toast({ title: "Download started", description: "Your watermarked image is being downloaded." });
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setWatermarkImage(null);
    setWatermarkFileName(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <canvas ref={canvasRef} className="hidden" />

      {!file ? (
        <>
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Upload Your Photo</h3>
              <p className="text-sm text-muted-foreground">Select the main image you want to add a watermark to</p>
            </div>
            <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
          </div>
          {/* Native Banner Ad - Below upload area */}
          <div className="hidden lg:block mt-4">
            <NativeBannerAd />
          </div>
          <MobileNativeAd className="mt-4" />
        </>
      ) : (
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex justify-center gap-2">
            <Button
              variant={mode === "text" ? "default" : "outline"}
              onClick={() => setMode("text")}
            >
              <Type className="w-4 h-4 mr-2" />
              Text Watermark
            </Button>
            <Button
              variant={mode === "image" ? "default" : "outline"}
              onClick={() => setMode("image")}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Image Watermark
            </Button>
          </div>

          {/* Two Column Layout for Image Mode */}
          {mode === "image" && (
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-secondary/30 rounded-xl">
              {/* Main Photo Preview */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Main Photo
                </label>
                <div className="aspect-video bg-secondary/50 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-border">
                  <img src={imageUrl} alt="Main" className="max-w-full max-h-full object-contain" />
                </div>
                <Button variant="outline" size="sm" onClick={handleReset} className="w-full">
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Change Photo
                </Button>
              </div>

              {/* Watermark Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Watermark Image (Logo)
                </label>
                <div className="aspect-video bg-secondary/50 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-border relative">
                  {watermarkImage ? (
                    <>
                      <img src={watermarkImage} alt="Watermark" className="max-w-full max-h-full object-contain p-4" />
                      <button
                        onClick={removeWatermarkImage}
                        className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload watermark image</p>
                    </div>
                  )}
                </div>
                <input
                  ref={watermarkInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleWatermarkImageSelect}
                  className="hidden"
                  id="watermark-upload"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => watermarkInputRef.current?.click()}
                >
                  <Upload className="w-3 h-3 mr-2" />
                  {watermarkImage ? "Change Watermark" : "Upload Watermark"}
                </Button>
              </div>
            </div>
          )}

          {/* Watermark Settings */}
          <div className="grid sm:grid-cols-2 gap-4">
            {mode === "text" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Watermark Text</label>
                  <Input
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Font</label>
                  <Select value={font} onValueChange={setFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size: {fontSize}px</label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(v) => setFontSize(v[0])}
                    min={12}
                    max={120}
                    step={1}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Watermark Size: {watermarkScale}%</label>
                <Slider
                  value={[watermarkScale]}
                  onValueChange={(v) => setWatermarkScale(v[0])}
                  min={10}
                  max={200}
                  step={5}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Opacity: {opacity}%</label>
              <Slider
                value={[opacity]}
                onValueChange={(v) => setOpacity(v[0])}
                min={10}
                max={100}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Position</label>
              <Select value={position} onValueChange={(v) => setPosition(v as Position)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="tile">Tiled Pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={applyWatermark} 
            className="w-full"
            disabled={mode === "image" && !watermarkImage}
          >
            Apply Watermark
          </Button>

          {/* Preview */}
          <div className="relative aspect-video bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
            {processedUrl ? (
              <img src={processedUrl} alt="Watermarked" className="max-w-full max-h-full object-contain" />
            ) : imageUrl && mode === "text" ? (
              <img src={imageUrl} alt="Original" className="max-w-full max-h-full object-contain" />
            ) : null}
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

export default UniversalWatermark;
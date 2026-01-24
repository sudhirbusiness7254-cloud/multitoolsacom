import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Sun, Contrast, Droplets, Sparkles, Snowflake, Flame, Image as ImageIcon, CircleOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import MobileNativeAd from "@/components/ads/MobileNativeAd";

type FilterMode = "brightness" | "contrast" | "saturation" | "sharpen" | "blur" | "gaussian-blur" | "emboss" | "smooth" | "pixelate" | "sepia" | "negative" | "vintage" | "warm" | "cool";

interface UniversalPhotoFiltersProps {
  initialMode?: FilterMode;
}

const filterModes = [
  { id: "brightness" as FilterMode, name: "Brightness", icon: <Sun className="w-4 h-4" /> },
  { id: "contrast" as FilterMode, name: "Contrast", icon: <Contrast className="w-4 h-4" /> },
  { id: "saturation" as FilterMode, name: "Saturation", icon: <Droplets className="w-4 h-4" /> },
  { id: "sharpen" as FilterMode, name: "Sharpen", icon: <Sparkles className="w-4 h-4" /> },
  { id: "blur" as FilterMode, name: "Blur", icon: <CircleOff className="w-4 h-4" /> },
  { id: "gaussian-blur" as FilterMode, name: "Gaussian Blur", icon: <CircleOff className="w-4 h-4" /> },
  { id: "pixelate" as FilterMode, name: "Pixelate", icon: <ImageIcon className="w-4 h-4" /> },
  { id: "sepia" as FilterMode, name: "Sepia", icon: <Flame className="w-4 h-4" /> },
  { id: "negative" as FilterMode, name: "Negative", icon: <CircleOff className="w-4 h-4" /> },
  { id: "vintage" as FilterMode, name: "Vintage", icon: <ImageIcon className="w-4 h-4" /> },
  { id: "warm" as FilterMode, name: "Warm Tone", icon: <Flame className="w-4 h-4" /> },
  { id: "cool" as FilterMode, name: "Cool Tone", icon: <Snowflake className="w-4 h-4" /> },
];

const UniversalPhotoFilters = ({ initialMode = "brightness" }: UniversalPhotoFiltersProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<FilterMode>(initialMode);
  const [intensity, setIntensity] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    setProcessedUrl(null);
    setIntensity(50);
  };

  const applyFilter = useCallback(() => {
    if (!imageUrl || !canvasRef.current) return;
    
    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const value = (intensity - 50) / 50; // -1 to 1 range

      switch (mode) {
        case "brightness": {
          const factor = 1 + value;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * factor);
            data[i + 1] = Math.min(255, data[i + 1] * factor);
            data[i + 2] = Math.min(255, data[i + 2] * factor);
          }
          break;
        }
        case "contrast": {
          const factor = (259 * (value * 255 + 255)) / (255 * (259 - value * 255));
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
          }
          break;
        }
        case "saturation": {
          const factor = 1 + value;
          for (let i = 0; i < data.length; i += 4) {
            const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = Math.min(255, Math.max(0, gray + factor * (data[i] - gray)));
            data[i + 1] = Math.min(255, Math.max(0, gray + factor * (data[i + 1] - gray)));
            data[i + 2] = Math.min(255, Math.max(0, gray + factor * (data[i + 2] - gray)));
          }
          break;
        }
        case "blur":
        case "gaussian-blur": {
          const radius = Math.floor((intensity / 100) * 10) + 1;
          ctx.putImageData(imageData, 0, 0);
          ctx.filter = `blur(${radius}px)`;
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = "none";
          setProcessedUrl(canvas.toDataURL("image/png"));
          setIsProcessing(false);
          return;
        }
        case "pixelate": {
          const size = Math.floor((intensity / 100) * 20) + 2;
          for (let y = 0; y < canvas.height; y += size) {
            for (let x = 0; x < canvas.width; x += size) {
              const idx = (y * canvas.width + x) * 4;
              const r = data[idx], g = data[idx + 1], b = data[idx + 2];
              for (let py = 0; py < size && y + py < canvas.height; py++) {
                for (let px = 0; px < size && x + px < canvas.width; px++) {
                  const pidx = ((y + py) * canvas.width + (x + px)) * 4;
                  data[pidx] = r;
                  data[pidx + 1] = g;
                  data[pidx + 2] = b;
                }
              }
            }
          }
          break;
        }
        case "sepia": {
          const sepiaIntensity = intensity / 100;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const tr = 0.393 * r + 0.769 * g + 0.189 * b;
            const tg = 0.349 * r + 0.686 * g + 0.168 * b;
            const tb = 0.272 * r + 0.534 * g + 0.131 * b;
            data[i] = Math.min(255, r + (tr - r) * sepiaIntensity);
            data[i + 1] = Math.min(255, g + (tg - g) * sepiaIntensity);
            data[i + 2] = Math.min(255, b + (tb - b) * sepiaIntensity);
          }
          break;
        }
        case "negative": {
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
          break;
        }
        case "vintage": {
          const vintageIntensity = intensity / 100;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * (1 + 0.2 * vintageIntensity));
            data[i + 1] = Math.min(255, data[i + 1] * (1 + 0.1 * vintageIntensity));
            data[i + 2] = Math.min(255, data[i + 2] * (0.9 - 0.1 * vintageIntensity));
          }
          break;
        }
        case "warm": {
          const warmIntensity = intensity / 100;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] + 30 * warmIntensity);
            data[i + 1] = Math.min(255, data[i + 1] + 10 * warmIntensity);
            data[i + 2] = Math.max(0, data[i + 2] - 20 * warmIntensity);
          }
          break;
        }
        case "cool": {
          const coolIntensity = intensity / 100;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, data[i] - 20 * coolIntensity);
            data[i + 1] = Math.min(255, data[i + 1] + 5 * coolIntensity);
            data[i + 2] = Math.min(255, data[i + 2] + 30 * coolIntensity);
          }
          break;
        }
        case "sharpen": {
          const sharpness = (intensity / 100) * 2;
          const tempData = new Uint8ClampedArray(data);
          const kernel = [0, -sharpness, 0, -sharpness, 1 + 4 * sharpness, -sharpness, 0, -sharpness, 0];
          const w = canvas.width;
          for (let y = 1; y < canvas.height - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                  for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * w + (x + kx)) * 4 + c;
                    sum += tempData[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
                  }
                }
                data[(y * w + x) * 4 + c] = Math.min(255, Math.max(0, sum));
              }
            }
          }
          break;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedUrl(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    };
    img.src = imageUrl;
  }, [imageUrl, mode, intensity]);

  useEffect(() => {
    if (imageUrl) {
      applyFilter();
    }
  }, [mode, intensity, imageUrl, applyFilter]);

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement("a");
    link.download = `filtered-${mode}-${file?.name || "image.png"}`;
    link.href = processedUrl;
    link.click();
    toast({ title: "Download started", description: "Your filtered image is being downloaded." });
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setIntensity(50);
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
          <div className="flex flex-wrap gap-2 justify-center">
            {filterModes.map((m) => (
              <Button
                key={m.id}
                variant={mode === m.id ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(m.id)}
                className="flex items-center gap-2"
              >
                {m.icon}
                {m.name}
              </Button>
            ))}
          </div>

          {/* Intensity Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Intensity: {intensity}%</label>
            <Slider
              value={[intensity]}
              onValueChange={(v) => setIntensity(v[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Preview */}
          <div className="relative aspect-video bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
            {isProcessing ? (
              <div className="animate-pulse text-muted-foreground">Processing...</div>
            ) : processedUrl ? (
              <img src={processedUrl} alt="Filtered" className="max-w-full max-h-full object-contain" />
            ) : imageUrl ? (
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

export default UniversalPhotoFilters;

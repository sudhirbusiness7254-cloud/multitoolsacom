import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DragDropUpload from "./DragDropUpload";
import { Download, Image, RotateCcw, Palette, Circle, Droplets, Eraser, Layers, Combine } from "lucide-react";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import MobileNativeAd from "@/components/ads/MobileNativeAd";

type UtilityMode = "grayscale" | "blackwhite" | "add-transparency" | "remove-transparency" | "invert" | "sepia";

interface UtilityOption {
  id: UtilityMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const utilityOptions: UtilityOption[] = [
  { id: "grayscale", label: "Grayscale", icon: <Palette className="w-5 h-5" />, description: "Remove Colors" },
  { id: "blackwhite", label: "Black & White", icon: <Circle className="w-5 h-5" />, description: "High Contrast" },
  { id: "add-transparency", label: "Add Transparency", icon: <Droplets className="w-5 h-5" />, description: "Alpha Channel" },
  { id: "remove-transparency", label: "Remove Transparency", icon: <Eraser className="w-5 h-5" />, description: "Solid Background" },
  { id: "invert", label: "Invert Colors", icon: <Layers className="w-5 h-5" />, description: "Negative Effect" },
  { id: "sepia", label: "Sepia Tone", icon: <Combine className="w-5 h-5" />, description: "Vintage Look" },
];

interface UniversalFormatUtilityProps {
  initialMode?: UtilityMode;
}

const UniversalFormatUtility = ({ initialMode = "grayscale" }: UniversalFormatUtilityProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<UtilityMode>(initialMode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  
  const [threshold, setThreshold] = useState(128); // For black & white
  const [toleranceColor, setToleranceColor] = useState("#ffffff"); // For transparency
  const [tolerance, setTolerance] = useState(30);
  const [bgColor, setBgColor] = useState("#ffffff"); // For remove transparency
  
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

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
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleProcess = async () => {
    if (!file || !preview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 15, 85));
      }, 100);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      const img = new window.Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = preview;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      switch (selectedMode) {
        case "grayscale":
          for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          }
          break;

        case "blackwhite":
          for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            const bw = gray > threshold ? 255 : 0;
            data[i] = bw;
            data[i + 1] = bw;
            data[i + 2] = bw;
          }
          break;

        case "add-transparency":
          const targetR = parseInt(toleranceColor.slice(1, 3), 16);
          const targetG = parseInt(toleranceColor.slice(3, 5), 16);
          const targetB = parseInt(toleranceColor.slice(5, 7), 16);
          
          for (let i = 0; i < data.length; i += 4) {
            const dr = Math.abs(data[i] - targetR);
            const dg = Math.abs(data[i + 1] - targetG);
            const db = Math.abs(data[i + 2] - targetB);
            const diff = (dr + dg + db) / 3;
            
            if (diff < tolerance) {
              data[i + 3] = 0; // Make transparent
            }
          }
          break;

        case "remove-transparency":
          const bgR = parseInt(bgColor.slice(1, 3), 16);
          const bgG = parseInt(bgColor.slice(3, 5), 16);
          const bgB = parseInt(bgColor.slice(5, 7), 16);
          
          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3] / 255;
            data[i] = Math.round(data[i] * alpha + bgR * (1 - alpha));
            data[i + 1] = Math.round(data[i + 1] * alpha + bgG * (1 - alpha));
            data[i + 2] = Math.round(data[i + 2] * alpha + bgB * (1 - alpha));
            data[i + 3] = 255;
          }
          break;

        case "invert":
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
          break;

        case "sepia":
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
            data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
            data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
          }
          break;
      }

      ctx.putImageData(imageData, 0, 0);

      const outputFormat = selectedMode === "add-transparency" ? "image/png" : (file.type || "image/png");
      const processedDataUrl = canvas.toDataURL(outputFormat, 0.92);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(processedDataUrl);
      
      const modeLabels: Record<UtilityMode, string> = {
        "grayscale": "Converted to grayscale",
        "blackwhite": "Converted to black & white",
        "add-transparency": "Added transparency",
        "remove-transparency": "Removed transparency",
        "invert": "Colors inverted",
        "sepia": "Sepia tone applied"
      };
      toast.success(`${modeLabels[selectedMode]} successfully!`);
    } catch (error) {
      toast.error("Processing failed. Please try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;

    const link = document.createElement("a");
    link.href = result;
    const extension = selectedMode === "add-transparency" ? "png" : (file.name.split('.').pop() || 'png');
    link.download = `${file.name.split('.')[0]}_${selectedMode}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started!");
  };

  const resetTool = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {utilityOptions.map((mode) => (
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
              <div className="font-semibold text-sm">{mode.label}</div>
              <div className="text-xs opacity-70">{mode.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Mode-specific Settings */}
      {selectedMode === "blackwhite" && (
        <div className="max-w-md mx-auto space-y-3 bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <Label>Threshold</Label>
            <span className="text-sm text-muted-foreground">{threshold}</span>
          </div>
          <Slider
            value={[threshold]}
            onValueChange={([val]) => setThreshold(val)}
            min={0}
            max={255}
            step={1}
          />
          <p className="text-xs text-muted-foreground">Lower = more black, Higher = more white</p>
        </div>
      )}

      {selectedMode === "add-transparency" && (
        <div className="max-w-md mx-auto space-y-3 bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <Label>Color to Remove</Label>
            <input
              type="color"
              value={toleranceColor}
              onChange={(e) => setToleranceColor(e.target.value)}
              className="w-10 h-8 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Tolerance</Label>
            <span className="text-sm text-muted-foreground">{tolerance}</span>
          </div>
          <Slider
            value={[tolerance]}
            onValueChange={([val]) => setTolerance(val)}
            min={0}
            max={100}
            step={1}
          />
        </div>
      )}

      {selectedMode === "remove-transparency" && (
        <div className="max-w-md mx-auto space-y-3 bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <Label>Background Color</Label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-8 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Upload Area */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Image */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Image className="w-4 h-4" /> Original Image
            </h4>
            <div className="bg-muted/50 rounded-xl overflow-hidden flex items-center justify-center p-4" style={{ height: 200 }}>
              {preview && (
                <img
                  src={preview}
                  alt="Original"
                  className="max-w-full max-h-[180px] object-contain rounded-lg shadow-lg"
                />
              )}
            </div>

            {/* Image Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Width</div>
                <div className="font-semibold">{originalWidth}px</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Height</div>
                <div className="font-semibold">{originalHeight}px</div>
              </div>
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Processing... {progress}%</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {!result ? (
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  {isProcessing ? "Processing..." : "Apply Effect"}
                </Button>
              ) : (
                <Button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </Button>
              )}
              <Button variant="outline" onClick={resetTool}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Upload Another
              </Button>
            </div>
          </div>

          {/* Result Preview */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" /> Result Preview
            </h4>
            <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-center overflow-hidden" style={{ height: 200 }}>
              {result ? (
                <img
                  src={result}
                  alt="Result"
                  className="max-w-full max-h-[180px] object-contain shadow-lg rounded-lg"
                />
              ) : preview ? (
                <div className="text-center text-muted-foreground">
                  <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click "Apply Effect" to see result</p>
                </div>
              ) : null}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {result ? "Effect applied successfully" : "Preview will appear after processing"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalFormatUtility;
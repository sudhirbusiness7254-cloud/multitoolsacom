import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DragDropUpload from "./DragDropUpload";
import { Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, RotateCcwSquare, Image, RotateCcwIcon } from "lucide-react";

type TransformMode = "rotate-90" | "rotate-180" | "rotate-270" | "custom" | "flip-h" | "flip-v" | "mirror";

interface TransformOption {
  id: TransformMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const transformOptions: TransformOption[] = [
  { id: "rotate-90", label: "Rotate 90°", icon: <RotateCw className="w-5 h-5" />, description: "Clockwise" },
  { id: "rotate-180", label: "Rotate 180°", icon: <RotateCcwSquare className="w-5 h-5" />, description: "Upside Down" },
  { id: "rotate-270", label: "Rotate 270°", icon: <RotateCcw className="w-5 h-5" />, description: "Counter-clockwise" },
  { id: "custom", label: "Custom Angle", icon: <RotateCcwIcon className="w-5 h-5" />, description: "Any Degree" },
  { id: "flip-h", label: "Flip Horizontal", icon: <FlipHorizontal className="w-5 h-5" />, description: "Mirror Left-Right" },
  { id: "flip-v", label: "Flip Vertical", icon: <FlipVertical className="w-5 h-5" />, description: "Mirror Top-Bottom" },
];

interface UniversalRotateFlipProps {
  initialMode?: TransformMode;
}

const UniversalRotateFlip = ({ initialMode = "rotate-90" }: UniversalRotateFlipProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<TransformMode>(initialMode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [customAngle, setCustomAngle] = useState(45);
  
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

  const getTransformAngle = () => {
    switch (selectedMode) {
      case "rotate-90": return 90;
      case "rotate-180": return 180;
      case "rotate-270": return 270;
      case "custom": return customAngle;
      default: return 0;
    }
  };

  const handleTransform = async () => {
    if (!file || !preview) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 20, 85));
      }, 100);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      const img = new window.Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = preview;
      });

      const angle = getTransformAngle();
      const isRotation = ["rotate-90", "rotate-180", "rotate-270", "custom"].includes(selectedMode);
      
      if (isRotation) {
        const radians = (angle * Math.PI) / 180;
        const sin = Math.abs(Math.sin(radians));
        const cos = Math.abs(Math.cos(radians));
        
        // Calculate new dimensions for rotated image
        const newWidth = Math.ceil(img.width * cos + img.height * sin);
        const newHeight = Math.ceil(img.width * sin + img.height * cos);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(radians);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else if (selectedMode === "flip-h") {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.translate(img.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
      } else if (selectedMode === "flip-v") {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.translate(0, img.height);
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0);
      }

      const outputFormat = file.type || "image/png";
      const transformedDataUrl = canvas.toDataURL(outputFormat, 0.92);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(transformedDataUrl);
      
      const actionLabel = isRotation ? `Rotated ${angle}°` : selectedMode === "flip-h" ? "Flipped horizontally" : "Flipped vertically";
      toast.success(`${actionLabel} successfully!`);
    } catch (error) {
      toast.error("Transform failed. Please try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;

    const link = document.createElement("a");
    link.href = result;
    const extension = file.name.split('.').pop() || 'png';
    const suffix = selectedMode.includes("rotate") ? `rotated_${getTransformAngle()}deg` : selectedMode.replace("-", "_");
    link.download = `${file.name.split('.')[0]}_${suffix}.${extension}`;
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

  // Calculate preview transform
  const getPreviewStyle = () => {
    const angle = getTransformAngle();
    switch (selectedMode) {
      case "rotate-90":
      case "rotate-180":
      case "rotate-270":
      case "custom":
        return { transform: `rotate(${angle}deg)` };
      case "flip-h":
        return { transform: "scaleX(-1)" };
      case "flip-v":
        return { transform: "scaleY(-1)" };
      default:
        return {};
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {transformOptions.map((mode) => (
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

      {/* Custom Angle Slider */}
      {selectedMode === "custom" && (
        <div className="max-w-md mx-auto space-y-3 bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <Label>Rotation Angle</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={customAngle}
                onChange={(e) => setCustomAngle(Math.max(-180, Math.min(180, Number(e.target.value))))}
                className="w-20 h-8 text-sm text-center"
              />
              <span className="text-sm text-muted-foreground">°</span>
            </div>
          </div>
          <Slider
            value={[customAngle]}
            onValueChange={([val]) => setCustomAngle(val)}
            min={-180}
            max={180}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>-180°</span>
            <span>0°</span>
            <span>180°</span>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!file ? (
        <>
          <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
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
                  onClick={handleTransform}
                  disabled={isProcessing}
                  className="bg-primary hover:bg-primary/90"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  {isProcessing ? "Processing..." : "Apply Transform"}
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

          {/* Live Preview */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" /> Live Preview
            </h4>
            <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-center overflow-hidden" style={{ height: 200 }}>
              {result ? (
                <img
                  src={result}
                  alt="Result"
                  className="max-w-full max-h-[180px] object-contain shadow-lg rounded-lg"
                />
              ) : preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-[150px] object-contain shadow-lg rounded-lg transition-transform duration-300"
                  style={getPreviewStyle()}
                />
              ) : null}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {result ? "Transformation complete" : "Preview updates in real-time"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalRotateFlip;
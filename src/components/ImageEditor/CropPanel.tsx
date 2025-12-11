import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio, CropArea } from "./types";
import { Check, X, Square, RectangleHorizontal, Monitor, Image } from "lucide-react";

interface CropPanelProps {
  cropArea: CropArea;
  aspectRatio: AspectRatio;
  originalWidth: number;
  originalHeight: number;
  onCropChange: (crop: CropArea) => void;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  onApply: () => void;
  onCancel: () => void;
}

const aspectRatios: { id: AspectRatio; label: string; icon: React.ReactNode }[] = [
  { id: "free", label: "Free", icon: <Image className="w-4 h-4" /> },
  { id: "1:1", label: "1:1", icon: <Square className="w-4 h-4" /> },
  { id: "4:3", label: "4:3", icon: <RectangleHorizontal className="w-4 h-4" /> },
  { id: "16:9", label: "16:9", icon: <Monitor className="w-4 h-4" /> },
  { id: "3:2", label: "3:2", icon: <RectangleHorizontal className="w-4 h-4" /> },
  { id: "original", label: "Original", icon: <Image className="w-4 h-4" /> },
];

const CropPanel = ({
  cropArea,
  aspectRatio,
  originalWidth,
  originalHeight,
  onCropChange,
  onAspectRatioChange,
  onApply,
  onCancel,
}: CropPanelProps) => {
  const handleDimensionChange = (field: keyof CropArea, value: number) => {
    const newCrop = { ...cropArea, [field]: Math.max(0, value) };
    
    // Constrain to image bounds
    if (newCrop.x + newCrop.width > originalWidth) {
      newCrop.width = originalWidth - newCrop.x;
    }
    if (newCrop.y + newCrop.height > originalHeight) {
      newCrop.height = originalHeight - newCrop.y;
    }
    
    onCropChange(newCrop);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Crop Image</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel} aria-label="Cancel crop">
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
          <Button size="sm" onClick={onApply} aria-label="Apply crop">
            <Check className="w-4 h-4 mr-1" /> Apply
          </Button>
        </div>
      </div>

      {/* Aspect Ratio Presets */}
      <div className="space-y-2">
        <Label className="text-sm">Aspect Ratio</Label>
        <div className="flex flex-wrap gap-2">
          {aspectRatios.map((ratio) => (
            <Button
              key={ratio.id}
              variant={aspectRatio === ratio.id ? "default" : "outline"}
              size="sm"
              onClick={() => onAspectRatioChange(ratio.id)}
              className="flex items-center gap-1"
            >
              {ratio.icon}
              <span className="text-xs">{ratio.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Numeric Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">X Position</Label>
          <Input
            type="number"
            value={Math.round(cropArea.x)}
            onChange={(e) => handleDimensionChange("x", Number(e.target.value))}
            className="h-8"
            min={0}
            max={originalWidth - cropArea.width}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Y Position</Label>
          <Input
            type="number"
            value={Math.round(cropArea.y)}
            onChange={(e) => handleDimensionChange("y", Number(e.target.value))}
            className="h-8"
            min={0}
            max={originalHeight - cropArea.height}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Width</Label>
          <Input
            type="number"
            value={Math.round(cropArea.width)}
            onChange={(e) => handleDimensionChange("width", Number(e.target.value))}
            className="h-8"
            min={1}
            max={originalWidth - cropArea.x}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Height</Label>
          <Input
            type="number"
            value={Math.round(cropArea.height)}
            onChange={(e) => handleDimensionChange("height", Number(e.target.value))}
            className="h-8"
            min={1}
            max={originalHeight - cropArea.y}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Drag the corners on the image to adjust the crop area
      </p>
    </div>
  );
};

export default CropPanel;

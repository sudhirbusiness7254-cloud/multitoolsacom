import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Contrast, Palette, X } from "lucide-react";

interface AdjustmentPanelProps {
  brightness: number;
  contrast: number;
  saturation: number;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
  onClose: () => void;
}

const AdjustmentPanel = ({
  brightness,
  contrast,
  saturation,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
  onClose,
}: AdjustmentPanelProps) => {
  const adjustments = [
    {
      icon: Sun,
      label: "Brightness",
      value: brightness,
      onChange: onBrightnessChange,
      min: -100,
      max: 100,
      default: 0,
    },
    {
      icon: Contrast,
      label: "Contrast",
      value: contrast,
      onChange: onContrastChange,
      min: -100,
      max: 100,
      default: 0,
    },
    {
      icon: Palette,
      label: "Saturation",
      value: saturation,
      onChange: onSaturationChange,
      min: -100,
      max: 100,
      default: 0,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Adjustments</h3>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close adjustments">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {adjustments.map((adj) => (
          <div key={adj.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-sm">
                <adj.icon className="w-4 h-4 text-muted-foreground" />
                {adj.label}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={adj.value}
                  onChange={(e) => adj.onChange(Number(e.target.value))}
                  className="w-16 h-7 text-xs text-center"
                  min={adj.min}
                  max={adj.max}
                  aria-label={`${adj.label} value`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => adj.onChange(adj.default)}
                >
                  Reset
                </Button>
              </div>
            </div>
            <Slider
              value={[adj.value]}
              onValueChange={([val]) => adj.onChange(val)}
              min={adj.min}
              max={adj.max}
              step={1}
              className="w-full"
              aria-label={adj.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdjustmentPanel;

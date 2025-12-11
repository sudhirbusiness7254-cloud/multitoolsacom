import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ExportOptions } from "./types";
import { Download, FileImage } from "lucide-react";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: ExportOptions;
  onOptionsChange: (options: ExportOptions) => void;
  onExport: () => void;
}

const formats: { id: ExportOptions["format"]; label: string; lossy: boolean }[] = [
  { id: "jpeg", label: "JPEG", lossy: true },
  { id: "png", label: "PNG", lossy: false },
  { id: "webp", label: "WebP", lossy: true },
];

const ExportDialog = ({
  open,
  onOpenChange,
  options,
  onOptionsChange,
  onExport,
}: ExportDialogProps) => {
  const selectedFormat = formats.find((f) => f.id === options.format);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileImage className="w-5 h-5" />
            Export Image
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Format</Label>
            <div className="flex gap-2">
              {formats.map((format) => (
                <Button
                  key={format.id}
                  variant={options.format === format.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onOptionsChange({ ...options, format: format.id })}
                  className="flex-1"
                >
                  {format.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Quality Slider (for lossy formats) */}
          {selectedFormat?.lossy && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Quality</Label>
                <span className="text-sm text-muted-foreground">{options.quality}%</span>
              </div>
              <Slider
                value={[options.quality]}
                onValueChange={([val]) => onOptionsChange({ ...options, quality: val })}
                min={1}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Higher quality = larger file size
              </p>
            </div>
          )}

          {/* Metadata Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Preserve Metadata</Label>
              <p className="text-xs text-muted-foreground">
                Keep EXIF data in the exported image
              </p>
            </div>
            <Switch
              checked={options.preserveMetadata}
              onCheckedChange={(checked) =>
                onOptionsChange({ ...options, preserveMetadata: checked })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;

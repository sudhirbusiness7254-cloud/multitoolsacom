import { useState, useCallback } from "react";
import { Download, Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import DragDropUpload from "@/components/DragDropUpload";
import { toast } from "sonner";

interface ImageCompressorProps {
  format: "jpeg" | "png" | "webp" | "gif" | "tiff";
}

const ImageCompressor = ({ format }: ImageCompressorProps) => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getMimeType = () => {
    const mimeTypes: Record<string, string> = {
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
      tiff: "image/tiff"
    };
    return mimeTypes[format] || "image/jpeg";
  };

  const compressImage = useCallback(async (file: File, qualityValue: number) => {
    setIsProcessing(true);
    
    try {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Could not get canvas context");

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const mimeType = getMimeType();
      const qualityDecimal = qualityValue / 100;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to compress image"));
          },
          mimeType,
          qualityDecimal
        );
      });

      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      setPreviewUrl(URL.createObjectURL(blob));
      
      const savings = ((file.size - blob.size) / file.size * 100).toFixed(1);
      toast.success(`Saved ${savings}% of file size!`);
    } catch (err) {
      console.error("Compression error:", err);
      toast.error("Failed to compress image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [format]);

  const handleFileSelect = useCallback((file: File) => {
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedBlob(null);
    setCompressedSize(0);
    setPreviewUrl(null);
    
    // Auto-compress with default quality
    compressImage(file, quality[0]);
  }, [quality, compressImage]);

  const handleQualityChange = useCallback((newQuality: number[]) => {
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality[0]);
    }
  }, [originalFile, compressImage]);

  const handleDownload = useCallback(() => {
    if (!compressedBlob || !originalFile) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}_compressed.${format === "jpeg" ? "jpg" : format}`;
    link.click();
    
    toast.success("Download started!");
  }, [compressedBlob, originalFile, format]);

  return (
    <div className="space-y-6">
      <DragDropUpload 
        onFileSelect={handleFileSelect}
        accept="image/*"
      />

      {originalFile && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          {/* Quality Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Compression Quality
              </label>
              <span className="text-sm text-primary font-semibold">{quality[0]}%</span>
            </div>
            <Slider
              value={quality}
              onValueChange={handleQualityChange}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Lower quality = smaller file size. Recommended: 70-85% for best balance.
            </p>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="space-y-4">
              <h3 className="font-semibold">Preview</h3>
              <div className="rounded-lg overflow-hidden bg-secondary/50 max-h-64 flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="Compressed preview" 
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            </div>
          )}

          {/* Size Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Original Size</p>
              <p className="text-lg font-bold">{formatBytes(originalSize)}</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Compressed Size</p>
              <p className="text-lg font-bold text-primary">
                {compressedSize > 0 ? formatBytes(compressedSize) : "—"}
              </p>
              {compressedSize > 0 && originalSize > 0 && (
                <p className="text-xs text-green-500 mt-1">
                  -{((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            disabled={!compressedBlob || isProcessing}
            className="w-full bg-gradient-orange hover:opacity-90 text-primary-foreground"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Compressed Image
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;

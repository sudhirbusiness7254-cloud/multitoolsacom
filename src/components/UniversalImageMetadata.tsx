import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Eye, Trash2, Copy, Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type MetadataMode = "view" | "remove" | "edit" | "copy";

interface UniversalImageMetadataProps {
  initialMode?: MetadataMode;
}

interface ExifData {
  [key: string]: string | number | undefined;
}

const metadataModes = [
  { id: "view" as MetadataMode, name: "View EXIF", icon: <Eye className="w-4 h-4" /> },
  { id: "remove" as MetadataMode, name: "Remove EXIF", icon: <Trash2 className="w-4 h-4" /> },
  { id: "edit" as MetadataMode, name: "Edit Date/Time", icon: <Edit className="w-4 h-4" /> },
  { id: "copy" as MetadataMode, name: "Copy EXIF", icon: <Copy className="w-4 h-4" /> },
];

const UniversalImageMetadata = ({ initialMode = "view" }: UniversalImageMetadataProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<MetadataMode>(initialMode);
  const [metadata, setMetadata] = useState<ExifData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    setProcessedUrl(null);
    extractMetadata(selectedFile);
  };

  const extractMetadata = async (file: File) => {
    setIsProcessing(true);
    
    // Basic metadata extraction from file properties
    const basicMetadata: ExifData = {
      "File Name": file.name,
      "File Size": `${(file.size / 1024).toFixed(2)} KB`,
      "File Type": file.type,
      "Last Modified": new Date(file.lastModified).toLocaleString(),
    };

    // Create image to get dimensions
    const img = new window.Image();
    img.onload = () => {
      basicMetadata["Width"] = `${img.width} px`;
      basicMetadata["Height"] = `${img.height} px`;
      basicMetadata["Aspect Ratio"] = `${(img.width / img.height).toFixed(2)}`;
      setMetadata(basicMetadata);
      setIsProcessing(false);
    };
    img.onerror = () => {
      setMetadata(basicMetadata);
      setIsProcessing(false);
    };
    img.src = URL.createObjectURL(file);
  };

  const removeMetadata = useCallback(async () => {
    if (!imageUrl) return;
    setIsProcessing(true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Converting to canvas and back strips all metadata
      const cleanUrl = canvas.toDataURL("image/png");
      setProcessedUrl(cleanUrl);
      setIsProcessing(false);
      toast({ title: "Metadata removed", description: "All EXIF data has been stripped from your image." });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const handleDownload = () => {
    if (!processedUrl && !imageUrl) return;
    const link = document.createElement("a");
    link.download = `clean-${file?.name || "image.png"}`;
    link.href = processedUrl || imageUrl!;
    link.click();
    toast({ title: "Download started", description: "Your image is being downloaded." });
  };

  const handleCopyMetadata = () => {
    if (!metadata) return;
    const text = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Metadata copied to clipboard." });
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setMetadata(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      {!file ? (
        <DragDropUpload onFileSelect={handleFileSelect} accept="image/*" />
      ) : (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex flex-wrap justify-center gap-2">
            {metadataModes.map((m) => (
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

          {/* Preview & Metadata Display */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="relative aspect-square bg-secondary/50 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={processedUrl || imageUrl || ""}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Metadata Panel */}
            <div className="bg-secondary/30 rounded-xl p-4 overflow-auto max-h-[400px]">
              <h3 className="font-semibold mb-3">Image Metadata</h3>
              {isProcessing ? (
                <p className="text-muted-foreground">Extracting metadata...</p>
              ) : metadata ? (
                <div className="space-y-2">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm border-b border-border pb-2">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No metadata found</p>
              )}
            </div>
          </div>

          {/* Action Buttons based on mode */}
          <div className="flex flex-wrap justify-center gap-3">
            {mode === "view" && (
              <Button onClick={handleCopyMetadata} disabled={!metadata}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Metadata
              </Button>
            )}
            {mode === "remove" && (
              <Button onClick={removeMetadata} disabled={isProcessing}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove All Metadata
              </Button>
            )}
            {mode === "edit" && (
              <Button disabled>
                <Edit className="w-4 h-4 mr-2" />
                Edit Date/Time (Coming Soon)
              </Button>
            )}
            {mode === "copy" && (
              <Button onClick={handleCopyMetadata} disabled={!metadata}>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleDownload} disabled={!processedUrl && mode === "remove"}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalImageMetadata;

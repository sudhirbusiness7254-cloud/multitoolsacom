import { useState, useCallback } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DragDropUpload from "@/components/DragDropUpload";
import { toast } from "sonner";

interface GenericImageToolProps {
  toolName: string;
  processType: "placeholder" | "resize" | "crop" | "rotate" | "filter" | "watermark" | "combine" | "metadata" | "optimize" | "draw" | "security" | "qr" | "document";
  outputFormat?: string;
}

const GenericImageTool = ({ toolName, processType, outputFormat = "png" }: GenericImageToolProps) => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const processImage = useCallback(async (file: File) => {
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

      // For now, just return the processed canvas as blob
      // Each specific tool will override this with actual functionality
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to process image"));
          },
          `image/${outputFormat}`,
          0.92
        );
      });

      setProcessedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
      toast.success(`${toolName} complete!`);
    } catch (error) {
      console.error("Processing error:", error);
      toast.error("Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  }, [toolName, outputFormat]);

  const handleFileSelect = useCallback((file: File) => {
    setOriginalFile(file);
    setProcessedBlob(null);
    setPreviewUrl(null);
    processImage(file);
  }, [processImage]);

  const handleDownload = useCallback(() => {
    if (!processedBlob || !originalFile) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(processedBlob);
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}_${toolName.toLowerCase().replace(/\s+/g, '-')}.${outputFormat}`;
    link.click();
    
    toast.success("Download started!");
  }, [processedBlob, originalFile, toolName, outputFormat]);

  return (
    <div className="space-y-6">
      <DragDropUpload 
        onFileSelect={handleFileSelect}
        accept="image/*"
      />

      {originalFile && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          {/* Preview */}
          {previewUrl && (
            <div className="space-y-4">
              <h3 className="font-semibold">Preview</h3>
              <div className="rounded-lg overflow-hidden bg-secondary/50 max-h-64 flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="Processed preview" 
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            </div>
          )}

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            disabled={!processedBlob || isProcessing}
            className="w-full bg-gradient-orange hover:opacity-90 text-primary-foreground"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Processed Image
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GenericImageTool;

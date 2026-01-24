import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdVideo, AdNative, AdPush } from "@/components/ads/AdContainer";

interface DragDropUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
}

const DragDropUpload = ({
  onFileSelect,
  accept = "image/*",
  multiple = false,
  maxSize = 50,
  className
}: DragDropUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    setError(null);
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Just call onFileSelect - let parent handle the UI
    // Don't show internal preview, parent will manage the state
    setFileName(file.name);
    onFileSelect(file);
  }, [maxSize, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const clearFile = useCallback(() => {
    setPreview(null);
    setFileName(null);
    setError(null);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-card/50",
          )}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <div>
              <p className="text-lg font-semibold mb-1">
                {isDragging ? "Drop your image here" : "Drag & Drop your image"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-secondary rounded">JPG</span>
              <span className="px-2 py-1 bg-secondary rounded">PNG</span>
              <span className="px-2 py-1 bg-secondary rounded">WEBP</span>
              <span className="px-2 py-1 bg-secondary rounded">GIF</span>
              <span className="px-2 py-1 bg-secondary rounded">BMP</span>
              <span className="px-2 py-1 bg-secondary rounded">TIFF</span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Maximum file size: {maxSize}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative bg-card rounded-2xl border border-border p-4">
          <button
            onClick={clearFile}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/20 hover:bg-destructive/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-destructive" />
          </button>
          
          <div className="flex items-center gap-4">
            {preview.startsWith("data:image") ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{fileName}</p>
              <p className="text-sm text-muted-foreground">Ready to process</p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
      
      {/* Video Ad - Below Upload Area */}
      <AdVideo className="mt-4" />
      
      {/* Native Ad - Below Video Ad */}
      <AdNative className="mt-3" />
      
      {/* Push/Notification Ad */}
      <AdPush />
    </div>
  );
};

export default DragDropUpload;

import { useState, useCallback, useRef } from "react";
import { Download, Loader2, FileImage, X, Trash2, Upload, FileArchive, ZoomIn, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import JSZip from "jszip";
import { AdVideo } from "@/components/ads/AdContainer";

type OutputFormat = 'jpg' | 'png' | 'webp' | 'gif' | 'bmp';

interface BatchFile {
  id: string;
  file: File;
  originalSize: number;
  convertedBlob: Blob | null;
  convertedSize: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  previewUrl: string;
  convertedPreviewUrl: string | null;
  sourceFormat: string;
  convertedFormat: string;
}

const formatOptions: { value: OutputFormat; label: string; mimeType: string }[] = [
  { value: 'jpg', label: 'JPEG', mimeType: 'image/jpeg' },
  { value: 'png', label: 'PNG', mimeType: 'image/png' },
  { value: 'webp', label: 'WebP', mimeType: 'image/webp' },
  { value: 'gif', label: 'GIF', mimeType: 'image/gif' },
  { value: 'bmp', label: 'BMP', mimeType: 'image/bmp' },
];

const BatchImageConverter = () => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('jpg');
  const [quality, setQuality] = useState(85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [hoveredFile, setHoveredFile] = useState<BatchFile | null>(null);
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false);
  const [zoomFile, setZoomFile] = useState<BatchFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getSourceFormat = (mimeType: string): string => {
    const formatMap: Record<string, string> = {
      "image/jpeg": "JPG",
      "image/png": "PNG",
      "image/webp": "WEBP",
      "image/gif": "GIF",
      "image/bmp": "BMP",
      "image/svg+xml": "SVG",
      "image/heic": "HEIC",
      "image/heif": "HEIF",
      "image/tiff": "TIFF",
    };
    return formatMap[mimeType] || "IMG";
  };

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const getOutputFormatFromMime = (mimeType: string): OutputFormat | null => {
    const formatMap: Record<string, OutputFormat> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/bmp": "bmp",
    };
    return formatMap[mimeType] || null;
  };

  const handleFilesSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const imageFiles = Array.from(selectedFiles).filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length === 0) {
      toast.error("No valid image files selected");
      return;
    }

    // Auto-select output format based on first uploaded image (only if no files exist yet)
    if (files.length === 0 && imageFiles.length > 0) {
      const detectedFormat = getOutputFormatFromMime(imageFiles[0].type);
      if (detectedFormat) {
        setOutputFormat(detectedFormat);
      }
    }

    const newFiles: BatchFile[] = imageFiles.map(file => ({
      id: generateId(),
      file,
      originalSize: file.size,
      convertedBlob: null,
      convertedSize: 0,
      status: 'pending' as const,
      progress: 0,
      previewUrl: URL.createObjectURL(file),
      convertedPreviewUrl: null,
      sourceFormat: getSourceFormat(file.type),
      convertedFormat: '',
    }));

    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`Added ${newFiles.length} image${newFiles.length > 1 ? 's' : ''}`);
  }, [files.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFilesSelect(e.dataTransfer.files);
  }, [handleFilesSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.previewUrl);
        if (file.convertedPreviewUrl) URL.revokeObjectURL(file.convertedPreviewUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    files.forEach(file => {
      URL.revokeObjectURL(file.previewUrl);
      if (file.convertedPreviewUrl) URL.revokeObjectURL(file.convertedPreviewUrl);
    });
    setFiles([]);
    setOverallProgress(0);
  }, [files]);

  const convertSingleImage = async (
    batchFile: BatchFile,
    targetFormat: OutputFormat
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // For JPEG, fill with white background
        const formatOption = formatOptions.find(f => f.value === targetFormat);
        if (formatOption?.mimeType === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);

        // Use quality setting for JPEG and WebP
        const qualityValue = quality / 100;
        const mimeType = formatOption?.mimeType || "image/jpeg";
        const useQuality = mimeType === "image/jpeg" || mimeType === "image/webp";

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to convert image"));
            }
          },
          mimeType,
          useQuality ? qualityValue : undefined
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = batchFile.previewUrl;
    });
  };

  const convertAllImages = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
    if (pendingFiles.length === 0) {
      toast.error("No images to convert");
      return;
    }

    setIsProcessing(true);
    setOverallProgress(0);

    let completed = 0;
    const total = pendingFiles.length;

    for (const batchFile of pendingFiles) {
      setFiles(prev => prev.map(f => 
        f.id === batchFile.id ? { ...f, status: 'processing' as const, progress: 0 } : f
      ));

      try {
        const progressInterval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === batchFile.id && f.status === 'processing' 
              ? { ...f, progress: Math.min(f.progress + 20, 80) } 
              : f
          ));
        }, 100);

        const blob = await convertSingleImage(batchFile, outputFormat);
        
        clearInterval(progressInterval);

        const convertedPreviewUrl = URL.createObjectURL(blob);

        setFiles(prev => prev.map(f => 
          f.id === batchFile.id 
            ? { 
                ...f, 
                status: 'completed' as const, 
                progress: 100,
                convertedBlob: blob,
                convertedSize: blob.size,
                convertedPreviewUrl,
                convertedFormat: outputFormat.toUpperCase(),
              } 
            : f
        ));

        completed++;
        setOverallProgress(Math.round((completed / total) * 100));
      } catch (error) {
        console.error(`Error converting ${batchFile.file.name}:`, error);
        setFiles(prev => prev.map(f => 
          f.id === batchFile.id ? { ...f, status: 'error' as const, progress: 0 } : f
        ));
        completed++;
        setOverallProgress(Math.round((completed / total) * 100));
      }
    }

    setIsProcessing(false);
    const successCount = files.filter(f => f.status === 'completed').length + 
                         pendingFiles.filter(f => files.find(pf => pf.id === f.id)?.status !== 'error').length;
    toast.success(`Converted ${successCount} image${successCount > 1 ? 's' : ''} to ${outputFormat.toUpperCase()}!`);
  }, [files, outputFormat]);

  const downloadSingle = useCallback((batchFile: BatchFile) => {
    if (!batchFile.convertedBlob) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(batchFile.convertedBlob);
    const baseName = batchFile.file.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}.${outputFormat}`;
    link.click();
  }, [outputFormat]);

  const downloadAsZip = useCallback(async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.convertedBlob);
    if (completedFiles.length === 0) {
      toast.error("No converted images to download");
      return;
    }

    setIsDownloadingZip(true);
    
    try {
      const zip = new JSZip();
      
      for (const file of completedFiles) {
        if (file.convertedBlob) {
          const baseName = file.file.name.replace(/\.[^/.]+$/, "");
          const fileName = `${baseName}.${outputFormat}`;
          zip.file(fileName, file.convertedBlob);
        }
      }

      const zipBlob = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `converted_images_${outputFormat}_${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(link.href);

      toast.success(`Downloaded ${completedFiles.length} images as ZIP`);
    } catch (error) {
      console.error("Error creating ZIP:", error);
      toast.error("Failed to create ZIP file");
    } finally {
      setIsDownloadingZip(false);
    }
  }, [files, outputFormat]);

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalConvertedSize = files.filter(f => f.status === 'completed').reduce((acc, f) => acc + f.convertedSize, 0);
  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer",
          "border-border hover:border-primary/50 hover:bg-card/50"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif,.tiff,.tif"
          multiple
          onChange={(e) => handleFilesSelect(e.target.files)}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div>
            <p className="text-lg font-semibold mb-1">
              Drag & Drop multiple images
            </p>
            <p className="text-sm text-muted-foreground">
              or click to select files (up to 20 images at once)
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-secondary rounded">JPG</span>
            <span className="px-2 py-1 bg-secondary rounded">PNG</span>
            <span className="px-2 py-1 bg-secondary rounded">WEBP</span>
            <span className="px-2 py-1 bg-secondary rounded">GIF</span>
            <span className="px-2 py-1 bg-secondary rounded">BMP</span>
            <span className="px-2 py-1 bg-secondary rounded">HEIC</span>
          </div>
        </div>
      </div>
      
      {/* Video Ad - Below Upload Area */}
      <AdVideo className="mt-4" />

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          {/* Settings Row */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Format Selection */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Convert all to:</Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Output Quality
                  </Label>
                  <span className="text-sm font-medium text-primary">{quality}%</span>
                </div>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Applies to JPEG & WebP. Lower = smaller files.
                </p>
              </div>
            </div>
          </div>

          {/* File List Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <FileImage className="w-5 h-5" />
              {files.length} Image{files.length > 1 ? 's' : ''} Selected
            </h3>
            <Button variant="ghost" size="sm" onClick={clearAllFiles} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>

          {/* File Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {files.map((file) => (
              <div 
                key={file.id} 
                className={cn(
                  "relative bg-card rounded-xl border p-3 transition-colors",
                  file.status === 'completed' ? "border-green-500/50" : 
                  file.status === 'error' ? "border-destructive/50" : 
                  file.status === 'processing' ? "border-primary/50" : "border-border"
                )}
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/20 hover:bg-destructive/30 flex items-center justify-center z-10"
                  disabled={file.status === 'processing'}
                >
                  <X className="w-3 h-3 text-destructive" />
                </button>

                {/* Preview with Hover Zoom */}
                <div 
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary/30 mb-2 group cursor-pointer"
                  onMouseEnter={() => setHoveredFile(file)}
                  onMouseLeave={() => setHoveredFile(null)}
                  onClick={() => {
                    setZoomFile(file);
                    setZoomDialogOpen(true);
                  }}
                >
                  <img 
                    src={file.convertedPreviewUrl || file.previewUrl} 
                    alt={file.file.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Format Badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs">
                    <span className="px-1.5 py-0.5 bg-secondary/90 rounded text-foreground font-medium">
                      {file.sourceFormat}
                    </span>
                    {file.status === 'completed' && file.convertedFormat && (
                      <>
                        <ArrowRight className="w-3 h-3 text-primary" />
                        <span className="px-1.5 py-0.5 bg-primary/90 rounded text-primary-foreground font-medium">
                          {file.convertedFormat}
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Zoom Indicator */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full p-2">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Hover Preview Tooltip */}
                  {hoveredFile?.id === file.id && (
                    <div className="absolute left-full top-0 ml-2 z-50 hidden lg:block pointer-events-none">
                      <div className="bg-card border border-border rounded-xl shadow-2xl p-2 w-80">
                        <img 
                          src={file.convertedPreviewUrl || file.previewUrl}
                          alt="Preview"
                          className="w-full rounded-lg"
                        />
                        <div className="mt-2 text-xs text-center">
                          <span className="text-muted-foreground">Click to view full size</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <p className="text-sm font-medium truncate mb-1">{file.file.name}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatBytes(file.originalSize)}</span>
                  {file.status === 'completed' && (
                    <span className="text-green-500 font-medium">
                      → {formatBytes(file.convertedSize)}
                    </span>
                  )}
                  {file.status === 'processing' && (
                    <span className="text-primary">Converting...</span>
                  )}
                  {file.status === 'error' && (
                    <span className="text-destructive">Error</span>
                  )}
                </div>

                {/* Progress Bar */}
                {file.status === 'processing' && (
                  <Progress value={file.progress} className="h-1 mt-2" />
                )}

                {/* Download Button */}
                {file.status === 'completed' && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2 h-8"
                    onClick={() => downloadSingle(file)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          {isProcessing && (
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-primary font-semibold">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          )}

          {/* Summary Stats */}
          {completedCount > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Original Total</p>
                <p className="text-lg font-bold">{formatBytes(totalOriginalSize)}</p>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Converted Total</p>
                <p className="text-lg font-bold text-primary">{formatBytes(totalConvertedSize)}</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
                <p className="text-xs text-muted-foreground mb-1">Converted</p>
                <p className="text-lg font-bold text-green-500">{completedCount} / {files.length}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {completedCount < files.length && (
              <Button
                onClick={convertAllImages}
                disabled={isProcessing || isDownloadingZip}
                className="w-full bg-gradient-orange hover:opacity-90 text-primary-foreground h-12 text-lg font-semibold"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Convert All to {outputFormat.toUpperCase()} ({files.filter(f => f.status === 'pending' || f.status === 'error').length})
                  </>
                )}
              </Button>
            )}
            
            {completedCount > 0 && (
              <div className="flex gap-3">
                <Button
                  onClick={downloadAsZip}
                  disabled={isDownloadingZip || isProcessing}
                  className={cn(
                    "flex-1 h-12 text-lg font-semibold",
                    completedCount === files.length && "bg-gradient-orange hover:opacity-90 text-primary-foreground"
                  )}
                  variant={completedCount < files.length ? "outline" : "default"}
                >
                  {isDownloadingZip ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating ZIP...
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-5 h-5 mr-2" />
                      Download ZIP ({completedCount})
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={zoomDialogOpen} onOpenChange={setZoomDialogOpen}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {zoomFile?.file.name || 'Image Preview'}
          </DialogTitle>
          {zoomFile && (
            <div className="relative">
              <div className="max-h-[70vh] overflow-auto bg-secondary/30">
                <img 
                  src={zoomFile.convertedPreviewUrl || zoomFile.previewUrl}
                  alt={zoomFile.file.name}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="p-4 bg-card border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{zoomFile.file.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{zoomFile.sourceFormat} • {formatBytes(zoomFile.originalSize)}</span>
                      {zoomFile.status === 'completed' && zoomFile.convertedFormat && (
                        <>
                          <ArrowRight className="w-4 h-4" />
                          <span className="text-primary font-medium">
                            {zoomFile.convertedFormat} • {formatBytes(zoomFile.convertedSize)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {zoomFile.status === 'completed' && (
                    <Button onClick={() => downloadSingle(zoomFile)} size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>

                {zoomFile.status === 'completed' && zoomFile.convertedPreviewUrl && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">Compare Original vs Converted</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Original ({zoomFile.sourceFormat})</p>
                        <div className="rounded-lg overflow-hidden bg-secondary/30 aspect-video">
                          <img 
                            src={zoomFile.previewUrl}
                            alt="Original"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-primary">Converted ({zoomFile.convertedFormat})</p>
                        <div className="rounded-lg overflow-hidden bg-secondary/30 aspect-video border-2 border-primary/30">
                          <img 
                            src={zoomFile.convertedPreviewUrl}
                            alt="Converted"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchImageConverter;

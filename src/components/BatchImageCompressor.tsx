import { useState, useCallback, useRef } from "react";
import { Download, Loader2, Settings, FileImage, CheckCircle2, Sparkles, FileType, X, Trash2, Upload, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type OutputFormat = 'auto' | 'jpeg' | 'webp' | 'png';

interface BatchFile {
  id: string;
  file: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  previewUrl: string;
  compressedPreviewUrl: string | null;
  outputMimeType: string;
}

const formatOptions: { value: OutputFormat; label: string; description: string }[] = [
  { value: 'auto', label: 'Auto (Best)', description: 'Auto-select best format' },
  { value: 'jpeg', label: 'JPEG', description: 'Best for photos' },
  { value: 'webp', label: 'WebP', description: 'Modern, great compression' },
  { value: 'png', label: 'PNG', description: 'Lossless, transparency' },
];

const BatchImageCompressor = () => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [quality, setQuality] = useState([80]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('auto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const detectFormat = (file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type.toLowerCase();
    
    if (mimeType.includes('jpeg') || mimeType.includes('jpg') || extension === 'jpg' || extension === 'jpeg') {
      return 'JPEG';
    } else if (mimeType.includes('png') || extension === 'png') {
      return 'PNG';
    } else if (mimeType.includes('webp') || extension === 'webp') {
      return 'WebP';
    } else if (mimeType.includes('gif') || extension === 'gif') {
      return 'GIF';
    } else if (mimeType.includes('bmp') || extension === 'bmp') {
      return 'BMP';
    }
    return extension.toUpperCase() || 'Unknown';
  };

  const getOutputMimeType = (selectedFormat: OutputFormat, inputFormat: string, qualityValue: number): string => {
    if (selectedFormat === 'jpeg') return 'image/jpeg';
    if (selectedFormat === 'webp') return 'image/webp';
    if (selectedFormat === 'png') return 'image/png';
    
    switch (inputFormat) {
      case 'JPEG':
        return 'image/jpeg';
      case 'WebP':
        return 'image/webp';
      default:
        return qualityValue < 90 ? 'image/webp' : 'image/jpeg';
    }
  };

  const getOutputExtension = (outputMime: string): string => {
    if (outputMime === 'image/jpeg') return 'jpg';
    if (outputMime === 'image/webp') return 'webp';
    if (outputMime === 'image/png') return 'png';
    return 'jpg';
  };

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const handleFilesSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: BatchFile[] = Array.from(selectedFiles).map(file => ({
      id: generateId(),
      file,
      originalSize: file.size,
      compressedBlob: null,
      compressedSize: 0,
      status: 'pending' as const,
      progress: 0,
      previewUrl: URL.createObjectURL(file),
      compressedPreviewUrl: null,
      outputMimeType: '',
    }));

    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`Added ${newFiles.length} image${newFiles.length > 1 ? 's' : ''}`);
  }, []);

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
        if (file.compressedPreviewUrl) URL.revokeObjectURL(file.compressedPreviewUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    files.forEach(file => {
      URL.revokeObjectURL(file.previewUrl);
      if (file.compressedPreviewUrl) URL.revokeObjectURL(file.compressedPreviewUrl);
    });
    setFiles([]);
    setOverallProgress(0);
  }, [files]);

  const compressSingleImage = async (
    batchFile: BatchFile,
    qualityValue: number,
    selectedFormat: OutputFormat
  ): Promise<{ blob: Blob; mimeType: string }> => {
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
        ctx.drawImage(img, 0, 0);

        const inputFormat = detectFormat(batchFile.file);
        const mimeType = getOutputMimeType(selectedFormat, inputFormat, qualityValue);
        const qualityDecimal = qualityValue / 100;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, mimeType });
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          mimeType,
          qualityDecimal
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = batchFile.previewUrl;
    });
  };

  const compressAllImages = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
    if (pendingFiles.length === 0) {
      toast.error("No images to compress");
      return;
    }

    setIsProcessing(true);
    setOverallProgress(0);

    let completed = 0;
    const total = pendingFiles.length;

    for (const batchFile of pendingFiles) {
      // Update status to processing
      setFiles(prev => prev.map(f => 
        f.id === batchFile.id ? { ...f, status: 'processing' as const, progress: 0 } : f
      ));

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === batchFile.id && f.status === 'processing' 
              ? { ...f, progress: Math.min(f.progress + 20, 80) } 
              : f
          ));
        }, 100);

        const { blob, mimeType } = await compressSingleImage(batchFile, quality[0], outputFormat);
        
        clearInterval(progressInterval);

        const compressedPreviewUrl = URL.createObjectURL(blob);

        setFiles(prev => prev.map(f => 
          f.id === batchFile.id 
            ? { 
                ...f, 
                status: 'completed' as const, 
                progress: 100,
                compressedBlob: blob,
                compressedSize: blob.size,
                compressedPreviewUrl,
                outputMimeType: mimeType
              } 
            : f
        ));

        completed++;
        setOverallProgress(Math.round((completed / total) * 100));
      } catch (error) {
        console.error(`Error compressing ${batchFile.file.name}:`, error);
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
    toast.success(`Compressed ${successCount} image${successCount > 1 ? 's' : ''}!`);
  }, [files, quality, outputFormat]);

  const downloadSingle = useCallback((batchFile: BatchFile) => {
    if (!batchFile.compressedBlob) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(batchFile.compressedBlob);
    const baseName = batchFile.file.name.replace(/\.[^/.]+$/, "");
    const extension = getOutputExtension(batchFile.outputMimeType);
    link.download = `${baseName}_compressed.${extension}`;
    link.click();
  }, []);

  const downloadAll = useCallback(async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.compressedBlob);
    if (completedFiles.length === 0) {
      toast.error("No compressed images to download");
      return;
    }

    // Download each file individually
    for (const file of completedFiles) {
      downloadSingle(file);
      // Small delay between downloads to prevent browser blocking
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    toast.success(`Downloaded ${completedFiles.length} image${completedFiles.length > 1 ? 's' : ''}`);
  }, [files, downloadSingle]);

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressedSize = files.filter(f => f.status === 'completed').reduce((acc, f) => acc + f.compressedSize, 0);
  const completedCount = files.filter(f => f.status === 'completed').length;
  const totalSavings = totalOriginalSize > 0 && totalCompressedSize > 0
    ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)
    : null;

  return (
    <div className="space-y-6">
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
          accept="image/*,.heic,.avif,.tiff,.tif,.bmp"
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
          </div>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          {/* Settings Row */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Output Format */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <FileType className="w-4 h-4" />
                  Output Format
                </label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                  <SelectTrigger>
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

              {/* Quality */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Quality
                  </label>
                  <span className="text-sm text-primary font-semibold">{quality[0]}%</span>
                </div>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  min={10}
                  max={100}
                  step={5}
                  disabled={outputFormat === 'png'}
                />
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

                {/* Preview */}
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-secondary/30 mb-2">
                  <img 
                    src={file.compressedPreviewUrl || file.previewUrl} 
                    alt={file.file.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* File Info */}
                <p className="text-sm font-medium truncate mb-1">{file.file.name}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatBytes(file.originalSize)}</span>
                  {file.status === 'completed' && (
                    <span className="text-green-500 font-medium">
                      → {formatBytes(file.compressedSize)} 
                      ({((file.originalSize - file.compressedSize) / file.originalSize * 100).toFixed(0)}% saved)
                    </span>
                  )}
                  {file.status === 'processing' && (
                    <span className="text-primary">Processing...</span>
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
                <p className="text-xs text-muted-foreground mb-1">Compressed Total</p>
                <p className="text-lg font-bold text-primary">{formatBytes(totalCompressedSize)}</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
                <p className="text-xs text-muted-foreground mb-1">Total Saved</p>
                <p className="text-lg font-bold text-green-500">{totalSavings}%</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {completedCount < files.length && (
              <Button
                onClick={compressAllImages}
                disabled={isProcessing}
                className="flex-1 bg-gradient-orange hover:opacity-90 text-primary-foreground h-12 text-lg font-semibold"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Compress All ({files.filter(f => f.status === 'pending' || f.status === 'error').length})
                  </>
                )}
              </Button>
            )}
            
            {completedCount > 0 && (
              <Button
                onClick={downloadAll}
                variant={completedCount < files.length ? "outline" : "default"}
                className={cn(
                  "h-12 text-lg font-semibold",
                  completedCount === files.length && "flex-1 bg-gradient-orange hover:opacity-90 text-primary-foreground"
                )}
              >
                <Package className="w-5 h-5 mr-2" />
                Download All ({completedCount})
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchImageCompressor;

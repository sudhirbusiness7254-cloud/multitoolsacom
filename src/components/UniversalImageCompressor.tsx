import { useState, useCallback } from "react";
import { Download, Loader2, Settings, FileImage, CheckCircle2, Sparkles, FileType, LayoutGrid, SplitSquareHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DragDropUpload from "@/components/DragDropUpload";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { toast } from "sonner";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import MobileNativeAd from "@/components/ads/MobileNativeAd";

type OutputFormat = 'auto' | 'jpeg' | 'webp' | 'png';

const formatOptions: { value: OutputFormat; label: string; description: string }[] = [
  { value: 'auto', label: 'Auto (Best Compression)', description: 'Automatically selects the best format' },
  { value: 'jpeg', label: 'JPEG', description: 'Best for photos, no transparency' },
  { value: 'webp', label: 'WebP', description: 'Modern format, great compression' },
  { value: 'png', label: 'PNG', description: 'Lossless, supports transparency' },
];

const UniversalImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState([80]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('auto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [detectedFormat, setDetectedFormat] = useState<string>("");
  const [outputMimeType, setOutputMimeType] = useState<string>('image/jpeg');
  const [comparisonView, setComparisonView] = useState<'slider' | 'side-by-side'>('slider');

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
    } else if (mimeType.includes('tiff') || extension === 'tiff' || extension === 'tif') {
      return 'TIFF';
    } else if (mimeType.includes('svg') || extension === 'svg') {
      return 'SVG';
    } else if (mimeType.includes('heic') || extension === 'heic') {
      return 'HEIC';
    } else if (mimeType.includes('avif') || extension === 'avif') {
      return 'AVIF';
    }
    return extension.toUpperCase() || 'Unknown';
  };

  const getOutputMimeType = (selectedFormat: OutputFormat, inputFormat: string, qualityValue: number): string => {
    // If user selected a specific format, use it
    if (selectedFormat === 'jpeg') return 'image/jpeg';
    if (selectedFormat === 'webp') return 'image/webp';
    if (selectedFormat === 'png') return 'image/png';
    
    // Auto mode: choose best format for compression
    switch (inputFormat) {
      case 'JPEG':
        return 'image/jpeg';
      case 'WebP':
        return 'image/webp';
      case 'PNG':
      case 'GIF':
      case 'BMP':
      case 'TIFF':
      case 'HEIC':
      case 'AVIF':
      default:
        // For formats that don't support quality compression, use WebP or JPEG
        return qualityValue < 90 ? 'image/webp' : 'image/jpeg';
    }
  };

  const getOutputExtension = (outputMime: string): string => {
    if (outputMime === 'image/jpeg') return 'jpg';
    if (outputMime === 'image/webp') return 'webp';
    if (outputMime === 'image/png') return 'png';
    return 'jpg';
  };

  const getFormatLabel = (mime: string): string => {
    if (mime === 'image/jpeg') return 'JPEG';
    if (mime === 'image/webp') return 'WebP';
    if (mime === 'image/png') return 'PNG';
    return 'Unknown';
  };

  const compressImage = useCallback(async (file: File, qualityValue: number, selectedFormat: OutputFormat) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 80));
      }, 100);

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

      setProgress(85);

      const inputFormat = detectFormat(file);
      const mimeType = getOutputMimeType(selectedFormat, inputFormat, qualityValue);
      const qualityDecimal = qualityValue / 100;
      
      // Store the output mime type for download
      setOutputMimeType(mimeType);

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

      clearInterval(progressInterval);
      setProgress(100);

      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      setPreviewUrl(URL.createObjectURL(blob));
      
      const savings = ((file.size - blob.size) / file.size * 100).toFixed(1);
      const outputFormatLabel = getFormatLabel(mimeType);
      const formatNote = inputFormat !== outputFormatLabel 
        ? ` (output: ${outputFormatLabel})` 
        : '';
      toast.success(`Compressed! Saved ${savings}% of file size${formatNote}`);
    } catch (error) {
      console.error("Compression error:", error);
      toast.error("Failed to compress image");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedBlob(null);
    setCompressedSize(0);
    setPreviewUrl(null);
    setProgress(0);
    
    const format = detectFormat(file);
    setDetectedFormat(format);
    setOriginalPreviewUrl(URL.createObjectURL(file));
    
    toast.info(`Detected format: ${format}. Ready to compress!`);
  }, []);

  const handleCompress = useCallback(() => {
    if (originalFile) {
      compressImage(originalFile, quality[0], outputFormat);
    }
  }, [originalFile, quality, outputFormat, compressImage]);

  const handleQualityChange = useCallback((newQuality: number[]) => {
    setQuality(newQuality);
  }, []);

  const handleFormatChange = useCallback((value: string) => {
    setOutputFormat(value as OutputFormat);
  }, []);

  const handleDownload = useCallback(() => {
    if (!compressedBlob || !originalFile) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    const extension = getOutputExtension(outputMimeType);
    link.download = `${baseName}_compressed.${extension}`;
    link.click();
    
    toast.success("Download started!");
  }, [compressedBlob, originalFile, outputMimeType]);

  const handleReset = useCallback(() => {
    setOriginalFile(null);
    setCompressedBlob(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setPreviewUrl(null);
    setOriginalPreviewUrl(null);
    setProgress(0);
    setDetectedFormat("");
  }, []);

  const savingsPercentage = originalSize > 0 && compressedSize > 0 
    ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    : null;

  return (
    <div className="space-y-8">
      {/* Main Upload Area */}
      {!originalFile ? (
        <>
          <div className="bg-card/50 backdrop-blur rounded-3xl border-2 border-dashed border-border hover:border-primary/50 transition-colors p-8 md:p-12">
            <DragDropUpload 
              onFileSelect={handleFileSelect}
              accept="image/*,.heic,.avif,.tiff,.tif,.bmp"
              maxSize={50}
            />
          </div>
          {/* Native Banner Ad - Below upload area */}
          <div className="hidden lg:block mt-4">
            <NativeBannerAd />
          </div>
          <MobileNativeAd className="mt-4" />
        </>
      ) : (
        <div className="space-y-6">
          {/* File Info Card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-orange flex items-center justify-center">
                <FileImage className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg truncate">{originalFile.name}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="px-2 py-0.5 bg-primary/20 text-primary rounded font-medium">
                    {detectedFormat}
                  </span>
                  <span>{formatBytes(originalSize)}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                Change Image
              </Button>
            </div>

            {/* Output Format Selector */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileType className="w-4 h-4" />
                Output Format
              </label>
              <Select value={outputFormat} onValueChange={handleFormatChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {outputFormat === 'png' && (
                <p className="text-xs text-amber-500 bg-amber-500/10 px-3 py-2 rounded-lg">
                  Note: PNG uses lossless compression. Quality slider has limited effect. For smaller files, try JPEG or WebP.
                </p>
              )}
            </div>

            {/* Quality Slider */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Compression Quality
                </label>
                <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-lg">
                  {quality[0]}%
                </span>
              </div>
              <Slider
                value={quality}
                onValueChange={handleQualityChange}
                min={10}
                max={100}
                step={5}
                className="w-full"
                disabled={outputFormat === 'png'}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller file</span>
                <span>Higher quality</span>
              </div>
            </div>

            {/* Compress Button */}
            {!compressedBlob && (
              <Button
                onClick={handleCompress}
                disabled={isProcessing}
                className="w-full bg-gradient-orange hover:opacity-90 text-primary-foreground h-14 text-lg font-semibold"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Compress Now
                  </>
                )}
              </Button>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mt-4 space-y-2">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-center text-muted-foreground">
                  Processing... {progress}%
                </p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {compressedBlob && (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Success Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold text-lg">Compression Complete!</span>
                </div>
                
                {/* View Mode Toggle */}
                <Tabs value={comparisonView} onValueChange={(v) => setComparisonView(v as 'slider' | 'side-by-side')} className="w-auto">
                  <TabsList className="grid grid-cols-2 h-9">
                    <TabsTrigger value="slider" className="px-3 text-xs gap-1.5">
                      <SplitSquareHorizontal className="w-3.5 h-3.5" />
                      Slider
                    </TabsTrigger>
                    <TabsTrigger value="side-by-side" className="px-3 text-xs gap-1.5">
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Side by Side
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Comparison Views */}
              {originalPreviewUrl && previewUrl && (
                <>
                  {comparisonView === 'slider' ? (
                    <div className="space-y-3">
                      <ImageComparisonSlider
                        originalSrc={originalPreviewUrl}
                        compressedSrc={previewUrl}
                        originalLabel={`Original (${formatBytes(originalSize)})`}
                        compressedLabel={`Compressed (${formatBytes(compressedSize)})`}
                        className="border border-border"
                      />
                      <p className="text-xs text-center text-muted-foreground">
                        Drag the slider to compare original and compressed image quality
                      </p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Original ({formatBytes(originalSize)})</h4>
                        <div className="rounded-xl overflow-hidden bg-secondary/30 aspect-video flex items-center justify-center border border-border">
                          <img 
                            src={originalPreviewUrl} 
                            alt="Original" 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Compressed ({formatBytes(compressedSize)})</h4>
                        <div className="rounded-xl overflow-hidden bg-secondary/30 aspect-video flex items-center justify-center border-2 border-primary/30">
                          <img 
                            src={previewUrl} 
                            alt="Compressed" 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Size Comparison */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Original Size</p>
                  <p className="text-lg font-bold">{formatBytes(originalSize)}</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Compressed Size</p>
                  <p className="text-lg font-bold text-primary">{formatBytes(compressedSize)}</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Space Saved</p>
                  <p className="text-lg font-bold text-green-500">
                    {savingsPercentage}%
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-orange hover:opacity-90 text-primary-foreground h-14 text-lg font-semibold"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Compressed Image
              </Button>

              {/* Compress Again */}
              <Button
                onClick={handleCompress}
                variant="outline"
                className="w-full"
                size="lg"
                disabled={isProcessing}
              >
                Compress Again with Different Settings
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalImageCompressor;

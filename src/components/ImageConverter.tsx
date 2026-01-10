import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, ArrowRight, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ConversionOption {
  value: string;
  label: string;
  mimeType: string;
  extension: string;
}

const formatConversions: Record<string, ConversionOption[]> = {
  "image/jpeg": [
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
    { value: "gif", label: "GIF", mimeType: "image/gif", extension: "gif" },
    { value: "bmp", label: "BMP", mimeType: "image/bmp", extension: "bmp" },
  ],
  "image/png": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
    { value: "gif", label: "GIF", mimeType: "image/gif", extension: "gif" },
    { value: "bmp", label: "BMP", mimeType: "image/bmp", extension: "bmp" },
  ],
  "image/webp": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "gif", label: "GIF", mimeType: "image/gif", extension: "gif" },
    { value: "bmp", label: "BMP", mimeType: "image/bmp", extension: "bmp" },
  ],
  "image/gif": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
    { value: "bmp", label: "BMP", mimeType: "image/bmp", extension: "bmp" },
  ],
  "image/bmp": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
    { value: "gif", label: "GIF", mimeType: "image/gif", extension: "gif" },
  ],
  "image/svg+xml": [
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
  ],
  "image/heic": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
  ],
  "image/heif": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
  ],
  "image/tiff": [
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
    { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
    { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
  ],
};

// Default conversions for unknown formats (including RAW)
const defaultConversions: ConversionOption[] = [
  { value: "jpg", label: "JPG", mimeType: "image/jpeg", extension: "jpg" },
  { value: "png", label: "PNG", mimeType: "image/png", extension: "png" },
  { value: "webp", label: "WEBP", mimeType: "image/webp", extension: "webp" },
];

interface ImageConverterProps {
  preselectedConversion?: string;
}

const ImageConverter = ({ preselectedConversion }: ImageConverterProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [availableFormats, setAvailableFormats] = useState<ConversionOption[]>([]);
  const [quality, setQuality] = useState(85);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    return formatMap[mimeType] || "IMAGE";
  };

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setUploadedImage(file);
    setConvertedBlob(null);
    setSelectedFormat("");

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Set available formats based on uploaded image type
    const formats = formatConversions[file.type] || defaultConversions;
    setAvailableFormats(formats);

    // Auto-select preselected format if available
    if (preselectedConversion) {
      const targetFormat = formats.find(f => f.value === preselectedConversion);
      if (targetFormat) {
        setSelectedFormat(preselectedConversion);
      }
    }
  }, [preselectedConversion]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const convertImage = async () => {
    if (!uploadedImage || !selectedFormat || !canvasRef.current) return;

    setIsConverting(true);
    
    try {
      const formatOption = availableFormats.find(f => f.value === selectedFormat);
      if (!formatOption) {
        throw new Error("Invalid format selected");
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imagePreview;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // For JPEG, fill with white background (no transparency support)
      if (formatOption.mimeType === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);

      // Use quality setting for JPEG and WebP
      const qualityValue = quality / 100;
      const useQuality = formatOption.mimeType === "image/jpeg" || formatOption.mimeType === "image/webp";

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert image"));
          },
          formatOption.mimeType,
          useQuality ? qualityValue : undefined
        );
      });

      setConvertedBlob(blob);
      toast.success(`Image converted to ${formatOption.label} successfully!`);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedBlob || !uploadedImage) return;

    const formatOption = availableFormats.find(f => f.value === selectedFormat);
    if (!formatOption) return;

    const fileName = uploadedImage.name.replace(/\.[^/.]+$/, "") + "." + formatOption.extension;
    const url = URL.createObjectURL(convertedBlob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Image downloaded successfully!");
  };

  const resetConverter = () => {
    setUploadedImage(null);
    setImagePreview("");
    setSelectedFormat("");
    setConvertedBlob(null);
    setAvailableFormats([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto-convert when format is selected and preselection exists
  useEffect(() => {
    if (preselectedConversion && selectedFormat && uploadedImage && !convertedBlob && !isConverting) {
      convertImage();
    }
  }, [selectedFormat, preselectedConversion]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Upload Area */}
      {!uploadedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-10 md:p-20 text-center cursor-pointer transition-all duration-300 bg-card ${
            isDragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic,.heif,.tiff,.tif,.raw,.cr2,.nef,.arw,.dng"
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-orange flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-semibold mb-2">
                Drag & Drop your image here
              </p>
              <p className="text-muted-foreground">
                or click to browse • Supports JPG, PNG, WEBP, GIF, BMP, SVG, TIFF, RAW, HEIC
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative bg-card rounded-2xl p-4 md:p-6 border border-border">
            <button
              onClick={resetConverter}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive hover:bg-destructive/80 text-destructive-foreground flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 flex justify-center">
                <div className="relative max-w-sm">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 md:max-h-80 w-auto rounded-xl shadow-lg object-contain"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary rounded-full text-xs font-medium text-primary border border-border">
                    {getSourceFormat(uploadedImage.type)}
                  </div>
                </div>
              </div>

              {selectedFormat && convertedBlob && (
                <>
                  <div className="flex items-center">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="relative max-w-sm">
                      <img
                        src={URL.createObjectURL(convertedBlob)}
                        alt="Converted"
                        className="max-h-64 md:max-h-80 w-auto rounded-xl shadow-lg object-contain"
                      />
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full text-xs font-medium text-primary-foreground">
                        {selectedFormat.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Conversion Controls */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {/* Format Selection */}
              <div>
                <Label className="block text-sm font-medium mb-2">
                  Convert to:
                </Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="w-full bg-secondary border-border">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {availableFormats.map((format) => (
                      <SelectItem 
                        key={format.value} 
                        value={format.value}
                        className="hover:bg-secondary focus:bg-secondary"
                      >
                        {getSourceFormat(uploadedImage.type)} → {format.label}
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
                  Applies to JPEG & WebP outputs.
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              {!convertedBlob ? (
                <Button
                  onClick={convertImage}
                  disabled={!selectedFormat || isConverting}
                  className="flex-1 sm:flex-none bg-gradient-orange hover:opacity-90 text-primary-foreground font-semibold"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4" />
                      Convert
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={downloadImage}
                  className="flex-1 sm:flex-none bg-brand-green hover:bg-brand-green/90 text-primary-foreground font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download {selectedFormat.toUpperCase()}
                </Button>
              )}
            </div>
          </div>

          {/* File Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">{uploadedImage.name}</span>
              {" • "}
              {(uploadedImage.size / 1024).toFixed(1)} KB
              {convertedBlob && (
                <>
                  {" → "}
                  <span className="text-primary font-medium">
                    {(convertedBlob.size / 1024).toFixed(1)} KB
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;

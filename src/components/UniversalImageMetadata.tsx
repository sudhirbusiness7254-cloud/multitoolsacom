import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import DragDropUpload from "@/components/DragDropUpload";
import { Download, RotateCcw, Eye, Trash2, Copy, MapPin, Camera, Settings } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import EXIF from "exif-js";
import { ResultAd } from "@/components/ads";

type MetadataMode = "view" | "remove" | "copy";

interface UniversalImageMetadataProps {
  initialMode?: MetadataMode;
}

interface ExifData {
  [key: string]: string | number | undefined;
}

interface MetadataSection {
  title: string;
  icon: React.ReactNode;
  data: ExifData;
}

const metadataModes = [
  { id: "view" as MetadataMode, name: "View EXIF", icon: <Eye className="w-4 h-4" /> },
  { id: "remove" as MetadataMode, name: "Remove EXIF", icon: <Trash2 className="w-4 h-4" /> },
  { id: "copy" as MetadataMode, name: "Copy EXIF", icon: <Copy className="w-4 h-4" /> },
];

const formatGPSCoordinate = (coord: number[], ref: string): string => {
  if (!coord || coord.length < 3) return "N/A";
  const degrees = coord[0];
  const minutes = coord[1];
  const seconds = coord[2];
  const decimal = degrees + minutes / 60 + seconds / 3600;
  const direction = ref === "S" || ref === "W" ? -1 : 1;
  return `${(decimal * direction).toFixed(6)}°`;
};

const formatExposureTime = (value: number): string => {
  if (!value) return "N/A";
  if (value >= 1) return `${value}s`;
  return `1/${Math.round(1 / value)}s`;
};

const formatFNumber = (value: number): string => {
  if (!value) return "N/A";
  return `f/${value.toFixed(1)}`;
};

const UniversalImageMetadata = ({ initialMode = "view" }: UniversalImageMetadataProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<MetadataMode>(initialMode);
  const [metadataSections, setMetadataSections] = useState<MetadataSection[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasExifData, setHasExifData] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    setProcessedUrl(null);
    extractMetadata(selectedFile, url);
  };

  const extractMetadata = async (file: File, url: string) => {
    setIsProcessing(true);
    setHasExifData(false);
    
    // Basic file metadata
    const fileInfo: ExifData = {
      "File Name": file.name,
      "File Size": file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(2)} KB`,
      "File Type": file.type || "Unknown",
      "Last Modified": new Date(file.lastModified).toLocaleString(),
    };

    // Create image to get dimensions and EXIF
    const img = new window.Image();
    img.onload = function() {
      fileInfo["Width"] = `${img.width} px`;
      fileInfo["Height"] = `${img.height} px`;
      fileInfo["Aspect Ratio"] = `${(img.width / img.height).toFixed(2)}`;
      fileInfo["Megapixels"] = `${((img.width * img.height) / 1000000).toFixed(2)} MP`;

      // Extract EXIF data
      EXIF.getData(img as any, function(this: any) {
        const allExif = EXIF.getAllTags(this);
        
        const sections: MetadataSection[] = [
          {
            title: "File Information",
            icon: <Settings className="w-4 h-4" />,
            data: fileInfo
          }
        ];

        // Camera & Device Info
        const cameraInfo: ExifData = {};
        if (allExif.Make) cameraInfo["Camera Make"] = allExif.Make;
        if (allExif.Model) cameraInfo["Camera Model"] = allExif.Model;
        if (allExif.Software) cameraInfo["Software"] = allExif.Software;
        if (allExif.LensMake) cameraInfo["Lens Make"] = allExif.LensMake;
        if (allExif.LensModel) cameraInfo["Lens Model"] = allExif.LensModel;
        
        if (Object.keys(cameraInfo).length > 0) {
          sections.push({
            title: "Camera & Device",
            icon: <Camera className="w-4 h-4" />,
            data: cameraInfo
          });
          setHasExifData(true);
        }

        // Exposure Settings
        const exposureInfo: ExifData = {};
        if (allExif.ExposureTime) exposureInfo["Shutter Speed"] = formatExposureTime(allExif.ExposureTime);
        if (allExif.FNumber) exposureInfo["Aperture"] = formatFNumber(allExif.FNumber);
        if (allExif.ISOSpeedRatings) exposureInfo["ISO"] = allExif.ISOSpeedRatings;
        if (allExif.FocalLength) exposureInfo["Focal Length"] = `${allExif.FocalLength}mm`;
        if (allExif.FocalLengthIn35mmFilm) exposureInfo["35mm Equivalent"] = `${allExif.FocalLengthIn35mmFilm}mm`;
        if (allExif.ExposureProgram) {
          const programs = ["Not defined", "Manual", "Normal program", "Aperture priority", "Shutter priority", "Creative", "Action", "Portrait", "Landscape"];
          exposureInfo["Exposure Program"] = programs[allExif.ExposureProgram] || "Unknown";
        }
        if (allExif.ExposureBias !== undefined) exposureInfo["Exposure Bias"] = `${allExif.ExposureBias} EV`;
        if (allExif.MeteringMode) {
          const modes = ["Unknown", "Average", "Center-weighted", "Spot", "Multi-spot", "Pattern", "Partial"];
          exposureInfo["Metering Mode"] = modes[allExif.MeteringMode] || "Unknown";
        }
        if (allExif.Flash !== undefined) {
          exposureInfo["Flash"] = allExif.Flash & 1 ? "Fired" : "Did not fire";
        }
        if (allExif.WhiteBalance !== undefined) {
          exposureInfo["White Balance"] = allExif.WhiteBalance === 0 ? "Auto" : "Manual";
        }
        
        if (Object.keys(exposureInfo).length > 0) {
          sections.push({
            title: "Exposure Settings",
            icon: <Settings className="w-4 h-4" />,
            data: exposureInfo
          });
          setHasExifData(true);
        }

        // Date & Time
        const dateInfo: ExifData = {};
        if (allExif.DateTimeOriginal) dateInfo["Date Taken"] = allExif.DateTimeOriginal;
        if (allExif.DateTimeDigitized) dateInfo["Date Digitized"] = allExif.DateTimeDigitized;
        if (allExif.DateTime) dateInfo["Date Modified"] = allExif.DateTime;
        
        if (Object.keys(dateInfo).length > 0) {
          sections.push({
            title: "Date & Time",
            icon: <Eye className="w-4 h-4" />,
            data: dateInfo
          });
          setHasExifData(true);
        }

        // GPS Location
        const gpsInfo: ExifData = {};
        if (allExif.GPSLatitude && allExif.GPSLatitudeRef) {
          gpsInfo["Latitude"] = formatGPSCoordinate(allExif.GPSLatitude, allExif.GPSLatitudeRef);
        }
        if (allExif.GPSLongitude && allExif.GPSLongitudeRef) {
          gpsInfo["Longitude"] = formatGPSCoordinate(allExif.GPSLongitude, allExif.GPSLongitudeRef);
        }
        if (allExif.GPSAltitude) {
          gpsInfo["Altitude"] = `${allExif.GPSAltitude.toFixed(2)}m`;
        }
        
        if (Object.keys(gpsInfo).length > 0) {
          sections.push({
            title: "GPS Location",
            icon: <MapPin className="w-4 h-4" />,
            data: gpsInfo
          });
          setHasExifData(true);
        }

        // Image Details
        const imageDetails: ExifData = {};
        if (allExif.ColorSpace) imageDetails["Color Space"] = allExif.ColorSpace === 1 ? "sRGB" : "Adobe RGB";
        if (allExif.PixelXDimension) imageDetails["Original Width"] = `${allExif.PixelXDimension} px`;
        if (allExif.PixelYDimension) imageDetails["Original Height"] = `${allExif.PixelYDimension} px`;
        if (allExif.Orientation) {
          const orientations = ["Unknown", "Normal", "Flipped horizontal", "Rotated 180°", "Flipped vertical", "Rotated 90° CCW, flipped", "Rotated 90° CW", "Rotated 90° CW, flipped", "Rotated 90° CCW"];
          imageDetails["Orientation"] = orientations[allExif.Orientation] || "Unknown";
        }
        if (allExif.XResolution) imageDetails["X Resolution"] = `${allExif.XResolution} DPI`;
        if (allExif.YResolution) imageDetails["Y Resolution"] = `${allExif.YResolution} DPI`;
        
        if (Object.keys(imageDetails).length > 0) {
          sections.push({
            title: "Image Details",
            icon: <Eye className="w-4 h-4" />,
            data: imageDetails
          });
        }

        setMetadataSections(sections);
        setIsProcessing(false);
      });
    };
    
    img.onerror = () => {
      setMetadataSections([{
        title: "File Information",
        icon: <Settings className="w-4 h-4" />,
        data: fileInfo
      }]);
      setIsProcessing(false);
    };
    
    img.src = url;
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
    if (metadataSections.length === 0) return;
    const text = metadataSections
      .map(section => {
        const entries = Object.entries(section.data)
          .map(([key, value]) => `  ${key}: ${value}`)
          .join("\n");
        return `${section.title}\n${entries}`;
      })
      .join("\n\n");
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Metadata copied to clipboard." });
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setMetadataSections([]);
    setHasExifData(false);
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

          {/* EXIF Status Banner */}
          {!isProcessing && (
            <div className={`text-center p-3 rounded-lg ${hasExifData ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
              {hasExifData 
                ? "✓ EXIF data found - Camera settings, GPS, and more available below"
                : "⚠ No detailed EXIF data found - Only basic file information available"
              }
            </div>
          )}

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
            <div className="bg-secondary/30 rounded-xl p-4 overflow-auto max-h-[500px] space-y-4">
              <h3 className="font-semibold text-lg">Image Metadata</h3>
              {isProcessing ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                  Extracting EXIF data...
                </div>
              ) : metadataSections.length > 0 ? (
                <div className="space-y-4">
                  {metadataSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <div className="flex items-center gap-2 text-primary font-medium border-b border-border pb-1">
                        {section.icon}
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {Object.entries(section.data).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm py-1 border-b border-border/50">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-medium text-right max-w-[60%] break-words">{String(value)}</span>
                          </div>
                        ))}
                      </div>
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
              <Button onClick={handleCopyMetadata} disabled={metadataSections.length === 0}>
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
            {mode === "copy" && (
              <Button onClick={handleCopyMetadata} disabled={metadataSections.length === 0}>
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

          {/* Ad Below Result */}
          <ResultAd show={!!processedUrl || metadataSections.length > 0} />
        </div>
      )}
    </div>
  );
};

export default UniversalImageMetadata;
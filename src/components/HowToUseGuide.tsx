import { 
  Upload, MousePointerClick, Settings, Download, CheckCircle, 
  AlertTriangle, Info, Lightbulb, FileType, HardDrive, Shield,
  ArrowRight, Monitor, Image, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import generic step screenshots (fallback)
import stepUploadImg from "@/assets/guides/step-upload.png";
import stepPreviewImg from "@/assets/guides/step-preview.png";
import stepFormatSelectImg from "@/assets/guides/step-format-select.png";
import stepConvertImg from "@/assets/guides/step-convert.png";
import stepDownloadImg from "@/assets/guides/step-download.png";
import stepCompressImg from "@/assets/guides/step-compress.png";
import stepResizeImg from "@/assets/guides/step-resize.png";
import stepPdfImg from "@/assets/guides/step-pdf.png";
import stepCropImg from "@/assets/guides/step-crop.png";
import stepWatermarkImg from "@/assets/guides/step-watermark.png";
import stepRotateImg from "@/assets/guides/step-rotate.png";

// 4K versions
import stepUpload4kImg from "@/assets/guides/step-upload-4k.png";
import stepPreview4kImg from "@/assets/guides/step-preview-4k.png";
import stepDownload4kImg from "@/assets/guides/step-download-4k.png";
import stepCrop4kImg from "@/assets/guides/step-crop-4k.png";
import stepWatermark4kImg from "@/assets/guides/step-watermark-4k.png";
import stepRotate4kImg from "@/assets/guides/step-rotate-4k.png";

// NEW: Tool-category specific step screenshots
import stepUploadPdf from "@/assets/guides/step-upload-pdf.jpg";
import stepPreviewPdf from "@/assets/guides/step-preview-pdf.jpg";
import stepSettingsPdf from "@/assets/guides/step-settings-pdf.jpg";
import stepDownloadPdf from "@/assets/guides/step-download-pdf.jpg";
import stepUploadCompress from "@/assets/guides/step-upload-compress.jpg";
import stepQualityCompress from "@/assets/guides/step-quality-compress.jpg";
import stepResultCompress from "@/assets/guides/step-result-compress.jpg";
import stepUploadResize from "@/assets/guides/step-upload-resize.jpg";
import stepDimensionsResize from "@/assets/guides/step-dimensions-resize.jpg";
import stepResultResize from "@/assets/guides/step-result-resize.jpg";
import stepUploadCrop from "@/assets/guides/step-upload-crop.jpg";
import stepSelectCrop from "@/assets/guides/step-select-crop.jpg";
import stepResultCrop from "@/assets/guides/step-result-crop.jpg";
import stepUploadConvert from "@/assets/guides/step-upload-convert.jpg";
import stepFormatConvert from "@/assets/guides/step-format-convert.jpg";
import stepResultConvert from "@/assets/guides/step-result-convert.jpg";
import stepUploadWatermark from "@/assets/guides/step-upload-watermark.jpg";
import stepTextWatermark from "@/assets/guides/step-text-watermark.jpg";
import stepResultWatermark from "@/assets/guides/step-result-watermark.jpg";
import stepUploadRotate from "@/assets/guides/step-upload-rotate.jpg";
import stepControlsRotate from "@/assets/guides/step-controls-rotate.jpg";
import stepResultRotate from "@/assets/guides/step-result-rotate.jpg";
import stepUploadFilter from "@/assets/guides/step-upload-filter.jpg";
import stepSelectFilter from "@/assets/guides/step-select-filter.jpg";
import stepResultFilter from "@/assets/guides/step-result-filter.jpg";
import stepUploadMetadata from "@/assets/guides/step-upload-metadata.jpg";
import stepViewMetadata from "@/assets/guides/step-view-metadata.jpg";
import stepUploadSecurity from "@/assets/guides/step-upload-security.jpg";
import stepSelectSecurity from "@/assets/guides/step-select-security.jpg";
import stepGenerateQr from "@/assets/guides/step-generate-qr.jpg";

// Import unique tool-specific screenshots
import toolConvertImg from "@/assets/guides/tool-convert-jpg-png.jpg";
import toolCompressImg from "@/assets/guides/tool-compress.jpg";
import toolResizeImg from "@/assets/guides/tool-resize.jpg";
import toolCropImg from "@/assets/guides/tool-crop.jpg";
import toolRotateImg from "@/assets/guides/tool-rotate.jpg";
import toolWatermarkImg from "@/assets/guides/tool-watermark.jpg";
import toolFiltersImg from "@/assets/guides/tool-filters.jpg";
import toolMetadataImg from "@/assets/guides/tool-metadata.jpg";
import toolPdfImg from "@/assets/guides/tool-pdf.jpg";
import toolQrImg from "@/assets/guides/tool-qr.jpg";
import toolDocumentImg from "@/assets/guides/tool-document.jpg";
import toolCombineImg from "@/assets/guides/tool-combine.jpg";
import toolSecurityImg from "@/assets/guides/tool-security.jpg";
import toolDrawingImg from "@/assets/guides/tool-drawing.jpg";
import toolOptimizeImg from "@/assets/guides/tool-optimize.jpg";
import toolCircleCropImg from "@/assets/guides/tool-circle-crop.jpg";
import toolBase64Img from "@/assets/guides/tool-base64.jpg";
import toolWebpConvertImg from "@/assets/guides/tool-webp-convert.jpg";
import toolHeicConvertImg from "@/assets/guides/tool-heic-convert.jpg";
import toolGifCompressImg from "@/assets/guides/tool-gif-compress.jpg";
// New tool-specific screenshots
import toolTiffCompressImg from "@/assets/guides/tool-tiff-compress.jpg";
import toolPngCompressImg from "@/assets/guides/tool-png-compress.jpg";
import toolWebpCompressImg from "@/assets/guides/tool-webp-compress.jpg";
import toolSvgConvertImg from "@/assets/guides/tool-svg-convert.jpg";
import toolBmpConvertImg from "@/assets/guides/tool-bmp-convert.jpg";
import toolTiffConvertImg from "@/assets/guides/tool-tiff-convert.jpg";
import toolRawConvertImg from "@/assets/guides/tool-raw-convert.jpg";
import toolSquareCropImg from "@/assets/guides/tool-square-crop.jpg";
import toolAspectCropImg from "@/assets/guides/tool-aspect-crop.jpg";
import toolFlipHorizontalImg from "@/assets/guides/tool-flip-horizontal.jpg";
import toolFlipVerticalImg from "@/assets/guides/tool-flip-vertical.jpg";
import toolCustomRotateImg from "@/assets/guides/tool-custom-rotate.jpg";
import toolRotate180Img from "@/assets/guides/tool-rotate-180.jpg";
import toolSepiaFilterImg from "@/assets/guides/tool-sepia-filter.jpg";
import toolBrightnessImg from "@/assets/guides/tool-brightness.jpg";
import toolContrastImg from "@/assets/guides/tool-contrast.jpg";
import toolSaturationImg from "@/assets/guides/tool-saturation.jpg";
import toolVintageImg from "@/assets/guides/tool-vintage.jpg";
import toolBwConvertImg from "@/assets/guides/tool-bw-convert.jpg";
import toolLogoWatermarkImg from "@/assets/guides/tool-logo-watermark.jpg";
import toolCollageImg from "@/assets/guides/tool-collage.jpg";
import toolMergePdfImg from "@/assets/guides/tool-merge-pdf.jpg";
import toolSplitPdfImg from "@/assets/guides/tool-split-pdf.jpg";
import toolCompressPdfImg from "@/assets/guides/tool-compress-pdf.jpg";
import toolExactResizeImg from "@/assets/guides/tool-exact-resize.jpg";
import toolPercentResizeImg from "@/assets/guides/tool-percent-resize.jpg";
import toolFitWidthImg from "@/assets/guides/tool-fit-width.jpg";

// Tool-specific screenshot mapping (unique per tool category)
const toolSpecificImages: Record<string, string> = {
  // Conversion tools
  "jpg-to-png": toolConvertImg,
  "png-to-jpg": toolConvertImg,
  "jpg-to-webp": toolConvertImg,
  "webp-to-jpg": toolWebpConvertImg,
  "png-to-webp": toolWebpConvertImg,
  "webp-to-png": toolWebpConvertImg,
  "heic-to-jpg": toolHeicConvertImg,
  "heic-to-png": toolHeicConvertImg,
  "svg-to-png": toolSvgConvertImg,
  "svg-to-jpg": toolSvgConvertImg,
  "bmp-to-jpg": toolBmpConvertImg,
  "bmp-to-png": toolBmpConvertImg,
  "tiff-to-jpg": toolTiffConvertImg,
  "tiff-to-png": toolTiffConvertImg,
  "raw-to-jpg": toolRawConvertImg,
  "raw-to-png": toolRawConvertImg,
  "gif-to-png": toolConvertImg,
  "gif-to-jpg": toolConvertImg,
  "image-converter": toolConvertImg,
  
  // Compression tools
  "jpeg-compressor": toolCompressImg,
  "png-compressor": toolPngCompressImg,
  "webp-compressor": toolWebpCompressImg,
  "gif-compressor": toolGifCompressImg,
  "tiff-compressor": toolTiffCompressImg,
  "image-compression": toolCompressImg,
  
  // Resize tools
  "exact-resize": toolExactResizeImg,
  "percentage-resize": toolPercentResizeImg,
  "fit-to-width": toolFitWidthImg,
  "fit-to-height": toolFitWidthImg,
  "fit-to-box": toolResizeImg,
  "resize-without-quality-loss": toolResizeImg,
  "image-resize": toolResizeImg,
  
  // Crop tools
  "manual-crop": toolCropImg,
  "aspect-ratio-crop": toolAspectCropImg,
  "circle-crop": toolCircleCropImg,
  "square-crop": toolSquareCropImg,
  "free-selection-crop": toolCropImg,
  "image-crop": toolCropImg,
  
  // Rotate/Flip tools
  "rotate-90": toolRotateImg,
  "rotate-180": toolRotate180Img,
  "rotate-270": toolRotateImg,
  "custom-rotate": toolCustomRotateImg,
  "flip-horizontal": toolFlipHorizontalImg,
  "flip-vertical": toolFlipVerticalImg,
  "mirror-effect": toolFlipHorizontalImg,
  "image-rotate-flip": toolRotateImg,
  
  // Watermark tools
  "text-watermark": toolWatermarkImg,
  "image-watermark": toolLogoWatermarkImg,
  "font-change": toolWatermarkImg,
  "color-change": toolWatermarkImg,
  "opacity-settings": toolWatermarkImg,
  "position-settings": toolWatermarkImg,
  "watermark-tools": toolWatermarkImg,
  
  // Filter tools
  "brightness-adjust": toolBrightnessImg,
  "contrast-adjust": toolContrastImg,
  "saturation-adjust": toolSaturationImg,
  "sharpen-filter": toolFiltersImg,
  "blur-filter": toolFiltersImg,
  "gaussian-blur": toolFiltersImg,
  "emboss-filter": toolFiltersImg,
  "smooth-filter": toolFiltersImg,
  "pixelate-effect": toolFiltersImg,
  "sepia-effect": toolSepiaFilterImg,
  "negative-image": toolFiltersImg,
  "vintage-filter": toolVintageImg,
  "warm-tone": toolFiltersImg,
  "cool-tone": toolFiltersImg,
  "photo-filters": toolFiltersImg,
  
  // Format utilities
  "grayscale-conversion": toolBwConvertImg,
  "black-white-conversion": toolBwConvertImg,
  "add-transparency": toolFiltersImg,
  "remove-transparency": toolFiltersImg,
  "flatten-image": toolFiltersImg,
  "merge-images": toolCombineImg,
  "format-utilities": toolFiltersImg,
  
  // Metadata tools
  "view-exif": toolMetadataImg,
  "remove-exif": toolMetadataImg,
  "edit-exif-datetime": toolMetadataImg,
  "copy-exif": toolMetadataImg,
  "image-metadata": toolMetadataImg,
  
  // PDF tools
  "merge-pdf": toolMergePdfImg,
  "compress-pdf": toolCompressPdfImg,
  "split-pdf": toolSplitPdfImg,
  "batch-compress-pdf": toolCompressPdfImg,
  "word-to-pdf": toolPdfImg,
  "image-to-pdf": toolPdfImg,
  "pdf-tools": toolPdfImg,
  
  // QR tools
  "image-to-qr-code": toolQrImg,
  "qr-code-to-image": toolQrImg,
  "image-qr": toolQrImg,
  
  // Document conversion
  "image-to-docx": toolDocumentImg,
  "image-to-pptx": toolDocumentImg,
  "image-to-html": toolDocumentImg,
  "image-to-base64": toolBase64Img,
  "base64-to-image": toolBase64Img,
  "image-to-document": toolDocumentImg,
  
  // Combine tools
  "merge-horizontally": toolCombineImg,
  "merge-vertically": toolCombineImg,
  "collage-maker": toolCollageImg,
  "stitch-images": toolCombineImg,
  "before-after-maker": toolCombineImg,
  "image-combine": toolCombineImg,
  
  // Security tools
  "manual-face-blur": toolSecurityImg,
  "manual-pixel-blur": toolSecurityImg,
  "hide-area": toolSecurityImg,
  "image-encrypt": toolSecurityImg,
  "image-decrypt": toolSecurityImg,
  "image-security": toolSecurityImg,
  
  // Drawing tools
  "paint-tool": toolDrawingImg,
  "draw-shapes": toolDrawingImg,
  "signature-pad": toolDrawingImg,
  "add-stickers": toolDrawingImg,
  "add-emojis": toolDrawingImg,
  "image-drawing": toolDrawingImg,
  
  // Optimization tools
  "reduce-file-size": toolOptimizeImg,
  "reduce-resolution": toolOptimizeImg,
  "optimize-for-web": toolOptimizeImg,
  "auto-orient-image": toolOptimizeImg,
  "image-optimization": toolOptimizeImg,
};

// Map step types to their images (generic fallback)
const stepImages: Record<string, string> = {
  "upload": stepUpload4kImg,
  "preview": stepPreview4kImg,
  "format": stepFormatSelectImg,
  "convert": stepConvertImg,
  "download": stepDownload4kImg,
  "compress": stepCompressImg,
  "resize": stepResizeImg,
  "pdf": stepPdfImg,
  "crop": stepCrop4kImg,
  "watermark": stepWatermark4kImg,
  "rotate": stepRotate4kImg,
};

// Category-specific step images for more visual uniqueness
const categoryStepImages: Record<string, Record<string, string>> = {
  // PDF tools
  "pdf": {
    "upload": stepUploadPdf,
    "preview": stepPreviewPdf,
    "settings": stepSettingsPdf,
    "download": stepDownloadPdf,
  },
  "merge-pdf": {
    "upload": stepUploadPdf,
    "preview": stepPreviewPdf,
    "settings": stepSettingsPdf,
    "download": stepDownloadPdf,
  },
  "compress-pdf": {
    "upload": stepUploadPdf,
    "preview": stepPreviewPdf,
    "compress": stepSettingsPdf,
    "download": stepDownloadPdf,
  },
  "split-pdf": {
    "upload": stepUploadPdf,
    "preview": stepPreviewPdf,
    "settings": stepSettingsPdf,
    "download": stepDownloadPdf,
  },
  "image-to-pdf": {
    "upload": stepUploadPdf,
    "preview": stepPreviewPdf,
    "settings": stepSettingsPdf,
    "download": stepDownloadPdf,
  },
  // Compression tools
  "image-compression": {
    "upload": stepUploadCompress,
    "preview": stepQualityCompress,
    "compress": stepQualityCompress,
    "download": stepResultCompress,
  },
  "jpeg-compressor": {
    "upload": stepUploadCompress,
    "preview": stepQualityCompress,
    "compress": stepQualityCompress,
    "download": stepResultCompress,
  },
  "png-compressor": {
    "upload": stepUploadCompress,
    "preview": stepQualityCompress,
    "compress": stepQualityCompress,
    "download": stepResultCompress,
  },
  "webp-compressor": {
    "upload": stepUploadCompress,
    "preview": stepQualityCompress,
    "compress": stepQualityCompress,
    "download": stepResultCompress,
  },
  // Resize tools
  "image-resize": {
    "upload": stepUploadResize,
    "preview": stepDimensionsResize,
    "resize": stepDimensionsResize,
    "download": stepResultResize,
  },
  "exact-resize": {
    "upload": stepUploadResize,
    "preview": stepDimensionsResize,
    "resize": stepDimensionsResize,
    "download": stepResultResize,
  },
  "percentage-resize": {
    "upload": stepUploadResize,
    "preview": stepDimensionsResize,
    "resize": stepDimensionsResize,
    "download": stepResultResize,
  },
  // Crop tools
  "image-crop": {
    "upload": stepUploadCrop,
    "preview": stepSelectCrop,
    "crop": stepSelectCrop,
    "download": stepResultCrop,
  },
  "manual-crop": {
    "upload": stepUploadCrop,
    "preview": stepSelectCrop,
    "crop": stepSelectCrop,
    "download": stepResultCrop,
  },
  "circle-crop": {
    "upload": stepUploadCrop,
    "preview": stepSelectCrop,
    "crop": stepSelectCrop,
    "download": stepResultCrop,
  },
  // Convert tools
  "image-converter": {
    "upload": stepUploadConvert,
    "format": stepFormatConvert,
    "convert": stepFormatConvert,
    "download": stepResultConvert,
  },
  "jpg-to-png": {
    "upload": stepUploadConvert,
    "format": stepFormatConvert,
    "convert": stepFormatConvert,
    "download": stepResultConvert,
  },
  "png-to-jpg": {
    "upload": stepUploadConvert,
    "format": stepFormatConvert,
    "convert": stepFormatConvert,
    "download": stepResultConvert,
  },
  // Watermark tools
  "watermark-tools": {
    "upload": stepUploadWatermark,
    "preview": stepTextWatermark,
    "watermark": stepTextWatermark,
    "download": stepResultWatermark,
  },
  "text-watermark": {
    "upload": stepUploadWatermark,
    "preview": stepTextWatermark,
    "watermark": stepTextWatermark,
    "download": stepResultWatermark,
  },
  "image-watermark": {
    "upload": stepUploadWatermark,
    "preview": stepTextWatermark,
    "watermark": stepTextWatermark,
    "download": stepResultWatermark,
  },
  // Rotate tools
  "image-rotate-flip": {
    "upload": stepUploadRotate,
    "preview": stepControlsRotate,
    "rotate": stepControlsRotate,
    "download": stepResultRotate,
  },
  "rotate-90": {
    "upload": stepUploadRotate,
    "preview": stepControlsRotate,
    "rotate": stepControlsRotate,
    "download": stepResultRotate,
  },
  "flip-horizontal": {
    "upload": stepUploadRotate,
    "preview": stepControlsRotate,
    "rotate": stepControlsRotate,
    "download": stepResultRotate,
  },
  // Filter tools
  "photo-filters": {
    "upload": stepUploadFilter,
    "preview": stepSelectFilter,
    "format": stepSelectFilter,
    "download": stepResultFilter,
  },
  "sepia-effect": {
    "upload": stepUploadFilter,
    "preview": stepSelectFilter,
    "format": stepSelectFilter,
    "download": stepResultFilter,
  },
  "vintage-filter": {
    "upload": stepUploadFilter,
    "preview": stepSelectFilter,
    "format": stepSelectFilter,
    "download": stepResultFilter,
  },
  // Metadata tools
  "image-metadata": {
    "upload": stepUploadMetadata,
    "preview": stepViewMetadata,
    "format": stepViewMetadata,
    "download": stepViewMetadata,
  },
  "view-exif": {
    "upload": stepUploadMetadata,
    "preview": stepViewMetadata,
    "format": stepViewMetadata,
    "download": stepViewMetadata,
  },
  // Security tools
  "image-security": {
    "upload": stepUploadSecurity,
    "preview": stepSelectSecurity,
    "format": stepSelectSecurity,
    "download": stepSelectSecurity,
  },
  "manual-face-blur": {
    "upload": stepUploadSecurity,
    "preview": stepSelectSecurity,
    "format": stepSelectSecurity,
    "download": stepSelectSecurity,
  },
  // QR tools
  "image-qr": {
    "upload": stepGenerateQr,
    "preview": stepGenerateQr,
    "format": stepGenerateQr,
    "download": stepGenerateQr,
  },
  "image-to-qr-code": {
    "upload": stepGenerateQr,
    "preview": stepGenerateQr,
    "format": stepGenerateQr,
    "download": stepGenerateQr,
  },
};

// Function to get step image based on tool slug and step type
const getStepImage = (slug: string, stepType: string): string | undefined => {
  // Check category-specific images first
  if (categoryStepImages[slug] && categoryStepImages[slug][stepType]) {
    return categoryStepImages[slug][stepType];
  }
  // Fall back to generic step images
  return stepImages[stepType];
};

export interface GuideStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  warning?: string;
  screenshotAlt?: string;
  screenshotType?: "upload" | "preview" | "format" | "convert" | "download" | "compress" | "resize" | "pdf" | "crop" | "watermark" | "rotate";
}

export interface ToolGuideData {
  slug: string;
  supportedFormats: string[];
  maxFileSize: string;
  processingNote: string;
  privacyBehavior: string;
  steps: GuideStep[];
  proTips: string[];
  commonMistakes?: string[];
}

interface HowToUseGuideProps {
  guideData: ToolGuideData;
  toolName: string;
  gradientFrom: string;
  gradientTo: string;
}

const getStepIcon = (stepNumber: number, totalSteps: number) => {
  if (stepNumber === 1) return Upload;
  if (stepNumber === totalSteps) return Download;
  if (stepNumber === 2) return Image;
  if (stepNumber === 3) return Settings;
  return MousePointerClick;
};

const HowToUseGuide = ({ guideData, toolName, gradientFrom, gradientTo }: HowToUseGuideProps) => {
  // Get tool-specific screenshot if available
  const toolScreenshot = toolSpecificImages[guideData.slug];
  
  return (
    <div className="space-y-8">
      {/* Header with Tool Info Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        >
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">How to Use {toolName}</h2>
      </div>

      {/* Unique Tool Screenshot - Shows how this specific tool works */}
      {toolScreenshot && (
        <div className="rounded-xl border border-border overflow-hidden shadow-lg mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 border-b border-border/50">
            <span className="text-sm font-medium text-foreground flex items-center gap-2">
              <Monitor className="w-4 h-4" style={{ color: gradientFrom }} />
              {toolName} Interface Preview
            </span>
          </div>
          <img 
            src={toolScreenshot} 
            alt={`${toolName} tool interface showing how it works`}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Quick Reference Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <FileType className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Supported Formats</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {guideData.supportedFormats.join(", ")}
          </p>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Max File Size</span>
          </div>
          <p className="text-sm text-muted-foreground">{guideData.maxFileSize}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Processing</span>
          </div>
          <p className="text-sm text-muted-foreground">{guideData.processingNote}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4" style={{ color: gradientFrom }} />
            <span className="text-sm font-medium text-foreground">Privacy</span>
          </div>
          <p className="text-sm text-muted-foreground">{guideData.privacyBehavior}</p>
        </div>
      </div>

      {/* Step-by-Step Visual Guide */}
      <div className="space-y-6">
        {guideData.steps.map((step, index) => {
          const StepIcon = getStepIcon(step.step, guideData.steps.length);
          const isLastStep = index === guideData.steps.length - 1;
          // Get category-specific step image
          const stepImage = step.screenshotType ? getStepImage(guideData.slug, step.screenshotType) : undefined;
          
          return (
            <div key={step.step} className="relative">
              {/* Connection Line */}
              {!isLastStep && (
                <div 
                  className="absolute left-5 top-16 w-0.5 h-[calc(100%-2rem)]"
                  style={{ backgroundColor: `${gradientFrom}30` }}
                />
              )}
              
              <div className="flex gap-4">
                {/* Step Number Circle */}
                <div className="relative flex-shrink-0">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                  >
                    {step.step}
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    {/* Step Header */}
                    <div className="p-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <StepIcon className="w-5 h-5" style={{ color: gradientFrom }} />
                        <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                      </div>
                    </div>
                    
                    {/* Step Description */}
                    <div className="p-4">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      {/* Screenshot Image - only show if available */}
                      {stepImage && (
                        <div className="rounded-lg border border-border overflow-hidden mb-4">
                          <img 
                            src={stepImage} 
                            alt={step.screenshotAlt || `Step ${step.step}: ${step.title}`}
                            className="w-full h-auto object-contain bg-muted/30"
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      {/* Tip */}
                      {step.tip && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-primary text-sm">Tip: </span>
                            <span className="text-sm text-muted-foreground">{step.tip}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Warning */}
                      {step.warning && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 mt-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-amber-500 text-sm">Note: </span>
                            <span className="text-sm text-muted-foreground">{step.warning}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tips Section */}
      {guideData.proTips.length > 0 && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Pro Tips for Best Results</h3>
          </div>
          <ul className="space-y-3">
            {guideData.proTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: gradientFrom }} />
                <span className="text-muted-foreground text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Mistakes to Avoid */}
      {guideData.commonMistakes && guideData.commonMistakes.length > 0 && (
        <div className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-foreground">Common Mistakes to Avoid</h3>
          </div>
          <ul className="space-y-3">
            {guideData.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">×</span>
                <span className="text-muted-foreground text-sm">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HowToUseGuide;

import { useParams, Navigate } from "react-router-dom";
import { useMemo } from "react";
import SEOToolPage from "@/components/SEOToolPage";
import { getToolSEOContent, getAllToolsFlat } from "@/data/toolsSEOData";
import ImageConverter from "@/components/ImageConverter";
import UniversalImageCompressor from "@/components/UniversalImageCompressor";
import UniversalImageResizer from "@/components/UniversalImageResizer";
import UniversalImageCropper from "@/components/UniversalImageCropper";
import UniversalRotateFlip from "@/components/UniversalRotateFlip";
import UniversalFormatUtility from "@/components/UniversalFormatUtility";
import UniversalPhotoFilters from "@/components/UniversalPhotoFilters";
import UniversalWatermark from "@/components/UniversalWatermark";
import UniversalImageCombine from "@/components/UniversalImageCombine";
import UniversalImageMetadata from "@/components/UniversalImageMetadata";
import UniversalImageOptimization from "@/components/UniversalImageOptimization";
import UniversalImageDrawing from "@/components/UniversalImageDrawing";
import UniversalImageSecurity from "@/components/UniversalImageSecurity";
import UniversalQRTools from "@/components/UniversalQRTools";
import UniversalDocumentConverter from "@/components/UniversalDocumentConverter";
import UniversalPDFTools from "@/components/UniversalPDFTools";

// Tool slug to component mapping
const getToolComponent = (slug: string) => {
  // Image Converter tools
  const converterSlugs = [
    "jpg-to-png", "png-to-jpg", "jpg-to-webp", "webp-to-jpg", "png-to-webp", "webp-to-png",
    "gif-to-png", "gif-to-jpg", "bmp-to-jpg", "bmp-to-png", "tiff-to-jpg", "tiff-to-png",
    "svg-to-png", "svg-to-jpg", "heic-to-jpg", "heic-to-png", "raw-to-jpg", "raw-to-png"
  ];
  if (converterSlugs.includes(slug)) {
    return <ImageConverter />;
  }

  // Compression tools
  if (["jpeg-compressor", "png-compressor", "webp-compressor", "gif-compressor", "tiff-compressor"].includes(slug)) {
    return <UniversalImageCompressor />;
  }

  // Resize tools
  if (["exact-resize", "percentage-resize", "fit-to-width", "fit-to-height", "fit-to-box", "resize-without-quality-loss"].includes(slug)) {
    return <UniversalImageResizer />;
  }

  // Crop tools
  if (["manual-crop", "aspect-ratio-crop", "circle-crop", "square-crop", "free-selection-crop"].includes(slug)) {
    return <UniversalImageCropper />;
  }

  // Rotate/Flip tools
  if (["rotate-90", "rotate-180", "rotate-270", "custom-rotate", "flip-horizontal", "flip-vertical", "mirror-effect"].includes(slug)) {
    return <UniversalRotateFlip />;
  }

  // Format utilities
  if (["grayscale-conversion", "black-white-conversion", "add-transparency", "remove-transparency", "flatten-image", "merge-images"].includes(slug)) {
    return <UniversalFormatUtility />;
  }

  // Photo filters
  if (["brightness-adjust", "contrast-adjust", "saturation-adjust", "sharpen-filter", "blur-filter", "gaussian-blur", "emboss-filter", "smooth-filter", "pixelate-effect", "sepia-effect", "negative-image", "vintage-filter", "warm-tone", "cool-tone"].includes(slug)) {
    return <UniversalPhotoFilters />;
  }

  // Watermark tools
  if (["text-watermark", "image-watermark", "font-change", "color-change", "opacity-settings", "position-settings"].includes(slug)) {
    return <UniversalWatermark />;
  }

  // Image combine tools
  if (["merge-horizontally", "merge-vertically", "collage-maker", "stitch-images", "before-after-maker"].includes(slug)) {
    return <UniversalImageCombine />;
  }

  // Metadata tools
  if (["view-exif", "remove-exif", "edit-exif-datetime", "copy-exif"].includes(slug)) {
    return <UniversalImageMetadata />;
  }

  // Optimization tools
  if (["reduce-file-size", "reduce-resolution", "optimize-for-web", "auto-orient-image"].includes(slug)) {
    return <UniversalImageOptimization />;
  }

  // Drawing tools
  if (["paint-tool", "draw-shapes", "signature-pad", "add-stickers", "add-emojis"].includes(slug)) {
    return <UniversalImageDrawing />;
  }

  // Security tools
  if (["manual-face-blur", "manual-pixel-blur", "hide-area", "image-encrypt", "image-decrypt"].includes(slug)) {
    return <UniversalImageSecurity />;
  }

  // QR tools
  if (["image-to-qr-code", "qr-code-to-image"].includes(slug)) {
    return <UniversalQRTools />;
  }

  // Document tools
  if (["image-to-pdf", "image-to-docx", "image-to-pptx", "image-to-html", "image-to-base64", "base64-to-image"].includes(slug)) {
    return <UniversalDocumentConverter />;
  }

  // PDF tools
  if (slug === "pdf-merge") return <UniversalPDFTools defaultMode="merge" />;
  if (slug === "pdf-compress") return <UniversalPDFTools defaultMode="compress" />;
  if (slug === "word-to-pdf") return <UniversalPDFTools defaultMode="word-to-pdf" />;
  if (slug === "pdf-split") return <UniversalPDFTools defaultMode="split" />;
  if (slug === "pdf-to-jpg") return <UniversalPDFTools defaultMode="pdf-to-jpg" />;
  if (slug === "jpg-to-pdf") return <UniversalPDFTools defaultMode="jpg-to-pdf" />;

  return null;
};

const DynamicToolPage = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();

  const allTools = useMemo(() => getAllToolsFlat(), []);
  const toolInfo = useMemo(() => 
    allTools.find(t => t.slug === toolSlug),
    [allTools, toolSlug]
  );

  if (!toolSlug || !toolInfo) {
    return <Navigate to="/404" replace />;
  }

  const seoContent = getToolSEOContent(
    toolSlug,
    toolInfo.name,
    toolInfo.category,
    toolInfo.categorySlug
  );

  const toolComponent = getToolComponent(toolSlug);

  if (!toolComponent) {
    return <Navigate to="/404" replace />;
  }

  return (
    <SEOToolPage seoContent={seoContent}>
      {toolComponent}
    </SEOToolPage>
  );
};

export default DynamicToolPage;
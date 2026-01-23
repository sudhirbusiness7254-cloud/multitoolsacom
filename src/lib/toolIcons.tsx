import { 
  Image, FileImage, ImagePlus, ImageMinus, ImageOff, 
  RefreshCw, ArrowRightLeft, Repeat, Shuffle,
  Minimize2, Maximize2, Shrink, Expand,
  FileText, FileType, File, FileCode, FileBadge, Binary,
  Crop, Square, Circle, Scissors, Frame,
  RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Move,
  Settings, Sliders, SlidersHorizontal, Palette, Paintbrush,
  Sun, Contrast, Droplet, Sparkles, Wand2, Star, Focus,
  Type, PenTool, Pencil, Brush,
  Layers, LayoutGrid, Grid3X3, Columns, Rows,
  Info, Eye, EyeOff, Calendar, Copy, Trash2,
  Zap, Globe, Gauge, Activity,
  Square as ShapeSquare, Smile, Sticker,
  Shield, Lock, Unlock, ShieldCheck, ShieldOff,
  QrCode, Scan,
  Hash, Tag,
  LucideIcon
} from "lucide-react";
import React from "react";

// Alias for compress
const Compress = Minimize2;

// Unique icon for each tool with specific colors
export const toolIconConfig: Record<string, { icon: LucideIcon; color: string }> = {
  // Image Converter
  "jpg-to-png": { icon: FileImage, color: "#3B82F6" },
  "png-to-jpg": { icon: Image, color: "#06B6D4" },
  "jpg-to-webp": { icon: ImagePlus, color: "#8B5CF6" },
  "webp-to-jpg": { icon: RefreshCw, color: "#EC4899" },
  "png-to-webp": { icon: ArrowRightLeft, color: "#10B981" },
  "webp-to-png": { icon: Repeat, color: "#F59E0B" },
  "gif-to-png": { icon: Sparkles, color: "#EF4444" },
  "gif-to-jpg": { icon: Shuffle, color: "#6366F1" },
  "bmp-to-jpg": { icon: FileType, color: "#14B8A6" },
  "bmp-to-png": { icon: FileBadge, color: "#F97316" },
  "tiff-to-jpg": { icon: File, color: "#84CC16" },
  "tiff-to-png": { icon: FileImage, color: "#A855F7" },
  "svg-to-png": { icon: FileCode, color: "#0EA5E9" },
  "svg-to-jpg": { icon: Image, color: "#22C55E" },
  "heic-to-jpg": { icon: ImagePlus, color: "#DC2626" },
  "heic-to-png": { icon: RefreshCw, color: "#7C3AED" },
  "raw-to-jpg": { icon: ArrowRightLeft, color: "#EA580C" },
  "raw-to-png": { icon: Repeat, color: "#0891B2" },

  // Image Compression
  "jpeg-compressor": { icon: Minimize2, color: "#22C55E" },
  "png-compressor": { icon: Shrink, color: "#10B981" },
  "webp-compressor": { icon: Compress, color: "#059669" },
  "gif-compressor": { icon: Minimize2, color: "#34D399" },
  "tiff-compressor": { icon: Shrink, color: "#6EE7B7" },

  // Image to Document
  "image-to-pdf": { icon: FileText, color: "#EF4444" },
  "image-to-docx": { icon: FileType, color: "#3B82F6" },
  "image-to-pptx": { icon: File, color: "#F97316" },
  "image-to-html": { icon: FileCode, color: "#8B5CF6" },
  "image-to-base64": { icon: Binary, color: "#6366F1" },
  "base64-to-image": { icon: Image, color: "#EC4899" },

  // Image Resize
  "exact-resize": { icon: Maximize2, color: "#0EA5E9" },
  "percentage-resize": { icon: Expand, color: "#38BDF8" },
  "fit-to-width": { icon: Columns, color: "#06B6D4" },
  "fit-to-height": { icon: Rows, color: "#22D3EE" },
  "fit-to-box": { icon: Square, color: "#67E8F9" },
  "resize-without-quality-loss": { icon: Sparkles, color: "#0891B2" },

  // Image Crop
  "manual-crop": { icon: Crop, color: "#A855F7" },
  "aspect-ratio-crop": { icon: Frame, color: "#C084FC" },
  "circle-crop": { icon: Circle, color: "#D946EF" },
  "square-crop": { icon: Square, color: "#E879F9" },
  "free-selection-crop": { icon: Scissors, color: "#F0ABFC" },

  // Rotate & Flip
  "rotate-90": { icon: RotateCw, color: "#F97316" },
  "rotate-180": { icon: Repeat, color: "#FB923C" },
  "rotate-270": { icon: RotateCcw, color: "#FDBA74" },
  "custom-rotate": { icon: Settings, color: "#FED7AA" },
  "flip-horizontal": { icon: FlipHorizontal, color: "#EAB308" },
  "flip-vertical": { icon: FlipVertical, color: "#FACC15" },
  "mirror-effect": { icon: Layers, color: "#FDE047" },

  // Format Utilities
  "grayscale-conversion": { icon: Contrast, color: "#64748B" },
  "black-white-conversion": { icon: Circle, color: "#475569" },
  "add-transparency": { icon: Eye, color: "#8B5CF6" },
  "remove-transparency": { icon: EyeOff, color: "#A78BFA" },
  "flatten-image": { icon: Layers, color: "#C4B5FD" },
  "merge-images": { icon: LayoutGrid, color: "#7C3AED" },

  // Photo Filters
  "brightness-adjust": { icon: Sun, color: "#FBBF24" },
  "contrast-adjust": { icon: Contrast, color: "#F59E0B" },
  "saturation-adjust": { icon: Palette, color: "#EC4899" },
  "sharpen-filter": { icon: Focus, color: "#F472B6" },
  "blur-filter": { icon: Droplet, color: "#A78BFA" },
  "gaussian-blur": { icon: Sparkles, color: "#8B5CF6" },
  "emboss-filter": { icon: Wand2, color: "#6366F1" },
  "smooth-filter": { icon: Paintbrush, color: "#818CF8" },
  "pixelate-effect": { icon: Grid3X3, color: "#A5B4FC" },
  "sepia-effect": { icon: Star, color: "#D97706" },
  "negative-image": { icon: ImageMinus, color: "#1F2937" },
  "vintage-filter": { icon: ImagePlus, color: "#92400E" },
  "warm-tone": { icon: Sun, color: "#EA580C" },
  "cool-tone": { icon: Droplet, color: "#0284C7" },

  // Watermark Tools
  "text-watermark": { icon: Type, color: "#14B8A6" },
  "image-watermark": { icon: Image, color: "#0D9488" },
  "font-change": { icon: Type, color: "#2DD4BF" },
  "color-change": { icon: Palette, color: "#5EEAD4" },
  "opacity-settings": { icon: Sliders, color: "#99F6E4" },
  "position-settings": { icon: Move, color: "#0891B2" },

  // Image Combine
  "merge-horizontally": { icon: Columns, color: "#84CC16" },
  "merge-vertically": { icon: Rows, color: "#A3E635" },
  "collage-maker": { icon: LayoutGrid, color: "#BEF264" },
  "stitch-images": { icon: Layers, color: "#22C55E" },
  "before-after-maker": { icon: ArrowRightLeft, color: "#4ADE80" },

  // Image Metadata
  "view-exif": { icon: Info, color: "#94A3B8" },
  "remove-exif": { icon: Trash2, color: "#64748B" },
  "edit-exif-datetime": { icon: Calendar, color: "#475569" },
  "copy-exif": { icon: Copy, color: "#334155" },

  // Image Optimization
  "reduce-file-size": { icon: Minimize2, color: "#EF4444" },
  "reduce-resolution": { icon: Shrink, color: "#DC2626" },
  "optimize-for-web": { icon: Globe, color: "#F87171" },
  "auto-orient-image": { icon: RotateCw, color: "#FCA5A5" },

  // Image Drawing
  "paint-tool": { icon: Paintbrush, color: "#10B981" },
  "draw-shapes": { icon: ShapeSquare, color: "#34D399" },
  "signature-pad": { icon: PenTool, color: "#6EE7B7" },
  "add-stickers": { icon: Sticker, color: "#A7F3D0" },
  "add-emojis": { icon: Smile, color: "#059669" },

  // Image Security
  "manual-face-blur": { icon: EyeOff, color: "#EF4444" },
  "manual-pixel-blur": { icon: Grid3X3, color: "#DC2626" },
  "hide-area": { icon: ShieldOff, color: "#B91C1C" },
  "image-encrypt": { icon: Lock, color: "#991B1B" },
  "image-decrypt": { icon: Unlock, color: "#7F1D1D" },

  // Image QR
  "image-to-qr-code": { icon: QrCode, color: "#3B82F6" },
  "qr-code-to-image": { icon: Scan, color: "#1D4ED8" },

  // Tag Tools
  "tag-extractor": { icon: Hash, color: "#8B5CF6" },
  
  // AI Tools
  "ai-photo-enhancer": { icon: Sparkles, color: "#10B981" },
  "ai-image-upscaler": { icon: Maximize2, color: "#3B82F6" },
  "ai-background-remover": { icon: ImageOff, color: "#EC4899" },
  "ai-image-restorer": { icon: RefreshCw, color: "#F59E0B" },
  "ai-face-swap": { icon: Layers, color: "#EC4899" },
  "ai-colorize": { icon: Palette, color: "#F59E0B" },
  "ai-object-removal": { icon: Trash2, color: "#EF4444" },
  "ai-face-beautify": { icon: Smile, color: "#EC4899" },
  "ai-image-generation": { icon: Wand2, color: "#A855F7" },
};

// Get tool icon component
export const getToolIconComponent = (toolSlug: string, size: number = 20) => {
  const config = toolIconConfig[toolSlug];
  if (config) {
    const IconComponent = config.icon;
    return <IconComponent className="text-white" style={{ width: size, height: size }} />;
  }
  return <Image className="text-white" style={{ width: size, height: size }} />;
};

// Get tool icon color
export const getToolIconColor = (toolSlug: string): string => {
  return toolIconConfig[toolSlug]?.color || "#6366F1";
};

// Get tool icon with gradient background
export const ToolIconWithBackground: React.FC<{ 
  toolSlug: string; 
  size?: number;
  iconSize?: number;
  className?: string;
}> = ({ toolSlug, size = 40, iconSize = 20, className = "" }) => {
  const color = getToolIconColor(toolSlug);
  const config = toolIconConfig[toolSlug];
  const IconComponent = config?.icon || Image;
  
  return (
    <div 
      className={`rounded-lg flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})` 
      }}
    >
      <IconComponent className="text-white" style={{ width: iconSize, height: iconSize }} />
    </div>
  );
};

// Helper to darken a hex color
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

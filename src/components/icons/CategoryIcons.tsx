import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Colorful circular icon badges for category/tool cards
// These are the blue circular icons shown in the reference image

export const CircularToolIcon: React.FC<{
  children: React.ReactNode;
  gradient?: string;
  className?: string;
  size?: number;
}> = ({ children, gradient = 'from-blue-500 to-cyan-400', className = '', size = 56 }) => (
  <div
    className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-lg ${className}`}
    style={{ width: size, height: size }}
  >
    <div className="text-white">
      {children}
    </div>
  </div>
);

// Image Converter - Blue refresh arrows
export const ConverterCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-blue-500 to-cyan-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 1L21 5L17 9" />
      <path d="M3 5H21" />
      <path d="M7 23L3 19L7 15" />
      <path d="M21 19H3" />
    </svg>
  </CircularToolIcon>
);

// Image Compressor - Green compress
export const CompressorCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-green-500 to-emerald-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4L8 8M20 4L16 8M4 20L8 16M20 20L16 16" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
    </svg>
  </CircularToolIcon>
);

// Image Crop - Purple crop
export const CropCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-purple-500 to-pink-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2V16H20" />
      <path d="M18 22V8H4" />
    </svg>
  </CircularToolIcon>
);

// Image Rotate - Orange rotate
export const RotateCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-orange-500 to-amber-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3137 3 18.1968 4.78469 19.7071 7.5" />
      <path d="M21 3V9H15" />
    </svg>
  </CircularToolIcon>
);

// Image Flip - Teal flip
export const FlipCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-teal-500 to-cyan-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3V21" strokeDasharray="2 2" />
      <path d="M8 6L4 12L8 18V6Z" fill="currentColor" />
      <path d="M16 6L20 12L16 18V6Z" fill="currentColor" />
    </svg>
  </CircularToolIcon>
);

// Image Resize - Sky blue resize
export const ResizeCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-sky-500 to-blue-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3H21V9" />
      <path d="M9 21H3V15" />
      <path d="M21 3L14 10" />
      <path d="M3 21L10 14" />
    </svg>
  </CircularToolIcon>
);

// Document Converter - Indigo document
export const DocumentCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-indigo-500 to-violet-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V7L14 2Z" />
      <path d="M14 2V7H19" />
      <path d="M9 13H15M9 17H12" />
    </svg>
  </CircularToolIcon>
);

// Format Utilities - Pink/Blue gradient
export const FormatCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-pink-500 to-blue-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" />
    </svg>
  </CircularToolIcon>
);

// Photo Filters - Rainbow sparkles
export const FiltersCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-yellow-400 via-pink-500 to-purple-500" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="currentColor">
      <path d="M12 2L13.5 8.5L20 7L15 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9 12L4 7L10.5 8.5L12 2Z" />
    </svg>
  </CircularToolIcon>
);

// Watermark - Cyan water drop
export const WatermarkCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-cyan-400 to-blue-500" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 6 10 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 2 12 2Z" />
      <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold">©</text>
    </svg>
  </CircularToolIcon>
);

// Image Combine - Lime layers
export const CombineCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-lime-500 to-green-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="8" height="8" rx="1" />
      <rect x="13" y="8" width="8" height="8" rx="1" />
      <path d="M11 12H13" />
    </svg>
  </CircularToolIcon>
);

// Metadata - Slate info
export const MetadataCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-slate-400 to-gray-500" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16V12M12 8H12.01" />
    </svg>
  </CircularToolIcon>
);

// Optimization - Yellow lightning
export const OptimizationCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-yellow-400 to-orange-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="currentColor">
      <path d="M13 2L4 14H11L10 22L19 10H12L13 2Z" />
    </svg>
  </CircularToolIcon>
);

// Drawing - Rose pen
export const DrawingCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-rose-500 to-pink-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3L21 7L7 21H3V17L17 3Z" />
    </svg>
  </CircularToolIcon>
);

// Security - Emerald shield
export const SecurityCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-emerald-500 to-green-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 6V12C3 17.5 7 21.5 12 23C17 21.5 21 17.5 21 12V6L12 2Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  </CircularToolIcon>
);

// QR Code - Violet
export const QRCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-violet-500 to-purple-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" fill="currentColor" />
      <rect x="18" y="14" width="3" height="3" fill="currentColor" />
      <rect x="14" y="18" width="3" height="3" fill="currentColor" />
      <rect x="18" y="18" width="3" height="3" fill="currentColor" />
    </svg>
  </CircularToolIcon>
);

// Tag Extractor - Blue hashtag
export const TagCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-blue-500 to-indigo-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M10 3L6 21M18 3L14 21M4 8H20M3 16H19" />
    </svg>
  </CircularToolIcon>
);

// PDF Tools - Red document
export const PDFCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-red-500 to-rose-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V7L14 2Z" />
      <path d="M14 2V7H19" />
      <text x="12" y="17" textAnchor="middle" fill="currentColor" fontSize="5" fontWeight="bold">PDF</text>
    </svg>
  </CircularToolIcon>
);

// Video Tools - Red play
export const VideoCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-red-600 to-red-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
    </svg>
  </CircularToolIcon>
);

// Audio Tools - Amber waves
export const AudioCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-amber-400 to-yellow-300" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 8V16M8 5V19M12 2V22M16 5V19M20 8V16" />
    </svg>
  </CircularToolIcon>
);

// Social Downloader - Instagram gradient
export const SocialCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-purple-500 via-pink-500 to-orange-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5V15M12 15L8 11M12 15L16 11" />
      <path d="M5 17H19V20H5V17Z" fill="currentColor" />
    </svg>
  </CircularToolIcon>
);

// Developer Tools - Cyan code
export const DeveloperCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-cyan-400 to-sky-500" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6L2 12L8 18" />
      <path d="M16 6L22 12L16 18" />
      <path d="M14 4L10 20" />
    </svg>
  </CircularToolIcon>
);

// AI Enhancer - Purple/Pink AI
export const AICircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-indigo-400 via-purple-400 to-pink-400" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2V6M12 18V22M2 12H6M18 12H22" />
      <path d="M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" />
    </svg>
  </CircularToolIcon>
);

// Background Remover - Magenta magic
export const BackgroundRemoverCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-fuchsia-500 to-purple-500" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M20 2L22 4L20 6L18 4L20 2Z" fill="currentColor" />
    </svg>
  </CircularToolIcon>
);

// Generic/Default - Gray tool
export const GenericCircleIcon: React.FC<IconProps> = ({ className = '', size = 56 }) => (
  <CircularToolIcon gradient="from-gray-400 to-slate-500" className={className} size={size}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  </CircularToolIcon>
);

// Get category icon by slug
export const getCategoryCircleIcon = (categorySlug: string, size?: number): React.ReactNode => {
  const iconMap: Record<string, React.FC<IconProps>> = {
    'image-converter': ConverterCircleIcon,
    'image-compression': CompressorCircleIcon,
    'image-crop': CropCircleIcon,
    'image-rotate-flip': RotateCircleIcon,
    'image-resize': ResizeCircleIcon,
    'image-to-document': DocumentCircleIcon,
    'image-format-utilities': FormatCircleIcon,
    'photo-filters': FiltersCircleIcon,
    'watermark-tools': WatermarkCircleIcon,
    'image-combine': CombineCircleIcon,
    'image-metadata': MetadataCircleIcon,
    'image-optimization': OptimizationCircleIcon,
    'image-drawing': DrawingCircleIcon,
    'image-security': SecurityCircleIcon,
    'image-qr': QRCircleIcon,
    'tag-tools': TagCircleIcon,
  };

  const IconComponent = iconMap[categorySlug] || GenericCircleIcon;
  return <IconComponent size={size || 56} />;
};

export default {
  CircularToolIcon,
  ConverterCircleIcon,
  CompressorCircleIcon,
  CropCircleIcon,
  RotateCircleIcon,
  FlipCircleIcon,
  ResizeCircleIcon,
  DocumentCircleIcon,
  FormatCircleIcon,
  FiltersCircleIcon,
  WatermarkCircleIcon,
  CombineCircleIcon,
  MetadataCircleIcon,
  OptimizationCircleIcon,
  DrawingCircleIcon,
  SecurityCircleIcon,
  QRCircleIcon,
  TagCircleIcon,
  PDFCircleIcon,
  VideoCircleIcon,
  AudioCircleIcon,
  SocialCircleIcon,
  DeveloperCircleIcon,
  AICircleIcon,
  BackgroundRemoverCircleIcon,
  GenericCircleIcon,
  getCategoryCircleIcon,
};

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Base wrapper for consistent icon styling
const IconWrapper: React.FC<{ children: React.ReactNode; className?: string; gradient: string; bgColor?: string }> = ({ 
  children, 
  className = '', 
  gradient,
  bgColor = 'from-gray-800 to-gray-900'
}) => (
  <div className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${bgColor} p-3 shadow-lg ${className}`}>
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {gradient}
      </defs>
      {children}
    </svg>
  </div>
);

// Image Converter Icon - Refresh/Convert arrows with blue-cyan gradient
export const ImageConverterIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={`w-${size === 48 ? '12' : '8'} h-${size === 48 ? '12' : '8'} ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="converter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="converter-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0D2137" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#converter-bg)" />
      <path d="M32 16L36 20L32 24" stroke="url(#converter-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 20H36" stroke="url(#converter-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 32L12 28L16 24" stroke="url(#converter-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 28H12" stroke="url(#converter-grad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// Image Compressor Icon - Compress arrows with green gradient
export const ImageCompressorIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="compress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="compress-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="100%" stopColor="#052E16" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#compress-bg)" />
      <path d="M14 14L20 20M34 14L28 20M14 34L20 28M34 34L28 28" stroke="url(#compress-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="18" width="12" height="12" rx="2" stroke="url(#compress-grad)" strokeWidth="2.5" />
    </svg>
  </div>
);

// Image Crop Icon - Crop frame with purple-pink gradient
export const ImageCropIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="crop-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B0764" />
          <stop offset="100%" stopColor="#500724" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#crop-bg)" />
      <path d="M14 10V30H34" stroke="url(#crop-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 38V18H14" stroke="url(#crop-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18H14M34 30H38" stroke="url(#crop-grad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// Rotate Icon - Circular arrow with orange gradient
export const ImageRotateIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rotate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        <linearGradient id="rotate-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#431407" />
          <stop offset="100%" stopColor="#422006" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#rotate-bg)" />
      <path d="M32 16C30.5 13.5 27.5 12 24 12C18.5 12 14 16.5 14 22" stroke="url(#rotate-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 32C17.5 34.5 20.5 36 24 36C29.5 36 34 31.5 34 26" stroke="url(#rotate-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 16H32V12" stroke="url(#rotate-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 32H16V36" stroke="url(#rotate-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Flip Icon - Mirror arrows with teal gradient
export const ImageFlipIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="flip-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#134E4A" />
          <stop offset="100%" stopColor="#083344" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#flip-bg)" />
      <path d="M24 10V38" stroke="url(#flip-grad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M18 14L12 24L18 34V14Z" fill="url(#flip-grad)" />
      <path d="M30 14L36 24L30 34V14Z" fill="url(#flip-grad)" />
    </svg>
  </div>
);

// PDF Tools Icon - Document with red gradient
export const PDFToolsIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pdf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="pdf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#pdf-bg)" />
      <path d="M14 12H28L34 18V36H14V12Z" stroke="url(#pdf-grad)" strokeWidth="2.5" fill="none" />
      <path d="M28 12V18H34" stroke="url(#pdf-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y="30" textAnchor="middle" fill="url(#pdf-grad)" fontSize="8" fontWeight="bold" fontFamily="system-ui">PDF</text>
    </svg>
  </div>
);

// Image to Document Icon - File conversion with indigo gradient
export const DocumentConverterIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="doc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="doc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#doc-bg)" />
      <rect x="10" y="14" width="12" height="10" rx="2" stroke="url(#doc-grad)" strokeWidth="2" fill="none" />
      <circle cx="14" cy="18" r="2" fill="url(#doc-grad)" />
      <path d="M10 22L14 18L22 22" stroke="url(#doc-grad)" strokeWidth="1.5" />
      <path d="M26 16H38M26 22H38M26 28H34" stroke="url(#doc-grad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 24L26 24" stroke="url(#doc-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// Resize Icon - Expand arrows with sky blue gradient
export const ImageResizeIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="resize-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="resize-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#resize-bg)" />
      <rect x="14" y="14" width="20" height="20" rx="2" stroke="url(#resize-grad)" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M30 18L34 14M34 14H28M34 14V20" stroke="url(#resize-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 30L14 34M14 34H20M14 34V28" stroke="url(#resize-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Format Utilities Icon - Gear with palette
export const FormatUtilitiesIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="format-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="format-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#831843" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#format-bg)" />
      <circle cx="24" cy="24" r="8" stroke="url(#format-grad)" strokeWidth="2.5" fill="none" />
      <path d="M24 12V16M24 32V36M12 24H16M32 24H36" stroke="url(#format-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 17L20 20M28 28L31 31M17 31L20 28M28 20L31 17" stroke="url(#format-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// Photo Filters Icon - Sparkles with rainbow gradient
export const PhotoFiltersIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="filter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="33%" stopColor="#F97316" />
          <stop offset="66%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="filter-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#filter-bg)" />
      <path d="M24 10L26 18L34 16L28 22L36 28L28 28L30 38L24 30L18 38L20 28L12 28L20 22L14 16L22 18L24 10Z" fill="url(#filter-grad)" />
    </svg>
  </div>
);

// Watermark Tools Icon - Text overlay with cyan gradient
export const WatermarkIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="watermark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="watermark-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#164E63" />
          <stop offset="100%" stopColor="#0E7490" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#watermark-bg)" />
      <rect x="12" y="14" width="24" height="20" rx="2" stroke="url(#watermark-grad)" strokeWidth="2" fill="none" />
      <text x="24" y="28" textAnchor="middle" fill="url(#watermark-grad)" fontSize="10" fontWeight="bold" fontFamily="system-ui" opacity="0.8">©</text>
      <path d="M10 18L14 14L18 18L22 14L26 18L30 14L34 18L38 14" stroke="url(#watermark-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  </div>
);

// Image Combine Icon - Layers with lime gradient
export const ImageCombineIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="combine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="combine-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#365314" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#combine-bg)" />
      <rect x="10" y="18" width="16" height="12" rx="2" stroke="url(#combine-grad)" strokeWidth="2" fill="none" />
      <rect x="22" y="18" width="16" height="12" rx="2" stroke="url(#combine-grad)" strokeWidth="2" fill="none" />
      <path d="M22 22L26 18L30 22" stroke="url(#combine-grad)" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

// Metadata Icon - Info card with slate gradient
export const MetadataIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="meta-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#meta-bg)" />
      <circle cx="24" cy="18" r="3" fill="url(#meta-grad)" />
      <path d="M24 24V34" stroke="url(#meta-grad)" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="12" width="20" height="24" rx="3" stroke="url(#meta-grad)" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

// Optimization Icon - Lightning bolt with yellow gradient
export const OptimizationIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="opt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="opt-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#opt-bg)" />
      <path d="M26 10L16 26H24L22 38L32 22H24L26 10Z" fill="url(#opt-grad)" />
    </svg>
  </div>
);

// Drawing Icon - Pen tool with rose gradient
export const DrawingIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="draw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
        <linearGradient id="draw-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4C0519" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#draw-bg)" />
      <path d="M32 12L36 16L18 34H14V30L32 12Z" stroke="url(#draw-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M28 16L32 20" stroke="url(#draw-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// Security Icon - Shield with emerald gradient
export const SecurityIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="security-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="security-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#security-bg)" />
      <path d="M24 10L34 14V24C34 30 30 35 24 38C18 35 14 30 14 24V14L24 10Z" stroke="url(#security-grad)" strokeWidth="2.5" fill="none" />
      <path d="M20 24L23 27L28 21" stroke="url(#security-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// QR Code Icon - QR pattern with violet gradient
export const QRCodeIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="qr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="qr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E1065" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#qr-bg)" />
      <rect x="12" y="12" width="10" height="10" rx="2" stroke="url(#qr-grad)" strokeWidth="2" fill="none" />
      <rect x="15" y="15" width="4" height="4" fill="url(#qr-grad)" />
      <rect x="26" y="12" width="10" height="10" rx="2" stroke="url(#qr-grad)" strokeWidth="2" fill="none" />
      <rect x="29" y="15" width="4" height="4" fill="url(#qr-grad)" />
      <rect x="12" y="26" width="10" height="10" rx="2" stroke="url(#qr-grad)" strokeWidth="2" fill="none" />
      <rect x="15" y="29" width="4" height="4" fill="url(#qr-grad)" />
      <rect x="26" y="26" width="4" height="4" fill="url(#qr-grad)" />
      <rect x="32" y="26" width="4" height="4" fill="url(#qr-grad)" />
      <rect x="26" y="32" width="4" height="4" fill="url(#qr-grad)" />
      <rect x="32" y="32" width="4" height="4" fill="url(#qr-grad)" />
    </svg>
  </div>
);

// Tag Extractor Icon - Hashtag with blue gradient
export const TagExtractorIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="tag-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#tag-bg)" />
      <path d="M18 12L14 36M34 12L30 36M12 20H36M10 28H34" stroke="url(#tag-grad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

// Background Remover Icon - Magic wand with transparent effect
export const BackgroundRemoverIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgremove-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
        <linearGradient id="bgremove-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A044E" />
          <stop offset="100%" stopColor="#701A75" />
        </linearGradient>
        <pattern id="transparent-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#555" />
          <rect x="4" y="4" width="4" height="4" fill="#555" />
          <rect x="4" width="4" height="4" fill="#333" />
          <rect y="4" width="4" height="4" fill="#333" />
        </pattern>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#bgremove-bg)" />
      <rect x="14" y="14" width="20" height="20" rx="2" fill="url(#transparent-pattern)" />
      <circle cx="24" cy="24" r="6" fill="url(#bgremove-grad)" />
      <path d="M34 10L38 14L36 16L32 12L34 10Z" fill="url(#bgremove-grad)" />
      <path d="M36 16L24 28" stroke="url(#bgremove-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// AI Enhancer Icon - Brain/AI with electric gradient
export const AIEnhancerIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="ai-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="100%" stopColor="#581C87" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#ai-bg)" />
      <circle cx="24" cy="24" r="10" stroke="url(#ai-grad)" strokeWidth="2.5" fill="none" />
      <circle cx="24" cy="24" r="4" fill="url(#ai-grad)" />
      <path d="M24 10V14M24 34V38M10 24H14M34 24H38" stroke="url(#ai-grad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 16L18.5 18.5M29.5 29.5L32 32M16 32L18.5 29.5M29.5 18.5L32 16" stroke="url(#ai-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// Video Tools Icon - Play button with gradient
export const VideoToolsIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="video-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="video-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#video-bg)" />
      <rect x="10" y="14" width="28" height="20" rx="3" stroke="url(#video-grad)" strokeWidth="2.5" fill="none" />
      <path d="M20 18V30L30 24L20 18Z" fill="url(#video-grad)" />
    </svg>
  </div>
);

// Audio Tools Icon - Sound waves with amber gradient
export const AudioToolsIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="audio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="audio-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#audio-bg)" />
      <path d="M12 20V28M18 16V32M24 12V36M30 16V32M36 20V28" stroke="url(#audio-grad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

// Social Media Downloader Icon - Download with social colors
export const SocialDownloaderIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="social-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="33%" stopColor="#F472B6" />
          <stop offset="66%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="social-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#social-bg)" />
      <path d="M24 12V28M24 28L18 22M24 28L30 22" stroke="url(#social-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 32H34V36H14V32Z" fill="url(#social-grad)" />
    </svg>
  </div>
);

// Developer Tools Icon - Code brackets with blue gradient
export const DeveloperToolsIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dev-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="dev-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#dev-bg)" />
      <path d="M18 16L10 24L18 32" stroke="url(#dev-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 16L38 24L30 32" stroke="url(#dev-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 12L22 36" stroke="url(#dev-grad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// Generic Tool Icon - Wrench with gray gradient
export const GenericToolIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <div className={className} style={{ width: size, height: size }}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="generic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>
        <linearGradient id="generic-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#generic-bg)" />
      <path d="M32 16C30 14 27 14 25 16L18 23L25 30L32 23C34 21 34 18 32 16Z" stroke="url(#generic-grad)" strokeWidth="2.5" fill="none" />
      <path d="M18 23L12 29L16 33L22 27" stroke="url(#generic-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Icon mapping function for dynamic use
export const getToolIcon = (iconName: string, size?: number): React.ReactNode => {
  const iconMap: Record<string, React.FC<IconProps>> = {
    'image-converter': ImageConverterIcon,
    'image-compression': ImageCompressorIcon,
    'image-crop': ImageCropIcon,
    'image-rotate-flip': ImageRotateIcon,
    'rotate': ImageRotateIcon,
    'flip': ImageFlipIcon,
    'image-resize': ImageResizeIcon,
    'image-format-utilities': FormatUtilitiesIcon,
    'photo-filters': PhotoFiltersIcon,
    'watermark-tools': WatermarkIcon,
    'image-combine': ImageCombineIcon,
    'image-metadata': MetadataIcon,
    'image-optimization': OptimizationIcon,
    'image-drawing': DrawingIcon,
    'image-security': SecurityIcon,
    'image-qr': QRCodeIcon,
    'tag-tools': TagExtractorIcon,
    'image-to-document': DocumentConverterIcon,
    'pdf': PDFToolsIcon,
    'background-remover': BackgroundRemoverIcon,
    'ai-enhancer': AIEnhancerIcon,
    'video': VideoToolsIcon,
    'audio': AudioToolsIcon,
    'social-downloader': SocialDownloaderIcon,
    'developer': DeveloperToolsIcon,
  };

  const IconComponent = iconMap[iconName] || GenericToolIcon;
  return <IconComponent size={size || 48} />;
};

// Export all icons
export default {
  ImageConverterIcon,
  ImageCompressorIcon,
  ImageCropIcon,
  ImageRotateIcon,
  ImageFlipIcon,
  PDFToolsIcon,
  DocumentConverterIcon,
  ImageResizeIcon,
  FormatUtilitiesIcon,
  PhotoFiltersIcon,
  WatermarkIcon,
  ImageCombineIcon,
  MetadataIcon,
  OptimizationIcon,
  DrawingIcon,
  SecurityIcon,
  QRCodeIcon,
  TagExtractorIcon,
  BackgroundRemoverIcon,
  AIEnhancerIcon,
  VideoToolsIcon,
  AudioToolsIcon,
  SocialDownloaderIcon,
  DeveloperToolsIcon,
  GenericToolIcon,
  getToolIcon,
};

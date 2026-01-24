// Unique template styles for different tool categories
// Each template has a different layout, typography, and writing style

export type TemplateStyle = 
  | 'magazine'      // Editorial magazine style - Image converters
  | 'technical'     // Technical documentation style - Compression tools
  | 'creative'      // Creative artsy style - Photo filters, Effects
  | 'professional'  // Business professional style - Document tools
  | 'minimalist'    // Clean minimal style - Resize, Crop tools
  | 'tutorial'      // Step-focused tutorial style - Rotate, Flip
  | 'utility'       // Utility-first style - Format utilities
  | 'security';     // Trust-focused style - Watermark, Security

export interface TemplateConfig {
  style: TemplateStyle;
  sectionOrder: string[];
  accentStyle: 'gradient' | 'solid' | 'border' | 'shadow' | 'glass';
  headingStyle: 'bold' | 'elegant' | 'modern' | 'playful' | 'technical';
  cardStyle: 'rounded' | 'sharp' | 'floating' | 'bordered' | 'minimal';
  iconStyle: 'circle' | 'square' | 'rounded-square' | 'badge' | 'pill';
  writingTone: 'formal' | 'friendly' | 'technical' | 'conversational' | 'educational';
}

// Map categories to unique template configurations
export const categoryTemplateMap: Record<string, TemplateConfig> = {
  'image-converter': {
    style: 'magazine',
    sectionOrder: ['intro', 'features', 'howto', 'benefits', 'usecases', 'who', 'faq', 'privacy'],
    accentStyle: 'gradient',
    headingStyle: 'bold',
    cardStyle: 'rounded',
    iconStyle: 'circle',
    writingTone: 'friendly'
  },
  'image-compression': {
    style: 'technical',
    sectionOrder: ['intro', 'howto', 'features', 'why', 'benefits', 'usecases', 'faq', 'privacy'],
    accentStyle: 'solid',
    headingStyle: 'technical',
    cardStyle: 'sharp',
    iconStyle: 'square',
    writingTone: 'technical'
  },
  'image-to-document': {
    style: 'professional',
    sectionOrder: ['intro', 'why', 'howto', 'features', 'who', 'usecases', 'benefits', 'faq', 'privacy'],
    accentStyle: 'border',
    headingStyle: 'elegant',
    cardStyle: 'bordered',
    iconStyle: 'badge',
    writingTone: 'formal'
  },
  'image-resize': {
    style: 'minimalist',
    sectionOrder: ['intro', 'howto', 'features', 'benefits', 'faq', 'who', 'usecases', 'privacy'],
    accentStyle: 'shadow',
    headingStyle: 'modern',
    cardStyle: 'minimal',
    iconStyle: 'pill',
    writingTone: 'conversational'
  },
  'image-crop': {
    style: 'minimalist',
    sectionOrder: ['intro', 'features', 'howto', 'usecases', 'benefits', 'faq', 'who', 'privacy'],
    accentStyle: 'glass',
    headingStyle: 'modern',
    cardStyle: 'floating',
    iconStyle: 'rounded-square',
    writingTone: 'friendly'
  },
  'image-rotate-flip': {
    style: 'tutorial',
    sectionOrder: ['howto', 'intro', 'features', 'why', 'benefits', 'usecases', 'faq', 'privacy'],
    accentStyle: 'gradient',
    headingStyle: 'playful',
    cardStyle: 'rounded',
    iconStyle: 'circle',
    writingTone: 'educational'
  },
  'image-format-utilities': {
    style: 'utility',
    sectionOrder: ['intro', 'features', 'howto', 'usecases', 'benefits', 'who', 'faq', 'privacy'],
    accentStyle: 'border',
    headingStyle: 'technical',
    cardStyle: 'sharp',
    iconStyle: 'square',
    writingTone: 'technical'
  },
  'photo-filters': {
    style: 'creative',
    sectionOrder: ['intro', 'usecases', 'features', 'howto', 'benefits', 'who', 'faq', 'privacy'],
    accentStyle: 'gradient',
    headingStyle: 'playful',
    cardStyle: 'floating',
    iconStyle: 'circle',
    writingTone: 'conversational'
  },
  'watermark-tools': {
    style: 'security',
    sectionOrder: ['intro', 'why', 'features', 'howto', 'benefits', 'usecases', 'who', 'faq', 'privacy'],
    accentStyle: 'solid',
    headingStyle: 'bold',
    cardStyle: 'bordered',
    iconStyle: 'badge',
    writingTone: 'formal'
  },
  'image-combine': {
    style: 'creative',
    sectionOrder: ['intro', 'howto', 'usecases', 'features', 'benefits', 'faq', 'who', 'privacy'],
    accentStyle: 'glass',
    headingStyle: 'modern',
    cardStyle: 'floating',
    iconStyle: 'rounded-square',
    writingTone: 'friendly'
  },
  'image-qr': {
    style: 'utility',
    sectionOrder: ['intro', 'features', 'howto', 'why', 'usecases', 'benefits', 'faq', 'privacy'],
    accentStyle: 'shadow',
    headingStyle: 'technical',
    cardStyle: 'minimal',
    iconStyle: 'square',
    writingTone: 'technical'
  },
  'image-metadata': {
    style: 'technical',
    sectionOrder: ['intro', 'why', 'features', 'howto', 'usecases', 'benefits', 'faq', 'privacy'],
    accentStyle: 'border',
    headingStyle: 'technical',
    cardStyle: 'sharp',
    iconStyle: 'badge',
    writingTone: 'formal'
  },
  'image-drawing': {
    style: 'creative',
    sectionOrder: ['intro', 'features', 'usecases', 'howto', 'benefits', 'who', 'faq', 'privacy'],
    accentStyle: 'gradient',
    headingStyle: 'playful',
    cardStyle: 'rounded',
    iconStyle: 'circle',
    writingTone: 'conversational'
  },
  'image-security': {
    style: 'security',
    sectionOrder: ['intro', 'why', 'features', 'howto', 'benefits', 'usecases', 'faq', 'privacy'],
    accentStyle: 'solid',
    headingStyle: 'bold',
    cardStyle: 'bordered',
    iconStyle: 'badge',
    writingTone: 'formal'
  },
  'pdf-tools': {
    style: 'professional',
    sectionOrder: ['intro', 'features', 'howto', 'why', 'benefits', 'usecases', 'who', 'faq', 'privacy'],
    accentStyle: 'border',
    headingStyle: 'elegant',
    cardStyle: 'bordered',
    iconStyle: 'badge',
    writingTone: 'formal'
  },
  'image-optimization': {
    style: 'technical',
    sectionOrder: ['intro', 'why', 'howto', 'features', 'benefits', 'usecases', 'faq', 'privacy'],
    accentStyle: 'shadow',
    headingStyle: 'modern',
    cardStyle: 'minimal',
    iconStyle: 'pill',
    writingTone: 'technical'
  }
};

// Get template config for a category
export const getTemplateConfig = (categorySlug: string): TemplateConfig => {
  return categoryTemplateMap[categorySlug] || {
    style: 'magazine',
    sectionOrder: ['intro', 'features', 'howto', 'benefits', 'usecases', 'who', 'faq', 'privacy'],
    accentStyle: 'gradient',
    headingStyle: 'bold',
    cardStyle: 'rounded',
    iconStyle: 'circle',
    writingTone: 'friendly'
  };
};

// Unique color palettes for each category (beyond gradients)
export const categoryColorSchemes: Record<string, { primary: string; secondary: string; accent: string; bg: string }> = {
  'image-converter': { primary: '#3B82F6', secondary: '#06B6D4', accent: '#0EA5E9', bg: 'from-blue-500/5 to-cyan-500/5' },
  'image-compression': { primary: '#22C55E', secondary: '#10B981', accent: '#14B8A6', bg: 'from-green-500/5 to-emerald-500/5' },
  'image-to-document': { primary: '#EC4899', secondary: '#F97316', accent: '#F59E0B', bg: 'from-pink-500/5 to-orange-500/5' },
  'image-resize': { primary: '#00C6FF', secondary: '#0072FF', accent: '#3B82F6', bg: 'from-cyan-500/5 to-blue-500/5' },
  'image-crop': { primary: '#A855F7', secondary: '#EC4899', accent: '#D946EF', bg: 'from-purple-500/5 to-pink-500/5' },
  'image-rotate-flip': { primary: '#F97316', secondary: '#EAB308', accent: '#FBBF24', bg: 'from-orange-500/5 to-yellow-500/5' },
  'image-format-utilities': { primary: '#6366F1', secondary: '#8B5CF6', accent: '#A78BFA', bg: 'from-indigo-500/5 to-violet-500/5' },
  'photo-filters': { primary: '#F093FB', secondary: '#F5576C', accent: '#FF6B9D', bg: 'from-fuchsia-500/5 to-rose-500/5' },
  'watermark-tools': { primary: '#14B8A6', secondary: '#059669', accent: '#10B981', bg: 'from-teal-500/5 to-emerald-500/5' },
  'image-combine': { primary: '#8B5CF6', secondary: '#06B6D4', accent: '#7C3AED', bg: 'from-violet-500/5 to-cyan-500/5' },
  'image-qr': { primary: '#1F2937', secondary: '#374151', accent: '#4B5563', bg: 'from-gray-500/5 to-slate-500/5' },
  'image-metadata': { primary: '#0EA5E9', secondary: '#6366F1', accent: '#3B82F6', bg: 'from-sky-500/5 to-indigo-500/5' },
  'image-drawing': { primary: '#F59E0B', secondary: '#EF4444', accent: '#F97316', bg: 'from-amber-500/5 to-red-500/5' },
  'image-security': { primary: '#DC2626', secondary: '#991B1B', accent: '#B91C1C', bg: 'from-red-500/5 to-red-700/5' },
  'pdf-tools': { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171', bg: 'from-red-500/5 to-rose-500/5' },
  'image-optimization': { primary: '#10B981', secondary: '#059669', accent: '#34D399', bg: 'from-emerald-500/5 to-green-500/5' }
};

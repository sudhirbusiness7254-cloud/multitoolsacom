// Unique visual styles for different writing tones and layouts
import React from 'react';
import { TemplateConfig, categoryColorSchemes } from './TemplateStyles';

interface StyleProps {
  config: TemplateConfig;
  categorySlug: string;
  gradientFrom: string;
  gradientTo: string;
}

// Get unique heading classes based on style
export const getHeadingClasses = (config: TemplateConfig): string => {
  switch (config.headingStyle) {
    case 'bold':
      return 'font-extrabold tracking-tight';
    case 'elegant':
      return 'font-serif font-medium tracking-wide';
    case 'modern':
      return 'font-semibold tracking-normal';
    case 'playful':
      return 'font-bold tracking-tight';
    case 'technical':
      return 'font-mono font-bold tracking-wider uppercase text-sm';
    default:
      return 'font-bold';
  }
};

// Get unique card classes based on style
export const getCardClasses = (config: TemplateConfig): string => {
  switch (config.cardStyle) {
    case 'rounded':
      return 'rounded-2xl border border-border bg-card shadow-sm';
    case 'sharp':
      return 'rounded-none border-l-4 border-border bg-card';
    case 'floating':
      return 'rounded-xl shadow-lg bg-card/80 backdrop-blur-sm';
    case 'bordered':
      return 'rounded-lg border-2 border-border bg-transparent';
    case 'minimal':
      return 'rounded-md bg-secondary/30';
    default:
      return 'rounded-xl border border-border bg-card';
  }
};

// Get unique icon container classes
export const getIconContainerClasses = (config: TemplateConfig, gradient: { from: string; to: string }): string => {
  const baseClasses = 'flex items-center justify-center';
  
  switch (config.iconStyle) {
    case 'circle':
      return `${baseClasses} w-12 h-12 rounded-full`;
    case 'square':
      return `${baseClasses} w-10 h-10 rounded-none`;
    case 'rounded-square':
      return `${baseClasses} w-11 h-11 rounded-lg`;
    case 'badge':
      return `${baseClasses} w-10 h-10 rounded-md rotate-45`;
    case 'pill':
      return `${baseClasses} w-14 h-8 rounded-full`;
    default:
      return `${baseClasses} w-10 h-10 rounded-lg`;
  }
};

// Get section wrapper classes based on accent style
export const getSectionClasses = (config: TemplateConfig, categorySlug: string): string => {
  const colors = categoryColorSchemes[categorySlug];
  const baseClasses = 'p-6 md:p-8';
  
  switch (config.accentStyle) {
    case 'gradient':
      return `${baseClasses} rounded-2xl bg-gradient-to-br ${colors?.bg || 'from-primary/5 to-secondary/5'}`;
    case 'solid':
      return `${baseClasses} rounded-xl bg-card border border-border`;
    case 'border':
      return `${baseClasses} rounded-lg border-l-4 bg-card/50`;
    case 'shadow':
      return `${baseClasses} rounded-xl shadow-lg bg-card`;
    case 'glass':
      return `${baseClasses} rounded-2xl bg-card/60 backdrop-blur-md border border-white/10`;
    default:
      return `${baseClasses} rounded-xl bg-card border border-border`;
  }
};

// Get unique list style based on template
export const getListStyle = (config: TemplateConfig): 'numbered' | 'bullets' | 'cards' | 'timeline' | 'minimal' => {
  switch (config.style) {
    case 'magazine':
      return 'cards';
    case 'technical':
      return 'numbered';
    case 'creative':
      return 'cards';
    case 'professional':
      return 'bullets';
    case 'minimalist':
      return 'minimal';
    case 'tutorial':
      return 'timeline';
    case 'utility':
      return 'numbered';
    case 'security':
      return 'bullets';
    default:
      return 'bullets';
  }
};

// Unique badge styles for different categories
export const getBadgeClasses = (categorySlug: string): string => {
  const styles: Record<string, string> = {
    'image-converter': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-4 py-1.5',
    'image-compression': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md px-3 py-1',
    'image-to-document': 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300 rounded-lg px-4 py-2 border border-pink-200 dark:border-pink-800',
    'image-resize': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-full px-4 py-1',
    'image-crop': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-xl px-4 py-1.5 shadow-sm',
    'image-rotate-flip': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full px-5 py-2',
    'image-format-utilities': 'bg-indigo-50 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-none px-4 py-1.5 border-l-2 border-indigo-500',
    'photo-filters': 'bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-800 dark:from-fuchsia-900/30 dark:to-rose-900/30 dark:text-fuchsia-300 rounded-full px-5 py-2',
    'watermark-tools': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 rounded-lg px-4 py-1.5 border border-teal-300 dark:border-teal-700',
    'image-combine': 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 rounded-2xl px-5 py-2 shadow-md',
    'image-qr': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-sm px-3 py-1 font-mono',
    'image-metadata': 'bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 rounded-lg px-4 py-1.5',
    'image-drawing': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full px-5 py-2',
    'image-security': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md px-4 py-2 border-2 border-red-300 dark:border-red-700',
    'pdf-tools': 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded-lg px-4 py-1.5 border border-red-200 dark:border-red-800',
    'image-optimization': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-xl px-4 py-1.5'
  };
  
  return styles[categorySlug] || 'bg-primary/10 text-primary rounded-full px-4 py-1.5';
};

// Unique intro text transformations
export const getIntroStyle = (config: TemplateConfig): { firstLetter: boolean; columns: boolean; quote: boolean } => {
  switch (config.style) {
    case 'magazine':
      return { firstLetter: true, columns: false, quote: false };
    case 'technical':
      return { firstLetter: false, columns: false, quote: false };
    case 'creative':
      return { firstLetter: false, columns: false, quote: true };
    case 'professional':
      return { firstLetter: false, columns: true, quote: false };
    case 'minimalist':
      return { firstLetter: false, columns: false, quote: false };
    case 'tutorial':
      return { firstLetter: false, columns: false, quote: false };
    case 'utility':
      return { firstLetter: false, columns: false, quote: false };
    case 'security':
      return { firstLetter: true, columns: false, quote: false };
    default:
      return { firstLetter: false, columns: false, quote: false };
  }
};

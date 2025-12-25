// SEO utility functions for the website

export const BASE_URL = "https://multitoolsa.com";

// Supported languages with their hreflang codes
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "ja", name: "Japanese" },
] as const;

export type HreflangTag = {
  hrefLang: string;
  href: string;
};

/**
 * Generate hreflang data for international SEO
 * @param path - The current page path (e.g., "/about", "/tools/jpg-to-png")
 * @returns Array of hreflang tag data
 */
export const getHreflangData = (path: string): HreflangTag[] => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${BASE_URL}${normalizedPath}`;
  
  return [
    { hrefLang: "x-default", href: fullUrl },
    ...SUPPORTED_LANGUAGES.map(lang => ({
      hrefLang: lang.code,
      href: fullUrl
    }))
  ];
};

/**
 * Get canonical URL for a given path
 * @param path - The current page path
 * @returns Full canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalizedPath}`;
};

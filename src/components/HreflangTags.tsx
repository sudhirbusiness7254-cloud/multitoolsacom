import { getHreflangData } from "@/lib/seoUtils";

interface HreflangTagsProps {
  path: string;
}

/**
 * Component to render hreflang link tags for international SEO
 * Supports: English, Spanish, French, German, Chinese, Arabic, Portuguese, Japanese
 */
const HreflangTags = ({ path }: HreflangTagsProps) => {
  const hreflangData = getHreflangData(path);
  
  return (
    <>
      {hreflangData.map((tag) => (
        <link 
          key={tag.hrefLang} 
          rel="alternate" 
          hrefLang={tag.hrefLang} 
          href={tag.href} 
        />
      ))}
    </>
  );
};

export default HreflangTags;

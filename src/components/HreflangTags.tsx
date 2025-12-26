import { Helmet } from "react-helmet-async";
import { getHreflangData } from "@/lib/seoUtils";

interface HreflangTagsProps {
  path: string;
}

/**
 * Component to render hreflang link tags for international SEO
 * Supports: English, Spanish, French, German, Chinese, Arabic, Portuguese, Japanese
 * 
 * IMPORTANT: This component renders its own Helmet - use it OUTSIDE of other Helmet components
 */
const HreflangTags = ({ path }: HreflangTagsProps) => {
  const hreflangData = getHreflangData(path);
  
  return (
    <Helmet>
      {hreflangData.map((tag) => (
        <link 
          key={tag.hrefLang} 
          rel="alternate" 
          hrefLang={tag.hrefLang} 
          href={tag.href} 
        />
      ))}
    </Helmet>
  );
};

export default HreflangTags;

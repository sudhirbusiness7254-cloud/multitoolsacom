import { useId, useEffect, useRef } from "react";
import SkyscraperAd from "./SkyscraperAd";
import MobileNativeAd from "./MobileNativeAd";
import MobileBannerAd from "./MobileBannerAd";

/**
 * Native Ad Component with unique container ID
 * Used for placing multiple native ads on the same page
 */
export const NativeAdBlock = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    
    containerRef.current.innerHTML = '';

    const adContainer = document.createElement('div');
    adContainer.id = `container-5dd29b78901106d681d1f5ce05a102b3-${uniqueId}`;
    containerRef.current.appendChild(adContainer);

    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    containerRef.current.appendChild(script);
    initialized.current = true;

    return () => {
      initialized.current = false;
    };
  }, [uniqueId]);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 min-h-[80px] ${className}`}
      data-ad-slot={`native-${uniqueId}`}
    />
  );
};

/**
 * Side Ads Container - Shows skyscraper ads on desktop sides
 */
export const SideAdsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full">
      {/* Left Skyscraper - Desktop only */}
      <div className="hidden xl:block fixed left-2 2xl:left-8 top-1/2 -translate-y-1/2 z-40">
        <SkyscraperAd />
      </div>
      
      {/* Right Skyscraper - Desktop only */}
      <div className="hidden xl:block fixed right-2 2xl:right-8 top-1/2 -translate-y-1/2 z-40">
        <SkyscraperAd />
      </div>
      
      {children}
    </div>
  );
};

/**
 * Below Tool Ad Block - Shows native ads below the tool interface
 * Permanent - stays even after output is generated
 */
export const BelowToolAds = () => {
  return (
    <div className="w-full mt-6 space-y-4">
      {/* Desktop Native Ad */}
      <div className="hidden lg:block">
        <NativeAdBlock />
      </div>
      
      {/* Mobile/Tablet Native Ad */}
      <div className="lg:hidden">
        <MobileNativeAd />
      </div>
      
      {/* Mobile Banner Ad */}
      <div className="md:hidden">
        <MobileBannerAd />
      </div>
    </div>
  );
};

/**
 * Content Section Ad - Native ad between content sections
 */
export const ContentSectionAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full my-6 ${className}`}>
      {/* Desktop */}
      <div className="hidden lg:block">
        <NativeAdBlock />
      </div>
      {/* Mobile/Tablet */}
      <div className="lg:hidden">
        <MobileNativeAd />
      </div>
    </div>
  );
};

export default {
  NativeAdBlock,
  SideAdsContainer,
  BelowToolAds,
  ContentSectionAd
};

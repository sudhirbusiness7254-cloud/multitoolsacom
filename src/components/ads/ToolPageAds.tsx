import { useId, useEffect, useRef } from "react";
import LazySkyscraperAd from "./LazySkyscraperAd";
import LazyNativeBannerAd from "./LazyNativeBannerAd";
import LazyMobileBannerAd from "./LazyMobileBannerAd";
import useLazyAd from "@/hooks/useLazyAd";

/**
 * Lazy Native Ad Component with unique container ID
 * Only loads when visible in viewport
 */
export const NativeAdBlock = ({ className = "" }: { className?: string }) => {
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "300px" });
  const adContainerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    if (!isVisible || initialized.current || !adContainerRef.current) return;
    initialized.current = true;
    
    adContainerRef.current.innerHTML = '';

    const adContainer = document.createElement('div');
    adContainer.id = `container-5dd29b78901106d681d1f5ce05a102b3-${uniqueId}`;
    adContainerRef.current.appendChild(adContainer);

    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    adContainerRef.current.appendChild(script);
  }, [isVisible, uniqueId]);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 min-h-[80px] ${className}`}
      data-ad-slot={`native-${uniqueId}`}
    >
      {isVisible ? (
        <div ref={adContainerRef} className="w-full flex justify-center" />
      ) : (
        <div className="w-full h-[80px] bg-muted/20 animate-pulse rounded" />
      )}
    </div>
  );
};

/**
 * Side Ads Container - Shows lazy-loaded skyscraper ads on desktop sides
 */
export const SideAdsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full">
      {/* Left Skyscraper - Desktop only */}
      <div className="hidden xl:block fixed left-2 2xl:left-8 top-1/2 -translate-y-1/2 z-40">
        <LazySkyscraperAd />
      </div>
      
      {/* Right Skyscraper - Desktop only */}
      <div className="hidden xl:block fixed right-2 2xl:right-8 top-1/2 -translate-y-1/2 z-40">
        <LazySkyscraperAd />
      </div>
      
      {children}
    </div>
  );
};

/**
 * Below Tool Ad Block - Shows lazy native ads below the tool interface
 * Permanent - stays even after output is generated
 */
export const BelowToolAds = () => {
  return (
    <div className="w-full mt-6 space-y-4">
      {/* Desktop Native Ad */}
      <div className="hidden lg:block">
        <LazyNativeBannerAd />
      </div>
      
      {/* Mobile/Tablet Native Ad */}
      <div className="lg:hidden">
        <LazyNativeBannerAd />
      </div>
      
      {/* Mobile Banner Ad */}
      <div className="md:hidden">
        <LazyMobileBannerAd />
      </div>
    </div>
  );
};

/**
 * Content Section Ad - Lazy native ad between content sections
 */
export const ContentSectionAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full my-6 ${className}`}>
      {/* Desktop */}
      <div className="hidden lg:block">
        <LazyNativeBannerAd />
      </div>
      {/* Mobile/Tablet */}
      <div className="lg:hidden">
        <LazyNativeBannerAd />
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

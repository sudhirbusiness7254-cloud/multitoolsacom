import { useEffect, useRef, useId } from "react";
import useLazyAd from "@/hooks/useLazyAd";

interface LazyMobileBannerAdProps {
  className?: string;
}

/**
 * Lazy-loaded Mobile Banner Ad (320x50)
 * Only shows on mobile devices (< 768px)
 * Loads when near viewport
 */
const LazyMobileBannerAd = ({ className = "" }: LazyMobileBannerAdProps) => {
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "200px" });
  const scriptLoaded = useRef(false);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    if (!isVisible || scriptLoaded.current || !adContainerRef.current) return;
    scriptLoaded.current = true;

    const container = adContainerRef.current;

    // Create atOptions script
    const optionsScript = document.createElement('script');
    optionsScript.textContent = `
      atOptions = {
        'key' : '689f23dcc2cd82711bf2ed6fa916f48f',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    container.appendChild(optionsScript);

    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://crowdsubsequentadmire.com/689f23dcc2cd82711bf2ed6fa916f48f/invoke.js';
    invokeScript.async = true;
    
    container.appendChild(invokeScript);
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={`flex md:hidden justify-center my-3 ${className}`}
      data-ad-slot={`mobile-banner-${uniqueId}`}
      style={{ minHeight: '50px' }}
    >
      {isVisible ? (
        <div ref={adContainerRef} className="flex justify-center" />
      ) : (
        <div className="w-[320px] h-[50px] bg-muted/20 animate-pulse rounded" />
      )}
    </div>
  );
};

export default LazyMobileBannerAd;

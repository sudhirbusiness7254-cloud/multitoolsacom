import { useEffect, useRef, useId } from "react";
import useLazyAd from "@/hooks/useLazyAd";

type BannerSize = 
  | "160x600"   // Skyscraper
  | "320x50"    // Mobile Banner
  | "160x300"   // Half Page
  | "300x250"   // Medium Rectangle
  | "468x60"    // Full Banner
  | "728x90";   // Leaderboard

const AD_CONFIG: Record<BannerSize, { key: string; width: number; height: number }> = {
  "160x600": { key: "5251d00b938f369c8b531c0ce3b384bb", width: 160, height: 600 },
  "320x50": { key: "689f23dcc2cd82711bf2ed6fa916f48f", width: 320, height: 50 },
  "160x300": { key: "848449b09ba01b0ba4cf4fa76ce77588", width: 160, height: 300 },
  "300x250": { key: "d52a495495a17b9a962ef57cced322f2", width: 300, height: 250 },
  "468x60": { key: "00d0cc99e5eafdc160d3d62ac888171e", width: 468, height: 60 },
  "728x90": { key: "9a62bcab9636ba9c233ff25f03ef5082", width: 728, height: 90 },
};

interface SafeBannerAdProps {
  size: BannerSize;
  className?: string;
  lazy?: boolean;
}

/**
 * Safe iframe-based banner ad component
 * Only uses approved banner sizes, no popups, no redirects
 * SEO-safe and Google AdSense compliant
 */
const SafeBannerAd = ({ size, className = "", lazy = true }: SafeBannerAdProps) => {
  const config = AD_CONFIG[size];
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "200px" });
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    // If lazy loading is disabled, show immediately
    const shouldLoad = lazy ? isVisible : true;
    
    if (!shouldLoad || scriptLoaded.current || !adContainerRef.current) return;
    scriptLoaded.current = true;

    const container = adContainerRef.current;
    container.innerHTML = '';

    // Set atOptions on window
    const optionsScript = document.createElement('script');
    optionsScript.textContent = `
      atOptions = {
        'key': '${config.key}',
        'format': 'iframe',
        'height': ${config.height},
        'width': ${config.width},
        'params': {}
      };
    `;
    container.appendChild(optionsScript);

    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://crowdsubsequentadmire.com/${config.key}/invoke.js`;
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    
    container.appendChild(invokeScript);
  }, [isVisible, lazy, config]);

  const containerStyle = {
    minWidth: `${config.width}px`,
    minHeight: `${config.height}px`,
  };

  if (lazy) {
    return (
      <div 
        ref={containerRef}
        className={`flex justify-center items-center ${className}`}
        style={containerStyle}
        data-ad-slot={`banner-${size}-${uniqueId}`}
      >
        {isVisible ? (
          <div ref={adContainerRef} className="flex justify-center items-center" style={containerStyle} />
        ) : (
          <div className="bg-muted/20 animate-pulse rounded" style={containerStyle} />
        )}
      </div>
    );
  }

  return (
    <div 
      ref={adContainerRef}
      className={`flex justify-center items-center ${className}`}
      style={containerStyle}
      data-ad-slot={`banner-${size}-${uniqueId}`}
    />
  );
};

export default SafeBannerAd;

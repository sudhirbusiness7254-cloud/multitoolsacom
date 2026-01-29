import { useEffect, useId, useRef, useState } from "react";
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
 * Banner ad component using direct script injection
 * Scripts are injected only once per instance
 */
const SafeBannerAd = ({ size, className = "", lazy = true }: SafeBannerAdProps) => {
  const config = AD_CONFIG[size];
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "200px" });
  const uniqueId = useId().replace(/:/g, '');
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(!lazy);
  const scriptInjectedRef = useRef(false);

  useEffect(() => {
    if (!lazy) return;
    if (isVisible) setShouldRender(true);
  }, [isVisible, lazy]);

  // Inject ad script when shouldRender becomes true
  useEffect(() => {
    if (!shouldRender || scriptInjectedRef.current || !adContainerRef.current) return;
    
    scriptInjectedRef.current = true;
    
    const container = adContainerRef.current;
    
    // Set atOptions on window
    (window as any).atOptions = {
      key: config.key,
      format: 'iframe',
      height: config.height,
      width: config.width,
      params: {}
    };
    
    // Create and inject the ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `https://crowdsubsequentadmire.com/${config.key}/invoke.js`;
    
    container.appendChild(script);
    
    // Cleanup function - remove script on unmount
    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, [shouldRender, config.key, config.height, config.width]);

  const containerStyle = {
    minWidth: `${config.width}px`,
    minHeight: `${config.height}px`,
  };

  return (
    <div 
      ref={lazy ? containerRef : undefined}
      className={`flex justify-center items-center ${className}`}
      style={containerStyle}
      data-ad-slot={`banner-${size}-${uniqueId}`}
    >
      {shouldRender ? (
        <div 
          ref={adContainerRef}
          id={`ad-container-${uniqueId}`}
          style={{
            width: `${config.width}px`,
            height: `${config.height}px`,
            overflow: 'hidden',
          }}
        />
      ) : (
        <div className="bg-muted/20 animate-pulse rounded" style={containerStyle} />
      )}
    </div>
  );
};

export default SafeBannerAd;

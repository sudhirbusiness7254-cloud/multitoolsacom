import { useEffect, useId, useMemo, useState } from "react";
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
 * Runs ad scripts in sandboxed iframe to prevent popups/overlays
 * SEO-safe and Google AdSense compliant
 */
const SafeBannerAd = ({ size, className = "", lazy = true }: SafeBannerAdProps) => {
  const config = AD_CONFIG[size];
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "200px" });
  const uniqueId = useId().replace(/:/g, '');
  const [shouldRender, setShouldRender] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;
    if (isVisible) setShouldRender(true);
  }, [isVisible, lazy]);

  const containerStyle = {
    minWidth: `${config.width}px`,
    minHeight: `${config.height}px`,
  };

  // Run ad network code inside isolated sandboxed iframe
  // sandbox excludes allow-popups / allow-top-navigation to prevent overlays
  const iframeSrcDoc = useMemo(() => {
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:transparent; }
      #ad { width:${config.width}px; height:${config.height}px; display:flex; align-items:center; justify-content:center; }
    </style>
  </head>
  <body>
    <div id="ad"></div>
    <script>
      window.atOptions = {
        key: '${config.key}',
        format: 'iframe',
        height: ${config.height},
        width: ${config.width},
        params: {}
      };
    </script>
    <script data-cfasync="false" async src="https://crowdsubsequentadmire.com/${config.key}/invoke.js"></script>
  </body>
</html>`;
  }, [config.height, config.key, config.width]);

  return (
    <div 
      ref={lazy ? containerRef : undefined}
      className={`flex justify-center items-center ${className}`}
      style={containerStyle}
      data-ad-slot={`banner-${size}-${uniqueId}`}
    >
      {shouldRender ? (
        <iframe
          title={`ad-${size}-${uniqueId}`}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          className="block"
          style={{
            width: `${config.width}px`,
            height: `${config.height}px`,
            border: 0,
            background: "transparent",
          }}
          srcDoc={iframeSrcDoc}
        />
      ) : (
        <div className="bg-muted/20 animate-pulse rounded" style={containerStyle} />
      )}
    </div>
  );
};

export default SafeBannerAd;
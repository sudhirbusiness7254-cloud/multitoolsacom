import { useEffect, useRef } from "react";

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

const AdBanner = ({ adKey, width, height, className = "" }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !adRef.current) return;
    
    // Set atOptions on window
    (window as any).atOptions = {
      'key': adKey,
      'format': 'iframe',
      'height': height,
      'width': width,
      'params': {}
    };

    // Create and inject the script
    const script = document.createElement('script');
    script.src = `https://crowdsubsequentadmire.com/${adKey}/invoke.js`;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    adRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      if (adRef.current) {
        const scripts = adRef.current.querySelectorAll('script');
        scripts.forEach(s => s.remove());
      }
    };
  }, [adKey, width, height]);

  return (
    <div 
      ref={adRef}
      className={`flex items-center justify-center ${className}`}
      style={{ minWidth: `${width}px`, minHeight: `${height}px` }}
    />
  );
};

export default AdBanner;

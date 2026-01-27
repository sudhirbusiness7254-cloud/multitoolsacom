import { useEffect, useRef } from "react";
import useLazyAd from "@/hooks/useLazyAd";

interface LazySkyscraperAdProps {
  className?: string;
}

const LazySkyscraperAd = ({ className = "" }: LazySkyscraperAdProps) => {
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "200px" });
  const scriptLoaded = useRef(false);
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || scriptLoaded.current || !adContainerRef.current) return;
    scriptLoaded.current = true;

    // Set atOptions on window with unique key
    const uniqueKey = `atOptions_${Date.now()}`;
    (window as any)[uniqueKey] = {
      'key': '5251d00b938f369c8b531c0ce3b384bb',
      'format': 'iframe',
      'height': 600,
      'width': 160,
      'params': {}
    };
    (window as any).atOptions = (window as any)[uniqueKey];

    // Create and inject the script
    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5251d00b938f369c8b531c0ce3b384bb/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    adContainerRef.current.appendChild(script);
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={`flex items-center justify-center min-h-[600px] w-[160px] ${className}`}
      style={{ minWidth: '160px', minHeight: '600px' }}
    >
      {isVisible ? (
        <div ref={adContainerRef} className="w-[160px] h-[600px]" />
      ) : (
        <div className="w-[160px] h-[600px] bg-muted/20 animate-pulse rounded" />
      )}
    </div>
  );
};

export default LazySkyscraperAd;

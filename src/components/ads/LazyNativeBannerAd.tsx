import { useEffect, useRef } from "react";
import useLazyAd from "@/hooks/useLazyAd";

interface LazyNativeBannerAdProps {
  className?: string;
}

const LazyNativeBannerAd = ({ className = "" }: LazyNativeBannerAdProps) => {
  const { containerRef, isVisible } = useLazyAd({ rootMargin: "300px" });
  const scriptLoaded = useRef(false);
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || scriptLoaded.current || !adContainerRef.current) return;
    scriptLoaded.current = true;

    const container = adContainerRef.current;

    // Create the exact container div the ad network expects
    const adContainer = document.createElement('div');
    adContainer.id = `container-5dd29b78901106d681d1f5ce05a102b3-${Date.now()}`;
    container.appendChild(adContainer);

    // Create and inject the script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    
    container.appendChild(script);
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`flex justify-center my-4 min-h-[100px] ${className}`}>
      {isVisible ? (
        <div ref={adContainerRef} className="w-full flex justify-center" />
      ) : (
        <div className="w-full h-[100px] bg-muted/20 animate-pulse rounded" />
      )}
    </div>
  );
};

export default LazyNativeBannerAd;

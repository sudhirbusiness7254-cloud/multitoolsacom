import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useInViewport } from "@/hooks/useInViewport";

interface NativeBannerAdProps {
  className?: string;
}

const NativeBannerAd = ({ className = "" }: NativeBannerAdProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [adReady, setAdReady] = useState(false);

  // Only load ad when visible in viewport (with 100px margin)
  const isInViewport = useInViewport(wrapperRef, { rootMargin: "100px", triggerOnce: true });

  useEffect(() => {
    if (!containerRef.current || isLoaded || !isInViewport) return;

    // Create the script element
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js";
    script.onload = () => {
      setTimeout(() => setAdReady(true), 500);
    };

    // Create the container div for the ad
    const adContainer = document.createElement("div");
    adContainer.id = "container-5dd29b78901106d681d1f5ce05a102b3";

    containerRef.current.appendChild(script);
    containerRef.current.appendChild(adContainer);
    setIsLoaded(true);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isLoaded, isInViewport]);

  return (
    <div 
      ref={wrapperRef}
      className={`w-full flex justify-center py-4 relative min-h-[90px] ${className}`}
      aria-label="Advertisement"
    >
      {/* Skeleton placeholder */}
      {!adReady && (
        <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
          <Skeleton className="w-[90px] h-[60px] rounded-lg flex-shrink-0" />
          <div className="flex-1 max-w-md space-y-2">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-2/3 h-3" />
          </div>
          <Skeleton className="w-[80px] h-8 rounded-md flex-shrink-0" />
        </div>
      )}
      <div 
        ref={containerRef}
        className={`w-full ${adReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
};

export default NativeBannerAd;

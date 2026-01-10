import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useInViewport } from "@/hooks/useInViewport";

interface IframeAdProps {
  className?: string;
}

const IframeAd = ({ className = "" }: IframeAdProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [adReady, setAdReady] = useState(false);
  
  // Only load ad when visible in viewport (with 100px margin)
  const isInViewport = useInViewport(wrapperRef, { rootMargin: "100px", triggerOnce: true });

  useEffect(() => {
    if (!containerRef.current || isLoaded || !isInViewport) return;

    // Create ad script
    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '5251d00b938f369c8b531c0ce3b384bb',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    
    const invokeScript = document.createElement("script");
    invokeScript.src = "https://crowdsubsequentadmire.com/5251d00b938f369c8b531c0ce3b384bb/invoke.js";
    invokeScript.async = true;
    invokeScript.onload = () => {
      // Give the ad iframe time to render
      setTimeout(() => setAdReady(true), 500);
    };

    containerRef.current.appendChild(optionsScript);
    containerRef.current.appendChild(invokeScript);
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
      className={`hidden lg:flex flex-col items-center justify-start w-[160px] min-h-[600px] relative ${className}`}
      aria-label="Advertisement"
    >
      {/* Skeleton placeholder */}
      {!adReady && (
        <div className="absolute inset-0 flex flex-col gap-2 p-2">
          <Skeleton className="w-full h-[200px] rounded-lg" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-[150px] rounded-lg" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
          <Skeleton className="w-full h-[150px] rounded-lg" />
        </div>
      )}
      <div 
        ref={containerRef}
        className={`w-full h-full ${adReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
};

export default IframeAd;

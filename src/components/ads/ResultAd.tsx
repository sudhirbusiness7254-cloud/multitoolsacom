import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultAdProps {
  show: boolean;
  className?: string;
}

const ResultAd = ({ show, className = "" }: ResultAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !show || isLoaded) return;

    // Create ad script for result area (using iframe ad)
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
      setTimeout(() => setAdReady(true), 500);
    };

    containerRef.current.appendChild(optionsScript);
    containerRef.current.appendChild(invokeScript);
    setIsLoaded(true);
  }, [show, isLoaded]);

  if (!show) return null;

  return (
    <div 
      className={`w-full flex justify-center py-6 mt-6 border-t border-border relative min-h-[120px] ${className}`}
      aria-label="Advertisement"
    >
      {/* Skeleton placeholder */}
      {!adReady && (
        <div className="absolute inset-0 flex items-center justify-center gap-4 p-4 pt-10">
          <Skeleton className="w-[100px] h-[80px] rounded-lg flex-shrink-0" />
          <div className="flex-1 max-w-lg space-y-2">
            <Skeleton className="w-2/3 h-5" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-4/5 h-3" />
          </div>
          <Skeleton className="w-[90px] h-9 rounded-md flex-shrink-0" />
        </div>
      )}
      <div 
        ref={containerRef}
        className={`${adReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
};

export default ResultAd;

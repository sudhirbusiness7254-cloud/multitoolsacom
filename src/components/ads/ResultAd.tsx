import { useEffect, useRef, useState } from "react";

interface ResultAdProps {
  show: boolean;
  className?: string;
}

const ResultAd = ({ show, className = "" }: ResultAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

    containerRef.current.appendChild(optionsScript);
    containerRef.current.appendChild(invokeScript);
    setIsLoaded(true);
  }, [show, isLoaded]);

  if (!show) return null;

  return (
    <div 
      ref={containerRef}
      className={`w-full flex justify-center py-6 mt-6 border-t border-border ${className}`}
      aria-label="Advertisement"
    />
  );
};

export default ResultAd;

import { useEffect, useRef, useId } from "react";

interface NativeBannerAdProps {
  className?: string;
}

const NativeBannerAd = ({ className = "" }: NativeBannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the container div with the specific ID required by the ad network
    const adContainer = document.createElement('div');
    adContainer.id = 'container-5dd29b78901106d681d1f5ce05a102b3';
    containerRef.current.appendChild(adContainer);

    // Create and inject the script with async and data-cfasync attributes
    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    // Append script to document head for better loading
    document.head.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 ${className}`}
      data-ad-slot={uniqueId}
    />
  );
};

export default NativeBannerAd;

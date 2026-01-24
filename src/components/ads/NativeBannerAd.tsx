import { useEffect, useRef } from "react";

interface NativeBannerAdProps {
  className?: string;
}

const NativeBannerAd = ({ className = "" }: NativeBannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;

    // Create the container div with the specific ID
    const adContainer = document.createElement('div');
    adContainer.id = 'container-5dd29b78901106d681d1f5ce05a102b3';
    containerRef.current.appendChild(adContainer);

    // Create and inject the script
    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    containerRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 ${className}`}
    />
  );
};

export default NativeBannerAd;

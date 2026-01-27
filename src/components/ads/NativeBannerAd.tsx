import { useEffect, useRef } from "react";

interface NativeBannerAdProps {
  className?: string;
}

const NativeBannerAd = ({ className = "" }: NativeBannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;
    
    const container = containerRef.current;

    // Create the exact container div the ad network expects
    const adContainer = document.createElement('div');
    adContainer.id = 'container-5dd29b78901106d681d1f5ce05a102b3';
    container.appendChild(adContainer);

    // Create and inject the script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    
    container.appendChild(script);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 min-h-[100px] ${className}`}
    />
  );
};

export default NativeBannerAd;

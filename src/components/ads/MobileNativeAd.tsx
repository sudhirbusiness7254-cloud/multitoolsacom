import { useEffect, useRef } from "react";

interface MobileNativeAdProps {
  className?: string;
}

/**
 * Mobile & Tablet optimized Native Banner Ad
 * Only shows on mobile and tablet devices (hidden on lg+ screens)
 */
const MobileNativeAd = ({ className = "" }: MobileNativeAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;
    
    // Clear any existing content
    const container = containerRef.current;
    container.innerHTML = '';

    // Create the exact container div the ad network expects
    const adContainer = document.createElement('div');
    adContainer.id = 'container-5dd29b78901106d681d1f5ce05a102b3';
    container.appendChild(adContainer);

    // Create and inject the native banner script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    
    container.appendChild(script);

    return () => {
      initialized.current = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 lg:hidden min-h-[80px] ${className}`}
    />
  );
};

export default MobileNativeAd;

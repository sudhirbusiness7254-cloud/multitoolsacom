import { useEffect, useRef, useId } from "react";

interface MobileNativeAdProps {
  className?: string;
}

/**
 * Mobile & Tablet optimized Native Banner Ad
 * Only shows on mobile and tablet devices (hidden on lg+ screens)
 * Uses responsive sizing to fit smaller screens properly
 */
const MobileNativeAd = ({ className = "" }: MobileNativeAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const uniqueId = useId().replace(/:/g, '');
  const containerId = `mobile-native-${uniqueId}`;

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the container div with a unique ID
    const adContainer = document.createElement('div');
    adContainer.id = containerId;
    containerRef.current.appendChild(adContainer);

    // Create and inject the native banner script
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
  }, [containerId]);

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center my-4 lg:hidden ${className}`}
      data-ad-slot={uniqueId}
    />
  );
};

export default MobileNativeAd;
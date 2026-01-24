import { useEffect, useRef, useId } from "react";

interface TabletNativeAdProps {
  className?: string;
}

/**
 * Tablet optimized Native Banner Ad
 * Shows on tablet devices (md to lg screens)
 * Hidden on mobile and desktop
 */
const TabletNativeAd = ({ className = "" }: TabletNativeAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const uniqueId = useId().replace(/:/g, '');
  const containerId = `tablet-native-${uniqueId}`;

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
      className={`hidden md:flex lg:hidden justify-center my-4 ${className}`}
      data-ad-slot={uniqueId}
    />
  );
};

export default TabletNativeAd;
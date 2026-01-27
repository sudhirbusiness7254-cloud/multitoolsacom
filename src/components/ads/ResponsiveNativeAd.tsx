import { useEffect, useRef, useId } from "react";

interface ResponsiveNativeAdProps {
  className?: string;
  showOnMobile?: boolean;
  showOnTablet?: boolean;
  showOnDesktop?: boolean;
}

/**
 * Responsive Native Banner Ad
 * Configurable visibility for mobile, tablet, and desktop
 * Default: shows on all devices
 */
const ResponsiveNativeAd = ({ 
  className = "",
  showOnMobile = true,
  showOnTablet = true,
  showOnDesktop = true
}: ResponsiveNativeAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const uniqueId = useId().replace(/:/g, '');
  const containerId = `responsive-native-${uniqueId}`;

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    scriptLoaded.current = true;
    
    const container = containerRef.current;

    // Create the container div with a unique ID
    const adContainer = document.createElement('div');
    adContainer.id = containerId;
    container.appendChild(adContainer);

    // Create and inject the native banner script
    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    container.appendChild(script);
  }, [containerId]);

  // Build responsive visibility classes
  const getVisibilityClasses = () => {
    const classes: string[] = [];
    
    // Mobile (< 768px)
    if (!showOnMobile) classes.push('hidden md:flex');
    else if (!showOnTablet && !showOnDesktop) classes.push('flex md:hidden');
    
    // Tablet (768px - 1024px)
    if (!showOnTablet && showOnMobile && showOnDesktop) classes.push('flex md:hidden lg:flex');
    
    // Desktop (> 1024px)
    if (!showOnDesktop) classes.push('lg:hidden');
    
    // Default: show on all
    if (showOnMobile && showOnTablet && showOnDesktop) classes.push('flex');
    
    return classes.join(' ');
  };

  return (
    <div 
      ref={containerRef}
      className={`justify-center my-4 ${getVisibilityClasses()} ${className}`}
      data-ad-slot={uniqueId}
    />
  );
};

export default ResponsiveNativeAd;
import { useEffect, useRef, useId } from "react";

/**
 * Mobile Banner Ad (320x50)
 * Only shows on mobile devices (< 768px)
 */
const MobileBannerAd = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const uniqueId = useId().replace(/:/g, '');

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create atOptions script
    const optionsScript = document.createElement('script');
    optionsScript.textContent = `
      atOptions = {
        'key' : '689f23dcc2cd82711bf2ed6fa916f48f',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(optionsScript);

    // Create invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://crowdsubsequentadmire.com/689f23dcc2cd82711bf2ed6fa916f48f/invoke.js';
    invokeScript.async = true;
    
    containerRef.current.appendChild(invokeScript);
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
      className={`flex md:hidden justify-center my-3 ${className}`}
      data-ad-slot={`mobile-banner-${uniqueId}`}
      style={{ minHeight: '50px' }}
    />
  );
};

export default MobileBannerAd;

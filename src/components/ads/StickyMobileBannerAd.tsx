import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Sticky Bottom Banner Ad (320x50) for Mobile
 * Stays fixed at bottom of screen while scrolling
 * Only shows on mobile devices (< 768px)
 */
const StickyMobileBannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    
    // Delay loading for better initial page performance
    const loadTimer = setTimeout(() => {
      if (!containerRef.current) return;
      
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
      invokeScript.onload = () => setIsLoaded(true);
      
      containerRef.current.appendChild(invokeScript);
      scriptLoaded.current = true;
    }, 2000); // 2 second delay for better UX

    return () => clearTimeout(loadTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="relative flex justify-center items-center py-1">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 p-1 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close ad"
        >
          <X className="h-3 w-3" />
        </button>
        
        {/* Ad container */}
        <div 
          ref={containerRef}
          className="flex justify-center items-center"
          style={{ minWidth: '320px', minHeight: '50px' }}
        >
          {!isLoaded && (
            <div className="w-[320px] h-[50px] bg-muted/30 animate-pulse rounded" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyMobileBannerAd;

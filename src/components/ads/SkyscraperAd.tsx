import { useEffect, useRef } from "react";

interface SkyscraperAdProps {
  className?: string;
}

const SkyscraperAd = ({ className = "" }: SkyscraperAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !adRef.current) return;
    
    // Set atOptions on window
    (window as any).atOptions = {
      'key': '5251d00b938f369c8b531c0ce3b384bb',
      'format': 'iframe',
      'height': 600,
      'width': 160,
      'params': {}
    };

    // Create and inject the script
    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/5251d00b938f369c8b531c0ce3b384bb/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    adRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      // Cleanup on unmount
      if (adRef.current) {
        const scripts = adRef.current.querySelectorAll('script');
        scripts.forEach(s => s.remove());
      }
    };
  }, []);

  return (
    <div 
      ref={adRef}
      className={`flex items-center justify-center min-h-[600px] w-[160px] ${className}`}
      style={{ minWidth: '160px', minHeight: '600px' }}
    />
  );
};

export default SkyscraperAd;

import { useEffect, useRef } from "react";

const MobileToolAd = () => {
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
      if (adRef.current) {
        const scripts = adRef.current.querySelectorAll('script');
        scripts.forEach(s => s.remove());
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-6 lg:hidden">
      <div 
        ref={adRef}
        className="flex items-center justify-center"
        style={{ minWidth: '160px', minHeight: '600px' }}
      />
    </div>
  );
};

export default MobileToolAd;

import { useEffect, useRef, useState } from "react";

interface ToolSideAdProps {
  position?: 'left' | 'right';
}

const ToolSideAd = ({ position = 'left' }: ToolSideAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adId] = useState(() => `tool-side-ad-${position}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!adRef.current) return;
    
    // Clear any existing content
    adRef.current.innerHTML = '';
    
    // Create container for this specific ad instance
    const container = document.createElement('div');
    container.id = adId;
    adRef.current.appendChild(container);

    // Create options script
    const optionsScript = document.createElement('script');
    optionsScript.textContent = `
      var atOptions_${adId.replace(/-/g, '_')} = {
        'key' : '5251d00b938f369c8b531c0ce3b384bb',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
      window.atOptions = atOptions_${adId.replace(/-/g, '_')};
    `;
    container.appendChild(optionsScript);

    // Create and inject the invoke script
    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://crowdsubsequentadmire.com/5251d00b938f369c8b531c0ce3b384bb/invoke.js';
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    container.appendChild(invokeScript);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [adId]);

  return (
    <div 
      ref={adRef}
      className="hidden xl:flex items-start justify-center bg-muted/20 rounded-lg"
      style={{ width: '160px', minHeight: '600px' }}
    />
  );
};

export default ToolSideAd;

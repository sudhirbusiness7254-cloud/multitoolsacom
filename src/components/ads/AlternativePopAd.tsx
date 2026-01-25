import { useEffect, useRef } from "react";

/**
 * Alternative Pop Ad Script
 * Script: https://crowdsubsequentadmire.com/e1/c3/33/e1c333e3da3c7afb9b8f04a2c46ce800.js
 */
const AlternativePopAd = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="e1c333e3da3c7afb9b8f04a2c46ce800"]');
    if (existingScript) {
      initialized.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/e1/c3/33/e1c333e3da3c7afb9b8f04a2c46ce800.js';
    script.async = true;
    document.body.appendChild(script);
    
    initialized.current = true;

    return () => {
      // Don't remove on unmount as it's a global script
    };
  }, []);

  return null; // This is a global script, no visible element
};

export default AlternativePopAd;

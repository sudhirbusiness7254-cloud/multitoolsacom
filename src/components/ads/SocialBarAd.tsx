import { useEffect, useRef } from "react";

/**
 * Social Bar Ad - Fixed position ad
 * Script: https://crowdsubsequentadmire.com/d2/38/be/d238be637ad3b65e24ff2c4be4f5ab5d.js
 */
const SocialBarAd = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="d238be637ad3b65e24ff2c4be4f5ab5d"]');
    if (existingScript) {
      initialized.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/d2/38/be/d238be637ad3b65e24ff2c4be4f5ab5d.js';
    script.async = true;
    document.body.appendChild(script);
    
    initialized.current = true;

    return () => {
      // Don't remove on unmount as it's a global script
    };
  }, []);

  return null; // This is a global script, no visible element
};

export default SocialBarAd;

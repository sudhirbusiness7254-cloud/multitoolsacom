import { useEffect, useRef } from "react";

/**
 * Global Pop Ad Script
 * Script: https://crowdsubsequentadmire.com/ai5i3ds28?key=375b3f5bf5c990c0cff3c52135d03f85
 */
const GlobalPopAd = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="375b3f5bf5c990c0cff3c52135d03f85"]');
    if (existingScript) {
      initialized.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://crowdsubsequentadmire.com/ai5i3ds28?key=375b3f5bf5c990c0cff3c52135d03f85';
    script.async = true;
    document.body.appendChild(script);
    
    initialized.current = true;

    return () => {
      // Don't remove on unmount as it's a global script
    };
  }, []);

  return null; // This is a global script, no visible element
};

export default GlobalPopAd;

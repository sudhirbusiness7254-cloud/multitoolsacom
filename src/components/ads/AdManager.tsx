import { useEffect, useRef, useState, useCallback } from 'react';

interface AdScriptConfig {
  id: string;
  src: string;
}

// Ad script configurations - mapped to provided scripts
const AD_SCRIPTS: Record<string, AdScriptConfig> = {
  left: {
    id: 'ad-script-left',
    src: '//farawayaside.com/bXX.Vds/dfGLll0WYZWzcd/yecmb9Bu-ZCUtlqkoP/TTYY3xNlTEUUzfN/TSMKtYNhjsc/1ONvTbMz1/NbAd',
  },
  right: {
    id: 'ad-script-right',
    src: '//farawayaside.com/b/XkVhs.dsGQl/0aY/WncS/SeQmb9XuyZYUcl/k/PDTSYC3gNLT/UUz/N/Tpc/tQN/jQcB1pNwTTM/1/O-AE',
  },
  bottom: {
    id: 'ad-script-bottom',
    src: '//farawayaside.com/bUXgV.sZduG/lD0hYAW/co/keqmT9buiZ_Ukl/kXPiTVYE3NNOTFUrzkNWjNY/t/N/jjcS1mN/TRM/2/N-wQ',
  },
  video: {
    id: 'ad-script-video',
    src: '//farawayaside.com/b.XWV/sedXGDlg0mYfW-cP/veQmn9guCZuUel/kMPfTrYG3kNxThUpzYOsD/YGtLN/jic-1XNMT/ML4BN_wP',
  },
  inline: {
    id: 'ad-script-inline',
    src: '//farawayaside.com/b/X/V.sQdaGKlz0eYZWJcy/BeKmd9_u/ZlUQl-kVPaTnYP3/NPTyURzCNKTBMetMNljwcb1HNoTTMm1gNSAu',
  },
  exoticfat: {
    id: 'ad-script-exoticfat',
    src: '//exoticfat.com/bc3/VH0BP.3LpEvwb-mvV/J/Z/DX0/2CNRzkU-2iM/DdkL3RLoTJYL3kNJTFY_wUO/TvwI',
  },
  native: {
    id: 'ad-script-native',
    src: '//farawayaside.com/bUX.VcsYdsG/l/0ZYtWpcr/weOmG9xulZGU/ltkjPoTrYK3LN-TaUVzxOrDJYVt/N/jmcA1aNpTYMv4/NjwU',
  },
  popunder: {
    id: 'ad-script-popunder',
    src: '//adolescent-poem.com/c/DN9.6MbB2n5vl/SdWuQ/9VNrjbcj1UNhj-Ag5_Nrye0L2bN/z/Us2/MjDEkI4z',
  },
  push: {
    id: 'ad-script-push',
    src: '//farawayaside.com/b/XLV.sld/G/lg0-YXWHcw/_ejmR9cuMZiUZlmkvPsTaYu3NNUTMUZzEO/DKYQtbNDjgcF1CNATDMY4/NdwP',
  },
  banner: {
    id: 'ad-script-banner',
    src: '//farawayaside.com/bwXvVus.dNGIla0BY/Wycu/beymR9QupZKUolpkUPuTCY-3ZN_TwURzoNATtMGtdNyjUcR1yNcTvM/1KN/Ac',
  },
  sticky: {
    id: 'ad-script-sticky',
    src: '//farawayaside.com/bwXvVus.dNGIla0BY/Wycu/beymR9QupZKUolpkUPuTCY-3ZN_TwURzoNATtMGtdNyjUcR1yNcTvM/1KN/Ac',
  },
  // New Ad Scripts 1-6
  adunit1: {
    id: 'ad-script-unit1',
    src: '//farawayaside.com/bYX.VdsmdVG/lM0QYqWpck/ee/m-9suZZ/UGl/k/PuTcYY3KN/TAUQzaNoTEMvtENfjVcI1pNQTtMm1_NuAz',
  },
  adunit2: {
    id: 'ad-script-unit2',
    src: '//farawayaside.com/bTX/Vzs.dzGClO0/YaWdcu/XeUmG9zu/Z/UBlDkpPDTqYN3gNgTCU/zHN/TvcDtLNhjtcm1fNrT/M_1ROSAi',
  },
  adunit3: {
    id: 'ad-script-unit3',
    src: '//farawayaside.com/bRXYVGs.dcGYl/0vYPWNcc/Ke-mj9BuoZ/URlSkMPNTLYO3MNXTwUazJNvjXYKt/NdjPcn1/NfT/M/2hNlwx',
  },
  adunit4: {
    id: 'ad-script-unit4',
    src: '//adolescent-poem.com/dImGF.zFd/G/NIvtZ/GBUd/Re/ml9HuQZ/UylLkgPATvY-3ZNHT/UhzCNCzsgrtmNqjWcK1YNKTcMF3bORS/Z/s/a/W/1vpZdEDP0_xV',
  },
  adunit5: {
    id: 'ad-script-unit5',
    src: '//farawayaside.com/bYXWVUs/d.Gel/0oYYWDcT/SeBmu9hu/ZgUQlkkoPgTJYn3wN_TZU/zUOHDpYHtENkjnc/1/NYTbM/4GN/wr',
  },
  adunit6: {
    id: 'ad-script-unit6',
    src: '//adolescent-poem.com/csD.9w6/bj2P5elXSyWAQo9_NBjLcp1vNGjoAV5ENmyy0/2qNazKUN2cM/Ddkx4-',
  }
};

// Load ad script immediately without waiting - EAGER LOADING for instant ads
export const loadAdScript = (position: keyof typeof AD_SCRIPTS, container: HTMLElement | null): void => {
  if (!container) return;
  
  const config = AD_SCRIPTS[position];
  if (!config) return;
  
  // Check if this container already has a script loaded
  if (container.querySelector('script')) return;
  
  try {
    // Clear placeholder content first
    const placeholder = container.querySelector('.ad-placeholder');
    if (placeholder) {
      placeholder.remove();
    }
    
    // Create script exactly as provided by the ad network - NO DELAY
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = config.src;
    
    // Add load handler for debugging
    script.onload = () => {
      console.log(`Ad script loaded successfully: ${position}`);
    };
    
    script.onerror = (e) => {
      console.warn(`Ad script failed to load: ${position}`, e);
    };
    
    container.appendChild(script);
  } catch (error) {
    console.warn(`Failed to load ad script for ${position}:`, error);
  }
};

// Reset function for testing
export const resetAdScripts = (): void => {
  // Remove all ad scripts from DOM
  document.querySelectorAll('[id^="ad-script-"]').forEach(el => el.remove());
};

// Hook to manage ad loading - EAGER MODE: loads immediately on mount
export const useAdLoader = (position: keyof typeof AD_SCRIPTS) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Start visible immediately
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoaded) return;

    // EAGER LOAD: Load ad immediately on mount - no waiting for scroll
    setIsVisible(true);
    loadAdScript(position, container);
    setIsLoaded(true);
  }, [position, isLoaded]);

  return { containerRef, isVisible, isLoaded };
};

// Video ad loader - EAGER MODE with retry fallback for error 303
export const useVideoAdLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Start visible immediately
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const loadVideoAd = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing scripts for retry
    const existingScript = container.querySelector('script');
    if (existingScript && retryCount > 0) {
      existingScript.remove();
    }

    try {
      const config = AD_SCRIPTS.video;
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.src = config.src;
      
      script.onload = () => {
        console.log('Video ad script loaded successfully');
        setIsLoaded(true);
      };
      
      // Listen for errors and retry
      script.onerror = () => {
        console.warn(`Video ad failed to load, retry ${retryCount + 1}/${maxRetries}`);
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1500 * (retryCount + 1)); // Exponential backoff
        }
      };
      
      container.appendChild(script);
    } catch (error) {
      console.warn('Failed to load video ad:', error);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1500 * (retryCount + 1));
      }
    }
  }, [retryCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // EAGER LOAD: Load video ad immediately on mount
    if (!isLoaded || retryCount > 0) {
      loadVideoAd();
    }
  }, [loadVideoAd, isLoaded, retryCount]);

  return { containerRef, isVisible, isLoaded };
};

// Popunder ad loader - ONE TIME per session using sessionStorage (resets on new tab)
export const usePopunderLoader = () => {
  const [hasShown, setHasShown] = useState(false);
  const STORAGE_KEY = 'multitoolsa_popunder_session';

  useEffect(() => {
    // Check if popunder was already shown in this session
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    // Load popunder script on first user interaction (click)
    const handleFirstClick = (e: MouseEvent) => {
      if (hasShown) return;
      
      try {
        const config = AD_SCRIPTS.popunder;
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = config.src;
        
        script.onload = () => {
          console.log('Popunder ad script loaded');
        };
        
        document.body.appendChild(script);
        
        // Mark as shown in sessionStorage (resets on new tab/session)
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setHasShown(true);
        
        console.log('Popunder triggered on first click');
      } catch (error) {
        console.warn('Failed to load popunder ad:', error);
      }
    };

    // Add click listener for popunder - use capture phase for earlier trigger
    document.addEventListener('click', handleFirstClick, { once: true, capture: true });

    return () => {
      document.removeEventListener('click', handleFirstClick, { capture: true } as EventListenerOptions);
    };
  }, [hasShown]);

  return { hasShown };
};

export default AD_SCRIPTS;

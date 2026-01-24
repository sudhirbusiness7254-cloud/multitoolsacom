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
  popunder: {
    id: 'ad-script-popunder',
    src: '//farawayaside.com/400/8916008',
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
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = config.src;
    (script as any).settings = {};
    
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
  const maxRetries = 2;

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
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.src = config.src;
      (script as any).settings = {};
      
      // Listen for errors and retry
      script.onerror = () => {
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1000 * (retryCount + 1)); // Exponential backoff
        }
      };
      
      container.appendChild(script);
      setIsLoaded(true);
    } catch (error) {
      console.warn('Failed to load video ad:', error);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1000 * (retryCount + 1));
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

// Popunder ad loader - ONE TIME per user using localStorage
export const usePopunderLoader = () => {
  const [hasShown, setHasShown] = useState(false);
  const STORAGE_KEY = 'multitoolsa_popunder_shown';

  useEffect(() => {
    // Check if popunder was already shown to this user
    const alreadyShown = localStorage.getItem(STORAGE_KEY);
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    // Load popunder script on first user interaction (click)
    const handleFirstClick = () => {
      if (hasShown) return;
      
      try {
        const config = AD_SCRIPTS.popunder;
        const script = document.createElement('script');
        script.async = true;
        script.src = config.src;
        document.body.appendChild(script);
        
        // Mark as shown in localStorage
        localStorage.setItem(STORAGE_KEY, 'true');
        setHasShown(true);
        
        // Remove click listener after first trigger
        document.removeEventListener('click', handleFirstClick);
      } catch (error) {
        console.warn('Failed to load popunder ad:', error);
      }
    };

    // Add click listener for popunder
    document.addEventListener('click', handleFirstClick, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, [hasShown]);

  return { hasShown };
};

export default AD_SCRIPTS;

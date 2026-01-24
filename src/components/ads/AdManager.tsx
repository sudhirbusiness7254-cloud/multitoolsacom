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
  }
};

// Load ad script using the exact format provided - optimized for performance
export const loadAdScript = (position: keyof typeof AD_SCRIPTS, container: HTMLElement | null): void => {
  if (!container) return;
  
  const config = AD_SCRIPTS[position];
  if (!config) return;
  
  // Check if this container already has a script loaded
  if (container.querySelector('script')) return;
  
  // Use requestIdleCallback for non-critical ad loading (better Core Web Vitals)
  const loadScript = () => {
    try {
      // Clear placeholder content first
      const placeholder = container.querySelector('.ad-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
      
      // Create script exactly as provided by the ad network
      const script = document.createElement('script');
      script.async = true;
      script.defer = true; // Added defer for better performance
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.src = config.src;
      (script as any).settings = {};
      
      container.appendChild(script);
    } catch (error) {
      console.warn(`Failed to load ad script for ${position}:`, error);
    }
  };

  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(loadScript, { timeout: 2000 });
  } else {
    setTimeout(loadScript, 50);
  }
};

// Reset function for testing
export const resetAdScripts = (): void => {
  // Remove all ad scripts from DOM
  document.querySelectorAll('[id^="ad-script-"]').forEach(el => el.remove());
};

// Hook to manage ad loading with scroll-triggered visibility - optimized for CWV
export const useAdLoader = (position: keyof typeof AD_SCRIPTS) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoaded) {
        setIsVisible(true);
        // Delay ad load to not block main thread
        requestAnimationFrame(() => {
          loadAdScript(position, containerRef.current);
          setIsLoaded(true);
        });
        observerRef.current?.disconnect();
      }
    });
  }, [position, isLoaded]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.01, // Lower threshold for earlier detection
        rootMargin: '500px' // Preload much earlier - 500px before visible for instant loading
      });

      observerRef.current.observe(container);
    } else {
      // Fallback for browsers without IntersectionObserver - load immediately
      setIsVisible(true);
      loadAdScript(position, container);
      setIsLoaded(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [position, handleIntersection]);

  return { containerRef, isVisible, isLoaded };
};

// Video ad loader - optimized for Core Web Vitals with lazy loading
export const useVideoAdLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoaded) {
        setIsVisible(true);
        // Use requestAnimationFrame to avoid blocking main thread
        requestAnimationFrame(() => {
          loadAdScript('video', containerRef.current);
          setIsLoaded(true);
        });
        observerRef.current?.disconnect();
      }
    });
  }, [isLoaded]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.01, // Lower threshold for earlier detection
        rootMargin: '600px' // Video ads preload even earlier (600px before visible) for instant loading
      });

      observerRef.current.observe(container);
    } else {
      // Fallback for browsers without IntersectionObserver - load immediately
      setIsVisible(true);
      loadAdScript('video', container);
      setIsLoaded(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersection]);

  return { containerRef, isVisible, isLoaded };
};

export default AD_SCRIPTS;

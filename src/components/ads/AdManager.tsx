import { useEffect, useRef, useState } from 'react';

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
  }
};

// Load ad script using the exact format provided
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
    
    // Create script exactly as provided by the ad network
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

// Hook to manage ad loading with scroll-triggered visibility
export const useAdLoader = (position: keyof typeof AD_SCRIPTS) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let observer: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              setIsVisible(true);
              // Small delay to allow visibility transition, then load ad
              setTimeout(() => {
                loadAdScript(position, container);
                setIsLoaded(true);
              }, 100);
              observer?.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );

      observer.observe(container);
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsVisible(true);
      setTimeout(() => {
        loadAdScript(position, container);
        setIsLoaded(true);
      }, 300);
    }

    return () => {
      observer?.disconnect();
    };
  }, [position, isLoaded]);

  return { containerRef, isVisible };
};

// Video ad loader - loads when scrolled into view
export const useVideoAdLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let observer: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              setIsVisible(true);
              // Load ad when visible
              setTimeout(() => {
                loadAdScript('video', container);
                setIsLoaded(true);
              }, 100);
              observer?.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );

      observer.observe(container);
    } else {
      // Fallback
      setIsVisible(true);
      setTimeout(() => {
        loadAdScript('video', container);
        setIsLoaded(true);
      }, 300);
    }

    return () => {
      observer?.disconnect();
    };
  }, [isLoaded]);

  return { containerRef, isVisible };
};

export default AD_SCRIPTS;

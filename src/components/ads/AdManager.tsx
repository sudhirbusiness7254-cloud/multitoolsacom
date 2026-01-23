import { useEffect, useRef } from 'react';

// Track which scripts have been loaded to prevent duplicates
const loadedScripts = new Set<string>();
// Track which containers have loaded ads
const loadedContainers = new Set<string>();

interface AdScriptConfig {
  id: string;
  src: string;
  settings: Record<string, unknown>;
}

// Ad script configurations - mapped to provided scripts
const AD_SCRIPTS: Record<string, AdScriptConfig> = {
  left: {
    id: 'ad-script-left',
    src: '//farawayaside.com/bXX.Vds/dfGLll0WYZWzcd/yecmb9Bu-ZCUtlqkoP/TTYY3xNlTEUUzfN/TSMKtYNhjsc/1ONvTbMz1/NbAd',
    settings: {}
  },
  right: {
    id: 'ad-script-right',
    src: '//farawayaside.com/b/XkVhs.dsGQl/0aY/WncS/SeQmb9XuyZYUcl/k/PDTSYC3gNLT/UUz/N/Tpc/tQN/jQcB1pNwTTM/1/O-AE',
    settings: {}
  },
  bottom: {
    id: 'ad-script-bottom',
    src: '//farawayaside.com/bUXgV.sZduG/lD0hYAW/co/keqmT9buiZ_Ukl/kXPiTVYE3NNOTFUrzkNWjNY/t/N/jjcS1mN/TRM/2/N-wQ',
    settings: {}
  },
  video: {
    id: 'ad-script-video',
    src: '//farawayaside.com/b.XWV/sedXGDlg0mYfW-cP/veQmn9guCZuUel/kMPfTrYG3kNxThUpzYOsD/YGtLN/jic-1XNMT/ML4BN_wP',
    settings: {}
  },
  inline: {
    id: 'ad-script-inline',
    src: '//farawayaside.com/b/X/V.sQdaGKlz0eYZWJcy/BeKmd9_u/ZlUQl-kVPaTnYP3/NPTyURzCNKTBMetMNljwcb1HNoTTMm1gNSAu',
    settings: {}
  }
};

// Load a single ad script safely
export const loadAdScript = (position: keyof typeof AD_SCRIPTS, container: HTMLElement | null): void => {
  if (!container) return;
  
  const config = AD_SCRIPTS[position];
  if (!config) return;
  
  // Create unique key for this container instance
  const containerKey = `${config.id}-${container.id || Math.random().toString(36).substr(2, 9)}`;
  
  // Prevent duplicate loading for same container
  if (loadedContainers.has(containerKey)) return;
  loadedContainers.add(containerKey);
  
  // Prevent duplicate script loading globally
  if (loadedScripts.has(config.id)) return;
  loadedScripts.add(config.id);
  
  try {
    const script = document.createElement('script');
    script.id = config.id;
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = config.src;
    (script as any).settings = config.settings;
    
    // Clear placeholder content
    const placeholder = container.querySelector('.ad-placeholder');
    if (placeholder) {
      placeholder.remove();
    }
    
    container.appendChild(script);
  } catch (error) {
    console.warn(`Failed to load ad script for ${position}:`, error);
  }
};

// Reset loaded scripts (useful for SPA navigation)
export const resetAdScripts = (): void => {
  loadedScripts.clear();
  loadedContainers.clear();
};

// Hook to manage ad loading for a specific position
export const useAdLoader = (position: keyof typeof AD_SCRIPTS) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    
    // Small delay to ensure DOM is ready and page is fully rendered
    const timer = setTimeout(() => {
      if (containerRef.current && !hasLoaded.current) {
        loadAdScript(position, containerRef.current);
        hasLoaded.current = true;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [position]);

  return containerRef;
};

// Video ad loader - auto-plays when visible
export const useVideoAdLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    
    const loadVideoAd = () => {
      if (containerRef.current && !hasLoaded.current) {
        loadAdScript('video', containerRef.current);
        hasLoaded.current = true;
      }
    };

    // Use Intersection Observer to load video ad when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideoAd();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return containerRef;
};

export default AD_SCRIPTS;

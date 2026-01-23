import { useEffect, useRef } from 'react';

// Track which scripts have been loaded to prevent duplicates
const loadedScripts = new Set<string>();

interface AdScriptConfig {
  id: string;
  src: string;
  settings: Record<string, unknown>;
}

// Ad script configurations
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
  }
};

// Load a single ad script safely
export const loadAdScript = (position: keyof typeof AD_SCRIPTS, container: HTMLElement | null): void => {
  if (!container) return;
  
  const config = AD_SCRIPTS[position];
  if (!config) return;
  
  // Prevent duplicate loading
  if (loadedScripts.has(config.id)) return;
  loadedScripts.add(config.id);
  
  try {
    const script = document.createElement('script');
    script.id = config.id;
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = config.src;
    (script as any).settings = config.settings;
    
    container.appendChild(script);
  } catch (error) {
    console.warn(`Failed to load ad script for ${position}:`, error);
  }
};

// Reset loaded scripts (useful for SPA navigation)
export const resetAdScripts = (): void => {
  loadedScripts.clear();
};

// Hook to manage ad loading for a specific position
export const useAdLoader = (position: keyof typeof AD_SCRIPTS) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (containerRef.current && !hasLoaded.current) {
        loadAdScript(position, containerRef.current);
        hasLoaded.current = true;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [position]);

  return containerRef;
};

export default AD_SCRIPTS;

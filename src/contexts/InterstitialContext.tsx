import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface InterstitialContextType {
  showInterstitial: boolean;
  triggerNavigation: (to: string) => void;
  closeInterstitial: () => void;
}

const InterstitialContext = createContext<InterstitialContextType | null>(null);

const STORAGE_KEY = 'multitoolsa_interstitial_count';
const MAX_INTERSTITIALS_PER_SESSION = 3;
const MIN_PAGES_BETWEEN_ADS = 2;

const TOOL_PAGE_PATTERNS = [
  '/image-',
  '/photo-',
  '/pdf-',
  '/ai-',
  '/compress',
  '/convert',
  '/resize',
  '/crop',
  '/rotate',
  '/watermark',
  '/merge',
  '/split',
  '/jpg-',
  '/png-',
  '/webp-',
  '/gif-',
  '/heic-',
  '/bmp-',
  '/tiff-',
];

export const InterstitialProvider = ({ children }: { children: ReactNode }) => {
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pageCount = useRef(0);
  const interstitialCount = useRef(0);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      interstitialCount.current = parseInt(stored, 10);
    }
  }, []);

  // Increment page count on location change
  useEffect(() => {
    pageCount.current += 1;
  }, [location.pathname]);

  const isToolPage = useCallback((path: string) => {
    return TOOL_PAGE_PATTERNS.some(pattern => path.includes(pattern));
  }, []);

  const shouldShowInterstitial = useCallback(() => {
    if (interstitialCount.current >= MAX_INTERSTITIALS_PER_SESSION) {
      return false;
    }
    if (pageCount.current < MIN_PAGES_BETWEEN_ADS) {
      return false;
    }
    return true;
  }, []);

  const triggerNavigation = useCallback((to: string) => {
    const isFromTool = isToolPage(location.pathname);
    const isToTool = isToolPage(to);

    if (isFromTool && isToTool && shouldShowInterstitial()) {
      setPendingNavigation(to);
      setShowInterstitial(true);
      pageCount.current = 0;
      interstitialCount.current += 1;
      sessionStorage.setItem(STORAGE_KEY, interstitialCount.current.toString());
    } else {
      navigate(to);
    }
  }, [location.pathname, isToolPage, shouldShowInterstitial, navigate]);

  const closeInterstitial = useCallback(() => {
    setShowInterstitial(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [pendingNavigation, navigate]);

  return (
    <InterstitialContext.Provider value={{ showInterstitial, triggerNavigation, closeInterstitial }}>
      {children}
    </InterstitialContext.Provider>
  );
};

export const useInterstitial = () => {
  const context = useContext(InterstitialContext);
  if (!context) {
    throw new Error('useInterstitial must be used within InterstitialProvider');
  }
  return context;
};

export default InterstitialProvider;

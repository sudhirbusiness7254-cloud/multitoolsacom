import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SafeBannerAd from "./SafeBannerAd";

/**
 * Sticky Bottom Banner Ad (320x50) for Mobile
 * Stays fixed at bottom of screen while scrolling
 * Only shows on mobile devices (< 768px)
 * Uses safe iframe-based banner only
 */
const StickyMobileBannerAd = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay for better UX

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="relative flex justify-center items-center py-1">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 p-1 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close ad"
        >
          <X className="h-3 w-3" />
        </button>
        
        {/* Safe iframe-based banner ad */}
        <SafeBannerAd size="320x50" lazy={false} />
      </div>
    </div>
  );
};

export default StickyMobileBannerAd;

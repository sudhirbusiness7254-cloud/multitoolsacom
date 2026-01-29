import SafeBannerAd from "./SafeBannerAd";

/**
 * Desktop Leaderboard Ad (728x90)
 * Shows on desktop/tablet only
 */
export const LeaderboardAd = ({ className = "" }: { className?: string }) => (
  <div className={`hidden md:flex justify-center my-4 ${className}`}>
    <SafeBannerAd size="728x90" />
  </div>
);

/**
 * Desktop Full Banner Ad (468x60)
 * Shows on desktop/tablet only
 */
export const FullBannerAd = ({ className = "" }: { className?: string }) => (
  <div className={`hidden md:flex justify-center my-4 ${className}`}>
    <SafeBannerAd size="468x60" />
  </div>
);

/**
 * Mobile Banner Ad (320x50)
 * Shows on mobile only
 */
export const MobileSafeBannerAd = ({ className = "" }: { className?: string }) => (
  <div className={`flex md:hidden justify-center my-3 ${className}`}>
    <SafeBannerAd size="320x50" />
  </div>
);

/**
 * Sticky Mobile Banner Ad (320x50)
 * Fixed at bottom on mobile only, with dismiss option
 */
export const StickyMobileSafeBannerAd = ({ onDismiss }: { onDismiss?: () => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-center bg-background/95 backdrop-blur-sm border-t border-border py-2">
      <SafeBannerAd size="320x50" lazy={false} />
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="absolute top-1 right-2 text-muted-foreground hover:text-foreground text-xs"
          aria-label="Dismiss ad"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/**
 * Medium Rectangle Ad (300x250)
 * Good for content areas
 */
export const MediumRectangleAd = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center my-4 ${className}`}>
    <SafeBannerAd size="300x250" />
  </div>
);

/**
 * Half Page Ad (160x300)
 * Good for sidebars
 */
export const HalfPageAd = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center my-4 ${className}`}>
    <SafeBannerAd size="160x300" />
  </div>
);

/**
 * Skyscraper Ad (160x600)
 * Best for fixed sidebars
 */
export const SkyscraperSafeAd = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center ${className}`}>
    <SafeBannerAd size="160x600" />
  </div>
);

/**
 * Side Ads Container - Shows skyscraper ads on desktop sides
 * Desktop only (xl+ screens)
 */
export const SideAdsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full">
      {/* Left Skyscraper - Desktop only */}
      <div className="hidden xl:block fixed left-2 2xl:left-8 top-1/2 -translate-y-1/2 z-40">
        <SafeBannerAd size="160x600" />
      </div>
      
      {/* Right Skyscraper - Desktop only */}
      <div className="hidden xl:block fixed right-2 2xl:right-8 top-1/2 -translate-y-1/2 z-40">
        <SafeBannerAd size="160x600" />
      </div>
      
      {children}
    </div>
  );
};

/**
 * Responsive Content Ad
 * Shows 728x90 on desktop, 320x50 on mobile
 */
export const ResponsiveContentAd = ({ className = "" }: { className?: string }) => (
  <div className={`my-4 ${className}`}>
    {/* Desktop */}
    <div className="hidden md:flex justify-center">
      <SafeBannerAd size="728x90" />
    </div>
    {/* Mobile */}
    <div className="flex md:hidden justify-center">
      <SafeBannerAd size="320x50" />
    </div>
  </div>
);

/**
 * Before Tool Ad Block
 * Responsive ad placement before tool input
 */
export const BeforeToolAd = ({ className = "" }: { className?: string }) => (
  <div className={`w-full my-4 ${className}`}>
    {/* Desktop: Leaderboard or Full Banner */}
    <div className="hidden lg:flex justify-center">
      <SafeBannerAd size="728x90" />
    </div>
    {/* Tablet */}
    <div className="hidden md:flex lg:hidden justify-center">
      <SafeBannerAd size="468x60" />
    </div>
    {/* Mobile */}
    <div className="flex md:hidden justify-center">
      <SafeBannerAd size="320x50" />
    </div>
  </div>
);

/**
 * After Tool Ad Block
 * Responsive ad placement after tool output
 */
export const AfterToolAd = ({ className = "" }: { className?: string }) => (
  <div className={`w-full my-6 ${className}`}>
    {/* Desktop: Medium Rectangle or Leaderboard */}
    <div className="hidden lg:flex justify-center">
      <SafeBannerAd size="300x250" />
    </div>
    {/* Tablet */}
    <div className="hidden md:flex lg:hidden justify-center">
      <SafeBannerAd size="468x60" />
    </div>
    {/* Mobile */}
    <div className="flex md:hidden justify-center">
      <SafeBannerAd size="320x50" />
    </div>
  </div>
);

/**
 * Sidebar Ad Block
 * Desktop only sidebar placement
 */
export const SidebarAd = ({ className = "" }: { className?: string }) => (
  <div className={`hidden lg:flex flex-col gap-4 ${className}`}>
    <SafeBannerAd size="160x600" />
  </div>
);

export default {
  LeaderboardAd,
  FullBannerAd,
  MobileSafeBannerAd,
  StickyMobileSafeBannerAd,
  MediumRectangleAd,
  HalfPageAd,
  SkyscraperSafeAd,
  SideAdsContainer,
  ResponsiveContentAd,
  BeforeToolAd,
  AfterToolAd,
  SidebarAd,
};

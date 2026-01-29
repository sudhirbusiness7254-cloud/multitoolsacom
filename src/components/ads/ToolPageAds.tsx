import SafeBannerAd from "./SafeBannerAd";
import { ResponsiveContentAd } from "./SafeAdPlacements";

/**
 * Side Ads Container - Shows safe skyscraper ads on desktop sides
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
 * Below Tool Ad Block - Shows safe banner ads below the tool interface
 */
export const BelowToolAds = () => {
  return (
    <div className="w-full mt-6">
      <ResponsiveContentAd />
    </div>
  );
};

/**
 * Content Section Ad - Safe banner ad between content sections
 */
export const ContentSectionAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full my-6 ${className}`}>
      <ResponsiveContentAd />
    </div>
  );
};

/**
 * Legacy NativeAdBlock replacement - uses safe banners
 */
export const NativeAdBlock = ({ className = "" }: { className?: string }) => {
  return <ResponsiveContentAd className={className} />;
};

export default {
  SideAdsContainer,
  BelowToolAds,
  ContentSectionAd,
  NativeAdBlock,
};

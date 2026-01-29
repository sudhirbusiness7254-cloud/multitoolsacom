import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy MobileNativeAd replacement - uses safe 320x50 banner
 */
const MobileNativeAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex lg:hidden justify-center my-4 ${className}`}>
      <SafeBannerAd size="320x50" />
    </div>
  );
};

export default MobileNativeAd;

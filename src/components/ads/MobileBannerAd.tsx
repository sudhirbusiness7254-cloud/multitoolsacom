import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy MobileBannerAd replacement - uses safe 320x50 banner
 */
const MobileBannerAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex md:hidden justify-center my-3 ${className}`}>
      <SafeBannerAd size="320x50" />
    </div>
  );
};

export default MobileBannerAd;

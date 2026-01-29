import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy MobileToolAd replacement - uses safe 320x50 banner
 */
const MobileToolAd = () => {
  return (
    <div className="flex justify-center my-6 lg:hidden">
      <SafeBannerAd size="320x50" />
    </div>
  );
};

export default MobileToolAd;

import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy LazyMobileBannerAd replacement - uses safe 320x50 banner
 */
const LazyMobileBannerAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex md:hidden justify-center my-3 ${className}`}>
      <SafeBannerAd size="320x50" lazy={true} />
    </div>
  );
};

export default LazyMobileBannerAd;

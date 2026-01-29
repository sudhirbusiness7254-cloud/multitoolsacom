import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy LazySkyscraperAd replacement - uses safe 160x600 banner
 */
const LazySkyscraperAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <SafeBannerAd size="160x600" lazy={true} />
    </div>
  );
};

export default LazySkyscraperAd;

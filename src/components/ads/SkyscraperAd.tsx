import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy SkyscraperAd replacement - uses safe 160x600 banner
 */
const SkyscraperAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <SafeBannerAd size="160x600" />
    </div>
  );
};

export default SkyscraperAd;

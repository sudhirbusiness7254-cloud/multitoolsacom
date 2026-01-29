import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy InContentAd replacement - uses safe 300x250 banner
 */
const InContentAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <SafeBannerAd size="300x250" />
    </div>
  );
};

export default InContentAd;

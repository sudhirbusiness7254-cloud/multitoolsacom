import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy NativeBannerAd replacement - uses safe 728x90 banner on desktop
 */
const NativeBannerAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <SafeBannerAd size="728x90" />
    </div>
  );
};

export default NativeBannerAd;

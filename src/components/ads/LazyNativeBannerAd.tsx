import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy LazyNativeBannerAd replacement - uses safe 728x90 banner
 */
const LazyNativeBannerAd = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <SafeBannerAd size="728x90" lazy={true} />
    </div>
  );
};

export default LazyNativeBannerAd;

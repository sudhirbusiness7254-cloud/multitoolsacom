import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy AdBanner replacement - uses SafeBannerAd
 */
interface AdBannerProps {
  adKey?: string;
  width?: number;
  height?: number;
  className?: string;
}

const AdBanner = ({ width = 728, height = 90, className = "" }: AdBannerProps) => {
  // Map legacy dimensions to SafeBannerAd sizes
  let size: "160x600" | "320x50" | "160x300" | "300x250" | "468x60" | "728x90" = "728x90";
  
  if (width === 160 && height === 600) size = "160x600";
  else if (width === 320 && height === 50) size = "320x50";
  else if (width === 160 && height === 300) size = "160x300";
  else if (width === 300 && height === 250) size = "300x250";
  else if (width === 468 && height === 60) size = "468x60";
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <SafeBannerAd size={size} />
    </div>
  );
};

export default AdBanner;

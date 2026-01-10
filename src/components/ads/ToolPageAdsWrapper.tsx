import IframeAd from "./IframeAd";

interface ToolPageAdsWrapperProps {
  children: React.ReactNode;
}

const ToolPageAdsWrapper = ({ children }: ToolPageAdsWrapperProps) => {
  return (
    <div className="flex justify-center items-start gap-4 w-full">
      {/* Left Side Ad - Hidden on mobile/tablet */}
      <div className="hidden xl:block sticky top-24 flex-shrink-0">
        <IframeAd />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        {children}
      </div>

      {/* Right Side Ad - Hidden on mobile/tablet */}
      <div className="hidden xl:block sticky top-24 flex-shrink-0">
        <IframeAd />
      </div>
    </div>
  );
};

export default ToolPageAdsWrapper;

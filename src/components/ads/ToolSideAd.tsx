import SafeBannerAd from "./SafeBannerAd";

/**
 * Legacy ToolSideAd replacement - uses safe 160x600 banner
 */
const ToolSideAd = () => {
  return (
    <div className="flex items-start justify-center">
      <SafeBannerAd size="160x600" />
    </div>
  );
};

export default ToolSideAd;

import LazySkyscraperAd from "./LazySkyscraperAd";

const SideAds = () => {
  return (
    <>
      {/* Left Side Ad - Fixed position, hidden on smaller screens */}
      <div className="hidden 2xl:block fixed left-2 top-1/2 -translate-y-1/2 z-40">
        <LazySkyscraperAd />
      </div>
      
      {/* Right Side Ad - Fixed position, hidden on smaller screens */}
      <div className="hidden 2xl:block fixed right-2 top-1/2 -translate-y-1/2 z-40">
        <LazySkyscraperAd />
      </div>
    </>
  );
};

export default SideAds;

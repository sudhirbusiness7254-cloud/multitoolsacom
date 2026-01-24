import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AdLeft, AdRight, AdVideoSide, AdStickyMobile } from './AdContainer';
import InterstitialAd from './InterstitialAd';
import { resetAdScripts } from './AdManager';
import { useInterstitial } from '@/contexts/InterstitialContext';

interface AdLayoutProps {
  children: ReactNode;
}

// Pages where side ads should be hidden (e.g., full-width editors)
const HIDE_SIDE_ADS_ON = [
  '/image-editor',
];

const AdLayout = ({ children }: AdLayoutProps) => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const { showInterstitial, closeInterstitial } = useInterstitial();

  // Reset ad tracking on significant route changes to allow fresh loads
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  const hideSideAds = HIDE_SIDE_ADS_ON.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Side Ads - Desktop Only (XL screens), Hidden on certain pages */}
      {!hideSideAds && (
        <>
          <AdLeft />
          <AdRight />
          <AdVideoSide position="left" />
        </>
      )}
      
      {/* Mobile Sticky Bottom Ad */}
      <AdStickyMobile />
      
      {/* Interstitial Ad - Shows during page transitions */}
      <InterstitialAd 
        isOpen={showInterstitial} 
        onClose={closeInterstitial}
        countdownSeconds={5}
      />
      
      {/* Main Content */}
      <div className="pb-[70px] xl:pb-0">
        {children}
      </div>
    </>
  );
};

export default AdLayout;

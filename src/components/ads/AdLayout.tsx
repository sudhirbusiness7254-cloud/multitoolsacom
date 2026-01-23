import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AdLeft, AdRight, AdVideoSide } from './AdContainer';
import { resetAdScripts } from './AdManager';

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

  // Reset ad tracking on significant route changes to allow fresh loads
  useEffect(() => {
    // Only reset if navigating to a completely different page
    if (prevPath.current !== location.pathname) {
      // Don't reset ads on every navigation - keep them loaded
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
          {/* Side Video Ads - Bottom corners */}
          <AdVideoSide position="left" />
        </>
      )}
      
      {/* Main Content with padding for side ads on XL screens */}
      {/* Main Content - keep full-width (no reserved side padding) */}
      <div>
        {children}
      </div>
    </>
  );
};

export default AdLayout;

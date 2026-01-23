import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdLeft, AdRight } from './AdContainer';
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
  
  // Reset ad tracking on route change to allow fresh loads
  useEffect(() => {
    // Don't reset immediately to prevent double-loading
    // Scripts loaded on previous page will remain
  }, [location.pathname]);

  const hideSideAds = HIDE_SIDE_ADS_ON.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Side Ads - Desktop Only, Hidden on certain pages */}
      {!hideSideAds && (
        <>
          <AdLeft />
          <AdRight />
        </>
      )}
      
      {/* Main Content with padding for side ads on XL screens */}
      <div className={!hideSideAds ? 'xl:px-[180px]' : ''}>
        {children}
      </div>
    </>
  );
};

export default AdLayout;

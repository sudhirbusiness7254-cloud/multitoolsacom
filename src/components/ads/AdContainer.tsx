import { useState } from 'react';
import { X } from 'lucide-react';
import { useAdLoader, useVideoAdLoader, usePopunderLoader } from './AdManager';

interface AdContainerProps {
  position: 'left' | 'right' | 'bottom' | 'video' | 'inline' | 'exoticfat';
  className?: string;
}

// Skeleton placeholder component with shimmer animation
const AdSkeleton = ({ className = '', aspectRatio }: { className?: string; aspectRatio?: string }) => (
  <div 
    className={`ad-skeleton relative overflow-hidden bg-secondary/30 rounded-lg ${className}`}
    style={aspectRatio ? { aspectRatio } : undefined}
  >
    {/* Shimmer overlay */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="flex items-center justify-center h-full">
      <span className="text-xs text-muted-foreground/40">Ad</span>
    </div>
  </div>
);

// Hilltop Banner Ads - Static image banners (728x90)
export const HilltopBanner = ({ variant = 1, className = '' }: { variant?: 1 | 2; className?: string }) => {
  const bannerSrc = variant === 1 
    ? '//static.hilltopads.com/other/banners/pub/get_high_ecpm/728x90.gif?v=1769176963'
    : '//static.hilltopads.com/other/banners/pub/huge_income/728x90.gif?v=1769176963';
  
  return (
    <div className={`flex justify-center ${className}`}>
      <a 
        href="https://hilltopads.com/?ref=358489" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block max-w-full overflow-hidden hover:opacity-90 transition-opacity"
      >
        <img 
          src={bannerSrc} 
          alt="Advertisement" 
          className="max-w-full h-auto"
          style={{ maxHeight: '90px' }}
          loading="eager"
        />
      </a>
    </div>
  );
};

// Left side ad - Desktop only (XL screens 1280px+)
export const AdLeft = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('left');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-left hidden xl:block fixed left-2 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="h-[600px]" />}
    </div>
  );
};

// Right side ad - Desktop only (XL screens 1280px+)
export const AdRight = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('right');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-right hidden xl:block fixed right-2 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="h-[600px]" />}
    </div>
  );
};

// Bottom ad - All devices, shows below tool/content
export const AdBottom = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('bottom');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-bottom w-full max-w-4xl mx-auto my-8 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Video ad - Lazy loaded with CWV optimization (Desktop: 220-260px width, 120-150px height, 16:9)
export const AdVideo = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useVideoAdLoader();
  
  return (
    <div 
      ref={containerRef}
      className={`ad-video w-full max-w-[260px] mx-auto my-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Video Advertisement"
      role="complementary"
      // Fixed dimensions prevent CLS (Cumulative Layout Shift)
      style={{ 
        minHeight: '120px', 
        maxHeight: '150px', 
        aspectRatio: '16/9',
        contain: 'layout style' // CSS containment for better performance
      }}
    >
      {!isLoaded && <AdSkeleton className="h-full" aspectRatio="16/9" />}
    </div>
  );
};

// Side Video ad - Fixed position on desktop for side placement
export const AdVideoSide = ({ position = 'left', className = '' }: { position?: 'left' | 'right', className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useVideoAdLoader();
  
  const positionClass = position === 'left' 
    ? 'left-2' 
    : 'right-2';
  
  return (
    <div 
      ref={containerRef}
      className={`ad-video-side hidden xl:block fixed ${positionClass} bottom-4 w-[220px] z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Video Advertisement"
      role="complementary"
      style={{ minHeight: '120px', maxHeight: '150px', aspectRatio: '16/9', contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="h-full" aspectRatio="16/9" />}
    </div>
  );
};

// Inline ad - Responsive, appears within content
export const AdInline = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('inline');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-inline w-full max-w-3xl mx-auto my-6 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// ExoticFat ad - Responsive monetization boost ad for all tool pages
export const AdExoticFat = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('exoticfat');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-exoticfat w-full max-w-4xl mx-auto my-6 px-4 min-h-[120px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[100px] p-4" />}
    </div>
  );
};

// Native ad - Global ad for all pages
export const AdNative = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('native');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-native w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Popunder ad - One-time per user (renders nothing visible, just triggers script)
export const AdPopunder = () => {
  usePopunderLoader();
  return null; // No visible element - popunder opens in new tab/window
};

// Push/Notification ad - Loads once per page for push notification prompts
export const AdPush = () => {
  const { containerRef, isLoaded } = useAdLoader('push');
  
  return (
    <div 
      ref={containerRef}
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
};

// Banner ad - Additional monetization unit
export const AdBanner = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('banner');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-banner w-full max-w-4xl mx-auto my-4 px-4 min-h-[90px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Mobile Sticky Bottom Ad - Fixed at bottom on mobile/tablet, hidden on desktop
export const AdStickyMobile = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('sticky');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-sticky-mobile xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ 
        minHeight: '50px',
        maxHeight: '70px',
        contain: 'layout style',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)' // iPhone notch support
      }}
    >
      {!isLoaded && (
        <div className="flex items-center justify-center h-[50px]">
          <span className="text-xs text-muted-foreground/40">Ad</span>
        </div>
      )}
    </div>
  );
};

// Ad Unit 1 - New monetization unit
export const AdUnit1 = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('adunit1');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-unit1 w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Ad Unit 2 - New monetization unit
export const AdUnit2 = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('adunit2');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-unit2 w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Ad Unit 3 - New monetization unit
export const AdUnit3 = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('adunit3');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-unit3 w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Ad Unit 4 - New monetization unit
export const AdUnit4 = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('adunit4');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-unit4 w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Ad Unit 5 - New monetization unit
export const AdUnit5 = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('adunit5');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-unit5 w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Ad Unit 6 - New monetization unit
export const AdUnit6 = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader('adunit6');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-unit6 w-full max-w-4xl mx-auto my-4 px-4 min-h-[100px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
      style={{ contain: 'layout style' }}
    >
      {!isLoaded && <AdSkeleton className="min-h-[90px] p-4" />}
    </div>
  );
};

// Floating Sidebar Ad - Stays visible while scrolling on desktop with dismiss button
export const AdFloatingSidebar = ({ position = 'right' }: { position?: 'left' | 'right' }) => {
  const { containerRef, isVisible, isLoaded } = useAdLoader(position === 'left' ? 'adunit4' : 'adunit5');
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed) return null;
  
  return (
    <div 
      className={`hidden xl:block fixed top-1/2 -translate-y-1/2 z-40 ${
        position === 'left' ? 'left-[180px] 2xl:left-[200px]' : 'right-[180px] 2xl:right-[200px]'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute -top-2 -right-2 z-50 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center shadow-md hover:bg-muted transition-colors"
        aria-label="Close advertisement"
      >
        <X className="h-3 w-3 text-muted-foreground" />
      </button>
      
      <div 
        ref={containerRef}
        className="w-[160px] min-h-[600px] bg-muted/30 rounded-lg overflow-hidden shadow-lg border border-border/50 transition-opacity duration-300"
        style={{ contain: 'layout style paint' }}
        aria-label="Advertisement"
        role="complementary"
      >
        {!isLoaded && (
          <div className="w-full h-[600px] relative overflow-hidden bg-secondary/30 rounded-lg">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center justify-center h-full">
              <span className="text-xs text-muted-foreground/40">Ad</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Generic ad container
const AdContainer = ({ position, className = '' }: AdContainerProps) => {
  switch (position) {
    case 'left':
      return <AdLeft className={className} />;
    case 'right':
      return <AdRight className={className} />;
    case 'bottom':
      return <AdBottom className={className} />;
    case 'video':
      return <AdVideo className={className} />;
    case 'inline':
      return <AdInline className={className} />;
    case 'exoticfat':
      return <AdExoticFat className={className} />;
    default:
      return null;
  }
};

export default AdContainer;

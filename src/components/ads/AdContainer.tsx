import { useAdLoader, useVideoAdLoader } from './AdManager';

interface AdContainerProps {
  position: 'left' | 'right' | 'bottom' | 'video' | 'inline';
  className?: string;
}

// Left side ad - Desktop only (XL screens 1280px+)
export const AdLeft = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible } = useAdLoader('left');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-left hidden xl:block fixed left-2 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-2 text-center text-xs text-muted-foreground h-[600px] flex items-center justify-center">
        <span className="opacity-40">Ad</span>
      </div>
    </div>
  );
};

// Right side ad - Desktop only (XL screens 1280px+)
export const AdRight = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible } = useAdLoader('right');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-right hidden xl:block fixed right-2 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-2 text-center text-xs text-muted-foreground h-[600px] flex items-center justify-center">
        <span className="opacity-40">Ad</span>
      </div>
    </div>
  );
};

// Bottom ad - All devices, shows below tool/content
export const AdBottom = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible } = useAdLoader('bottom');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-bottom w-full max-w-4xl mx-auto my-8 px-4 min-h-[100px] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-4 text-center text-xs text-muted-foreground min-h-[90px] flex items-center justify-center">
        <span className="opacity-40">Advertisement</span>
      </div>
    </div>
  );
};

// Video ad - Auto-loads when visible (Desktop: 220-260px width, 120-150px height, 16:9)
export const AdVideo = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible } = useVideoAdLoader();
  
  return (
    <div 
      ref={containerRef}
      className={`ad-video w-full max-w-[260px] mx-auto my-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Video Advertisement"
      role="complementary"
      style={{ minHeight: '120px', maxHeight: '150px', aspectRatio: '16/9' }}
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-2 text-center text-xs text-muted-foreground h-full flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
        <span className="opacity-40">Video Ad</span>
      </div>
    </div>
  );
};

// Side Video ad - Fixed position on desktop for side placement
export const AdVideoSide = ({ position = 'left', className = '' }: { position?: 'left' | 'right', className?: string }) => {
  const { containerRef, isVisible } = useVideoAdLoader();
  
  const positionClass = position === 'left' 
    ? 'left-2' 
    : 'right-2';
  
  return (
    <div 
      ref={containerRef}
      className={`ad-video-side hidden xl:block fixed ${positionClass} bottom-4 w-[220px] z-40 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Video Advertisement"
      role="complementary"
      style={{ minHeight: '120px', maxHeight: '150px', aspectRatio: '16/9' }}
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-2 text-center text-xs text-muted-foreground h-full flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
        <span className="opacity-40">Video</span>
      </div>
    </div>
  );
};

// Inline ad - Responsive, appears within content
export const AdInline = ({ className = '' }: { className?: string }) => {
  const { containerRef, isVisible } = useAdLoader('inline');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-inline w-full max-w-3xl mx-auto my-6 px-4 min-h-[100px] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-4 text-center text-xs text-muted-foreground min-h-[90px] flex items-center justify-center">
        <span className="opacity-40">Advertisement</span>
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
    default:
      return null;
  }
};

export default AdContainer;

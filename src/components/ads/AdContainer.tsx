import { useAdLoader, useVideoAdLoader } from './AdManager';

interface AdContainerProps {
  position: 'left' | 'right' | 'bottom' | 'video' | 'inline';
  className?: string;
}

// Left side ad - Desktop only (XL screens 1280px+)
export const AdLeft = ({ className = '' }: { className?: string }) => {
  const containerRef = useAdLoader('left');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-left hidden xl:block fixed left-2 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 ${className}`}
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
  const containerRef = useAdLoader('right');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-right hidden xl:block fixed right-2 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 ${className}`}
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
  const containerRef = useAdLoader('bottom');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-bottom w-full max-w-4xl mx-auto my-8 px-4 min-h-[100px] ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-4 text-center text-xs text-muted-foreground min-h-[90px] flex items-center justify-center">
        <span className="opacity-40">Advertisement</span>
      </div>
    </div>
  );
};

// Video ad - Auto-loads when visible, all devices
export const AdVideo = ({ className = '' }: { className?: string }) => {
  const containerRef = useVideoAdLoader();
  
  return (
    <div 
      ref={containerRef}
      className={`ad-video w-full max-w-3xl mx-auto my-8 px-4 min-h-[250px] ${className}`}
      aria-label="Video Advertisement"
      role="complementary"
    >
      <div className="ad-placeholder bg-secondary/20 rounded-lg p-4 text-center text-xs text-muted-foreground min-h-[250px] flex items-center justify-center">
        <span className="opacity-40">Video Ad</span>
      </div>
    </div>
  );
};

// Inline ad - Responsive, appears within content
export const AdInline = ({ className = '' }: { className?: string }) => {
  const containerRef = useAdLoader('inline');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-inline w-full max-w-3xl mx-auto my-6 px-4 min-h-[100px] ${className}`}
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

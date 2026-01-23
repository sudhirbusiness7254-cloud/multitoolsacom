import { useAdLoader } from './AdManager';

interface AdContainerProps {
  position: 'left' | 'right' | 'bottom' | 'video';
  className?: string;
}

// Left side ad - Desktop only
export const AdLeft = ({ className = '' }: { className?: string }) => {
  const containerRef = useAdLoader('left');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-left hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      {/* Ad script will be injected here */}
      <div className="bg-secondary/30 rounded-lg p-2 text-center text-xs text-muted-foreground">
        <span className="opacity-50">Ad</span>
      </div>
    </div>
  );
};

// Right side ad - Desktop only
export const AdRight = ({ className = '' }: { className?: string }) => {
  const containerRef = useAdLoader('right');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-right hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-[160px] min-h-[600px] z-40 ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      {/* Ad script will be injected here */}
      <div className="bg-secondary/30 rounded-lg p-2 text-center text-xs text-muted-foreground">
        <span className="opacity-50">Ad</span>
      </div>
    </div>
  );
};

// Bottom ad - All devices
export const AdBottom = ({ className = '' }: { className?: string }) => {
  const containerRef = useAdLoader('bottom');
  
  return (
    <div 
      ref={containerRef}
      className={`ad-bottom w-full max-w-4xl mx-auto my-8 px-4 min-h-[100px] ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      {/* Ad script will be injected here */}
      <div className="bg-secondary/30 rounded-lg p-4 text-center text-xs text-muted-foreground">
        <span className="opacity-50">Advertisement</span>
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
    default:
      return null;
  }
};

export default AdContainer;

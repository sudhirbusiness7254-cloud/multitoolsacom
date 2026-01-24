import { cn } from "@/lib/utils";

interface HilltopAdProps {
  variant?: "728x90" | "300x250";
  theme?: "huge_income" | "get_high_ecpm" | "make_big_money";
  className?: string;
}

const adConfig = {
  "728x90": {
    huge_income: "//static.hilltopads.com/other/banners/pub/huge_income/728x90.gif?v=1769176963",
    get_high_ecpm: "//static.hilltopads.com/other/banners/pub/get_high_ecpm/728x90.gif?v=1769176963",
    make_big_money: "//static.hilltopads.com/other/banners/pub/make_big_money/728x90.gif?v=1769176963",
  },
  "300x250": {
    huge_income: "//static.hilltopads.com/other/banners/pub/huge_income/300x250.gif?v=1769176963",
    get_high_ecpm: "//static.hilltopads.com/other/banners/pub/get_high_ecpm/300x250.gif?v=1769176963",
    make_big_money: "//static.hilltopads.com/other/banners/pub/make_big_money/300x250.gif?v=1769176963",
  },
};

// Horizontal banner ad (728x90) - Good for between sections
export const HilltopBanner = ({ theme = "huge_income", className }: Omit<HilltopAdProps, "variant">) => {
  return (
    <div className={cn("flex justify-center py-4", className)}>
      <a 
        href="https://hilltopads.com/?ref=358489" 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="block"
      >
        <img 
          src={adConfig["728x90"][theme]} 
          alt="Advertisement" 
          width={728} 
          height={90}
          loading="lazy"
          className="max-w-full h-auto"
        />
      </a>
    </div>
  );
};

// Square/Rectangle ad (300x250) - Good for sidebars and inline
export const HilltopSquare = ({ theme = "huge_income", className }: Omit<HilltopAdProps, "variant">) => {
  return (
    <div className={cn("flex justify-center py-4", className)}>
      <a 
        href="https://hilltopads.com/?ref=358489" 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="block"
      >
        <img 
          src={adConfig["300x250"][theme]} 
          alt="Advertisement" 
          width={300} 
          height={250}
          loading="lazy"
        />
      </a>
    </div>
  );
};

// Responsive ad that shows banner on desktop, square on mobile
export const HilltopResponsive = ({ theme = "huge_income", className }: Omit<HilltopAdProps, "variant">) => {
  return (
    <div className={cn("flex justify-center py-4", className)}>
      <a 
        href="https://hilltopads.com/?ref=358489" 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="block"
      >
        {/* Desktop: 728x90 */}
        <img 
          src={adConfig["728x90"][theme]} 
          alt="Advertisement" 
          width={728} 
          height={90}
          loading="lazy"
          className="hidden md:block max-w-full h-auto"
        />
        {/* Mobile: 300x250 */}
        <img 
          src={adConfig["300x250"][theme]} 
          alt="Advertisement" 
          width={300} 
          height={250}
          loading="lazy"
          className="block md:hidden"
        />
      </a>
    </div>
  );
};

// Grid of multiple ads
export const HilltopAdGrid = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6", className)}>
      <HilltopSquare theme="huge_income" />
      <HilltopSquare theme="get_high_ecpm" />
      <HilltopSquare theme="make_big_money" className="hidden lg:flex" />
    </div>
  );
};

export default { HilltopBanner, HilltopSquare, HilltopResponsive, HilltopAdGrid };

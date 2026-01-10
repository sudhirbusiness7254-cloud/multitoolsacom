import { useEffect, useRef, useState } from "react";

interface NativeBannerAdProps {
  className?: string;
}

const NativeBannerAd = ({ className = "" }: NativeBannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isLoaded) return;

    // Create the script element
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://crowdsubsequentadmire.com/5dd29b78901106d681d1f5ce05a102b3/invoke.js";

    // Create the container div for the ad
    const adContainer = document.createElement("div");
    adContainer.id = "container-5dd29b78901106d681d1f5ce05a102b3";

    containerRef.current.appendChild(script);
    containerRef.current.appendChild(adContainer);
    setIsLoaded(true);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isLoaded]);

  return (
    <div 
      ref={containerRef}
      className={`w-full flex justify-center py-4 ${className}`}
      aria-label="Advertisement"
    />
  );
};

export default NativeBannerAd;

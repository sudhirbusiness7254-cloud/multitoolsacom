import { useEffect, useRef, useState } from "react";

interface UseLazyAdOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Hook to lazy load ads when they become visible in viewport
 * Uses Intersection Observer for efficient detection
 */
export const useLazyAd = (options: UseLazyAdOptions = {}) => {
  const { rootMargin = "200px", threshold = 0 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, hasLoaded]);

  return { containerRef, isVisible, hasLoaded };
};

export default useLazyAd;

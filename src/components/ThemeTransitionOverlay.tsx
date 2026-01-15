import { useEffect, useState } from "react";

type TransitionType = "sunset" | "sunrise" | "fade-dark" | "fade-light" | null;

interface ThemeTransitionOverlayProps {
  transition: TransitionType;
  onComplete?: () => void;
}

export const ThemeTransitionOverlay = ({ 
  transition, 
  onComplete 
}: ThemeTransitionOverlayProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (transition) {
      // Enable smooth transitions on all elements
      document.documentElement.classList.add("theme-transitioning");
      
      // Short delay to ensure CSS is applied before animation starts
      requestAnimationFrame(() => {
        setIsActive(true);
      });

      // Duration based on transition type
      const duration = transition.startsWith("fade") ? 600 : 1500;

      const timer = setTimeout(() => {
        setIsActive(false);
        document.documentElement.classList.remove("theme-transitioning");
        onComplete?.();
      }, duration);

      return () => {
        clearTimeout(timer);
        document.documentElement.classList.remove("theme-transitioning");
      };
    }
  }, [transition, onComplete]);

  if (!transition) return null;

  return (
    <div 
      className={`theme-transition-overlay ${transition} ${isActive ? "active" : ""}`}
      aria-hidden="true"
    />
  );
};

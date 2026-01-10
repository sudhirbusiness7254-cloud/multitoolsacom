import { useState, useRef, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface ImageComparisonSliderProps {
  originalSrc: string;
  compressedSrc: string;
  originalLabel?: string;
  compressedLabel?: string;
  className?: string;
}

const ImageComparisonSlider = ({
  originalSrc,
  compressedSrc,
  originalLabel = "Original",
  compressedLabel = "Compressed",
  className = "",
}: ImageComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-xl bg-secondary/30 ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ cursor: isDragging ? "ew-resize" : "default" }}
    >
      {/* Compressed Image (Background - Full Width) */}
      <div className="relative w-full aspect-video">
        <img
          src={compressedSrc}
          alt={compressedLabel}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
        
        {/* Compressed Label */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-md backdrop-blur-sm">
          {compressedLabel}
        </div>
      </div>

      {/* Original Image (Foreground - Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
          <img
            src={originalSrc}
            alt={originalLabel}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ maxWidth: "none", width: containerRef.current?.offsetWidth }}
            draggable={false}
          />
        </div>
        
        {/* Original Label */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded-md backdrop-blur-sm border border-border">
          {originalLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle Grip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary">
          <GripVertical className="w-5 h-5 text-primary" />
        </div>
        
        {/* Vertical Line */}
        <div className="absolute inset-0 w-0.5 bg-white left-1/2 -translate-x-1/2" />
      </div>

      {/* Instructions Overlay (shown initially) */}
      {sliderPosition === 50 && !isDragging && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm animate-pulse">
          Drag to compare
        </div>
      )}
    </div>
  );
};

export default ImageComparisonSlider;

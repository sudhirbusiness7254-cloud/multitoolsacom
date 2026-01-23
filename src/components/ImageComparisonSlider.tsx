import { useState, useRef, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface ImageComparisonSliderProps {
  originalSrc: string;
  compressedSrc: string;
  originalLabel?: string;
  compressedLabel?: string;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-video" (default) or "aspect-[4/3]" */
  aspectClassName?: string;
}

const ImageComparisonSlider = ({
  originalSrc,
  compressedSrc,
  originalLabel = "Original",
  compressedLabel = "Compressed",
  className = "",
  aspectClassName = "aspect-video",
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
    // Only move if clicking on the handle area (within 30px of current position)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const handleX = (sliderPosition / 100) * rect.width;
      if (Math.abs(clickX - handleX) > 30) {
        handleMove(e.clientX);
      }
    }
  }, [handleMove, sliderPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    // Only move if touching away from the handle area
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const handleX = (sliderPosition / 100) * rect.width;
      if (Math.abs(touchX - handleX) > 30) {
        handleMove(e.touches[0].clientX);
      }
    }
  }, [handleMove, sliderPosition]);

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
      {/* Fixed frame so both images ALWAYS have identical size/fit */}
      <div className={`relative w-full ${aspectClassName}`}>
        {/* Compressed/After */}
        <img
          src={compressedSrc}
          alt={compressedLabel}
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />

        {/* Original/Before (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={originalSrc}
            alt={originalLabel}
            className="absolute inset-0 h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>

        {/* Compressed Label */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-md backdrop-blur-sm">
          {compressedLabel}
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

import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useAdLoader } from './AdManager';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  countdownSeconds?: number;
}

const InterstitialAd = ({ isOpen, onClose, countdownSeconds = 5 }: InterstitialAdProps) => {
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [canSkip, setCanSkip] = useState(false);
  const { containerRef, isLoaded } = useAdLoader('adunit6');

  useEffect(() => {
    if (!isOpen) {
      setCountdown(countdownSeconds);
      setCanSkip(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdownSeconds]);

  const handleSkip = useCallback(() => {
    if (canSkip) {
      onClose();
    }
  }, [canSkip, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
      {/* Close/Skip Button */}
      <button
        onClick={handleSkip}
        disabled={!canSkip}
        className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          canSkip
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        {canSkip ? (
          <>
            <span>Skip Ad</span>
            <X className="h-4 w-4" />
          </>
        ) : (
          <span>Skip in {countdown}s</span>
        )}
      </button>

      {/* Interstitial Content */}
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Advertisement</p>
        </div>
        
        {/* Ad Container */}
        <div 
          ref={containerRef}
          className="w-full min-h-[300px] md:min-h-[400px] bg-muted/30 rounded-xl border border-border/50 overflow-hidden flex items-center justify-center"
          style={{ contain: 'layout style paint' }}
        >
          {!isLoaded && (
            <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center justify-center h-full">
                <span className="text-muted-foreground/40">Loading ad...</span>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-full max-w-md mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${((countdownSeconds - countdown) / countdownSeconds) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterstitialAd;

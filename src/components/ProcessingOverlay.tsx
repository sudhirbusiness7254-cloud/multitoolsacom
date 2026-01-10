import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProcessingOverlayProps {
  isProcessing: boolean;
  progress: number;
  status: "idle" | "processing" | "complete" | "error";
  message: string;
  error: string | null;
  showSpinner?: boolean;
  className?: string;
}

const ProcessingOverlay = ({
  isProcessing,
  progress,
  status,
  message,
  error,
  showSpinner = true,
  className,
}: ProcessingOverlayProps) => {
  if (status === "idle" && !error) return null;

  return (
    <>
      {/* Overlay for processing state */}
      {(status === "processing" || status === "complete") && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
            "animate-fade-in",
            className
          )}
        >
          <div className="w-full max-w-sm mx-4 p-6 bg-card rounded-2xl border border-border shadow-2xl">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              {status === "complete" ? (
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              ) : (
                showSpinner && (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                )
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress
                value={progress}
                className="h-3 bg-secondary rounded-full overflow-hidden"
              />
            </div>

            {/* Progress Percentage */}
            <div className="text-center mb-2">
              <span className="text-2xl font-bold text-foreground">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Message */}
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg shadow-lg">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
            <span className="text-sm text-destructive">{error}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessingOverlay;

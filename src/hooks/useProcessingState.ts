import { useState, useCallback, useRef } from "react";

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: "idle" | "processing" | "complete" | "error";
  message: string;
  error: string | null;
}

export const useProcessingState = () => {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    status: "idle",
    message: "",
    error: null,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startProcessing = useCallback((message = "Processing your file, please wait…") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState({
      isProcessing: true,
      progress: 0,
      status: "processing",
      message,
      error: null,
    });
  }, []);

  const updateProgress = useCallback((percent: number, message?: string) => {
    setState((prev) => ({
      ...prev,
      progress: Math.min(100, Math.max(0, percent)),
      message: message || prev.message,
    }));
  }, []);

  const finishProcessing = useCallback((successMessage = "Processing complete!") => {
    setState((prev) => ({
      ...prev,
      progress: 100,
      status: "complete",
      message: successMessage,
    }));

    timeoutRef.current = setTimeout(() => {
      setState({
        isProcessing: false,
        progress: 0,
        status: "idle",
        message: "",
        error: null,
      });
    }, 1000);
  }, []);

  const setError = useCallback((errorMessage: string) => {
    setState({
      isProcessing: false,
      progress: 0,
      status: "error",
      message: "",
      error: errorMessage,
    });

    timeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, error: null }));
    }, 5000);
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState({
      isProcessing: false,
      progress: 0,
      status: "idle",
      message: "",
      error: null,
    });
  }, []);

  return {
    ...state,
    startProcessing,
    updateProgress,
    finishProcessing,
    setError,
    reset,
  };
};

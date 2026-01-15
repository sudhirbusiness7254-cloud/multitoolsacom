import { Moon, Sun, Eye, Sunset, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAutoNightMode } from "@/hooks/use-auto-night-mode";
import { ThemeTransitionOverlay } from "@/components/ThemeTransitionOverlay";
import { toast } from "sonner";

type ThemeMode = "light" | "dark" | "dark-comfort" | "auto";
type TransitionType = "sunset" | "sunrise" | "fade-dark" | "fade-light" | null;

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [transition, setTransition] = useState<TransitionType>(null);
  const previousIsNight = useRef<boolean | null>(null);
  const { isNight, sunrise, sunset, locationGranted, loading, error, requestLocation, getAutoTheme } = useAutoNightMode();

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    // Initialize previousIsNight for auto mode detection
    previousIsNight.current = null;
  }, []);

  // Detect auto mode transitions (sunset/sunrise)
  useEffect(() => {
    if (theme !== "auto" || !locationGranted) return;
    
    // Skip first render
    if (previousIsNight.current === null) {
      previousIsNight.current = isNight;
      applyTheme(getAutoTheme());
      return;
    }
    
    // Detect change from day to night (sunset) or night to day (sunrise)
    if (previousIsNight.current !== isNight) {
      const transitionType = isNight ? "sunset" : "sunrise";
      triggerTransition(transitionType, getAutoTheme());
      previousIsNight.current = isNight;
    }
  }, [theme, isNight, locationGranted, getAutoTheme]);

  // Apply theme without transition on initial load
  useEffect(() => {
    if (theme === "auto") {
      if (previousIsNight.current === null) {
        applyTheme(getAutoTheme());
      }
    } else {
      applyTheme(theme);
    }
  }, [theme, getAutoTheme]);

  const applyTheme = (newTheme: "light" | "dark" | "dark-comfort") => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "light", "ultra-comfort");
    
    if (newTheme === "light") {
      root.classList.add("light");
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "dark-comfort") {
      root.classList.add("dark", "ultra-comfort");
    }
  };

  const triggerTransition = useCallback((type: TransitionType, targetTheme: "light" | "dark" | "dark-comfort") => {
    setTransition(type);
    
    // Apply theme partway through the transition for smooth effect
    const delay = type?.startsWith("fade") ? 200 : 500;
    setTimeout(() => {
      applyTheme(targetTheme);
    }, delay);
  }, []);

  const handleThemeChange = async (newTheme: ThemeMode) => {
    if (newTheme === "auto" && !locationGranted) {
      await requestLocation();
    }
    
    const oldTheme = theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Determine transition type based on theme change
    let targetTheme: "light" | "dark" | "dark-comfort";
    let transitionType: TransitionType;
    
    if (newTheme === "auto") {
      targetTheme = getAutoTheme();
      transitionType = targetTheme === "dark-comfort" ? "fade-dark" : "fade-light";
    } else {
      targetTheme = newTheme;
      if (newTheme === "light") {
        transitionType = "fade-light";
      } else {
        transitionType = "fade-dark";
      }
    }
    
    // Only trigger transition if actually changing themes
    const currentAppliedTheme = oldTheme === "auto" ? getAutoTheme() : oldTheme;
    if (currentAppliedTheme !== targetTheme) {
      triggerTransition(transitionType, targetTheme);
    }
    
    if (newTheme === "auto") {
      previousIsNight.current = isNight;
      toast.success("Auto Night Mode enabled", {
        description: locationGranted 
          ? `Switches at sunset (${formatTime(sunset)}) and sunrise (${formatTime(sunrise)})`
          : "Location access needed for accurate times",
      });
    }
  };

  const handleTransitionComplete = () => {
    setTransition(null);
  };

  const formatTime = (date: Date | null): string => {
    if (!date) return "--:--";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-foreground transition-transform" />;
      case "dark":
        return <Moon className="h-5 w-5 text-foreground transition-transform" />;
      case "dark-comfort":
        return <Eye className="h-5 w-5 text-foreground transition-transform" />;
      case "auto":
        return <Sunset className="h-5 w-5 text-foreground transition-transform" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "dark-comfort":
        return "Comfort";
      case "auto":
        return "Auto";
    }
  };

  return (
    <>
      <ThemeTransitionOverlay 
        transition={transition} 
        onComplete={handleTransitionComplete} 
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-secondary"
            aria-label={`Current theme: ${getLabel()}`}
          >
            {getIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Choose Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => handleThemeChange("light")}
            className={`flex items-center gap-3 cursor-pointer ${theme === "light" ? "bg-secondary" : ""}`}
          >
            <Sun className="h-4 w-4" />
            <div className="flex flex-col">
              <span>Light</span>
              <span className="text-xs text-muted-foreground">Bright mode</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleThemeChange("dark")}
            className={`flex items-center gap-3 cursor-pointer ${theme === "dark" ? "bg-secondary" : ""}`}
          >
            <Moon className="h-4 w-4" />
            <div className="flex flex-col">
              <span>Dark</span>
              <span className="text-xs text-muted-foreground">Standard dark</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleThemeChange("dark-comfort")}
            className={`flex items-center gap-3 cursor-pointer ${theme === "dark-comfort" ? "bg-secondary" : ""}`}
          >
            <Eye className="h-4 w-4" />
            <div className="flex flex-col">
              <span>Ultra Comfort</span>
              <span className="text-xs text-muted-foreground">Low contrast, night use</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => handleThemeChange("auto")}
            className={`flex items-center gap-3 cursor-pointer ${theme === "auto" ? "bg-secondary" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sunset className="h-4 w-4" />
            )}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <span>Auto Night Mode</span>
                {locationGranted && <MapPin className="h-3 w-3 text-brand-green" />}
              </div>
              <span className="text-xs text-muted-foreground">
                {locationGranted 
                  ? `☀️ ${formatTime(sunrise)} · 🌙 ${formatTime(sunset)}`
                  : "Based on sunrise/sunset"
                }
              </span>
            </div>
          </DropdownMenuItem>
          
          {theme === "auto" && (
            <div className="px-2 py-1.5 text-xs text-muted-foreground bg-muted/50 rounded-md mx-2 mb-2 mt-1">
              {isNight ? (
                <span className="flex items-center gap-1">
                  <Moon className="h-3 w-3" /> Currently: Night (Ultra Comfort)
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Sun className="h-3 w-3" /> Currently: Day (Light)
                </span>
              )}
            </div>
          )}
          
          {error && (
            <div className="px-2 py-1.5 text-xs text-destructive bg-destructive/10 rounded-md mx-2 mb-2">
              {error}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

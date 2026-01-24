import { Moon, Sun, Eye, Sparkles } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SunCalc from "suncalc";

type Theme = "light" | "dark" | "eye-comfort" | "auto";
type AppliedTheme = "light" | "dark" | "eye-comfort";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [appliedTheme, setAppliedTheme] = useState<AppliedTheme>("dark");

  const getAutoTheme = useCallback((): AppliedTheme => {
    // Default coordinates (approximate center of user's timezone)
    let latitude = 40.7128; // NYC as fallback
    let longitude = -74.006;

    // Try to get cached location
    const cachedLat = localStorage.getItem("user_latitude");
    const cachedLng = localStorage.getItem("user_longitude");
    
    if (cachedLat && cachedLng) {
      latitude = parseFloat(cachedLat);
      longitude = parseFloat(cachedLng);
    }

    const now = new Date();
    const times = SunCalc.getTimes(now, latitude, longitude);
    
    // Check if current time is between sunrise and sunset
    const isDay = now >= times.sunrise && now <= times.sunset;
    
    return isDay ? "light" : "eye-comfort";
  }, []);

  const applyTheme = useCallback((newTheme: AppliedTheme) => {
    document.documentElement.classList.remove("dark", "light", "eye-comfort");
    document.documentElement.classList.add(newTheme);
    setAppliedTheme(newTheme);
  }, []);

  const updateAutoTheme = useCallback(() => {
    if (theme === "auto") {
      const autoTheme = getAutoTheme();
      applyTheme(autoTheme);
    }
  }, [theme, getAutoTheme, applyTheme]);

  // Request location for accurate sunrise/sunset
  const requestLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localStorage.setItem("user_latitude", position.coords.latitude.toString());
          localStorage.setItem("user_longitude", position.coords.longitude.toString());
          updateAutoTheme();
        },
        () => {
          // Use fallback if denied
          updateAutoTheme();
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }
  }, [updateAutoTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "auto") {
      const autoTheme = getAutoTheme();
      applyTheme(autoTheme);
      requestLocation();
    } else {
      applyTheme(initialTheme as AppliedTheme);
    }
  }, []);

  // Check and update auto theme every minute
  useEffect(() => {
    if (theme !== "auto") return;

    const interval = setInterval(() => {
      updateAutoTheme();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [theme, updateAutoTheme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "auto") {
      const autoTheme = getAutoTheme();
      applyTheme(autoTheme);
      requestLocation();
    } else {
      applyTheme(newTheme);
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-foreground" />;
      case "dark":
        return <Moon className="h-5 w-5 text-foreground" />;
      case "eye-comfort":
        return <Eye className="h-5 w-5 text-foreground" />;
      case "auto":
        return <Sparkles className="h-5 w-5 text-foreground" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-secondary"
          aria-label="Change theme"
        >
          {getIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border z-50">
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          className={`cursor-pointer gap-2 ${theme === "light" ? "bg-secondary" : ""}`}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          className={`cursor-pointer gap-2 ${theme === "dark" ? "bg-secondary" : ""}`}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("eye-comfort")}
          className={`cursor-pointer gap-2 ${theme === "eye-comfort" ? "bg-secondary" : ""}`}
        >
          <Eye className="h-4 w-4" />
          <span>Eye Comfort</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("auto")}
          className={`cursor-pointer gap-2 ${theme === "auto" ? "bg-secondary" : ""}`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Auto (Sunset)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

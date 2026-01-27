import { Moon, Sun, Eye, Sparkles, Waves } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SunCalc from "suncalc";

type Theme = "light" | "dark" | "eye-comfort" | "midnight-blue" | "auto";
type AppliedTheme = "light" | "dark" | "eye-comfort" | "midnight-blue";

// Color swatches for each theme
const themeSwatches = {
  light: {
    bg: "hsl(0 0% 98%)",
    card: "hsl(0 0% 100%)",
    primary: "hsl(24 95% 50%)",
    accent: "hsl(12 90% 50%)",
    text: "hsl(0 0% 10%)"
  },
  dark: {
    bg: "hsl(0 0% 4%)",
    card: "hsl(0 0% 8%)",
    primary: "hsl(24 95% 53%)",
    accent: "hsl(12 90% 50%)",
    text: "hsl(0 0% 95%)"
  },
  "eye-comfort": {
    bg: "hsl(30 20% 9%)",
    card: "hsl(32 18% 13%)",
    primary: "hsl(42 85% 55%)",
    accent: "hsl(38 90% 50%)",
    text: "hsl(40 25% 92%)"
  },
  "midnight-blue": {
    bg: "hsl(220 25% 8%)",
    card: "hsl(220 22% 12%)",
    primary: "hsl(210 90% 55%)",
    accent: "hsl(200 85% 50%)",
    text: "hsl(210 20% 92%)"
  },
  auto: {
    bg: "linear-gradient(135deg, hsl(0 0% 98%) 50%, hsl(30 20% 9%) 50%)",
    card: "linear-gradient(135deg, hsl(0 0% 100%) 50%, hsl(32 18% 13%) 50%)",
    primary: "hsl(42 85% 55%)",
    accent: "hsl(24 95% 50%)",
    text: "hsl(0 0% 50%)"
  }
};

const ThemeSwatch = ({ themeKey }: { themeKey: Theme }) => {
  const colors = themeSwatches[themeKey];
  const isAuto = themeKey === "auto";
  
  return (
    <div className="flex flex-col gap-1.5 p-2 min-w-[120px]">
      <div className="text-xs font-medium text-center mb-1">
        {themeKey === "eye-comfort" ? "Eye Comfort" : themeKey === "auto" ? "Auto (Sunset)" : themeKey === "midnight-blue" ? "Midnight Blue" : themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
      </div>
      <div 
        className="w-full h-12 rounded-md border border-border/50 overflow-hidden"
        style={{ background: colors.bg }}
      >
        <div 
          className="m-1.5 h-6 rounded-sm flex items-center justify-between px-2"
          style={{ background: colors.card }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ background: colors.primary }}
          />
          <div 
            className="w-8 h-2 rounded-sm"
            style={{ background: colors.accent }}
          />
        </div>
      </div>
      <div className="flex gap-1 justify-center mt-1">
        <div 
          className="w-4 h-4 rounded-full border border-border/30"
          style={{ background: colors.bg }}
          title="Background"
        />
        <div 
          className="w-4 h-4 rounded-full border border-border/30"
          style={{ background: colors.primary }}
          title="Primary"
        />
        <div 
          className="w-4 h-4 rounded-full border border-border/30"
          style={{ background: colors.accent }}
          title="Accent"
        />
      </div>
    </div>
  );
};

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
    document.documentElement.classList.remove("dark", "light", "eye-comfort", "midnight-blue");
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
      case "midnight-blue":
        return <Waves className="h-5 w-5 text-foreground" />;
      case "auto":
        return <Sparkles className="h-5 w-5 text-foreground" />;
    }
  };

  const ThemeMenuItem = ({ themeKey, icon: Icon, label }: { themeKey: Theme; icon: typeof Sun; label: string }) => (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <DropdownMenuItem 
          onClick={() => handleThemeChange(themeKey)}
          className={`cursor-pointer gap-2 ${theme === themeKey ? "bg-secondary" : ""}`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </DropdownMenuItem>
      </TooltipTrigger>
      <TooltipContent side="left" className="p-0 bg-popover border-border">
        <ThemeSwatch themeKey={themeKey} />
      </TooltipContent>
    </Tooltip>
  );

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
        <ThemeMenuItem themeKey="light" icon={Sun} label="Light" />
        <ThemeMenuItem themeKey="dark" icon={Moon} label="Dark" />
        <ThemeMenuItem themeKey="eye-comfort" icon={Eye} label="Eye Comfort" />
        <ThemeMenuItem themeKey="midnight-blue" icon={Waves} label="Midnight Blue" />
        <ThemeMenuItem themeKey="auto" icon={Sparkles} label="Auto (Sunset)" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

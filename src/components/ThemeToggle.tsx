import { Moon, Sun, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type ThemeMode = "light" | "dark" | "dark-comfort";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: ThemeMode) => {
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

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-foreground transition-transform" />;
      case "dark":
        return <Moon className="h-5 w-5 text-foreground transition-transform" />;
      case "dark-comfort":
        return <Eye className="h-5 w-5 text-foreground transition-transform" />;
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
    }
  };

  return (
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
      <DropdownMenuContent align="end" className="w-48">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

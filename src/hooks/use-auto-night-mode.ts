import { useState, useEffect, useCallback } from "react";
import SunCalc from "suncalc";

type ThemeMode = "light" | "dark" | "dark-comfort" | "auto";

interface AutoNightModeState {
  isNight: boolean;
  sunrise: Date | null;
  sunset: Date | null;
  locationGranted: boolean;
  loading: boolean;
  error: string | null;
}

interface UseAutoNightModeReturn extends AutoNightModeState {
  requestLocation: () => Promise<void>;
  getAutoTheme: () => "light" | "dark-comfort";
}

export const useAutoNightMode = (): UseAutoNightModeReturn => {
  const [state, setState] = useState<AutoNightModeState>({
    isNight: false,
    sunrise: null,
    sunset: null,
    locationGranted: false,
    loading: false,
    error: null,
  });

  const calculateSunTimes = useCallback((latitude: number, longitude: number) => {
    const now = new Date();
    const times = SunCalc.getTimes(now, latitude, longitude);
    
    const sunrise = times.sunrise;
    const sunset = times.sunset;
    
    // Check if current time is night (after sunset or before sunrise)
    const isNight = now < sunrise || now > sunset;
    
    setState(prev => ({
      ...prev,
      sunrise,
      sunset,
      isNight,
      locationGranted: true,
      loading: false,
      error: null,
    }));
    
    // Store location for future use
    localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));
  }, []);

  const requestLocation = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 3600000, // Cache for 1 hour
        });
      });
      
      calculateSunTimes(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      const geoError = error as GeolocationPositionError;
      let errorMessage = "Failed to get location";
      
      if (geoError.code === 1) {
        errorMessage = "Location access denied";
      } else if (geoError.code === 2) {
        errorMessage = "Location unavailable";
      } else if (geoError.code === 3) {
        errorMessage = "Location request timed out";
      }
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, [calculateSunTimes]);

  // Try to use saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        const { latitude, longitude } = JSON.parse(savedLocation);
        calculateSunTimes(latitude, longitude);
      } catch {
        // Invalid saved location, ignore
      }
    }
  }, [calculateSunTimes]);

  // Update sun times every minute when in auto mode
  useEffect(() => {
    if (!state.locationGranted) return;
    
    const savedLocation = localStorage.getItem("userLocation");
    if (!savedLocation) return;
    
    const interval = setInterval(() => {
      try {
        const { latitude, longitude } = JSON.parse(savedLocation);
        calculateSunTimes(latitude, longitude);
      } catch {
        // Ignore errors
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [state.locationGranted, calculateSunTimes]);

  const getAutoTheme = useCallback((): "light" | "dark-comfort" => {
    return state.isNight ? "dark-comfort" : "light";
  }, [state.isNight]);

  return {
    ...state,
    requestLocation,
    getAutoTheme,
  };
};

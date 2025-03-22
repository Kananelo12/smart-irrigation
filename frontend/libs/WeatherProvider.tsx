// contexts/WeatherProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import { getWeather, WeatherData } from "../utils/weatherUtils";
import { getDeviceCoordinates } from "@/utils/locationUtils";

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY; // From app.json/app.config.js


  const fetchWeatherData = async () => {
    try {
      // get device coordinates
      const coords = await getDeviceCoordinates();
      if (!coords) {
        setWeather(null);
        return;
      }

      const { latitude, longitude } = coords;
      console.log("Device coordinates:", latitude, longitude); // TODO: remove log

      // fetch weather data using the coordinates
      const data = await getWeather(latitude.toString(), longitude.toString(), API_KEY);
      if (typeof data !== "string") {
        setWeather(data);
      } else {
        // Optionally handle error here
        setWeather(null);
      }

    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      // return "Unable to fetch weather data";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // Refresh weather data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

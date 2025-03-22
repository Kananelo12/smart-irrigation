// utils/weatherUtils.ts
export interface WeatherData {
  temperature: number;
  weatherDescription: string;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
  currentTime: number;
  sunrise: number;
  sunset: number;
}

/**
 * Determines if it's currently daytime based on the provided timestamps.
 * @param dt - The current time (timestamp in seconds)
 * @param sunrise - The sunrise time (timestamp in seconds)
 * @param sunset - The sunset time (timestamp in seconds)
 * @returns True if current time is between sunrise and sunset, false otherwise.
 */
export function isDaytime(dt: number, sunrise: number, sunset: number): boolean {
  return dt >= sunrise && dt < sunset;
}

/**
 * Fetches weather data for a given city.
 * @param city - The city name - Optional.
 * @param lat - The latitude of the device
 * @param lon - The longitude of the device
 * @param apiKey - Your OpenWeather API key.
 * @returns A WeatherData object or an error string.
 */
export async function getWeather(
  lat: string,
  lon: string,
  apiKey: string
): Promise<WeatherData | string> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log("Weather API response:", data); // TODO: remove log
    if (data.cod !== 200) {
      return "Unable to fetch weather data";
    }
    return {
      temperature: data.main.temp,
      weatherDescription: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      precipitation: data.rain ? data.rain["1h"] || 0 : 0,
      currentTime: data.dt,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return "Unable to fetch weather data";
  }
}

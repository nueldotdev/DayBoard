import axios from 'axios';

// Define the response types based on OpenWeatherMap API
export interface WeatherData {
  main: {
    temp: number; // Temperature in Kelvin
    feels_like: number; // Feels-like temperature
    temp_min: number; // Min temperature
    temp_max: number; // Max temperature
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string; // City name
}

const API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(`${BASE_URL}`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric', // Use 'metric' for Celsius or 'imperial' for Fahrenheit
    },
  });
  return response.data;
};


// {
//   "latitude": 6.5,
//   "longitude": 3.375,
//   "generationtime_ms": 0.028967857360839844,
//   "utc_offset_seconds": 0,
//   "timezone": "GMT",
//   "timezone_abbreviation": "GMT",
//   "elevation": 0,
//   "current_weather_units": {
//       "time": "iso8601",
//       "interval": "seconds",
//       "temperature": "°C",
//       "windspeed": "km/h",
//       "winddirection": "°",
//       "is_day": "",
//       "weathercode": "wmo code"
//   },
//   "current_weather": {
//       "time": "2024-12-18T08:45",
//       "interval": 900,
//       "temperature": 29.1,
//       "windspeed": 6.6,
//       "winddirection": 347,
//       "is_day": 1,
//       "weathercode": 1
//   }
// }

export const fetchWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<{
  temperature: number;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
  weatherCode: number;
  temp_unit: string;
}> => {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();

    return {
      temperature: data.current_weather.temperature,
      windSpeed: data.current_weather.windspeed,
      windDirection: data.current_weather.winddirection,
      isDay: data.current_weather.is_day === 1,
      weatherCode: data.current_weather.weathercode,
      temp_unit: data.current_weather_units.temperature
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

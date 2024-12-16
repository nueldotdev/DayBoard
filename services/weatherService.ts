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

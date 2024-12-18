import React, { useEffect, useState } from 'react';
import { fetchWeatherByCoordinates } from '../../../../services/weatherService';


type WeatherData = {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
  weatherCode: number;
  temp_unit: string;
}


export const WeatherComponent: React.FC = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [city, setCity] = useState('');

  const [weatherStatus, setWeatherStatus] = useState<WeatherData>({
    temperature: 0,
    windSpeed: 0,
    windDirection: 0,
    isDay: false,
    weatherCode: 0,
    temp_unit: '',
  });


  const getWeatherIcon = (weatherCode: number) => {
    const iconMap: { [key: number]: string } = {
      1: "01d", // Clear
      2: "02d", // Partly Cloudy
      3: "03d", // Overcast
      61: "09d", // Rain
      71: "13d", // Snow
      // Add more mappings based on WMO codes
    };
  
    return `http://openweathermap.org/img/wn/${iconMap[weatherCode] || "01d"}.png`;
  };
  
  const WeatherIcon = ({ weatherCode }: { weatherCode: number }) => (
    <img src={getWeatherIcon(weatherCode)} alt="Weather Icon" className="h-12 w-12 scale-110" />
  );
  
  

  const fetchCoordinates = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      console.log("Data: ", data)


      setLongitude(data.longitude);
      setLatitude(data.latitude);
      setCity(data.city);

      localStorage.setItem('latitude', String(data.latitude));
      localStorage.setItem('longitude', String(data.longitude));
      localStorage.setItem('city', String(data.city));

    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const fetchWeather = async () => {
    try {
      const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
      setWeatherStatus(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
    };
  }


  useEffect(() => {
    var latitude = localStorage.getItem('latitude');
    var longitude = localStorage.getItem('longitude');
    var city = localStorage.getItem('city');

    if (latitude && longitude) {
      setLongitude(Number(longitude));
      setLatitude(Number(latitude));
      setCity(city || '');
    } else {
      fetchCoordinates();
    }

    fetchWeather()
  }, []);

  return (
    <div className="flex flex-col space-y-0 items-center justify-center">
      <div className='flex items-center justify-center text-center'>
        <WeatherIcon weatherCode={weatherStatus.weatherCode} />
        <p className="text-lg">{Math.round(weatherStatus.temperature)}{weatherStatus.temp_unit}</p>
      </div>
      <div className="text-base font-semibold w-full text-right -translate-y-3">{city}</div>
    </div>
  );
}


// const getHeroIcon = (weatherCode: number) => {
//   switch (weatherCode) {
//     case 1: return <SunIcon className="h-12 w-12 text-yellow-500" />;
//     case 2: return <CloudIcon className="h-12 w-12 text-gray-400" />;
//     case 61: return <CloudRainIcon className="h-12 w-12 text-blue-500" />;
//     default: return <CloudIcon className="h-12 w-12 text-gray-400" />;
//   }
// };
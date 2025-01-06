import React, { useEffect } from "react";
import Greeting from "../../components/app/home/Greeting";
import TimeComponents from "../../components/app/home/TimeComponents";
import usePageTitle from "../../hooks/usePageTitle";
import axios from "axios";
import { fetchWeatherByCoordinates } from "../../../services/weatherService";

const HomePage: React.FC = () => {

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const data = await response.data();
        localStorage.setItem('latitude', data.latitude);
        localStorage.setItem('longitude', data.longitude);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    if (!localStorage.getItem('latitude') || !localStorage.getItem('longitude')) {
      fetchCoordinates();
    }

    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');

    fetchWeatherByCoordinates(Number(latitude), Number(longitude));

  }, [])

  // Set page title
  usePageTitle("Home");
  const name = localStorage.getItem("name") || "User";

  return (
    <div className="flex flex-col min-h-full max-h-full h-full">
      <div className='w-full px-2 pt-1'>
        <Greeting />
      </div>
      <div className="h-full">
        <TimeComponents name={name} />
      </div>
    </div>
  );
};

export default HomePage;

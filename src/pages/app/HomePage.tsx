import React from "react";
import Greeting from "../../components/app/home/Greeting";
import TimeComponents from "../../components/app/home/TimeComponents";
import usePageTitle from "../../hooks/usePageTitle";

const HomePage: React.FC = () => {

  // Set page title
  usePageTitle("Home");

  return (
    <div className="flex flex-col min-h-full max-h-full h-full">
      <div className=''>
      <Greeting userName="Nuel" />
      </div>
      <div className="">
        <TimeComponents />
      </div>
    </div>
  );
};

export default HomePage;

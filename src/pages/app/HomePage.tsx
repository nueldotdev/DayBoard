import React, { useState } from "react";
import Greeting from "../../components/app/home/Greeting";
import Overview from "../../components/app/home/Overview";
import TimeComponents from "../../components/app/home/TimeComponents";

const HomePage: React.FC = () => {
  const [showGreeting, setShowGreeting] = useState(true);

  return (
    <div className="flex flex-col min-h-full max-h-full h-full">
      <div className=''>
      <Greeting userName="Nuel" onComplete={() => setShowGreeting(true)} />
      </div>
      <div className="">
        <TimeComponents />
      </div>
    </div>
  );
};

export default HomePage;

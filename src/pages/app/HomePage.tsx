import React, { useState } from "react";
import Greeting from "../../components/app/home/Greeting";

const HomePage: React.FC = () => {
  const [showGreeting, setShowGreeting] = useState(true);

  return (
    <div className="home-page">
      {showGreeting ? (
        <Greeting userName="Nuel" onComplete={() => setShowGreeting(true)} />
      ) : (
        <div className="main-content">
          <h2 className="text-2xl">Welcome Back!</h2>
        </div>
      )}
    </div>
  );
};

export default HomePage;

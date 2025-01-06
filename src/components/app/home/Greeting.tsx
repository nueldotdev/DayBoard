import React from "react";
// import { getTheme } from "../../../utils/getTheme";
// import FocusStreaks from "./FocusStreaks";
// import { DailyStats } from "./stats/DailyStats";
import { WeatherComponent } from "./Weather";


const Greeting: React.FC = () => {
  // const { currentTheme } = getTheme();
  
  return (
    <div className="flex items-center justify-end gap-x-4">
      {/* <DailyStats theme={currentTheme} />
      <FocusStreaks theme={currentTheme} /> */}
      <WeatherComponent />
    </div>
  );
};

export default Greeting;

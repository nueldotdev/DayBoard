import React from "react";
import { getTheme } from "../../../utils/getTheme";

export const StatsPage: React.FC = () => {
  const { currentTheme } = getTheme();
  return (
    <div className="fill-all">
      <div className="flex flex-col gap-4 p-4 fill-all">
        {/* <!-- Overview Cards --> */}
        <div className="flex gap-4 h-1/5">
          <div className={`border fill-all flex flex-col justify-center items-center text-center shadow rounded-xl p-4 ${currentTheme.glass.bg} ${currentTheme.global.border}`}>
            <h3 className="text-lg font-semibold">Focused Today:</h3>
            <p className="text-2xl font-bold">4h 40m</p>
          </div>
          <div className={`border fill-all flex flex-col justify-center items-center text-center shadow rounded-xl p-4 ${currentTheme.glass.bg} ${currentTheme.global.border}`}>
            <h3 className="text-lg font-semibold">Total Sessions:</h3>
            <p className="text-2xl font-bold">4</p>
          </div>
          <div className={`border fill-all flex flex-col justify-center items-center text-center shadow rounded-xl p-4 ${currentTheme.glass.bg} ${currentTheme.global.border}`}>
            <h3 className="text-lg font-semibold">Goal:</h3>
            <p className="text-2xl font-bold">25m</p>
          </div>
        </div>

        {/* <!-- Graph Section --> */}
        <div className={`fill-all border shadow rounded-xl p-4 ${currentTheme.global.border} ${currentTheme.sidenav.bg}`}>
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <canvas id="weeklyProgressChart"></canvas>
        </div>
      </div>
    </div>
  );
};

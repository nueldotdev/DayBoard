import React from "react";
import { getTheme } from "../../../utils/getTheme";
import GraphComponent from "../../../components/app/stats/GraphComponent";
import usePageTitle from "../../../hooks/usePageTitle";


const weeklyData = [
  { day: 'Mon', hours: 4, fullDay: "Monday" },
  { day: 'Tue', hours: 3, fullDay: "Tuesday" },
  { day: 'Wed', hours: 2, fullDay: "Wednesday" },
  { day: 'Thu', hours: 5, fullDay: "Thursday" },
  { day: 'Fri', hours: 6, fullDay: "Friday" },
  { day: 'Sat', hours: 4, fullDay: "Saturday" },
  { day: 'Sun', hours: 3, fullDay: "Sunday" },
];

export const StatsPage: React.FC = () => {
  const { currentTheme } = getTheme();
  usePageTitle("My Stats");

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
          <div className={`w-1 h-full border ${currentTheme.global.border}`}></div>
          <div className={`border fill-all flex flex-col justify-center items-center text-center shadow rounded-xl p-4 ${currentTheme.glass.bg} ${currentTheme.global.border}`}>
            <h3 className="text-lg font-semibold">Current Streak</h3>
            <p className="text-2xl font-bold">7 days</p>
          </div>
          <div className={`border fill-all flex flex-col justify-center items-center text-center shadow rounded-xl p-4 ${currentTheme.glass.bg} ${currentTheme.global.border}`}>
            <h3 className="text-lg font-semibold">Longest Streak</h3>
            <p className="text-2xl font-bold">15 days</p>
          </div>
        </div>

        {/* <!-- Graph Section --> */}
        <div className="fill-all">
          <div className={`fill-all flex flex-col justify-between border shadow rounded-xl p-4 ${currentTheme.global.border} ${currentTheme.glass.bg}`}>
            <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
            <div className="flex justify-between fill-all space-x-4">
              <GraphComponent data={weeklyData} />
              <div className="flex flex-col w-1/5 justify-between items-center space-y-4">
                <div className={`flex flex-col space- fill-all justify-center items-center text-center rounded-xl p-2 ${currentTheme.sidenav.bg} border ${currentTheme.global.border}`}>
                  <p className="text-xl font-bold">{weeklyData.reduce((total, day) => total + day.hours, 0)} hours</p>
                  <h3 className="text-sm mt-2 font-semibold">Total Focused</h3>
                </div>
                <div className={`flex flex-col space- fill-all justify-center items-center text-center rounded-xl p-2 ${currentTheme.sidenav.bg} border ${currentTheme.global.border}`}>
                  {/* get hours and mins */}
                  <p className="text-xl font-bold">
                    {(weeklyData.reduce((total, day) => total + day.hours * 60, 0) / weeklyData.length / 60).toFixed(0)} hours {(weeklyData.reduce((total, day) => total + day.hours * 60, 0) / weeklyData.length % 60).toFixed(0)} mins
                  </p>
                  <h3 className="text-sm mt-2 font-semibold">Average Focused</h3>
                </div>
                <div className={`flex flex-col space- fill-all justify-center items-center text-center rounded-xl p-2 ${currentTheme.sidenav.bg} border ${currentTheme.global.border}`}>
                  <p className="text-xl font-bold">{weeklyData.reduce((prev, curr) => (prev.hours > curr.hours ? prev : curr)).fullDay}</p>
                  <h3 className="text-sm mt-2 font-semibold">Most Active Day</h3>
                </div>
              </div>
            </div>
            <div>
              {/* Key Stats */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

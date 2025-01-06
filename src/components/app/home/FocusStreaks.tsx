import React from "react";
import { HiOutlineFire } from "react-icons/hi2";
import { TimeComponentsProps } from "../../../utils/interfaces";

const FocusStreaks: React.FC<TimeComponentsProps> = () => {
  // Mock data for streaks
  const streaks = {
    currentStreak: 7,
    longestStreak: 15,
  };

  return (
    <div>
      <div className="space-x-1 flex flex-col items-start">
        <div className="space-x-1 flex items-center justify-center">
          <HiOutlineFire className="text-base" />
          <h2 className="text-base">{streaks.currentStreak}</h2>
        </div>
        <p className="text-sm">Days</p>
      </div>
    </div>
  );
};

export default FocusStreaks;

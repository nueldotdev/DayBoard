import React from 'react';
import { HiOutlineFire } from 'react-icons/hi2';
import { TimeComponentsProps } from '../../../utils/interfaces';

const FocusStreaks: React.FC<TimeComponentsProps> = ({theme}) => {

  // Mock data for streaks
  const streaks = {
    currentStreak: 7,
    longestStreak: 15,
  };


  return (
    <div className={`tc-cards ${theme.glass.bg} ${theme.glass.highlight} ${theme.glass.border} glassmorphism`}>
      <div className='space-x-1 flex items-center'>
        <HiOutlineFire className="text-2xl text-red-500" />
        <h2 className="text-base font-bold">Streak</h2>
      </div>
      <div className="fill-all flex justify-between items-center">
        <div className="flex flex-col justify-center w-full items-center">
          <p className="font-bold text-4xl">{streaks.currentStreak}</p>
          <p className="text-xs">{streaks.currentStreak > 1 ? "Days" : "Day"}</p>
        </div>
        <div className={`w-[7px] h-[80%] rounded-lg border ${theme.glass.border}`} />
        <div className="flex flex-col justify-center w-full items-center">
          <p className="font-bold text-4xl opacity-55">{streaks.longestStreak}</p>
          <p className="text-xs">{streaks.longestStreak > 1 ? "Days" : "Day"}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-center w-full items-center">
          <p className="text-xs">Current</p>
        </div>
        <div className="flex flex-col justify-center w-full items-center">
          <p className="text-xs">Longest</p>
        </div>
      </div>
    </div>
  );
};

export default FocusStreaks;

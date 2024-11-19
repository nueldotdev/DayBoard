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
    <div className={`p-4 border rounded shadow ${theme.textBg} fill-all`}>
      <HiOutlineFire className="text-2xl mb-2 text-red-500" />
      <h2 className="text-lg font-bold">Focus Streaks</h2>
      <p className="mt-2 text-sm">
        Keep up the good work! Here's how you're doing:
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Current Streak:</span>
          <span className="font-bold">{streaks.currentStreak} days</span>
        </div>
        <div className="flex justify-between">
          <span>Longest Streak:</span>
          <span className="font-bold">{streaks.longestStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default FocusStreaks;

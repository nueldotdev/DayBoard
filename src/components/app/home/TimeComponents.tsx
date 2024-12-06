import React from 'react';
import { getTheme } from '../../../utils/getTheme';
import { FocusMode } from './focus/FocusMode';
import FocusStreaks from './FocusStreaks';
import { Reminder } from './reminder/Reminder';
import { DailyStats } from './stats/DailyStats';

const TimeComponents: React.FC = () => {
  const theme = getTheme();
  const { currentTheme } = theme;

  return (
  <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2 p-4 h-full">
    <div className='col-span-2 row-span-2'>
      <FocusMode theme={currentTheme} />
    </div>
    <div className='col-span-2'>
      <Reminder theme={currentTheme} />
    </div>
    <DailyStats theme={currentTheme} />
    <FocusStreaks theme={currentTheme} />
  </div>
)};

export default TimeComponents;

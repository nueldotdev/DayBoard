import React from 'react';
import { getTheme } from '../../../utils/getTheme';
import { FocusMode } from './focus/FocusMode';
import FocusStreaks from './FocusStreaks';
import { Reminder } from './reminder/Reminder';
import { DailyStats } from './stats/DailyStats';
import { PomodoroArea } from './time/PomodoroArea';

const TimeComponents: React.FC = () => {
  const theme = getTheme();
  const { currentTheme } = theme;

  return (
  <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2 p-4">
    <PomodoroArea theme={currentTheme} />
    <div className='col-span-2 row-span-1'>
      <FocusMode theme={currentTheme} />
    </div>
    <Reminder theme={currentTheme} />
    <DailyStats theme={currentTheme} />
    <FocusStreaks theme={currentTheme} />
  </div>
)};

export default TimeComponents;

import React from 'react';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineBell } from 'react-icons/hi2';
import { getTheme } from '../../../utils/getTheme';



const PomodoroTimer: React.FC = () => {
  return (
    <div className={`timer-cards ${getTheme().btnHover} ${getTheme().border}`}>
      <HiOutlineClock className="text-2xl mb-2" />
      <h2 className="text-lg font-bold">Pomodoro</h2>
      <p>Work for 25 minutes, then take a break!</p>
    </div>
  );
};

const CountdownTimer: React.FC = () => {
  return (
    <div className={`timer-cards ${getTheme().btnHover} ${getTheme().border}`}>
      <HiOutlineCalendar className="text-2xl mb-2" />
      <h2 className="text-lg font-bold">Countdown Timer</h2>
      <p>Set a timer for an upcoming event.</p>
    </div>
  );
};

const Placeholder: React.FC = () => {
  return (
    <div className={`timer-cards ${getTheme().btnHover} ${getTheme().border}`}>
      <HiOutlineBell className="text-2xl mb-2" />
      <h2 className="text-lg font-bold">Reminders</h2>
      <p>Placeholder for the third component.</p>
    </div>
  );
};

const TimeComponents: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 px-4">
      <PomodoroTimer />
      <CountdownTimer />
      <Placeholder />
    </div>
  );
};

export default TimeComponents;

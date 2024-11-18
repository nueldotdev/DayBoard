import React, { useMemo } from 'react';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineBell } from 'react-icons/hi2';
import { HiTrendingUp } from 'react-icons/hi';
import { getTheme } from '../../../utils/getTheme';
import FocusStreaks from './FocusStreaks';
import PomodoroTimer from './time/Pomodoro';
import { useTimerStore } from '../../../store/timerStore';

const PomodoroArea: React.FC = () => {
  const { isActive, startTimer, hasPreviousSession } = useTimerStore();

  return (
    <Card>
      <HiOutlineClock className="text-2xl mb-2" />
      {!isActive && !hasPreviousSession ? (
        <>
          <h2 className="text-lg font-bold">Pomodoro Timer</h2>
          <p>Work for 25 minutes, then take a break!</p>
          <Button onClick={startTimer}>Start Timer</Button>
        </>
      ) : (
        <PomodoroTimer />
      )}
    </Card>
  );
};

const FocusMode: React.FC = () => (
  <Card className="col-span-2">
    <h2 className="text-2xl font-bold mb-4">Focus Mode</h2>
    <p>Clock in to start focusing on your project, and allocate time for tasks.</p>
    <Button>Start Session</Button>
  </Card>
);

const Reminder: React.FC = () => (
  <Card>
    <div className="flex flex-col gap-y-2">
      <HiOutlineBell className="text-2xl mb-2" />
      <h2 className="text-lg font-bold">Reminders</h2>
      <p>Upcoming tasks and notifications.</p>
    </div>
    <Button>Add Reminder</Button>
  </Card>
);

const DailyStats: React.FC = () => (
  <Card>
    <HiTrendingUp className="text-2xl mb-2" />
    <h2 className="text-lg font-bold">Daily Stats</h2>
    <p>Track your productivity for today.</p>
  </Card>
);

const TimeComponents: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-3 p-4">
    <PomodoroArea />
    <FocusMode />
    <Reminder />
    <DailyStats />
    <FocusStreaks />
  </div>
);

export default TimeComponents;

// Reusable Card Component
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const theme = useMemo(() => getTheme(), []);
  return (
    <div className={`p-4 border rounded shadow ${theme.btnHover} ${theme.border} ${theme.bg} ${className}`}>
      {children}
    </div>
  );
};

// Reusable Button Component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  const theme = useMemo(() => getTheme(), []);
  return (
    <button
      className={`mt-4 p-2 px-4 ${theme.textBg} rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

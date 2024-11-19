import React from 'react';
import { getTheme } from '../../../utils/getTheme';
import { FocusMode } from './focus/FocusMode';
import FocusStreaks from './FocusStreaks';
import { Reminder } from './reminder/Reminder';
import { DailyStats } from './stats/DailyStats';
import { PomodoroArea } from './time/PomodoroArea';


// const PomodoroArea: React.FC<TimeComponentsProps> = ({theme}) => {
//   const { isActive, startTimer, hasPreviousSession } = useTimerStore();

//   return (
//     <Card className={`${theme.bg} ${theme.border} ${theme.text} fill-all`}>
//       <HiOutlineClock className="text-2xl mb-2" />
//       {!isActive && !hasPreviousSession ? (
//         <>
//           <h2 className="text-lg font-bold">Pomodoro Timer</h2>
//           <p>Work for 25 minutes, then take a break!</p>
//           <Button onClick={startTimer} className=''>Start Timer</Button>
//         </>
//       ) : (
//         <PomodoroTimer />
//       )}
//     </Card>
//   );
// };

// const FocusMode: React.FC<TimeComponentsProps> = ({theme}) => (
//   <Card className={`${theme.bg} ${theme.border} ${theme.text} fill-all`}>
//     <h2 className="text-2xl font-bold mb-4">Focus Mode</h2>
//     <p>Clock in to start focusing on your project, and allocate time for tasks.</p>
//     <Button>Start Session</Button>
//   </Card>
// );

// const Reminder: React.FC<TimeComponentsProps> = ({theme}) => (
//   <Card className={`${theme.bg} ${theme.border} ${theme.text} fill-all`}>
//     <div className="flex flex-col gap-y-2">
//       <HiOutlineBell className="text-2xl mb-2" />
//       <h2 className="text-lg font-bold">Reminders</h2>
//       <p>Upcoming tasks and notifications.</p>
//     </div>
//     <Button>Add Reminder</Button>
//   </Card>
// );

// const DailyStats: React.FC<TimeComponentsProps> = ({theme}) => (
//   <Card className={`${theme.bg} ${theme.border} ${theme.text} fill-all`}>
//     <HiTrendingUp className="text-2xl mb-2" />
//     <h2 className="text-lg font-bold">Daily Stats</h2>
//     <p>Track your productivity for today.</p>
//   </Card>
// );


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

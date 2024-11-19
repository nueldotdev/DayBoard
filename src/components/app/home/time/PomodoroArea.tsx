import { HiOutlineClock } from "react-icons/hi2";
import { useTimerStore } from "../../../../store/timerStore";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import PomodoroTimer from "./Pomodoro";

export const PomodoroArea:  React.FC<TimeComponentsProps> = ({theme}) => {
  const { isActive, startTimer, hasPreviousSession } = useTimerStore();
  console.log({isActive, hasPreviousSession});

  return (
    <div className={`p-4 border rounded shadow ${theme.bg} ${theme.border} fill-all`}>
      <HiOutlineClock className="text-2xl mb-2" />
      {isActive || hasPreviousSession ? (
        <PomodoroTimer />
      ) : (
        <>
          <h2 className="text-lg font-bold">Pomodoro Timer</h2>
          <p>Work for 25 minutes, then take a break!</p>
          <button onClick={startTimer} className={``}>
            Start Timer
          </button>
        </>
      )}
    </div>
  );
};
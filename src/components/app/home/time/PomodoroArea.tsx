import { HiOutlineClock } from "react-icons/hi2";
import { useTimerStore } from "../../../../store/timerStore";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import PomodoroTimer from "./Pomodoro";

export const PomodoroArea:  React.FC<TimeComponentsProps> = ({theme}) => {
  const { isActive, startTimer, hasPreviousSession } = useTimerStore();
  console.log({isActive, hasPreviousSession});

  return (
    <div className={`tc-cards ${theme.bg} ${theme.border}`}>
      <HiOutlineClock className="text-2xl mb-2" />
      {isActive || hasPreviousSession ? (
        <PomodoroTimer />
      ) : (
        <div className="tc-cards shadow-none border-0 p-0 m-0">
          <div className="space-y-2">
            <h2 className="text-lg font-bold mt-1">Pomodoro Timer</h2>
            <p>Work for 25 minutes, then take a break!</p>
          </div>
          <button onClick={startTimer} className={`tc-btns ${theme.textBg}`}>
            Start Timer
          </button>
        </div>
      )}
    </div>
  );
};
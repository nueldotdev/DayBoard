import React, { useEffect } from "react";
import { useTimerStore } from "../../../../store/timerStore";
import { GeneralProps } from "../../../../utils/interfaces";
import { HiOutlinePlay, HiOutlinePause, HiArrowPath } from "react-icons/hi2";

const PomodoroTimer: React.FC<GeneralProps> = ({theme}) => {
  const {
    minutes,
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    initializeTimer,
  } = useTimerStore();

  useEffect(() => {
    initializeTimer(); // Restore state on component mount
  }, [initializeTimer]);

  return (
    <div className="space-y-4 h-full flex flex-col items-center justify-center">
      <div className="text-9xl mb-10">{`${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`}</div>
      <div className="flex justify-center gap-x-2 w-full">
        {!isActive ? (
          <button className={`mini-timer-btn p-2 ${theme.hoverEffects.btnHover} ${theme.global.border}`} onClick={startTimer}>
            <HiOutlinePlay />
          </button>
        ) : (
          <button className={`mini-timer-btn p-2 ${theme.hoverEffects.btnHover} ${theme.global.border}`} onClick={pauseTimer}>
            <HiOutlinePause />
          </button>
        )}
        <button className={`mini-timer-btn p-2 ${theme.hoverEffects.btnHover} ${theme.global.border}`} onClick={resetTimer}>
          <HiArrowPath />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTimerStore } from '../../../../store/timerStore';
import { HiOutlinePlay, HiOutlinePause, HiArrowPath } from "react-icons/hi2";
import { getTheme } from '../../../../utils/getTheme';

const MiniPomo: React.FC = () => {
  const { pathname } = useLocation();
  const {
    minutes,
    seconds,
    isActive,
    isWorkSession,
    hasPreviousSession,
    initializeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerStore();

  // Ensure hooks remain consistent
  const theme = getTheme();

  useEffect(() => {
    initializeTimer(); // Restore state on component mount
  }, [initializeTimer]);

  // Avoid rendering on the homepage
  if (pathname === '/') return null;

  return (
    <div className={`fixed flex flex-col gap-y-2 bottom-0 right-0 p-2 rounded-lg`}>
      <h3 className="text-sm font-semibold">{isWorkSession ? 'Work Session' : 'Break'}</h3>
      <div className="text-xl font-bold text-center">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-x-2 w-full">
        {!isActive ? (
          <button className={`mini-timer-btn ${theme.btnHover} ${theme.border}`} onClick={startTimer}>
            <HiOutlinePlay />
          </button>
        ) : (
          <button className={`mini-timer-btn ${theme.btnHover} ${theme.border}`} onClick={pauseTimer}>
            <HiOutlinePause />
          </button>
        )}
        <button className={`mini-timer-btn ${theme.btnHover} ${theme.border}`} onClick={resetTimer}>
          <HiArrowPath />
        </button>
      </div>
    </div>
  );
};

export default MiniPomo;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTimerStore } from '../../../../store/timerStore';
import { HiOutlinePlay, HiOutlinePause, HiArrowPath, HiXMark } from "react-icons/hi2";
import { getTheme } from '../../../../utils/getTheme';

const MiniPomo: React.FC = () => {
  const { pathname } = useLocation();
  const {
    minutes,
    seconds,
    isActive,
    isWorkSession,
    initializeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerStore();

  // Ensure hooks remain consistent
  const {currentTheme} = getTheme();
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    initializeTimer(); // Restore state on component mount
  }, [initializeTimer]);

  // Avoid rendering on the homepage
  if (pathname === '/app') return null;
  if (!visible) return null;

  return (
    <div className={`fixed flex flex-col gap-y-2 bottom-0 right-0 p-2 rounded-lg hover:border ${currentTheme.global.border} hover:${currentTheme.hoverEffects.btnHover}`}>
      <h3 className="text-sm text-center font-semibold">{isWorkSession ? 'Work Session' : 'Break'}</h3>
      <button onClick={() => setVisible(false)}><HiXMark /></button>
      <div className="text-xl font-bold text-center">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-x-2 w-full">
        {!isActive ? (
          <button className={`mini-timer-btn ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.border}`} onClick={startTimer}>
            <HiOutlinePlay />
          </button>
        ) : (
          <button className={`mini-timer-btn ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.border}`} onClick={pauseTimer}>
            <HiOutlinePause />
          </button>
        )}
        <button className={`mini-timer-btn ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.border}`} onClick={resetTimer}>
          <HiArrowPath />
        </button>
      </div>
    </div>
  );
};

export default MiniPomo;

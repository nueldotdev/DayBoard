import React, { useEffect } from 'react';
import { useTimerStore } from '../../../../store/timerStore';


const PomodoroTimer: React.FC = () => {
  const {
    minutes,
    seconds,
    isActive,
    hasPreviousSession,
    startTimer,
    pauseTimer,
    resetTimer,
    initializeTimer,
  } = useTimerStore();

  useEffect(() => {
    initializeTimer(); // Restore state on component mount
  }, [initializeTimer]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
      <div className="text-xl">{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</div>
      {hasPreviousSession ? (
        <div className='flex gap-4 mt-4'>
          <button onClick={startTimer} className="bg-blue-500 text-white px-4 py-2 rounded">
            Continue
          </button>
          <button onClick={resetTimer} className="bg-red-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      ) : (
        <div className="flex gap-4 mt-4">
          {!isActive ? (
            <button onClick={startTimer} className="bg-green-500 text-white px-4 py-2 rounded">
              Start
            </button>
          ) : (
            <button onClick={pauseTimer} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Pause
            </button>
            )}
            <button onClick={resetTimer} className="bg-red-500 text-white px-4 py-2 rounded">
              Reset
            </button>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;

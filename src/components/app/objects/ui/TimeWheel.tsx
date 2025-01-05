import React from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { useTimerStore } from '../../../../store/timerStore';
import { mainTheme } from '../../../../utils/interfaces';

const TimeWheel: React.FC<{ theme: mainTheme}> = ({theme}) => {
  const { minutes, seconds, setMinutes, setSeconds } = useTimerStore();


  const incrementMinutes = () => {
    if (minutes < 59 && minutes >= 0) {
      setMinutes(minutes + 1);
    }
  };

  const decrementMinutes = () => {
    if (minutes <= 59 && minutes > 0) {
      setMinutes(minutes - 1);
    }
  };

  const incrementSeconds = () => {
    if (seconds < 59 && seconds >= 0) {
      setSeconds(seconds + 1);
    }
  };

  const decrementSeconds = () => {
    if (seconds <= 59 && seconds > 0) {
      setSeconds(seconds - 1);
    }
  };

  return (
    <div className="flex items-center justify-evenly text-5xl">
  <div className="time-section">
    <button 
      onMouseDown={() => {
        const interval = setInterval(incrementMinutes, 100);
        document.addEventListener('mouseup', () => clearInterval(interval));
      }}
      onClick={incrementMinutes}
    >
      <HiOutlineChevronUp />
    </button>
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const value = parseInt(e.target.innerText, 10);
        if (!isNaN(value) && value >= 0 && value <= 59) {
          setMinutes(value);
        } else {
          e.target.innerText = String(minutes); // Revert to previous valid value
        }
      }}
      className="editable-time-section"
    >
      {minutes}
    </div>
    <button 
      onMouseDown={() => {
        const interval = setInterval(decrementMinutes, 100);
        document.addEventListener('mouseup', () => clearInterval(interval));
      }}
      onClick={decrementMinutes}
    >
      <HiOutlineChevronDown />
    </button>
    <p>Minutes</p>
  </div>
  <div className="time-separator mb-5">:</div>
  <div className="time-section">
    <button 
      onMouseDown={() => {
        const interval = setInterval(incrementSeconds, 100);
        document.addEventListener('mouseup', () => clearInterval(interval));
      }}
      onClick={incrementSeconds}
    >
      <HiOutlineChevronUp />
    </button>
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const value = parseInt(e.target.innerText, 10);
        if (!isNaN(value) && value >= 0 && value <= 59) {
          setSeconds(value);
        } else {
          e.target.innerText = String(minutes); // Revert to previous valid value
        }
      }}
      className="editable-time-section"
    >
      {seconds}
    </div>
    <button 
      onMouseDown={() => {
        const interval = setInterval(decrementSeconds, 100);
        document.addEventListener('mouseup', () => clearInterval(interval));
      }}
      onClick={decrementSeconds}
    >
      <HiOutlineChevronDown />
    </button>
    <p>Seconds</p>
  </div>
</div>

  );
};

export default TimeWheel;
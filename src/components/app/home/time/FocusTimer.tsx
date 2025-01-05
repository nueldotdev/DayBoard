import React, { useEffect, useRef, useState } from "react";
import { HiArrowPath, HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";

const FocusTimer: React.FC<{ theme: any }> = ({ theme }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0); // Default focus session: 25 minutes
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [note, setNote] = useState("");
  const intervalRef = useRef<any>(null);
  // Function to start the timer
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0 && hours === 0) {
              // Timer ends
                clearInterval(intervalRef.current!);
                setIsActive(false);
                return 0;
              }
              if (minutes === 0 && hours > 0) {
                setMinutes(59);
                setHours((prev) => prev - 1);
              } else if (minutes > 0) {
                setMinutes((prev) => prev - 1);
              }
              return 59;
              }
              return prev - 1;
            });
            }, 1000);
          }
          };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current!);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current!);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
    setNote(""); // Clear the notes
  };

  // Handle duration input changes
  const handleDurationChange = (field: "h" | "m", value: number) => {
    if (field === "h") {
      setHours(Math.max(0, value)); // Prevent negative values
    } else {
      setMinutes(Math.max(0, value));
    }
    setSeconds(0); // Reset seconds whenever duration changes
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <div className="space-y-6 h-full fill-all flex flex-col items-center justify-center">
      {/* Timer Display */}
      <div className="text-8xl mb-6 p-2">
        {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`}
      </div>

      {/* Duration Selector */}
      <div className="flex gap-4 items-center mb-4">
        <div className="flex flex-col">
          <label className={`${theme.global.textSecondary} text-sm`}>Hours</label>
          <input
            type="number"
            className={`mini-input w-16 p-1 rounded-md ${theme.global.border} ${theme.sidenav.bg} ${theme.global.textPrimary}`}
            value={hours}
            onChange={(e) => handleDurationChange("h", parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="flex flex-col">
          <label className={`${theme.global.textSecondary} text-sm`}>Minutes</label>
          <input
            type="number"
            className={`mini-input w-16 p-1 rounded-md ${theme.global.border} ${theme.sidenav.bg} ${theme.global.textPrimary}`}
            value={minutes}
            onChange={(e) => handleDurationChange("m", parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Buttons */}
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

      {/* Notes Section */}
      <div className="w-full flex flex-col items-center mt-6">
        <input
          className={`mini-input w-[60%] p-2 rounded-md text-center ${theme.sidenav.bg} ${theme.global.border} ${theme.global.textPrimary}`}
          placeholder="Write something to keep yourself focused..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default FocusTimer;

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiEllipsisHorizontal, HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import { getTheme } from "../../../utils/getTheme";
import { formatFullDate, formatTime } from "../../../utils/timeFormat";
import { useTimerStore } from "../../../store/timerStore";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { Modal } from "../objects/ui/Modal";
import TimeWheel from "../objects/ui/TimeWheel";

const TimeAndTimer: React.FC<{ userName: string }> = ({ userName }) => {
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [time, setTime] = useState(formatTime(new Date()));
  const [fullDate, setFullDate] = useState(formatFullDate(new Date()));
  const [isModalVisible, setIsModalVisible] = useState(false);


  const { currentTheme } = getTheme();

  // Timer state from store
  const {
    minutes,
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    initializeTimer,
  } = useTimerStore();

  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowWords((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
      setFullDate(formatFullDate(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isActive) {
      setIsTimerVisible(true);
    } else {
      setIsTimerVisible(false);
    }
  }, [isActive]);

  useEffect(() => {
    initializeTimer();
  }, [initializeTimer]);


  const words = {
    morning: [
      `Good morning, ${userName}!`,
      `Hope you have a productive day ${userName}!`,
      `Keep up the great work ${userName}!`,
    ],
    noon: [
      `How's the day going, ${userName}?`,
      `Don't forget to take breaks!`,
      `${userName}, remember to stay hydrated!`,
    ],
    night: [
      `How was the day, ${userName}?`,
      `Time to relax and unwind !`,
      `Great job today ${userName}!`,
    ],
  };

  let greeting = "";
  if (greeting === "") {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 12) {
      greeting = words.morning[Math.floor(Math.random() * words.morning.length)];
    } else if (hours >= 12 && hours < 18) {
      greeting = words.noon[Math.floor(Math.random() * words.noon.length)];
    } else {
      greeting = words.night[Math.floor(Math.random() * words.night.length)];
    }
  } else { }

  return (
    <div className="fill-all flex flex-col items-center justify-center">
      
      <div className="flex flex-col items-center justify-center fill-all mb-2">
        {/* <AnimatePresence> */}
          
        {isTimerVisible ? (
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1 flex flex-col items-center justify-center"
          >
            <div className="flex items-center justify-center num-container">
              <div className="text-[10rem] p-2 num-main">
                {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                  2,
                  "0"
                )}`}
              </div>
              <button onClick={() => setIsTimerVisible(!isTimerVisible)} className="btn-switch-mode">
                <HiEllipsisHorizontal size={40} />
              </button>
            </div>
            <div className="flex justify-center gap-x-2 w-full">
              {!isActive ? (
                <button
                  className={`mini-timer-btn p-2 ${currentTheme.hoverEffects.btnHover} ${currentTheme.glass.border}`}
                  onClick={startTimer}
                >
                  <HiOutlinePlay />
                </button>
              ) : (
                <button
                  className={`mini-timer-btn p-2 ${currentTheme.hoverEffects.btnHover} ${currentTheme.glass.border}`}
                  onClick={pauseTimer}
                >
                  <HiOutlinePause />
                </button>
              )}
              <button
                className={`mini-timer-btn p-2 ${currentTheme.hoverEffects.btnHover} ${currentTheme.glass.border}`}
                onClick={() => setIsModalVisible(true)}
              >
                <HiOutlineSwitchHorizontal />
              </button>
            </div>
          </motion.div>
        ) : (
            <AnimatePresence mode="wait">
            <motion.div
              key="time-display"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center num-container">
                <h1 className="text-[10rem] font-normal num-main">{time}</h1>
                <button onClick={() => setIsTimerVisible(!isTimerVisible)} className="btn-switch-mode">
                  <HiEllipsisHorizontal size={40} />
                </button>
              </div>
              {showWords ? (
              <motion.p
                key="greeting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-3xl"
              >
                {greeting}
              </motion.p>
              ) : (
              <motion.p
                key="fullDate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-3xl"
              >
                {fullDate}
              </motion.p>
              )}
            </motion.div>
            </AnimatePresence>
        )}
        {/* </AnimatePresence> */}
      </div>

      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)} theme={currentTheme}>
        <TimeWheel theme={currentTheme} />
      </Modal>
    </div>
  );
};

export default TimeAndTimer;
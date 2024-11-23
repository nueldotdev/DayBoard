import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatFullDate, formatTime } from "../../../utils/timeFormat";
import { HiOutlineDocumentText,
  HiOutlineCheckCircle
} from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import Popover from "../objects/Popover";
import useThemeStore from "../../../store/themeStore";
import { themes } from "../../../themeConfig";



interface GreetingProps {
  userName: string;
}

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  if (currentHour < 18) return "Good Afternoon";
  return "Good Evening";
};
const getSubText = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Ready to start your day?";
  if (currentHour < 18) return "How is your day going?";
  return "How was your day?";
};

const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));
  const [fullDate, setFullDate] = useState(formatFullDate(new Date()));
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
      setFullDate(formatFullDate(new Date()));
    }, 60000); // update every minute
    
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    // Set timer to hide greeting after 5 seconds
    const timer = setTimeout(() => setIsVisible(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const PopContent: React.FC = () => {
    return (
      <div className={`w-full break-normal p-1 border rounded-md flex flex-col space-y-2 ${currentTheme.global.border} ${currentTheme.global.bg}`}>
        <button className={`flex w-full items-center gap-x-2 text-base ${currentTheme.hoverEffects.btnHover} p-2 px-4 rounded-md`}>
          <HiOutlineDocumentText />
          New Note
        </button>
        <button className={`flex w-full items-center gap-x-2 text-base ${currentTheme.hoverEffects.btnHover} p-2 px-4 rounded-md`}>
          <HiOutlineCheckCircle />
          New Task
        </button>
      </div>
    )
  }
   

  return (
    <div className="greeting-message">
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-3xl">{getSubText()}</p>
          </motion.div>
        ) : (
          <motion.div
            key="time-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h1 className="text-6xl font-bold">{time}</h1>
            <p className="text-3xl">{fullDate}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Popover content={<PopContent />}>
          <button className={`p-2 rounded-md ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.text} cursor-pointer transition-colors`}>
            <FaRegUserCircle size={24} />
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default Greeting;

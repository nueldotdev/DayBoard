
import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect, ReactNode } from 'react';
// import './Popover.css';

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "bottomRight" | "bottomLeft";
}

const Popover: React.FC<PopoverProps> = ({ children, content, position = "bottom" }) => {

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
    bottomRight: "left-full top-1/2 translate-y-4 ml-3",
    bottomLeft: "right-full top-1/2 translate-y-4 mr-3",
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="popover-container">
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className={`popover-trigger`}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        <motion.div
          ref={popoverRef}
          className={`absolute ${positionClasses[position]} rounded z-10 w-fit`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

export default Popover;
import React from "react";
import { mainTheme } from "../../../../utils/interfaces";

interface TooltipProps {
  text: string; // Text to display in the tooltip
  children: React.ReactNode; // Element that triggers the tooltip
  position?: "top" | "bottom" | "left" | "right"; // Tooltip position
  theme?: mainTheme;
}

const Tooltip: React.FC<TooltipProps> = ({ text, theme, children, position = "top" }) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div className="relative group">
      {/* Trigger element */}
      {children}

      {/* Tooltip */}
      <div
        className={`absolute ${positionClasses[position]} ${theme?.sidenav.bg} ${theme?.global.text} text-xs rounded px-4 py-2 shadow opacity-0 group-hover:opacity-100 transition pointer-events-none z-[100000]`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

import React from "react";
import { GeneralProps } from "../../../../utils/interfaces";

type Mode = "focus" | "pomodoro";

interface SegmentedControlProps extends GeneralProps {
  activeMode: Mode; // The currently active mode
  onModeChange: (mode: Mode) => void; // Callback when a mode is clicked
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  activeMode,
  onModeChange,
  theme,
}) => {
  const modes: Mode[] = ["focus", "pomodoro"];

  return (
    <div className={`relative w-full max-w-xs mx-auto ${theme.sidenav.bg} rounded-lg p-1 flex items-center`}>
      {/* Background Indicator */}
      <div
        className={`absolute left-1 h-[90%] w-1/2 ${theme.glass.bg} ${theme.glass.border} border rounded-lg transition-transform duration-300`}
        style={{
          transform: `translateX(${activeMode === "pomodoro" ? "95%" : "0"})`,
        }}
      ></div>

      {/* Mode Buttons */}
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`relative z-10 w-1/2 text-center text-sm font-medium py-1 rounded-lg ${
            activeMode === mode ? `${theme.global.text}` : `${theme.global.textSecondary}`
          }`}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;

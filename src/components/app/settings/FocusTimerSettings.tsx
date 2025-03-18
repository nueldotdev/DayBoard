// FocusTimerSettings.tsx
import React from "react";
import { Button } from "../objects/ui/Button";
import { mainTheme } from "../../../utils/interfaces";

interface FocusTimerSettingsProps {
  focusTime: number;
  setFocusTime: React.Dispatch<React.SetStateAction<number>>;
  onSave: () => void;
  loading: boolean;
  theme: mainTheme;
}

const FocusTimerSettings: React.FC<FocusTimerSettingsProps> = ({ theme, focusTime, setFocusTime, onSave, loading }) => {
  return (
    <div className="rounded p-4 w-full">
      <h2 className="text-xl font-semibold">Focus Timer</h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">Focus Duration (minutes)</label>
          <input
            type="number"
            value={focusTime}
            onChange={(e) => setFocusTime(Math.max(1, Number(e.target.value)))}
            className={`p-2 border rounded w-16 text-center ${theme.global.border} ${theme.global.bg} ${theme.global.text}`}
            min={1}
          />
        </div>
        <Button
          className={`mt-4 p-2 rounded-md ${theme.global.text} ${theme.global.border} border ${theme.hoverEffects.btnHover} w-[150px] flex justify-center`}
          onClick={onSave}
          loading={loading}
        >
          {"Save Focus Time"}
        </Button>
      </div>
    </div>
  );
};

export { FocusTimerSettings };

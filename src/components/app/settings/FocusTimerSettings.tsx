// FocusTimerSettings.tsx
import React from "react";
import { Button } from "../objects/ui/Button";

interface FocusTimerSettingsProps {
  focusTime: number;
  setFocusTime: React.Dispatch<React.SetStateAction<number>>;
  onSave: () => void;
  loading: boolean;
}

const FocusTimerSettings: React.FC<FocusTimerSettingsProps> = ({ focusTime, setFocusTime, onSave, loading }) => {
  return (
    <div className="rounded p-4 w-full shadow-lg">
      <h2 className="text-xl font-semibold">Focus Timer</h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-500">Focus Duration (minutes)</label>
          <input
            type="number"
            value={focusTime}
            onChange={(e) => setFocusTime(Math.max(1, Number(e.target.value)))}
            className="p-2 border rounded w-16 text-center"
            min={1}
          />
        </div>
        <Button
          className="w-full mt-4"
          onClick={onSave}
          disabled={loading}
          loading={loading}
        >
          {loading ? "Saving..." : "Save Focus Time"}
        </Button>
      </div>
    </div>
  );
};

export { FocusTimerSettings };

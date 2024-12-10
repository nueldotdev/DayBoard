import { useState } from "react";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import { PiBinoculars } from "react-icons/pi";
import { ComingSoon } from "../../objects/ui/ComingSoon";
import { Modal } from "../../objects/ui/Modal";
import SegmentedControl from "../../objects/ui/SegmentedControl";
import Pomodoro from "../time/Pomodoro";
import FocusTimer from "../time/FocusTimer";

type Mode = "focus" | "pomodoro";


export const ModeComponent: React.FC<TimeComponentsProps> = ({ theme }) => {
  const [mode, setMode] = useState<Mode>("focus");
  const [forModal, setForModal] = useState(false);
  const [focusReady, setFocusReady] = useState(false);

  return (
    <>
      <div
        className={`tc-cards shadow  ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.highlight} glassmorphism col-sapn-2`}
      >
        <SegmentedControl activeMode={mode} onModeChange={(e) => setMode(e)} theme={theme} />
        <div className="fill-all flex items-center justify-center">
        {mode === "focus" ? (
          <FocusTimer theme={theme} />
        ) : <Pomodoro theme={theme} />}
        </div>
      </div>

      <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
        <ComingSoon />
      </Modal>
    </>
  );
};
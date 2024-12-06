import { useState } from "react";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import { PiBinoculars } from "react-icons/pi";
import { ComingSoon } from "../../objects/ui/ComingSoon";
import { Modal } from "../../objects/ui/Modal";
import SegmentedControl from "../../../reuse/SegmentedControl";

type Mode = "focus" | "pomodoro";

export const FocusMode: React.FC<TimeComponentsProps> = ({ theme }) => {
  const [forModal, setForModal] = useState(false);
  const [mode, setMode] = useState<Mode>("focus");

  return (
    <>
      <div
        className={`tc-cards shadow  ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.highlight} glassmorphism col-sapn-2`}
      >
        <SegmentedControl activeMode={mode} onModeChange={(e) => setMode(e)} theme={theme} />
        <div className="space-y-2">
          <PiBinoculars className="text-2xl" />
          <h2 className="text-2xl font-bold">Focus Mode</h2>
          <p>
            Clock in to start focusing on your project, and allocate time for
            tasks.
          </p>
        </div>
        <button
          className={`tc-btns ${theme.hoverEffects.textBg}`}
          onClick={() => setForModal(true)}
        >
          Start Session
        </button>
      </div>
      <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
        <ComingSoon />
      </Modal>
    </>
  );
};

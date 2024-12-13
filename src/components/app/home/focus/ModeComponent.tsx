import { useState } from "react";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import { ComingSoon } from "../../objects/ui/ComingSoon";
import { Modal } from "../../objects/ui/Modal";
// import SegmentedControl from "../../objects/ui/SegmentedControl";
// import Pomodoro from "../time/Pomodoro";
import FocusTimer from "../time/FocusTimer";
import Popover from "../../objects/ui/Popover";

type Mode = "Timer" | "Block";


export const ModeComponent: React.FC<TimeComponentsProps> = ({ theme }) => {
  const [mode, setMode] = useState<Mode>("Timer");
  const [forModal, setForModal] = useState(false);

  const modes: Mode[] = ["Timer", "Block"]


  const PopoverContent = () => {

    return (
      <div className={`${theme.sidenav.bg} rounded-xl border ${theme.glass.border} w-64 gap-y-4 flex flex-col`}>
        {modes.map((active) => (
          <button className={`${mode === active ? `${theme.glass.border}` : ""}`} onClick={() => setMode(active)}>
            Focus {active}
          </button>
        ))}
      </div>
    )
  }

  return (
    <>
      <div
        className={`tc-cards shadow  ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.highlight} glassmorphism col-sapn-2 flex flex-col items-center`}
      >
        <Popover position="bottom" content={<PopoverContent />} >
          <button className={`flex justify-center ${theme.global.textPrimary} text-base ${theme.glass.border} border ${theme.hoverEffects.btnHover} p-2 rounded-xl`}>
            <h2>Focus {mode}</h2>
          </button>
        </Popover>
        <div className="fill-all flex items-center justify-center">
          <FocusTimer theme={theme} />
        </div>
      </div>

      <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
        <ComingSoon />
      </Modal>
    </>
  );
};
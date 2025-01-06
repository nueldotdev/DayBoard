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
      <div className={`${theme.sidenav.bg} p-2 rounded-xl border ${theme.glass.border} w-fit gap-y-2 flex flex-col`}>
        {modes.map((active) => (
          <button className={`${mode === active ? `${theme.hoverEffects.textBg}` : `${theme.glass.highlight}`} p-2 rounded-lg w-36`} onClick={() => setMode(active)}>
            Focus {active}
          </button>
        ))}
      </div>
    )
  }

  return (
    <>
      <div
        className={`fill-all flex flex-col items-center`}
      >
        <Popover position="bottom" content={<PopoverContent />} >
          <button className={`flex justify-center ${theme.global.textPrimary} text-base ${theme.sidenav.border} border ${theme.hoverEffects.btnHover} p-2 rounded-xl transition-all`}>
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
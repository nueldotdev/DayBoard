import { useState } from "react";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import { PiBinoculars } from "react-icons/pi";
import { ComingSoon } from "../../objects/ui/ComingSoon";
import { Modal } from "../../objects/ui/Modal";

export const FocusMode: React.FC<TimeComponentsProps> = ({ theme }) => {
  const [forModal, setForModal] = useState(false);

  return (
    <div
      className={`tc-cards shadow ${theme.global.bg} ${theme.global.border} col-sapn-2`}
    >
      <div className="space-y-2">
        <PiBinoculars className="text-2xl" />
        <h2 className="text-2xl font-bold">Focus Mode</h2>
        <p>
          Clock in to start focusing on your project, and allocate time for tasks.
        </p>
      </div>
      <button className={`tc-btns ${theme.hoverEffects.textBg}`} onClick={() => setForModal(true)}>Start Session</button>

      <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
        <ComingSoon />
      </Modal>
    </div>
  );
};

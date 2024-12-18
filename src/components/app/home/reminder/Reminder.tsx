import { HiOutlineBell } from "react-icons/hi2";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import { useState } from "react";
import { Modal } from "../../objects/ui/Modal";
import { ComingSoon } from "../../objects/ui/ComingSoon";

export const Reminder: React.FC<TimeComponentsProps> = ({theme}) => {
  const [forModal, setForModal] = useState(false);


  return (
    <div className={`tc-cards glassmorphism ${theme.global.bg} ${theme.global.border}`}>
      <div className="flex flex-col gap-y-2">
        <HiOutlineBell className="text-2xl mb-2" />
        <h2 className="text-lg font-bold">Reminders</h2>
        <p>Upcoming tasks and notifications.</p>
      </div>
      <button className={`tc-btns ${theme.hoverEffects.textBg}`} onClick={() => setForModal(true)}>Add Reminder</button>

      <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
        <ComingSoon />
      </Modal>
    </div>
  );
};

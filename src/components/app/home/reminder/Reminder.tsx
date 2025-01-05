import { HiOutlineBell } from "react-icons/hi2";
import { TimeComponentsProps } from "../../../../utils/interfaces";
import { useState } from "react";
import { Modal } from "../../objects/ui/Modal";
import { ComingSoon } from "../../objects/ui/ComingSoon";

export const Reminder: React.FC<TimeComponentsProps> = ({theme}) => {
  const [forModal, setForModal] = useState(false);


  return (
    <>
      <button className={`rounded-xl glassmorphism ${theme.glass.highlight} ${theme.glass.border} absolute bottom-4 right-2 flex justify-center items-center border`} onClick={() => setForModal(true)}>
      <div className="flex flex-col gap-y-2 p-2">
        <HiOutlineBell className="text-xl" />
      </div>
      {/* <button className={`tc-btns ${theme.hoverEffects.textBg}`} >Add Reminder</button>

      <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
        <ComingSoon />
      </Modal> */}
    </button>
    <Modal open={forModal} onClose={() => setForModal(false)} theme={theme}>
      <ComingSoon />
    </Modal>
    </>
  );
};



{/* <h2 className="text-lg font-bold">Reminders</h2>
<p>Upcoming tasks and notifications.</p> */}

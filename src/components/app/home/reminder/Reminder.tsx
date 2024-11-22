import { HiOutlineBell } from "react-icons/hi2";
import { TimeComponentsProps } from "../../../../utils/interfaces";

export const Reminder: React.FC<TimeComponentsProps> = ({theme}) => {


  return (
    <div className={`tc-cards ${theme.bg} ${theme.border}`}>
      <div className="flex flex-col gap-y-2">
        <HiOutlineBell className="text-2xl mb-2" />
        <h2 className="text-lg font-bold">Reminders</h2>
        <p>Upcoming tasks and notifications.</p>
      </div>
      <button className={`tc-btns ${theme.textBg}`}>Add Reminder</button>
    </div>
  );
};

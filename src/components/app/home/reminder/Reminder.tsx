import { HiOutlineBell } from "react-icons/hi2";
import { TimeComponentsProps } from "../../../../utils/interfaces";

export const Reminder: React.FC<TimeComponentsProps> = ({theme}) => {


  return (
    <div className={` p-4 border rounded shadow ${theme.bg} ${theme.border} fill-all`}>
      <div className="flex flex-col gap-y-2">
        <HiOutlineBell className="text-2xl mb-2" />
        <h2 className="text-lg font-bold">Reminders</h2>
        <p>Upcoming tasks and notifications.</p>
      </div>
      <button>Add Reminder</button>
    </div>
  );
};

import { HiTrendingUp } from "react-icons/hi";
import { TimeComponentsProps } from "../../../../utils/interfaces";

export const DailyStats:  React.FC<TimeComponentsProps> = ({theme}) => {
  
  return (
    <div className={`p-4 border rounded shadow ${theme.bg} ${theme.border} fill-all`}>
      <HiTrendingUp className="text-2xl mb-2" />
      <h2 className="text-lg font-bold">Daily Stats</h2>
      <p>Track your productivity for today.</p>
    </div>
  );
}
import { HiTrendingUp } from "react-icons/hi";
import { TimeComponentsProps } from "../../../../utils/interfaces";

export const DailyStats:  React.FC<TimeComponentsProps> = ({theme}) => {
  
  return (
    <div className={`tc-cards ${theme.global.bg} ${theme.global.border}`}>
      <div className="space-y-3">
        <HiTrendingUp className="text-2xl mb-2" />
        <h2 className="text-lg font-bold">Daily Stats</h2>
        <p>Track your productivity for today.</p>
      </div>
    </div>
  );
}
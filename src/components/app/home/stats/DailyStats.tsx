import { HiTrendingUp } from "react-icons/hi";
import { TimeComponentsProps } from "../../../../utils/interfaces";

export const DailyStats: React.FC<TimeComponentsProps> = () => {


  return (
    <div className="space-x-1 flex flex-col items-start">
      <div className="space-x-1 flex items-center justify-center">
        <HiTrendingUp className="text-base" />
        <h2 className="text-base">25m</h2>
      </div>
      <p className="text-sm">Focus Today</p>
    </div>
  );
};

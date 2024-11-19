import { Button } from "primereact/button";
import { TimeComponentsProps } from "../../../../utils/interfaces";

export const FocusMode: React.FC<TimeComponentsProps> = ({ theme }) => {
  return (
    <div
      className={`p-4 border rounded shadow ${theme.bg} ${theme.border} col-sapn-2 fill-all`}
    >
      <h2 className="text-2xl font-bold mb-4">Focus Mode</h2>
      <p>
        Clock in to start focusing on your project, and allocate time for tasks.
      </p>
      <Button>Start Session</Button>
    </div>
  );
};

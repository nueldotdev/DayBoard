import { TimeComponentsProps } from "../../../../utils/interfaces";

export const FocusMode: React.FC<TimeComponentsProps> = ({ theme }) => {
  return (
    <div
      className={`tc-cards shadow ${theme.bg} ${theme.border} col-sapn-2`}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold mb-4">Focus Mode</h2>
        <p>
          Clock in to start focusing on your project, and allocate time for tasks.
        </p>
      </div>
      <button className={`tc-btns ${theme.textBg}`}>Start Session</button>
    </div>
  );
};

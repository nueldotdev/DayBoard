import { format } from "date-fns";
// import { Checkbox } from "primereact/checkbox";
import { HiCalendar, HiClock } from "react-icons/hi2";
import useThemeStore from "../../../store/themeStore";
import { themes } from "../../../themeConfig";
import { Task } from "../../../utils/interfaces";
// import { DraggingStyle } from "@hello-pangea/dnd";


interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
}


export function TaskCard({ task }: TaskCardProps) {
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <div className={`
      group w-full p-4 ${currentTheme.sidenav.bg} ${currentTheme.global.border} transition-colors
      border rounded-xl shadow-sm
      flex flex-col gap-2
      ${task?.completed ? "opacity-60" : ''}
    `}>
      <div className="flex items-center gap-2">
        <h3 className={`
          font-medium truncate
          ${task.completed ? "line-through text-muted-foreground" : ''}
        `}>
          {task.title}
        </h3>
      </div>
      
      {/* <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {task.description}
      </p> */}
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <HiCalendar className="h-3 w-3" />
            <span>{format(task.dueDate, "MMM d, yyyy")}</span>
          </div>
        )}
        {task.estimatedTime && (
          <div className="flex items-center gap-1">
            <HiClock className="h-3 w-3" />
            <span>{task.estimatedTime}h</span>
          </div>
        )}
      </div>
    </div>
  );
}

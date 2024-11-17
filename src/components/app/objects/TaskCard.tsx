import { format } from "date-fns";
import { Checkbox } from "primereact/checkbox";
import { HiCalendar, HiClock } from "react-icons/hi2";
import useThemeStore from "../../../store/themeStore";
import { themes } from "../../../themeConfig";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  estimatedTime?: number;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-500" 
};

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <div className={`
      group w-full p-4 ${currentTheme.bg} ${currentTheme.btnHover} ${currentTheme.border} transition-colors
      border rounded-lg shadow-sm
      flex items-start gap-4
      ${task.completed ? "opacity-60" : ''}
    `}>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        // className={`rounded ${currentTheme.btnHover} border ${currentTheme.border} cursor-pointer`}
        variant="filled"
        style={{
          width: '1.25rem', // Adjust to control width
          height: '1.25rem', // Adjust to control height
          padding: 0, // Ensures no additional padding around the checkbox content
        }}
        color={'red'}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className={`
            font-medium truncate flex-1
            ${task.completed ? "line-through text-muted-foreground" : ''}
          `}>
            {task.title}
          </h3>
          <span className={`
            text-xs px-2 py-1 rounded-full font-medium ${task.completed ? currentTheme.priority.completed : currentTheme.priority[task.priority]}
          `}>
            {task.completed ? 'completed' : task.priority}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {task.description}
        </p>
        
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
    </div>
  );
}

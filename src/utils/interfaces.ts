import { themes } from "../themeConfig";


type Themes = keyof typeof themes;
type mainTheme = typeof themes[Themes];

interface Task {
  id: number | string;
  title: string;
  description: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  estimatedTime?: number;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
}

interface TimeComponentsProps {
  // themeName?: Themes; // Commented but my use later on in development
  theme: mainTheme; // Use the mainTheme type here
}

export type { Task, TaskListProps, TimeComponentsProps, Themes, mainTheme };
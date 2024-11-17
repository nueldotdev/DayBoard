
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  estimatedTime?: number;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

export type { Task, TaskListProps };
import { TaskListProps } from "../../../utils/interfaces";
import { TaskCard } from "./TaskCard";


export function TaskList({ tasks, onToggleTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority && b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    return 0;
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggleTask}
        />
      ))}
      
      {tasks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No tasks yet. Add some tasks to get started!
        </div>
      )}
    </div>
  );
}
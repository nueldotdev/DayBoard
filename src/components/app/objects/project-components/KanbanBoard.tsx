import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "../TaskCard";
import { mainTheme, Task } from "../../../../utils/interfaces";

interface KanbanBoardProps {
  title: string;
  theme: mainTheme;
  tasks: Task[];
  className?: string;
  onAddTask?: (boardTitle: string, taskTitle: string) => void; // Callback for adding a task
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  title,
  theme,
  tasks,
  className,
  onAddTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  // Function to handle adding a new task
  const handleAddTask = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (trimmedTitle === "") return; // Prevent adding empty or whitespace-only tasks
    if (onAddTask) onAddTask(title, trimmedTitle); // Pass the task to the parent handler
    setNewTaskTitle(""); // Reset the input field
  };

  return (
    <div className={`px-1 ${className}`}>
      {/* Board Title */}
      <h2
        className={`text-base font-bold ${theme.global.bg} border-b-2 ${theme.sidenav.border} p-2 rounded-t-md`}
      >
        {title}
      </h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 min-h-[40px] p-2 ${theme.global.bg} rounded-b-md`} // Ensure there's space for droppable even if no tasks
          >
            {/* Render Tasks */}
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging
                        ? `${provided.draggableProps.style?.transform} rotate(5deg)`
                        : provided.draggableProps.style?.transform,
                      transition: snapshot.isDragging
                        ? "transform 0.2s cubic-bezier(0.2, 1, 0.2, 1)"
                        : "none",
                    }}
                    className={`rounded-2xl shadow ${dndStyle(snapshot)}`}
                  >
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => {
                        /* implement toggle function */
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {/* Add New Task Section */}
            <div className="flex flex-col gap-2 mt-4">
              {/* Input Field */}
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter new task title"
                className={`border rounded-lg p-2 text-sm ${theme.global.border} bg-transparent ${theme.global.text} placeholder:${theme.global.textSecondary} focus:outline-none`}
              />

              {/* Add Task Button */}
              <button
                onClick={handleAddTask}
                className={`text-sm ${theme.global.textPrimary} ${theme.hoverEffects.btnHover} border border-dashed opacity-50 hover:opacity-100 ${theme.global.border} px-4 py-2 rounded-lg transition-all`}
              >
                Add New Task
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

/* Helper Function for Dynamic Dragging Style */
const dndStyle = (snapshot?: any) => {
  if (snapshot.isDragging) {
    return "opacity-75 scale-105"; // Slight scale effect and faded look
  }
  return "";
};

export default KanbanBoard;

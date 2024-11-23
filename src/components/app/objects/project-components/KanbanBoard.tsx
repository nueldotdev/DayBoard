import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskCard } from '../TaskCard';
import { mainTheme, Task } from '../../../../utils/interfaces';

interface KanbanBoardProps {
  title: string;
  theme: mainTheme;
  bgColor?: string;
  tasks: Task[];
  className: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ title, theme, tasks, className }) => {
  return (
    <div className={`px-1 rounded ${className}`}>
      <h2 className={`text-base font-bold mb-4 ${theme.sidenav.bg} border-b-2 ${theme.sidenav.border} p-2 rounded-t-md`}>{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 min-h-[200px]" // Ensure there's space for droppable even if no tasks
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => { /* implement toggle function */ }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanBoard;

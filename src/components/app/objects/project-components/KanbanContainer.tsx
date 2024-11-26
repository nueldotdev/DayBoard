import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task } from '../../../../utils/interfaces';
import { getTheme } from '../../../../utils/getTheme';

const KanbanContainer: React.FC = () => {
  const [boards, setBoards] = useState<Record<string, Task[]>>({
    'To Do': [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ],
    'In Progress': [
      { id: 3, title: 'Task 3', description: 'Description 3' },
    ],
    'Done': [
      { id: 4, title: 'Task 4', description: 'Description 4' },
    ],
    'Ideas': [
      { id: 5, title: 'Task 4', description: 'Description 4' },
    ],
  });

  const { currentTheme } = getTheme();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    const sourceBoard = source.droppableId;
    const destinationBoard = destination.droppableId;

    // If the task was dropped in the same board at the same position
    if (sourceBoard === destinationBoard && source.index === destination.index) return;

    // Copy of the boards state
    const updatedBoards = { ...boards };

    // Remove the task from the source board
    const [movedTask] = updatedBoards[sourceBoard].splice(source.index, 1);

    // Add the task to the destination board
    updatedBoards[destinationBoard].splice(destination.index, 0, movedTask);

    // Update state
    setBoards(updatedBoards);
  };

  return (
    <div className='fill-all p-4'>
      <DragDropContext onDragEnd={handleDragEnd} >
        <div className="flex space-x-4 w-full h-full overflow-auto">
          {Object.entries(boards).map(([boardTitle, tasks]) => (
            <KanbanBoard
              key={boardTitle}
              title={boardTitle}
              theme={currentTheme}
              bgColor="#f3f4f6"
              tasks={tasks}
              className={`w-full ${currentTheme.sidenav.bg} rounded-md pb-2 h-min max-h-full`}
            />
          ))}
        </div>
    </DragDropContext>
    </div>
  );
};

export default KanbanContainer;

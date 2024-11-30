import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useParams } from 'react-router-dom';
import useKanbanBoardStore from '../../../../store/useKanbanBoardStore';
import { getTheme } from '../../../../utils/getTheme';
import { Modal } from '../ui/Modal';

const KanbanContainer: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>(); // Get the current board ID from the route
  const { boards, moveTask, addTask, addList } = useKanbanBoardStore(); // Zustand store
  const { currentTheme } = getTheme();

  const [listModal, setListModal] = useState<boolean>(false);
  const [newListTitle, setNewListTitle] = useState<string>('');

  // Find the current board using its ID
  const currentBoard = boards.find((board) => board.id === Number(boardId));

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
  
    // Exit if there's no destination
    if (!destination) return;
  
    const sourceColumn = source.droppableId;
    const targetColumn = destination.droppableId;
  
    // Exit if the task wasn't moved
    if (sourceColumn === targetColumn && source.index === destination.index) {
      return;
    }
  
    moveTask(
      Number(boardId)!, // The ID of the current board from the URL
      sourceColumn, // The column the task is moved from
      targetColumn, // The column the task is moved to
      Number(draggableId) // The ID of the task being moved
    );
  };
  



  const handleNewList = () => {
    addList(Number(boardId), newListTitle);
    setListModal(false);
  }




  // Handle case where the board isn't found
  if (!currentBoard) {
    return (
      <div className="fill-all p-4 flex items-center justify-center">
        <p className="text-2xl">Board not found</p>
      </div>
    );
  }

  return (
    <div className="fill-all p-4 kanban-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 w-fit pb-20 pr-4">
          {Object.entries(currentBoard.columns).map(([columnId, tasks]) => (
            <KanbanBoard
              key={columnId}
              title={columnId}
              tasks={tasks}
              className="min-w-[300px] max-w-[300px] rounded-lg pb-2 h-min max-h-fit"
              theme={currentTheme}
              onAddTask={(columnTitle, taskTitle) => {
                const newTask = {
                  id: Date.now(), // Use timestamp as a unique ID for simplicity
                  title: taskTitle,
                  description: "", // Optional: Add description handling later
                };
            
                addTask(Number(boardId), columnTitle, newTask); // Call Zustand's addTask method
              }}
            />       
          ))}
          <button className={`min-w-[300px] max-w-[300px] flex items-center justify-center rounded-lg p-4 h-min max-h-fit opacity-60 hover:opacity-70 transition ${currentTheme.hoverEffects.btnHover} border ${currentTheme.global.border}`} onClick={() => setListModal(true)}>
              New List
          </button>
        </div>
      </DragDropContext>


      <Modal theme={currentTheme} open={listModal} onClose={() => setListModal(false)}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Create a new list</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="listName">List Name</label>
            <input type="text" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} id="listName" className='border-none rounded-md p-2 focus:outline-none' />
          </div>
          <button className={`${currentTheme.hoverEffects.btnHover} ${currentTheme.global.textPrimary} ${currentTheme.global.border} transition border py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`} onClick={handleNewList}>Create List</button>
        </div>
      </Modal>
    </div>
  );
};

export default KanbanContainer;

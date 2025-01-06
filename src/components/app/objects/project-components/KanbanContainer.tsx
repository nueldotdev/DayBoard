import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import React, { useState } from 'react';
import useBoardStore, { Board } from '../../../../store/boardStore';
import { mainTheme } from '../../../../utils/interfaces';
import { Modal } from '../ui/Modal';
import KanbanBoard from './KanbanBoard';

interface ContainerProps {
  board: Board;
  theme: mainTheme;

}


const KanbanContainer: React.FC<ContainerProps> = ({theme, board}) => {
  const { moveTask, addTask, addList, updateColumnOrder } = useBoardStore();

  const [listModal, setListModal] = useState<boolean>(false);
  const [newListTitle, setNewListTitle] = useState<string>('');
  const [isDraggingDisabled, setIsDraggingDisabled] = useState<boolean>(false);

  const currentBoard: Board = board;

  const handleDragEnd = (result: DropResult) => {
    // Only proceed if dragging is not disabled
    if (isDraggingDisabled) return;
  
    const { source, destination, type } = result;
  
    // If no destination, exit
    if (!destination) return;
  
    // If dragging columns
    if (type === 'COLUMN') {
      if (source.index === destination.index) return;
  
      const columnIds = Object.keys(currentBoard?.columns || {});
      
      const [reorderedColumn] = columnIds.splice(source.index, 1);
      columnIds.splice(destination.index, 0, reorderedColumn);
  
      updateColumnOrder(currentBoard.id, columnIds);
      return;
    }
  
    // If dragging tasks within a column
    const sourceColumn = source.droppableId;
    const targetColumn = destination.droppableId;
  
    // Exit if the task wasn't moved
    if (sourceColumn === targetColumn && source.index === destination.index) {
      return;
    }
  
    moveTask(
      currentBoard.id, 
      sourceColumn, 
      targetColumn, 
      Number(result.draggableId),
      destination.index
    );
  };

  const handleNewList = () => {
    addList(currentBoard.id, newListTitle);
    setListModal(false);
    setNewListTitle('');
  };

  const handleCardOpenChange = (isOpen: boolean) => {
    setIsDraggingDisabled(isOpen);
  };

  const content = () => {
    if (!currentBoard) {
      return (
        <div className="flex space-x-4 w-fit pb-20 pr-4">
          <button 
            className={`min-w-[300px] max-w-[300px] flex items-center justify-center rounded-lg p-4 h-min max-h-fit bg-opacity-40 hover:bg-opacity-70 transition ${theme.hoverEffects.btnHover} border ${theme.global.border}`} 
            onClick={() => setListModal(true)}
          >
            New List
          </button>
        </div>
      );
    }

    const columnIds = Object.keys(currentBoard.columns || {});

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable 
          droppableId="board" 
          type="COLUMN" 
          direction="horizontal"
          isDropDisabled={isDraggingDisabled}
        >
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="flex space-x-4 w-fit pb-20 pr-4"
            >
              {columnIds.map((columnId, index) => (
                <Draggable 
                  key={columnId} 
                  draggableId={columnId} 
                  index={index}
                  isDragDisabled={isDraggingDisabled}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='h-min max-h-fit'
                    >
                      <KanbanBoard
                        key={columnId}
                        title={columnId}
                        cards={currentBoard.columns?.[columnId] || []}
                        className="min-w-[300px] max-w-[300px] rounded-lg pb-2 h-min max-h-fit"
                        theme={theme}
                        onAddCard={(columnTitle, cardTitle) => {
                          const newTask = {
                            id: Date.now(),
                            title: cardTitle,
                            description: "",
                          };
                      
                          addTask(currentBoard.id, columnTitle, newTask);
                        }}
                        onCardOpenChange={handleCardOpenChange}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <button 
                className={`min-w-[300px] max-w-[300px] flex items-center justify-center rounded-lg p-4 h-min max-h-fit opacity-60 hover:opacity-70 transition ${theme.hoverEffects.btnHover} border ${theme.global.border}`} 
                onClick={() => setListModal(true)}
              >
                New List
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div className="fill-all p-4 kanban-container">
      {content()}

      <Modal theme={theme} open={listModal} onClose={() => setListModal(false)}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Create a new list</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="listName">List Name</label>
            <input 
              type="text" 
              value={newListTitle} 
              onChange={(e) => setNewListTitle(e.target.value)} 
              id="listName" 
              className='border-none rounded-md p-2 focus:outline-none' 
            />
          </div>
          <button 
            className={`${theme.hoverEffects.btnHover} ${theme.global.textPrimary} ${theme.global.border} transition border py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`} 
            onClick={handleNewList}
          >
            Create List
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default KanbanContainer;
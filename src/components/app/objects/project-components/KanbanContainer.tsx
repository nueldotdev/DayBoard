import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import React, { useState } from "react";
import useBoardStore, { Board } from "../../../../store/boardStore";
import { Cards, mainTheme } from "../../../../utils/interfaces";
import { Modal } from "../ui/Modal";
import KanbanBoard from "./KanbanBoard";
import toast, { Toaster } from "react-hot-toast";

interface ContainerProps {
  board: Board;
  theme: mainTheme;
}

const KanbanContainer: React.FC<ContainerProps> = ({ theme, board }) => {
  const { moveTask, addTask, addList, updateListOrder } = useBoardStore();

  const [listModal, setListModal] = useState<boolean>(false);
  const [newListTitle, setNewListTitle] = useState<string>("");
  const [isDraggingDisabled, setIsDraggingDisabled] = useState<boolean>(false);

  const currentBoard: Board = board;

  const handleDragEnd = (result: DropResult) => {
    // Only proceed if dragging is not disabled
    if (isDraggingDisabled) return;

    const { source, destination, type } = result;

    // If no destination, exit
    if (!destination) return;

    // If dragging columns/lists
    if (type === "COLUMN") {
      if (source.index === destination.index) return;

      const listIds = currentBoard?.lists?.map((list) => list.id) || [];
      const [reorderedListId] = listIds.splice(source.index, 1);
      listIds.splice(destination.index, 0, reorderedListId);

      updateListOrder(currentBoard.id, listIds);
      return;
    }

    // If dragging tasks within a list
    const sourceListId = source.droppableId;
    const targetListId = destination.droppableId;

    // Exit if the task wasn't moved
    if (sourceListId === targetListId && source.index === destination.index) {
      return;
    }

    moveTask(
      currentBoard.id,
      sourceListId,
      targetListId,
      result.draggableId,
      destination.index,
    );
  };

  const handleNewList = async () => {
    try {
      toast.loading("Creating new list...");
      addList(currentBoard.id, newListTitle).then((response: any) => {
        toast.dismiss();
        toast.success(`${newListTitle} created successfully!`);
        console.log("Add List Response:", response);
      });

      // toast.success(`${newListTitle} created successfully!`);
    } catch (error) {
      toast.error("Failed to create list. Please try again.");
      console.error("Error creating new list:", error);
      return;
    } finally {
      setListModal(false);
      setNewListTitle("");
    }
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

    const lists = currentBoard.lists || [];

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
              {lists.map((list, index) => (
                <Draggable
                  key={list.id}
                  draggableId={list.id}
                  index={index}
                  isDragDisabled={isDraggingDisabled}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-min max-h-fit"
                    >
                      <KanbanBoard
                        key={list.id}
                        title={list.title}
                        cards={list.cards}
                        className="min-w-[300px] max-w-[300px] rounded-lg pb-2 h-min max-h-fit"
                        theme={theme}
                        onAddCard={(listId, cardInfo: Cards) => {
                          const newTask: Cards = cardInfo;

                          addTask(currentBoard.id, listId, newTask);
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
              className="border-none rounded-md p-2 focus:outline-none"
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
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#1a1a1a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1a1a1a",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#1a1a1a",
            },
          }
        }}
      />
    </div>
  );
};

export default KanbanContainer;

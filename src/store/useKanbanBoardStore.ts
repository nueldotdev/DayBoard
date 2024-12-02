import { create } from "zustand";
import useBoardStore from "./boardStore";

const useKanbanBoardStore = create(() => {
  const { boards, addTask, moveTask, addList, updateBoard } = useBoardStore.getState();

  return {
    boards,
    addTask,
    moveTask,
    addList,
    updateBoard,
  };
});

export default useKanbanBoardStore;

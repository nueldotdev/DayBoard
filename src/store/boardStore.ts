import { create } from "zustand";
import { Cards } from "../utils/interfaces";

// Define the Board interface
export interface Board {
  id: number;
  name: string;
  description: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  columns?: {
    [column: string]: Cards[];
  };
}

// Zustand store definition
const useBoardStore = create<{
  boards: Board[];
  createBoard: (
    id: number,
    name: string,
    description: string,
    tasks?: Cards[],
    dueDate?: Date,
    priority?: "low" | "medium" | "high",
    image?: string
  ) => void;
  updateColumnOrder: (boardId: number, columnOrder: string[]) => void;
  updateBoard: (id: number, updatedBoard: Partial<Board>) => void;
  deleteBoard: (id: number) => void;

  // Kanban-specific actions
  addTask: (boardId: number, column: string, newTask: Cards) => void;
  moveTask: (
    boardId: number,
    sourceColumn: string,
    targetColumn: string,
    taskId: number
  ) => void;
  editTask: (
    boardId: number,
    column: string,
    taskId: number,
    updatedTask: Cards
  ) => void;

  addList: (boardId: number, listName: string) => void;
}>((set) => ({
  boards: [],

  // Core board actions
  createBoard: (id, name, description, tasks = [], dueDate, priority) => {
    set((state) => ({
      boards: [
        ...state.boards,
        {
          id,
          name,
          description,
          tasks,
          dueDate,
          priority,
          columns: {}, // Initialize columns
        },
      ],
    }));
  },
  updateColumnOrder: (boardId, columnOrder) => {
    set((state) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === boardId
      );
      if (boardIndex === -1) return state;

      const updatedBoards = [...state.boards];
      const currentBoard = { ...updatedBoards[boardIndex] };

      // Reorder columns based on the new column order
      const reorderedColumns: Record<string, Cards[]> = {};
      columnOrder.forEach((columnId) => {
        reorderedColumns[columnId] = currentBoard.columns?.[columnId] || [];
      });

      currentBoard.columns = reorderedColumns;
      updatedBoards[boardIndex] = currentBoard;

      return { boards: updatedBoards };
    });
  },
  updateBoard: (id, updatedBoard) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id ? { ...board, ...updatedBoard } : board
      ),
    }));
  },
  deleteBoard: (id) => {
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    }));
  },

  // Kanban actions
  addTask: (boardId, column, newTask) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const columnTasks = board.columns?.[column] || [];
        return {
          ...board,
          columns: {
            ...board.columns,
            [column]: [...columnTasks, newTask],
          },
        };
      }),
    }));
  },

  moveTask: (boardId, sourceColumn, targetColumn, taskId) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const sourceTasks = board.columns?.[sourceColumn] || [];
        const targetTasks = board.columns?.[targetColumn] || [];

        const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) return board; // Task not found

        const [movedTask] = sourceTasks.splice(taskIndex, 1);
        targetTasks.push(movedTask);

        return {
          ...board,
          columns: {
            ...board.columns,
            [sourceColumn]: sourceTasks,
            [targetColumn]: targetTasks,
          },
        };
      }),
    }));
  },

  editTask: (boardId, column, taskId, updatedTask) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const columnTasks = board.columns?.[column] || [];

        const taskIndex = columnTasks.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) return board; // Task not found

        const updatedColumnTasks = [...columnTasks];
        updatedColumnTasks[taskIndex] = updatedTask;

        return {
          ...board,
          columns: {
            ...board.columns,
            [column]: updatedColumnTasks,
          },
        };
      }),
    }));
  },

  addList: (boardId, listName) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          columns: {
            ...board.columns,
            [listName]: [], // New list with empty tasks
          },
        };
      }),
    }));
  },
}));
export default useBoardStore;

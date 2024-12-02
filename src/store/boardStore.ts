import { create } from "zustand";
import { Task } from "../utils/interfaces";

// Define the Board interface
export interface Board {
  id: number;
  name: string;
  description: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  columns?: {
    [column: string]: Task[];
  };
}

// Zustand store definition
const useBoardStore = create<{
  boards: Board[];
  createBoard: (id: number, name: string, description: string, tasks?: Task[], dueDate?: Date, priority?: "low" | "medium" | "high") => void;
  updateBoard: (id: number, updatedBoard: Partial<Board>) => void;
  deleteBoard: (id: number) => void;

  // Kanban-specific actions
  addTask: (boardId: number, column: string, newTask: Task) => void;
  moveTask: (boardId: number, sourceColumn: string, targetColumn: string, taskId: number) => void;
  addList: (boardId: number, listName: string) => void;
}>((set) => ({
  boards: [],

  // Core board actions
  createBoard: (id, name, description, tasks = [], dueDate, priority) =>
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
    })),
  updateBoard: (id, updatedBoard) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id ? { ...board, ...updatedBoard } : board
      ),
    })),
  deleteBoard: (id) =>
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    })),

  // Kanban actions
  addTask: (boardId, column, newTask) =>
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
    })),

  moveTask: (boardId, sourceColumn, targetColumn, taskId) =>
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
    })),

  addList: (boardId, listName) => set((state) => (
    console.log(`addList called for board ${boardId}, list ${listName}`), 
    {
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
    }
  )),
}));
export default useBoardStore;

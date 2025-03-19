import { create } from "zustand";
import { Cards } from "../utils/interfaces";
import api from "../../services/axios";


//     # color: ""
//     # created_at: "2025-03-14T02:04:31.227804+00:00"
//     # description: ""
//     # favorite: false
//     # id: "e12bcf55-883d-42c4-bbdf-39069911ac0d"
//     # name: "Testing One"
//     # slug: "testing-one"

// Define the Board interface
export interface Board {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  priority?: "low" | "medium" | "high";
  columns?: {
    [column: string]: Cards[];
  };
  image?: string;
  favorite: boolean;
  slug?: string;
  color?: string;
}

// Zustand store definition
const useBoardStore = create<{
  boards: Board[];
  getBoards: () => void;
  createBoard: (
    id: string,
    name: string,
    description?: string,
    columns?: {
      [column: string]: Cards[];
    },
    created_at?: Date,
    image?: string
  ) => void;
  updateColumnOrder: (boardId: string, columnOrder: string[]) => void;
  updateBoard: (id: string, updatedBoard: Partial<Board>) => void;
  deleteBoard: (id: string) => void;

  // Kanban-specific actions
  addTask: (boardId: string, column: string, newTask: Cards) => void;
  moveTask: (
    boardId: string,
    sourceColumn: string,
    targetColumn: string,
    taskId: string,
    destinationIndex: number
  ) => void;
  editTask: (
    boardId: string,
    column: string,
    taskId: string,
    updatedTask: Cards
  ) => void;

  addList: (boardId: string, title: string) => void;
}>((set) => ({
  boards: [],

  // Fetch all boards
  getBoards: async () => {
    try {
      const response = await api.get("/boards/get-boards/");
      console.log("Response: ", response.data);
      set({ boards: response.data });
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  },

  // Core board actions
  createBoard: async (name, description) => {
    try {
      const response = await api.post("/boards/create-board/", { name });
      set((state) => ({
        boards: [
          ...state.boards,
          {
            id: response.data.board.id,
            name,
            description,
            columns: {}, // Initialize columns
            favorite: false,
          },
        ],
      }));
    } catch (error) {
      console.error("Error creating board:", error);
    }
    
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
  updateBoard: async (id, updatedBoard) => {
    
    try {

      const response = await api.put('/boards/update-board/', { updatedBoard, boardId: id });
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === id ? { ...board, ...updatedBoard } : board
        ),
      }));

      return response.data.message

    } catch (error) {
      console.error("Error updating board:", error);
      if (error instanceof Error) {
        return error.message;
      }
      return String(error);
    }
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

  moveTask: (boardId, sourceColumn, targetColumn, taskId, destinationIndex) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;
  
        const sourceTasks = board.columns?.[sourceColumn] || [];
        const targetTasks = board.columns?.[targetColumn] || [];
  
        const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) return board; // Task not found
  
        const [movedTask] = sourceTasks.splice(taskIndex, 1);
  
        // Insert the task at the specified index in the target column
        targetTasks.splice(destinationIndex, 0, movedTask);
  
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

  addList: (boardId, title) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          columns: {
            ...board.columns,
            [title]: [], // New list with empty tasks
          },
        };
      }),
    }));
  },
}));
export default useBoardStore;

import { create } from 'zustand';
import { Task } from '../utils/interfaces';

// Define the Board interface
interface Board {
  id: number;
  name: string;
  description: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  tasks: Task[];
}

// Define the state and actions for the Zustand store
interface BoardState {
  boards: Board[]; // Array to store boards
  createBoard: (name: string, description: string, tasks?: Task[], dueDate?: Date, priority?: "low" | "medium" | "high") => void;
  updateBoard: (id: number, updatedBoard: Partial<Board>) => void; // Allow partial updates
  deleteBoard: (id: number) => void;
}

// Zustand store definition
const useBoardStore = create<BoardState>((set) => ({
  boards: [], // Initial state
  createBoard: (name, description, tasks = [], dueDate, priority) =>
    set((state) => ({
      boards: [
        ...state.boards,
        {
          id: Date.now(), // Unique ID
          name,
          description,
          tasks,
          dueDate,
          priority,
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
}));

export default useBoardStore;

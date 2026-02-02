import { create } from "zustand";
import { Cards } from "../utils/interfaces";
import api from "../../services/axios";

//  {
//             "id": "33717edf-afca-4d74-8f9b-ac0ebe18637e",
//             "board_id": "2250e4d9-1cd7-4b77-8fc8-e3f5af0098e2",
//             "title": "List #1",
//             "position": 0,
//             "created_at": "2026-01-24T17:14:38.870558+00:00"
//         }

export interface List {
  boardId: string;
  id: string;
  title: string;
  position: number;
  cards: Cards[];
  created_at?: Date;
}

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
  lists?: List[];
  image?: string;
  favorite: boolean;
  slug?: string;
  color?: string;
}




// Zustand store definition
const useBoardStore: any = create<{
  boards: Board[];
  getBoards: () => void;
  createBoard: (
    id: string,
    name: string,
    description?: string,
    lists?: {
      [list: string]: Cards[];
    },
    created_at?: Date,
    image?: string,
    slug?: string
  ) => void;
  updateListOrder: (boardId: string, listOrder: string[]) => void;
  updateBoard: (id: string, updatedBoard: Partial<Board>) => void;
  deleteBoard: (id: string) => void;

  // Kanban-specific actions
  addTask: (boardId: string, list: string, newTask: Cards) => void;
  moveTask: (
    boardId: string,
    sourceList: string,
    targetList: string,
    taskId: string,
    destinationIndex: number
  ) => void;
  editTask: (
    boardId: string,
    list: string,
    taskId: string,
    updatedTask: Cards
  ) => void;

  addList: (boardId: string, title: string) => Promise<void>;
}>((set) => ({
  boards: [],

  // Fetch all boards
  getBoards: async () => {
    try {
      const response = await api.get("/boards/get-boards/");
      console.log("Response: ", response.data.boards);
      set({ boards: response.data.boards });
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  },

  // Core board actions
  createBoard: async (id, name) => {
    try {
      console.log("Creating board with name:", name);
      console.log("Fake ID:", id);
      const response = await api.post("/boards/create-board/", { name });
      set((state) => ({
        boards: [
          ...state.boards,
          {
            id: response.data.board.id,
            name: response.data.board.name,
            description: response.data.board.description || "",
            lists: [],
            favorite: false,
            slug: response.data.board.slug || "",
            color: response.data.board.color || "",
          },
        ],
      }));

      // Refresh the board list after creation
      useBoardStore.getState().getBoards();
    } catch (error) {
      console.error("Error creating board:", error);
      return Error("Failed to create board");
    }
    
  },
  updateListOrder: (boardId, listOrder) => {
    set((state) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === boardId
      );
      if (boardIndex === -1) return state;

      const updatedBoards = [...state.boards];
      const currentBoard = { ...updatedBoards[boardIndex] };

      // Reorder lists based on the new list order
      if (currentBoard.lists) {
        const listMap = new Map(currentBoard.lists.map(list => [list.id, list]));
        currentBoard.lists = listOrder
          .map(listId => listMap.get(listId))
          .filter((list): list is List => list !== undefined);
      }

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
  addTask: (boardId, listId, newTask) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const updatedLists = board.lists?.map((list) =>
          list.id === listId
            ? { ...list, cards: [...list.cards, newTask] }
            : list
        ) || [];

        return {
          ...board,
          lists: updatedLists,
        };
      }),
    }));
  },

  moveTask: (boardId, sourceListId, targetListId, taskId, destinationIndex) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;
  
        const updatedLists = board.lists?.map((list) => {
          if (list.id === sourceListId) {
            const taskIndex = list.cards.findIndex((task) => task.id === taskId);
            if (taskIndex === -1) return list;
            
            const newCards = [...list.cards];
            const [movedTask] = newCards.splice(taskIndex, 1);
            
            if (sourceListId === targetListId) {
              // Moving within the same list
              newCards.splice(destinationIndex, 0, movedTask);
              return { ...list, cards: newCards };
            }
            
            return { ...list, cards: newCards };
          }
          
          if (list.id === targetListId) {
            const sourceLst = board.lists?.find((l) => l.id === sourceListId);
            const movedTask = sourceLst?.cards.find((t) => t.id === taskId);
            if (!movedTask) return list;
            
            const newCards = [...list.cards];
            newCards.splice(destinationIndex, 0, movedTask);
            return { ...list, cards: newCards };
          }
          
          return list;
        }) || [];
  
        return {
          ...board,
          lists: updatedLists,
        };
      }),
    }));
  },

  editTask: (boardId, listId, taskId, updatedTask) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const updatedLists = board.lists?.map((list) => {
          if (list.id === listId) {
            const taskIndex = list.cards.findIndex((task) => task.id === taskId);
            if (taskIndex === -1) return list;
            
            const updatedCards = [...list.cards];
            updatedCards[taskIndex] = updatedTask;
            return { ...list, cards: updatedCards };
          }
          return list;
        }) || [];

        return {
          ...board,
          lists: updatedLists,
        };
      }),
    }));
  },

  addList: async (boardId, title) => {
    try {
      const state = useBoardStore.getState();
      const board = state.boards.find((b: { id: string; }) => b.id === boardId);
      const position = board?.lists ? board.lists.length : 0;

      const response = await api.post("/boards/add-list/", {
        boardId,
        title,
        position,
      });

      set((state) => ({
        boards: state.boards.map((board) => {
          if (board.id !== boardId) return board;
          const newList: List = {
            id: response.data.list.id,
            boardId: boardId,
            title: title,
            position: position,
            cards: [],
            created_at: response.data.list.created_at,
          };
          return {
            ...board,
            lists: [...(board.lists || []), newList],
          };
        }),
      }));
      return response.data.message;
    } catch (error) {
      console.error("Error adding list:", error);
      if (error instanceof Error) {
        return error.message;
      }
      return String(error);
    }
  },
}));
export default useBoardStore;

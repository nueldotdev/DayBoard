import {create} from "zustand";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface Board {
  id: number;
  title: string;
  columns: {
    [column: string]: Task[];
  };
}

interface KanbanBoardStore {
  boards: Board[];
  moveTask: (boardId: number, sourceColumn: string, targetColumn: string, taskId: number) => void;
  addTask: (boardId: number, column: string, newTask: Task) => void;

  // Adding new columns (lists)
  addList: (boardId: number, listName: string) => void;

  // Editting board details
  updateBoard: (boardId: number, updatedBoard: Partial<Board>) => void;
  // Give board background color
  
}

const useKanbanBoardStore = create<KanbanBoardStore>((set) => ({
  boards: [
    {
      id: 1,
      title: "First Board",
      columns: {
        "To Do": [{ id: 1, title: "Task 1", description: "Task 1 details" }],
        "In Progress": [],
        "Done": [],
      },
    },
    {
      id: 2,
      title: "Second Board",
      columns: {
        "To Do": [{ id: 2, title: "Task 2", description: "Task 2 details" }],
        "In Progress": [],
        "Done": [],
      },
    },
  ],

   // Adding Tasks to board
  addTask: (boardId, column, newTask) => {
    set((state) => {
      const updatedBoards = state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const columnTasks = board.columns[column] || [];
        return {
          ...board,
          columns: {
            ...board.columns,
            [column]: [...columnTasks, newTask], // Add the new task to the specified column
          },
        };
      });

      return { boards: updatedBoards };
    });
  },

  moveTask: (boardId, sourceColumn, targetColumn, taskId) => {
    set((state) => {
      // Find the board to update
      const updatedBoards = state.boards.map((board) => {
        if (board.id !== boardId) return board;
  
        // Locate the source and target columns
        const sourceTasks = board.columns[sourceColumn];
        const targetTasks = board.columns[targetColumn];
  
        // Find the task to move
        const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) return board; // If task not found, skip the update
  
        // Remove the task from the source column
        const [movedTask] = sourceTasks.splice(taskIndex, 1);
  
        // Add the task to the target column
        targetTasks.push(movedTask);
  
        return {
          ...board,
          columns: {
            ...board.columns,
            [sourceColumn]: sourceTasks,
            [targetColumn]: targetTasks,
          },
        };
      });
  
      return { boards: updatedBoards };
    });
  },


  // Adding new columns (lists)
  addList: (boardId, listName) => {
    set((state) => {
      const updatedBoards = state.boards.map((board) => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          columns: {
            ...board.columns,
            [listName]: [],
          },
        };
      });
      return { boards: updatedBoards };
    })
  },

  // Editting the board

  updateBoard: (boardId, updatedBoard) => {
    set((state) => {
      const updatedBoards = state.boards.map((board) => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          ...updatedBoard,
        };
      });
      return { boards: updatedBoards };
    });
  }
}));

export default useKanbanBoardStore;

import React from "react";
import { themes } from "../themeConfig";


type Themes = keyof typeof themes;
type mainTheme = typeof themes[Themes];


// Common props we may pass to components
interface GeneralProps {
  theme: mainTheme;
  className?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
}


interface Boards {
  id: number;
  name: string;
  description: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  image?: string;
}

interface Task {
  id: number | string;
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  estimatedTime?: number;
}

interface MainTask {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}

interface CardComments {
  id: number;
  text: string;
  time: Date;
}


interface Cards {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  due_date?: Date;
  created_at?: Date;
  tasks?: MainTask[];
  comments?: CardComments[];
  labels?: string[];
}


export const positionClasses = {
  center: "flex items-center justify-center",
  right: "flex items-center justify-end",
  left: "flex items-center justify-start",
};



interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
}

interface TimeComponentsProps {
  // themeName?: Themes; // Commented but my use later on in development
  theme: mainTheme; // Use the mainTheme type here
}

export type { Task, TaskListProps, TimeComponentsProps, Themes, mainTheme, Boards, GeneralProps, Cards };
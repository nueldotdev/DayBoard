import React, { useState } from "react";
import { TaskList } from "../objects/TaskList";
import { Task } from "../../../utils/interfaces";

const notes = [
  {
    title: "Note 1",
    bgColor: "#ff0000",
    previewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    lastEdit: "2023-05-01",
  },
  {
    title: "Note 2",
    bgColor: "#00ff00",
    previewText:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    lastEdit: "2023-05-02",
  },
  {
    title: "Note 3",
    bgColor: "#0000ff",
    previewText:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    lastEdit: "2023-05-03",
  },
];


const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the Q2 project proposal including timeline and resource requirements",
    completed: false,
    dueDate: new Date("2024-04-15"),
    priority: "high",
    estimatedTime: 4
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Review and merge pending pull requests for the frontend repository",
    completed: true,
    priority: "medium",
    estimatedTime: 2
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update API documentation with new endpoints and response formats",
    completed: false,
    dueDate: new Date("2024-04-20"),
    priority: "low",
    estimatedTime: 3
  },
] as const;

const Overview = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Function to toggle task completion status
  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };


  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-row-reverse w-full">
        <div className="flex w-full p-4">
          <div className="flex w-full h-full gap-2 items-start">
            {notes.map((note, index) => (
              <div
                key={index}
                className={`w-[40%] p-4 flex flex-col items-start justify-center bg-opacity-20 rounded-md shadow`}
                style={{ backgroundColor: note.bgColor + "51" }}
              >
                <div className="text-left w-full">
                  <h2 className="font-semibold">{note.title}</h2>
                  <p className="text-xs">{note.lastEdit}</p>
                </div>
                <p className="truncate-text mt-2 text-sm">
                  {`${note.previewText.slice(0, 20)}...`}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full p-2">
          <div className="w-full h-full">
            <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

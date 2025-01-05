import React, { useEffect, useState } from "react";
import { HiMiniBars3BottomLeft, HiMiniPencilSquare } from "react-icons/hi2";
import { Cards } from "../../../utils/interfaces";
import { ModalProps } from "./ui/Modal";

interface FullCardProps extends ModalProps {
  card: Cards;
}

export const FullCard: React.FC<FullCardProps> = ({
  card,
  theme,
  position = "center",
  open,
  onClose,
  closeOnBackdropClick = true,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [updatedCard, setUpdatedCard] = useState<Cards>(card);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 bg-zinc-950/50 z-[10000] flex justify-center items-center`}
      onClick={() => closeOnBackdropClick && onClose()}
    >
      <div
        className={`relative flex flex-col lg:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Section */}
        <div className="flex-1 p-6">
          <input
            className="w-full text-xl font-bold text-gray-900 dark:text-white bg-transparent outline-none"
            value={updatedCard.title}
            onChange={handleInputChange}
            name="title"
            readOnly={!editTitle}
            onClick={() => setEditTitle(true)}
            placeholder="Task Title"
          />
          <textarea
            name="description"
            placeholder="Add a description..."
            onChange={handleInputChange}
            className="w-full mt-4 resize-none bg-transparent outline-none text-gray-700 dark:text-gray-300 h-32"
            value={updatedCard.description || ""}
            readOnly={!editDesc}
          />
          <button
            className="text-sm text-blue-500 hover:underline mt-2"
            onClick={() => setEditDesc(!editDesc)}
          >
            {editDesc ? "Save Description" : "Edit Description"}
          </button>

          <div className="mt-6">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Sub-Tasks
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                placeholder="Add a sub-task..."
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Comments
            </h3>
            <div className="space-y-2">
              <textarea
                className="w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 border-l bg-gray-100 dark:bg-gray-900 p-6 space-y-4">
          
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Due Date
            </h4>
            <p className="text-gray-800 dark:text-gray-200">{card.due_date ? card.due_date.toString() : "No due date"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Priority
            </h4>
            <p className="text-gray-800 dark:text-gray-200">{card.priority || "No priority"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Labels
            </h4>
            <p className="text-gray-800 dark:text-gray-200">{card.labels?.join(", ") || "None"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Reminders
            </h4>
            <p className="text-gray-800 dark:text-gray-200">No reminders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

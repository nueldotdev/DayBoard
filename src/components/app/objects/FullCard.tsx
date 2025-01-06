import React, { useEffect, useState } from "react";
import { Cards } from "../../../utils/interfaces";
import { ModalProps } from "./ui/Modal";

interface FullCardProps extends ModalProps {
  card: Cards;
}

export const FullCard: React.FC<FullCardProps> = ({
  card,
  open,
  onClose,
  closeOnBackdropClick = true,
}) => {

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
        className={`relative flex flex-col lg:flex-row w-full max-w-4xl bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Section */}
        <div className="flex-1 p-6">
         
          {editDesc ? (
             <>
             <input
            className="w-fit text-xl font-bold text-zinc-900 dark:text-white bg-transparent outline-none info-edit"
            value={updatedCard.title}
            onChange={handleInputChange}
            name="title"
            readOnly={!editDesc}
            placeholder="Task Title"
          />
            <textarea
            name="description"
            placeholder="Add a description..."
            onChange={handleInputChange}
            className="w-full mt-4 resize-none bg-transparent outline-none text-zinc-700 info-edit"
            value={updatedCard.description || ""}
            readOnly={!editDesc}
          />
             </>
          ) : (
            <>
            <p className="text-zinc-700 dark:text-zinc-300 mt-4 text-xl font-bold">
              {updatedCard.title}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mt-4">
              {updatedCard.description || "No description"}
            </p>
            </>
          )}
          <button
            className="text-sm text-blue-500 hover:underline mt-2"
            onClick={() => setEditDesc(!editDesc)}
          >
            {editDesc ? "Save" : "Edit Details"}
          </button>

          <div className="mt-6">
            <h3 className="text-zinc-700 dark:text-zinc-300 font-semibold mb-2">
              Sub-Tasks
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full px-2 py-1 border rounded-md dark:bg-zinc-700 dark:text-zinc-200"
                placeholder="Add a sub-task..."
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-zinc-700 dark:text-zinc-300 font-semibold mb-2">
              Comments
            </h3>
            <div className="space-y-2">
              <textarea
                className="w-full px-2 py-1 border rounded-md dark:bg-zinc-700 dark:text-zinc-200"
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 border-l bg-zinc-100 dark:bg-zinc-900 p-6 space-y-4">
          
          <div>
            <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Due Date
            </h4>
            <p className="text-zinc-800 dark:text-zinc-200">{card.due_date ? card.due_date.toString() : "No due date"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Priority
            </h4>
            <p className="text-zinc-800 dark:text-zinc-200">{card.priority || "No priority"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Labels
            </h4>
            <p className="text-zinc-800 dark:text-zinc-200">{card.labels?.join(", ") || "None"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Reminders
            </h4>
            <p className="text-zinc-800 dark:text-zinc-200">No reminders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

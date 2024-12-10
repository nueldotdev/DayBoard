import React, { useEffect, useState } from "react";
import { Cards, GeneralProps, positionClasses } from "../../../utils/interfaces";
import { ModalProps } from "./ui/Modal";
import { HiMiniBars3BottomLeft, HiMiniPencilSquare } from "react-icons/hi2";
import { useParams } from "react-router-dom";

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
  // Here we retrieve the board id from the url.

  // Will use this boardId to update eah card/task within the board from Zutland
  const { boardId } = useParams<{ boardId: string }>();
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(true)
  const [updatedCard, setUpdatedCard] = useState<Cards>(card);


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Update the state with the new value.
    setUpdatedCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(updatedCard);
  };


  // Handle 'Esc' key to close the modal
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


  
  const DescBox = () => {
    return (
      <textarea name="description" placeholder={`No description given`} onChange={(e) => handleInputChange(e)} readOnly={false} className={`input-field resize-none h-[150px] pl-2 ${theme.global.text} focus:outline focus:outline-1`}
      defaultValue={card.description}/>
    )
  }

  if (!open) return null;

  return (
    <div className={`fixed inset-0 bg-zinc-950/50 z-[10000] cursor-default ${
        positionClasses[position]
      }`}
      aria-hidden={!open}
      role="dialog"
      onClick={() => closeOnBackdropClick && onClose()} // Close on backdrop click if enabled
    >
      <div
        className={`relative p-2 rounded-lg shadow-lg transition-all duration-300 ${theme.sidenav.bg} ${theme.global.textPrimary} ${theme.glass.border} border flex items-center justify-between`}
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent backdrop click closing
        style={{
          width: "90%",
          maxWidth: "800px",
          height: "auto",
        }}
      >
        {/* Modal Content */}
        <div className="flex w-full gap-x-2">
          <div className="w-full pl-4">
            <div>
              <input className={`text-lg mb-4 font-bold outline-none border-none bg-inherit`} value={card.title} readOnly={editTitle} onClick={() => setEditTitle(true)} />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <HiMiniBars3BottomLeft className="text-xl" />
                  <h2 className={`text-base ${theme.global.textSecondary}`}>Description</h2>
                </div>
                <div>
                  <button className={`p-2 rounded-md ${theme.hoverEffects.btnHover} ${theme.global.textSecondary} cursor-pointer transition-colors`} onClick={() => setEditDesc(!editDesc)}>
                    <HiMiniPencilSquare className="text-xl" />
                  </button>
                </div>
              </div>
              {editDesc ? (
                <DescBox />
              ) : (
                <p>{card.description ? card.description : `No description given`}</p>
              )}
            </div>
             
          </div>
          <div className="w-2/5 border no-display">
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "../TaskCard";
import { mainTheme, Cards } from "../../../../utils/interfaces";

interface KanbanBoardProps {
  title: string;
  theme: mainTheme;
  cards: Cards[];
  className?: string;
  onAddCard?: (boardTitle: string, cardTitle: string) => void;
  onCardOpenChange?: (isOpen: boolean) => void; // New prop to communicate card open state
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  title,
  theme,
  cards,
  className,
  onAddCard,
  onCardOpenChange,
}) => {
  const [newCardTitle, setNewCardTitle] = useState<string>("");
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const handleAddCard = () => {
    const trimmedTitle = newCardTitle.trim();
    if (trimmedTitle === "") return;
    if (onAddCard) onAddCard(title, trimmedTitle);
    setNewCardTitle("");
  };

  const handleCardOpen = (cardId: number) => {
    setOpenCardId(cardId);
    onCardOpenChange?.(true);
  };

  const handleCardClose = () => {
    setOpenCardId(null);
    onCardOpenChange?.(false);
  };

  return (
    <div className={`px-1 ${className}`}>
      <h2
        className={`text-base font-bold ${theme.global.bg} border-b-2 ${theme.sidenav.border} p-2 rounded-t-lg`}
      >
        {title}
      </h2>

      <Droppable droppableId={title} type="TASK">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 min-h-[40px] p-2 ${theme.global.bg} rounded-b-lg`}
          >
            {cards.map((card, index) => (
              <Draggable
                key={card.id}
                draggableId={card.id.toString()}
                index={index}
                isDragDisabled={openCardId !== null}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging
                        ? `${provided.draggableProps.style?.transform} rotate(5deg)`
                        : provided.draggableProps.style?.transform,
                      transition: snapshot.isDragging
                        ? "transform 0.2s cubic-bezier(0.2, 1, 0.2, 1)"
                        : "none",
                    }}
                    className={`rounded-2xl shadow ${dndStyle(snapshot)}`}
                  >
                    <TaskCard
                      key={card.id}
                      card={card}
                      onCardOpen={() => handleCardOpen(card.id)}
                      onCardClose={handleCardClose}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter new card title"
                className={`border rounded-lg p-2 text-sm ${theme.global.border} bg-transparent ${theme.global.text} placeholder:${theme.global.textSecondary} focus:outline-none`}
              />

              <button
                onClick={handleAddCard}
                className={`text-sm ${theme.global.textPrimary} ${theme.hoverEffects.btnHover} border border-dashed opacity-50 hover:opacity-100 ${theme.global.border} px-4 py-2 rounded-lg transition-all`}
              >
                Add New card
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

/* Helper Function for Dynamic Dragging Style */
const dndStyle = (snapshot?: any) => {
  if (snapshot.isDragging) {
    return "opacity-75 scale-105";
  }
  return "";
};

export default KanbanBoard;
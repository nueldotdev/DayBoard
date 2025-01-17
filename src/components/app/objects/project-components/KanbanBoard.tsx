import { Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { HiMiniXMark, HiPlusSmall } from "react-icons/hi2";
import { Cards, mainTheme } from "../../../../utils/interfaces";
import { TaskCard } from "../TaskCard";

interface KanbanBoardProps {
  title: string;
  theme: mainTheme;
  cards: Cards[];
  className?: string;
  onAddCard?: (boardTitle: string, cardInfo: Cards) => void;
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
  const [newCardInfo, setNewCardInfo] = useState<Cards>({
    id: Date.now(),
    title: "",
    description: "",
    priority: "low",
  })
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const [entryToggle, setEntryToggle] = useState<boolean>(false);


  const toggleAddCard = () => {
    setEntryToggle(!entryToggle);
  }


  const handleAddCard = () => {
    const trimmedTitle = newCardInfo.title.trim();
    if (trimmedTitle === "") return;
    if (onAddCard) onAddCard(title, newCardInfo);
    setNewCardInfo({
      id: Date.now(),
      title: "",
      description: "",
      priority: "low",
    });
  };



  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Update the state with the new value.
    setNewCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(newCardInfo);
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
    <div className={`px-1 ${className} ${theme.sidenav.bg} bg-opacity-60 border ${theme.sidenav.border}`}>
      <h2
        className={`text-base font-bold p-2 rounded-t-lg`}
      >
        {title}
      </h2>

      <Droppable droppableId={title} type="TASK">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 min-h-[40px] p-2 rounded-b-lg`}
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
              {/* <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter new card title"
                className={`border rounded-lg p-2 text-sm ${theme.global.border} bg-transparent ${theme.global.text} placeholder:${theme.global.textSecondary} focus:outline-none`}
              /> */}
              {entryToggle ? (
                <div className={"w-full flex flex-col space-y-1 border rounded-md p-2 " + theme.global.border}>
                  <div className="fill-all">
                    <input
                      type="text"
                      name="title"
                      value={newCardInfo.title}
                      onChange={handleInputChange}
                      placeholder="Enter new card title"
                      className={`w-full rounded-lg p-2 text-sm bg-transparent ${theme.global.text} placeholder:${theme.global.textSecondary} focus:outline-none font-semibold`}
                    />
                    <textarea
                      name="description"
                      placeholder="Add a description..."
                      onChange={handleInputChange}
                      className="w-full resize-none bg-transparent  info-edit outline-0 focus:outline-0"
                      value={newCardInfo.description}
                    />
                  </div>
                  <div className="flex items-stretch justify-between space-x-1">
                    <button className={`border w-full p-1 ${theme.global.border} rounded-lg bg-green-600 hover:bg-green-700`} onClick={() => {
                      handleAddCard()
                      toggleAddCard()
                    }}>
                      Add Card
                    </button>
                    <button className={`border ${theme.global.border} rounded-lg bg-transparent w-[20%] p-1 ${theme.hoverEffects.btnHover} flex items-center justify-center`} onClick={toggleAddCard}>
                      <HiMiniXMark size={24} className=""/>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={toggleAddCard}
                  className={`text-sm py-1 rounded-lg transition-all flex items-center justify-start space-x-1 ${theme.global.secondary} hover:text-black dark:hover:text-white`}
                >
                  <HiPlusSmall size={24} />
                  <p>Add New</p>
                </button>
              )}
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
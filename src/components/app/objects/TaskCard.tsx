import { format } from "date-fns";
import { Cards } from "../../../utils/interfaces";
import { getTheme } from "../../../utils/getTheme";
import { FullCard } from "./FullCard";
import { useState } from "react";

interface TaskCardProps {
  card: Cards;
  onCardOpen: () => void;
  onCardClose: () => void;
}

export function TaskCard({ card, onCardOpen, onCardClose }: TaskCardProps) {
  const {currentTheme: theme} = getTheme();
  const [openCard, setOpenCard] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenCard(true);
    onCardOpen();
  };

  const handleClose = () => {
    setOpenCard(false);
    onCardClose();
  };

  return (
    <>
      <div 
        className={`
          group w-full p-4 ${theme.sidenav.bg} ${theme.global.border} transition-colors
          border rounded-xl shadow-sm
          flex flex-col gap-2
        `} 
        onClick={handleOpen}
      >
        <p className={`text-base ${theme.global.textPrimary}`}>{card.title}</p>
        <p className={`text-xs ${theme.global.textSecondary}`}>{card.description}</p>
      </div>

      <FullCard 
        open={openCard} 
        onClose={handleClose} 
        theme={theme} 
        card={card} 
      />
    </>
  );
}
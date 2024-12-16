import React, { useEffect } from "react";
import { GeneralProps, positionClasses } from "../../../../utils/interfaces";
import { HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export interface SidebarProps extends GeneralProps {
  position?: keyof typeof positionClasses;
  open: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean; // Optional: Close modal on backdrop click
  title: string;
  exitButton: boolean;
}

export const SideBar: React.FC<SidebarProps> = ({
  title,
  exitButton = true,
  theme,
  position = "right",
  children,
  open,
  onClose,
  closeOnBackdropClick = true,
}) => {
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

  // Motion variants for the sidebar animation
  const sidebarVariants = {
    hidden: { x: position === "right" ? "100%" : "-10%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: position === "right" ? "100%" : "-10%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className={`fixed inset-0 bg-zinc-950/50 z-[10000] ${positionClasses[position]}`}
          role="sidebar"
          onClick={() => closeOnBackdropClick && onClose()} // Close on backdrop click if enabled
        >
          {/* Sidebar container */}
          <motion.div
            className={`p-4 flex flex-col gap-4 h-full w-96 ${theme.sidenav.bg} shadow-lg`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{title}</h2>
              {exitButton && (
                <button
                  onClick={onClose}
                  aria-label="Close Sidebar"
                  className={`absolute top-3 right-3 p-1 rounded-full transition-all ${theme.global.textSecondary} ${theme.hoverEffects.btnHover}`}
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="h-full">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

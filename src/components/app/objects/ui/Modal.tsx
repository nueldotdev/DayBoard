import React, { useEffect } from "react";
import { GeneralProps } from "../../../../utils/interfaces";

const positionClasses = {
  center: "flex items-center justify-center",
  right: "flex items-center justify-end",
  left: "flex items-center justify-start",
};

interface ModalProps extends GeneralProps {
  position?: keyof typeof positionClasses;
  open: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean; // Optional: Close modal on backdrop click
}

export const Modal: React.FC<ModalProps> = ({
  theme,
  className = "",
  children,
  position = "center",
  open,
  onClose,
  closeOnBackdropClick = true,
}) => {
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

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 bg-zinc-950/50 z-50 ${
        positionClasses[position]
      }`}
      aria-hidden={!open}
      role="dialog"
      onClick={() => closeOnBackdropClick && onClose()} // Close on backdrop click if enabled
    >
      {/* Prevent closing the modal when clicking inside */}
      <div
        className={`relative p-6 rounded-lg shadow-lg transition-all duration-300 ${theme.global.bg} ${theme.global.textPrimary} ${theme.global.border} ${className}`}
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent backdrop click closing
        style={{
          width: "90%",
          maxWidth: "500px",
          height: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className={`absolute top-3 right-3 p-1 rounded-full transition-all ${theme.global.textSecondary} ${theme.hoverEffects.btnHover}`}
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};

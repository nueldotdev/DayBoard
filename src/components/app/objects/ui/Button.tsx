// Button.tsx
import { motion } from "framer-motion";
import React from "react";
import { getTheme } from "../../../../utils/getTheme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  const {currentTheme: theme} = getTheme();


  return (
    <motion.button
      type="submit"
      disabled={loading}
      className={`${props.className} bg-green-500 text-black font-medium p-2 rounded transition-all ${loading ? "bg-gray-500" : ""}  rounded-lg flex items-center justify-center gap-2 hover:bg-green-400 transition-colors disabled:opacity-50 min-w-[120px]`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {loading ? (
        <div className={`w-6 h-6 border-2 ${theme.global.border} border-t-transparent rounded-full animate-spin`} />
      ) : (
        <>
          {children}
        </>
      )}
    </motion.button>
  );
};

export { Button };

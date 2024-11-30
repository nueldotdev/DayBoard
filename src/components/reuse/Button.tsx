import { useMemo } from "react";
import { getTheme } from "../../utils/getTheme";

// Reusable Button Component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  const {currentTheme: theme} = useMemo(() => getTheme(), []);
  return (
    <button
      className={`mt-4 p-2 px-4 ${theme.global.bg} ${theme.global.border} rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;
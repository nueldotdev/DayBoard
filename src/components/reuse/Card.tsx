import { useMemo } from "react";
import { getTheme } from "../../utils/getTheme";

// Reusable Card Component
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const {currentTheme: theme} = useMemo(() => getTheme(), []);
  return (
    <div className={`p-4 border rounded shadow ${theme.hoverEffects.btnHover} ${theme.global.border} ${theme.global.bg} ${className}`}>
      {children}
    </div>
  );
};


export default Card;
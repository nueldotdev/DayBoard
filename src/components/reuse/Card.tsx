import { useMemo } from "react";
import { getTheme } from "../../utils/getTheme";

// Reusable Card Component
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const theme = useMemo(() => getTheme(), []);
  return (
    <div className={`p-4 border rounded shadow ${theme.btnHover} ${theme.border} ${theme.bg} ${className}`}>
      {children}
    </div>
  );
};


export default Card
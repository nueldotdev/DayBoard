// Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className={`p-2 rounded transition-all ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white`}
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export { Button };

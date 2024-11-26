import React from 'react';
import { mainTheme } from '../../../../utils/interfaces';

interface GradientSelectProps {
  selectedGradient: string;
  onChange: (gradient: string) => void;
  className?: string;
  theme?: mainTheme;
}

const gradients = [
  "bg-gradient-to-br from-green-500 to-blue-600",
  "bg-gradient-to-br from-purple-500 to-pink-600",
  "bg-gradient-to-br from-yellow-400 to-red-500",
  "bg-gradient-to-br from-cyan-500 to-indigo-600",
  "bg-gradient-to-br from-teal-500 to-lime-600",
  "bg-gradient-to-br from-rose-500 to-orange-600",
  "bg-gradient-to-br from-amber-500 to-rose-600",
  "bg-gradient-to-br from-sky-500 to-indigo-600",
  "bg-gradient-to-br from-fuchsia-500 to-indigo-600",
];

const GradientSelect: React.FC<GradientSelectProps> = ({ selectedGradient, onChange, className, theme }) => {
  return (
    <div className={className}>
      <div className={"grid grid-cols-3 gap-10 items-center fill-all border"}>
      {gradients.map((gradient, index) => (
        <button
          key={index}
          className={`w-8 h-8 rounded-full shadow-lg border-2 border-transparent transition ${gradient} ${
            selectedGradient === gradient ?  `border-2 ${theme?.global.border}` : ""
          }`}
          onClick={() => onChange(gradient)}
          title={`Gradient ${index + 1}`}
        />
      ))}
    </div>
    </div>
  );
};

export default GradientSelect;

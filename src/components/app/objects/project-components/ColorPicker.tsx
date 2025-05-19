// //@ts-nocheck

// import { useState } from "react";
// import { SketchPicker } from "react-color";;
// import { HiOutlinePencilSquare, HiPencil } from "react-icons/hi2";

// interface ColorPickerProps {
//   color: string;
//   onChange: (color: string) => void;
// }

// const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
//   const [showPicker, setShowPicker] = useState(false);

//   return (
//     <div className="relative">
//       {/* Color Display */}
//       <div
//         className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer flex justify-center items-center"
//         style={{ backgroundColor: color }}
//         onClick={() => setShowPicker(!showPicker)}
//       >
//         <HiOutlinePencilSquare size={20} className="text-gray-500/70" />
//       </div>

//       {/* Color Picker */}
//       {showPicker && (
//         <div className="absolute z-10 mt-2">
//           <SketchPicker
//             color={color}
//             onChangeComplete={(color) => onChange(color.hex)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColorPicker;

import { useEffect, useState } from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import { getTheme } from "../../../../utils/getTheme";

const colors = [
  { name: "None", hex: "transparent" },
  { name: "Berry Red", hex: "#D50032" },
  { name: "Red", hex: "#FF5733" },
  { name: "Orange", hex: "#F77F00" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Olive Green", hex: "#808000" },
  { name: "Lime Green", hex: "#32CD32" },
  { name: "Green", hex: "#33FF57" },
  { name: "Mint Green", hex: "#98FB98" },
  { name: "Teal", hex: "#20C997" },
  { name: "Blue", hex: "#3357FF" },
  { name: "Indigo", hex: "#6610F2" },
  { name: "Purple", hex: "#9B59B6" }
];

export default function ColorPicker(
  { onSelect, 
    color = ""
  }:{ 
    onSelect: (color: string) => void; 
    color: string 
  }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme: theme} = getTheme();

  useEffect(() => {
    if (color.length > 0) {
      const selected = colors.find((c) => c.hex === color);
      if (selected) setSelectedColor(selected);
    }
  }, []);

  const handleSelect = (color: { name: string; hex: string }) => {
    setSelectedColor(color);
    onSelect(color.hex);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-2 border rounded-lg ${theme.global.border} ${theme.global.text}`}
      >
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor.hex }}></span>
          {selectedColor.name}
        </div>
        <HiChevronDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <ul className={`absolute mt-2 border w-full max-h-60 overflow-auto ${theme.global.border} ${theme.sidenav.bg} ${theme.global.text} rounded-lg shadow-lg z-10`}>
          {colors.map((color) => (
            <li
              key={color.hex}
              onClick={() => handleSelect(color)}
              className={`cursor-pointer select-none p-2 flex items-center gap-2 ${theme.hoverEffects.btnHover}`}
            >
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
              {color.name}
              {selectedColor.hex === color.hex && <HiCheck className="w-4 h-4 ml-auto" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

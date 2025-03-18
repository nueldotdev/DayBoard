import { useState, useEffect, useRef } from "react";
import { GeneralProps } from "../../../../utils/interfaces";

type Option = {
  icon: React.ReactElement;
  label: string;
  value: string;
  color?: string;
};

interface SelectProps extends GeneralProps {
  options: Option[][];
  onSelect: (value: string) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Add onClick prop
}

export default function Select({
  options,
  onSelect,
  theme,
  children,
  onClick
}: SelectProps) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        onClick={(e) => {
          setIsOpen(!isOpen);
          if (onClick) onClick(e); // Call onClick prop if provided
        }}
        className={`w-full flex items-center border justify-between p-2 ${
          isOpen ? theme.global.border : "border-transparent"
        } rounded-lg transition`}
      >
        {children}
      </button>
      {isOpen && (
        <ul
          className={`absolute mt-2 w-64 overflow-auto rounded-lg shadow-lg z-10 p-1 ${theme.sidenav.bg} border ${theme.sidenav.border}`}
        >
          {options.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.map((option) => (
                <li
                  key={option.value}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    e.preventDefault(); // Prevent default behavior
                    handleSelect(option);
                  }}
                  className={`cursor-pointer select-none p-2 flex items-center rounded-lg gap-2 ${theme.hoverEffects.btnHover}`}
                  style={{ color: option.color }}
                >
                  {option.icon}
                  {option.label}
                </li>
              ))}
              {groupIndex < options.length - 1 && <hr className={`my-1 ${theme.sidenav.border}`} />}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

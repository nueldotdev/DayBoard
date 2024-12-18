import React from 'react';
import useThemeStore from '../../store/themeStore';
import { themes } from '../../themeConfig';
// import { HiBars2 } from 'react-icons/hi2';
import Popover from './objects/ui/Popover';
import { GeneralProps } from '../../utils/interfaces';

interface ToggleProps extends GeneralProps {
  border?: boolean;
}


const PopContent: React.FC = () => {
  const { themeName, setTheme } = useThemeStore();
  const currentTheme = themes[themeName];

  document.documentElement.setAttribute("data-theme", themeName);

  return (
    <ul className={`p-1 ${currentTheme.global.bg} border ${currentTheme.global.border} rounded-md w-48`}>
      {Object.keys(themes).map((theme) => (
        <li
          key={theme}
          className={`px-4 py-2 w-full cursor-pointer ${currentTheme.hoverEffects.btnHover} rounded-md ${
            themeName === theme ? `font-semibold ${currentTheme.hoverEffects.textBg}` : ''
          }`}
          onClick={() => {
            setTheme(theme as keyof typeof themes);
            localStorage.setItem('theme', theme);
          }}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </li>
      ))}
    </ul>
  );
};

const ThemeToggle: React.FC<ToggleProps> = ({ className, border, theme}) => {
  const { themeName } = useThemeStore();
  const currentTheme = theme;

  return (
    <Popover content={<PopContent />} position="bottomRight">
      <button
        className={`p-2 rounded-md ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.text} ${currentTheme.global.border} cursor-pointer transition-colors ${border ? `border ` : ''}` + className}
      >
        <p>{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</p>
      </button>
    </Popover>
  );
};

export default ThemeToggle;

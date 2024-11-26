import React from 'react';
import useThemeStore from '../../store/themeStore';
import { themes } from '../../themeConfig';
import { HiBars2, HiChevronDown, HiMoon, HiOutlineSun } from 'react-icons/hi2';
import Popover from './objects/ui/Popover';


const PopContent: React.FC = () => {
  const { themeName, setTheme } = useThemeStore();
  const currentTheme = themes[themeName];

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

const ThemeToggle: React.FC = () => {
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <Popover content={<PopContent />}>
      <button
        className={`p-2 rounded-md ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.text} cursor-pointer transition-colors`}
      >
        {/* {themeName === 'light' && <HiOutlineSun size={18} />}
        {themeName === 'dark' && <HiMoon size={18} />}
        {themeName === 'solarized' && <HiChevronDown size={18} />} */}
        <HiBars2 size={18} />
      </button>
    </Popover>
  );
};

export default ThemeToggle;

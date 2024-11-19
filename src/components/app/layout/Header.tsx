import React from "react"
import useApplyTheme from "../../../hooks/useApplyTheme";
import ThemeToggle from "../ThemeToggle"
import useThemeStore from "../../../store/themeStore";
import { themes } from "../../../themeConfig";

const Header: React.FC = () => {
  useApplyTheme()
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <div className={`${currentTheme.sidenav.bg} ${currentTheme.text}`}>
      <header className={`p-4 flex items-center justify-between `}>
        <div className='flex gap-x-2'>
          <img src="/logo-svg.svg"  alt='Dayboard Logo' />
          <h1 className="text-2xl font-bold">DayBoard</h1>
        </div>
        <ThemeToggle />
      </header>
      {/* Other components go here */}
    </div>
  )
}

export default Header;
import React from "react"
import useApplyTheme from "../../../hooks/useApplyTheme";
import { getTheme } from "../../../utils/getTheme";
import useThemeStore from "../../../store/themeStore";

const Header: React.FC = () => {
  useApplyTheme()
  const { themeName } = useThemeStore();
  const {currentTheme} = getTheme();
  let logo;

  if (themeName === "light") logo = '/dayboard-light.svg';
  if (themeName === "dark") logo = '/dayboard-dark.svg';

  return (
    <div className={`${currentTheme.sidenav.bg} ${currentTheme.global.text} flex items-center justify-center`}>
      <header className={`flex items-center justify-center`}>
        <div className='p-4 flex items-center justify-center'>
          <img src={logo}  alt='Dayboard Logo' className="w-8 h-8" />
          {/* <h1 className="text-2xl font-bold">DayBoard</h1> */}
        </div>
        {/* <ThemeToggle /> */}
      </header>
      {/* Other components go here */}
    </div>
  )
}

export default Header;
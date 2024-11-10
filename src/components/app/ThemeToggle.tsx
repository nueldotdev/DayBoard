import React from "react"
import useThemeStore from "../../store/themeStore"
import { LuMoon, LuSun } from "react-icons/lu"
import { HiMoon, HiOutlineSun } from "react-icons/hi2"



const ThemeToggle: React.FC = () => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100   cursor-pointer transition-colors"
    >
      {theme === 'light' && <HiOutlineSun size={18} />}
      {theme === 'dark' && <HiMoon size={18} />}
    </button>
  )
}



export default ThemeToggle;
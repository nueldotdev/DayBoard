import React from "react"
import useApplyTheme from "../../../hooks/useApplyTheme";
import ThemeToggle from "../ThemeToggle"

const Header: React.FC = () => {
  useApplyTheme()

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
      <header className="p-4 flex items-center justify-between border-b border-b-zinc-300 dark:border-b-zinc-700">
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
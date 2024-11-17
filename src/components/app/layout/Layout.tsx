import React from 'react'
import Header from './Header';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useThemeStore from '../../../store/themeStore';
import { themes } from '../../../themeConfig';

const Layout: React.FC = () => {
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <div className={`fixed max-h-screen min-h-screen h-screen w-full ${currentTheme.text} ${currentTheme.bg}`}>
      {/* <Header /> */}
      <div className={`flex ${currentTheme.bg} max-h-full min-h-full h-full`}>
        <div className={`w-3/12 h-full border-r ${currentTheme.border}`}>
          {/* <div className='flex gap-x-2 p-4'>
            <img src="/logo-svg.svg"  alt='Dayboard Logo' />
            <h1 className="text-2xl font-bold">DayBoard</h1>
          </div> */}
          <Header />
          <SideNav />
        </div>
        <div className='w-full overflow-auto'>
          <Outlet />    
        </div>
      </div>
    </div>
  )
}

export default Layout;
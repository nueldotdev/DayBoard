import React from 'react'
import Header from './Header';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useThemeStore from '../../../store/themeStore';
import { themes } from '../../../themeConfig';
import MiniPomo from '../home/time/MiniPomo';

const Layout: React.FC = () => {
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <div className={`fixed max-h-screen min-h-screen h-screen w-full ${currentTheme.global.text} ${currentTheme.global.bg}`}>
      {/* <Header /> */}
      <div className={`flex ${currentTheme.global.bg} max-h-full min-h-full h-full`}>
        <div className={`h-full border-r ${currentTheme.global.border} ${currentTheme.sidenav.bg}`}>
          <Header />
          <SideNav />
        </div>
        <div className='w-full overflow-auto'>
          <Outlet />   
          <MiniPomo />
        </div>
      </div>
    </div>
  )
}

export default Layout;
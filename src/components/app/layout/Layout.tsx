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
    <div className={`fixed h-screen w-full ${currentTheme.text} ${currentTheme.bg}`}>
      <Header />
      <div className={`flex ${currentTheme.bg}`}>
        <div className='w-3/12 h-full'>
          <SideNav />
        </div>
        <div className='w-full h-full p-4 '>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />    
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Layout;
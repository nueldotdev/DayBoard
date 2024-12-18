import React from 'react';
import { Outlet } from 'react-router-dom';
import { getTheme } from '../../../utils/getTheme';
import Header from './Header';
import SideNav from './SideNav';

const Layout: React.FC = () => {
  const { currentTheme } = getTheme();

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
        </div>
      </div>
    </div>
  )
}

export default Layout;
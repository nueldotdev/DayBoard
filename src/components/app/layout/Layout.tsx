import React from 'react'
import Header from './Header';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className='fixed h-screen w-full'>
      <Header />
      <div className='flex'>
        <div className='w-3/12 h-full'>
          <SideNav />
        </div>
        <div className='w-full h-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;
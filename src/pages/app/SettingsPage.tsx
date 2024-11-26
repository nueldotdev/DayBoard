import React from 'react'
import usePageTitle from '../../hooks/usePageTitle';


const SettingsPage: React.FC = () => {

  // Set page title
  usePageTitle("Settings");

  return (
    <div>Settings</div>
  )
}


export default SettingsPage;
import React from 'react'
import usePageTitle from '../../hooks/usePageTitle';
import { Dropdown } from 'primereact/dropdown';
import ThemeToggle from '../../components/app/ThemeToggle';


const SettingsPage: React.FC = () => {
  // Set page title
  usePageTitle("Settings");

  return (
    <ThemeToggle />
  )
}


export default SettingsPage;
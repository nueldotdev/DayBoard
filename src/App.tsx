import React, { useEffect } from 'react';
import './App.css';
import useApplyTheme from './hooks/useApplyTheme';
// import ThemeToggle from './components/app/ThemeToggle';
import AppRouter from './router/Router';
import useThemeStore from './store/themeStore';
import { themes } from './themeConfig';

import { Analytics } from "@vercel/analytics/react"

const App: React.FC = () => {
  useApplyTheme();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { setTheme } = useThemeStore();

  useEffect(() => {
    // Retrieve the theme name from localStorage
    const savedTheme = (localStorage.getItem('theme') as keyof typeof themes) || 'light';

    // Update the theme in the store if it differs from the current state
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, [setTheme]);

  return (
    <div className={`max-h-full min-h-full h-full w-full ${isDarkMode ? 'dark' : ''}`}>
      <Analytics />
      <AppRouter />
    </div>
  );
};

export default App;

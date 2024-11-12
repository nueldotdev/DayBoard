import React from 'react';
import './App.css';
import useApplyTheme from './hooks/useApplyTheme';
import ThemeToggle from './components/app/ThemeToggle';
import AppRouter from './router/Router';
import { PrimeReactProvider } from 'primereact/api';
import useThemeStore from './store/themeStore';

const App: React.FC = () => {
  useApplyTheme();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <PrimeReactProvider>
      <div className={isDarkMode ? 'dark' : ''}>
        <AppRouter />
      </div>
    </PrimeReactProvider>
  );
};

export default App;

// useApplyTheme.ts
import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

const useApplyTheme = () => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const theme = isDarkMode ? 'vela-blue' : 'saga-blue';
    const themeLink = document.getElementById('theme-stylesheet') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `primereact/resources/themes/${theme}/theme.css`;
      console.log("Theme applied:", themeLink.href); // Check if this outputs correctly
    }
  }, [isDarkMode]);
};

export default useApplyTheme;

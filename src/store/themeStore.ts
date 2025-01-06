
import { create } from 'zustand';
import { themes } from '../themeConfig';

interface ThemeState {
  isDarkMode: boolean;
  themeName: keyof typeof themes;
  toggleTheme: () => void;
  setTheme: (name: keyof typeof themes) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  themeName: "dark",
  toggleTheme: () => set((state) => {
    const newTheme = state.isDarkMode ? "light" : "dark";
    return { isDarkMode: !state.isDarkMode, themeName: newTheme };
  }),
  setTheme: (name) => set(() => ({ themeName: name, isDarkMode: name === "dark" })),
}));

export default useThemeStore;

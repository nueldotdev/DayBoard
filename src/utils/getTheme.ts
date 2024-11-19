import useThemeStore from "../store/themeStore";
import { themes } from "../themeConfig";


export const getTheme = () => {
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return { currentTheme };
};
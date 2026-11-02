import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ThemeColors } from './colors';
import { getStoredPreferences, savePreferences } from '../storage/preferencesStorage';

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: darkColors,
  isDark: true,
  themeMode: 'dark',
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<'light' | 'dark' | 'system'>('dark');

  useEffect(() => {
    getStoredPreferences().then(prefs => {
      setThemeModeState(prefs.themeMode);
    });
  }, []);

  const isDark =
    themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';

  const colors = isDark ? darkColors : lightColors;

  const setThemeMode = async (mode: 'light' | 'dark' | 'system') => {
    setThemeModeState(mode);
    await savePreferences({ themeMode: mode });
  };

  const toggleTheme = () => {
    const nextMode = isDark ? 'light' : 'dark';
    setThemeMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        isDark,
        themeMode,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

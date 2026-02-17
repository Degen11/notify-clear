import { useMemo } from 'react';
import { useAppContext } from './useAppContext';
import { lightTheme, darkTheme, Theme } from '@/constants/theme';

export function useTheme(): Theme {
  const { settings } = useAppContext();
  return useMemo(() => (settings.darkMode ? darkTheme : lightTheme), [settings.darkMode]);
}

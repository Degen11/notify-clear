import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// expo-notifications doesn't fully support web — import safely
let Notifications: typeof import('expo-notifications') | null = null;
if (Platform.OS !== 'web') {
  Notifications = require('expo-notifications');
}

export type Settings = {
  darkMode: boolean;
  hapticFeedback: boolean;
  clearOnLaunch: boolean;
  showConfirmation: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  darkMode: false,
  hapticFeedback: true,
  clearOnLaunch: false,
  showConfirmation: true,
};

export type AppContextType = {
  badgesClearedCount: number;
  lastClearedTimestamp: number | null;
  clearNotifications: () => Promise<void>;
  isClearing: boolean;
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  clearHistory: () => Promise<void>;
};

export const AppContext = createContext<AppContextType>({
  badgesClearedCount: 0,
  lastClearedTimestamp: null,
  clearNotifications: async () => {},
  isClearing: false,
  settings: DEFAULT_SETTINGS,
  updateSetting: () => {},
  clearHistory: async () => {},
});

export const useAppContext = () => useContext(AppContext);

const STORAGE_KEYS = {
  count: 'badgesClearedCount',
  timestamp: 'lastClearedTimestamp',
  settings: 'appSettings',
} as const;

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [badgesClearedCount, setBadgesClearedCount] = useState(0);
  const [lastClearedTimestamp, setLastClearedTimestamp] = useState<number | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // Load all saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [savedCount, savedTimestamp, savedSettings] = await AsyncStorage.multiGet([
          STORAGE_KEYS.count,
          STORAGE_KEYS.timestamp,
          STORAGE_KEYS.settings,
        ]);

        if (savedCount[1]) setBadgesClearedCount(parseInt(savedCount[1], 10));
        if (savedTimestamp[1]) setLastClearedTimestamp(parseInt(savedTimestamp[1], 10));
        if (savedSettings[1]) {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings[1]) });
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  // Auto-clear on launch if enabled
  useEffect(() => {
    if (settings.clearOnLaunch && badgesClearedCount >= 0) {
      clearNotifications();
    }
  }, [settings.clearOnLaunch]);

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(next)).catch(console.error);
      return next;
    });
  }, []);

  const clearNotifications = useCallback(async () => {
    if (isClearing) return;
    setIsClearing(true);

    // Simulate a brief clearing animation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Actually clear the badge count on native platforms
    if (Platform.OS !== 'web' && Notifications) {
      try {
        await Notifications.setBadgeCountAsync(0);
        await Notifications.dismissAllNotificationsAsync();
      } catch (error) {
        // Badge clearing may not be available in all contexts
        console.warn('Badge clearing unavailable:', error);
      }
    }

    const currentTime = Date.now();
    const newCount = badgesClearedCount + 1;

    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.count, newCount.toString()],
        [STORAGE_KEYS.timestamp, currentTime.toString()],
      ]);
      setBadgesClearedCount(newCount);
      setLastClearedTimestamp(currentTime);
    } catch (error) {
      console.error('Failed to save data:', error);
    }

    setIsClearing(false);
  }, [isClearing, badgesClearedCount]);

  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.count, STORAGE_KEYS.timestamp]);
      setBadgesClearedCount(0);
      setLastClearedTimestamp(null);
    } catch (error) {
      console.error('Failed to clear history:', error);
      throw error;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        badgesClearedCount,
        lastClearedTimestamp,
        clearNotifications,
        isClearing,
        settings,
        updateSetting,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFERENCES_KEY = '@nexus_preferences';

export interface UserPreferences {
  themeMode: 'light' | 'dark' | 'system';
  autoplayVideos: boolean;
  audioMutedDefault: boolean;
  notificationsEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

export const defaultPreferences: UserPreferences = {
  themeMode: 'dark',
  autoplayVideos: true,
  audioMutedDefault: false,
  notificationsEnabled: true,
  fontSize: 'medium',
};

export const getStoredPreferences = async (): Promise<UserPreferences> => {
  try {
    const raw = await AsyncStorage.getItem(PREFERENCES_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch (e) {
    return defaultPreferences;
  }
};

export const savePreferences = async (prefs: Partial<UserPreferences>): Promise<UserPreferences> => {
  try {
    const current = await getStoredPreferences();
    const updated = { ...current, ...prefs };
    await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return defaultPreferences;
  }
};

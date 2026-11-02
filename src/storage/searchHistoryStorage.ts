import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_HISTORY_KEY = '@nexus_search_history';

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
    if (!raw) return ['AI Computing', 'Gujarat Metro', 'Sensex', 'Solar Energy', 'Climate Summit'];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const addSearchQuery = async (query: string): Promise<string[]> => {
  const trimmed = query.trim();
  if (!trimmed) return await getSearchHistory();
  try {
    const history = await getSearchHistory();
    const filtered = history.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 10);
    await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const clearSearchHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (e) {}
};

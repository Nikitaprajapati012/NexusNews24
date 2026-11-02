import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@nexus_bookmarks';

export const getBookmarkedIds = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const isArticleBookmarked = async (id: string): Promise<boolean> => {
  const ids = await getBookmarkedIds();
  return ids.includes(id);
};

export const toggleBookmark = async (id: string): Promise<boolean> => {
  try {
    const ids = await getBookmarkedIds();
    let updated: string[];
    let bookmarked: boolean;
    if (ids.includes(id)) {
      updated = ids.filter(item => item !== id);
      bookmarked = false;
    } else {
      updated = [id, ...ids];
      bookmarked = true;
    }
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return bookmarked;
  } catch (e) {
    return false;
  }
};

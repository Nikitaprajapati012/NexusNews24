import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsCard } from '../../components/news/NewsCard';
import { EmptyState } from '../../components/common/EmptyState';
import { getBookmarkedIds } from '../../storage/bookmarkStorage';
import { getArticleById, NewsArticle } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';

export const SavedNewsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<NewsArticle[]>([]);

  const loadBookmarks = async () => {
    const ids = await getBookmarkedIds();
    const articles = ids
      .map(id => getArticleById(id))
      .filter((a): a is NewsArticle => a !== undefined);
    setBookmarkedArticles(articles);
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backText, { color: colors.textPrimary }]}>‹ BACK</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>SAVED ARTICLES</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {bookmarkedArticles.length === 0 ? (
            <EmptyState
              icon="🔖"
              title="No Bookmarked Stories"
              description="Articles you bookmark while browsing will appear here for instant offline reading anytime."
              actionText="Explore Top Stories"
              onAction={() => navigation.navigate('MainTabs', { screen: 'Home' })}
            />
          ) : (
            <>
              <Text style={[styles.countText, { color: colors.textMuted }]}>
                {bookmarkedArticles.length} SAVED STORIES (AVAILABLE OFFLINE)
              </Text>
              {bookmarkedArticles.map(article => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onBookmarkChange={loadBookmarks}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
});

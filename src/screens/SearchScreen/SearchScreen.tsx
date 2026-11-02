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
import { SearchBar } from '../../components/common/SearchBar';
import { NewsCard } from '../../components/news/NewsCard';
import { EmptyState } from '../../components/common/EmptyState';
import { searchArticlesOffline } from '../../utils/searchUtils';
import {
  getSearchHistory,
  addSearchQuery,
  clearSearchHistory,
} from '../../storage/searchHistoryStorage';
import { NewsArticle } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [results, setResults] = useState<NewsArticle[]>([]);

  useEffect(() => {
    getSearchHistory().then(setHistory);
  }, []);

  const handleSearchChange = (text: string) => {
    setQuery(text);
    if (text.trim().length > 1) {
      const matches = searchArticlesOffline(text);
      setResults(matches);
      if (text.trim().length > 3) {
        addSearchQuery(text).then(setHistory);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelectHistoryTag = (tag: string) => {
    setQuery(tag);
    const matches = searchArticlesOffline(tag);
    setResults(matches);
    addSearchQuery(tag).then(setHistory);
  };

  const handleClearHistory = async () => {
    await clearSearchHistory();
    setHistory([]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header with SearchBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backText, { color: colors.textPrimary }]}>‹</Text>
        </TouchableOpacity>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            value={query}
            onChangeText={handleSearchChange}
            onClear={() => {
              setQuery('');
              setResults([]);
            }}
            autoFocus={true}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Recent Search Tags (when no query is entered) */}
        {query.trim().length === 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={[styles.historyTitle, { color: colors.textPrimary }]}>
                RECENT SEARCHES
              </Text>
              {history.length > 0 && (
                <TouchableOpacity onPress={handleClearHistory}>
                  <Text style={[styles.clearAllText, { color: colors.accent }]}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.tagsContainer}>
              {history.map((tag, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.tagPill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                  activeOpacity={0.7}
                  onPress={() => handleSelectHistoryTag(tag)}
                >
                  <Text style={styles.tagIcon}>🔍</Text>
                  <Text style={[styles.tagText, { color: colors.textPrimary }]}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Trending Searches */}
            <Text style={[styles.historyTitle, { color: colors.textPrimary, marginTop: spacing.xl }]}>
              POPULAR NEWS TOPICS
            </Text>
            <View style={styles.tagsContainer}>
              {['AI Computing', 'Gujarat Metro', 'Lunar Mission', 'Stock Market', 'Clean Energy', 'Healthcare'].map(
                (topic, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.tagPill, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                    onPress={() => handleSelectHistoryTag(topic)}
                  >
                    <Text style={styles.tagIcon}>🔥</Text>
                    <Text style={[styles.tagText, { color: colors.textPrimary }]}>{topic}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        )}

        {/* Search Results */}
        {query.trim().length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
              FOUND {results.length} MATCHING STORIES FOR "{query.toUpperCase()}"
            </Text>

            {results.length === 0 ? (
              <EmptyState
                icon="🔎"
                title="No Articles Found"
                description={`We couldn't find any reports matching "${query}". Try searching for keywords like AI, Gujarat, Cricket, or Budget.`}
              />
            ) : (
              results.map(article => (
                <NewsCard key={article.id} article={article} />
              ))
            )}
          </View>
        )}
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
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    marginRight: spacing.sm,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
  searchBarWrapper: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  historySection: {
    padding: spacing.lg,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultsSection: {
    padding: spacing.lg,
  },
  resultsCount: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../../components/common/SearchBar';
import { NewsCard } from '../../components/news/NewsCard';
import { EmptyState } from '../../components/common/EmptyState';
import { searchArticlesOffline } from '../../utils/searchUtils';
import { searchLiveNews } from '../../services/newsService';
import {
  getSearchHistory,
  addSearchQuery,
  clearSearchHistory,
} from '../../storage/searchHistoryStorage';
import { NewsArticle } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

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
        searchLiveNews(text).then(liveMatches => {
          if (liveMatches.length > 0) setResults(liveMatches);
        });
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
    searchLiveNews(tag).then(liveMatches => {
      if (liveMatches.length > 0) setResults(liveMatches);
    });
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
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: colors.textPrimary }]}>‹ BACK</Text>
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
                <TouchableOpacity onPress={handleClearHistory} activeOpacity={0.7}>
                  <Text style={[styles.clearHistoryText, { color: colors.accent }]}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {history.length === 0 ? (
              <Text style={[styles.noHistoryText, { color: colors.textMuted }]}>
                No recent searches. Search keywords like "Markets", "Tech", "Sports", or "Politics".
              </Text>
            ) : (
              <View style={styles.tagsContainer}>
                {history.map((tag, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.historyTag, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                    activeOpacity={0.7}
                    onPress={() => handleSelectHistoryTag(tag)}
                  >
                    <Text style={[styles.historyTagText, { color: colors.textPrimary }]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Suggested Trending Topics */}
            <View style={styles.trendingSection}>
              <Text style={[styles.historyTitle, { color: colors.textPrimary, marginBottom: spacing.md }]}>
                RECOMMENDED TOPICS
              </Text>
              <View style={styles.tagsContainer}>
                {['India GDP', 'Sensex', 'AI Innovation', 'Space Exploration', 'Climate Policy', 'Cricket Live'].map(
                  (topic, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.trendingTag, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
                      activeOpacity={0.7}
                      onPress={() => handleSelectHistoryTag(topic)}
                    >
                      <Text style={[styles.trendingTagText, { color: colors.accent }]}>
                        # {topic}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
          </View>
        )}

        {/* Search Results Feed */}
        {query.trim().length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
              {results.length} RESULTS FOUND FOR "{query.toUpperCase()}"
            </Text>

            {results.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No Matching Stories"
                description={`We couldn't find any reports matching "${query}". Try different terms or browse categories.`}
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
  scroll: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    gap: 10,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    ...typography.badge,
    fontSize: 12,
  },
  searchBarWrapper: {
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
    ...typography.badge,
    fontSize: 11,
  },
  clearHistoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  noHistoryText: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 19,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
  },
  historyTagText: {
    ...typography.caption,
    fontWeight: '600',
  },
  trendingSection: {
    marginTop: spacing.xl,
  },
  trendingTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
  },
  trendingTagText: {
    ...typography.caption,
    fontWeight: '700',
  },
  resultsSection: {
    padding: spacing.lg,
  },
  resultsCount: {
    ...typography.badge,
    fontSize: 10,
    marginBottom: spacing.md,
  },
});

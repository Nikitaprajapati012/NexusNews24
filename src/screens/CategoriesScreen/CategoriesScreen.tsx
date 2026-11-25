import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../../components/common/AppHeader';
import { NewsCard } from '../../components/news/NewsCard';
import { CATEGORIES } from '../../data/categoriesData';
import { NewsArticle } from '../../data/newsData';
import {
  fetchLiveNewsByCategory,
  getCachedArticlesForCategory,
} from '../../services/newsService';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const CategoriesScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [articles, setArticles] = useState<NewsArticle[]>(() =>
    getCachedArticlesForCategory('all'),
  );

  const activeCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];

  useEffect(() => {
    let active = true;
    const cached = getCachedArticlesForCategory(selectedCatId);
    if (cached.length > 0) {
      setArticles(cached);
    }
    fetchLiveNewsByCategory(selectedCatId).then(liveArticles => {
      if (active && liveArticles.length > 0) setArticles(liveArticles);
    });
    return () => {
      active = false;
    };
  }, [selectedCatId]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader showDate={false} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Category Header */}
        <View style={[styles.headerBox, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>NEWS CATEGORIES</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Explore comprehensive journalism across 12 dedicated editorial beats.
          </Text>
        </View>

        {/* 12 Categories Grid */}
        <View style={styles.grid}>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCatId === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.gridItem,
                  {
                    backgroundColor: isSelected ? cat.badgeColor : colors.card,
                    borderColor: isSelected ? cat.badgeColor : colors.cardBorder,
                  },
                ]}
                activeOpacity={0.75}
                onPress={() => setSelectedCatId(cat.id)}
              >
                <Text style={styles.gridEmoji}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.gridName,
                    { color: isSelected ? '#FFFFFF' : colors.textPrimary },
                  ]}
                  numberOfLines={1}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category Description Banner */}
        <View style={[styles.descBanner, { backgroundColor: activeCategory.badgeColor + '18', borderColor: activeCategory.badgeColor + '50' }]}>
          <View style={styles.descTitleRow}>
            <Text style={styles.descIcon}>{activeCategory.icon}</Text>
            <Text style={[styles.descTitle, { color: activeCategory.badgeColor }]}>
              {activeCategory.name.toUpperCase()} COVERAGE ({articles.length})
            </Text>
          </View>
          <Text style={[styles.descBody, { color: colors.textSecondary }]}>
            {activeCategory.description}
          </Text>
        </View>

        {/* Articles List */}
        <View style={styles.articlesList}>
          {articles.length > 0 ? (
            articles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <View style={styles.loaderBox}>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>
                Loading {activeCategory.name} Live Reports...
              </Text>
            </View>
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
  scroll: {
    flex: 1,
  },
  headerBox: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    ...typography.sectionTitle,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  gridEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  gridName: {
    ...typography.badge,
    fontSize: 10,
    textAlign: 'center',
  },
  descBanner: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  descTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  descIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  descTitle: {
    ...typography.badge,
    fontSize: 11,
  },
  descBody: {
    ...typography.caption,
    lineHeight: 16,
  },
  articlesList: {
    padding: spacing.lg,
  },
  loaderBox: {
    padding: spacing.xl,
    alignItems: 'center',
  },
});

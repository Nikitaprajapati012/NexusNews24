import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { AppHeader } from '../../components/common/AppHeader';
import { NewsCard } from '../../components/news/NewsCard';
import { CATEGORIES } from '../../data/categoriesData';
import { getArticlesByCategory } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const CategoriesScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedCatId, setSelectedCatId] = useState('all');

  const activeCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];
  const articles = getArticlesByCategory(selectedCatId);

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
                activeOpacity={0.8}
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
        <View style={[styles.descBanner, { backgroundColor: activeCategory.badgeColor + '20', borderColor: activeCategory.badgeColor }]}>
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
          {articles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
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
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
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
    borderWidth: 1.5,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  gridEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  gridName: {
    fontSize: 11,
    fontWeight: '800',
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
    fontSize: 16,
    marginRight: 6,
  },
  descTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  descBody: {
    fontSize: 12,
    lineHeight: 16,
  },
  articlesList: {
    padding: spacing.lg,
  },
});

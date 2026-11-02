import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { BreakingNewsTicker } from '../../components/common/BreakingNewsTicker';
import { LivePlayer } from '../../components/video/LivePlayer';
import { FeaturedNewsCard } from '../../components/news/FeaturedNewsCard';
import { TrendingCarousel } from '../../components/news/TrendingCarousel';
import { NewsCard } from '../../components/news/NewsCard';
import { CATEGORIES } from '../../data/categoriesData';
import {
  ALL_NEWS_ARTICLES,
  getFeaturedArticles,
  getTrendingArticles,
  getArticlesByCategory,
} from '../../data/newsData';
import { SHORT_NEWS_FEED } from '../../data/shortsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getTrendingArticles();
  const categoryArticles = getArticlesByCategory(selectedCategory);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader />
      <BreakingNewsTicker />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Featured Live TV Broadcast Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.liveIndicatorDot} />
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                WATCH LIVE STREAM
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'LiveTV' })}
              activeOpacity={0.7}
            >
              <Text style={[styles.seeAllText, { color: colors.accent }]}>Full TV Mode ❯</Text>
            </TouchableOpacity>
          </View>
          <LivePlayer compact={true} />
        </View>

        {/* Top Featured Headline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
            TOP HEADLINE
          </Text>
          {featuredArticles.length > 0 && (
            <FeaturedNewsCard article={featuredArticles[0]} />
          )}
        </View>

        {/* Trending Stories Carousel */}
        <View style={styles.sectionNoPadding}>
          <View style={[styles.sectionHeaderRow, { paddingHorizontal: spacing.lg }]}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                TRENDING NOW
              </Text>
            </View>
            <Text style={[styles.subCount, { color: colors.textMuted }]}>Top 5 Viral</Text>
          </View>
          <TrendingCarousel articles={trendingArticles} />
        </View>

        {/* Vertical Short News Carousel */}
        <View style={styles.sectionNoPadding}>
          <View style={[styles.sectionHeaderRow, { paddingHorizontal: spacing.lg }]}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.fireEmoji}>⚡</Text>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                NEXUS SHORTS
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'Shorts' })}
              activeOpacity={0.7}
            >
              <Text style={[styles.seeAllText, { color: colors.accent }]}>Watch All ❯</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shortsScroll}
          >
            {SHORT_NEWS_FEED.map((short, idx) => (
              <TouchableOpacity
                key={short.id}
                style={styles.shortThumbCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Shorts', params: { index: idx } })}
              >
                <View style={styles.shortThumbBg}>
                  <View style={styles.shortCategoryTag}>
                    <Text style={styles.shortCategoryText}>{short.category}</Text>
                  </View>
                  <View style={styles.playCenterCircle}>
                    <Text style={styles.playCenterIcon}>▶</Text>
                  </View>
                  <Text style={styles.shortTitle} numberOfLines={2}>
                    {short.headline}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Filters Bar */}
        <View style={styles.sectionNoPadding}>
          <View style={[styles.sectionHeaderRow, { paddingHorizontal: spacing.lg }]}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              EXPLORE BY TOPIC
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'Categories' })}
              activeOpacity={0.7}
            >
              <Text style={[styles.seeAllText, { color: colors.accent }]}>All Categories ❯</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.catPill,
                    {
                      backgroundColor: active ? '#DC2626' : colors.card,
                      borderColor: active ? '#DC2626' : colors.cardBorder,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.catIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.catText,
                      { color: active ? '#FFFFFF' : colors.textPrimary },
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Latest News Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.md }]}>
            LATEST REPORTS ({categoryArticles.length})
          </Text>

          {categoryArticles.map(article => (
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
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionNoPadding: {
    marginTop: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  fireEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
  },
  subCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  shortsScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
  },
  shortThumbCard: {
    width: 140,
    height: 210,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginRight: spacing.md,
    backgroundColor: '#0F172A',
  },
  shortThumbBg: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
  },
  shortCategoryTag: {
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  shortCategoryText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  playCenterCircle: {
    alignSelf: 'center',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCenterIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 2,
  },
  shortTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },
  categoryScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingBottom: spacing.xs,
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  catIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  catText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

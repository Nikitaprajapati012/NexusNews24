import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { BreakingNewsTicker } from '../../components/common/BreakingNewsTicker';
import { LivePlayer } from '../../components/video/LivePlayer';
import { FeaturedNewsCard } from '../../components/news/FeaturedNewsCard';
import { TrendingCarousel } from '../../components/news/TrendingCarousel';
import { NewsCard } from '../../components/news/NewsCard';
import { CATEGORIES } from '../../data/categoriesData';
import { NewsArticle } from '../../data/newsData';
import {
  fetchLiveNewsByCategory,
  getCachedArticlesForCategory,
} from '../../services/newsService';
import { ShortNewsItem, SHORT_NEWS_FEED } from '../../data/shortsData';
import { fetchLiveShorts } from '../../services/videoService';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GradientOverlay } from '../../components/common/GradientOverlay';
import { PlayIcon, ChevronRightIcon, FireIcon } from '../../components/icons/TabIcons';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [shortsFeed, setShortsFeed] = useState<ShortNewsItem[]>(SHORT_NEWS_FEED);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>(() =>
    getCachedArticlesForCategory('all'),
  );
  const [categoryArticles, setCategoryArticles] = useState<NewsArticle[]>(() =>
    getCachedArticlesForCategory('all'),
  );
  const [, setLoading] = useState(allArticles.length === 0);

  const loadTopStories = useCallback(async (forceRefresh = false) => {
    const liveAll = await fetchLiveNewsByCategory('all', forceRefresh);
    if (liveAll.length > 0) {
      setAllArticles(liveAll);
      if (selectedCategory === 'all') {
        setCategoryArticles(liveAll);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    let active = true;
    fetchLiveNewsByCategory('all').then(liveAll => {
      if (active && liveAll.length > 0) {
        setAllArticles(liveAll);
        setCategoryArticles(liveAll);
        setLoading(false);
      }
    });
    fetchLiveShorts().then(liveShorts => {
      if (active && liveShorts.length > 0) setShortsFeed(liveShorts);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const cached = getCachedArticlesForCategory(selectedCategory);
    if (cached.length > 0) {
      setCategoryArticles(cached);
    }
    fetchLiveNewsByCategory(selectedCategory).then(articles => {
      if (active && articles.length > 0) {
        setCategoryArticles(articles);
      }
    });
    return () => {
      active = false;
    };
  }, [selectedCategory]);

  const featuredArticles = allArticles.filter(a => a.isFeatured);
  const trendingArticles = allArticles.filter(a => a.isTrending);
  const displayFeatured =
    featuredArticles.length > 0 ? featuredArticles : allArticles.slice(0, 1);
  const displayTrending =
    trendingArticles.length > 0
      ? trendingArticles
      : allArticles.slice(1, 6);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        loadTopStories(true),
        fetchLiveNewsByCategory(selectedCategory, true).then(articles => {
          if (articles.length > 0) setCategoryArticles(articles);
        }),
        fetchLiveShorts().then(liveShorts => {
          if (liveShorts.length > 0) setShortsFeed(liveShorts);
        }),
      ]);
    } finally {
      setRefreshing(false);
    }
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
              style={styles.seeAllBtn}
            >
              <Text style={[styles.seeAllText, { color: colors.accent }]}>Full TV Mode</Text>
              <ChevronRightIcon color={colors.accent} size={14} />
            </TouchableOpacity>
          </View>
          <LivePlayer compact={true} />
        </View>

        {/* Top Featured Headline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
            TOP HEADLINE
          </Text>
          {displayFeatured.length > 0 ? (
            <FeaturedNewsCard article={displayFeatured[0]} />
          ) : (
            <View
              style={[
                styles.loaderCard,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
              ]}
            >
              <ActivityIndicator size="small" color={colors.accent} />
              <Text style={[styles.loaderText, { color: colors.textMuted }]}>
                Fetching Live Headlines...
              </Text>
            </View>
          )}
        </View>

        {/* Trending Stories Carousel */}
        <View style={styles.sectionNoPadding}>
          <View style={[styles.sectionHeaderRow, { paddingHorizontal: spacing.lg }]}>
            <View style={styles.sectionTitleRow}>
              <FireIcon color="#EF4444" size={17} />
              <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginLeft: 6 }]}>
                TRENDING NOW
              </Text>
            </View>
            <Text style={[styles.subCount, { color: colors.textMuted }]}>Top 5 Viral</Text>
          </View>
          <TrendingCarousel articles={displayTrending} />
        </View>

        {/* Vertical Short News Carousel */}
        <View style={styles.sectionNoPadding}>
          <View style={[styles.sectionHeaderRow, { paddingHorizontal: spacing.lg }]}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.flashIcon}>⚡</Text>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginLeft: 6 }]}>
                NEXUS SHORTS
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'Shorts' })}
              activeOpacity={0.7}
              style={styles.seeAllBtn}
            >
              <Text style={[styles.seeAllText, { color: colors.accent }]}>Watch All</Text>
              <ChevronRightIcon color={colors.accent} size={14} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shortsScroll}
          >
            {shortsFeed.map((short, idx) => {
              const thumbSource =
                typeof short.thumbnail === 'string'
                  ? { uri: short.thumbnail }
                  : short.thumbnail;

              return (
                <TouchableOpacity
                  key={short.id}
                  style={[styles.shortThumbCard, { borderColor: colors.cardBorder }]}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('MainTabs', {
                      screen: 'Shorts',
                      params: { index: idx },
                    })
                  }
                >
                  {thumbSource ? (
                    <Image
                      source={thumbSource}
                      style={styles.shortThumbImage}
                      resizeMode="cover"
                    />
                  ) : null}
                  <GradientOverlay
                    direction="bottom-to-top"
                    startOpacity={0.92}
                    endOpacity={0.15}
                    color="#090D16"
                  />
                  <View style={styles.shortThumbContent}>
                    <View style={styles.shortCategoryTag}>
                      <Text style={styles.shortCategoryText}>{short.category.toUpperCase()}</Text>
                    </View>
                    <View style={styles.playCenterCircle}>
                      <PlayIcon color="#FFFFFF" size={14} />
                    </View>
                    <Text style={styles.shortTitle} numberOfLines={2}>
                      {short.headline}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
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
              style={styles.seeAllBtn}
            >
              <Text style={[styles.seeAllText, { color: colors.accent }]}>All Topics</Text>
              <ChevronRightIcon color={colors.accent} size={14} />
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
                  activeOpacity={0.75}
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
  flashIcon: {
    fontSize: 15,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
  },
  subCount: {
    ...typography.caption,
  },
  loaderCard: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  loaderText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  shortsScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
  },
  shortThumbCard: {
    width: 140,
    height: 220,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginRight: spacing.md,
    backgroundColor: '#090D16',
    borderWidth: 1,
    position: 'relative',
    ...shadows.sm,
  },
  shortThumbImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  shortThumbContent: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'space-between',
  },
  shortCategoryTag: {
    backgroundColor: 'rgba(220, 38, 38, 0.95)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    alignSelf: 'flex-start',
  },
  shortCategoryText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 8.5,
  },
  playCenterCircle: {
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  shortTitle: {
    color: '#FFFFFF',
    ...typography.caption,
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    marginRight: spacing.sm,
    ...shadows.sm,
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

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NewsArticle } from '../../data/newsData';
import { getLiveArticleById } from '../../services/newsService';
import { CategoryBadge } from '../../components/news/CategoryBadge';
import { NewsCard } from '../../components/news/NewsCard';
import { isArticleBookmarked, toggleBookmark } from '../../storage/bookmarkStorage';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { BookmarkIcon, ShareIcon, ClockIcon } from '../../components/icons/TabIcons';

export const NewsDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const articleId = route.params?.articleId;
  const article = articleId ? getLiveArticleById(articleId) : undefined;

  const [bookmarked, setBookmarked] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  useEffect(() => {
    if (article) {
      isArticleBookmarked(article.id).then(setBookmarked);
    }
  }, [article]);

  if (!article) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={[styles.topBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={[styles.backIcon, { color: colors.textPrimary }]}>‹ BACK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorTitle, { color: colors.textPrimary }]}>
            Article Unavailable
          </Text>
          <Text style={[styles.errorDesc, { color: colors.textSecondary }]}>
            This live dispatch is no longer active in cache. Please explore other breaking stories.
          </Text>
          <TouchableOpacity
            style={[styles.returnBtn, { backgroundColor: colors.accent }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.returnBtnText}>Return to Feed</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleToggleBookmark = async () => {
    const res = await toggleBookmark(article.id);
    setBookmarked(res);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nRead the full report on Nexus News 24:\n${article.summary}`,
        title: article.title,
      });
    } catch {
      // ignore
    }
  };

  const relatedArticles = article.relatedIds
    .map(id => getLiveArticleById(id))
    .filter((a): a is NewsArticle => Boolean(a));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Floating App Bar */}
      <View style={[styles.topBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.backIcon, { color: colors.textPrimary }]}>‹ BACK</Text>
        </TouchableOpacity>

        <View style={styles.topActions}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
            onPress={() => setFontSizeMultiplier(prev => (prev === 1 ? 1.15 : 1))}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>
              {fontSizeMultiplier > 1 ? 'A-' : 'A+'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <ShareIcon color={colors.textPrimary} size={16} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
            onPress={handleToggleBookmark}
            activeOpacity={0.7}
          >
            <BookmarkIcon
              color={bookmarked ? '#DC2626' : colors.textPrimary}
              size={16}
              focused={bookmarked}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Featured Article Image */}
        <View style={styles.imageBox}>
          <Image source={article.image} style={styles.heroImage} resizeMode="cover" />
        </View>

        <View style={styles.articleContent}>
          {/* Metadata Bar */}
          <View style={styles.categoryRow}>
            <CategoryBadge category={article.categoryName} size="medium" />
            <View style={styles.readTimeWrapper}>
              <ClockIcon color={colors.textMuted} size={12} />
              <Text style={[styles.readTime, { color: colors.textMuted }]}>
                {article.readTime} • {article.publishedAt}
              </Text>
            </View>
          </View>

          {/* Headline */}
          <Text style={[styles.headline, { color: colors.textPrimary, fontSize: 23 * fontSizeMultiplier }]}>
            {article.title}
          </Text>

          {/* Author Card */}
          <View style={[styles.authorCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorAvatarText}>{article.author[0]}</Text>
            </View>
            <View>
              <Text style={[styles.authorName, { color: colors.textPrimary }]}>
                Reported by {article.author}
              </Text>
              <Text style={[styles.authorRole, { color: colors.textMuted }]}>
                Nexus Senior Correspondent • Special Coverage
              </Text>
            </View>
          </View>

          {/* Lead Summary Callout */}
          <View style={[styles.summaryCallout, { borderLeftColor: colors.accent, backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.summaryText, { color: colors.textSecondary, fontSize: 14.5 * fontSizeMultiplier }]}>
              {article.summary}
            </Text>
          </View>

          {/* Full Paragraphs */}
          <View style={styles.bodySection}>
            {article.paragraphs.map((para, idx) => (
              <Text
                key={idx}
                style={[
                  styles.paragraph,
                  {
                    color: colors.textPrimary,
                    fontSize: 15.5 * fontSizeMultiplier,
                    lineHeight: 25 * fontSizeMultiplier,
                  },
                ]}
              >
                {para}
              </Text>
            ))}
          </View>

          {article.sourceUrl ? (
            <TouchableOpacity
              style={[styles.fullStoryBtn, { backgroundColor: colors.accent }]}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(article.sourceUrl!)}
            >
              <Text style={styles.fullStoryBtnText}>
                READ FULL STORY ON {article.author.toUpperCase()} ↗
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* Key Takeaways Box */}
          <View style={[styles.takeawaysCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}>
            <Text style={[styles.takeawaysTitle, { color: colors.accent }]}>
              KEY TAKEAWAYS & VERIFICATION
            </Text>
            <Text style={[styles.takeawayPoint, { color: colors.textSecondary }]}>
              • Validated by Nexus News 24 fact-checking desk and public record registries.
            </Text>
            <Text style={[styles.takeawayPoint, { color: colors.textSecondary }]}>
              • Continuous monitoring for developing legal and regulatory amendments.
            </Text>
            <Text style={[styles.takeawayPoint, { color: colors.textSecondary }]}>
              • 100% offline verified archive entry.
            </Text>
          </View>

          {/* Related Articles Carousel */}
          {relatedArticles.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={[styles.relatedTitle, { color: colors.textPrimary }]}>
                RELATED COVERAGE
              </Text>
              {relatedArticles.map(rel => (
                <NewsCard key={rel.id} article={rel} horizontal={true} />
              ))}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backIcon: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontWeight: '800',
    fontSize: 12,
  },
  imageBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#090D16',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  articleContent: {
    padding: spacing.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  readTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTime: {
    ...typography.caption,
  },
  headline: {
    ...typography.display,
    fontSize: 23,
    lineHeight: 31,
    marginBottom: spacing.md,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  authorAvatarText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  authorName: {
    ...typography.cardTitle,
    fontSize: 13,
  },
  authorRole: {
    ...typography.caption,
    fontSize: 11,
  },
  summaryCallout: {
    borderLeftWidth: 3,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
  },
  summaryText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  bodySection: {
    marginBottom: spacing.lg,
  },
  paragraph: {
    marginBottom: spacing.md,
  },
  fullStoryBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  fullStoryBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  takeawaysCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  takeawaysTitle: {
    ...typography.badge,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  takeawayPoint: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  relatedSection: {
    marginTop: spacing.md,
  },
  relatedTitle: {
    ...typography.sectionTitle,
    fontSize: 15,
    marginBottom: spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorTitle: {
    ...typography.heroHeadline,
    marginBottom: spacing.md,
  },
  errorDesc: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  returnBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
  },
  returnBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});

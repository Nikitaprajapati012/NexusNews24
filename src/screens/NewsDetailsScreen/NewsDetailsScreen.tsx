import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getArticleById, ALL_NEWS_ARTICLES, NewsArticle } from '../../data/newsData';
import { CategoryBadge } from '../../components/news/CategoryBadge';
import { NewsCard } from '../../components/news/NewsCard';
import { isArticleBookmarked, toggleBookmark } from '../../storage/bookmarkStorage';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const NewsDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const articleId = route.params?.articleId || 'art-1';
  const article = getArticleById(articleId) || ALL_NEWS_ARTICLES[0];

  const [bookmarked, setBookmarked] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  useEffect(() => {
    isArticleBookmarked(article.id).then(setBookmarked);
  }, [article.id]);

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
    } catch (e) {}
  };

  const relatedArticles = article.relatedIds
    .map(id => getArticleById(id))
    .filter((a): a is NewsArticle => a !== undefined);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Floating App Bar */}
      <View style={[styles.topBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backIcon, { color: colors.textPrimary }]}>‹ BACK</Text>
        </TouchableOpacity>

        <View style={styles.topActions}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant }]}
            onPress={() => setFontSizeMultiplier(prev => (prev === 1 ? 1.15 : 1))}
          >
            <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>
              {fontSizeMultiplier > 1 ? 'A-' : 'A+'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant }]}
            onPress={handleShare}
          >
            <Text style={styles.actionIcon}>🔗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant }]}
            onPress={handleToggleBookmark}
          >
            <Text style={styles.actionIcon}>{bookmarked ? '🔖' : '🏷️'}</Text>
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
            <Text style={[styles.readTime, { color: colors.textMuted }]}>
              ⏱️ {article.readTime} • {article.publishedAt}
            </Text>
          </View>

          {/* Headline */}
          <Text style={[styles.headline, { color: colors.textPrimary, fontSize: 22 * fontSizeMultiplier }]}>
            {article.title}
          </Text>

          {/* Author Card */}
          <View style={[styles.authorCard, { backgroundColor: colors.surfaceVariant }]}>
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
          <View style={[styles.summaryCallout, { borderLeftColor: colors.accent, backgroundColor: colors.card }]}>
            <Text style={[styles.summaryText, { color: colors.textSecondary, fontSize: 15 * fontSizeMultiplier }]}>
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
                    fontSize: 16 * fontSizeMultiplier,
                    lineHeight: 26 * fontSizeMultiplier,
                  },
                ]}
              >
                {para}
              </Text>
            ))}
          </View>

          {/* Key Takeaways Box */}
          <View style={[styles.takeawaysCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Text style={[styles.takeawaysTitle, { color: colors.accent }]}>
              📌 KEY TAKEAWAYS & VERIFICATION
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
          <View style={styles.relatedSection}>
            <Text style={[styles.relatedTitle, { color: colors.textPrimary }]}>
              RELATED COVERAGE
            </Text>
            {relatedArticles.map(rel => (
              <NewsCard key={rel.id} article={rel} horizontal={true} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backIcon: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  actionIcon: {
    fontSize: 15,
  },
  scroll: {
    flex: 1,
  },
  imageBox: {
    width: '100%',
    height: 230,
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
  readTime: {
    fontSize: 11,
    fontWeight: '600',
  },
  headline: {
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: spacing.md,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  authorAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  authorAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
  },
  authorRole: {
    fontSize: 11,
    marginTop: 2,
  },
  summaryCallout: {
    borderLeftWidth: 4,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
  },
  summaryText: {
    fontStyle: 'italic',
    lineHeight: 22,
    fontWeight: '600',
  },
  bodySection: {
    marginBottom: spacing.lg,
  },
  paragraph: {
    marginBottom: spacing.md,
  },
  takeawaysCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  takeawaysTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  takeawayPoint: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  relatedSection: {
    marginTop: spacing.sm,
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
});

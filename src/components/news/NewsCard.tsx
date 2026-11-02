import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsArticle } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { CategoryBadge } from './CategoryBadge';
import { isArticleBookmarked, toggleBookmark } from '../../storage/bookmarkStorage';

interface Props {
  article: NewsArticle;
  onBookmarkChange?: () => void;
  horizontal?: boolean;
}

export const NewsCard: React.FC<Props> = ({ article, onBookmarkChange, horizontal = false }) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    isArticleBookmarked(article.id).then(setBookmarked);
  }, [article.id]);

  const handleToggleBookmark = async () => {
    const res = await toggleBookmark(article.id);
    setBookmarked(res);
    if (onBookmarkChange) onBookmarkChange();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\nRead more on Nexus News 24:\n${article.summary}`,
        title: article.title,
      });
    } catch (e) {}
  };

  if (horizontal) {
    return (
      <TouchableOpacity
        style={[styles.cardHorizontal, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('NewsDetails', { articleId: article.id })}
      >
        <Image source={article.image} style={styles.horizontalImg} resizeMode="cover" />
        <View style={styles.horizontalContent}>
          <View style={styles.categoryRow}>
            <CategoryBadge category={article.categoryName} />
            <Text style={[styles.timeText, { color: colors.textMuted }]}>{article.publishedAt}</Text>
          </View>
          <Text style={[styles.horizontalTitle, { color: colors.textPrimary }]} numberOfLines={2}>
            {article.title}
          </Text>
          <View style={styles.footerRow}>
            <Text style={[styles.readTimeText, { color: colors.textMuted }]}>{article.readTime}</Text>
            <TouchableOpacity onPress={handleToggleBookmark} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.actionIcon}>{bookmarked ? '🔖' : '🏷️'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('NewsDetails', { articleId: article.id })}
    >
      <View style={styles.imageContainer}>
        <Image source={article.image} style={styles.cardImg} resizeMode="cover" />
        <View style={styles.badgeOverlay}>
          <CategoryBadge category={article.categoryName} size="small" />
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={[styles.summary, { color: colors.textSecondary }]} numberOfLines={2}>
          {article.summary}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.textMuted }]}>
            {article.author} • {article.publishedAt}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
              <Text style={styles.actionIcon}>🔗</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleBookmark} style={styles.iconBtn}>
              <Text style={styles.actionIcon}>{bookmarked ? '🔖' : '🏷️'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  cardBody: {
    padding: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 4,
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 12,
    padding: 2,
  },
  actionIcon: {
    fontSize: 15,
  },
  // Horizontal mode
  cardHorizontal: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.sm + 4,
    height: 104,
    ...shadows.sm,
  },
  horizontalImg: {
    width: 104,
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: spacing.sm + 2,
    justifyContent: 'space-between',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  horizontalTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTimeText: {
    fontSize: 10,
    fontWeight: '500',
  },
});

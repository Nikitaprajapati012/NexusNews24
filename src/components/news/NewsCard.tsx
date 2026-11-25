import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsArticle } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { CategoryBadge } from './CategoryBadge';
import { isArticleBookmarked, toggleBookmark } from '../../storage/bookmarkStorage';
import { BookmarkIcon, ShareIcon } from '../icons/TabIcons';

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
    } catch {
      // ignore
    }
  };

  if (horizontal) {
    return (
      <TouchableOpacity
        style={[styles.cardHorizontal, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewsDetails', { articleId: article.id })}
      >
        <Image source={article.image} style={styles.horizontalImg} resizeMode="cover" />
        <View style={styles.horizontalContent}>
          <View style={styles.categoryRow}>
            <CategoryBadge category={article.categoryName} size="small" />
            <Text style={[styles.timeText, { color: colors.textMuted }]}>{article.publishedAt}</Text>
          </View>
          <Text style={[styles.horizontalTitle, { color: colors.textPrimary }]} numberOfLines={2}>
            {article.title}
          </Text>
          <View style={styles.footerRow}>
            <Text style={[styles.readTimeText, { color: colors.accent }]}>{article.readTime}</Text>
            <TouchableOpacity
              onPress={handleToggleBookmark}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              activeOpacity={0.7}
            >
              <BookmarkIcon
                color={bookmarked ? '#DC2626' : colors.textMuted}
                size={16}
                focused={bookmarked}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      activeOpacity={0.8}
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
          <Text style={[styles.metaText, { color: colors.textMuted }]} numberOfLines={1}>
            {article.author} • {article.publishedAt}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleShare}
              style={[styles.iconBtn, { backgroundColor: colors.surfaceVariant }]}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <ShareIcon color={colors.textSecondary} size={15} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleToggleBookmark}
              style={[styles.iconBtn, { backgroundColor: colors.surfaceVariant }]}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <BookmarkIcon
                color={bookmarked ? '#DC2626' : colors.textSecondary}
                size={15}
                focused={bookmarked}
              />
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
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: '#090D16',
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
    ...typography.cardTitle,
    marginBottom: 6,
  },
  summary: {
    ...typography.cardSubtitle,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: spacing.sm,
  },
  metaText: {
    ...typography.caption,
    flex: 1,
    marginRight: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHorizontal: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    padding: spacing.sm,
    alignItems: 'center',
    ...shadows.sm,
  },
  horizontalImg: {
    width: 84,
    height: 84,
    borderRadius: borderRadius.sm,
  },
  horizontalContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
    height: 84,
    paddingVertical: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    ...typography.caption,
  },
  horizontalTitle: {
    ...typography.cardTitle,
    fontSize: 14,
    lineHeight: 19,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTimeText: {
    ...typography.caption,
    fontWeight: '700',
  },
});

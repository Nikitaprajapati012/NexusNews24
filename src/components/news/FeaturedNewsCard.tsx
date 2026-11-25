import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsArticle } from '../../data/newsData';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { CategoryBadge } from './CategoryBadge';
import { GradientOverlay } from '../common/GradientOverlay';
import { ClockIcon } from '../icons/TabIcons';
import { useTheme } from '../../theme/ThemeContext';

interface Props {
  article: NewsArticle;
}

export const FeaturedNewsCard: React.FC<Props> = ({ article }) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: colors.cardBorder }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('NewsDetails', { articleId: article.id })}
    >
      <Image source={article.image} style={styles.image} resizeMode="cover" />
      <GradientOverlay
        direction="bottom-to-top"
        startOpacity={0.96}
        endOpacity={0.05}
        color="#090D16"
      />
      <View style={styles.content}>
        <View style={styles.tagRow}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>TOP STORY</Text>
          </View>
          {article.categoryName && article.categoryName.toLowerCase() !== 'top stories' && (
            <CategoryBadge category={article.categoryName} size="small" />
          )}
        </View>

        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>

        <Text style={styles.summary} numberOfLines={2}>
          {article.summary}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.authorText}>
            By {article.author} • {article.publishedAt}
          </Text>
          <View style={styles.readTimeWrapper}>
            <ClockIcon color="#38BDF8" size={12} />
            <Text style={styles.readTimeText}>{article.readTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 290,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.lg,
    backgroundColor: '#090D16',
    borderWidth: 1,
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  featuredBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
  },
  featuredText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 9.5,
  },
  title: {
    color: '#FFFFFF',
    ...typography.heroHeadline,
    marginBottom: 6,
  },
  summary: {
    color: '#CBD5E1',
    ...typography.cardSubtitle,
    marginBottom: spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: spacing.sm,
  },
  authorText: {
    color: '#94A3B8',
    ...typography.caption,
  },
  readTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTimeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
});

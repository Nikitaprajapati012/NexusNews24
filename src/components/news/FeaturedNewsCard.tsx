import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsArticle } from '../../data/newsData';
import { spacing, borderRadius } from '../../theme/spacing';
import { CategoryBadge } from './CategoryBadge';

interface Props {
  article: NewsArticle;
}

export const FeaturedNewsCard: React.FC<Props> = ({ article }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('NewsDetails', { articleId: article.id })}
    >
      <Image source={article.image} style={styles.image} resizeMode="cover" />
      <View style={styles.gradientOverlay} />
      <View style={styles.content}>
        <View style={styles.tagRow}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>★ TOP STORY</Text>
          </View>
          <CategoryBadge category={article.categoryName} size="small" />
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
          <Text style={styles.readTimeText}>{article.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.lg,
    backgroundColor: '#0F172A',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featuredBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 25,
    marginBottom: 6,
  },
  summary: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  readTimeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
});

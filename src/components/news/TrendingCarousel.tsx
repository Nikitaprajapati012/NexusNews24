import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NewsArticle } from '../../data/newsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { FireIcon } from '../icons/TabIcons';

interface Props {
  articles: NewsArticle[];
}

export const TrendingCarousel: React.FC<Props> = ({ articles }) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {articles.slice(0, 5).map((article, index) => (
        <TouchableOpacity
          key={article.id}
          style={[styles.trendingCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NewsDetails', { articleId: article.id })}
        >
          <View style={styles.imageBox}>
            <Image source={article.image} style={styles.cardImage} resizeMode="cover" />
            <View style={[styles.rankBadge, { borderColor: colors.card }]}>
              <Text style={styles.rankNumber}>0{index + 1}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={[styles.categoryTag, { color: colors.accent }]}>
              {article.categoryName.toUpperCase()}
            </Text>
            <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
              {article.title}
            </Text>
            <View style={styles.viewsRow}>
              <FireIcon color="#EF4444" size={13} />
              <Text style={[styles.viewsText, { color: colors.textMuted }]}>
                {article.views} reads
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingBottom: spacing.sm,
  },
  trendingCard: {
    width: 210,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginRight: spacing.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  imageBox: {
    width: '100%',
    height: 110,
    position: 'relative',
    backgroundColor: '#090D16',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  rankBadge: {
    position: 'absolute',
    bottom: -11,
    left: spacing.sm,
    backgroundColor: '#DC2626',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  rankNumber: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
  },
  cardBody: {
    paddingTop: spacing.md + 2,
    paddingHorizontal: spacing.sm + 2,
    paddingBottom: spacing.sm,
  },
  categoryTag: {
    ...typography.badge,
    fontSize: 9.5,
    marginBottom: 4,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 6,
  },
  viewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsText: {
    ...typography.caption,
  },
});

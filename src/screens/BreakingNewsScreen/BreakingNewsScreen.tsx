import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BreakingNewsItem } from '../../data/breakingNewsData';
import { fetchLiveBreakingNews } from '../../services/newsService';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { ShareIcon } from '../../components/icons/TabIcons';

export const BreakingNewsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [pulse, setPulse] = useState(true);
  const [breakingItems, setBreakingItems] = useState<BreakingNewsItem[]>([]);

  useEffect(() => {
    let active = true;
    fetchLiveBreakingNews().then(liveItems => {
      if (active && liveItems.length > 0) {
        setBreakingItems(liveItems);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(prev => !prev);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const handleShare = async (item: BreakingNewsItem) => {
    try {
      await Share.share({
        message: `🚨 BREAKING NEWS ALERT:\n\n${item.headline}\n\n${item.summary}`,
        title: item.headline,
      });
    } catch {
      // ignore
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Red Alert Header */}
      <View style={[styles.header, { backgroundColor: '#7F1D1D', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>‹ BACK</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <View style={[styles.liveDot, { opacity: pulse ? 1 : 0.3 }]} />
          <Text style={styles.headerTitle}>BREAKING BULLETIN CENTER</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Banner Alert Box */}
        <View style={[styles.bannerAlert, { backgroundColor: '#991B1B' }]}>
          <Text style={styles.bannerTitle}>CRITICAL NEWS DESK • 24/7 VERIFIED ALERTS</Text>
          <Text style={styles.bannerDesc}>
            Priority reports verified by senior editors and ground bureau correspondents before distribution.
          </Text>
        </View>

        {/* Breaking News Feed */}
        <View style={styles.list}>
          {breakingItems.map(item => (
            <View
              key={item.id}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
              ]}
            >
              <View style={styles.cardTopBar}>
                <View style={styles.urgencyPill}>
                  <Text style={styles.urgencyText}>● {item.urgency} ALERT</Text>
                </View>
                <Text style={[styles.timestamp, { color: colors.textMuted }]}>{item.timestamp}</Text>
              </View>

              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

              <View style={styles.cardBody}>
                <View style={styles.categoryRow}>
                  <Text style={[styles.categoryTag, { color: colors.accent }]}>
                    {item.category.toUpperCase()}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleShare(item)}
                    style={[styles.shareBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
                    activeOpacity={0.7}
                  >
                    <ShareIcon color={colors.textPrimary} size={14} />
                    <Text style={[styles.shareText, { color: colors.textPrimary }]}>SHARE</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.headline, { color: colors.textPrimary }]}>{item.headline}</Text>
                <Text style={[styles.summary, { color: colors.textSecondary }]}>{item.summary}</Text>
                <Text style={[styles.location, { color: colors.textMuted }]}>
                  Editorial: Verified wire bulletin
                </Text>
              </View>
            </View>
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
  header: {
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
  backText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 12,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FEF08A',
  },
  headerTitle: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 12,
  },
  bannerAlert: {
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: '#FEF08A',
  },
  bannerTitle: {
    color: '#FEF08A',
    ...typography.badge,
    fontSize: 10.5,
    marginBottom: 4,
  },
  bannerDesc: {
    color: '#FEE2E2',
    ...typography.caption,
    lineHeight: 16,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  cardTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  urgencyPill: {
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  urgencyText: {
    color: '#DC2626',
    ...typography.badge,
    fontSize: 9.5,
  },
  timestamp: {
    ...typography.caption,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: 190,
  },
  cardBody: {
    padding: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryTag: {
    ...typography.badge,
    fontSize: 9.5,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
  },
  shareText: {
    ...typography.badge,
    fontSize: 9,
  },
  headline: {
    ...typography.heroHeadline,
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 6,
  },
  summary: {
    ...typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 6,
  },
  location: {
    ...typography.caption,
    fontStyle: 'italic',
  },
});

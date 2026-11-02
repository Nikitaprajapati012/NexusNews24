import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BREAKING_NEWS, BreakingNewsItem } from '../../data/breakingNewsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const BreakingNewsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [pulse, setPulse] = useState(true);

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
    } catch (e) {}
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#000000' }]}>
      {/* Red Alert Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
        <View style={styles.bannerAlert}>
          <Text style={styles.bannerTitle}>CRITICAL NEWS DESK • 24/7 VERIFIED ALERTS</Text>
          <Text style={styles.bannerDesc}>
            Priority reports verified by senior editors and ground bureau correspondents before distribution.
          </Text>
        </View>

        {/* Breaking News Feed */}
        <View style={styles.list}>
          {BREAKING_NEWS.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTopBar}>
                <View style={styles.urgencyPill}>
                  <Text style={styles.urgencyText}>● {item.urgency} ALERT</Text>
                </View>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>

              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

              <View style={styles.cardBody}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryTag}>{item.category}</Text>
                  <TouchableOpacity onPress={() => handleShare(item)} style={styles.shareBtn}>
                    <Text style={styles.shareIcon}>🔗 SHARE ALERT</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.headline}>{item.headline}</Text>
                <Text style={styles.summary}>{item.summary}</Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.sourceText}>NEXUS VERIFIED DESK • OFFICIAL RELEASE</Text>
                </View>
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
  header: {
    backgroundColor: '#7F1D1D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#991B1B',
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    color: '#FEF08A',
    fontWeight: '900',
    fontSize: 13,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  scroll: {
    flex: 1,
  },
  bannerAlert: {
    backgroundColor: '#1E1B4B',
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  bannerTitle: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  bannerDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 16,
  },
  list: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#991B1B',
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  cardTopBar: {
    backgroundColor: '#7F1D1D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  urgencyPill: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  urgencyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  timestamp: {
    color: '#FEF08A',
    fontSize: 11,
    fontWeight: '700',
  },
  cardImage: {
    width: '100%',
    height: 180,
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
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  shareBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  shareIcon: {
    color: '#FEF08A',
    fontSize: 10,
    fontWeight: '800',
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 6,
  },
  summary: {
    color: '#E2E8F0',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#374151',
    paddingTop: 6,
  },
  sourceText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '600',
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { getBookmarkedIds } from '../../storage/bookmarkStorage';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { ChevronRightIcon } from '../../components/icons/TabIcons';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark, toggleTheme } = useTheme();
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    getBookmarkedIds().then(ids => setBookmarkCount(ids.length));
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader showDate={false} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.avatarRow}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatarImg}
            />
            <View style={styles.userInfo}>
              <View style={styles.badgeRow}>
                <Text style={[styles.userName, { color: colors.textPrimary }]}>Nikita Prajapati</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              </View>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                nikita.prajapati@nexusnews24.com
              </Text>
              <View style={styles.subscriberPill}>
                <Text style={styles.subscriberText}>PREMIUM SUBSCRIBER • ALL ACCESS</Text>
              </View>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={[styles.statsBar, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>142</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Read</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.divider }]} />
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => navigation.navigate('SavedNews')}
              activeOpacity={0.7}
            >
              <Text style={[styles.statValue, { color: colors.accent }]}>{bookmarkCount}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Saved</Text>
            </TouchableOpacity>
            <View style={[styles.statDivider, { backgroundColor: colors.divider }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>28.5h</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Watched</Text>
            </View>
          </View>
        </View>

        {/* Quick Menu Options */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>ACCOUNT & CONTENT</Text>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SavedNews')}
          >
            <Text style={styles.menuIcon}>🔖</Text>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Saved Articles</Text>
              <Text style={[styles.menuSubtitle, { color: colors.textMuted }]}>
                {bookmarkCount} items offline in cache
              </Text>
            </View>
            <ChevronRightIcon color={colors.textMuted} size={15} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('BreakingNews')}
          >
            <Text style={styles.menuIcon}>🚨</Text>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Breaking Bulletins</Text>
              <Text style={[styles.menuSubtitle, { color: colors.textMuted }]}>Live priority wire alerts</Text>
            </View>
            <ChevronRightIcon color={colors.textMuted} size={15} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.menuIcon}>⚙️</Text>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Preferences & Stream</Text>
              <Text style={[styles.menuSubtitle, { color: colors.textMuted }]}>Quality, alerts, notifications</Text>
            </View>
            <ChevronRightIcon color={colors.textMuted} size={15} />
          </TouchableOpacity>
        </View>

        {/* Display Mode Switch */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>DISPLAY PREFERENCE</Text>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.7}
            onPress={toggleTheme}
          >
            <Text style={styles.menuIcon}>{isDark ? '🌙' : '☀️'}</Text>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>
                {isDark ? 'Dark Theme (OLED Black)' : 'Light Theme (Editorial White)'}
              </Text>
              <Text style={[styles.menuSubtitle, { color: colors.textMuted }]}>
                Tap to toggle current appearance
              </Text>
            </View>
            <View style={[styles.themePill, { backgroundColor: colors.accentSubtle }]}>
              <Text style={[styles.themePillText, { color: colors.accent }]}>
                {isDark ? 'DARK' : 'LIGHT'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info Box */}
        <View style={styles.appInfoSection}>
          <Text style={[styles.appVersion, { color: colors.textMuted }]}>
            Nexus News 24 • Global Edition v1.0.4 (Build 88)
          </Text>
          <Text style={[styles.appLegal, { color: colors.textMuted }]}>
            Encrypted End-to-End • 24/7 Live Broadcast Network
          </Text>
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
  profileCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    ...shadows.sm,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#DC2626',
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    ...typography.heroHeadline,
    fontSize: 17,
  },
  verifiedBadge: {
    backgroundColor: '#38BDF8',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    color: '#090D16',
    fontSize: 10,
    fontWeight: '900',
  },
  userEmail: {
    ...typography.caption,
    marginTop: 2,
  },
  subscriberPill: {
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
    alignSelf: 'flex-start',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  subscriberText: {
    color: '#DC2626',
    ...typography.badge,
    fontSize: 8.5,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.heroHeadline,
    fontSize: 18,
  },
  statLabel: {
    ...typography.caption,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
  },
  menuSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.badge,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...typography.cardTitle,
    fontSize: 14,
    marginBottom: 2,
  },
  menuSubtitle: {
    ...typography.caption,
  },
  themePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
  },
  themePillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  appVersion: {
    ...typography.caption,
    fontSize: 11,
  },
  appLegal: {
    ...typography.caption,
    fontSize: 10,
    marginTop: 4,
  },
});

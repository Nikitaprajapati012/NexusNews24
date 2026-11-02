import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { getBookmarkedIds } from '../../storage/bookmarkStorage';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

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
                <Text style={[styles.userName, { color: colors.textPrimary }]}>Nikita Sharma</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              </View>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                nikita@nexusnews24.internal
              </Text>
              <View style={styles.subscriberPill}>
                <Text style={styles.subscriberText}>PREMIUM SUBSCRIBER • ALL ACCESS</Text>
              </View>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={[styles.statsBar, { backgroundColor: colors.surfaceVariant }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>142</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Read</Text>
            </View>
            <View style={styles.statDivider} />
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => navigation.navigate('SavedNews')}
            >
              <Text style={[styles.statValue, { color: colors.accent }]}>{bookmarkCount}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Saved</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
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
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SavedNews')}
          >
            <View style={styles.menuLeft}>
              <Text style={styles.menuEmoji}>🔖</Text>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Saved Articles</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={[styles.badgeCount, { color: colors.accent }]}>{bookmarkCount}</Text>
              <Text style={[styles.arrow, { color: colors.textMuted }]}>❯</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View style={styles.menuLeft}>
              <Text style={styles.menuEmoji}>🔔</Text>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Notification Center</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textMuted }]}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('BreakingNews')}
          >
            <View style={styles.menuLeft}>
              <Text style={styles.menuEmoji}>🚨</Text>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Breaking Bulletins</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textMuted }]}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.menuLeft}>
              <Text style={styles.menuEmoji}>⚙️</Text>
              <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Preferences & Themes</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textMuted }]}>❯</Text>
          </TouchableOpacity>

          {/* Quick Theme Toggle Card */}
          <View style={[styles.themeCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <View style={styles.themeLeft}>
              <Text style={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</Text>
              <View>
                <Text style={[styles.themeTitle, { color: colors.textPrimary }]}>
                  {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
                </Text>
                <Text style={[styles.themeSubtitle, { color: colors.textMuted }]}>
                  Tap to switch aesthetic
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.themeToggleBtn, { backgroundColor: colors.accent }]}
              onPress={toggleTheme}
            >
              <Text style={styles.themeToggleText}>Toggle Theme</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Offline App Info */}
        <View style={styles.infoBox}>
          <Text style={[styles.appVersion, { color: colors.textMuted }]}>
            NEXUS NEWS 24 MOBILE • VERSION 1.0.0
          </Text>
          <Text style={[styles.legalDisclaimer, { color: colors.textMuted }]}>
            100% Frontend-Only • Fully Bundled Offline Architecture
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
    width: 64,
    height: 64,
    borderRadius: 32,
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
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  userEmail: {
    fontSize: 12,
    marginTop: 2,
  },
  subscriberPill: {
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  subscriberText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsBar: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '60%',
    alignSelf: 'center',
    backgroundColor: 'rgba(150,150,150,0.25)',
  },
  menuSection: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.sm + 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuEmoji: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeCount: {
    fontSize: 13,
    fontWeight: '800',
    marginRight: 6,
  },
  arrow: {
    fontSize: 14,
    fontWeight: '700',
  },
  themeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 22,
    marginRight: spacing.md,
  },
  themeTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  themeSubtitle: {
    fontSize: 11,
  },
  themeToggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  themeToggleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  infoBox: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  appVersion: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  legalDisclaimer: {
    fontSize: 10,
    marginTop: 4,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import {
  getStoredPreferences,
  savePreferences,
  UserPreferences,
} from '../../storage/preferencesStorage';
import { clearSearchHistory } from '../../storage/searchHistoryStorage';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark, themeMode, setThemeMode } = useTheme();

  const [autoplay, setAutoplay] = useState(true);
  const [mutedDefault, setMutedDefault] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    getStoredPreferences().then(prefs => {
      setAutoplay(prefs.autoplayVideos);
      setMutedDefault(prefs.audioMutedDefault);
      setNotifications(prefs.notificationsEnabled);
    });
  }, []);

  const handleToggleAutoplay = async (val: boolean) => {
    setAutoplay(val);
    await savePreferences({ autoplayVideos: val });
  };

  const handleToggleMuted = async (val: boolean) => {
    setMutedDefault(val);
    await savePreferences({ audioMutedDefault: val });
  };

  const handleToggleNotifications = async (val: boolean) => {
    setNotifications(val);
    await savePreferences({ notificationsEnabled: val });
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Offline Cache',
      'This will reset your local search history and cached temporary files. Bookmarks will be preserved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearSearchHistory();
            Alert.alert('Cache Cleared', 'Local search history and temp indices have been reset.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backText, { color: colors.textPrimary }]}>‹ BACK</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>APP PREFERENCES</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>THEME & APPEARANCE</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <TouchableOpacity
              style={styles.themeOption}
              onPress={() => setThemeMode('dark')}
            >
              <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>🌙 Dark Mode (Default)</Text>
              {themeMode === 'dark' && <Text style={[styles.checkMark, { color: colors.accent }]}>✓</Text>}
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            <TouchableOpacity
              style={styles.themeOption}
              onPress={() => setThemeMode('light')}
            >
              <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>☀️ Light Mode</Text>
              {themeMode === 'light' && <Text style={[styles.checkMark, { color: colors.accent }]}>✓</Text>}
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            <TouchableOpacity
              style={styles.themeOption}
              onPress={() => setThemeMode('system')}
            >
              <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>📱 Match Device System</Text>
              {themeMode === 'system' && <Text style={[styles.checkMark, { color: colors.accent }]}>✓</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {/* Media & Playback Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>MEDIA & VIDEO PLAYBACK</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Autoplay Video Feeds</Text>
                <Text style={[styles.switchSub, { color: colors.textMuted }]}>
                  Automatically plays live stream and short news reels
                </Text>
              </View>
              <Switch
                value={autoplay}
                onValueChange={handleToggleAutoplay}
                trackColor={{ false: '#475569', true: colors.accent }}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Start Videos Muted</Text>
                <Text style={[styles.switchSub, { color: colors.textMuted }]}>
                  Avoid unexpected loud audio in public environments
                </Text>
              </View>
              <Switch
                value={mutedDefault}
                onValueChange={handleToggleMuted}
                trackColor={{ false: '#475569', true: colors.accent }}
              />
            </View>
          </View>
        </View>

        {/* Notifications & Storage */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>ALERTS & STORAGE</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Breaking News Banners</Text>
                <Text style={[styles.switchSub, { color: colors.textMuted }]}>
                  Show animated red ticker at the top of the app
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#475569', true: colors.breakingRed }}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            <TouchableOpacity style={styles.actionRow} onPress={handleClearCache}>
              <View>
                <Text style={[styles.switchLabel, { color: colors.breakingRed }]}>Clear Search & Cache</Text>
                <Text style={[styles.switchSub, { color: colors.textMuted }]}>
                  Frees temporary offline index memory
                </Text>
              </View>
              <Text style={[styles.arrowText, { color: colors.textMuted }]}>❯</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal & Editorial Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>ABOUT & LEGAL</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() =>
                Alert.alert(
                  'About Nexus News 24',
                  'Nexus News 24 is a fictional, state-of-the-art news broadcasting application designed as a 100% frontend, offline-ready journalism demonstration platform.'
                )
              }
            >
              <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>About Nexus News 24</Text>
              <Text style={[styles.arrowText, { color: colors.textMuted }]}>❯</Text>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() =>
                Alert.alert(
                  'Privacy Policy',
                  'Nexus News 24 operates 100% offline. No telemetry, device identifiers, search terms, or bookmarks are ever transmitted to any remote servers.'
                )
              }
            >
              <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Privacy Policy</Text>
              <Text style={[styles.arrowText, { color: colors.textMuted }]}>❯</Text>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() =>
                Alert.alert(
                  'Terms & Conditions',
                  'All broadcast articles, video segments, and channels are fictional representations designed for high-performance React Native mobile engineering.'
                )
              }
            >
              <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Terms & Conditions</Text>
              <Text style={[styles.arrowText, { color: colors.textMuted }]}>❯</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
    ...shadows.sm,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  checkMark: {
    fontSize: 16,
    fontWeight: '900',
  },
  divider: {
    height: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  switchInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  switchSub: {
    fontSize: 11,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  arrowText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

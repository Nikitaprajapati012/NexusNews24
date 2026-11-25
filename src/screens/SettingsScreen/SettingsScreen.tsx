import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import {
  getStoredPreferences,
  savePreferences,
} from '../../storage/preferencesStorage';
import { clearSearchHistory } from '../../storage/searchHistoryStorage';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, themeMode, setThemeMode } = useTheme();

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
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: colors.textPrimary }]}>‹ BACK</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>PREFERENCES</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Appearance Mode */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>THEME & APPEARANCE</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {(['dark', 'light', 'system'] as const).map((mode, idx) => {
              const active = themeMode === mode;
              const labels = {
                dark: 'Dark (OLED Charcoal)',
                light: 'Light (Paper White)',
                system: 'Follow Device Settings',
              };

              return (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.radioRow,
                    idx < 2 && { borderBottomWidth: 1, borderBottomColor: colors.divider },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setThemeMode(mode)}
                >
                  <Text style={[styles.radioLabel, { color: colors.textPrimary }]}>
                    {labels[mode]}
                  </Text>
                  <View style={[styles.radioCircle, { borderColor: active ? colors.accent : colors.textMuted }]}>
                    {active && <View style={[styles.radioInner, { backgroundColor: colors.accent }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Video & Playback Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>VIDEO STREAMING</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={[styles.switchRow, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
              <View style={styles.switchTextContainer}>
                <Text style={[styles.switchTitle, { color: colors.textPrimary }]}>Autoplay Videos</Text>
                <Text style={[styles.switchDesc, { color: colors.textMuted }]}>
                  Automatically stream live broadcast and short feeds
                </Text>
              </View>
              <Switch
                value={autoplay}
                onValueChange={handleToggleAutoplay}
                trackColor={{ false: colors.border, true: colors.accent }}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchTextContainer}>
                <Text style={[styles.switchTitle, { color: colors.textPrimary }]}>Mute Audio by Default</Text>
                <Text style={[styles.switchDesc, { color: colors.textMuted }]}>
                  Start playback silently until unmuted
                </Text>
              </View>
              <Switch
                value={mutedDefault}
                onValueChange={handleToggleMuted}
                trackColor={{ false: colors.border, true: colors.accent }}
              />
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>ALERTS & NOTIFICATIONS</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.switchRow}>
              <View style={styles.switchTextContainer}>
                <Text style={[styles.switchTitle, { color: colors.textPrimary }]}>Push Breaking Bulletins</Text>
                <Text style={[styles.switchDesc, { color: colors.textMuted }]}>
                  Instant notification for verified top-priority dispatches
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: colors.border, true: colors.accent }}
              />
            </View>
          </View>
        </View>

        {/* Storage Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>CACHE & STORAGE</Text>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={handleClearCache}>
              <View>
                <Text style={[styles.actionTitle, { color: colors.breakingRed }]}>Reset Offline Cache</Text>
                <Text style={[styles.actionDesc, { color: colors.textMuted }]}>
                  Clear cached RSS feeds and search queries
                </Text>
              </View>
              <Text style={{ color: colors.breakingRed, fontWeight: '800', fontSize: 13 }}>CLEAR</Text>
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
    ...typography.badge,
    fontSize: 12,
  },
  headerTitle: {
    ...typography.headerTitle,
    fontSize: 15,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.badge,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...shadows.sm,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  radioLabel: {
    ...typography.cardTitle,
    fontSize: 14,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  switchTextContainer: {
    flex: 1,
    paddingRight: spacing.md,
  },
  switchTitle: {
    ...typography.cardTitle,
    fontSize: 14,
    marginBottom: 2,
  },
  switchDesc: {
    ...typography.caption,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  actionTitle: {
    ...typography.cardTitle,
    fontSize: 14,
    marginBottom: 2,
  },
  actionDesc: {
    ...typography.caption,
  },
});

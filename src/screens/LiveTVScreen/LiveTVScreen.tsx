import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { LivePlayer } from '../../components/video/LivePlayer';
import { LIVE_BROADCAST_DETAILS } from '../../data/liveNewsData';
import { RECORDED_CLIPS } from '../../data/clipsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const LiveTVScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'schedule' | 'highlights'>('schedule');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader showDate={false} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Full-width Live Television Player */}
        <LivePlayer compact={false} />

        {/* Live Status Bar */}
        <View style={[styles.channelStatusBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View>
            <View style={styles.channelRow}>
              <Text style={[styles.channelTitle, { color: colors.textPrimary }]}>
                {LIVE_BROADCAST_DETAILS.channelName}
              </Text>
              <View style={styles.hdBadge}>
                <Text style={styles.hdText}>ULTRA HD</Text>
              </View>
            </View>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              {LIVE_BROADCAST_DETAILS.tagline}
            </Text>
          </View>

          <View style={styles.serverStatus}>
            <View style={styles.greenDot} />
            <Text style={[styles.serverText, { color: colors.success }]}>
              OFFLINE STREAM ACTIVE
            </Text>
          </View>
        </View>

        {/* Program Description Card */}
        <View style={[styles.programCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.nowPlayingRow}>
            <Text style={styles.nowPlayingPill}>NOW AIRING</Text>
            <Text style={[styles.studioLocation, { color: colors.textMuted }]}>
              📍 {LIVE_BROADCAST_DETAILS.currentLocation}
            </Text>
          </View>
          <Text style={[styles.currentProgramTitle, { color: colors.textPrimary }]}>
            {LIVE_BROADCAST_DETAILS.currentProgram}
          </Text>
          <Text style={[styles.anchorDetails, { color: colors.textSecondary }]}>
            Presented live by {LIVE_BROADCAST_DETAILS.currentAnchor}
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <Text style={[styles.bulletinSummary, { color: colors.textMuted }]}>
            Continuous 24/7 uninterrupted simulated broadcast covering global geopolitics, economic trends, breaking tech innovations, and special regional bulletins.
          </Text>
        </View>

        {/* Tabs: Broadcast Schedule vs Highlights */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'schedule' && [styles.activeTabBtn, { borderBottomColor: colors.accent }],
            ]}
            onPress={() => setActiveTab('schedule')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'schedule' ? colors.accent : colors.textMuted },
              ]}
            >
              📅 TODAY'S SCHEDULE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'highlights' && [styles.activeTabBtn, { borderBottomColor: colors.accent }],
            ]}
            onPress={() => setActiveTab('highlights')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'highlights' ? colors.accent : colors.textMuted },
              ]}
            >
              📹 BROADCAST CLIPS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Broadcast Schedule */}
        {activeTab === 'schedule' && (
          <View style={styles.scheduleList}>
            {LIVE_BROADCAST_DETAILS.schedule.map(item => (
              <View
                key={item.id}
                style={[
                  styles.scheduleItem,
                  {
                    backgroundColor: item.isCurrent ? (colors.accent + '15') : colors.card,
                    borderColor: item.isCurrent ? colors.accent : colors.cardBorder,
                  },
                ]}
              >
                <View style={styles.scheduleTimeBox}>
                  <Text style={[styles.scheduleTime, { color: item.isCurrent ? colors.accent : colors.textMuted }]}>
                    {item.time}
                  </Text>
                  {item.isCurrent && (
                    <View style={styles.onAirPill}>
                      <Text style={styles.onAirText}>ON AIR</Text>
                    </View>
                  )}
                </View>
                <View style={styles.scheduleInfo}>
                  <Text style={[styles.scheduleTitle, { color: colors.textPrimary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.scheduleAnchor, { color: colors.textSecondary }]}>
                    Host: {item.anchor}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Tab 2: Broadcast Highlights */}
        {activeTab === 'highlights' && (
          <View style={styles.highlightsList}>
            {RECORDED_CLIPS.map(clip => (
              <TouchableOpacity
                key={clip.id}
                style={[styles.highlightCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Clips' })}
              >
                <View style={styles.highlightBadge}>
                  <Text style={styles.highlightBadgeText}>{clip.duration}</Text>
                </View>
                <View style={styles.highlightBody}>
                  <Text style={[styles.highlightCategory, { color: colors.accent }]}>
                    {clip.category.toUpperCase()}
                  </Text>
                  <Text style={[styles.highlightTitle, { color: colors.textPrimary }]} numberOfLines={2}>
                    {clip.title}
                  </Text>
                  <Text style={[styles.highlightMeta, { color: colors.textMuted }]}>
                    {clip.views} • {clip.publishedAt}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  channelStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  hdBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  hdText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '800',
  },
  tagline: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  serverStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  serverText: {
    fontSize: 10,
    fontWeight: '800',
  },
  programCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    ...shadows.sm,
  },
  nowPlayingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  nowPlayingPill: {
    color: '#DC2626',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  studioLocation: {
    fontSize: 11,
    fontWeight: '600',
  },
  currentProgramTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  anchorDetails: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  bulletinSummary: {
    fontSize: 12,
    lineHeight: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabBtn: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '800',
  },
  scheduleList: {
    padding: spacing.lg,
  },
  scheduleItem: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  scheduleTimeBox: {
    width: 95,
    justifyContent: 'center',
  },
  scheduleTime: {
    fontSize: 11,
    fontWeight: '700',
  },
  onAirPill: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  onAirText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  scheduleInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  scheduleAnchor: {
    fontSize: 12,
  },
  highlightsList: {
    padding: spacing.lg,
  },
  highlightCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  highlightBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: '#334155',
  },
  highlightBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
  },
  highlightBody: {
    flex: 1,
  },
  highlightCategory: {
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 2,
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  highlightMeta: {
    fontSize: 11,
    marginTop: 2,
  },
});

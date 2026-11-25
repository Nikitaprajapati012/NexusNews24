import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { LivePlayer } from '../../components/video/LivePlayer';
import { LIVE_BROADCAST_DETAILS } from '../../data/liveNewsData';
import { RecordedClip, RECORDED_CLIPS } from '../../data/clipsData';
import { fetchLiveClips } from '../../services/videoService';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const LiveTVScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'schedule' | 'highlights'>('schedule');
  const [clips, setClips] = useState<RecordedClip[]>(RECORDED_CLIPS);
  const [loadingClips, setLoadingClips] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    fetchLiveClips().then(items => {
      if (active) {
        setClips(items);
        setLoadingClips(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

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
              <View style={[styles.hdBadge, { backgroundColor: isDark ? '#0F172A' : '#EFF6FF', borderColor: colors.accent }]}>
                <Text style={[styles.hdText, { color: colors.accent }]}>ULTRA HD</Text>
              </View>
            </View>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              {LIVE_BROADCAST_DETAILS.tagline}
            </Text>
          </View>

          <View style={styles.serverStatus}>
            <View style={styles.greenDot} />
            <Text style={[styles.serverText, { color: colors.success }]}>
              LIVE SATELLITE FEED ONLINE
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
            Continuous 24/7 live satellite broadcast covering breaking global geopolitics, financial markets, investigative journalism, and international headlines.
          </Text>
        </View>

        {/* Tabs: Broadcast Schedule vs Highlights */}
        <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
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
            {LIVE_BROADCAST_DETAILS.schedule.map(item => {
              const thumbSource =
                typeof item.thumbnail === 'string'
                  ? { uri: item.thumbnail }
                  : item.thumbnail;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.scheduleCard,
                    {
                      backgroundColor: item.isCurrent ? (colors.accent + '12') : colors.card,
                      borderColor: item.isCurrent ? colors.accent : colors.cardBorder,
                    },
                    item.isCurrent && styles.scheduleCardActive,
                  ]}
                >
                  {/* Program Thumbnail with Overlay */}
                  <View style={styles.programThumbWrapper}>
                    {thumbSource ? (
                      <Image
                        source={thumbSource}
                        style={styles.programThumb}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.programThumb, { backgroundColor: colors.surfaceVariant }]} />
                    )}
                    <View style={styles.programThumbOverlay} />

                    {item.isCurrent ? (
                      <View style={styles.onAirBadge}>
                        <View style={styles.livePulseDot} />
                        <Text style={styles.onAirBadgeText}>ON AIR</Text>
                      </View>
                    ) : (
                      <View style={styles.timeTagBadge}>
                        <Text style={styles.timeTagText}>{item.time.split(' - ')[0]}</Text>
                      </View>
                    )}
                  </View>

                  {/* Program Details */}
                  <View style={styles.programDetails}>
                    <View style={styles.programMetaRow}>
                      <Text style={[styles.programCategory, { color: item.isCurrent ? colors.accent : (isDark ? '#94A3B8' : '#64748B') }]}>
                        {item.category?.toUpperCase() || 'NEWS'}
                      </Text>
                      <Text style={[styles.programTimeText, { color: item.isCurrent ? colors.accent : colors.textMuted }]}>
                        🕒 {item.time}
                      </Text>
                    </View>

                    <Text style={[styles.programTitle, { color: colors.textPrimary }]} numberOfLines={2}>
                      {item.title}
                    </Text>

                    <View style={styles.hostRow}>
                      <View style={styles.hostIconBox}>
                        <Text style={styles.hostIcon}>🎙️</Text>
                      </View>
                      <Text style={[styles.hostName, { color: colors.textSecondary }]} numberOfLines={1}>
                        Host: {item.anchor}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Tab 2: Broadcast Highlights */}
        {activeTab === 'highlights' && (
          <View style={styles.highlightsList}>
            {loadingClips && clips.length === 0 ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color={colors.accent} />
                <Text style={[styles.loadingBoxText, { color: colors.textSecondary }]}>
                  Loading live broadcast clips...
                </Text>
              </View>
            ) : clips.length > 0 ? (
              clips.map(clip => {
                const thumbSource =
                  typeof clip.thumbnail === 'string'
                    ? { uri: clip.thumbnail }
                    : clip.thumbnail;

                return (
                  <TouchableOpacity
                    key={clip.id}
                    style={[styles.clipCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Clips', params: { clipId: clip.id } })}
                  >
                    {/* Clip Thumbnail with Play Icon & Duration */}
                    <View style={styles.clipThumbWrapper}>
                      {thumbSource ? (
                        <Image
                          source={thumbSource}
                          style={styles.clipThumb}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={[styles.clipThumb, { backgroundColor: colors.surfaceVariant }]} />
                      )}
                      <View style={styles.clipThumbOverlay} />
                      <View style={styles.clipPlayCircle}>
                        <Text style={styles.clipPlayArrow}>▶</Text>
                      </View>
                      <View style={styles.clipDurationBadge}>
                        <Text style={styles.clipDurationText}>{clip.duration}</Text>
                      </View>
                    </View>

                    {/* Clip Content Info */}
                    <View style={styles.clipContent}>
                      <View style={styles.clipCategoryRow}>
                        <Text style={[styles.clipCategoryText, { color: colors.accent }]}>
                          {clip.category.toUpperCase()}
                        </Text>
                        <Text style={[styles.hdLabel, { color: colors.textSecondary, borderColor: colors.border }]}>HD</Text>
                      </View>
                      <Text style={[styles.clipTitleText, { color: colors.textPrimary }]} numberOfLines={2}>
                        {clip.title}
                      </Text>
                      <View style={styles.clipFooterRow}>
                        <Text style={[styles.clipMetaText, { color: colors.textMuted }]}>
                          🔥 {clip.views}
                        </Text>
                        <Text style={[styles.clipDotSeparator, { color: colors.textMuted }]}>•</Text>
                        <Text style={[styles.clipMetaText, { color: colors.textMuted }]}>
                          {clip.publishedAt}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.loadingBox}>
                <Text style={[styles.loadingBoxText, { color: colors.textSecondary }]}>
                  No broadcast clips available.
                </Text>
              </View>
            )}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  scheduleCard: {
    flexDirection: 'row',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  scheduleCardActive: {
    borderWidth: 1.5,
  },
  programThumbWrapper: {
    width: 105,
    height: 72,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  programThumb: {
    width: '100%',
    height: '100%',
  },
  programThumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  onAirBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  livePulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  onAirBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  timeTagBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  timeTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  programDetails: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  programMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  programCategory: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  programTimeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  programTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostIconBox: {
    marginRight: 4,
  },
  hostIcon: {
    fontSize: 11,
  },
  hostName: {
    fontSize: 11,
    fontWeight: '500',
  },
  highlightsList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  clipCard: {
    flexDirection: 'row',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  clipThumbWrapper: {
    width: 115,
    height: 75,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  clipThumb: {
    width: '100%',
    height: '100%',
  },
  clipThumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  clipPlayCircle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  clipPlayArrow: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 2,
  },
  clipDurationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  clipDurationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  clipContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  clipCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  clipCategoryText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  hdLabel: {
    fontSize: 9,
    fontWeight: '800',
    borderWidth: 0.5,
    borderColor: '#475569',
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  clipTitleText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
  },
  clipFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clipMetaText: {
    fontSize: 11,
    fontWeight: '500',
  },
  clipDotSeparator: {
    marginHorizontal: 4,
    fontSize: 11,
  },
  loadingBox: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBoxText: {
    marginTop: spacing.sm,
    fontSize: 13,
  },
});

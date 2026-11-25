import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components/common/AppHeader';
import { LivePlayer } from '../../components/video/LivePlayer';
import { LIVE_BROADCAST_DETAILS } from '../../data/liveNewsData';
import { RecordedClip, RECORDED_CLIPS } from '../../data/clipsData';
import { fetchLiveClips } from '../../services/videoService';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PlayIcon, FireIcon } from '../../components/icons/TabIcons';

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
              <View style={[styles.hdBadge, { backgroundColor: colors.accentSubtle, borderColor: colors.accent }]}>
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
              SATELLITE ONLINE
            </Text>
          </View>
        </View>

        {/* Program Description Card */}
        <View style={[styles.programCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.nowPlayingRow}>
            <View style={styles.nowPlayingBadge}>
              <View style={styles.livePulseDot} />
              <Text style={styles.nowPlayingPill}>NOW AIRING</Text>
            </View>
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
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'schedule' ? colors.accent : colors.textMuted },
              ]}
            >
              TODAY'S SCHEDULE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'highlights' && [styles.activeTabBtn, { borderBottomColor: colors.accent }],
            ]}
            onPress={() => setActiveTab('highlights')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'highlights' ? colors.accent : colors.textMuted },
              ]}
            >
              BROADCAST CLIPS
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
                      backgroundColor: item.isCurrent ? colors.accentSubtle : colors.card,
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
                        {item.time}
                      </Text>
                    </View>

                    <Text style={[styles.programTitle, { color: colors.textPrimary }]} numberOfLines={2}>
                      {item.title}
                    </Text>

                    <Text style={[styles.hostName, { color: colors.textSecondary }]} numberOfLines={1}>
                      Host: {item.anchor}
                    </Text>
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
                    activeOpacity={0.8}
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
                        <PlayIcon color="#FFFFFF" size={12} />
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
                        <FireIcon color="#EF4444" size={11} />
                        <Text style={[styles.clipMetaText, { color: colors.textMuted }]}>
                          {clip.views} reads
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
    gap: 6,
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  hdBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
  },
  hdText: {
    fontSize: 9,
    fontWeight: '800',
  },
  tagline: {
    ...typography.caption,
    marginTop: 2,
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
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.3,
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
  nowPlayingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nowPlayingPill: {
    color: '#DC2626',
    ...typography.badge,
    fontSize: 10,
  },
  studioLocation: {
    ...typography.caption,
    fontWeight: '600',
  },
  currentProgramTitle: {
    ...typography.heroHeadline,
    fontSize: 18,
    marginBottom: 4,
  },
  anchorDetails: {
    ...typography.cardSubtitle,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  bulletinSummary: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 19,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabBtn: {
    borderBottomWidth: 2,
  },
  tabText: {
    ...typography.badge,
    fontSize: 11,
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
    ...shadows.sm,
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
    backgroundColor: '#090D16',
  },
  programThumb: {
    width: '100%',
    height: '100%',
  },
  programThumbOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 13, 22, 0.35)',
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
    borderRadius: borderRadius.xs,
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
    ...typography.badge,
    fontSize: 8,
  },
  timeTagBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
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
    ...typography.badge,
    fontSize: 9,
  },
  programTimeText: {
    ...typography.caption,
    fontWeight: '700',
  },
  programTitle: {
    ...typography.cardTitle,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  hostName: {
    ...typography.caption,
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
    ...shadows.sm,
  },
  clipThumbWrapper: {
    width: 115,
    height: 75,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#090D16',
  },
  clipThumb: {
    width: '100%',
    height: '100%',
  },
  clipThumbOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 13, 22, 0.35)',
  },
  clipPlayCircle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(9, 13, 22, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  clipDurationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: borderRadius.xs,
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
    ...typography.badge,
    fontSize: 9,
  },
  hdLabel: {
    fontSize: 9,
    fontWeight: '800',
    borderWidth: 0.5,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  clipTitleText: {
    ...typography.cardTitle,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  clipFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clipMetaText: {
    ...typography.caption,
  },
  clipDotSeparator: {
    marginHorizontal: 2,
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

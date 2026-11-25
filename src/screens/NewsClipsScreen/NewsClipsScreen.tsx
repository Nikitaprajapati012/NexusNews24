import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../../components/common/AppHeader';
import { ClipPlayer } from '../../components/video/ClipPlayer';
import { RecordedClip, RECORDED_CLIPS } from '../../data/clipsData';
import { fetchLiveClips } from '../../services/videoService';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PlayIcon, ShareIcon } from '../../components/icons/TabIcons';

interface Props {
  route?: {
    params?: {
      clipId?: string;
    };
  };
}

export const NewsClipsScreen: React.FC<Props> = ({ route }) => {
  const { colors } = useTheme();
  const [allClips, setAllClips] = useState<RecordedClip[]>(RECORDED_CLIPS);
  const [selectedClip, setSelectedClip] = useState<RecordedClip | null>(
    RECORDED_CLIPS.length > 0 ? RECORDED_CLIPS[0] : null,
  );
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    fetchLiveClips().then(live => {
      if (active) {
        if (live.length > 0) {
          setAllClips(live);
          const targetId = route?.params?.clipId;
          const match = targetId ? live.find(c => c.id === targetId) : null;
          setSelectedClip(match || live[0]);
        }
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [route?.params?.clipId]);

  useEffect(() => {
    const targetId = route?.params?.clipId;
    if (targetId && allClips.length > 0) {
      const match = allClips.find(c => c.id === targetId);
      if (match) setSelectedClip(match);
    }
  }, [route?.params?.clipId, allClips]);

  const categories = ['All', 'Technology', 'Business', 'National', 'Sports'];

  const filteredClips = selectedCat === 'All'
    ? allClips
    : allClips.filter(c => c.category.toLowerCase() === selectedCat.toLowerCase());

  const handleShareClip = async (clip: RecordedClip) => {
    try {
      await Share.share({
        message: `${clip.title}\n\nWatch this special report on Nexus News 24:\n${clip.description}`,
        title: clip.title,
      });
    } catch {
      // ignore
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader showDate={false} />

      {loading && !selectedClip ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Fetching live broadcast clips...
          </Text>
        </View>
      ) : selectedClip ? (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Active Clip Player Section */}
          <View style={styles.playerContainer}>
            <ClipPlayer clip={selectedClip} />
            <View style={[styles.activeClipDetails, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <View style={styles.titleRow}>
                <View style={styles.titleTextContainer}>
                  <Text style={[styles.nowPlayingLabel, { color: colors.accent }]}>
                    NOW PLAYING REPORT
                  </Text>
                  <Text style={[styles.activeTitle, { color: colors.textPrimary }]}>
                    {selectedClip.title}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.shareBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.cardBorder }]}
                  onPress={() => handleShareClip(selectedClip)}
                  activeOpacity={0.7}
                >
                  <ShareIcon color={colors.textPrimary} size={15} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.activeDesc, { color: colors.textSecondary }]}>
                {selectedClip.description}
              </Text>
              <View style={styles.metaRow}>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  {selectedClip.views} views • {selectedClip.duration} • {selectedClip.publishedAt}
                </Text>
              </View>
            </View>
          </View>

          {/* Category Filters */}
          <View style={styles.categoryBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {categories.map(cat => {
                const active = selectedCat === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.catChip,
                      {
                        backgroundColor: active ? '#DC2626' : colors.card,
                        borderColor: active ? '#DC2626' : colors.cardBorder,
                      },
                    ]}
                    onPress={() => setSelectedCat(cat)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        { color: active ? '#FFFFFF' : colors.textPrimary },
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Clips Catalog */}
          <View style={styles.clipsListSection}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              MORE BROADCAST CLIPS ({filteredClips.length})
            </Text>

            {filteredClips.map(clip => {
              const isPlayingThis = clip.id === selectedClip.id;
              return (
                <TouchableOpacity
                  key={clip.id}
                  style={[
                    styles.clipCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isPlayingThis ? colors.accent : colors.cardBorder,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedClip(clip)}
                >
                  <View style={styles.thumbWrapper}>
                    <Image source={clip.thumbnail} style={styles.clipThumb} resizeMode="cover" />
                    <View style={styles.durationTag}>
                      <Text style={styles.durationText}>{clip.duration}</Text>
                    </View>
                    <View style={styles.playIconOverlay}>
                      <PlayIcon color="#FFFFFF" size={11} />
                    </View>
                  </View>

                  <View style={styles.clipContent}>
                    <View style={styles.clipBadgeRow}>
                      <Text style={[styles.categoryLabel, { color: colors.accent }]}>
                        {clip.category.toUpperCase()}
                      </Text>
                      {isPlayingThis && (
                        <View style={styles.playingNowBadge}>
                          <Text style={styles.playingNowText}>PLAYING</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.clipTitle, { color: colors.textPrimary }]} numberOfLines={2}>
                      {clip.title}
                    </Text>
                    <Text style={[styles.clipDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                      {clip.description}
                    </Text>
                    <Text style={[styles.clipMeta, { color: colors.textMuted }]}>
                      {clip.views} • {clip.publishedAt}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            No broadcast clips currently available.
          </Text>
        </View>
      )}
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
  playerContainer: {
    padding: spacing.lg,
  },
  activeClipDetails: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    ...shadows.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTextContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  nowPlayingLabel: {
    ...typography.badge,
    fontSize: 9.5,
    marginBottom: 4,
  },
  activeTitle: {
    ...typography.heroHeadline,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  shareBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDesc: {
    ...typography.cardSubtitle,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  metaRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: spacing.xs,
  },
  metaText: {
    ...typography.caption,
  },
  categoryBar: {
    marginBottom: spacing.md,
  },
  categoryScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    marginRight: spacing.sm,
    ...shadows.sm,
  },
  catChipText: {
    ...typography.badge,
    fontSize: 11,
  },
  clipsListSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    fontSize: 15,
    marginBottom: spacing.md,
  },
  clipCard: {
    flexDirection: 'row',
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  thumbWrapper: {
    width: 110,
    height: 78,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#090D16',
  },
  clipThumb: {
    width: '100%',
    height: '100%',
  },
  durationTag: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: borderRadius.xs,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  playIconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingLeft: 2,
  },
  clipContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  clipBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  categoryLabel: {
    ...typography.badge,
    fontSize: 9,
  },
  playingNowBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: borderRadius.xs,
  },
  playingNowText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  clipTitle: {
    ...typography.cardTitle,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  clipDescription: {
    ...typography.caption,
    lineHeight: 15,
    marginBottom: 4,
  },
  clipMeta: {
    ...typography.caption,
    fontSize: 10,
  },
  loadingContainer: {
    flex: 1,
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    ...typography.body,
  },
});

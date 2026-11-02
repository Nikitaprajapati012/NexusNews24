import React, { useState } from 'react';
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
import { AppHeader } from '../../components/common/AppHeader';
import { ClipPlayer } from '../../components/video/ClipPlayer';
import { RECORDED_CLIPS, RecordedClip } from '../../data/clipsData';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

export const NewsClipsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedClip, setSelectedClip] = useState<RecordedClip>(RECORDED_CLIPS[0]);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Technology', 'Business', 'National', 'Sports'];

  const filteredClips = selectedCat === 'All'
    ? RECORDED_CLIPS
    : RECORDED_CLIPS.filter(c => c.category.toLowerCase() === selectedCat.toLowerCase());

  const handleShareClip = async (clip: RecordedClip) => {
    try {
      await Share.share({
        message: `${clip.title}\n\nWatch this special report on Nexus News 24:\n${clip.description}`,
        title: clip.title,
      });
    } catch (e) {}
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader showDate={false} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Active Clip Player Section */}
        <View style={styles.playerContainer}>
          <ClipPlayer clip={selectedClip} />
          <View style={[styles.activeClipDetails, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
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
                style={[styles.shareBtn, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => handleShareClip(selectedClip)}
                activeOpacity={0.7}
              >
                <Text style={styles.shareIcon}>🔗</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.activeDesc, { color: colors.textSecondary }]}>
              {selectedClip.description}
            </Text>
            <View style={styles.metaRow}>
              <Text style={[styles.metaText, { color: colors.textMuted }]}>
                👁️ {selectedClip.views} • ⏱️ {selectedClip.duration} • 📅 {selectedClip.publishedAt}
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
                  activeOpacity={0.8}
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
                activeOpacity={0.85}
                onPress={() => setSelectedClip(clip)}
              >
                <View style={styles.thumbWrapper}>
                  <Image source={clip.thumbnail} style={styles.clipThumb} resizeMode="cover" />
                  <View style={styles.durationTag}>
                    <Text style={styles.durationText}>{clip.duration}</Text>
                  </View>
                  <View style={styles.playIconOverlay}>
                    <Text style={styles.playArrow}>▶</Text>
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
    padding: spacing.md,
  },
  activeClipDetails: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    borderBottomWidth: 1,
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
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 16,
  },
  activeDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  metaRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(150,150,150,0.2)',
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  categoryBar: {
    paddingVertical: spacing.xs,
  },
  categoryScroll: {
    paddingHorizontal: spacing.lg,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  clipsListSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  clipCard: {
    flexDirection: 'row',
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  thumbWrapper: {
    width: 120,
    height: 100,
    position: 'relative',
  },
  clipThumb: {
    width: '100%',
    height: '100%',
  },
  durationTag: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  playIconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -14,
    marginLeft: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playArrow: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 2,
  },
  clipContent: {
    flex: 1,
    padding: spacing.sm + 2,
    justifyContent: 'space-between',
  },
  clipBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  playingNowBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  playingNowText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  clipTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  clipDescription: {
    fontSize: 11,
    lineHeight: 15,
  },
  clipMeta: {
    fontSize: 10,
    fontWeight: '500',
  },
});

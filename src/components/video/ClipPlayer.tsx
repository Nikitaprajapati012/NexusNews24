import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { RecordedClip } from '../../data/clipsData';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PlayIcon, VolumeOnIcon, VolumeOffIcon } from '../icons/TabIcons';

interface Props {
  clip: RecordedClip;
  onClose?: () => void;
}

export const ClipPlayer: React.FC<Props> = ({ clip, onClose }) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const posterUri =
    typeof clip.thumbnail === 'object' && clip.thumbnail?.uri
      ? clip.thumbnail.uri
      : undefined;

  return (
    <View style={styles.container}>
      <Video
        source={clip.videoSource}
        style={styles.video}
        resizeMode="contain"
        repeat={true}
        paused={paused}
        muted={muted}
        poster={posterUri}
        posterResizeMode="cover"
        onProgress={e => {
          if (e.seekableDuration > 0) {
            setProgress(e.currentTime / e.seekableDuration);
          }
        }}
      />

      {/* Top Header Overlay */}
      <View style={styles.topRow}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{clip.category.toUpperCase()}</Text>
        </View>
        <View style={styles.topRightControls}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => setMuted(!muted)}
            activeOpacity={0.7}
          >
            {muted ? (
              <VolumeOffIcon color="#FFFFFF" size={14} />
            ) : (
              <VolumeOnIcon color="#FFFFFF" size={14} />
            )}
          </TouchableOpacity>
          {onClose && (
            <TouchableOpacity style={styles.circleBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.iconText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Center Play/Pause button on tap */}
      <TouchableOpacity
        style={styles.centerTouch}
        activeOpacity={1}
        onPress={() => setPaused(!paused)}
      >
        {paused && (
          <View style={styles.playOverlay}>
            <PlayIcon color="#FFFFFF" size={18} />
          </View>
        )}
      </TouchableOpacity>

      {/* Bottom Information & Progress Bar */}
      <View style={styles.bottomRow}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {clip.title}
        </Text>
        <View style={styles.infoMeta}>
          <Text style={styles.metaText}>{clip.duration} • {clip.views} views</Text>
          <Text style={styles.metaText}>{clip.publishedAt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: 220,
    backgroundColor: '#000000',
    position: 'relative',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...shadows.md,
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  topRow: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  categoryPill: {
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
  },
  categoryText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 9.5,
  },
  topRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(9, 13, 22, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  centerTouch: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  playOverlay: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(9, 13, 22, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingLeft: 3,
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(9, 13, 22, 0.88)',
    paddingHorizontal: spacing.md,
    paddingTop: 6,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  progressBarBg: {
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#DC2626',
  },
  title: {
    color: '#FFFFFF',
    ...typography.cardTitle,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  infoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    color: '#94A3B8',
    ...typography.caption,
  },
});

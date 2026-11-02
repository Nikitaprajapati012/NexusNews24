import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { RecordedClip } from '../../data/clipsData';
import { spacing, borderRadius } from '../../theme/spacing';

interface Props {
  clip: RecordedClip;
  onClose?: () => void;
}

export const ClipPlayer: React.FC<Props> = ({ clip, onClose }) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      <Video
        source={clip.videoSource}
        style={styles.video}
        resizeMode="contain"
        repeat={true}
        paused={paused}
        muted={muted}
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
          >
            <Text style={styles.iconText}>{muted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity>
          {onClose && (
            <TouchableOpacity style={styles.circleBtn} onPress={onClose}>
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
            <Text style={styles.playIcon}>▶</Text>
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
          <Text style={styles.metaText}>{clip.duration} • {clip.views}</Text>
          <Text style={styles.metaText}>{clip.publishedAt}</Text>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    position: 'relative',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
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
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  topRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  centerTouch: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playOverlay: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 3,
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  progressBarBg: {
    width: '100%',
    height: 3,
    backgroundColor: '#334155',
    marginBottom: 6,
    borderRadius: 1.5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#DC2626',
    borderRadius: 1.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  infoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '500',
  },
});

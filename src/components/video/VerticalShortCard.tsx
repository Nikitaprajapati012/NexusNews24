import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Share } from 'react-native';
import Video from 'react-native-video';
import { ShortNewsItem } from '../../data/shortsData';
import { spacing } from '../../theme/spacing';

interface Props {
  item: ShortNewsItem;
  isActive: boolean;
}

export const VerticalShortCard: React.FC<Props> = ({ item, isActive }) => {
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.headline}\n\nWatch on Nexus Shorts ⚡:\n${item.caption}`,
        title: item.headline,
      });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Video
        source={item.videoSource}
        style={styles.video}
        resizeMode="cover"
        repeat={true}
        paused={!isActive || paused}
        muted={muted}
      />

      {/* Tap anywhere to pause/resume */}
      <TouchableOpacity
        style={styles.tapLayer}
        activeOpacity={1}
        onPress={() => setPaused(!paused)}
      >
        {paused && (
          <View style={styles.pauseBadge}>
            <Text style={styles.pauseIcon}>⏸️</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Top Bar Overlay */}
      <View style={styles.topBar}>
        <View style={styles.liveShortTag}>
          <Text style={styles.liveShortText}>⚡ {item.category}</Text>
        </View>
        <TouchableOpacity
          style={styles.muteBtn}
          onPress={() => setMuted(!muted)}
        >
          <Text style={styles.muteIcon}>{muted ? '🔇' : '🔊'}</Text>
        </TouchableOpacity>
      </View>

      {/* Right Side Action Floating Buttons */}
      <View style={styles.sideActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setLiked(!liked)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionEmoji}>{liked ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionLabel}>{liked ? '143K' : item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setBookmarked(!bookmarked)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionEmoji}>{bookmarked ? '🔖' : '🏷️'}</Text>
          <Text style={styles.actionLabel}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Text style={styles.actionEmoji}>🔗</Text>
          <Text style={styles.actionLabel}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Content Info */}
      <View style={styles.bottomContent}>
        <View style={styles.channelRow}>
          <View style={styles.channelAvatar}>
            <Text style={styles.channelAvatarText}>24</Text>
          </View>
          <Text style={styles.channelName}>{item.channel}</Text>
          <View style={styles.followBadge}>
            <Text style={styles.followText}>OFFICIAL</Text>
          </View>
        </View>

        <Text style={styles.headline} numberOfLines={2}>
          {item.headline}
        </Text>
        <Text style={styles.caption} numberOfLines={2}>
          {item.caption}
        </Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: height - 120,
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'space-between',
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  tapLayer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseIcon: {
    fontSize: 28,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    zIndex: 10,
  },
  liveShortTag: {
    backgroundColor: 'rgba(220, 38, 38, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveShortText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  muteBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteIcon: {
    fontSize: 16,
  },
  sideActions: {
    position: 'absolute',
    right: spacing.md,
    bottom: 120,
    alignItems: 'center',
    zIndex: 10,
  },
  actionBtn: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  actionEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  bottomContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl + 10,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingTop: spacing.md,
    zIndex: 10,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  channelAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  channelAvatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  channelName: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    marginRight: 6,
  },
  followBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  followText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '800',
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
    marginBottom: 4,
  },
  caption: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 16,
  },
});

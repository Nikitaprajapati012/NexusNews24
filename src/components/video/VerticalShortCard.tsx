import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Share, Image } from 'react-native';
import Video from 'react-native-video';
import { ShortNewsItem } from '../../data/shortsData';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { GradientOverlay } from '../common/GradientOverlay';
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  PauseIcon,
} from '../icons/TabIcons';

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
    } catch {
      // ignore
    }
  };

  const posterUri =
    typeof item.thumbnail === 'object' && item.thumbnail?.uri
      ? item.thumbnail.uri
      : typeof item.thumbnail === 'string'
      ? item.thumbnail
      : undefined;

  return (
    <View style={styles.container}>
      {posterUri ? (
        <Image
          source={{ uri: posterUri }}
          style={styles.posterFallback}
          resizeMode="cover"
        />
      ) : null}
      <Video
        source={item.videoSource}
        style={styles.video}
        resizeMode="cover"
        repeat={true}
        paused={!isActive || paused}
        muted={muted}
        poster={posterUri}
        posterResizeMode="cover"
      />

      {/* Tap anywhere to pause/resume */}
      <TouchableOpacity
        style={styles.tapLayer}
        activeOpacity={1}
        onPress={() => setPaused(!paused)}
      >
        {paused && (
          <View style={styles.pauseBadge}>
            <PauseIcon color="#FFFFFF" size={24} />
          </View>
        )}
      </TouchableOpacity>

      {/* Top Bar Overlay */}
      <View style={styles.topBar}>
        <View style={styles.liveShortTag}>
          <Text style={styles.liveShortText}>⚡ {item.category.toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          style={styles.muteBtn}
          onPress={() => setMuted(!muted)}
          activeOpacity={0.7}
        >
          {muted ? (
            <VolumeOffIcon color="#FFFFFF" size={16} />
          ) : (
            <VolumeOnIcon color="#FFFFFF" size={16} />
          )}
        </TouchableOpacity>
      </View>

      {/* Right Side Action Floating Buttons */}
      <View style={styles.sideActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setLiked(!liked)}
          activeOpacity={0.7}
        >
          <View style={styles.actionIconCircle}>
            <HeartIcon color={liked ? '#EF4444' : '#FFFFFF'} size={20} focused={liked} />
          </View>
          <Text style={styles.actionLabel}>{liked ? '143K' : item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setBookmarked(!bookmarked)}
          activeOpacity={0.7}
        >
          <View style={styles.actionIconCircle}>
            <BookmarkIcon color={bookmarked ? '#DC2626' : '#FFFFFF'} size={18} focused={bookmarked} />
          </View>
          <Text style={styles.actionLabel}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <View style={styles.actionIconCircle}>
            <ShareIcon color="#FFFFFF" size={18} />
          </View>
          <Text style={styles.actionLabel}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Content Info with Gradient Overlay */}
      <View style={styles.bottomContent}>
        <GradientOverlay
          direction="bottom-to-top"
          startOpacity={0.95}
          endOpacity={0.0}
          color="#090D16"
        />
        <View style={styles.channelRow}>
          <View style={styles.channelAvatar}>
            <Text style={styles.channelAvatarText}>24</Text>
          </View>
          <Text style={styles.channelName}>{item.channel}</Text>
          <View style={styles.followBadge}>
            <Text style={styles.followText}>VERIFIED</Text>
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
  posterFallback: {
    ...StyleSheet.absoluteFill,
  },
  tapLayer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseBadge: {
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...shadows.md,
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
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.pill,
    ...shadows.sm,
  },
  liveShortText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 10,
  },
  muteBtn: {
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 4,
    ...shadows.sm,
  },
  actionLabel: {
    color: '#FFFFFF',
    ...typography.caption,
    fontWeight: '700',
  },
  bottomContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl + 10,
    paddingTop: spacing.xxxl,
    position: 'relative',
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
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    borderWidth: 0.5,
    borderColor: '#38BDF8',
  },
  followText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headline: {
    color: '#FFFFFF',
    ...typography.cardTitle,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  caption: {
    color: '#CBD5E1',
    ...typography.cardSubtitle,
  },
});

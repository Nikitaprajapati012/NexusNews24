import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { LIVE_BROADCAST_DETAILS } from '../../data/liveNewsData';
import { fetchLiveBreakingNews } from '../../services/newsService';
import { getLiveBroadcastTime } from '../../utils/dateFormatter';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { VolumeOnIcon, VolumeOffIcon, PlayIcon, PauseIcon } from '../icons/TabIcons';

const LIVE_STREAM_SOURCES = [
  { uri: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8' },
  { uri: 'https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/2774c390ad884e06a7b0257c8489e23d/index.m3u8' },
  { uri: 'https://tv-trtworld.medya.trt.com.tr/master.m3u8' },
  { uri: 'https://abpmitv.akamaized.net/hls/live/2042842/abpnews/master.m3u8' },
  { uri: 'https://d2lk5u59tns74c.cloudfront.net/out/v1/75f3183e143240a29fbddd502a6a3f8d/index.m3u8' },
  { uri: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8' },
];

const LOCAL_FALLBACK_VIDEO = require('../../assets/videos/live_stream.mp4');

interface Props {
  compact?: boolean;
  onPressFullscreen?: () => void;
}

export const LivePlayer: React.FC<Props> = ({ compact = false }) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [clock, setClock] = useState(getLiveBroadcastTime());
  const [tickerIndex, setTickerIndex] = useState(0);
  const [streamIndex, setStreamIndex] = useState(0);
  const [videoSource, setVideoSource] = useState<any>(LIVE_STREAM_SOURCES[0]);
  const [lowerThirds, setLowerThirds] = useState<string[]>(LIVE_BROADCAST_DETAILS.lowerThirds);

  useEffect(() => {
    let active = true;
    fetchLiveBreakingNews().then(items => {
      if (active && items.length > 0) {
        setLowerThirds(items.map(it => it.tickerText));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setClock(getLiveBroadcastTime());
    }, 1000);

    const tickerTimer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % lowerThirds.length);
    }, 4500);

    return () => {
      clearInterval(clockTimer);
      clearInterval(tickerTimer);
    };
  }, [lowerThirds.length]);

  return (
    <View style={[styles.container, compact ? styles.compactContainer : styles.fullContainer]}>
      <Video
        source={videoSource}
        style={styles.video}
        resizeMode="cover"
        repeat={true}
        paused={paused}
        muted={muted}
        playInBackground={false}
        playWhenInactive={false}
        onError={() => {
          const nextIndex = streamIndex + 1;
          if (nextIndex < LIVE_STREAM_SOURCES.length) {
            setStreamIndex(nextIndex);
            setVideoSource(LIVE_STREAM_SOURCES[nextIndex]);
          } else if (videoSource !== LOCAL_FALLBACK_VIDEO) {
            setVideoSource(LOCAL_FALLBACK_VIDEO);
          }
        }}
      />

      {/* Top Overlay: Channel logo, LIVE badge, and Viewers */}
      <View style={styles.topOverlay}>
        <View style={styles.topOverlayLeft}>
          <View style={styles.liveBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <View style={styles.channelTag}>
            <Text style={styles.channelText}>NEXUS 24 HD</Text>
          </View>
        </View>

        <View style={styles.topOverlayRight}>
          <View style={styles.viewerBadge}>
            <Text style={styles.viewerText}>LIVE {LIVE_BROADCAST_DETAILS.liveViewers}</Text>
          </View>
          <TouchableOpacity
            style={styles.controlCircle}
            onPress={() => setMuted(!muted)}
            activeOpacity={0.7}
          >
            {muted ? (
              <VolumeOffIcon color="#FFFFFF" size={14} />
            ) : (
              <VolumeOnIcon color="#FFFFFF" size={14} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlCircle}
            onPress={() => setPaused(!paused)}
            activeOpacity={0.7}
          >
            {paused ? (
              <PlayIcon color="#FFFFFF" size={13} />
            ) : (
              <PauseIcon color="#FFFFFF" size={13} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Television Broadcast Lower-Third Banner */}
      {!compact && (
        <View style={styles.lowerThirdContainer}>
          {/* Main Program & Anchor bar */}
          <View style={styles.programBar}>
            <Text style={styles.programTitle}>
              {LIVE_BROADCAST_DETAILS.currentProgram}
            </Text>
            <Text style={styles.anchorTag}>
              ANCHOR: {LIVE_BROADCAST_DETAILS.currentAnchor.toUpperCase()}
            </Text>
          </View>

          {/* Ticker bar with clock */}
          <View style={styles.tickerBar}>
            <View style={styles.tickerClock}>
              <Text style={styles.clockText}>{clock}</Text>
            </View>
            <View style={styles.tickerHeadlineBox}>
              <Text style={styles.tickerHeadline} numberOfLines={1}>
                {lowerThirds[tickerIndex] || lowerThirds[0]}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Compact Mode Caption Overlay */}
      {compact && (
        <View style={styles.compactCaptionBar}>
          <View style={styles.livePulseDot} />
          <Text style={styles.compactCaptionText} numberOfLines={1}>
            {LIVE_BROADCAST_DETAILS.currentProgram} • {LIVE_BROADCAST_DETAILS.currentAnchor}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
  },
  compactContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: 215,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  fullContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: 240,
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  topOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  topOverlayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveBadge: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.pill,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  liveText: {
    color: '#FFFFFF',
    ...typography.badge,
    fontSize: 9.5,
  },
  channelTag: {
    backgroundColor: 'rgba(9, 13, 22, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  channelText: {
    color: '#E2E8F0',
    ...typography.badge,
    fontSize: 9.5,
  },
  topOverlayRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewerBadge: {
    backgroundColor: 'rgba(9, 13, 22, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  viewerText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  controlCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  lowerThirdContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  programBar: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderTopWidth: 2,
    borderTopColor: '#DC2626',
  },
  programTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  anchorTag: {
    color: '#38BDF8',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tickerBar: {
    backgroundColor: '#7F1D1D',
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  tickerClock: {
    backgroundColor: '#991B1B',
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.2)',
  },
  clockText: {
    color: '#FEF08A',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tickerHeadlineBox: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
  },
  tickerHeadline: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  compactCaptionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  compactCaptionText: {
    color: '#FFFFFF',
    ...typography.caption,
    fontWeight: '700',
    flex: 1,
  },
});

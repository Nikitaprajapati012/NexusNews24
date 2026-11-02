import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Video from 'react-native-video';
import { LIVE_BROADCAST_DETAILS } from '../../data/liveNewsData';
import { getLiveBroadcastTime } from '../../utils/dateFormatter';
import { spacing } from '../../theme/spacing';

interface Props {
  compact?: boolean;
  onPressFullscreen?: () => void;
}

export const LivePlayer: React.FC<Props> = ({ compact = false, onPressFullscreen }) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [clock, setClock] = useState(getLiveBroadcastTime());
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setClock(getLiveBroadcastTime());
    }, 1000);

    const tickerTimer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % LIVE_BROADCAST_DETAILS.lowerThirds.length);
    }, 5000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(tickerTimer);
    };
  }, []);

  return (
    <View style={[styles.container, compact ? styles.compactContainer : styles.fullContainer]}>
      <Video
        source={LIVE_BROADCAST_DETAILS.videoSource}
        style={styles.video}
        resizeMode="cover"
        repeat={true}
        paused={paused}
        muted={muted}
        playInBackground={false}
        playWhenInactive={false}
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
            <Text style={styles.viewerText}>👁️ {LIVE_BROADCAST_DETAILS.liveViewers}</Text>
          </View>
          <TouchableOpacity
            style={styles.controlCircle}
            onPress={() => setMuted(!muted)}
            activeOpacity={0.8}
          >
            <Text style={styles.controlIcon}>{muted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlCircle}
            onPress={() => setPaused(!paused)}
            activeOpacity={0.8}
          >
            <Text style={styles.controlIcon}>{paused ? '▶️' : '⏸️'}</Text>
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
              ANCHOR: {LIVE_BROADCAST_DETAILS.currentAnchor}
            </Text>
          </View>

          {/* Ticker bar with clock */}
          <View style={styles.tickerBar}>
            <View style={styles.tickerClock}>
              <Text style={styles.clockText}>{clock}</Text>
            </View>
            <View style={styles.tickerHeadlineBox}>
              <Text style={styles.tickerHeadline} numberOfLines={1}>
                {LIVE_BROADCAST_DETAILS.lowerThirds[tickerIndex]}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Compact Mode Caption Overlay */}
      {compact && (
        <View style={styles.compactCaptionBar}>
          <Text style={styles.compactCaptionText} numberOfLines={1}>
            🔴 {LIVE_BROADCAST_DETAILS.currentProgram} • {LIVE_BROADCAST_DETAILS.currentAnchor}
          </Text>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    overflow: 'hidden',
    position: 'relative',
  },
  compactContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  fullContainer: {
    width: '100%',
    height: 230,
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
  },
  liveBadge: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 6,
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
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  channelTag: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  channelText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '800',
  },
  topOverlayRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewerBadge: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
  },
  viewerText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  controlCircle: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  controlIcon: {
    fontSize: 13,
  },
  lowerThirdContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  programBar: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  programTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  anchorTag: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
  },
  tickerBar: {
    backgroundColor: '#B91C1C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  tickerClock: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  clockText: {
    color: '#FEF08A',
    fontSize: 10,
    fontWeight: '900',
  },
  tickerHeadlineBox: {
    flex: 1,
    paddingRight: 8,
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
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  compactCaptionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

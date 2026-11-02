import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F19' }]}>
      <Animated.View style={[styles.logoBox, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>24</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.titleNexus}>NEXUS</Text>
          <Text style={styles.titleNews}>NEWS</Text>
        </View>
        <Text style={styles.tagline}>TRUTH UNFILTERED • LIVE & DIRECT</Text>
      </Animated.View>

      <Animated.View style={[styles.bottomLoader, { opacity: pulseAnim }]}>
        <View style={styles.liveIndicator}>
          <View style={styles.redDot} />
          <Text style={styles.liveConnectingText}>CONNECTING TO GLOBAL BROADCAST GRID</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#DC2626',
    width: 64,
    height: 64,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleNexus: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  titleNews: {
    color: '#DC2626',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginLeft: 6,
  },
  tagline: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: spacing.xs,
  },
  bottomLoader: {
    position: 'absolute',
    bottom: 50,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  liveConnectingText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

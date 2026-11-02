import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BREAKING_NEWS } from '../../data/breakingNewsData';
import { spacing } from '../../theme/spacing';

export const BreakingNewsTicker: React.FC = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % BREAKING_NEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentItem = BREAKING_NEWS[currentIndex];

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('BreakingNews')}
    >
      <View style={styles.badge}>
        <View style={styles.pulseDot} />
        <Text style={styles.badgeText}>BREAKING</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.headlineText} numberOfLines={1} ellipsizeMode="tail">
          {currentItem?.tickerText || 'LIVE BREAKING BULLETIN: DEVELOPING STORY AHEAD'}
        </Text>
      </View>
      <Text style={styles.arrowIcon}>❯</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7F1D1D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#991B1B',
  },
  badge: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FEF08A',
    marginRight: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  textWrapper: {
    flex: 1,
  },
  headlineText: {
    color: '#FEF08A',
    fontSize: 12,
    fontWeight: '700',
  },
  arrowIcon: {
    color: '#FCA5A5',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '900',
  },
});
